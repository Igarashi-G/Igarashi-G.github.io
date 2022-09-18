---
title: ORM-API
order: 7
---

接上文，查找重点：

    <4> 查（filter，value等)：
         查询相关API：
            <1>filter(**kwargs):      它包含了与所给筛选条件相匹配的对象（理解为Where查询条件）（放的是一组组的键值对如name="igarashi"，
                                      多个参则组成and条件）返回的QuerySet类型

            <2>all():                 查询所有结果  之后拿到的是集合对象QuerySet  不用all则对象为表对象（因此前端用表里得到的字段取）

            <3>get(**kwargs):         返回与所给筛选条件相匹配的对象，返回结果有且只有一个，如果符合筛选条件的对象超过一个或者没有都会抛出
                                      异常。与上面不同的是拿到的是单个的行对象

            -----------下面的方法都是对查询的结果再进行处理:比如 objects.filter.values()/.exists()--------

            <4>values(*field):        返回一个ValueQuerySet——一个特殊的QuerySet，运行后得到的并不是一系列model的实例化对象，而是一
                                      个可迭代的字典序列[{"id":1},{"type":"Fantasy"}]（简单来说相当于取了特定的列返回字典）
                                      例：.values('authorDetail__telephone')

            <5>exclude(**kwargs):     它包含了与所给筛选条件不匹配的对象

            <6>order_by(*field):      对查询结果排序  例:.order_by("-id")：id是从小到大排，用-id即为由大到小排

            <7>reverse():             对查询结果反向排序

            <8>distinct():            从返回结果中剔除重复纪录(使用较多)

            <9>values_list(*field):   它与values()非常相似，它返回的是一个元组序列[(1,"Fantasy")]，values返回的是一个字典序列，见上
                                      (因此前端用索引取)区别在于它只拿到值，而不像values那样拿到键值对

            <10>count():              返回数据库中匹配查询(QuerySet)的对象数量。

            <11>first():              返回第一条记录，不存在返回None（获取单个值比get好）

            <12>last():               返回最后一条记录

            <13>exists():             如果QuerySet包含数据，就返回True，否则返回False。用if XX.objects.filter(id=1)很慢，而这个方法
                                      则不用进行执行数据库语句即可判断是否存在（有用） -- 注意这里是在filter之后的不要在犯这种低级的错误了

         扩展查询,有时候Django的查询API不能方便的设置查询条件，提供了另外的扩展查询方法extra:
            extra(select=None, where=None, params=None, tables=None,order_by=None, select_params=None)

            (1)  Entry.objects.extra(select={'is_recent': "pub_date > '2006-01-01'"})
            (2)  Blog.objects.extra(
                    select=SortedDict([('a', '%s'), ('b', '%s')]),
                    select_params=('one', 'two'))

            (3)  q = Entry.objects.extra(select={'is_recent': "pub_date > '2006-01-01'"})
                 q = q.extra(order_by = ['-is_recent'])

            (4)  Entry.objects.extra(where=['headline=%s'], params=['Lennon'])

三、QuerySet 剖析：
之前初识过 QuerySet，现在进行剖析：
QuerySet 特点：
<1> 可迭代的： 可以利用 for 循环来迭代，每次取的即为表中的一行对象(XX.object 就是类啊)
<2> 可切片： 由于 QuerySet 继承列表因此可进行常规的列表操作

    惰性机制：
        所谓惰性机制：Publisher.objects.all()或者.filter()等都只是返回了一个QuerySet（查询结果集对象），它并不会马上执行sql，
            而是当调用QuerySet的时候才执行。（用到的时候才执行类似生成器）
        例：
            obj_set = models.Book.objecrs.filter(id=7)    #第一次做查询操作并不会马上执行sql（此时不会过数据库）
            for i in obj_set:                             #而是等到此时才执行sql （通过配置log即可查看）
                print(i.title)                            #之后把拿出的obj_set对象放到Django提供的缓存中
            #obj_set.update(title="oooo")                  #此时则是更新再走了一次数据库之后obj_set则也进行更新为更改后的数据对象
            for i in obj_set:                             #下次执行时，直接到缓存中拿，而不会再走一次数据库
                print(i.title)
            注：若利用切片操作则必定会走数据库，因为这又做下一步操作了。若用exists()则不会走缓存了（倒是会走数据库）

    QuerySet的高效使用：（结合上述例子）
        <1>利用Django-QuerySet的惰性机制：
            对于查找返回的一个QuerySet对象时没有运行任何的数据库查询（即没走数据库），因此可以加上一些过滤条件，或者将它传给某个函数，
            这些操作都不会发送给数据库。（数据库查询是显著影响web应用性能的因素之一）

        <2>QuerySet是具有cache的:
            当你遍历QuerySet时，所有匹配的记录会从数据库获取，然后转换成Django的model。这被称为执行（evaluation）.这些model会保存
            在QuerySet内置的cache中，这样如果你再次遍历这个queryset，你不需要重复运行通用的查询。

        <3>简单的使用if语句进行判断也会完全执行整个QuerySet并且把数据放入cache，虽然你并不需要这些数据！为了避免这个，可以用exists()
            方法来检查是否有数据

        <4>当QuerySet非常巨大时，cache会成为问题:
            处理成千上万的记录时，将它们一次装入内存是很浪费的。更糟糕的是，巨大的QuerySet可能会锁住系统进程，让你的程序濒临崩溃。
            要避免在遍历数据的同时产生queryset cache，可以使用iterator()方法来获取数据，处理完数据就将其丢弃。
            例：
                objs = Book.objects.all().iterator()   # iterator()可以一次只从数据库获取少量数据，这样可以节省内存
                for obj in objs:
                    print(obj.name)                    # BUT,再次遍历没有打印,因为迭代器已经在上一次遍历(next)到最后一次了,没得遍历了
                for obj in objs:
                    print(obj.name)

             #当然，使用iterator()方法来防止生成cache，意味着遍历同一个QuerySet时会重复执行查询。
             #所以使用iterator()的时候要当心，确保你的代码在操作一个大的QuerySet时没有重复执行查询

        总结:
            QuerySet的cache是用于减少程序对数据库的查询，在通常的使用下会保证只有在需要的时候才会查询数据库。使用exists()和iterator()方法
            可以优化程序对内存的使用。不过，由于它们并不会生成queryset cache，可能会造成额外的数据库查询。

        矛盾：
            1.数据库查询是显著影响web应用性能                         --->Django 提供缓存机制
            2.大量使用Django提供的缓存可能会造成程序濒临崩溃           --->利用exists()、iterator()改善（即不使用缓存）
            3.不生成缓存则会进行额外的数据库查询，又影响了web性能       --->下次使用还可能再调用数据库查询，再生成缓存
            因此要在这三者之间找平衡             --->即利用缓存机制用iterator防止生成缓存，没有下一次查询

四、对象查询，单表条件查询，多表条件关联查询： 1.对象形式的查找：！！！！！！！！！！！！！！！！！！(通过.的方式)
正向查找:（注意，这种方式只适用于一对一，一旦出现多！无法获取，见下）
ret1=models.Book.objects.first()
print(ret1.publisher.name) #多对一绑定的外键，publisher 是单一对象，一本书对应一个出版商，直接.name 即可取值 #但要小心一个出版商可对应着多本书,因此 Pobj.book.title 是无法获取书名的,一对多了！-error
#Pobj.book_set.all().values("title")只能用.all().values()获取多个出版书籍

        反向查找:（_set）
            ret2=models.Publish.objects.last()  #此时如何拿到与它绑定的Book对象呢? -- 利用book_set
            print(ret2.book_set.all().values("title"))      它：ret2.book_set.all()

            #它是跟Publish相关的所有book的集合对象QuerySet，_set相当于.objects,后面可接.objects可接的操作，比如.all().values()进行下一步筛选
            #用all取到所有内容即可进行.values("title"),结果是所有title相关publisher_id
            #相关的几本书名。因为是一对多的反向查询，因此一个出版社可关联好多本书，因此反向查询也是这些书的集合。
            #这里在values前面加all是一个习惯，其实也可以不加all，加all就是为了再取一遍

    2.了不起的双下划线(__)之单表条件查询：（模糊查询）
        models.Tb1.objects.filter(id__lt=10, id__gt=1)   # 获取id大于1 且 小于10的值

        models.Tb1.objects.filter(id__in=[11, 22, 33])   # 获取id等于11、22、33的数据
        models.Tb1.objects.exclude(id__in=[11, 22, 33])  # not in

        models.Tb1.objects.filter(name__contains="ven")  #包含ven关键字的相关字段
        models.Tb1.objects.filter(name__icontains="ven") # icontains大小写不敏感，即此时不区分大小写

            models.Tb1.objects.filter(id__range=[1, 2])      # 范围between and

        startswith，istartswith, endswith, iendswith="p" #分别是以p开头 、结尾

    3.了不起的双下划线(__)之多表条件关联查询：
         正向查找(条件)

            ret3=models.Book.objects.filter(title='Full Metal Panic').values('id')
            print(ret3) #[{'id': 1}]

         正向查找(条件)之一对多:（关联表__关联字段）

            ret4=models.Book.objects.filter(title="Full Metal Panic").values("publisher__name")
            print(ret4)  #[{'publisher__name': 'Fantasia文库'}]

         正向查找(条件)之多对多
            ret5=models.Book.objects.filter(title="Full Metal Panic").values("author__name")
            print(ret5)  #[{'author__name': '贺东招二'}, {'author__name': '四季童子'}]
            ret6=models.Book.objects.filter(author__name="贺东招二").values('title')
            print(ret6)  #[{'title': 'Full Metal Panic'}]

         注意:
          #正向查找的publisher__name或者author__name中的publisher,author是book表中绑定的字段
          #一对多和多对多在这里用法没区别

         反向查找(条件)其实不分的，正反一样

         反向查找之一对多:
            ret8=models.Publisher.objects.filter(book__title='Full Metal Panic').values('name')
            print(ret8)  #[{'name': 'Fantasia文库'}]  注意,book__title中的book就是Publisher的关联表名

            ret9=models.Publisher.objects.filter(book__title='Full Metal Panic').values('book__authors')
            print(ret9)  #[{'book__author': 1}, {'book__author': 2}]

         反向查找之多对多:
            ret10=models.Author.objects.filter(book__title='Full Metal Panic').values('name')
            print(ret10)  #[{'name': '贺东招二'}, {'name': '四季童子'}]

         注意:
          #正向查找的book__title中的book是表名Book
          #一对多和多对多在这里用法没区别

五、聚合查询和分组查询（了解）
聚合查询和分组查询都是聚合函数，区别在于 aggregate 是在结果集上做操作处理一个对象。而分组则是处理多个对象

    <1> aggregate(*args,**kwargs):
        通过对QuerySet进行计算，返回一个聚合值的字典。aggregate()中每一个参数都指定一个包含在字典中的返回值。即在查询集上生成聚合。
        from django.db.models import Avg,Min,Sum,Max  #通过导入聚合函数来计算平均值等操作
            models.Book.objects.all().aggregate(Avg('price'))

        aggregate()子句的参数描述了我们想要计算的聚合值
        aggregate()是QuerySet 的一个终止子句，意思是说，它返回一个包含一些键值对的字典。键的名称是聚合值的标识符，值是计算出来的聚合值。
        键的名称是按照字段和聚合函数的名称自动生成出来的。如果你想要为聚合值指定一个名称，可以向聚合子句提供它:（就是自定义名字）
            models.Book.objects.aggregate(average_price=Avg('price'))

        如果你也想知道所有图书价格的最大值和最小值，可以这样查询：
            models.Book.objects.aggregate(Avg('price'), Max('price'), Min('price'))

    <2> annotate(*args,**kwargs):
        可以通过计算查询结果中每一个对象所关联的对象集合，从而得出总计值(也可以是平均值或总和)，即为查询集的每一项生成聚合。

        如：查询各个作者出的书的总价格,这里就涉及到分组了，分组条件是authors__name
            models.Book.objects.values("author__name").annotate(Sum("price"))
            [{'author__name': '贺东招二', 'price__sum': 23.3}, {'author__name': '四季童子', 'price__sum': 23.3}]

        查询各个出版社最便宜的书价是多少:
            models.Book.objects.values("publisher__name").annotate(Min("price"))

        查询所有物料价格中包含库存物料的数据，切按价格进行分组，找出其中最便宜的一颗物料
        MaterialInfo.objects.filter(part_no__in=stock_list).annotate(Min("price")).order_by('-price')

六、F 查询和 Q 查询：（重点！灵活掌握）
仅仅靠单一的关键字参数查询已经很难满足查询要求。此时 Django 为我们提供了 F 和 Q 查询：
（若想要某字段的所有值全部+20）常规的.all().update(price="price"+20???)这样无法满足，因此利用 F

    F 使用查询条件的值,专门取对象中某列值的操作：
    from django.db.models import F  #导入F
    models.Book.objects.all().update(price=F("price")+20) 这样既可全部+20（注意只是为了加数字，千万不能加字符不然清零）

    Q 构建搜索条件：（OR 或关系）
        filter(a,b,c)只能完成 and操作,而Q则可以封装关键字查询

        from django.db.models import Q  # 导入Q
        models.Book.objects.filter(Q(id=2) | Q(title="Full Metal Panic"))  #此时即可用管道符"|"进行逻辑或的查询
        models.Book.objects.filter(Q(price__gt=20) & (Q(id=1) | Q(title="world")))  #用()进行关系的欠套，其中&是与and

        注意：若利用Q查询和filter中普通查询字段混用，要放到Q查询之后
          例：models.Book.objects.filter(Q(price__gt=20) & (Q(id=1) | Q(title="world")),color="red")

七、raw sql：
django 中 models 的操作,也是调用了 ORM 框架来实现的,pymysql 或者 mysqldb,所以我们也可以使用原生的 SQL 语句来操作数据库!

    from django.db import connection, connections
    # cursor = connection.cursor()  # cursor = connections['default'].cursor()
    # cursor.execute("""SELECT * from auth_user where id = %s""", [1])
    # row = cursor.fetchone()

    与直连进行对比：
    import MySQLdb
    def GetList(sql):
        db = MySQLdb.connect(user='root', db='igarashi', passwd='', host='localhost')
        cursor = db.cursor()
        cursor.execute(sql)
        data = cursor.fetchall()
        db.close()
        return data

八、ORM 无法解决的问题：
场景：找出每个作者出版的所以书的最高价格，以及最高价格那本书的名称：

    通常我们会想到分组，然后利用max进行查找。

    1.models.Author.object.annotate(price = Max(book__price)).values('book__title','price')
    - 分组依据按照author.id 去分的

    2.models.Author.object.values('name', 'id').annotate(price = Max(book_price)).values('price')
    - 分组依据按照自己定义的name、id去分的，但这个只取了最高价格，因此是正确的数据毋庸置疑。

    2等同于：
        select max(app01_book.price) from app01_author inner join app01_book_authors on app01_author.id = app01_book_author.author_id
        inner join app01_book on app01_book_author.book_id = app01_book.id
        group by app01_author.id, app01_author.name;


    但1. 中最后会发现，书名title  和价格是不相对应的，可能存在 <QuerySet [{'book__title: '单恋', 'price': Decimal('23.00')},
    {'book__title: '单恋', 'price': Decimal('45.50')}] 这样错误数据（注单恋价格21.00）。

    这是因为，作者中存在合出一本书的情况，然而，找最高价格和书却是按(id, 作者)分组因此书名会存在多个，那么分组最后不会像人一样，
    智能的知道取最贵的价格对应的那一条书本的数据。因此此时数据是错乱的。
    作者1：《往事》、《单恋》两本书 往事价格23.00
    作者2：《单恋》、《恶意》两本书 恶意价格45.50
    正常应该都取出 《往事》 23.00  《恶意》 45.50 这样的数据，但是这个分组取到的书而不是最贵的那本（不相关字段却合成一起）而是留取
    了每组中从上往下的第一条记录的结果。

    解决措施：
        ORM无法解决，只能用原生SQL去解决。利用sql_mode = only_full_group_by

    only_full_group_by:强制只找到只相关的数据，进行分组，此时不允许group_by 还能select * 这样无意义的操作，只能select group_by
        后面的字段。

    设置sql_mode:
        select @@sql_mode;  -- 查找出当前mysql设置的sql_mode
             -- STRICT_ALL_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER
             可能会拿到这样的结果，

        set sql_mode="STRICT_ALL_TABLES,ONLY_FULL_GROUP_BY";  -- 设置 only_full_group_by 全局用 set global sql_mode = ''
            -- 注意本地和线上的改动，不然会出bug，服务端线上重启也会导致设置失效，通过my.ini文件下，sql-mode='里面加'

        然后利用先找出最高作者对应的最高价钱，缩小范围，再次连接作者书关联表，进而连接book表、扩大范围，最后找到最高价格对应的书名即可。

    select * from (select app01_author.id, app01_author.name, max(app01_book.price) as m_price from app01_author
    inner join app01_book_authors on app01_author.id = app01_book_author.author_id
    inner join app01_book on app01_book_author.book_id = app01_book.id
    group by app01_author.id, app01_author.name) as t1
    inner join app01_book_authors on t1.id = app01_book_authors.author_id
    inner join app01_book on app01_book_author.book_id = app01_book.nid
    where t1.m_price = app01_book.price;

    以上则是找出正确结果的解决办法。

    若此时DBA不让更改sql_mode 如何解决：


    select max(app01_book.price) from (select app01_author.id, app01_book.title, app01_book.price from app01_author

        -- 若查询出一张表有重复列则不能合并，因此不能select * 留下分组依据的重复id字段、和所需字段即可。

        inner join app01_book_authors on app01_author.id = app01_book_author.author_id
        inner join app01_book on app01_book_author.book_id = app01_book.id
        order by app01_book.price desc ) as b   -- 若不括起来 as b，则会报错，sql不允许order 在 group前面
        group by app01_author.id, app01_author.name;


        取巧：由于mysql默认取出分组的第一条数据，那么就先在分组前对价格进行一个降序排序，然后再拿出分组后的结果，那么此时默认第一条
        即为最高价格的书名。(也不用去执行max 取最高价格了)

九 admin 的配置：（定制性太强，玩转了 admin 才能真正帮助到你，此时不必深究，所有的东西都能通过 admin 实现）
admin 是 django 强大功能之一，它能共从数据库中读取数据，呈现在页面中，进行管理。默认情况下，它的功能已经非常强大，如果你不需要复杂的功能，
它已经够用，但是有时候，一些特殊的功能还需要定制，比如搜索功能，下面这一系列文章就逐步深入介绍如何定制适合自己的 admin 应用。

    如果你觉得英文界面不好用，可以在setting.py 文件中修改以下选项
    LANGUAGE_CODE = 'en-us'  #LANGUAGE_CODE = 'zh-hans'

    一  认识ModelAdmin
        管理界面的定制类，如需扩展特定的model界面需从该类继承。

    二 注册medel类到admin的两种方式：
        <1> 使用register的方法
            admin.site.register(Book,MyAdmin)

        <2> 使用register的装饰器
            @admin.register(Book)


    三 掌握一些常用的设置技巧
        list_display:       指定要显示的字段
        search_fields:      指定搜索的字段
        list_filter:        指定列表过滤器
        ordering:           指定排序字段

    from django.contrib import admin
    from appname.models import *
    # Register your models here.

    # @admin.register(Book)#----->单给某个表加一个定制
    class MyAdmin(admin.ModelAdmin):  #继承ModelAdamin类
        list_display = ("title","price","publisher")   #即可进行定制Book的显示,显示的字段都是admin自动搜索出来的
        search_fields = ("title","publisher")
        list_filter = ("publisher",)
        ordering = ("price",)
        fieldsets =[
            (None,               {'fields': ['title']}),
            ('price information', {'fields': ['price',"publisher"], 'classes': ['collapse']}),
        ]

    admin.site.register(Book,MyAdmin)
    admin.site.register(Publish)
    admin.site.register(Author)


    注意：利用admin添加数据时要注意一对多和多对多之间的关系

十、ORM 的锁和事务：
https://www.cnblogs.com/clschao/articles/10463267.html

    一、锁：

    1.行级锁

        select_for_update(nowait=False, skip_locked=False) #注意必须用在事务里面，至于如何开启事务，我们看下面的事务一节。

        返回一个锁住行直到事务结束的查询集，如果数据库支持，它将生成一个 SELECT ... FOR UPDATE 语句。

        举个例子：

        entries = Entry.objects.select_for_update().filter(author=request.user)  #加互斥锁，由于mysql在查询时自动加的是共享锁，所以我们可以手动加上互斥锁。create、update、delete操作时，mysql自动加行级互斥锁
        所有匹配的行将被锁定，直到事务结束。这意味着可以通过锁防止数据被其它事务修改。

        一般情况下如果其他事务锁定了相关行，那么本查询将被阻塞，直到锁被释放。 如果这不想要使查询阻塞的话，使用select_for_update(nowait=True)。 如果其它事务持有冲突的锁，互斥锁, 那么查询将引发 DatabaseError 异常。你也可以使用select_for_update(skip_locked=True)忽略锁定的行。 nowait和　　skip_locked是互斥的，同时设置会导致ValueError。
        目前，postgresql，oracle和mysql数据库后端支持select_for_update()。 但是，MySQL不支持nowait和skip_locked参数。

        使用不支持这些选项的数据库后端（如MySQL）将nowait=True或skip_locked=True转换为select_for_update()将导致抛出DatabaseError异常，这可以防止代码意外终止。

2.表锁（了解）

    二、事务：
        关于MySQL的事务处理，我的mysql博客已经说的很清楚了，那么我们来看看Django是如果做事务处理的。django1.8版本之前是有很多种
        添加事务的方式的，中间件的形式（全局的）、函数装饰器的形式，上下文管理器的形式等，但是很多方法都在1.8版之后给更新了，
        下面我们只说最新的：

1 全局开启
　　　　在 Web 应用中，常用的事务处理方式是将每个请求都包裹在一个事务中。这个功能使用起来非常简单，你只需要将它的配置项 ATOMIC_REQUESTS 设置为 True。

它是这样工作的：当有请求过来时，Django 会在调用视图方法前开启一个事务。如果请求却正确处理并正确返回了结果，Django 就会提交该事务。否则，Django 会回滚该事务。
DATABASES = {
'default': {
'ENGINE': 'django.db.backends.mysql',
'NAME': 'mxshop',
'HOST': '127.0.0.1',
'PORT': '3306',
'USER': 'root',
'PASSWORD': '123',
'OPTIONS': {
"init_command": "SET default_storage_engine='INNODB'",
　　　　　　　#'init_command': "SET sql_mode='STRICT_TRANS_TABLES'", #配置开启严格 sql 模式

                }
                "ATOMIC_REQUESTS": True, #全局开启事务，绑定的是http请求响应整个过程
                "AUTOCOMMIT":False, #全局取消自动提交，慎用
            }，
        　　'other':{
        　　　　'ENGINE': 'django.db.backends.mysql',
                    ......
        　　} #还可以配置其他数据库
        }

        上面这种方式是统一个http请求对应的所有sql都放在一个事务中执行（要么所有都成功，要么所有都失败）。是全局性的配置， 如果
        要对某个http请求放水（然后自定义事务），可以用non_atomic_requests修饰器，那么他就不受事务的管控了

        from django.db import transaction

        @transaction.non_atomic_requests
        def my_view(request):
            do_stuff()

        @transaction.non_atomic_requests(using='other')
        def my_other_view(request):
            do_stuff_on_the_other_database()
        但是Django 文档中说，不推荐这么做。因为如果将事务跟 HTTP 请求绑定到一起的时，然而view 是依赖于应用程序对数据库的查询
        语句效率和数据库当前的锁竞争情况。当流量上来的时候，性能会有影响，知道一下就行了

        所以推荐用下面这种方式，通过 transaction.atomic 来更加明确的控制事务。atomic允许我们在执行代码块时，在数据库层面提供
        原子性保证。 如果代码块成功完成， 相应的变化会被提交到数据库进行commit；如果执行期间遇到异常，则会将该段代码所涉及的所有更改回滚。



    2 局部使用事务:
        atomic(using=None, savepoint=True)[source]  ，参数：using='other',就是当你操作其他数据库的时候，这个事务才生效，
        看上面我们的数据库配置，除了default，还有一个other，默认的是default。savepoint的意思是开启事务保存点，推荐看一下我数据库
        博客里面的事务部分关于保存点的解释。

        原子性是数据库事务的一个属性。使用atomic，我们就可以创建一个具备原子性的代码块。一旦代码块正常运行完毕，所有的修改会被提交
        到数据库。反之，如果有异常，更改会被回滚。

被 atomic 管理起来的代码块还可以内嵌到方法中。这样的话，即便内部代码块正常运行，如果外部代码块抛出异常的话，它也没有办法把
它的修改提交到数据库中。

用法 1：给函数做装饰器来使用

        from django.db import transaction

        @transaction.atomic
        def viewfunc(request):
            # This code executes inside a transaction.
            do_stuff()


        用法2：作为上下文管理器来使用，其实就是设置事务的保存点
        from django.db import transaction

        def viewfunc(request):
            # This code executes in autocommit mode (Django's default).
            do_stuff()

            with transaction.atomic():   #保存点
                # This code executes inside a transaction.
                do_more_stuff()

            do_other_stuff()


        一旦把atomic代码块放到try/except中，完整性错误就会被自然的处理掉了，比如下面这个例子：
        from django.db import IntegrityError, transaction

        @transaction.atomic
        def viewfunc(request):
            create_parent()

            try:
                with transaction.atomic():
                    generate_relationships()
            except IntegrityError:
                handle_exception()

            add_children()

        用法3：还可以嵌套使用，函数的事务嵌套上下文管理器的事务，上下文管理器的事务嵌套上下文管理器的事务等。下面的是函数嵌套上下文的例子：
        from django.db import IntegrityError, transaction

        @transaction.atomic
        def viewfunc(request):
            create_parent()

            try:
                with transaction.atomic():
                    generate_relationships()
        　　　　　　　#other_task()  #还要注意一点，如果你在事务里面写了别的操作，只有这些操作全部完成之后，事务才会commit，也就是说，如果你这个任务是查询上面更改的数据表里面的数据，那么看到的还是事务提交之前的数据。
            except IntegrityError:
                handle_exception()

            add_children()


        这个例子中，即使generate_relationships()中的代码打破了数据完整性约束，你仍然可以在add_children()中执行数据库操作，
        并且create_parent()产生的更改也有效。需要注意的是，在调用handle_exception()之前，generate_relationships()中的修改
        就已经被安全的回滚了。因此，如果有需要，你照样可以在异常处理函数中操作数据库。

        尽量不要在atomic代码块中捕获异常

        因为当atomic块中的代码执行完的时候，Django会根据代码正常运行来执行相应的提交或者回滚操作。如果在atomic代码块里面捕捉并
        处理了异常，就有可能隐盖代码本身的错误，从而可能会有一些意料之外的不愉快事情发生。

        担心主要集中在DatabaseError和它的子类（如IntegrityError）。如果这种异常真的发生了，事务就会被破坏掉，而Django会在代码
        运行完后执行回滚操作。如果你试图在回滚前执行一些数据库操作，Django会抛出TransactionManagementError。通常你会在一个ORM
        相关的信号处理器抛出异常时遇到这个行为。

        捕获异常的正确方式正如上面atomic代码块所示。如果有必要，添加额外的atomic代码块来做这件事情，也就是事务嵌套。
        这么做的好处是：当异常发生时，它能明确地告诉你那些操作需要回滚，而那些是不需要的。


        为了保证原子性，atomic还禁止了一些API。像试图提交、回滚事务，以及改变数据库连接的自动提交状态这些操作，在atomic代码块中
        都是不予许的，否则就会抛出异常。

    　　下面是Django的事务管理代码：

        - 进入最外层atomic代码块时开启一个事务；
        - 进入内部atomic代码块时创建保存点；
        - 退出内部atomic时释放或回滚事务；注意如果有嵌套，内层的事务也是不会提交的，可以释放（正常结束）或者回滚
        - 退出最外层atomic代码块时提交或者回滚事务；
         　　　　你可以将保存点参数设置成False来禁止内部代码块创建保存点。如果发生了异常，Django在退出第一个父块的时候执行回滚，
         如果存在保存点，将回滚到这个保存点的位置，否则就是回滚到最外层的代码块。外层事务仍然能够保证原子性。然而，这个选项应该仅仅用于保存点开销较大的时候。毕竟它有个缺点：会破坏上文描述的错误处理机制。


        注意：transaction只对数据库层的操作进行事务管理,不能理解为python操作的事务管理

        def example_view(request):
        tag = False
        with transaction.atomic():
            tag = True
            change_obj() # 修改对象变量
            obj.save()
            raise DataError
        print("tag = ",tag) #结果是True，也就是说在事务中的python变量赋值，即便是事务回滚了，这个赋值也是成功的


        还要注意：如果你配置了全局的事务，它和局部事务可能会产生冲突，你可能会发现你局部的事务完成之后，如果你的函数里面其他的
        sql除了问题，也就是没在这个上下文管理器的局部事务包裹范围内的函数里面的其他的sql出现了问题，你的局部事务也是提交不上的，
        因为全局会回滚这个请求和响应所涉及到的所有的sql，所以还是建议以后的项目尽量不要配置全局的事务，通过局部事务来搞定，当然了
        ，看你们的业务场景。


        transaction的其他方法:
        @transaction.atomic
        def viewfunc(request):

        a.save()
        # open transaction now contains a.save()
        sid = transaction.savepoint()  #创建保存点

        b.save()
        # open transaction now contains a.save() and b.save()

        if want_to_keep_b:
          transaction.savepoint_commit(sid) #提交保存点
          # open transaction still contains a.save() and b.save()
        else:
          transaction.savepoint_rollback(sid)  #回滚保存点
          # open transaction now contains only a.save()

        transaction.commit() # 手动提交事务，默认是自动提交的，也就是说如果你没有设置取消自动提交，那么这句话不用写，
                               # 如果你配置了那个AUTOCOMMIT=False，那么就需要自己手动进行提交。

        为保证事务的隔离性，我们还可以结合上面的锁来实现，也就是说在事务里面的查询语句，咱们使用select_for_update显示的加锁方式
        来保证隔离性，事务结束后才会释放这个锁，例如：（了解）
        @transaction.atomic ## 轻松开启事务
        def handle(self):
            ## 测试是否存在此用户
            try:
                ## 锁定被查询行直到事务结束
                user =
            User.objects.select_for_update().get(open_id=self.user.open_id)
                #other sql 语句
            except User.DoesNotExist:
                raise BaseError(-1, 'User does not exist.')


        通过Django外部的python脚本来测试一下事务：
        import os

        if __name__ == '__main__':
            os.environ.setdefault("DJANGO_SETTINGS_MODULE", "BMS.settings")
            import django
            django.setup()

            import datetime
            from app01 import models

            try:
                from django.db import transaction
                with transaction.atomic():
                    new_publisher = models.Publisher.objects.create(name="火星出版社")
                    models.Book.objects.create(title="橘子物语", publish_date=datetime.date.today(), publisher_id=10)  # 指定一个不存在的出版社id
            except Exception as e:
                print(str(e))

        下面再说一些设置事务的小原则吧：

        1.保持事务短小
        2.尽量避免事务中rollback
        3.尽量避免savepoint
        4.默认情况下，依赖于悲观锁
        5.为吞吐量要求苛刻的事务考虑乐观锁
        6.显示声明打开事务
        7.锁的行越少越好，锁的时间越短越好
