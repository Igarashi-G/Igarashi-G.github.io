import{_ as e}from"./plugin-vueexport-helper-DlAUqK2U.js";import{c as t,d as o,o as r}from"./app-B-YZTn3f.js";const i={};function s(a,n){return r(),t("div",null,n[0]||(n[0]=[o(`<p><strong>Python</strong> <strong>aio</strong> 子进程集 及 队列集</p><h2 id="_1-子进程" tabindex="-1"><a class="header-anchor" href="#_1-子进程"><span>1. 子进程</span></a></h2><h3 id="subprocess-结合异步应用" tabindex="-1"><a class="header-anchor" href="#subprocess-结合异步应用"><span>subprocess 结合异步应用</span></a></h3><p>####需求：<br> 需要 ping 内网中的所有 ip 地址，是否都可以 pnig 通。<br> 内网网段为：192.168.31.0/24</p><h4 id="完整代码" tabindex="-1"><a class="header-anchor" href="#完整代码"><span>完整代码：</span></a></h4><pre><code>#!/usr/bin/env python3
# coding: utf-8

import time
import subprocess
import asyncio
import re



async def ping_call(num):
    # 当前时间
    current_time = time.strftime(&#39;%Y-%m-%d %H:%M:%S&#39;, time.localtime())
    ip = &quot;192.168.31.%s&quot; % num
    # 超时时间为1秒，ping 1次
    cmd = &#39;ping -c 1 -w 1 -W 1 %s&#39; % ip
    print(cmd)
    # 执行命令
    proc = await asyncio.create_subprocess_exec(&#39;ping&#39;, &#39;-c&#39;, &#39;1&#39;,&#39;-w&#39;,&#39;1&#39;,&#39;-W&#39;,&#39;1&#39;, ip,
                                            stdout=asyncio.subprocess.PIPE)
    # print(&quot;proc&quot;,proc,type(proc))
    result = await proc.stdout.read()

    # 通过正则匹配是否有100%关键字
    regex = re.findall(&#39;100% packet loss&#39;, result.decode(&#39;utf-8&#39;))
    # 长度为0时，表示没有出现100% packet loss
    if len(regex) == 0:
        return current_time,ip,True
    else:
        return current_time,ip,False



async def main():  # 调用方
    tasks = []
    for i in range(1, 256):
        # 把所有任务添加到task中
        tasks.append(ping_call(i))

    # 子生成器
    done, pending = await asyncio.wait(tasks)
    # done和pending都是一个任务，所以返回结果需要逐个调用result()
    for r in done:
        # print(r.result())
        # 判断布尔值
        if r.result()[2]:
            # 颜色代码
            color_code = 32
        else:
            color_code = 31

        info = &quot;\\033[1;{};1m{}\\033[0m&quot;.format(color_code, r.result())
        print(info)



if __name__ == &#39;__main__&#39;:
    start = time.time()
    # 创建一个事件循环对象loop
    loop = asyncio.get_event_loop()
    try:
        # 完成事件循环，直到最后一个任务结束
        loop.run_until_complete(main())
    finally:
        # 结束事件循环
        loop.close()
    print(&#39;所有IO任务总耗时%.5f秒&#39; % float(time.time() - start))
</code></pre><p>可以发现，花费时间为 1.9 秒。速度特别快！如果同步执行，可能需要 500 多秒。</p><p>注意：</p><ul><li>subprocess 模块，是调用 asyncio.create_subprocess_exec，它返回一个 asyncio 生成器对象。</li><li>如果直接调用 python 自带的 subprocess 模块，是无法实现异步的。</li></ul><h2 id="_2-队列集" tabindex="-1"><a class="header-anchor" href="#_2-队列集"><span>2. 队列集</span></a></h2>`,10)]))}const l=e(i,[["render",s]]),m=JSON.parse(`{"path":"/python/%E8%AF%AD%E8%A8%80/asyncio/asyncio%E8%BF%9B%E9%98%B6.html","title":"asyncio集","lang":"zh-CN","frontmatter":{"title":"asyncio集","date":"2021-02-14T00:00:00.000Z","category":["Python","asyncio"],"tag":["Python","asyncio","subprocess"],"description":"Python aio 子进程集 及 队列集 1. 子进程 subprocess 结合异步应用 ####需求： 需要 ping 内网中的所有 ip 地址，是否都可以 pnig 通。 内网网段为：192.168.31.0/24 完整代码： 可以发现，花费时间为 1.9 秒。速度特别快！如果同步执行，可能需要 500 多秒。 注意： subprocess 模...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"asyncio集\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2021-02-14T00:00:00.000Z\\",\\"dateModified\\":\\"2023-03-03T15:05:01.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"悦·宝宝\\",\\"url\\":\\"https://github.com/Igarashi-G\\"}]}"],["meta",{"property":"og:url","content":"https://igarashi-g.github.io/python/%E8%AF%AD%E8%A8%80/asyncio/asyncio%E8%BF%9B%E9%98%B6.html"}],["meta",{"property":"og:site_name","content":"悦 ▪ 宝宝"}],["meta",{"property":"og:title","content":"asyncio集"}],["meta",{"property":"og:description","content":"Python aio 子进程集 及 队列集 1. 子进程 subprocess 结合异步应用 ####需求： 需要 ping 内网中的所有 ip 地址，是否都可以 pnig 通。 内网网段为：192.168.31.0/24 完整代码： 可以发现，花费时间为 1.9 秒。速度特别快！如果同步执行，可能需要 500 多秒。 注意： subprocess 模..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-03-03T15:05:01.000Z"}],["meta",{"property":"article:tag","content":"subprocess"}],["meta",{"property":"article:tag","content":"asyncio"}],["meta",{"property":"article:tag","content":"Python"}],["meta",{"property":"article:published_time","content":"2021-02-14T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-03-03T15:05:01.000Z"}]]},"git":{"createdTime":1665194286000,"updatedTime":1677855901000,"contributors":[{"name":"Igarashi","username":"Igarashi","email":"2545369032@qq.com","commits":2,"url":"https://github.com/Igarashi"}]},"readingTime":{"minutes":1.4,"words":420},"filePathRelative":"python/语言/asyncio/asyncio进阶.md","excerpt":"<p><strong>Python</strong> <strong>aio</strong> 子进程集 及 队列集</p>\\n<!--more-->\\n<h2>1. 子进程</h2>\\n<h3>subprocess 结合异步应用</h3>\\n<p>####需求：<br>\\n需要 ping 内网中的所有 ip 地址，是否都可以 pnig 通。<br>\\n内网网段为：192.168.31.0/24</p>\\n<h4>完整代码：</h4>\\n<pre><code>#!/usr/bin/env python3\\n# coding: utf-8\\n\\nimport time\\nimport subprocess\\nimport asyncio\\nimport re\\n\\n\\n\\nasync def ping_call(num):\\n    # 当前时间\\n    current_time = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime())\\n    ip = \\"192.168.31.%s\\" % num\\n    # 超时时间为1秒，ping 1次\\n    cmd = 'ping -c 1 -w 1 -W 1 %s' % ip\\n    print(cmd)\\n    # 执行命令\\n    proc = await asyncio.create_subprocess_exec('ping', '-c', '1','-w','1','-W','1', ip,\\n                                            stdout=asyncio.subprocess.PIPE)\\n    # print(\\"proc\\",proc,type(proc))\\n    result = await proc.stdout.read()\\n\\n    # 通过正则匹配是否有100%关键字\\n    regex = re.findall('100% packet loss', result.decode('utf-8'))\\n    # 长度为0时，表示没有出现100% packet loss\\n    if len(regex) == 0:\\n        return current_time,ip,True\\n    else:\\n        return current_time,ip,False\\n\\n\\n\\nasync def main():  # 调用方\\n    tasks = []\\n    for i in range(1, 256):\\n        # 把所有任务添加到task中\\n        tasks.append(ping_call(i))\\n\\n    # 子生成器\\n    done, pending = await asyncio.wait(tasks)\\n    # done和pending都是一个任务，所以返回结果需要逐个调用result()\\n    for r in done:\\n        # print(r.result())\\n        # 判断布尔值\\n        if r.result()[2]:\\n            # 颜色代码\\n            color_code = 32\\n        else:\\n            color_code = 31\\n\\n        info = \\"\\\\033[1;{};1m{}\\\\033[0m\\".format(color_code, r.result())\\n        print(info)\\n\\n\\n\\nif __name__ == '__main__':\\n    start = time.time()\\n    # 创建一个事件循环对象loop\\n    loop = asyncio.get_event_loop()\\n    try:\\n        # 完成事件循环，直到最后一个任务结束\\n        loop.run_until_complete(main())\\n    finally:\\n        # 结束事件循环\\n        loop.close()\\n    print('所有IO任务总耗时%.5f秒' % float(time.time() - start))\\n</code></pre>","autoDesc":true}`);export{l as comp,m as data};
