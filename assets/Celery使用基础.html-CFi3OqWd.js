import{_ as t}from"./plugin-vueexport-helper-DlAUqK2U.js";import{c as r,d as n,o}from"./app-C_J498dg.js";const a={};function l(s,e){return o(),r("div",null,e[0]||(e[0]=[n(`<pre><code>Celery-分布式任务队列：
</code></pre><p>现在远程客户端发起一条命令 cmd<br> sshClient ————————&gt; sshServer<br> 发送命令需要一个队列，交给远程去执行，要等待一个结果。若任务再 Server 端要执行 5 分钟那么就要等 5 分钟。<br> （rabbitmq 中执行 rpc 双向队列，我们自己也可以搞成异步的，就是麻烦一些。因此用基于它的 celery）</p><p>what Anime ：它后面肯定是用分布式的处理图片这个任务。做一个分布式的运算，之后再把结果统一汇总。<br> 那么再 Python 中如何实现分布式的运算效果？———— Celery</p><p>一、Celery 介绍和基本使用 ：</p><pre><code>Celery 是一个 基于python开发的分布式异步消息任务队列，通过它可以轻松的实现任务的异步处理， 如果你的业务场景中需要用到异步任务，
就可以考虑使用celery， 举几个实例场景中可用的例子：

    你想对100台机器执行一条批量命令，可能会花很长时间 ，但你不想让你的程序等着结果返回，而是给你返回 一个任务ID,你过一段时间只需要拿着
    这个任务id就可以拿到任务执行结果， 在任务执行ing进行时，你可以继续做其它的事情。

    你想做一个定时任务，比如每天检测一下你们所有客户的资料，如果发现今天 是客户的生日，就给他发个短信祝福
    win：自带定时任务管理
    linux：crontab -l    linux上的任务调度 (自己查)
    0 5 * * 1 tar -zcf /var/backups/home.tgz /home/
    分钟、小时、日、月、周
    若写 * * * * * echo &quot;hello\\n&quot; &gt;&gt; /tmp/crontest 则表示每分钟都向/tmp下的crontest写hello
    之后ls tmp    一分钟后会多出crontest     more/tmp/crontest 或是 tail -f /tmp/crontest 则出现hello


注：Celery 在执行任务时需要通过一个消息中间件来接收和发送任务消息，以及存储任务结果， 一般使用rabbitMQ or Redis,后面会讲

1.1 Celery有以下优点：

    简单：一但熟悉了celery的工作流程后，配置和使用还是比较简单的
    高可用：当任务执行失败或执行过程中发生连接中断，celery 会自动尝试重新执行任务
    快速：一个单进程的celery每分钟可处理上百万个任务
    灵活： 几乎celery的各个组件都可以被扩展及自定制

Celery基本工作流程图：见图！
    celery call 发送一个任务到Celery组件，组件再把任务放到rabbitmq，rabbitmq会立刻的返回任务id给call。然后work就从队列中拿数据，
    之后把结果写到队列。之后只要拿task id从Celery到队列中拿结果即可。
    rabbitmq自己无无法产生任务id，就需要celery来产生。

    因此rabbitmq相当于一个传输消息的角色，因此叫broker 中间商（中介）

1.2 Celery安装使用
    &lt;1&gt;Celery的默认broker是RabbitMQ, 仅需配置一行就可以

        broker_url = &#39;amqp://guest:guest@localhost:5672//&#39;

    rabbitMQ 没装的话请装一下，请参考11.3 rabbitmq安装


    &lt;2&gt;使用Redis做broker也可以

        安装redis组件

        $ pip install -U &quot;celery[redis]&quot;

    配置：

        Configuration is easy, just configure the location of your Redis database:

            app.conf.broker_url = &#39;redis://localhost:6379/0&#39;

        Where the URL is in the format of:

            redis://:password@hostname:port/db_number

        all fields after the scheme are optional, and will default to localhost on port 6379, using database 0.

        如果想获取每个任务的执行结果，还需要配置一下把任务结果存在哪

        If you also want to store the state and return values of tasks in Redis, you should configure these settings:

            app.conf.result_backend = &#39;redis://localhost:6379/0&#39;

1. 3 开始使用Celery啦　　
    安装celery模块:
        $ pip install celery

    创建一个celery application 用来定义你的任务列表：
    见代码celery_task.py:
        app即是一个worker工人 @app.task下的函数则是这个工人要执行的每个任务

    启动Celery Worker来开始监听并执行任务
        $ celery -A tasks worker --loglevel=info

    例:（如何异步交给远程执行）
        celery -A celery_task worker -l debug   在一个worker里面执行task下所有的任务 并打印debug级别的日志
        此时可能报错，是由于没有安装python连接redis的组件 pip3 install redis （启动redis的是redis-server）
        启动之后出现一大堆，画了一个C的右边显示的是配置信息

        [tasks]:下面先是一大堆自带的任务。最后两个才是刚刚自定义的
        searching for neighbor：表示可以有多个worker的若在当前的网络环境有其他worker可以自动收到。
        然后现在开始监听任务

        next&gt;&gt;: 开启新的终端，python3（开启python环境）
        next&gt;&gt;: 导入from celery_task import add,cmd
        next&gt;&gt;: 运行add(4,5)没有任何意义是直接在call端执行的，发送给celery要利用delay()    函数，延迟的意思，发到远程执行
        next&gt;&gt;: add.delay(4,5)  Celery终端监听到并立即返回python3终端一个task_id  &lt;AsyncResult: 9e849619-c59c-4a2b-a053-4796a21eb574&gt;
        next&gt;&gt;: 之后异步执行任务 若把add.delay()结果赋值给t1，则t1就是AsyncResult t1.get()即可获取返回结果

    注：若报错，可能是由于backend结果的后台没有配置。这个结果可以用不同的接收，redis、rabbitmq都可以，但要配置。
        celery默认不是负载均衡的而是抢占式的

    若：现在time.sleep(10)此时t.get()则会卡10s才有反应，那么这样异步的优势便没了，因此利用t.get(timeout=1)设置超时时间
        此时会报异常，若不想要异常，可以再加上propagate=Flase即可，算了这样不对。
        还是自己捕获异常吧，或是先检测任务是否有结果再去取。用t.ready()来判断是否有了。

额外：What Anime视频 有一张图片需要快速识别，现在有一百台分布式服务器运作，那么只需要把图片推过去，100个任务同时接收，就能无限的分布式扩展。
</code></pre><p>二、在项目中如何使用 celery 　<br> 可以把 celery 配置成一个应用<br> 目录格式如下： - proj/<strong>init</strong>.py - /celery.py - /tasks.py</p><pre><code>proj/celery.py内容：

proj/tasks.py中的内容：

启动worker：
    $ celery -A proj worker -l info （info打印的比debug少）
</code></pre>`,7)]))}const p=t(a,[["render",l]]),y=JSON.parse('{"path":"/python/%E7%94%9F%E6%80%81/%E5%BC%82%E6%AD%A5%E4%BB%BB%E5%8A%A1/Celery%E4%BD%BF%E7%94%A8%E5%9F%BA%E7%A1%80.html","title":"Celery使用","lang":"zh-CN","frontmatter":{"title":"Celery使用","order":3,"description":"现在远程客户端发起一条命令 cmd sshClient ————————> sshServer 发送命令需要一个队列，交给远程去执行，要等待一个结果。若任务再 Server 端要执行 5 分钟那么就要等 5 分钟。 （rabbitmq 中执行 rpc 双向队列，我们自己也可以搞成异步的，就是麻烦一些。因此用基于它的 celery） what Anime...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Celery使用\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-10-12T14:58:07.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"悦·宝宝\\",\\"url\\":\\"https://github.com/Igarashi-G\\"}]}"],["meta",{"property":"og:url","content":"https://igarashi-g.github.io/python/%E7%94%9F%E6%80%81/%E5%BC%82%E6%AD%A5%E4%BB%BB%E5%8A%A1/Celery%E4%BD%BF%E7%94%A8%E5%9F%BA%E7%A1%80.html"}],["meta",{"property":"og:site_name","content":"悦 ▪ 宝宝"}],["meta",{"property":"og:title","content":"Celery使用"}],["meta",{"property":"og:description","content":"现在远程客户端发起一条命令 cmd sshClient ————————> sshServer 发送命令需要一个队列，交给远程去执行，要等待一个结果。若任务再 Server 端要执行 5 分钟那么就要等 5 分钟。 （rabbitmq 中执行 rpc 双向队列，我们自己也可以搞成异步的，就是麻烦一些。因此用基于它的 celery） what Anime..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-10-12T14:58:07.000Z"}],["meta",{"property":"article:modified_time","content":"2022-10-12T14:58:07.000Z"}]]},"git":{"createdTime":1663517244000,"updatedTime":1665586687000,"contributors":[{"name":"Igarashi","username":"Igarashi","email":"2545369032@qq.com","commits":3,"url":"https://github.com/Igarashi"}]},"readingTime":{"minutes":5.18,"words":1555},"filePathRelative":"python/生态/异步任务/Celery使用基础.md","excerpt":"<pre><code>Celery-分布式任务队列：\\n</code></pre>\\n<p>现在远程客户端发起一条命令 cmd<br>\\nsshClient ————————&gt; sshServer<br>\\n发送命令需要一个队列，交给远程去执行，要等待一个结果。若任务再 Server 端要执行 5 分钟那么就要等 5 分钟。<br>\\n（rabbitmq 中执行 rpc 双向队列，我们自己也可以搞成异步的，就是麻烦一些。因此用基于它的 celery）</p>\\n<p>what Anime ：它后面肯定是用分布式的处理图片这个任务。做一个分布式的运算，之后再把结果统一汇总。<br>\\n那么再 Python 中如何实现分布式的运算效果？———— Celery</p>","autoDesc":true}');export{p as comp,y as data};
