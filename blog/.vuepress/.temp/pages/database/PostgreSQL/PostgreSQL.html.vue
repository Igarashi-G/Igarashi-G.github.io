<template><div><h1 id="postgresql" tabindex="-1"><a class="header-anchor" href="#postgresql" aria-hidden="true">#</a> PostgreSQL</h1>
<p><a href="https://www.postgresql.org/" target="_blank" rel="noopener noreferrer">官网<ExternalLinkIcon/></a> | <a href="https://www.postgresql.org/docs/current/index.html" target="_blank" rel="noopener noreferrer">文档<ExternalLinkIcon/></a></p>
<h2 id="_1-postgresql-数据库" tabindex="-1"><a class="header-anchor" href="#_1-postgresql-数据库" aria-hidden="true">#</a> 1. PostgreSQL 数据库</h2>
<p><strong>86</strong> 年诞生的，<strong>开源</strong>、**对象关系型 **数据库，采用 <strong>客户端/服务器</strong> 模型</p>
<ul>
<li><code v-pre>postgres</code>： 服务器进程，管理数据库</li>
<li><code v-pre>Navicat</code>：等连接服务器的，客户端工具</li>
</ul>
<h3 id="_1-安装" tabindex="-1"><a class="header-anchor" href="#_1-安装" aria-hidden="true">#</a> 1. 安装</h3>
<p><a href="https://www.postgresql.org/download/" target="_blank" rel="noopener noreferrer">下载<ExternalLinkIcon/></a></p>
<h4 id="_1-1-centos" tabindex="-1"><a class="header-anchor" href="#_1-1-centos" aria-hidden="true">#</a> 1.1 CentOS</h4>
<p><code v-pre>yum</code> 软件包安装</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>yum <span class="token parameter variable">-y</span> <span class="token function">install</span> postgresql-server
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>
<p>初始化数据库</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>postgresql-setup initdb
<span class="token comment">## Initializing database ... OK</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>配置 <code v-pre>postgresql</code> 远程连接</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">vim</span> /var/lib/pgsql/data/postgresql.conf

<span class="token comment"># 第59行取消注释，更改为：（vim 在VI的命令模式下显示所有行数 :set nu）</span>
listen_addresses <span class="token operator">=</span> <span class="token string">'*'</span>

<span class="token comment"># 第396行，添加</span>
log_line_prefix <span class="token operator">=</span> <span class="token string">'%t %u %d '</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>启动、开机启动</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>systemctl start postgresql
systemctl <span class="token builtin class-name">enable</span> postgresql
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>防火墙设置</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>firewall-cmd --add-service<span class="token operator">=</span>postgresql <span class="token parameter variable">--permanent</span>
firewall-cmd <span class="token parameter variable">--reload</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>开启 <strong>CLI</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> <span class="token parameter variable">-i</span> <span class="token parameter variable">-u</span> postgres
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
</ul>
<h4 id="_1-2-ubuntu" tabindex="-1"><a class="header-anchor" href="#_1-2-ubuntu" aria-hidden="true">#</a> 1.2 Ubuntu</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">apt-get</span> update
<span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token parameter variable">-y</span> <span class="token function">install</span> postgresql
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_1-3-windows" tabindex="-1"><a class="header-anchor" href="#_1-3-windows" aria-hidden="true">#</a> 1.3 Windows</h4>
<ul>
<li>
<p>下载 <code v-pre>.exe</code> 软件安装</p>
</li>
<li>
<p>安装时会提示设置 <strong>superuser</strong>、端口号等</p>
</li>
<li>
<p>安装后，添加环境变量</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 该目录下工具等同于CLI</span>
<span class="token string">'C:\Program Files\PostgreSQL\14\bin'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h3 id="_2-操作" tabindex="-1"><a class="header-anchor" href="#_2-操作" aria-hidden="true">#</a> 2. 操作</h3>
<p><a href="https://www.runoob.com/postgresql/postgresql-create-database.html" target="_blank" rel="noopener noreferrer">菜鸟教程<ExternalLinkIcon/></a> |</p>
</div></template>


