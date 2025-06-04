import{_ as i}from"./plugin-vueexport-helper-DlAUqK2U.js";import{c as n,d as a,o as e}from"./app-RYoJSJfx.js";const l={};function t(h,s){return e(),n("div",null,s[0]||(s[0]=[a(`<p><strong>RabbitMQ</strong> 是一个 <strong>Erlang</strong> 开发的，通用多种语言、不同语言间、不同机器上实现的消息队列，其支持热插拔</p><p><a href="https://www.rabbitmq.com/download.html" target="_blank" rel="noopener noreferrer">[安装地址]</a> | <a href="https://www.rabbitmq.com/documentation.html" target="_blank" rel="noopener noreferrer">[官方文档]</a></p><p><a href="https://rabbitmq.mr-ping.com/tutorials_with_python/%5B1%5DHello_World.html" target="_blank" rel="noopener noreferrer">[中文Tutorials]</a> | <a href="https://github.com/pika/pika/tree/main/examples" target="_blank" rel="noopener noreferrer">[pika examples]</a></p><h3 id="_1-amqp协议" tabindex="-1"><a class="header-anchor" href="#_1-amqp协议"><span>1. AMQP协议</span></a></h3><p>线程 q 实现了同一个进程之间的不同线程的交互（两个进程之间的线程 q 不能互相通信）<br> 进程 Q 实现了不同进程之间的数据交互。</p><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">异步-实现大并发（专业级别的，甩py几十条街，工作原理相同）</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">    前端可以写一万个命令，可能最多能承载10个并发，但是可以把一万个人的任务先接过来，慢慢执行</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">    实现前提：没有同步要求，提交的任务不具备实时性（实时性：比如支付、飞机监测、自动驾驶）例如：抢购、股票分</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> 实时的和委托，委托即队列</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">    让它以某个价格去买。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">安装</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> http://www.rabbitmq.com/install-standalone-mac.html</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">安装python</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> rabbitMQ</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> module（python用它专门的模块pika）</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">pip</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> install</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> pika</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">or</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">easy_install</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> pika</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">or</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">源码</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">https://pypi.python.org/pypi/pika</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>一、实现最简单的队列通信<br> 假设有三个应用程序，都用队列但相互不影响，则可以 rabbitmq 可以开三个队列互不干涉。rabbitmq 可以开成千上万个队列。避免混淆，队列名要唯一。<br> p1 ----&gt; crm &lt;----c1 : p1 给 crm 发一个消息，那么 c1 可以从 crm 中取。（为了方便理解）实际上是如下操作<br> p1（客户端先发消息给）----&gt;EX1（交换）----&gt;crm 队列（把消息放到队列）&lt;------c1（客户端再取）现在来看 exchange 没有存在的必要。</p><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">send端：</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">    见sender.py</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">receive端：</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">    见receive.py</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">远程连接rabbitmq</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> server的话，需要配置权限：（无论win还是linux上有一个管理工具rabbitmqctl）：</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">    1.首先在rabbitmq</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> server上创建一个用户并分配角色</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">        sudo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> rabbitmqctl</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">  add_user</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> name</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> pass</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">        sudo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> rabbitmqctl</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">  set_user_tags</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> name</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> administrator</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">  　　</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">    2.同时还要配置权限，允许从外面访问(必须</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">        sudo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> rabbitmqctl</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> set_permissions</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -p</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> /</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> alex</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &quot;.*&quot;</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &quot;.*&quot;</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &quot;.*&quot;</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">   # 授权，表示所有ip地址都能访问</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">    3.客户端连接的时候需要配置认证参数</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">        credentials</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> =</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> pika.PlainCredentials</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">&#39;name&#39;</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">,</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &#39;pass&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">        connection</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> =</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> pika.BlockingConnection</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">pika.ConnectionParameters(</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">            &#39;192.168.80.133&#39;</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">,5672,</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">&#39;/&#39;</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">,</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> credentials=credentials</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">))</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">        channel</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> =</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> connection.channel</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">()</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">    注：用apt装的rabbitmq-server的话重启服务在/etc/init.d/rabbitmq-server</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> restart</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">        查看队列用list_queues记住要root</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> 故sudo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> rqbbitmqctl</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> list_queues!</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>&lt;1&gt;启动sender.py之后消息发送出去了[x] Sent &#39;Hello World!&#39;，在队列中没有人接收。

&lt;2&gt;在启动receive.py得到以下数据，我们分别把callback 的参数打印:
    body：[x] Received b&#39;Hello World!&#39; --消息主体

    ch：&lt;BlockingChannel impl=&lt;Channel number=1 OPEN conn=&lt;SelectConnection OPEN
    socket=(&#39;192.168.80.1&#39;, 53140)-&gt;(&#39;192.168.80.133&#39;, 5672) params=&lt;ConnectionParameters host=192.168.80.133 port=5672
    virtual_host=/ ssl=False&gt;&gt;&gt;&gt;  --Channel（通道）的实例

    method：&lt;Basic.Deliver([&#39;consumer_tag=ctag1.9864f567cc3546f8913049fcf361a370&#39;, &#39;delivery_tag=1&#39;, &#39;exchange=&#39;, &#39;redelivered=False&#39;,
    &#39;routing_key=hello&#39;])&gt;  -- routing_key ：q名 ，exchange为空 服务器发送消息后带来的参数

    properties：&lt;BasicProperties&gt; -- 属性，没什么东西

&lt;3&gt;start_consuming()是一个死循环，此时程序一直等待 -- 像select：一直监听
    通过终端的sudo rabbitmqctl list_queues 也可以查看当前队列

&lt;4&gt;当启动两个receive时，设置recv中 channel.basic_qos(prefetch_count=1) 。每次运行sender发消息变为公平的依次分发。p即send - 生产者、
    c即recv - 消费者  在这种模式下，RabbitMQ会默认把p发的消息依次分发给各个消费者(c),跟负载均衡差不多。
    （一个机器配置不高的消费者那里堆积了很多消息处理不完，同时配置高的消费者却一直很轻松。可以在各个消费者端，配置perfetch=1 --负载均衡）
    告诉RabbitMQ在我这个消费者当前消息还没处理完的时候就不要再给我发新消息了。

&lt;5&gt;为什么在recv中又重新声明了q：即又一次的channel.queue_declare(queue=&#39;hello&#39;)?
    你知道生产者和消费者是谁先启动的吗？若现在还没生产呢，队列都没有，消费者先来排队了，那么消费者在哪儿排呢？
    买包子，就连包子店都还没有，此时怎么办？那买包子的就先建一个包子店。即消费者先建一个队列，因此需要再声明，就怕消费者先启动了，此时还没有q。

    若生产者已经声明了，消费者仅需检测是否有这个q，没有才声明。因此recv中是为了保险起见。
</code></pre><p>二、实现队列消息的安全分发</p><pre><code>问题：当队列中的消息发送给消费者，消费者死了，怎么办？  -- 即消费者到包子店吃包子，吃一半噎死了，怎么办？

思考：要求消费者，消费完后必须给一个回馈，表示自己真正吃完了，才认为你是安全的消费完毕。 -- 即有个回复。消费者处理完必须给服务端一个响应。

实际情况：当no_ack=True时。 若消费进程死了，recv不发消息，该消费者死就死了，消息丢失，因此是不安全的。

改动：recv中注释 no_ack=True，callback中加上ch.basic_ack(delivery_tag=method.delivery_tag)这一句作为唯一标识符的确认。
     send中不用动什么，可以修改message用&quot;&quot;.join(sys.argv[1:])来接收脚本外的参数

结果：此时若把正在处理队列消息的消费者杀死，则队列中的消息依然保存。若再开一个消费者则会把之前消费者处理一半的消息回滚，重新处理。
    或是把保存在队列中的消息接着上次的继续处理。

结论：改动的即是实现了消息安全分发的原因。basic_ack即消费者处理完消息返回标识符。（思考完成）
</code></pre><p>三、实现队列&amp;队列消息的持久化</p><pre><code>问题：生产者发布了一个消息，此时消息队列如果挂了，怎么办？ -- 即包子铺着火了，rabbitmq宕机了，怎么办。（包子铺不在了，如何保住包子）

实际情况：rabbitmq宕了，重启restart，发现别说消息，队列都没了。 -- 即做包子的工具都没了

改动：设置durable=True，durable持续的意思，可以让队列永久保存。recv中再声明的参数durable默认false，报错，因此不再声明。

改动再次验证情况：此时restart，设置了durable的队列还在，但是队列中的消息却没了。 -- 包子铺保住了，包子没了。（实现队列持久化）

再改动：在send中加上 properties=pika.BasicProperties(delivery_mode=2,) 这个参数，make message persistent 代表消息持久化。

结论：这种改动应该使队列即消息存到了硬盘上，下次启动时读取即可。
</code></pre><p>四、消息的订阅发布：<br> 一面是一对一的消息，而多对多则利用发布 - 订阅模式。类似广播：你打开收音机就能听到广播，并且它这个广播是实时性的：你没打开这个消息就没了。<br> 不像之前的一对一，消费者不在线还会帮你存着。没人接收的话广播完毕就完了。-- 因此用到了 exchange</p><pre><code>exchange的作用：
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

    改动：生产者则改为exchange_declare(exchange=&quot;交换机名&quot;,exchange_type=&quot;fanout&quot;)此后指明的不是队列queue，而是exchange 和对应type
         消费者改动：result = channel.queue_declare(exclusive=True)队列是不是要唯一啊？但你自己起名字不就起重了，所以让rabbitmq自动分配
            一个唯一的id。exclusive=True会在消费者断开后，自动将queue删除。
            queue_name = result.method.queue 拿到随机生成的q。之后要绑定到路由上channel.queue_bind(exchange=&quot;交换机名&quot;,queue=queue_name)
            让交换机把消息发给所有绑定这台交换机的q
            basic_consume 里面的 queue 也要改队列名 queue_name

    应用：聊天的群消息就可以用它@all。微博其实应该是，你关注一个人，他发的消息你能看到。完全实时的视频直播算是，但却有不同。像直播的架构
        如何保证上百万人全国各个地方看都不卡？若所有人都连到北京的一个机房就完了，瘫了。所以花椒的架构是，设立一个中心节点，外面围了一圈。
        首先它把直播的视频切片，就socket传，可能每一秒中就切个片，切完就立刻传输到各个下设节点上。之后不同的节点转到各个地方。所以各个
        地方连接的都是各个地方的子节点（相当于视频镜像，子节点一直向上同步）。所以最nb的延迟能控制在1s之中。 直播还是挺有技术含量的。
        视频通话是点对点的，流量不是很大。所以一对多容易出问题，会卡。

    想法：
        web端关闭，下次重启时，获取队列消息，如库存做出了某些改动，通知消费者（同时订阅库存改动的用户）
</code></pre><p>五、消息订阅发布之组播：</p><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">问题：如何根据消息的级别，来接收不同级别的消息？</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">改动：send端：</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">        1.exchange_declare里面的exchange_type</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">=</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">&quot;direct&quot;</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">组播形式。</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">        2.severity</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> =</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> sys.argv[1:]</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> if</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> len</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">sys.argv</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">) &gt; </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">1</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> else</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &#39;info&#39;</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">  定义严重级别、程度</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> ,recv端根据级别来接收</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">        3.basic_publish中的routing_key</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">=severity</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">  发出不同级别的组播（即发出不同组的消息）</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">     recv端：</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">        1.同上，改exchange_declare里面的exchange_type</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">        2.severities</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> =</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> sys.argv[1:]</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">  拿到的是一个列表，跟几个level就绑定几个severities，这里为了指定订阅消息的分组</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">        3.if</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> not</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> severities:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">    若没有定义分组则退出，报个错</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">            sys.stderr.write(</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">&quot;Usage:%s [info] [warning] [error]\\n&quot;</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> %</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> sys.argv[0]</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">            sys.exit(1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">        4.for</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> severity</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> in</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> severities:</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">  # 循环绑定，有几个绑定几个，即绑定指定的那些组</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">            channel.queue_bind(exchange</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">=</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">&quot;direct_logs&quot;</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">,</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">                               queue</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">queue_name,</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">                               routing_key</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">severity</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)  </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># 之后它就会监听，所有发到绑定的info、error...组的就会被监听，实现按组订阅</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">结果：</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>六、更细致的消息过滤：</p><pre><code>问题：若想更加细致的，比如要根据多个标准来进行路由怎么办？

改动：仅需把send端和recv端的exchange_type 改为&#39;topic&#39;即可。

结果：可以实现recv端的按照提供的形式进行过滤。
    1.比如要接收所有日志用 #
    2.要从mysql接收所有日志用 mysql.*
    3.要接收关于redis的所有日志信息用 *.redis
    4.创建多个绑定可以用 mysql.error.* *.info
    5.发布的话则 发布.py info（级别） Helloxxx（信息）
</code></pre><p>七、Remote procedure call (RPC)：</p><pre><code>场景：模拟远程SSH，SSHClient（生产者p） 向 SSHServer（消费者c）发送消息 通过ssh_cmd队列。执行完之后结果返回。

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
</code></pre>`,21)]))}const k=i(l,[["render",t]]),d=JSON.parse('{"path":"/python/%E7%94%9F%E6%80%81/%E6%B6%88%E6%81%AF%E9%98%9F%E5%88%97/RabbitMQ.html","title":"RabbitMQ","lang":"zh-CN","frontmatter":{"title":"RabbitMQ","date":"2023-04-21T00:00:00.000Z","category":["RBMQ"],"tag":["RBMQ","消息队列"],"star":true,"description":"RabbitMQ 是一个 Erlang 开发的，通用多种语言、不同语言间、不同机器上实现的消息队列，其支持热插拔","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"RabbitMQ\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-04-21T00:00:00.000Z\\",\\"dateModified\\":\\"2023-05-25T14:47:37.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"悦·宝宝\\",\\"url\\":\\"https://github.com/Igarashi-G\\"}]}"],["meta",{"property":"og:url","content":"https://igarashi-g.github.io/python/%E7%94%9F%E6%80%81/%E6%B6%88%E6%81%AF%E9%98%9F%E5%88%97/RabbitMQ.html"}],["meta",{"property":"og:site_name","content":"悦 ▪ 宝宝"}],["meta",{"property":"og:title","content":"RabbitMQ"}],["meta",{"property":"og:description","content":"RabbitMQ 是一个 Erlang 开发的，通用多种语言、不同语言间、不同机器上实现的消息队列，其支持热插拔"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-05-25T14:47:37.000Z"}],["meta",{"property":"article:tag","content":"消息队列"}],["meta",{"property":"article:tag","content":"RBMQ"}],["meta",{"property":"article:published_time","content":"2023-04-21T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-05-25T14:47:37.000Z"}]]},"git":{"createdTime":1665586687000,"updatedTime":1685026057000,"contributors":[{"name":"Igarashi","username":"Igarashi","email":"2545369032@qq.com","commits":3,"url":"https://github.com/Igarashi"}]},"readingTime":{"minutes":11.42,"words":3425},"filePathRelative":"python/生态/消息队列/RabbitMQ.md","excerpt":"<p><strong>RabbitMQ</strong> 是一个 <strong>Erlang</strong> 开发的，通用多种语言、不同语言间、不同机器上实现的消息队列，其支持热插拔</p>\\n","autoDesc":true}');export{k as comp,d as data};
