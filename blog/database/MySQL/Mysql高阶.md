---
title: Mysql高阶
order: 3
---

5、函数：（不太重要）
MySQL 中提供了许多内置函数，例如：见博客
CHAR*LENGTH(str)：获取字符串长度 select char_length("igarashi")
CONCAT(str1,str2,...)：字符串拼接 select concat("igarashi","xx","123")
CONCAT_WS(separator,str1,str2,...)：字符串拼接（自定义连接符）类似"*".join select concat*ws("*","3","a") ###后面懒得写，见博客
创建函数：
delimiter \\
create function f1(i1 int,i2 int) --函数的参数
returns int --多了返回值 数字类型，相当于 java 的 public int func() 指定返回类型
BEGIN
declare num int;
set num = i1 + i2;
return(num);
END \\
delimiter ;

        函数内部无法写sql语句，用return返回（与存储过程的区别）
        虽然sql不允许，但其中支持：
            declare a int;
            select nid into a from student where name = "igarashi"  --虽然内部不能根据sql语句获取表，但可以获取单个数据进行赋值

        应用场景：
            用select nid+100... from student 把所有nid都拿到，现在让他们都加100*20/5...
            此时有函数的的话就直接把需要的封装到函数里面，之后把nid传入 select func(nid) from student 即可

    执行函数：（通常用select调用）
         获取返回值：
            declare @i VARCHAR(32);
            select UPPER('alex') into @i;
            SELECT @i;

        # 在查询中使用：
            select f1(11,nid) ,name from tb2;

    删除函数：
        drop function func_name;

6、索引：（nb 的存在，必须掌握）
为什么要有 DBA，因为 DBA 要写索引。命中索引之后，查询速度回非常非常快（成百万级别的倍数）。可能你写一个要 10 秒拿到数据，DBA 写了就 0.00 几秒。
索引，是数据库中专门用于帮助用户快速查询数据的一种数据结构。类似于字典中的目录，查找字典内容时可以根据目录查找到数据的存放位置，然后直接获取即可。

    索引有两类功能：
        1.做约束（主键、外键、唯一、普通、组合...）
        2.加速查找 （天差地别）

    为什么索引可以这么快：
        用的最多的是B-tree索引。正常情况下，一张表做查询时是全表扫描。当做索引时会创建一个新的数据结构（例如B+树结构）
        比如对name列建索引。 它会创建一个文件，把name列的所有数据拿出来。
        之后把数据转为对应的数字（就像ord("a")ascii那样类似的）30、10...    之后按如下方式（二叉）排列：
        name = "igarashi" => 6  之后可能进行数的二分法判断之类的事。。（算第一个）4次找到
                                                30

                                    10                        40

                               5         15            35             66（硬盘：位置、位置、位置）

                            1   6     11    19      21      39     55     100（数据表当前行数据在硬盘上的位置）

        若有1到100个数字，按照普通情况，最慢要100次才能找到，而用B+树的代价则大大降低。
        若给1024个数据即2**10次方，那么10次左右找到。若2**20 1048576个数据时20次左右找到————因此就像字典一样，都是按照索引的形式在目录找

        还有哈希索引，因为在innodb或MyISAM里面根本不支持，因此通常用B+

    索引的种类：
        普通索引：-加速查找 （唯一一个功能，只有B+结构）（普通索引则可以重复，比如66存多个位置）
        唯一索引：-加速查找，约束列数据不能重复（比如用户名列加了唯一，若想重复即报错，可以有null）
        主键索引：-加速查找，约束列不能重复，不能为null
        组合索引：-多列可以创建一个索引文件
            -联合唯一 加速查找...

    弊端：创建索引会占用资源，查找时虽然快了，但插入、更新、删除时慢了

    什么时候需要创建索引：若数据表需要频繁的做增删改，那么就不要建立索引。

    几百万数据量建立索引的话，创建索引的速度也会很慢。（每次都有把表里的数据拿出来计算，会十分耗时）因此这种操作不会再白天做（夜深人静时）
        DBA做分表、移库、备份的时候也是这样，要在后半夜干事。

    1、普通索引：（不能约束）
        普通索引仅有一个功能：加速查询  （创建有两种方式）

        创建表时便创建完毕：
            create table in1(
                nid int not null auto_increment primary key,
                name varchar(32) not null,
                email varchar(64) not null,
                extra text,
                index ix_name (name) --通过index关键字，给某一列创建索引
            )
        创建后续进行创建：
            create index index_name on table_name(column_name) --为那个表的那一列创建索引

        删除索引：
            drop index_name on table_name;

        查看索引：
            show index from table_name;     --能看到是是index_type:BTREE

        注意：对于创建索引时如果是BLOB 和 TEXT 类型，必须指定length。
            create index ix_extra on in1(extra(32));

    2.唯一索引：（和上面是一个包含关系）
        唯一索引有两个功能：加速查询 和 唯一约束（可含null）
        创建唯一索引：
            create table in1(
                nid int not null auto_increment primary key,
                name varchar(32) not null,
                email varchar(64) not null,
                extra text,
                unique ix_name (name) --此处不再是index，而是unique
            )

            create unique index 索引名 on 表名(列名)

        删除唯一索引：
            drop unique index 索引名 on 表名

    3、主键索引：（最nb的所有，是上面的集合）
        主键有两个功能：加速查询 和 唯一约束（不可含null）
        创建主键索引：
            create table in1(
                nid int not null auto_increment primary key, --其实只要写了primary key 就直接创建了主键索引
                name varchar(32) not null,
                email varchar(64) not null,
                extra text,
                -- or  primary key(nid),
                index ix_name (name)
            )
        创建主键：
            alter table 表名 add primary key(列名);

        删除主键：
            alter table 表名 drop primary key;
            alter table 表名  modify  列名 int, drop primary key;

    4、组合索引
        组合索引是将n个列组合成一个索引。普通组合索引无约束。

        其应用场景为：频繁的同时使用n列来进行查询，如：where n1 = 'alex' and n2 = 666。
        创建表：
            create table in3(
                nid int not null auto_increment primary key,
                name varchar(32) not null,
                email varchar(64) not null,
                extra text
                -- index ix_name (name,email) --普通情况只是一个索引，若再添加则变为组合索引。unique也相同
            )

        创建组合索引：
            create index ix_name_email on in3(name,email);

        组合索引查询规则：————最左匹配  （如上创建组合索引之后，查询：）
            select * from tb1 where name = "igarashi" 此时会走索引，快。
            select * from tb1 where name = "igarashi" and email = "123" 也会走索引。
            select * from tb1 where email = "123" 不会走索引。

            因此建立在前者生效：若三列索引(name,pwd,email)
            name and pwd、email    -- 使用索引
            name                   -- 使用索引
            pwd、email             -- 不使用索引
        因此以后建立索引但还是慢（即没有命中），那么它可能是按照最左匹配的原则没有生效。

        注意：对于同时搜索n个条件时，组合索引的性能好于多个单一索引合并。

        联合唯一索引：
            当利用unique进行组合索引时，只是成为联合唯一索引 unique ix_name (name,email)此时这两个必须唯一，而不再是name唯一。就是说
            两个只要有一个不同都算不同，单列可相同。

    5.覆盖索引：
        覆盖索引不是真实存在的，只是若按照某个模式搜的，这种模式叫覆盖索引。
        当：
            select * from tb where nid = 1  --此时是两部操作
            1.先去索引中找
            2.再去数据表中找
        但：
            select nid from tb where nid < 10   --此时还需要去数据表中找吗
            不需要，直接取索引中即可拿到

        --只需要在索引表中就能获取数据时，此时称为覆盖索引。

    6.合并索引：
        nid     name(单独索引)    email(单独索引)    pwd
        假设，给一张数据表的两列做了两个单独的索引，那么用两个单独的索引找和一个索引找一样吗
        即：
            select * from tb where name = "igarashi"
            select * from tb where email = "igarashi@163.com" --这种则是单独的索引

            select * from tb where name = "igarashi" or email = "igarashi@163.com"
            --若出现这种情况吧两个单独的索引合并起来查找，此时称为合并索引

        此时若让他们进行一个组合索引
        nid     name(组)    email(合)    pwd
        即：
            select * from tb where naem = "igarashi"
            select * from tb where email = "igarashi@163.com" --不走索引，最左前缀。组合索引短板。

            select * from tb where name = "igarashi" or email = "igarashi@163.com"
            --此时利用组合索引同样达到效果

        下面的组合索引占用空间比两个单索引占用空间要少，但第二条查询无法命中

        用户表：（组合索引和合并索引的取舍）
            nid     username    password
             1      igarashi       233
             2       sasaki        123

            注册时首先查看用户名是否已经存在，那么有查看密码是否存在的这个场景吗？（不可能出现上面没写用户名，下面提示密码已存在）若这种情况出现
            那么不用输入用户名就知道库里面已经有这个密码存在了。因此都是在用户名输入的前提下才会做这件事

            因此只可能有这两种应用场景：
                select * from tb where username = "xx"
                select * from tb where username = "xx" and password = "xx"

            此时可以直接做一个组合索引，而不用创建两个索引（根据业务判断）组合索引通常要快一点

7、执行计划： - 相对"比较"准确的表达出当前 SQL 运行的状况（走没走索引）
因此以后写 sql 语句时要关注，是否走索引了。（但不能说每一次都看一下表结构吧，有可能我误判了，但也没这么干的）
用于参考，也有不准确的情况方式。

    explain +SQL语句：如
        explain select * from tb;
        此时返回的不是表里面的数据,而是一张表格。其中最为重要的有 则是type：见下
        possible_key：可能用到的索引列
        key：表示用到的真实索引列
        key_len:表示索引位的长度（都是预估值，不是正确的）

    1.ALL、index：（最常见的垃圾）
        explain select */nid from tb11; --对应 all 、index （这个是没用索引，或查找索引列的全部列）

        type: ALL，表示对数据表进行全表扫描
        type：index，表示对索引进行全索引扫描
        rows: 3441639 ，表示有三百多万条数据、索引
        上面两种的效率都非常低。就是说一般出现了ALL 或是 index 的话效率是不高的。

    2.limit:
        但若加上limit时，显示的还是ALL，但此时内部却不是全表扫描找的，当它找到第一条就返回不找了。因此explain只能当做参考 。
        但若没有找到时limit 1 还是按照全表扫描。limit 1 相当于碰运气，若第一条找到还好，若最后一条都没找到就没有任何用。

    若以后看到Type :ALL、index 那么就表示sql有可优化的余地。
        就算SQL层不能在优化了，那么就在数据库架构方面或是表结构方面进行优化。（最可能就是一开始表结构就设计错了...借助缓存...）

    3.range:（有点坑，面试可能会有）
        explain select * from tb1 where nid < 233; --在索引表中作比较
            此时显示的type：range。 --对索引列进行范围查找，显示range
            range的效率要比all、index高。但此时做一点改动

        expalin select * from tb1 where nid > 233; --在索引中用>来做比较
            此时显示的则是type：all。 此时没有走索引，效率又变低。

        因此在做> >= < <= !=时：
            注意 != 和 > 符号。即是对索引列进行范围查找，也不会走索引。

    4.INDEX_MERGE：（之前的组合索引）
        合并索引，使用多个单列索引搜索
        select *  from tb1 where name = 'alex' or nid in (11,22,33);--（不知道为啥，这个没试出来。调整后试出了const）

    5. REF
        根据索引查找一个或多个值（简单的用一个索引查找）
        select *  from tb1 where name = 'seven';

    6.EQ_REF
        连接时使用primary key 或 unique类型（大致同上，多了个连表）或是
        select tb2.nid,tb1.name from tb2 left join tb1 on tb2.nid = tb1.nid;

    7. CONST （效率和下面的是最高的）
        常量  表最多有一个匹配行,因为仅有一行,在这行的列值可被优化器剩余部分认为是常数,const表很快,因为它们只读取一次。
        select nid from tb1 where nid = 2 ; --例如：覆盖索引

    8.SYSTEM （同上，效率高）
        系统  表仅有一行(=系统表)。这是const联接类型的一个特例。
        select * from (select nid from tb1 where nid = 1) as A;

    性能高低由上到下，下面的最高，越靠下越nb，但不是所有都能走到下面，一般在range下即可（全表扫描是万万不能要的）

8、如何命中索引：
mysql 中会有锁，你一个人执行用了 1.6s，当人多的时候简直不动。一个人执行时把 mysql 锁住了，别人就别想再执行。（虽然不是整体全部加锁，部分加锁也不行）

    - like '%xx'：
        当：explain select * from tb11 where name like "%cnn" 此时Type：all  -- 此时没有走索引，全表扫描
        但：explain select * from tb11 where name like "cnn%" 此时Type：range -- 走索引

        %分号在前面有实体值的时候，就会走索引，否则不走索引。（它就类似组合索引的最左前缀）

    写sql语句 where列写了函数，改变了原数据值，导致索引无法生效。因此一定不要在where列上通过函数做任何计算。
        假如在数据库中存了时间并建立了索引。而在客户端上显示是2018/3/3或2018-3-3。此时可能和数据库的无法比较。
        select * from tb1 where corn(ctime,'..-..-'); -- 利用函数进行了转换，虽然内做子查询，但索引无效

        这种方式不要做。应该在sql语句之前就转换为和数据库同样的格式。

    - or
        select * from tb1 where nid = 1 or email = 'seven@live.com';
        特别的：当or条件中有未建立索引的列才失效，以下会走索引
            select * from tb1 where nid = 1 or name = 'seven';（合并索引）
            select * from tb1 where nid = 1 or email = 'seven@live.com' and name = 'alex'

    - 类型不一致（致命的）
        如果列是字符串类型，传入条件是必须用引号引起来，不然...
        select * from tb1 where name = 999;

    -之前的!= 和 >（除非主键，唯一都不走）
        != 特别的：如果是主键，则还是会走索引     > 特别的：如果是主键或索引是整数类型，则还是会走索引

    - order by
        select email from tb1 order by name desc;
        当根据索引排序时候，选择的映射如果不是索引，则不走索引
        特别的：如果对主键排序，则还是走索引：
            select * from tb1 order by nid desc;

    - 组合索引最左前缀

其他注意事项： - 避免使用 select _ - count(1)或 count(列) 代替 count(_) - 创建表时尽量时 char 代替 varchar - 表的字段顺序固定长度的字段优先（varchar、text 等都是变长的往后放） - 组合索引代替多个单列索引（经常使用多个条件查询时）组合索引通常要快一点 - 尽量使用短索引（假如一共有 30 多位，然而前八位即可区分唯一，那么指定列的某几个字符来创建索引。text、blob 若要指定索引，必须指定长度） - 使用连接（JOIN）来代替子查询(Sub-Queries)（优先连表，效率高） - 连表时注意条件类型需一致 - 索引散列值（重复少）不适合建索引，例：性别不适合（一列中存在大量的重复，何必浪费空间）

9、SQL-limit 分页（面试必备）
无论是否有索引，limit 分页是一个值得关注的问题。有分页便有翻页。
分页时第一页查询倒是快，而数据量越大查询越慢。那此时怎么解决？————删库：这也是一种解决办法，然后就可以跑路了。（分库分表也行，但投机取巧，不考虑）

    在sql语句级别如何处理：
        limit原理就是找到要的便不找了。从开始往下扫。若一百万行时则前面的岂不是白扫了。若id用in的话（in一个范围）也只能饮鸩止渴（网上这种解决方式都是错的，垃圾）
        limit x,m -扫表
        根源：（如何不扫表）限制用户这样的操作（瞎扯淡的）若我们知道它当前在那条数据上（贴吧瞬移）用nid > .. limit ...直接跳过前..数据 然后扫表。
            但是根据nid是不行的，因为第一到十条可能出现1-16 因为表中部分数据删除了，nid还自增  --因此nid排列可能是中断的
            方式一：（实际场景里还有desc..此处先不考虑）
                --只有上一页和下一页
                1.当用户查看页面时，第一页：（limit 0,10） nid -- 1-16
                2.当用户点击下一页时，（limit 10,10） nid -- 17-36
                3.因此用户点击下一页时，何不把用户当前页面最后一次的nid传递过来、
                因此以后写条件直接加了条件 where nid > 16 limit 10; --直接limit 10取前10行（永远只扫描10条数据，因此不管数据量有多大都能快速找到）
                全局变量定义一个当前最后id，每次赋值。上一页同理定义一个当前页的第一个值，之后order by反转limit 10 （或是反转取20条在反转取10条，麻烦了）

                分页的应用其实主要是网页 --还没完，还能再加工，点第几页第几页效率还不低...以后再讨论

10、慢日志查询：
可以在内存中修改
配置文件可以配置，之后让 DBA 填坑。在 mysql 的配置文件中加以下内容：

    a、配置MySQL自动记录慢日志（内存中默认都是OFF，改完后记得重启服务，之后指定的配置文件才生效）
        slow_query_log = OFF                            是否开启慢日志记录
        long_query_time = 2                              时间限制，超过此时间，则记录
        slow_query_log_file = /usr/slow.log        日志文件
        log_queries_not_using_indexes = OFF     为使用索引的搜索是否记录（ON：未命中索引，则记录）

        注：查看当前配置信息：
        　　     show variables like '%query%'
             修改当前配置：
        　　　　set global 变量名 = 值

        若以后想再修改配置文件，还是要注释掉再重启（线上的mysql一般不要重启，因为可能一重启就起不来了！好多运维就开始推了，最后都不敢重启）
            一旦起不来了，整宿整宿回不了家，隔壁还有黄毛呢！
        另一种方式是在内存中修改，终端执行命令show variables like %query%;后面直接set... = ...进行设置即可
            这种方式修改立即生效，但是重启后还是变为配置文件中的值，因此还是要可配置文件一起改

    b、查看MySQL慢日志：
        mysqldumpslow -s at -a  /usr/local/var/mysql/MacBook-Pro-3-slow.log

        --verbose    版本
        --debug      调试
        --help       帮助

        -v           版本
        -d           调试模式
        -s ORDER     排序方式
                     what to sort by (al, at, ar, c, l, r, t), 'at' is default
                      al: average lock time
                      ar: average rows sent
                      at: average query time
                       c: count
                       l: lock time
                       r: rows sent
                       t: query time
        -r           反转顺序，默认文件倒序拍。reverse the sort order (largest last instead of first)
        -t NUM       显示前N条just show the top n queries
        -a           不要将SQL中数字转换成N，字符串转换成S。don't abstract all numbers to N and strings to 'S'
        -n NUM       abstract numbers with at least n digits within names
        -g PATTERN   正则匹配；grep: only consider stmts that include this string
        -h HOSTNAME  mysql机器名或者IP；hostname of db server for *-slow.log filename (can be wildcard),
                     default is '*', i.e. match all
        -i NAME      name of server instance (if using mysql.server startup script)
        -l           总时间中不减去锁定时间；don't subtract lock time from total time
        """
