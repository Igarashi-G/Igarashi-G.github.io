import{_ as r}from"./plugin-vueexport-helper-DlAUqK2U.js";import{c as a,a as e,b as n,o as t}from"./app-BFWhIhUk.js";const o={};function i(l,s){return t(),a("div",null,s[0]||(s[0]=[e("p",null,[n("SQLAlchemy："),e("br"),e("img",{src:"http://www.igarashi.icu:8999/img/sqlalchemy.png"})],-1),e("p",null,[n("一、sqlalchemy 安装："),e("br"),n(" 在 Python 中，最有名的 ORM 框架是 SQLAlchemy。用户包括 openstack＼Dropbox 等知名公司或应用。"),e("br"),n(" 主要用户列表"),e("a",{href:"http://www.sqlalchemy.org/organizations.html#openstack",target:"_blank",rel:"noopener noreferrer"},"http://www.sqlalchemy.org/organizations.html#openstack")],-1),e("pre",null,[e("code",null,`    安装：
        pip install SQLAlchemy
        pip install pymysql  #由于mysqldb依然不支持py3，所以这里我们用pymysql与sqlalchemy交互

    组成部分：
        <1>Engine，框架的引擎
        <2>Connection Pooling ，数据库连接池
        <3>Dialect，选择连接数据库的DBAPI种类
        <4>Schema/Types，架构和类型
        <5>SQL Exprression Language，SQL表达式语言

    由于SQLAlchemy本身无法操作数据库，其必须以来pymsql等第三方插件Dialect用于和数据API进行交流，

    DBAPI：
        根据配置文件的不同调用不同的数据库API，从而实现对数据库的操作，如：
        MySQL-Python
            mysql+mysqldb://<user>:<password>@<host>[:<port>]/<dbname>

            注：MySQL-python貌似只支持python2.7 win环境还会报错，就别费劲了，直接pymysql

        pymysql
            mysql+pymysql://<username>:<password>@<host>/<dbname>[?<options>]

        MySQL-Connector
            mysql+mysqlconnector://<user>:<password>@<host>[:<port>]/<dbname>

        cx_Oracle
            oracle+cx_oracle://user:pass@host:port/dbname[?key=value&key=value...]

        更多详见：http://docs.sqlalchemy.org/en/latest/dialects/index.html


二、概要：
    ORM框架通常分为两类：    -DB first / code first
        DB first：即先创建数据库和表，之后则生成对应表的类。（手动创建数据库及表，通过框架自动生成类）
        code first：即先写代码，利用代码来创建表。（手动创建数据库和类，通过ORM框架，自动生成数据库中的表）
    SQLAlchemy属于code first，而Django则两个都可以。

    SQLAlchemy ORM类 转化为SQL语句需要通过 SQLAlchemy Core 部分的 Schema/Types和SQL Expression language 来实现。
    内部架构见图。

三、sqlalchemy基本使用：
    a.功能
    数据类型：通过from sqlalchemy import 各种类型都有（引入需要的数据类型）

        -创建数据库表 ：通过创建的类的形式创建。与类不同：表字段没有写在init中，但本质上内部会copy到init里。
            -连接数据库：（不是sqlalchemy做的，而是pymysql做的，它只负责转换连接的sql语句转换给pymsql，让其连接执行，
                            同理mysqldb也可以。）
            -类转化SQL语句：
                类-->表
                对象-->行

        class UserType(Base):
            __tablename__ = "usertype"
            id = Cloumn(Interger,primary_key=True,autoincrement=True)
            title = Cloumn(String(16),unique=True)

        class Users(Base):
            __tablename__ = "users"                     #表名为users
            id = Cloumn(Integer,primary_key=True)       #id字段=Cloumn代表库中的每一列，里面写各种参数，非空、索引、默认等
            name = Cloumn(String(32),nullable=True)
            user_type_id = Cloumn(integer,ForeignKey("usertype.id"))    #创建外键关联，多对一用户类型

            __table_args__ = (
                UniqueConstraint("id","name",name="uix_id_name"),   #UniqueConstarint指让id和name联合唯一，并设置索引名
                index("ix_id_name","name","extra"),     #加索引,与上不同的是索引名字要设置在前
            )

    创建引擎：
        engine = create_engine("mysql+pymysql://root:123@127.0.0.1:3306/testdb/charset=utf8",max_overflow=5)
        #若有密码写在root:之后，端口3306后接那个数据库，编码是什么。指定后交给sqlalchemy，它会解析字符串远程连接。
        部分参数：
            max_overflow：允许的最大额外连接数量，这些连接会被挂起，进入队列等待，直到连接池有空余位置。实际上标志了等待队列的大小。
            pool：连接池对象，需为SqlAlchemy中Pool类型或其子类的实例，当参数为None时候，将使用连接参数来构造连接池，非None时，
                将使用pool指定的连接池
            pool_size：连接池中允许的并发连接数量，不同的子连接类型对于无限连接的设置可能不同，请参阅相关文档。
            pool_recycle：连接回收时间，单位为秒，即当超过连接时间时，连接将被回收。-1表示不回收。实际上不同的数据库还有自己
                的默认回收时间。对于MySql，若连接在8小时内无动作时将启动自动回收。
            echo = False：是否对所有命令进行日志记录，输出地默认为sys.stout,即控制台的CMD界面（打印row sql）。
            echo_pool = False : 是否记录连接与断开连接信息，输出地默认为sys.stout。

        create_engine方法具有丰富的定制参数，实际上在使用的时候，除去connect_args之外，其余的只要使用默认参数，SqlAlchemy就可以工作的很好。

    事件：（触发短信邮件通知）
        说是触发器，其实并不是触发器，这是sqlalchemy中的钩子，也称为事件，在触发某个操作的时候执行某个函数。
        def __connect_handle(dbapi_connection, connection_record):
            dbapi_connection.query('SET time_zone=\\'+08:00\\';')
            logger.debug('SET time_zone=\\'+08:00\\';')

        event.listen(engine, 'connect', self.__connect_handle)
        listen(表单或表单字段, 触发事件, 回调函数, 是否改变插入值)    -- 这里是引擎，回调函数是__connect_handle
        通过listen()或listens_for()装饰器来订阅事件（参考文档）


    构造表结构的基类：
        构造的这个基类会 被赋予一个元类，元类能根据构建的表生成Table对象
        Base = declarative_base() 貌似必须这么写，这是规定
        之后创建的Users必须继承Base，

        之后通过基类Base的元类下的方法即可创建表对应的类：
        Base.metadata.create_all(engine)    #create_all表示找到py文件中所有类，直接在数据库中创建表。
        Base.metadata.drop_all(engine)      #能创建自然能删除，drop_all默认就会把类对应的表删除。

    创建元数据：
        MetaData：Table对象及其关联的模式构造的集合。它是一个容器对象，它将所描述的数据库（或多个数据库）的许多不同特性保持在一起。

        除了上文用Base.metadata来创建数据之外，当然也可以创建一个
        metadata = MetaData(bind=engine)
        绑定引擎好处是，后续很多调用 （比如 MetaData.create_all()，Table.create()，等等）就不用指定引擎了。
        创建元数据对象无非就是省去了通过基类来调用这一步骤，可以直接通过metadata.create()进行创建

    创建会话：
        有了数据引擎和数据表之后就可以对数据库进行增删改查操作了，但是要通过什么来进行通信？

        首先，要创建一个Session（会话类）,Session可以认为是从engine创建的连接池中拿出一个连接。（如上所述，engine是创建连接的）
            Session = sessionmaker(bind=engine)     # 创建一个Sessoin对象绑定引擎，就是要从engine里面拿出一个连接
            session = Session()                     # 起个名叫session，这里就是连接的意思

            session.commit()                        # 向数据库提交
            session.close()                         # 关闭连接

            sessin.rollback()                       # 回滚当前正在进行的事务

    管理会话：
        提供Session对象生命周期的管理。采用的注册模式，简单来说，是指在整个程序运行的过程当中，只存在唯一的一个session对象。
        Session = scoped_session(session_maker)
        some_session = Session()

        由于scoped session采用的是注册模式，因此下面代码的session1和session2是一个相同的对象引用。
        session1 = Session()
        session2 = Session()

        scoped_session本质上是一个全局变量。可是，如果直接把session定义成全局变量，在多线程的环境下，会造成线程同步的问题。
        为此，scoped session在默认情况下，采用的线程本地化存储方式。也就是说，每个线程的session对象是不同的。这样，不同线程
        对数据库的操作不会相互影响。

        还包含方法configure()：重新配置sessionmaker、remove()：将首先调用Session.close()，之后将Session丢弃。在下一次使用同一
        范围内时，将生成一个新 对象。（具体参考文档）


    b.CURD：
        增加：
            obj1 = UserType(title="普通用户")        # 数据初始化，若要添加多条数据，可以用列表放入对个对象。
            session.add(obj1)                       # 添加数据，将对象放入session

        查询：
            session.query(UserType)           # 此时输出的是查询的SQL语句
            .all()                            # 则获取全部数据，返回list类型，里面的每一个元素是UserType类型即它的对象
            .filter()                         # 过滤，里面即可加入过滤条件，如UserType.id>2，相当于where

        删除：
            session.delete()                  # 处理关联数据，配置了cascade='all,delete-orphan'，则删除从表的数据
            session.query(UserType.id).filter(UserType.id<2).delete()  # 先查询后删除对应的数据，不处理关联，无则报错

        修改：
            session.query(UserType.title).filter(UserType.id>2).update({"title":"白金"})    # 此时的写法为字典，而不是==或赋值
                批量也如此，就会把符合结果的直接批量修改
            .update({UserType.title:UserType + "233"},synchronize_session=False)    # 在原来基础上进行添加，
            .update({UserType.title:UserType + 1},synchronize_session="evaluate")    # 根据数字和字符串类型不同，后续参数设置不同


四、sqlalchemy其他操作
    线程安全，基于本地线程实现每个线程用同一个session
    特殊的：scoped_session中有原来方法的Session中的一下方法：

    开启多线程：
        Session = sessionmaker(bind=engine)
        def task(arg):
            session = Session()

            obj1 = Users(name="igarashi")
            session.add(obj1)

            session.commit()

        for i in range(10):
            t = threading.Thread(target=task, args=(i,))
            t.start()

    通配符：
        ret = session.query(Users).filter(Users.name.like('e%')).all()  # e% 以e开头的所有，e_ 以e开头的一个
        ret = session.query(Users).filter(~Users.name.like('e%')).all() # ~ 指 not in

    限制：
        ret = session.query(Users)[1:2]

    # 排序
    ret = session.query(Users).order_by(Users.name.desc()).all()
    ret = session.query(Users).order_by(Users.name.desc(), Users.id.asc()).all()

    # 分组
    from sqlalchemy.sql import func

    ret = session.query(Users).group_by(Users.extra).all()
    ret = session.query(
        func.max(Users.id),
        func.sum(Users.id),
        func.min(Users.id)).group_by(Users.name).all()

    ret = session.query(
        func.max(Users.id),
        func.sum(Users.id),
        func.min(Users.id)).group_by(Users.name).having(func.min(Users.id) >2).all()

    # 连表
    ret = session.query(Users, Favor).filter(Users.id == Favor.nid).all()

    ret = session.query(Person).join(Favor).all()

    ret = session.query(Person).join(Favor, isouter=True).all()

    select_from：
        q = session.query(Address).select_from(User).join(User.addresses).filter(User.name == 'ed')
        select_from明确的设置查询子句（其实多于join连用，来控制根据那张表来左连接）
        如上，查询Address表，但是按照User表的address字段进行左连接，得出的即是按照User表的实体，User表有的Address没有则Null

    # 组合
    q1 = session.query(Users.name).filter(Users.id > 2)
    q2 = session.query(Favor.caption).filter(Favor.nid < 2)
    ret = q1.union(q2).all()

    q1 = session.query(Users.name).filter(Users.id > 2)
    q2 = session.query(Favor.caption).filter(Favor.nid < 2)
    ret = q1.union_all(q2).all()

    # if/then表达式 if[满足条件] 执行then后语句，只要有条件不满足，则运行else
    case([
                (users_table.c.name == 'wendy', 'W'),  等同于   WHEN (name = :name_1) THEN :param_1
                (users_table.c.name == 'jack', 'J')             WHEN (name = :name_2) THEN :param_2
            ],
            else_='E'                                           ELSE :param_3
        )
    case(
            {"wendy": "W", "jack": "J"},        简写形式
            value=users_table.c.name,
            else_='E'
        )

    # 执行原生sql：
    cursor = session.execute('insert into users(name) values(:value)',params={"value":'wupeiqi'})

    # 连接表达式：
    and_(users_table.c.name == 'wendy', users_table.c.enrolled == True)  -- python &  需要括号
    or_(users_table.c.name == 'wendy', users_table.c.name == 'jack')     -- python |  需要括号


备注：
    .filter(SelfDefinedService.cycle.op('&')(cycle_byte) != 0) # 其中的.op()可能是为了进行 & 运算的

    实现计数器字段的原子递增：
        session.query(table).update({table.counter: table.counter + 1})
        session.commit()

    大批量插入测试数据：
        如： 此时需要用原生SQL，用ORM会很影响速度
        session.execute(
            User.__table__.insert(),
            [{'name': \`randint(1, 100)\`,'age': randint(1, 100)} for i in xrange(10000)]
        )

    打印Row SQL：
        若为engine_from_config()：方法配置，通过配置字典中的echo: true 来控制显示
        若为create_engine()：方法配置，通过参数echo=True来控制
        若为Flask-SQLAlchemy：通过配置app.config["SQLALCHEMY_ECHO"] = True来控制

    危险的in_操作：
        当删除、更新 涉及到批量的in_操作时，添加条件synchronize_session=False。因为会默认会尝试更新、删除 session 中符合条件的对象
        而in操作不支持，故解决办法就是删除、更新时不对 session进行同步，直接进行删除和更新，然后再让 session 里的所有实体都过期。
        另：不要使用in_查询一个空的可迭代对象，若必须，就在创建这个语句之前做个判断，判断ids是不是为空。
`)],-1)]))}const y=r(o,[["render",i]]),p=JSON.parse('{"path":"/database/MySQL/SQLAlchemy.html","title":"SQLAlchemy基础","lang":"zh-CN","frontmatter":{"title":"SQLAlchemy基础","order":1,"group":{"title":"SQLAlchemy","order":36},"description":"SQLAlchemy： 一、sqlalchemy 安装： 在 Python 中，最有名的 ORM 框架是 SQLAlchemy。用户包括 openstack＼Dropbox 等知名公司或应用。 主要用户列表http://www.sqlalchemy.org/organizations.html#openstack","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"SQLAlchemy基础\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-09-19T13:52:15.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"悦·宝宝\\",\\"url\\":\\"https://github.com/Igarashi-G\\"}]}"],["meta",{"property":"og:url","content":"https://igarashi-g.github.io/database/MySQL/SQLAlchemy.html"}],["meta",{"property":"og:site_name","content":"悦 ▪ 宝宝"}],["meta",{"property":"og:title","content":"SQLAlchemy基础"}],["meta",{"property":"og:description","content":"SQLAlchemy： 一、sqlalchemy 安装： 在 Python 中，最有名的 ORM 框架是 SQLAlchemy。用户包括 openstack＼Dropbox 等知名公司或应用。 主要用户列表http://www.sqlalchemy.org/organizations.html#openstack"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-09-19T13:52:15.000Z"}],["meta",{"property":"article:modified_time","content":"2023-09-19T13:52:15.000Z"}]]},"git":{"createdTime":1665586687000,"updatedTime":1695131535000,"contributors":[{"name":"Igarashi","username":"Igarashi","email":"2545369032@qq.com","commits":3,"url":"https://github.com/Igarashi"}]},"readingTime":{"minutes":9.29,"words":2786},"filePathRelative":"database/MySQL/SQLAlchemy.md","excerpt":"<p>SQLAlchemy：<br>\\n<img src=\\"http://www.igarashi.icu:8999/img/sqlalchemy.png\\"></p>\\n<p>一、sqlalchemy 安装：<br>\\n在 Python 中，最有名的 ORM 框架是 SQLAlchemy。用户包括 openstack＼Dropbox 等知名公司或应用。<br>\\n主要用户列表<a href=\\"http://www.sqlalchemy.org/organizations.html#openstack\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">http://www.sqlalchemy.org/organizations.html#openstack</a></p>","autoDesc":true}');export{y as comp,p as data};
