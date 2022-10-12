<template><div><h1 id="数据库-database" tabindex="-1"><a class="header-anchor" href="#数据库-database" aria-hidden="true">#</a> 数据库:(DataBase):</h1>
<p>这部分参考博客吧，实在是懒得记录，效率太低： <a href="https://www.cnblogs.com/wupeiqi/articles/5713315.html" target="_blank" rel="noopener noreferrer">https://www.cnblogs.com/wupeiqi/articles/5713315.html<ExternalLinkIcon/></a></p>
<h2 id="mysql-数据库" tabindex="-1"><a class="header-anchor" href="#mysql-数据库" aria-hidden="true">#</a> MySQL 数据库：</h2>
<h3 id="_1-window-环境" tabindex="-1"><a class="header-anchor" href="#_1-window-环境" aria-hidden="true">#</a> 1.window 环境：</h3>
<ul>
<li>
<p>在 MYSQL 数据库下的 bin 目录里面的便是 MYSQL 的可执行程序。</p>
</li>
<li>
<p>在 bin 目录下运行 mysqld：开启 mysql 的 socket。因此多种语言（例如:JAVA、Python、C#、Ruby、PHP 等等）可以写对应的 socket 进行数据库
的连接。</p>
</li>
<li>
<p>因此：数据库的服务器端运行起来就是一个 socket server。之后就是启动客户端去连接服务端。</p>
</li>
<li>
<p>认证连接后发送命令，数据库便可执行对应的命令。MySql 也提供了自己的一个连接 socket，在 bin 下运行 mysql 便可开启。</p>
</li>
<li>
<p>mysql -u root -p：u 表示用户名，p 表示出 password，root 初始化不设置密码，直接回车即可。</p>
</li>
</ul>
<h4 id="弄-windows-的都明白-为了解决-mysqld-hold-住问题" tabindex="-1"><a class="header-anchor" href="#弄-windows-的都明白-为了解决-mysqld-hold-住问题" aria-hidden="true">#</a> 弄 Windows 的都明白：（为了解决 mysqld hold 住问题）</h4>
<p>在后台（任务管理器）有 Windows 服务。（比如看片中毒的程序在后台运行篡改数据，这东西怎么制作呢————就制作一个 mysql 服务）若把 mysqld 搞成
一个 Windows 服务，每次启动则会自动启动。</p>
<ul>
<li>
<p>利用 mysqld --install 命令运行 （我的反馈拒绝，正常的是成功）Install/Remove of the Service Denied!</p>
</li>
<li>
<p>之后利用 net start/stop mysql 即可启动/关闭</p>
</li>
</ul>
<h3 id="_2-linux-环境" tabindex="-1"><a class="header-anchor" href="#_2-linux-环境" aria-hidden="true">#</a> 2.linux 环境</h3>
<h4 id="安装" tabindex="-1"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> 安装：</h4>
<pre><code>yum install mysql-server
　
</code></pre>
<h4 id="服务端启动" tabindex="-1"><a class="header-anchor" href="#服务端启动" aria-hidden="true">#</a> 服务端启动：</h4>
<pre><code>CentOS7：
systemctl start mysqld
</code></pre>
<h4 id="客户端连接" tabindex="-1"><a class="header-anchor" href="#客户端连接" aria-hidden="true">#</a> 客户端连接：</h4>
<p>连接：</p>
<pre><code>mysql -h host -u user -p    # mysql -h 127.0.0.1 -u root -p
</code></pre>
<p>常见错误：</p>
<pre><code>ERROR 2002 (HY000): Can't connect to local MySQL server through socket '/tmp/mysql.sock' (2), it means that
the MySQL server daemon (Unix) or service (Windows) is not running.
</code></pre>
<p>退出：</p>
<pre><code>QUIT 或者 Control+D
</code></pre>
<h2 id="一、数据库操作" tabindex="-1"><a class="header-anchor" href="#一、数据库操作" aria-hidden="true">#</a> 一、数据库操作：</h2>
<pre><code>默认数据库：
　　mysql - 用户权限相关数据
　　test - 用于用户测试数据
　　information_schema - MySQL本身架构相关数据

基本操作：
    show databases;                 #查看MySql都有那些数据库（根目录有那些文件夹）

    create database 数据库名;        #创建数据库（创建文件夹）

    use 数据库名;                    #使用选中数据库（进入选中目录）通常创建utf8类型的 参考博客

    show tables;                    #查看当前数据库下有那些表（有哪些文件）

    create table 表名(nid int,name varchar(20),pwd varchar(64)); varchar:表示字符串。20:表示最长为20个字符，超过则截取前20个
                                    #创建数据库表
    select * from 表名;             #查看表中所有数据

    insert into 表名(nid,name,pwd) values(1,&quot;zz&quot;,&quot;123&quot;);   #插入数据

    drop table tb1;                #直接删除表

    delete from tb1;               #清空表内容（对于自增来说，即使清空，也保留了之前的自增号，从下一自增号开始）

    truncate table tb1;            #清空表内容（对于自增，彻底清空，下次插入数据从1开始）

    show variables like 'max_connections';    #查询数据库的最大连接数

用户&amp;授权：
    MySql数据库下有一个默认创建好的用户表user
    可以利用select * from user;查看user表的所有数据（乱码）。用desc user;查看user表中的各个字段。
    利用select host,user from user;查看user表中的host字段数据和user字段数据。
    数据库的user虽然可以用insert 来创建用户，但是不推荐。用户管理有一些特殊的命令。

    用户管理：
        创建用户
            create user '用户名'@'IP地址' identified by '密码';    如（create user &quot;igarashi&quot;@&quot;localhost&quot; identified by &quot;123&quot;）下略
        删除用户
            drop user '用户名'@'IP地址';
        修改用户
            rename user '用户名'@'IP地址'; to '新用户名'@'IP地址';;
        修改密码
            set password for '用户名'@'IP地址' = Password('新密码')
        -h :登录时设置输入ip地址

    权限管理：
        grant  权限 on 数据库.表 to  '用户'@'IP地址'      -- 授权   如grant select on test.tb1 to &quot;igarashi&quot;@&quot;localhost&quot;;
        若远程管理连接只需要，创建对应ip地址的用户，并进行授权，用户便可以在远程进行连接 fuuka@192.168.1.12 即可在对应ip下登录

        MySql有通配符：
            用户名@IP地址         用户只能在该IP下才能访问
            用户名@192.168.1.%   用户只能在该IP段下才能访问(通配符%表示任意)（注意创建用户时记得加“”因为%不能特殊存在）
            用户名@%             用户可以再任意IP下访问(默认IP地址为%)
            注：远程客户端连接登录时 mysql -u 用户名 -h ip地址 -P 3306（默认端口，不写也有） -p 输入密码

        查询权限：
            select * from mysql.user  （即可看到改数据库中的所有权限相关信息）

    相关权限：
        参考博客

    特殊的：
        flush privileges，将数据读取到内存中，从而立即生效。（刷新权限）

    忘记密码：
        # 启动免授权服务端
            mysqld --skip-grant-tables

        # 客户端
            mysql -u root -p

        # 修改用户名密码
            update mysql.user set authentication_string=password('666') where user='root';
            flush privileges;
</code></pre>
<h2 id="二、数据表基本操作" tabindex="-1"><a class="header-anchor" href="#二、数据表基本操作" aria-hidden="true">#</a> 二、数据表基本操作：</h2>
<pre><code>1、创建表：
    create table 表名(
        列名  类型  是否可以为空，
        列名  类型  是否可以为空
    )ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8

    ENGINE：是用InnoDB 还是 MyISAM：
    MyISAM：支持全文索引，即速度非常快。
    InnoDB：InnoDB虽然慢一点，但是它支持事务。
    什么是事务、原子操作：原子操作即不能分割的操作。例如转账（减钱、加钱两个动作），不能让它转一半断电数据丢失，因此把它作为原子操作，
        断电就回退原来状态。把两个动作叠加在一起，称之为一个事务，并且认为是原子性操作。回滚。

    是否可空，null表示空，非字符串
        not null    - 不可空
        null        - 可空

    默认值，创建列时可以指定默认值，当插入数据时如果未主动设置，则自动添加默认值
        create table tb1(
            nid int not null defalut 2,
            num int not null
        )

    自增，如果为某列设置自增列，插入数据时无需设置此列，默认将自增（表中只能有一个自增列）
        create table tb1(
            nid int not null auto_increment primary key,
            num int null
        )

    注意：1、对于自增列，必须是索引（含主键）。
          2、对于自增可以设置步长和起始值

    修改自增列：如修改users表的自增id为123456
        alter table users AUTO_INCREMENT=123456;

    主键，primary key一种特殊的唯一索引，不允许有空值，如果主键使用单个列，则它的值必须唯一，如果是多列，则其组合必须唯一。
        nid int not null auto_increment primary key    或   primary key(nid,num)

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
</code></pre>
<h2 id="三、数据类型-数值、时间、字符串" tabindex="-1"><a class="header-anchor" href="#三、数据类型-数值、时间、字符串" aria-hidden="true">#</a> 三、数据类型：（数值、时间、字符串）</h2>
<pre><code>    [M]:表示总长度（例如：二进制位有多长）超出长度就报错
    [D]:表示小数位总长度（如decimal的m为50，d为30）
    char：定长查找速度快，但浪费空间
    二进制数据：
        TinyBlob、Blob、MediumBlob、LongBlob（专门存二进制数据的，比如图片、视频，若非要保存在数据库中，用read rb以二进制方式读取它）
        但一般没人这么干，通常上传图片、视频，都是把上传的东西以文件的形式保存到本地目录（硬盘中），而数据库中只保存一个路径。
        因此一般用varchar(65)这种方式，把文件存在某个硬盘（D:\1.avi）因此以后要的话就通过数据库把文件路径拿走再open打开即可。

    enum:（枚举）
        若想知道星期几，先可以建立一个对应关系：比如x对应星期一，y对应星期二。。。（类似字典）
        Enum week:
            x = &quot;星期一&quot;
            y = &quot;星期二&quot;
            z = &quot;星期三&quot;
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
</code></pre>
<h2 id="四、数据表内容操作-重点-精通" tabindex="-1"><a class="header-anchor" href="#四、数据表内容操作-重点-精通" aria-hidden="true">#</a> 四、数据表内容操作：（重点，精通，<strong>***</strong>）</h2>
<pre><code>1、增：
    insert into 表 (列名,列名...) values (值,值,值...)
    insert into 表 (列名,列名...) values (值,值,值...),(值,值,值...)（插入多条数据）
    insert into 目标表 (列名,列名...) select 列名,列名... from 另一张表 （把另外一张表的数据（可选列）全部导入目标表里）
        若两表中的数据类型不同（能够类型转换的）则会转换，不然报错 当然后面还可以接where nid&gt;2 and..之类的

2、删：
    delete from 表
    delete from 表 where id＝1 and name＝'alex'

3、改：
    update 表 set name ＝ 'igarashi' where id&gt;1 and 1=1 ...
    UPDATE 表 set `init_service_num` = `service_num`;    --令表中的一列等于表中的另一列

4、查：
    select * from 表
    select * from 表 where id &gt; 1
    select nid,name,gender as gg from 表 where id &gt; 1
    注：尽量不要用select *，因为select *的效率低，最好是把要查找的数据都写一遍。

5、其他：（必须熟）
    a、条件：
        select * from 表 where id &gt; 1 and name != 'alex' and num = 12;

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
        select num,nid from 表  where nid &gt; 10 group by num,nid order by nid desc
        select num,nid,count(*),sum(score),max(score),min(score) from 表 group by num,nid（利用聚合函数进行分组取值）
        max：表示取最大值
        min：最小值
        sum：取和，比如再取成绩之和时
        count：计数，计算出现的次数
        avg：平均数
        （注意这些聚合函数是在查询列时运用的）

        当写select count(nid),part from userinfo where count(nid)&gt;2 group by part;会报错，这是因为group by是后执行。此时part还
        尚未分组，因此count（nid）无法获取。所以如下：（若想对聚合后的列进行操作）

        select num from 表 group by num having max(id) &gt; 10（在根据聚合函数的结果进行筛选时，where条件无法使用，因此用having）

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
</code></pre>
</div></template>


