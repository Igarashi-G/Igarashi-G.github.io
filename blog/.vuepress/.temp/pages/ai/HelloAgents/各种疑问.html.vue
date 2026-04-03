<template><div><h2 id="预测「明天穿不穿外套」" tabindex="-1"><a class="header-anchor" href="#预测「明天穿不穿外套」"><span>预测「明天穿不穿外套」</span></a></h2>
<p>假设输入只有两个数（已经是你手工算好的特征）：</p>
<ul>
<li>
<p>x1<em>x</em>1：今天最高气温（摄氏度）</p>
</li>
<li>
<p>x2<em>x</em>2：降雨概率（0～1）</p>
</li>
</ul>
<p>模型极简：穿外套分数 = w1 * x1 + w2 * x2 + b</p>
<p>这里 (w1, w2, b) 就是三个参数（三个浮点数）。</p>
<p>它们背后的含义可以很直白：</p>
<ul>
<li>
<p>w1<em>w</em>1 通常是负数：越热越不想穿外套。</p>
</li>
<li>
<p>w2<em>w</em>2 通常是正数：越容易下雨越想穿。</p>
</li>
<li>
<p>b<em>b</em>：整体偏「穿」还是「不穿」。</p>
</li>
</ul>
<p>训练就是用很多天的真实数据，把 (w1,w2,b) 调到让预测和历史选择尽量一致。</p>
<p>这时每个浮点数有一点「可讲故事」的含义（和特征挂钩）。</p>
<h2 id="稍微真一点-nn-linear-里每个数是什么意思" tabindex="-1"><a class="header-anchor" href="#稍微真一点-nn-linear-里每个数是什么意思"><span>稍微真一点：nn.Linear 里每个数是什么意思？</span></a></h2>
<p>一层：y = x @ W + b</p>
<ul>
<li>
<p>输入向量 x<em>x</em>：比如 4 个数，表示 4 个特征。</p>
</li>
<li>
<p>W<em>W</em> 里第 i<em>i</em> 行第 j<em>j</em> 列那个浮点数：第 (j) 个输入对第 (i) 个输出贡献多少权重。</p>
</li>
<li>
<p>b<em>b</em> 里第 i<em>i</em> 个数：第 (i) 个输出的偏置。</p>
</li>
</ul>
<p>所以：单个浮点 =「某个输入通道对某个输出通道的影响力系数」（在纯线性层里相对最好讲）。</p>
<p>大模型里层数深、还有非线性，单独一个权重的人话解释会变弱，但本质仍是：这些数在定义「怎么把上一层的表示混合成下一层」。</p>
<hr>
<h2 id="_3-词-embedding-每个浮点「像什么」" tabindex="-1"><a class="header-anchor" href="#_3-词-embedding-每个浮点「像什么」"><span>3. 词 embedding：每个浮点「像什么」？</span></a></h2>
<p>词表里的「猫」可能对应一条 4096 维的向量，4096 个浮点。</p>
<ul>
<li>
<p>严格说：第 37 维等于 0.12 一般不对应「可爱度 0.12」这种固定标签；维度是学出来的，常不可逐个命名。</p>
</li>
<li>
<p>整体说：整条向量在空间里把「猫」放在和狗近、和汽车远的位置，语义靠相对位置体现。</p>
</li>
</ul>
<p>所以这类浮点：单个维度多半不讲故事；整段向量表示「这个词在语义空间里的位置」。</p>
<hr>
<h2 id="_4-和-llm-的关系-一句话" tabindex="-1"><a class="header-anchor" href="#_4-和-llm-的关系-一句话"><span>4. 和 LLM 的关系（一句话）</span></a></h2>
<p>LLM 里几亿个浮点参数，大部分是 attention / FFN 里的权重，含义类似：</p>
<ul>
<li>「当前这一层，该把哪些过去的 token、哪些通道上的信号，以多大比例混在一起」。</li>
</ul>
<p>仍然是系数，只是从「两个特征」变成了「几千维 × 很多层 × 很多头」，人脑无法逐个解释，但不是玄学：每个都是参与矩阵运算的实数系数。</p>
<hr>
<h2 id="_5-帮你收一句" tabindex="-1"><a class="header-anchor" href="#_5-帮你收一句"><span>5. 帮你收一句</span></a></h2>
<ul>
<li>
<p>张量：装这些浮点的盒子（带形状）。</p>
</li>
<li>
<p>浮点（参数）：在简单模型里常像 (w1,w2) 那种「影响力」；在深层网络里多数是 「怎么混合、传递、过滤信息」的系数。</p>
</li>
<li>
<p>不抽象的例子：气温 + 降雨概率 → 穿不穿外套 那三个数，就是最小的「参数即浮点、且有直观含义」的样板。</p>
</li>
</ul>
<p>若你愿意，可以再问：「那训练是怎么知道该把 0.12 改成 0.11 的？」 那就接 loss + 梯度 用同一套「外套」例子讲一步。</p>
<blockquote>
<p>**语言模型 (Language Model, LM)：**计算一个 **词序列*（一个句子）***出现的 <strong>概率。</strong></p>
<p>**大语言模型 (Large Language Model, LLM)：**由语言模型与统计学逐步演进到 <strong>Transformer</strong> 架构而诞生的。</p>
</blockquote>
<blockquote>
<p>**语言模型 (Language Model, LM)：**计算一个 *<em>词序列</em>（一个句子）***出现的 <strong>概率。</strong></p>
<p>**大语言模型 (Large Language Model, LLM)：**由语言模型与统计学逐步演进到 <strong>Transformer</strong> 架构而诞生的。</p>
</blockquote>
<h2 id="_1-n-gram-模型" tabindex="-1"><a class="header-anchor" href="#_1-n-gram-模型"><span>**1.**N-gram 模型</span></a></h2>
<p>在深度学习兴起前，<strong>统计是主流</strong></p>
<div class="hint-container info">
<p class="hint-container-title">相关信息</p>
<p><strong>核心思想:</strong> 算出一个句子出现的概率，等于该句子中 <strong>每个词</strong> 出现的条件概率的连乘。</p>
</div>
<p><strong>概率的链式法则:</strong></p>
<p v-pre class='katex-block'><span class="katex-display"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mi>P</mi><mo stretchy="false">(</mo><mi>S</mi><mo stretchy="false">)</mo><mo>=</mo><mi>P</mi><mo stretchy="false">(</mo><mi>w</mi><mn>1</mn><mtext>​</mtext><mo separator="true">,</mo><mi>w</mi><mn>2</mn><mtext>​</mtext><mo separator="true">,</mo><mo>…</mo><mo separator="true">,</mo><mi>w</mi><mi>m</mi><mtext>​</mtext><mo stretchy="false">)</mo><mo>=</mo><mi>P</mi><mo stretchy="false">(</mo><mi>w</mi><mn>1</mn><mtext>​</mtext><mo stretchy="false">)</mo><mo>⋅</mo><mi>P</mi><mo stretchy="false">(</mo><mi>w</mi><mn>2</mn><mtext>​</mtext><mo>∣</mo><mi>w</mi><mn>1</mn><mtext>​</mtext><mo stretchy="false">)</mo><mo>⋅</mo><mi>P</mi><mo stretchy="false">(</mo><mi>w</mi><mn>3</mn><mtext>​</mtext><mo>∣</mo><mi>w</mi><mn>1</mn><mtext>​</mtext><mo separator="true">,</mo><mi>w</mi><mn>2</mn><mtext>​</mtext><mo stretchy="false">)</mo><mo>⋯</mo><mi>P</mi><mo stretchy="false">(</mo><mi>w</mi><mi>m</mi><mtext>​</mtext><mo>∣</mo><mi>w</mi><mn>1</mn><mtext>​</mtext><mo separator="true">,</mo><mo>…</mo><mo separator="true">,</mo><mi>w</mi><mi>m</mi><mo>−</mo><mn>1</mn><mtext>​</mtext><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">P(S)=P(w1​,w2​,…,wm​)=P(w1​)⋅P(w2​∣w1​)⋅P(w3​∣w1​,w2​)⋯P(wm​∣w1​,…,wm−1​)
</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.13889em;">P</span><span class="mopen">(</span><span class="mord mathnormal" style="margin-right:0.05764em;">S</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.13889em;">P</span><span class="mopen">(</span><span class="mord mathnormal" style="margin-right:0.02691em;">w</span><span class="mord">1​</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal" style="margin-right:0.02691em;">w</span><span class="mord">2​</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="minner">…</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal" style="margin-right:0.02691em;">w</span><span class="mord mathnormal">m</span><span class="mord">​</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.13889em;">P</span><span class="mopen">(</span><span class="mord mathnormal" style="margin-right:0.02691em;">w</span><span class="mord">1​</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">⋅</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.13889em;">P</span><span class="mopen">(</span><span class="mord mathnormal" style="margin-right:0.02691em;">w</span><span class="mord">2​</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">∣</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.02691em;">w</span><span class="mord">1​</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">⋅</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.13889em;">P</span><span class="mopen">(</span><span class="mord mathnormal" style="margin-right:0.02691em;">w</span><span class="mord">3​</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">∣</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.02691em;">w</span><span class="mord">1​</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal" style="margin-right:0.02691em;">w</span><span class="mord">2​</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="minner">⋯</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal" style="margin-right:0.13889em;">P</span><span class="mopen">(</span><span class="mord mathnormal" style="margin-right:0.02691em;">w</span><span class="mord mathnormal">m</span><span class="mord">​</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">∣</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:0.8389em;vertical-align:-0.1944em;"></span><span class="mord mathnormal" style="margin-right:0.02691em;">w</span><span class="mord">1​</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="minner">…</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal" style="margin-right:0.02691em;">w</span><span class="mord mathnormal">m</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">1​</span><span class="mclose">)</span></span></span></span></span></p>
<p><img src="/api/attachments.redirect?id=b453f47c-0744-40c3-9ead-7dc4d6c83398" alt="" title=" =734x232"></p>
<p>但直接计算上述公式几乎是不可能的：</p>
<ol>
<li>每个词的条件概率没法算</li>
<li>词可能从未在训练数据中出现过</li>
</ol>
<p>因此提出了 <strong>马尔可夫假设 (Markov Assumption)</strong></p>
<div class="hint-container info">
<p class="hint-container-title">相关信息</p>
<p><strong>核心思想:</strong> 不必回溯一个词的全部历史，可以近似认为，一个词的出现概率只与它前面有限的 n−1 个词有关</p>
<p><strong>即：只看最近的，不看全部历史</strong></p>
</div>
<p>相当于 <strong>将链式法则缩小了范围：</strong></p>
<p v-pre class='katex-block'><span class="katex-display"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mi>P</mi><mo stretchy="false">(</mo><mi>w</mi><mi>i</mi><mtext>​</mtext><mo>∣</mo><mi>w</mi><mn>1</mn><mtext>​</mtext><mo separator="true">,</mo><mo>…</mo><mo separator="true">,</mo><mi>w</mi><mi>i</mi><mo>−</mo><mn>1</mn><mtext>​</mtext><mo stretchy="false">)</mo><mo>≈</mo><mi>P</mi><mo stretchy="false">(</mo><mi>w</mi><mi>i</mi><mtext>​</mtext><mo>∣</mo><mi>w</mi><mi>i</mi><mo>−</mo><mn>1</mn><mtext>​</mtext><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">P(w 
i
​
 ∣w 
1
​
 ,…,w 
i−1
​
 )≈P(w 
i
​
 ∣w 
i−1
​
 )
</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.13889em;">P</span><span class="mopen">(</span><span class="mord mathnormal" style="margin-right:0.02691em;">w</span><span class="mord mathnormal">i</span><span class="mord">​</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">∣</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:0.854em;vertical-align:-0.1944em;"></span><span class="mord mathnormal" style="margin-right:0.02691em;">w</span><span class="mord">1​</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="minner">…</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal" style="margin-right:0.02691em;">w</span><span class="mord mathnormal">i</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">1​</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">≈</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.13889em;">P</span><span class="mopen">(</span><span class="mord mathnormal" style="margin-right:0.02691em;">w</span><span class="mord mathnormal">i</span><span class="mord">​</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">∣</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:0.7429em;vertical-align:-0.0833em;"></span><span class="mord mathnormal" style="margin-right:0.02691em;">w</span><span class="mord mathnormal">i</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">1​</span><span class="mclose">)</span></span></span></span></span></p>
<p><img src="/api/attachments.redirect?id=9bdc2bb0-97d8-4b72-b4f5-7a73c376a5fc" alt="" title=" =351x210"></p>
<h3 id="_1-1-n-gram-模型是什么" tabindex="-1"><a class="header-anchor" href="#_1-1-n-gram-模型是什么"><span>1.1 N-gram 模型是什么</span></a></h3>
<p>基于这个假设建立的语言模型称之为 <strong>N-gram 模型</strong>。</p>
<ul>
<li><strong>&quot;N&quot;</strong> 代表范围*（上下文窗口大小）*。让我们来看几个最常见的例子来理解这个概念：</li>
</ul>
<p>假设你在预测下一个词。没有马尔可夫假设时，你需要考虑从第一个词到当前词的全部历史，这很复杂。</p>
<p>马尔可夫假设说：<strong>下一个词只和最近的几个词有关，不用看更早的历史</strong>。</p>
<h4 id="用生活例子理解" tabindex="-1"><a class="header-anchor" href="#用生活例子理解"><span>用生活例子理解</span></a></h4>
<p><strong>若没有马尔可夫假设（复杂）：</strong></p>
<ul>
<li>预测&quot;今天吃什么&quot;，需要知道：昨天吃了什么、前天吃了什么、上周吃了什么、上个月吃了什么...</li>
</ul>
<p><strong>有马尔可夫假设（简单）：</strong></p>
<ul>
<li>预测&quot;今天吃什么&quot;，只需要知道：昨天吃了什么（只看最近1个）</li>
</ul>
<h2 id="在语言模型中的应用" tabindex="-1"><a class="header-anchor" href="#在语言模型中的应用"><span><strong>在语言模型中的应用</strong></span></a></h2>
<h3 id="bigram-二元模型-n-2" tabindex="-1"><a class="header-anchor" href="#bigram-二元模型-n-2"><span><strong>Bigram（二元模型，N=2）</strong></span></a></h3>
<p>只看前1个词：</p>
<ul>
<li>
<p>预测&quot;学习&quot;的概率，只看前一个词&quot;agent&quot;</p>
</li>
<li>
<p>公式：P(学习 | agent) = 在&quot;agent&quot;后面出现&quot;学习&quot;的次数 / &quot;agent&quot;出现的总次数</p>
</li>
</ul>
<h3 id="trigram-三元模型-n-3" tabindex="-1"><a class="header-anchor" href="#trigram-三元模型-n-3"><span><strong>Trigram（三元模型，N=3）</strong></span></a></h3>
<p>只看前2个词：</p>
<ul>
<li>
<p>预测&quot;学习&quot;的概率，看前两个词&quot;datawhale agent&quot;</p>
</li>
<li>
<p>公式：P(学习 | datawhale agent) = 在&quot;datawhale agent&quot;后面出现&quot;学习&quot;的次数 / &quot;datawhale agent&quot;出现的总次数</p>
</li>
</ul>
<h2 id="为什么需要这个假设" tabindex="-1"><a class="header-anchor" href="#为什么需要这个假设"><span><strong>为什么需要这个假设？</strong></span></a></h2>
<p><strong>问题：</strong> 如果考虑所有历史，计算量太大，数据也不够。</p>
<p><strong>解决：</strong> 马尔可夫假设把问题简化，只考虑最近的几个词，计算更可行，也能用有限数据训练。</p>
<h2 id="简单总结" tabindex="-1"><a class="header-anchor" href="#简单总结"><span><strong>简单总结</strong></span></a></h2>
<p>马尔可夫假设 = <strong>&quot;只看最近的，忽略更早的&quot;</strong></p>
<ul>
<li>
<p>就像预测天气：通常只看最近几天的，而不是看过去一年的每一天</p>
</li>
<li>
<p>就像预测下一个词：通常只看前面1-2个词，而不是看整句话的开头</p>
</li>
</ul>
<p>这样既简化了计算，又保留了大部分有用信息。</p>
<h2 id="n-gram-模型的根本缺陷" tabindex="-1"><a class="header-anchor" href="#n-gram-模型的根本缺陷"><span><strong>N-gram 模型的根本缺陷</strong></span></a></h2>
<h3 id="问题-词被当作-孤立的符号" tabindex="-1"><a class="header-anchor" href="#问题-词被当作-孤立的符号"><span><strong>问题：词被当作“孤立的符号”</strong></span></a></h3>
<p>在 N-gram 模型中，每个词只是一个独立的符号，没有语义关系。</p>
<p><strong>举个例子：</strong></p>
<ul>
<li>
<p>&quot;苹果&quot; 和 &quot;水果&quot; 在 N-gram 看来是完全不同的符号</p>
</li>
<li>
<p>&quot;学习&quot; 和 &quot;study&quot; 也是完全不同的符号</p>
</li>
<li>
<p>模型不知道它们之间有任何关系</p>
</li>
</ul>
<p><strong>就像：</strong></p>
<ul>
<li>
<p>把每个词当作一个独立的&quot;身份证号&quot;</p>
</li>
<li>
<p>身份证号之间没有关系，即使&quot;苹果&quot;和&quot;水果&quot;语义相关，模型也看不到</p>
</li>
</ul>
<h2 id="解决方案-用向量表示词" tabindex="-1"><a class="header-anchor" href="#解决方案-用向量表示词"><span><strong>解决方案：用向量表示词</strong></span></a></h2>
<h3 id="核心思想-把词变成-坐标点" tabindex="-1"><a class="header-anchor" href="#核心思想-把词变成-坐标点"><span><strong>核心思想：把词变成“坐标点”</strong></span></a></h3>
<p>把词映射到高维空间中的点（向量），语义相近的词在空间中距离更近。</p>
<p><strong>生活化理解：</strong></p>
<p>想象一个“语义地图”：</p>
<ul>
<li>
<p>每个词是地图上的一个点</p>
</li>
<li>
<p>相近的词靠得近，不相关的词离得远</p>
</li>
<li>
<p>例如：</p>
</li>
<li>
<p>&quot;agent&quot; 和 &quot;robot&quot; 靠得很近（都是“代理/机器人”）</p>
</li>
<li>
<p>&quot;agent&quot; 和 &quot;apple&quot; 离得很远（语义无关）</p>
</li>
</ul>
<p><strong>为什么用向量？</strong></p>
<ul>
<li>
<p>向量可以表示位置和方向</p>
</li>
<li>
<p>可以计算距离和相似度</p>
</li>
<li>
<p>可以捕捉语义关系</p>
</li>
</ul>
<h2 id="词嵌入-word-embedding-是什么" tabindex="-1"><a class="header-anchor" href="#词嵌入-word-embedding-是什么"><span><strong>词嵌入（Word Embedding）是什么？</strong></span></a></h2>
<p><strong>简单说：</strong> 词嵌入就是词的“向量身份证”</p>
<ul>
<li>
<p>传统方式：词 = &quot;agent&quot;（字符串）</p>
</li>
<li>
<p>词嵌入方式：词 = [0.2, -0.5, 0.8, ..., 0.1]（一个数字向量）</p>
</li>
</ul>
<p><strong>关键特点：</strong></p>
<ol>
<li>
<p>语义相近的词，向量也相近</p>
</li>
<li>
<p>向量是连续的，可以计算相似度</p>
</li>
<li>
<p>向量维度通常很高（如 100、300、768 维）</p>
</li>
</ol>
<h2 id="前馈神经网络语言模型的两步" tabindex="-1"><a class="header-anchor" href="#前馈神经网络语言模型的两步"><span><strong>前馈神经网络语言模型的两步</strong></span></a></h2>
<h3 id="第一步-构建语义空间-词嵌入层" tabindex="-1"><a class="header-anchor" href="#第一步-构建语义空间-词嵌入层"><span><strong>第一步：构建语义空间（词嵌入层）</strong></span></a></h3>
<p><strong>做什么：</strong></p>
<ul>
<li>
<p>创建一个高维空间（如 300 维）</p>
</li>
<li>
<p>把每个词映射成这个空间中的一个向量</p>
</li>
<li>
<p>让语义相近的词在空间中靠近</p>
</li>
</ul>
<p><strong>类比：</strong></p>
<ul>
<li>
<p>就像给每个词分配一个“地址”</p>
</li>
<li>
<p>相关词的地址在附近，不相关的词地址离得远</p>
</li>
</ul>
<h3 id="第二步-学习映射函数-神经网络层" tabindex="-1"><a class="header-anchor" href="#第二步-学习映射函数-神经网络层"><span><strong>第二步：学习映射函数（神经网络层）</strong></span></a></h3>
<p><strong>做什么：</strong></p>
<ul>
<li>
<p>输入：前 n-1 个词的词向量</p>
</li>
<li>
<p>输出：下一个词的概率分布（每个词出现的概率）</p>
</li>
</ul>
<p><strong>类比：</strong></p>
<ul>
<li>
<p>输入：前几个词的“地址”</p>
</li>
<li>
<p>输出：下一个词最可能是哪个（及其概率）</p>
</li>
</ul>
<p><strong>神经网络的作用：</strong></p>
<ul>
<li>
<p>学习从上下文到下一个词的映射规律</p>
</li>
<li>
<p>通过大量数据训练，找到这个规律</p>
</li>
</ul>
<h2 id="完整流程示例" tabindex="-1"><a class="header-anchor" href="#完整流程示例"><span><strong>完整流程示例</strong></span></a></h2>
<p>假设要预测句子 &quot;datawhale agent [下一个词]&quot;</p>
<p><strong>N-gram 方式（旧方法）：</strong></p>
<p>1. 统计 &quot;agent&quot; 后面出现过哪些词</p>
<p>2. 计算每个词出现的频率</p>
<p>3. 选择频率最高的词</p>
<p>❌ 问题：不知道 &quot;agent&quot; 和 &quot;robot&quot; 有什么关系</p>
<p><strong>神经网络方式（新方法）：</strong></p>
<p>1. 把 &quot;datawhale&quot; 和 &quot;agent&quot; 转换成向量</p>
<p>- &quot;datawhale&quot; → [0.1, 0.3, -0.2, ...]</p>
<p>- &quot;agent&quot; → [0.5, -0.1, 0.8, ...]</p>
<p>2. 把这两个向量输入神经网络</p>
<p>3. 神经网络经过计算，输出所有词的概率：</p>
<p>- &quot;learns&quot;: 0.35</p>
<p>- &quot;works&quot;: 0.25</p>
<p>- &quot;runs&quot;: 0.15</p>
<p>- ... 其他词的概率</p>
<p>4. 选择概率最高的词作为预测结果</p>
<p>✅ 优势：模型能理解语义关系，因为相近的词向量也相近</p>
<h2 id="为什么这样更好" tabindex="-1"><a class="header-anchor" href="#为什么这样更好"><span><strong>为什么这样更好？</strong></span></a></h2>
<table>
<thead>
<tr>
<th>方面</th>
<th>N-gram</th>
<th>神经网络语言模型</th>
</tr>
</thead>
<tbody>
<tr>
<td>词表示</td>
<td>离散符号（字符串）</td>
<td>连续向量（数字）</td>
</tr>
<tr>
<td>语义理解</td>
<td>❌ 无法理解</td>
<td>✅ 可以理解</td>
</tr>
<tr>
<td>泛化能力</td>
<td>❌ 只能记住见过的</td>
<td>✅ 可以泛化到相似词</td>
</tr>
<tr>
<td>数据需求</td>
<td>需要大量数据统计</td>
<td>通过训练学习规律</td>
</tr>
</tbody>
</table>
<h2 id="简单总结-1" tabindex="-1"><a class="header-anchor" href="#简单总结-1"><span><strong>简单总结</strong></span></a></h2>
<ol>
<li>
<p>N-gram 的问题：把词当作孤立符号，看不到语义关系</p>
</li>
<li>
<p>解决方案：用向量表示词，让语义相近的词在空间中靠近</p>
</li>
<li>
<p>词嵌入：词的向量表示，是词的“语义坐标”</p>
</li>
<li>
<p>神经网络：学习从上下文向量到下一个词概率的映射</p>
</li>
</ol>
<p><strong>核心思想：</strong> 从“统计频率”转向“学习语义”，让模型理解词的含义，而不只是记住组合。</p>
<h2 id="_1-什么叫-拟合" tabindex="-1"><a class="header-anchor" href="#_1-什么叫-拟合"><span><strong>1. 什么叫&quot;拟合&quot;？</strong></span></a></h2>
<h3 id="简单理解-找规律" tabindex="-1"><a class="header-anchor" href="#简单理解-找规律"><span><strong>简单理解：找规律</strong></span></a></h3>
<h3 id="简单理解-找规律-1" tabindex="-1"><a class="header-anchor" href="#简单理解-找规律-1"><span><strong>简单理解：找规律</strong></span></a></h3>
<p><strong>生活例子：</strong></p>
<ul>
<li>
<p>你观察：下雨时温度下降，晴天时温度上升</p>
</li>
<li>
<p>你总结：温度 ≈ 30 - 雨量×2</p>
</li>
<li>
<p>这就是“拟合”：从数据中找到规律，用公式描述</p>
</li>
</ul>
<p><strong>在神经网络中：</strong></p>
<ul>
<li>
<p>输入：前 n-1 个词</p>
</li>
<li>
<p>输出：下一个词的概率</p>
</li>
<li>
<p>拟合：通过大量句子，让网络自动找到从输入到输出的规律</p>
</li>
</ul>
<p><strong>类比：</strong></p>
<ul>
<li>
<p>就像教小孩学语言，给他看很多句子，他慢慢学会“什么词后面通常跟什么词”</p>
</li>
<li>
<p>神经网络也是通过看大量数据，自动学会这个规律</p>
</li>
</ul>
<h2 id="_2-词向量是怎么来的-不是人工设计的" tabindex="-1"><a class="header-anchor" href="#_2-词向量是怎么来的-不是人工设计的"><span><strong>2. 词向量是怎么来的？不是人工设计的</strong></span></a></h2>
<h3 id="关键-词向量是自动学习出来的-不是人工标注的" tabindex="-1"><a class="header-anchor" href="#关键-词向量是自动学习出来的-不是人工标注的"><span><strong>关键：词向量是自动学习出来的，不是人工标注的</strong></span></a></h3>
<p><strong>错误理解：</strong></p>
<ul>
<li>
<p>人工定义 &quot;agent&quot; = [0.5, 0.2, ...]</p>
</li>
<li>
<p>人工定义 &quot;robot&quot; = [0.6, 0.3, ...]（让它靠近 agent）</p>
</li>
</ul>
<p><strong>实际情况：</strong></p>
<ul>
<li>
<p>词向量是训练过程中自动生成的</p>
</li>
<li>
<p>初始是随机值，通过训练逐步调整</p>
</li>
</ul>
<h3 id="具体过程-简化版" tabindex="-1"><a class="header-anchor" href="#具体过程-简化版"><span><strong>具体过程（简化版）</strong></span></a></h3>
<p><strong>第一步：随机初始化</strong></p>
<p>开始时，所有词的向量都是随机生成的：</p>
<p>&quot;agent&quot; → [0.1, -0.3, 0.7, ...]  (随机数字)</p>
<p>&quot;robot&quot; → [-0.2, 0.5, -0.1, ...] (随机数字)</p>
<p>&quot;apple&quot; → [0.4, 0.1, -0.5, ...]  (随机数字)</p>
<p>此时这些向量没有意义，只是随机数字。</p>
<p><strong>第二步：通过训练自动调整</strong></p>
<p>神经网络看大量句子，比如：</p>
<p>- &quot;The agent works&quot;</p>
<p>- &quot;The robot works&quot;</p>
<p>- &quot;I eat an apple&quot;</p>
<p>神经网络发现：</p>
<p>- &quot;agent&quot; 和 &quot;robot&quot; 经常出现在相似的上下文中</p>
<p>- 所以它们的向量应该靠近一些</p>
<p>- 自动调整向量，让它们更接近</p>
<p>经过大量训练后：</p>
<p>&quot;agent&quot; → [0.5, -0.1, 0.8, ...]</p>
<p>&quot;robot&quot; → [0.6, -0.2, 0.7, ...]  (现在很接近了！)</p>
<p>&quot;apple&quot; → [-0.3, 0.9, -0.4, ...] (离得远)</p>
<p><strong>核心原理：</strong> 上下文相似的词，向量会靠近</p>
<h2 id="_3-高维空间是怎么创建的-不是拍脑袋" tabindex="-1"><a class="header-anchor" href="#_3-高维空间是怎么创建的-不是拍脑袋"><span><strong>3. 高维空间是怎么创建的？不是拍脑袋</strong></span></a></h2>
<h3 id="空间是自动形成的-不是人工设计的" tabindex="-1"><a class="header-anchor" href="#空间是自动形成的-不是人工设计的"><span><strong>空间是自动形成的，不是人工设计的</strong></span></a></h3>
<p><strong>错误理解：</strong></p>
<ul>
<li>
<p>人工设计一个 300 维空间</p>
</li>
<li>
<p>人工决定每个维度代表什么</p>
</li>
</ul>
<p><strong>实际情况：</strong></p>
<ul>
<li>
<p>维度数量是人工设定的（如 300 维）</p>
</li>
<li>
<p>但每个维度的含义是训练过程中自动学习的</p>
</li>
</ul>
<h3 id="类比理解" tabindex="-1"><a class="header-anchor" href="#类比理解"><span><strong>类比理解</strong></span></a></h3>
<p><strong>想象一个&quot;语义城市&quot;：</strong></p>
<ul>
<li>
<p>你决定城市有 300 条街道（维度）</p>
</li>
<li>
<p>但每条街道代表什么，由数据决定</p>
</li>
<li>
<p>训练后，某些维度可能代表“动物性”，某些代表“动作性”等</p>
</li>
<li>
<p>这些含义是自动发现的，不是人工定义的</p>
</li>
</ul>
<p><strong>具体过程：</strong></p>
<p>1. 设定维度数：比如 300 维（这是唯一需要人工设定的）</p>
<p>2. 初始化：每个词随机分配一个 300 维的向量</p>
<p>&quot;agent&quot; → [随机, 随机, ..., 随机] (300个随机数)</p>
<p>3. 训练：看大量文本数据</p>
<p>- 如果两个词经常一起出现 → 让它们的向量靠近</p>
<p>- 如果两个词很少一起出现 → 让它们的向量远离</p>
<p>4. 自动形成空间：经过训练，语义相近的词自然聚集在一起</p>
<h2 id="_4-如何告诉程序词的近似程度-不是人工标注" tabindex="-1"><a class="header-anchor" href="#_4-如何告诉程序词的近似程度-不是人工标注"><span><strong>4. 如何告诉程序词的近似程度？不是人工标注</strong></span></a></h2>
<h3 id="完全自动-不需要人工标注" tabindex="-1"><a class="header-anchor" href="#完全自动-不需要人工标注"><span><strong>完全自动，不需要人工标注</strong></span></a></h3>
<p><strong>核心思想：</strong> 用“上下文相似性”推断“语义相似性”</p>
<h3 id="原理-分布假设-distributional-hypothesis" tabindex="-1"><a class="header-anchor" href="#原理-分布假设-distributional-hypothesis"><span><strong>原理：分布假设（Distributional Hypothesis）</strong></span></a></h3>
<p><strong>一句话：</strong> 出现在相似上下文中的词，语义也相似</p>
<p><strong>例子：</strong></p>
<p>看这些句子：</p>
<p>- &quot;The agent works efficiently&quot;</p>
<p>- &quot;The robot works efficiently&quot;</p>
<p>- &quot;The agent performs tasks&quot;</p>
<p>- &quot;The robot performs tasks&quot;</p>
<p>神经网络自动发现：</p>
<p>- &quot;agent&quot; 和 &quot;robot&quot; 经常出现在相同的位置</p>
<p>- 它们的上下文（周围的词）很相似</p>
<p>- 所以它们的语义应该相似</p>
<p>- 自动调整向量，让它们靠近</p>
<h3 id="训练过程-简化" tabindex="-1"><a class="header-anchor" href="#训练过程-简化"><span><strong>训练过程（简化）</strong></span></a></h3>
<p><strong>输入数据：</strong> 大量文本（如维基百科、新闻等）</p>
<p><strong>训练目标：</strong> 预测下一个词</p>
<p><strong>副作用（重要）：</strong> 在学会预测的同时，词向量自动学会了语义关系</p>
<p>训练过程：</p>
<p>1. 给神经网络看：&quot;The agent [下一个词]&quot;</p>
<p>2. 神经网络预测下一个词（比如 &quot;works&quot;）</p>
<p>3. 如果预测错了，调整参数（包括词向量）</p>
<p>4. 如果预测对了，稍微调整参数</p>
<p>经过百万次这样的训练：</p>
<p>- 神经网络学会了预测</p>
<p>- 同时，词向量自动学会了语义关系</p>
<p>- &quot;agent&quot; 和 &quot;robot&quot; 的向量自然靠近了</p>
<h2 id="完整流程总结" tabindex="-1"><a class="header-anchor" href="#完整流程总结"><span><strong>完整流程总结</strong></span></a></h2>
<h3 id="从零开始到词向量形成" tabindex="-1"><a class="header-anchor" href="#从零开始到词向量形成"><span><strong>从零开始到词向量形成</strong></span></a></h3>
<p>第1步：准备数据</p>
<p>↓</p>
<p>大量文本：维基百科、新闻、书籍等</p>
<p>第2步：初始化</p>
<p>↓</p>
<p>每个词随机分配一个向量（比如300维）</p>
<p>&quot;agent&quot; → [随机数, 随机数, ..., 随机数]</p>
<p>第3步：训练（自动进行，不需要人工）</p>
<p>↓</p>
<p>看句子：&quot;The agent works&quot;</p>
<p>- 输入：&quot;The agent&quot;</p>
<p>- 预测下一个词</p>
<p>- 如果预测错了，调整向量</p>
<p>- 重复百万次</p>
<p>第4步：结果（自动形成）</p>
<p>↓</p>
<p>语义相近的词，向量自动靠近</p>
<p>&quot;agent&quot; 和 &quot;robot&quot; 的向量很接近</p>
<p>&quot;agent&quot; 和 &quot;apple&quot; 的向量离得很远</p>
<h2 id="关键要点" tabindex="-1"><a class="header-anchor" href="#关键要点"><span><strong>关键要点</strong></span></a></h2>
<ol>
<li>
<p>拟合 = 从数据中找规律</p>
</li>
<li>
<p>词向量 = 训练中自动生成，不是人工设计</p>
</li>
<li>
<p>高维空间 = 维度数人工设定，空间含义自动学习</p>
</li>
<li>
<p>语义相似性 = 通过上下文相似性自动学习，不需要人工标注</p>
</li>
</ol>
<p><strong>核心思想：</strong> 让模型从数据中自动学习，而不是人工设计规则。就像小孩学语言，通过观察大量例子自动学会，而不是被逐条告知每个词的含义。</p>
<h2 id="一个完整的类比" tabindex="-1"><a class="header-anchor" href="#一个完整的类比"><span><strong>一个完整的类比</strong></span></a></h2>
<p><strong>传统方法（N-gram）：</strong></p>
<ul>
<li>像查字典：人工编写，每个词独立定义</li>
</ul>
<p><strong>神经网络方法：</strong></p>
<ul>
<li>
<p>像小孩学语言：</p>
</li>
<li>
<p>给他看大量句子（数据）</p>
</li>
<li>
<p>他自动学会词的含义和关系（训练）</p>
</li>
<li>
<p>不需要告诉他&quot;agent 和 robot 意思相近&quot;（自动学习）</p>
</li>
<li>
<p>他通过观察上下文自动理解（分布假设）</p>
</li>
</ul>
<p>这就是为什么神经网络语言模型更强大：它能自动发现人类难以明确描述的复杂语义关系。</p>
<h2 id="_1-维度数量-不是完全拍脑袋-有方法论" tabindex="-1"><a class="header-anchor" href="#_1-维度数量-不是完全拍脑袋-有方法论"><span><strong>1. 维度数量：不是完全拍脑袋，有方法论</strong></span></a></h2>
<h3 id="理论依据" tabindex="-1"><a class="header-anchor" href="#理论依据"><span><strong>理论依据</strong></span></a></h3>
<p><strong>核心权衡：表达能力 vs 计算成本</strong></p>
<p><strong>表达能力：</strong></p>
<ul>
<li>
<p>维度越高，能表达的语义信息越多</p>
</li>
<li>
<p>就像地图：街道越多，位置描述越精确</p>
</li>
</ul>
<p><strong>计算成本：</strong></p>
<ul>
<li>
<p>维度越高，计算量越大、内存占用越多</p>
</li>
<li>
<p>训练时间更长</p>
</li>
</ul>
<h3 id="经验法则和实验方法" tabindex="-1"><a class="header-anchor" href="#经验法则和实验方法"><span><strong>经验法则和实验方法</strong></span></a></h3>
<p><strong>常见维度范围：</strong></p>
<div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">小规模实验：50-100</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 维</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">中等规模：100-200</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 维</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  </span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">大规模应用：200-300</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 维</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">超大规模：300-512</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 维（如</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> BERT）</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>选择方法：</strong></p>
<p><strong>方法1：经验值（从经典论文开始）</strong></p>
<div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">Word2Vec (2013</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">): 通常用 100-300 维</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">GloVe (2014</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">): 常用 50-300 维</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">FastText: 常用 100-300 维</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">建议：从 100 或 300 维开始（这是最常用的）</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>方法2：实验法（根据任务调整）</strong></p>
<div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">1.</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 从小维度开始（如</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 50</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 维）</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">2.</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 训练模型，评估效果</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">3.</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 逐步增加维度（100,</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 200,</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 300...）</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">4.</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 观察效果提升</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">5.</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 找到"性价比"最高的维度</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">   -</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 再增加维度，效果提升不明显</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">   -</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 但计算成本显著增加</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="实际建议" tabindex="-1"><a class="header-anchor" href="#实际建议"><span><strong>实际建议</strong></span></a></h3>
<p><strong>对于初学者：</strong></p>
<ul>
<li>
<p>使用 100 或 300 维（经典选择）</p>
</li>
<li>
<p>不需要纠结，这两个维度在大多数任务上表现良好</p>
</li>
</ul>
<p><strong>对于研究/生产：</strong></p>
<ul>
<li>
<p>从 100 维开始</p>
</li>
<li>
<p>逐步增加到 200、300 维</p>
</li>
<li>
<p>观察效果和成本的平衡点</p>
</li>
</ul>
<h2 id="_2-词向量初始化方法" tabindex="-1"><a class="header-anchor" href="#_2-词向量初始化方法"><span><strong>2. 词向量初始化方法</strong></span></a></h2>
<h3 id="方法1-随机初始化-最常用" tabindex="-1"><a class="header-anchor" href="#方法1-随机初始化-最常用"><span><strong>方法1：随机初始化（最常用）</strong></span></a></h3>
<p><strong>原理：</strong> 用小的随机数初始化，让训练过程自动学习</p>
<p><strong>具体方法：</strong></p>
<p><strong>均匀分布初始化：</strong></p>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 伪代码示例</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> numpy </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">as</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> np</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">vocab_size </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 10000</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">  # 词汇表大小</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">embedding_dim </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 300</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">  # 维度</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 方法1：均匀分布 [-0.1, 0.1]</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">word_vectors </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> np.random.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">uniform</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">    low</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=-</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">0.1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">    high</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">0.1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">    size</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(vocab_size, embedding_dim)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>正态分布初始化（更常用）：</strong></p>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 方法2：正态分布，均值0，标准差0.01</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">word_vectors </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> np.random.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">normal</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">    loc</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">0.0</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,      </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 均值</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">    scale</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">0.01</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,   </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 标准差</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">    size</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(vocab_size, embedding_dim)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 或者使用 Xavier/Glorot 初始化</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">scale </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> np.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">sqrt</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">1.0</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> /</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> embedding_dim)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">word_vectors </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> np.random.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">normal</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">    loc</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">0.0</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">    scale</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">scale,</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">    size</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(vocab_size, embedding_dim)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>为什么用小的随机数？</strong></p>
<ul>
<li>
<p>避免初始值过大，导致训练不稳定</p>
</li>
<li>
<p>让所有词从相似起点开始，公平竞争</p>
</li>
<li>
<p>训练过程会自动调整到合适的值</p>
</li>
</ul>
<h3 id="方法2-预训练初始化-更高级" tabindex="-1"><a class="header-anchor" href="#方法2-预训练初始化-更高级"><span><strong>方法2：预训练初始化（更高级）</strong></span></a></h3>
<p><strong>原理：</strong> 使用已经训练好的词向量（如 Word2Vec、GloVe）</p>
<p><strong>优点：</strong></p>
<ul>
<li>
<p>从更好的起点开始</p>
</li>
<li>
<p>训练更快，效果更好</p>
</li>
</ul>
<p><strong>示例：</strong></p>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 使用预训练的 GloVe 词向量</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 下载：https://nlp.stanford.edu/projects/glove/</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 文件：glove.6B.300d.txt</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 加载预训练向量</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">pretrained_vectors </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF"> load_glove</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'glove.6B.300d.txt'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 对于词汇表中的词，使用预训练向量</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 对于未登录词（OOV），使用随机初始化</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="方法3-特殊初始化策略" tabindex="-1"><a class="header-anchor" href="#方法3-特殊初始化策略"><span><strong>方法3：特殊初始化策略</strong></span></a></h3>
<p><strong>零初始化（不推荐）：</strong></p>
<ul>
<li>
<p>所有向量初始化为 0</p>
</li>
<li>
<p>问题：所有词完全相同，梯度更新会对称，难以学习</p>
</li>
</ul>
<p><strong>大随机数初始化（不推荐）：</strong></p>
<ul>
<li>
<p>随机数范围太大（如 [-1, 1]）</p>
</li>
<li>
<p>问题：可能导致训练不稳定，梯度爆炸</p>
</li>
</ul>
<h2 id="_3-如何设计一个前馈神经网络语言模型" tabindex="-1"><a class="header-anchor" href="#_3-如何设计一个前馈神经网络语言模型"><span><strong>3. 如何设计一个前馈神经网络语言模型</strong></span></a></h2>
<h3 id="完整设计步骤" tabindex="-1"><a class="header-anchor" href="#完整设计步骤"><span><strong>完整设计步骤</strong></span></a></h3>
<p><strong>步骤1：确定超参数（需要人工设定）</strong></p>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 核心超参数</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">vocab_size </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 10000</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">        # 词汇表大小（根据数据统计）</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">embedding_dim </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 300</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">       # 词向量维度（建议：100-300）</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">context_size </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 2</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">          # 上下文窗口（看前2个词，即 trigram）</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">hidden_dim </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 512</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">          # 隐藏层维度（通常比 embedding_dim 大）</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">learning_rate </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 0.001</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">     # 学习率</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">batch_size </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 64</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">           # 批次大小</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">num_epochs </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 10</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">            # 训练轮数</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>步骤2：初始化词向量</strong></p>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> numpy </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">as</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> np</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> torch</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> torch.nn </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">as</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> nn</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 方法：正态分布初始化（推荐）</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">embedding </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> nn.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">Embedding</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">    num_embeddings</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">vocab_size,</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">    embedding_dim</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">embedding_dim</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># PyTorch 默认使用正态分布初始化</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 如果需要自定义：</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">nn.init.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">normal_</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(embedding.weight, </span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">mean</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">0.0</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">std</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">0.01</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>步骤3：设计网络结构</strong></p>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">class</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> FeedforwardLanguageModel</span><span style="--shiki-light:#C18401;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">nn</span><span style="--shiki-light:#C18401;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">Module</span><span style="--shiki-light:#C18401;--shiki-dark:#ABB2BF">)</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">:</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    def</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> __init__</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E5C07B;--shiki-dark-font-style:italic">self</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#D19A66;--shiki-dark-font-style:italic"> vocab_size</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#D19A66;--shiki-dark-font-style:italic"> embedding_dim</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#D19A66;--shiki-dark-font-style:italic"> context_size</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#D19A66;--shiki-dark-font-style:italic"> hidden_dim</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">):</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">        super</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">().</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">__init__</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">()</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        </span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">        # 1. 词嵌入层</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">        self</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.embedding </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> nn.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">Embedding</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(vocab_size, embedding_dim)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        </span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">        # 2. 输入层：将多个词的向量拼接</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        input_dim </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> embedding_dim </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">*</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> context_size</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        </span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">        # 3. 隐藏层</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">        self</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.hidden </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> nn.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">Linear</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(input_dim, hidden_dim)</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">        self</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.activation </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> nn.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">Tanh</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">()  </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 或 ReLU</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        </span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">        # 4. 输出层：预测下一个词的概率</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">        self</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.output </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> nn.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">Linear</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(hidden_dim, vocab_size)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        </span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    def</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> forward</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E5C07B;--shiki-dark-font-style:italic">self</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#D19A66;--shiki-dark-font-style:italic"> context_words</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">):</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">        # context_words: [batch_size, context_size]</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        </span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">        # 1. 将词转换为向量</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        embeddings </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B"> self</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">embedding</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(context_words)  </span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">        # [batch_size, context_size, embedding_dim]</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        </span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">        # 2. 拼接多个词的向量</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        flattened </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> embeddings.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">view</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(embeddings.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">size</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">0</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">), </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">-</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">        # [batch_size, context_size * embedding_dim]</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        </span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">        # 3. 通过隐藏层</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        hidden </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B"> self</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">activation</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">self</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">hidden</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(flattened))</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">        # [batch_size, hidden_dim]</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        </span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">        # 4. 输出每个词的概率</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        logits </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B"> self</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">output</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(hidden)</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">        # [batch_size, vocab_size]</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        </span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">        return</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> logits</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>步骤4：训练过程</strong></p>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 初始化模型</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">model </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF"> FeedforwardLanguageModel</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">    vocab_size</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">10000</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">    embedding_dim</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">300</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,      </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 从经验值开始</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">    context_size</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">2</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">    hidden_dim</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">512</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 优化器</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">optimizer </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> torch.optim.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">Adam</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(model.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">parameters</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(), </span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">lr</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">0.001</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 损失函数</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">criterion </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> nn.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">CrossEntropyLoss</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">()</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 训练循环</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">for</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> epoch </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">in</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> range</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(num_epochs):</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    for</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> batch </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">in</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> dataloader:</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        context, target </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> batch</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        </span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">        # 前向传播</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        logits </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF"> model</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(context)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        </span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">        # 计算损失</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        loss </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF"> criterion</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(logits, target)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        </span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">        # 反向传播</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        optimizer.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">zero_grad</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">()</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        loss.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">backward</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">()</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        optimizer.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">step</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">()</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        </span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">        # 词向量在这个过程中自动更新！</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-维度选择的实际建议" tabindex="-1"><a class="header-anchor" href="#_4-维度选择的实际建议"><span><strong>4. 维度选择的实际建议</strong></span></a></h2>
<h3 id="决策树" tabindex="-1"><a class="header-anchor" href="#决策树"><span><strong>决策树</strong></span></a></h3>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">问：你的数据规模？</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">├─ 小（</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">&#x3C;</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 10</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">000</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> 词）→ </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">50</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">-</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">100</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> 维</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">├─ 中（</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">10</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">000</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">-</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">100</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">000</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> 词）→ </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">100</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">-</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">300</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> 维</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">└─ 大（</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">></span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 100</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">000</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> 词）→ </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">300</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">-</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">512</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> 维</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">问：你的计算资源？</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">├─ 有限（</span><span style="--shiki-light:#383A42;--shiki-dark:#D19A66">CPU</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">/</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">小GPU）→ </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">50</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">-</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">100</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> 维</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">├─ 中等（</span><span style="--shiki-light:#383A42;--shiki-dark:#D19A66">GPU</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">）→ </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">100</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">-</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">300</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> 维</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">└─ 充足（多GPU</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">/</span><span style="--shiki-light:#383A42;--shiki-dark:#D19A66">TPU</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">）→ </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">300</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">-</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">512</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> 维</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">问：你的任务类型？</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">├─ 简单任务（分类）→ </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">50</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">-</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">100</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> 维</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">├─ 中等任务（翻译）→ </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">100</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">-</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">300</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> 维</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">└─ 复杂任务（生成）→ </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">300</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">-</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">512</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> 维</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="实验方法-推荐" tabindex="-1"><a class="header-anchor" href="#实验方法-推荐"><span><strong>实验方法（推荐）</strong></span></a></h3>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 实验不同维度，找到最佳值</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">dimensions </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> [</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">50</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">100</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">200</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">300</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">]</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">results </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">for</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> dim </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">in</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> dimensions:</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    model </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF"> create_model</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">embedding_dim</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">dim)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    accuracy </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF"> train_and_evaluate</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(model)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    results[dim] </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> accuracy</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">    print</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">f</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"维度 </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">{</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">dim</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">}</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">: 准确率 </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">{</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">accuracy</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">}</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 选择准确率和成本的平衡点</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">best_dim </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> max</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(results, </span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">key</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">lambda</span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#D19A66;--shiki-dark-font-style:italic"> k</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: results[k] </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">/</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF"> compute_cost</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(k))</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="整体理解-这是在创建一个-词向量矩阵" tabindex="-1"><a class="header-anchor" href="#整体理解-这是在创建一个-词向量矩阵"><span><strong>整体理解：这是在创建一个&quot;词向量矩阵&quot;</strong></span></a></h2>
<p><strong>简单说：</strong> 创建一个二维数组（矩阵），用来存储所有词的向量。</p>
<h3 id="创建矩阵-核心代码" tabindex="-1"><a class="header-anchor" href="#创建矩阵-核心代码"><span><strong>创建矩阵（核心代码）</strong></span></a></h3>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> numpy </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">as</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> np </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 导入 NumPy</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">vocab_size </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 10000</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">      # 词汇表大小 有 10000 个词</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">embedding_dim </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 300</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">     # 维度  每个词用 300 维向量表示</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">word_vectors </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> np.random.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">uniform</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">    low</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=-</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">0.1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">    high</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">0.1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">    size</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(vocab_size, embedding_dim)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>np.random.uniform 是什么？</strong></p>
<ul>
<li>
<p>生成均匀分布的随机数</p>
</li>
<li>
<p>uniform = 均匀分布（每个数出现的概率相等）</p>
</li>
</ul>
<p><strong>参数解释：</strong></p>
<ul>
<li>
<p>low=-0.1：随机数的最小值</p>
</li>
<li>
<p>high=0.1：随机数的最大值</p>
</li>
<li>
<p>size=(vocab_size, embedding_dim)：生成数组的形状</p>
</li>
</ul>
<p><strong>size=(10000, 300) 的含义：</strong></p>
<ul>
<li>
<p>创建一个 10000 行 × 300 列的矩阵</p>
</li>
<li>
<p>10000 行 = 10000 个词</p>
</li>
<li>
<p>300 列 = 每个词 300 维</p>
</li>
</ul>
<h2 id="结果是什么样的" tabindex="-1"><a class="header-anchor" href="#结果是什么样的"><span><strong>结果是什么样的？</strong></span></a></h2>
<h3 id="矩阵结构" tabindex="-1"><a class="header-anchor" href="#矩阵结构"><span><strong>矩阵结构</strong></span></a></h3>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">word_vectors 是一个 </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">10000</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> × </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">300</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> 的矩阵：</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        维度1    维度2    维度3    </span><span style="--shiki-light:#383A42;--shiki-dark:#D19A66">...</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    维度300</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">词1   [ </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">0.05</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,  </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">-</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">0.08</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,   </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">0.02</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,   </span><span style="--shiki-light:#383A42;--shiki-dark:#D19A66">...</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,   </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">0.09</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  ]</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">词2   [</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">-</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">0.03</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,   </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">0.07</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,  </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">-</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">0.01</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,   </span><span style="--shiki-light:#383A42;--shiki-dark:#D19A66">...</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,  </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">-</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">0.05</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  ]</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">词3   [ </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">0.08</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,  </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">-</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">0.02</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,   </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">0.06</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,   </span><span style="--shiki-light:#383A42;--shiki-dark:#D19A66">...</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,   </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">0.03</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  ]</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#D19A66">...</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">   [  </span><span style="--shiki-light:#383A42;--shiki-dark:#D19A66">...</span><span style="--shiki-light:#383A42;--shiki-dark:#D19A66">    ...</span><span style="--shiki-light:#383A42;--shiki-dark:#D19A66">     ...</span><span style="--shiki-light:#383A42;--shiki-dark:#D19A66">     ...</span><span style="--shiki-light:#383A42;--shiki-dark:#D19A66">    ...</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">   ]</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">词10000 [ </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">0.01</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,  </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">-</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">0.09</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,   </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">0.04</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,   </span><span style="--shiki-light:#383A42;--shiki-dark:#D19A66">...</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,  </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">-</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">0.07</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  ]</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>每一行代表一个词的向量：</strong></p>
<ul>
<li>
<p>第 1 行 = 第 1 个词的 300 维向量</p>
</li>
<li>
<p>第 2 行 = 第 2 个词的 300 维向量</p>
</li>
<li>
<p>...</p>
</li>
<li>
<p>第 10000 行 = 第 10000 个词的 300 维向量</p>
</li>
</ul>
<p>下面用简单方式解释这些概念。</p>
<h2 id="_1-什么是梯度" tabindex="-1"><a class="header-anchor" href="#_1-什么是梯度"><span><strong>1. 什么是梯度？</strong></span></a></h2>
<h3 id="简单理解-梯度-方向-大小" tabindex="-1"><a class="header-anchor" href="#简单理解-梯度-方向-大小"><span><strong>简单理解：梯度 = &quot;方向&quot; + &quot;大小&quot;</strong></span></a></h3>
<p><strong>生活例子：爬山</strong></p>
<p>想象你在一个山坡上，想找到最低点（山谷）：</p>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    山顶</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">      ↑</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">      |</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  \</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">      |</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">   \</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">      |</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    \  </span><span style="--shiki-light:white;--shiki-dark:#FFFFFF">你在这里</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">      |</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">     \</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">      |</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">      \</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    山谷（目标）</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p></p>
<p><strong>梯度告诉你：</strong></p>
<ul>
<li>
<p>方向：往哪个方向走能最快下山</p>
</li>
<li>
<p>大小：这个方向有多陡（坡度）</p>
</li>
</ul>
<p><strong>在神经网络中：</strong></p>
<ul>
<li>
<p>目标：找到让损失最小的参数值</p>
</li>
<li>
<p>梯度：告诉你参数应该往哪个方向调整，调整多少</p>
</li>
</ul>
<h3 id="数学上的梯度" tabindex="-1"><a class="header-anchor" href="#数学上的梯度"><span><strong>数学上的梯度</strong></span></a></h3>
<p><strong>梯度 = 导数（在多维空间中的推广）</strong></p>
<p><strong>一维例子（简单）：</strong></p>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">函数：y </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> x²</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">在 x</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">2</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> 处：</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">-</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> 梯度 </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 4</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">（正数，表示应该往左走，减小 x）</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">-</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> 如果 x 增加一点，y 会增加 </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">4</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> 倍</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">在 x</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=-</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">2</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> 处：</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">-</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> 梯度 </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2"> -</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">4</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">（负数，表示应该往右走，增加 x）</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>多维例子（词向量）：</strong></p>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">词向量有 </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">300</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> 维：[v1, v2, v3, </span><span style="--shiki-light:#383A42;--shiki-dark:#D19A66">...</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, v300]</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">梯度也是一个 </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">300</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> 维的向量：[g1, g2, g3, </span><span style="--shiki-light:#383A42;--shiki-dark:#D19A66">...</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, g300]</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">每个 g_i 告诉你：</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">-</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> v_i 应该增加还是减少（正负号）</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">-</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> 应该调整多少（数值大小）</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="梯度下降-用梯度来学习" tabindex="-1"><a class="header-anchor" href="#梯度下降-用梯度来学习"><span><strong>梯度下降：用梯度来学习</strong></span></a></h3>
<p><strong>过程：</strong></p>
<p>1. 计算梯度：看当前参数，计算梯度</p>
<p>2. 更新参数：沿着梯度方向调整参数</p>
<p>3. 重复：不断重复，直到找到最优值</p>
<p><strong>公式（简化）：</strong></p>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">新参数 </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> 旧参数 </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">-</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> 学习率 × 梯度</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">例如：</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">词向量[</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">0.1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">0.2</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#383A42;--shiki-dark:#D19A66">...</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">] </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">梯度 </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> [</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">-</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">0.05</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">0.03</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#383A42;--shiki-dark:#D19A66">...</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">]</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">学习率 </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 0.01</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">新词向量 </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> [</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">0.1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">0.2</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#383A42;--shiki-dark:#D19A66">...</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">] </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">-</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 0.01</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> × [</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">-</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">0.05</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">0.03</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#383A42;--shiki-dark:#D19A66">...</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">]</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">         =</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> [</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">0.1005</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">0.1997</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#383A42;--shiki-dark:#D19A66">...</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">]</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>类比：</strong></p>
<ul>
<li>
<p>梯度 = 指南针（告诉你方向）</p>
</li>
<li>
<p>学习率 = 步长（每次走多远）</p>
</li>
<li>
<p>更新 = 沿着指南针方向走一步</p>
</li>
</ul>
<h2 id="_2-为什么零初始化有问题" tabindex="-1"><a class="header-anchor" href="#_2-为什么零初始化有问题"><span><strong>2. 为什么零初始化有问题？</strong></span></a></h2>
<h3 id="问题1-所有词完全相同" tabindex="-1"><a class="header-anchor" href="#问题1-所有词完全相同"><span><strong>问题1：所有词完全相同</strong></span></a></h3>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 零初始化</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">word_vectors </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> np.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">zeros</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">((</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">10000</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">300</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">))</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 结果：所有词都是 [0, 0, 0, ..., 0]</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>问题：</strong></p>
<ul>
<li>
<p>所有词的向量都是 [0, 0, 0, ..., 0]</p>
</li>
<li>
<p>模型无法区分不同的词</p>
</li>
<li>
<p>就像所有词都是同一个词</p>
</li>
</ul>
<p><strong>类比：</strong></p>
<ul>
<li>
<p>就像给所有人分配相同的身份证号</p>
</li>
<li>
<p>无法区分不同的人</p>
</li>
</ul>
<h3 id="问题2-梯度更新会对称" tabindex="-1"><a class="header-anchor" href="#问题2-梯度更新会对称"><span><strong>问题2：梯度更新会对称</strong></span></a></h3>
<p><strong>什么是&quot;对称&quot;？</strong></p>
<p>如果所有词向量都是 0，它们的梯度也会相同：</p>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">词1的向量：[</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">0</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">0</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">0</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#383A42;--shiki-dark:#D19A66">...</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">] → 梯度：[g1, g2, g3, </span><span style="--shiki-light:#383A42;--shiki-dark:#D19A66">...</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">]</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">词2的向量：[</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">0</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">0</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">0</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#383A42;--shiki-dark:#D19A66">...</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">] → 梯度：[g1, g2, g3, </span><span style="--shiki-light:#383A42;--shiki-dark:#D19A66">...</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">]  (相同！)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">词3的向量：[</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">0</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">0</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">0</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#383A42;--shiki-dark:#D19A66">...</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">] → 梯度：[g1, g2, g3, </span><span style="--shiki-light:#383A42;--shiki-dark:#D19A66">...</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">]  (相同！)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">更新后：</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">词1的向量：[g1, g2, g3, </span><span style="--shiki-light:#383A42;--shiki-dark:#D19A66">...</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">]  (更新后)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">词2的向量：[g1, g2, g3, </span><span style="--shiki-light:#383A42;--shiki-dark:#D19A66">...</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">]  (更新后，还是相同！)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">词3的向量：[g1, g2, g3, </span><span style="--shiki-light:#383A42;--shiki-dark:#D19A66">...</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">]  (更新后，还是相同！)</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>结果：</strong></p>
<ul>
<li>
<p>所有词向量永远相同</p>
</li>
<li>
<p>无法学习到不同词的差异</p>
</li>
<li>
<p>模型无法区分&quot;apple&quot;和&quot;banana&quot;</p>
</li>
</ul>
<p><strong>为什么难以学习？</strong></p>
<ul>
<li>
<p>学习 = 让不同的词有不同的向量</p>
</li>
<li>
<p>如果所有词都相同，就无法学习</p>
</li>
</ul>
<h2 id="_3-什么是梯度爆炸" tabindex="-1"><a class="header-anchor" href="#_3-什么是梯度爆炸"><span><strong>3. 什么是梯度爆炸？</strong></span></a></h2>
<h3 id="简单理解-梯度变得非常大" tabindex="-1"><a class="header-anchor" href="#简单理解-梯度变得非常大"><span><strong>简单理解：梯度变得非常大</strong></span></a></h3>
<div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">正常情况：</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">梯度</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> [0.01, </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">-0.02,</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 0.03,</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> ...]</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  (小的数字)</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">更新：参数变化一点点</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">梯度爆炸：</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">梯度</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> [1000, </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">-2000,</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 3000,</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> ...]</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  (非常大的数字！)</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">更新：参数变化巨大，直接</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">"飞"</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">走了</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="为什么会梯度爆炸" tabindex="-1"><a class="header-anchor" href="#为什么会梯度爆炸"><span><strong>为什么会梯度爆炸？</strong></span></a></h3>
<p><strong>原因：链式法则的累积效应</strong></p>
<p>神经网络有多层，梯度会一层层传播：</p>
<div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">输出层</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> →</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 隐藏层</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> →</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 输入层</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">  ↓</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">        ↓</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">        ↓</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">梯度大</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">  梯度更大</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">  梯度超大！</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">数学上：</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">如果每层梯度放大</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 2</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 倍：</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">第1层：梯度</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> =</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 1</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">第2层：梯度</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> =</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 2</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">第3层：梯度</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> =</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 4</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">第4层：梯度</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> =</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 8</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">...</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">第10层：梯度</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> =</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 512</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  (爆炸！)</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="为什么大随机数初始化会导致梯度爆炸" tabindex="-1"><a class="header-anchor" href="#为什么大随机数初始化会导致梯度爆炸"><span><strong>为什么大随机数初始化会导致梯度爆炸？</strong></span></a></h3>
<p><strong>原因1：初始值太大</strong></p>
<h2 id="_1-词向量的数值如何得到" tabindex="-1"><a class="header-anchor" href="#_1-词向量的数值如何得到"><span><strong>1. 词向量的数值如何得到？</strong></span></a></h2>
<h3 id="步骤" tabindex="-1"><a class="header-anchor" href="#步骤"><span><strong>步骤</strong></span></a></h3>
<ol>
<li>
<p><strong>先设定维度</strong>：假如选 50 维。</p>
</li>
<li>
<p><strong>随机初始化</strong>：每个词先分配一个 50 维的随机向量，例如</p>
</li>
</ol>
<p>apple → [0.03, -0.07, ..., 0.01]</p>
<ol>
<li>
<p><strong>训练文本</strong>：把语料（大量句子）输入神经网络，让它学习“给定上下文预测下一个词”。</p>
</li>
<li>
<p><strong>反向传播调参</strong>：如果预测错了，网络会计算梯度，沿梯度方向更新所有参数，词向量也会被调整。</p>
</li>
<li>
<p><strong>反复迭代</strong>：在上亿个句子上不断重复，词向量逐步从随机值变成有语义的表示。</p>
</li>
</ol>
<p><strong>所以：</strong> 这些数字并没有人去“打分”，而是模型在优化目标函数（最小化预测误差）时自动调整出来的。</p>
<h2 id="_2-向量之间的关系怎么体现" tabindex="-1"><a class="header-anchor" href="#_2-向量之间的关系怎么体现"><span><strong>2. 向量之间的关系怎么体现？</strong></span></a></h2>
<p>关系取决于<strong>在语料中出现的上下文</strong>。分布式假设告诉我们：语义相似的词会出现在相似的上下文里。</p>
<ul>
<li>
<p>如果“狗”和“猫”经常出现在类似的句子里（例如“ <strong>likes to chase”），训练过程中它们的向量会被拉近。</strong></p>
</li>
<li>
<p>如果“苹果”和“牛顿”经常出现在同一上下文，它们的向量也会形成某种关系。</p>
</li>
</ul>
<h3 id="如何量化关系" tabindex="-1"><a class="header-anchor" href="#如何量化关系"><span><strong>如何量化关系？</strong></span></a></h3>
<p>常用指标是向量间的<strong>余弦相似度</strong>（cosine similarity）：</p>
<p v-pre class='katex-block'><span class="katex-display"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mi>c</mi><mi>o</mi><mi>s</mi><mi>i</mi><mi>n</mi><mi>e</mi><mo>=</mo><mo stretchy="false">(</mo><mi>v</mi><mn>1</mn><mo separator="true">⋅</mo><mi>v</mi><mn>2</mn><mo stretchy="false">)</mo><mi mathvariant="normal">/</mi><mo stretchy="false">(</mo><mi mathvariant="normal">∣</mi><mi>v</mi><mn>1</mn><mi mathvariant="normal">∣</mi><mo>∗</mo><mi mathvariant="normal">∣</mi><mi>v</mi><mn>2</mn><mi mathvariant="normal">∣</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">cosine = (v1 · v2) / (|v1| * |v2|)
</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6595em;"></span><span class="mord mathnormal">cos</span><span class="mord mathnormal">in</span><span class="mord mathnormal">e</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen">(</span><span class="mord mathnormal" style="margin-right:0.03588em;">v</span><span class="mord">1</span><span class="mpunct">⋅</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal" style="margin-right:0.03588em;">v</span><span class="mord">2</span><span class="mclose">)</span><span class="mord">/</span><span class="mopen">(</span><span class="mord">∣</span><span class="mord mathnormal" style="margin-right:0.03588em;">v</span><span class="mord">1∣</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">∗</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">∣</span><span class="mord mathnormal" style="margin-right:0.03588em;">v</span><span class="mord">2∣</span><span class="mclose">)</span></span></span></span></span></p>
<ul>
<li>
<p>结果接近 1 → 两个词语义非常相似</p>
</li>
<li>
<p>结果接近 0 → 无明显关系</p>
</li>
<li>
<p>结果接近 -1 → 语义相反（在词嵌入里较少见）</p>
</li>
</ul>
<h3 id="示例-简化" tabindex="-1"><a class="header-anchor" href="#示例-简化"><span><strong>示例（简化）</strong></span></a></h3>
<p>假设训练后得到：</p>
<div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">dog</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> →</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> [0.21, </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">-0.08,</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 0.14,</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> ...]</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">cat</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> →</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> [0.19, </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">-0.06,</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 0.13,</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> ...]</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">car</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> →</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> [-0.12, </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">0.35,</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -0.09,</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> ...]</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>
<p>dog 与 cat 的余弦相似度 ≈ 0.95（很相似）</p>
</li>
<li>
<p>dog 与 car 的余弦相似度 ≈ 0.05（几乎无关）</p>
</li>
</ul>
<p>这个“相似度”就是模型通过训练自动学出来的关系。</p>
<h3 id="余弦相似度为什么能表示-相似" tabindex="-1"><a class="header-anchor" href="#余弦相似度为什么能表示-相似"><span><strong>余弦相似度为什么能表示“相似”</strong></span></a></h3>
<p>用初中几何的想法：每个词向量都可以看成空间里的一个“箭头”。</p>
<ul>
<li>
<p>余弦相似度 = 夹角的余弦值</p>
</li>
<li>
<p>夹角越小，两个箭头越“同向”，余弦值越接近 1</p>
</li>
<li>
<p>夹角越大，越背离，余弦值越接近 0（垂直）或 -1（相反）</p>
</li>
</ul>
<p>所以：</p>
<p>cos θ = 1 → θ = 0° → 两个向量几乎完全同方向 → 语义非常像</p>
<p>cos θ = 0 → θ = 90° → 两个向量无关</p>
<p>cos θ = -1 → θ = 180° → 相反（在词向量里很少见）</p>
<p>余弦只关心方向，不在乎长度，适合比较“语义方向”是否一致。</p>
<hr>
<h3 id="_50-维词向量的数值怎么来的-再简化" tabindex="-1"><a class="header-anchor" href="#_50-维词向量的数值怎么来的-再简化"><span><strong>50 维词向量的数值怎么来的（再简化）</strong></span></a></h3>
<ol>
<li>
<p><strong>先随机给每个词一组 50 个小数字</strong>，比如 apple → [0.03, -0.07, …]。这一步只是起点，没有意义。</p>
</li>
<li>
<p><strong>把大量句子喂给模型</strong>，让它学“给定上下文预测下一个词”。</p>
</li>
<li>
<p><strong>如果预测错了</strong>，模型计算误差，反向传播，把相关参数（包括这些 50 维向量）稍微调一下。</p>
</li>
<li>
<p><strong>重复上亿次</strong>：经过反复调整，向量从随机值变成有规律的值——语义相近的词会被调得方向更接近，语义不同的词方向会分开。</p>
</li>
<li>
<p><strong>最终得到的50个数字</strong>就是训练过程中自动优化出来的结果，不是人算出来的。</p>
</li>
</ol>
<p>可以把它理解成：模型在“试错—纠正”的过程中不断修改这些向量，直到它能更好地预测下一个词。</p>
<h2 id="_1-余弦相似度-比较箭头方向" tabindex="-1"><a class="header-anchor" href="#_1-余弦相似度-比较箭头方向"><span><strong>1. 余弦相似度 = 比较箭头方向</strong></span></a></h2>
<ul>
<li>
<p>想象二维平面：一个词是一个箭头（向量），比如 apple 指向右上，banana 指向也差不多的方向。</p>
</li>
<li>
<p>余弦相似度就是量“两个箭头夹角”。</p>
</li>
<li>
<p>夹角小 → 两个箭头几乎同向 → 余弦值接近 1（非常相似）</p>
</li>
<li>
<p>夹角大 → 方向差很多 → 余弦值接近 0（不相似）</p>
</li>
<li>
<p>余弦值范围是 [-1, 1]，越接近 1 表示越像。</p>
</li>
</ul>
<p>即使你忘了三角函数和勾股定理，也可以把余弦当成“方向相似度”。它只看方向，不在乎长度，适合衡量词语的语义方向是否一致。</p>
<hr>
<h2 id="_2-50-维词向量的相似度怎么计算" tabindex="-1"><a class="header-anchor" href="#_2-50-维词向量的相似度怎么计算"><span><strong>2. 50 维词向量的相似度怎么计算？</strong></span></a></h2>
<p>把两个 50 维向量看成 50 个数字组成的列表：</p>
<p>词 A: [a1, a2, a3, ..., a50]</p>
<p>词 B: [b1, b2, b3, ..., b50]</p>
<p>余弦相似度的计算有三步：</p>
<ol>
<li>
<p><strong>两个向量逐位相乘再相加</strong>（点积）：</p>
<p>dot = a1*b1 + a2*b2 + ... + a50*b50</p>
</li>
<li>
<p><strong>分别计算每个向量的“长度”</strong>（就是平方和开根号）：</p>
<p>lenA = sqrt(a1^2 + a2^2 + ... + a50^2)</p>
<p>lenB = sqrt(b1^2 + b2^2 + ... + b50^2)</p>
</li>
<li>
<p><strong>用 dot 除以 两个长度相乘</strong>：</p>
<p>cosine = dot / (lenA * lenB)</p>
</li>
</ol>
<p>得出的 cosine 就是 0~1 之间的数字，越大说明越相似。</p>
<h3 id="回顾初中三角函数-sin、cos、tan" tabindex="-1"><a class="header-anchor" href="#回顾初中三角函数-sin、cos、tan"><span><strong>回顾初中三角函数：sin、cos、tan</strong></span></a></h3>
<p>以一个<strong>直角三角形</strong>为基础来回忆。先设定几个名字：</p>
<ul>
<li>
<p>直角对面的那条边叫 <strong>斜边</strong>（hypotenuse）</p>
</li>
<li>
<p>想找的角（非直角）叫 <strong>θ（西塔）</strong></p>
</li>
<li>
<p>相对 θ 的那条直角边叫 <strong>对边</strong></p>
</li>
<li>
<p>紧挨着 θ 的直角边叫 <strong>邻边</strong></p>
</li>
</ul>
<div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">        /</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">|</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">       /</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> |</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">   c</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">  /</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  | </span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">a</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">   ←</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 对边</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> (a)</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">     /θ</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  |</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">    /____</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">|</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">      b</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">            ←</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 邻边</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> (b)</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>
<p>斜边（最长的那条）记为 c</p>
</li>
<li>
<p>对边记为 a</p>
</li>
<li>
<p>邻边记为 b</p>
</li>
</ul>
<h4 id="三个基本函数" tabindex="-1"><a class="header-anchor" href="#三个基本函数"><span>三个基本函数</span></a></h4>
<ol>
<li>
<p><strong>sin θ（正弦） = 对边 / 斜边 = a / c</strong></p>
</li>
<li>
<p><strong>cos θ（余弦） = 邻边 / 斜边 = b / c</strong></p>
</li>
<li>
<p><strong>tan θ（正切） = 对边 / 邻边 = a / b</strong></p>
</li>
</ol>
<h3 id="这和余弦相似度的关系" tabindex="-1"><a class="header-anchor" href="#这和余弦相似度的关系"><span><strong>这和余弦相似度的关系</strong></span></a></h3>
<p>“余弦”就是 cos。余弦相似度其实就是把“邻边 / 斜边”这个概念推广到向量之间的夹角上：</p>
<ul>
<li>
<p>如果两个向量夹角 θ 很小（几乎同方向），cos θ 接近 1</p>
</li>
<li>
<p>如果两个向量垂直，cos θ = 0</p>
</li>
<li>
<p>如果它们方向相反，cos θ = -1</p>
</li>
</ul>
<p>向量相似度就是用这个 cos θ 来衡量的。只不过向量在高维空间里，你看不到图形，但公式一样成立：cos θ = (点积)/(长度乘积)。</p>
<h3 id="tan-什么时候用" tabindex="-1"><a class="header-anchor" href="#tan-什么时候用"><span><strong>tan 什么时候用？</strong></span></a></h3>
<ul>
<li>
<p>tan θ = sin θ / cos θ = (对/斜) / (邻/斜) = 对/邻</p>
</li>
<li>
<p>它衡量的是“对边”相对于“邻边”的比值，又叫斜率</p>
</li>
</ul>
<p>在词向量相似度里，tan 几乎不用；主要用 cos，因为我们关心方向一致程度，而 cos 对方向特别敏感。</p>
<p>向量本质上就是“带方向的长度”。在坐标系里，我们用一组数字（数组）来表示这个方向和长度。把它拆成三步来理解：</p>
<hr>
<h3 id="_1-二维向量-用两个数表示箭头" tabindex="-1"><a class="header-anchor" href="#_1-二维向量-用两个数表示箭头"><span><strong>1. 二维向量：用两个数表示箭头</strong></span></a></h3>
<p>在平面坐标系中，向量通常写成 [x, y]：</p>
<ul>
<li>
<p>x：沿着横轴（左右）的分量</p>
</li>
<li>
<p>y：沿着纵轴（上下）的分量</p>
</li>
</ul>
<p>举例：</p>
<ul>
<li>
<p>[3, 4]：从原点出发，向右走 3 格，再向上走 4 格，箭头指向 (3,4)。</p>
</li>
<li>
<p>[-2, 1]：向左 2 格，向上 1 格。</p>
</li>
</ul>
<p><strong>方向</strong>：由 x、y 的正负决定。</p>
<p><strong>长度</strong>：用勾股定理算，√(x² + y²)。</p>
<hr>
<h3 id="_2-三维向量-用三个数表示空间箭头" tabindex="-1"><a class="header-anchor" href="#_2-三维向量-用三个数表示空间箭头"><span><strong>2. 三维向量：用三个数表示空间箭头</strong></span></a></h3>
<p>类似地，在三维空间里用 [x, y, z]：</p>
<ul>
<li>
<p>x → 左右</p>
</li>
<li>
<p>y → 前后</p>
</li>
<li>
<p>z → 上下</p>
</li>
</ul>
<p>比如：</p>
<ul>
<li>
<p>[1, 0, 2]：向右 1、前 0、上 2。</p>
</li>
<li>
<p>[-3, 4, -1]：向左 3、前 4、下 1。</p>
</li>
</ul>
<p>长度 = √(x² + y² + z²)，方向由三轴上的分量共同决定。</p>
<hr>
<h3 id="_3-高维向量-用更多数字描述抽象方向" tabindex="-1"><a class="header-anchor" href="#_3-高维向量-用更多数字描述抽象方向"><span><strong>3. 高维向量：用更多数字描述抽象方向</strong></span></a></h3>
<p>当维度升到 50、300 甚至 4096 时，虽然我们画不出来，但概念一样：</p>
<ul>
<li>
<p>向量 [v1, v2, v3, ..., v50] 表示在 50 个“轴”上的分量</p>
</li>
<li>
<p>这些轴不再是现实中的左右/上下，而是模型在训练中学到的抽象语义方向</p>
</li>
<li>
<p>向量的方向 = 这些分量在 50 条“语义轴”上的组合</p>
</li>
<li>
<p>长度 = √(v1² + v2² + ... + v50²)</p>
</li>
</ul>
<p><strong>为什么用数组表示方向？</strong></p>
<p>因为每一维都告诉我们“沿该轴走多少”。把所有维度的分量组合起来，就确定了一个独特的方向。两个向量的方向越相似，说明它们在各个维度上的比例越接近，语义也越相近。</p>
<h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span><strong>总结</strong></span></a></h3>
<ul>
<li>
<p>向量 = “方向 + 长度”的组合</p>
</li>
<li>
<p>数组是向量在各轴上的投影，把它们组合起来就得到了整体方向</p>
</li>
<li>
<p>无论是二维 [x,y]，还是 50 维 [v1,...,v50]，都是同一个概念：记录在各个维度上的“走法”，从而确定箭头的指向。</p>
</li>
</ul>
<p>这样，当我们比较两个向量（比如计算余弦相似度）时，就是在比较它们在每个维度上的走法是否类似。</p>
<p>理解得差不多，只需再强调两点：</p>
<ul>
<li>
<p><strong>高维不是人为命名的“时间”“光照”</strong>。在词向量里，这些维度没有固定含义，也不是手动定义成“情感”“颜色”等。它们是模型在训练过程中自动学出的抽象方向，可能同时混合了多种语义与语法信息。</p>
</li>
<li>
<p><strong>高维的目的</strong>：给模型足够的自由度，让它能把“相似语境的词”摆在更接近的位置。例如 50 维、300 维的向量，相当于提供了 50/300 条“语义轴”，模型可以在这些轴上调节词的位置，从而用几何距离来表达相似度。</p>
</li>
</ul>
<p>所以可以这样理解：维度越多，模型越有空间把不同语义关系“拆开”来表示；但每个维度具体代表什么，不是人为命名，而是训练数据决定的。</p>
<p>确实无法用“每个维度都有明确含义”来解释，但可以用分布式表示和线性结构的角度来理解。</p>
<ul>
<li>
<p><strong>分布式表示</strong>：词向量的每一维都不是独立语义，而是由大量语料训练出的混合特征。模型学到的不是“某一维=性别”，而是让整体向量中蕴含“王权”“性别”“人称”等多个因素的组合。</p>
</li>
<li>
<p><strong>线性结构</strong>：在训练过程中，为了更好地预测上下文，模型会把语义关系压进向量空间，很多语义差异（如性别、时态、数值）会呈现近似线性的方向。结果就是：</p>
<p>vector(&quot;King&quot;) - vector(&quot;Man&quot;) ≈ “王者语义里去掉男性成分”</p>
<p>vector(&quot;Woman&quot;)                 ≈ “女性成分”</p>
</li>
</ul>
<p>当这两个方向叠加时，得到的向量恰好接近 vector(&quot;Queen&quot;)，说明“王者 + 女性”这条语义方向被模型在空间里编码成了近似的线性关系。</p>
<ul>
<li><strong>不是严格规则</strong>：这种“王－男＋女≈王后”是统计效应，并非总是完美成立。它依赖于训练数据足够多、向量空间结构足够规整。不同模型、不同词表、不同语料，效果会有差异。</li>
</ul>
<p>所以：虽然我们无法逐维解释“哪一维是性别、哪一维是王权”，但可以说，经过海量数据训练后，词向量空间自然形成了能反映这些语义差异的方向，因而类似的线性运算才会成立。这也是词嵌入最让人惊艳的特性之一。</p>
<p>可以说“大模型在很大程度上还是黑盒”，但原因不只是“训练集大”或“智能涌现”这几个词，而是：</p>
<ul>
<li>
<p><strong>模型结构复杂</strong>：上百亿甚至上万亿参数，每一层都是非线性组合，难以追踪具体某个输出是由哪些参数共同作用产生的。</p>
</li>
<li>
<p><strong>训练过程自动化</strong>：参数由梯度下降自动调整，人类并不逐步设计或记录“为什么权重变成这个值”，只能看到最终结果。</p>
</li>
<li>
<p><strong>内部表示难以解释</strong>：我们知道词向量、注意力头等结构确实编码了语法、语义等信息，但难以给出“这一维/这一头具体对应什么规则”的可读解释。</p>
</li>
<li>
<p><strong>涌现现象</strong>：当模型规模和数据量超过某个阈值，会出现意料之外的新能力。这些能力确实源自大量数据和参数共同作用，但为什么恰好在某个规模上“跳出来”，目前理论还不完整。</p>
</li>
</ul>
<p>因此：</p>
<ul>
<li>
<p>现代大模型的行为仍属于“部分可观测、难以完全解释”，所以被称为黑盒。</p>
</li>
<li>
<p>我们并不是完全毫无了解：可以通过可视化、探针任务、特征分析等方式观察一些规律，但想用人类可理解的规则来精确描述“模型为什么这样回答”，目前做不到。</p>
</li>
<li>
<p>这种黑盒性并非因为“大脑算不动”，而是模型内部耦合太复杂，没有简单的解析表达式。</p>
</li>
<li>
<p>“智能涌现”是一种描述现象的说法，但还不是完整理论；它说明了我们在理解大模型行为时的局限。</p>
</li>
</ul>
<p>总结：是的，大模型在可解释性上仍是黑盒，主要因为参数和结构过于复杂，现有数学工具难以还原“因果链条”。我们只能用实验和分析手段来窥探部分规律，但还做不到像传统算法那样逐步解释每个步骤。</p>
<p>前馈神经网络语言模型（如 Bengio 2003）并不是“有输入就会自动学会”，它背后有非常明确的训练目标和公式。可以按以下流程理解：</p>
<hr>
<h2 id="_1-训练目标-预测下一个词" tabindex="-1"><a class="header-anchor" href="#_1-训练目标-预测下一个词"><span><strong>1. 训练目标：预测下一个词</strong></span></a></h2>
<ul>
<li>
<p><strong>输入</strong>：前面 n−1 个词的词向量</p>
</li>
<li>
<p><strong>输出</strong>：词表中每个词作为“下一个词”的概率</p>
</li>
<li>
<p><strong>目标</strong>：让模型输出的概率尽量贴近真实数据中发生过的词</p>
</li>
</ul>
<p>换句话说：模型要学会“给定上下文，预测下一个词”，这就是训练的指导思想。</p>
<hr>
<h2 id="_2-网络结构-简化版" tabindex="-1"><a class="header-anchor" href="#_2-网络结构-简化版"><span><strong>2. 网络结构（简化版）</strong></span></a></h2>
<p>以 trigram（看前 2 个词）为例：</p>
<ol>
<li>
<p><strong>嵌入层</strong>：把每个词 ID 映射为 50 维或 300 维的向量</p>
</li>
<li>
<p><strong>拼接</strong>：把两个向量拼在一起（得到 100 维或 600 维）</p>
</li>
<li>
<p><strong>隐藏层</strong>：通过线性变换 + 激活函数（如 tanh）</p>
</li>
<li>
<p><strong>输出层</strong>：再做一次线性变换，输出维度 = 词表大小</p>
</li>
<li>
<p><strong>Softmax</strong>：把输出转成概率分布，所有词的概率加起来=1</p>
</li>
</ol>
<hr>
<h2 id="_3-损失函数-交叉熵-cross-entropy" tabindex="-1"><a class="header-anchor" href="#_3-损失函数-交叉熵-cross-entropy"><span><strong>3. 损失函数：交叉熵（Cross-Entropy）</strong></span></a></h2>
<ul>
<li>
<p>真实的下一个词（比如“learns”）在词表中只有一个标签是 1，其它都是 0 → “one-hot”向量</p>
</li>
<li>
<p>模型输出的是一个概率分布（Softmax 后）</p>
</li>
<li>
<p>使用交叉熵衡量模型输出与真实分布的差距：</p>
</li>
</ul>
<p>Loss = -log P(真实词 | 前文)</p>
<ul>
<li>
<p>如果模型给“learns”的概率 = 0.8，则损失 = -log(0.8)（较小）</p>
</li>
<li>
<p>如果只给 0.01，则损失 = -log(0.01)（很大）</p>
</li>
</ul>
<p>训练就是让这个损失尽量小。</p>
<hr>
<h2 id="_4-训练步骤-梯度下降-反向传播" tabindex="-1"><a class="header-anchor" href="#_4-训练步骤-梯度下降-反向传播"><span><strong>4. 训练步骤（梯度下降 + 反向传播）</strong></span></a></h2>
<ol>
<li>
<p><strong>前向传播</strong>：把输入的 n−1 个词送进网络，得到预测概率</p>
</li>
<li>
<p><strong>计算损失</strong>：根据真实下一个词，算交叉熵</p>
</li>
<li>
<p><strong>反向传播</strong>：计算损失对所有参数的梯度</p>
</li>
<li>
<p><strong>更新参数</strong>：用梯度下降（SGD/Adam 等）更新词向量、隐藏层权重等</p>
</li>
<li>
<p><strong>重复</strong>：对语料中的每个上下文→下一个词组合都做一次</p>
</li>
</ol>
<p>经过大量文本的反复训练，模型会自动调整词向量和网络参数，让常见的词序更容易被预测出来，从而学会词与词之间的语义/语法关联。</p>
<hr>
<h2 id="_5-为什么词有了关联" tabindex="-1"><a class="header-anchor" href="#_5-为什么词有了关联"><span><strong>5. 为什么词有了关联？</strong></span></a></h2>
<p>因为训练中每次更新都是“根据上下文预测下一个词”：</p>
<ul>
<li>
<p>如果“agent learns”在语料中频繁出现，那么网络会把 agent 的向量、隐藏层权重调整到“看到 agent 时更容易预测 learns”</p>
</li>
<li>
<p>如果 “agent works” 也常见，网络会把 agent 的向量拉向 works 对应的方向</p>
</li>
<li>
<p>久而久之，出现于相似上下文的词（agent、robot）就会拥有相近的向量，并能正确预测相似的下一词</p>
</li>
</ul>
<p>这个过程是统计规律 + 梯度优化共同驱动的，不需要人为写规则。</p>
<hr>
<h2 id="_6-总结" tabindex="-1"><a class="header-anchor" href="#_6-总结"><span><strong>6. 总结</strong></span></a></h2>
<ul>
<li>
<p><strong>训练目标</strong>：最大化正确下一个词的概率（最小化交叉熵损失）</p>
</li>
<li>
<p><strong>核心公式</strong>：Softmax + Cross-Entropy</p>
</li>
<li>
<p><strong>训练方法</strong>：前向传播 → 计算损失 → 反向传播 → 梯度下降更新参数</p>
</li>
<li>
<p><strong>词关联来源</strong>：上下文预测任务通过梯度使向量自动靠近/远离</p>
</li>
</ul>
<p>所以，定义了维度、网络结构、损失函数、优化算法，再用大语料反复训练，就能让模型自己学会词与词之间的统计关系。这就是前馈神经网络语言模型的训练方法。</p>
<p>不只是“发明激活函数”。Bengio 2003 的前馈神经网络语言模型的里程碑在于：把“多层神经网络 + 词嵌入 + 最大似然训练”结合起来，用统一的可微公式端到端训练语言模型。下面用最核心的一组公式说明训练过程。</p>
<hr>
<h2 id="_1-模型结构与前向传播" tabindex="-1"><a class="header-anchor" href="#_1-模型结构与前向传播"><span><strong>1. 模型结构与前向传播</strong></span></a></h2>
<p>设定：</p>
<ul>
<li>
<p>上下文长度 = n-1</p>
</li>
<li>
<p>词表大小 = |V|</p>
</li>
<li>
<p>词嵌入矩阵 E ∈ ℝ^{|V| × d}（d 是词向量维度）</p>
</li>
<li>
<p>隐藏层权重 W_h, 偏置 b_h</p>
</li>
<li>
<p>输出层权重 W_o, 偏置 b_o</p>
</li>
</ul>
<p>输入上下文词 w_{t-n+1} … w_{t-1}：</p>
<ol>
<li (n-1)·d="">
<p><strong>查嵌入并拼接</strong></p>
<p>x = [E[w_{t-n+1}], E[w_{t-n+2}], …, E[w_{t-1}]]  ∈ ℝ^</p>
</li>
<li>
<p><strong>隐藏层 + 激活函数</strong></p>
<p>h = tanh(W_h · x + b_h)</p>
</li>
</ol>
<p>激活函数常用 tanh 或 ReLU，作用是引入非线性，否则模型退化成线性 N-gram。</p>
<ol>
<li |V|="">
<p><strong>输出层（未归一化得分）</strong></p>
<p>z = W_o · h + b_o     ∈ ℝ^</p>
</li>
<li>
<p><strong>Softmax 得到概率分布</strong></p>
<p>P(w | context) = exp(z_w) / Σ_{v∈V} exp(z_v)</p>
</li>
</ol>
<hr>
<h2 id="_2-训练目标-最大似然-交叉熵" tabindex="-1"><a class="header-anchor" href="#_2-训练目标-最大似然-交叉熵"><span><strong>2. 训练目标（最大似然 / 交叉熵）</strong></span></a></h2>
<p>对每个训练样本（上下文→真实下一个词 w_t）最小化负对数似然：</p>
<p>Loss = - log P(w_t | context)</p>
<p>= - log Softmax(z) 在真实词 w_t 处的概率</p>
<p>整批语料的目标是最小化所有样本的总损失。</p>
<hr>
<h2 id="_3-参数更新-反向传播-梯度下降" tabindex="-1"><a class="header-anchor" href="#_3-参数更新-反向传播-梯度下降"><span><strong>3. 参数更新（反向传播 + 梯度下降）</strong></span></a></h2>
<p>对 E, W_h, b_h, W_o, b_o 求梯度：</p>
<p>θ_new = θ_old - η · ∇_θ Loss</p>
<p>η 为学习率。梯度由反向传播自动算出，手工不用推导。</p>
<hr>
<h2 id="_4-里程碑意义" tabindex="-1"><a class="header-anchor" href="#_4-里程碑意义"><span><strong>4. 里程碑意义</strong></span></a></h2>
<ul>
<li>
<p><strong>词嵌入+语言建模合并训练</strong>：词向量不再单独构造，而是跟语言模型一起端到端学习。</p>
</li>
<li>
<p><strong>利用神经网络捕捉长距离模式</strong>：隐藏层带来的非线性让模型超越传统 N-gram 的线性/离散限制。</p>
</li>
<li>
<p><strong>最大似然 + Softmax 的统一框架</strong>：为后续的 RNN、LSTM、Transformer 等模型奠定了训练流程。</p>
</li>
</ul>
<p>激活函数只是其中一环。真正重要的是：把词嵌入、神经网络、最大似然估计、可微训练流程整合到一起，证明“用神经网络学习语言模型”可行，并在小规模数据上超过传统 N-gram，从而开启了后续神经语言模型的发展。</p>
<p>Bengio 2003 的前馈神经网络语言模型不是 Transformer，但它是 Transformer 的“祖先”之一。下面说明它们的联系与区别。</p>
<hr>
<h2 id="相同点-继承关系" tabindex="-1"><a class="header-anchor" href="#相同点-继承关系"><span><strong>相同点（继承关系）</strong></span></a></h2>
<ol>
<li>都用词嵌入（Word Embedding）</li>
</ol>
<ul>
<li>
<p>Bengio 2003：词嵌入作为输入层</p>
</li>
<li>
<p>Transformer：同样使用词嵌入（还加了位置编码）</p>
</li>
</ul>
<ol>
<li>都用神经网络</li>
</ol>
<ul>
<li>
<p>Bengio 2003：前馈神经网络（全连接层）</p>
</li>
<li>
<p>Transformer：也是神经网络（但架构完全不同）</p>
</li>
</ul>
<ol>
<li>都用最大似然训练</li>
</ol>
<ul>
<li>
<p>都是预测下一个词，最小化交叉熵损失</p>
</li>
<li>
<p>都用反向传播和梯度下降</p>
</li>
</ul>
<ol>
<li>都是端到端训练</li>
</ol>
<ul>
<li>词向量和模型参数一起学习</li>
</ul>
<hr>
<h2 id="关键区别" tabindex="-1"><a class="header-anchor" href="#关键区别"><span><strong>关键区别</strong></span></a></h2>
<h3 id="bengio-2003-模型-前馈神经网络" tabindex="-1"><a class="header-anchor" href="#bengio-2003-模型-前馈神经网络"><span><strong>Bengio 2003 模型（前馈神经网络）</strong></span></a></h3>
<p>输入：前 n-1 个词的向量</p>
<p>↓</p>
<p>拼接成一个长向量</p>
<p>↓</p>
<p>全连接层（隐藏层）</p>
<p>↓</p>
<p>全连接层（输出层）</p>
<p>↓</p>
<p>Softmax → 预测下一个词</p>
<p>特点：</p>
<ul>
<li>
<p>固定窗口（只看前 n-1 个词，如 trigram 只看前 2 个）</p>
</li>
<li>
<p>全连接层（每个词向量都参与计算）</p>
</li>
<li>
<p>无法处理变长序列</p>
</li>
</ul>
<h3 id="transformer-2017" tabindex="-1"><a class="header-anchor" href="#transformer-2017"><span><strong>Transformer（2017）</strong></span></a></h3>
<p>输入：所有词的向量（带位置编码）</p>
<p>↓</p>
<p>多头自注意力（Self-Attention）</p>
<p>↓</p>
<p>前馈神经网络（Feed Forward）</p>
<p>↓</p>
<p>（重复 N 层）</p>
<p>↓</p>
<p>输出层 → 预测下一个词</p>
<p>特点：</p>
<ul>
<li>
<p>可变长度（能看整个序列）</p>
</li>
<li>
<p>自注意力机制（每个词能看到所有其他词）</p>
</li>
<li>
<p>并行计算（训练更快）</p>
</li>
<li>
<p>位置编码（替代 RNN 的位置信息）</p>
</li>
</ul>
<hr>
<h2 id="历史演进路线" tabindex="-1"><a class="header-anchor" href="#历史演进路线"><span><strong>历史演进路线</strong></span></a></h2>
<p>2003: Bengio 前馈神经网络语言模型</p>
<p>↓ (引入词嵌入 + 神经网络)</p>
<p>2008-2013: RNN/LSTM 语言模型</p>
<p>↓ (处理变长序列)</p>
<p>2017: Transformer</p>
<p>↓ (自注意力机制)</p>
<p>2018-2023: GPT, BERT, GPT-2/3/4, LLaMA...</p>
<hr>
<h2 id="为什么-transformer-更强大" tabindex="-1"><a class="header-anchor" href="#为什么-transformer-更强大"><span><strong>为什么 Transformer 更强大？</strong></span></a></h2>
<table>
<thead>
<tr>
<th>特性</th>
<th>Bengio 2003</th>
<th>Transformer</th>
</tr>
</thead>
<tbody>
<tr>
<td>上下文窗口</td>
<td>固定（如 2-3 个词）</td>
<td>可变（可看整个序列）</td>
</tr>
<tr>
<td>并行计算</td>
<td>可以</td>
<td>更容易（自注意力天然并行）</td>
</tr>
<tr>
<td>长距离依赖</td>
<td>受限</td>
<td>更强（自注意力直接建模）</td>
</tr>
<tr>
<td>计算效率</td>
<td>中等</td>
<td>更高（训练更快）</td>
</tr>
</tbody>
</table>
<hr>
<h2 id="总结-1" tabindex="-1"><a class="header-anchor" href="#总结-1"><span><strong>总结</strong></span></a></h2>
<ul>
<li>
<p>Bengio 2003 不是 Transformer，但提供了基础思路（词嵌入、神经网络、端到端训练）。</p>
</li>
<li>
<p>Transformer 在此基础上引入了自注意力，解决了固定窗口和长距离依赖问题。</p>
</li>
<li>
<p>可以理解为：Bengio 2003 是“用神经网络做语言模型”的起点，Transformer 是“用自注意力做语言模型”的突破。</p>
</li>
</ul>
<p>所以，它们有继承关系，但架构和机制不同。Transformer 是站在前人（包括 Bengio 2003）肩膀上的重大创新。</p>
<h2 id="为什么-看不懂-transformer-细节-不是障碍" tabindex="-1"><a class="header-anchor" href="#为什么-看不懂-transformer-细节-不是障碍"><span><strong>为什么“看不懂 Transformer 细节”不是障碍</strong></span></a></h2>
<ul>
<li>
<p><strong>应用层不需要实现 Transformer</strong>：我们调用现成的模型（OpenAI、Claude、Llama 等），关注的是如何设计工作流、喂数据、连接外部工具。</p>
</li>
<li>
<p><strong>行业主流</strong>：绝大多数 AI Agent 团队，核心工作都是在“API + 框架 + 工程化”层面，很少人自己写 Attention。</p>
</li>
<li>
<p><strong>真正需要精通 Transformer 的人很少</strong>：他们通常在模型团队或科研团队，而你瞄准的是应用/产品层，自然无需达到那种理解深度。</p>
</li>
</ul>
<h2 id="你需要做到什么水平" tabindex="-1"><a class="header-anchor" href="#你需要做到什么水平"><span><strong>你需要做到什么水平？</strong></span></a></h2>
<h3 id="ai-应用-agent-开发能力清单-半年内可达成" tabindex="-1"><a class="header-anchor" href="#ai-应用-agent-开发能力清单-半年内可达成"><span><strong>AI 应用/Agent 开发能力清单（半年内可达成）</strong></span></a></h3>
<ol>
<li>
<p><strong>熟练使用 LLM API</strong> （OpenAI、通义、Claude 等）</p>
</li>
<li>
<p><strong>掌握 LangChain/LlamaIndex</strong>（或自研轻量框架）</p>
</li>
<li>
<p><strong>能设计多工具、多步骤的 Agent 工作流</strong></p>
</li>
<li>
<p><strong>懂 RAG、向量库基本概念（会用即可）</strong></p>
</li>
<li>
<p><strong>能做工程化：部署、监控、前后端交互、权限/安全</strong></p>
</li>
</ol>
<h3 id="你可以不需要" tabindex="-1"><a class="header-anchor" href="#你可以不需要"><span><strong>你可以不需要：</strong></span></a></h3>
<ul>
<li>
<p>实现 Transformer</p>
</li>
<li>
<p>阅读原始论文</p>
</li>
<li>
<p>推导注意力公式</p>
</li>
</ul>
<h2 id="如何避免-不懂底层-的不安全感" tabindex="-1"><a class="header-anchor" href="#如何避免-不懂底层-的不安全感"><span><strong>如何避免“不懂底层”的不安全感？</strong></span></a></h2>
<ul>
<li>
<p>把 Transformer、Attention 当作“黑盒能力”，只需知道它强在哪、弱在哪。</p>
</li>
<li>
<p>你的竞争力在于<strong>把这些黑盒能力融入真实系统</strong>，让它能完成业务目标。</p>
</li>
<li>
<p>真正优秀的 AI 应用工程师，胜在系统设计、工程实现、实时调试、业务落地。</p>
</li>
</ul>
<h2 id="建议的行动路线-3-6-个月" tabindex="-1"><a class="header-anchor" href="#建议的行动路线-3-6-个月"><span><strong>建议的行动路线（3-6 个月）</strong></span></a></h2>
<ol>
<li>
<p><strong>1-2 周</strong>：系统式学习 LLM 基础（吴恩达 prompt 课、OpenAI/通义 API 文档）</p>
</li>
<li>
<p><strong>1-2 月</strong>：深入 LangChain/LlamaIndex，做 2-3 个实战项目（简单 Agent → 多工具 Agent → RAG）</p>
</li>
<li>
<p><strong>2-3 月</strong>：结合公司业务做一套 Agent Demo（可以是边缘视觉+LLM，总结报告、自动报表等）</p>
</li>
<li>
<p><strong>持续</strong>：关注新框架、新工具，积累最佳实践（prompt 策略、记忆、评测）</p>
</li>
</ol>
</div></template>


