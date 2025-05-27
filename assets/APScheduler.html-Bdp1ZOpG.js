import{_ as r}from"./plugin-vueexport-helper-DlAUqK2U.js";import{c as o,d as t,o as a}from"./app-C_J498dg.js";const n={};function d(s,e){return a(),o("div",null,e[0]||(e[0]=[t(`<h1 id="apscheduler" tabindex="-1"><a class="header-anchor" href="#apscheduler"><span>APScheduler</span></a></h1><p><a href="http://apscheduler.readthedocs.io/en/latest/" target="_blank" rel="noopener noreferrer">http://apscheduler.readthedocs.io/en/latest/</a></p><h2 id="一、apscheduler-简介" tabindex="-1"><a class="header-anchor" href="#一、apscheduler-简介"><span>一、APScheduler 简介：</span></a></h2><p>APScheduler 基于 Quartz （开源作业调度框架）的一个 Python 定时任务框架，实现了 Quartz 的所有功能，使用起来十分方便。提供了基于日期、<br> 固定时间间隔以及 crontab 类型的任务，并且可以持久化任务。基于这些功能，我们可以很方便的实现一个 python 定时任务系统。</p><pre><code>除此之外，建立高效能的定时任务可参考celery
</code></pre><h2 id="二、安装-示例" tabindex="-1"><a class="header-anchor" href="#二、安装-示例"><span>二、安装&amp;示例：</span></a></h2><pre><code>pip install apscheduler
</code></pre><p>注意：<br> 若出现由于安装问题导致的出错，先确认是否安装版本正确，若安装和配置文件中的版本一致，运行 pip install setuptools --upgrade<br> 之后再运行试试。</p><pre><code>例：
from apscheduler.schedulers.blocking import BlockingScheduler   # 导入，调度程序是您的进程中唯一运行的时候使用
import datetime


def my_job():
    print(datetime.datetime.now().strftime(&#39;%Y-%m-%d %H:%M:%S&#39;), &quot;hello world&quot;)


scheduler = BlockingScheduler()     # 先实例化一个阻塞调度程序对象
scheduler.add_job(func=my_job, trigger=&#39;cron&#39;, second=&#39;*/5&#39;)  # 通过 add_job 来添加作业
scheduler.start()

上面的例子表示每隔5s执行一次 my_job 函数，输出当前时间信息和&quot;hello world&quot;

其中BlockingScheduler()实例化的对象 可以通过设置如下的一个字典 指定默认值：（参考文档）
   scheduler = BlockingScheduler({
        &#39;apscheduler.executors.default&#39;: {
            &#39;class&#39;: &#39;apscheduler.executors.pool:ThreadPoolExecutor&#39;,   # 一个名为&#39;default&#39;的ThreadPoolExecutor线程池
            &#39;装饰_workers&#39;: &#39;20&#39;                                         # 其worker值为20
        },
        &#39;apscheduler.timezone&#39;: &#39;Asia/Shanghai&#39;     # Shanghai作为调度程序的时区
    })
</code></pre><h2 id="三、apscheduler-的四种组成部分" tabindex="-1"><a class="header-anchor" href="#三、apscheduler-的四种组成部分"><span>三、APScheduler 的四种组成部分：</span></a></h2><h3 id="_1-触发器-trigger" tabindex="-1"><a class="header-anchor" href="#_1-触发器-trigger"><span>1.触发器(trigger)：</span></a></h3><p>包含调度逻辑，每一个作业有它自己的触发器，用于决定接下来哪一个作业会运行。除了他们自己初始配置意外，触发器完全是无状态的。<br> 上面代码中用了 cron，共有 date, interval, cron 可供选择。</p><ul><li>date：表示具体的一次性任务</li><li>interval：表示循环任务</li><li>cron：表示定时任务</li></ul><p>可参照文档查看 不同触发器的任务 传入的时间类型</p><h3 id="_2-作业存储-job-store" tabindex="-1"><a class="header-anchor" href="#_2-作业存储-job-store"><span>2.作业存储(job store)：</span></a></h3><p>存储被调度的作业，默认的作业存储是简单地把作业保存在内存中，其他的作业存储是将作业保存在数据库中。</p><p>一个作业的数据保存在持久化作业存储时被序列化，并在加载时被反序列化。调度器不能分享同一个作业存储。</p><h3 id="_3-执行器-executor" tabindex="-1"><a class="header-anchor" href="#_3-执行器-executor"><span>3.执行器(executor)：</span></a></h3><p>处理作业的运行，他们通常通过在作业中提交制定的可调用对象到一个线程或者进程池来进行。当作业完成时，执行器将会通知调度器。</p><h3 id="_4-调度器-scheduler" tabindex="-1"><a class="header-anchor" href="#_4-调度器-scheduler"><span>4.调度器(scheduler)：</span></a></h3><p>是其他的组成部分。你通常在应用只有一个调度器，应用的开发者通常不会直接处理作业存储、调度器和触发器，相反，调度器提供了处理这些的合适<br> 的接口。配置作业存储和执行器可以在调度器中完成，例如添加、修改和移除作业。</p><p>[配置调度器的 3 种方式]：<br> [方式一]：</p><pre><code>from pytz import utc
from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.jobstores.mongodb import MongoDBJobStore
from apscheduler.jobstores.sqlalchemy import SQLAlchemyJobStore
from apscheduler.executors.pool import ThreadPoolExecutor, ProcessPoolExec    utor

jobstores = {
    &#39;mongo&#39;: MongoDBJobStore(),
    &#39;default&#39;: SQLAlchemyJobStore(url=&#39;sqlite:///jobs.sqlite&#39;)
}
executors = {
    &#39;default&#39;: ThreadPoolExecutor(20),
    &#39;processpool&#39;: ProcessPoolExecutor（5）
}
job_defaults = {
    &#39;coalesce&#39;: False,
    &#39;max_instances&#39;: 3
}
scheduler = BackgroundScheduler(jobstores=jobstores, executors=executors,    job_defaults=job_defaults, timezone=utc)
</code></pre><p>[方式二]：</p><pre><code>from apscheduler.schedulers.background import BackgroundScheduler
scheduler = BackgroundScheduler({
    &#39;apscheduler.jobstores.mongo&#39;: {
    &#39;type&#39;: &#39;mongodb&#39;
},
&#39;apscheduler.jobstores.default&#39;: {
    &#39;type&#39;: &#39;sqlalchemy&#39;,
    &#39;url&#39;: &#39;sqlite:///jobs.sqlite&#39;
},
&#39;apscheduler.executors.default&#39;: {
    &#39;class&#39;: &#39;apscheduler.executors.pool:ThreadPoolExecutor&#39;,
    &#39;max_workers&#39;: &#39;20&#39;
},
&#39;apscheduler.executors.processpool&#39;: {
    &#39;type&#39;: &#39;processpool&#39;,
    &#39;max_workers&#39;: &#39;5&#39;
},
&#39;apscheduler.job_defaults.coalesce&#39;: &#39;false&#39;,
&#39;apscheduler.job_defaults.max_instances&#39;: &#39;3&#39;,
})
</code></pre><p>[方式三]：</p><pre><code>init_scheduler_options = {
    &quot;jobstores&quot;: {
        &quot;default&quot;: MemoryJobStore() # 默认使用内存来存储
    },
    &quot;executors&quot;: {
        &#39;default&#39;: {&#39;type&#39;: &#39;threadpool&#39;, &#39;max_workers&#39;: 20},  # 最大工作线程数20
        &#39;processpool&#39;: ProcessPoolExecutor(max_workers=5),  # 最大工作进程数为5
    },
    &quot;job_defaults&quot;: {
        &#39;coalesce&#39;: False,
        &#39;max_instances&#39;: 100
    }
}
scheduler = BackgroundScheduler(**init_scheduler_options)
</code></pre><h2 id="四、操作作业" tabindex="-1"><a class="header-anchor" href="#四、操作作业"><span>四、操作作业</span></a></h2><h3 id="_1-添加作业" tabindex="-1"><a class="header-anchor" href="#_1-添加作业"><span>1.添加作业：</span></a></h3><p>通常除了示例之外，常用的方式是通过@ .scheduled_job()装饰器装饰 my_job 进行添加作业</p><pre><code>    scheduler = BlockingScheduler()

    @scheduler.scheduled_job(&#39;interval&#39;, seconds=3, args=(&quot;循环任务&quot;,)) # 注意这里的传参形式为元组，貌似是规定死的
    @scheduler.scheduled_job(&#39;cron&#39;, second=&#39;*/5&#39;, args=(&quot;定时任务&quot;,)) # 这里装饰器可以进行嵌套
    def my_job(x):  # 可以在添加作业时进行传参
        print(datetime.datetime.now().strftime(&#39;%Y-%m-%d %H:%M:%S&#39;), x)

    scheduler.add_job(func=my_job, args=(&quot;一次性任务&quot;,),
                    next_run_time=datetime.datetime.now() + datetime.timedelta(seconds=2))

    注意：
        1.只有一次性任务的 trigger 可以不用写，源码中判断若trigger is None 则直接定义为&#39;date&#39;类型
        2.如果实现web的异步任务。假设接到一个移动端任务，任务完成后，发送一个推送到移动端，用date类型的trigger完成可以做的很好。
</code></pre><h3 id="_2-移除作业" tabindex="-1"><a class="header-anchor" href="#_2-移除作业"><span>2.移除作业：</span></a></h3><p>当要求执行一定阶段任务以后，删除某一个循环任务，其他任务照常进行时考虑使用。</p><pre><code>job = scheduler.add_job(aps_date, &#39;interval&#39;, minutes=2)
job.remove()    # 若存在两个任务，默认的应该是移除第一个任务，因此不要写在执行体中，写到要移除的函数中更好

def aps_date():
    job.remove()
    print(datetime.datetime.now().strftime(&#39;%Y-%m-%d %H:%M:%S&#39;), &quot;循环任务执行后移除&quot;)
</code></pre><p>如果有多个任务序列的话可以给每个任务设置 ID 号，可以根据 ID 号选择清除对象，且 remove 放到 start 前才有效</p><pre><code>scheduler.add_job(myfunc, &#39;interval&#39;, minutes=2, id=&#39;my_job_id&#39;)
scheduler.remove_job(&#39;my_job_id&#39;)   # 若没有找到任务id则报错
</code></pre><h3 id="_3-暂停和恢复作业" tabindex="-1"><a class="header-anchor" href="#_3-暂停和恢复作业"><span>3. 暂停和恢复作业：</span></a></h3><p>和上的删除任务用法基本一致</p><pre><code>job.pause()
job.resume()
scheduler.pause_job(&#39;interval_task&#39;) # 需要id
scheduler.resume_job(&#39;interval_task&#39;)
</code></pre><h3 id="_4-获得-job-列表" tabindex="-1"><a class="header-anchor" href="#_4-获得-job-列表"><span>4. 获得 job 列表：</span></a></h3><p>获得调度作业的列表，可以使用 get_jobs()来完成，它会返回所有的 job 实例。<br> 则会返回每个 job 的 id（没有设置系统默认）和 name 的列表 如：</p><pre><code>[&lt;Job (id=f9f29b9c3a594e21a7fae10c92e5fcb2 name=my_job)&gt;, &lt;Job (id=23 name=aps_date)&gt;]形式
</code></pre><p>或者使用 print_jobs()来输出所有格式化的作业列表。如：</p><pre><code>Jobstore default:
    aps_date (trigger: interval[0:00:03], paused) 的形式
</code></pre><p>也可以利用 get_job(任务 ID)获取指定任务的作业列表<br> 返回类似 aps_date (trigger: interval[0:00:03], pending)的形式</p><h3 id="_5-关闭调度器" tabindex="-1"><a class="header-anchor" href="#_5-关闭调度器"><span>5. 关闭调度器：</span></a></h3><p>默认情况下调度器会等待所有正在运行的作业完成后，关闭所有的调度器和作业存储。如果你不想等待，可以将 wait 选项设置为 False。</p><pre><code>    scheduler.shutdown()
</code></pre><p>加入到某个任务触发后可能会触发异常：RuntimeError: cannot join current thread</p><pre><code>    scheduler.shutdown(wait=False)
</code></pre><p>当设置 wait 为 False 时则不会直接触发异常，而是正常关闭。</p><h2 id="五、日志" tabindex="-1"><a class="header-anchor" href="#五、日志"><span>五、日志：</span></a></h2><p>当某个循环执行的脚本出现异常时，需要通过日志进行记录，否则任务依旧不断的执行，控制台不断报错（或在老版本中看不到报错详细）<br> 因此需要日志记录。</p><pre><code>引入logging，参考3.5 中7.logging模块

scheduler._logger = logging  # 让其日志记录为已添加的日志文件，即可把错误存放到日志中。免的在控制台打印
</code></pre><h2 id="六、异常" tabindex="-1"><a class="header-anchor" href="#六、异常"><span>六、异常：</span></a></h2><p>任何代码都可能发生意外，关键是，发生意外了，如何第一时间知道。因此 apscheduler 提供了监听，将事件侦听器附加到调度程序。<br> 部分事件代码：（其他参阅文档）</p><pre><code>    EVENT_JOB_MISSED：工作的执行被遗漏了
    EVENT_JOB_ERROR：一项工作在执行期间引发了异常
    EVENT_JOB_EXECUTED：作业已成功执行
    EVENT_SCHEDULER_START：调度程序已启动
    EVENT_SCHEDULER_SHUTDOWN：调度程序已关闭
</code></pre><p>导入 from apscheduler.events import EVENT_JOB_EXECUTED, EVENT_JOB_ERROR</p><pre><code>def my_listener(event)  # 设置一个监听任务，用于监听是否有任务异常
    if event.exception:
        print(&quot;任务出错了！！！&quot;)
    else:
        print(&quot;任务照常运行...&quot;)

scheduler.add_listener(my_listener, EVENT_JOB_EXECUTED | EVENT_JOB_ERROR)
</code></pre><p>[注]：<br> 在生产环境中，可以把出错信息换成发送一封邮件或者发送一个短信，这样定时任务出错就可以立马就知道了。</p>`,60)]))}const l=r(n,[["render",d]]),h=JSON.parse('{"path":"/python/%E7%94%9F%E6%80%81/%E5%BC%82%E6%AD%A5%E4%BB%BB%E5%8A%A1/APScheduler.html","title":"APScheduler","lang":"zh-CN","frontmatter":{"title":"APScheduler","order":1,"group":{"title":"定时任务","order":32},"description":"APScheduler http://apscheduler.readthedocs.io/en/latest/ 一、APScheduler 简介： APScheduler 基于 Quartz （开源作业调度框架）的一个 Python 定时任务框架，实现了 Quartz 的所有功能，使用起来十分方便。提供了基于日期、 固定时间间隔以及 crontab ...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"APScheduler\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-10-12T14:58:07.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"悦·宝宝\\",\\"url\\":\\"https://github.com/Igarashi-G\\"}]}"],["meta",{"property":"og:url","content":"https://igarashi-g.github.io/python/%E7%94%9F%E6%80%81/%E5%BC%82%E6%AD%A5%E4%BB%BB%E5%8A%A1/APScheduler.html"}],["meta",{"property":"og:site_name","content":"悦 ▪ 宝宝"}],["meta",{"property":"og:title","content":"APScheduler"}],["meta",{"property":"og:description","content":"APScheduler http://apscheduler.readthedocs.io/en/latest/ 一、APScheduler 简介： APScheduler 基于 Quartz （开源作业调度框架）的一个 Python 定时任务框架，实现了 Quartz 的所有功能，使用起来十分方便。提供了基于日期、 固定时间间隔以及 crontab ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-10-12T14:58:07.000Z"}],["meta",{"property":"article:modified_time","content":"2022-10-12T14:58:07.000Z"}]]},"git":{"createdTime":1665586687000,"updatedTime":1665586687000,"contributors":[{"name":"Igarashi","username":"Igarashi","email":"2545369032@qq.com","commits":1,"url":"https://github.com/Igarashi"}]},"readingTime":{"minutes":6.28,"words":1883},"filePathRelative":"python/生态/异步任务/APScheduler.md","excerpt":"\\n<p><a href=\\"http://apscheduler.readthedocs.io/en/latest/\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">http://apscheduler.readthedocs.io/en/latest/</a></p>\\n<h2>一、APScheduler 简介：</h2>\\n<p>APScheduler 基于 Quartz （开源作业调度框架）的一个 Python 定时任务框架，实现了 Quartz 的所有功能，使用起来十分方便。提供了基于日期、<br>\\n固定时间间隔以及 crontab 类型的任务，并且可以持久化任务。基于这些功能，我们可以很方便的实现一个 python 定时任务系统。</p>","autoDesc":true}');export{l as comp,h as data};
