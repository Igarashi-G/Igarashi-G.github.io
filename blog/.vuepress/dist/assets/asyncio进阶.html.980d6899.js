import{_ as n}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as e,c as r,f as o}from"./app.30cb87a4.js";const i={},t=o(`<h1 id="asyncio-\u2014\u2014-\u5F02\u6B65-i-o-\u8FDB\u9636" tabindex="-1"><a class="header-anchor" href="#asyncio-\u2014\u2014-\u5F02\u6B65-i-o-\u8FDB\u9636" aria-hidden="true">#</a> asyncio \u2014\u2014 \u5F02\u6B65 I/O \u8FDB\u9636</h1><h2 id="\u4E00\u3001\u961F\u5217\u96C6" tabindex="-1"><a class="header-anchor" href="#\u4E00\u3001\u961F\u5217\u96C6" aria-hidden="true">#</a> \u4E00\u3001\u961F\u5217\u96C6</h2><h2 id="\u4E8C\u3001\u5B50\u8FDB\u7A0B" tabindex="-1"><a class="header-anchor" href="#\u4E8C\u3001\u5B50\u8FDB\u7A0B" aria-hidden="true">#</a> \u4E8C\u3001\u5B50\u8FDB\u7A0B</h2><h3 id="subprocess-\u7ED3\u5408\u5F02\u6B65\u5E94\u7528" tabindex="-1"><a class="header-anchor" href="#subprocess-\u7ED3\u5408\u5F02\u6B65\u5E94\u7528" aria-hidden="true">#</a> subprocess \u7ED3\u5408\u5F02\u6B65\u5E94\u7528</h3><p>####\u9700\u6C42\uFF1A \u9700\u8981 ping \u5185\u7F51\u4E2D\u7684\u6240\u6709 ip \u5730\u5740\uFF0C\u662F\u5426\u90FD\u53EF\u4EE5 pnig \u901A\u3002 \u5185\u7F51\u7F51\u6BB5\u4E3A\uFF1A192.168.31.0/24</p><h4 id="\u5B8C\u6574\u4EE3\u7801" tabindex="-1"><a class="header-anchor" href="#\u5B8C\u6574\u4EE3\u7801" aria-hidden="true">#</a> \u5B8C\u6574\u4EE3\u7801\uFF1A</h4><pre><code>#!/usr/bin/env python3
# coding: utf-8

import time
import subprocess
import asyncio
import re
</code></pre><p>\u200B</p><pre><code>async def ping_call(num):
    # \u5F53\u524D\u65F6\u95F4
    current_time = time.strftime(&#39;%Y-%m-%d %H:%M:%S&#39;, time.localtime())
    ip = &quot;192.168.31.%s&quot; % num
    # \u8D85\u65F6\u65F6\u95F4\u4E3A1\u79D2\uFF0Cping 1\u6B21
    cmd = &#39;ping -c 1 -w 1 -W 1 %s&#39; % ip
    print(cmd)
    # \u6267\u884C\u547D\u4EE4
    proc = await asyncio.create_subprocess_exec(&#39;ping&#39;, &#39;-c&#39;, &#39;1&#39;,&#39;-w&#39;,&#39;1&#39;,&#39;-W&#39;,&#39;1&#39;, ip,
                                            stdout=asyncio.subprocess.PIPE)
    # print(&quot;proc&quot;,proc,type(proc))
    result = await proc.stdout.read()

    # \u901A\u8FC7\u6B63\u5219\u5339\u914D\u662F\u5426\u6709100%\u5173\u952E\u5B57
    regex = re.findall(&#39;100% packet loss&#39;, result.decode(&#39;utf-8&#39;))
    # \u957F\u5EA6\u4E3A0\u65F6\uFF0C\u8868\u793A\u6CA1\u6709\u51FA\u73B0100% packet loss
    if len(regex) == 0:
        return current_time,ip,True
    else:
        return current_time,ip,False
</code></pre><p>\u200B</p><pre><code>async def main():  # \u8C03\u7528\u65B9
    tasks = []
    for i in range(1, 256):
        # \u628A\u6240\u6709\u4EFB\u52A1\u6DFB\u52A0\u5230task\u4E2D
        tasks.append(ping_call(i))

    # \u5B50\u751F\u6210\u5668
    done, pending = await asyncio.wait(tasks)
    # done\u548Cpending\u90FD\u662F\u4E00\u4E2A\u4EFB\u52A1\uFF0C\u6240\u4EE5\u8FD4\u56DE\u7ED3\u679C\u9700\u8981\u9010\u4E2A\u8C03\u7528result()
    for r in done:
        # print(r.result())
        # \u5224\u65AD\u5E03\u5C14\u503C
        if r.result()[2]:
            # \u989C\u8272\u4EE3\u7801
            color_code = 32
        else:
            color_code = 31

        info = &quot;\\033[1;{};1m{}\\033[0m&quot;.format(color_code, r.result())
        print(info)
</code></pre><p>\u200B</p><pre><code>if __name__ == &#39;__main__&#39;:
    start = time.time()
    # \u521B\u5EFA\u4E00\u4E2A\u4E8B\u4EF6\u5FAA\u73AF\u5BF9\u8C61loop
    loop = asyncio.get_event_loop()
    try:
        # \u5B8C\u6210\u4E8B\u4EF6\u5FAA\u73AF\uFF0C\u76F4\u5230\u6700\u540E\u4E00\u4E2A\u4EFB\u52A1\u7ED3\u675F
        loop.run_until_complete(main())
    finally:
        # \u7ED3\u675F\u4E8B\u4EF6\u5FAA\u73AF
        loop.close()
    print(&#39;\u6240\u6709IO\u4EFB\u52A1\u603B\u8017\u65F6%.5f\u79D2&#39; % float(time.time() - start))
</code></pre><p>\u200B<br> \u53EF\u4EE5\u53D1\u73B0\uFF0C\u82B1\u8D39\u65F6\u95F4\u4E3A 1.9 \u79D2\u3002\u901F\u5EA6\u7279\u522B\u5FEB\uFF01\u5982\u679C\u540C\u6B65\u6267\u884C\uFF0C\u53EF\u80FD\u9700\u8981 500 \u591A\u79D2\u3002</p><p>\u6CE8\u610F\uFF1A</p><ul><li>subprocess \u6A21\u5757\uFF0C\u662F\u8C03\u7528 asyncio.create_subprocess_exec\uFF0C\u5B83\u8FD4\u56DE\u4E00\u4E2A asyncio \u751F\u6210\u5668\u5BF9\u8C61\u3002</li><li>\u5982\u679C\u76F4\u63A5\u8C03\u7528 python \u81EA\u5E26\u7684 subprocess \u6A21\u5757\uFF0C\u662F\u65E0\u6CD5\u5B9E\u73B0\u5F02\u6B65\u7684\u3002</li></ul>`,16),a=[t];function s(c,p){return e(),r("div",null,a)}const u=n(i,[["render",s],["__file","asyncio\u8FDB\u9636.html.vue"]]);export{u as default};
