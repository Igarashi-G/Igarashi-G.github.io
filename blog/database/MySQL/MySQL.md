---
title: MySQL
date: 2018-03-21
category:
  - 数据库
tag:
  - MySQL
order: 2
description: 面向 MySQL 8.4+ 生产环境的安装、权限、建模、查询、索引与运维指南
---

MySQL 是常用的关系型数据库。本文以 MySQL 8.4+、InnoDB、`utf8mb4` 和严格 SQL 模式为基线，整理从安装部署到生产排障的常用方法。

<!-- more -->

## 1. 安装与部署

### 1.1 安装 MySQL

安装后先确认服务状态，再使用客户端连接。生产环境应固定 MySQL 大版本和镜像标签，避免使用不可控的 `latest`。

::: tabs

@tab CentOS / RHEL

```bash
# 已配置 MySQL 官方 Yum 仓库
sudo dnf install mysql-community-server -y
sudo systemctl enable --now mysqld
sudo systemctl status mysqld

# 使用交互式提示输入密码，不要把密码直接写在命令行参数中
mysql --host=127.0.0.1 --port=3306 --user=root --password
```

如果发行版仓库没有目标版本，应配置 MySQL 官方仓库后再安装。不要在生产环境混用不同来源的客户端和服务端包。

@tab Ubuntu / Debian

```bash
sudo apt update
sudo apt install mysql-server -y
sudo systemctl enable --now mysql
sudo systemctl status mysql

mysql --host=127.0.0.1 --port=3306 --user=root --password
```

@tab Windows

推荐使用 MySQL Installer 安装 MySQL Server 8.4，并在安装向导中设置服务名、端口和管理员密码。安装完成后可以在 PowerShell 中检查服务：

```powershell
Get-Service -Name 'MySQL*'
Start-Service -Name 'MySQL84'

mysql.exe --host=127.0.0.1 --port=3306 --user=root --password
```

如果安装时使用了其他服务名，请以 `Get-Service -Name 'MySQL*'` 的实际结果为准。

@tab Docker Compose

将下面内容保存为 `compose.yaml`。密码通过 `.env` 或部署平台的 secret 注入，示例中的占位符不能直接作为生产密码。

```yaml
services:
  mysql:
    image: mysql:8.4
    restart: unless-stopped
    ports:
      - "3306:3306"
    environment:
      MYSQL_ROOT_PASSWORD: ${MYSQL_ROOT_PASSWORD:?set MYSQL_ROOT_PASSWORD}
      MYSQL_DATABASE: ${MYSQL_DATABASE:-app}
      MYSQL_USER: ${MYSQL_USER:-app}
      MYSQL_PASSWORD: ${MYSQL_PASSWORD:?set MYSQL_PASSWORD}
    volumes:
      - mysql-data:/var/lib/mysql
    healthcheck:
      test: ["CMD-SHELL", "mysqladmin ping -h 127.0.0.1 -uroot -p\"$${MYSQL_ROOT_PASSWORD}\" --silent"]
      interval: 10s
      timeout: 5s
      retries: 12

volumes:
  mysql-data:
```

创建 `.env` 后启动：

```dotenv
MYSQL_ROOT_PASSWORD=replace-with-a-random-secret
MYSQL_DATABASE=app
MYSQL_USER=app
MYSQL_PASSWORD=replace-with-another-random-secret
```

```bash
docker compose up -d
docker compose ps
docker compose logs --tail=100 mysql
mysql --host=127.0.0.1 --port=3306 --user=app --password app
```

生产环境还应将数据卷放在可靠存储上，规划备份、恢复和版本升级流程；不要把数据库容器当作备份方案。

@tab DBX

[DBX](https://github.com/t8y2/dbx) 是支持 MySQL、PostgreSQL 和 Redis 的数据库管理工具。它适合开发、测试和受控的运维入口，不能替代数据库账号权限、审计和备份策略。

将下面内容保存为单独的 `compose.dbx.yaml`，执行后访问 `http://localhost:4224`：

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

```bash
docker compose -f compose.dbx.yaml up -d
docker compose -f compose.dbx.yaml ps
```

如果要在生产环境使用 DBX，应额外限制网络入口、配置访问认证，并避免让它暴露在公网。

:::

### 1.2 安装后的基本检查

```sql
SELECT VERSION(), CURRENT_USER();

SHOW VARIABLES WHERE Variable_name IN (
  'character_set_server',
  'collation_server',
  'default_storage_engine',
  'sql_mode',
  'max_connections'
);
```

确认实例使用 `InnoDB`、`utf8mb4` 和严格 SQL 模式。生产环境的字符集、排序规则和时区应在实例、连接池和应用配置中保持一致。

## 2. 初始化数据库与连接

### 2.1 创建数据库

MySQL 8.4+ 新建数据库优先使用 `utf8mb4` 和与业务匹配的排序规则。`utf8mb4_0900_ai_ci` 适合多数不区分大小写的 Unicode 文本；需要区分大小写时，应根据业务选择对应排序规则。

```sql
CREATE DATABASE app
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_0900_ai_ci;

USE app;

SHOW DATABASES;
SHOW TABLES;
```

### 2.2 连接参数

```bash
# 交互式输入密码
mysql --host=db.example.internal --port=3306 --user=app --password app

# 使用 Unix socket 连接本机实例
mysql --socket=/var/lib/mysql/mysql.sock --user=app --password app
```

密码不要写在 shell 历史、进程参数、仓库文件或文章示例中。应用程序应使用参数绑定，并通过 secret manager 或运行环境注入凭据。

### 2.3 常用元数据

```sql
SELECT DATABASE();
SHOW TABLES;
DESCRIBE table_name;
SHOW CREATE TABLE table_name;
SHOW INDEX FROM table_name;
```

## 3. 用户、角色与权限

### 3.1 创建应用账号

日常管理使用 `CREATE USER`、`ALTER USER`、`GRANT`、`REVOKE` 和 `SHOW GRANTS`。不要直接修改 `mysql.user`，执行这些语句后也不需要额外执行 `FLUSH PRIVILEGES`。

```sql
CREATE USER 'app'@'10.0.%'
  IDENTIFIED BY 'replace-with-a-random-secret';

GRANT SELECT, INSERT, UPDATE, DELETE
  ON app.*
  TO 'app'@'10.0.%';

SHOW GRANTS FOR 'app'@'10.0.%';
```

`'app'@'localhost'`、`'app'@'10.0.%'` 和 `'app'@'%'` 是不同的账户。生产环境应把主机范围限制到实际应用网段，避免使用任意来源的 `%`。

### 3.2 使用角色统一授权

角色适合集中管理一组权限，再将角色授予应用账号：

```sql
CREATE ROLE 'app_reader', 'app_writer';

GRANT SELECT ON app.* TO 'app_reader';
GRANT SELECT, INSERT, UPDATE, DELETE ON app.* TO 'app_writer';

CREATE USER 'report'@'10.0.%'
  IDENTIFIED BY 'replace-with-a-random-secret';
GRANT 'app_reader' TO 'report'@'10.0.%';
SET DEFAULT ROLE 'app_reader' TO 'report'@'10.0.%';
```

### 3.3 修改、回收和删除权限

```sql
ALTER USER 'app'@'10.0.%'
  IDENTIFIED BY 'replace-with-a-new-random-secret';

REVOKE DELETE ON app.* FROM 'app'@'10.0.%';
DROP USER 'report'@'10.0.%';
```

为迁移、备份和管理任务单独创建短期账号，任务结束后回收或删除，不要让应用账号拥有 `GRANT OPTION`、`SUPER` 或全库写权限。

## 4. 表设计与数据类型

### 4.1 生产表的基础模板

新表使用 `InnoDB`。它提供事务、行级锁和崩溃恢复；不要为了追求旧资料中的“速度”而在新项目中选择不支持事务的引擎。

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
) ENGINE=InnoDB
  DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_0900_ai_ci;
```

### 4.2 常用数据类型

| 类型 | 适用场景 | 生产注意事项 |
| --- | --- | --- |
| `INT` / `BIGINT` | 标识、计数 | 依据真实范围选择有符号或无符号类型；不要盲目使用 `BIGINT`。 |
| `DECIMAL(M, D)` | 金额、精确小数 | `M` 是总位数，`D` 是小数位数；需要精确计算时不要使用浮点数。 |
| `CHAR` / `VARCHAR` | 短文本 | `CHAR` 适合长度固定的值，`VARCHAR` 按实际长度保存；`n` 表示字符数。 |
| `TEXT` | 较长文本 | 只有确实不适合设定长度时再使用，查询和索引要单独评估。 |
| `DATE` / `DATETIME(6)` | 日期和时间 | 明确应用时区；跨时区系统通常在应用层统一使用 UTC。 |
| `JSON` | 结构弹性的属性 | 稳定且高频过滤的字段应建普通列或生成列。 |
| `ENUM` | 少量稳定选项 | 选项经常变化时使用字典表，避免频繁修改表结构。 |
| `BLOB` 系列 | 二进制内容 | 图片、视频通常放对象存储，数据库保存对象键或路径。 |

### 4.3 主键、唯一约束与外键

- 主键用于唯一标识一行，不能为 `NULL`；InnoDB 的二级索引会保存主键值。
- `UNIQUE` 表达业务唯一性；可空列的重复 `NULL` 语义必须结合业务确认。
- 外键维护引用完整性，但会增加写入顺序和删除策略约束；高并发系统应结合数据模型与迁移流程决定是否使用。

```sql
CREATE TABLE color (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(32) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uk_color_name (name)
) ENGINE=InnoDB DEFAULT CHARACTER SET utf8mb4;

CREATE TABLE item (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  color_id INT UNSIGNED NOT NULL,
  PRIMARY KEY (id),
  KEY idx_item_color_id (color_id),
  CONSTRAINT fk_item_color
    FOREIGN KEY (color_id) REFERENCES color (id)
) ENGINE=InnoDB DEFAULT CHARACTER SET utf8mb4;
```

### 4.4 修改表结构

执行大表 DDL 前先评估锁等待、重建时间、磁盘空间和回滚方案，并在生产窗口观察执行进度。

```sql
ALTER TABLE orders RENAME TO customer_orders;

ALTER TABLE customer_orders
  ADD COLUMN paid_at DATETIME(6) NULL;
ALTER TABLE customer_orders
  MODIFY COLUMN status VARCHAR(32) NOT NULL;
ALTER TABLE customer_orders
  CHANGE COLUMN note remark VARCHAR(500) NULL;
ALTER TABLE customer_orders
  DROP COLUMN remark;

ALTER TABLE customer_orders
  ADD UNIQUE INDEX uk_customer_orders_customer_date (customer_id, created_at);
ALTER TABLE customer_orders
  DROP INDEX uk_customer_orders_customer_date;

ALTER TABLE item DROP FOREIGN KEY fk_item_color;
ALTER TABLE item ADD CONSTRAINT fk_item_color
  FOREIGN KEY (color_id) REFERENCES color (id);

ALTER TABLE customer_orders
  ALTER COLUMN status SET DEFAULT 'pending';
ALTER TABLE customer_orders
  ALTER COLUMN status DROP DEFAULT;

DESCRIBE customer_orders;
SHOW CREATE TABLE customer_orders;
```

## 5. 数据写入、更新与事务

### 5.1 插入、批量插入和导入

```sql
INSERT INTO orders (order_no, customer_id, status, amount)
VALUES ('O202610100001', 1001, 'pending', 199.00);

INSERT INTO orders (order_no, customer_id, status, amount)
VALUES
  ('O202610100002', 1001, 'paid', 88.50),
  ('O202610100003', 1002, 'pending', 20.00);

INSERT INTO archive_orders (order_no, customer_id, status, amount)
SELECT order_no, customer_id, status, amount
FROM orders
WHERE created_at < '2025-01-01';
```

应用代码使用参数绑定，不要拼接用户输入。批量导入前先确认唯一键、外键、字符集和失败重试策略。

### 5.2 更新与删除

```sql
UPDATE orders
SET status = 'paid', paid_at = CURRENT_TIMESTAMP(6)
WHERE order_no = 'O202610100001';

DELETE FROM orders
WHERE id = 3;
```

执行 `UPDATE` 或 `DELETE` 前，先用相同的 `WHERE` 条件运行 `SELECT`，确认影响范围。没有 `WHERE` 的语句只能在明确需要处理整张表时使用。

`DELETE` 逐行删除并保留表结构，通常不会重置自增计数；`TRUNCATE TABLE` 快速清空表并重置自增计数，同时具有隐含提交行为。两者都不能替代备份：

```sql
TRUNCATE TABLE staging_orders;
DROP TABLE staging_orders;
```

### 5.3 事务与隔离级别

```sql
START TRANSACTION;

SELECT balance
FROM accounts
WHERE id = 1001
FOR UPDATE;

UPDATE accounts
SET balance = balance - 100.00
WHERE id = 1001;

UPDATE accounts
SET balance = balance + 100.00
WHERE id = 1002;

COMMIT;
-- 发生异常时使用 ROLLBACK;
```

事务应尽量短，锁定顺序应在所有业务路径中保持一致。遇到死锁时回滚当前事务并在应用层按退避策略重试，同时保留死锁日志用于定位。

```sql
SELECT @@transaction_isolation;
SET SESSION TRANSACTION ISOLATION LEVEL READ COMMITTED;
```

不要仅凭“行级锁”判断不会阻塞；范围条件、缺少索引、外键检查和 DDL 都可能扩大锁影响范围。

## 6. 查询与高级 SQL

### 6.1 条件、排序和分页基础

```sql
SELECT id, order_no, amount, created_at
FROM orders
WHERE customer_id = 1001
  AND status = 'paid'
ORDER BY created_at DESC, id DESC
LIMIT 20;

SELECT * FROM orders WHERE id BETWEEN 5 AND 16;
SELECT * FROM orders WHERE id IN (11, 22, 33);
SELECT * FROM orders WHERE id NOT IN (11, 22, 33);
SELECT * FROM orders WHERE order_no LIKE 'O2026%';
```

`%` 匹配任意长度，`_` 匹配一个字符。以通配符开头的 `LIKE '%text'` 通常无法使用普通 B+Tree 索引；是否使用索引仍需用执行计划验证。

生产查询尽量列出需要的字段，避免无目的地使用 `SELECT *`，以减少网络传输并降低表结构变化对调用方的影响。

### 6.2 聚合、`WHERE` 与 `HAVING`

`WHERE` 在分组前过滤行，`HAVING` 在分组后过滤聚合结果。常用聚合函数包括 `MAX`、`MIN`、`SUM`、`COUNT` 和 `AVG`。

```sql
SELECT customer_id,
       COUNT(*) AS order_count,
       SUM(amount) AS total_amount,
       MAX(amount) AS max_amount
FROM orders
WHERE created_at >= '2026-01-01'
GROUP BY customer_id
HAVING COUNT(*) > 2
ORDER BY total_amount DESC;
```

常见逻辑顺序是 `FROM`、`WHERE`、`GROUP BY`、`HAVING`、`SELECT`、`ORDER BY`、`LIMIT`。聚合条件不能直接写在 `WHERE` 中。

### 6.3 连接查询

直接写 `FROM A, B` 会产生笛卡尔积。除非确实需要组合所有行，否则应明确写出连接条件：

```sql
-- 只返回两张表都能匹配的行
SELECT a.num, a.name, b.name
FROM A AS a
INNER JOIN B AS b ON a.nid = b.nid;

-- 保留 A 的全部行，B 中没有匹配项时以 NULL 填充
SELECT a.num, a.name, b.name
FROM A AS a
LEFT JOIN B AS b ON a.nid = b.nid;

-- 保留 B 的全部行，A 中没有匹配项时以 NULL 填充
SELECT a.num, a.name, b.name
FROM A AS a
RIGHT JOIN B AS b ON a.nid = b.nid;
```

连接性能要结合连接列索引、数据量和 `EXPLAIN` 结果判断。实际项目通常用 `LEFT JOIN` 表达主表语义，不应仅根据连接类型下结论。

### 6.4 集合查询

`UNION` 会去除重复行，`UNION ALL` 保留重复行。参与合并的查询必须返回相同数量且类型兼容的列：

```sql
SELECT nickname FROM A
UNION
SELECT name FROM B;

SELECT nickname FROM A
UNION ALL
SELECT name FROM B;
```

### 6.5 CTE 与递归 CTE

`WITH` 可以给子查询命名，适合把复杂查询拆成可读步骤。CTE 是否物化由优化器决定，不能仅凭写法判断性能。

```sql
WITH paid_orders AS (
  SELECT customer_id, amount
  FROM orders
  WHERE status = 'paid'
)
SELECT customer_id, SUM(amount) AS total_amount
FROM paid_orders
GROUP BY customer_id;
```

层级数据可以使用递归 CTE，但必须设置深度边界并防止环：

```sql
WITH RECURSIVE category_tree AS (
  SELECT id, parent_id, name, 0 AS depth
  FROM categories
  WHERE id = 1

  UNION ALL

  SELECT c.id, c.parent_id, c.name, t.depth + 1
  FROM categories AS c
  JOIN category_tree AS t ON c.parent_id = t.id
  WHERE t.depth < 20
)
SELECT * FROM category_tree;
```

### 6.6 窗口函数

窗口函数保留明细行，同时在窗口内计算排名、累计值或前后行：

```sql
SELECT customer_id,
       order_no,
       amount,
       ROW_NUMBER() OVER (
         PARTITION BY customer_id
         ORDER BY created_at DESC, id DESC
       ) AS row_no,
       SUM(amount) OVER (
         PARTITION BY customer_id
         ORDER BY created_at, id
         ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
       ) AS running_amount
FROM orders;
```

### 6.7 JSON 与生成列

JSON 适合保存结构有弹性的属性；稳定且频繁过滤的字段仍应优先设计为普通列。常查的 JSON 路径可以映射到生成列并建立索引：

```sql
ALTER TABLE user_profiles
  ADD COLUMN country_code CHAR(2)
    GENERATED ALWAYS AS (
      JSON_UNQUOTE(JSON_EXTRACT(profile, '$.country'))
    ) STORED,
  ADD INDEX idx_user_profiles_country (country_code);

SELECT id, JSON_UNQUOTE(profile->'$.country') AS country
FROM user_profiles
WHERE country_code = 'CN';
```

### 6.8 常用字符串函数与存储函数

```sql
SELECT CHAR_LENGTH('igarashi');
SELECT CONCAT('mysql', '-', '8.4');
SELECT CONCAT_WS('-', '2026', '10', '10');
SELECT UPPER('mysql');
```

确实需要在数据库中复用计算逻辑时，可以创建存储函数。函数应明确返回类型和数据访问属性，并控制部署权限：

```sql
DELIMITER //

CREATE FUNCTION add_amount(a DECIMAL(12, 2), b DECIMAL(12, 2))
RETURNS DECIMAL(12, 2)
DETERMINISTIC
NO SQL
RETURN a + b//

DELIMITER ;

SELECT add_amount(10.00, 5.50);
DROP FUNCTION add_amount;
```

## 7. 索引与执行计划

### 7.1 索引的作用与代价

索引通过额外的数据结构减少扫描范围，也可以表达主键、唯一性和引用约束。索引不是越多越好：它会占用磁盘和缓冲池空间，并增加 `INSERT`、`UPDATE`、`DELETE` 的维护成本。

InnoDB 默认使用 B+Tree 索引。哈希索引不能替代通用的 B+Tree 设计；是否命中索引要以实际执行计划和数据分布为准。

### 7.2 普通、唯一、主键和联合索引

```sql
CREATE INDEX idx_orders_status_created
  ON orders (status, created_at);

CREATE UNIQUE INDEX uk_orders_order_no
  ON orders (order_no);

SHOW INDEX FROM orders;
DROP INDEX idx_orders_status_created ON orders;
```

联合索引遵循左侧前缀原则：索引 `(customer_id, created_at)` 通常适合 `customer_id` 或同时使用 `customer_id`、`created_at` 的条件，不能假设只按 `created_at` 查询也会使用同一索引。列顺序应来自真实查询模式、选择性和排序需求。

### 7.3 覆盖索引与索引合并

如果查询所需字段都能从索引叶子节点获得，就可能形成覆盖索引，减少回表；但覆盖索引会增加索引宽度和写入成本，应结合 `EXPLAIN` 验证。

多个单列索引可能被优化器合并使用，但不能把 `index_merge` 当作联合索引的固定替代方案。根据稳定的查询条件设计联合索引，并通过基准数据验证收益。

### 7.4 `EXPLAIN` 与 `EXPLAIN ANALYZE`

`EXPLAIN` 用于查看优化器预计的访问路径，`EXPLAIN ANALYZE` 会实际执行语句并提供估算值与实际值的对比。只看 `type` 的高低排序不足以判断性能，还要关注扫描行数、过滤比例、连接顺序、临时表和排序。

```sql
EXPLAIN FORMAT=TREE
SELECT id, order_no, amount
FROM orders
WHERE customer_id = 1001
ORDER BY created_at DESC, id DESC
LIMIT 20;

EXPLAIN ANALYZE
SELECT id, order_no, amount
FROM orders
WHERE customer_id = 1001
ORDER BY created_at DESC, id DESC
LIMIT 20;
```

下面这些现象值得进一步检查，但不能脱离数据量直接判定为“必然慢”：

- `ALL` 可能表示全表扫描；小表或返回大部分数据时也可能是合理选择。
- `range` 表示范围访问，仍需观察实际扫描行数和回表成本。
- `ref`、`eq_ref`、`const` 通常表示更窄的访问路径，但连接顺序和结果集大小仍然重要。
- `Using temporary`、`Using filesort`、估算行数与实际行数偏差较大时，应检查统计信息、索引和 SQL 形状。

### 7.5 索引命中常见问题

- `LIKE` 以 `%` 或 `_` 开头时，普通 B+Tree 通常无法利用前缀。
- 在索引列上套函数或表达式可能阻止普通索引使用；优先在应用层完成格式转换，或设计生成列索引。
- 比较两边类型不一致会触发隐式转换，可能扩大扫描范围；参数类型要和列类型一致。
- `OR` 的每个分支都应检查索引可用性；必要时比较 `UNION ALL` 和单条 `OR` 的执行计划。
- `ORDER BY`、`GROUP BY` 是否能利用索引取决于列顺序、过滤条件和投影字段，不能只看排序列是否存在索引。
- 低选择性字段不一定适合单独建索引，最终判断要以真实数据和查询负载为准。

### 7.6 不可见索引

删除索引前可以先将其设为不可见，观察业务查询是否受到影响。不可见索引仍然维护并占用空间，确认无用后再删除：

```sql
ALTER TABLE orders
  ALTER INDEX idx_orders_status_created INVISIBLE;

EXPLAIN SELECT *
FROM orders
WHERE status = 'paid'
  AND created_at >= '2026-01-01';

ALTER TABLE orders
  ALTER INDEX idx_orders_status_created VISIBLE;
```

## 8. 分页与查询性能

### 8.1 偏移分页

`LIMIT offset, size` 会随着 `offset` 增大而扫描并丢弃更多行。分页必须使用稳定、唯一的排序条件：

```sql
SELECT id, order_no, created_at
FROM orders
WHERE customer_id = 1001
ORDER BY created_at DESC, id DESC
LIMIT 20 OFFSET 1000;
```

偏移分页适合页数较浅或确实需要跳页的后台场景；不要把它当作无限滚动和大数据导出的默认方案。

### 8.2 游标式分页

使用上一页最后一条记录的排序键，能够避免随着页数增加而扩大偏移扫描：

```sql
SELECT id, order_no, created_at
FROM orders
WHERE customer_id = 1001
  AND (created_at, id) < ('2026-10-10 12:00:00.000000', 9000)
ORDER BY created_at DESC, id DESC
LIMIT 20;
```

游标需要保存完整的排序键组合，并处理数据在翻页期间新增、修改或删除的情况。

### 8.3 批量处理

批处理应使用有索引的范围条件，并控制每批大小；不要用一个无边界事务锁住整张大表：

```sql
UPDATE orders
SET status = 'archived'
WHERE id >= 100001
  AND id < 110001
  AND status = 'paid';
```

## 9. 慢查询与运行诊断

### 9.1 慢查询日志

慢查询日志应在实例配置和变更流程中管理。阈值需要根据业务延迟目标设定，不能机械套用某个秒数。修改前先确认磁盘空间、日志轮转和采集链路：

```sql
SHOW VARIABLES LIKE 'slow_query%';
SHOW VARIABLES LIKE 'long_query_time';
SHOW VARIABLES LIKE 'log_queries_not_using_indexes';

SET PERSIST slow_query_log = ON;
SET PERSIST long_query_time = 1;
```

`log_queries_not_using_indexes` 可能产生大量日志，建议在短时诊断窗口启用，并结合采样和日志轮转。长期配置应写入受管控的 MySQL 配置文件或参数管理系统。

### 9.2 分析慢日志

```bash
mysqldumpslow -s at -t 20 /var/lib/mysql/*-slow.log

# 常用排序：at 平均查询时间，c 次数，t 总查询时间
mysqldumpslow -s c -t 20 /var/lib/mysql/*-slow.log
```

定位到 SQL 后，使用脱敏参数复现并运行 `EXPLAIN` 或 `EXPLAIN ANALYZE`。优化前后比较 p95/p99 延迟、扫描行数、锁等待和写入成本，不要只比较单次查询时间。

### 9.3 锁等待与运行状态

```sql
SHOW FULL PROCESSLIST;
SHOW STATUS LIKE 'Threads%';
SHOW ENGINE INNODB STATUS;

SELECT *
FROM performance_schema.data_lock_waits;
```

排障时记录 SQL、账号、事务开始时间、等待对象和应用请求标识。终止线程前确认是否会留下半完成业务操作，并按应用重试策略处理回滚。

## 10. 分区、视图与备份边界

### 10.1 分区

分区适合同时满足数据生命周期管理和分区裁剪条件的大表。它不是索引替代品，也不会自动解决所有查询性能问题。分区键、唯一键、归档策略和跨分区查询必须在真实数据上验证。

```sql
CREATE TABLE audit_events (
  id BIGINT UNSIGNED NOT NULL,
  event_time DATETIME(6) NOT NULL,
  payload JSON NOT NULL,
  PRIMARY KEY (id, event_time)
) ENGINE=InnoDB
  PARTITION BY RANGE COLUMNS (event_time) (
    PARTITION p2026q1 VALUES LESS THAN ('2026-04-01'),
    PARTITION p2026q2 VALUES LESS THAN ('2026-07-01'),
    PARTITION pmax VALUES LESS THAN (MAXVALUE)
  );
```

### 10.2 视图

普通视图保存查询定义，不保存结果，也不等同于物化视图。视图适合封装稳定的读取边界，但复杂视图仍要检查底层执行计划：

```sql
CREATE OR REPLACE VIEW paid_orders AS
SELECT id, order_no, customer_id, amount, paid_at
FROM orders
WHERE status = 'paid';

SELECT * FROM paid_orders WHERE customer_id = 1001;
DROP VIEW paid_orders;
```

### 10.3 备份、复制与恢复

复制可以用于高可用和读扩展，但不能替代独立备份。生产环境至少应明确：

- 全量备份、增量或日志备份的保留周期。
- 备份文件的加密、访问权限和异地保存策略。
- 恢复目标（RPO/RTO）以及定期恢复演练。
- 升级、迁移和回滚的兼容性检查。

备份是否“成功”必须以能够恢复出可用实例为准，不能只看备份命令返回码。

## 11. 生产检查清单

- 固定 MySQL 8.4+ 的明确版本，使用 InnoDB 和 `utf8mb4`。
- 应用账号遵循最小权限，禁止直接修改 `mysql.user`。
- 所有写入使用参数绑定；生产密码通过 secret manager 注入。
- 大表 DDL、索引变更和批处理先评估锁、磁盘和回滚方案。
- 使用 `EXPLAIN`、`EXPLAIN ANALYZE` 和慢查询日志验证优化效果。
- 深分页优先使用稳定排序键和游标式分页。
- 备份必须做恢复演练，复制不能替代备份。
- DBX 等管理工具限制网络入口和账号权限，不直接暴露到公网。
