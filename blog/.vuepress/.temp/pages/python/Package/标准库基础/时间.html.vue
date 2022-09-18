<template><div><h2 id="time-模块" tabindex="-1"><a class="header-anchor" href="#time-模块" aria-hidden="true">#</a> time 模块：</h2>
<p>时间相关的操作，时间有<code v-pre>三种</code>表示方式：</p>
<ul>
<li><strong>时间戳</strong> : 多少多少秒</li>
<li><strong>格式化的字符串</strong>: 2014-11-11 11:11</li>
<li><strong>结构化时间</strong> <code v-pre>struct_time</code>: 元组包含了：年、日、星期等...</li>
</ul>
<h4 id="time-time" tabindex="-1"><a class="header-anchor" href="#time-time" aria-hidden="true">#</a> time.time</h4>
<ul>
<li>
<p>返回值:</p>
<ul>
<li>int ：从<code v-pre>Unix诞生日</code> 1970 年 1 月 1 日之后的秒</li>
</ul>
</li>
<li>
<p>示例：</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">import</span> time

ret <span class="token operator">=</span> time<span class="token punctuation">.</span>time<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>ret<span class="token punctuation">)</span>

<span class="token comment">### 输出结果：</span>
<span class="token number">1564210716.1712065</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h4 id="time-ctime" tabindex="-1"><a class="header-anchor" href="#time-ctime" aria-hidden="true">#</a> time.ctime</h4>
<ul>
<li>
<p>返回值:</p>
<ul>
<li>str ：获取当前时间，并已<code v-pre>易读</code>的方式返回</li>
</ul>
</li>
<li>
<p>示例：</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>time<span class="token punctuation">.</span>ctime<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment">### 输出结果:</span>
<span class="token comment"># Tue Jul 27 14:52:03 2019</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h4 id="time-gmtime" tabindex="-1"><a class="header-anchor" href="#time-gmtime" aria-hidden="true">#</a> time.gmtime</h4>
<ul>
<li>
<p>返回值:</p>
<ul>
<li>struct_time : 将一个 <code v-pre>时间戳</code> 转换为 <code v-pre>UTC时区</code>（0 时区）的<code v-pre>struct_time</code>。</li>
</ul>
</li>
<li>
<p>参数:</p>
<ul>
<li>seconds: str = None : 时间戳 — 秒</li>
</ul>
</li>
<li>
<p>示例：</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>time<span class="token punctuation">.</span>gmtime<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment">### 输出结果:</span>
<span class="token comment"># time.struct_time(tm_year=2019, tm_mon=7, tm_mday=27, tm_hour=7, tm_min=3, tm_sec=49, tm_wday=1, tm_yday=208, tm_isdst=0)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
</br>
<Alert type="info"> **UTC 时区：** 北京在`东八区`，东京在东九区，中心为`本初子午线`，因此英国为世界标准时间 </Alert><p><strong>结构化参数说明</strong>：</p>
<table>
<thead>
<tr>
<th style="text-align:left">索引（Index）</th>
<th style="text-align:left">属性（Attribute）</th>
<th style="text-align:left">值（Values）</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">0</td>
<td style="text-align:left">tm_year（年）</td>
<td style="text-align:left">比如 2011</td>
</tr>
<tr>
<td style="text-align:left">1</td>
<td style="text-align:left">tm_mon（月）</td>
<td style="text-align:left">1 - 12</td>
</tr>
<tr>
<td style="text-align:left">2</td>
<td style="text-align:left">tm_mday（日）</td>
<td style="text-align:left">1 - 31</td>
</tr>
<tr>
<td style="text-align:left">3</td>
<td style="text-align:left">tm_hour（时）</td>
<td style="text-align:left">0 - 23</td>
</tr>
<tr>
<td style="text-align:left">4</td>
<td style="text-align:left">tm_min（分）</td>
<td style="text-align:left">0 - 59</td>
</tr>
<tr>
<td style="text-align:left">5</td>
<td style="text-align:left">tm_sec（秒）</td>
<td style="text-align:left">0 - 61</td>
</tr>
<tr>
<td style="text-align:left">6</td>
<td style="text-align:left">tm_wday（weekday）</td>
<td style="text-align:left">0 - 6（0 表示周日）</td>
</tr>
<tr>
<td style="text-align:left">7</td>
<td style="text-align:left">tm_yday（一年中的第几天）</td>
<td style="text-align:left">1 - 366</td>
</tr>
<tr>
<td style="text-align:left">8</td>
<td style="text-align:left">tm_isdst（是否是夏令时）</td>
<td style="text-align:left">默认为-1</td>
</tr>
</tbody>
</table>
<h4 id="time-localtime" tabindex="-1"><a class="header-anchor" href="#time-localtime" aria-hidden="true">#</a> time.localtime</h4>
<ul>
<li>
<p>返回值:</p>
<ul>
<li>localtime: 将一个 <code v-pre>时间戳</code> 转换为 <code v-pre>当前时区</code>的<code v-pre>struct_time</code>。</li>
</ul>
</li>
<li>
<p>参数:</p>
<ul>
<li>seconds: str = None : 时间戳 — 秒</li>
</ul>
</li>
<li>
<p>示例：</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>time<span class="token punctuation">.</span>localtime<span class="token punctuation">(</span>time<span class="token punctuation">.</span>time<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment">### 输出结果:</span>
<span class="token comment"># time.struct_time(tm_year=2019, tm_mon=7, tm_mday=27, tm_hour=15, tm_min=24, tm_sec=28, tm_wday=1, tm_yday=208, tm_isdst=0)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<Alert type="info">**注：** 经常用到，取的即是电脑系统里的时间 </Alert><h4 id="time-strftime" tabindex="-1"><a class="header-anchor" href="#time-strftime" aria-hidden="true">#</a> time.strftime</h4>
<ul>
<li>
<p>参数:</p>
<ul>
<li>format: 格式化字符串</li>
<li>p_tuple: 结构化时间元组</li>
</ul>
</li>
<li>
<p>示例：</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>time<span class="token punctuation">.</span>strftime<span class="token punctuation">(</span><span class="token string">'%Y-%m-%d %p: %H:%M:%S'</span><span class="token punctuation">,</span> time<span class="token punctuation">.</span>localtime<span class="token punctuation">(</span>time<span class="token punctuation">.</span>time<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment">### 输出结果:</span>
<span class="token comment"># 2019-07-27 PM: 14:58:36</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<p><strong>格式化映射：</strong></p>
<img src="@source/python/Package/标准库基础/基本模块/time_format1.jpg" height="200"/>
<img src="@source/python/Package/标准库基础/基本模块/time_format2.jpg" height="200"/>
<h4 id="time-strptime" tabindex="-1"><a class="header-anchor" href="#time-strptime" aria-hidden="true">#</a> time.strptime</h4>
<ul>
<li>
<p>返回值:</p>
<ul>
<li>struct_time : 把一个<code v-pre>格式化</code>时间字符串转化为<code v-pre>struct_time</code>， <code v-pre>strftime</code> 的逆操作</li>
</ul>
</li>
<li>
<p>参数:</p>
<ul>
<li>time: str：字符串时间，需要与下面<code v-pre>format</code>参数对应</li>
<li>format: str ： 格式化字符串</li>
</ul>
</li>
<li>
<p>示例：</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>time<span class="token punctuation">.</span>strptime<span class="token punctuation">(</span><span class="token string">"2019-07-27 PM: 14:58:36"</span><span class="token punctuation">,</span> <span class="token string">'%Y-%m-%d %p: %H:%M:%S'</span><span class="token punctuation">)</span>

<span class="token comment">### 输出结果:</span>
<span class="token comment"># time.struct_time(tm_year=2019, tm_mon=7, tm_mday=27, tm_hour=14, tm_min=58, tm_sec=36, tm_wday=5, tm_yday=208, tm_isdst=-1)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h4 id="time-mktime" tabindex="-1"><a class="header-anchor" href="#time-mktime" aria-hidden="true">#</a> time.mktime</h4>
<ul>
<li>
<p>返回值:</p>
<ul>
<li>str ：将 <code v-pre>struct_time </code>转化为时间戳</li>
</ul>
</li>
<li>
<p>参数:</p>
<ul>
<li>p_tuple: struct_time： 结构化时间元组</li>
</ul>
</li>
<li>
<p>示例：</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>time<span class="token punctuation">.</span>mktime<span class="token punctuation">(</span>time<span class="token punctuation">.</span>strptime<span class="token punctuation">(</span><span class="token string">"2019-07-27 PM: 14:58:36"</span><span class="token punctuation">,</span> <span class="token string">'%Y-%m-%d %p: %H:%M:%S'</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment"># time.mktime(time.localtime())</span>

<span class="token comment">### 输出结果:</span>
<span class="token comment"># 1564210716.0</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h4 id="time-perf-counter" tabindex="-1"><a class="header-anchor" href="#time-perf-counter" aria-hidden="true">#</a> time.perf_counter</h4>
<ul>
<li>
<p>返回值:</p>
<ul>
<li>str ：返回当前 <code v-pre>CPU进程 </code> 运行的时间，计数器以微秒为单位，即<code v-pre>最高测量分辨率</code>的时钟。包括<code v-pre>睡眠时间</code>和<code v-pre>系统时间</code>。</li>
</ul>
</li>
<li>
<p>示例：</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">import</span> time
<span class="token keyword">import</span> threading


<span class="token keyword">def</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"foo-1: </span><span class="token interpolation"><span class="token punctuation">{</span>time<span class="token punctuation">.</span>perf_counter<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">"</span></span><span class="token punctuation">)</span>
    time<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"foo-2: </span><span class="token interpolation"><span class="token punctuation">{</span>time<span class="token punctuation">.</span>perf_counter<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">"</span></span><span class="token punctuation">)</span>


<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">'__main__'</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>perf_counter<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    time<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"main-1: </span><span class="token interpolation"><span class="token punctuation">{</span>time<span class="token punctuation">.</span>perf_counter<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">"</span></span><span class="token punctuation">)</span>

    ret <span class="token operator">=</span> threading<span class="token punctuation">.</span>Thread<span class="token punctuation">(</span>target<span class="token operator">=</span>foo<span class="token punctuation">,</span> <span class="token punctuation">)</span>
    ret<span class="token punctuation">.</span>start<span class="token punctuation">(</span><span class="token punctuation">)</span>

    time<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"main-2: </span><span class="token interpolation"><span class="token punctuation">{</span>time<span class="token punctuation">.</span>perf_counter<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">"</span></span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>perf_counter<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment">### 输出结果:</span>
<span class="token comment"># 0.08299</span>
<span class="token comment"># main-1: 1.0830797</span>
<span class="token comment"># foo-1: 1.0839</span>
<span class="token comment"># main-2: 2.0832556</span>
<span class="token comment"># 2.0833004</span>
<span class="token comment"># foo-2: 4.0847707</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h4 id="time-sleep" tabindex="-1"><a class="header-anchor" href="#time-sleep" aria-hidden="true">#</a> time.sleep</h4>
<ul>
<li>
<p>参数:</p>
<ul>
<li>time: str：<code v-pre>线程</code>推迟指定的时间运行，单位为秒。</li>
</ul>
</li>
<li>
<p>示例：</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>time<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>	<span class="token comment"># 此时线程会阻塞 1s</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
</ul>
</br>
<hr>
<h2 id="datetime-模块" tabindex="-1"><a class="header-anchor" href="#datetime-模块" aria-hidden="true">#</a> datetime 模块：</h2>
<pre><code>    .datetime.now()直接看时间 这种方法也常用


    timedelta:
        datetime模块中用于处理时间，代表两个datetime时间的差
        now = datetime.now()
        tommorow = now + timedelta(days=1)          # 当前时间加一天
        next_year = now + timedelta(days = 365)     # next_year距离现在多了365天， 加减其他时间同理

        因此获取两个时段的天数列表，用while start &lt; end: start += timedelta(days=1) append 即可，或是安装 boto3（自查）
</code></pre>
<hr>
</div></template>


