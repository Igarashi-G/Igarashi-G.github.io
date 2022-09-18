---
title: RabbitMQ
order: 1
group:
  title: 消息队列
  order: 33
---

RabbitMQ 队列：（重要组件）
消息队列，非常 nb。通用很多种语言，不同语言之间，不同机器上实现队列。--消息中间件（开发语言是 erlang 爱立信开发，改代码局部生效，热插拔）
线程 q 实现了同一个进程之间的不同线程的交互（两个进程之间的线程 q 不能互相通信）
进程 Q 实现了不同进程之间的数据交互。

    异步-实现大并发（专业级别的，甩py几十条街，工作原理相同）
        前端可以写一万个命令，可能最多能承载10个并发，但是可以把一万个人的任务先接过来，慢慢执行
        实现前提：没有同步要求，提交的任务不具备实时性（实时性：比如支付、飞机监测、自动驾驶）例如：抢购、股票分 实时的和委托，委托即队列
        让它以某个价格去买。

    安装 http://www.rabbitmq.com/install-standalone-mac.html

    安装python rabbitMQ module（python用它专门的模块pika）

    pip install pika
    or
    easy_install pika
    or
    源码

    https://pypi.python.org/pypi/pika

一、实现最简单的队列通信
假设有三个应用程序，都用队列但相互不影响，则可以 rabbitmq 可以开三个队列互不干涉。rabbitmq 可以开成千上万个队列。避免混淆，队列名要唯一。
p1 ----> crm <----c1 : p1 给 crm 发一个消息，那么 c1 可以从 crm 中取。（为了方便理解）实际上是如下操作
p1（客户端先发消息给）---->EX1（交换）---->crm 队列（把消息放到队列）<------c1（客户端再取）现在来看 exchange 没有存在的必要。

    send端：
        见sender.py

    receive端：
        见receive.py

    远程连接rabbitmq server的话，需要配置权限：（无论win还是linux上有一个管理工具rabbitmqctl）：

        1.首先在rabbitmq server上创建一个用户并分配角色
            sudo rabbitmqctl  add_user name pass
            sudo rabbitmqctl  set_user_tags name administrator  　　

        2.同时还要配置权限，允许从外面访问(必须)
            sudo rabbitmqctl set_permissions -p / alex ".*" ".*" ".*"   # 授权，表示所有ip地址都能访问

        3.客户端连接的时候需要配置认证参数
            credentials = pika.PlainCredentials('name', 'pass')

            connection = pika.BlockingConnection(pika.ConnectionParameters(
                '192.168.80.133',5672,'/', credentials=credentials))
            channel = connection.channel()

        注：用apt装的rabbitmq-server的话重启服务在/etc/init.d/rabbitmq-server restart

            查看队列用list_queues记住要root 故sudo rqbbitmqctl list_queues!


    <1>启动sender.py之后消息发送出去了[x] Sent 'Hello World!'，在队列中没有人接收。

    <2>在启动receive.py得到以下数据，我们分别把callback 的参数打印:
        body：[x] Received b'Hello World!' --消息主体

        ch：<BlockingChannel impl=<Channel number=1 OPEN conn=<SelectConnection OPEN
        socket=('192.168.80.1', 53140)->('192.168.80.133', 5672) params=<ConnectionParameters host=192.168.80.133 port=5672
        virtual_host=/ ssl=False>>>>  --Channel（通道）的实例

        method：<Basic.Deliver(['consumer_tag=ctag1.9864f567cc3546f8913049fcf361a370', 'delivery_tag=1', 'exchange=', 'redelivered=False',
        'routing_key=hello'])>  -- routing_key ：q名 ，exchange为空 服务器发送消息后带来的参数

        properties：<BasicProperties> -- 属性，没什么东西

    <3>start_consuming()是一个死循环，此时程序一直等待 -- 像select：一直监听
        通过终端的sudo rabbitmqctl list_queues 也可以查看当前队列

    <4>当启动两个receive时，设置recv中 channel.basic_qos(prefetch_count=1) 。每次运行sender发消息变为公平的依次分发。p即send - 生产者、
        c即recv - 消费者  在这种模式下，RabbitMQ会默认把p发的消息依次分发给各个消费者(c),跟负载均衡差不多。
        （一个机器配置不高的消费者那里堆积了很多消息处理不完，同时配置高的消费者却一直很轻松。可以在各个消费者端，配置perfetch=1 --负载均衡）
        告诉RabbitMQ在我这个消费者当前消息还没处理完的时候就不要再给我发新消息了。

    <5>为什么在recv中又重新声明了q：即又一次的channel.queue_declare(queue='hello')?
        你知道生产者和消费者是谁先启动的吗？若现在还没生产呢，队列都没有，消费者先来排队了，那么消费者在哪儿排呢？
        买包子，就连包子店都还没有，此时怎么办？那买包子的就先建一个包子店。即消费者先建一个队列，因此需要再声明，就怕消费者先启动了，此时还没有q。

        若生产者已经声明了，消费者仅需检测是否有这个q，没有才声明。因此recv中是为了保险起见。

二、实现队列消息的安全分发

    问题：当队列中的消息发送给消费者，消费者死了，怎么办？  -- 即消费者到包子店吃包子，吃一半噎死了，怎么办？

    思考：要求消费者，消费完后必须给一个回馈，表示自己真正吃完了，才认为你是安全的消费完毕。 -- 即有个回复。消费者处理完必须给服务端一个响应。

    实际情况：当no_ack=True时。 若消费进程死了，recv不发消息，该消费者死就死了，消息丢失，因此是不安全的。

    改动：recv中注释 no_ack=True，callback中加上ch.basic_ack(delivery_tag=method.delivery_tag)这一句作为唯一标识符的确认。
         send中不用动什么，可以修改message用"".join(sys.argv[1:])来接收脚本外的参数

    结果：此时若把正在处理队列消息的消费者杀死，则队列中的消息依然保存。若再开一个消费者则会把之前消费者处理一半的消息回滚，重新处理。
        或是把保存在队列中的消息接着上次的继续处理。

    结论：改动的即是实现了消息安全分发的原因。basic_ack即消费者处理完消息返回标识符。（思考完成）

三、实现队列&队列消息的持久化

    问题：生产者发布了一个消息，此时消息队列如果挂了，怎么办？ -- 即包子铺着火了，rabbitmq宕机了，怎么办。（包子铺不在了，如何保住包子）

    实际情况：rabbitmq宕了，重启restart，发现别说消息，队列都没了。 -- 即做包子的工具都没了

    改动：设置durable=True，durable持续的意思，可以让队列永久保存。recv中再声明的参数durable默认false，报错，因此不再声明。

    改动再次验证情况：此时restart，设置了durable的队列还在，但是队列中的消息却没了。 -- 包子铺保住了，包子没了。（实现队列持久化）

    再改动：在send中加上 properties=pika.BasicProperties(delivery_mode=2,) 这个参数，make message persistent 代表消息持久化。

    结论：这种改动应该使队列即消息存到了硬盘上，下次启动时读取即可。

四、消息的订阅发布：
一面是一对一的消息，而多对多则利用发布 - 订阅模式。类似广播：你打开收音机就能听到广播，并且它这个广播是实时性的：你没打开这个消息就没了。
不像之前的一对一，消费者不在线还会帮你存着。没人接收的话广播完毕就完了。-- 因此用到了 exchange

    exchange的作用：
        问题：你要广播，怎么广播啊？所有人监听一个队列？那么谁监听到了，谁就把消息拿走即可。那么别人把消息收到了，你就没消息可拿了。

        思考：所以应该给每个消费者一个队列。那么用循环给每一个队列发送实在太慢了。把消息发到转发器，转发器负责把消息广播出去。
             因此需要给转发器定义好规则，谁订阅了它，它就向那个队列发。因此exchange的作用就是转发消息

        认识：广播类型有好几种：除了全广播、还应该有组广播，只给某一组的发消息。因此有以下三种：
            1.fanout: 所有bind到此exchange的queue都可以接收消息             -- 即全广播，所有订阅转发器的都能接收消息
            2.direct: 通过routingKey和exchange决定的那一组可以接收消息      -- 组播
            3.topic:所有符合routingKey(此时可以是一个表达式)的routingKey所bind的queue可以接收消息 --根据特征自定义
            4.headers: 通过headers 来决定把消息发给哪些queue（基本不用）

        　　 表达式符号说明：#代表一个或多个字符，*代表任何字符
              例：#.a会匹配a.a，aa.a，aaa.a等
                  *.a会匹配a.a，b.a，c.a等
             注：使用RoutingKey为#，Exchange Type为topic的时候相当于使用fanout　

        改动：生产者则改为exchange_declare(exchange="交换机名",exchange_type="fanout")此后指明的不是队列queue，而是exchange 和对应type
             消费者改动：result = channel.queue_declare(exclusive=True)队列是不是要唯一啊？但你自己起名字不就起重了，所以让rabbitmq自动分配
                一个唯一的id。exclusive=True会在消费者断开后，自动将queue删除。
                queue_name = result.method.queue 拿到随机生成的q。之后要绑定到路由上channel.queue_bind(exchange="交换机名",queue=queue_name)
                让交换机把消息发给所有绑定这台交换机的q
                basic_consume 里面的 queue 也要改队列名 queue_name

        应用：聊天的群消息就可以用它@all。微博其实应该是，你关注一个人，他发的消息你能看到。完全实时的视频直播算是，但却有不同。像直播的架构
            如何保证上百万人全国各个地方看都不卡？若所有人都连到北京的一个机房就完了，瘫了。所以花椒的架构是，设立一个中心节点，外面围了一圈。
            首先它把直播的视频切片，就socket传，可能每一秒中就切个片，切完就立刻传输到各个下设节点上。之后不同的节点转到各个地方。所以各个
            地方连接的都是各个地方的子节点（相当于视频镜像，子节点一直向上同步）。所以最nb的延迟能控制在1s之中。 直播还是挺有技术含量的。
            视频通话是点对点的，流量不是很大。所以一对多容易出问题，会卡。

        想法：
            web端关闭，下次重启时，获取队列消息，如库存做出了某些改动，通知消费者（同时订阅库存改动的用户）

五、消息订阅发布之组播：

    问题：如何根据消息的级别，来接收不同级别的消息？

    改动：send端：
            1.exchange_declare里面的exchange_type="direct"组播形式。
            2.severity = sys.argv[1:] if len(sys.argv) > 1 else 'info'  定义严重级别、程度 ,recv端根据级别来接收
            3.basic_publish中的routing_key=severity  发出不同级别的组播（即发出不同组的消息）
         recv端：
            1.同上，改exchange_declare里面的exchange_type
            2.severities = sys.argv[1:]  拿到的是一个列表，跟几个level就绑定几个severities，这里为了指定订阅消息的分组
            3.if not severities:    若没有定义分组则退出，报个错
                sys.stderr.write("Usage:%s [info] [warning] [error]\n" % sys.argv[0])
                sys.exit(1)
            4.for severity in severities:  # 循环绑定，有几个绑定几个，即绑定指定的那些组
                channel.queue_bind(exchange="direct_logs",
                                   queue=queue_name,
                                   routing_key=severity)  # 之后它就会监听，所有发到绑定的info、error...组的就会被监听，实现按组订阅

    结果：

六、更细致的消息过滤：

    问题：若想更加细致的，比如要根据多个标准来进行路由怎么办？

    改动：仅需把send端和recv端的exchange_type 改为'topic'即可。

    结果：可以实现recv端的按照提供的形式进行过滤。
        1.比如要接收所有日志用 #
        2.要从mysql接收所有日志用 mysql.*
        3.要接收关于redis的所有日志信息用 *.redis
        4.创建多个绑定可以用 mysql.error.* *.info
        5.发布的话则 发布.py info（级别） Helloxxx（信息）

七、Remote procedure call (RPC)：

    场景：模拟远程SSH，SSHClient（生产者p） 向 SSHServer（消费者c）发送消息 通过ssh_cmd队列。执行完之后结果返回。

    问题：如何返回，把结果在向ssh_cmd队列发送吗？行吗？

    答：不行，这会出现一个严重的问题，一个严重的死循环，生产者发一条消息，消费者不断的从ssh队列拿消息，拿完了之后还向ssh队列不断的发消息。
        发完了再拿。这是不是就拿到自己刚发的消息了？然后就死循环、死循环。

    问题2：那么此时你要把结果返回给client怎么办

    思考：那就在生成一个额外的新队列ssh_res用于返回，这样就不会有问题了

    认识：这个队列就称为RPC,远程过程调用。说白了就是可以远程执行一条命令（任何东西），立刻拿到结果。这是一个短连接，连上之后夸嚓断开。
        win、nux默认都有，它不是一个长连接。在server端定义好，只要发这个命令，就可以调对应的接口，就能对应接口的任务。  -- 双向队列

    问题3：发消息时不准商定好返回结果放到那个队列里，此时如何走通？

    思考：既然服务器端不知道要把结果返回那个队列，那么只好让客户端提前先生成一个队列，在发消息的时候附加reply_to=ssh_result 队列中。

    问题4：现在客户端向队列里发多条指令，此时命令按顺序排到队列里，交给服务器端异步处理，但返回的结果分别对应是那一条指令的？

    思考：给每一条命令加唯一标识符，收结果时，看是否能和唯一标识符对应。利用uuid
