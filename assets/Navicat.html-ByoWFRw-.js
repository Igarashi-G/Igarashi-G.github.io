import{_ as n}from"./plugin-vueexport-helper-DlAUqK2U.js";import{c as t,d as s,o as r}from"./app-DS5-vXX9.js";const o={};function c(a,e){return r(),t("div",null,e[0]||(e[0]=[s(`<h1 id="navicat" tabindex="-1"><a class="header-anchor" href="#navicat"><span>Navicat：</span></a></h1><pre><code>可视化管理，用于连接数据库，可以帮咱们做各种操作（点点点——&gt;SQL语句）
下载：navicat，简化简单操作：创建表、修改表结构、增删改查等等。（但是不能看靠鼠标完成连表等复杂操作，只用于提高效率，因此应掌握各种命令）
（对于不太规范的公司，允许直接用navicat直连，进行操作。但大部分公司担心第三方种了木马（不安全，公司不给掏钱买正版而用破解版），可能导致输
    入登录数据被发送到黑客邮箱而泄露，从而被删库等等，因此大部分公司不允许用第三方工具，只能用原生的mysql，但初学者不用担心）


Navicat复制数据库：
    找到目标数据库的表，右键转储SQL数据和结构 -&gt; 新建数据库（名称，字符集utf8）-&gt; 右键运行SQL文件-&gt; 找到转储的文件路径
    -&gt; 刷新
</code></pre><p>二、练习题：<br> 练习：<a href="http://www.cnblogs.com/wupeiqi/articles/5748496.html" target="_blank" rel="noopener noreferrer">http://www.cnblogs.com/wupeiqi/articles/5748496.html</a><br> 往往那些独立存在的表，如：班级表只有 cid 和班号的，通常称为字典表。可以用于其他表的关联（也就是外键，如学生对班级）而多关联的<br> 则就是多个外键。（如课程对班级和老师、成绩表对应关联了学生和课程）</p><pre><code>    三连表操作：
        select score.sid, student.sid, student_id, course_id, num from score（虽然这种写法没错，但不推荐这么写）
        因此通常前面加表名
        select score.sid, score.student_id, student.sname, score.course_id, course.cname, num from score（最后记得num不加逗号）
        left join student on score.student_id = student.sid
        left join course on score.course_id = course.cid
        （后面无论多少表都left join起来就好）

    SQL表的导入、出：
        直接通过navicat导出表数据、结构（仅结构：就是没有数据的空表）利用运行sql文件可以直接导入.sql的表（虽然可能由于服务器的配置不同
        而报错，不过一般不影响，检查后无误即可）
        利用命令的方式：
            导出现有数据库数据：
                mysqldump -u用户名 -p密码 数据库名称 &gt;导出文件路径          # 结构+数据  &gt;:输出到
                mysqldump -u用户名 -p密码 -d 数据库名称 &gt;导出文件路径       # 结构
            导入现有数据库数据：
                mysqldump -uroot -p密码  数据库名称 &lt; 文件路径             #同理
    临时表：
        select * from (select nid,sname,age from tb1 where id &gt; 10) as T left join ...
        可以把查询的结果通过select * from （select ...） as T的方式构建成一张表再进行连表（把拿到的数据当做内存的临时表T）这样效率
        可能会高，但通常也不一定。

    用in来查找范围 如 in (2,4) 只在2,4中出现。往往（）中加入已给查询后的表最为常见，这样做，可以动态的查询某一信息

    查询有课程成绩小于60分的同学的学号、姓名：
    distinct：（用于去重）
        在select后的目标列前面加distinct可以做到像group by一样的去重效果
        原SQL：
            select student_id,student.sname from
            (select student_id from score where num &lt; 60) as V
            left JOIN student on student.sid = V.student_id
            GROUP BY student_id

        利用in + distinct：
            select sid,sname from student where sid in
            (select DISTINCT student_id from score where num &lt; 60)（因此利用in + distinct可以简化sql语句）

    17：这题还是很有参考价值的***
    子查询：
        1.select 后接 1 那么会出现一列都是1的情况
        2.select 后接一个select语句（这条语句查询出一条数据） 那么这就是一个子查询。

        子查询通常是动态的，直接获取一个变量，它利用外部查询（即整个sql语句查询）后的某列，并建立一个关系（例如通过where条件）
        举个例子：
            select (select caption from class where cid = score.course_id),sid,num from score
        select 语句(外面的)在查询后，会把score.course_id 交给子查询,子查询通过where cid = score.course_id 来建立关系。
        这里便显示了班号对应分数列.课程的一个关系（其实是错误关系）。但可以看出的是一条原数据对应子查询的一条数据（此时便建立了一个动态子查询）

        防止子查询数据与原列数不匹配方法：
            子查询获取整体查询的主键，让他们相等where InnerTb.sid = OuterTb.sid。或是找之间的对应关系，让其相等
            where InnerTb.student_id = OuterTb.student_id，比如17题中的对应关系就是student_id 因为每列都有一个学生对应选的多门课
            那么这个学生选了生物课，并且学号为1，这两个条件确定了唯一的一个num（sid+course_id也同理，确定唯一num，由于要分组，因此不能用sid）

    -- 按平均成绩从低到高 显示所有学生的“语文”、“数学”、“英语”三门的课程成绩，按如下形式显示：
    -- 学生ID,语文,数学,英语,有效课程数,有效平均分；
        select OuterTb.student_id as &quot;学号&quot;,
        (select num from score as InnerTb where InnerTb.student_id = OuterTb.student_id and course_id = 1)as &quot;生物&quot;,
        (select num from score as InnerTb where InnerTb.student_id = OuterTb.student_id and course_id = 2)as &quot;物理&quot;,
        (select num from score as InnerTb where InnerTb.student_id = OuterTb.student_id and course_id = 3)as &quot;体育&quot;,
        avg(OuterTb.num) as &quot;平均成绩&quot;
        from score as OuterTb
        group by OuterTb.student_id
        order by &quot;平均成绩&quot; desc


    case when...then...or/else...END:(相当于if -- else，其实更像三元运算)：
        先来看一下C的三目运算：a:b?a       (python是没有三元描述符的，但是可以通过模拟的实现————即and or)
        case when score.num &gt; 60 then 1 else 0 END  --  (类似if num &gt; 60 就等于1 不然就是0)
    因此19.按各科平均成绩从低到高和及格率的百分数从高到低顺序:     sum(1,0,1,1,0,...)
        select course_id,avg(num) as av,sum(case when score.num &gt; 60 then 1 else 0 END)/count(1)*100 as percent from score
        group by course_id
        order by av asc,percent desc

    子查询sql思想：
        1.先从大表开始，先进行表的扩张（此时不要怕数据重复），当扩张到满足大部分条件后，再一点点缩小到所需的列和所需的数据。
        2.把查询的数据表整体当做一张表，外面再一层层嵌套select。就好像外面的select查询的是内存生成中的表
        因此，比如21.查询各科成绩前三名的记录:(不考虑成绩并列情况)
            思想就是，先查出各科成绩第一的学生，再查出各科成绩第四的学生，之后找出中间的学生
            select * from(
                select sid,student_id,num,
                (select num from score as s2 where s2.course_id = s1.course_id order by num desc limit 0,1) as first_num,
                (select num from score as s2 where s2.course_id = s1.course_id order by num desc limit 3,1) as second_num
                from score as s1)as T
            where num &gt; second_num and num &lt;= T.first_num

    比较坑的是，有些想法（比如排列每科顺序和分数顺序，直接取前三）sqlserver可以支持但mysql是不支持的。

    无表select：
        例如24.查询男生、女生的人数:
        select (select count(*) from student where gender=&quot;男&quot;) as &quot;man&quot;,(select count(*) from student where gender=&quot;女&quot;) as &quot;woman&quot;
        就像打印了一样，因为不知到去from那一张表，因此行数是不会重复的

    笛卡尔积select：（一般根本用不到，数据冗余，除非1*1）
        例子同上：
        select * from
        (select count(*) as &quot;man&quot; from student where gender=&quot;男&quot;) as A,
        (select count(*) as &quot;woman&quot; from student where gender=&quot;女&quot;) as B
        当两表数据都只有一行时，用笛卡尔积联立则1*1只有一条数据

    后面习题心境有空时请继续！

内容补充:
    -临时表
    -去重 distinct
    -avg、in、not in
</code></pre><p>三、python 操作 MySql：<br> pip3 install pymysql：执行命令即可安装<br> pipy：就像一个市场一样（谷歌 store）。但是这是个无毒、安全、的模块组织。以后通过 pip install： 1.自动下载到本地。2.解压到目录 site-packages 下<br> py2 默认无命令<br> py3 默认自带 pip3 命令（在 script 下有一堆可执行文件，+环境变量）<br> 若报错，通常是版本问题 执行 python3 -m pip install --upgrade pip 进行 pip 更新（通常情况在 pip 上都有）</p><pre><code>    yum、apt-get、brew、easy install ... （linux下）都是一样的,python下的一般都是pip

pymysql（一共就掌握二十行代码，其中十行代码还不用变，简直不要太简单）
    -专门用于操作MySqlPython的模块
    -MySQLdb：这也是个模块，但在py3中不支持（py2也有pymysql，并且会用这个，mysqldb也一样，就改一下import就好）
        但Django的内部用的mysqldb，修改一下配置即可。

    注：一定不要用字符串拼接的方式进行sql的书写，因为会出现SQL注入，因此只能用传参的方式。

    所有的操作几乎都是用execute来完成的，当插入多条数据时利用executemany

    其他操作：
        # 获取第一行数据
        row_1 = cursor.fetchone()

        # 获取前n行数据
        # row_2 = cursor.fetchmany(3)

        # 获取所有数据
        # row_3 = cursor.fetchall()

    注：在fetch数据时按照顺序进行，可以使用cursor.scroll(num,mode)来移动游标位置，如：
        cursor.scroll(1,mode=&#39;relative&#39;)  # 相对当前位置移动
        cursor.scroll(2,mode=&#39;absolute&#39;) # 相对绝对位置移动

    SQL注入：一般情况下，最常见的SQL攻击主流的都是程序员SQL注入的问题，而不是服务器有漏洞的问题，这也是非常不安全的。
    若用传参的方式写登录:
        &quot;select username,password from userinfo where username = %s and password = %s&quot;,(igarashi,2333)
        这种方式是无懈可击的。

    但若用字符串拼接的方式登录:
        sql = &quot;select username,password from userinfo where username = &#39;%s&#39; and password = %s&quot;
        sql = sql %(&quot;igarashi&quot;,2333)则可以利用注入
        sql = sql % (&quot;igarashi &#39;or 1=1 -- &quot;, 123)的方式，无需通过密码则直接进入。或是sql = sql % (&quot;igarashi &#39; -- &quot;, 123)
        都是一样的，那这是怎么做到的。
        sql语句注释用--
        &quot;select username,password from userinfo where username = &#39;igarashi&#39;-- &#39; and password = %s&quot;（--把后面的sql语句都注释掉了）
        而 or 1 = 1 永远成立，因此前面用户名不管写什么永远成立，即可直接进入。
        注释是必须要加空格的&#39;-- &#39;，不然不满足注释的条件

    而传参的方式是无论如何都不会通过的，若想再继续加引号，则会直接报错。(传参的语句%s两边是没有&quot;&quot;的)

    pymysql还支持修改cursor：（创建时则利用这种方式————定制游标，让数据以字典的方式返回）
        conn.cursor(cursor=pymysql.cursors.DictCursor)
        此时返回的便是字典，还可以进行定制 as

    获取新创建数据的自增ID：
        new_id = cursor.lastrowid（可以在未commit直接便获取插入列的自增id）
        比如要在关系表里面插入自增id，正常操作不应该在查询一次，而是在python代码中直接进行插入
        当插入多条数据时，返回的是最后一条数据的自增id

操作总结：连接、游标、系列操作、关闭游标、关闭连接
</code></pre><p>四、用户管理：<br> 参考表结构：<br> 用户类型：（管理员、普通用户）<br> 用户信息：<br> 权限：<br> 用户类型&amp;权限：</p><pre><code>功能：
    #登录、注册、找回密码
    #用户管理
    #用户类型
    #权限管理
    #分配权限

特别的：程序仅一个可执行文件
</code></pre><hr><p>番外：工作中开发者 DBA 的职责：<br> 在一个小公司中，开发完就意味着开发完了。程序员的水平参差不齐，主要体现在设计同样的库，实现同样功能的使用效率上（比如傻逼的可能一条 sql 要<br> 二十秒，而 nb 的一条可能只要 0.2s。一般来说页面访问的特别慢，百分之九十五都是 sql 语句写的有问题）然而傻逼的公司执行慢了买服务器（毕竟服务器<br> 性能高了好吧快一些）但没有从根源上解决问题。因此后来就有了专门来管理 SQL 语句的人————DBA。<br> 职责：<br> 例如 MySql 装什么版本的、装的时候配置什么文件（毕竟权威，这么设置就是性能高）各种表结构（但规模大的话成千上万个表就由程序员创建，DBA 审核）<br> 技巧：<br> 因此 DBA 属于运维部、背锅的也通常是运维部的。因此程序员以后执行个什么表操作自己先别执行，先问问 DBA（学会甩黑锅技巧）。<br> 工作：<br> 但由于 DBA 部门建立的晚，100 个人也就一个 DBA，因此它不可能一一审核。因此 DBA 会先解决历史遗留问题（看当前程序有哪些慢的 SQL 语言，进行优化）<br> 可能一年都干这个事。因此 DBA 会一直和慢 SQL 打交道。因此有时会直接找主管把程序员找出来——写的什么垃圾玩意。因此 DBA 多为充当一个辅助角色。</p><pre><code>MYSQL虽然会把执行慢的SQL语句记录下来，方便DBA在慢预制里面找，但是DBA还是不好干，老恶心了。
因此程序员生成慢SQL————DBA解决慢SQL（好的DBA，指高级（源码级别需要了解），挣得还不少5、6万？）毕竟哪门干的nb挣得都不少。
</code></pre>`,11)]))}const d=n(o,[["render",c]]),l=JSON.parse('{"path":"/database/MySQL/Navicat.html","title":"Navicat","lang":"zh-CN","frontmatter":{"title":"Navicat","order":5,"description":"Navicat： 二、练习题： 练习：http://www.cnblogs.com/wupeiqi/articles/5748496.html 往往那些独立存在的表，如：班级表只有 cid 和班号的，通常称为字典表。可以用于其他表的关联（也就是外键，如学生对班级）而多关联的 则就是多个外键。（如课程对班级和老师、成绩表对应关联了学生和课程） 三、pyt...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Navicat\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-10-12T14:58:07.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"悦·宝宝\\",\\"url\\":\\"https://github.com/Igarashi-G\\"}]}"],["meta",{"property":"og:url","content":"https://igarashi-g.github.io/database/MySQL/Navicat.html"}],["meta",{"property":"og:site_name","content":"悦 ▪ 宝宝"}],["meta",{"property":"og:title","content":"Navicat"}],["meta",{"property":"og:description","content":"Navicat： 二、练习题： 练习：http://www.cnblogs.com/wupeiqi/articles/5748496.html 往往那些独立存在的表，如：班级表只有 cid 和班号的，通常称为字典表。可以用于其他表的关联（也就是外键，如学生对班级）而多关联的 则就是多个外键。（如课程对班级和老师、成绩表对应关联了学生和课程） 三、pyt..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-10-12T14:58:07.000Z"}],["meta",{"property":"article:modified_time","content":"2022-10-12T14:58:07.000Z"}]]},"git":{"createdTime":1665586687000,"updatedTime":1665586687000,"contributors":[{"name":"Igarashi","username":"Igarashi","email":"2545369032@qq.com","commits":1,"url":"https://github.com/Igarashi"}]},"readingTime":{"minutes":10.87,"words":3261},"filePathRelative":"database/MySQL/Navicat.md","excerpt":"\\n<pre><code>可视化管理，用于连接数据库，可以帮咱们做各种操作（点点点——&gt;SQL语句）\\n下载：navicat，简化简单操作：创建表、修改表结构、增删改查等等。（但是不能看靠鼠标完成连表等复杂操作，只用于提高效率，因此应掌握各种命令）\\n（对于不太规范的公司，允许直接用navicat直连，进行操作。但大部分公司担心第三方种了木马（不安全，公司不给掏钱买正版而用破解版），可能导致输\\n    入登录数据被发送到黑客邮箱而泄露，从而被删库等等，因此大部分公司不允许用第三方工具，只能用原生的mysql，但初学者不用担心）\\n\\n\\nNavicat复制数据库：\\n    找到目标数据库的表，右键转储SQL数据和结构 -&gt; 新建数据库（名称，字符集utf8）-&gt; 右键运行SQL文件-&gt; 找到转储的文件路径\\n    -&gt; 刷新\\n</code></pre>","autoDesc":true}');export{d as comp,l as data};
