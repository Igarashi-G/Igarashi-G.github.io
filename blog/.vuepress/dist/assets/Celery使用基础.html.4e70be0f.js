import{_ as e}from"./plugin-vueexport-helper.2444895f.js";import{o as n,c as r,f as t}from"./app.c323a8c1.js";const o={},l=t(`<pre><code>Celery-\u5206\u5E03\u5F0F\u4EFB\u52A1\u961F\u5217\uFF1A
</code></pre><p>\u73B0\u5728\u8FDC\u7A0B\u5BA2\u6237\u7AEF\u53D1\u8D77\u4E00\u6761\u547D\u4EE4 cmd sshClient \u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014&gt; sshServer \u53D1\u9001\u547D\u4EE4\u9700\u8981\u4E00\u4E2A\u961F\u5217\uFF0C\u4EA4\u7ED9\u8FDC\u7A0B\u53BB\u6267\u884C\uFF0C\u8981\u7B49\u5F85\u4E00\u4E2A\u7ED3\u679C\u3002\u82E5\u4EFB\u52A1\u518D Server \u7AEF\u8981\u6267\u884C 5 \u5206\u949F\u90A3\u4E48\u5C31\u8981\u7B49 5 \u5206\u949F\u3002 \uFF08rabbitmq \u4E2D\u6267\u884C rpc \u53CC\u5411\u961F\u5217\uFF0C\u6211\u4EEC\u81EA\u5DF1\u4E5F\u53EF\u4EE5\u641E\u6210\u5F02\u6B65\u7684\uFF0C\u5C31\u662F\u9EBB\u70E6\u4E00\u4E9B\u3002\u56E0\u6B64\u7528\u57FA\u4E8E\u5B83\u7684 celery\uFF09</p><p>what Anime \uFF1A\u5B83\u540E\u9762\u80AF\u5B9A\u662F\u7528\u5206\u5E03\u5F0F\u7684\u5904\u7406\u56FE\u7247\u8FD9\u4E2A\u4EFB\u52A1\u3002\u505A\u4E00\u4E2A\u5206\u5E03\u5F0F\u7684\u8FD0\u7B97\uFF0C\u4E4B\u540E\u518D\u628A\u7ED3\u679C\u7EDF\u4E00\u6C47\u603B\u3002 \u90A3\u4E48\u518D Python \u4E2D\u5982\u4F55\u5B9E\u73B0\u5206\u5E03\u5F0F\u7684\u8FD0\u7B97\u6548\u679C\uFF1F\u2014\u2014\u2014\u2014 Celery</p><p>\u4E00\u3001Celery \u4ECB\u7ECD\u548C\u57FA\u672C\u4F7F\u7528 \uFF1A</p><pre><code>Celery \u662F\u4E00\u4E2A \u57FA\u4E8Epython\u5F00\u53D1\u7684\u5206\u5E03\u5F0F\u5F02\u6B65\u6D88\u606F\u4EFB\u52A1\u961F\u5217\uFF0C\u901A\u8FC7\u5B83\u53EF\u4EE5\u8F7B\u677E\u7684\u5B9E\u73B0\u4EFB\u52A1\u7684\u5F02\u6B65\u5904\u7406\uFF0C \u5982\u679C\u4F60\u7684\u4E1A\u52A1\u573A\u666F\u4E2D\u9700\u8981\u7528\u5230\u5F02\u6B65\u4EFB\u52A1\uFF0C
\u5C31\u53EF\u4EE5\u8003\u8651\u4F7F\u7528celery\uFF0C \u4E3E\u51E0\u4E2A\u5B9E\u4F8B\u573A\u666F\u4E2D\u53EF\u7528\u7684\u4F8B\u5B50\uFF1A

    \u4F60\u60F3\u5BF9100\u53F0\u673A\u5668\u6267\u884C\u4E00\u6761\u6279\u91CF\u547D\u4EE4\uFF0C\u53EF\u80FD\u4F1A\u82B1\u5F88\u957F\u65F6\u95F4 \uFF0C\u4F46\u4F60\u4E0D\u60F3\u8BA9\u4F60\u7684\u7A0B\u5E8F\u7B49\u7740\u7ED3\u679C\u8FD4\u56DE\uFF0C\u800C\u662F\u7ED9\u4F60\u8FD4\u56DE \u4E00\u4E2A\u4EFB\u52A1ID,\u4F60\u8FC7\u4E00\u6BB5\u65F6\u95F4\u53EA\u9700\u8981\u62FF\u7740
    \u8FD9\u4E2A\u4EFB\u52A1id\u5C31\u53EF\u4EE5\u62FF\u5230\u4EFB\u52A1\u6267\u884C\u7ED3\u679C\uFF0C \u5728\u4EFB\u52A1\u6267\u884Cing\u8FDB\u884C\u65F6\uFF0C\u4F60\u53EF\u4EE5\u7EE7\u7EED\u505A\u5176\u5B83\u7684\u4E8B\u60C5\u3002

    \u4F60\u60F3\u505A\u4E00\u4E2A\u5B9A\u65F6\u4EFB\u52A1\uFF0C\u6BD4\u5982\u6BCF\u5929\u68C0\u6D4B\u4E00\u4E0B\u4F60\u4EEC\u6240\u6709\u5BA2\u6237\u7684\u8D44\u6599\uFF0C\u5982\u679C\u53D1\u73B0\u4ECA\u5929 \u662F\u5BA2\u6237\u7684\u751F\u65E5\uFF0C\u5C31\u7ED9\u4ED6\u53D1\u4E2A\u77ED\u4FE1\u795D\u798F
    win\uFF1A\u81EA\u5E26\u5B9A\u65F6\u4EFB\u52A1\u7BA1\u7406
    linux\uFF1Acrontab -l    linux\u4E0A\u7684\u4EFB\u52A1\u8C03\u5EA6 (\u81EA\u5DF1\u67E5)
    0 5 * * 1 tar -zcf /var/backups/home.tgz /home/
    \u5206\u949F\u3001\u5C0F\u65F6\u3001\u65E5\u3001\u6708\u3001\u5468
    \u82E5\u5199 * * * * * echo &quot;hello\\n&quot; &gt;&gt; /tmp/crontest \u5219\u8868\u793A\u6BCF\u5206\u949F\u90FD\u5411/tmp\u4E0B\u7684crontest\u5199hello
    \u4E4B\u540Els tmp    \u4E00\u5206\u949F\u540E\u4F1A\u591A\u51FAcrontest     more/tmp/crontest \u6216\u662F tail -f /tmp/crontest \u5219\u51FA\u73B0hello


\u6CE8\uFF1ACelery \u5728\u6267\u884C\u4EFB\u52A1\u65F6\u9700\u8981\u901A\u8FC7\u4E00\u4E2A\u6D88\u606F\u4E2D\u95F4\u4EF6\u6765\u63A5\u6536\u548C\u53D1\u9001\u4EFB\u52A1\u6D88\u606F\uFF0C\u4EE5\u53CA\u5B58\u50A8\u4EFB\u52A1\u7ED3\u679C\uFF0C \u4E00\u822C\u4F7F\u7528rabbitMQ or Redis,\u540E\u9762\u4F1A\u8BB2

1.1 Celery\u6709\u4EE5\u4E0B\u4F18\u70B9\uFF1A

    \u7B80\u5355\uFF1A\u4E00\u4F46\u719F\u6089\u4E86celery\u7684\u5DE5\u4F5C\u6D41\u7A0B\u540E\uFF0C\u914D\u7F6E\u548C\u4F7F\u7528\u8FD8\u662F\u6BD4\u8F83\u7B80\u5355\u7684
    \u9AD8\u53EF\u7528\uFF1A\u5F53\u4EFB\u52A1\u6267\u884C\u5931\u8D25\u6216\u6267\u884C\u8FC7\u7A0B\u4E2D\u53D1\u751F\u8FDE\u63A5\u4E2D\u65AD\uFF0Ccelery \u4F1A\u81EA\u52A8\u5C1D\u8BD5\u91CD\u65B0\u6267\u884C\u4EFB\u52A1
    \u5FEB\u901F\uFF1A\u4E00\u4E2A\u5355\u8FDB\u7A0B\u7684celery\u6BCF\u5206\u949F\u53EF\u5904\u7406\u4E0A\u767E\u4E07\u4E2A\u4EFB\u52A1
    \u7075\u6D3B\uFF1A \u51E0\u4E4Ecelery\u7684\u5404\u4E2A\u7EC4\u4EF6\u90FD\u53EF\u4EE5\u88AB\u6269\u5C55\u53CA\u81EA\u5B9A\u5236

Celery\u57FA\u672C\u5DE5\u4F5C\u6D41\u7A0B\u56FE\uFF1A\u89C1\u56FE\uFF01
    celery call \u53D1\u9001\u4E00\u4E2A\u4EFB\u52A1\u5230Celery\u7EC4\u4EF6\uFF0C\u7EC4\u4EF6\u518D\u628A\u4EFB\u52A1\u653E\u5230rabbitmq\uFF0Crabbitmq\u4F1A\u7ACB\u523B\u7684\u8FD4\u56DE\u4EFB\u52A1id\u7ED9call\u3002\u7136\u540Ework\u5C31\u4ECE\u961F\u5217\u4E2D\u62FF\u6570\u636E\uFF0C
    \u4E4B\u540E\u628A\u7ED3\u679C\u5199\u5230\u961F\u5217\u3002\u4E4B\u540E\u53EA\u8981\u62FFtask id\u4ECECelery\u5230\u961F\u5217\u4E2D\u62FF\u7ED3\u679C\u5373\u53EF\u3002
    rabbitmq\u81EA\u5DF1\u65E0\u65E0\u6CD5\u4EA7\u751F\u4EFB\u52A1id\uFF0C\u5C31\u9700\u8981celery\u6765\u4EA7\u751F\u3002

    \u56E0\u6B64rabbitmq\u76F8\u5F53\u4E8E\u4E00\u4E2A\u4F20\u8F93\u6D88\u606F\u7684\u89D2\u8272\uFF0C\u56E0\u6B64\u53EBbroker \u4E2D\u95F4\u5546\uFF08\u4E2D\u4ECB\uFF09

1.2 Celery\u5B89\u88C5\u4F7F\u7528
    &lt;1&gt;Celery\u7684\u9ED8\u8BA4broker\u662FRabbitMQ, \u4EC5\u9700\u914D\u7F6E\u4E00\u884C\u5C31\u53EF\u4EE5

        broker_url = &#39;amqp://guest:guest@localhost:5672//&#39;

    rabbitMQ \u6CA1\u88C5\u7684\u8BDD\u8BF7\u88C5\u4E00\u4E0B\uFF0C\u8BF7\u53C2\u800311.3 rabbitmq\u5B89\u88C5


    &lt;2&gt;\u4F7F\u7528Redis\u505Abroker\u4E5F\u53EF\u4EE5

        \u5B89\u88C5redis\u7EC4\u4EF6

        $ pip install -U &quot;celery[redis]&quot;

    \u914D\u7F6E\uFF1A

        Configuration is easy, just configure the location of your Redis database:

            app.conf.broker_url = &#39;redis://localhost:6379/0&#39;

        Where the URL is in the format of:

            redis://:password@hostname:port/db_number

        all fields after the scheme are optional, and will default to localhost on port 6379, using database 0.

        \u5982\u679C\u60F3\u83B7\u53D6\u6BCF\u4E2A\u4EFB\u52A1\u7684\u6267\u884C\u7ED3\u679C\uFF0C\u8FD8\u9700\u8981\u914D\u7F6E\u4E00\u4E0B\u628A\u4EFB\u52A1\u7ED3\u679C\u5B58\u5728\u54EA

        If you also want to store the state and return values of tasks in Redis, you should configure these settings:

            app.conf.result_backend = &#39;redis://localhost:6379/0&#39;

1. 3 \u5F00\u59CB\u4F7F\u7528Celery\u5566\u3000\u3000
    \u5B89\u88C5celery\u6A21\u5757:
        $ pip install celery

    \u521B\u5EFA\u4E00\u4E2Acelery application \u7528\u6765\u5B9A\u4E49\u4F60\u7684\u4EFB\u52A1\u5217\u8868\uFF1A
    \u89C1\u4EE3\u7801celery_task.py:
        app\u5373\u662F\u4E00\u4E2Aworker\u5DE5\u4EBA @app.task\u4E0B\u7684\u51FD\u6570\u5219\u662F\u8FD9\u4E2A\u5DE5\u4EBA\u8981\u6267\u884C\u7684\u6BCF\u4E2A\u4EFB\u52A1

    \u542F\u52A8Celery Worker\u6765\u5F00\u59CB\u76D1\u542C\u5E76\u6267\u884C\u4EFB\u52A1
        $ celery -A tasks worker --loglevel=info

    \u4F8B:\uFF08\u5982\u4F55\u5F02\u6B65\u4EA4\u7ED9\u8FDC\u7A0B\u6267\u884C\uFF09
        celery -A celery_task worker -l debug   \u5728\u4E00\u4E2Aworker\u91CC\u9762\u6267\u884Ctask\u4E0B\u6240\u6709\u7684\u4EFB\u52A1 \u5E76\u6253\u5370debug\u7EA7\u522B\u7684\u65E5\u5FD7
        \u6B64\u65F6\u53EF\u80FD\u62A5\u9519\uFF0C\u662F\u7531\u4E8E\u6CA1\u6709\u5B89\u88C5python\u8FDE\u63A5redis\u7684\u7EC4\u4EF6 pip3 install redis \uFF08\u542F\u52A8redis\u7684\u662Fredis-server\uFF09
        \u542F\u52A8\u4E4B\u540E\u51FA\u73B0\u4E00\u5927\u5806\uFF0C\u753B\u4E86\u4E00\u4E2AC\u7684\u53F3\u8FB9\u663E\u793A\u7684\u662F\u914D\u7F6E\u4FE1\u606F

        [tasks]:\u4E0B\u9762\u5148\u662F\u4E00\u5927\u5806\u81EA\u5E26\u7684\u4EFB\u52A1\u3002\u6700\u540E\u4E24\u4E2A\u624D\u662F\u521A\u521A\u81EA\u5B9A\u4E49\u7684
        searching for neighbor\uFF1A\u8868\u793A\u53EF\u4EE5\u6709\u591A\u4E2Aworker\u7684\u82E5\u5728\u5F53\u524D\u7684\u7F51\u7EDC\u73AF\u5883\u6709\u5176\u4ED6worker\u53EF\u4EE5\u81EA\u52A8\u6536\u5230\u3002
        \u7136\u540E\u73B0\u5728\u5F00\u59CB\u76D1\u542C\u4EFB\u52A1

        next&gt;&gt;: \u5F00\u542F\u65B0\u7684\u7EC8\u7AEF\uFF0Cpython3\uFF08\u5F00\u542Fpython\u73AF\u5883\uFF09
        next&gt;&gt;: \u5BFC\u5165from celery_task import add,cmd
        next&gt;&gt;: \u8FD0\u884Cadd(4,5)\u6CA1\u6709\u4EFB\u4F55\u610F\u4E49\u662F\u76F4\u63A5\u5728call\u7AEF\u6267\u884C\u7684\uFF0C\u53D1\u9001\u7ED9celery\u8981\u5229\u7528delay()    \u51FD\u6570\uFF0C\u5EF6\u8FDF\u7684\u610F\u601D\uFF0C\u53D1\u5230\u8FDC\u7A0B\u6267\u884C
        next&gt;&gt;: add.delay(4,5)  Celery\u7EC8\u7AEF\u76D1\u542C\u5230\u5E76\u7ACB\u5373\u8FD4\u56DEpython3\u7EC8\u7AEF\u4E00\u4E2Atask_id  &lt;AsyncResult: 9e849619-c59c-4a2b-a053-4796a21eb574&gt;
        next&gt;&gt;: \u4E4B\u540E\u5F02\u6B65\u6267\u884C\u4EFB\u52A1 \u82E5\u628Aadd.delay()\u7ED3\u679C\u8D4B\u503C\u7ED9t1\uFF0C\u5219t1\u5C31\u662FAsyncResult t1.get()\u5373\u53EF\u83B7\u53D6\u8FD4\u56DE\u7ED3\u679C

    \u6CE8\uFF1A\u82E5\u62A5\u9519\uFF0C\u53EF\u80FD\u662F\u7531\u4E8Ebackend\u7ED3\u679C\u7684\u540E\u53F0\u6CA1\u6709\u914D\u7F6E\u3002\u8FD9\u4E2A\u7ED3\u679C\u53EF\u4EE5\u7528\u4E0D\u540C\u7684\u63A5\u6536\uFF0Credis\u3001rabbitmq\u90FD\u53EF\u4EE5\uFF0C\u4F46\u8981\u914D\u7F6E\u3002
        celery\u9ED8\u8BA4\u4E0D\u662F\u8D1F\u8F7D\u5747\u8861\u7684\u800C\u662F\u62A2\u5360\u5F0F\u7684

    \u82E5\uFF1A\u73B0\u5728time.sleep(10)\u6B64\u65F6t.get()\u5219\u4F1A\u536110s\u624D\u6709\u53CD\u5E94\uFF0C\u90A3\u4E48\u8FD9\u6837\u5F02\u6B65\u7684\u4F18\u52BF\u4FBF\u6CA1\u4E86\uFF0C\u56E0\u6B64\u5229\u7528t.get(timeout=1)\u8BBE\u7F6E\u8D85\u65F6\u65F6\u95F4
        \u6B64\u65F6\u4F1A\u62A5\u5F02\u5E38\uFF0C\u82E5\u4E0D\u60F3\u8981\u5F02\u5E38\uFF0C\u53EF\u4EE5\u518D\u52A0\u4E0Apropagate=Flase\u5373\u53EF\uFF0C\u7B97\u4E86\u8FD9\u6837\u4E0D\u5BF9\u3002
        \u8FD8\u662F\u81EA\u5DF1\u6355\u83B7\u5F02\u5E38\u5427\uFF0C\u6216\u662F\u5148\u68C0\u6D4B\u4EFB\u52A1\u662F\u5426\u6709\u7ED3\u679C\u518D\u53BB\u53D6\u3002\u7528t.ready()\u6765\u5224\u65AD\u662F\u5426\u6709\u4E86\u3002

\u989D\u5916\uFF1AWhat Anime\u89C6\u9891 \u6709\u4E00\u5F20\u56FE\u7247\u9700\u8981\u5FEB\u901F\u8BC6\u522B\uFF0C\u73B0\u5728\u6709\u4E00\u767E\u53F0\u5206\u5E03\u5F0F\u670D\u52A1\u5668\u8FD0\u4F5C\uFF0C\u90A3\u4E48\u53EA\u9700\u8981\u628A\u56FE\u7247\u63A8\u8FC7\u53BB\uFF0C100\u4E2A\u4EFB\u52A1\u540C\u65F6\u63A5\u6536\uFF0C\u5C31\u80FD\u65E0\u9650\u7684\u5206\u5E03\u5F0F\u6269\u5C55\u3002
</code></pre><p>\u4E8C\u3001\u5728\u9879\u76EE\u4E2D\u5982\u4F55\u4F7F\u7528 celery \u3000 \u53EF\u4EE5\u628A celery \u914D\u7F6E\u6210\u4E00\u4E2A\u5E94\u7528 \u76EE\u5F55\u683C\u5F0F\u5982\u4E0B\uFF1A - proj/<strong>init</strong>.py - /celery.py - /tasks.py</p><pre><code>proj/celery.py\u5185\u5BB9\uFF1A

proj/tasks.py\u4E2D\u7684\u5185\u5BB9\uFF1A

\u542F\u52A8worker\uFF1A
    $ celery -A proj worker -l info \uFF08info\u6253\u5370\u7684\u6BD4debug\u5C11\uFF09
</code></pre>`,7),a=[l];function s(c,i){return n(),r("div",null,a)}const d=e(o,[["render",s],["__file","Celery\u4F7F\u7528\u57FA\u7840.html.vue"]]);export{d as default};
