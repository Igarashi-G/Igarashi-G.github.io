<template><div><h1 id="安装-gitlab" tabindex="-1"><a class="header-anchor" href="#安装-gitlab" aria-hidden="true">#</a> 安装 GitLab</h1>
<h3 id="_1-配置-yum-仓库" tabindex="-1"><a class="header-anchor" href="#_1-配置-yum-仓库" aria-hidden="true">#</a> 1. 配置 yum 仓库</h3>
<ul>
<li>
<p>新建 <code v-pre>/etc/yum.repos.d/gitlab-ce.repo</code> 内容如下</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>gitlab-ce<span class="token punctuation">]</span>
<span class="token assign-left variable">name</span><span class="token operator">=</span>Gitlab CE Repository
<span class="token assign-left variable">baseurl</span><span class="token operator">=</span>https://mirrors.tuna.tsinghua.edu.cn/gitlab-ce/yum/el<span class="token variable">$releasever</span>/
<span class="token assign-left variable">gpgcheck</span><span class="token operator">=</span><span class="token number">0</span>
<span class="token assign-left variable">enabled</span><span class="token operator">=</span><span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>再执行：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> yum makecache
<span class="token function">sudo</span> yum <span class="token function">install</span> gitlab-ce
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h3 id="_2-安装依赖包" tabindex="-1"><a class="header-anchor" href="#_2-安装依赖包" aria-hidden="true">#</a> 2. 安装依赖包</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> yum <span class="token function">install</span> <span class="token parameter variable">-y</span> <span class="token function">curl</span> policycoreutils-python openssh-server perl

<span class="token comment"># Enable OpenSSH server daemon if not enabled: sudo systemctl status sshd</span>
<span class="token function">sudo</span> systemctl <span class="token builtin class-name">enable</span> sshd
<span class="token function">sudo</span> systemctl start sshd

<span class="token comment"># Check if opening the firewall is needed with: sudo systemctl status firewalld</span>
<span class="token function">sudo</span> firewall-cmd <span class="token parameter variable">--permanent</span> --add-service<span class="token operator">=</span>http
<span class="token function">sudo</span> firewall-cmd <span class="token parameter variable">--permanent</span> --add-service<span class="token operator">=</span>https
<span class="token function">sudo</span> systemctl reload firewalld


<span class="token function">sudo</span> yum <span class="token function">install</span> postfix
<span class="token function">sudo</span> systemctl <span class="token builtin class-name">enable</span> postfix
<span class="token function">sudo</span> systemctl start postfix
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-安装-gitlab" tabindex="-1"><a class="header-anchor" href="#_3-安装-gitlab" aria-hidden="true">#</a> 3. 安装 GitLab</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> yum <span class="token function">install</span> <span class="token parameter variable">-y</span> gitlab-ce
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_4-初始化-gitlab" tabindex="-1"><a class="header-anchor" href="#_4-初始化-gitlab" aria-hidden="true">#</a> 4. 初始化 GitLab</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">vim</span> /etc/gitlab/gitlab.rb

<span class="token comment"># 修改 gitlab 配置文件，将 external_url='http://gitlab.example.com' 地址修改成服务器的IP或者域名</span>
external_url <span class="token string">"https://192.168.2.90"</span>

<span class="token comment"># 修改 gitlab 配置文件，配置初始密码</span>
gitlab_rails<span class="token punctuation">[</span><span class="token string">'initial_root_password'</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">'&lt;my_strong_password>'</span>

<span class="token comment"># 配置监听网络：tcp</span>
gitlab_workhorse<span class="token punctuation">[</span><span class="token string">'listen_network'</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">"tcp"</span>

<span class="token comment"># 配置地址和端口</span>
gitlab_workhorse<span class="token punctuation">[</span><span class="token string">'listen_addr'</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">"192.168.2.908888"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-修改网络端口" tabindex="-1"><a class="header-anchor" href="#_5-修改网络端口" aria-hidden="true">#</a> 5. 修改网络端口</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 禁用内置NG</span>
nginx<span class="token punctuation">[</span><span class="token string">'enable'</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token boolean">false</span>

<span class="token comment"># 指定NG的用户名</span>
web_server<span class="token punctuation">[</span><span class="token string">'external_users'</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">'nginx'</span><span class="token punctuation">]</span>

<span class="token comment">#  添加NG地址到信任列表，我这里就是本机地址</span>
gitlab_rails<span class="token punctuation">[</span><span class="token string">'trusted_proxies'</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">'127.0.0.1'</span><span class="token punctuation">]</span>

<span class="token comment"># 配置监听网络：tcp</span>
gitlab_workhorse<span class="token punctuation">[</span><span class="token string">'listen_network'</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">"tcp"</span>

<span class="token comment"># 配置地址和端口</span>
gitlab_workhorse<span class="token punctuation">[</span><span class="token string">'listen_addr'</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">"192.168.11.20:8888"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-常用命令" tabindex="-1"><a class="header-anchor" href="#_6-常用命令" aria-hidden="true">#</a> 6. 常用命令</h3>
<ul>
<li>
<p>重新编译配置，并启动 <code v-pre>GitLab</code> 服务</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> gitlab-ctl reconfigure
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>启动所有 <code v-pre>GitLab</code></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> gitlab-ctl start
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>重新启动 <code v-pre>GitLab</code></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> gitlab-ctl restart
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>停止所有 <code v-pre>GitLab</code></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> gitlab-ctl stop
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>查看服务状态</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> gitlab-ctl status
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>查看 <code v-pre>Gitlab</code> 日志</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> gitlab-ctl <span class="token function">tail</span>

<span class="token function">sudo</span> gitlab-ctl <span class="token function">tail</span> nginx/gitlab_access.log
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>修改默认的配置文件</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">vim</span> /etc/gitlab/gitlab.rb
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>检查 <code v-pre>Gitlab</code></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>gitlab-rake gitlab:check <span class="token assign-left variable">SANITIZE</span><span class="token operator">=</span>true <span class="token parameter variable">--trace</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
</ul>
</div></template>


