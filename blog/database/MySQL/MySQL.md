---
title: MySQL
date: 2018-03-21
category:
  - 数据库
tag:
  - MySQL
---

**MySQL**，烂大街的关系型数据库，但我依然没有学好

<!-- more -->

## 1. 安装

::: tabs

@tab CentOS

```shell
# 安装
yum install mysql-server -y

# 启动
systemctl start mysqld

# 连接 mysql -h host -u user -p password
mysql -h 127.0.0.1 -u root -p

# 常见错误
ERROR 2002 (HY000): Can't connect to local MySQL server through socket '/tmp/mysql.sock' (2), it means that
the MySQL server daemon (Unix) or service (Windows) is not running.

# QUIT 或者 Control + D
```

@tab Window

**bin目录：** **MYSQL** 数据库下 **bin** 目录是 **MYSQL** 的可执行程序

- 在 **bin** 目录下运行 `mysqld` 开启 **mysql** 的 **socket**，因此多种语言（*如  **JAVA**、**Python**、**C#**、**Ruby**、**PHP** 等等*）可以写对应的 **socket** 进行数据库的连接

- 数据库的服务器端运行起来就是一个 **socket server** ，之后启动客户端去连接服务端

- 认证连接后发送命令，数据库便可执行对应的命令。**MySql** 也提供了自己的一个连接 **socket**，在 **bin** 下运行 **mysql** 便可开启。

**连接：**

```powershell
$ mysql -u root -p
#  -u: 用户名
#  -p: password
# root 初始化不设置密码，直接回车即可
```

把 **mysqld** 搞成一个 **windows** 服务（*任务管理器 - 服务*）每次开机会自动启动

-  `mysqld --install` 命令运行 `Install/Remove of the Service Denied!`

- 用 `net start/stop mysql` 即可启动/关闭

:::

## 2. 用户权限

##### **默认数据库如下** 

- **mysql：** 用户权限相关数据
- **test：** 用于用户测试数据
- **information_schema：** **MySQL** 本身架构相关数据

##### **数据库简单使用** 

```shell
# 查看 MySQL 有那些数据库
$ show databases;

# #创建数据库 order （通常创建 utf-8 的）
$ create database order;

# 选则进入 order 数据库
$ use order;

# 创建 order 数据库中 的 user 表
$ create table user(nid int, name varchar(20), pwd varchar(64));
	- `varchar(20):` "表示最长为20的字符串，超过则截取前20个"

# 查看 order 数据库下，有那些表
$ show tables;


# 查看 user 表中所有数据
select * from user;

# 向 user 表插入一条数据
insert into user(nid, name, pwd) values(1, "zz", "123");

# 清空 user 表内容
delete from user;
`对于自增来说，即使清空，也保留了之前的自增号，从下一自增号开始`

# 清空 user 表内容
truncate table user;
`对于自增，也彻底清空，下次插入数据从 1 开始`

# 删除 user 表
drop table user;

# 查询数据库的最大连接数
show variables like 'max_connections';    
```

##### 用户&授权:

**MySQL** 有默认创建好的用户表 **user**， 虽然可以用 `insert` 来创建用户，但不推荐

```shell
# 查看user表的所有数据（乱码）
$ select * from user;

# 查看user表中的各个字段详情
$ desc user;

# 查看user表中的host字段数据和user字段数据
$ select host,user from user;

# 查询权限，可看到数据库中所有权限相关信息
$ select * from mysql.user;
```

##### 用户管理：

```shell
# 创建用户
$ create user '用户名'@'IP地址' identified by '密码';    
`如（create user "igarashi"@"localhost" identified by "123"）下略`

# 删除用户
$ drop user '用户名'@'IP地址';

#修改用户
$ rename user '用户名'@'IP地址'; to '新用户名'@'IP地址';

# 修改密码
$ set password for '用户名'@'IP地址' = Password('新密码')
	-h : # 登录时设置输入 IP 地址
```

##### 权限管理:

```shell
# 授权
$ grant 权限 on 数据库.表 to  '用户'@'IP地址'

如 grant select on test.tb1 to "igarashi"@"localhost";

# 若远程管理连接, 只需要创建 对应IP地址 的用户，并进行授权
$ grant select on test.tb1 to "igarashi"@"192.168.1.12";
` 即可让用户 fuuka 远程在 192.168.1.12 上登录 `
```

 **通配符**

- **用户名@IP地址 :** 用户只能在 该 **IP** 下 访问

- **用户名@192.168.1.% :**   用户只能在 该 **IP** 段 下访问（***%** 表示任意，创建时需用 "" 号，**%** 是特殊字符*）

- **用户名@% :**  用户可在 任意 **IP** 下访问 （*默认值*）

- 远程客户端连接登录命令如下

     ```shell
     $ mysql -u "username" -h "ip addr" -P 3306 -p "passwd"
     # 3306 默认值，修改自配的端口号
     
     
     ```

##### 其他：

```shell
# 刷新权限，将数据读取到内存中，使其立即生效
$ flush privileges;

# 若忘记密码： 启动免授权服务端，跳过数据库权限验证, 或是去修改 my.ini
$ mysqld --skip-grant-tables

# 继续客户端输入
$ mysql -u root -p "任意"

# 修改用户名密码
$ use mysql
$ update mysql.user set authentication_string=password('user@dev') where user='root';

$ flush privileges;
```

## 3. 常用操作

#### 创建表

```mysql
create table 表名(
    列名  类型  是否可以为空，
    列名  类型  是否可以为空
)ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8
```

- **ENGINE：** 数据库引擎， **InnoDB** 还是 **MyISAM**
  - **MyISAM:** 支持 **全文索引**，速度快
  - **InnoDB: ** 支持 **事务**, 速度慢
- **事务：** 原子操作，即 **不能分割** 的操作，如：**转账**（*减钱、加钱*）不能转一半断电数据丢失，因此断电要回退原来状态，**把多个动作叠加在一起，称之为一个事务**
- **是否可空：**
  - **not null：** 不可空
  - **null：** 可空

```mysql
create table tb1(
    nid int not null defalut 2,
    num int not null
)
```

- **default：** 默认值，创建可指定，插入数据若未设置，则自动使用默认值

##### **主键自增：** 

```mysql
create table tb1(
    nid int not null auto_increment primary key,
	num int null
)
```

- **auto_increment：** 自增，若某列设为自增列，插入无需再次指定，此列会自增（*表中只能有一个自增列* ）对于自增列：

  - **必须是索引**（*含主键*）
  - 可以设置 **步长** 和 **起始值**

- 修改自增列

  ```mysql
  -- 修改 users 表 自增 id 为 123456
  alter table users AUTO_INCREMENT=123456;
  ```

- **primary key：** 主键，特殊的 **唯一索引**，**不允许有空值**，若主键使用：

  - **单个列：** 则它的 **值 必须唯一** 
  - **多列：** 则其 **组合 必须唯一** 

  ```mysql
  create table tb1(
      nid int not null auto_increment primary key, -- or primary key(nid,num) 
  	...
  ```

##### **约束（联合）唯一：**

**与主键约束相似** ，都可以 **确保列的唯一性**，不同的是，唯一约束在一个表中 **可有多个** ，设置唯一约束的列允许有空值，但也 **仅有一个空值** 

```mysql
CREATE TABLE `textbook_edition` (
    `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT ' 默认 id',
    列名 类型 unsigned NOT NULL DEFAULT '1' COMMENT 'XX',
    PRIMARY KEY (`id`), 										-- 设置主键
    UNIQUE KEY `idx_grade_subject` (`grade_type`,`subject`) 	-- 设置联合唯一
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COMMENT='XX表';
```

- UNIQUE KEY

##### **索引：**

用来 **快速查找** 出在一个列上 **用一特定值** 的行，无索引则会顺序遍历（*表越长越耗时* ） 

::: tip

所有的 **MySQL 索引** （***PRIMARY**、**UNIQUE** 和 **INDEX*** ）是在 **B树** 中存储

:::

    
        外键，foreign key一个特殊的索引，只能是指定内容（一般对两个表有关系的列进行约束，一个表的外键通常是另一表的主键）
            constraint fk_cc foreign key (color_id) references color(nid) （constraint后面接的是 外键的标签）
    
        例：建表时创建联合唯一：
            CREATE TABLE `textbook_edition` (
              `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT ' 默认 id',
              列名 类型 unsigned NOT NULL DEFAULT '1' COMMENT 'XX',
              PRIMARY KEY (`id`), -- 设置主键
              UNIQUE KEY `idx_grade_subject` (`grade_type`,`subject`) -- 设置联合唯一
            ) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COMMENT='XX表';
    
        修改表名：
            ALTER TABLE 表名 RENAME [TO|AS] 新表名
    
    2.修改表：
        添加列：alter table 表名 add 列名 类型
        删除列：alter table 表名 drop column 列名
        修改列：
                alter table 表名 modify column 列名 类型;  -- 类型
                alter table 表名 change 原列名 新列名 类型; -- 列名，类型
    
        添加主键：
                alter table 表名 add primary key(列名);
        删除主键：
                alter table 表名 drop primary key;
                alter table 表名  modify  列名 int, drop primary key;
    
        添加外键：alter table 主表 add constraint 外键名称（形如：FK_主表_从表） foreign key 主表(外键字段) references 从表(主键字段);
        删除外键：alter table 表名 drop foreign key 外键名称
        （添加外键之后两张表便有了约束，多为一对多关系）
        这也是为了满足第三范式，并且防止脏数据的产生，但人为的话若依出错，干脆加个外键约束，则每次插入就不用担心
    
        添加联合唯一：ALTER TABLE 表名 ADD UNIQUE INDEX(列名1,列名2...);
        删除索引：ALTER TABLE `table_name` DROP INDEX `column`;
    
        修改默认值：ALTER TABLE testalter_tbl ALTER i SET DEFAULT 1000;
        删除默认值：ALTER TABLE testalter_tbl ALTER i DROP DEFAULT;
    
    3.查看表结构
        desc 表名;  查看某个表的完整的表结构

## 三、数据类型：（数值、时间、字符串）

        [M]:表示总长度（例如：二进制位有多长）超出长度就报错
        [D]:表示小数位总长度（如decimal的m为50，d为30）
        char：定长查找速度快，但浪费空间
        二进制数据：
            TinyBlob、Blob、MediumBlob、LongBlob（专门存二进制数据的，比如图片、视频，若非要保存在数据库中，用read rb以二进制方式读取它）
            但一般没人这么干，通常上传图片、视频，都是把上传的东西以文件的形式保存到本地目录（硬盘中），而数据库中只保存一个路径。
            因此一般用varchar(65)这种方式，把文件存在某个硬盘（D:\1.avi）因此以后要的话就通过数据库把文件路径拿走再open打开即可。
    
        enum:（枚举）
            若想知道星期几，先可以建立一个对应关系：比如x对应星期一，y对应星期二。。。（类似字典）
            Enum week:
                x = "星期一"
                y = "星期二"
                z = "星期三"
            print week.x ————————因此以后想引用直接通过这种方式
            在例如FTP中的对应数字1003：未授权之类的 ————unauth = 2003
            示例：
                CREATE TABLE shirts (
                    name VARCHAR(40),
                    size ENUM('x-small', 'small', 'medium', 'large', 'x-large')
                );（表示以后插入数据只能是枚举中的某一个，不然报错）
                INSERT INTO shirts (name, size) VALUES ('dress shirt','large'), ('t-shirt','medium'),('polo shirt','small');
    
        set:（集合）
            示例：
                CREATE TABLE myset (col SET('a', 'b', 'c', 'd'));（与枚举不同的是，set可以插入多个集合内的数据）
                INSERT INTO myset (col) VALUES ('a,d'), ('d,a'), ('a,d,a'), ('a,d,d'), ('d,a,d');


        其他详细参考博客

## 四、数据表内容操作

    1、增：
        insert into 表 (列名,列名...) values (值,值,值...)
        insert into 表 (列名,列名...) values (值,值,值...),(值,值,值...)（插入多条数据）
        insert into 目标表 (列名,列名...) select 列名,列名... from 另一张表 （把另外一张表的数据（可选列）全部导入目标表里）
            若两表中的数据类型不同（能够类型转换的）则会转换，不然报错 当然后面还可以接where nid>2 and..之类的
    
    2、删：
        delete from 表
        delete from 表 where id＝1 and name＝'alex'
    
    3、改：
        update 表 set name ＝ 'igarashi' where id>1 and 1=1 ...
        UPDATE 表 set `init_service_num` = `service_num`;    --令表中的一列等于表中的另一列
    
    4、查：
        select * from 表
        select * from 表 where id > 1
        select nid,name,gender as gg from 表 where id > 1
        注：尽量不要用select *，因为select *的效率低，最好是把要查找的数据都写一遍。
    
    5、其他：（必须熟）
        a、条件：
            select * from 表 where id > 1 and name != 'alex' and num = 12;
    
            select * from 表 where id between 5 and 16;
    
            select * from 表 where id in (11,22,33)
            select * from 表 where id not in (11,22,33)
            select * from 表 where id in (select nid from 表)
    
        b、通配符：
            select * from 表 where name like 'ale%'  - ale开头的所有（多个字符串）
            select * from 表 where name like 'ale_'  - ale开头的所有（一个字符）
    
        c、限制：分页（比如打印多少个数据）
            select * from 表 limit 5;            - 前5行
            select * from 表 limit 4,5;          - 从第4行之后的5行
            select * from 表 limit 5 offset 4    - 从第4行之后的5行————推荐使用（与上写法相反，但功能一样）
    
        d、排序：
            select * from 表 order by 列 asc              - 根据 “列” 从小到大排列（a,b,c,d从小到大）
            select * from 表 order by 列 desc             - 根据 “列” 从大到小排列（d,c,b,a从大到小）
            select * from 表 order by 列1 desc,列2 asc    - 根据 “列1” 从大到小排列，如果相同则按列2从小到大排序
                （前一次排序出现列相同则按第二次顺序再排）
    
        e、分组：（重点，想让数据根据某列进行分组）
            select num from 表 group by num（通过分组来按组取出num，把重复的数据整合）
            select num,nid from 表 group by num,nid（大致同上）
            select num,nid from 表  where nid > 10 group by num,nid order by nid desc
            select num,nid,count(*),sum(score),max(score),min(score) from 表 group by num,nid（利用聚合函数进行分组取值）
            max：表示取最大值
            min：最小值
            sum：取和，比如再取成绩之和时
            count：计数，计算出现的次数
            avg：平均数
            （注意这些聚合函数是在查询列时运用的）
    
            当写select count(nid),part from userinfo where count(nid)>2 group by part;会报错，这是因为group by是后执行。此时part还
            尚未分组，因此count（nid）无法获取。所以如下：（若想对聚合后的列进行操作）
    
            select num from 表 group by num having max(id) > 10（在根据聚合函数的结果进行筛选时，where条件无法使用，因此用having）
    
            特别的：group by 必须在where之后，order by之前
    
        f、连表：（非常重要，查找两表有对应关系[例如：外键]数据则可以进行连表）
            1.无对应关系则不显示：(条件连表一)
            select A.num, A.name, B.name
            from A,B
            用这种方式去普通查询两表数据，会显示为笛卡尔积，单纯的吧两表的数据进行相乘，大量垃圾数据出现。
            #Where A.nid = B.nid（加上对应关系则会正常显示）
    
            2.无对应关系则不显示:(条件连表二)————与上加条件相同只是写法不一样
            select A.num, A.name, B.name
            from A inner join B（inner：表示互相迁就，对left的数据进行过滤，有为null的数据进行清空，永远不会出现null）
            on A.nid = B.nid（这里条件用on，类似where）
    
            3.A表所有显示，如果B中无对应关系，则值为null：（用join进行连表操作，可以left join、right join）
            select A.num, A.name, B.name
            from A left join B
            on A.nid = B.nid（A表有的数据B表没有对应数据则显示NULL）
    
            4.B表所有显示，如果B中无对应关系，则值为null：（以后用连表操作优先用left outer join,因为效率高）
            select A.num, A.name, B.name
            from A right join B
            on A.nid = B.nid
    
        g、组合：（想让多个表的某列数据进行组合）
            组合，自动处理重合
            select nickname
            from A
            union
            select name
            from B
    
            组合，不处理重合
            select nickname
            from A
            union all（加all则查找两表的全部数据）
            select name
            from B
