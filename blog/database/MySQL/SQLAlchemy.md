---
title: SQLAlchemy 2.x 基础
order: 1
group:
  title: SQLAlchemy
  order: 36
category:
  - 数据库
tag:
  - Python
  - SQLAlchemy
  - MySQL
---

SQLAlchemy 同时提供 SQL 表达式工具包 Core 和对象关系映射 ORM。本文采用 SQLAlchemy 2.x 风格，以 MySQL 和 PyMySQL 为例，覆盖连接、模型、查询、事务、关系加载、批量写入和异步访问。

<!-- more -->

## 1. 安装与组件

```bash
python -m pip install "SQLAlchemy>=2.0,<3.0" PyMySQL
```

SQLAlchemy 不直接实现 MySQL 网络协议，而是通过 DBAPI 驱动访问数据库：

```text
应用代码 -> SQLAlchemy ORM/Core -> MySQL Dialect -> PyMySQL -> MySQL
```

主要对象：

| 对象 | 职责 |
|---|---|
| `Engine` | 管理方言、连接池和 SQL 执行入口 |
| `Connection` | 一次 Core 层数据库连接 |
| `Session` | ORM 工作单元，跟踪对象状态与事务 |
| `DeclarativeBase` | 声明 ORM 映射的基类 |
| `select()` 等表达式 | 以 Python 对象构建 SQL |

## 2. 创建 Engine

### 2.1 避免手工拼接 URL

密码包含 `@`、`/`、`:` 等字符时，手写字符串必须进行 URL 编码。使用 `URL.create()` 更稳妥：

```python
import os

from sqlalchemy import URL, create_engine

url = URL.create(
    drivername="mysql+pymysql",
    username=os.environ["DB_USER"],
    password=os.environ["DB_PASSWORD"],
    host=os.getenv("DB_HOST", "127.0.0.1"),
    port=int(os.getenv("DB_PORT", "3306")),
    database=os.environ["DB_NAME"],
    query={"charset": "utf8mb4"},
)

engine = create_engine(
    url,
    pool_pre_ping=True,
    pool_recycle=1800,
    echo=False,
)
```

- `pool_pre_ping=True` 在取出连接时检查它是否仍然可用。
- `pool_recycle` 可降低服务端空闲超时导致陈旧连接的概率，具体值应根据服务端和网络配置确定。
- `echo=True` 会打印 SQL，适合本地排查，不应无审查地用于生产环境。

`Engine` 通常在进程内创建一次并复用，不要为每个请求重新创建连接池。

### 2.2 验证连接

SQLAlchemy 2.x 执行文本 SQL 时需要显式使用 `text()`：

```python
from sqlalchemy import text

with engine.connect() as connection:
    version = connection.scalar(text("SELECT VERSION()"))
    print(version)
```

## 3. Typed Declarative 模型

```python
from __future__ import annotations

from datetime import datetime
from decimal import Decimal

from sqlalchemy import BigInteger, DateTime, ForeignKey, Numeric, String, func
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship


class Base(DeclarativeBase):
    pass


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    email: Mapped[str] = mapped_column(String(255), unique=True, nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=False),
        server_default=func.current_timestamp(),
        nullable=False,
    )

    orders: Mapped[list[Order]] = relationship(back_populates="user")


class Order(Base):
    __tablename__ = "orders"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), index=True)
    order_no: Mapped[str] = mapped_column(String(32), unique=True)
    amount: Mapped[Decimal] = mapped_column(Numeric(12, 2))

    user: Mapped[User] = relationship(back_populates="orders")
```

类型标注不仅服务于编辑器，也表达字段是否可空、关系是一对一还是一对多。数据库约束仍应由 `nullable`、`unique`、`ForeignKey`、`CheckConstraint` 等明确声明。

本地演示可直接建表：

```python
Base.metadata.create_all(engine)
```

生产项目应使用 Alembic 等迁移工具管理可审查、可回滚的结构变更，不要把 `create_all()` 当作迁移系统。

## 4. Session 与事务边界

`Session` 代表一次 ORM 工作单元，同时维护事务和对象身份映射。它不是全局缓存，也不应在并发请求之间共享。

```python
from sqlalchemy.orm import Session, sessionmaker

SessionFactory = sessionmaker(engine, expire_on_commit=False)

with SessionFactory() as session:
    with session.begin():
        user = User(name="Fuuka", email="fuuka@example.com")
        session.add(user)
```

内层 `session.begin()` 成功退出时提交，发生异常时回滚；外层上下文负责关闭 Session。

### 4.1 flush 不等于 commit

```python
with Session(engine) as session:
    with session.begin():
        user = User(name="Alice", email="alice@example.com")
        session.add(user)
        session.flush()
        print(user.id)
```

`flush()` 把待处理变更发送到数据库，因此可以取得自增主键，但事务尚未提交，之后仍可回滚。很多查询和提交前会自动触发 flush。

### 4.2 每次工作使用独立 Session

- Web 应用通常每个请求一个 Session。
- 后台任务通常每个任务或每个明确事务一个 Session。
- Session 及其 ORM 对象不适合在多个线程或异步任务间共享。
- 事务中不要夹杂耗时网络调用，避免长期占用连接和数据库锁。

## 5. SQLAlchemy 2.x 查询方式

### 5.1 按主键读取

```python
with Session(engine) as session:
    user = session.get(User, 1001)
```

`Session.get()` 会先检查当前 Session 的身份映射，适合主键读取。

### 5.2 select 与 scalars

```python
from sqlalchemy import select

stmt = (
    select(User)
    .where(User.email.like("%@example.com"))
    .order_by(User.id)
    .limit(20)
)

with Session(engine) as session:
    users = session.scalars(stmt).all()
```

SQLAlchemy 2.x 教程应以 `select()` 为主线，而不是旧式 `session.query()`。

### 5.3 选择部分列与连接

```python
stmt = (
    select(User.name, Order.order_no, Order.amount)
    .join(Order, Order.user_id == User.id)
    .where(Order.amount >= 100)
    .order_by(Order.amount.desc())
)

with Session(engine) as session:
    for name, order_no, amount in session.execute(stmt):
        print(name, order_no, amount)
```

### 5.4 聚合

```python
from sqlalchemy import func

stmt = (
    select(
        Order.user_id,
        func.count(Order.id).label("order_count"),
        func.sum(Order.amount).label("total_amount"),
    )
    .group_by(Order.user_id)
    .having(func.count(Order.id) >= 2)
)
```

表达式生成器会绑定参数，不要用字符串拼接用户输入。动态排序和列名也应通过白名单映射到模型属性。

## 6. 关系加载与 N+1

直接遍历关系属性可能触发每个用户一次额外查询：

```python
users = session.scalars(select(User)).all()
for user in users:
    print(user.orders)
```

这类 N+1 查询在数据量增加后会显著放大延迟。对于一对多关系，常用 `selectinload()` 批量加载：

```python
from sqlalchemy.orm import selectinload

stmt = (
    select(User)
    .options(selectinload(User.orders))
    .order_by(User.id)
)

users = session.scalars(stmt).all()
```

`joinedload()` 会把关系合并到同一查询，更适合某些多对一或一对一场景；用于集合时会增加结果行数。加载策略应根据关系基数和访问模式选择，并通过 SQL 日志或链路追踪验证。

## 7. 更新与删除

### 7.1 修改 ORM 对象

```python
with Session(engine) as session:
    with session.begin():
        user = session.get(User, 1001)
        if user is None:
            raise LookupError("user not found")
        user.name = "New Name"
```

### 7.2 集合更新

```python
from sqlalchemy import update

stmt = (
    update(User)
    .where(User.email == "old@example.com")
    .values(email="new@example.com")
)

with Session(engine) as session:
    with session.begin():
        result = session.execute(stmt)
        if result.rowcount != 1:
            raise RuntimeError("unexpected affected row count")
```

集合更新绕过逐对象业务逻辑。批量修改前应确认影响行数、并发语义和 Session 中是否已有相关对象。

## 8. 批量写入

```python
from sqlalchemy import insert

rows = [
    {"name": "Alice", "email": "alice@example.com"},
    {"name": "Bob", "email": "bob@example.com"},
]

with Session(engine) as session:
    with session.begin():
        session.execute(insert(User), rows)
```

批量接口可以减少 Python 对象构造和数据库往返，但不会自动执行所有逐对象事件。超大批次应分块提交，避免单个事务、内存和锁范围失控。

## 9. Core 与原生 SQL

复杂报表或数据库特有语法不必强行包装成 ORM 对象。可以使用 Core 表达式或明确的文本 SQL：

```python
from sqlalchemy import text

stmt = text(
    """
    SELECT order_no, amount
    FROM orders
    WHERE user_id = :user_id
      AND amount >= :min_amount
    ORDER BY id DESC
    LIMIT 20
    """
)

with engine.connect() as connection:
    rows = connection.execute(
        stmt,
        {"user_id": 1001, "min_amount": 100},
    ).mappings().all()
```

参数仍通过绑定传递。表名、列名和排序方向不能当作普通值参数绑定，动态生成这些结构时必须使用受控白名单。

## 10. 异步访问

安装异步 MySQL 驱动，例如：

```bash
python -m pip install asyncmy
```

```python
import os

from sqlalchemy import URL, select
from sqlalchemy.ext.asyncio import async_sessionmaker, create_async_engine

async_url = URL.create(
    drivername="mysql+asyncmy",
    username=os.environ["DB_USER"],
    password=os.environ["DB_PASSWORD"],
    host=os.getenv("DB_HOST", "127.0.0.1"),
    port=int(os.getenv("DB_PORT", "3306")),
    database=os.environ["DB_NAME"],
    query={"charset": "utf8mb4"},
)

async_engine = create_async_engine(async_url, pool_pre_ping=True)
AsyncSessionFactory = async_sessionmaker(
    async_engine,
    expire_on_commit=False,
)


async def list_users() -> list[User]:
    async with AsyncSessionFactory() as session:
        result = await session.scalars(
            select(User).order_by(User.id).limit(20)
        )
        return list(result)
```

一个 `AsyncSession` 只能服务一个并发任务。使用 `asyncio.gather()` 并发执行多个数据库任务时，每个任务都应创建自己的 `AsyncSession`。

异步 API 不会让数据库查询本身变快，它主要避免等待 I/O 时阻塞事件循环。连接池上限、数据库承载能力和事务边界仍然需要控制。

## 11. 常见问题

### 11.1 DetachedInstanceError

对象离开 Session 后又触发未加载属性，常会出现该异常。应在 Session 生命周期内完成所需加载，或用 `selectinload()` 等方式显式预加载，而不是长期保留 Session。

### 11.2 连接空闲后失效

启用 `pool_pre_ping`，并让 `pool_recycle` 与 MySQL、代理和网络设备的超时策略匹配。应用仍要对可重试的瞬时连接错误设置有限次数、带退避的重试。

### 11.3 查询结果为什么重复

连接一对多集合时，一条父记录会对应多条 SQL 结果行。使用 joined eager loading 集合后，通常需要按 SQLAlchemy API 要求调用 `unique()`；也可改用 `selectinload()`。

### 11.4 自动提交去了哪里

SQLAlchemy 2.x 的 `Connection` 和 `Session` 都强调显式事务边界。写入后应明确提交，推荐使用 `.begin()` 上下文，不依赖旧式 autocommit 行为。

## 12. 实践检查表

- 一个进程复用一个 `Engine`，一个工作单元使用一个 `Session`。
- 数据库凭据来自环境或密钥管理系统，不写入源码。
- 所有值使用参数绑定，动态结构使用白名单。
- 事务尽量短，异常路径能够回滚。
- 通过日志和追踪发现 N+1、慢 SQL 与连接池耗尽。
- 结构变更由迁移工具管理，并与应用发布顺序兼容。
- ORM 生成的慢 SQL 仍用数据库的[执行计划](./MySQL执行计划.md)和[调优流程](./Mysql调优.md)验证。

## 参考资料

- [SQLAlchemy 2.0 ORM Quick Start](https://docs.sqlalchemy.org/en/20/orm/quickstart.html)
- [SQLAlchemy 2.0 Session Basics](https://docs.sqlalchemy.org/en/20/orm/session_basics.html)
- [SQLAlchemy 2.0 MySQL and MariaDB Dialect](https://docs.sqlalchemy.org/en/20/dialects/mysql.html)
- [SQLAlchemy 2.0 AsyncIO](https://docs.sqlalchemy.org/en/20/orm/extensions/asyncio.html)
