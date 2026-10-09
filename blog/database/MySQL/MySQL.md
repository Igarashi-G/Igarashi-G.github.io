---
title: MySQL
date: 2018-03-21
category:
  - 数据库
tag:
  - MySQL
---

MySQL 是常用的关系型数据库。本文以 MySQL 8.4、InnoDB 和 `utf8mb4` 为基线，整理日常开发中最常用的连接、建模、查询、事务与权限操作。

<!-- more -->

## 1. 连接与基本信息

安装方式因操作系统而异，生产环境应优先使用发行版软件源、MySQL 官方仓库或容器，并固定具体版本。连接前先确认服务已启动：

```bash
mysql --host=127.0.0.1 --port=3306 --user=app_user --password
```

不要把密码直接写在命令行参数中，否则可能出现在 shell 历史或进程列表里。连接后可先确认当前环境：

```sql
SELECT VERSION();
SELECT CURRENT_USER();
SHOW VARIABLES LIKE 'character_set_server';
SHOW VARIABLES LIKE 'collation_server';
```

常用元数据命令：

```sql
SHOW DATABASES;
USE shop;
SHOW TABLES;
SHOW CREATE TABLE orders;
DESCRIBE orders;
```

`CURRENT_USER()` 返回完成认证后实际使用的账户，排查权限问题时比只看客户端输入的用户名更可靠。

## 2. 数据库与字符集

新项目应使用 `utf8mb4`。MySQL 历史上的 `utf8` 实际是最多三个字节的 `utf8mb3` 别名，不能覆盖全部 Unicode 字符。

```sql
CREATE DATABASE shop
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_0900_ai_ci;
```

排序规则会影响比较和排序语义：

- `ai` 表示不区分重音。
- `ci` 表示不区分大小写。
- 若业务需要区分大小写或逐字节比较，应选择匹配需求的排序规则，而不是在查询中临时补救。

不要只修改客户端字符集来掩盖表结构问题。连接、数据库、表和列的字符集应协同配置。

## 3. 表结构设计

下面用订单表演示常见字段与约束：

```sql
CREATE TABLE orders (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  order_no VARCHAR(32) NOT NULL,
  customer_id BIGINT UNSIGNED NOT NULL,
  status VARCHAR(20) NOT NULL,
  amount DECIMAL(12, 2) NOT NULL,
  note VARCHAR(500) NULL,
  created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
    ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (id),
  UNIQUE KEY uk_orders_order_no (order_no),
  KEY idx_orders_customer_created (customer_id, created_at),
  CONSTRAINT chk_orders_amount CHECK (amount >= 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

### 3.1 类型选择

| 场景 | 推荐类型 | 注意事项 |
|---|---|---|
| 主键、计数 | `INT` / `BIGINT` | 根据真实范围选择，注意有符号与无符号范围 |
| 金额 | `DECIMAL(p, s)` | 不要使用浮点数保存需要精确计算的金额 |
| 短文本 | `VARCHAR(n)` | `n` 是字符上限，实际字节数受字符集影响 |
| 长文本 | `TEXT` 系列 | 避免无边界地把所有字符串都定义成 `TEXT` |
| 时间点 | `TIMESTAMP` / `DATETIME` | 明确时区转换策略；业务层通常统一使用 UTC |
| 布尔值 | `BOOLEAN` | 在 MySQL 中是 `TINYINT(1)` 的同义写法 |
| 半结构化数据 | `JSON` | 需要按属性过滤时，应规划生成列或表达式索引 |

字段超长或类型转换失败时，不应依赖数据库“自动截断”。保持严格 SQL 模式，并让异常尽早暴露。

### 3.2 约束与索引

- 主键用于唯一标识行，InnoDB 的二级索引叶子节点会保存主键值。
- `UNIQUE` 约束表达业务唯一性，但可空列的语义要结合业务确认。
- 外键能维护引用完整性，也会带来写入顺序和删除策略约束。
- 联合索引的列顺序应来自真实查询条件，而不是把常用列全部拼到一个索引中。

索引设计与验证详见[执行计划](./MySQL执行计划.md)和[调优指南](./Mysql调优.md)。

## 4. 增删改查

### 4.1 写入与更新

```sql
INSERT INTO orders (order_no, customer_id, status, amount)
VALUES ('O202610090001', 1001, 'pending', 199.00);

INSERT INTO orders (order_no, customer_id, status, amount)
VALUES
  ('O202610090002', 1001, 'paid', 88.50),
  ('O202610090003', 1002, 'pending', 20.00);

UPDATE orders
SET status = 'paid'
WHERE order_no = 'O202610090001';

DELETE FROM orders
WHERE id = 3;
```

执行 `UPDATE` 或 `DELETE` 前，先用相同条件运行 `SELECT`，确认影响范围。业务代码中应使用参数绑定，不要拼接用户输入。

`INSERT ... ON DUPLICATE KEY UPDATE` 可用于按唯一键写入或更新：

```sql
INSERT INTO orders (order_no, customer_id, status, amount)
VALUES ('O202610090001', 1001, 'paid', 199.00) AS new
ON DUPLICATE KEY UPDATE
  status = new.status,
  amount = new.amount;
```

### 4.2 查询、排序与分页

```sql
SELECT id, order_no, amount, created_at
FROM orders
WHERE customer_id = 1001
  AND status = 'paid'
ORDER BY created_at DESC, id DESC
LIMIT 20;
```

结果需要稳定分页时，排序字段必须能唯一确定顺序。深分页应优先使用游标式条件，而不是越来越大的 `OFFSET`：

```sql
SELECT id, order_no, created_at
FROM orders
WHERE customer_id = 1001
  AND (created_at, id) < ('2026-10-09 12:00:00', 9000)
ORDER BY created_at DESC, id DESC
LIMIT 20;
```

### 4.3 聚合与 HAVING

`WHERE` 在分组前筛选行，`HAVING` 在分组后筛选聚合结果：

```sql
SELECT customer_id,
       COUNT(*) AS order_count,
       SUM(amount) AS total_amount
FROM orders
WHERE status = 'paid'
GROUP BY customer_id
HAVING COUNT(*) >= 2
ORDER BY total_amount DESC;
```

启用 `ONLY_FULL_GROUP_BY` 后，未聚合的选择列必须满足分组语义，可避免依赖不确定值。

### 4.4 连接与集合运算

```sql
SELECT o.order_no, c.name AS customer_name, o.amount
FROM orders AS o
JOIN customers AS c ON c.id = o.customer_id
WHERE o.status = 'paid';
```

- `INNER JOIN` 只保留两侧匹配的行。
- `LEFT JOIN` 保留左表全部行，右侧无匹配时为 `NULL`。
- `UNION` 会去重；确认不需要去重时使用 `UNION ALL`，语义更直接，也减少额外工作。

## 5. 事务

InnoDB 支持事务。一个事务应尽量短小，并只包围必须原子提交的操作：

```sql
START TRANSACTION;

UPDATE accounts
SET balance = balance - 100.00
WHERE id = 1 AND balance >= 100.00;

UPDATE accounts
SET balance = balance + 100.00
WHERE id = 2;

COMMIT;
```

出现异常时执行 `ROLLBACK`。应用还必须检查第一条更新实际影响的行数，否则余额不足时仍可能给收款方加钱。

### 5.1 自动提交与隐式提交

- 默认 `autocommit=1`，每条独立 DML 语句会自动提交。
- `START TRANSACTION` 后由 `COMMIT` 或 `ROLLBACK` 结束事务。
- 很多 DDL 和账户管理语句会隐式提交，不能把它们当作普通 DML 一样回滚。
- 不要在事务中夹杂外部网络调用或长时间等待，否则会延长锁和版本的持有时间。

隔离级别、锁等待和死锁处理详见[调优指南](./Mysql调优.md)。

## 6. 账户与最小权限

账户由用户名和来源主机共同确定。应用应使用独立账户，不要使用 `root`：

```sql
CREATE USER 'shop_app'@'10.0.%'
  IDENTIFIED BY 'replace-with-a-secret-from-your-secret-manager';

GRANT SELECT, INSERT, UPDATE, DELETE
ON shop.*
TO 'shop_app'@'10.0.%';

SHOW GRANTS FOR 'shop_app'@'10.0.%';
```

调整和回收权限：

```sql
ALTER USER 'shop_app'@'10.0.%'
  IDENTIFIED BY 'new-secret-managed-outside-source-code';

REVOKE DELETE
ON shop.*
FROM 'shop_app'@'10.0.%';

DROP USER 'shop_app'@'10.0.%';
```

使用 `CREATE USER`、`ALTER USER`、`GRANT`、`REVOKE` 等账户管理语句后，不需要再执行 `FLUSH PRIVILEGES`。不要直接修改 `mysql.*` 授权表。

权限设计的基本原则：

- 应用运行账户与迁移账户分离。
- 限定来源主机，避免无必要的 `'%'`。
- 密码进入密钥管理系统或环境配置，不写入仓库。
- 定期检查未使用账户和超范围授权。

## 7. 日常诊断

```sql
SHOW PROCESSLIST;
SHOW ENGINE INNODB STATUS;
SHOW WARNINGS;
```

查看当前连接和运行中的语句时，优先结合 `performance_schema` 与 `sys` 库。不要只凭一次慢查询就创建索引，应先确认调用频率、数据分布、扫描行数和实际执行时间。

常见排查顺序：

1. 确认错误发生在哪个实例、数据库、账户和版本。
2. 保留 SQL、参数、错误码与发生时间。
3. 使用 `EXPLAIN` 检查估算计划，必要时在可控环境使用 `EXPLAIN ANALYZE`。
4. 检查锁等待、事务持续时间、连接池和主机资源。
5. 修改后用相同数据与参数复测。

## 8. 延伸阅读

- [MySQL 执行计划](./MySQL执行计划.md)：读懂访问路径、估算值和实际执行数据。
- [MySQL 调优](./Mysql调优.md)：从慢查询证据到索引、SQL、事务和配置调优。
- [MySQL 高阶](./Mysql高阶.md)：CTE、窗口函数、JSON、分区和备份边界。
- [SQLAlchemy 基础](./SQLAlchemy.md)：在 Python 中使用 SQLAlchemy 2.x 访问 MySQL。

## 9. 数据库管理工具

[DBX](https://github.com/t8y2/dbx) 是一个开源数据库管理工具，支持 MySQL、PostgreSQL、Redis 等多种数据库，可通过 Docker 部署 Web 版本。

将下面内容保存为 `compose.yaml`，执行 `docker compose up -d`，然后访问 `http://localhost:4224`：

```yaml
services:
  dbx:
    image: t8y2/dbx:latest
    pull_policy: always
    ports:
      - "4224:4224"
    volumes:
      - dbx-data:/app/data
    restart: unless-stopped

volumes:
  dbx-data:
```

部署到非本机环境时，还应增加身份认证、TLS、网络访问控制和镜像版本固定策略，不要把数据库管理入口直接暴露到公网。

## 参考资料

- [MySQL 8.4 Reference Manual](https://dev.mysql.com/doc/refman/8.4/en/)
- [MySQL 8.4 Account Management Statements](https://dev.mysql.com/doc/refman/8.4/en/account-management-statements.html)
- [MySQL 8.4 InnoDB Transaction Model](https://dev.mysql.com/doc/refman/8.4/en/innodb-transaction-model.html)
