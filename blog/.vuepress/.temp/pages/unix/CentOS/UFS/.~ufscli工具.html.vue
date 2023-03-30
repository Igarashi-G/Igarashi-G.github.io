<template><div><p>本文档提供 <strong>UFS</strong> 存储系统中 <strong>CLI</strong> 工具的使用方法</p>
<!-- more -->
<h2 id="_1-ufs-cli-工具" tabindex="-1"><a class="header-anchor" href="#_1-ufs-cli-工具" aria-hidden="true">#</a> 1. ufs-cli 工具</h2>
<p><code v-pre>ufscli</code>工具支持以命令行方式查询集群状态</p>
<p>使用方式如下：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>ufscli <span class="token punctuation">[</span>-H master_host<span class="token punctuation">]</span> <span class="token punctuation">[</span>-P master_port<span class="token punctuation">]</span> opration
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>opration 支持的操作类型如下：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token parameter variable">-SIN</span> <span class="token builtin class-name">:</span> show full metaserver info
<span class="token parameter variable">-SIM</span> <span class="token builtin class-name">:</span> show only metaservers states
<span class="token parameter variable">-SIG</span> <span class="token builtin class-name">:</span> show only general master <span class="token punctuation">(</span>leader<span class="token punctuation">)</span> info
<span class="token parameter variable">-SMU</span> <span class="token builtin class-name">:</span> show only lgeneral master <span class="token punctuation">(</span>leader<span class="token punctuation">)</span> memory usage
<span class="token parameter variable">-SIC</span> <span class="token builtin class-name">:</span> show only chunks info <span class="token punctuation">(</span>goal/copies matrices<span class="token punctuation">)</span>
<span class="token parameter variable">-SIL</span> <span class="token builtin class-name">:</span> show only loop info <span class="token punctuation">(</span>with messages<span class="token punctuation">)</span>
<span class="token parameter variable">-SMF</span> <span class="token builtin class-name">:</span> show only missing chunks/files
<span class="token parameter variable">-SCS</span> <span class="token builtin class-name">:</span> show connected chunk servers
<span class="token parameter variable">-SHD</span> <span class="token builtin class-name">:</span> show hdd data
<span class="token parameter variable">-SMS</span> <span class="token builtin class-name">:</span> show active mounts
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>查看集群状态:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>ufscli <span class="token parameter variable">-SIN</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>查看 MSS 服务列表:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>ufscli <span class="token parameter variable">-SIM</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>查看 MSS-Leader 状态:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># ufscli -SIG</span>

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

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>查看 MSS 内存使用情况：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code># ufscli -SMU

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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>查看数据块状态：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>ufscli <span class="token parameter variable">-SIC</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>查看文件健康检查结果**：**</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>ufscli <span class="token parameter variable">-SIL</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>查看损坏文件列表：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>ufscli <span class="token parameter variable">-SMF</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>查看 CSS 服务列表：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>ufscli <span class="token parameter variable">-SCS</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>查看集群磁盘列表：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>ufscli <span class="token parameter variable">-SHD</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>查看客户端列表：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>ufscli <span class="token parameter variable">-SMS</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_2-ufs-tools-工具" tabindex="-1"><a class="header-anchor" href="#_2-ufs-tools-工具" aria-hidden="true">#</a> 2. ufs-tools 工具</h2>
<p><code v-pre>ufstools</code> 工具支持对文件系统进行高级的管理操作</p>
<p>支持的操作类型如下：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># ufstools &lt;toolname> ... - work as a given tool</span>

	scadmin				<span class="token comment"># 管理存储策略</span>
	getsclass			<span class="token comment"># 查看存储策略</span>
	setsclass			<span class="token comment"># 设置存储策略</span>
	copysclass			<span class="token comment"># 复制存储策略</span>
	listsclass			<span class="token comment"># 查询支持的存储策略列表</span>

	gettrashtime		<span class="token comment"># 查询回收时间</span>
	settrashtime		<span class="token comment"># 设置回收时间</span>

	geteattr			<span class="token comment"># 查询eattr</span>
	seteattr			<span class="token comment"># 设置eattr</span>
	deleattr			<span class="token comment"># 删除eattr</span>

	getquota			<span class="token comment"># 查询配额信息</span>
	setquota			<span class="token comment"># 设置配额限制</span>
	delquota			<span class="token comment"># 删除配额限制</span>

	checkfile			<span class="token comment"># 查询文件对象的统计结果</span>
	fileinfo			<span class="token comment"># 查询文件对象的数据块信息</span>
	dirinfo				<span class="token comment"># 查询目录对象的统计结果</span>
	filerepair			<span class="token comment"># 修复损坏的文件对象（数据填零）</span>

	makesnapshot		<span class="token comment"># 创建快照</span>
	filepaths			<span class="token comment"># 检索文件路径（通过inode）</span>

	chkarchive			<span class="token comment"># 查询archive</span>
	setarchive			<span class="token comment"># 设置archive</span>
	clrarchive			<span class="token comment"># 清除archive</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_1-2-1-回收时间" tabindex="-1"><a class="header-anchor" href="#_1-2-1-回收时间" aria-hidden="true">#</a> 1.2.1 回收时间</h4>
<p>设置回收时间</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ ufstools settrashtime <span class="token environment constant">SECONDS</span> name <span class="token punctuation">[</span>name <span class="token punctuation">..</span>.<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>查看回收时间</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># usage: </span>
<span class="token variable">$ufstools</span> gettrashtime name <span class="token punctuation">[</span>name <span class="token punctuation">..</span>.<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_1-2-2-文件状态" tabindex="-1"><a class="header-anchor" href="#_1-2-2-文件状态" aria-hidden="true">#</a> 1.2.2 文件状态</h4>
<p>查看文件状态</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ ufstools fileinfo <span class="token punctuation">[</span>-qcs<span class="token punctuation">]</span> name <span class="token punctuation">[</span>name <span class="token punctuation">..</span>.<span class="token punctuation">]</span>

switches:
 <span class="token parameter variable">-q</span> - quick info <span class="token punctuation">(</span>show only number of valid copies<span class="token punctuation">)</span>
 <span class="token parameter variable">-c</span> - receive chunk checksums from chunkservers
 <span class="token parameter variable">-s</span> - calculate <span class="token function">file</span> signature <span class="token punctuation">(</span>using checksums<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>查看目录状态</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ ufstools dirinfo <span class="token punctuation">[</span>-nhHkmg<span class="token punctuation">]</span> <span class="token punctuation">[</span>-idfclsr<span class="token punctuation">]</span> <span class="token punctuation">[</span>-p<span class="token punctuation">]</span> name <span class="token punctuation">[</span>name <span class="token punctuation">..</span>.<span class="token punctuation">]</span>

<span class="token string">'show'</span> switches:
 <span class="token parameter variable">-i</span> - show number of inodes
 <span class="token parameter variable">-d</span> - show number of directories
 <span class="token parameter variable">-f</span> - show number of files
 <span class="token parameter variable">-c</span> - show number of chunks
 <span class="token parameter variable">-l</span> - show length
 <span class="token parameter variable">-s</span> - show size
 <span class="token parameter variable">-r</span> - show realsize
<span class="token string">'mode'</span> switch:
 <span class="token parameter variable">-p</span> - precise mode

If no <span class="token string">'show'</span> switches are present <span class="token keyword">then</span> show everything

Meaning of some not obvious output data:
 <span class="token string">'length'</span> is just <span class="token function">sum</span> of files lengths
 <span class="token string">'size'</span> is <span class="token function">sum</span> of chunks lengths
 <span class="token string">'realsize'</span> is estimated hdd usage <span class="token punctuation">(</span>usually size multiplied by current goal<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>修复损坏文件</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ ufstools filerepair name <span class="token punctuation">[</span>name <span class="token punctuation">..</span>.<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>检索文件路径</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ ufstools filepaths name/inode <span class="token punctuation">[</span>name/inode <span class="token punctuation">..</span>.<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="_1-2-3-配额管理" tabindex="-1"><a class="header-anchor" href="#_1-2-3-配额管理" aria-hidden="true">#</a> 1.2.3 配额管理</h4>
<p>查看配额列表</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ ufstools listquota <span class="token function">dirname</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>设置配额</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ ufstools setquota <span class="token punctuation">(</span>-U uid<span class="token operator">|</span>-G gid<span class="token operator">|</span>-D<span class="token punctuation">)</span> <span class="token punctuation">[</span>-iI inodes<span class="token punctuation">]</span> <span class="token punctuation">[</span>-p grace_period<span class="token punctuation">]</span> <span class="token punctuation">[</span>-lL length<span class="token punctuation">]</span> <span class="token punctuation">[</span>-sS size<span class="token punctuation">]</span> <span class="token punctuation">[</span>-rR realsize<span class="token punctuation">]</span> <span class="token function">dirname</span> <span class="token punctuation">[</span>dirname <span class="token punctuation">..</span>.<span class="token punctuation">]</span>
 <span class="token parameter variable">-U</span> - <span class="token builtin class-name">set</span> user <span class="token function">quota</span>
 <span class="token parameter variable">-G</span> - <span class="token builtin class-name">set</span> group <span class="token function">quota</span>
 <span class="token parameter variable">-D</span> - <span class="token builtin class-name">set</span> directory <span class="token function">quota</span>
 <span class="token parameter variable">-p</span> - <span class="token builtin class-name">set</span> grace period <span class="token keyword">in</span> seconds <span class="token keyword">for</span> soft <span class="token function">quota</span>
 -i/-I - <span class="token builtin class-name">set</span> soft/hard limit <span class="token keyword">for</span> number of filesystem objects
 -l/-L - <span class="token builtin class-name">set</span> soft/hard limit <span class="token keyword">for</span> <span class="token function">sum</span> of files lengths
 -s/-S - <span class="token builtin class-name">set</span> soft/hard limit <span class="token keyword">for</span> <span class="token function">sum</span> of <span class="token function">file</span> sizes <span class="token punctuation">(</span>chunk sizes<span class="token punctuation">)</span>
 -r/-R - <span class="token builtin class-name">set</span> soft/hard limit <span class="token keyword">for</span> estimated hdd usage <span class="token punctuation">(</span>usually size multiplied by goal<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>查看配额</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ ufstools getquota <span class="token punctuation">(</span>-U uid<span class="token operator">|</span>-G gid<span class="token operator">|</span>-D<span class="token punctuation">)</span> <span class="token function">dirname</span> <span class="token punctuation">[</span>dirname <span class="token punctuation">..</span>.<span class="token punctuation">]</span>
 <span class="token parameter variable">-U</span> - get user <span class="token function">quota</span>
 <span class="token parameter variable">-G</span> - get group <span class="token function">quota</span>
 <span class="token parameter variable">-D</span> - get directory <span class="token function">quota</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>删除配额</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ ufstools delquota <span class="token punctuation">(</span>-U uid<span class="token operator">|</span>-G gid<span class="token operator">|</span>-D<span class="token punctuation">)</span> <span class="token function">dirname</span> <span class="token punctuation">[</span>dirname <span class="token punctuation">..</span>.<span class="token punctuation">]</span>
 <span class="token parameter variable">-U</span> - delete user <span class="token function">quota</span>
 <span class="token parameter variable">-G</span> - delete group <span class="token function">quota</span>
 <span class="token parameter variable">-D</span> - delete directory <span class="token function">quota</span>
 -i/-I - delete inodes soft/hard <span class="token function">quota</span>
 -l/-L - delete length soft/hard <span class="token function">quota</span>
 -s/-S - delete size soft/hard <span class="token function">quota</span>
 -r/-R - delete real size soft/hard <span class="token function">quota</span>
 -a/-A - delete all soft/hard quotas
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


