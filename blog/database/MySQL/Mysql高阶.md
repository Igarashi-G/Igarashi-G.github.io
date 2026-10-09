---
title: MySQL 高阶
order: 3
category:
  - 数据库
tag:
  - MySQL
  - SQL
---

本文集中介绍 MySQL 8.x 中用于表达复杂查询和管理大型数据集的能力，包括 CTE、窗口函数、JSON、生成列、分区、存储对象以及备份与复制边界。索引、锁和慢查询优化见[MySQL 调优](./Mysql调优.md)。

<!-- more -->

## 1. 公用表表达式 CTE

公用表表达式使用 `WITH` 为一个查询结果命名，可以拆解复杂 SQL，并在同一语句中多次引用。

```sql
WITH paid_orders AS (
  SELECT customer_id, amount
  FROM orders
  WHERE status = 'paid'
),
customer_totals AS (
  SELECT customer_id, SUM(amount) AS total_amount
  FROM paid_orders
  GROUP BY customer_id
)
SELECT c.id, c.name, t.total_amount
FROM customer_totals AS t
JOIN customers AS c ON c.id = t.customer_id
WHERE t.total_amount >= 1000;
```

CTE 首先改善的是表达能力，不保证比子查询更快。MySQL 可能合并或物化 CTE，最终仍需通过[执行计划](./MySQL执行计划.md)确认。

### 1.1 递归 CTE

递归 CTE 适合层级、序列和图式遍历。它由锚点成员与递归成员组成：

```sql
WITH RECURSIVE category_tree AS (
  SELECT id, parent_id, name, 0 AS depth,
         CAST(name AS CHAR(1000)) AS path
  FROM categories
  WHERE id = 10

  UNION ALL

  SELECT c.id, c.parent_id, c.name, ct.depth + 1,
         CONCAT(ct.path, ' / ', c.name)
  FROM categories AS c
  JOIN category_tree AS ct ON c.parent_id = ct.id
  WHERE ct.depth < 20
)
SELECT id, parent_id, name, depth, path
FROM category_tree
ORDER BY path;
```

实践中应设置业务深度边界并防止环。`cte_max_recursion_depth` 是服务端保护，不应替代数据完整性检查。

## 2. 窗口函数

窗口函数在相关行集合上计算结果，但不像 `GROUP BY` 那样把多行折叠成一行。

```sql
SELECT customer_id,
       order_no,
       amount,
       created_at,
       ROW_NUMBER() OVER (
         PARTITION BY customer_id
         ORDER BY created_at DESC, id DESC
       ) AS sequence_no,
       SUM(amount) OVER (
         PARTITION BY customer_id
         ORDER BY created_at, id
         ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
       ) AS running_amount
FROM orders
WHERE status = 'paid';
```

常见窗口函数：

| 函数 | 用途 |
|---|---|
| `ROW_NUMBER()` | 为窗口内每行生成唯一序号 |
| `RANK()` | 并列值同名次，后续名次留空档 |
| `DENSE_RANK()` | 并列值同名次，后续名次连续 |
| `LAG()` / `LEAD()` | 读取前一行或后一行的值 |
| `FIRST_VALUE()` / `LAST_VALUE()` | 读取窗口帧首尾值 |
| `SUM()` / `AVG()` | 计算累计值或移动聚合 |

### 2.1 每组最新一条记录

```sql
WITH ranked AS (
  SELECT o.*,
         ROW_NUMBER() OVER (
           PARTITION BY customer_id
           ORDER BY created_at DESC, id DESC
         ) AS rn
  FROM orders AS o
)
SELECT id, customer_id, order_no, created_at
FROM ranked
WHERE rn = 1;
```

为排序补充唯一列可避免同一时间值导致结果不稳定。窗口计算通常需要排序，数据量大时要检查临时表和执行计划。

### 2.2 ROWS 与 RANGE

- `ROWS` 按物理行位置定义窗口帧。
- `RANGE` 按 `ORDER BY` 值的同级关系定义窗口帧，相同排序值可能一起进入帧。

累计计算应显式写出窗口帧，避免依赖默认行为造成边界误解。

## 3. JSON 与生成列

JSON 适合结构有弹性、但仍需要在数据库中校验和查询的属性。核心业务字段若结构稳定，普通列通常更清晰、更容易约束和索引。

```sql
CREATE TABLE user_profiles (
  user_id BIGINT UNSIGNED NOT NULL,
  profile JSON NOT NULL,
  PRIMARY KEY (user_id),
  CONSTRAINT chk_profile_object CHECK (JSON_TYPE(profile) = 'OBJECT')
);
```

写入和读取：

```sql
INSERT INTO user_profiles (user_id, profile)
VALUES (
  1001,
  JSON_OBJECT('country', 'CN', 'languages', JSON_ARRAY('zh-CN', 'en'))
);

SELECT user_id,
       profile->>'$.country' AS country,
       JSON_CONTAINS(profile->'$.languages', JSON_QUOTE('en')) AS knows_en
FROM user_profiles;
```

更新局部属性：

```sql
UPDATE user_profiles
SET profile = JSON_SET(profile, '$.timezone', 'Asia/Shanghai')
WHERE user_id = 1001;
```

### 3.1 为 JSON 属性建立索引

JSON 列不能像普通标量列一样直接建立常规 B-tree 索引。稳定、常查的标量路径可映射为生成列：

```sql
ALTER TABLE user_profiles
  ADD COLUMN country_code CHAR(2)
    GENERATED ALWAYS AS (
      JSON_UNQUOTE(JSON_EXTRACT(profile, '$.country'))
    ) STORED,
  ADD INDEX idx_user_profiles_country (country_code);
```

之后使用生成列查询，意图最清晰：

```sql
SELECT user_id
FROM user_profiles
WHERE country_code = 'CN';
```

生成列可为 `VIRTUAL` 或 `STORED`。选择时需要权衡读取成本、写入成本、存储空间及表达式限制。

## 4. 分区表

分区把一张逻辑表的数据放入多个物理分区。它适合按明确键管理大批历史数据，主要收益包括分区裁剪和快速移除整段数据。

```sql
CREATE TABLE event_logs (
  id BIGINT UNSIGNED NOT NULL,
  occurred_on DATE NOT NULL,
  payload JSON NOT NULL,
  PRIMARY KEY (id, occurred_on)
)
PARTITION BY RANGE COLUMNS (occurred_on) (
  PARTITION p2026q1 VALUES LESS THAN ('2026-04-01'),
  PARTITION p2026q2 VALUES LESS THAN ('2026-07-01'),
  PARTITION p2026q3 VALUES LESS THAN ('2026-10-01'),
  PARTITION p2026q4 VALUES LESS THAN ('2027-01-01'),
  PARTITION pmax VALUES LESS THAN (MAXVALUE)
);
```

查询条件包含分区键时，优化器才有机会排除无关分区：

```sql
EXPLAIN
SELECT id, payload
FROM event_logs
WHERE occurred_on >= '2026-07-01'
  AND occurred_on < '2026-08-01';
```

查看 `partitions` 列确认实际访问范围。

### 4.1 使用边界

- 分区不是索引替代品，每个分区内部仍需合适索引。
- 分区键必须满足 MySQL 对唯一键的约束：每个唯一键都要包含参与分区表达式的列。
- 查询不包含分区条件时，可能仍要访问全部分区。
- 分区数量过多会增加元数据、规划和运维成本。
- 增删分区属于结构变更，应提前演练锁、空间和复制影响。

只有数据生命周期和查询模式都与分区键高度一致时，分区才值得引入。

## 5. 视图

视图可以封装稳定的查询接口和权限边界：

```sql
CREATE VIEW paid_order_summary AS
SELECT customer_id,
       COUNT(*) AS order_count,
       SUM(amount) AS total_amount
FROM orders
WHERE status = 'paid'
GROUP BY customer_id;
```

```sql
SELECT *
FROM paid_order_summary
WHERE total_amount >= 1000;
```

普通视图不保存查询结果，也不是物化视图。复杂嵌套视图可能让执行计划难以理解；变更底层列时还要评估视图依赖。

## 6. 存储过程、函数、触发器与事件

### 6.1 存储过程

```sql
DELIMITER //

CREATE PROCEDURE mark_order_paid(IN p_order_no VARCHAR(32))
BEGIN
  UPDATE orders
  SET status = 'paid'
  WHERE order_no = p_order_no
    AND status = 'pending';
END//

DELIMITER ;

CALL mark_order_paid('O202610090001');
```

存储过程适合必须靠近数据执行的固定操作，但版本控制、测试、可观测性和跨数据库迁移通常弱于应用代码。不要把不断变化的业务流程全部放入存储过程。

### 6.2 存储函数

存储函数返回单个值，可在表达式中使用。函数中的数据访问和确定性声明会影响优化与复制安全，创建前应明确副作用和调用成本。

### 6.3 触发器

触发器可在写入前后自动执行逻辑，适合非常局部的数据约束或审计补充。它的执行不显眼，容易产生隐藏写入、递归依赖和排障困难，应保持短小，并在架构文档中明确记录。

### 6.4 Event Scheduler

事件调度器可以定时执行数据库任务。它适合简单、局部、可幂等的维护动作；需要告警、重试、编排和审计的任务，更适合外部调度系统。

## 7. 备份、恢复与复制

### 7.1 逻辑备份与物理备份

| 类型 | 典型特点 | 适合场景 |
|---|---|---|
| 逻辑备份 | 导出表结构和 SQL/文本数据，可读性与可移植性较好 | 数据量较小、按对象迁移、跨版本验证 |
| 物理备份 | 复制数据文件或页，恢复通常更快 | 大型实例、较短恢复时间目标 |

备份方案必须从目标倒推：

- RPO：最多允许丢失多久的数据。
- RTO：故障后多久必须恢复服务。
- 是否需要时间点恢复。
- 密钥、账户、例程、事件和配置是否一并覆盖。

“备份成功”只说明产物生成，不能证明可恢复。应定期在隔离环境执行恢复演练，并校验数据完整性和业务可用性。

### 7.2 复制不是备份

复制用于高可用、读扩展或数据分发。误删除、错误更新和逻辑损坏也可能快速复制到副本，因此副本不能替代独立、保留多版本且经过恢复验证的备份。

使用副本读取时，还要接受复制延迟带来的非强一致结果。涉及“写后立即读”的业务，应明确读路由和一致性策略。

## 8. 选择能力前的检查表

| 需求 | 首选能力 | 首先确认 |
|---|---|---|
| 拆解复杂查询 | CTE | 执行计划是否物化、是否重复扫描 |
| 排名、累计、组内最新 | 窗口函数 | 排序规模与稳定排序键 |
| 保存少量弹性属性 | JSON | 哪些路径需要约束和索引 |
| 管理按时间淘汰的大表 | 分区 | 查询是否包含分区键，生命周期是否匹配 |
| 封装稳定查询接口 | 视图 | 嵌套复杂度和权限语义 |
| 数据库内固定原子操作 | 存储过程 | 测试、版本控制和可观测性 |
| 高可用或读扩展 | 复制 | 延迟、故障切换与一致性 |
| 灾难恢复 | 独立备份 | RPO、RTO 和恢复演练 |

## 参考资料

- [MySQL 8.4 WITH](https://dev.mysql.com/doc/refman/8.4/en/with.html)
- [MySQL 8.4 Window Functions](https://dev.mysql.com/doc/refman/8.4/en/window-functions.html)
- [MySQL 8.4 JSON Data Type](https://dev.mysql.com/doc/refman/8.4/en/json.html)
- [MySQL 8.4 Secondary Indexes and Generated Columns](https://dev.mysql.com/doc/refman/8.4/en/create-table-secondary-indexes.html)
- [MySQL 8.4 Partitioning](https://dev.mysql.com/doc/refman/8.4/en/partitioning.html)
- [MySQL 8.4 Backup and Recovery](https://dev.mysql.com/doc/refman/8.4/en/backup-and-recovery.html)
