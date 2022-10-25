import{_ as a}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as n,c as d,a as e,b as t,d as r,f as s,r as c}from"./app.d442ff55.js";const l={},h=e("h1",{id:"apscheduler",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#apscheduler","aria-hidden":"true"},"#"),r(" APScheduler")],-1),u={href:"http://apscheduler.readthedocs.io/en/latest/",target:"_blank",rel:"noopener noreferrer"},i=r("http://apscheduler.readthedocs.io/en/latest/"),p=s(`<h2 id="\u4E00\u3001apscheduler-\u7B80\u4ECB" tabindex="-1"><a class="header-anchor" href="#\u4E00\u3001apscheduler-\u7B80\u4ECB" aria-hidden="true">#</a> \u4E00\u3001APScheduler \u7B80\u4ECB\uFF1A</h2><p>APScheduler \u57FA\u4E8E Quartz \uFF08\u5F00\u6E90\u4F5C\u4E1A\u8C03\u5EA6\u6846\u67B6\uFF09\u7684\u4E00\u4E2A Python \u5B9A\u65F6\u4EFB\u52A1\u6846\u67B6\uFF0C\u5B9E\u73B0\u4E86 Quartz \u7684\u6240\u6709\u529F\u80FD\uFF0C\u4F7F\u7528\u8D77\u6765\u5341\u5206\u65B9\u4FBF\u3002\u63D0\u4F9B\u4E86\u57FA\u4E8E\u65E5\u671F\u3001 \u56FA\u5B9A\u65F6\u95F4\u95F4\u9694\u4EE5\u53CA crontab \u7C7B\u578B\u7684\u4EFB\u52A1\uFF0C\u5E76\u4E14\u53EF\u4EE5\u6301\u4E45\u5316\u4EFB\u52A1\u3002\u57FA\u4E8E\u8FD9\u4E9B\u529F\u80FD\uFF0C\u6211\u4EEC\u53EF\u4EE5\u5F88\u65B9\u4FBF\u7684\u5B9E\u73B0\u4E00\u4E2A python \u5B9A\u65F6\u4EFB\u52A1\u7CFB\u7EDF\u3002</p><pre><code>\u9664\u6B64\u4E4B\u5916\uFF0C\u5EFA\u7ACB\u9AD8\u6548\u80FD\u7684\u5B9A\u65F6\u4EFB\u52A1\u53EF\u53C2\u8003celery
</code></pre><h2 id="\u4E8C\u3001\u5B89\u88C5-\u793A\u4F8B" tabindex="-1"><a class="header-anchor" href="#\u4E8C\u3001\u5B89\u88C5-\u793A\u4F8B" aria-hidden="true">#</a> \u4E8C\u3001\u5B89\u88C5&amp;\u793A\u4F8B\uFF1A</h2><pre><code>pip install apscheduler
</code></pre><p>\u6CE8\u610F\uFF1A \u82E5\u51FA\u73B0\u7531\u4E8E\u5B89\u88C5\u95EE\u9898\u5BFC\u81F4\u7684\u51FA\u9519\uFF0C\u5148\u786E\u8BA4\u662F\u5426\u5B89\u88C5\u7248\u672C\u6B63\u786E\uFF0C\u82E5\u5B89\u88C5\u548C\u914D\u7F6E\u6587\u4EF6\u4E2D\u7684\u7248\u672C\u4E00\u81F4\uFF0C\u8FD0\u884C pip install setuptools --upgrade \u4E4B\u540E\u518D\u8FD0\u884C\u8BD5\u8BD5\u3002</p><pre><code>\u4F8B\uFF1A
from apscheduler.schedulers.blocking import BlockingScheduler   # \u5BFC\u5165\uFF0C\u8C03\u5EA6\u7A0B\u5E8F\u662F\u60A8\u7684\u8FDB\u7A0B\u4E2D\u552F\u4E00\u8FD0\u884C\u7684\u65F6\u5019\u4F7F\u7528
import datetime


def my_job():
    print(datetime.datetime.now().strftime(&#39;%Y-%m-%d %H:%M:%S&#39;), &quot;hello world&quot;)


scheduler = BlockingScheduler()     # \u5148\u5B9E\u4F8B\u5316\u4E00\u4E2A\u963B\u585E\u8C03\u5EA6\u7A0B\u5E8F\u5BF9\u8C61
scheduler.add_job(func=my_job, trigger=&#39;cron&#39;, second=&#39;*/5&#39;)  # \u901A\u8FC7 add_job \u6765\u6DFB\u52A0\u4F5C\u4E1A
scheduler.start()

\u4E0A\u9762\u7684\u4F8B\u5B50\u8868\u793A\u6BCF\u96945s\u6267\u884C\u4E00\u6B21 my_job \u51FD\u6570\uFF0C\u8F93\u51FA\u5F53\u524D\u65F6\u95F4\u4FE1\u606F\u548C&quot;hello world&quot;

\u5176\u4E2DBlockingScheduler()\u5B9E\u4F8B\u5316\u7684\u5BF9\u8C61 \u53EF\u4EE5\u901A\u8FC7\u8BBE\u7F6E\u5982\u4E0B\u7684\u4E00\u4E2A\u5B57\u5178 \u6307\u5B9A\u9ED8\u8BA4\u503C\uFF1A\uFF08\u53C2\u8003\u6587\u6863\uFF09
   scheduler = BlockingScheduler({
        &#39;apscheduler.executors.default&#39;: {
            &#39;class&#39;: &#39;apscheduler.executors.pool:ThreadPoolExecutor&#39;,   # \u4E00\u4E2A\u540D\u4E3A&#39;default&#39;\u7684ThreadPoolExecutor\u7EBF\u7A0B\u6C60
            &#39;\u88C5\u9970_workers&#39;: &#39;20&#39;                                         # \u5176worker\u503C\u4E3A20
        },
        &#39;apscheduler.timezone&#39;: &#39;Asia/Shanghai&#39;     # Shanghai\u4F5C\u4E3A\u8C03\u5EA6\u7A0B\u5E8F\u7684\u65F6\u533A
    })
</code></pre><h2 id="\u4E09\u3001apscheduler-\u7684\u56DB\u79CD\u7EC4\u6210\u90E8\u5206" tabindex="-1"><a class="header-anchor" href="#\u4E09\u3001apscheduler-\u7684\u56DB\u79CD\u7EC4\u6210\u90E8\u5206" aria-hidden="true">#</a> \u4E09\u3001APScheduler \u7684\u56DB\u79CD\u7EC4\u6210\u90E8\u5206\uFF1A</h2><h3 id="_1-\u89E6\u53D1\u5668-trigger" tabindex="-1"><a class="header-anchor" href="#_1-\u89E6\u53D1\u5668-trigger" aria-hidden="true">#</a> 1.\u89E6\u53D1\u5668(trigger)\uFF1A</h3><p>\u5305\u542B\u8C03\u5EA6\u903B\u8F91\uFF0C\u6BCF\u4E00\u4E2A\u4F5C\u4E1A\u6709\u5B83\u81EA\u5DF1\u7684\u89E6\u53D1\u5668\uFF0C\u7528\u4E8E\u51B3\u5B9A\u63A5\u4E0B\u6765\u54EA\u4E00\u4E2A\u4F5C\u4E1A\u4F1A\u8FD0\u884C\u3002\u9664\u4E86\u4ED6\u4EEC\u81EA\u5DF1\u521D\u59CB\u914D\u7F6E\u610F\u5916\uFF0C\u89E6\u53D1\u5668\u5B8C\u5168\u662F\u65E0\u72B6\u6001\u7684\u3002 \u4E0A\u9762\u4EE3\u7801\u4E2D\u7528\u4E86 cron\uFF0C\u5171\u6709 date, interval, cron \u53EF\u4F9B\u9009\u62E9\u3002</p><ul><li>date\uFF1A\u8868\u793A\u5177\u4F53\u7684\u4E00\u6B21\u6027\u4EFB\u52A1</li><li>interval\uFF1A\u8868\u793A\u5FAA\u73AF\u4EFB\u52A1</li><li>cron\uFF1A\u8868\u793A\u5B9A\u65F6\u4EFB\u52A1</li></ul><p>\u53EF\u53C2\u7167\u6587\u6863\u67E5\u770B \u4E0D\u540C\u89E6\u53D1\u5668\u7684\u4EFB\u52A1 \u4F20\u5165\u7684\u65F6\u95F4\u7C7B\u578B</p><h3 id="_2-\u4F5C\u4E1A\u5B58\u50A8-job-store" tabindex="-1"><a class="header-anchor" href="#_2-\u4F5C\u4E1A\u5B58\u50A8-job-store" aria-hidden="true">#</a> 2.\u4F5C\u4E1A\u5B58\u50A8(job store)\uFF1A</h3><p>\u5B58\u50A8\u88AB\u8C03\u5EA6\u7684\u4F5C\u4E1A\uFF0C\u9ED8\u8BA4\u7684\u4F5C\u4E1A\u5B58\u50A8\u662F\u7B80\u5355\u5730\u628A\u4F5C\u4E1A\u4FDD\u5B58\u5728\u5185\u5B58\u4E2D\uFF0C\u5176\u4ED6\u7684\u4F5C\u4E1A\u5B58\u50A8\u662F\u5C06\u4F5C\u4E1A\u4FDD\u5B58\u5728\u6570\u636E\u5E93\u4E2D\u3002</p><p>\u4E00\u4E2A\u4F5C\u4E1A\u7684\u6570\u636E\u4FDD\u5B58\u5728\u6301\u4E45\u5316\u4F5C\u4E1A\u5B58\u50A8\u65F6\u88AB\u5E8F\u5217\u5316\uFF0C\u5E76\u5728\u52A0\u8F7D\u65F6\u88AB\u53CD\u5E8F\u5217\u5316\u3002\u8C03\u5EA6\u5668\u4E0D\u80FD\u5206\u4EAB\u540C\u4E00\u4E2A\u4F5C\u4E1A\u5B58\u50A8\u3002</p><h3 id="_3-\u6267\u884C\u5668-executor" tabindex="-1"><a class="header-anchor" href="#_3-\u6267\u884C\u5668-executor" aria-hidden="true">#</a> 3.\u6267\u884C\u5668(executor)\uFF1A</h3><p>\u5904\u7406\u4F5C\u4E1A\u7684\u8FD0\u884C\uFF0C\u4ED6\u4EEC\u901A\u5E38\u901A\u8FC7\u5728\u4F5C\u4E1A\u4E2D\u63D0\u4EA4\u5236\u5B9A\u7684\u53EF\u8C03\u7528\u5BF9\u8C61\u5230\u4E00\u4E2A\u7EBF\u7A0B\u6216\u8005\u8FDB\u7A0B\u6C60\u6765\u8FDB\u884C\u3002\u5F53\u4F5C\u4E1A\u5B8C\u6210\u65F6\uFF0C\u6267\u884C\u5668\u5C06\u4F1A\u901A\u77E5\u8C03\u5EA6\u5668\u3002</p><h3 id="_4-\u8C03\u5EA6\u5668-scheduler" tabindex="-1"><a class="header-anchor" href="#_4-\u8C03\u5EA6\u5668-scheduler" aria-hidden="true">#</a> 4.\u8C03\u5EA6\u5668(scheduler)\uFF1A</h3><p>\u662F\u5176\u4ED6\u7684\u7EC4\u6210\u90E8\u5206\u3002\u4F60\u901A\u5E38\u5728\u5E94\u7528\u53EA\u6709\u4E00\u4E2A\u8C03\u5EA6\u5668\uFF0C\u5E94\u7528\u7684\u5F00\u53D1\u8005\u901A\u5E38\u4E0D\u4F1A\u76F4\u63A5\u5904\u7406\u4F5C\u4E1A\u5B58\u50A8\u3001\u8C03\u5EA6\u5668\u548C\u89E6\u53D1\u5668\uFF0C\u76F8\u53CD\uFF0C\u8C03\u5EA6\u5668\u63D0\u4F9B\u4E86\u5904\u7406\u8FD9\u4E9B\u7684\u5408\u9002 \u7684\u63A5\u53E3\u3002\u914D\u7F6E\u4F5C\u4E1A\u5B58\u50A8\u548C\u6267\u884C\u5668\u53EF\u4EE5\u5728\u8C03\u5EA6\u5668\u4E2D\u5B8C\u6210\uFF0C\u4F8B\u5982\u6DFB\u52A0\u3001\u4FEE\u6539\u548C\u79FB\u9664\u4F5C\u4E1A\u3002</p><p>[\u914D\u7F6E\u8C03\u5EA6\u5668\u7684 3 \u79CD\u65B9\u5F0F]\uFF1A [\u65B9\u5F0F\u4E00]\uFF1A</p><pre><code>from pytz import utc
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
    &#39;processpool&#39;: ProcessPoolExecutor\uFF085\uFF09
}
job_defaults = {
    &#39;coalesce&#39;: False,
    &#39;max_instances&#39;: 3
}
scheduler = BackgroundScheduler(jobstores=jobstores, executors=executors,    job_defaults=job_defaults, timezone=utc)
</code></pre><p>[\u65B9\u5F0F\u4E8C]\uFF1A</p><pre><code>from apscheduler.schedulers.background import BackgroundScheduler
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
</code></pre><p>[\u65B9\u5F0F\u4E09]\uFF1A</p><pre><code>init_scheduler_options = {
    &quot;jobstores&quot;: {
        &quot;default&quot;: MemoryJobStore() # \u9ED8\u8BA4\u4F7F\u7528\u5185\u5B58\u6765\u5B58\u50A8
    },
    &quot;executors&quot;: {
        &#39;default&#39;: {&#39;type&#39;: &#39;threadpool&#39;, &#39;max_workers&#39;: 20},  # \u6700\u5927\u5DE5\u4F5C\u7EBF\u7A0B\u657020
        &#39;processpool&#39;: ProcessPoolExecutor(max_workers=5),  # \u6700\u5927\u5DE5\u4F5C\u8FDB\u7A0B\u6570\u4E3A5
    },
    &quot;job_defaults&quot;: {
        &#39;coalesce&#39;: False,
        &#39;max_instances&#39;: 100
    }
}
scheduler = BackgroundScheduler(**init_scheduler_options)
</code></pre><h2 id="\u56DB\u3001\u64CD\u4F5C\u4F5C\u4E1A" tabindex="-1"><a class="header-anchor" href="#\u56DB\u3001\u64CD\u4F5C\u4F5C\u4E1A" aria-hidden="true">#</a> \u56DB\u3001\u64CD\u4F5C\u4F5C\u4E1A</h2><h3 id="_1-\u6DFB\u52A0\u4F5C\u4E1A" tabindex="-1"><a class="header-anchor" href="#_1-\u6DFB\u52A0\u4F5C\u4E1A" aria-hidden="true">#</a> 1.\u6DFB\u52A0\u4F5C\u4E1A\uFF1A</h3><p>\u901A\u5E38\u9664\u4E86\u793A\u4F8B\u4E4B\u5916\uFF0C\u5E38\u7528\u7684\u65B9\u5F0F\u662F\u901A\u8FC7@ .scheduled_job()\u88C5\u9970\u5668\u88C5\u9970 my_job \u8FDB\u884C\u6DFB\u52A0\u4F5C\u4E1A</p><pre><code>    scheduler = BlockingScheduler()

    @scheduler.scheduled_job(&#39;interval&#39;, seconds=3, args=(&quot;\u5FAA\u73AF\u4EFB\u52A1&quot;,)) # \u6CE8\u610F\u8FD9\u91CC\u7684\u4F20\u53C2\u5F62\u5F0F\u4E3A\u5143\u7EC4\uFF0C\u8C8C\u4F3C\u662F\u89C4\u5B9A\u6B7B\u7684
    @scheduler.scheduled_job(&#39;cron&#39;, second=&#39;*/5&#39;, args=(&quot;\u5B9A\u65F6\u4EFB\u52A1&quot;,)) # \u8FD9\u91CC\u88C5\u9970\u5668\u53EF\u4EE5\u8FDB\u884C\u5D4C\u5957
    def my_job(x):  # \u53EF\u4EE5\u5728\u6DFB\u52A0\u4F5C\u4E1A\u65F6\u8FDB\u884C\u4F20\u53C2
        print(datetime.datetime.now().strftime(&#39;%Y-%m-%d %H:%M:%S&#39;), x)

    scheduler.add_job(func=my_job, args=(&quot;\u4E00\u6B21\u6027\u4EFB\u52A1&quot;,),
                    next_run_time=datetime.datetime.now() + datetime.timedelta(seconds=2))

    \u6CE8\u610F\uFF1A
        1.\u53EA\u6709\u4E00\u6B21\u6027\u4EFB\u52A1\u7684 trigger \u53EF\u4EE5\u4E0D\u7528\u5199\uFF0C\u6E90\u7801\u4E2D\u5224\u65AD\u82E5trigger is None \u5219\u76F4\u63A5\u5B9A\u4E49\u4E3A&#39;date&#39;\u7C7B\u578B
        2.\u5982\u679C\u5B9E\u73B0web\u7684\u5F02\u6B65\u4EFB\u52A1\u3002\u5047\u8BBE\u63A5\u5230\u4E00\u4E2A\u79FB\u52A8\u7AEF\u4EFB\u52A1\uFF0C\u4EFB\u52A1\u5B8C\u6210\u540E\uFF0C\u53D1\u9001\u4E00\u4E2A\u63A8\u9001\u5230\u79FB\u52A8\u7AEF\uFF0C\u7528date\u7C7B\u578B\u7684trigger\u5B8C\u6210\u53EF\u4EE5\u505A\u7684\u5F88\u597D\u3002
</code></pre><h3 id="_2-\u79FB\u9664\u4F5C\u4E1A" tabindex="-1"><a class="header-anchor" href="#_2-\u79FB\u9664\u4F5C\u4E1A" aria-hidden="true">#</a> 2.\u79FB\u9664\u4F5C\u4E1A\uFF1A</h3><p>\u5F53\u8981\u6C42\u6267\u884C\u4E00\u5B9A\u9636\u6BB5\u4EFB\u52A1\u4EE5\u540E\uFF0C\u5220\u9664\u67D0\u4E00\u4E2A\u5FAA\u73AF\u4EFB\u52A1\uFF0C\u5176\u4ED6\u4EFB\u52A1\u7167\u5E38\u8FDB\u884C\u65F6\u8003\u8651\u4F7F\u7528\u3002</p><pre><code>job = scheduler.add_job(aps_date, &#39;interval&#39;, minutes=2)
job.remove()    # \u82E5\u5B58\u5728\u4E24\u4E2A\u4EFB\u52A1\uFF0C\u9ED8\u8BA4\u7684\u5E94\u8BE5\u662F\u79FB\u9664\u7B2C\u4E00\u4E2A\u4EFB\u52A1\uFF0C\u56E0\u6B64\u4E0D\u8981\u5199\u5728\u6267\u884C\u4F53\u4E2D\uFF0C\u5199\u5230\u8981\u79FB\u9664\u7684\u51FD\u6570\u4E2D\u66F4\u597D

def aps_date():
    job.remove()
    print(datetime.datetime.now().strftime(&#39;%Y-%m-%d %H:%M:%S&#39;), &quot;\u5FAA\u73AF\u4EFB\u52A1\u6267\u884C\u540E\u79FB\u9664&quot;)
</code></pre><p>\u5982\u679C\u6709\u591A\u4E2A\u4EFB\u52A1\u5E8F\u5217\u7684\u8BDD\u53EF\u4EE5\u7ED9\u6BCF\u4E2A\u4EFB\u52A1\u8BBE\u7F6E ID \u53F7\uFF0C\u53EF\u4EE5\u6839\u636E ID \u53F7\u9009\u62E9\u6E05\u9664\u5BF9\u8C61\uFF0C\u4E14 remove \u653E\u5230 start \u524D\u624D\u6709\u6548</p><pre><code>scheduler.add_job(myfunc, &#39;interval&#39;, minutes=2, id=&#39;my_job_id&#39;)
scheduler.remove_job(&#39;my_job_id&#39;)   # \u82E5\u6CA1\u6709\u627E\u5230\u4EFB\u52A1id\u5219\u62A5\u9519
</code></pre><h3 id="_3-\u6682\u505C\u548C\u6062\u590D\u4F5C\u4E1A" tabindex="-1"><a class="header-anchor" href="#_3-\u6682\u505C\u548C\u6062\u590D\u4F5C\u4E1A" aria-hidden="true">#</a> 3. \u6682\u505C\u548C\u6062\u590D\u4F5C\u4E1A\uFF1A</h3><p>\u548C\u4E0A\u7684\u5220\u9664\u4EFB\u52A1\u7528\u6CD5\u57FA\u672C\u4E00\u81F4</p><pre><code>job.pause()
job.resume()
scheduler.pause_job(&#39;interval_task&#39;) # \u9700\u8981id
scheduler.resume_job(&#39;interval_task&#39;)
</code></pre><h3 id="_4-\u83B7\u5F97-job-\u5217\u8868" tabindex="-1"><a class="header-anchor" href="#_4-\u83B7\u5F97-job-\u5217\u8868" aria-hidden="true">#</a> 4. \u83B7\u5F97 job \u5217\u8868\uFF1A</h3><p>\u83B7\u5F97\u8C03\u5EA6\u4F5C\u4E1A\u7684\u5217\u8868\uFF0C\u53EF\u4EE5\u4F7F\u7528 get_jobs()\u6765\u5B8C\u6210\uFF0C\u5B83\u4F1A\u8FD4\u56DE\u6240\u6709\u7684 job \u5B9E\u4F8B\u3002 \u5219\u4F1A\u8FD4\u56DE\u6BCF\u4E2A job \u7684 id\uFF08\u6CA1\u6709\u8BBE\u7F6E\u7CFB\u7EDF\u9ED8\u8BA4\uFF09\u548C name \u7684\u5217\u8868 \u5982\uFF1A</p><pre><code>[&lt;Job (id=f9f29b9c3a594e21a7fae10c92e5fcb2 name=my_job)&gt;, &lt;Job (id=23 name=aps_date)&gt;]\u5F62\u5F0F
</code></pre><p>\u6216\u8005\u4F7F\u7528 print_jobs()\u6765\u8F93\u51FA\u6240\u6709\u683C\u5F0F\u5316\u7684\u4F5C\u4E1A\u5217\u8868\u3002\u5982\uFF1A</p><pre><code>Jobstore default:
    aps_date (trigger: interval[0:00:03], paused) \u7684\u5F62\u5F0F
</code></pre><p>\u4E5F\u53EF\u4EE5\u5229\u7528 get_job(\u4EFB\u52A1 ID)\u83B7\u53D6\u6307\u5B9A\u4EFB\u52A1\u7684\u4F5C\u4E1A\u5217\u8868 \u8FD4\u56DE\u7C7B\u4F3C aps_date (trigger: interval[0:00:03], pending)\u7684\u5F62\u5F0F</p><h3 id="_5-\u5173\u95ED\u8C03\u5EA6\u5668" tabindex="-1"><a class="header-anchor" href="#_5-\u5173\u95ED\u8C03\u5EA6\u5668" aria-hidden="true">#</a> 5. \u5173\u95ED\u8C03\u5EA6\u5668\uFF1A</h3><p>\u9ED8\u8BA4\u60C5\u51B5\u4E0B\u8C03\u5EA6\u5668\u4F1A\u7B49\u5F85\u6240\u6709\u6B63\u5728\u8FD0\u884C\u7684\u4F5C\u4E1A\u5B8C\u6210\u540E\uFF0C\u5173\u95ED\u6240\u6709\u7684\u8C03\u5EA6\u5668\u548C\u4F5C\u4E1A\u5B58\u50A8\u3002\u5982\u679C\u4F60\u4E0D\u60F3\u7B49\u5F85\uFF0C\u53EF\u4EE5\u5C06 wait \u9009\u9879\u8BBE\u7F6E\u4E3A False\u3002</p><pre><code>    scheduler.shutdown()
</code></pre><p>\u52A0\u5165\u5230\u67D0\u4E2A\u4EFB\u52A1\u89E6\u53D1\u540E\u53EF\u80FD\u4F1A\u89E6\u53D1\u5F02\u5E38\uFF1ARuntimeError: cannot join current thread</p><pre><code>    scheduler.shutdown(wait=False)
</code></pre><p>\u5F53\u8BBE\u7F6E wait \u4E3A False \u65F6\u5219\u4E0D\u4F1A\u76F4\u63A5\u89E6\u53D1\u5F02\u5E38\uFF0C\u800C\u662F\u6B63\u5E38\u5173\u95ED\u3002</p><h2 id="\u4E94\u3001\u65E5\u5FD7" tabindex="-1"><a class="header-anchor" href="#\u4E94\u3001\u65E5\u5FD7" aria-hidden="true">#</a> \u4E94\u3001\u65E5\u5FD7\uFF1A</h2><p>\u5F53\u67D0\u4E2A\u5FAA\u73AF\u6267\u884C\u7684\u811A\u672C\u51FA\u73B0\u5F02\u5E38\u65F6\uFF0C\u9700\u8981\u901A\u8FC7\u65E5\u5FD7\u8FDB\u884C\u8BB0\u5F55\uFF0C\u5426\u5219\u4EFB\u52A1\u4F9D\u65E7\u4E0D\u65AD\u7684\u6267\u884C\uFF0C\u63A7\u5236\u53F0\u4E0D\u65AD\u62A5\u9519\uFF08\u6216\u5728\u8001\u7248\u672C\u4E2D\u770B\u4E0D\u5230\u62A5\u9519\u8BE6\u7EC6\uFF09 \u56E0\u6B64\u9700\u8981\u65E5\u5FD7\u8BB0\u5F55\u3002</p><pre><code>\u5F15\u5165logging\uFF0C\u53C2\u80033.5 \u4E2D7.logging\u6A21\u5757

scheduler._logger = logging  # \u8BA9\u5176\u65E5\u5FD7\u8BB0\u5F55\u4E3A\u5DF2\u6DFB\u52A0\u7684\u65E5\u5FD7\u6587\u4EF6\uFF0C\u5373\u53EF\u628A\u9519\u8BEF\u5B58\u653E\u5230\u65E5\u5FD7\u4E2D\u3002\u514D\u7684\u5728\u63A7\u5236\u53F0\u6253\u5370
</code></pre><h2 id="\u516D\u3001\u5F02\u5E38" tabindex="-1"><a class="header-anchor" href="#\u516D\u3001\u5F02\u5E38" aria-hidden="true">#</a> \u516D\u3001\u5F02\u5E38\uFF1A</h2><p>\u4EFB\u4F55\u4EE3\u7801\u90FD\u53EF\u80FD\u53D1\u751F\u610F\u5916\uFF0C\u5173\u952E\u662F\uFF0C\u53D1\u751F\u610F\u5916\u4E86\uFF0C\u5982\u4F55\u7B2C\u4E00\u65F6\u95F4\u77E5\u9053\u3002\u56E0\u6B64 apscheduler \u63D0\u4F9B\u4E86\u76D1\u542C\uFF0C\u5C06\u4E8B\u4EF6\u4FA6\u542C\u5668\u9644\u52A0\u5230\u8C03\u5EA6\u7A0B\u5E8F\u3002 \u90E8\u5206\u4E8B\u4EF6\u4EE3\u7801\uFF1A\uFF08\u5176\u4ED6\u53C2\u9605\u6587\u6863\uFF09</p><pre><code>    EVENT_JOB_MISSED\uFF1A\u5DE5\u4F5C\u7684\u6267\u884C\u88AB\u9057\u6F0F\u4E86
    EVENT_JOB_ERROR\uFF1A\u4E00\u9879\u5DE5\u4F5C\u5728\u6267\u884C\u671F\u95F4\u5F15\u53D1\u4E86\u5F02\u5E38
    EVENT_JOB_EXECUTED\uFF1A\u4F5C\u4E1A\u5DF2\u6210\u529F\u6267\u884C
    EVENT_SCHEDULER_START\uFF1A\u8C03\u5EA6\u7A0B\u5E8F\u5DF2\u542F\u52A8
    EVENT_SCHEDULER_SHUTDOWN\uFF1A\u8C03\u5EA6\u7A0B\u5E8F\u5DF2\u5173\u95ED
</code></pre><p>\u5BFC\u5165 from apscheduler.events import EVENT_JOB_EXECUTED, EVENT_JOB_ERROR</p><pre><code>def my_listener(event)  # \u8BBE\u7F6E\u4E00\u4E2A\u76D1\u542C\u4EFB\u52A1\uFF0C\u7528\u4E8E\u76D1\u542C\u662F\u5426\u6709\u4EFB\u52A1\u5F02\u5E38
    if event.exception:
        print(&quot;\u4EFB\u52A1\u51FA\u9519\u4E86\uFF01\uFF01\uFF01&quot;)
    else:
        print(&quot;\u4EFB\u52A1\u7167\u5E38\u8FD0\u884C...&quot;)

scheduler.add_listener(my_listener, EVENT_JOB_EXECUTED | EVENT_JOB_ERROR)
</code></pre><p>[\u6CE8]\uFF1A \u5728\u751F\u4EA7\u73AF\u5883\u4E2D\uFF0C\u53EF\u4EE5\u628A\u51FA\u9519\u4FE1\u606F\u6362\u6210\u53D1\u9001\u4E00\u5C01\u90AE\u4EF6\u6216\u8005\u53D1\u9001\u4E00\u4E2A\u77ED\u4FE1\uFF0C\u8FD9\u6837\u5B9A\u65F6\u4EFB\u52A1\u51FA\u9519\u5C31\u53EF\u4EE5\u7ACB\u9A6C\u5C31\u77E5\u9053\u4E86\u3002</p>`,58);function _(m,b){const o=c("ExternalLinkIcon");return n(),d("div",null,[h,e("p",null,[e("a",u,[i,t(o)])]),p])}const x=a(l,[["render",_],["__file","APScheduler.html.vue"]]);export{x as default};
