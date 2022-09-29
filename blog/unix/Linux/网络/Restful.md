---
title: RESTful规范
order: 4
---

RESTful 规范介绍：
初识 RESTful 架构：
越来越多的人开始意识到，网站即软件，而且是一种新型的软件。
5G 的腾空出世，用发展的眼光来看的话。下载一个 2GB 的电影仅需要 1、2 秒，此时往本地方硬盘的意义就不大了。网上读取比本地硬盘还快，
我为什么要放硬盘啊？

        这种"互联网软件"采用浏览器/服务器模式。分布式的体系，通过互联网通信，具有高延时（high latency）、高并发等特点。（现在肯定比本地慢很多）

        网站开发，完全可以采用软件开发的模式。但是传统上，软件和网络是两个不同的领域，很少有交集；软件开发主要针对单机环境，网络则主要研究
        系统之间的通信。互联网的兴起，使得这两个领域开始融合，现在我们必须考虑，如何开发在互联网环境中使用的软件。
        restful是目前最流行的一种互联网软件架构。

    一、起源：
        REST是2000年Roy Thomas Fielding在博士论文中提出的。（HTTP协议1.0、1.1的主要设计者、Apache服务器软件的作者之一）
        研究的是计算机的两大前沿---软件和网络的交叉点。改变应用程序的互动风格。

    二、名称：
        Representational State Transfer：表现层状态转化。    如果一个架构符合REST原则，就称它为RESTful架构。

    三、资源（Resources）：
        REST的名称"表现层状态转化"中，省略了主语。"表现层"其实指的是"资源"（Resources）的"表现层"。
        啥？即网络上的信息（文本、图片、歌....）可以用URI（网络资源定位符）访问独一无二的识别符。上网，即与网上一系列资源的互动，调用URI。

    四、表现层（Representation）：
        "资源"是一种信息实体，它可以有多种外在表现形式。我们把"资源"具体呈现出来的形式，叫做它的"表现层"（Representation）。
        比如，文本可以用txt格式表现，也可以用HTML格式、XML格式、JSON格式表现，甚至可以采用二进制格式；图片可以用JPG格式表现，也可以用PNG格式表现。

        URI仅代表资源实体，严格的说，部分网址后缀.html是不必要的，因为后缀名表示格式，属于"表现层"范畴，而URI应该只代表"资源"的位置。
        它的具体表现形式，应该在HTTP请求的头信息中用Accept和Content-Type字段指定，这两个字段才是对"表现层"的描述。
        实际上html应该写在Content-Type里，Django就是这么干的。

    五、状态转化（State Transfer）：
        HTTP是无状态协议，所有状态都是保存在服务端上的。如果客户端要操作服务器，必须通过某种手段让服务端发生状态转化。
        这种转化要先通过它这个表现格式拿到数据，基于这种格式去更改。（即数据一改，状态即发生变化）
        客户端能用到的手段只能是HTTP协议。即对应四个操作GET：获取资源、POST新建资源、PUT更新资源、DELETE删除资源。

    六、综述：
        1.每一个URI代表一种资源（资源：URI）
        2.客户端和服务器之间，传递这种资源的某种表现层（HTML格式、XML格式、JSON格式，表现层：用什么格式传递数据）
        3.客户端通过四个HTTP动词，对服务器端资源进行操作，实现"表现层状态转化"（用四个方法转化状态）
        RESTful就是一堆API的设计规范（可以理解为是一堆url的设计规范，即定义好按什么样的规则来访问服务器端的数据）

    七、误区：
        1.最常见的就是URI包含动词。因为资源是一种实体，所以应该只有名词，动词应放于HTTP协议中。（开发中URL切忌动词）
            若有些就是动词，比如转账transfer，也要转为名词形式transaction
        2.另一个就是URI中包含版本号。如http://www.example.com/app/1.0/foo  这是不合适的
            因为不同版本，应该理解为不同的表现形式。所以应该采用同一个URI，在请求头中用Accept字段来进行区分。
            Accept:vnd.example-com.foo+json;version=1.0

        *注，虽说restfull规范建议版本号放在请求头而不是url里，但事实上为了使用方便，大多数开发者还是喜欢把版本号放在url上，这样容易直观区分

Restful API 设计指南：(如何设计一套合理、好用的 API)
一、协议
API 与用户通信，总是使用 HTTPs 协议（通信加密，就算被劫持了，也看不见数据，主流，运维负责）

    二、域名
        应该尽量将API部署在专用域名之下。
        https://api.example.com
        如果确定API很简单，不会有进一步扩展，可以考虑放在主域名下。　　
        https://example.org/api/


    三、版本（Versioning）
        应该将API的版本号放入URL。
        https://api.example.com/v1/

        另一种做法是，将版本号放在HTTP头信息中，但不如放入URL方便和直观。Github采用这种做法。

    四、路径（Endpoint）
        路径又称"终点"（endpoint），表示API的具体网址。

        在RESTful架构中，每个网址代表一种资源（resource），所以网址中不能有动词，只能有名词，而且所用的名词往往与数据库的表格名对应。一般来说，数据库中的表都是同种记录的"集合"（collection），所以API中的名词也应该使用复数。

        举例来说，有一个API提供动物园（zoo）的信息，还包括各种动物和雇员的信息，则它的路径应该设计成下面这样。

        https://api.example.com/v1/zoos
        https://api.example.com/v1/animals
        https://api.example.com/v1/employees

    五、HTTP动词
        对于资源的具体操作类型，由HTTP动词表示。

        常用的HTTP动词有下面五个（括号里是对应的SQL命令）。

        1.GET（SELECT）：从服务器取出资源（一项或多项）。
        2.POST（CREATE）：在服务器新建一个资源。
        3.PUT（UPDATE）：在服务器更新资源（客户端提供改变后的完整资源）。
        4.PATCH（UPDATE）：在服务器更新资源（客户端提供改变的属性）。
        5.DELETE（DELETE）：从服务器删除资源。
        还有两个不常用的HTTP动词。

        6.HEAD：获取资源的元数据。
        7.OPTIONS：获取信息，关于资源的哪些属性是客户端可以改变的。
        下面是一些例子。

            GET /zoos：列出所有动物园
            POST /zoos：新建一个动物园
            GET /zoos/ID：获取某个指定动物园的信息
            PUT /zoos/ID：更新某个指定动物园的信息（提供该动物园的全部信息）
            PATCH /zoos/ID：更新某个指定动物园的信息（提供该动物园的部分信息）
            DELETE /zoos/ID：删除某个动物园
            GET /zoos/ID/animals：列出某个指定动物园的所有动物
            DELETE /zoos/ID/animals/ID：删除某个指定动物园的指定动物

    六、过滤信息（Filtering）
        如果记录数量很多，服务器不可能都将它们返回给用户。API应该提供参数，过滤返回结果。

        下面是一些常见的参数。

        ?limit=10：指定返回记录的数量
        ?offset=10：指定返回记录的开始位置。
        ?page=2&per_page=100：指定第几页，以及每页的记录数。
        ?sortby=name&order=asc：指定返回结果按照哪个属性排序，以及排序顺序。
        ?animal_type_id=1：指定筛选条件

        参数的设计允许存在冗余，即允许API路径和URL参数偶尔有重复。比如，GET /zoo/ID/animals 与 GET /animals?zoo_id=ID 的含义是相同的。

    七、状态码（Status Codes）
        服务器向用户返回的状态码和提示信息，常见的有以下一些（方括号中是该状态码对应的HTTP动词）。

        200 OK - [GET]：服务器成功返回用户请求的数据，该操作是幂等的（Idempotent）。
        201 CREATED - [POST/PUT/PATCH]：用户新建或修改数据成功。
        202 Accepted - [*]：表示一个请求已经进入后台排队（异步任务）见的少是因为网站不是异步的，用Tronado异步就会经常看见
        204 NO CONTENT - [DELETE]：用户删除数据成功。
        301
        302
        304
        400 INVALID REQUEST - [POST/PUT/PATCH]：用户发出的请求有错误，服务器没有进行新建或修改数据的操作，该操作是幂等的。
        401 Unauthorized - [*]：表示用户没有权限（令牌、用户名、密码错误）。
        403 Forbidden - [*] 表示用户得到授权（与401错误相对），但是访问是被禁止的。
        404 NOT FOUND - [*]：用户发出的请求针对的是不存在的记录，服务器没有进行操作，该操作是幂等的。
        406 Not Acceptable - [GET]：用户请求的格式不可得（比如用户请求JSON格式，但是只有XML格式）。
        410 Gone -[GET]：用户请求的资源被永久删除，且不会再得到的。
        422 Unprocesable entity - [POST/PUT/PATCH] 当创建一个对象时，发生一个验证错误。
        500 INTERNAL SERVER ERROR - [*]：服务器发生错误，用户将无法判断发出的请求是否成功。百分之百后台出问题

        状态码的完全列表参见https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html。

    八、错误处理（Error handling）
        如果状态码是4xx，就应该向用户返回出错信息。一般来说，返回的信息中将error作为键名，出错信息作为键值即可。

        {
            error: "Invalid API key"
        }
        现在返回都是json，命名通常用error。应该加错误代码，解决方案才是好的返回信息。（是在不行把自己的电话放在上面）

    九、返回结果
        针对不同操作，服务器向用户返回的结果应该符合以下规范。

        GET /collection：返回资源对象的列表（数组）如列表。列表套字典
        GET /collection/resource：返回单个资源对象 即一个字典
        POST /collection：返回新生成的资源对象
        PUT /collection/resource：返回完整的资源对象
        PATCH /collection/resource：返回完整的资源对象
        DELETE /collection/resource：返回一个空文档

    十、Hypermedia API
        RESTful API最好做到Hypermedia，即返回结果中提供链接，连向其他API方法，使得用户不查文档，也知道下一步应该做什么。

        比如，当用户向api.example.com的根目录发出请求，会得到这样一个文档。

            {"link": {
              "rel":   "collection https://www.example.com/zoos",
              "href":  "https://api.example.com/zoos",
              "title": "List of zoos",
              "type":  "application/vnd.yourformat+json"
            }}
        上面代码表示，文档中有一个link属性，用户读取这个属性就知道下一步该调用什么API了。rel表示这个API与当前网址的关系（collection关系，并给出该collection的网址），href表示API的路径，title表示API的标题，type表示返回类型。

        Hypermedia API的设计被称为HATEOAS。Github的API就是这种设计，访问api.github.com会得到一个所有可用API的网址列表。

            {
              "current_user_url": "https://api.github.com/user",
              "authorizations_url": "https://api.github.com/authorizations",
              // ...
            }
        从上面可以看到，如果想获取当前用户的信息，应该去访问api.github.com/user，然后就得到了下面结果。


            {
              "message": "Requires authentication",
              "documentation_url": "https://developer.github.com/v3"
            }
        上面代码表示，服务器给出了提示信息，以及文档的网址

    十一、其他
        （1）API的身份认证应该使用OAuth 2.0框架。
            为了吸引用户，用户又懒得注册麻烦，利用第三方登录认证。但要认证才行，即第三方若QQ认可登录，那么就能登录网站。
            /oauth/XXX../client_id=xxxx     --这是网站的id，网站在QQ那里注册了一个id,QQ才会帮你验证。你就告诉腾讯你的网站是什么，在告诉腾讯
                有那个QQ用户访问你的网站，QQ帮你验证。如果验证成功了则在告诉这个网站。
            &response_type=token ... http://.../yourwebpage/    --返回到你这个url告诉你验证是否成功。成功即网站拿到返回的数据并跳转。

            可以申请接入，之后再页面a标签中onclick加一段连接即可。有详细的文档。

        （2）服务器返回的数据格式，应该尽量使用JSON，避免使用XML。

    十二、Django rest framework最佳实践
        http://www.cnblogs.com/alex3714/articles/7131523.html

        pip下载djangorestframework

        配置INSTALLED_APPS = [
            'rest_framework',
        ]　　
        再加入一下到settings里面
        REST_FRAMEWORK = {
            # Use Django's standard `django.contrib.auth` permissions,
            # or allow read-only access for unauthenticated users.
            'DEFAULT_PERMISSION_CLASSES': [
                'rest_framework.permissions.DjangoModelPermissionsOrAnonReadOnly'
            ]
        }


        1.把数据从数据库取出，并序列化（要有序列化的格式）应该有个负责序列化的类
        2.把数据库里的model对象，交给序列化的类去进行序列化
        3.返回给前端

    创建序列化的类rest_serializer即如下：
        from django.contrib.auth.models import User     # 你的app 如：from app01 import models
        from rest_framework import serializers

        # Serializers define the API representation.
            class Meta:
                model = User    # 你的数据库表，如：model = models.User
                fields = ('url', 'username', 'email', 'is_staff')   # 你要显示的字段url必填


    之后创建一个rest_views当做视图：
        from rest_framework import viewsets

        from app01 import models
        from app01.rest_serializer import UserSerializer    # 规定死的必须这么写
        # ViewSets define the view behavior.
        class UserViewSet(viewsets.ModelViewSet):
            queryset = models.User.objects.all()    # 把数据取出来
            serializer_class = UserSerializer       # 交给它取序列化

    最后配置url
        from rest_framework import routers
        from app01.rest_views import UserViewSet

        # Routers provide an easy way of automatically determining the URL conf.
        router = routers.DefaultRouter()        # 定义了一个router的实例
        router.register(r'users', UserViewSet)  # 然后注册

        # Wire up our API using automatic URL routing.
        # Additionally, we include login URLs for the browsable API.
        urlpatterns = [
            url(r'^', include(router.urls)),    # 即上面实例化的实例可改为r'^api/$'，总入口还是Django，但是router是自己的
            url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))  # 这里的想写法改为了注册的格式
        ]

    之后登陆app01/api/显示Api Root 即根
    HTTP 200 OK
    Allow: GET, HEAD, OPTIONS
    Content-Type: application/json
    Vary: Accept
    {
        "users": "http://127.0.0.1:8080/app01/api/users/"   # 点击则取出了所有用户fields定义显示的字段
    }

    真正返回给前端的是GET旁边选择的json字段?format=json
    HyperlinkedModelSerializer为显示连接，若想要关联的外键字段的id则ModelSerializer
    若还要取下一层的数据则可以设置depth = 2，甚至都能取到外键关联的、外键、多对多数据（没定义都能出的来）
