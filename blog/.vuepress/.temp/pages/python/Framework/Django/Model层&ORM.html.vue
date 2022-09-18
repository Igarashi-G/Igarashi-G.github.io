<template><div><p>八 Models：
数据库的配置：</p>
<pre><code>1 django默认支持sqlite，mysql, oracle,postgresql数据库。
    &lt;1&gt; sqlite
        django默认使用sqlite的数据库，默认自带sqlite的数据库驱动 , 引擎名称：django.db.backends.sqlite3

    &lt;2&gt; mysql
        1引擎名称：django.db.backends.mysql

2 mysql驱动程序：
   MySQLdb(mysql python)
   mysqlclient
   MySQL
   PyMySQL(纯python的mysql驱动程序)

   注意：！！！一定要安装pip3 install mysqlclient!!!!否则连接不上，还报错说是密码没有输

3 在django的项目中会默认使用sqlite数据库，在settings里有如下设置：
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
        }
    }
    如果我们想要更改数据库，需要修改如下：
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.mysql',
            'NAME': 'django_com',                       #你的数据库名称（注意这里就是数据库的名称，没有则创建）
            'USER': 'root',                             #你的数据库用户名
            'PASSWORD': '',                             #你的数据库密码
            'HOST': '',                                 #你的数据库主机，留空默认为localhost
            'POST': '3306',                             #你的数据库端口

        }
    }

注意：NAME即数据库的名字，在mysql连接前该数据库必须已经创建，而上面的sqlite数据库下的db.sqlite3则是项目自动创建
    USER和PASSWORD分别是数据库的用户名和密码。设置完后，再启动我们的Django项目前，我们需要激活我们的mysql。
    然后，启动项目，会报错：no module named MySQLdb（or Did...之类的错）
    这是因为django默认你导入的驱动是MySQLdb，可是MySQLdb对于py3有很大问题，所以我们需要的驱动是PyMySQL
    所以，我们只需要找到项目名(此处是app的项目名)文件下的__init__,在里面写入：
        import pymysql
        pymysql.install_as_MySQLdb()
    问题解决！
</code></pre>
<p>到目前为止，当我们的程序涉及到数据库相关操作时，我们一般都会这么搞： 1.创建数据库，设计表结构和字段 2.使用 MySQLdb 来连接数据库，并编写数据访问层代码 3.业务逻辑层去调用数据访问层执行数据库操作
之后导 MySQLdb 包进行一系列操作，详见本节笔记 7.2</p>
<p>django 为使用一种新的方式，即：关系对象映射（Object Relational Mapping，简称 ORM）。</p>
<p>ORM(对象关系映射)：</p>
<pre><code>用于实现面向对象编程语言里不同类型系统的数据之间的转换，换言之，就是用面向对象的方式去操作数据库的创建表以及增删改查等操作。
类似JAVA的模式：一个类对应一张表，每一个类的实例化对象，对应的是每一行数据  Java：Hibernate

优点：（说白了就是简单）
    1. ORM使得我们的通用数据库交互变得简单易行，而且完全不用考虑该死的SQL语句。快速开发，由此而来。
    2. 可以避免一些新人写sql语句带来的性能问题。

缺点：（说白了较原生SQL性能差）
    1. 性能有所牺牲，不过现在的各种ORM框架都在尝试各种方法，比如缓存，延迟加载登来减轻这个问题。效果很显著。
    2. 对于个别复杂查询，ORM仍然力不从心，为了解决这个问题，ORM一般也支持写raw sql。
    3. 通过QuerySet的query属性查询对应操作的sql语句

零、QuerySet类型初识:
    1.它是Django提供的，QuerySet是继承的列表对象，故类似于列表样式，现在暂且理解为列表。
    2.每一条数据都被Django转换为列表中的每一个对象obj（即每个models中的类的对象）。
        例如：&lt;QuerySet [&lt;Book: Sword Art Online&gt;]&gt;   type:&lt;class 'django.db.models.query.QuerySet'&gt;
            其中Book是表名，Sword Art Online是__str__(self)返回的title
            若没有在初始化类中用__str__返回书名，则值为Book object (3)，其中3表示id号为3。这就是为什么要写str的原因
    3.它是有序的因此可以通过.filter(title = &quot;DragonBall&quot;)[0] 来进行列表切片操作，取到对应的元素对象（即表对象）


一、创建表：(模型的创建)：（主流的都是codefirst）
    &lt;1&gt;创建单表：（即创建类）
        一个类即是一张表，字段即是表名。
        1.首先，创建一个表名的类：但注意该类要有__str__(self):self.name，这是为了到时候能打印出来的不是地址而是返回的实例对象的name
            返回的是哪些内容由自己来决定。
        2.类内创建字段：通过models来调用方法创建字段。用的最多的是CharField(max_length=64) -- 相当于varchar。而TextField存的多是较短
            的内容IntegerField则是数字...Django还会隐藏的创建一个id列（主键，自增）
        3.用命令同步，当同步完后会生成一堆表（包括，缓存、后台管理、s、c等近十张表）自己的表名为appname_类名（表名）

    &lt;2&gt;表中列的增改：（每次对表的操作都要用makemigrations、migrate更新）
        改：当修改表结构后：比如长度缩小，那么之前长度超出的数据则被删除

        增：增加一列刷新后通常会提示，不让你增加，因为之前若有数据的话它的对应列也不应该为空。（此时提示用户先赋值给所有之前的列才能创
            建成功）或是在新添加的列中加null = True参数即可

        删：直接删除代码中的一列刷新后若无数据关联之类的直接消失

    &lt;3&gt;建表字段及参数：见附件
        (总的来说就包含了字符串、数字、时间、二进制)很多字段如CharField、TextField、EmailField都是字符串类型，它是在数据上没区别，
        区别就在于是给admin（Django特有的后台管理）用于各数据验证的（admin后面再讲）

    &lt;4&gt;创建连表结构：（foreign key）53
        一对一：即数据库某字段 = models.OneToOneField(其他表)
        一对多：即数据库某字段 = models.ForeignKey(其他表)        （重要）默认绑定的是主键id
        多对多：即数据库某字段 = models.ManyToManyField(其他表)   （重要）

        应用场景：
            一对一：在某表中创建一行数据时，有一个单选的下拉框（下拉框中的内容被用过一次就消失了
                例如：原有含10列数据的一张表保存相关信息，经过一段时间之后，10列无法满足需求，需要为原来的表再添加5列数据
            一对多：当一张表中创建一行数据时，有一个单选的下拉框（可以被重复选择）
                例如：创建用户信息时候，需要选择一个用户类型【普通用户】【尊贵用户】【超级用户】等。
            多对多：在某表中创建一行数据是，有一个可以多选的下拉框
                例如：创建用户信息，需要为用户指定多个爱好

    &lt;4.1&gt;创建一对多：
        即创建外键,在用user_group = models.ForeignKey(&quot;UserGroup&quot;)创建后，默认字段名不是user_group而新创建了一个user_group_id
        Django自动的为我们加上了&quot;_id&quot;。通常创建应加上to_field=&quot;要关联的外键字段名称&quot; 。当然也可以不加，则默认是关联表的主键

        值得注意的是：UserInfo表下的字段：user_group = models.ForeignKey(&quot;UserGroup&quot;,to_field=&quot;uid&quot;,default=1)
        usergroup字段是一个对象，代指的是封装了这一条group的所有数据的对象。
        -这里可以加to = &quot;UserGroup&quot;（不写默认即是to=） to_field = &quot;uid&quot;这是要关联的字段，默认关联id

        那么QuerySet[obj,obj]的obj就是UserInfo对象，它里面封装了(基本属性...,user_group_id（Django默认的新增字段）,usergroup（创建
        关联的usergroup（uid、caption...）对象，通过这个对象获取其对应这一条UserInfo的数据）) -- ORM跨表查询数据

        因此：user_list = models.objects.all()
              for row in user_list:     #此时row拿到的即是一个userinfo对象
              print(row.user_group_id)  #userinfo.user_group_id 取到字段（Django默认起名为user_group_id字段）
              print(row.user_group.uid) #因为user_group是外键对象因此还可以再.取到它的uid

        可能遇到错误：(这是Django2.0版本下的错误)
            __init__() missing 1 required positional argument: 'on_delete'，这是因为on_delete 是当删除关联表中的数据时，
            当前表与其关联的行的行为。而models.DO_NOTHING参数 是删除关联数据，引发错误IntegrityError（因此加上这个参数即可）

        -Django 2.0:
            models.CASCADE - 默认行为。它将一起删除
            models.PROTECT - 保护。一旦被引用，它不会被删除
            models.SET_NULL - 设置为NULL。它必须为null = True。
            models.SET_DEFAULT - 设置默认值。你必须指定default = ....
            models.SET（） - 设置。它可以灵活而灵活-用到时查
            models.DO_NOTHING - 我听说我什么也没做。


    &lt;4.2&gt;创建多对多：
        1.自动建表（让Django自动的帮我们创建）：
            多对多的情况Django会直接创建一张新表（如book和author表多对多）author = models.ManytoManyField(&quot;Author&quot;)
            此时会生成一个book_id一个author_id进行对应的关系绑定，而author不会作为字段存放在任何表中，需要注意的是多对多Django
            自动创建了联合唯一。

        注意：此时只能通过间接操作，比如Book和Author多对多，只能通过Book或是Author进行间接操作获取他们关联的数据，而不是像手动建表
            可以直接通过表名获取数据

        2.手动建表：（自己手动创建）
            此时新建表例如Book2Author 里面两个字段book、author绑定models.ForeignKey(&quot;Book/Author&quot;)两个外键，此时Book2Author表分别
            和Book、Author表形成一对关系，从而使Book和Author表形成多对多关系。（注意这里并不一定要联合唯一，看需求）
            创建联合唯一：
                    class Meta:                             #定义这张表的相关属性内容、排序等等其他的内容
                    unique_together = [&quot;author&quot;,&quot;book&quot;]     #通过unique_together来完成联合唯一（不是必须的）
                    unique_together = ((&quot;auther&quot;,&quot;book&quot;),)  #同时还支持另一种写法,元组多个联合唯一

        毕竟数据库中只有Foreign Key，因此多对多不过是多个Foreign Key。

        注意：手动创建的话Django中多对多的内置方法失效，比如add、clear等等。但是这种方式更加灵活，此时单表操作和一对多操作可以解决所有问题


    &lt;4.3&gt;创建一对一：
        即把外键关联的列数据变为唯一，在数据库中只要在外键对应列设置unique = True即变唯一。Django中利用OneToOneField
        即一个Foreign Key和unique = Ture来完成的，用的并不多


    &lt;5&gt;插入多条记录：
        bulk_create(object_list):  批量插入 对象列表数据
        例：
            obj_list = []
            for i in range(100,3000000):
                obj = models.Student(
                    name=&quot;ykball&quot;,
                    age = 10,
                )
                obj_list.append(obj)
            models.Student.objects.bulk_create(object_list) # 一次性插入3百万条数据

    &lt;6&gt;插入或更新记录
        update_or_create(): 有就更新，没有就创建
            obj,created = models.UserToken.objects.update_or_create(
                name = &quot;fuuka&quot;, #  查找筛选条件 (要查的数据的条件)
                defaults = { # 添加或者更新的数据
                    &quot;age&quot; : 22,
                }
            )



二、表的操作（增删改查）：
    &lt;1&gt; 增(create , save):
        from app01.models import *
            create方式一:   Author.objects.create(name='Alvin') #普通的传入键值对

            create方式二:   Author.objects.create(**{&quot;name&quot;:&quot;alex&quot;}) #写入一个字典中并前面加**作为参数传入（推荐这种，因为
                            数据更多情况下不会后端指定好，而是从前端接收到某个字典）注意前面要加**

            save方式一:     author=Author(name=&quot;alvin&quot;) #实例化的时候键值对赋值
                            author.save() #若不保存则不会同步到数据库

            save方式二:     author=Author()
                            author.name=&quot;alvin&quot; #实例不传参，之后对对象的字段进行赋值
                            author.save()

        如果有外键：
            一对多情况：（没有外键可以通过creat那样直接添加，但有外键存在则需要特定的方式添加）
                1.models.Book.objects.create(title=&quot;Full Metal Panic&quot;,price=&quot;23.3&quot;,publisher_id=1)

                2.（推荐）注意传入字典是一定要加上** 不然就像上次一样怎么错的自己都不知道
                  models.Book.objects.create(title=&quot;Full Metal Panic&quot;,price=&quot;23.3&quot;,publisher=obj)
                  ForeignKey可以传入对象 publisher = obj 都适用，若现成能拿到对象可直接传入。

            多对多情况：
                1.正向查询：
                    绑定是add()    取消是remove()         -- 可以传多个值*args，既可以传对应列的多个单值，也可以传列表
                    先获取多对多关系的两个对象:
                        book = models.Book.objects.filter(id=2)[0]
                        authors = models.Author.objects.filter(id__gt=2)
                    在通过多对多绑定到Book中的author接收对象：
                        book.author.add(*authors) #此时添加的序列要加*（因为很可能取到的数据不是单个的，多个对象）
                        在id为2的这本书中建立关系对应所有作者id&gt;2的作者

                2.反向查询：
                    与上相反获取author来绑定book:
                        author = models.Author.objects.filter(id=2)[0]
                        books = models.Book.objects.filter(id__gt=2)
                    因为Book字段中有author，因此可以进行绑定，而Author却没有book字段，此时利用book_set来获取(固定用法)
                        author.book_set.add(*books) #之后与上同，这里也可以book1,book2,...这样添加多个对象

                若要删除之前添加的关系，则通过remove(*authors)把第三张表中刚刚添加的数据清除
                注意：这里add要传入的不是QuerySet对象而是表对象（即QuerySet中的obj）


    &lt;2&gt; 删（delete）:
        &gt;&gt;&gt; Book.objects.filter(id=1).delete()              --先把一条数据查询到再通过delete方法删除
        (3, {'blog.Book_authors': 2, 'blog.Book': 1})
        表面上删除了一条信息，实际却删除了三条，因为我们删除的这本书在Book_authors表中有两条相关信息，这种删除方式就是Django默认的级联删除。

        如果是多对多的关系： remove()和clear()方法：
            #正向
            book = models.Book.objects.filter(id=1)

            #删除第三张表中和女孩1关联的所有关联信息
            book.author.clear()        #清空与book中id=1 关联的所有数据
            book.author.remove(2)  #可以为id
            book.author.remove(*[1,2,3,4])     #可以为列表,前面加*

            #反向
            author = models.Author.objects.filter(id=1)
            author.book_set.clear() #清空与boy中id=1 关联的所有数据


    &lt;3&gt; 改（update和save）:
        例：author = Author.objects.get(id=5) #获取一条数据
            author.name = &quot;Fuuka&quot;             #对其name值进行修改
            author.save()                     #把修改的数据保存到数据库

            Author.objects.filter(id=2).update(name=&quot;Fuuka&quot;) #这样就不能用get(id=2)

        注意：
        1. 第二种方式修改不能用get的原因是：update是QuerySet对象的方法，get返回的是一个model对象，它没有update方法，而filter返回
            的是一个QuerySet对象(filter里面的条件可能有多个条件符合，比如name＝'igarashi',可能有两个name＝'igarashi'的行数据)。

        2.在&quot;插入和更新数据&quot;小节中，我们有提到模型的save()方法，这个方法会更新一行里的所有列。 而某些情况下，我们只需要更新行里的某几列。

        3.update方法的效率比save高,因为它仅仅对目标字段做了一次更改，而save，把一整列进行了重新修改（即变和没变的全改了）
            因此调用结果集（QuerySet）对象的update()方法，使SQL语句变得更高效，并且不会引起竞态条件。

        4.update()方法对于任何结果集（QuerySet）均有效，意味着可以同时更新多条记录update()方法会返回一个整型数值，表示受影响的记录条数。

        因为update返回的是一个整型，所以没法用query属性；对于每次创建一个对象，想显示对应的raw sql，需要在settings加上日志记录部分：
            LOGGING = {
                'version': 1,
                'disable_existing_loggers': False,
                'handlers': {
                    'console':{
                        'level':'DEBUG',
                        'class':'logging.StreamHandler',
                    },
                },
                'loggers': {
                    'django.db.backends': {
                        'handlers': ['console'],
                        'propagate': True,
                        'level':'DEBUG',
                    },
                }
            } #即把如上拷贝到settings中，执行任何操作的SQL语句打印出来

        注意：如果是多对多的改：（）下面是先删除再添加，显得比较麻烦
            obj=Book.objects.filter(id=1)[0]
            author=Author.objects.filter(id__gt=2)

            obj.author.clear()
            obj.author.add(*author)

            通常利用set()来进行更改：
            obj = Book.objects.filter(id=1).first()
            obj.author.set([1,2,3])  #它传入的是列表不用带*
            先获取书籍对应的对象，再利用set来进行更改其关联表的列属性，有则不动，没有增加或改动。反向还是利用_set
</code></pre>
<p>额外补充 -- 自关联：（ManyToMany 的自关联）必须要会！！！</p>
<pre><code>需求：现在要做一个交友网站，需要用户表中的男女数据建立关系：

1.给用户设定两张表：
    一张是男生表，另一张为女生表，再让他们分别关联id字段生成多对多的第三张表U2U

    弊端：为什么要给用户分别建立两张表？没必要啊

2.因此，此时给用户创建一张用户表：
    class Userinfo(models.Model):
        nickname = models.CharField(max_length=32)
        username = models.CharField(max_length=32)
        password = models.CharField(max_length=64)
        gender_choices = (
            (1,&quot; 男&quot;),
            (2,&quot; 女&quot;)
        )
        gender = models.IntegerField(choices=gender_choices)

    用如上方式设置男女的字段，此时省去了两张表的不科学。但是如何建立关联呢？

3.初步建立自关联：
    class U2U(models.Model):
        g = models.ForeignKey(&quot;UserInfo&quot;)
        b = models.ForeignKey(&quot;UserInfo&quot;)

    以上的U2U能否代表第一种两张表的关系？不能，首先它看着根本不明确。但若想要自己和自己建立关系只能如此写，并且g、b不能重复（自己约自己）

    此时不能创建成功，提示Error反向查找错误。若反向查找则是通过U2U查找UserInfo表
    &lt;1&gt;：obj = models.UserInfo.objects.filter(gender=1).first()  -- 我先获取一个男生对象
    &lt;2&gt;：obj.U2U_set.all()                                       -- 之后进行反向查找，此时找的是所有跟他关联表的女生对象
    &lt;3&gt;那么所有女生拿到的是所有相关的男生对象。但是他们本身就是在一张表中的，不是一个表拿另一个关联表数据这样的，因此这样写是区分不了的。
            即两个ForeignKey不知道找谁，因此如下改写
        g = models.ForeignKey(&quot;UserInfo&quot;,related_query_name=&quot;girl&quot;)
        b = models.ForeignKey(&quot;UserInfo&quot;,related_query_name=&quot;boy&quot;)
        表示若是反向查找的话_set就不是 u2u_set 而是girl/boy_set.all()   a、b代表男、女生对象 ，此时表建立成功

    再改为:
        g = models.ForeignKey(&quot;UserInfo&quot;,related_name=&quot;girl&quot;)
        b = models.ForeignKey(&quot;UserInfo&quot;,related_name=&quot;boy&quot;)
        则反向查找直接为a.all()/b.all()

    此时：即可人为规定
    1女  2女  3女  4男  5男      a1=2    a2=5
        U2U.objects.create(g_id=a1,b_id=a2)     人为规定g_id就是女 b_id就是男，一旦写反了男女性别就错了。因此一定要保证代码里面有约束

    related_name = &quot;xxxx&quot;       -- 作用就是反向查询时 如user_set 替换表名为xxxx

例：
    kk = model.UserInfo.objects.filter(id=1).first() #  UserInfo对象，kk，男

    result = kk.girls.all() #   和kk有关系的所有信息，此时获得一个U2U列表   [U2U对象,U2U对象,U2U对象,]

    for u in result: #  其中每一个u都是U2U对象  （包含了b_id,g_id）
        print(u.g.nickname) #   获取女生昵称  -- u.g即从这个U2U对象中获取女生对象（根据U2U对象的字段 g和b 获取女生对象g）

4.简单的方式建立自关联：
    m = models.ManyToManyField(&quot;UserInfo&quot;)
    都知道MTM通常用于多对多，两个表有多对多关联生成第三张表。但若UserInfo表关联自己，则表示两张表，存放了两个UserInfo的id

    此时数据库生成userinfo_m表 其中字段为form_userinfo_id 和 to_userinfo_id        让form_userinfo_id 为男生id 另一个对应
    &lt;1&gt;：kk = model.UserInfo.objects.filter(id=1).first()        # 获取Userinfo对象
    &lt;2&gt;：result = kk.m.all()                                     # 通过m，前面列：男生ID=1相关的所有女生 即from_userinfo_id

    &lt;1&gt;：cc = model.UserInfo.objects.filter(id=4).first()        #同上，已知id为4的性别女，获取女生UserInfo对象
    &lt;2&gt;：result = cc.userinfo_set.all()                          # 通过userinfo_set，后面列：女生ID 即to_usrinfo_id
</code></pre>
<p>额外补充 -- FK 自关联：</p>
<pre><code>class Comment(models.Model):（id默认为评论自增id）
    news_id = models.IntegerField()             #新闻ID
    content = models.CharField(max_length=32)   #评论内容
    user = models.CharField(max_length=32)      #评论者

&quot;&quot;&quot;
    新闻id                       reply_id            #这三个人都给一个新闻评论
1   1       别bb     root           null
2   1       就bb     root           null
3   1       瞎bb     igarashi       null
4   2       写得好    root           null            #此时要求列出第一条新闻有哪些人评论
5   1       有病啊    fuuka            2             #假设fuuka要回复root的第一条评论，从数据上无法看出是回复关联，他回复谁的？
6   1       啥玩意    Ryou             2             #此时代表有两个人给第二条评论进行回复
7   1       你有病    root             5             #给回复的评论回复
&quot;&quot;&quot;
此时这个reply的id则是2，是这条评论的自增id
&quot;&quot;&quot;
</code></pre>
<p>--结构关系如下：
第一条：
别 bb
就 bb -有病啊 -你有病 -啥玩意
瞎 bb
第二条：
写得好
&quot;&quot;&quot; 那么接下来这个 reply_id 如何写？ -- 这一列的数据是要把已有数据的 id 进行写入，若 id 不存在则不能成立</p>
<pre><code>故：reply_id = models.ForeignKey(&quot;Comment&quot;,null=True,blank=True，related_name=&quot;xxx&quot;)      --  称为ForeignKey的自关联
</code></pre>
</div></template>


