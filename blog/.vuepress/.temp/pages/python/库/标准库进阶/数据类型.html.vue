<template><div><h1 id="数据类型" tabindex="-1"><a class="header-anchor" href="#数据类型" aria-hidden="true">#</a> 数据类型</h1>
<h2 id="enum-枚举" tabindex="-1"><a class="header-anchor" href="#enum-枚举" aria-hidden="true">#</a> Enum 枚举</h2>
<Alert type="info">建立**一组常量**时使用，枚举成员`可比较`，自身`可迭代`</Alert><h3 id="模块内容" tabindex="-1"><a class="header-anchor" href="#模块内容" aria-hidden="true">#</a> 模块内容</h3>
<p>模块定义了 4 个枚举类: [ <code v-pre>Enum</code>, <code v-pre>IntEnum</code>, <code v-pre>Flag</code>, <code v-pre>IntFlag</code> ]、一个辅助类 <code v-pre>auto</code>，一个装饰器 <code v-pre>unique()</code></p>
<ol>
<li>
<h5 id="enum-enum" tabindex="-1"><a class="header-anchor" href="#enum-enum" aria-hidden="true">#</a> <em>enum.Enum</em></h5>
<p>创建枚举常量的基类</p>
</li>
<li>
<h5 id="enum-intenum" tabindex="-1"><a class="header-anchor" href="#enum-intenum" aria-hidden="true">#</a> <em>enum.IntEnum</em></h5>
<p>创建 <code v-pre>int</code>子类枚举常量的基类</p>
</li>
<li>
<h5 id="enum-intflag" tabindex="-1"><a class="header-anchor" href="#enum-intflag" aria-hidden="true">#</a> <em>enum.IntFlag</em></h5>
<p>创建可与位运算符搭配使用，又不失去 <a href="https://docs.python.org/zh-cn/3/library/enum.html#enum.IntFlag" target="_blank" rel="noopener noreferrer"><code v-pre>IntFlag</code><ExternalLinkIcon/></a> 成员资格的枚举常量的基类。<a href="https://docs.python.org/zh-cn/3/library/enum.html#enum.IntFlag" target="_blank" rel="noopener noreferrer"><code v-pre>IntFlag</code><ExternalLinkIcon/></a> 成员也是 <a href="https://docs.python.org/zh-cn/3/library/functions.html#int" target="_blank" rel="noopener noreferrer"><code v-pre>int</code><ExternalLinkIcon/></a> 的子类。</p>
</li>
<li>
<h5 id="enum-flag" tabindex="-1"><a class="header-anchor" href="#enum-flag" aria-hidden="true">#</a> <em>enum.Flag</em></h5>
<p>创建可与位运算符搭配使用，又不会失去 <a href="https://docs.python.org/zh-cn/3/library/enum.html#enum.Flag" target="_blank" rel="noopener noreferrer"><code v-pre>Flag</code><ExternalLinkIcon/></a> 成员资格的枚举常量的基类。</p>
</li>
<li>
<h5 id="enum-auto" tabindex="-1"><a class="header-anchor" href="#enum-auto" aria-hidden="true">#</a> <em>enum.auto</em></h5>
<p>若创建枚举 <strong>没初始值</strong> 会自动替 <code v-pre>Enum</code> 的成员补上，默认从 1 开始。</p>
</li>
<li>
<h5 id="enum-unique" tabindex="-1"><a class="header-anchor" href="#enum-unique" aria-hidden="true">#</a> <em><a href="">enum.unique()</a></em></h5>
</li>
</ol>
<h3 id="构建枚举" tabindex="-1"><a class="header-anchor" href="#构建枚举" aria-hidden="true">#</a> 构建枚举</h3>
<p>通常有<code v-pre>两种</code>形式</p>
<p><strong>1. 继承构建：</strong></p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">from</span> enum <span class="token keyword">import</span> Enum


<span class="token keyword">class</span> <span class="token class-name">Color</span><span class="token punctuation">(</span>Enum<span class="token punctuation">)</span><span class="token punctuation">:</span>  <span class="token comment"># 继承Enum基类的构建方式</span>
    RED <span class="token operator">=</span> <span class="token number">1</span>
    GREEN <span class="token operator">=</span> <span class="token number">2</span>
    BLUE <span class="token operator">=</span> <span class="token number">3</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>类 Color 为<code v-pre>枚举</code> 或称为 <em>enum</em></li>
<li><code v-pre>Color.RED</code> 等属性为<code v-pre>枚举成员</code>，为常量</li>
<li>枚举成员具有 <code v-pre>名称</code> 和 <code v-pre>值</code> ，如 <code v-pre>Color.RED</code> 名称为 <code v-pre>RED</code>，值为 <code v-pre>1</code></li>
</ul>
<blockquote>
<p><strong>注：</strong> 成员值可以是 <code v-pre>int</code>、<code v-pre>str</code> 等。若<strong>无初值</strong>，<a href="/back_end/python/package/%E6%A0%87%E5%87%86%E5%BA%93%E8%BF%9B%E9%98%B6/%E6%95%B0%E6%8D%AE%E7%B1%BB%E5%9E%8B#enumauto" target="_blank" rel="noopener noreferrer"><code v-pre>auto</code><ExternalLinkIcon/></a> 实例可以自动为成员分配合适 的值。将 <code v-pre>auto</code>与其他值混用时务必慎重。</p>
</blockquote>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">print</span><span class="token punctuation">(</span>Color<span class="token punctuation">.</span>RED<span class="token punctuation">,</span> <span class="token builtin">type</span><span class="token punctuation">(</span>Color<span class="token punctuation">.</span>RED<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token builtin">repr</span><span class="token punctuation">(</span>Color<span class="token punctuation">.</span>RED<span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment">### 输出结果:</span>
<span class="token comment"># Color.RED &lt;enum 'Color'> &lt;Color.RED: 1></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><code v-pre>Color.RED</code> 为枚举对象 <code v-pre>&lt;enum 'Color'&gt;</code></li>
<li><code v-pre>repr</code> 包含了更多信息</li>
</ul>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">print</span><span class="token punctuation">(</span><span class="token builtin">isinstance</span><span class="token punctuation">(</span>Color<span class="token punctuation">.</span>GREEN<span class="token punctuation">,</span> Color<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token builtin">isinstance</span><span class="token punctuation">(</span>Color<span class="token punctuation">.</span>GREEN<span class="token punctuation">,</span> Enum<span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment">### 输出结果:</span>
<span class="token comment"># True True</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>枚举成员的 <code v-pre>类型</code> 就是<strong>它所属的枚举</strong>：</li>
</ul>
<p><strong>2. API 构建：</strong></p>
<p><code v-pre>Enum</code>类属于可调用对象，构建形式如下：</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>Enum<span class="token punctuation">(</span>value<span class="token operator">=</span><span class="token string">'NewEnumName'</span><span class="token punctuation">,</span> names<span class="token operator">=</span><span class="token operator">&lt;</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token operator">></span><span class="token punctuation">,</span> <span class="token operator">*</span><span class="token punctuation">,</span> module<span class="token operator">=</span><span class="token string">'...'</span><span class="token punctuation">,</span> qualname<span class="token operator">=</span><span class="token string">'...'</span><span class="token punctuation">,</span> <span class="token builtin">type</span><span class="token operator">=</span><span class="token operator">&lt;</span>mixed<span class="token operator">-</span><span class="token keyword">in</span> <span class="token keyword">class</span><span class="token operator">></span><span class="token punctuation">,</span> start<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><Alert type="error"> <Font type="error">警告:</Font><br>如果未提供 `module`，且 Enum 无法确定是哪个模块，使用**功能性 API **创建会有缺陷，存在换解释器找不到的问题，同时也不能**序列化！**，因此需如下指定：</Alert><div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code> Animal <span class="token operator">=</span> Enum<span class="token punctuation">(</span><span class="token string">'Animal'</span><span class="token punctuation">,</span> <span class="token string">'ANT BEE CAT DOG'</span><span class="token punctuation">,</span> module<span class="token operator">=</span>__name__<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>
<p>参数:</p>
<ul>
<li>
<p>value：第一个参数是<code v-pre>枚举名称</code></p>
</li>
<li>
<p>names: 第二个参数为枚举的值，有以下这么多形式：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>字符串形式： 'RED GREEN BLUE' | 'RED,GREEN,BLUE' | 'RED, GREEN, BLUE'
名称迭代器：['RED', 'GREEN', 'BLUE']
键值对迭代器：[('CYAN', 4), ('MAGENTA', 5), ('YELLOW', 6)]
字典映射：{'CHARTREUSE': 7, 'SEA_GREEN': 11, 'ROSEMARY': 42}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>module：自定义的 <code v-pre>Enum </code> 类所在模块的名称，其他 <code v-pre>解释器</code>需要，否则找不到。</p>
</li>
<li>
<p>qualname：自定义的 <code v-pre>Enum </code> 类在模块中的具体位置，<code v-pre>pickle</code> 协议需要，否则找不到。</p>
</li>
<li>
<p>type：要添加的自定义 <code v-pre>Enum </code> 类的类型。</p>
</li>
<li>
<p>start：当只传入名称时使用 <code v-pre>auto</code> 的默认初始值。</p>
</li>
</ul>
</li>
<li>
<p>示例:</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>Animal <span class="token operator">=</span> Enum<span class="token punctuation">(</span><span class="token string">'Animal'</span><span class="token punctuation">,</span> <span class="token string">'ANT BEE CAT DOG'</span><span class="token punctuation">)</span>

<span class="token keyword">print</span><span class="token punctuation">(</span>Animal<span class="token punctuation">,</span> <span class="token builtin">type</span><span class="token punctuation">(</span>Animal<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>Animal<span class="token punctuation">.</span>ANT<span class="token punctuation">,</span> <span class="token builtin">type</span><span class="token punctuation">(</span>Animal<span class="token punctuation">.</span>ANT<span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment">### 输出结果:</span>
<span class="token comment"># &lt;enum 'Animal'> &lt;class 'enum.EnumMeta'></span>
<span class="token comment"># Animal.ANT &lt;enum 'Animal'></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h3 id="使用枚举" tabindex="-1"><a class="header-anchor" href="#使用枚举" aria-hidden="true">#</a> 使用枚举</h3>
<p><strong>访问枚举属性</strong></p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">print</span><span class="token punctuation">(</span>Color<span class="token punctuation">.</span>RED<span class="token punctuation">.</span>name<span class="token punctuation">,</span> <span class="token builtin">type</span><span class="token punctuation">(</span>Color<span class="token punctuation">.</span>RED<span class="token punctuation">.</span>name<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>Color<span class="token punctuation">.</span>RED<span class="token punctuation">.</span>value<span class="token punctuation">,</span> <span class="token builtin">type</span><span class="token punctuation">(</span>Color<span class="token punctuation">.</span>RED<span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment">### 输出结果:</span>
<span class="token comment"># RED &lt;class 'str'></span>
<span class="token comment"># 1 &lt;class 'int'></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>包含了 <code v-pre>name</code> 属性是 <code v-pre>str</code> 类型的键</li>
<li>包含了 <code v-pre>value</code> 属性是自定义的值</li>
</ul>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">print</span><span class="token punctuation">(</span>Color<span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>Color<span class="token punctuation">[</span><span class="token string">"BLUE"</span><span class="token punctuation">]</span><span class="token punctuation">)</span>

<span class="token comment">### 输出结果:</span>
<span class="token comment"># Color.GREEN</span>
<span class="token comment"># Color.BLUE</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>可访问 <code v-pre>值</code> 或 <code v-pre>字典形式</code>来获取枚举对象</li>
</ul>
<p><strong>枚举成员可哈希，可用于 <code v-pre>字典</code> 和 <code v-pre>集合</code>：</strong></p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>dict1 <span class="token operator">=</span> <span class="token punctuation">{</span>Color<span class="token punctuation">.</span>RED<span class="token punctuation">,</span> <span class="token string">"1"</span><span class="token punctuation">}</span>

<span class="token keyword">print</span><span class="token punctuation">(</span>dict1<span class="token punctuation">)</span>

<span class="token comment">### 输出结果:</span>
<span class="token comment"># {&lt;Color.RED: 1>, '1'}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>使用<code v-pre>auto</code>自动值</strong></p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">from</span> enum <span class="token keyword">import</span> Enum<span class="token punctuation">,</span> auto


<span class="token keyword">class</span> <span class="token class-name">Color</span><span class="token punctuation">(</span>Enum<span class="token punctuation">)</span><span class="token punctuation">:</span>
    RED <span class="token operator">=</span> auto<span class="token punctuation">(</span><span class="token punctuation">)</span>
    GREEN <span class="token operator">=</span> auto<span class="token punctuation">(</span><span class="token punctuation">)</span>
    BLUE <span class="token operator">=</span> auto<span class="token punctuation">(</span><span class="token punctuation">)</span>


<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token builtin">list</span><span class="token punctuation">(</span>Color<span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment">### 输出结果:</span>
<span class="token comment"># [&lt;Color.RED: 1>, &lt;Color.GREEN: 2>, &lt;Color.BLUE: 3>]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以通过<strong>继承<code v-pre>Enum</code>类</strong> 复写 <code v-pre>_generate_next_value_()</code> 方法来<strong>重载构建</strong>自动生成的默认值</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">class</span> <span class="token class-name">AutoName</span><span class="token punctuation">(</span>Enum<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">_generate_next_value_</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> start<span class="token punctuation">,</span> count<span class="token punctuation">,</span> last_values<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">return</span> name


<span class="token keyword">class</span> <span class="token class-name">Color</span><span class="token punctuation">(</span>AutoName<span class="token punctuation">)</span><span class="token punctuation">:</span>
    RED <span class="token operator">=</span> auto<span class="token punctuation">(</span><span class="token punctuation">)</span>
    GREEN <span class="token operator">=</span> auto<span class="token punctuation">(</span><span class="token punctuation">)</span>
    BLUE <span class="token operator">=</span> auto<span class="token punctuation">(</span><span class="token punctuation">)</span>


<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token builtin">list</span><span class="token punctuation">(</span>Color<span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment">### 输出结果:</span>
<span class="token comment"># [&lt;Color.RED: 'RED'>, &lt;Color.GREEN: 'GREEN'>, &lt;Color.BLUE: 'BLUE'>]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="唯一枚举" tabindex="-1"><a class="header-anchor" href="#唯一枚举" aria-hidden="true">#</a> 唯一枚举</h3>
<blockquote>
<p>默认情况下，枚举允许 <code v-pre>多个名称</code> 作为<strong>一个值</strong>的 <code v-pre>别名</code>。如需禁用此行为，<strong>@unique</strong>装饰器可以确保枚举中的值仅能只用一次：</p>
</blockquote>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">from</span> enum <span class="token keyword">import</span> Enum<span class="token punctuation">,</span> unique


<span class="token decorator annotation punctuation">@unique</span>
<span class="token keyword">class</span> <span class="token class-name">Mistake</span><span class="token punctuation">(</span>Enum<span class="token punctuation">)</span><span class="token punctuation">:</span>
    ONE <span class="token operator">=</span> <span class="token number">1</span>
    TWO <span class="token operator">=</span> <span class="token number">2</span>
    THREE <span class="token operator">=</span> <span class="token number">3</span>
    FOUR <span class="token operator">=</span> <span class="token number">3</span>

<span class="token comment">### 输出结果:</span>
<span class="token comment"># ValueError: duplicate values found in &lt;enum 'Mistake'>: FOUR -> THREE</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>专用于枚举的<code v-pre>class</code> 类装饰器。 它会搜索一个枚举的 <code v-pre>__members__</code> 并查找所有别名；但凡找到别名抛出<code v-pre>ValueError</code> 异常</p>
<h3 id="迭代" tabindex="-1"><a class="header-anchor" href="#迭代" aria-hidden="true">#</a> 迭代</h3>
<p><strong>使用 <code v-pre>list</code> 迭代</strong></p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">class</span> <span class="token class-name">Mistake</span><span class="token punctuation">(</span>Enum<span class="token punctuation">)</span><span class="token punctuation">:</span>
    ONE <span class="token operator">=</span> <span class="token number">1</span>
    TWO <span class="token operator">=</span> <span class="token number">2</span>
    THREE <span class="token operator">=</span> <span class="token number">3</span>
    FOUR <span class="token operator">=</span> <span class="token number">3</span>


<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token builtin">list</span><span class="token punctuation">(</span>Mistake<span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment">### 输出结果:</span>
<span class="token comment"># [&lt;Mistake.ONE: 1>, &lt;Mistake.TWO: 2>, &lt;Mistake.THREE: 3>]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>注：转为<code v-pre>list</code> ，不会将相同值的 <code v-pre>别名成员</code> 也加入列表中，之会加入先定义的成员</p>
</blockquote>
<p><strong>枚举成员可按<code v-pre>自定义顺序</code>迭代</strong></p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">for</span> item <span class="token keyword">in</span> Color<span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>item<span class="token punctuation">,</span> <span class="token builtin">type</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment">### 输出结果:</span>
<span class="token comment"># Color.RED &lt;enum 'Color'></span>
<span class="token comment"># Color.GREEN &lt;enum 'Color'></span>
<span class="token comment"># Color.BLUE &lt;enum 'Color'></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>使用特殊属性 <code v-pre>__members__</code></strong></p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">for</span> name<span class="token punctuation">,</span> member <span class="token keyword">in</span> Mistake<span class="token punctuation">.</span>__members__<span class="token punctuation">.</span>items<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> member<span class="token punctuation">,</span> member<span class="token punctuation">.</span>value<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>枚举类的 <code v-pre>__members__</code> 属性可以转为 <code v-pre>{ 名称: 成员 }</code> 的<strong>只读有序映射</strong>，方便遍历</p>
<h3 id="序列化" tabindex="-1"><a class="header-anchor" href="#序列化" aria-hidden="true">#</a> 序列化</h3>
<p>枚举可被 <a href="/back_end/python/package/%E6%A0%87%E5%87%86%E5%BA%93%E5%9F%BA%E7%A1%80/%E5%BA%8F%E5%88%97%E5%8C%96" target="_blank" rel="noopener noreferrer">序列化<ExternalLinkIcon/></a></p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">from</span> pickle <span class="token keyword">import</span> dumps<span class="token punctuation">,</span> loads

<span class="token keyword">print</span><span class="token punctuation">(</span>dumps<span class="token punctuation">(</span>Mistake<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>loads<span class="token punctuation">(</span>dumps<span class="token punctuation">(</span>Mistake<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>Mistake <span class="token keyword">is</span> loads<span class="token punctuation">(</span>dumps<span class="token punctuation">(</span>Mistake<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment">### 输出结果:</span>
<span class="token comment"># b'\x80\x03c__main__\nMistake\nq\x00.'</span>
<span class="token comment"># &lt;enum 'Mistake'></span>
<span class="token comment"># True</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p><strong>注：</strong> 通过在枚举类中定义 <a href="https://docs.python.org/zh-cn/3/library/pickle.html#object.__reduce_ex__" target="_blank" rel="noopener noreferrer"><code v-pre>__reduce_ex__()</code><ExternalLinkIcon/></a> 可以对 <code v-pre>Enum</code> 成员的 <code v-pre>序列化/反序列化</code> 方式进行修改。</p>
</blockquote>
<hr>
<h2 id="collections-容器" tabindex="-1"><a class="header-anchor" href="#collections-容器" aria-hidden="true">#</a> collections 容器</h2>
<p>实现了特定目标的容器，以提供 Python 标准内建容器 dict , list , set , 和 tuple 的替代选择。</p>
<h4 id="namedtuple" tabindex="-1"><a class="header-anchor" href="#namedtuple" aria-hidden="true">#</a> namedtuple</h4>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><pre><code>标准库中实现了额外的数据结构 from collections import *

1.namedtuple():     --  用于创建一个自定义的tuple对象，和命名字段。
    主要用来产生可以使用名称来访问元素的数据对象，通常用来增强代码的可读性， 在访问一些tuple类型的数据时尤其好用。
    Point = namedtuple('Point', ['x', 'y'])
    p = Point(10, y=20)

    之后除了可以用通常的p[0] 来访问元素，还可以用p.y来访问元素（根据属性来引用,对元素命名）
    例：
        Website = namedtuple('Website', ['name', 'url', 'founder'])
        ws = Website('google', 'http://www.google.com/', u'Lawrence Edward Page')

2.defaultdict():    --  用于创建一个新的类字典对象
    使用Python原生的数据结构dict的时候，如果用 d[key] 这样的方式访问， 当指定的key不存在时，是会抛出KeyError异常的。
    而用defaultdict() 取不存在的 key时则会返回默认值。

    通常需要构建某种对应（比如某对象的年龄和人/人数之间的）关系之类的十分方便。

    例如：现在需要用for循环来造字典，把课表加入到已查找出的目标学生类中（namedtuple元组表示）
        dict{键：('StudentClass',['class_id']...)，值：[课表日期]} 这种样子
        stu_schedule={}
        for plan in plans:
            stu_schedule[StudentClass].extend(plan)

        用以上方式绝对挂，报KeyError异常


    如果使用defaultdict，只要你传入一个默认的工厂方法，那么请求一个不存在的key时，便会调用这个工厂方法使用其结果来作为
    这个key的默认值。（这个factory_function可以是int、set、dict等等，list对应[ ]，str对应&quot;&quot;，set对应set( )，int对应0）

    统计次数：
        普通方式：
            lists = ['a','a','b',5,6,7,5]
            count_dict = dict()
            for item in lists:
                if item in count_dict:
                    count_dict[item] += 1
                else:
                    count_dict[item] = 1

        defaultdict方式：
            bag = ['apple', 'orange', 'cherry', 'apple','apple', 'cherry', 'blueberry']
            count = collections.defaultdict(int) # 值的类型为int 统计键出现次数
            for fruit in bag:
                count[fruit] += 1

    注意：这些参数为dict &lt;键，值&gt; 中 值的类型，不仅如此该参数还可以传入函数参数 如：
        def zero():
            return 0
        dic = defaultdict(zero)
        dic['abc']      -- 结果：defaultdict(&lt;function zero at 0x0000000002051F28&gt;, {'abc': 0})

    备注：
        在分类相关的场景下使用十分方便，在python2.7中还会默认对defaultdict(int)生成的空字典的键进行排序（这很奇怪），但3.6无

3.deque：(double-ended queue)    --  双端队列（双向链表）
    使用list存储数据时，按索引访问元素很快，但是插入和删除元素就很慢了，因为list是线性存储，数据量大的时候，插入和删除效率很低。
    因此deque最大的好处就是实现了从队列 头部快速增加和取出对象: .popleft(), .appendleft()。
    append、appendleft、pop、popleft：分别再后、前添加、删除元素
    同时拥有list的extend、clear、copy、count、index、insert、remove、reverse 等方法
    额外方法：rotate（旋转：把右边元素放到左边）extendleft 从前（队列左边）扩展一个列表的元素

    注意：双端队列不支持切片

4.Counter：  --  计数器，用于计数（dict子类）
    如一段文字中出现某个单词的次数,返回形似字典的Counter对象，可利用字典的方式取值

    .most_common(5)：获取频率最高的5个字符

    除此之外，利用
        count = {}
        for kw in str:
            count[kw] = count.setdefault(kw, 0) + 1  这种方式，或上文的defaultdict 也可以实现计数

5.OrderedDict   --  用于dict确定顺序，还可利用与json序列化时object_pairs_hook排序解析（见4.2）
    在Python中，dict这个数据结构由于hash的特性，是无序的。在对dict做迭代时，我们无法确定Key的顺序，这在有的时候会给
    我们带来一些麻烦，因此在获得一个有序的字典对象利用。

    创建一个有序字典（这里有序指的是按照创建的顺序，因为python的字典是无序的[除了3.6版本默认按创建顺序作为顺序（自带OrderedDict）]）
        dic = collections.OrderedDict() # 之后顺序为往字典中插入的先后顺序

    对键进行由大到小排序（值也类似）
        OrderedDict(sorted(dict.items(), key=lambda x:x[0], reverse=True))
        注：等同于
        OrderedDict(sorted(dict.items(), key=itemgetter(0), reverse=True))

    注意：要保持构建字典前key的顺序（只和构建前、key有关），思考：如何用OrderedDict实现一个FIFO（先进先出）的dict
</code></pre>
<h3 id="collections-abc" tabindex="-1"><a class="header-anchor" href="#collections-abc" aria-hidden="true">#</a> collections.abc</h3>
<p>容器抽象基类</p>
</div></template>


