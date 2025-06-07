<template><div><h1 id="sync-mutex-发展史" tabindex="-1"><a class="header-anchor" href="#sync-mutex-发展史"><span>sync.Mutex 发展史</span></a></h1>
<h2 id="_1-first-commit" tabindex="-1"><a class="header-anchor" href="#_1-first-commit"><span>1. First Commit</span></a></h2>
<p>2008 年，@rsc 提交了 <a href="https://github.com/golang/go/commit/bf3dd3f0efe5b45947a991e22660c62d4ce6b671#diff-a8c424f9dc7e3acf3f180a5cbf3f7748e6fd39c6f1eab0b4fd7ec11c548cdbeb" target="_blank" rel="noopener noreferrer">sync.Mutex 的初始版本代码</a> ，早期实现相对简单，结合了 CAS（比较并交换）和信号量。</p>
<h2 id="_2-抢占-计数优化" tabindex="-1"><a class="header-anchor" href="#_2-抢占-计数优化"><span>2. 抢占&amp;计数优化</span></a></h2>
<p>2011 年，@dvyukov 提交了第一个 <a href="https://codereview.appspot.com/4631075/#ps2001" target="_blank" rel="noopener noreferrer">sync 优化</a>：改进 <strong>Mutex</strong> 以允许连续获取，引入了 <code v-pre>mutexWoken</code> （唤醒状态）和 <strong>等待者计数</strong> 的概念</p>
<h3 id="_2-1-抢锁" tabindex="-1"><a class="header-anchor" href="#_2-1-抢锁"><span>2.1 抢锁</span></a></h3>
<div class="language-go line-numbers-mode" data-highlighter="shiki" data-ext="go" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">type</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> Mutex</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> struct</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    state</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> int32</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    sema</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">  uint32</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">const</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> (</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">     mutexLocked</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B"> =</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 1</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> &#x3C;&#x3C;</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> iota</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"> // 第0行：iota=0 → 1&#x3C;&#x3C;0 = 1   mutex is locked</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">   	 mutexWoken</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">              // 第1行：iota=1 → 1&#x3C;&#x3C;1 = 2</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">   	 mutexWaiterShift</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B"> =</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> iota</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"> // 第2行：iota=2 → 直接赋值为2</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">func</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> (</span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">m </span><span style="--shiki-light:#383A42;--shiki-dark:#C678DD">*</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">Mutex</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">) </span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">Lock</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">() {</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">    // Fast path: 幸运case，能够直接获取到锁</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    if</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> atomic</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">CompareAndSwapInt32</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#383A42;--shiki-dark:#C678DD">&#x26;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">m</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">state</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">0</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">mutexLocked</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">) {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">        return</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    awoke</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B"> :=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> false</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    for</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">        old</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B"> :=</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> m</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">state</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">        new</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B"> :=</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> old</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> |</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> mutexLocked</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"> // 新状态加锁</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">        if</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> old</span><span style="--shiki-light:#383A42;--shiki-dark:#C678DD">&#x26;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">mutexLocked</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> !=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 0</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">            new</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B"> =</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> old</span><span style="--shiki-light:#383A42;--shiki-dark:#C678DD"> +</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 1</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">&#x3C;&#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">mutexWaiterShift</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"> //等待者数量加一</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        }</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">        if</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> awoke</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">            // goroutine是被唤醒的，</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">            // 新状态清除唤醒标志</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">            new</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B"> &#x26;^=</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> mutexWoken</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        }</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">        if</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> atomic</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">CompareAndSwapInt32</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#383A42;--shiki-dark:#C678DD">&#x26;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">m</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">state</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">old</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">new</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">) { </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">//设置新状态</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">            if</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> old</span><span style="--shiki-light:#383A42;--shiki-dark:#C678DD">&#x26;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">mutexLocked</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> ==</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 0</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">                // 锁原状态未加锁</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">                break</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">            }</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">            runtime</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">Semacquire</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#383A42;--shiki-dark:#C678DD">&#x26;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">m</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">sema</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">) </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// 请求信号量</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">            awoke</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B"> =</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> true</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>state字段：</strong> 通过位掩码存储锁状态，非常巧妙，分别是：</p>
<table>
<thead>
<tr>
<th style="text-align:center">位域</th>
<th style="text-align:center">用途</th>
<th style="text-align:center">操作示例</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center"><code v-pre>[0]</code></td>
<td style="text-align:center">锁持有状态 mutexLocked</td>
<td style="text-align:center"><code v-pre>state &amp; 1</code></td>
</tr>
<tr>
<td style="text-align:center"><code v-pre>[1]</code></td>
<td style="text-align:center">唤醒标志 mutexWoken</td>
<td style="text-align:center"><code v-pre>state &amp; 2</code></td>
</tr>
<tr>
<td style="text-align:center"><code v-pre>[2:31]</code></td>
<td style="text-align:center">等待者数量 mutexWaiterShift</td>
<td style="text-align:center"><code v-pre>state &gt;&gt; 2</code></td>
</tr>
</tbody>
</table>
<p><strong>比特位0-1</strong>：</p>
<ul>
<li>0 = <code v-pre>mutexLocked </code> 表示锁是否被持有， 持有锁的标记）</li>
<li>1 = <code v-pre>mutexWoken</code> 表示是否有被唤醒的 goroutine</li>
</ul>
<p>✅ <strong>比特位2-31</strong>： 表示等待锁的 goroutine 数量</p>
<ul>
<li><strong>全部存储等待者的数量</strong>，通过 <code v-pre>state &gt;&gt; 2</code> 读取</li>
<li>最大理论值：<code v-pre>2²⁹ - 1</code>（29位有效计数，因 <code v-pre>1&lt;&lt;2</code> 占用了第2位）</li>
</ul>
<table>
<thead>
<tr>
<th>位数</th>
<th>第 31...2 位</th>
<th>第1位</th>
<th>第0位</th>
</tr>
</thead>
<tbody>
<tr>
<td>含义</td>
<td><strong>位移计算的起始位置</strong></td>
<td>mutexWoken</td>
<td>mutexLocked</td>
</tr>
</tbody>
</table>
<div class="language-go line-numbers-mode" data-highlighter="shiki" data-ext="go" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">state</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B"> +=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 1</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> &#x3C;&#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> mutexWaiterShift</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">  // 每次+4（二进制 0b100）</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>在比特位2-31区域累加计数（如<code v-pre>0b100</code>=1个等待者，<code v-pre>0b1000</code>=2个等待者）</p>
<h3 id="_2-2-抢锁流程-3-个-goroutine-抢锁" tabindex="-1"><a class="header-anchor" href="#_2-2-抢锁流程-3-个-goroutine-抢锁"><span>2.2 抢锁流程**（3 个 Goroutine 抢锁）**</span></a></h3>
<h4 id="步骤-1-g1-第一个调用-lock" tabindex="-1"><a class="header-anchor" href="#步骤-1-g1-第一个调用-lock"><span>步骤 1: G1 第一个调用 Lock()</span></a></h4>
<h5 id="g1-执行流程" tabindex="-1"><a class="header-anchor" href="#g1-执行流程"><span><strong>G1 执行流程</strong></span></a></h5>
<p>Fast Path</p>
<div class="language-go line-numbers-mode" data-highlighter="shiki" data-ext="go" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">atomic</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">CompareAndSwapInt32</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#383A42;--shiki-dark:#C678DD">&#x26;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">m</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">state</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">0</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">) </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// 0 → 1</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><ul>
<li><strong>成功</strong>！G1 直接获取锁。</li>
</ul>
<h5 id="状态更新" tabindex="-1"><a class="header-anchor" href="#状态更新"><span><strong>状态更新</strong></span></a></h5>
<div class="language-markdown line-numbers-mode" data-highlighter="shiki" data-ext="markdown" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">m.state = 1 (二进制: 00000001)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">| Bit 0 (mutexLocked) = 1 (锁被持有)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">| 其他位 = 0</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<h4 id="步骤-2-g2-调用-lock-锁已被-g1-持有" tabindex="-1"><a class="header-anchor" href="#步骤-2-g2-调用-lock-锁已被-g1-持有"><span><strong>步骤 2: G2 调用 Lock()（锁已被 G1 持有）</strong></span></a></h4>
<h5 id="g2-执行流程" tabindex="-1"><a class="header-anchor" href="#g2-执行流程"><span><strong>G2 执行流程</strong></span></a></h5>
<ol>
<li>
<p><strong>Fast Path 失败</strong>（<code v-pre>m.state == 1</code>）。</p>
</li>
<li>
<p>进入慢速路径</p>
<ul>
<li>
<p>第一次循环</p>
<div class="language-go line-numbers-mode" data-highlighter="shiki" data-ext="go" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">old</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B"> :=</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> m</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">state</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"> // old = 1 (00000001)</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">new</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B"> :=</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> old</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> |</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> mutexLocked</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"> // new = 1 | 1 = 1</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">if</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> old</span><span style="--shiki-light:#383A42;--shiki-dark:#C678DD">&#x26;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">mutexLocked</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> !=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 0</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"> // true (1 &#x26; 1 = 1)</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    new</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B"> =</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> old</span><span style="--shiki-light:#383A42;--shiki-dark:#C678DD"> +</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 1</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">&#x3C;&#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">mutexWaiterShift</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"> // new = 1 + 4 = 5 (00000101)</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>
<p>CAS 尝试：</p>
<div class="language-go line-numbers-mode" data-highlighter="shiki" data-ext="go" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">atomic</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">CompareAndSwapInt32</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#383A42;--shiki-dark:#C678DD">&#x26;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">m</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">state</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">5</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><ul>
<li><strong>成功</strong>！<code v-pre>m.state</code> 从 <code v-pre>1</code> 变成 <code v-pre>5</code>。</li>
</ul>
</li>
<li>
<p>G2 调用 <code v-pre>runtime.Semacquire(&amp;m.sema)</code> 进入休眠。</p>
</li>
</ul>
</li>
</ul>
</li>
</ol>
<h5 id="状态更新-1" tabindex="-1"><a class="header-anchor" href="#状态更新-1"><span><strong>状态更新</strong></span></a></h5>
<div class="language-markdown line-numbers-mode" data-highlighter="shiki" data-ext="markdown" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">m.state = 5 (二进制: 00000101)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">| Bit 0 (mutexLocked) = 1 (锁被 G1 持有)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">| Bit 1 (mutexWoken) = 0</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">| Bit 2-31 (等待者计数) = 1 (00000101 >> 2 = 1)</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<h4 id="步骤-3-g3-调用-lock-锁仍被-g1-持有-且有-1-个等待者" tabindex="-1"><a class="header-anchor" href="#步骤-3-g3-调用-lock-锁仍被-g1-持有-且有-1-个等待者"><span><strong>步骤 3: G3 调用 Lock()（锁仍被 G1 持有，且有 1 个等待者）</strong></span></a></h4>
<h5 id="g3-执行流程" tabindex="-1"><a class="header-anchor" href="#g3-执行流程"><span><strong>G3 执行流程</strong></span></a></h5>
<ol>
<li>
<p><strong>Fast Path 失败</strong>（<code v-pre>m.state == 5</code>）。</p>
</li>
<li>
<p>进入慢速路径：</p>
<ul>
<li>
<p>第一次循环：</p>
<div class="language-go line-numbers-mode" data-highlighter="shiki" data-ext="go" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">old</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B"> :=</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> m</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">state</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"> // old = 5 (00000101)</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">new</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B"> :=</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> old</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> |</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> mutexLocked</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"> // new = 5 | 1 = 5</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">if</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> old</span><span style="--shiki-light:#383A42;--shiki-dark:#C678DD">&#x26;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">mutexLocked</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> !=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 0</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"> // true (5 &#x26; 1 = 1)</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    new</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B"> =</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> old</span><span style="--shiki-light:#383A42;--shiki-dark:#C678DD"> +</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 1</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">&#x3C;&#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">mutexWaiterShift</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"> // new = 5 + 4 = 9 (00001001)</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>
<p>CAS 尝试：</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span>atomic.CompareAndSwapInt32(&#x26;m.state, 5, 9)</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><ul>
<li><strong>成功</strong>！添加一个等待者，<code v-pre>m.state</code> 从 <code v-pre>5</code> 变成 <code v-pre>9</code></li>
</ul>
</li>
<li>
<p>G3 调用 <code v-pre>runtime.Semacquire(&amp;m.sema)</code> 进入休眠</p>
</li>
</ul>
</li>
</ul>
</li>
</ol>
<h5 id="状态更新-2" tabindex="-1"><a class="header-anchor" href="#状态更新-2"><span><strong>状态更新</strong></span></a></h5>
<div class="language-markdown line-numbers-mode" data-highlighter="shiki" data-ext="markdown" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">m.state = 9 (二进制: 00001001)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">| Bit 0 (mutexLocked) = 1 (锁被 G1 持有)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">| Bit 1 (mutexWoken) = 0</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">| Bit 2-31 (等待者计数) = 2 (00001001 >> 2 = 2)</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-3-释放锁" tabindex="-1"><a class="header-anchor" href="#_2-3-释放锁"><span>2.3 释放锁</span></a></h3>
<p>释放锁的 <strong>Unlock()</strong> ⽅法同样复杂，含有大量的位运算</p>
<div class="language-go line-numbers-mode" data-highlighter="shiki" data-ext="go" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">func</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> (</span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">m </span><span style="--shiki-light:#383A42;--shiki-dark:#C678DD">*</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">Mutex</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">) </span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">Unlock</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">() {</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">    // Fast path: drop lock bit.</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    new</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B"> :=</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> atomic</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">AddInt32</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#383A42;--shiki-dark:#C678DD">&#x26;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">m</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">state</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#383A42;--shiki-dark:#C678DD">-</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">mutexLocked</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">) </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">//去掉锁标志</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    if</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> (</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">new</span><span style="--shiki-light:#383A42;--shiki-dark:#C678DD">+</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">mutexLocked</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span><span style="--shiki-light:#383A42;--shiki-dark:#C678DD">&#x26;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">mutexLocked</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> ==</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 0</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> { </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">//本来就没有加锁</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">        panic</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"sync: unlock of unlocked mutex"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    old</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B"> :=</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> new</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    for</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">        // 如果等待者为0 或者 锁是否被占用或已有唤醒标志</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">        if</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> old</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">>></span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">mutexWaiterShift</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> ==</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 0</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> ||</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> old</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">&#x26;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">mutexLocked</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">|</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">mutexWoken</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">) </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">!=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 0</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">            return</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        }</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">        // 新状态，准备唤醒goroutine</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">        new</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> (</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">old</span><span style="--shiki-light:#383A42;--shiki-dark:#C678DD"> -</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 1</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">&#x3C;&#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">mutexWaiterShift</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">) </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">|</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> mutexWoken</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"> // 减少一个等待者(减4) | 设置唤醒标志</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">        if</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> atomic</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">CompareAndSwapInt32</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#383A42;--shiki-dark:#C678DD">&#x26;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">m</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">state</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">old</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">new</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">) {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">            runtime</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">Semrelease</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#383A42;--shiki-dark:#C678DD">&#x26;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">m</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">sema</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">            return</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        }</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">        old</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B"> =</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> m</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">state</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-4-解锁流程-g1-调用-unlock-当前有-g2、g3-在等待-g4新来" tabindex="-1"><a class="header-anchor" href="#_2-4-解锁流程-g1-调用-unlock-当前有-g2、g3-在等待-g4新来"><span>2.4 解锁流程（G1 调用 Unlock()，当前有 G2、G3 在等待, G4新来）</span></a></h3>
<h4 id="初始状态-和上文加锁最后状态一致" tabindex="-1"><a class="header-anchor" href="#初始状态-和上文加锁最后状态一致"><span><strong>初始状态 （和上文加锁最后状态一致）</strong></span></a></h4>
<div class="language-markdown line-numbers-mode" data-highlighter="shiki" data-ext="markdown" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">m.state = 9 (二进制: 00001001)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">| Bit 0 (mutexLocked) = 1 (锁被 G1 持有)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">| Bit 1 (mutexWoken) = 0</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">| Bit 2-31 (等待者计数) = 2 (G2、G3 在等待)</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<h4 id="步骤-1-g1-调用-unlock" tabindex="-1"><a class="header-anchor" href="#步骤-1-g1-调用-unlock"><span><strong>步骤 1: G1 调用 Unlock()</strong></span></a></h4>
<h5 id="g1-执行流程-1" tabindex="-1"><a class="header-anchor" href="#g1-执行流程-1"><span><strong>G1 执行流程</strong></span></a></h5>
<ol>
<li>
<p><strong>Fast Path: 释放锁标志</strong></p>
<div class="language-go line-numbers-mode" data-highlighter="shiki" data-ext="go" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">new</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B"> :=</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> atomic</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">AddInt32</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#383A42;--shiki-dark:#C678DD">&#x26;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">m</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">state</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#383A42;--shiki-dark:#C678DD">-</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">mutexLocked</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">) </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// 9 - 1 = 8 (00001000)</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><ul>
<li>锁标志位清零，<code v-pre>m.state</code> 从 <code v-pre>9</code> → <code v-pre>8</code></li>
</ul>
</li>
<li>
<p><strong>检查双重解锁（确保必须是以前加了锁的才能解锁）</strong></p>
<div class="language-go line-numbers-mode" data-highlighter="shiki" data-ext="go" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">if</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> (</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">new</span><span style="--shiki-light:#383A42;--shiki-dark:#C678DD">+</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">mutexLocked</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span><span style="--shiki-light:#383A42;--shiki-dark:#C678DD">&#x26;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">mutexLocked</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> ==</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 0</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> { </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// (8+1)&#x26;1 = 9&#x26;1 = 1 != 0 → 不会触发 panic</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">    panic</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"sync: unlock of unlocked mutex"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>确认锁原本是被持有的，若未加锁接解锁，或者连续解锁都会 <strong>panic</strong>
<ul>
<li>直接 <strong>Unlock</strong>  则 <code v-pre>new = -1 =&gt; -1 + 1 &amp; 1 =&gt; 0 &amp; 1 == 0</code></li>
</ul>
</li>
</ul>
</li>
<li>
<p><strong>检查是否需要唤醒等待者</strong></p>
<div class="language-go line-numbers-mode" data-highlighter="shiki" data-ext="go" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">old</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B"> :=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 8</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">for</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">    // 条件 1: 无等待者 → 8>>2 = 2 != 0 → 不成立</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">    // 条件 2: 锁已被持有或已有唤醒标志 → 8 &#x26; (1|2) => 8 &#x26; (0001 | 0010 => 0011)3 => (1000 &#x26; 0011) => 0 → 不成立</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    if</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> old</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">>></span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">mutexWaiterShift</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> ==</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 0</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> ||</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> old</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">&#x26;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">mutexLocked</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">|</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">mutexWoken</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">) </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">!=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 0</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">        return</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    }</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">    // 1100</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>有等待者（计数=2），且无竞争（下文解释），才需要唤醒一个 <strong>Goroutine</strong></li>
<li><code v-pre>old&amp;(mutexLocked|mutexWoken) != 0</code> 何时成立？
<ul>
<li><strong>锁已被其他 Goroutine 持有</strong>（<code v-pre>mutexLocked = 0001</code>）</li>
<li><strong>已有 Goroutine 被标记为唤醒</strong>（<code v-pre>mutexWoken = 0010</code>）避免重复唤醒</li>
<li><strong>锁被持有且已有唤醒标志</strong>（极端情况）</li>
</ul>
</li>
</ul>
</li>
<li>
<p><strong>准备唤醒 G2</strong></p>
<div class="language-go line-numbers-mode" data-highlighter="shiki" data-ext="go" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">new</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> (</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">old</span><span style="--shiki-light:#383A42;--shiki-dark:#C678DD"> -</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 1</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">&#x3C;&#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">mutexWaiterShift</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">) </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">|</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> mutexWoken</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"> // (8 - 4)等待者减1 => 4 | 2 = 6 (00000110)</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">if</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> atomic</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">CompareAndSwapInt32</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#383A42;--shiki-dark:#C678DD">&#x26;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">m</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">state</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">8</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">6</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">) { </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// CAS 8 → 6</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">    runtime_Semrelease</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#383A42;--shiki-dark:#C678DD">&#x26;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">m</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">sema</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">) </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// 唤醒 G2</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    return</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>二进制视角：</p>
<table>
<thead>
<tr>
<th style="text-align:center">操作</th>
<th style="text-align:center">二进制表示</th>
<th style="text-align:center">含义</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">初始 <code v-pre>old</code></td>
<td style="text-align:center"><code v-pre>00001000</code> (8)</td>
<td style="text-align:center">等待者=2，无唤醒/锁持有</td>
</tr>
<tr>
<td style="text-align:center">减 <code v-pre>1&lt;&lt;2</code></td>
<td style="text-align:center"><code v-pre>00001000 - 00000100 = 00000100</code> (4)</td>
<td style="text-align:center">等待者-1</td>
</tr>
<tr>
<td style="text-align:center">或 <code v-pre>mutexWoken</code></td>
<td style="text-align:center">`00000100</td>
<td style="text-align:center">00000010 = 00000110` (6)</td>
</tr>
<tr>
<td style="text-align:center">最终 <code v-pre>new</code></td>
<td style="text-align:center"><code v-pre>00000110</code> (6)</td>
<td style="text-align:center">等待者=1，已唤醒</td>
</tr>
</tbody>
</table>
<ul>
<li>等待者计数减 1（<code v-pre>8 - 4 = 4</code>）</li>
<li>设置唤醒标志（<code v-pre>4 | 2 = 6</code>）</li>
<li>CAS 成功，释放信号量唤醒 G2</li>
</ul>
</li>
</ol>
<h5 id="状态更新-3" tabindex="-1"><a class="header-anchor" href="#状态更新-3"><span><strong>状态更新</strong></span></a></h5>
<div class="language-markdown line-numbers-mode" data-highlighter="shiki" data-ext="markdown" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">m.state = 6 (二进制: 00000110)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">| Bit 0 (mutexLocked) = 0 (锁未被持有)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">| Bit 1 (mutexWoken) = 1 (G2 将被唤醒)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">| Bit 2-31 (等待者计数) = 1 (G3 仍在等待)</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<h4 id="步骤-2-g2-被唤醒后抢锁-success" tabindex="-1"><a class="header-anchor" href="#步骤-2-g2-被唤醒后抢锁-success"><span><strong>步骤 2: G2 被唤醒后抢锁 - Success</strong></span></a></h4>
<h5 id="g2-执行流程-1" tabindex="-1"><a class="header-anchor" href="#g2-执行流程-1"><span><strong>G2 执行流程</strong></span></a></h5>
<ol>
<li>
<p><strong>从 <code v-pre>runtime.Semacquire()</code> 返回，设置 <code v-pre>awoke = true</code></strong></p>
</li>
<li>
<p>进入 <code v-pre>Lock()</code> 的慢路径循环</p>
<div class="language-go line-numbers-mode" data-highlighter="shiki" data-ext="go" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">for</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    old</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B"> :=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 6</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> (</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">00000110</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    new</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B"> :=</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> old</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> |</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> mutexLocked</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"> // 6 | 1 = 7 (00000111)</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    if</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> old</span><span style="--shiki-light:#383A42;--shiki-dark:#C678DD">&#x26;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">mutexLocked</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> !=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 0</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> { </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// 6 &#x26; 1 = 0 → 跳过</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    }</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    if</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> awoke</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> { </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// true		</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">        new</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B"> &#x26;^=</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> mutexWoken</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"> // 7 &#x26;^ 2 = 5 => 0111 &#x26; 1101 => (0000 0101)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    }</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    if</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> atomic</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">CompareAndSwapInt32</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#383A42;--shiki-dark:#C678DD">&#x26;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">m</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">state</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">6</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">5</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">) { </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// CAS 6 → 5</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">        if</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> old</span><span style="--shiki-light:#383A42;--shiki-dark:#C678DD">&#x26;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">mutexLocked</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> ==</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 0</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> { </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// 6 &#x26; 1 = 0 → 成功获取锁</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">            break</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>清除唤醒标志（<code v-pre>7 &amp;^ 2 = 5</code>）</li>
<li>CAS 成功，G2 获取锁, 然后 <strong>break</strong> 执行后续业务逻辑</li>
</ul>
</li>
</ol>
<h5 id="最终状态" tabindex="-1"><a class="header-anchor" href="#最终状态"><span><strong>最终状态</strong></span></a></h5>
<div class="language-markdown line-numbers-mode" data-highlighter="shiki" data-ext="markdown" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">m.state = 5 (二进制: 00000101)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">| Bit 0 (mutexLocked) = 1 (锁被 G2 持有)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">| Bit 1 (mutexWoken) = 0</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">| Bit 2-31 (等待者计数) = 1 (G3 仍在等待)</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="步骤-3-g2-被唤醒后被g4抢锁-failed" tabindex="-1"><a class="header-anchor" href="#步骤-3-g2-被唤醒后被g4抢锁-failed"><span><strong>步骤 3: G2 被唤醒后被G4抢锁 - Failed</strong></span></a></h4>
<p><strong>G4 执行流程</strong></p>
<p>此时 <strong>G2</strong> 被唤醒，但 <strong>G4</strong> 新来</p>
<div class="language-go line-numbers-mode" data-highlighter="shiki" data-ext="go" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// goroutine 4 执行 Lock()</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">if</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> atomic</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">CompareAndSwapInt32</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#383A42;--shiki-dark:#C678DD">&#x26;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">m</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">state</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">0</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">mutexLocked</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">) {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    return</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">  // 失败，因为 m.state = 6</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// 进入循环</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">for</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    old</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B"> :=</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> m</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">state</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">  // old = 6 (00000110)</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    new</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B"> :=</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> old</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> |</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> mutexLocked</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">  // new = 6 | 1 = 7 (00000111)</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    if</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> old</span><span style="--shiki-light:#383A42;--shiki-dark:#C678DD">&#x26;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">mutexLocked</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> !=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 0</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {  </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// 6 &#x26; 1 = 0，条件不成立，跳过</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">        new</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B"> =</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> old</span><span style="--shiki-light:#383A42;--shiki-dark:#C678DD"> +</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 1</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">&#x3C;&#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">mutexWaiterShift</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    }</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    if</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> awoke</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {  </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// awoke = false，跳过</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">        new</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B"> &#x26;^=</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> mutexWoken</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    }</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    if</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> atomic</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">CompareAndSwapInt32</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#383A42;--shiki-dark:#C678DD">&#x26;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">m</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">state</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">old</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">new</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">) {  </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// 尝试将 6 改为 7</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">        if</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> old</span><span style="--shiki-light:#383A42;--shiki-dark:#C678DD">&#x26;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">mutexLocked</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> ==</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 0</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {  </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// 6 &#x26; 1 = 0110 &#x26; 0001 = 0，条件成立</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">            // 此时虽然 G4是后来者，但也先尝试并获取了锁</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">            break</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">  // 成功获取锁，退出循环</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        }</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">        runtime</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">Semacquire</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#383A42;--shiki-dark:#C678DD">&#x26;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">m</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">sema</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">        awoke</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B"> =</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> true</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="步骤-4-g2-被g4抢锁后重新循环" tabindex="-1"><a class="header-anchor" href="#步骤-4-g2-被g4抢锁后重新循环"><span><strong>步骤 4: G2 被G4抢锁后重新循环</strong></span></a></h4>
<div class="language-go line-numbers-mode" data-highlighter="shiki" data-ext="go" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// G2 被唤醒后抢锁失败有继续执行 Lock() 的循环</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">for</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    old</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B"> :=</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> m</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">state</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">  // old = 7 (00000111)</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    new</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B"> :=</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> old</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> |</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> mutexLocked</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">  // new = 7 | 1 = 7 (00000111)</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    if</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> old</span><span style="--shiki-light:#383A42;--shiki-dark:#C678DD">&#x26;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">mutexLocked</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> !=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 0</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {  </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// 7 &#x26; 1 = 1，条件成立</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">        new</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B"> =</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> old</span><span style="--shiki-light:#383A42;--shiki-dark:#C678DD"> +</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 1</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">&#x3C;&#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">mutexWaiterShift</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">  // new = 7 + 4 = 11 (00001011)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    }</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    if</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> awoke</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {  </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// awoke = true</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">        new</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B"> &#x26;^=</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> mutexWoken</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">  // 11 &#x26;^ 2 = 9 (00001001)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    }</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    if</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> atomic</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">CompareAndSwapInt32</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#383A42;--shiki-dark:#C678DD">&#x26;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">m</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">state</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">old</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">new</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">) {  </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// 尝试将 7 改为 9</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">        if</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> old</span><span style="--shiki-light:#383A42;--shiki-dark:#C678DD">&#x26;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">mutexLocked</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> ==</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 0</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {  </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// 7 &#x26; 1 = 1，条件不成立</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">            break</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        }</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">        runtime</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">Semacquire</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#383A42;--shiki-dark:#C678DD">&#x26;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">m</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">sema</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)  </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">// B 再次进入等待</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">        awoke</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B"> =</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> true</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-5-总结" tabindex="-1"><a class="header-anchor" href="#_2-5-总结"><span>2.5 总结</span></a></h3>
<h5 id="该版本实现下" tabindex="-1"><a class="header-anchor" href="#该版本实现下"><span>该版本实现下：</span></a></h5>
<ul>
<li>允许一个 <strong>goroutine</strong> 进行连续获取锁</li>
<li>即使存在被阻塞的 <strong>goroutine</strong>，也可以获取一个 <strong>mutex</strong>
<ul>
<li>当锁被释放时，<code v-pre>Unlock()</code> 会设置 <code v-pre>mutexWoken</code> 标志并唤醒一个等待的 <strong>goroutine</strong></li>
<li>但是，这个被唤醒的 <strong>goroutine</strong> 并不一定立即获得锁，因为：
<ul>
<li>它需要重新执行 <strong>CAS</strong> 操作</li>
<li>如果 <strong>CAS</strong> 失败，它需要继续等待</li>
</ul>
</li>
</ul>
</li>
<li>此外，它还允许新来的 <strong>goroutine</strong> 在之前获取互斥锁 阻塞的 <strong>goroutines</strong>（也就是说，它不强制执行 <strong>FIFO</strong> ）</li>
<li>在实现层面，这是通过分离 <strong>等待者计数</strong> 来实现的 锁定标志</li>
</ul>
<p>::: tips <strong>为什么选择 1/2/4 的布局？</strong></p>
<h5 id="_1-数学本质-正交基" tabindex="-1"><a class="header-anchor" href="#_1-数学本质-正交基"><span><strong>(1) 数学本质：正交基</strong></span></a></h5>
<ul>
<li>
<p><code v-pre>1</code>、<code v-pre>2</code>、<code v-pre>4</code> 是<strong>二进制正交基</strong>，任意组合的加法不会产生进位干扰：</p>
<div class="language-markdown line-numbers-mode" data-highlighter="shiki" data-ext="markdown" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">1 (锁)   = 00000001</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">2 (唤醒) = 00000010</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">4 (等待) = 00000100</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>三者相加：<code v-pre>1 + 2 + 4 = 7 (00000111)</code>，每位独立可识别。</li>
</ul>
</li>
</ul>
<h5 id="_2-等待者计数的设计" tabindex="-1"><a class="header-anchor" href="#_2-等待者计数的设计"><span><strong>(2) 等待者计数的设计</strong></span></a></h5>
<ul>
<li>每个等待者用 <code v-pre>4</code>（即 <code v-pre>1&lt;&lt;2</code>）表示：
<ul>
<li>等待者=1 → <code v-pre>4</code> (<code v-pre>00000100</code>)</li>
<li>等待者=2 → <code v-pre>8</code> (<code v-pre>00001000</code>)</li>
<li>以此类推...</li>
</ul>
</li>
<li>关键优势：
<ul>
<li>增减等待者时直接加减 <code v-pre>4</code>，无需复杂计算。</li>
<li>通过 <code v-pre>state &gt;&gt; 2</code> 可直接得到等待者数量。</li>
</ul>
</li>
</ul>
<p>:::</p>
<h3 id="_3-自旋优化" tabindex="-1"><a class="header-anchor" href="#_3-自旋优化"><span>3. 自旋优化</span></a></h3>
<p>2015 年，@dvyukov 进行了 <a href="https://go-review.googlesource.com/c/go/+/5430/" target="_blank" rel="noopener noreferrer">第二个 sync 优化</a>：为 <strong>Mutex</strong> 添加主动自旋，主要增加了自旋逻辑。</p>
<h3 id="_4-公平优化" tabindex="-1"><a class="header-anchor" href="#_4-公平优化"><span>4. 公平优化</span></a></h3>
<p>2016 年，@dvyukov 进行了 <a href="https://go-review.googlesource.com/c/go/+/34310/" target="_blank" rel="noopener noreferrer">第三次优化 sync</a>：使 <strong>Mutex</strong> 更加公平，引入了饥饿模式的概念，使锁更加公平。</p>
<p><code v-pre>sema</code> 字段相对简单；它是 <code v-pre>runtime_SemacquireMutex</code> 和 <code v-pre>runtime_Semrelease</code> 调用所需的参数。 <code v-pre>state</code> 字段根据不同的位表示不同的含义，次版本已经扩展出了饥饿字段</p>
<p><img src="@source/go/基础/img/sync-mutex-state.png" alt="img"></p>
<p>要理解 <code v-pre>Sync.Mutex</code> ，首先需要理解 <code v-pre>runtime.semaphore</code></p>
</div></template>


