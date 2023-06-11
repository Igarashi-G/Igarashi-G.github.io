import{_ as i}from"./plugin-vueexport-helper.2444895f.js";import{o as t,c as l,e as c,a as n,b as s,d as a,f as p,r as d}from"./app.28701975.js";const r="/assets/CPython_Int\u5BF9\u8C61.7f288806.png",o={},u=n("p",null,[n("strong",null,"Cpython"),s(" \u7684\u5BF9\u8C61")],-1),v=p(`<h2 id="_1-python-\u5BF9\u8C61\u5B9E\u73B0\u673A\u5236" tabindex="-1"><a class="header-anchor" href="#_1-python-\u5BF9\u8C61\u5B9E\u73B0\u673A\u5236" aria-hidden="true">#</a> 1. Python \u5BF9\u8C61\u5B9E\u73B0\u673A\u5236</h2><p>\u5728\u9876\u5C42\u62BD\u8C61\u4E0A\uFF0C<strong>python</strong> \u5BF9\u8C61\u662F\u5C5E\u6027\u3001\u65B9\u6CD5\u3001\u4F5C\u7528\u57DF\u7684\u96C6\u5408</p><p>\u5728\u5E95\u5C42\u5B9E\u73B0\u4E0A\uFF0C<strong>python</strong> \u5BF9\u8C61\u4E0D\u8FC7\u5C31\u662F\u5BF9 <strong>C</strong> \u8BED\u8A00 <strong>struct</strong> \u7ED3\u6784\u7684\u5C01\u88C5</p><h3 id="_1-1-cpython-\u7ED3\u6784\u4F53" tabindex="-1"><a class="header-anchor" href="#_1-1-cpython-\u7ED3\u6784\u4F53" aria-hidden="true">#</a> 1.1 CPython \u7ED3\u6784\u4F53</h3><p>\u4E00\u4E2A <strong>python</strong> \u7684 <strong>int</strong> \u7C7B\u578B\u53EF\u5199\u6210\u5982\u4E0B\u5F62\u5F0F</p><div class="language-python ext-py line-numbers-mode"><pre class="language-python"><code><span class="token keyword">class</span> <span class="token class-name">python_int</span><span class="token punctuation">(</span><span class="token builtin">object</span><span class="token punctuation">)</span><span class="token punctuation">:</span>

    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> value<span class="token punctuation">)</span><span class="token punctuation">:</span>
        self<span class="token punctuation">.</span>value <span class="token operator">=</span> value

    <span class="token keyword">def</span> <span class="token function">add_fun</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> num<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">return</span> self<span class="token punctuation">.</span>value <span class="token operator">+</span> num

    <span class="token keyword">def</span> <span class="token function">mul_fun</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> num<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">return</span> self<span class="token punctuation">.</span>value <span class="token operator">*</span> num

    <span class="token keyword">def</span> <span class="token function">equal_fun</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">pass</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>python</strong> \u5BF9\u5E94 <strong>C</strong> \u7684\u7ED3\u6784\u4F53\u5982\u4E0B</p><div class="language-c ext-c line-numbers-mode"><pre class="language-c"><code><span class="token keyword">typedef</span> <span class="token keyword">struct</span> <span class="token class-name">_int</span> <span class="token punctuation">{</span>
    <span class="token keyword">long</span> value<span class="token punctuation">;</span>
    <span class="token keyword">long</span> <span class="token punctuation">(</span><span class="token operator">*</span>add_fun<span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token keyword">long</span> a<span class="token punctuation">,</span> <span class="token keyword">long</span> b<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">long</span> <span class="token punctuation">(</span><span class="token operator">*</span>mul_fun<span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token keyword">long</span> a<span class="token punctuation">,</span> <span class="token keyword">long</span> b<span class="token punctuation">)</span><span class="token punctuation">;</span>
    \`\`\`
<span class="token punctuation">}</span>Int_object<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>C</strong> \u8BED\u8A00\u901A\u8FC7\u5229\u7528\u7ED3\u6784\u4F53 <strong>struct</strong> \u548C\u51FD\u6570\u6307\u9488\uFF0C\u5373\u5B8C\u6210\u4E86\u5BF9\u8C61\u7684\u6A21\u62DF\uFF0C\u5C3D\u7BA1\u529E\u6CD5\u5F88 <code>\u2018\u571F\u2019</code>\uFF0C\u4F46\u5DF2\u521D\u7AA5\u95E8\u5F84</p><p>\u5BF9\u8C61\u5373\u662F <strong>struct</strong> \u7684\u5C01\u88C5\uFF0C\u5982\u6B64\u601D\u60F3\u53EF\u52A9\u4E8E\u7406\u89E3\u5F88\u591A <strong>python</strong> \u4E2D\u96BE\u4EE5\u7406\u89E3\u7684\u95EE\u9898</p><h3 id="_1-2-\u89E3\u51B3\u95EE\u9898" tabindex="-1"><a class="header-anchor" href="#_1-2-\u89E3\u51B3\u95EE\u9898" aria-hidden="true">#</a> 1.2 \u89E3\u51B3\u95EE\u9898</h3><p>\u5982\u4E0A\u793A\u4F8B\uFF0C\u5B9E\u73B0\u4E00\u4E2A <strong>python</strong> \u4E2D\u7684 <strong>int</strong> \u7C7B\u578B\u5BF9\u8C61\uFF0C\u9700\u8981\u4E00\u4E2A\u975E\u5E38\u5927\u7684 <strong>struct</strong> \u6765\u88C5\u4E0B <strong>int</strong> \u7684\u503C\u548C\u53EF\u4EE5\u4F5C\u7528\u4E8E\u8BE5\u5BF9\u8C61\u7684\u6240\u6709\u65B9\u6CD5\uFF0C\u4F46\u662F\uFF0C<strong>\u592A\u6D6A\u8D39\u7A7A\u95F4\u4E86</strong>\uFF08<em><strong>python</strong> \u4E00\u5207\u7686\u5BF9\u8C61\uFF0C\u90A3\u4E48\u6BCF\u6B21 <strong>new</strong> \u5BF9\u8C61\u5C31\u8981\u5B9E\u73B0\u4E00\u4E2A\u7ED3\u6784\u4F53\uFF0C\u8FC7\u4E8E\u6D6A\u8D39\u7A7A\u95F4\u4E86</em> \uFF09</p><p><strong>C</strong> \u8BED\u8A00\u4E2D\uFF0C\u51FD\u6570\u6307\u9488\u7684\u8FD4\u56DE\u503C\u7C7B\u578B\u3001\u53C2\u6570\u7C7B\u578B\u90FD\u9700\u8981\u4E8B\u5148\u58F0\u660E\uFF0C\u4F46\u5728 <strong>python</strong> \u4E2D\u65E0\u8BBA\u4F20\u5165\u4EC0\u4E48\u7C7B\u578B\u90FD\u4E0D\u9700\u8981\u58F0\u660E</p><div class="language-python ext-py line-numbers-mode"><pre class="language-python"><code><span class="token keyword">print</span><span class="token punctuation">(</span><span class="token builtin">str</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token builtin">str</span><span class="token punctuation">(</span><span class="token string">&quot;3&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment"># \u5176\u5B9E\u7ED3\u679C\u4E0A\u662F\u5B8C\u5168\u4E00\u81F4\u7684</span>
<span class="token comment"># True</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-\u7ED3\u6784\u4F53\u7A7A\u95F4\u95EE\u9898" tabindex="-1"><a class="header-anchor" href="#_1-\u7ED3\u6784\u4F53\u7A7A\u95F4\u95EE\u9898" aria-hidden="true">#</a> 1.\u7ED3\u6784\u4F53\u7A7A\u95F4\u95EE\u9898</h3><p>python \u76F8\u540C\u7684 \u5185\u5EFA\u7C7B\u578B \u5BF9\u5E94\u7684\u65B9\u6CD5\u90FD\u662F\u4E00\u6837\u7684\u3002\u501F\u9274\u8BBE\u8BA1\u6A21\u5F0F\u7684\u601D\u60F3\uFF0C\u628A\u7C7B\u578B\u7684\u503C\u4E0E\u7C7B\u578B\u6240\u62E5\u6709\u7684\u65B9\u6CD5\u5206\u5F00\u7EF4\u62A4\uFF0C\u6240\u6709 \u76F8\u540C\u7684\u7C7B\u578B\u5BF9\u8C61 \u6307\u5411\u4E00\u4E2A \u5171\u540C\u7684\u65B9\u6CD5 struct \u7ED3\u6784\uFF0C\u8FD9\u6837\u4E00\u4E2A\u5BF9\u8C61\u5C31\u53EF\u4EE5\u88AB\u538B\u7F29\u5230\u5F88\u5C0F\u4E86\u3002</p><p>\u4EE3\u7801\u53CA\u56FE\u793A\u5982\u4E0B</p><div class="language-c ext-c line-numbers-mode"><pre class="language-c"><code><span class="token keyword">typedef</span> <span class="token keyword">struct</span> <span class="token class-name">_int</span><span class="token punctuation">{</span>    # \u4EE3\u8868\u4E0B\u6587\u6BCF\u4E2A\u5BF9\u8C61
<span class="token keyword">long</span> value<span class="token punctuation">;</span>
strcut _int_methods <span class="token operator">*</span>methods<span class="token punctuation">;</span>
<span class="token punctuation">}</span> PyInt_Object<span class="token punctuation">;</span>

<span class="token keyword">typedef</span> <span class="token keyword">struct</span> <span class="token class-name">_int_methods</span><span class="token punctuation">{</span>    # \u4EE3\u8868\u4E0B\u6587\u65B9\u6CD5\u65CF
    <span class="token keyword">long</span> <span class="token punctuation">(</span><span class="token operator">*</span>add_fun<span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token keyword">long</span> a<span class="token punctuation">,</span> <span class="token keyword">long</span> b<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">long</span> <span class="token punctuation">(</span><span class="token operator">*</span>mul_fun<span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token keyword">long</span> a<span class="token punctuation">,</span> <span class="token keyword">long</span> b<span class="token punctuation">)</span><span class="token punctuation">;</span>
    \`\`\`
<span class="token punctuation">}</span>Int_methods<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><img src="`+r+`"><pre><code>int\u5BF9\u8C611 \u2014\u2014\u2014\u2014
            |\u2014\u2014\u2014\u2014\u2014\u2014int\u5BF9\u8C61\u65B9\u6CD5\u65CF
int\u5BF9\u8C612 \u2014\u2014\u2014\u2014
</code></pre><h3 id="_2-python-\u6570\u636E\u5BF9\u8C61\u7684\u6838\u5FC3\u57FA\u77F3" tabindex="-1"><a class="header-anchor" href="#_2-python-\u6570\u636E\u5BF9\u8C61\u7684\u6838\u5FC3\u57FA\u77F3" aria-hidden="true">#</a> 2.python \u6570\u636E\u5BF9\u8C61\u7684\u6838\u5FC3\u57FA\u77F3</h3><p>\u65B9\u6848\u662F\uFF0C\u5728 python \u7684\u6240\u6709\u7684\u7C7B\u578B\u5BF9\u8C61\u4E2D\u90FD\u6709\u7C7B\u578B\u4E00\u4E2A\u7C7B\u578B\u5C5E\u6027 type \uFF0Cpython \u6B63\u662F\u9760\u7740\u8FD9\u4E2A\u5C5E\u6027\u6B63\u786E\u5730\u533A\u5206\u5B83\u4EEC\uFF0C\u5728 python \u4E2D\uFF0C\u53EF\u4EE5\u7528 type \u51FD\u6570\u6253\u5370 \u4ED6\u4EEC\u3002</p><div class="language-C ext-C line-numbers-mode"><pre class="language-C"><code>print(type(1))
print(type(type(1)))
&lt;class &#39;int&#39;&gt;
&lt;class &#39;type&#39;&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u4F60\u731C\u7684\u6CA1\u9519\uFF0Ctype \u672C\u8EAB\u4E5F\u662F\u4E00\u4E2A python \u5BF9\u8C61\uFF0C\u6216\u8005\u8BF4\uFF0C\u4E5F\u662F\u4E00\u4E2A\u5C01\u88C5\u7684 struct\u3002 \u65E2\u7136\u6240\u6709\u76F8\u540C\u7C7B\u578B\u7684\u5BF9\u8C61\u90FD\u5177\u6709\u5171\u540C\u7684\u65B9\u6CD5\uFF0C\u90A3\u4E48\u628A type \u5C5E\u6027 \u4E0E\u65B9\u6CD5\u4EEC\u5C01\u88C5\u5230\u4E00\u4E2A struct \u4E2D\u4E5F\u5C31\u662F\u4E00\u4E2A\u5F88\u81EA\u7136\u7684\u60F3\u6CD5\u4E86\u3002 \u4E8B\u5B9E\u4E0A\uFF0Cpython \u4E5F\u6B63\u662F\u8FD9\u4E48\u505A\u7684\u3002</p><p>\u800C\u5728 python \u4E16\u754C\u4E2D\uFF0C\u5BF9\u8C61\u4EEC\u9664\u4E86\u2018\u6211\u662F\u8C01\u2019\uFF08type\uFF09\u8FD9\u4E2A\u95EE\u9898\u4E4B\u5916\uFF0C\u8FD8\u6709\u53E6\u4E00\u4E2A\u66F4\u91CD\u8981\u7684\u95EE\u9898\u7B49\u7740\u4ED6\u4EEC\u3002</p><p>\u2018\u6211\u8FD8\u6D3B\u7740\u5417\uFF1F\u2019</p><h4 id="\u884D\u751F-\u5783\u573E\u56DE\u6536" tabindex="-1"><a class="header-anchor" href="#\u884D\u751F-\u5783\u573E\u56DE\u6536" aria-hidden="true">#</a> \u884D\u751F\uFF1A\u5783\u573E\u56DE\u6536</h4><p>\u8FD9\u4E0D\u662F\u641E\u7B11\uFF0C\u4F17\u6240\u5468\u77E5\uFF0Cpython \u5783\u573E\u56DE\u6536\u91C7\u7528\u4E86\u4E00\u4E2A\u7ECF\u5178\u7684\uFF08\u8001\u571F\u7684\uFF09\u8BBE\u8BA1\u65B9\u6CD5--\u5F15\u7528\u8BA1\u6570\u3002(\u89C1 3.2 \u5783\u573E\u56DE\u6536\uFF0C\u5F88\u8001\u571F\u7684\u673A\u5236)</p><p>\u6240\u6709\u7684 python \u5BF9\u8C61\u90FD\u8981\u6709\u4E00\u4E2A\u8BB0\u5F55\u81EA\u5DF1\u5F15\u7528\u8BA1\u6570\u7684\u5C5E\u6027\uFF0Crefcnt\uFF0C \u5F53 refcnt == 0 \u65F6\uFF0C\u610F\u5473\u7740\u6CA1\u6709\u4EFB\u4F55 python \u53D8\u91CF\u5F15\u7528\u8BE5\u5BF9\u8C61\u3002python \u4F1A\u5C06\u8BE5 \u5BF9\u8C61\u9500\u6BC1\uFF0C\u4EE5\u514D\u4ED6\u4EEC\u6210\u4E3A\u65E0\u4E3B\u5E7D\u9B42\uFF08\u5185\u5B58\u6CC4\u6F0F\uFF09\u3002</p><p>python \u4E2D\u6240\u6709\u7684\u5BF9\u8C61\u90FD\u5B9E\u73B0\u4E86\u8FD9\u4E24\u4E2A\u5C5E\u6027 refcnt \u4E0E type\uFF0C\u6362\u53E5\u8BDD\u8BF4\uFF0C\u5B9E\u73B0\u4E86\u8FD9\u4E24\u4E2A\u6210\u5458\u7684 struct \u53D8\u91CF\u90FD\u662F python \u4E2D\u7684\u5BF9\u8C61\u3002\u4EE3\u7801\u5982\u4E0B:</p><div class="language-C ext-C line-numbers-mode"><pre class="language-C"><code>typedef struct _object{
    int ob_refcnt;                        //\u5F15\u7528\u8BA1\u6570
    struct _typeobject *ob_type;         // \u7C7B\u578B\u5BF9\u8C61
}PyObject;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u800C\u4E4B\u524D\u63D0\u5230\u7684\u6574\u6570\u7C7B\u578B PyIntObject \u5B9E\u73B0\u5982\u4E0B:</p><div class="language-C ext-C line-numbers-mode"><pre class="language-C"><code>typedef struct{
    int ob_refcnt;                        //\u5F15\u7528\u8BA1\u6570
    struct _typeobject *ob_type;         // \u7C7B\u578B\u5BF9\u8C61
    long ob_ival\uFF1B                        //int\u5BF9\u8C61\u7EF4\u62A4\u7684\u503C
} PyIntObject\uFF1B
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u53EF\u4EE5\u770B\u5230 python \u4E2D\u6574\u6570\u5BF9\u8C61\u3001PyIntObject \u5C31\u662F\u5728 PyObject \u7684\u57FA\u7840\u4E0A\u7EF4\u62A4\u4E86\u4E00\u4E2A long \u7684\u503C\u3002\uFF08\u5C31\u591A\u4E86\u4E2A int \u5BF9\u8C61\u7EF4\u62A4\u7684\u503C\uFF09</p><p>\u800C\u8FD9\u4E2A PyObject \u662F python \u5BF9\u8C61\u7684\u6838\u5FC3\u57FA\u77F3\uFF0C\u4E5F\u662F python \u6700\u5F3A\u5927\u7684\u9B54\u6CD5\u6765\u6E90\u4E4B\u4E00\u3002</p><p>python \u4E2D\u6240\u6709\u7684\u5BF9\u8C61\u90FD\u6709\u4E00\u4E2A\u8FD9\u6837\u7684 PyObject \u5934\u3002\u8FD9\u6837\u6211\u4EEC\u5C31\u5F88\u597D\u7406\u89E3\uFF0C\u5728 python \u4E2D\uFF0C\u6240\u6709\u7684\u53D8\u91CF\uFF0C\u6240\u6709\u7684\u51FD\u6570\uFF0C\u6240\u6709\u7684\u7C7B\uFF0C\u5176\u5B9E\u90FD\u662F PyObject \u5BF9\u8C61\u3002</p><p>\u800C\u51FD\u6570\u6240\u6709\u7684\u8F93\u5165\u3001\u8F93\u51FA\uFF0C\u90FD\u662F PyObject \u5BF9\u8C61\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\u7684\u6307\u9488\u3002</p><h3 id="\u6211\u4EEC\u6765\u8C08\u8C08\u6307\u9488" tabindex="-1"><a class="header-anchor" href="#\u6211\u4EEC\u6765\u8C08\u8C08\u6307\u9488" aria-hidden="true">#</a> \u6211\u4EEC\u6765\u8C08\u8C08\u6307\u9488\uFF1A</h3><p>\u4E3A\u4EC0\u4E48\u5BF9\u8C61\u7684 struct \u6709\u4E86\u5171\u540C\u7684\u5934\uFF0C\u5C31\u53EF\u4EE5\u4F7F\u7528\u540C\u4E00\u4E2A\u6307\u9488\uFF1F\u5BF9 c \u8BED\u8A00\u4E86\u89E3\u4E0D\u6DF1\u7684\u540C\u5B66\u53EF\u4EE5\u770B\u770B\u6211\u7684\u89E3\u91CA\u3002 \u5728 c \u8BED\u8A00\u4E2D\uFF0C\u6307\u9488\u6709\u7740\u4E09\u4E2A\u4F5C\u7528</p><ul><li><p>\u6307\u9488\u6240\u6307\u5BF9\u8C61\u7684\u4F4D\u7F6E</p></li><li><p>\u6307\u9488\u6240\u6307\u5BF9\u8C61\u7684\u5927\u5C0F</p></li><li><p>\u6307\u9488\u6240\u6307\u5BF9\u8C61\u7684\u89E3\u91CA\u65B9\u6CD5</p></li></ul><p>\u5229\u7528\u4EFB\u4F55 python \u5BF9\u8C61\u7684 PyObject \u7684\u6307\u9488 *p, \u90FD\u53EF\u4EE5\u901A\u8FC7 p-&gt;ob_type \u83B7\u5F97\u5BF9\u8C61\u7684\u7C7B\u578B\u4FE1\u606F\uFF0Cpython \u53EF\u4EE5\u6839\u636E\u8FD9\u4E2A\u66F4\u6362\u6210\u76F8\u5E94\u7684\u6307\u9488\uFF0C\u6BD4\u5982 *PyIntObject\u3002</p><p>python \u7684 type \u7C7B\u578B\u5728\u6E90\u7801\u4E2D\u7684\u5B9A\u4E49\uFF08struct \u7ED3\u6784\u58F0\u660E\uFF09\u5982\u4E0B:</p><p>\u592A\u957F\u4E86\uFF0C\u4F60\u4EEC\u4E0D\u7528\u5168\u90E8\u90FD\u770B(\u02CAo\u0334\u0336\u0337\u0324\u2304o\u0334\u0336\u0337\u0324\u02CB)\u3002</p><div class="language-C ext-C line-numbers-mode"><pre class="language-C"><code>typedef struct _typeobject {
    int ob_refcnt;                        //\u5F15\u7528\u8BA1\u6570
    struct _typeobject *ob_type;          //\u7C7B\u578B\u5BF9\u8C61
    int ob_size;                          //\u53D8\u957F\u5BF9\u8C61\u7684\u957F\u5EA6\uFF0C\u5982len\uFF08list\uFF09\uFF0C len(str), len(dict)\uFF0Cint\u7C7B\u578B\u6CA1\u6709\u8BE5\u5C5E\u6027
    const char *tp_name; /* For printing, in format &quot;&lt;module&gt;.&lt;name&gt;&quot; */   // \u53D8\u91CF\u7684\u7C7B\u578B\u540D\u5B57 \u5982&lt;class &#39;int&#39;&gt;    &lt;class &#39;type&#39;&gt;
    Py_ssize_t tp_basicsize, tp_itemsize; /* For allocation */

    /* Methods to implement standard operations */

    destructor tp_dealloc;
    printfunc tp_print;
    getattrfunc tp_getattr;
    setattrfunc tp_setattr;
    cmpfunc tp_compare;
    reprfunc tp_repr;

    /* Method suites for standard classes */

    PyNumberMethods *tp_as_number;       //\u6570\u5B57\u7C7B\u578B\u65B9\u6CD5\u65CF
    PySequenceMethods *tp_as_sequence;   //\u5E8F\u5217\u7C7B\u578B\u65B9\u6CD5\u65CF
    PyMappingMethods *tp_as_mapping;     //\u6620\u5C04\u7C7B\u578B\u65B9\u6CD5\u65CF

    /* More standard operations (here for binary compatibility) */

    hashfunc tp_hash;
    ternaryfunc tp_call;
    reprfunc tp_str;
    getattrofunc tp_getattro;
    setattrofunc tp_setattro;

    /* Functions to access object as input/output buffer */
    PyBufferProcs *tp_as_buffer;

    /* Flags to define presence of optional/expanded features */
    long tp_flags;

    const char *tp_doc; /* Documentation string */

    /* Assigned meaning in release 2.0 */
    /* call function for all accessible objects */
    traverseproc tp_traverse;

    /* delete references to contained objects */
    inquiry tp_clear;

    /* Assigned meaning in release 2.1 */
    /* rich comparisons */
    richcmpfunc tp_richcompare;

    /* weak reference enabler */
    Py_ssize_t tp_weaklistoffset;

    /* Added in release 2.2 */
    /* Iterators */
    getiterfunc tp_iter;
    iternextfunc tp_iternext;

    /* Attribute descriptor and subclassing stuff */
    struct PyMethodDef *tp_methods;
    struct PyMemberDef *tp_members;
    struct PyGetSetDef *tp_getset;
    struct _typeobject *tp_base;
    PyObject *tp_dict;
    descrgetfunc tp_descr_get;
    descrsetfunc tp_descr_set;
    Py_ssize_t tp_dictoffset;
    initproc tp_init;
    allocfunc tp_alloc;
    newfunc tp_new;
    freefunc tp_free; /* Low-level free-memory routine */
    inquiry tp_is_gc; /* For PyObject_IS_GC */
    PyObject *tp_bases;
    PyObject *tp_mro; /* method resolution order */
    PyObject *tp_cache;
    PyObject *tp_subclasses;
    PyObject *tp_weaklist;
    destructor tp_del;

    /* Type attribute cache version tag. Added in version 2.6 */
    unsigned int tp_version_tag;

#ifdef COUNT_ALLOCS
    /* these must be last and never explicitly initialized */
    Py_ssize_t tp_allocs;
    Py_ssize_t tp_frees;
    Py_ssize_t tp_maxalloc;
    struct _typeobject *tp_prev;
    struct _typeobject *tp_next;
#endif
} PyTypeObject;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8FD9\u4E2A PyTypeObject \u91CC\u58F0\u660E\u4E86\u6240\u6709 python \u5185\u7F6E\u7C7B\u578B\u7684\u65B9\u6CD5\uFF0C\u6240\u6709\u7684\u5185\u7F6E\u7C7B\u578B\u5B9E\u73B0\u7684\u65B9\u6CD5\u90FD\u53EA\u662F\u8BE5\u58F0\u660E\u7684\u4E00\u4E2A\u5B50\u96C6\u3002</p><p>\u5176\u4E2D\u5C24\u5176\u503C\u5F97\u6CE8\u610F\u7684\u662F\u5176\u4E2D\u58F0\u660E\u7684\u4E09\u4E2A\u65B9\u6CD5\u65CF\u6307\u9488</p><div class="language-C ext-C line-numbers-mode"><pre class="language-C"><code>PyNumberMethods *tp_as_number;       //\u6570\u5B57\u7C7B\u578B\u65B9\u6CD5\u65CF
PySequenceMethods *tp_as_sequence;   //\u5E8F\u5217\u7C7B\u578B\u65B9\u6CD5\u65CF
PyMappingMethods *tp_as_mapping;     //\u6620\u5C04\u7C7B\u578B\u65B9\u6CD5\u65CF
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u4ED6\u4EEC\u6BCF\u4E00\u4E2A\u90FD\u4EE3\u8868\u4E86\u8BE5\u7C7B\u578B\u7684\u4E00\u7CFB\u5217\u65B9\u6CD5\u3002 \u8FD9\u4E09\u7C7B\u4E0D\u540C\u7684\u65B9\u6CD5\u65CF\u5C31\u662F python \u7684\u5185\u7F6E\u5BF9\u8C61\u88AB\u5212\u4E3A\u4E09\u5927\u7C7B\u7684\u6839\u672C\u539F\u56E0\uFF0C\u6570\u503C\u7C7B\u578B\u3001\u5E8F\u5217\u7C7B\u578B\u3001\u6620\u5C04\u7C7B\u578B\u3002</p><p>\u6BD4\u5982 PyNumberMethods \u7684\u4EE3\u7801\u5982\u4E0B: (\u4E5F\u662F\u5F88\u957F\u5F88\u957F\xB7\xB7\xB7)</p><div class="language-C ext-C line-numbers-mode"><pre class="language-C"><code>typedef struct {
    /* For numbers without flag bit Py_TPFLAGS_CHECKTYPES set, all
       arguments are guaranteed to be of the object&#39;s type (modulo
       coercion hacks -- i.e. if the type&#39;s coercion function
       returns other types, then these are allowed as well).  Numbers that
       have the Py_TPFLAGS_CHECKTYPES flag bit set should check *both*
       arguments for proper type and implement the necessary conversions
       in the slot functions themselves. */

    binaryfunc nb_add;            //\u52A0\u6CD5
    binaryfunc nb_subtract;       //\u51CF\u6CD5
    binaryfunc nb_multiply;       //\u4E58\u6CD5
    binaryfunc nb_divide;         //\u9664\u6CD5
    binaryfunc nb_remainder;      //\u6C42\u4F59
    binaryfunc nb_divmod;
    ternaryfunc nb_power;
    unaryfunc nb_negative;
    unaryfunc nb_positive;
    unaryfunc nb_absolute;
    inquiry nb_nonzero;
    unaryfunc nb_invert;
    binaryfunc nb_lshift;
    binaryfunc nb_rshift;
    binaryfunc nb_and;
    binaryfunc nb_xor;
    binaryfunc nb_or;
    coercion nb_coerce;
    unaryfunc nb_int;
    unaryfunc nb_long;
    unaryfunc nb_float;
    unaryfunc nb_oct;
    unaryfunc nb_hex;
    /* Added in release 2.0 */
    binaryfunc nb_inplace_add;
    binaryfunc nb_inplace_subtract;
    binaryfunc nb_inplace_multiply;
    binaryfunc nb_inplace_divide;
    binaryfunc nb_inplace_remainder;
    ternaryfunc nb_inplace_power;
    binaryfunc nb_inplace_lshift;
    binaryfunc nb_inplace_rshift;
    binaryfunc nb_inplace_and;
    binaryfunc nb_inplace_xor;
    binaryfunc nb_inplace_or;

    /* Added in release 2.2 */
    /* The following require the Py_TPFLAGS_HAVE_CLASS flag */
    binaryfunc nb_floor_divide;
    binaryfunc nb_true_divide;
    binaryfunc nb_inplace_floor_divide;
    binaryfunc nb_inplace_true_divide;

    /* Added in release 2.5 */
    unaryfunc nb_index;
} PyNumberMethods;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u53EF\u4EE5\u770B\u5230\uFF0CPyNumberMethods \u6CA1\u6709 PyObject \u5934\uFF0C\u5B83\u6CA1\u6709\u56DE\u7B54 python \u5BF9\u8C61\u7684\u4E24\u4E2A\u5173\u952E\u95EE\u9898\uFF0C\u6240\u4EE5\u5C3D\u7BA1\u4ED6\u4E5F\u662F struct \u7ED3\u6784\u4F53\uFF0C\u4F46\u5B83\u4E0D\u662F python \u5BF9\u8C61\u3002</p><p>\u90A3\u4E48\u5728\u6211\u4EEC\u7684 python \u4E2D\uFF0C\u6574\u6570\u7C7B\u578B\u5BF9\u8C61\u5B9E\u73B0\u5982\u4E0B PyInt_Type\uFF1A</p><div class="language-C ext-C line-numbers-mode"><pre class="language-C"><code>PyTypeObject PyInt_Type = {
    1\uFF1B             //\u5F15\u7528\u8BA1\u6570
    type\uFF1B          //\u7C7B\u578B
    &quot;int&quot;,
    sizeof(PyIntObject),
    0,
    (destructor)int_dealloc,                    /* tp_dealloc */
    (printfunc)int_print,                       /* tp_print */
    0,                                          /* tp_getattr */
    0,                                          /* tp_setattr */
    (cmpfunc)int_compare,                       /* tp_compare */
    (reprfunc)int_to_decimal_string,
    &amp;int_as_number,                             //\u6570\u5B57\u7C7B\u578B\u65B9\u6CD5\u65CF
    0,                                          //\u5E8F\u5217\u7C7B\u578B\u65B9\u6CD5\u65CF
    0,                                          /* tp_as_mapping */\u6620\u5C04\u7C7B\u578B\u65B9\u6CD5\u65CF
    (hashfunc)int_hash,                         /* tp_hash */
    0,                                          /* tp_call */
    (reprfunc)int_to_decimal_string,            /* tp_str */
    PyObject_GenericGetAttr,                    /* tp_getattro */
    0,                                          /* tp_setattro */
    0,                                          /* tp_as_buffer */
    Py_TPFLAGS_DEFAULT | Py_TPFLAGS_CHECKTYPES |
        Py_TPFLAGS_BASETYPE | Py_TPFLAGS_INT_SUBCLASS,          /* tp_flags */
    int_doc,                                    /* tp_doc */
    0,                                          /* tp_traverse */
    0,                                          /* tp_clear */
    0,                                          /* tp_richcompare */
    0,                                          /* tp_weaklistoffset */
    0,                                          /* tp_iter */
    0,                                          /* tp_iternext */
    int_methods,                                /* tp_methods */
    0,                                          /* tp_members */
    int_getset,                                 /* tp_getset */
    0,                                          /* tp_base */
    0,                                          /* tp_dict */
    0,                                          /* tp_descr_get */
    0,                                          /* tp_descr_set */
    0,                                          /* tp_dictoffset */
    0,                                          /* tp_init */
    0,                                          /* tp_alloc */
    int_new,                                    /* tp_new */
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u4E5F\u4E0D\u9700\u8981\u5168\u90E8\u770B\uFF0C\u53EA\u8981\u770B\u5230\u90A3\u4E9B\u4E00\u5927\u5806 0\uFF0C\u6211\u60F3\u4F60\u5C31\u5E94\u8BE5\u5DEE\u4E0D\u591A\u660E\u767D\u4E86\uFF0CPyInt_Type \u662F PyTypeObject \u7ED3\u6784\u4F53\u58F0\u660E\u5B9E\u73B0\u4E00\u4E2A\u7ED3\u6784\u53D8\u91CF\uFF0C\u53EA\u5B9E\u73B0\u4E86\u6240\u6709 \u65B9\u6CD5\u7684\u4E00\u90E8\u5206\uFF0C\u8FD9\u4E5F\u7B26\u5408\u6211\u4EEC\u5BF9 python \u7684\u8BA4\u77E5\uFF0C\u4F60\u5F53\u7136\u4E0D\u5E94\u8BE5\u8FD9\u6837\u5199\u4EE3\u7801</p><p>5[6]</p><p>\u56E0\u4E3A PyInt_Type \u6CA1\u6709\u5B9E\u73B0\u5E8F\u5217\u65B9\u6CD5\u65CF\u3002\uFF08\u5728\u5E8F\u5217\u65B9\u6CD5\u65CF\u4E0E\u6620\u5C04\u65B9\u6CD5\u65CF\u7684\u4E24\u884C\u4E0A\uFF0C\u5168\u90FD\u662F 0\uFF0C\u4EE3\u7801\u4E2D\u6211\u5DF2\u7ECF\u4F7F\u7528\u4E2D\u6587\u6807\u6CE8\u51FA\u6765\u4E86\uFF09</p><p>\u53CD\u800C\u8A00\u4E4B\uFF0C\u5982\u679C PyInt_Type \u5B9E\u73B0\u4E86\u5E8F\u5217\u65B9\u6CD5\u65CF\uFF0C\u4EE3\u7801\u5C31\u53EF\u4EE5\u8FD9\u6837\u5199\u4E86\u3002</p><p>5[6]</p><p>\u81F3\u4E8E\u7ED3\u679C\u5982\u4F55\uFF0C\u5168\u770B\u4F60\u81EA\u5DF1\u559C\u6B22\u5982\u4F55\u5B9A\u4E49\u54AF\u3002</p><h2 id="\u8FCE\u5203\u800C\u89E3" tabindex="-1"><a class="header-anchor" href="#\u8FCE\u5203\u800C\u89E3" aria-hidden="true">#</a> \u8FCE\u5203\u800C\u89E3</h2><p>\u7406\u89E3\u4E86 python \u5BF9\u8C61\u5728 c \u8BED\u8A00\u6E90\u7801\u4E2D\u7684\u5B9E\u73B0\u65B9\u5F0F\uFF0C\u8BB8\u591A\u95EE\u9898\u90FD\u5C06\u8FCE\u5203\u800C\u89E3\u3002</p><h3 id="_1\u3001\u4E3A\u4EC0\u4E48-python-\u8BED\u8A00\u660E\u660E\u6CA1\u6709\u53D8\u91CF\u58F0\u660E-\u5374\u662F\u5F3A\u7C7B\u578B\u8BED\u8A00-python-\u662F\u5982\u4F55\u68C0\u67E5\u7C7B\u578B\u7684" tabindex="-1"><a class="header-anchor" href="#_1\u3001\u4E3A\u4EC0\u4E48-python-\u8BED\u8A00\u660E\u660E\u6CA1\u6709\u53D8\u91CF\u58F0\u660E-\u5374\u662F\u5F3A\u7C7B\u578B\u8BED\u8A00-python-\u662F\u5982\u4F55\u68C0\u67E5\u7C7B\u578B\u7684" aria-hidden="true">#</a> 1\u3001\u4E3A\u4EC0\u4E48 python \u8BED\u8A00\u660E\u660E\u6CA1\u6709\u53D8\u91CF\u58F0\u660E\uFF0C\u5374\u662F\u5F3A\u7C7B\u578B\u8BED\u8A00\uFF1Fpython \u662F\u5982\u4F55\u68C0\u67E5\u7C7B\u578B\u7684\uFF1F</h3><p>\u56E0\u4E3A python \u8BED\u8A00\u53EF\u4EE5\u901A\u8FC7\u5BF9\u8C61\u7684 PyObject \u6307\u9488\u83B7\u5F97\u4ED6\u4EEC\u7C7B\u578B\u4FE1\u606F\uFF0C\u4ECE\u800C\u68C0\u67E5\u4ED6\u4EEC\u7684\u7C7B\u578B\u3002\u53CD\u89C2 c \u8BED\u8A00\uFF0C\u5C3D\u7BA1\u6709\u7C7B\u578B\u58F0\u660E\uFF0C\u7136\u800C c \u8BED\u8A00\u5E76\u6CA1\u6709\u68C0\u67E5\u4ED6\u4EEC \u53D8\u91CF\u7C7B\u578B\u7684\u624B\u6BB5\uFF0C\u6216\u8005\u6362\u53E5\u8BDD\u8BF4\uFF0Cc \u8BED\u8A00\u4E2D\u5B58\u50A8\u7684\u503C\u4E0D\u8BB0\u5F55\u4ED6\u4EEC\u81EA\u8EAB\u7684\u7C7B\u578B\u4FE1\u606F\u3002</p><h3 id="_2\u3001\u4E3A\u4EC0\u4E48-list-dict-\u7B49\u5BB9\u5668\u53EF\u4EE5\u968F\u610F\u5D4C\u5957-\u5982\u6B64\u7075\u6D3B" tabindex="-1"><a class="header-anchor" href="#_2\u3001\u4E3A\u4EC0\u4E48-list-dict-\u7B49\u5BB9\u5668\u53EF\u4EE5\u968F\u610F\u5D4C\u5957-\u5982\u6B64\u7075\u6D3B" aria-hidden="true">#</a> 2\u3001\u4E3A\u4EC0\u4E48 list\uFF0Cdict \u7B49\u5BB9\u5668\u53EF\u4EE5\u968F\u610F\u5D4C\u5957\uFF0C\u5982\u6B64\u7075\u6D3B\uFF1F</h3><p>\u56E0\u4E3A\u5BF9\u4E8E\u8FD9\u4E9B\u5BB9\u5668\u6765\u8BF4\uFF0C\u4ED6\u4EEC\u5B58\u653E\u7684\u53EA\u662F\u5BF9\u8C61\u5F15\u7528\uFF0C\u4E5F\u5C31\u662F PyObject \u6307\u9488\uFF0C\u65E0\u8BBA\u5B58\u653E\u4EC0\u4E48\u5BF9\u8C61\u5BF9\u5BB9\u5668\u6765\u8BF4\u6BEB\u65E0\u533A\u522B\u3002\u4E0D\u96BE\u731C\u60F3\uFF0C\u7B80\u5355\u5730\u5229\u7528 c \u8BED\u8A00\u4E2D\u7684 \u6570\u7EC4\uFF0C\u5C31\u53EF\u4EE5\u5B9E\u73B0 python \u4E2D\u7684 list\u3002</p><h3 id="_3\u3001\u7C7B\u7684\u65B9\u6CD5\u7B2C\u4E00\u4E2A\u53C2\u6570\u662F\u5B83\u81EA\u8EAB-\u5982\u4F55\u5B9E\u73B0" tabindex="-1"><a class="header-anchor" href="#_3\u3001\u7C7B\u7684\u65B9\u6CD5\u7B2C\u4E00\u4E2A\u53C2\u6570\u662F\u5B83\u81EA\u8EAB-\u5982\u4F55\u5B9E\u73B0" aria-hidden="true">#</a> 3\u3001\u7C7B\u7684\u65B9\u6CD5\u7B2C\u4E00\u4E2A\u53C2\u6570\u662F\u5B83\u81EA\u8EAB\uFF0C\u5982\u4F55\u5B9E\u73B0\uFF1F</h3><p>\u7B80\u5355\u554A\uFF0C\u5728\u65B9\u6CD5\u7684 struct \u4E2D\u52A0\u4E00\u4E2A\u8BB0\u5F55 \u81EA\u5DF1\u6240\u5C5E\u7C7B \u7684 \u6210\u5458\u53D8\u91CF \u5C31\u53EF\u4EE5\u4E86\u3002</p><h3 id="\u5173\u4E8E-python-\u7684\u4E00\u81F4\u6027\u3002" tabindex="-1"><a class="header-anchor" href="#\u5173\u4E8E-python-\u7684\u4E00\u81F4\u6027\u3002" aria-hidden="true">#</a> \u5173\u4E8E python \u7684\u4E00\u81F4\u6027\u3002</h3><p>\u5728\u300A\u6D41\u7545\u7684 python\u300B\u4E00\u4E66\u4E2D\uFF0C\u4F5C\u8005\u5F00\u7BC7\u5C31\u662F</p><pre><code>\u201Cpython\u6700\u597D\u7684\u54C1\u8D28\u4E4B\u4E00\u5C31\u662F\u4E00\u81F4\u6027\u3002\u201D
</code></pre><p>\u800C\u5728\u8BE5\u4E66\u7684\u5C01\u5E95\u5219\u5199\u7740</p><pre><code>\u201C\u7406\u89E3\u4E3A\u4EC0\u4E48\u7279\u6B8A\u65B9\u6CD5\u662F\u5BF9\u8C61\u884C\u4E3A\u7684\u4E00\u76F4\u7684\u5173\u952E\u201D\u3002
</code></pre><p>\u8BFB\u5B8C\u6B64\u6587\u4E4B\u540E\uFF0C\u76F8\u4FE1\u4F60\u5DF2\u7ECF\u7406\u89E3\u4E86\u8FD9\u53E5\u8BDD\u7684\u542B\u4E49\u4E86\uFF0C\u5E76\u4E14\u4E86\u89E3\u4E86\u6240\u8C13\u7684\u4E00\u81F4\u6027\u662F\u5982\u4F55\u5B9E\u73B0\u7684\u3002</p><p>\u6240\u8C13\u7684\u7279\u6B8A\u65B9\u6CD5\uFF0C\u5C31\u662F PyTypeObject \u4E2D\u6240\u7ED9\u51FA\u7684\u90A3\u4E00\u5927\u4E32\u957F\u957F\u7684\u65B9\u6CD5\u3002</p><p>\u4ED6\u4EEC\u5C31\u50CF\u662F python \u8D60\u4E0E\u4F7F\u7528\u8005\u7684\u6B66\u5668\u5E93\uFF0Cpython \u4E0D\u628A\u5B83\u4EEC\u96EA\u85CF\u8D77\u6765\uFF0C\u800C\u662F\u5927\u5927\u65B9\u65B9\u5411\u6211\u4EEC\u5730\u655E\u5F00\uFF0C\u4F60\u53EF\u4EE5\u968F\u610F\u6311\u9009\u5408\u9002\u7684\u6B66\u5668\u6B66\u88C5\u81EA\u5DF1\u3002\u83B7\u5F97\u4E0E python \u5185\u7F6E\u7C7B\u578B\u5341\u5206\u76F8\u4F3C\u7684\u5C5E\u6027\u3002</p><h3 id="\u7136\u800C\u5C31\u5176\u672C\u8D28\u800C\u8A00-\u8FD9\u4E9B\u6240\u8C13\u7684\u7279\u6B8A\u65B9\u6CD5\u5B9E\u9645\u4E0A\u5E76\u6CA1\u6709\u4EC0\u4E48\u771F\u6B63\u7279\u6B8A\u7684\u5730\u65B9\u3002" tabindex="-1"><a class="header-anchor" href="#\u7136\u800C\u5C31\u5176\u672C\u8D28\u800C\u8A00-\u8FD9\u4E9B\u6240\u8C13\u7684\u7279\u6B8A\u65B9\u6CD5\u5B9E\u9645\u4E0A\u5E76\u6CA1\u6709\u4EC0\u4E48\u771F\u6B63\u7279\u6B8A\u7684\u5730\u65B9\u3002" aria-hidden="true">#</a> \u7136\u800C\u5C31\u5176\u672C\u8D28\u800C\u8A00\uFF0C\u8FD9\u4E9B\u6240\u8C13\u7684\u7279\u6B8A\u65B9\u6CD5\u5B9E\u9645\u4E0A\u5E76\u6CA1\u6709\u4EC0\u4E48\u771F\u6B63\u7279\u6B8A\u7684\u5730\u65B9\u3002</h3><p>\u4E00\u4E2A\u7C7B\uFF0C\u53EA\u8981\u4F60\u5B9E\u73B0\u4E86<strong>getitem</strong>\u65B9\u6CD5\uFF0C\u5C31\u53EF\u4EE5\u4F7F\u7528[]\u64CD\u4F5C\u7B26\uFF0C\u6362\u53E5\u8BDD\u8BF4 A[b]\u4E0E A.<strong>getitem</strong>(b)\u666E\u901A\u51FD\u6570\u8C03\u7528\u522B\u65E0\u4E8C\u81F4,\u53EA\u662F python \u63D0\u4F9B\u7ED9\u4F7F\u7528 \u8005\u7684\u8BED\u6CD5\u7CD6\u800C\u5DF2\u3002</p><div class="language-python ext-py line-numbers-mode"><pre class="language-python"><code><span class="token keyword">class</span> <span class="token class-name">A</span><span class="token punctuation">(</span><span class="token builtin">object</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> value<span class="token punctuation">)</span><span class="token punctuation">:</span>
        self<span class="token punctuation">.</span>value <span class="token operator">=</span> value

    <span class="token keyword">def</span> <span class="token function">__getitem__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> item<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">return</span> self<span class="token punctuation">.</span>value <span class="token operator">+</span> item

a <span class="token operator">=</span> A<span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;a[6] = &quot;</span><span class="token punctuation">,</span> a<span class="token punctuation">[</span><span class="token number">6</span><span class="token punctuation">]</span><span class="token punctuation">)</span>

<span class="token keyword">for</span> i <span class="token keyword">in</span> a<span class="token punctuation">:</span>
    <span class="token keyword">if</span> i <span class="token operator">&gt;</span> <span class="token number">10</span><span class="token punctuation">:</span>
        <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>

<span class="token keyword">if</span> <span class="token number">1000</span> <span class="token keyword">in</span> a<span class="token punctuation">:</span>   <span class="token comment"># \u8FD9\u91CC in \u7684\u5B9E\u8D28\u4F1A\u8FDB\u884C\u904D\u5386\uFF0C\u4F1A\u53BB\u8C03\u7528 a[0]\u3001a[1]\u3001a[2]\u3001a[3]\u3001a[4] ... a[995] \u76F4\u5230\u53E0\u52A0\u52301000\uFF0C\u6269\u5927\u6570\u5B57\u8BD5\u8BD5</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;1000\u5B58\u50A8\u5728\u5BF9\u8C61a\u4E2D&quot;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u3010\u6CE8\u3011\uFF1A.<strong>getitem</strong>() \u4E3B\u8981\u5B9E\u73B0\u4E86\u5BF9\u8C61\u8FED\u4EE3\u529F\u80FD, \u82E5\u6709 li = [2, 3, 4] \u5F53 li[key] \u65F6 \u5219\u8C03\u7528<strong>getitem</strong>(self,item) item \u5C31\u662F\u4F20\u5165\u7684 key</p><p>a \u660E\u660E\u4E0D\u662F\u4E00\u4E2A\u5E8F\u5217\uFF0C\u4ED6\u5145\u5176\u91CF\u5B58\u50A8\u4E86\u4E00\u4E2A\u6574\u6570\u503C\u800C\u5DF2\uFF0C\u7136\u800C\u53EA\u8981\u6211\u4EEC\u5B9E\u73B0\u4E86<strong>getitem</strong>\u65B9\u6CD5\u5C31\u53EF\u4EE5\u8F7B\u677E\u9A97\u8FC7 python\uFF0C\u5B83\u751A\u81F3\u8FD8\u50BB\u4E4E\u4E4E\u5730\u8BA4\u4E3A a \u4E2D\u5B58\u50A8\u4E86 1000 \u5462\u3002</p><p>\u4E86\u89E3\u8FD9\u4E9B\u5E76\u4E0D\u662F\u4E3A\u4E86\u9F13\u52B1\u4F60\u4EEC\u5199\u51FA\u8FD9\u6837\u7684\u4EE3\u7801\uFF0C\u800C\u662F\u8BA9\u4F60\u4EEC\u4E86\u89E3\u6240\u8C13\u7684\u7279\u6B8A\u65B9\u6CD5\u53EA\u4E0D\u8FC7\u662F python \u7684\u8BED\u6CD5\u7CD6\u800C\u5DF2\uFF0C\u5E76\u4E0D\u7279\u6B8A\u3002</p><p>\u9664\u4E86\u8BED\u6CD5\u7CD6\u4E4B\u5916\uFF0C\u6211\u8BA4\u4E3A\u7279\u6B8A\u65B9\u6CD5\u7684\u53E6\u4E00\u91CD\u66F4\u91CD\u8981\u542B\u4E49\u662F\u7A0B\u5E8F\u5458\u4E4B\u95F4\u7684\u7EA6\u5B9A\u4FD7\u6210\u3002</p><p>\u3010\u6CE8\u610F\u3011\uFF1A\u5F53\u4F60\u4E3A\u4E00\u4E2A\u7C7B\u5B9E\u73B0\u4E86 <strong>getitem</strong> \u65B9\u6CD5\uFF0C\u90A3\u4E48\u5B83\u5C31\u5E94\u8BE5\u662F\u4E00\u4E2A\u5E8F\u5217\uFF0C\u6216\u8005\u8BF4\u81F3\u5C11\u53EF\u4EE5\u88AB\u5F53\u4F5C\u5E8F\u5217\u6765\u770B\u5F85(\u53C2\u8003\u4EC0\u4E48\u662F\u9E2D\u5B50\u7C7B\u578B)\uFF0C\u90A3\u4F60\u4E5F \u5E94\u8BE5\u5B9E\u73B0\u5B83 <strong>len</strong> \u65B9\u6CD5\u3002\u4E0A\u9762\u8FD9\u4E2A\u7C7B\u662F\u4E0D\u80FD\u4F7F\u7528 len(a)\u7684\uFF0C\u8FD9\u4E0D\u7B26\u5408\u6211\u4EEC\u5BF9\u5E8F\u5217\u7684\u671F\u5F85\u3002</p><p>python \u7684\u4E00\u81F4\u6027\u662F\u7531\u7A0B\u5E8F\u5458\u4E4B\u95F4\u7684\u7EA6\u5B9A\u4FD7\u6210\u5171\u540C\u7EF4\u62A4\u7684\uFF0C\u8FD9\u4E5F\u5C31\u662F\u4E3A\u4EC0\u4E48\u6709\u4EBA\u8BF4\uFF1A</p><pre><code>\u201C\u5728python\u91CC\u79C1\u81EA\u53D6\u540D__\uFF08\u53CC\u4E0B\u5212\u7EBF\uFF09\u5F00\u5934\u7684\u51FD\u6570\u662F\u975E\u5E38\u81EA\u79C1\u7684\u884C\u4E3A.\u201D
</code></pre><p>\u4E86\u89E3\u89C4\u5219\u7684\u8FB9\u754C\uFF0C\u662F\u4E3A\u4E86\u66F4\u597D\u5730\u5229\u7528\u5B83\uFF0C\u800C\u4E0D\u662F\u7834\u574F\u5B83\u3002</p><p>ps: \u771F\u6B63\u7684 PyObject \u5BF9\u8C61\u5DF2\u7ECF\u53D8\u6210\u4E86\u8FD9\u6837\uFF1A</p><div class="language-C ext-C line-numbers-mode"><pre class="language-C"><code>typedef struct _object{
    struct _object *_ob_next;
    struct _object *_ob_prev;
    int ob_refcnt;                        //\u5F15\u7528\u8BA1\u6570
    struct _typeobject *ob_type;         // \u7C7B\u578B\u5BF9\u8C61
}PyObject;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u65B0\u52A0\u5165\u7684\u4E24\u4E2A\u6307\u9488\u662F\u5728\u5B58\u6D3B\u7684\u5BF9\u8C61\u4E4B\u95F4\u6784\u6210\u4E00\u4E2A\u53CC\u5411\u94FE\u8868\uFF0C\u65B9\u4FBF\u8C03\u8BD5\uFF0C\u4E0E\u672C\u6587\u4E3B\u9898\u65E0\u5173\uFF0C\u6545\u7701\u53BB\u3002</p>`,89),b={href:"https://zhuanlan.zhihu.com/p/34410799",target:"_blank",rel:"noopener noreferrer"},m={href:"https://zhuanlan.zhihu.com/p/34498622",target:"_blank",rel:"noopener noreferrer"},_={href:"https://zhuanlan.zhihu.com/p/34593593",target:"_blank",rel:"noopener noreferrer"};function y(h,k){const e=d("ExternalLinkIcon");return t(),l("div",null,[u,c("more"),v,n("p",null,[s("\u8FD9\u7BC7\u6587\u7AE0 "),n("a",b,[s("\u5F15\u7528"),a(e)])]),n("p",null,[s("\u6E90\u7801\u8BFB python\uFF08\u4E8C\uFF09"),n("a",m,[s("\u5185\u5B58\u4E2D\u7684 python \u5BF9\u8C61"),a(e)])]),n("p",null,[s("\u6E90\u7801\u8BFB python\uFF08\u4E09\uFF09"),n("a",_,[s("Int \u6574\u6570\u7C7B\u578B\u63A2\u79D8"),a(e)])])])}const P=i(o,[["render",y],["__file","Cpython\u5BF9\u8C61.html.vue"]]);export{P as default};
