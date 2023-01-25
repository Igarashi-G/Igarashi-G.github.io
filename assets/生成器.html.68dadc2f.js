import{_ as e}from"./plugin-vueexport-helper.2444895f.js";import{o as t,c as o,a as s,b as n,d as p,w as i,e as l,f as c,r as d}from"./app.37986ebc.js";const u="/assets/yield_from.4e8c9b82.png",r={},k=s("strong",null,"\u5B8C\u5168\u5B9E\u73B0",-1),m=c(`<h1 id="\u751F\u6210\u5668" tabindex="-1"><a class="header-anchor" href="#\u751F\u6210\u5668" aria-hidden="true">#</a> \u751F\u6210\u5668</h1><p>\u8FED\u4EE3\u5668\u4ECE\u96C6\u5408\u4E2D\u53D6\u5143\u7D20\uFF0C\u800C\u751F\u6210\u5668\u7528\u4E8E <strong>\u51ED\u7A7A</strong> \u751F\u6210\u5143\u7D20</p><div class="custom-container info"><p class="custom-container-title">\u603B\u4E4B</p><p>\u542B\u6709 <strong>yield</strong> \u5173\u952E\u5B57\u7684 <strong>\u51FD\u6570</strong> \u5C31\u662F <strong>\u751F\u6210\u5668\u51FD\u6570</strong></p></div><h3 id="_1-1-\u751F\u6210\u5668\u8868\u8FBE\u5F0F" tabindex="-1"><a class="header-anchor" href="#_1-1-\u751F\u6210\u5668\u8868\u8FBE\u5F0F" aria-hidden="true">#</a> 1.1 \u751F\u6210\u5668\u8868\u8FBE\u5F0F</h3><p><code>genexpr = (\u63A8\u5BFC\u5F0F)</code> \u7684\u8FD9\u79CD\u5F62\u5F0F <strong>\u662F\u751F\u6210\u5668\u7684\u8BED\u6CD5\u7CD6</strong>\uFF0C \u975E\u5143\u7EC4\uFF0C\u8981\u533A\u522B\u4E8E <code>tuple(\u63A8\u5BFC\u5F0F)</code></p><div class="language-python ext-py line-numbers-mode"><pre class="language-python"><code>s <span class="token operator">=</span> <span class="token punctuation">(</span>x <span class="token operator">*</span> <span class="token number">2</span> <span class="token keyword">for</span> x <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span>

<span class="token comment"># &lt;generator object &lt;genexpr&gt; at 0x0000013EF1BF84A0&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6B64\u65F6\u6253\u5370\u51FA\u4E86 <strong>generator</strong> \u5BF9\u8C61\uFF0C\u5B83\u4FDD\u5B58\u7684\u4E0E\u5217\u8868\u3001\u96C6\u5408\uFF08<em>\u8FD9\u79CD\u5B58\u503C\u7684\u60C5\u51B5</em>\uFF09\u662F\u4E0D\u540C\u7684\uFF0C\u5B58\u4E86\u7A0B\u5E8F\u7684\u4E0A\u4E0B\u6587\u72B6\u6001\uFF0C\u56E0\u6B64\u4E00\u6837\u4E0D\u5360\u5185\u5B58\uFF0C\u8FD8\u53EF\u4EE5\u50CF\u8FED\u4EE3\u5668\u4E00\u6837\uFF0C\u7528 <code>__next__()</code> \u6765\u53D6\u503C\uFF0C\u4F46\u53EA\u80FD\u987A\u5E8F\u53D6</p><div class="language-python ext-py line-numbers-mode"><pre class="language-python"><code>s<span class="token punctuation">.</span>__next__<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment"># 0</span>

<span class="token builtin">next</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span>	<span class="token comment"># Python3</span>
<span class="token comment"># 2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="\u60F0\u6027\u8BA1\u7B97" tabindex="-1"><a class="header-anchor" href="#\u60F0\u6027\u8BA1\u7B97" aria-hidden="true">#</a> \u60F0\u6027\u8BA1\u7B97</h4><p>\u751F\u6210\u5668\u8868\u8FBE\u5F0F\u524D\u7684\u8BED\u53E5\u662F\u60F0\u6027\u8BA1\u7B97\u7684\uFF0C\u5373\u53EA\u5728\u771F\u6B63\u6267\u884C\u65F6\uFF0C\u624D\u8BA1\u7B97\u8868\u8FBE\u5F0F\uFF0C\u53EF\u4EE5\u907F\u514D\u4E0D\u5FC5\u8981\u7684\u8BA1\u7B97\uFF0C\u63D0\u5347\u6027\u80FD</p><div class="language-python ext-py line-numbers-mode"><pre class="language-python"><code>l <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">]</span>
lf1 <span class="token operator">=</span> <span class="token punctuation">(</span>i<span class="token operator">**</span><span class="token number">2</span> <span class="token keyword">for</span> i <span class="token keyword">in</span> l<span class="token punctuation">)</span>
l <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">4</span><span class="token punctuation">,</span><span class="token number">5</span><span class="token punctuation">,</span><span class="token number">6</span><span class="token punctuation">]</span>
lf2 <span class="token operator">=</span> <span class="token punctuation">(</span>i<span class="token operator">**</span><span class="token number">2</span> <span class="token keyword">for</span> i <span class="token keyword">in</span> l<span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token builtin">list</span><span class="token punctuation">(</span>lf1<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment"># \u7ED3\u679C &gt;&gt;&gt; [1, 4, 9]</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token builtin">list</span><span class="token punctuation">(</span>lf2<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment"># \u7ED3\u679C &gt;&gt;&gt; [16, 25, 36]</span>

l <span class="token operator">=</span> <span class="token string">&#39;ABC&#39;</span>
l_f1 <span class="token operator">=</span> <span class="token punctuation">(</span>l<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
l <span class="token operator">=</span> <span class="token string">&#39;DEF&#39;</span>
l_f2 <span class="token operator">=</span> <span class="token punctuation">(</span>l<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token builtin">list</span><span class="token punctuation">(</span>l_f1<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token builtin">list</span><span class="token punctuation">(</span>l_f2<span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment"># [&#39;D&#39;, &#39;E&#39;]</span>
<span class="token comment"># [&#39;D&#39;, &#39;E&#39;]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u751F\u6210\u5668\u8868\u8FBE\u5F0F\u4E2D\u7684 <code>for</code> \u5B50\u53E5\u662F\u7ACB\u5373\u8BA1\u7B97\u7684\uFF0C\u6B64\u65F6 <strong>\u6709\u95ED\u5305\u73AF\u5883</strong></p><ul><li>\u95ED\u5305\u7684 <code>i</code> \u53D8\u91CF\u5B58\u7684\u662F <code>l</code> \u4E2D\u7684\u503C\u5373 <code>1</code>\u3001<code>2</code> \u7684 <strong>int \u503C</strong> \uFF0C<code>i</code> \u662F\u4E0D\u53EF\u53D8\u7684</li><li>\u8868\u8FBE\u5F0F <code>i**2</code> \u662F\u60F0\u6027\u8BA1\u7B97\u7684\uFF0C\u8C03\u7528 <code>list()</code> \u65F6\u8BA1\u7B97 <code>lf1 = (i**2 for i in l)</code> \u6B64\u65F6 <code>l</code> \u91CD\u65B0\u8D4B\u503C\u5E76\u4E0D\u5F71\u54CD <code>i</code> \u7684\u503C\uFF0C\u4F9D\u7136\u672A\u53D1\u751F\u6539\u53D8</li></ul><p>\u4F46\u751F\u6210\u5668\u8868\u8FBE\u5F0F\u7684\u5C0F\u62EC\u53F7\u5F00\u5934\u7684\u8868\u8FBE\u5F0F\u662F <strong>\u60F0\u6027\u8BA1\u7B97</strong> \u7684</p><ul><li>\u95ED\u5305\u7684 <code>i</code> \u53D8\u91CF\u5B58\u7684\u662F <code>[0, 1]</code> \u4E2D\u7684\u503C\uFF0C\u8868\u8FBE\u5F0F <code>l[i]</code> \u540C\u4E0A\u662F\u60F0\u6027\u8BA1\u7B97\uFF0C\u4F46 <code>l[i]</code> \u7684 <code>l</code> \u5374\u662F\u5217\u8868\uFF0C\u662F\u53EF\u53D8\u7684\uFF0C</li><li>\u5728\u6267\u884C <code>print(list(lf2))</code> \u8C03\u7528 <code>list()</code> \u8BA1\u7B97 <code>l_f2 = (l[i] for i in range(2))</code> \u4E4B\u524D\uFF0C<code>l</code> \u88AB\u91CD\u65B0\u8D4B\u503C\uFF0C\u53D1\u751F\u4E86\u6539\u53D8</li></ul><p>\u51FD\u6570\u5F0F\u7F16\u7A0B\u8981\u5F3A\u8C03 <strong>immutable</strong>\uFF08<em>\u4E0D\u53EF\u53D8</em> \uFF09</p><pre><code>\u3010\u7279\u70B9\u3011\uFF1A
    1.\u901A\u8FC7yield\u66FF\u6362\u8FED\u4EE3\u5668\u4E24\u4E2A\u65B9\u6CD5\u5E76\u6709\u4E2D\u65AD\u529F\u80FD    \u2014\u2014  \u9010\u4E2A\u4F20\u51FA\u6570\u636E
    2.\u6570\u636E\u9700\u8981\u7684\u65F6\u5019\u624D\u5B58\u50A8\u5230\u5185\u5B58\u4E2D               \u2014\u2014  \u9010\u4E2A\u4F20\u5165\u6570\u636E

yield:(\u6700\u91CD\u8981\u7684\u610F\u4E49\u5728\u4E8E\u534F\u7A0B(\u8DDF\u7EBF\u7A0B\u8FDB\u7A0B\u5E76\u5217\u7684))  \u6307\u7684\u662Fyield\u65AD\u5C42(\u6BCF\u6B21\u6267\u884C\u540E\u7684\u4FDD\u5B58\u72B6\u6001)
\u5982\u679C\u4E00\u4E2A\u51FD\u6570\u5305\u542Byield \u90A3\u4E48\u5B83\u5C31\u4E0D\u662F\u4E00\u4E2A\u666E\u901A\u7684\u51FD\u6570\u800C\u662F\u4E00\u4E2Agenerator\uFF08\u751F\u6210\u5668\uFF09 --\u89C1fibo \u5305\u542B\u8B66\u544A\u90E8\u5206
    def foo():
        yield n #\u8FD9\u6837\u4FBF\u521B\u5EFA\u4E86\u4E00\u4E2A\u751F\u6210\u5668
    foo()\u4FBF\u662F\u4E00\u4E2A\u751F\u6210\u5668\u5BF9\u8C61 \u65E0\u8BBA\u51FD\u6570\u5185\u90E8\u6709\u4EC0\u4E48 \u53EA\u662F\u653E\u5728\u5185\u5B58\u4E2D \u90FD\u4E0D\u4F1A\u6267\u884C\u3002\u5F53\u7136foo\u8FD8\u662F\u4E00\u4E2A\u51FD\u6570\u4F46foo()\u5C31\u662F\u751F\u6210\u5668\u4E86

    def foo():
        print(&quot;ok&quot;);yield 3;
        print(&quot;ok2&quot;);yield 1;#\u65AD\u70B9\u6D4B\u8BD5\u540E\u65E0\u8BBAyield\u540E\u8FD4\u56DE\u4EC0\u4E48\u503C \u90FD\u80FD\u6839\u636Enext()\u8FDB\u884C\u8BB0\u5F55\u4E0A\u4E00\u6D4B\u7A0B\u5E8F\u8FDB\u5165\u65F6\u7684\u4F4D\u7F6E
    for i in foo():
        print(i)\u6B64\u65F6\u4F1A\u628A\u8FD4\u56DE\u503C\u4E5F\u4E00\u8D77\u6253\u5370\u51FA\u6765 \u5229\u7528next()\u65F6\u8FD4\u56DE\u503C\u5B9E\u8D28\u4E0A\u8FD4\u56DE\u7ED9\u4E86next

\u4EC0\u4E48\u662F\u53EF\u8FED\u4EE3\u5BF9\u8C61:
    \u73B0\u8C61:
        \u4ECE\u73B0\u8C61\u4E0A\u770B\u80FD\u8FDB\u884Cfor\u5FAA\u73AF\u7684\u4FBF\u662F\u53EF\u8FED\u4EE3\u5BF9\u8C61
    \u672C\u8D28:
        \u4ECE\u672C\u8D28\u4E0A\u6765\u8BF4 \u5185\u90E8\u6709iter\u65B9\u6CD5\u7684\u624D\u662F\u53EF\u8FED\u4EE3\u5BF9\u8C61.__iter__()


\u4EC0\u4E48\u53EB\u540C\u65F6:
    before, after =after, before + after \u5F53\u78B0\u5230\u8FD9\u79CD\u60C5\u51B5\u5148\u60F3\u60F3\u4EC0\u4E48\u53EB\u540C\u65F6?
    \u540C\u65F6\u4E5F\u53EF\u4EE5\u8BF4\u662F\u5E76\u884C\u5416
    \u4EC0\u4E48\u53EB\u5E76\u884C\uFF1F(\u4E00\u4E2ACPU,\u5355\u6838)
        \u4F60\u60F3\u8BA9before = after after = before + after \u8FD9\u4E24\u4EF6\u4E8B\u540C\u65F6\u5E72 \u90A3\u4E48\u662F\u8C01\u5728\u5E72\u6D3B?-----CPU\u5728\u5E72\u6D3B
        \u4F46\u76EE\u524D\u5B66\u7684\u90FD\u662F\u5355\u7EBF\u7A0B \u4E00\u4E2A\u6838\u5728\u5E72\u6D3B(\u56E0\u6B64\u5B83\u80FD\u4E0D\u80FD\u8FBE\u5230\u540C\u65F6)\u5B83\u8FBE\u4E0D\u5230\u540C\u65F6
        \u6240\u4EE5\u626F\u6DE1\u554A,\u600E\u4E48\u4F1A\u6709\u540C\u65F6\u6267\u884C \u5355\u6838\u54EA\u91CC\u80FD\u540C\u65F6(\u9876\u591A\u5206\u7247\u8F6E\u8BE2 \u4F46\u90A3\u90A3\u662F\u540C\u65F6\u554A)
    \u56E0\u6B64\u6CA1\u5B66\u7EBF\u7A0B\u4E4B\u524D \u80AF\u5B9A\u4E0D\u4F1A\u6D89\u53CA\u5230\u5E76\u53D1 (\u56E0\u6B64\u5355\u6838\u7EDD\u65E0\u540C\u65F6\u7684\u6982\u5FF5)

\u90A3\u4E48\u5982\u4E0A\u662F\u4E2A\u4EC0\u4E48\u64CD\u4F5C?
    \u662F\u8FD9\u6837,\u4F8B\u5982
    before = 1;after = 2
    before,after = after, before + after \u5B9E\u8D28\u4E0A\u662F\u5148\u628A\u5B83\u4EEC\u8FDB\u884C\u8BA1\u7B97\u51FA\u6765 \u4E5F\u5C31\u662F
    before,after = 2, 3 \u7136\u540E\u518D\u8FDB\u884C\u8D4B\u503C \u4E5F\u5C31\u662F\u8BF4\u662F\u5148\u6267\u884C\u53F3\u8FB9

\u8BB0\u5F97\u4E0A\u6B21\u7406\u89E3\u539F\u7406\u662F\u7684\u4E00\u4E9B\u611F\u609F\u5417?(\u4E0D\u662F\u6807\u7B7E\u54E6 \u867D\u7136\u6587\u6848\u4E0A\u5E76\u6CA1\u5199--\u53BB\u597D\u597D\u56DE\u987E\u5427)
    \u5F97\u51FA\u7684\u7ED3\u8BBA\u5C31\u662F \u8868\u8FBE\u5F0F\u8D4B\u503C\u90FD\u662F\u5148\u6267\u884C\u53F3\u8FB9\u7684(\u636E\u4E0A\u786E\u5B9A) \u7136\u540E\u624D\u4F1A\u8D4B\u503C\u7ED9\u5DE6\u8FB9
    \u53F3\u8FB9\u7684\u8868\u8FBE\u5F0F\u8BA1\u7B97\u51FA\u7684\u7ED3\u679C\u624D\u4F1A\u628A\u7ED3\u679C\u7684\u5730\u5740\u6307\u9488\u8D4B\u7ED9\u5DE6\u8FB9\u7684\u6807\u7B7E \u56E0\u6B64\u5982\u4E0A

\u751F\u6210\u5668.send():(\u548Cnext\u4E00\u6837\u90FD\u53EF\u4EE5\u8FDB\u5165\u51FD\u6570\u4F53)
    \u5F53\u7B2C\u4E00\u6B21send \u524D\u9762\u6CA1\u6709next \u53EA\u80FD\u53D1\u9001\u7A7A\u6570\u636E
    \u751F\u6210\u5668.send(None) \u7B49\u540C\u4E8Enext(\u751F\u6210\u5668)
    \u4E4B\u540E\u53D8\u53EF\u4EE5\u4F20\u503C \u751F\u6210\u5668.send(value)
    \u9996\u5148value \u53EF\u4EE5\u8BBE\u7F6E\u53D8\u91CF\u5229\u7528yield\u8D4B\u503C\u6765\u63A5\u6536

    \u7A0B\u5E8F\u662F\u5982\u4F55\u6267\u884C\u7684:
        \u5148.send(None) \u5728count=yield 1\u5904 \u5148\u6267\u884C\u53F3\u8FB9\u8868\u8FBE\u5F0F yield 1 \u76F4\u63A5\u8FD4\u56DE(\u51BB\u7ED3\u8BB0\u5F55) \u7136\u540E.send(&quot;hhh&quot;)
        count\u4ECE\u4E0A\u6B21\u51BB\u7ED3\u5730yield\u63A5\u6536&quot;hhh&quot; \u6B64\u65F6count \u4FBF\u4E5F\u5728\u5185\u5B58\u4E2D\u4F9B\u540E\u7EED\u8C03\u7528\u3002\u4E4B\u540E\u5230yield\u65F6 .send(&quot;&quot;)\u63A5\u6536\u5230\u4E86yield
        \u7684\u8FD4\u56DE\u503C
    \u4E3A\u4EC0\u4E48\u751F\u6210\u5668\u7B2C\u4E00\u6B21\u4E0D\u80FD\u4F20\u503C?
        \u5047\u8BBE\u7528next(g)\u6267\u884C \u8D70\u5230yield 1\u6B64\u65F6\u7A0B\u5E8F\u51BB\u7ED3\u3002\u4E0B\u4E00\u6B21\u4FBF\u53EF\u4EE5\u5229\u7528send\u4F20\u503C\u7ED9yield 1 \u5E76\u7528count\u63A5\u6536
        \u7B2C\u4E00\u6B21\u5C31\u4F20\u503C\u7684\u8BDD\u751F\u6210\u5668\u6CA1\u6709\u529E\u6CD5\u63A5\u6536 \u56E0\u4E3A\u4E4B\u524D\u5E76\u6CA1\u6709yield\u8BB0\u5F55
    \u7528\u9014:
        \u6709\u65F6\u7A0B\u5E8F\u662F\u9700\u8981\u8FDB\u884C\u4EA4\u4E92\u7684 \u9700\u8981\u8C03\u7528\u5B83\u7684\u65F6\u5019\u7ED9\u4E00\u4E9B\u53C2\u6570 \u8FD9\u662F\u5229\u7528send\u4F20\u503C\u4FBF\u53EF\u4EE5\u503C\u5BFC\u5165

\u53EF\u63A7\u5236\u6027:
    \u666E\u901A\u51FD\u6570\u6267\u884C\u5B8C\u4FBF\u7ED3\u675F\u4E86,\u4F46\u751F\u6210\u5668\u4E0D\u4E00\u6837 \u4EC0\u4E48\u65F6\u5019\u60F3\u8C03\u7528\u5C31\u518D\u6B21next\u4E00\u4E0B \u4FBF\u53EF\u4EE5\u8BA1\u7B97\u4E0B\u4E00\u4E2A\u503C
</code></pre><p>5.1 \u751F\u6210\u5668\u4F2A\u5E76\u53D1: \u8BBA\u5355\u6838\u5982\u4F55\u5B9E\u73B0(\u4F2A\u7269)\u5E76\u53D1: \u6BD4\u5982\u540C\u65F6\u542C\u6B4C\u548C\u770B\u7535\u5F71 CPU \u8F6E\u8BE2\u5207\u6362\u6267\u884C(\u4E8B\u5B9E\u4E0A\u5C31\u662F\u5148\u770B\u4E00\u6BB5\u7535\u5F71\u5728\u6267\u884C\u4E00\u6BB5\u97F3\u4E50)\u53EA\u662F\u7531\u4E8E CPU \u5207\u6362\u5B9E\u5728\u662F\u592A\u5FEB\u4E86 0.0...0 \u51E0\u79D2 \u56E0\u6B64\u611F\u5B98\u4E0A\u611F\u89C9\u662F\u5728&quot;\u540C\u65F6&quot;\u6267\u884C \u6216\u662F&quot;\u5E76\u53D1&quot;\u7684\u3002(\u4EBA\u773C\u5904\u7406 == \u5F53\u6BCF\u79D2\u5E27\u6570&lt;24 \u5F53\u79D2\u901F\u8D85\u8FC7 24 \u65F6 \u4FBF\u610F\u8BC6\u4E3A\u8FDE\u7EED) \u6240\u4EE5\u662F(\u4F2A)\u6709\u5148\u540E\u7684 \u771F\u6B63\u7684\u5E76\u53D1\u8FD8\u662F\u8981\u6709\u591A\u6838\u591A\u4E2A\u7EBF\u7A0B\u540C\u65F6\u6267\u884C \u4E0B\u9762\u662F\u4E00\u4E2A\u5B98\u65B9\u66F4\u65B0\u7684\u540C\u65F6\u6A21\u62DF\u591A\u4E2A\u7528\u6237\u5728\u7EBF\u770B\u7684\u4F2A\u5E76\u53D1(\u611F\u89C9\u662F\u540C\u65F6\u53D1\u751F\u7684\u5176\u5B9E\u4E0D\u662F) import time</p><pre><code>def consumer(name):
    print(&quot;%s \u51C6\u5907\u770B\u756A\u5566&quot; % name)
    while True:
        animate = yield

        print(&quot;\u65B0\u756A\u7B2C[%s]\u96C6\u51FA\u6765\u5566, [%s]\u70B9\u8FDB\u53BB\u770B\u4E86\u770B\uFF01&quot; % (animate, name))

def producer(name):
    c = consumer(&quot;\u5C0F\u767D&quot;)
    c2 = consumer(&quot;\u5C0F\u660E&quot;)#\u4E24\u4E2A\u751F\u6210\u5668\u5BF9\u8C61
    c.__next__()#\u5728\u8FD9\u91CC\u8FD4\u56DE\u4E4B\u524D\u6253\u5370\u4E86 \u5C0F\u767D\u51C6\u5907\u770B\u756A\u5566
    c2.__next__()#\u5728\u8FD9\u91CC\u6267\u884C
    print(&quot;%s\u51C6\u5907\u53D1\u5E03\u65B0\u756A&quot; % name)
    for i in range(1,13):
        time.sleep(1)
        print(&quot;%s\u66F4\u65B0\u4E86\u4E00\u96C6&quot; % name)
        c.send(i)
        c2.send(i)

producer(&quot;\u5B98\u65B9&quot;)

\u8FD9\u91CCc \u548Cc2 \u5B9E\u9645\u4E0A\u662F\u62FF\u5230\u4E86\u4E24\u4E2A\u751F\u6210\u5668\u5BF9\u8C61
\u7B2C\u4E00\u6B21\u6267\u884C__next__()\u65F6\u5148\u662F\u5230\u4E86yield (\u7528next \u548C send(None)\u540C)\u8FDB\u884C\u8FD4\u56DE
\u4E4B\u540E\u751F\u4EA7\u8005\u8FDB\u884C\u751F\u4EA7(\u4E5F\u5C31\u662F\u6253\u5370\u7B49\u4E00\u7CFB\u5217\u64CD\u4F5C)\u4E4B\u540E\u8C03\u7528\u6D88\u8D39\u8005.send()
\u5FAA\u73AF\u8C03\u7528\u6D88\u8D39\u8005 \u6BCF\u6B21\u5FAA\u73AF\u8C03\u7528\u4E24\u4E2A\u751F\u6210\u5668\u5BF9\u8C61
\u7B2C\u4E00\u6B21\u65F6\u6D88\u8D39\u80051 \u4ECEyield\u5F00\u59CB \u628A\u4F20\u5165\u7684i\u5BF9animate\u8D4B\u503C \u6D88\u8D39\u80052 \u4E5F\u4ECE\u4E0A\u6B21\u4E2D\u65AD\u7684yield\u5F00\u59CB \u540C\u65F6\u8D4B\u503C
\u8FD9\u91CC\u8981\u53E6\u8C08\u7684\u662F: c \u548C c2 \u8FD9\u4E24\u4E2A\u751F\u6210\u5668\u5206\u522B\u662F\u5728\u5185\u5B58\u4E2D\u751F\u6210\u4E24\u4E2A\u5730\u5740\u6BB5(\u5B83\u4EEC\u662F\u4E0D\u540C\u7684)\u6BCF\u6B21\u5206\u522B\u8C03\u7528\u65F6 \u5404\u81EA\u7684\u751F\u6210\u5668\u90FD\u4F1A
\u8BB0\u5F55\u4E0B\u81EA\u5DF1\u4E0A\u6B21\u8FD4\u56DE\u7684yield

\u4E4B\u6240\u4EE5\u548C\u4E4B\u524D\u7684\u770B\u4E0A\u53BB\u4E00\u6B21\u6B21next()\u4E0D\u540C,\u65E0\u975E\u5C31\u662F\u5229\u7528\u4E86\u5FAA\u73AF\u52A0yield
\u6709\u70B9\u7C7B\u4F3C\u534F\u4F5C\u5F0F\u7684\u534F\u7A0B \u800C\u4E0D\u662F\u50CF\u62A2\u5360\u5F0F\u7684\u7EBF\u7A0B
</code></pre><h3 id="yield-from" tabindex="-1"><a class="header-anchor" href="#yield-from" aria-hidden="true">#</a> yield from</h3><h4 id="yield-from-\u548C-yield-\u7684\u533A\u522B" tabindex="-1"><a class="header-anchor" href="#yield-from-\u548C-yield-\u7684\u533A\u522B" aria-hidden="true">#</a> yield from \u548C yield \u7684\u533A\u522B\uFF1A</h4><ul><li><p>\u7B80\u5316\u4E86 yield \u7684\u64CD\u4F5C:</p><div class="language-python ext-py line-numbers-mode"><pre class="language-python"><code><span class="token keyword">for</span> i <span class="token keyword">in</span> titles<span class="token punctuation">:</span>    \u7B49\u4EF7\u4E8E  <span class="token keyword">yield</span> <span class="token keyword">from</span> titles
    <span class="token keyword">yield</span> title
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>\u7701\u53BB\u4E86\u5F88\u591A\u5F02\u5E38\u7684\u5904\u7406:</p><blockquote><p>\u4F8B\u5982<code>send(None)</code> \u4E0D\u4F1A\u62A5\u9519\u7B49</p></blockquote></li><li><p>\u5EFA\u7ACB\u8C03\u7528\u65B9\u548C\u5B50\u751F\u6210\u5668\u7684\u901A\u9053</p></li></ul><div class="language-python ext-py line-numbers-mode"><pre class="language-python"><code><span class="token keyword">def</span> <span class="token function">generator_1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    total <span class="token operator">=</span> <span class="token number">0</span>
    <span class="token keyword">while</span> <span class="token boolean">True</span><span class="token punctuation">:</span>
        x <span class="token operator">=</span> <span class="token keyword">yield</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;\u52A0&#39;</span><span class="token punctuation">,</span> x<span class="token punctuation">)</span>
        <span class="token keyword">if</span> <span class="token keyword">not</span> x<span class="token punctuation">:</span>
            <span class="token keyword">break</span>
        total <span class="token operator">+=</span> x
    <span class="token keyword">return</span> total


<span class="token keyword">def</span> <span class="token function">generator_2</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>  <span class="token comment"># \u59D4\u6258\u751F\u6210\u5668</span>
    <span class="token keyword">while</span> <span class="token boolean">True</span><span class="token punctuation">:</span>
        total <span class="token operator">=</span> <span class="token keyword">yield</span> <span class="token keyword">from</span> generator_1<span class="token punctuation">(</span><span class="token punctuation">)</span>  <span class="token comment"># \u5B50\u751F\u6210\u5668</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;\u52A0\u548C\u603B\u6570\u662F:&#39;</span><span class="token punctuation">,</span> total<span class="token punctuation">)</span>


<span class="token keyword">def</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>  <span class="token comment"># \u8C03\u7528\u65B9</span>
    g1 <span class="token operator">=</span> generator_1<span class="token punctuation">(</span><span class="token punctuation">)</span>
    g1<span class="token punctuation">.</span>send<span class="token punctuation">(</span><span class="token boolean">None</span><span class="token punctuation">)</span>
    g1<span class="token punctuation">.</span>send<span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>
    g1<span class="token punctuation">.</span>send<span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span>
    g1<span class="token punctuation">.</span>send<span class="token punctuation">(</span><span class="token boolean">None</span><span class="token punctuation">)</span>


<span class="token comment"># g2 = generator_2()</span>
<span class="token comment"># g2.send(None)</span>
<span class="token comment"># g2.send(2)</span>
<span class="token comment"># g2.send(3)</span>
<span class="token comment"># g2.send(None)</span>

main<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>\u3010\u5B50\u751F\u6210\u5668\u3011\uFF1Ayield from \u540E\u7684 generator_1()\u751F\u6210\u5668\u51FD\u6570\u662F\u5B50\u751F\u6210\u5668</p></li><li><p>\u3010\u59D4\u6258\u751F\u6210\u5668\u3011\uFF1Agenerator_2()\u662F\u7A0B\u5E8F\u4E2D\u7684\u59D4\u6258\u751F\u6210\u5668\uFF0C\u5B83\u8D1F\u8D23\u59D4\u6258\u5B50\u751F\u6210\u5668\u5B8C\u6210\u5177\u4F53\u4EFB\u52A1\u3002</p></li><li><p>\u3010\u8C03\u7528\u65B9\u3011\uFF1Amain()\u662F\u7A0B\u5E8F\u4E2D\u7684\u8C03\u7528\u65B9\uFF0C\u8D1F\u8D23\u8C03\u7528\u59D4\u6258\u751F\u6210\u5668\u3002</p><ul><li>\u5728\u4E0A\u8FF0\u4EE3\u7801\u4E2D main()\u6BCF\u4E00\u6B21\u5728\u8C03\u7528 send(value)\u65F6\uFF0Cvalue \u4E0D\u662F\u4F20\u9012\u7ED9\u4E86\u59D4\u6258\u751F\u6210\u5668 generator_2()\uFF0C\u800C\u662F\u501F\u52A9 yield from \u4F20\u9012\u7ED9\u4E86\u5B50\u751F\u6210\u5668 generator_1()\u4E2D\u7684 yield</li><li>\u540C\u7406\uFF0C\u5B50\u751F\u6210\u5668\u4E2D\u7684\u6570\u636E\u4E5F\u662F\u901A\u8FC7 yield \u76F4\u63A5\u53D1\u9001\u5230\u8C03\u7528\u65B9 main()\u4E2D\u3002</li></ul></li></ul><img src="`+u+'">',25);function v(b,y){const a=d("RouterLink");return t(),o("div",null,[s("p",null,[n("\u6240\u6709\u7684\u751F\u6210\u5668\u90FD\u662F "),p(a,{to:"/python/%E8%AF%AD%E8%A8%80/%E8%BF%9B%E9%98%B6/%E8%BF%AD%E4%BB%A3%E5%99%A8.html"},{default:i(()=>[n("\u8FED\u4EE3\u5668")]),_:1}),n("\uFF0C\u56E0\u4E3A\u751F\u6210\u5668 "),k,n(" \u4E86\u8FED\u4EE3\u5668\u63A5\u53E3")]),l(" more "),m])}const _=e(r,[["render",v],["__file","\u751F\u6210\u5668.html.vue"]]);export{_ as default};
