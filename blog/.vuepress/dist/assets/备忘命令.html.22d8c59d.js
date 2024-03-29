import{_ as e}from"./plugin-vueexport-helper.2444895f.js";import{o as t,c as a,e as n,a as r,f as s}from"./app.c323a8c1.js";const c={},o=r("p",null,"\u5E38\u7528\u547D\u4EE4\u5907\u5FD8\u901F\u67E5",-1),p=s(`<h5 id="netstat-ntlp" tabindex="-1"><a class="header-anchor" href="#netstat-ntlp" aria-hidden="true">#</a> netstat -ntlp</h5><p>\u573A\u666F\uFF1A\u51FA\u73B0 http500 \u65F6\uFF0C\u5229\u7528 netstat -tnlp \u6765\u6392\u67E5</p><pre><code>-n\u6216--numeric\uFF1A\u76F4\u63A5\u4F7F\u7528ip\u5730\u5740\uFF0C\u800C\u4E0D\u901A\u8FC7\u57DF\u540D\u670D\u52A1\u5668
-t\u6216--tcp\uFF1A\u663E\u793ATCP\u4F20\u8F93\u534F\u8BAE\u7684\u8FDE\u7EBF\u72B6\u51B5
-l\u6216--listening\uFF1A\u663E\u793A\u76D1\u63A7\u4E2D\u7684\u670D\u52A1\u5668\u7684Socket
-p\u6216--programs\uFF1A\u663E\u793A\u6B63\u5728\u4F7F\u7528Socket\u7684\u7A0B\u5E8F\u8BC6\u522B\u7801\u548C\u7A0B\u5E8F\u540D\u79F0\uFF08\u663E\u793A\u8FDB\u7A0Bpid\uFF0C\u914D\u5408kill\u6740\u6B7B\uFF09
</code></pre><h4 id="ps-ef-aux" tabindex="-1"><a class="header-anchor" href="#ps-ef-aux" aria-hidden="true">#</a> ps -ef | -aux</h4><p>\u573A\u666F\uFF1A\u67E5\u770B\u8FDB\u7A0B\uFF0C\u663E\u793A\u72B6\u6001</p><pre><code>ps -ef |less \u547D\u4EE4\uFF1A ps\u67E5\u770B\u8FDB\u7A0B\u6240\u6709\u4FE1\u606F\u5E76\u901A\u8FC7less\u5206\u9875\u663E\u793A
ps -ef | grep etutorservice : \u5229\u7528\u7BA1\u9053\u7B26\u7CBE\u786E\u67E5\u8BE2\u9700\u8981\u7684\u8FDB\u7A0B\uFF0C\u4E4B\u540Ekill\u7B2C\u4E00\u4E2A\u7684\u603B\u8FDB\u7A0B\u5373\u53EF\u3002
</code></pre><h4 id="chmod-\u6539\u6743\u9650" tabindex="-1"><a class="header-anchor" href="#chmod-\u6539\u6743\u9650" aria-hidden="true">#</a> chmod\uFF1A\u6539\u6743\u9650</h4><p>\u573A\u666F\uFF1A\u66F4\u6539\u65E0\u6CD5\u8BBF\u95EE\u7684\u6587\u4EF6\u6743\u9650\uFF08\u4FEE\u6539\u67D0\u4E2A\u76EE\u5F55\u6216\u6587\u4EF6\u7684\u8BBF\u95EE\u6743\u9650\uFF09</p><pre><code>\u8BED\u6CD5\uFF1Achmod [-cfvR] [--help] [--version] [who] [+ | - | =] [mode] \u6587\u4EF6\u540D
\u4F8B\u5B50\uFF1Achmod -R 777 /home/linux \u4F7F\u5176\u62E5\u6709\u6240\u6709\u6743\u9650
     chmod +x ./test.sh \u4F7F test.sh \u811A\u672C\u5177\u6709\u53EF\u6267\u884C\u6743\u9650 \uFF08\u4E3A\u5565\u8981 ./ \uFF1A\u82E5\u6CA1\u6709./ \u5219\u53BBPATH\u4E2D\u5BFB\u627E\u811A\u672C ./\u610F\u5473\u5F53\u524D\u76EE\u5F55\uFF09
</code></pre><h4 id="chown-\u6539\u7EC4" tabindex="-1"><a class="header-anchor" href="#chown-\u6539\u7EC4" aria-hidden="true">#</a> chown\uFF1A\u6539\u7EC4</h4><p>\u573A\u666F\uFF1A\u66F4\u6539\u6587\u4EF6\u7684\u7528\u6237\u540D\u548C\u7528\u6237\u7EC4</p><pre><code>\u8BED\u6CD5\uFF1Achown \u7528\u6237\u540D:\u7EC4\u540D \u6587\u4EF6\u8DEF\u5F84
\u4F8B1\uFF1Achown root:root /tmp/tmp1
    \u5C31\u662F\u628Atmp\u4E0B\u7684tmp1\u7684\u7528\u6237\u540D\u548C\u7528\u6237\u7EC4\u6539\u6210root\u548Croot\uFF08\u53EA\u4FEE\u6539\u4E86tmp1\u7684\u5C5E\u7EC4\uFF09\u3002

\u4F8B2\uFF1Achown -R root:root /tmp/tmp1
    \u5C31\u662F\u628Atmp\u4E0B\u7684tmp1\u4E0B\u7684\u6240\u6709\u6587\u4EF6\u7684\u5C5E\u7EC4\u90FD\u6539\u6210root\u548Croot\u3002-R\u6307\u4EE3\u9012\u5F52
</code></pre><h4 id="more-less-cat" tabindex="-1"><a class="header-anchor" href="#more-less-cat" aria-hidden="true">#</a> more &amp; less &amp; cat</h4><pre><code>more -s testfile\uFF1A
    \u6309space\u663E\u793A\u4E0B\u4E00\u9875\uFF0Cb\uFF08back\uFF09\u663E\u793A\u4E0A\u4E00\u9875\uFF0Cs\u628A\u6240\u6709\u884C\u7A7A\u767D\u66FF\u6362\u4E3A\u4E00\u884C

less [\u53C2\u6570] \u6587\u4EF6\uFF1A
     \u597D\u5904\uFF1A less \u53EF\u4EE5\u968F\u610F\u6D4F\u89C8\u6587\u4EF6\uFF0C\u800C more \u4EC5\u80FD\u5411\u524D\u79FB\u52A8\uFF0C\u5374\u4E0D\u80FD\u5411\u540E\u79FB\u52A8\u3002less \u5728\u67E5\u770B\u4E4B\u524D\u4E0D\u4F1A\u52A0\u8F7D\u6574\u4E2A\u6587\u4EF6\u3002

cat [\u53C2\u6570] \u6587\u4EF6\uFF1A
    cat \u547D\u4EE4\u7528\u4E8E\u8FDE\u63A5\u6587\u4EF6\u5E76\u6253\u5370\u5230\u6807\u51C6\u8F93\u51FA\u8BBE\u5907\u4E0A\u3002\u8FC7\u4E8E\u5927\u7684\u6587\u4EF6\u67E5\u770B\u65F6\u4E0D\u8981\u7528cat\u547D\u4EE4\uFF0C\u4F1A\u6D88\u8017\u5185\u5B58\u53EF\u80FD\u628A\u670D\u52A1\u5668\u62D6\u5D29\u3002
</code></pre><h4 id="ssh" tabindex="-1"><a class="header-anchor" href="#ssh" aria-hidden="true">#</a> ssh</h4><p>SSH \u4E3A Secure Shell \u7684\u7F29\u5199\uFF0C\u7531 IETF \u7684\u7F51\u7EDC\u5DE5\u4F5C\u5C0F\u7EC4\uFF08Network Working Group\uFF09\u6240\u5236\u5B9A\u3002\u4E3A\u5EFA\u7ACB\u5728\u5E94\u7528\u5C42\u548C\u4F20\u8F93\u5C42\u57FA\u7840\u4E0A\u7684\u5B89\u5168\u534F\u8BAE\u3002</p><p>\u573A\u666F\uFF1A\u9700\u8981\u8FDC\u7A0B\u8FDE\u63A5</p><pre><code>\u4F8B\uFF1Assh ubuntu@192.168.0.225   \u4EE5ubuntu\u8EAB\u4EFD\u767B\u5165\u670D\u52A1\u5668\uFF08\u7136\u540E\u8F93\u5165\u7528\u6237\u540D\u5BC6\u7801\u5373\u53EF\u767B\u5F55\uFF09
    -p 22 \u8868\u793A\u7AEF\u53E3\u4E3A22\uFF0C\u9ED8\u8BA4\u901A\u5E38\u4E3A22

\u516C\u94A5\u767B\u5F55\uFF1A
    ssh-keygen\uFF1A                 \u7528\u6237\u63D0\u4F9B\u81EA\u5DF1\u7684\u516C\u94A5\uFF0C\u751F\u6210
    ssh-copy-id user@host        \u5C06\u516C\u94A5\u4F20\u9001\u5230\u8FDC\u7A0B\u4E3B\u673Ahost\u4E0A\u9762\uFF0C

    \u5728\u8FDC\u7A0B\u4E3B\u673A\u7684.ssh\u6587\u4EF6\u4E0B authorized_keys\u91CC\u4F1A\u8BB0\u5F55\u8BA4\u8BC1\u4FE1\u606F\uFF0C\u82E5\u5220\u9664\u5219\u4E0B\u6B21\u9700\u8981\u8F93\u5165\u5BC6\u7801

service ssh restart             \u91CD\u542F\u8FDC\u7A0B\u4E3B\u673A\u7684ssh\u670D\u52A1
</code></pre><h4 id="scp" tabindex="-1"><a class="header-anchor" href="#scp" aria-hidden="true">#</a> scp</h4><p>scp \u5C31\u662F\u8FDC\u7A0B\u590D\u5236\u6587\u4EF6\uFF0C\u53EF\u4EE5\u628A \u672C\u5730\u590D\u5236\u5230\u8FDC\u7A0B\u3001\u8FDC\u7A0B\u590D\u5236\u5230\u672C\u5730\u3001\u8FDC\u7A0B\u590D\u5236\u5230\u8FDC\u7A0B\u7B49\u7B49\uFF0C\u53EA\u8981\u4E4B\u524D ssh \u662F\u4E92\u901A\u7684\u5373\u53EF</p><pre><code>scp \u5F85\u590D\u5236\u7684\u6587\u4EF6\u8DEF\u5F84 \u5C06\u8981\u590D\u5236\u5230\u7684\u6587\u4EF6\u8DEF\u5F84
\u4F8B\uFF1A
scp /etc/hosts 172.16.120.104:/etc/hosts    # \u672C\u5730\u590D\u5236\u5230\u8FDC\u7A0B\uFF1A\u4ECE\u672C\u5730 \u590D\u5236\u5230\u8FDC\u7A0B104

scp 172.16.120.103:/etc/hosts /etc/hosts    # \u8FDC\u7A0B\u590D\u5236\u5230\u672C\u5730\uFF1A\u4ECE\u8FDC\u7A0B103 \u590D\u5236\u5230\u672C\u5730

scp 172.16.120.103:/etc/hosts 172.16.120.104/etc/hosts  # \u8FDC\u7A0B\u590D\u5236\u5230\u8FDC\u7A0B\uFF1A\u4ECE\u8FDC\u7A0B103 \u590D\u5236\u5230 \u8FDC\u7A0B104 \u9700\u8981\u8F93\u4E24\u6B21\u5BC6\u7801
</code></pre><h4 id="alias" tabindex="-1"><a class="header-anchor" href="#alias" aria-hidden="true">#</a> alias</h4><p>\u573A\u666F\uFF1A\u5229\u7528\u522B\u540D\u7B80\u5316\u547D\u4EE4</p><pre><code>alias cr=&quot;cross=http://172.16.0.225:9300 npm start&quot; \u7B80\u5316\u4E00\u4E32\u547D\u4EE4\u4E3Acr
\u82E5\u6BCF\u6B21\u81EA\u52A8\u751F\u6548\uFF0C\u9700\u8981 vim ~/.bashrc \u4FEE\u6539 bashrc \u6587\u4EF6\uFF0C\u5728\u6700\u540E\u6DFB\u52A0\u4EE5\u4E0A\u547D\u4EE4\u3002
source ~/.bashrc \u4F7F\u73AF\u5883\u53D8\u91CF\u7ACB\u5373\u751F\u6548
</code></pre><h4 id="ping" tabindex="-1"><a class="header-anchor" href="#ping" aria-hidden="true">#</a> ping</h4><p>\u8D70\u7684\u662F ICMP \u534F\u8BAE\uFF1A\uFF08Internet Control Message Protocol\uFF09Internet \u63A7\u5236\u62A5\u6587\u534F\u8BAE\u3002\u8BE6\u89C1\u672C\u8282\u7B14\u8BB0 6.3</p><pre><code>-c\uFF1A\u6307\u5B9Aping\u7684\u6B21\u6570
</code></pre><h4 id="tar-zxvf" tabindex="-1"><a class="header-anchor" href="#tar-zxvf" aria-hidden="true">#</a> tar -zxvf</h4><p>\u573A\u666F\uFF1A\u89E3\u538B.tar.gz \u64CD\u4F5C</p><pre><code>\u4F8B\uFF1Atar -zxvf xx.tar.gz
tar \u89E3\u538B\u7F29\u547D\u4EE4\u8BE6\u89E3
-c: \u5EFA\u7ACB\u538B\u7F29\u6863\u6848

-x\uFF1A\u89E3\u538B
-t\uFF1A\u67E5\u770B\u5185\u5BB9
-r\uFF1A\u5411\u538B\u7F29\u5F52\u6863\u6587\u4EF6\u672B\u5C3E\u8FFD\u52A0\u6587\u4EF6
-u\uFF1A\u66F4\u65B0\u539F\u538B\u7F29\u5305\u4E2D\u7684\u6587\u4EF6

\u8FD9\u4E94\u4E2A\u662F\u72EC\u7ACB\u7684\u547D\u4EE4\uFF0C\u538B\u7F29\u89E3\u538B\u90FD\u8981\u7528\u5230\u5176\u4E2D\u4E00\u4E2A\uFF0C\u53EF\u4EE5\u548C\u522B\u7684\u547D\u4EE4\u8FDE\u7528\u4F46\u53EA\u80FD\u7528\u5176\u4E2D\u4E00\u4E2A\u3002\u4E0B\u9762\u7684\u53C2\u6570\u662F\u6839\u636E\u9700\u8981\u5728\u538B\u7F29\u6216\u89E3\u538B\u6863\u6848\u65F6\u53EF\u9009\u7684\u3002
</code></pre><p>\u8303\u4F8B\u4E00\uFF1A\u5C06\u6574\u4E2A /etc \u76EE\u5F55\u4E0B\u7684\u6587\u4EF6\u5168\u90E8\u6253\u5305\u6210\u4E3A /tmp/etc.tar</p><pre><code>[root@linux ~]# tar -cvf /tmp/etc.tar /etc&lt;==\u4EC5\u6253\u5305\uFF0C\u4E0D\u538B\u7F29\uFF01
[root@linux ~]# tar -zcvf /tmp/etc.tar.gz /etc&lt;==\u6253\u5305\u540E\uFF0C\u4EE5 gzip \u538B\u7F29
[root@linux ~]# tar -jcvf /tmp/etc.tar.bz2 /etc&lt;==\u6253\u5305\u540E\uFF0C\u4EE5 bzip2 \u538B\u7F29
</code></pre><p>\u8303\u4F8B\u4E8C\uFF1A\u67E5\u9605\u4E0A\u8FF0 /tmp/etc.tar.gz \u6587\u4EF6\u5185\u6709\u54EA\u4E9B\u6587\u4EF6\uFF1F</p><pre><code>[root@linux ~]# tar -tvf /tmp/etc.tar
[root@linux ~]# tar -ztvf /tmp/etc.tar.gz
# \u7531\u65BC\u6211\u4EEC\u4F7F\u7528 gzip \u538B\u7F29\uFF0C\u6240\u4EE5\u8981\u67E5\u9605\u8BE5 tar file \u5185\u7684\u6587\u4EF6\u65F6\uFF0C
# \u5C31\u5F97\u8981\u52A0\u4E0A z \u8FD9\u4E2A\u53C2\u6570\u4E86\uFF01\u8FD9\u5F88\u91CD\u8981\u7684\uFF01
</code></pre><p>\u8303\u4F8B\u4E09\uFF1A\u5C06 /tmp/etc.tar \u89E3\u538B\u5230/etc \u76EE\u5F55\u4E0B\uFF08\u82E5\u6587\u4EF6\u5B58\u5728\u4FBF\u8986\u76D6\uFF09</p><pre><code>tar zxvf /tmp/etc.tar.gz -C /
[\u6CE8\u610F]\uFF1A \u8BE5\u547D\u4EE4\u6CA1\u6709 - \uFF0C\u8FD9\u4E2A\u662F\u5C06\u7EDD\u5BF9\u8DEF\u5F84\u4E0B /tmp/etc.tar.gz \u7684\u6240\u6709\u6587\u4EF6\u89E3\u538B\u5BF9\u5BF9\u5E94 / \u76EE\u5F55\u4E0B\u7684\u5404\u4E2A\u6587\u4EF6\u6253\u5305\u8DEF\u5F84\uFF0C\u4E00\u5F00\u59CB\u6587\u4EF6\u662F
/etc/xx\u6587\u4EF6 \u90A3\u4E48\u5C31\u89E3\u538B\u5BF9\u5E94\u76EE\u5F55 / -&gt; /etc/xx
</code></pre><h4 id="unzip-file" tabindex="-1"><a class="header-anchor" href="#unzip-file" aria-hidden="true">#</a> unzip file</h4><p>\u573A\u666F\uFF1A\u89E3\u538B.tar.gz \u64CD\u4F5C</p><pre><code>\u4F8B\uFF1Aunzip file.zip
-d &lt;\u76EE\u5F55&gt;: \u89E3\u538B\u5230\u6307\u5B9A\u76EE\u5F55\u4E0B
-P &lt;\u5BC6\u7801&gt;\uFF1A\u4F7F\u7528zip\u7684\u5BC6\u7801\u9009\u9879
</code></pre><h5 id="\u5FEB\u6377\u952E" tabindex="-1"><a class="header-anchor" href="#\u5FEB\u6377\u952E" aria-hidden="true">#</a> \u5FEB\u6377\u952E\uFF1A</h5><ul><li>Home \u8DF3\u8F6C\u5230\u547D\u4EE4\u5F00\u5934\uFF0CEnd \u8DF3\u8F6C\u5230\u547D\u4EE4\u7ED3\u5C3E</li><li>ctrl \u6309\u5355\u8BCD\u8DF3\u8F6C\uFF0C\u6309\u4E0A\u7BAD\u5934\u663E\u793A\u4E0A\u4E00\u6761\u547D\u4EE4</li></ul><p>linux awk tac \u67E5\u770B\u65E5\u5FD7</p><h5 id="dos2unix" tabindex="-1"><a class="header-anchor" href="#dos2unix" aria-hidden="true">#</a> dos2unix</h5><p>\u573A\u666F\uFF1A\u5F53\u524D\u76EE\u5F55\u4E0B\u6240\u6709 <strong>windows</strong> \u683C\u5F0F\u7684\u6587\u4EF6\u8F6C\u4E3A <strong>linux</strong></p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">find</span> <span class="token builtin class-name">.</span> <span class="token parameter variable">-type</span> f <span class="token parameter variable">-exec</span> dos2unix <span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token punctuation">\\</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,45);function i(d,h){return t(),a("div",null,[o,n("more"),p])}const m=e(c,[["render",i],["__file","\u5907\u5FD8\u547D\u4EE4.html.vue"]]);export{m as default};
