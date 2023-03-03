import{_ as a}from"./plugin-vueexport-helper.2444895f.js";import{o as e,c as l,e as i,a as s,b as n,f as t}from"./app.03f3d827.js";const p={},o=s("p",null,[n("\u672C\u6587\u6863\u63D0\u4F9B "),s("strong",null,"UFS"),n(" \u5B58\u50A8\u7CFB\u7EDF\u4E2D "),s("strong",null,"CLI"),n(" \u5DE5\u5177\u7684\u4F7F\u7528\u65B9\u6CD5")],-1),r=t(`<h1 id="cli-\u5DE5\u5177" tabindex="-1"><a class="header-anchor" href="#cli-\u5DE5\u5177" aria-hidden="true">#</a> CLI \u5DE5\u5177</h1><p><strong>\u4EA7\u54C1</strong>\uFF1AUFS</p><p><strong>\u7248\u672C</strong>\uFF1Av4.0</p><p><strong>\u65E5\u671F</strong>\uFF1A2021-10-16</p><p><strong>\u6458\u8981</strong>\uFF1A\u672C\u6587\u6863\u63D0\u4F9B UFS \u5B58\u50A8\u7CFB\u7EDF\u4E2D CLI \u5DE5\u5177\u7684\u4F7F\u7528\u65B9\u6CD5</p><h2 id="_1-ufs-cli-\u5DE5\u5177" tabindex="-1"><a class="header-anchor" href="#_1-ufs-cli-\u5DE5\u5177" aria-hidden="true">#</a> 1. ufs-cli \u5DE5\u5177</h2><p><code>ufscli</code>\u5DE5\u5177\u652F\u6301\u4EE5\u547D\u4EE4\u884C\u65B9\u5F0F\u67E5\u8BE2\u96C6\u7FA4\u72B6\u6001\u3002</p><p>\u4F7F\u7528\u65B9\u5F0F\u5982\u4E0B\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>ufscli <span class="token punctuation">[</span>-H master_host<span class="token punctuation">]</span> <span class="token punctuation">[</span>-P master_port<span class="token punctuation">]</span> opration
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>opration \u652F\u6301\u7684\u64CD\u4F5C\u7C7B\u578B\u5982\u4E0B\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token parameter variable">-SIN</span> <span class="token builtin class-name">:</span> show full metaserver info
<span class="token parameter variable">-SIM</span> <span class="token builtin class-name">:</span> show only metaservers states
<span class="token parameter variable">-SIG</span> <span class="token builtin class-name">:</span> show only general master <span class="token punctuation">(</span>leader<span class="token punctuation">)</span> info
<span class="token parameter variable">-SMU</span> <span class="token builtin class-name">:</span> show only lgeneral master <span class="token punctuation">(</span>leader<span class="token punctuation">)</span> memory usage
<span class="token parameter variable">-SIC</span> <span class="token builtin class-name">:</span> show only chunks info <span class="token punctuation">(</span>goal/copies matrices<span class="token punctuation">)</span>
<span class="token parameter variable">-SIL</span> <span class="token builtin class-name">:</span> show only loop info <span class="token punctuation">(</span>with messages<span class="token punctuation">)</span>
<span class="token parameter variable">-SMF</span> <span class="token builtin class-name">:</span> show only missing chunks/files
<span class="token parameter variable">-SCS</span> <span class="token builtin class-name">:</span> show connected chunk servers
<span class="token parameter variable">-SHD</span> <span class="token builtin class-name">:</span> show hdd data
<span class="token parameter variable">-SMS</span> <span class="token builtin class-name">:</span> show active mounts
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u67E5\u770B\u96C6\u7FA4\u72B6\u6001:</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>ufscli <span class="token parameter variable">-SIN</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u67E5\u770B MSS \u670D\u52A1\u5217\u8868:</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>ufscli <span class="token parameter variable">-SIM</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u67E5\u770B MSS-Leader \u72B6\u6001:</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># ufscli -SIG</span>

+--------------------------------------------------+
<span class="token operator">|</span>                   Master Info                    <span class="token operator">|</span>
+-----------------------+--------------------------+
<span class="token operator">|</span> master version        <span class="token operator">|</span>                   <span class="token number">4.0</span>.11 <span class="token operator">|</span>
<span class="token operator">|</span> RAM used              <span class="token operator">|</span>                  <span class="token number">878</span> MiB <span class="token operator">|</span>
<span class="token operator">|</span> CPU used              <span class="token operator">|</span>                    <span class="token number">2.38</span>% <span class="token operator">|</span>
<span class="token operator">|</span> CPU used <span class="token punctuation">(</span>system<span class="token punctuation">)</span>     <span class="token operator">|</span>                    <span class="token number">1.28</span>% <span class="token operator">|</span>
<span class="token operator">|</span> CPU used <span class="token punctuation">(</span>user<span class="token punctuation">)</span>       <span class="token operator">|</span>                    <span class="token number">1.10</span>% <span class="token operator">|</span>
<span class="token operator">|</span> total space           <span class="token operator">|</span>                  <span class="token number">324</span> TiB <span class="token operator">|</span>
<span class="token operator">|</span> avail space           <span class="token operator">|</span>                  <span class="token number">286</span> TiB <span class="token operator">|</span>
<span class="token operator">|</span> <span class="token function">free</span> space            <span class="token operator">|</span>                  <span class="token number">286</span> TiB <span class="token operator">|</span>
<span class="token operator">|</span> trash space           <span class="token operator">|</span>                  <span class="token number">387</span> GiB <span class="token operator">|</span>
<span class="token operator">|</span> trash files           <span class="token operator">|</span>                    <span class="token number">10723</span> <span class="token operator">|</span>
<span class="token operator">|</span> sustained space       <span class="token operator">|</span>                  <span class="token number">360</span> GiB <span class="token operator">|</span>
<span class="token operator">|</span> sustained files       <span class="token operator">|</span>                    <span class="token number">16002</span> <span class="token operator">|</span>
<span class="token operator">|</span> all fs objects        <span class="token operator">|</span>                   <span class="token number">825852</span> <span class="token operator">|</span>
<span class="token operator">|</span> directories           <span class="token operator">|</span>                     <span class="token number">9987</span> <span class="token operator">|</span>
<span class="token operator">|</span> files                 <span class="token operator">|</span>                   <span class="token number">815855</span> <span class="token operator">|</span>
<span class="token operator">|</span> chunks                <span class="token operator">|</span>                  <span class="token number">1153487</span> <span class="token operator">|</span>
<span class="token operator">|</span> all chunk copies      <span class="token operator">|</span>                  <span class="token number">2303456</span> <span class="token operator">|</span>
<span class="token operator">|</span> regular chunk copies  <span class="token operator">|</span>                  <span class="token number">2303456</span> <span class="token operator">|</span>
<span class="token operator">|</span> last successful store <span class="token operator">|</span> Wed Aug <span class="token number">18</span> <span class="token number">18</span>:00:00 <span class="token number">2021</span> <span class="token operator">|</span>
<span class="token operator">|</span> last save duration    <span class="token operator">|</span>                    ~0.3s <span class="token operator">|</span>
<span class="token operator">|</span> last save status      <span class="token operator">|</span>      Saved <span class="token keyword">in</span> background <span class="token operator">|</span>
+-----------------------+--------------------------+

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u67E5\u770B MSS \u5185\u5B58\u4F7F\u7528\u60C5\u51B5\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code># ufscli -SMU

+----------------------------------------------------------------------------------------------------------+
|                                        Memory Usage Detailed Info                                        |
+---------------+-------------+------------------+---------------------+-----------------------------------+
|  object name  | memory used | memory allocated | utilization percent | percent of total allocated memory |
+---------------+-------------+------------------+---------------------+-----------------------------------+
| chunk hash    |     8.8 MiB |          128 MiB |              6.88 % |                            9.84 % |
| chunks        |      53 MiB |           67 MiB |             79.10 % |                            5.13 % |
| cs lists      |      35 MiB |           38 MiB |             92.14 % |                            2.93 % |
| edge hash     |     6.1 MiB |          128 MiB |              4.76 % |                            9.84 % |
| edges         |      71 MiB |          181 MiB |             39.13 % |                           13.92 % |
| node hash     |     6.3 MiB |          128 MiB |              4.92 % |                            9.84 % |
| nodes         |      56 MiB |           76 MiB |             73.81 % |                            5.86 % |
| deleted nodes |     118 KiB |           19 MiB |              0.60 % |                            1.47 % |
| chunk tabs    |      11 MiB |          498 MiB |              2.24 % |                           38.25 % |
| symlinks      |       280 B |           29 MiB |              0.00 % |                            2.20 % |
| quota         |        96 B |          9.5 MiB |              0.00 % |                            0.73 % |
+---------------+-------------+------------------+---------------------+-----------------------------------+
| total         |     248 MiB |          1.3 GiB |             19.03 % |                                 - |
+---------------+-------------+------------------+---------------------+-----------------------------------+
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u67E5\u770B\u6570\u636E\u5757\u72B6\u6001\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>ufscli <span class="token parameter variable">-SIC</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u67E5\u770B\u6587\u4EF6\u5065\u5EB7\u68C0\u67E5\u7ED3\u679C**\uFF1A**</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>ufscli <span class="token parameter variable">-SIL</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u67E5\u770B\u635F\u574F\u6587\u4EF6\u5217\u8868\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>ufscli <span class="token parameter variable">-SMF</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u67E5\u770B CSS \u670D\u52A1\u5217\u8868\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>ufscli <span class="token parameter variable">-SCS</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u67E5\u770B\u96C6\u7FA4\u78C1\u76D8\u5217\u8868\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>ufscli <span class="token parameter variable">-SHD</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u67E5\u770B\u5BA2\u6237\u7AEF\u5217\u8868\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>ufscli <span class="token parameter variable">-SMS</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_2-ufs-tools-\u5DE5\u5177" tabindex="-1"><a class="header-anchor" href="#_2-ufs-tools-\u5DE5\u5177" aria-hidden="true">#</a> 2. ufs-tools \u5DE5\u5177</h2><p><code>ufstools</code>\u5DE5\u5177\u652F\u6301\u5BF9\u6587\u4EF6\u7CFB\u7EDF\u8FDB\u884C\u9AD8\u7EA7\u7684\u7BA1\u7406\u64CD\u4F5C\u3002</p><p>\u652F\u6301\u7684\u64CD\u4F5C\u7C7B\u578B\u5982\u4E0B\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># ufstools &lt;toolname&gt; ... - work as a given tool</span>

	scadmin				<span class="token comment"># \u7BA1\u7406\u5B58\u50A8\u7B56\u7565</span>
	getsclass			<span class="token comment"># \u67E5\u770B\u5B58\u50A8\u7B56\u7565</span>
	setsclass			<span class="token comment"># \u8BBE\u7F6E\u5B58\u50A8\u7B56\u7565</span>
	copysclass			<span class="token comment"># \u590D\u5236\u5B58\u50A8\u7B56\u7565</span>
	listsclass			<span class="token comment"># \u67E5\u8BE2\u652F\u6301\u7684\u5B58\u50A8\u7B56\u7565\u5217\u8868</span>

	gettrashtime		<span class="token comment"># \u67E5\u8BE2\u56DE\u6536\u65F6\u95F4</span>
	settrashtime		<span class="token comment"># \u8BBE\u7F6E\u56DE\u6536\u65F6\u95F4</span>

	geteattr			<span class="token comment"># \u67E5\u8BE2eattr</span>
	seteattr			<span class="token comment"># \u8BBE\u7F6Eeattr</span>
	deleattr			<span class="token comment"># \u5220\u9664eattr</span>

	getquota			<span class="token comment"># \u67E5\u8BE2\u914D\u989D\u4FE1\u606F</span>
	setquota			<span class="token comment"># \u8BBE\u7F6E\u914D\u989D\u9650\u5236</span>
	delquota			<span class="token comment"># \u5220\u9664\u914D\u989D\u9650\u5236</span>

	checkfile			<span class="token comment"># \u67E5\u8BE2\u6587\u4EF6\u5BF9\u8C61\u7684\u7EDF\u8BA1\u7ED3\u679C</span>
	fileinfo			<span class="token comment"># \u67E5\u8BE2\u6587\u4EF6\u5BF9\u8C61\u7684\u6570\u636E\u5757\u4FE1\u606F</span>
	dirinfo				<span class="token comment"># \u67E5\u8BE2\u76EE\u5F55\u5BF9\u8C61\u7684\u7EDF\u8BA1\u7ED3\u679C</span>
	filerepair			<span class="token comment"># \u4FEE\u590D\u635F\u574F\u7684\u6587\u4EF6\u5BF9\u8C61\uFF08\u6570\u636E\u586B\u96F6\uFF09</span>

	makesnapshot		<span class="token comment"># \u521B\u5EFA\u5FEB\u7167</span>
	filepaths			<span class="token comment"># \u68C0\u7D22\u6587\u4EF6\u8DEF\u5F84\uFF08\u901A\u8FC7inode\uFF09</span>

	chkarchive			<span class="token comment"># \u67E5\u8BE2archive</span>
	setarchive			<span class="token comment"># \u8BBE\u7F6Earchive</span>
	clrarchive			<span class="token comment"># \u6E05\u9664archive</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,35);function c(d,u){return e(),l("div",null,[o,i(" more "),r])}const b=a(p,[["render",c],["__file","ufscli\u5DE5\u5177.html.vue"]]);export{b as default};
