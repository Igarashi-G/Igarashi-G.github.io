import{_ as e}from"./plugin-vueexport-helper-DlAUqK2U.js";import{c as t,d as o,o as a}from"./app-C_J498dg.js";const r={};function i(s,n){return a(),t("div",null,n[0]||(n[0]=[o(`<h1 id="asyncio-————-不同线程的事件循环" tabindex="-1"><a class="header-anchor" href="#asyncio-————-不同线程的事件循环"><span>asyncio ———— 不同线程的事件循环</span></a></h1><p><a href="https://www.cnblogs.com/yanzi-meng/p/8533734.html" target="_blank" rel="noopener noreferrer">https://www.cnblogs.com/yanzi-meng/p/8533734.html</a></p><h2 id="不同线程的事件循环" tabindex="-1"><a class="header-anchor" href="#不同线程的事件循环"><span>不同线程的事件循环</span></a></h2><h3 id="_1-同一线程" tabindex="-1"><a class="header-anchor" href="#_1-同一线程"><span>1.同一线程：</span></a></h3><pre><code>import asyncio,time

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
</code></pre><p>【发现问题】：</p><p>上述代码在一个线程中执行的事件循环，除非只有我们<strong>主动关闭</strong>事件 close，事件循环才会结束。否则输出完 534 结果一致会进行阻塞，等待其他协程<br> 任务到达，那么此时不想让线程阻塞，而去完成别的工作呢？</p><p>【解决办法】：</p><p>在当前线程中创建一个事件循环（<strong>不启用</strong>，单纯获取<strong>标识</strong>），开启一个新的线程，在<strong>新的线程中启动</strong>事件循环。在当前线程依据事件循环标识，<br> 可以向事件中添加协程对象。当前线程不会由于事件循环而阻塞了。</p><p>###2.不同线程事件循环（不涉及协程）：<br> 【场景】：</p><p>事件循环用来注册协程，协程需要动态地添加到事件循环中，然而还不想主线程因此而阻塞卡死(block)，此时可以利用多线程</p><pre><code>import asyncio,time,threading

def func1(num):
    print(num,&#39;before---func1----&#39;)
    time.sleep(num)
    return &quot;recv num %s&quot;%num

def start_loop(loop):
    asyncio.set_event_loop(loop)
    loop.run_forever()

if __name__ == &quot;__main__&quot;:
    begin = time.time()

    new_loop = asyncio.new_event_loop() #在当前线程下创建时间循环，（未启用）
    t = threading.Thread(target=start_loop,args=(new_loop,))    #开启新的线程去启动事件循环
    t.start()

    new_loop.call_soon_threadsafe(func1,3)
    new_loop.call_soon_threadsafe(func1,2)
    new_loop.call_soon_threadsafe(func1,6)

    end = time.time()
    print(end-begin)    #当前线程未阻塞，耗时0.02800154685974121


输出结果：

3 before---func1----
0.02800154685974121
2 before---func1----
6 before---func1----
</code></pre><p>由于 func1() 中 time.sleep 操作是同步阻塞的， 因此运行完毕 所有的 func 需要大致 6 + 2 + 3 秒</p><h4 id="loop-调用回调函数相关方法" tabindex="-1"><a class="header-anchor" href="#loop-调用回调函数相关方法"><span>loop 调用回调函数相关方法</span></a></h4><ul><li><p>loop.call_soon(callback, *args): 立即执行, call_soon 比 call_later 优先执行（非线程安全的异步 API）</p></li><li><p>loop.call_later(time, callback, *args): 指定时间之后再运行，执行的顺序和指定的时间有关（非线程安全的异步 API）</p></li><li><p>loop.call_at(loop.time() + x, callback, *args): 也是指定时间后执行，但这里的时间为 loop 里面的时间（非线程安全的异步 API）</p></li><li><p>loop.call_soon_threadsafe(callback, *args)： 用于调度不同 OS 线程的回调函数</p></li></ul><p>###3.新线程协程：run_coroutine_threadsafe</p><pre><code>import asyncio,time,threading

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

    new_loop = asyncio.new_event_loop() # 在当前线程下创建时间循环，（未启用）

    t = threading.Thread(target=start_loop, args=(new_loop,)) # 开启新的线程去启动事件循环
    t.start()

    asyncio.run_coroutine_threadsafe(do_some_work(4), new_loop)  # 传参必须是协程对象
    asyncio.run_coroutine_threadsafe(do_some_work(6), new_loop)

    end = time.time()

    print(f&#39;当前IO所消耗时间{start - end}秒&#39;) #当前线程未阻塞，耗时-0.0019998550415039062秒

输出结果：

work_waiting 4
当前IO所消耗时间-0.0019998550415039062秒
work_waiting 6
work_done 4
work_done 6
</code></pre><p>【描述】：</p><p>同样，主线程创建一个 new_loop, 然后在另外的子线程中开启一个无限事件循环。主线程通过 run_coroutine_threadsafe 新注册协程对象。<br> 这样就能在子线程中进行事件循环的并发操作，同时主线程又不会被 block。一共执行的时间大概在 6s 左右。</p><p>若要从不同的 OS 线程调度一个协程对象，应该使用 run_coroutine_threadsafe() 函数。它返回一个 concurrent.futures.Future 。</p><pre><code>async def coro_func():
     return await asyncio.sleep(1, 42)

# Later in another OS thread:

future = asyncio.run_coroutine_threadsafe(coro_func(), loop)
# Wait for the result:
result = future.result()
</code></pre><ul><li>asyncio.run_coroutine_threadsafe(coro, loop): <ul><li>此方法提交一个协程任务到循环中，loop 作为参数</li><li>返回 Future 供查询结果</li><li>当事件循环运行时, 必须在不同线程下添加协程任务到此循环中</li><li>其内部也用到了 call_soon_threadsafe</li></ul></li></ul><p>##由异步爬虫引发的协程问题</p><p>在写异步爬虫时，发现很多请求莫名其妙地超时。</p><p>【现象】：解析网页耗费了太多时间，使得部分请求超过预定时间。</p><p>【根本原因】：asyncio 的协程是非抢占式的。协程如果不主动交出控制权，就会一直执行下去。假如一个协程占用了太多时间，那么其他协程就有可能超时挂掉。</p><h3 id="模拟实验" tabindex="-1"><a class="header-anchor" href="#模拟实验"><span>模拟实验：</span></a></h3><pre><code>import asyncio
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
</code></pre><ul><li>long_calc：模拟高耗时的同步处理</li><li>waiting_task：模拟有时间限制的异步处理，时间设为 1 秒，时限设为 1.5 秒。</li></ul><p>运行三个异步，一个同步，结果是这样的：</p><pre><code>waitting task 0 start
waitting task 2 start
long_calc start
long_calc end
waitting task 1 start
waiting task 0 timeout
waiting task 2 timeout
waiting task 1 end
</code></pre><p>【运行现象】：</p><p>在 long_calc 启动前的 waiting_task 超时报错，long_calc 完成后的 waiting_task 正常结束。很明显，开过多同步任务和这种情况是一样的。<br> 说白了就是当有同步任务执行时间过长时，会把有时间限制的异步任务卡死让其未执行而超时异常。</p><p>【解决办法】：</p><p>在异步爬虫的场景来说，就是过多或过长的解析让请求超时。合理的架构设计当然能避免这个冲突，这里提供另外的解决办法。</p><h3 id="利用新线程协程解决" tabindex="-1"><a class="header-anchor" href="#利用新线程协程解决"><span>利用新线程协程解决：</span></a></h3><pre><code>import asyncio
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
</code></pre>`,37)]))}const l=e(r,[["render",i]]),_=JSON.parse(`{"path":"/python/%E8%AF%AD%E8%A8%80/asyncio/%E4%BA%8B%E4%BB%B6%E5%BE%AA%E7%8E%AF.html","title":"事件循环","lang":"zh-CN","frontmatter":{"title":"事件循环","order":4,"description":"asyncio ———— 不同线程的事件循环 https://www.cnblogs.com/yanzi-meng/p/8533734.html 不同线程的事件循环 1.同一线程： 【发现问题】： 上述代码在一个线程中执行的事件循环，除非只有我们主动关闭事件 close，事件循环才会结束。否则输出完 534 结果一致会进行阻塞，等待其他协程 任务到达，...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"事件循环\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-10-08T01:58:06.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"悦·宝宝\\",\\"url\\":\\"https://github.com/Igarashi-G\\"}]}"],["meta",{"property":"og:url","content":"https://igarashi-g.github.io/python/%E8%AF%AD%E8%A8%80/asyncio/%E4%BA%8B%E4%BB%B6%E5%BE%AA%E7%8E%AF.html"}],["meta",{"property":"og:site_name","content":"悦 ▪ 宝宝"}],["meta",{"property":"og:title","content":"事件循环"}],["meta",{"property":"og:description","content":"asyncio ———— 不同线程的事件循环 https://www.cnblogs.com/yanzi-meng/p/8533734.html 不同线程的事件循环 1.同一线程： 【发现问题】： 上述代码在一个线程中执行的事件循环，除非只有我们主动关闭事件 close，事件循环才会结束。否则输出完 534 结果一致会进行阻塞，等待其他协程 任务到达，..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-10-08T01:58:06.000Z"}],["meta",{"property":"article:modified_time","content":"2022-10-08T01:58:06.000Z"}]]},"git":{"createdTime":1665194286000,"updatedTime":1665194286000,"contributors":[{"name":"Igarashi","username":"Igarashi","email":"2545369032@qq.com","commits":1,"url":"https://github.com/Igarashi"}]},"readingTime":{"minutes":4.88,"words":1465},"filePathRelative":"python/语言/asyncio/事件循环.md","excerpt":"\\n<p><a href=\\"https://www.cnblogs.com/yanzi-meng/p/8533734.html\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">https://www.cnblogs.com/yanzi-meng/p/8533734.html</a></p>\\n<h2>不同线程的事件循环</h2>\\n<h3>1.同一线程：</h3>\\n<pre><code>import asyncio,time\\n\\nasync def func1(num):\\n    print(num,'before---func1----')\\n    await asyncio.sleep(num)\\n    return \\"recv num %s\\"%num\\n\\nif __name__ == \\"__main__\\":\\n    begin = time.time()\\n\\n    coroutine1 = func1(5)\\n    coroutine2 = func1(3)\\n    coroutine3 = func1(4)\\n\\n    tasks = [\\n        asyncio.ensure_future(coroutine1),\\n        asyncio.ensure_future(coroutine2),\\n        asyncio.ensure_future(coroutine3),\\n    ]\\n\\n\\n    loop = asyncio.get_event_loop()\\n    loop.run_until_complete(asyncio.wait(tasks))\\n    loop.run_forever()\\n    end = time.time()\\n    print(end-begin)\\n</code></pre>","autoDesc":true}`);export{l as comp,_ as data};
