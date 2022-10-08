<template><div><h1 id="samba-server" tabindex="-1"><a class="header-anchor" href="#samba-server" aria-hidden="true">#</a> SAMBA Server</h1>
<p><a href="https://www.samba.org/" target="_blank" rel="noopener noreferrer">Samba 文档<ExternalLinkIcon/></a></p>
<h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述" aria-hidden="true">#</a> 1. 概述</h2>
<p><strong>Samba</strong> 是</p>
<h2 id="_2-安装-配置" tabindex="-1"><a class="header-anchor" href="#_2-安装-配置" aria-hidden="true">#</a> 2.安装&amp;配置</h2>
<h3 id="安装" tabindex="-1"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> 安装</h3>
<ul>
<li>
<p>CentOS 下安装客户端</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
</ul>
<h3 id="配置" tabindex="-1"><a class="header-anchor" href="#配置" aria-hidden="true">#</a> 配置</h3>
<Alert type="info">通常在 `/etc/samba/smb.conf` 文件中指定**日志**文件名称和**共享**存放路径</Alert><h5 id="常规全局配置" tabindex="-1"><a class="header-anchor" href="#常规全局配置" aria-hidden="true">#</a> 常规全局配置：</h5>
<blockquote>
<p><code v-pre>#</code>号开头：默认的文字注释信息</p>
<p><code v-pre>；</code>号开头：默认的注释配置项</p>
</blockquote>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>[global]
	workgroup = SAMBA
	security = user

#注释网卡配置项
;	interfaces = lo eth0 192.168.1.12/24 172.168.13.2/24
	passdb backend = tdbsam

	printing = cups
	printcap name = cups
	load printers = yes
	cups options = raw

	include = /etc/samba/smb_share.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>[global]</strong>: 关键字，全局配置</p>
<ul>
<li>
<p><code v-pre>workgroup = SAMBA</code> # Windows NT 域名（域环境为域名） 或 工作组名</p>
</li>
<li>
<p><code v-pre>security = user</code> # 设置用户访问 <strong>Samba Server</strong> 的验证方式，一共有四种安全级别模式：</p>
<ol>
<li>
<p><code v-pre>auto：</code> 默认安全设置，<strong>Samba Server</strong> 查询角色参数，来自动判断安全模式</p>
</li>
<li>
<p><code v-pre>user：</code> 若未执指定服务器角色，则是 <strong>Samba</strong> 中的默认安全设置，访问 <strong>Samba Server</strong> ，需要提交合法的用户名和密码，由服务端负责检查账号和密码的正确性，共享目录只能被授权的用户访问，默认为此模式。</p>
</li>
<li>
<p><code v-pre>domain：</code> 仅当已使用 <code v-pre>net conf</code> 将此计算机添加到 <strong>Windows NT</strong> 域中时，此模式才能正常工作。<strong>Samba</strong> 会将用户名/密码传递到 Windows NT 主域控制器来验证用户名/密码</p>
</li>
<li>
<p><code v-pre>ads：</code> 在此模式下，<strong>Samba</strong> 将充当 <strong>ADS 域</strong>中的域成员。<strong>Samba Server</strong> 需要安装和配置 <strong>Kerberos</strong>，并且需要使用网络实用程序将 <strong>Samba 加入 ADS 域</strong></p>
</li>
</ol>
</li>
<li>
<p><code v-pre>realm = SAMBA</code> # 域选项，指定主机所属的 <strong>AD 域</strong></p>
<blockquote>
<p>仅在设置了 <code v-pre>security = ads</code> 选项时使用</p>
</blockquote>
<hr>
</li>
<li>
<p><code v-pre>passdb backend = tdbsam</code> # 用于存储用户信息的后台，有三种：</p>
<ul>
<li><code v-pre>smbpasswd：</code> 使用 <code v-pre>smb</code> 自己的工具 <strong>smbpasswd</strong> 来给系统用户设置一个 <code v-pre>smb</code>密码，客户端使用这个密码来访问，默认在 <code v-pre>/etc/samba</code> 目录下</li>
<li><code v-pre>tdbsam:</code> 使用数据库文件 <code v-pre>passdb.tdb</code> 来建立用户数据库，同上可通过工具 <strong>smbpasswd</strong> 创建用户，但前提是创建的用户必须是系统用户</li>
<li><code v-pre>ldapsam：</code> 该方式则是基于 <a href="">LDAP</a> 来验证用户</li>
<li>首先要建立 LDAP 服务</li>
<li>然后设置<code v-pre>passdb backend = ldapsam:ldap://LDAP Server</code></li>
</ul>
<hr>
</li>
<li>
<p><code v-pre>printing = cups</code> # 设置共享打印机的类型，支持的打印系统有：<code v-pre>bsd</code>, <code v-pre>sysv</code>, <code v-pre>plp</code>, <code v-pre>lprng</code>, <code v-pre>aix</code>, <code v-pre>hpux</code>, <code v-pre>qnx</code></p>
</li>
<li>
<p><code v-pre>printcap name = cups</code> # 设置共享打印机的配置文件</p>
</li>
<li>
<p><code v-pre>load printers = yes</code> # 是否在 <strong>启动 <code v-pre>smb</code> 时</strong> 共享打印机</p>
</li>
<li>
<p><code v-pre>cups options = raw</code> # 允许您将选项传递给 CUPS 库。设置这个选项，例如，允许您在 Windows 客户端上使用驱动程序。，而不是单独设置它们</p>
<hr>
</li>
<li>
<p><code v-pre>include = /etc/samba/smb_share.conf</code> # 允许全局文件键入子文件，将全局配置和共享配置解耦，若指定文件不存在，则不会加载</p>
<blockquote>
<p>当配置 <code v-pre>include = registry</code> 时，不是键入当前目录下的 <code v-pre>registry</code> 文件，是从注册表中读取全局配置选项，此时可以通过 <code v-pre>net conf</code> 进行对 <code v-pre>samba</code> 的配置，如：</p>
</blockquote>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>net conf addshare igarashi /export/nas/igarashi
net conf list
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<hr>
<div class="language-ini ext-ini line-numbers-mode"><pre v-pre class="language-ini"><code><span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">homes</span><span class="token punctuation">]</span></span>
	<span class="token key attr-name">comment</span> <span class="token punctuation">=</span> <span class="token value attr-value">Home Directories</span>
	<span class="token key attr-name">valid users</span> <span class="token punctuation">=</span> <span class="token value attr-value">%S, %D%w%S</span>
	<span class="token key attr-name">browseable</span> <span class="token punctuation">=</span> <span class="token value attr-value">No</span>
	<span class="token key attr-name">read only</span> <span class="token punctuation">=</span> <span class="token value attr-value">No</span>
	<span class="token key attr-name">inherit acls</span> <span class="token punctuation">=</span> <span class="token value attr-value">Yes</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>[home]</strong>: 默认共享，特殊共享目录，表示用户主目录</p>
<hr>
<div class="language-ini ext-ini line-numbers-mode"><pre v-pre class="language-ini"><code><span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">printers</span><span class="token punctuation">]</span></span>
	<span class="token key attr-name">comment</span> <span class="token punctuation">=</span> <span class="token value attr-value">All Printers</span>
	<span class="token key attr-name">path</span> <span class="token punctuation">=</span> <span class="token value attr-value">/var/tmp</span>
	<span class="token key attr-name">printable</span> <span class="token punctuation">=</span> <span class="token value attr-value">Yes</span>
	<span class="token key attr-name">create mask</span> <span class="token punctuation">=</span> <span class="token value attr-value">0600</span>
	<span class="token key attr-name">browseable</span> <span class="token punctuation">=</span> <span class="token value attr-value">No</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>[printers]</strong>: 默认共享，表示共享打印机</p>
<hr>
<h5 id="常规共享配置" tabindex="-1"><a class="header-anchor" href="#常规共享配置" aria-hidden="true">#</a> 常规共享配置：</h5>
<p>以一个常规 <code v-pre>ufs目录</code> 导出配置为例</p>
<div class="language-ini ext-ini line-numbers-mode"><pre v-pre class="language-ini"><code><span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">ufs</span><span class="token punctuation">]</span></span>
	<span class="token key attr-name">comment</span> <span class="token punctuation">=</span> <span class="token value attr-value">UFS</span>
	<span class="token key attr-name">path</span> <span class="token punctuation">=</span> <span class="token value attr-value">/export/nas</span>
	<span class="token key attr-name">browseable</span> <span class="token punctuation">=</span> <span class="token value attr-value">yes</span>
	<span class="token key attr-name">public</span> <span class="token punctuation">=</span> <span class="token value attr-value">yes</span>
	<span class="token key attr-name">hosts allow</span> <span class="token punctuation">=</span> <span class="token value attr-value">172.16.120.121/255.255.255.0</span>
	<span class="token key attr-name">hosts deny</span> <span class="token punctuation">=</span> <span class="token value attr-value">172.16.120.122</span>
	<span class="token key attr-name">admin users</span> <span class="token punctuation">=</span> <span class="token value attr-value">root, @root</span>
	<span class="token key attr-name">valid users</span> <span class="token punctuation">=</span> <span class="token value attr-value">root, @root</span>
	<span class="token key attr-name">invalid users</span> <span class="token punctuation">=</span> <span class="token value attr-value">fred admin @wheel</span>
	<span class="token key attr-name">read only</span> <span class="token punctuation">=</span> <span class="token value attr-value">no</span>
	<span class="token key attr-name">writable</span> <span class="token punctuation">=</span> <span class="token value attr-value">yes</span>
	<span class="token key attr-name">read list</span> <span class="token punctuation">=</span> <span class="token value attr-value">root</span>
	<span class="token key attr-name">write list</span> <span class="token punctuation">=</span> <span class="token value attr-value">root</span>
	<span class="token key attr-name">inherit acls</span> <span class="token punctuation">=</span> <span class="token value attr-value">yes</span>
	<span class="token key attr-name">create mask</span> <span class="token punctuation">=</span> <span class="token value attr-value">0664</span>
	<span class="token key attr-name">directory mask</span> <span class="token punctuation">=</span> <span class="token value attr-value">0775</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>[ufs]</strong>: 共享资源名</p>
<ul>
<li>
<p><code v-pre>comment = UFS</code> # 共享的注释说明</p>
</li>
<li>
<p><code v-pre>path = /export/nas</code> # 共享路径</p>
</li>
<li>
<p><code v-pre>browseable = yes</code> # 是否允许用户查看共享内容，默认<code v-pre>yes</code>，若为<code v-pre>no</code>，必须写绝对路径才能查看</p>
</li>
<li>
<p><code v-pre>public = yes</code> # 是否允许匿名访问</p>
</li>
<li>
<p><code v-pre>hosts allow = 172.16.120.121/255.255.255.0</code> # 设置允许哪台主机访问</p>
</li>
<li>
<p><code v-pre>hosts deny = 172.16.120.122</code> # 设置拒绝哪台主机访问</p>
<hr>
</li>
<li>
<p><code v-pre>admin users = root, @root</code> # 指定用户作为超级用户，无论文件权限如何，都拥有绝对权限</p>
</li>
<li>
<p><code v-pre>invalid users = fred admin @wheel</code> # 禁止登录到此服务的用户列表，确保不正确的设置不会破坏安全</p>
</li>
<li>
<p><code v-pre>valid users = root, @root</code> # 仅指定的 <strong>用户 / 组</strong> 可以访问该共享资源</p>
<ul>
<li>多个用户：若有多个用户名，中间用逗号隔开</li>
<li>组名：需要用@</li>
</ul>
</li>
<li>
<p><code v-pre>read only = no</code> # 设置目录只读，<code v-pre>yes</code> 为 <strong>只读</strong> ，<code v-pre>no</code> 为 <strong>读写</strong></p>
</li>
<li>
<p><code v-pre>read list = root</code> # 控制只读范围，允许该字段填写的 <strong>用户 / 组</strong> 只读</p>
</li>
<li>
<p><code v-pre>writable = yes</code> # 设置目录可写，<code v-pre>yes</code> 为 <strong>读写</strong>，<code v-pre>no</code> 为 <strong>只读</strong></p>
</li>
<li>
<p><code v-pre>write list = root</code> # 控制写入范围，允许该字段填写的 <strong>用户 / 组</strong> 可写</p>
<blockquote>
<p>若用户同时存在于 <code v-pre>read list</code> 和 <code v-pre>write list</code> 中，权限大于只读，赋予可写权限</p>
</blockquote>
</li>
<li>
<p><code v-pre>inherit acls = yes</code> # 父目录上存在默认 acl，则在这些父目录中创建新文件或子目录时始终遵循这些 acl</p>
</li>
<li>
<p><code v-pre>create mask|mode = 0664</code> # 定义用户可在共享中有 <strong>创建文件</strong> 的权限</p>
</li>
<li>
<p><code v-pre>directory mask|mode = 0775</code> # 定义用户可在共享中有 <strong>创建文件夹</strong> 的权限，<strong>用户 / 组 有 读、写、执行</strong> 的权限</p>
</li>
<li></li>
</ul>
<h2 id="_3-命令" tabindex="-1"><a class="header-anchor" href="#_3-命令" aria-hidden="true">#</a> 3. 命令</h2>
<h5 id="基本的挂载、卸载" tabindex="-1"><a class="header-anchor" href="#基本的挂载、卸载" aria-hidden="true">#</a> 基本的挂载、卸载</h5>
<ul>
<li>
<p>基本挂载</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 通过IP挂载</span>
$ <span class="token function">mount</span> <span class="token parameter variable">-t</span> cifs //172.16.120./test /mnt/uit-share02/
$ Password <span class="token keyword">for</span> root@//10.10.10.223/test

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>强制卸载</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ <span class="token function">umount</span> <span class="token parameter variable">-f</span> <span class="token parameter variable">-a</span> <span class="token parameter variable">-t</span> cifs <span class="token parameter variable">-l</span> /挂载点
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
</ul>
<h5 id="清除-window-下-samba-的缓存" tabindex="-1"><a class="header-anchor" href="#清除-window-下-samba-的缓存" aria-hidden="true">#</a> 清除 Window 下 samba 的缓存</h5>
<ul>
<li>
<p>查看缓存列表</p>
<div class="language-powershell ext-powershell line-numbers-mode"><pre v-pre class="language-powershell"><code>$ net use
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>删除所有缓存</p>
<div class="language-powershell ext-powershell line-numbers-mode"><pre v-pre class="language-powershell"><code>$ net use <span class="token operator">*</span> <span class="token operator">/</span><span class="token function">del</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote>
<p>再去 任务管理器 - 重启文件资源管理器，确保刷新</p>
</blockquote>
</li>
</ul>
<h5 id="pdbedit-操作用户" tabindex="-1"><a class="header-anchor" href="#pdbedit-操作用户" aria-hidden="true">#</a> pdbedit 操作用户</h5>
<ul>
<li>
<p>列出当前用户：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 全部用户</span>
$ pdbedit <span class="token parameter variable">-L</span>

<span class="token comment"># 指定用户</span>
$ pdbedit <span class="token parameter variable">-L</span> <span class="token parameter variable">--user</span><span class="token operator">=</span>zz
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>添加用户：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 无需回车确认输入</span>
$ <span class="token builtin class-name">echo</span> <span class="token parameter variable">-e</span> <span class="token string">"12345<span class="token entity" title="\n">\n</span>12345<span class="token entity" title="\n">\n</span>"</span> <span class="token operator">|</span> pdbedit <span class="token parameter variable">-t</span> <span class="token parameter variable">-a</span> zz
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>更新用户：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 也许这只是针对于修改密码</span>
$ <span class="token builtin class-name">echo</span> <span class="token parameter variable">-e</span> <span class="token string">"233333<span class="token entity" title="\n">\n</span>233333<span class="token entity" title="\n">\n</span>"</span> <span class="token operator">|</span> pdbedit <span class="token parameter variable">-t</span> <span class="token parameter variable">-r</span> <span class="token parameter variable">-u</span> zz
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>删除用户：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ pdbedit <span class="token parameter variable">-x</span> zz
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
</ul>
</div></template>


