<template><div><h1 id="函数" tabindex="-1"><a class="header-anchor" href="#函数" aria-hidden="true">#</a> 函数</h1>
<h2 id="_1-概念" tabindex="-1"><a class="header-anchor" href="#_1-概念" aria-hidden="true">#</a> 1. 概念</h2>
<h3 id="_1-1-函数定义" tabindex="-1"><a class="header-anchor" href="#_1-1-函数定义" aria-hidden="true">#</a> 1.1 函数定义</h3>
<ul>
<li>函数，不应该理解为数学中的函数 <code v-pre>!= function()</code></li>
<li>计算机的函数，则应该理解为<code v-pre>== subroutine</code> ，这在 <strong>BASIC</strong> 中称为 <strong>子程序</strong>，在 <strong>Pascal</strong> 中叫做 <strong>过程</strong>（<em>procedures</em>）</li>
<li>在 <strong>C</strong> / <strong>Python</strong> 中通常称为 <code v-pre>function</code> 函数 ，而 <strong>Java</strong> 中则叫 <code v-pre>method</code> 方法</li>
</ul>
<p>创建格式为</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">def</span> <span class="token function">function_name</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>	<span class="token comment"># 需根据功能来下划线形式的命名</span>
    <span class="token keyword">pass</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>其中 <strong>def</strong> 表示 <Badge>define(<em>定义</em>)</Badge> ，在函数名称前声明，为 <strong>Python</strong> 的关键字</li>
</ul>
<h3 id="_1-2-函数地址" tabindex="-1"><a class="header-anchor" href="#_1-2-函数地址" aria-hidden="true">#</a> 1.2 函数地址</h3>
<p>函数是有地址的，可以直接打印出函数本身的地址</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">def</span> <span class="token function">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">pass</span>

<span class="token keyword">print</span><span class="token punctuation">(</span>func<span class="token punctuation">)</span>
<span class="token comment">### 输出结果</span>
<span class="token comment"># &lt;function func at 0x0000025DD40B28B8></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip">
<p class="custom-container-title">提示</p>
<ul>
<li><strong>变量名</strong> 不能与函数名相同</li>
<li>函数还有返回的地址，当函数 <strong>赋值给变量</strong> 时，变量中存储的便是函数的返回地址</li>
</ul>
</div>
<h3 id="_1-3-函数的作用" tabindex="-1"><a class="header-anchor" href="#_1-3-函数的作用" aria-hidden="true">#</a> 1.3 函数的作用</h3>
<p>函数只要修改一处，所有引用该函数的地方，都会统一被修改，因此好处在于</p>
<ul>
<li>减少重复代码</li>
<li>方便日后改写扩展</li>
<li>保持代码的一致性</li>
</ul>
<br/>
<hr>
<h2 id="_2-函数参数" tabindex="-1"><a class="header-anchor" href="#_2-函数参数" aria-hidden="true">#</a> 2. 函数参数</h2>
<h3 id="_2-1-参数类别" tabindex="-1"><a class="header-anchor" href="#_2-1-参数类别" aria-hidden="true">#</a> 2.1 参数类别</h3>
<ul>
<li><strong>形参</strong>: 形式上的， <strong>不占内存空间的</strong> 参数变量，用于接收值</li>
<li><strong>实参</strong>: 实际上的， <strong>有实际的地址|指针的</strong> 参数变量，占用内存的实际传入值</li>
</ul>
<h4 id="关键字参数" tabindex="-1"><a class="header-anchor" href="#关键字参数" aria-hidden="true">#</a> <strong>关键字参数</strong></h4>
<p>形如 <strong>key=value</strong> 的传参，表示使用 <strong>关键字</strong> 的形式来传参</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">def</span> <span class="token function">info</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> age<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"age: </span><span class="token interpolation"><span class="token punctuation">{</span>age<span class="token punctuation">}</span></span><span class="token string">, name: </span><span class="token interpolation"><span class="token punctuation">{</span>name<span class="token punctuation">}</span></span><span class="token string">"</span></span><span class="token punctuation">)</span>
    <span class="token keyword">pass</span>


info<span class="token punctuation">(</span>age<span class="token operator">=</span><span class="token number">18</span><span class="token punctuation">,</span> name<span class="token operator">=</span><span class="token string">"Warira"</span><span class="token punctuation">)</span>

<span class="token comment">## 输出结果</span>
<span class="token comment"># age: 18, name: Warira</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>若正常按顺序传参，<code v-pre>name, age</code> 便是 <strong>位置参数</strong></li>
<li>像 <code v-pre>age=18 | name=&quot;Warira&quot;</code> 这种形式的传参, <code v-pre>age=18 | name=&quot;Warira&quot;</code> 则为<strong>关键字参数</strong>，可<strong>无序</strong>传参，可以不用像 <strong>位置参数</strong> 那样，按位置传</li>
</ul>
<h4 id="默认参数" tabindex="-1"><a class="header-anchor" href="#默认参数" aria-hidden="true">#</a> <strong>默认参数</strong></h4>
<p>当一个函数值大多数参数相同，便可以设置一个 <strong>默认参数</strong> 进行优化</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">def</span> <span class="token function">info</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> age<span class="token punctuation">,</span> sex<span class="token operator">=</span><span class="token string">"female"</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">pass</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>这里的 <code v-pre>sex</code> 就是默认参数，必须 <strong>放在最后</strong> ，<Font type="error">即后面不能有空参<Badge>未赋值的参数</Badge></Font></li>
</ul>
<div class="custom-container danger">
<p class="custom-container-title">警告</p>
<p><strong>1.6 亿操作!</strong> 千万别在 <strong>默认参数</strong> 中写 <code v-pre>xx = list()</code> 或者 <code v-pre>xx = []</code></p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">def</span> <span class="token function">foo</span><span class="token punctuation">(</span>list1<span class="token operator">=</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    list1<span class="token punctuation">.</span>append<span class="token punctuation">(</span><span class="token string">"2"</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"list1"</span><span class="token punctuation">,</span> list1<span class="token punctuation">)</span>

foo<span class="token punctuation">(</span><span class="token punctuation">)</span>  <span class="token comment"># list1 ['2']</span>
foo<span class="token punctuation">(</span><span class="token punctuation">)</span>  <span class="token comment"># list1 ['2', '2']</span>
foo<span class="token punctuation">(</span><span class="token punctuation">)</span>  <span class="token comment"># list1 ['2', '2', '2']</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>
<p>若函数内部有 <code v-pre>append()</code> 操作，仅第一次（<em>且只一次</em>）的调用正常外，但凡再被调用，就会不断内存泄漏</p>
</li>
<li>
<p>一旦 <strong>多次调用</strong>，且参数中 <strong>没有默认参数</strong>，函数则会 <strong>直接拿第一次调用的默认参数</strong>（<em>因为地址相同，没有传入新地址</em>）继续 <code v-pre>append()</code> ，业务量一上来，百分百炸裂</p>
</li>
<li>
<p>因此以后需要 <strong>可变类型的默认参数</strong> 时，<strong>直接初始化 None，不会有地址问题</strong></p>
</li>
</ul>
</div>
<h4 id="不定长参数" tabindex="-1"><a class="header-anchor" href="#不定长参数" aria-hidden="true">#</a> <strong>不定长参数</strong></h4>
<h5 id="args" tabindex="-1"><a class="header-anchor" href="#args" aria-hidden="true">#</a> <strong>*args</strong></h5>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">def</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token operator">*</span>args<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>args<span class="token punctuation">,</span> <span class="token builtin">type</span><span class="token punctuation">(</span>args<span class="token punctuation">)</span><span class="token punctuation">)</span>


add<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span>

<span class="token comment">## 输出结果</span>
<span class="token comment"># (1, 2, 3, 4, 5) &lt;class 'tuple'></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><code v-pre>*args</code> 可以接收 <strong>不定长</strong> 的任意多个位置参数</li>
<li><code v-pre>add(1, 2, 3, 4, 5)</code> 这里形参接收实参的赋值后，会返回元组 <strong>tuple</strong></li>
</ul>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">def</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token operator">*</span>args<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>args<span class="token punctuation">,</span> <span class="token builtin">type</span><span class="token punctuation">(</span>args<span class="token punctuation">)</span><span class="token punctuation">)</span>
    list1 <span class="token operator">=</span> <span class="token builtin">list</span><span class="token punctuation">(</span><span class="token operator">*</span>args<span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>list1<span class="token punctuation">)</span>


add<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">)</span>

<span class="token comment">## 输出结果</span>
<span class="token comment"># ([1, 2, 3, 4],) &lt;class 'tuple'>		# 返回元组，但第一个值为传入的列表</span>
<span class="token comment"># [1, 2, 3, 4]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><code v-pre>*args</code> <strong>不能直接赋值</strong>，但若使用内置类型转换，如使用 <code v-pre>list()</code> 则能原样取到传入的值</li>
</ul>
<h5 id="kwargs" tabindex="-1"><a class="header-anchor" href="#kwargs" aria-hidden="true">#</a> <strong>**kwargs</strong></h5>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">def</span> <span class="token function">info</span><span class="token punctuation">(</span><span class="token operator">*</span>args<span class="token punctuation">,</span> <span class="token operator">**</span>kwargs<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>args<span class="token punctuation">,</span> kwargs<span class="token punctuation">,</span> <span class="token builtin">type</span><span class="token punctuation">(</span>kwargs<span class="token punctuation">)</span><span class="token punctuation">)</span>


info<span class="token punctuation">(</span><span class="token string">"Shiki"</span><span class="token punctuation">,</span> age<span class="token operator">=</span><span class="token number">18</span><span class="token punctuation">,</span> sex<span class="token operator">=</span><span class="token string">"female"</span><span class="token punctuation">)</span>

<span class="token comment">## 输出结果</span>
<span class="token comment"># ('Shiki',) {'age': 18, 'sex': 'female'} &lt;class 'dict'></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><code v-pre>**kwargs</code> 可以接收 <strong>不定长</strong> 的任意多个 <strong>关键字参数</strong></li>
<li>返回字典 <strong>dict</strong> 类型</li>
<li><strong>位置参数:</strong> <code v-pre>&quot;Shiki&quot;</code> 是 <code v-pre>*args</code>接收的，<strong>关键字参数:</strong> <code v-pre>age=18</code> 和 <code v-pre>sex=&quot;female&quot;</code> 是 <code v-pre>**kwargs</code> 接收的</li>
</ul>
<div class="custom-container tip">
<p class="custom-container-title">提示</p>
<ul>
<li>
<p>这里的 <code v-pre>**kwargs</code> 作为接收参数的默认值，仅接收 <strong>string</strong> 为键的值</p>
</li>
<li>
<p>若有针对如上，需要不同类型，可通过如下方式转为 <strong>string</strong>， 转化后才能接受该参数</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token operator">**</span><span class="token punctuation">{</span><span class="token builtin">str</span><span class="token punctuation">(</span>k<span class="token punctuation">)</span><span class="token punctuation">:</span> v <span class="token keyword">for</span> k<span class="token punctuation">,</span> v <span class="token keyword">in</span> kwargs<span class="token punctuation">.</span>items<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">if</span> <span class="token builtin">isinstance</span><span class="token punctuation">(</span>k<span class="token punctuation">,</span><span class="token builtin">str</span><span class="token punctuation">)</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>过滤非字符串参数，生成新的字符串。直接暴力的将非字符串转化为字符串，存在覆盖（同字符串）键的风险</p>
</li>
<li>
<p>实际开发中，<strong>直接传字典</strong> 的形式十分常见</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">def</span> <span class="token function">info</span><span class="token punctuation">(</span><span class="token operator">**</span>kwargs<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>kwargs<span class="token punctuation">,</span> <span class="token builtin">type</span><span class="token punctuation">(</span>kwargs<span class="token punctuation">)</span><span class="token punctuation">)</span>

info<span class="token punctuation">(</span><span class="token operator">**</span><span class="token punctuation">{</span><span class="token string">"key"</span><span class="token punctuation">:</span> <span class="token string">"value"</span><span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">## 输出结果</span>
<span class="token comment"># {'key': 'value'} &lt;class 'dict'></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
</div>
<h5 id="混合传参" tabindex="-1"><a class="header-anchor" href="#混合传参" aria-hidden="true">#</a> <Font type="dark">混合传参</Font></h5>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">def</span> <span class="token function">info</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> sex<span class="token operator">=</span><span class="token string">"female"</span><span class="token punctuation">,</span> <span class="token operator">*</span>args<span class="token punctuation">,</span> <span class="token operator">**</span>kwargs<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">pass</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container note">
<p class="custom-container-title">注</p>
<p><strong>【优先级】</strong>: <strong>位置参数</strong> &gt; <strong>默认参数</strong> &gt; <code v-pre>*args</code> &gt; <code v-pre>**kwargs</code></p>
</div>
<h4 id="特殊参数" tabindex="-1"><a class="header-anchor" href="#特殊参数" aria-hidden="true">#</a> <strong>特殊参数</strong></h4>
<p><strong>Python</strong> 通常能按 <strong>位置</strong> 或 <strong>关键字</strong> 形式给函数传参，但为了提高代码易读性，可以使用特殊标识来 <strong>限制参数传递</strong></p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">def</span> <span class="token function">f</span><span class="token punctuation">(</span>pos1<span class="token punctuation">,</span> pos2<span class="token punctuation">,</span> <span class="token operator">/</span><span class="token punctuation">,</span> pos_or_kwd<span class="token punctuation">,</span> <span class="token operator">*</span><span class="token punctuation">,</span> kwd1<span class="token punctuation">,</span> kwd2<span class="token punctuation">)</span><span class="token punctuation">:</span>
      <span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span>    <span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span>     <span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span>
        <span class="token operator">|</span>             <span class="token operator">|</span>                  <span class="token operator">|</span>
        <span class="token operator">|</span>        Positional <span class="token keyword">or</span> keyword   <span class="token operator">|</span>
        <span class="token operator">|</span>                                <span class="token operator">-</span> Keyword only
         <span class="token operator">-</span><span class="token operator">-</span> Positional only
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><code v-pre>/</code> 可选，用来 限制位置，意思是 <code v-pre>/</code> <strong>前面</strong> 的，<strong>只能用位置传参</strong>，禁用 <code v-pre>kwarg=value</code> 这种关键字形式</li>
<li><code v-pre>*</code> 可选，用来限制关键字，意思是 <code v-pre>*</code> <strong>后面</strong> 的，<strong>只能用关键字传参</strong>，必须以 <code v-pre>kwarg=value</code> 形式</li>
</ul>
<br/>
<hr>
<h2 id="_3-函数返回值-return" tabindex="-1"><a class="header-anchor" href="#_3-函数返回值-return" aria-hidden="true">#</a> 3. 函数返回值(return)</h2>
<ul>
<li>
<p><strong>Python</strong> 默认情况，<mark>无返回值时</mark> 会返回<code v-pre>None</code></p>
</li>
<li>
<p><strong>Python</strong> 可返回多个对象，编译器不会报错，而是默认返回如 <code v-pre>(1,&quot;qw&quot;,3)</code> 这种封装后的 <strong>tuple</strong> 对象</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">def</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">return</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">"qw"</span><span class="token punctuation">,</span> <span class="token number">3</span>

a<span class="token punctuation">,</span> b<span class="token punctuation">,</span> _ <span class="token operator">=</span> foo<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">,</span> _<span class="token punctuation">)</span>				<span class="token comment"># _ 是有意义的，不仅仅是占位</span>

<span class="token comment">## 输出结果</span>
<span class="token comment"># 1 qw 3</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<p><strong>用处：</strong></p>
<ul>
<li>结束函数，<code v-pre>return</code> 之后便结束，后续代码无任何意义</li>
<li>返回对象</li>
</ul>
<br/>
<hr>
<h2 id="_4-函数的作用域" tabindex="-1"><a class="header-anchor" href="#_4-函数的作用域" aria-hidden="true">#</a> 4. 函数的作用域</h2>
<div class="custom-container danger">
<p class="custom-container-title">如下禁止</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">def</span> <span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
  a <span class="token operator">=</span> <span class="token number">10</span>

f<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span>

<span class="token comment">### 输出结果</span>
<span class="token comment"># Traceback (most recent call last):</span>
<span class="token comment"># ...</span>
<span class="token comment"># NameError: name 'a' is not defined</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>变量 <code v-pre>a</code>，声明在函数 <code v-pre>f()</code> 的 <strong>作用域</strong> 里，一旦函数执行完后，就会<strong>销毁</strong>，故变量 <code v-pre>a</code> 只作用于函数内部，是无法在全局中引用的</p>
</div>
<h3 id="_4-1-作用域-legb" tabindex="-1"><a class="header-anchor" href="#_4-1-作用域-legb" aria-hidden="true">#</a> 4.1 作用域 LEGB</h3>
<ul>
<li><strong>L</strong>（<em>local</em>）<strong>局部作用域</strong>，即函数中定义的变量</li>
<li><strong>E</strong>（<em>enclosing</em> ）<strong>嵌套的父级函数的局部作用域</strong>，即包含此函数的上级函数的局部作用域，但不是全局的</li>
<li><strong>G</strong>（<em>global</em>）<strong>全局变量</strong>，模块级别定义的全局变量</li>
<li><strong>B</strong>（<em>bulid_in</em>）<strong>系统固定模块里的变量</strong>， 比如 <code v-pre>int</code> 、 <code v-pre>bytearray</code> 等</li>
</ul>
<p>优先级顺序依次:</p>
<p><strong>局部作用域</strong> &gt; <strong>外层作用域</strong> &gt; <strong>模块的全局变量</strong> &gt; <strong>Python 内置作用域变量</strong>，也就是 <strong>LEGB</strong></p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>x <span class="token operator">=</span> <span class="token builtin">int</span><span class="token punctuation">(</span><span class="token number">2.9</span><span class="token punctuation">)</span>				<span class="token comment"># int built_in 最外一层</span>

o_count <span class="token operator">=</span> <span class="token number">0</span>					<span class="token comment"># global 全局变量</span>

<span class="token keyword">def</span> <span class="token function">outer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    o_count <span class="token operator">=</span> <span class="token number">1</span>				<span class="token comment"># enclosing  父级函数的局部作用域</span>
    i_count <span class="token operator">=</span> <span class="token number">8</span>

    <span class="token keyword">def</span> <span class="token function">inner</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        i_count <span class="token operator">=</span> <span class="token number">2</span>			<span class="token comment"># local 局部作用域</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span>o_count<span class="token punctuation">)</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span>i_count<span class="token punctuation">)</span>		<span class="token comment"># 有优先级 仅本地没有，才去找上层</span>

    inner<span class="token punctuation">(</span><span class="token punctuation">)</span>

outer<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment">## 输出结果</span>
<span class="token comment"># 1</span>
<span class="token comment"># 2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-2-全局变量和局部变量" tabindex="-1"><a class="header-anchor" href="#_4-2-全局变量和局部变量" aria-hidden="true">#</a> 4.2 全局变量和局部变量</h3>
<p>全局变量，在局部里，<strong>只读不可改</strong></p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>count <span class="token operator">=</span> <span class="token number">10</span>

<span class="token keyword">def</span> <span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>count<span class="token punctuation">)</span>
    count <span class="token operator">=</span> <span class="token number">5</span>

f<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment">## 输出结果</span>
<span class="token comment"># UnboundLocalError: local variable 'count' referenced before assignment</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>报错，<strong>赋值前引用了局部变量</strong></li>
<li>执行时，会 <strong>先在局部中找</strong> 这个变量，若存在，便不再去全局查</li>
<li>找到后，又发现是使用在 <code v-pre>print(count)</code> 后，故报错</li>
</ul>
<h5 id="函数内部生成" tabindex="-1"><a class="header-anchor" href="#函数内部生成" aria-hidden="true">#</a> <strong>函数内部生成</strong></h5>
<ol>
<li>
<p>函数一创建，便加载到内存，会在内存开辟了一段空间，把局部的内容存储</p>
</li>
<li>
<p>程序是顺序执行（<em>不论全局还是局部</em>），但先在局部函数地址域中执行变量检索</p>
</li>
<li>
<p>局部中没有，再去全局检索，若依然没有找到引用的变量 ，则报错</p>
</li>
</ol>
<h5 id="在局部变量里面修改全局变量" tabindex="-1"><a class="header-anchor" href="#在局部变量里面修改全局变量" aria-hidden="true">#</a> <strong>在局部变量里面修改全局变量</strong></h5>
<p>如果遇到需要改写全局变量的需求，需要如下方式</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>count <span class="token operator">=</span> <span class="token number">10</span>

<span class="token keyword">def</span> <span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">global</span> count
    <span class="token keyword">print</span><span class="token punctuation">(</span>count<span class="token punctuation">)</span>
    count <span class="token operator">=</span> <span class="token number">5</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>count<span class="token punctuation">)</span>

f<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment">## 输出结果</span>
<span class="token comment"># 10</span>
<span class="token comment"># 5</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><code v-pre>global</code> 可以在局部直接获取到全局变量 <code v-pre>count</code> 的地址指针</li>
<li><a href="https://docs.python.org/zh-cn/3.10/reference/simple_stmts.html#global" target="_blank" rel="noopener noreferrer">global<ExternalLinkIcon/></a> 是对解析器的指令，慎用</li>
</ul>
<p><strong>在局部变量里面修改嵌套作用域</strong></p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">def</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    count <span class="token operator">=</span> <span class="token number">10</span>

    <span class="token keyword">def</span> <span class="token function">inner</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">nonlocal</span> count
        count <span class="token operator">=</span> <span class="token number">20</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span>count<span class="token punctuation">)</span>

    <span class="token keyword">print</span><span class="token punctuation">(</span>count<span class="token punctuation">)</span>
    <span class="token keyword">return</span> inner

foo<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment">## 输出结果</span>
<span class="token comment"># 10</span>
<span class="token comment"># 20</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><code v-pre>nonlocal</code> 可以在局部获取到嵌套作用域变量 <code v-pre>count</code> 的地址指针</li>
</ul>
<h3 id="_4-3-命名空间" tabindex="-1"><a class="header-anchor" href="#_4-3-命名空间" aria-hidden="true">#</a> 4.3 命名空间</h3>
<p><strong>Python</strong> 的命名空间，通过 <strong>dict</strong>（<em>字典</em>）形式体现，内置函数 <code v-pre>globals()</code> 和 <code v-pre>locals()</code> 分别对应 <strong>全局命名空间</strong>、<strong>局部命名空间</strong>，经常在需要 <strong>动态进行变量赋值</strong> 时使用</p>
<h5 id="globals" tabindex="-1"><a class="header-anchor" href="#globals" aria-hidden="true">#</a> <strong>globals()</strong></h5>
<p>返回 <strong>当前模块全局命名空间</strong> 的字典，在任何位置调用，返回都不变，可通过如下形式修改全局变量</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>a <span class="token operator">=</span> <span class="token number">3</span>

<span class="token keyword">def</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token builtin">globals</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token string">'a'</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">4</span>

foo<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span>

<span class="token comment">## 输出结果</span>
<span class="token comment"># 4</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="locals" tabindex="-1"><a class="header-anchor" href="#locals" aria-hidden="true">#</a> <strong>locals()</strong></h5>
<p>既然 <code v-pre>globals()</code> 可以改全局变量，那么 <code v-pre>locals()</code> 也理所当然的可以修改局部变量吗？</p>
<p><strong>注意：</strong> 不要用 <code v-pre>locals()</code> 去修改变量，尽管 <strong>Python</strong> 高版本已经没有报错，建议 <strong>依然作为只读使用</strong></p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">def</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token builtin">locals</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token punctuation">[</span><span class="token string">'a'</span><span class="token punctuation">,</span> <span class="token string">'b'</span><span class="token punctuation">,</span> <span class="token string">'c'</span><span class="token punctuation">]</span><span class="token punctuation">:</span>
        <span class="token builtin">locals</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">1</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token builtin">locals</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

foo<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment">## 输出结果： Python2 中报错</span>

<span class="token comment"># {}</span>
<span class="token comment"># {'i': 'c', 'a': 1, 'b': 1, 'c': 1}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a href="https://www.cnblogs.com/saolv/p/10945463.html" target="_blank" rel="noopener noreferrer">参考<ExternalLinkIcon/></a></p>
<br/>
<hr>
<h2 id="_5-进阶" tabindex="-1"><a class="header-anchor" href="#_5-进阶" aria-hidden="true">#</a> 5. 进阶</h2>
<h3 id="_5-1-函数为参" tabindex="-1"><a class="header-anchor" href="#_5-1-函数为参" aria-hidden="true">#</a> 5.1 函数为参</h3>
<p>函数名可作为 <strong>参数</strong> 和 <strong>返回值</strong></p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">def</span> <span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"ok"</span><span class="token punctuation">)</span>

<span class="token keyword">def</span> <span class="token function">foo</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">,</span> func<span class="token punctuation">)</span><span class="token punctuation">:</span> 		<span class="token comment"># 接收函数参数</span>
    func<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"a: </span><span class="token interpolation"><span class="token punctuation">{</span>a<span class="token punctuation">}</span></span><span class="token string">, b: </span><span class="token interpolation"><span class="token punctuation">{</span>b<span class="token punctuation">}</span></span><span class="token string">, func: </span><span class="token interpolation"><span class="token punctuation">{</span>func<span class="token punctuation">}</span></span><span class="token string"> - id: </span><span class="token interpolation"><span class="token punctuation">{</span><span class="token builtin">hex</span><span class="token punctuation">(</span><span class="token builtin">id</span><span class="token punctuation">(</span>func<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">"</span></span><span class="token punctuation">)</span>

foo<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> f<span class="token punctuation">)</span> 				<span class="token comment"># 传入函数，后文回调思想</span>

<span class="token comment"># ok</span>
<span class="token comment"># a: 1, b: 2, func: &lt;function f at 0x000001C0EA826550> - id: 0x1c0ea826550</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>函数地址（<em>1928079019888</em>）因此一定义，即使没调用，也会在内存开辟一块地址来初始化，并等待调用</li>
<li>在内存是以 <strong>str</strong> （<em>字符串</em>）形式存储的函数对象</li>
<li>函数名即是引用这个函数对象，因此存放函数对象的 <strong>地址指针</strong></li>
</ul>
<h3 id="_5-2-嵌套" tabindex="-1"><a class="header-anchor" href="#_5-2-嵌套" aria-hidden="true">#</a> 5.2 嵌套</h3>
<p>函数内部可以 <strong>定义函数</strong>，还可以 <strong>返回内部函数</strong></p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">def</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">inner</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">return</span> <span class="token number">8</span>

    <span class="token keyword">return</span> inner   	<span class="token comment"># 返回函数对象的地址指针</span>

<span class="token keyword">print</span><span class="token punctuation">(</span>foo<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment"># 8</span>
<span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span>
<span class="token comment"># 后文[闭包/装饰器]思想</span>
<span class="token comment"># foo() == inner</span>
<span class="token comment"># foo()() == inner()</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-3-递归" tabindex="-1"><a class="header-anchor" href="#_5-3-递归" aria-hidden="true">#</a> 5.3 递归</h3>
<p><strong>凡递归程序，都可改循环</strong>，建议不用递归，效率低、用不好就是灾难</p>
<h5 id="特点" tabindex="-1"><a class="header-anchor" href="#特点" aria-hidden="true">#</a> <strong>特点：</strong></h5>
<ul>
<li>
<p>递归函数 <strong>自己调自己</strong></p>
</li>
<li>
<p>有出口，<strong>结束条件</strong></p>
</li>
</ul>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">def</span> <span class="token function">fibo</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span><span class="token punctuation">:</span>
   <span class="token keyword">if</span> n <span class="token operator">&lt;=</span> <span class="token number">1</span><span class="token punctuation">:</span>
       <span class="token keyword">return</span> n
   <span class="token keyword">else</span><span class="token punctuation">:</span>
       <span class="token keyword">return</span> fibo<span class="token punctuation">(</span>n<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">+</span> fibo<span class="token punctuation">(</span>n<span class="token operator">-</span><span class="token number">2</span><span class="token punctuation">)</span>

<span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"fibo(</span><span class="token interpolation"><span class="token punctuation">{</span>i<span class="token punctuation">}</span></span><span class="token string">) = </span><span class="token interpolation"><span class="token punctuation">{</span>fibo<span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">"</span></span><span class="token punctuation">)</span>

<span class="token comment">## 输出结果</span>
<span class="token comment"># fibo(0) = 0</span>
<span class="token comment"># fibo(1) = 1</span>
<span class="token comment"># fibo(2) = 1</span>
<span class="token comment"># fibo(3) = 2</span>
<span class="token comment"># ...</span>
<span class="token comment"># fibo(8) = 21</span>
<span class="token comment"># fibo(9) = 34</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>注意：</strong></p>
<ul>
<li>
<p>递归层次数过多，会导致 <strong>栈溢出</strong></p>
<ul>
<li>计算机中，函数是通过 <strong>stack</strong>（<em>栈</em>）来实现的</li>
<li>函数调用，系统栈就会增加一层栈帧，函数返回，减少一层栈帧</li>
<li>由于栈的大小 <strong>不是无限的</strong>，递归调用次数过多会使栈溢出</li>
</ul>
</li>
<li>
<p>递归 <strong>效率低</strong>，栈入栈出操作频繁，因此效率十分低下</p>
<ul>
<li>每次都自调一层后 <strong>进栈</strong>，直到条件成立</li>
<li>直到退出条件成立，再层层 <code v-pre>return</code> 出栈</li>
</ul>
</li>
</ul>
<h3 id="_5-4-常用内置函数" tabindex="-1"><a class="header-anchor" href="#_5-4-常用内置函数" aria-hidden="true">#</a> 5.4 常用内置函数</h3>
<p><strong>Python</strong> 对常用函数进行了封装 <code v-pre>build-in Functions</code></p>
<h4 id="lambda" tabindex="-1"><a class="header-anchor" href="#lambda" aria-hidden="true">#</a> <strong>lambda</strong></h4>
<p><strong>Python</strong> 支持 <strong>lambda</strong> 匿名函数</p>
<ul>
<li>
<p>其扩展的 <strong>BNF</strong> 表示法是 <code v-pre>lambda_expr ::= &quot;lambda&quot; [parameter_list] &quot;:&quot; expression</code></p>
<ul>
<li>
<p>若翻译成函数，则是如下形式</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">def</span> <span class="token operator">&lt;</span><span class="token keyword">lambda</span><span class="token operator">></span><span class="token punctuation">(</span>parameter_list<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">return</span> expression
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
</li>
<li>
<p>即 <code v-pre>lambda 参数序列 : 表达式</code></p>
</li>
</ul>
<p><strong>优点：</strong></p>
<ul>
<li><strong>单行简洁</strong>，不需要函数命名与换行缩进</li>
</ul>
<p><strong>缺点：</strong></p>
<ul>
<li>只支持单行表达式，不适合复杂逻辑</li>
<li><strong>可读性差</strong></li>
</ul>
<p><strong>示例</strong></p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>add <span class="token operator">=</span> <span class="token keyword">lambda</span> a<span class="token punctuation">,</span> b <span class="token punctuation">:</span> a <span class="token operator">+</span> b

add<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span>

<span class="token comment"># 3</span>

<span class="token punctuation">(</span><span class="token keyword">lambda</span> a<span class="token punctuation">,</span> b<span class="token punctuation">:</span> <span class="token keyword">print</span><span class="token punctuation">(</span>a <span class="token operator">+</span> b<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span>	<span class="token comment"># lambda的另一种执行方式，类似js的自执行函数（连开销都省了）</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><code v-pre>lambda</code> 的 <code v-pre>:</code> 左侧接收参数 <code v-pre>a</code> 、<code v-pre>b</code> ，右侧则是执行的表达式后的返回值</li>
<li>创建时不需要命名，故也称为 <strong>匿名函数</strong></li>
</ul>
<p><strong>lambda</strong> 函数通常的用法是结合 <code v-pre>map()</code>、<code v-pre>reduce()</code>、<code v-pre>filter()</code>、<code v-pre>sorted()</code> 等函数一起使用，这些函数的共性是：<strong>都可以接收其它函数作为参数</strong></p>
<h4 id="map-function-iterable" tabindex="-1"><a class="header-anchor" href="#map-function-iterable" aria-hidden="true">#</a> <strong>map(function, iterable, ...)</strong></h4>
<p>将 <strong>iterable</strong>（<em>可迭代对象</em>）的每一项，传入 <strong>function</strong> 执行，返回一个包含所有结果的 <strong>迭代器</strong></p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">def</span> <span class="token function">foo</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">return</span> x <span class="token operator">*</span> x

ret <span class="token operator">=</span> <span class="token builtin">map</span><span class="token punctuation">(</span>foo<span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token comment"># => map(lambda x: x * x, [1, 2, 3, 4, 5, 6])</span>

<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token punctuation">[</span>i <span class="token keyword">for</span> i <span class="token keyword">in</span> ret<span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token comment"># [1, 4, 9, 16, 25, 36]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>特殊用法</strong></p>
<p>利用 <code v-pre>map()</code> 做类型转换</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token punctuation">[</span>i <span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">map</span><span class="token punctuation">(</span><span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token string">"12345"</span><span class="token punctuation">)</span><span class="token punctuation">]</span>

<span class="token comment"># [1, 2, 3, 4, 5]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="filter-function-iterable" tabindex="-1"><a class="header-anchor" href="#filter-function-iterable" aria-hidden="true">#</a> <strong>filter(function, iterable)</strong></h4>
<p>将 <strong>iterable</strong>（<em>可迭代对象</em>）的每一项，传入 <strong>function</strong> 执行，返回一个包含所有 <strong>真值</strong> 的 <strong>迭代器</strong></p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token comment"># 当 function 不为 None 的时是	(item for item in iterable if function(item))</span>

li <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">]</span>
<span class="token punctuation">[</span>i <span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">filter</span><span class="token punctuation">(</span><span class="token keyword">lambda</span> x<span class="token punctuation">:</span> x <span class="token operator">></span> <span class="token number">2</span><span class="token punctuation">,</span> li<span class="token punctuation">)</span><span class="token punctuation">]</span>	<span class="token comment"># => [i for i in li if i > 2]</span>

<span class="token comment">## [3, 4, 5]</span>


<span class="token comment"># function 为 None 的时是	(item for item in iterable if item)</span>

data <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token string">"name"</span><span class="token punctuation">:</span> <span class="token string">"zz"</span><span class="token punctuation">,</span> <span class="token string">"age"</span><span class="token punctuation">:</span> <span class="token number">18</span><span class="token punctuation">}</span>
<span class="token punctuation">[</span>i <span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">filter</span><span class="token punctuation">(</span><span class="token boolean">None</span><span class="token punctuation">,</span> data<span class="token punctuation">)</span><span class="token punctuation">]</span>				<span class="token comment"># => [i for i in data if i]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="reduce" tabindex="-1"><a class="header-anchor" href="#reduce" aria-hidden="true">#</a> <strong>reduce</strong></h4>
<p><strong>Python 3.4</strong> 中改到 <RouterLink to="/python/%E5%BA%93/%E6%A0%87%E5%87%86%E5%BA%93%E8%BF%9B%E9%98%B6/%E5%87%BD%E6%95%B0%E5%BC%8F%E7%BC%96%E7%A8%8B.html#_1-functools">functools</RouterLink> 模块中实现</p>
<h3 id="_5-5-题外话" tabindex="-1"><a class="header-anchor" href="#_5-5-题外话" aria-hidden="true">#</a> 5.5 题外话</h3>
<h4 id="函数式编程" tabindex="-1"><a class="header-anchor" href="#函数式编程" aria-hidden="true">#</a> 函数式编程</h4>
<p>起源于 <strong>范畴论</strong>（<em>Category Theory</em>）的数学分支，认为世界上所有概念体系，都成抽象成一个个 <strong>范畴</strong>（<em>category</em>）</p>
<ul>
<li><strong>范畴：</strong> 使用箭头连接的物体，彼此存在某种关系</li>
<li><strong>集合 + 函数：</strong> 所有成员是一个集合、变形关系是函数，因此通过函数，可以从范畴的一个成员，算出其他成员</li>
</ul>
<blockquote>
<p>因此可以简单理解为是 <strong>范畴类</strong> <code v-pre>Category</code> + <strong>值</strong> <code v-pre>value</code> + <strong>函数</strong> <code v-pre>function</code></p>
</blockquote>
<p>这玩意前端大放异彩，包括一些合成、柯里化、函子啥的，但不怎么符合 <strong>Python</strong> 哲学</p>
</div></template>


