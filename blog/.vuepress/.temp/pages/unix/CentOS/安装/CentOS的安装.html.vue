<template><div><p><strong>CentOS</strong> 配置相关问题</p>
<!-- more -->
<h1 id="centos安装事项" tabindex="-1"><a class="header-anchor" href="#centos安装事项" aria-hidden="true">#</a> CentOS安装事项</h1>
<h3 id="_1-初始化相关" tabindex="-1"><a class="header-anchor" href="#_1-初始化相关" aria-hidden="true">#</a> 1. 初始化相关</h3>
<h5 id="vmware-初始化设置" tabindex="-1"><a class="header-anchor" href="#vmware-初始化设置" aria-hidden="true">#</a> <strong>VMware 初始化设置</strong></h5>
<p><code v-pre>编辑 -&gt; 虚拟网络编辑器 -&gt; 通常是 VMnet8 NAT 模式下</code></p>
<ul>
<li>
<p>通过管理员进行设置，应该会有默认的设置</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 子网ip：192.168.21.0   子网掩码：255.255.255.0</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>修改 <strong>NAT</strong> 设置</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 网关：192.168.21.2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>卡名称 <strong>ens33</strong> 改为 <strong>eth0</strong>，默认网卡常用 **eth0 ** （<em>方便</em>）</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token assign-left variable">net.ifnames</span><span class="token operator">=</span><span class="token number">0</span> <span class="token assign-left variable">biosdevname</span><span class="token operator">=</span><span class="token number">0</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
</ul>
<p><strong>安装后图形化配置 IP</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ nmtui
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h5 id="安装-net-tool" tabindex="-1"><a class="header-anchor" href="#安装-net-tool" aria-hidden="true">#</a> <strong>安装 net-tool</strong></h5>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ yum <span class="token function">install</span> net-tools
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h5 id="关闭防火墙" tabindex="-1"><a class="header-anchor" href="#关闭防火墙" aria-hidden="true">#</a> <strong>关闭防火墙</strong></h5>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># firewall-cmd --state</span>

systemctl status firewalld
systemctl stop firewalld
systemctl disable firewalld
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


