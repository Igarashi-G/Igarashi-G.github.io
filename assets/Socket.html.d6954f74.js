import{_ as t}from"./plugin-vueexport-helper.2444895f.js";import{o,c as r,e as a,a as s,b as n,d as c,w as l,f as p,r as i}from"./app.a2a4f0ed.js";const g="/assets/socket\u6587\u4EF6\u63CF\u8FF0\u7B26.0f1ee989.jpg",d={},k=s("p",null,[s("strong",null,"Python socket"),n(" \u7F16\u7A0B")],-1),u=s("strong",null,"7",-1),v=s("strong",null,"\u4F20\u8F93\u5C42",-1),m=p('<h2 id="_1-socket-\u5957\u63A5\u5B57" tabindex="-1"><a class="header-anchor" href="#_1-socket-\u5957\u63A5\u5B57" aria-hidden="true">#</a> 1. Socket \u5957\u63A5\u5B57</h2><h3 id="_1-1-\u8FDB\u7A0B\u901A\u4FE1" tabindex="-1"><a class="header-anchor" href="#_1-1-\u8FDB\u7A0B\u901A\u4FE1" aria-hidden="true">#</a> 1.1 \u8FDB\u7A0B\u901A\u4FE1</h3><p>\u901A\u5E38\uFF0C<strong>\u672C\u5730\u8FDB\u7A0B</strong> \u95F4\u901A\u4FE1 <strong>IPC</strong> \u6709\u5F88\u591A\u79CD\u65B9\u5F0F\uFF0C\u5982\uFF1A</p><ul><li><strong>\u6D88\u606F\u4F20\u9012\uFF1A</strong> <strong>PIPE</strong> \u7BA1\u9053\u3001<strong>FIFO</strong>\u3001\u6D88\u606F\u961F\u5217</li><li><strong>\u540C\u6B65\uFF1A</strong> \u4E92\u65A5\u91CF\u3001\u6761\u4EF6\u53D8\u91CF\u3001\u8BFB\u5199\u9501\u3001\u6587\u4EF6\u548C\u5199\u8BB0\u5F55\u9501\u3001\u4FE1\u53F7\u91CF</li><li><strong>\u5171\u4EAB\u5185\u5B58\uFF1A</strong> \u533F\u540D\u3001\u5177\u540D</li><li><strong>\u8FDC\u7A0B\u8FC7\u7A0B\u8C03\u7528\uFF1A</strong> \u5404\u79CD <strong>RPC</strong></li></ul><p>\u50CF <strong>\u672C\u5730</strong>\uFF0C\u53EF\u4EE5\u901A\u8FC7\u8FDB\u7A0B\u7684 <strong>PID</strong> \u6765\u552F\u4E00\u6807\u8BC6\u4E00\u4E2A\u8FDB\u7A0B\uFF0C\u4F46\u7F51\u7EDC\u4E2D\u5374\u662F\u884C\u4E0D\u901A\u7684\uFF0C\u90A3\u4E48 <strong>\u7F51\u7EDC\u4E2D\u7684\u8FDB\u7A0B\u4E4B\u95F4</strong> \u662F\u5982\u4F55\u901A\u4FE1\u7684\u5462\uFF1F</p><p><strong>\u7B54\uFF1A</strong> \u662F\u5229\u7528 <strong>IP \u5730\u5740 + \u534F\u8BAE + \u7AEF\u53E3\u53F7</strong> \u7684\u65B9\u5F0F\uFF0C\u4F5C\u4E3A <strong>\u552F\u4E00\u6807\u8BC6</strong> \uFF0C\u5B83\u6807\u8BC6\u4E86\u7F51\u7EDC\u4E2D\u4E3B\u673A\u7684\u4E00\u4E2A\u5E94\u7528\u7A0B\u5E8F\uFF08<em>\u8FDB\u7A0B</em> \uFF09\uFF0C\u6709\u4E86\u8FD9\u4E2A\u552F\u4E00\u6807\u8BC6\u5C31\u80FD\u5145\u5F53\u7F51\u7EDC\u8FDB\u7A0B\uFF0C\u8FDB\u884C\u7F51\u7EDC\u8FDB\u7A0B\u89C1 \u7684\u901A\u4FE1\u4E86</p><p>\u800C\u5B83\u5DF2\u7ECF\u5B9E\u73B0\u597D\u4E86\uFF0C\u5C31\u662F\u57FA\u4E8E <strong>TCP/IP \u534F\u8BAE\u7C07</strong> \u7F51\u7EDC\u5E94\u7528\u91C7\u7528\u7684\u7F16\u7A0B\u63A5\u53E3 <strong>socket</strong> \uFF08<em><strong>\u5957\u63A5\u5B57</strong></em> \uFF09</p><h3 id="_1-2-socket-\u6982\u8FF0" tabindex="-1"><a class="header-anchor" href="#_1-2-socket-\u6982\u8FF0" aria-hidden="true">#</a> 1.2 Socket \u6982\u8FF0</h3><p><strong>socket</strong>\u662F\u5728 <strong>\u5E94\u7528\u5C42</strong> \u548C <strong>\u4F20\u8F93\u5C42</strong>\uFF08<em><strong>TCP/IP</strong></em>\uFF09\u95F4\u7684 <strong>\u4E00\u7EC4\u62BD\u8C61\u5C42\u63A5\u53E3</strong>\uFF0C\u5B83\u628A <strong>TCP/IP \u5C42</strong> \u590D\u6742\u7684\u64CD\u4F5C\uFF0C<strong>\u62BD\u8C61\u4E3A\u51E0\u4E2A\u7B80\u5355\u63A5\u53E3\u4F9B\u5E94\u7528\u5C42\u8C03\u7528</strong> \uFF08<em>\u5C01\u88C5\u4E86\u5927\u91CF\u529F\u80FD\u7684\u5BF9\u8C61</em> \uFF09\uFF0C\u65B9\u4FBF\u5E94\u7528\u8FDB\u7A0B\u5B9E\u73B0\u7F51\u7EDC\u4E2D\u7684\u901A\u4FE1</p><p><strong>Unix/Linux</strong> \u54F2\u5B66\u662F <strong>\u4E00\u5207\u7686\u6587\u4EF6</strong>\uFF0C\u90A3\u4E48\u65E2\u7136\u662F\u6587\u4EF6\uFF0C\u5C31\u53EF\u4EE5\u50CF\u6587\u4EF6\u7684\u65B9\u5F0F\u53BB <code>open(); read(); write(); close();</code> \u8FD9\u6837\u8FDB\u884C\u8BFB\u5199 <strong>socket</strong> \u63A5\u53E3\u5219\u662F\u57FA\u4E8E\u5982\u4E0A\u7684\u5B9E\u73B0</p><p>\u5176\u5728 <strong>Linux</strong> \u4E2D\u5BF9\u5E94\u7684\u6587\u4EF6\u7CFB\u7EDF\u53EB <strong>Sockfs</strong>\uFF0C\u6BCF\u521B\u5EFA\u4E00\u4E2A <strong>socket</strong> \u5C31\u4F1A\u5728 <strong>sockfs</strong> \u4E2D\u521B\u5EFA\u4E00\u4E2A\u7279\u6B8A\u7684\u6587\u4EF6\uFF0C\u540C\u65F6\u521B\u5EFA\u4E86 <strong>sockfs</strong> \u6587\u4EF6\u7CFB\u7EDF\u7684 <strong>inode</strong> \uFF0C\u8BE5 <strong>inode</strong> \u552F\u4E00\u6807\u8BC6\u4E86\u5F53\u524D <strong>socket</strong> \u7684\u901A\u4FE1,\u5982\u56FE</p><img src="'+g+`"><p>\u8FD9\u5C31\u8868\u793A\u662F\u4E00\u4E2A <strong>socket</strong> \u7C7B\u578B\u7684 <strong>fd</strong>\uFF0C<code>5 -&gt; socket:[122...47]</code> \u91CC\u9762\u7684\u6570\u5B57\u5373\u662F <strong>inode</strong> \u53F7\uFF0C\u552F\u4E00\u6807\u8BC6\u4E86\u5F53\u524D\u7684 <strong>socket</strong> \u901A\u4FE1\u8FDE\u63A5\uFF0C\u8FDB\u4E00\u6B65 <code>grep inode</code> \u5373\u53EF\u770B\u5230\u8BE5 <strong>TCP</strong> \u8FDE\u63A5\u7684\u6240\u6709\u4FE1\u606F\uFF08<em>16\u8FDB\u5236\u663E\u793A</em> \uFF09</p><p>\u5148\u7B80\u5355\u770B\u4E00\u4E0B <strong>C</strong> \u7684\u63A5\u53E3</p><div class="language-c ext-c line-numbers-mode"><pre class="language-c"><code><span class="token function">socket</span><span class="token punctuation">(</span><span class="token keyword">int</span> domain<span class="token punctuation">,</span> <span class="token keyword">int</span> type<span class="token punctuation">,</span> <span class="token keyword">int</span> protocol<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u5728\u7528\u6237\u8FDB\u7A0B\u4E2D\uFF0C \u8BE5\u51FD\u6570\u7528\u4E8E\u521B\u5EFA <strong>socket</strong> \u5E76\u8FD4\u56DE\u4E0E\u5176\u5173\u8054\u7684 <strong>fd\uFF08<em>\u6587\u4EF6\u63CF\u8FF0\u7B26</em> \uFF09</strong>\uFF0C\u6BEB\u65E0\u7591\u95EE\uFF0C\u6B64\u51FD\u6570\u5B9E\u9645\u6267\u884C\u7684\u662F<strong>\u7CFB\u7EDF\u8C03\u7528</strong>\uFF0C \u5373 <strong>sys_socketcall</strong></p><div class="language-c ext-c line-numbers-mode"><pre class="language-c"><code><span class="token comment">/** sys_socketcall (linux/syscalls.h)*/</span>
asmlinkage <span class="token keyword">long</span> <span class="token function">sys_socketcall</span><span class="token punctuation">(</span><span class="token keyword">int</span> call<span class="token punctuation">,</span> <span class="token keyword">unsigned</span> <span class="token keyword">long</span> __user <span class="token operator">*</span>args<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">/** SYSCALL_DEFINE2 (net/socket.c)*/</span>
<span class="token function">SYSCALL_DEFINE2</span><span class="token punctuation">(</span>socketcall<span class="token punctuation">,</span> <span class="token keyword">int</span><span class="token punctuation">,</span> call<span class="token punctuation">,</span> <span class="token keyword">unsigned</span> <span class="token keyword">long</span> __user <span class="token operator">*</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>sys_socketcall</strong> \u51E0\u4E4E\u662F\u7528\u6237\u8FDB\u7A0B <strong>socket</strong> \u6240\u6709\u64CD\u4F5C\u51FD\u6570\u7684\u5165\u53E3\uFF0C\u5B83\u53C8\u5B9E\u9645\u8C03\u7528\u4E86 <strong>SYSCALL_DEFINE2</strong> ...</p><p>\u56E0\u6B64\u7528\u6237\u6001\u7A0B\u5E8F\u4E00\u65E6\u8C03\u7528\u4E86 <strong>socket</strong> \u63A5\u53E3\uFF0C\u5C31\u4F1A\u901A\u8FC7\u7CFB\u7EDF\u8C03\u7528\u9677\u5165\u5185\u6838</p><p>\u200B<br> \u200B<br> Server\u7AEF\uFF1A\u670D\u52A1\u5668\u7AEF\uFF0C\u5728\u670D\u52A1\u5668\u4E0A\u8FD0\u884C\uFF0C\u5148\u5EFA\u7ACB\uFF0C\u5426\u5219\u5BA2\u6237\u7AEF\u6CA1\u6CD5\u8FDE 1-&gt;2-&gt;3-&gt;4 -&gt;6-&gt;7</p><pre><code>    Client\u7AEF\uFF1A\u5BA2\u6237\u7AEF\uFF0C\u5728\u5BA2\u6237\u4E3B\u673A\u4E0A\u8FD0\u884C
            1-&gt;5  -&gt;6-&gt;7

    Socket\u5BF9\u8C61:   ----1
        socket.socket()#\u5EFA\u7ACB\u4E00\u4E2ASocket\u5BF9\u8C61\uFF0C\u5176\u4E2D\u6709\u4E24\u4E2A\u53C2\u6570 family type
            family\uFF1A\u53EB\u7F51\u7EDC\u901A\u4FE1\u5730\u5740\u7B26\uFF0C\u9ED8\u8BA4\u4E3AAF_INET \u8FDB\u884C\u7F51\u7EDC\u901A\u4FE1\uFF08\u8FD8\u6709\u4E00\u4E2AAF_INET6\u7528\u4E8EIpv6\u4E0B\u7684\u7F51\u7EDC\u53C2\u6570\uFF09\u9ED8\u8BA4Ipv4 \uFF0C\u8FD9\u662F\u670D\u52A1\u5668\u4E4B\u95F4\u7684\u901A\u4FE1\u3002
                \u8FD8\u6709\u4E00\u4E2AAF_UNIX,\u8FD9\u662F\u5728\u4E00\u4E2AUNIX\u7CFB\u7EDF\u4E0A\u4E0D\u540C\u7684\u8FDB\u7A0B\u901A\u4FE1\u4F1A\u7528\u5230
            type:\u9ED8\u8BA4\u4E3ASOCK_STREAM\u79F0\u4E3A\u6D41\u5F0FSOCKET\uFF08\u7528\u4E8E\u5EFA\u7ACBTCP\u8FDE\u63A5\uFF09,\u8FD8\u6709\u4E00\u4E2A\u662FSOCK_DGRAM(Datagram\uFF1A\u6570\u636E\u62A5)\u79F0\u4E3A\u6570\u636E\u6D41 \u4E5F\u5C31\u662F\u6570\u636E\u5F0F
                SOCKET\uFF08\u7528\u4E8E\u5EFA\u7ACBUDP\u8FDE\u63A5\uFF09
            \u56E0\u4E3A\u6709\u9ED8\u8BA4\u503C\uFF0C\u901A\u5E38\u6765\u8BF4\u4EC0\u4E48\u90FD\u4E0D\u7528\u5199\uFF0C\u5C31\u9ED8\u8BA4\u5EFA\u7ACB\u597D\u4E86\u3002\u82E5\u81EA\u5DF1\u624B\u52A8\u52A0\u4E5F\u53EF\u4EE5\uFF0C\u76F4\u63A5\u66F4\u6539\u53C2\u6570\u5373\u53EF\u3002
            \u6253\u5370\u65F6\u53D1\u73B0\uFF0C\u5176\u5B9E\u662F\u4E00\u4E2Asocket\u5BF9\u8C61\uFF0C\u5C01\u88C5\u4E86fd\uFF1A\u6587\u4EF6\u63CF\u8FF0\u7B26\u3001family\uFF1A\u5730\u5740\u65CF\u3001type\uFF1A\u534F\u8BAE\u7C7B\u578B\uFF0Cproto = 0

    \u7ED1\u5B9AIP\u5730\u5740\u548C\u7AEF\u53E3:  ----2
        address = (\u672C\u673AIP\u5730\u5740,\u7AEF\u53E3\u53F7) \u5229\u7528\u4E00\u4E2A\u5143\u7EC4address\u6765\u5B58\u50A8
            \u672C\u673AIP\u5730\u5740:\u73B0\u5728\u586B127.0.0.1 \u771F\u5B9E\u73AF\u5883\u4E0B\u5219\u4E3A\u670D\u52A1\u5668\u7684\u771F\u5B9EIP
            \u7AEF\u53E3\u53F7: \u4E00\u822C\u6765\u8BF41024\u4E4B\u524D\u7684\u7AEF\u53E3\u90FD\u88AB\u64CD\u4F5C\u7CFB\u7EDF\u6240\u5360\u7528\uFF0C\u901A\u5E38\u75288000\u4E4B\u540E\u7684\u7AEF\u53E3\uFF0C\u786E\u4FDD\u6CA1\u6709\u5360\u7528
        .bind(address): \u4F20\u5165tuple\uFF0C\u7528\u6765\u7ED1\u5B9AIP\u5730\u5740\u548C\u7AEF\u53E3

    \u76D1\u542C\u7AEF\u53E3\uFF0C\u7B49\u5F85\u5BA2\u6237\u7AEF\u7684\u8BF7\u6C42\uFF1A  ----3
        .listen(backlog):\u8FD9\u91CC\u6307\u7684\u670D\u52A1\u7AEF\u80FD\u5BB9\u7EB3\u7684\u4EBA\u6570\uFF0C\u8D85\u8FC7\u5219\u5BA2\u6237\u7AEF\u62A5\u9519\uFF08\u7B80\u800C\u8A00\u4E4B\uFF0C\u6211\u5728\u548C\u7B2C\u4E00\u4E2A\u4EBA\u901A\u4FE1\u65F6\uFF0C\u53EF\u6709\u591A\u5C11\u4E2A\u5176\u4ED6\u4EBA\u7B49\u5F85\uFF09
            \u5F00\u59CB\u76D1\u542C\u4F20\u5165\u8FDE\u63A5\u3002backlog\u6307\u5B9A\u5728\u62D2\u7EDD\u8FDE\u63A5\u4E4B\u524D\uFF0C\u53EF\u4EE5\u6302\u8D77\u7684\u6700\u5927\u8FDE\u63A5\u6570\u91CF\u3002
            backlog\u7B49\u4E8E5\uFF0C\u8868\u793A\u5185\u6838\u5DF2\u7ECF\u63A5\u5230\u4E86\u8FDE\u63A5\u8BF7\u6C42\uFF0C\u4F46\u670D\u52A1\u5668\u8FD8\u6CA1\u6709\u8C03\u7528accept\u8FDB\u884C\u5904\u7406\u7684\u8FDE\u63A5\u4E2A\u6570\u6700\u5927\u4E3A5
            \u8FD9\u4E2A\u503C\u4E0D\u80FD\u65E0\u9650\u5927\uFF0C\u56E0\u4E3A\u8981\u5728\u5185\u6838\u4E2D\u7EF4\u62A4\u8FDE\u63A5\u961F\u5217

    \u963B\u585E:(\u4E5F\u5C31\u662F\u5BF9\u8FDE\u63A5\u8BF7\u6C42\u8FDB\u884C\u5904\u7406)   ----4
        .accpet()\uFF1A#\u63A5\u6536TCP \u5BA2\u6237\u7684\u8FDE\u63A5\uFF08\u963B\u585E\u5F0F\uFF09\u7B49\u5F85\u8FDE\u63A5\u7684\u5230\u6765\u3002\u8FD9\u91CC\u63A5\u6536\u7684\u5C31\u662F\u5EFA\u7ACB\u8FDE\u63A5\u540E\u8FD4\u56DE\u7684\u5185\u5BB9\uFF0C\u8FD4\u56DE\u7684\u662FSocket\u5BF9\u8C61\uFF08\u591A\u4E86laddr\u548C
            raddr\uFF09\u518D\u548C\u4E00\u4E2AClient\u7AEF\u7684\u5730\u5740\uFF08IP\uFF0C\u7AEF\u53E3\u53F7\uFF09\u5176\u8FD4\u56DE\u503C\u5B9E\u8D28\u662FClient\u7AEF\u7684socket\u5BF9\u8C61\uFF08\u56E0\u6B64\u901A\u5E38\u7528\u4E24\u4E2A\u53D8\u91CFconn\u3001addr\u6765\u63A5\u6536\uFF09
            coon\u662F\u4EC0\u4E48:\u5C31\u662F\u8FD4\u56DE\u7684Client\u7AEF\u7684Socket\u5BF9\u8C61

    \u8FDE\u63A5\u5230\u6307\u5B9A\u8BA1\u7B97\u673A\u7684\u7AEF\u53E3\uFF1A    ----5
        .connect(\u8FDE\u63A5\u76EE\u7684IP\u5730\u5740,\u76EE\u7684\u7AEF\u53E3\u53F7)

    \u901A\u4FE1\uFF1A\u8C01\u90FD\u53EF\u4EE5\u6536\u53D1\uFF0C\u4F46\u8BB0\u4F4F\u5FC5\u987B\u8981\u4E00\u6536\u4E00\u53D1\u3002\u4E00\u4E2A\u6536\u5BF9\u5E94\u4E00\u4E2A\u53D1\uFF0C\u5426\u5219\u7A0B\u5E8F\u4E71\u5957    ----6
    \u6536\uFF1A
        .recv(value):\u6307\u5B9A\u4E00\u6B21\u6700\u591A\u53EF\u4EE5\u63A5\u6536\u591A\u5C11\u5B57\u8282\uFF0C\u901A\u5E38\u6307\u5B9A\u4E3A1024\u3002\u82E5\u6D88\u606F\uFF08\u6570\u636E\uFF09\u6CA1\u6709\u63A5\u6536\u5230\uFF0Crecv\u4E5F\u4F1A\u8FDB\u884C\u963B\u585E\uFF0C\u76F4\u5230\u63A5\u6536\u5230\u540E\u624D\u505C\u6B62\u3002
    \u53D1\uFF1A
        .send():\u5F53\u53D1\u9001\u4E00\u4E2Astring\u65F6\uFF0C\uFF08\u6709\u53EF\u80FD\uFF09\u4E00\u6B21\u53D1\u9001\u4E0D\u8FC7\u53BB\uFF0C\u6570\u91CF\u53EF\u80FD\u5C0F\u4E8Estring\u7684\u5B57\u8282\u5927\u5C0F\uFF0C\u6B64\u65F6\u5229\u7528sendall
        .sendall():\u5B9E\u8D28\u4E0A\u91CC\u9762\u5199\u4E86while True: \u4E4B\u540E\u91CC\u9762\u4E00\u76F4send()\u3002\u5C06string\u4E2D\u7684\u6570\u636E\u53D1\u9001\u5230\u8FDE\u63A5\u7684\u5957\u63A5\u5B57\uFF0C\u4F46\u5728\u8FD4\u56DE\u4E4B\u524D\u4F1A\u5C1D\u8BD5\u53D1\u9001\u6240\u6709\u6570\u636E\u3002
            \u6210\u529F\u8FD4\u56DENone\uFF0C\u5931\u8D25\u5219\u629B\u51FA\u5F02\u5E38\u3002\u5185\u90E8\u901A\u8FC7\u9012\u5F52\u8C03\u7528send\uFF0C\u5C06\u6240\u6709\u5185\u5BB9\u53D1\u9001\u51FA\u53BB\u3002

    \u5728py3\u4E2D\u65E0\u8BBA\u662F\u63A5\u3001\u6536\uFF0C\u6570\u636E\u90FD\u5FC5\u987B\u662Fbytes\u7C7B\u578B\u3002\u53EF\u7528bytes(data,encoding=&quot;&quot;)\u6765\u8F6C\u5316
    \u6240\u4EE5\u6536\u5230\u7684\u6570\u636E\u4E5F\u53EF\u4EE5\u7528str(data,encoding=&quot;&quot;)\u6765\u8F6C\u5316

    conn\uFF1A\u8FDE\u63A5\u7684\u5B9E\u8D28\u662F\u5229\u7528Server\u7AEF\u7684socket\u83B7\u53D6\u5230Client\u7AEF\u7684socket\u5E76\u8D4B\u7ED9conn\uFF0C\u56E0\u6B64\u90FD\u662F\u5229\u7528\u5BA2\u6237\u7AEF\u7684socket\u6765\u8FDB\u884C\u901A\u4FE1\u7684\u3002\uFF08\u82E5\u5229\u7528\u670D\u52A1\u7AEF\u7684
        socket\u5982\u4F55\u5B9E\u73B0\u591A\u53F0\u8BA1\u7B97\u673A\u5BF9\u670D\u52A1\u7AEF\u7684\u8BBF\u95EE\uFF0C\u6B63\u56E0\u4E3A\u662F\u6709\u591A\u4E2A\u5BA2\u6237\u7AEF\u7684socket\u624D\u80FD\u5BF9\u6BCF\u4E2A\u5BF9\u5E94\u7684\u5BA2\u6237\u7AEF\u8FDB\u884C\u54CD\u5E94\uFF09\u670D\u52A1\u7AEF\u7684socket\u901A\u5E38\u53EA\u662F\u7ED1\u5B9A\u7AEF\u53E3
        \u548CIP\u5730\u5740\u7528\u7684\u3002\u56E0\u6B64\u670D\u52A1\u7AEF\u7684conn\u548C\u5BA2\u6237\u7AEF\u7684socket\u662F\u4E00\u4E2A\u4E1C\u897F\u624D\u80FD\u8FDB\u884C\u6536\u53D1\u901A\u4FE1

    \u5173\u95ED:     ----7
        .close():\u8FD9\u91CC\u5173\u95ED\u7684\u662F\u901A\u9053\uFF0CClient\u4E2D\u8FDB\u884Cclose\u64CD\u4F5C\u5C31\u662F\u544A\u8BC9\u670D\u52A1\u5668\u5173\u95ED\u4E86\uFF0C\u800C\u670D\u52A1\u5668\u4E5F\u53EF\u4EE5\u901A\u8FC7conn.close()\u5173\u95ED\u5BA2\u6237\u7AEF\u7684\u901A\u4FE1\u3002\u5BA2\u6237\u7AEF\u5173\u95ED\u540E
            \u4F9D\u7136\u4F1A\u5B58\u5728\uFF0C\u53EF\u4EE5print\u67E5\u770B\uFF0C\u4E5F\u53EF\u4EE5\u91CD\u65B0connect

    \u5176\u4ED6\u65B9\u6CD5\uFF1A
    .setblocking(bool)
        \u662F\u5426\u963B\u585E\uFF08\u9ED8\u8BA4True\uFF09\uFF0C\u5982\u679C\u8BBE\u7F6EFalse\uFF0C\u90A3\u4E48accept\u548Crecv\u65F6\u4E00\u65E6\u65E0\u6570\u636E\uFF0C\u5219\u62A5\u9519\u3002\u8FD9\u91CC\u62A5\u9519\u662F\u53CD\u9988\u4E00\u4E2A\u9519\u8BEF\u4FE1\u606F\uFF0C\u7136\u540E\u7A0B\u5E8F\u7EE7\u7EED\u6267\u884C

    .connect_ex(address)
        \u540C\u4E0A\uFF0C\u53EA\u4E0D\u8FC7\u4F1A\u6709\u8FD4\u56DE\u503C\uFF0C\u8FDE\u63A5\u6210\u529F\u65F6\u8FD4\u56DE 0 \uFF0C\u8FDE\u63A5\u5931\u8D25\u65F6\u5019\u8FD4\u56DE\u7F16\u7801\uFF0C\u4F8B\u5982\uFF1A10061

    .recvfrom(bufsize[.flag])
        \u4E0Erecv()\u7C7B\u4F3C\uFF0C\u4F46\u8FD4\u56DE\u503C\u662F\uFF08data,address\uFF09\u3002\u5176\u4E2Ddata\u662F\u5305\u542B\u63A5\u6536\u6570\u636E\u7684\u5B57\u7B26\u4E32\uFF0Caddress\u662F\u53D1\u9001\u6570\u636E\u7684\u5957\u63A5\u5B57\u5730\u5740\u3002

    .sendto(string[,flag],address)
        \u5C06\u6570\u636E\u53D1\u9001\u5230\u5957\u63A5\u5B57\uFF0Caddress\u662F\u5F62\u5F0F\u4E3A\uFF08ipaddr\uFF0Cport\uFF09\u7684\u5143\u7EC4\uFF0C\u6307\u5B9A\u8FDC\u7A0B\u5730\u5740\u3002\u8FD4\u56DE\u503C\u662F\u53D1\u9001\u7684\u5B57\u8282\u6570\u3002\u8BE5\u51FD\u6570\u4E3B\u8981\u7528\u4E8EUDP\u534F\u8BAE\u3002

    .settimeout(timeout)
        \u8BBE\u7F6E\u5957\u63A5\u5B57\u64CD\u4F5C\u7684\u8D85\u65F6\u671F\uFF0Ctimeout\u662F\u4E00\u4E2A\u6D6E\u70B9\u6570\uFF0C\u5355\u4F4D\u662F\u79D2\u3002\u503C\u4E3ANone\u8868\u793A\u6CA1\u6709\u8D85\u65F6\u671F\u3002\u4E00\u822C\uFF0C\u8D85\u65F6\u671F\u5E94\u8BE5\u5728\u521A\u521B\u5EFA\u5957\u63A5\u5B57\u65F6\u8BBE\u7F6E\uFF0C\u56E0\u4E3A\u5B83\u4EEC\u53EF\u80FD\u7528\u4E8E\u8FDE\u63A5\u7684\u64CD\u4F5C\uFF08\u5982 client \u8FDE\u63A5\u6700\u591A\u7B49\u5F855s \uFF09

    .getpeername()
        \u8FD4\u56DE\u8FDE\u63A5\u5957\u63A5\u5B57\u7684\u8FDC\u7A0B\u5730\u5740\u3002\u8FD4\u56DE\u503C\u901A\u5E38\u662F\u5143\u7EC4\uFF08ipaddr,port\uFF09\u3002

    .getsockname()
        \u8FD4\u56DE\u5957\u63A5\u5B57\u81EA\u5DF1\u7684\u5730\u5740\u3002\u901A\u5E38\u662F\u4E00\u4E2A\u5143\u7EC4(ipaddr,port)

    .fileno()
        \u5957\u63A5\u5B57\u7684\u6587\u4EF6\u63CF\u8FF0\u7B26

    \u6CE8\u610F:
        1.\u6570\u636E\u4E0D\u80FD\u53D1\u9001\u7A7A\uFF08\u7A7A\u683C\u4E0D\u7B97\uFF09\u53D1\u7A7A\u65F6\u63A5\u6536\u4E00\u65B9\u7684recv\u538B\u6839\u5C31\u662F\u963B\u585E\u72B6\u6001\u4E0D\u52A8
        2.\u5F53\u5F3A\u5236\u5173\u95ED\u5BA2\u6237\u7AEF\u65F6\uFF0CWindows\u4E0B\u670D\u52A1\u5668\u4F1A\u62A5\u9519\uFF0C\u8981\u5229\u7528try-except\u89E3\u51B3\uFF0C\u800CLinux\u4E0B\u4E0D\u4F1A\u62A5\u9519\uFF0C\u9ED8\u8BA4\u5BA2\u6237\u7AEF\u548C\u6B63\u5E38\u9000\u51FA\u4E00\u6837\uFF0C\u63A5\u6536\u6570\u636E\u4E3A\u7A7A
        3.\u5F53server\u7AEF\u6570\u636E\u7528sendall\u53D1\u9001\u5B8C\u6BD5\u65F6\uFF0Cclient\u7AEF\u6570\u636E\u6CA1\u6709\u63A5\u6536\u5B8C\u6574\uFF08\u4E0B\u6B21\u63A5\u53D7\u65F6\u4F1A\u5EF6\u7EED\u4E0A\u6B21\u63A5\u6536\u6570\u636E\u8FD9\u6837\u7684\u9690\u5F0F\u9519\u8BEF\uFF09\u6B64\u65F6\u5229\u7528\u5FAA\u73AF\u63A5\u6536
            recv(1024)\u6570\u636E\u76F4\u5230\u5168\u90E8\u63A5\u6536\u5B8C\u6BD5,\u56E0\u6B64server\u7AEF\u5E94\u8BE5\u5148\u53D1\u9001\u5F85\u4F20\u6570\u636E\u7684\u5927\u5C0F
        4.\u5F53\u4E00\u65B9\u540C\u65F6\u6709\u4E24\u4E2Asend\u53D1\u9001\u6570\u636E\u65F6\uFF0C\u53EF\u80FD\u9020\u6210\u7C98\u5305\u7684\u73B0\u8C61\uFF0CCPU\u6267\u884C\u8FC7\u5FEB\uFF0C\u5BFC\u81F4\u7B2C\u4E8C\u4E2Asend\u7684\u6570\u636E\u8DDF\u7740\u7B2C\u4E00\u4E2Asend\u53D1\u9001\u4E86\u8FC7\u53BB\u3002\uFF08\u4E4B\u540Eclient
            \u7AEF\u53EF\u80FD\u51FA\u73B0\u5F3A\u8F6C\u5931\u8D25\u7B49\u95EE\u9898\uFF09\u56E0\u6B64\u5F53server\u7AEF\u53D1\u9001\u6570\u636E\u5927\u5C0F\u540E\uFF0C\u8DDF\u7740recv\u963B\u585E\u3002\u7B49\u5F85client\u7AEF\u53D1\u4E00\u4E2A\u6D88\u606F\u3002\u907F\u514D\u7C98\u5305\u95EE\u9898\u7684\u53D1\u751F
        5.str (\u8F6C)&gt;&gt;&gt;&gt; Bytes(16\u8FDB\u5236)  bytes(str,&quot;utf8&quot;)#\u8FD9\u91CC\u9762\u8F6C\u4E3A\u90A3\u4E2A\u7F16\u7801\u90FD\u884C\uFF0C\u53EA\u662Futf8\u662F\u4E16\u754C\u516C\u8BA4\u7684\uFF0C\u8FD9\u91CC\u7528gbk\u548Cutf8\u90FD\u662F\u5BF9str\uFF08Unicode\uFF09\u8FDB\u884C
            \u7F16\u7801\uFF0C\u7F16\u51FA\u7684gbk\u6216utf8\u90FD\u6709\u81EA\u5DF1\u5BF9\u5E94\u768416\u8FDB\u5236\uFF08\u7528utf8\u7684\u89C4\u5219\u53D8\u4E3A\u5341\u516D\u8FDB\u5236\uFF09\u4FBF\u4E8E\u4F20\u8F93\u6570\u636E

    \u6587\u4EF6\u4E0A\u4F20\uFF1A
        \u89C1Post* \u4EE3\u7801\u5408\u7406\u5229\u7528os\u548C\u5224\u65AD\u5373\u53EF
</code></pre><hr><p>socketserver\uFF1A \u867D\u8BF4\u7528 Python \u7F16\u5199\u7B80\u5355\u7684\u7F51\u7EDC\u7A0B\u5E8F\u5F88\u65B9\u4FBF\uFF0C\u4F46\u590D\u6742\u4E00\u70B9\u7684\u7F51\u7EDC\u7A0B\u5E8F\u8FD8\u662F\u7528\u73B0\u6210\u7684\u6846\u67B6\u6BD4\u8F83\u597D\u3002\u8FD9\u6837\u5C31\u53EF\u4EE5\u4E13\u5FC3\u4E8B\u52A1\u903B\u8F91\uFF0C\u800C\u4E0D\u662F\u5957\u63A5\u5B57\u7684\u5404\u79CD\u7EC6\u8282\u3002 SocketServer \u6A21\u5757\u7B80\u5316\u4E86\u7F16\u5199\u7F51\u7EDC\u670D\u52A1\u7A0B\u5E8F\u7684\u4EFB\u52A1\u3002\u540C\u65F6 SocketServer \u6A21\u5757\u4E5F\u662F Python \u6807\u51C6\u5E93\u4E2D\u5F88\u591A\u670D\u52A1\u5668\u6846\u67B6\u7684\u57FA\u7840\u3002</p><pre><code>socketserver\u6A21\u5757\u53EF\u4EE5\u7B80\u5316\u7F51\u7EDC\u670D\u52A1\u5668\u7684\u7F16\u5199\uFF0CPython\u628A\u7F51\u7EDC\u670D\u52A1\u62BD\u8C61\u6210\u4E24\u4E2A\u4E3B\u8981\u7684\u7C7B\uFF0C\u4E00\u4E2A\u662FServer\u7C7B\uFF0C\u7528\u4E8E\u5904\u7406\u8FDE\u63A5\u76F8\u5173\u7684\u7F51\u7EDC\u64CD\u4F5C\uFF0C\u53E6\u5916\u4E00\u4E2A\u5219
\u662FRequestHandler\u7C7B\uFF0C\u7528\u4E8E\u5904\u7406\u6570\u636E\u76F8\u5173\u7684\u64CD\u4F5C\u3002\u5E76\u4E14\u63D0\u4F9B\u4E24\u4E2AMixIn \u7C7B\uFF0C\u7528\u4E8E\u6269\u5C55 Server\uFF0C\u5B9E\u73B0\u591A\u8FDB\u7A0B\u6216\u591A\u7EBF\u7A0B\u3002

Server\u7C7B\uFF1A
    \u5B83\u5305\u542B\u4E86\u79CD\u4E94\u79CDserver\u7C7B\uFF0CBaseServer(\u4E0D\u76F4\u63A5\u5BF9\u5916\u670D\u52A1)\u3002TCPServer\u4F7F\u7528TCP\u534F\u8BAE\uFF0CUDPServer\u4F7F\u7528UDP\u534F\u8BAE\uFF0C\u8FD8\u6709\u4E24\u4E2A\u4E0D\u5E38\u4F7F\u7528\u7684\uFF0C\u5373UnixStreamServer
    \u548CUnixDatagramServer,\u8FD9\u4E24\u4E2A\u7C7B\u4EC5\u4EC5\u5728unix\u73AF\u5883\u4E0B\u6709\u7528(AF_unix)\u3002
RequestHandler\u7C7B
    \u6240\u6709requestHandler\u90FD\u7EE7\u627FBaseRequestHandler\u57FA\u7C7B\u3002

\u8BA9\u4F60\u7684socketserver\u5E76\u53D1\u8D77\u6765\uFF0C \u5FC5\u987B\u9009\u62E9\u4F7F\u7528\u4EE5\u4E0B\u4E00\u4E2A\u591A\u5E76\u53D1\u7684\u7C7B

    class socketserver.ForkingTCPServer

    class socketserver.ForkingUDPServer

    class socketserver.ThreadingTCPServer

    class socketserver.ThreadingUDPServer

1  tcp\u4E0Eudp\u7684\u533A\u522B\uFF08\u4E09\u6B21\u63E1\u624B\u540E\uFF0C\u5EFA\u7ACB\u8FDE\u63A5\uFF0C\u53CC\u5411\u901A\u9053\uFF0C\u4E00\u4E2A\u6536\uFF0C\u4E00\u4E2A\u53D1\uFF0Ctcp\u6BCF\u6B21\u63A5\u5230\u6570\u636E\u540E\u90FD\u4F1A\u6709\u4E00\u4E2A\u5E94\u7B54\uFF0C\u6709\u4E86\u5E94\u7B54\uFF0C\u65B0\u7684\u6570\u636E\u5C31\u4F1A\u88AB\u8986\u76D6\u6389\uFF09

2  \u7C98\u5305
\u3000\u3000
\u8BF4\u518D\u591A\u591A\u6CA1\u7528\uFF0C\u8BE6\u60C5\u8BF7\u89C1\u4EE3\u7801socketserver\u53CA\u6E90\u7801~
</code></pre>`,24);function _(S,P){const e=i("RouterLink");return o(),r("div",null,[k,a("more"),s("p",null,[n("\u8BF7\u5148\u53C2\u8003\uFF1A"),c(e,{to:"/unix/Linux/%E7%BD%91%E7%BB%9C/%E7%BD%91%E7%BB%9C%E5%9F%BA%E7%A1%80.html"},{default:l(()=>[n("\u7F51\u7EDC\u57FA\u7840")]),_:1}),n(" \u719F\u6089 "),u,n(" \u5C42\u6A21\u578B\u548C "),v,n(" \u534F\u8BAE\u6808\u4E0B\u7684\u534F\u8BAE")]),m])}const y=t(d,[["render",_],["__file","Socket.html.vue"]]);export{y as default};