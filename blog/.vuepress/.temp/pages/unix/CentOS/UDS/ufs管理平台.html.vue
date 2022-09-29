<template><div><h1 id="ufs-快捷命令" tabindex="-1"><a class="header-anchor" href="#ufs-快捷命令" aria-hidden="true">#</a> UFS 快捷命令</h1>
<h3 id="_1-部署相关" tabindex="-1"><a class="header-anchor" href="#_1-部署相关" aria-hidden="true">#</a> 1. 部署相关</h3>
<h4 id="_1-1-更新集群代码" tabindex="-1"><a class="header-anchor" href="#_1-1-更新集群代码" aria-hidden="true">#</a> 1.1 更新集群代码</h4>
<ul>
<li>
<p>免密认证</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ ssh-keygen
$ ssh-copy-id <span class="token parameter variable">-i</span> ~/.ssh/id_rsa.pub <span class="token parameter variable">-p</span> <span class="token number">22</span> root@172.16.120.142
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>远程拷贝</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ <span class="token function">scp</span> <span class="token parameter variable">-r</span> agent conf dashboard monitor mounter rook static version.py ubind watchdog root@172.16.120.142:/opt/uxs
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>远程执行命令</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ <span class="token function">ssh</span> <span class="token number">172.16</span>.120.142 <span class="token string">"systemctl restart uxs-agent"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>重启服务</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>systemctl restart uxs-dashboard
systemctl restart uxs-agent
systemctl restart uxs-monitor
systemctl status uxs-dashboard
systemctl status uxs-agent
systemctl status uxs-monitor
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>手动启动服务</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ python3 /opt/uxs/dashboard/uxsdashboard.py

$ python3 /opt/uxs/agent/uxsagent.py

$ python3 /opt/uxs/monitor/uxsmonitor.py
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>查看服务进程</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ <span class="token function">ps</span> <span class="token parameter variable">-ef</span> <span class="token operator">|</span><span class="token function">grep</span> uxsdashboard

$ <span class="token function">ps</span> <span class="token parameter variable">-ef</span> <span class="token operator">|</span><span class="token function">grep</span> uxsagent

$ <span class="token function">ps</span> <span class="token parameter variable">-ef</span> <span class="token operator">|</span><span class="token function">grep</span> uxsmonitor
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>删除服务 PID 文件</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ <span class="token function">rm</span> <span class="token parameter variable">-rf</span> /var/run/uxsagent.pid

$ <span class="token function">rm</span> <span class="token parameter variable">-rf</span> /var/run/uxsmonitor.pid
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>查看各个服务日志</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ tailf /var/log/uxs/uxsdashboard.log

$ tailf /var/log/uxs/uxsagent.log

$ tailf /var/log/uxs/uxsmonitor.log
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h4 id="_1-2-etcd-相关" tabindex="-1"><a class="header-anchor" href="#_1-2-etcd-相关" aria-hidden="true">#</a> 1.2 ETCD 相关</h4>
<ul>
<li>
<p>重置 ETCD</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 修改 new</span>
$ <span class="token function">vim</span> /etc/uxs/config.json

<span class="token comment"># 重置endpoints</span>
$ <span class="token function">vim</span> /etc/uxs/etcd.json

<span class="token punctuation">{</span>
    <span class="token string">"etcd_endpoints"</span><span class="token builtin class-name">:</span> <span class="token string">"ipv4:///127.0.0.1:22379"</span>
<span class="token punctuation">}</span>

<span class="token comment"># 清空etcd</span>
systemctl stop uxsetcd
<span class="token function">rm</span> <span class="token parameter variable">-rf</span> /var/lib/etcd/uxs_default.etcd
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h4 id="_1-3-生成许可" tabindex="-1"><a class="header-anchor" href="#_1-3-生成许可" aria-hidden="true">#</a> 1.3 生成许可</h4>
<ul>
<li>
<p>生成许可证</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ ufs_make_license <span class="token parameter variable">--serial_number</span> 17A179CFF629D10322E69AF61A959E013DCE5075  <span class="token parameter variable">--chunkservers</span><span class="token operator">=</span><span class="token number">1000</span> <span class="token parameter variable">--clients</span><span class="token operator">=</span><span class="token number">10000</span> <span class="token parameter variable">--expire_date</span><span class="token operator">=</span><span class="token number">2099</span>-01-01 <span class="token parameter variable">--capcity</span><span class="token operator">=</span>2PiB
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
</ul>
<h4 id="_1-4-mss-服务相关" tabindex="-1"><a class="header-anchor" href="#_1-4-mss-服务相关" aria-hidden="true">#</a> 1.4 MSS 服务相关</h4>
<h5 id="解决-mss-无法启动问题" tabindex="-1"><a class="header-anchor" href="#解决-mss-无法启动问题" aria-hidden="true">#</a> 解决 <code v-pre>MSS</code> 无法启动问题</h5>
<ul>
<li>
<p><code v-pre>-a</code> 参数</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>ufsmetaserver restart <span class="token parameter variable">-a</span>

<span class="token comment"># 然后再执行 stop，并去管理平台手动启动</span>
ufsmetaserver stop
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><code v-pre>test</code> 参数</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>查看 ufsmetaserver 当前情况
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p><code v-pre>-f</code> 参数</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 查看服务错误日志</span>
ufsmetaserver <span class="token parameter variable">-f</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<blockquote>
<p><strong>备注</strong>： 终极解决办法: <code v-pre>ufsmeatserver -e</code></p>
<p>此方式会将所有 <code v-pre>meta</code>、<code v-pre>chunk</code> 都重新启动，可能会导致丢数据！！！！</p>
<p>仅有十分十分特殊情况下，也应该先确认，再使用</p>
</blockquote>
<h4 id="_1-5-css-服务相关" tabindex="-1"><a class="header-anchor" href="#_1-5-css-服务相关" aria-hidden="true">#</a> 1.5 CSS 服务相关</h4>
<h5 id="解决-css-无法启动问题" tabindex="-1"><a class="header-anchor" href="#解决-css-无法启动问题" aria-hidden="true">#</a> 解决 <code v-pre>CSS</code> 无法启动问题</h5>
<ul>
<li>
<p><code v-pre>-f</code> 参数</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 查看服务错误日志</span>
ufschunkserver <span class="token parameter variable">-f</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h4 id="_1-x-挂载相关" tabindex="-1"><a class="header-anchor" href="#_1-x-挂载相关" aria-hidden="true">#</a> 1.x 挂载相关</h4>
<ul>
<li>
<p>挂载子目录</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ /usr/bin/ufsmount <span class="token parameter variable">-o</span> <span class="token assign-left variable">ufsioretries</span><span class="token operator">=</span><span class="token number">3</span>,ufstimeout<span class="token operator">=</span><span class="token number">1</span>,ufsdelayedinit,internal /export/nas/Users
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>挂载回收站目录</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ /usr/bin/ufsmount <span class="token parameter variable">-m</span> /export/meta/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>远程挂载</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ ufsmount <span class="token parameter variable">-H</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
</ul>
<hr>
<h3 id="_2-调度相关" tabindex="-1"><a class="header-anchor" href="#_2-调度相关" aria-hidden="true">#</a> 2. 调度相关</h3>
<h4 id="_2-1-节点高可用" tabindex="-1"><a class="header-anchor" href="#_2-1-节点高可用" aria-hidden="true">#</a> 2.1 节点高可用</h4>
<h4 id="_2-2-nas-服务高可用" tabindex="-1"><a class="header-anchor" href="#_2-2-nas-服务高可用" aria-hidden="true">#</a> 2.2 NAS 服务高可用</h4>
<ul>
<li>
<p>监听 IP</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ <span class="token function">watch</span> <span class="token parameter variable">-n</span> <span class="token number">1</span> <span class="token string">"ip a"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>秒 <code v-pre>ping</code> IP</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 目前用于高可用检测网卡是否ping通，由于上锁同步导致至少需1s</span>
<span class="token function">ping</span> <span class="token number">192.16</span>.120.175 <span class="token parameter variable">-c</span> <span class="token number">1</span> <span class="token parameter variable">-t</span> <span class="token number">1</span> <span class="token parameter variable">-W</span> <span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>添加网卡 IP</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ <span class="token function">ip</span> addr <span class="token function">add</span> <span class="token number">172.16</span>.120.171/24 broadcast <span class="token number">172.16</span>.120.255 dev eth1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>删除网卡 IP</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ <span class="token function">ip</span> addr del <span class="token number">172.16</span>.120.171/24 dev eth1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>刷新网卡</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ <span class="token function">ip</span> addr flush eth1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>设置网卡状态</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ <span class="token function">ip</span> <span class="token function">link</span> <span class="token builtin class-name">set</span> eth1 down
$ <span class="token function">ip</span> <span class="token function">link</span> <span class="token builtin class-name">set</span> eth1 up
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<hr>
<h3 id="_3-基础排错相关" tabindex="-1"><a class="header-anchor" href="#_3-基础排错相关" aria-hidden="true">#</a> 3. 基础排错相关</h3>
<h4 id="_3-1-基础服务无法启动" tabindex="-1"><a class="header-anchor" href="#_3-1-基础服务无法启动" aria-hidden="true">#</a> 3.1 基础服务无法启动</h4>
<ul>
<li>
<p><code v-pre>systemctl</code> 无法启动</p>
<blockquote>
<p>例: <code v-pre>systemctl restart smb.service</code> 无法启动</p>
</blockquote>
</li>
<li></li>
</ul>
</div></template>


