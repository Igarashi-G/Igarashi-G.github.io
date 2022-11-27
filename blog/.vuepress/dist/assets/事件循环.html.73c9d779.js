import{_ as t}from"./plugin-vueexport-helper.2444895f.js";import{o as a,c as i,a as n,b as e,d as r,f as s,r as _}from"./app.e386e282.js";const c={},l=n("h1",{id:"asyncio-\u2014\u2014\u2014\u2014-\u4E0D\u540C\u7EBF\u7A0B\u7684\u4E8B\u4EF6\u5FAA\u73AF",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#asyncio-\u2014\u2014\u2014\u2014-\u4E0D\u540C\u7EBF\u7A0B\u7684\u4E8B\u4EF6\u5FAA\u73AF","aria-hidden":"true"},"#"),e(" asyncio \u2014\u2014\u2014\u2014 \u4E0D\u540C\u7EBF\u7A0B\u7684\u4E8B\u4EF6\u5FAA\u73AF")],-1),p={href:"https://www.cnblogs.com/yanzi-meng/p/8533734.html",target:"_blank",rel:"noopener noreferrer"},u=s(`<h2 id="\u4E0D\u540C\u7EBF\u7A0B\u7684\u4E8B\u4EF6\u5FAA\u73AF" tabindex="-1"><a class="header-anchor" href="#\u4E0D\u540C\u7EBF\u7A0B\u7684\u4E8B\u4EF6\u5FAA\u73AF" aria-hidden="true">#</a> \u4E0D\u540C\u7EBF\u7A0B\u7684\u4E8B\u4EF6\u5FAA\u73AF</h2><h3 id="_1-\u540C\u4E00\u7EBF\u7A0B" tabindex="-1"><a class="header-anchor" href="#_1-\u540C\u4E00\u7EBF\u7A0B" aria-hidden="true">#</a> 1.\u540C\u4E00\u7EBF\u7A0B\uFF1A</h3><pre><code>import asyncio,time

async def func1(num):
    print(num,&#39;before---func1----&#39;)
    await asyncio.sleep(num)
    return &quot;recv num %s&quot;%num

if __name__ == &quot;__main__&quot;:
    begin = time.time()

    coroutine1 = func1(5)
    coroutine2 = func1(3)
    coroutine3 = func1(4)

    tasks = [
        asyncio.ensure_future(coroutine1),
        asyncio.ensure_future(coroutine2),
        asyncio.ensure_future(coroutine3),
    ]


    loop = asyncio.get_event_loop()
    loop.run_until_complete(asyncio.wait(tasks))
    loop.run_forever()
    end = time.time()
    print(end-begin)
</code></pre><p>\u3010\u53D1\u73B0\u95EE\u9898\u3011\uFF1A</p><p>\u4E0A\u8FF0\u4EE3\u7801\u5728\u4E00\u4E2A\u7EBF\u7A0B\u4E2D\u6267\u884C\u7684\u4E8B\u4EF6\u5FAA\u73AF\uFF0C\u9664\u975E\u53EA\u6709\u6211\u4EEC<strong>\u4E3B\u52A8\u5173\u95ED</strong>\u4E8B\u4EF6 close\uFF0C\u4E8B\u4EF6\u5FAA\u73AF\u624D\u4F1A\u7ED3\u675F\u3002\u5426\u5219\u8F93\u51FA\u5B8C 534 \u7ED3\u679C\u4E00\u81F4\u4F1A\u8FDB\u884C\u963B\u585E\uFF0C\u7B49\u5F85\u5176\u4ED6\u534F\u7A0B \u4EFB\u52A1\u5230\u8FBE\uFF0C\u90A3\u4E48\u6B64\u65F6\u4E0D\u60F3\u8BA9\u7EBF\u7A0B\u963B\u585E\uFF0C\u800C\u53BB\u5B8C\u6210\u522B\u7684\u5DE5\u4F5C\u5462\uFF1F</p><p>\u3010\u89E3\u51B3\u529E\u6CD5\u3011\uFF1A</p><p>\u5728\u5F53\u524D\u7EBF\u7A0B\u4E2D\u521B\u5EFA\u4E00\u4E2A\u4E8B\u4EF6\u5FAA\u73AF\uFF08<strong>\u4E0D\u542F\u7528</strong>\uFF0C\u5355\u7EAF\u83B7\u53D6<strong>\u6807\u8BC6</strong>\uFF09\uFF0C\u5F00\u542F\u4E00\u4E2A\u65B0\u7684\u7EBF\u7A0B\uFF0C\u5728<strong>\u65B0\u7684\u7EBF\u7A0B\u4E2D\u542F\u52A8</strong>\u4E8B\u4EF6\u5FAA\u73AF\u3002\u5728\u5F53\u524D\u7EBF\u7A0B\u4F9D\u636E\u4E8B\u4EF6\u5FAA\u73AF\u6807\u8BC6\uFF0C \u53EF\u4EE5\u5411\u4E8B\u4EF6\u4E2D\u6DFB\u52A0\u534F\u7A0B\u5BF9\u8C61\u3002\u5F53\u524D\u7EBF\u7A0B\u4E0D\u4F1A\u7531\u4E8E\u4E8B\u4EF6\u5FAA\u73AF\u800C\u963B\u585E\u4E86\u3002</p><p>###2.\u4E0D\u540C\u7EBF\u7A0B\u4E8B\u4EF6\u5FAA\u73AF\uFF08\u4E0D\u6D89\u53CA\u534F\u7A0B\uFF09\uFF1A \u3010\u573A\u666F\u3011\uFF1A</p><p>\u4E8B\u4EF6\u5FAA\u73AF\u7528\u6765\u6CE8\u518C\u534F\u7A0B\uFF0C\u534F\u7A0B\u9700\u8981\u52A8\u6001\u5730\u6DFB\u52A0\u5230\u4E8B\u4EF6\u5FAA\u73AF\u4E2D\uFF0C\u7136\u800C\u8FD8\u4E0D\u60F3\u4E3B\u7EBF\u7A0B\u56E0\u6B64\u800C\u963B\u585E\u5361\u6B7B(block)\uFF0C\u6B64\u65F6\u53EF\u4EE5\u5229\u7528\u591A\u7EBF\u7A0B</p><pre><code>import asyncio,time,threading

def func1(num):
    print(num,&#39;before---func1----&#39;)
    time.sleep(num)
    return &quot;recv num %s&quot;%num

def start_loop(loop):
    asyncio.set_event_loop(loop)
    loop.run_forever()

if __name__ == &quot;__main__&quot;:
    begin = time.time()

    new_loop = asyncio.new_event_loop() #\u5728\u5F53\u524D\u7EBF\u7A0B\u4E0B\u521B\u5EFA\u65F6\u95F4\u5FAA\u73AF\uFF0C\uFF08\u672A\u542F\u7528\uFF09
    t = threading.Thread(target=start_loop,args=(new_loop,))    #\u5F00\u542F\u65B0\u7684\u7EBF\u7A0B\u53BB\u542F\u52A8\u4E8B\u4EF6\u5FAA\u73AF
    t.start()

    new_loop.call_soon_threadsafe(func1,3)
    new_loop.call_soon_threadsafe(func1,2)
    new_loop.call_soon_threadsafe(func1,6)

    end = time.time()
    print(end-begin)    #\u5F53\u524D\u7EBF\u7A0B\u672A\u963B\u585E\uFF0C\u8017\u65F60.02800154685974121


\u8F93\u51FA\u7ED3\u679C\uFF1A

3 before---func1----
0.02800154685974121
2 before---func1----
6 before---func1----
</code></pre><p>\u7531\u4E8E func1() \u4E2D time.sleep \u64CD\u4F5C\u662F\u540C\u6B65\u963B\u585E\u7684\uFF0C \u56E0\u6B64\u8FD0\u884C\u5B8C\u6BD5 \u6240\u6709\u7684 func \u9700\u8981\u5927\u81F4 6 + 2 + 3 \u79D2</p><h4 id="loop-\u8C03\u7528\u56DE\u8C03\u51FD\u6570\u76F8\u5173\u65B9\u6CD5" tabindex="-1"><a class="header-anchor" href="#loop-\u8C03\u7528\u56DE\u8C03\u51FD\u6570\u76F8\u5173\u65B9\u6CD5" aria-hidden="true">#</a> loop \u8C03\u7528\u56DE\u8C03\u51FD\u6570\u76F8\u5173\u65B9\u6CD5</h4><ul><li><p>loop.call_soon(callback, *args): \u7ACB\u5373\u6267\u884C, call_soon \u6BD4 call_later \u4F18\u5148\u6267\u884C\uFF08\u975E\u7EBF\u7A0B\u5B89\u5168\u7684\u5F02\u6B65 API\uFF09</p></li><li><p>loop.call_later(time, callback, *args): \u6307\u5B9A\u65F6\u95F4\u4E4B\u540E\u518D\u8FD0\u884C\uFF0C\u6267\u884C\u7684\u987A\u5E8F\u548C\u6307\u5B9A\u7684\u65F6\u95F4\u6709\u5173\uFF08\u975E\u7EBF\u7A0B\u5B89\u5168\u7684\u5F02\u6B65 API\uFF09</p></li><li><p>loop.call_at(loop.time() + x, callback, *args): \u4E5F\u662F\u6307\u5B9A\u65F6\u95F4\u540E\u6267\u884C\uFF0C\u4F46\u8FD9\u91CC\u7684\u65F6\u95F4\u4E3A loop \u91CC\u9762\u7684\u65F6\u95F4\uFF08\u975E\u7EBF\u7A0B\u5B89\u5168\u7684\u5F02\u6B65 API\uFF09</p></li><li><p>loop.call_soon_threadsafe(callback, *args)\uFF1A \u7528\u4E8E\u8C03\u5EA6\u4E0D\u540C OS \u7EBF\u7A0B\u7684\u56DE\u8C03\u51FD\u6570</p></li></ul><p>###3.\u65B0\u7EBF\u7A0B\u534F\u7A0B\uFF1Arun_coroutine_threadsafe</p><pre><code>import asyncio,time,threading

def start_loop(loop):
    asyncio.set_event_loop(loop)
    loop.run_forever()


async def do_some_work(n):
    print(f&#39;work_waiting {n}&#39;)
    await asyncio.sleep(n)
    print(f&#39;work_done {n}&#39;)


async def more_work(n):
    print(f&#39;more_work {n} start&#39;)
    time.sleep(n)
    print(f&#39;more_work {n} end&#39;)


if __name__ == &quot;__main__&quot;:
    start = time.time()

    new_loop = asyncio.new_event_loop() # \u5728\u5F53\u524D\u7EBF\u7A0B\u4E0B\u521B\u5EFA\u65F6\u95F4\u5FAA\u73AF\uFF0C\uFF08\u672A\u542F\u7528\uFF09

    t = threading.Thread(target=start_loop, args=(new_loop,)) # \u5F00\u542F\u65B0\u7684\u7EBF\u7A0B\u53BB\u542F\u52A8\u4E8B\u4EF6\u5FAA\u73AF
    t.start()

    asyncio.run_coroutine_threadsafe(do_some_work(4), new_loop)  # \u4F20\u53C2\u5FC5\u987B\u662F\u534F\u7A0B\u5BF9\u8C61
    asyncio.run_coroutine_threadsafe(do_some_work(6), new_loop)

    end = time.time()

    print(f&#39;\u5F53\u524DIO\u6240\u6D88\u8017\u65F6\u95F4{start - end}\u79D2&#39;) #\u5F53\u524D\u7EBF\u7A0B\u672A\u963B\u585E\uFF0C\u8017\u65F6-0.0019998550415039062\u79D2

\u8F93\u51FA\u7ED3\u679C\uFF1A

work_waiting 4
\u5F53\u524DIO\u6240\u6D88\u8017\u65F6\u95F4-0.0019998550415039062\u79D2
work_waiting 6
work_done 4
work_done 6
</code></pre><p>\u3010\u63CF\u8FF0\u3011\uFF1A</p><p>\u540C\u6837\uFF0C\u4E3B\u7EBF\u7A0B\u521B\u5EFA\u4E00\u4E2A new_loop, \u7136\u540E\u5728\u53E6\u5916\u7684\u5B50\u7EBF\u7A0B\u4E2D\u5F00\u542F\u4E00\u4E2A\u65E0\u9650\u4E8B\u4EF6\u5FAA\u73AF\u3002\u4E3B\u7EBF\u7A0B\u901A\u8FC7 run_coroutine_threadsafe \u65B0\u6CE8\u518C\u534F\u7A0B\u5BF9\u8C61\u3002 \u8FD9\u6837\u5C31\u80FD\u5728\u5B50\u7EBF\u7A0B\u4E2D\u8FDB\u884C\u4E8B\u4EF6\u5FAA\u73AF\u7684\u5E76\u53D1\u64CD\u4F5C\uFF0C\u540C\u65F6\u4E3B\u7EBF\u7A0B\u53C8\u4E0D\u4F1A\u88AB block\u3002\u4E00\u5171\u6267\u884C\u7684\u65F6\u95F4\u5927\u6982\u5728 6s \u5DE6\u53F3\u3002</p><p>\u82E5\u8981\u4ECE\u4E0D\u540C\u7684 OS \u7EBF\u7A0B\u8C03\u5EA6\u4E00\u4E2A\u534F\u7A0B\u5BF9\u8C61\uFF0C\u5E94\u8BE5\u4F7F\u7528 run_coroutine_threadsafe() \u51FD\u6570\u3002\u5B83\u8FD4\u56DE\u4E00\u4E2A concurrent.futures.Future \u3002</p><pre><code>async def coro_func():
     return await asyncio.sleep(1, 42)

# Later in another OS thread:

future = asyncio.run_coroutine_threadsafe(coro_func(), loop)
# Wait for the result:
result = future.result()
</code></pre><ul><li>asyncio.run_coroutine_threadsafe(coro, loop): <ul><li>\u6B64\u65B9\u6CD5\u63D0\u4EA4\u4E00\u4E2A\u534F\u7A0B\u4EFB\u52A1\u5230\u5FAA\u73AF\u4E2D\uFF0Cloop \u4F5C\u4E3A\u53C2\u6570</li><li>\u8FD4\u56DE Future \u4F9B\u67E5\u8BE2\u7ED3\u679C</li><li>\u5F53\u4E8B\u4EF6\u5FAA\u73AF\u8FD0\u884C\u65F6, \u5FC5\u987B\u5728\u4E0D\u540C\u7EBF\u7A0B\u4E0B\u6DFB\u52A0\u534F\u7A0B\u4EFB\u52A1\u5230\u6B64\u5FAA\u73AF\u4E2D</li><li>\u5176\u5185\u90E8\u4E5F\u7528\u5230\u4E86 call_soon_threadsafe</li></ul></li></ul><p>##\u7531\u5F02\u6B65\u722C\u866B\u5F15\u53D1\u7684\u534F\u7A0B\u95EE\u9898</p><p>\u5728\u5199\u5F02\u6B65\u722C\u866B\u65F6\uFF0C\u53D1\u73B0\u5F88\u591A\u8BF7\u6C42\u83AB\u540D\u5176\u5999\u5730\u8D85\u65F6\u3002</p><p>\u3010\u73B0\u8C61\u3011\uFF1A\u89E3\u6790\u7F51\u9875\u8017\u8D39\u4E86\u592A\u591A\u65F6\u95F4\uFF0C\u4F7F\u5F97\u90E8\u5206\u8BF7\u6C42\u8D85\u8FC7\u9884\u5B9A\u65F6\u95F4\u3002</p><p>\u3010\u6839\u672C\u539F\u56E0\u3011\uFF1Aasyncio \u7684\u534F\u7A0B\u662F\u975E\u62A2\u5360\u5F0F\u7684\u3002\u534F\u7A0B\u5982\u679C\u4E0D\u4E3B\u52A8\u4EA4\u51FA\u63A7\u5236\u6743\uFF0C\u5C31\u4F1A\u4E00\u76F4\u6267\u884C\u4E0B\u53BB\u3002\u5047\u5982\u4E00\u4E2A\u534F\u7A0B\u5360\u7528\u4E86\u592A\u591A\u65F6\u95F4\uFF0C\u90A3\u4E48\u5176\u4ED6\u534F\u7A0B\u5C31\u6709\u53EF\u80FD\u8D85\u65F6\u6302\u6389\u3002</p><h3 id="\u6A21\u62DF\u5B9E\u9A8C" tabindex="-1"><a class="header-anchor" href="#\u6A21\u62DF\u5B9E\u9A8C" aria-hidden="true">#</a> \u6A21\u62DF\u5B9E\u9A8C\uFF1A</h3><pre><code>import asyncio
import time


async def long_calc():
    print(&#39;long calc start&#39;)
    time.sleep(3)
    print(&#39;long calc end&#39;)


async def waiting_task(i):
    print(f&#39;waiting task {i} start&#39;)
    try:
        await asyncio.wait_for(asyncio.sleep(1), 1.5)
    except asyncio.TimeoutError:
        print(f&#39;waiting task {i} timeout&#39;)
    else:
        print(f&#39;waiting task {i} end&#39;)


if __name__ == &#39;__main__&#39;:
    loop = asyncio.get_event_loop()
    coros = [long_calc()]
    coros.extend(waiting_task(x) for x in range(3))
    loop.run_until_complete(asyncio.wait(coros))
</code></pre><ul><li>long_calc\uFF1A\u6A21\u62DF\u9AD8\u8017\u65F6\u7684\u540C\u6B65\u5904\u7406</li><li>waiting_task\uFF1A\u6A21\u62DF\u6709\u65F6\u95F4\u9650\u5236\u7684\u5F02\u6B65\u5904\u7406\uFF0C\u65F6\u95F4\u8BBE\u4E3A 1 \u79D2\uFF0C\u65F6\u9650\u8BBE\u4E3A 1.5 \u79D2\u3002</li></ul><p>\u8FD0\u884C\u4E09\u4E2A\u5F02\u6B65\uFF0C\u4E00\u4E2A\u540C\u6B65\uFF0C\u7ED3\u679C\u662F\u8FD9\u6837\u7684\uFF1A</p><pre><code>waitting task 0 start
waitting task 2 start
long_calc start
long_calc end
waitting task 1 start
waiting task 0 timeout
waiting task 2 timeout
waiting task 1 end
</code></pre><p>\u3010\u8FD0\u884C\u73B0\u8C61\u3011\uFF1A</p><p>\u5728 long_calc \u542F\u52A8\u524D\u7684 waiting_task \u8D85\u65F6\u62A5\u9519\uFF0Clong_calc \u5B8C\u6210\u540E\u7684 waiting_task \u6B63\u5E38\u7ED3\u675F\u3002\u5F88\u660E\u663E\uFF0C\u5F00\u8FC7\u591A\u540C\u6B65\u4EFB\u52A1\u548C\u8FD9\u79CD\u60C5\u51B5\u662F\u4E00\u6837\u7684\u3002 \u8BF4\u767D\u4E86\u5C31\u662F\u5F53\u6709\u540C\u6B65\u4EFB\u52A1\u6267\u884C\u65F6\u95F4\u8FC7\u957F\u65F6\uFF0C\u4F1A\u628A\u6709\u65F6\u95F4\u9650\u5236\u7684\u5F02\u6B65\u4EFB\u52A1\u5361\u6B7B\u8BA9\u5176\u672A\u6267\u884C\u800C\u8D85\u65F6\u5F02\u5E38\u3002</p><p>\u3010\u89E3\u51B3\u529E\u6CD5\u3011\uFF1A</p><p>\u5728\u5F02\u6B65\u722C\u866B\u7684\u573A\u666F\u6765\u8BF4\uFF0C\u5C31\u662F\u8FC7\u591A\u6216\u8FC7\u957F\u7684\u89E3\u6790\u8BA9\u8BF7\u6C42\u8D85\u65F6\u3002\u5408\u7406\u7684\u67B6\u6784\u8BBE\u8BA1\u5F53\u7136\u80FD\u907F\u514D\u8FD9\u4E2A\u51B2\u7A81\uFF0C\u8FD9\u91CC\u63D0\u4F9B\u53E6\u5916\u7684\u89E3\u51B3\u529E\u6CD5\u3002</p><h3 id="\u5229\u7528\u65B0\u7EBF\u7A0B\u534F\u7A0B\u89E3\u51B3" tabindex="-1"><a class="header-anchor" href="#\u5229\u7528\u65B0\u7EBF\u7A0B\u534F\u7A0B\u89E3\u51B3" aria-hidden="true">#</a> \u5229\u7528\u65B0\u7EBF\u7A0B\u534F\u7A0B\u89E3\u51B3\uFF1A</h3><pre><code>import asyncio
import time
import threading
import datetime


def print_with_time(fmt):
    print(str(datetime.datetime.now()) + &#39;: &#39; + fmt)


async def long_calc():
    print_with_time(&#39;long calc start&#39;)
    time.sleep(8)
    print_with_time(&#39;long calc end&#39;)


async def waiting_task(i):
    print_with_time(f&#39;waiting task {i} start&#39;)
    try:
        await asyncio.wait_for(asyncio.sleep(3), 5)
    except asyncio.TimeoutError:
        print_with_time(f&#39;waiting task {i} timeout&#39;)
    else:
        print_with_time(f&#39;waiting task {i} end&#39;)


if __name__ == &#39;__main__&#39;:
    sub_loop = asyncio.new_event_loop()
    thread = threading.Thread(target=sub_loop.run_forever)
    thread.start()

    loop = asyncio.get_event_loop()
    task = loop.create_task(long_calc())
    futs = [asyncio.run_coroutine_threadsafe(waiting_task(x), loop=sub_loop) for x in range(3)]
    futs = [asyncio.wrap_future(f, loop=loop) for f in futs]

    loop.run_until_complete(asyncio.wait([task, *futs]))

    sub_loop.call_soon_threadsafe(sub_loop.stop)
    thread.join()
</code></pre>`,35);function d(f,m){const o=_("ExternalLinkIcon");return a(),i("div",null,[l,n("p",null,[n("a",p,[e("https://www.cnblogs.com/yanzi-meng/p/8533734.html"),r(o)])]),u])}const w=t(c,[["render",d],["__file","\u4E8B\u4EF6\u5FAA\u73AF.html.vue"]]);export{w as default};
