import{_ as r}from"./plugin-vueexport-helper-DlAUqK2U.js";import{c as i,a as n,b as e,o as l}from"./app-BhrB-knK.js";const s={};function o(a,t){return l(),i("div",null,t[0]||(t[0]=[n("p",null,[e("一、本节内容概要："),n("br"),e(" 本节内容虽然在开发过程中可能用到较少，但至少也能描述清楚概念和能写的出来才行。其中索引的知识为重！（而触发器存储过程和视图可能用的不是"),n("br"),e(" 很多）"),n("a",{href:"http://xn--3ds.net",target:"_blank",rel:"noopener noreferrer"},"在.net"),e(" 的 sqlserver 中可能写到存储过程会比较多一些。因此通常开发时还是常用 sql 语句（这才是重中之重）————mysql 中运用较少，但 sqlserver 和"),n("br"),e(" Oracle 中用的还是较多（C#时把所有 sql 语句都封装成存储过程，因此存储过程利用的还是较多）")],-1),n("pre",null,[n("code",null,`1、视图：
    通常sql查询中会用到大量的临时表（先把想要的一部分东西先放到临时表里面，然后再去临时表中细化）

    视图是一个虚拟表（非真实存在），其本质是【根据SQL语句获取动态的数据集，并为其命名】，用户使用时只需使用【名称】即可获取结果
    集，并可以将其当作表来使用。（就相当于给临时表加了一个标签变量temp一样，视图就是建立对应关系，调用时相当于使用了个临时表）

    1.创建视图：
        --格式：CREATE VIEW 视图名称 AS  SQL语句    （其中as是固定用法，v1就是视图名）
            CREATE VIEW v1 AS
            SELET nid, name FROM A WHERE nid > 4

        因此以后要查询结果集的时候直接select * from v1 结果就出来了（说白了视图即虚拟临时表，为了让客户端写sql语句尽量简单点）

    2.删除视图：
        --格式：DROP VIEW 视图名称
            DROP VIEW v1

    3.修改视图：
        -- 格式：ALTER VIEW 视图名称 AS SQL语句
            ALTER VIEW v1 AS ...(修改一系列)

    4.使用视图：
        使用视图时，将其当作表进行操作即可，由于视图是虚拟表，所以无法使用其对真实表进行创建、更新和删除操作，仅能做查询用。
        select * from v1（仅能查询，视图名直接当表名使用即可）


2、触发器：!!!注意触发器若创建错误，会特么瞎jb报错，令人摸不着头脑（写完后请确认无误）
                            ————触发器不是必须的，写了反而更浪费时间，但是还是要了解
    对某个表进行【增/删/改】操作的前后如果希望触发某个特定的行为时，可以使用触发器，触发器用于定制用户对表的行进行【增/删/改】前后的行为。

    # 插入、删除、更新前:
        CREATE TRIGGER tri_before_insert/delete/update_tb1 BEFORE INSERT/DELETE/UPDATE ON tb1 FOR EACH ROW
        BEGIN
            ...
        END
    （其中EACH ROW 只的是每一行，若批量插入数据，则触发器执行n次）

    # 插入、删除、更新后:
        CREATE TRIGGER tri_after_insert/delete/update_tb1 AFTER INSERT/DELETE/UPDATE ON tb1 FOR EACH ROW
        BEGIN
            ...
        END

    如何插入数据时不在触发器内部写死：（比如再插入后触发器中插入另一条刚才插入的值）
        delimiter $$
        create trigger tri_before_insert_student before insert on student for each row
        begin
            -- new:
                -- new.gender 1
                -- new.class_id 2
                -- new.sname 33
            if new.sname = "igarashi" THEN
            insert into class(caption) values(new.sname);
            end if;
        end $$
        delimiter ;

        insert into student(gender,class_id,sname) values("男",3,"igarashi")
        mysql内部提供了new，当进行insert时，会自动生成这三个new.值。因此new里面封装了用户新插入过来的数据（动态）

    删除时的触发则内部用old：（实现删除后同时删除其他表中数据）
        delimiter $$
        create trigger tri_before_delete_student before delete on student for each row
        begin
            if old.sname = "igarashi" THEN
            delete from class where caption = old.sname;
            end if;
        end $$
        delimiter ;

        delete from student where student.sname = "igarashi"

    特别的：NEW表示即将插入的数据行，OLD表示即将删除的数据行。（因为凡是delete操作原表中都有，因此是old）
            update和insert同理，凡是新传过来的数据都是new。（因为原表中没有此数据）

    删除触发器：
        DROP TRIGGER tri_after_insert_tb1;

    使用触发器：
        触发器无法由用户直接调用，而知由于对表的【增/删/改】操作被动引发的。


3、存储过程：（这个就比较重要）
    存储过程是一个SQL语句集合，当主动去调用存储过程时，其中内部的SQL语句会按照逻辑执行。
    （说白了类似于函数，想拿的时候call c1()调用即可）

    1.创建存储过程：
        -- 创建存储过程
            delimiter $$    --就像mysql是以分号作为终止符，这里是自己设定以XX作为终止符(delimiter:用于修改终止符)
            create procedure p1()   --必须加括号
            BEGIN
                select * from t1;   --中间加多少语句都可以
            END $$          --遇到 $$表示终止了，把$$前面的部分提交到了mysql
            delimiter ;     --再次设置终止符deliniter为 ;

        -- 执行存储过程
            call p1()

        这里面可以写if else、可以写for循环、可以传参等等写很多很多，比视图厉害的多
        推荐当存储过程写错了，就干掉重建，不要去改

    2.对于存储过程，可以接收参数，其参数有三类：
        in        仅用于传入参数用    #让存储过程内部使用
        out       仅用于返回值用（由于没有像类似return那样可以后面加入的返回值）   #返回值
        inout     既可以传入又可以当作返回值     #

        若procedure c1(in,out,inout)传参call c1(1,@i1,@i2) in传的值仅用于用，out传值@i1仅仅作为引用传递，初始为空，存储过程赋值返回。
        out的参数传入只能用@，@i1作为存储过程内部赋值来使用.而@i2则是可以在传递之前便进行赋值的，在存储过程中还可以修改并返回。
        （out时无需传参，因为它初始化为null）

        declare：在存储过程内部声明变量时使用
        -- 创建带参存储过程
            delimiter \\\\
            create procedure p1(
                in i1 int,
                in i2 int,
                inout i3 int,
                out r1 int
            )
            BEGIN
                DECLARE temp1 int;                  --相当于 temp1 = int()  （声明变量类型）
                DECLARE temp2 int default 0;        --相当于 temp2 = 0      （赋值为0）

                set temp1 = 1;                      --由于声明过类型set直接赋值（再赋值为1）

                set r1 = i1 + i2 + temp1 + temp2;

                set i3 = i3 + 100;

            end\\\\
            delimiter ;

            -- 执行存储过程
            set @t1 =4;
            set @t2 = 0;
            CALL p1 (1, 2 ,@t1, @t2);
            SELECT @t1,@t2;

        上面虽然没有结果集，但通常来说，最常用的是即拿到返回结果，又拿到结果集的存储过程应用最多。（比如给存储过程传参数，传递进来，存储过程拿
        着参数，帮我执行一大堆的sql语句，做各种各样的判断，然后做完了告诉客户端执行成功了没有，执行成功了再返回一个1）

        注：存储过程的返回仅能拿到一个结果集，即一张表（但可连表，可多条操作语句），但拿返回值时可以有多个（返回值传什么类型，返回什么类型，单值）。

    3.删除存储过程：
        drop procedure proc_name;

    4.执行存储过程：
        -- 无参数
            call proc_name()

        -- 有参数，全in
            call proc_name(1,2)

        -- 有参数，有in，out，inout
            set @t1=0;
            set @t2=3;
            call proc_name(1,2,@t1,@t2)

        pymysql中：
        对于python开发者，通常不会去使用终端。他总不能告诉你：你去终端连，查一个sql语句就行了，这是不合理的。因此是用python执行sql语句
        拿到结果后给别人即可。

            通过.callproc("proc_name") 去调用存储过程  #这样的好处在于，我们在给mysql传输的时候（只用传个过程名）sql语句就少了

            # 执行存储过程，args里面无变量，pymsql帮你接收
            cursor.callproc('p1', args=(1, 22, 3, 4))  #无需管in、out，in就直接传入、out则忽略、inout同in拿值。

            result = cursor.fetchall()##第一次执行时只拿结果集

            # 获取执行完存储的参数
            cursor.execute("select @_p1_0,@_p1_1,@_p1_2,@_p1_3") #注select后面的为固定用法，pymsql无法判断谁是out谁是inout，但它
                                                                 #简单粗暴把所有传参的执行结果拿了一遍
            @加上一个下划线_，p1是存储过程的名字，_0拿第一个值（_表示分割），以此类推。把所有值都重新拿了一遍。假设是in、in、out、inout则拿到的值前两个
            不变（@_p1_0 = 1   @_p1_1 = 22），后面的则拿到的是存储过程内部返回值

            result2 = cursor.fetchall()#第二次执行变量查询select...拿到了存储过程的返回结果

            conn.commit()#存储过程里可以写多个sql语句，可以写insert、update，涉及这些操作需要commit，因此保险起见还是加上commit
    5.其他：
        条件语句：
            delimiter \\\\
            CREATE PROCEDURE proc_if ()
            BEGIN

                declare i int default 0;
                if i = 1 THEN               --条件后面必须+then，就相当于Python的:
                    SELECT 1;
                ELSEIF i = 2 THEN
                    SELECT 2;
                ELSE
                    SELECT 7;
                END IF;

            END\\\\
            delimiter ;

        循环语句:（部分代码重复、略）
            while：
                DECLARE num INT ;
                SET num = 0 ;
                WHILE num < 10 DO               --后面记得+do
                    SELECT                      --查询这个数
                        num ;
                    SET num = num + 1 ;
                END WHILE ;

            repeat：
                DECLARE i INT ;
                SET i = 0 ;
                repeat                          --repeat表示重复
                    select i;
                    set i = i + 1;
                    until i >= 5                --until直到..终止条件————相当于do - while
                end repeat;

            loop：
                declare i int default 0;
                loop_label: loop

                    set i=i+1;
                    if i<8 then
                        iterate loop_label;     --回到循环开始继续执行 - 像continue    若后面再接else就否则执行...
                    end if;
                    if i>=10 then
                        leave loop_label;       --离开循环 - 像break
                    end if;
                    select i;
                end loop loop_label;

    6.动态执行SQL语句：（特别、特别、特别重要！！！————搞Oracle的DBA经常用）
        当你想通过方法名称的字符串来执行某个模块下（假设re模块下的match方法）,则需要借助反射来实现 func = getattr(re,"match");func()
        同理，若想通过传递varchar(255)的字符串sql语句，交给存储过程完成，则也需要借助其他方法。假设现在传了这样的参数：
        in arg varchar(255),# 传递了sql语句:"select * from student where sid = %s"
        in arg2 int # 这里传递了值1
        当存储过程执行时不仅要借助某种方法，还有利用传来的两个值进行拼接，则涉及到了字符串的格式化
        #arg1 = arg1 % (arg2) # 这里是按照python的写法变成 -- "select * from student where sid = 1"
        func = getattr("arg1");func()
        若是有这种方式，以后就传递含有占位符的sql语句，然后把第二个参数和第一个在内部做个格式化就行了。

        在mysql中支持的则是prepare（提供了这种机制）
            delimiter \\\\
            DROP PROCEDURE IF EXISTS proc_sql \\\\
            CREATE PROCEDURE proc_sql ()
            BEGIN
                declare p1 int;
                set p1 = 11;            --这里看似多此一举，实际也是多次一举，直接@p1=11也一样
                set @p1 = p1;           --这里是规定的传来的变量必须@开头，不然using不执行

                PREPARE prod FROM 'select * from tb2 where nid > ?';    --mysql中占位符是?（不是python中的%）
                EXECUTE prod USING @p1;
                DEALLOCATE prepare prod;

            END\\\\
            delimiter ;

        这就是说prepare后要创建一个变量prod（类似于特殊变量，这个特殊的变量就是一个SQL语句）因此prod代指后面的sql语句
        后面execute prod using @p1  这一句就是做字符串格式化 因此select * from tb2 where nid > 11（把@p1=11放到占位符位置）
        deallocate prepare prod 就是执行它

        注：FROM后面的sql和USING后的@p1 都可以在传参处替换

        在pymysql级别可以用传参方式防止注入，在mysql级别可以用动态执行的方式防止SQL注入。
        pymysql中，需要cursor.callproc("p1",args=("select * from tb2 where nid > ?",11))    来防止SQL注入
        但这种不常用，最多情况还是用传参的方式防注.execute("select * from tb2 where nid > %s",11)

4、事务：（在存储过程里面执行事务）
    之前的建表，engine = innodb 中有提到（原子性操作）
    假设存储过程中有两个操作insert、update。当update出错时怎么办，是不是要回滚。若只是普通的写在存储过程中，默认是不回滚的，这样便产生脏数据。
    但若把这两个操作写成事务，就会进行回滚操作。执行失败则一起吧之前的操作也删除。

    MySQL中可以声明一个特殊的变量：sqlexception、sqlwarning。类似python的异常捕获
    DECLARE exit handler for sqlexception/sqlwarning（这就表示创建了一个SQL的异常处理、警告处理）

    delimiter \\\\
    create PROCEDURE p1(
        OUT p_return_code tinyint
    )
    BEGIN
      DECLARE exit handler for sqlexception
      BEGIN                                 --相当于创建了一个异常代码块，当存储过程出现异常时执行
        -- ERROR
        set p_return_code = 1;              --若执行出错（插入了没有的列），则报异常，返回1
        rollback;                           --进行回滚操作，后续部分不会执行（类似python的异常处理）
      END;

      DECLARE exit handler for sqlwarning
      BEGIN                                 --创建了一个警告代码块，当存储过程出现警告时执行
        -- WARNING
        set p_return_code = 2;              --若版本不兼容之类的，搞一个警告，几乎用不到
        rollback;
      END;

      START TRANSACTION;                    --若下面这个事务操作执行成功，则上面的都不会执行
        DELETE from tb1;
        insert into tb2(name)values('seven');
      COMMIT;                               --和上面关联，把delete和insert变成一个事务

      -- SUCCESS                           --传入的返回参数，若执行成功，给p_return_code赋值，返回0
      set p_return_code = 0;

      END\\\\
    delimiter ;

    set @i =0;      call p1(@i);        select @i;
`)],-1)]))}const d=r(s,[["render",o]]),E=JSON.parse('{"path":"/database/MySQL/Mysql%E8%BF%9B%E9%98%B6.html","title":"Mysql进阶","lang":"zh-CN","frontmatter":{"title":"Mysql进阶","order":2,"description":"一、本节内容概要： 本节内容虽然在开发过程中可能用到较少，但至少也能描述清楚概念和能写的出来才行。其中索引的知识为重！（而触发器存储过程和视图可能用的不是 很多）在.net 的 sqlserver 中可能写到存储过程会比较多一些。因此通常开发时还是常用 sql 语句（这才是重中之重）————mysql 中运用较少，但 sqlserver 和 Oracl...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Mysql进阶\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-10-12T14:58:07.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"悦·宝宝\\",\\"url\\":\\"https://github.com/Igarashi-G\\"}]}"],["meta",{"property":"og:url","content":"https://igarashi-g.github.io/database/MySQL/Mysql%E8%BF%9B%E9%98%B6.html"}],["meta",{"property":"og:site_name","content":"悦 ▪ 宝宝"}],["meta",{"property":"og:title","content":"Mysql进阶"}],["meta",{"property":"og:description","content":"一、本节内容概要： 本节内容虽然在开发过程中可能用到较少，但至少也能描述清楚概念和能写的出来才行。其中索引的知识为重！（而触发器存储过程和视图可能用的不是 很多）在.net 的 sqlserver 中可能写到存储过程会比较多一些。因此通常开发时还是常用 sql 语句（这才是重中之重）————mysql 中运用较少，但 sqlserver 和 Oracl..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-10-12T14:58:07.000Z"}],["meta",{"property":"article:modified_time","content":"2022-10-12T14:58:07.000Z"}]]},"git":{"createdTime":1665586687000,"updatedTime":1665586687000,"contributors":[{"name":"Igarashi","username":"Igarashi","email":"2545369032@qq.com","commits":1,"url":"https://github.com/Igarashi"}]},"readingTime":{"minutes":10.88,"words":3265},"filePathRelative":"database/MySQL/Mysql进阶.md","excerpt":"<p>一、本节内容概要：<br>\\n本节内容虽然在开发过程中可能用到较少，但至少也能描述清楚概念和能写的出来才行。其中索引的知识为重！（而触发器存储过程和视图可能用的不是<br>\\n很多）<a href=\\"http://xn--3ds.net\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">在.net</a> 的 sqlserver 中可能写到存储过程会比较多一些。因此通常开发时还是常用 sql 语句（这才是重中之重）————mysql 中运用较少，但 sqlserver 和<br>\\nOracle 中用的还是较多（C#时把所有 sql 语句都封装成存储过程，因此存储过程利用的还是较多）</p>","autoDesc":true}');export{d as comp,E as data};
