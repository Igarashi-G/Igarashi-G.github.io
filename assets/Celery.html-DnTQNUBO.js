import{_ as r}from"./plugin-vueexport-helper-DlAUqK2U.js";import{c as a,d as n,o as t}from"./app-BhZNNS61.js";const l={};function s(o,e){return t(),a("div",null,e[0]||(e[0]=[n(`<h1 id="celery-task" tabindex="-1"><a class="header-anchor" href="#celery-task"><span>Celery Task</span></a></h1><p>Celery 是一个简单、灵活且可靠的，处理大量消息的分布式系统，</p><ul><li>专注于实时处理的异步任务队列</li><li>支持任务调度等定时任务</li></ul><h2 id="一、celery-概述" tabindex="-1"><a class="header-anchor" href="#一、celery-概述"><span>一、celery 概述：</span></a></h2><h3 id="_1-celery-组成" tabindex="-1"><a class="header-anchor" href="#_1-celery-组成"><span>1.celery 组成：</span></a></h3><p>Celery 的架构由三部分组成，消息中间件（message broker），任务执行单元（worker）和任务执行结果存储（task result store）组成。</p><ul><li>消息中间件 <ul><li>Celery 本身不提供消息服务，但是可以方便的和第三方提供的消息中间件集成。包括，RabbitMQ, Redis 等等</li></ul></li><li>任务执行单元 <ul><li>Worker 是 Celery 提供的任务执行的单元，worker 并发的运行在分布式的系统节点中。</li></ul></li><li>任务结果存储 <ul><li>Task result store 用来存储 Worker 执行的任务的结果，Celery 支持以不同方式存储任务的结果，包括 AMQP、redis、rbmq 等</li></ul></li></ul><p>【另外】： Celery 还支持不同的并发和序列化的手段</p><p>并发：Prefork, Eventlet, gevent, threads/single threaded<br> 序列化：pickle, json, yaml, msgpack. zlib, bzip2 compression， Cryptographic message signing 等等</p><h3 id="_2-使用场景" tabindex="-1"><a class="header-anchor" href="#_2-使用场景"><span>2.使用场景：</span></a></h3><p>celery 是一个强大的 分布式任务队列的异步处理框架，它可以让任务的执行完全脱离主程序，甚至可以被分配到其他主机上运行。我们通常使用它来实现异步任务（async task）和定时任务（crontab)。</p><ul><li><p>异步任务：将耗时操作任务提交给 Celery 去异步执行，比如发送短信/邮件、消息推送、音视频处理等等</p></li><li><p>定时任务：定时执行某件事情，比如每天数据统计</p></li></ul><h3 id="_3-安装" tabindex="-1"><a class="header-anchor" href="#_3-安装"><span>3. 安装：</span></a></h3><pre><code>pip install -U Celery   or  sudo easy_install Celery
</code></pre><h3 id="_4-执行流程" tabindex="-1"><a class="header-anchor" href="#_4-执行流程"><span>4.执行流程：</span></a></h3><pre><code>user -&gt; 初始化celery 定好borker（消息中间件，队列/redis）、定好 backend（存储位置） -&gt; 执行任务（celery执行并将结果写入中间件）
</code></pre><h2 id="二、celery-创建任务" tabindex="-1"><a class="header-anchor" href="#二、celery-创建任务"><span>二、celery 创建任务：</span></a></h2><h3 id="_1-创建简单任务" tabindex="-1"><a class="header-anchor" href="#_1-创建简单任务"><span>1.创建简单任务</span></a></h3><pre><code>import celery
import time

backend = &#39;redis://172.16.128.29:6379/0&#39;
broker = &#39;redis://172.16.128.29:6379/1&#39;
cel = celery.Celery(&#39;test&#39;, broker=broker, backend=backend)

@cel.task
def send_email(name):
    print(&quot;向%s发送邮件...&quot; % name)
    time.sleep(1)
    print(&quot;向%s发送邮件完成&quot; % name)
    return &quot;ok&quot;
</code></pre><h3 id="_2-通过引入单独配置文件-创建任务" tabindex="-1"><a class="header-anchor" href="#_2-通过引入单独配置文件-创建任务"><span>2. 通过引入单独配置文件，创建任务</span></a></h3><p>将上文简单任务部分改为如下：</p><pre><code>cel = celery.Celery(&#39;test&#39;)
cel.config_from_object(&#39;celery_test.celery_config&#39;)
</code></pre><p>将配置文件 celery_config.py 引入，路径应该为项目根目录后的绝对路径</p><h4 id="配置项" tabindex="-1"><a class="header-anchor" href="#配置项"><span>配置项：</span></a></h4><p>celery 4.0 以上支持小写的简化配置项：（通常如下）</p><pre><code>broker_url = &quot;redis://172.16.128.29:6379/0&quot;
result_backend = &quot;redis://172.16.128.29:6379/1&quot;

timezone = &#39;Asia/Shanghai&#39;  # 指定时区，默认是 UTC

task_serializer = &#39;json&#39;  # 任务序列化和反序列化使用pickle方案
result_serializer = &#39;json&#39;  # 读取任务结果一般性能要求不高，所以使用了可读性更好的JSON
result_expires = 60 * 60 * 24  # 任务过期时间，不建议直接写86400，应该让这样的magic数字表述更明显
accept_content = [&#39;json&#39;]  # 指定接受的内容类型

imoprt = (
    # 指定导入的任务模块
    &#39;celery_test.celery_task&#39;
)
</code></pre><h2 id="三、celery-启动任务" tabindex="-1"><a class="header-anchor" href="#三、celery-启动任务"><span>三、celery 启动任务</span></a></h2><h3 id="_1-直接终端执行命令" tabindex="-1"><a class="header-anchor" href="#_1-直接终端执行命令"><span>1. 直接终端执行命令：</span></a></h3><pre><code>celery -A tasks worker --loglevel=info
or
celery worker -A tasks -l info
</code></pre><p>执行以上命令，将任务启动</p><p>【注意】：</p><p>windows 下 celery 若命令行执行报错如下：</p><pre><code>ERROR/MainProcess] Task handler raised error: ValueError(&#39;not enough values to unpack (expected 3, got 0)&#39;)
</code></pre><p>需要安装 eventlet 才行（原因不明）</p><pre><code>pip3 install eventlet
</code></pre><p>然后运行命令需携带参数 -P eventlet：</p><pre><code>celery worker -A celery_task -l info -P eventlet
</code></pre><h3 id="_2-写脚本执行" tabindex="-1"><a class="header-anchor" href="#_2-写脚本执行"><span>2.写脚本执行：</span></a></h3><p>建立一个 task_worker.py 文件来启动任务</p><pre><code>import sys
import os
from celery_test.celery_task import cel

root_path = os.path.abspath(os.path.join(os.path.dirname(__file__), &quot;..&quot;))
sys.path.insert(0, os.path.dirname(__file__))

sys.argv.extend([&quot;-l&quot;, &quot;INFO&quot;, &quot;-P&quot;, &quot;solo&quot;])
cel.worker_main()
</code></pre><ul><li>需要配置对应的正确路径，来引入相关的 celery_app</li></ul><h2 id="四、创建-celery-生产者" tabindex="-1"><a class="header-anchor" href="#四、创建-celery-生产者"><span>四、创建 celery 生产者</span></a></h2><pre><code>from celery_task import send_email
result = send_email.delay(&quot;yuan&quot;)
print(result.id)
result2 = send_email.delay(&quot;alex&quot;)
print(result2.id)　
</code></pre><h2 id="五、获取任务执行结果" tabindex="-1"><a class="header-anchor" href="#五、获取任务执行结果"><span>五、获取任务执行结果</span></a></h2><h3 id="_1-通过-asyncresult-进行简单判断" tabindex="-1"><a class="header-anchor" href="#_1-通过-asyncresult-进行简单判断"><span>1.通过 AsyncResult 进行简单判断：</span></a></h3><pre><code>from celery.result import AsyncResult
from celery_task import cel

async_result=AsyncResult(id=&quot;c6ddd5b7-a662-4f0e-93d4-ab69ec2aea5d&quot;, app=cel)

if async_result.successful():
    result = async_result.get()
    print(result)
    # result.forget() # 将结果删除
elif async_result.failed():
    print(&#39;执行失败&#39;)
elif async_result.status == &#39;PENDING&#39;:
    print(&#39;任务等待中被执行&#39;)
elif async_result.status == &#39;RETRY&#39;:
    print(&#39;任务异常后正在重试&#39;)
elif async_result.status == &#39;STARTED&#39;:
    print(&#39;任务已经开始被执行&#39;)
</code></pre>`,46)]))}const p=r(l,[["render",s]]),d=JSON.parse('{"path":"/python/%E7%94%9F%E6%80%81/%E5%BC%82%E6%AD%A5%E4%BB%BB%E5%8A%A1/Celery.html","title":"Celery基础","lang":"zh-CN","frontmatter":{"title":"Celery基础","order":2,"description":"Celery Task Celery 是一个简单、灵活且可靠的，处理大量消息的分布式系统， 专注于实时处理的异步任务队列 支持任务调度等定时任务 一、celery 概述： 1.celery 组成： Celery 的架构由三部分组成，消息中间件（message broker），任务执行单元（worker）和任务执行结果存储（task result sto...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Celery基础\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-10-12T14:58:07.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"悦·宝宝\\",\\"url\\":\\"https://github.com/Igarashi-G\\"}]}"],["meta",{"property":"og:url","content":"https://igarashi-g.github.io/python/%E7%94%9F%E6%80%81/%E5%BC%82%E6%AD%A5%E4%BB%BB%E5%8A%A1/Celery.html"}],["meta",{"property":"og:site_name","content":"悦 ▪ 宝宝"}],["meta",{"property":"og:title","content":"Celery基础"}],["meta",{"property":"og:description","content":"Celery Task Celery 是一个简单、灵活且可靠的，处理大量消息的分布式系统， 专注于实时处理的异步任务队列 支持任务调度等定时任务 一、celery 概述： 1.celery 组成： Celery 的架构由三部分组成，消息中间件（message broker），任务执行单元（worker）和任务执行结果存储（task result sto..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-10-12T14:58:07.000Z"}],["meta",{"property":"article:modified_time","content":"2022-10-12T14:58:07.000Z"}]]},"git":{"createdTime":1665586687000,"updatedTime":1665586687000,"contributors":[{"name":"Igarashi","username":"Igarashi","email":"2545369032@qq.com","commits":1,"url":"https://github.com/Igarashi"}]},"readingTime":{"minutes":3.29,"words":988},"filePathRelative":"python/生态/异步任务/Celery.md","excerpt":"\\n<p>Celery 是一个简单、灵活且可靠的，处理大量消息的分布式系统，</p>\\n<ul>\\n<li>专注于实时处理的异步任务队列</li>\\n<li>支持任务调度等定时任务</li>\\n</ul>\\n<h2>一、celery 概述：</h2>\\n<h3>1.celery 组成：</h3>\\n<p>Celery 的架构由三部分组成，消息中间件（message broker），任务执行单元（worker）和任务执行结果存储（task result store）组成。</p>\\n<ul>\\n<li>消息中间件\\n<ul>\\n<li>Celery 本身不提供消息服务，但是可以方便的和第三方提供的消息中间件集成。包括，RabbitMQ, Redis 等等</li>\\n</ul>\\n</li>\\n<li>任务执行单元\\n<ul>\\n<li>Worker 是 Celery 提供的任务执行的单元，worker 并发的运行在分布式的系统节点中。</li>\\n</ul>\\n</li>\\n<li>任务结果存储\\n<ul>\\n<li>Task result store 用来存储 Worker 执行的任务的结果，Celery 支持以不同方式存储任务的结果，包括 AMQP、redis、rbmq 等</li>\\n</ul>\\n</li>\\n</ul>","autoDesc":true}');export{p as comp,d as data};
