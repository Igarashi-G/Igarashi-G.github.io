import{_ as e}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as r,c as a,f as n}from"./app.d500deb3.js";const t={},l=n(`<h1 id="celery-task" tabindex="-1"><a class="header-anchor" href="#celery-task" aria-hidden="true">#</a> Celery Task</h1><p>Celery \u662F\u4E00\u4E2A\u7B80\u5355\u3001\u7075\u6D3B\u4E14\u53EF\u9760\u7684\uFF0C\u5904\u7406\u5927\u91CF\u6D88\u606F\u7684\u5206\u5E03\u5F0F\u7CFB\u7EDF\uFF0C</p><ul><li>\u4E13\u6CE8\u4E8E\u5B9E\u65F6\u5904\u7406\u7684\u5F02\u6B65\u4EFB\u52A1\u961F\u5217</li><li>\u652F\u6301\u4EFB\u52A1\u8C03\u5EA6\u7B49\u5B9A\u65F6\u4EFB\u52A1</li></ul><h2 id="\u4E00\u3001celery-\u6982\u8FF0" tabindex="-1"><a class="header-anchor" href="#\u4E00\u3001celery-\u6982\u8FF0" aria-hidden="true">#</a> \u4E00\u3001celery \u6982\u8FF0\uFF1A</h2><h3 id="_1-celery-\u7EC4\u6210" tabindex="-1"><a class="header-anchor" href="#_1-celery-\u7EC4\u6210" aria-hidden="true">#</a> 1.celery \u7EC4\u6210\uFF1A</h3><p>Celery \u7684\u67B6\u6784\u7531\u4E09\u90E8\u5206\u7EC4\u6210\uFF0C\u6D88\u606F\u4E2D\u95F4\u4EF6\uFF08message broker\uFF09\uFF0C\u4EFB\u52A1\u6267\u884C\u5355\u5143\uFF08worker\uFF09\u548C\u4EFB\u52A1\u6267\u884C\u7ED3\u679C\u5B58\u50A8\uFF08task result store\uFF09\u7EC4\u6210\u3002</p><ul><li>\u6D88\u606F\u4E2D\u95F4\u4EF6 <ul><li>Celery \u672C\u8EAB\u4E0D\u63D0\u4F9B\u6D88\u606F\u670D\u52A1\uFF0C\u4F46\u662F\u53EF\u4EE5\u65B9\u4FBF\u7684\u548C\u7B2C\u4E09\u65B9\u63D0\u4F9B\u7684\u6D88\u606F\u4E2D\u95F4\u4EF6\u96C6\u6210\u3002\u5305\u62EC\uFF0CRabbitMQ, Redis \u7B49\u7B49</li></ul></li><li>\u4EFB\u52A1\u6267\u884C\u5355\u5143 <ul><li>Worker \u662F Celery \u63D0\u4F9B\u7684\u4EFB\u52A1\u6267\u884C\u7684\u5355\u5143\uFF0Cworker \u5E76\u53D1\u7684\u8FD0\u884C\u5728\u5206\u5E03\u5F0F\u7684\u7CFB\u7EDF\u8282\u70B9\u4E2D\u3002</li></ul></li><li>\u4EFB\u52A1\u7ED3\u679C\u5B58\u50A8 <ul><li>Task result store \u7528\u6765\u5B58\u50A8 Worker \u6267\u884C\u7684\u4EFB\u52A1\u7684\u7ED3\u679C\uFF0CCelery \u652F\u6301\u4EE5\u4E0D\u540C\u65B9\u5F0F\u5B58\u50A8\u4EFB\u52A1\u7684\u7ED3\u679C\uFF0C\u5305\u62EC AMQP\u3001redis\u3001rbmq \u7B49</li></ul></li></ul><p>\u3010\u53E6\u5916\u3011\uFF1A Celery \u8FD8\u652F\u6301\u4E0D\u540C\u7684\u5E76\u53D1\u548C\u5E8F\u5217\u5316\u7684\u624B\u6BB5</p><p>\u5E76\u53D1\uFF1APrefork, Eventlet, gevent, threads/single threaded \u5E8F\u5217\u5316\uFF1Apickle, json, yaml, msgpack. zlib, bzip2 compression\uFF0C Cryptographic message signing \u7B49\u7B49</p><h3 id="_2-\u4F7F\u7528\u573A\u666F" tabindex="-1"><a class="header-anchor" href="#_2-\u4F7F\u7528\u573A\u666F" aria-hidden="true">#</a> 2.\u4F7F\u7528\u573A\u666F\uFF1A</h3><p>celery \u662F\u4E00\u4E2A\u5F3A\u5927\u7684 \u5206\u5E03\u5F0F\u4EFB\u52A1\u961F\u5217\u7684\u5F02\u6B65\u5904\u7406\u6846\u67B6\uFF0C\u5B83\u53EF\u4EE5\u8BA9\u4EFB\u52A1\u7684\u6267\u884C\u5B8C\u5168\u8131\u79BB\u4E3B\u7A0B\u5E8F\uFF0C\u751A\u81F3\u53EF\u4EE5\u88AB\u5206\u914D\u5230\u5176\u4ED6\u4E3B\u673A\u4E0A\u8FD0\u884C\u3002\u6211\u4EEC\u901A\u5E38\u4F7F\u7528\u5B83\u6765\u5B9E\u73B0\u5F02\u6B65\u4EFB\u52A1\uFF08async task\uFF09\u548C\u5B9A\u65F6\u4EFB\u52A1\uFF08crontab)\u3002</p><ul><li><p>\u5F02\u6B65\u4EFB\u52A1\uFF1A\u5C06\u8017\u65F6\u64CD\u4F5C\u4EFB\u52A1\u63D0\u4EA4\u7ED9 Celery \u53BB\u5F02\u6B65\u6267\u884C\uFF0C\u6BD4\u5982\u53D1\u9001\u77ED\u4FE1/\u90AE\u4EF6\u3001\u6D88\u606F\u63A8\u9001\u3001\u97F3\u89C6\u9891\u5904\u7406\u7B49\u7B49</p></li><li><p>\u5B9A\u65F6\u4EFB\u52A1\uFF1A\u5B9A\u65F6\u6267\u884C\u67D0\u4EF6\u4E8B\u60C5\uFF0C\u6BD4\u5982\u6BCF\u5929\u6570\u636E\u7EDF\u8BA1</p></li></ul><h3 id="_3-\u5B89\u88C5" tabindex="-1"><a class="header-anchor" href="#_3-\u5B89\u88C5" aria-hidden="true">#</a> 3. \u5B89\u88C5\uFF1A</h3><pre><code>pip install -U Celery   or  sudo easy_install Celery
</code></pre><h3 id="_4-\u6267\u884C\u6D41\u7A0B" tabindex="-1"><a class="header-anchor" href="#_4-\u6267\u884C\u6D41\u7A0B" aria-hidden="true">#</a> 4.\u6267\u884C\u6D41\u7A0B\uFF1A</h3><pre><code>user -&gt; \u521D\u59CB\u5316celery \u5B9A\u597Dborker\uFF08\u6D88\u606F\u4E2D\u95F4\u4EF6\uFF0C\u961F\u5217/redis\uFF09\u3001\u5B9A\u597D backend\uFF08\u5B58\u50A8\u4F4D\u7F6E\uFF09 -&gt; \u6267\u884C\u4EFB\u52A1\uFF08celery\u6267\u884C\u5E76\u5C06\u7ED3\u679C\u5199\u5165\u4E2D\u95F4\u4EF6\uFF09
</code></pre><h2 id="\u4E8C\u3001celery-\u521B\u5EFA\u4EFB\u52A1" tabindex="-1"><a class="header-anchor" href="#\u4E8C\u3001celery-\u521B\u5EFA\u4EFB\u52A1" aria-hidden="true">#</a> \u4E8C\u3001celery \u521B\u5EFA\u4EFB\u52A1\uFF1A</h2><h3 id="_1-\u521B\u5EFA\u7B80\u5355\u4EFB\u52A1" tabindex="-1"><a class="header-anchor" href="#_1-\u521B\u5EFA\u7B80\u5355\u4EFB\u52A1" aria-hidden="true">#</a> 1.\u521B\u5EFA\u7B80\u5355\u4EFB\u52A1</h3><pre><code>import celery
import time

backend = &#39;redis://172.16.128.29:6379/0&#39;
broker = &#39;redis://172.16.128.29:6379/1&#39;
cel = celery.Celery(&#39;test&#39;, broker=broker, backend=backend)

@cel.task
def send_email(name):
    print(&quot;\u5411%s\u53D1\u9001\u90AE\u4EF6...&quot; % name)
    time.sleep(1)
    print(&quot;\u5411%s\u53D1\u9001\u90AE\u4EF6\u5B8C\u6210&quot; % name)
    return &quot;ok&quot;
</code></pre><h3 id="_2-\u901A\u8FC7\u5F15\u5165\u5355\u72EC\u914D\u7F6E\u6587\u4EF6-\u521B\u5EFA\u4EFB\u52A1" tabindex="-1"><a class="header-anchor" href="#_2-\u901A\u8FC7\u5F15\u5165\u5355\u72EC\u914D\u7F6E\u6587\u4EF6-\u521B\u5EFA\u4EFB\u52A1" aria-hidden="true">#</a> 2. \u901A\u8FC7\u5F15\u5165\u5355\u72EC\u914D\u7F6E\u6587\u4EF6\uFF0C\u521B\u5EFA\u4EFB\u52A1</h3><p>\u5C06\u4E0A\u6587\u7B80\u5355\u4EFB\u52A1\u90E8\u5206\u6539\u4E3A\u5982\u4E0B\uFF1A</p><pre><code>cel = celery.Celery(&#39;test&#39;)
cel.config_from_object(&#39;celery_test.celery_config&#39;)
</code></pre><p>\u5C06\u914D\u7F6E\u6587\u4EF6 celery_config.py \u5F15\u5165\uFF0C\u8DEF\u5F84\u5E94\u8BE5\u4E3A\u9879\u76EE\u6839\u76EE\u5F55\u540E\u7684\u7EDD\u5BF9\u8DEF\u5F84</p><h4 id="\u914D\u7F6E\u9879" tabindex="-1"><a class="header-anchor" href="#\u914D\u7F6E\u9879" aria-hidden="true">#</a> \u914D\u7F6E\u9879\uFF1A</h4><p>celery 4.0 \u4EE5\u4E0A\u652F\u6301\u5C0F\u5199\u7684\u7B80\u5316\u914D\u7F6E\u9879\uFF1A\uFF08\u901A\u5E38\u5982\u4E0B\uFF09</p><pre><code>broker_url = &quot;redis://172.16.128.29:6379/0&quot;
result_backend = &quot;redis://172.16.128.29:6379/1&quot;

timezone = &#39;Asia/Shanghai&#39;  # \u6307\u5B9A\u65F6\u533A\uFF0C\u9ED8\u8BA4\u662F UTC

task_serializer = &#39;json&#39;  # \u4EFB\u52A1\u5E8F\u5217\u5316\u548C\u53CD\u5E8F\u5217\u5316\u4F7F\u7528pickle\u65B9\u6848
result_serializer = &#39;json&#39;  # \u8BFB\u53D6\u4EFB\u52A1\u7ED3\u679C\u4E00\u822C\u6027\u80FD\u8981\u6C42\u4E0D\u9AD8\uFF0C\u6240\u4EE5\u4F7F\u7528\u4E86\u53EF\u8BFB\u6027\u66F4\u597D\u7684JSON
result_expires = 60 * 60 * 24  # \u4EFB\u52A1\u8FC7\u671F\u65F6\u95F4\uFF0C\u4E0D\u5EFA\u8BAE\u76F4\u63A5\u519986400\uFF0C\u5E94\u8BE5\u8BA9\u8FD9\u6837\u7684magic\u6570\u5B57\u8868\u8FF0\u66F4\u660E\u663E
accept_content = [&#39;json&#39;]  # \u6307\u5B9A\u63A5\u53D7\u7684\u5185\u5BB9\u7C7B\u578B

imoprt = (
    # \u6307\u5B9A\u5BFC\u5165\u7684\u4EFB\u52A1\u6A21\u5757
    &#39;celery_test.celery_task&#39;
)
</code></pre><h2 id="\u4E09\u3001celery-\u542F\u52A8\u4EFB\u52A1" tabindex="-1"><a class="header-anchor" href="#\u4E09\u3001celery-\u542F\u52A8\u4EFB\u52A1" aria-hidden="true">#</a> \u4E09\u3001celery \u542F\u52A8\u4EFB\u52A1</h2><h3 id="_1-\u76F4\u63A5\u7EC8\u7AEF\u6267\u884C\u547D\u4EE4" tabindex="-1"><a class="header-anchor" href="#_1-\u76F4\u63A5\u7EC8\u7AEF\u6267\u884C\u547D\u4EE4" aria-hidden="true">#</a> 1. \u76F4\u63A5\u7EC8\u7AEF\u6267\u884C\u547D\u4EE4\uFF1A</h3><pre><code>celery -A tasks worker --loglevel=info
or
celery worker -A tasks -l info
</code></pre><p>\u6267\u884C\u4EE5\u4E0A\u547D\u4EE4\uFF0C\u5C06\u4EFB\u52A1\u542F\u52A8</p><p>\u3010\u6CE8\u610F\u3011\uFF1A</p><p>windows \u4E0B celery \u82E5\u547D\u4EE4\u884C\u6267\u884C\u62A5\u9519\u5982\u4E0B\uFF1A</p><pre><code>ERROR/MainProcess] Task handler raised error: ValueError(&#39;not enough values to unpack (expected 3, got 0)&#39;)
</code></pre><p>\u9700\u8981\u5B89\u88C5 eventlet \u624D\u884C\uFF08\u539F\u56E0\u4E0D\u660E\uFF09</p><pre><code>pip3 install eventlet
</code></pre><p>\u7136\u540E\u8FD0\u884C\u547D\u4EE4\u9700\u643A\u5E26\u53C2\u6570 -P eventlet\uFF1A</p><pre><code>celery worker -A celery_task -l info -P eventlet
</code></pre><h3 id="_2-\u5199\u811A\u672C\u6267\u884C" tabindex="-1"><a class="header-anchor" href="#_2-\u5199\u811A\u672C\u6267\u884C" aria-hidden="true">#</a> 2.\u5199\u811A\u672C\u6267\u884C\uFF1A</h3><p>\u5EFA\u7ACB\u4E00\u4E2A task_worker.py \u6587\u4EF6\u6765\u542F\u52A8\u4EFB\u52A1</p><pre><code>import sys
import os
from celery_test.celery_task import cel

root_path = os.path.abspath(os.path.join(os.path.dirname(__file__), &quot;..&quot;))
sys.path.insert(0, os.path.dirname(__file__))

sys.argv.extend([&quot;-l&quot;, &quot;INFO&quot;, &quot;-P&quot;, &quot;solo&quot;])
cel.worker_main()
</code></pre><ul><li>\u9700\u8981\u914D\u7F6E\u5BF9\u5E94\u7684\u6B63\u786E\u8DEF\u5F84\uFF0C\u6765\u5F15\u5165\u76F8\u5173\u7684 celery_app</li></ul><h2 id="\u56DB\u3001\u521B\u5EFA-celery-\u751F\u4EA7\u8005" tabindex="-1"><a class="header-anchor" href="#\u56DB\u3001\u521B\u5EFA-celery-\u751F\u4EA7\u8005" aria-hidden="true">#</a> \u56DB\u3001\u521B\u5EFA celery \u751F\u4EA7\u8005</h2><pre><code>from celery_task import send_email
result = send_email.delay(&quot;yuan&quot;)
print(result.id)
result2 = send_email.delay(&quot;alex&quot;)
print(result2.id)\u3000
</code></pre><h2 id="\u4E94\u3001\u83B7\u53D6\u4EFB\u52A1\u6267\u884C\u7ED3\u679C" tabindex="-1"><a class="header-anchor" href="#\u4E94\u3001\u83B7\u53D6\u4EFB\u52A1\u6267\u884C\u7ED3\u679C" aria-hidden="true">#</a> \u4E94\u3001\u83B7\u53D6\u4EFB\u52A1\u6267\u884C\u7ED3\u679C</h2><h3 id="_1-\u901A\u8FC7-asyncresult-\u8FDB\u884C\u7B80\u5355\u5224\u65AD" tabindex="-1"><a class="header-anchor" href="#_1-\u901A\u8FC7-asyncresult-\u8FDB\u884C\u7B80\u5355\u5224\u65AD" aria-hidden="true">#</a> 1.\u901A\u8FC7 AsyncResult \u8FDB\u884C\u7B80\u5355\u5224\u65AD\uFF1A</h3><pre><code>from celery.result import AsyncResult
from celery_task import cel

async_result=AsyncResult(id=&quot;c6ddd5b7-a662-4f0e-93d4-ab69ec2aea5d&quot;, app=cel)

if async_result.successful():
    result = async_result.get()
    print(result)
    # result.forget() # \u5C06\u7ED3\u679C\u5220\u9664
elif async_result.failed():
    print(&#39;\u6267\u884C\u5931\u8D25&#39;)
elif async_result.status == &#39;PENDING&#39;:
    print(&#39;\u4EFB\u52A1\u7B49\u5F85\u4E2D\u88AB\u6267\u884C&#39;)
elif async_result.status == &#39;RETRY&#39;:
    print(&#39;\u4EFB\u52A1\u5F02\u5E38\u540E\u6B63\u5728\u91CD\u8BD5&#39;)
elif async_result.status == &#39;STARTED&#39;:
    print(&#39;\u4EFB\u52A1\u5DF2\u7ECF\u5F00\u59CB\u88AB\u6267\u884C&#39;)
</code></pre>`,46),s=[l];function i(c,o){return r(),a("div",null,s)}const p=e(t,[["render",i],["__file","Celery.html.vue"]]);export{p as default};
