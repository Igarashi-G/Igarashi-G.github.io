<template><div><h1 id="asyncio-——-异步-i-o-进阶" tabindex="-1"><a class="header-anchor" href="#asyncio-——-异步-i-o-进阶" aria-hidden="true">#</a> asyncio —— 异步 I/O 进阶</h1>
<h2 id="一、队列集" tabindex="-1"><a class="header-anchor" href="#一、队列集" aria-hidden="true">#</a> 一、队列集</h2>
<h2 id="二、子进程" tabindex="-1"><a class="header-anchor" href="#二、子进程" aria-hidden="true">#</a> 二、子进程</h2>
<h3 id="subprocess-结合异步应用" tabindex="-1"><a class="header-anchor" href="#subprocess-结合异步应用" aria-hidden="true">#</a> subprocess 结合异步应用</h3>
<p>####需求：
需要 ping 内网中的所有 ip 地址，是否都可以 pnig 通。
内网网段为：192.168.31.0/24</p>
<h4 id="完整代码" tabindex="-1"><a class="header-anchor" href="#完整代码" aria-hidden="true">#</a> 完整代码：</h4>
<pre><code>#!/usr/bin/env python3
# coding: utf-8

import time
import subprocess
import asyncio
import re



async def ping_call(num):
    # 当前时间
    current_time = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime())
    ip = &quot;192.168.31.%s&quot; % num
    # 超时时间为1秒，ping 1次
    cmd = 'ping -c 1 -w 1 -W 1 %s' % ip
    print(cmd)
    # 执行命令
    proc = await asyncio.create_subprocess_exec('ping', '-c', '1','-w','1','-W','1', ip,
                                            stdout=asyncio.subprocess.PIPE)
    # print(&quot;proc&quot;,proc,type(proc))
    result = await proc.stdout.read()

    # 通过正则匹配是否有100%关键字
    regex = re.findall('100% packet loss', result.decode('utf-8'))
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

        info = &quot;\033[1;{};1m{}\033[0m&quot;.format(color_code, r.result())
        print(info)



if __name__ == '__main__':
    start = time.time()
    # 创建一个事件循环对象loop
    loop = asyncio.get_event_loop()
    try:
        # 完成事件循环，直到最后一个任务结束
        loop.run_until_complete(main())
    finally:
        # 结束事件循环
        loop.close()
    print('所有IO任务总耗时%.5f秒' % float(time.time() - start))
</code></pre>
<p>可以发现，花费时间为 1.9 秒。速度特别快！如果同步执行，可能需要 500 多秒。</p>
<p>注意：</p>
<ul>
<li>subprocess 模块，是调用 asyncio.create_subprocess_exec，它返回一个 asyncio 生成器对象。</li>
<li>如果直接调用 python 自带的 subprocess 模块，是无法实现异步的。</li>
</ul>
</div></template>


