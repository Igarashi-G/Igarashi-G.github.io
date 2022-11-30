<template><div><h1 id="ldap" tabindex="-1"><a class="header-anchor" href="#ldap" aria-hidden="true">#</a> LDAP</h1>
<p><strong>DAP（Directry Access Protocol）：</strong> 即目录访问协议，较老、复杂且重量级，后面又出轻量级、更好用的 <strong>LDAP</strong></p>
<!-- more -->
<h2 id="_1-x-500-协议" tabindex="-1"><a class="header-anchor" href="#_1-x-500-协议" aria-hidden="true">#</a> 1. X.500 协议</h2>
<h3 id="_1-1-概述" tabindex="-1"><a class="header-anchor" href="#_1-1-概述" aria-hidden="true">#</a> 1.1 概述</h3>
<p><strong>X.500</strong> 定义了目录系统，<strong>LDAP</strong> 只是它的轻量级实现</p>
<h5 id="目录系统" tabindex="-1"><a class="header-anchor" href="#目录系统" aria-hidden="true">#</a> <strong>目录系统</strong></h5>
<p><strong>Directory：</strong> 目录服务，旨在提供一个用户友好的 <code v-pre>name-address</code> 类的映射，其中 <code v-pre>name</code> 不可变，<code v-pre>address</code> 允许动态变化，即<code v-pre>key-value</code> 结构</p>
<p><strong>DIB：</strong> 目录信息库，由一批系统组成，每个系统持有对应现实世界的逻辑数据，这些存储的数据叫做 <strong>DIB</strong></p>
<img src="@source/unix/CentOS/LDAP/img/X500.png">
<p>一个标准的目录系统，有以下几部分</p>
<ul>
<li>目录服务</li>
<li>目录服务的用户</li>
<li>目录服务用来暴露自己的访问端点</li>
<li>用户和服务之间使用协议如 LDAP 进行交互</li>
<li>用户使用 LDAP 客户端访问目录服务</li>
</ul>
<h3 id="_1-2-dib-与-dit" tabindex="-1"><a class="header-anchor" href="#_1-2-dib-与-dit" aria-hidden="true">#</a> 1.2 DIB 与 DIT</h3>
<p><strong>DIB</strong> 目录信息库，由 <strong>DIT</strong>（<em>目录信息树</em>）、节点 <strong>Entry</strong>、<strong>Entry</strong> 中的属性及属性值构成，树形结构</p>
<ul>
<li><strong>Entry</strong> 代表一个节点，类型可以是 <code v-pre>object</code>，也可以是 <code v-pre>alias</code> 别名</li>
<li>一个 <strong>Entry</strong> 内可以拥有多个属性</li>
<li>一个属性内可以拥有一个 <strong>Type</strong>，以及多个 <strong>Value</strong></li>
</ul>
<img src="@source/unix/CentOS/LDAP/img/DIT.png">
<div class="custom-container tip">
<p class="custom-container-title">提示</p>
<p>故这种树形存储结构适用于，查询多、更新少</p>
</div>
<h3 id="_1-3-分布式-directory" tabindex="-1"><a class="header-anchor" href="#_1-3-分布式-directory" aria-hidden="true">#</a> 1.3 分布式 Directory</h3>
<p><strong>Directory</strong> 支持分布式操作，此时的服务端组成如下</p>
<img src="@source/unix/CentOS/LDAP/img/分布式.png">
<p><strong>DSA（<em>Directory System Agent</em>）：</strong> 用来连接服务和 <strong>DUA</strong>。他可以缓存 <strong>Directory</strong> 数据，可以用本地数据直接响应，也可以单纯做一个转发</p>
<p><strong>LDAP Server</strong>：是 <strong>Directory Service</strong> 的一部分，可以直接使用本地数据，也可以转发到其它 <strong>LDAP Server</strong> 获取数据</p>
<h2 id="_2-ldap-协议" tabindex="-1"><a class="header-anchor" href="#_2-ldap-协议" aria-hidden="true">#</a> 2. LDAP 协议</h2>
<p><strong>LDAP 协议：</strong> 是 <strong>轻量级的目录访问协议</strong>，其中</p>
<ul>
<li>
<p><strong>L（<em>LightWeight</em>）：</strong> 轻量级</p>
</li>
<li>
<p><strong>D（<em>Directory</em>）：</strong> 目录</p>
</li>
<li>
<p><strong>AP（<em>Access Protocol</em>）：</strong> 存取协议</p>
</li>
</ul>
<p>是 <strong>读性能高，写性能低且没有回滚机制</strong> 的数据存储协议，不是数据库，没有数据库这么强大，而是一个树状结构的目录，每个叶子都是由一条一条的分成若干区域的记录</p>
<img src="@source/unix/CentOS/LDAP/img/LDAP.jpg">
<h3 id="_2-1-概念说明" tabindex="-1"><a class="header-anchor" href="#_2-1-概念说明" aria-hidden="true">#</a> 2.1 概念说明</h3>
<p><strong>Entry：</strong> 最小单元 (<em>对象</em>）</p>
<p><strong>LDIF：</strong> 上文 <strong>Entry</strong> 的纯文本表示文件</p>
<p><strong>Schema：</strong> 模式（<em>对象类的集合</em>）对属性做了限制</p>
<p><strong>attribute：</strong> 基本对象的属性</p>
<p><strong>ObjectClass：</strong> 属性集合（<em>基本对象的继承属性</em>）</p>
<p><strong>backend &amp; database</strong></p>
<p><a href="./AD">属性说明 - 参考 AD</a></p>
<p><a href="https://blog.csdn.net/zou8944/article/details/122287398" target="_blank" rel="noopener noreferrer">参考详解 LDAP<ExternalLinkIcon/></a></p>
<h2 id="_3-搭建-ldap服务端" tabindex="-1"><a class="header-anchor" href="#_3-搭建-ldap服务端" aria-hidden="true">#</a> 3. 搭建 LDAP服务端</h2>
<p><a href="https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/7/html/system-level_authentication_guide/openldap" target="_blank" rel="noopener noreferrer">ReadHat OpenLDAP<ExternalLinkIcon/></a></p>
<p><a href="http://www.openldap.org/" target="_blank" rel="noopener noreferrer">OpenLDAP<ExternalLinkIcon/></a> 是一款 <strong>LDAP</strong> 开源集中账号管理的实现，支持众多系统版本，被广大互联网公司使用，<strong>openldap-server</strong> 的数据必须用原配的 <strong>Berkeley DB</strong>，不能使用 <strong>MySQL</strong> 作为后端数据库</p>
<Tabs :data='[{"title":"CentOS"}]'>
<template #tab0="{ title, value, isActive }">
<p><strong>关闭 selinux 和防火墙</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>setenforce <span class="token number">0</span>
<span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">'/SELINUX/s/enforcing/disabled/'</span> /etc/selinux/config
systemctl disable firewalld.service <span class="token operator">&amp;&amp;</span> systemctl stop firewalld.service
systemctl stop NetworkManager <span class="token operator">&amp;&amp;</span> systemctl disable NetworkManager
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>按需换源</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sed</span> <span class="token parameter variable">-e</span> <span class="token string">'s!^#baseurl=!baseurl=!g'</span> <span class="token punctuation">\</span>
       <span class="token parameter variable">-e</span>  <span class="token string">'s!^mirrorlist=!#mirrorlist=!g'</span> <span class="token punctuation">\</span>
       <span class="token parameter variable">-e</span> <span class="token string">'s!mirror.centos.org!mirrors.ustc.edu.cn!g'</span> <span class="token punctuation">\</span>
       <span class="token parameter variable">-i</span>  /etc/yum.repos.d/CentOS-Base.repo

yum <span class="token function">install</span> <span class="token parameter variable">-y</span> epel-release
<span class="token function">sed</span> <span class="token parameter variable">-e</span> <span class="token string">'s!^mirrorlist=!#mirrorlist=!g'</span> <span class="token punctuation">\</span>
	<span class="token parameter variable">-e</span> <span class="token string">'s!^#baseurl=!baseurl=!g'</span> <span class="token punctuation">\</span>
	<span class="token parameter variable">-e</span> <span class="token string">'s!^metalink!#metalink!g'</span> <span class="token punctuation">\</span>
	<span class="token parameter variable">-e</span> <span class="token string">'s!//download\.fedoraproject\.org/pub!//mirrors.ustc.edu.cn!g'</span> <span class="token punctuation">\</span>
	<span class="token parameter variable">-e</span> <span class="token string">'s!http://mirrors\.ustc!https://mirrors.ustc!g'</span> <span class="token punctuation">\</span>
	<span class="token parameter variable">-i</span> /etc/yum.repos.d/epel.repo /etc/yum.repos.d/epel-testing.repo
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>同步时间</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>yum <span class="token function">install</span> <span class="token parameter variable">-y</span> ntpdate ntp
ntpdate <span class="token number">0</span>.cn.pool.ntp.org
hwclock <span class="token parameter variable">--systohc</span>
<span class="token function">cat</span> <span class="token operator">&lt;&lt;</span>EOF<span class="token operator">>></span> /etc/ntp.conf
driftfile /var/lib/ntp/drift
server <span class="token number">0</span>.cn.pool.ntp.org
server <span class="token number">1</span>.cn.pool.ntp.org
server <span class="token number">2</span>.cn.pool.ntp.org
server <span class="token number">3</span>.cn.pool.ntp.org
EOF

systemctl <span class="token builtin class-name">enable</span> ntpd  <span class="token operator">&amp;&amp;</span> systemctl start ntpd
ntpq <span class="token parameter variable">-p</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>安装 OpenLDAP</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>yum <span class="token parameter variable">-y</span> <span class="token function">install</span> openldap compat-openldap openldap-clients openldap-servers openldap-servers-sql openldap-devel migrationtools
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>查看 OpenLDAP 版本</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>slapd <span class="token parameter variable">-VV</span>
@<span class="token punctuation">(</span><span class="token comment">#) $OpenLDAP: slapd 2.4.44 (Feb 23 2022 17:11:27) $</span>
	mockbuild@x86-01.bsys.centos.org:/builddir/build/BUILD/openldap-2.4.44/openldap-2.4.44/servers/slapd
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>OpenLDAP</strong> 相关配置文件信息</p>
<ul>
<li><code v-pre>/etc/openldap/slapd.conf：</code> <strong>OpenLDAP</strong> 主配置文件，记录根域信息，管理员名称，密码，日志，权限等</li>
<li><code v-pre>/etc/openldap/slapd.d/*：</code> 这下面是 <code v-pre>/etc/openldap/slapd.conf</code> 配置信息生成的文件，每修改一次配置信息，这里的东西就要重新生成</li>
<li><code v-pre>/etc/openldap/schema/*：</code> <strong>OpenLDAP</strong> 的 <strong>schema</strong> 存放的地方</li>
<li><code v-pre>/var/lib/ldap/*：</code> <strong>OpenLDAP</strong> 的数据文件</li>
<li><code v-pre>/usr/share/openldap-servers/DB_CONFIG.example：</code> 模板数据库配置文件</li>
</ul>
<p><strong>OpenLDAP</strong> 监听的端口</p>
<ul>
<li>默认监听端口：<strong>389</strong>（<em>明文数据传输</em>）</li>
<li>加密监听端口：<strong>636</strong>（<em>密文数据传输</em>）</li>
</ul>
<p>启动 <strong>slapd</strong> 服务</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>systemctl start slapd
systemctl <span class="token builtin class-name">enable</span> slapd
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></template>
</Tabs>
<h3 id="_3-1-配置-openldap" tabindex="-1"><a class="header-anchor" href="#_3-1-配置-openldap" aria-hidden="true">#</a> 3.1 配置 OpenLDAP</h3>
<h5 id="配置openldap数据库" tabindex="-1"><a class="header-anchor" href="#配置openldap数据库" aria-hidden="true">#</a> <strong>配置OpenLDAP数据库</strong></h5>
<p><strong>OpenLDAP</strong> 默认使用 <strong>BerkeleyDB</strong>，如下命令配置数据库</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">cp</span> /usr/share/openldap-servers/DB_CONFIG.example /var/lib/ldap/DB_CONFIG
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>生成 ldap 管理员密码</strong> （<em>初始化后默认空密码</em> ）</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>slappasswd <span class="token parameter variable">-s</span> user@dev
<span class="token punctuation">{</span>SSHA<span class="token punctuation">}</span>rEXQDROfAHRMoZS1TnFTZBsNL+387ogk
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>修改 olcDatabase={2}hdb.ldif 文件</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">vim</span> /etc/openldap/slapd.d/cn<span class="token punctuation">\</span><span class="token operator">=</span>config/olcDatabase<span class="token punctuation">\</span><span class="token operator">=</span><span class="token punctuation">\</span><span class="token punctuation">{</span><span class="token number">2</span><span class="token punctuation">\</span><span class="token punctuation">}</span>hdb.ldif

olcSuffix: <span class="token assign-left variable">dc</span><span class="token operator">=</span>uit,dc<span class="token operator">=</span>ldevops,dc<span class="token operator">=</span>local
olcRootDN: <span class="token assign-left variable">cn</span><span class="token operator">=</span>cloud,dc<span class="token operator">=</span>uit,dc<span class="token operator">=</span>ldevops,dc<span class="token operator">=</span>local
olcRootPW: <span class="token punctuation">{</span>SSHA<span class="token punctuation">}</span>rEXQDROfAHRMoZS1TnFTZBsNL+387ogk
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>修改olcDatabase={1}monitor.ldif文件</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">vim</span> /etc/openldap/slapd.d/cn<span class="token punctuation">\</span><span class="token operator">=</span>config/olcDatabase<span class="token punctuation">\</span><span class="token operator">=</span><span class="token punctuation">\</span><span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">\</span><span class="token punctuation">}</span>monitor.ldif

olcAccess: <span class="token punctuation">{</span><span class="token number">0</span><span class="token punctuation">}</span>to * by <span class="token assign-left variable">dn.base</span><span class="token operator">=</span><span class="token string">"gidNumber=0+uidNumber=0,cn=peercred,cn=extern
 al,cn=auth"</span> <span class="token builtin class-name">read</span> by <span class="token assign-left variable">dn.base</span><span class="token operator">=</span><span class="token string">"cn=cloud,dc=uit,dc=ldevops,dc=local"</span> <span class="token builtin class-name">read</span> by * none
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中 <code v-pre>dn.base</code> 是修改 <strong>OpenLDAP</strong> 的管理员信息的</p>
<p><strong>验证 OpenLDAP 的基本配置</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>slaptest <span class="token parameter variable">-u</span>
5d30769d ldif_read_file: checksum error on <span class="token string">"/etc/openldap/slapd.d/cn=config/olcDatabase={1}monitor.ldif"</span>
5d30769d ldif_read_file: checksum error on <span class="token string">"/etc/openldap/slapd.d/cn=config/olcDatabase={2}hdb.ldif"</span>
config <span class="token function">file</span> testing succeeded
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>校验error请忽略</p>
</blockquote>
<p><strong>修改ldap文件权限</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">chown</span> <span class="token parameter variable">-R</span> ldap:ldap /var/lib/ldap/
<span class="token function">chown</span> <span class="token parameter variable">-R</span> ldap:ldap /etc/openldap/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>启动并查看</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>systemctl start slapd
systemctl <span class="token builtin class-name">enable</span> <span class="token parameter variable">--now</span> slapd
systemctl status slapd.service

ss <span class="token parameter variable">-natup</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token number">389</span>
tcp    LISTEN     <span class="token number">0</span>      <span class="token number">128</span>       *:389                   *:*                   users:<span class="token variable"><span class="token punctuation">((</span>"slapd"<span class="token punctuation">,</span>pid<span class="token operator">=</span><span class="token number">1773</span><span class="token punctuation">,</span>fd<span class="token operator">=</span><span class="token number">8</span><span class="token punctuation">))</span></span>
tcp    LISTEN     <span class="token number">0</span>      <span class="token number">128</span>      :::389                  :::*                   users:<span class="token variable"><span class="token punctuation">((</span>"slapd"<span class="token punctuation">,</span>pid<span class="token operator">=</span><span class="token number">1773</span><span class="token punctuation">,</span>fd<span class="token operator">=</span><span class="token number">9</span><span class="token punctuation">))</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>导入基本 Schema</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>ldapadd <span class="token parameter variable">-Y</span> EXTERNAL <span class="token parameter variable">-H</span> ldapi:/// <span class="token parameter variable">-f</span> /etc/openldap/schema/cosine.ldif
ldapadd <span class="token parameter variable">-Y</span> EXTERNAL <span class="token parameter variable">-H</span> ldapi:/// <span class="token parameter variable">-f</span> /etc/openldap/schema/nis.ldif
ldapadd <span class="token parameter variable">-Y</span> EXTERNAL <span class="token parameter variable">-H</span> ldapi:/// <span class="token parameter variable">-f</span> /etc/openldap/schema/inetorgperson.ldif
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>修改 migrate_common.ph 文件</strong></p>
<p>改文件主要用于生成 <strong>ldif</strong> 文件使用，修改如下</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">vim</span> /usr/share/migrationtools/migrate_common.ph +71

<span class="token comment"># Default DNS domain</span>
<span class="token variable">$DEFAULT_MAIL_DOMAIN</span> <span class="token operator">=</span> <span class="token string">"uit.ldevops.local"</span><span class="token punctuation">;</span>

<span class="token comment"># Default base </span>
<span class="token variable">$DEFAULT_BASE</span> <span class="token operator">=</span> <span class="token string">"dc=uit,dc=ldevops,dc=local"</span><span class="token punctuation">;</span>

<span class="token variable">$EXTENDED_SCHEMA</span> <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>生成 base.ldif</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">mkdir</span> /root/openldap
/usr/share/migrationtools/migrate_base.pl <span class="token operator">></span>/root/openldap/base.ldif

ldapadd <span class="token parameter variable">-x</span> <span class="token parameter variable">-D</span> <span class="token string">"cn=cloud,dc=uit,dc=ldevops,dc=local"</span> <span class="token parameter variable">-w</span> <span class="token number">123456</span> <span class="token parameter variable">-f</span> /root/openldap/base.ldif
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>添加用户及用户组</strong></p>
<p>默认情况下 <strong>OpenLDAP</strong> 没有普通用户的，但有个管理员用户，即刚配置的 <strong>root</strong></p>
<p>现在我们把系统中的用户，添加到 <strong>OpenLDAP</strong> 中，为了进行区分，新加两个用户 <strong>ldapuser1</strong> 和 <strong>ldapuser2</strong>，和两个用户组 <strong>ldapgroup1</strong> 和 <strong>ldapgroup2</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">groupadd</span> ldapgroup1
<span class="token function">groupadd</span> ldapgroup2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>添加用户并设置密码</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">useradd</span> <span class="token parameter variable">-g</span> ldapgroup1 ldapuser1
<span class="token function">useradd</span> <span class="token parameter variable">-g</span> ldapgroup2 ldapuser2
<span class="token builtin class-name">echo</span> <span class="token string">'123456'</span> <span class="token operator">|</span> <span class="token function">passwd</span> <span class="token parameter variable">--stdin</span> ldapuser1
<span class="token builtin class-name">echo</span> <span class="token string">'123456'</span> <span class="token operator">|</span> <span class="token function">passwd</span> <span class="token parameter variable">--stdin</span> ldapuser2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>将 用户 和 用户组提取出来，包括该用户的密码和其他相关属性</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">grep</span> <span class="token string">":10[0-9][0-9]"</span> /etc/passwd <span class="token operator">></span> /root/openldap/users
<span class="token function">grep</span> <span class="token string">":10[0-9][0-9]"</span> /etc/group <span class="token operator">></span> /root/openldap/groups
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>根据上述生成的 用户 和 用户组 属性，使用 <strong>migrate_passwd.pl</strong> 文件生成对应的 <strong>ldif</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>/usr/share/migrationtools/migrate_group.pl /root/openldap/groups <span class="token operator">></span> /root/openldap/groups.ldif
/usr/share/migrationtools/migrate_passwd.pl /root/openldap/users <span class="token operator">></span> /root/openldap/users.ldif
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>导入用户及用户组到OpenLDAP数据库</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>ldapadd <span class="token parameter variable">-x</span> <span class="token parameter variable">-w</span> <span class="token string">"user@dev"</span> <span class="token parameter variable">-D</span> <span class="token string">"cn=cloud,dc=uit,dc=ldevops,dc=local"</span> <span class="token parameter variable">-f</span> /root/openldap/groups.ldif
ldapadd <span class="token parameter variable">-x</span> <span class="token parameter variable">-w</span> <span class="token string">"user@dev"</span> <span class="token parameter variable">-D</span> <span class="token string">"cn=cloud,dc=uit,dc=ldevops,dc=local"</span> <span class="token parameter variable">-f</span> /root/openldap/users.ldif
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>把OpenLDAP用户加入到用户组</strong></p>
<p>尽管已经把用户和用户组信息，导入到 <strong>OpenLDAP</strong> 数据库中了，但实际上 <strong>用户 和 用户组之间没有任何关联</strong> ，关联需另外单独配置</p>
<p>把 <strong>ldapuser1</strong> 用户加入到 <strong>ldapgroup1</strong> 用户组，需要新建添加用户到用户组的 <strong>ldif</strong> 文件，如下</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">></span> /root/openldap/add_user_to_groups.ldif <span class="token operator">&lt;&lt;</span> <span class="token string">"EOF"
dn: cn=ldapgroup1,ou=Group,dc=uit,dc=ldevops,dc=local
changetype: modify
add: memberuid
memberuid: ldapuser1

dn: cn=ldapgroup2,ou=Group,dc=uit,dc=ldevops,dc=local
changetype: modify
add: memberuid
memberuid: ldapuser2
EOF</span>

ldapadd <span class="token parameter variable">-x</span> <span class="token parameter variable">-w</span> <span class="token string">"user@dev"</span> <span class="token parameter variable">-D</span> <span class="token string">"cn=cloud,dc=uit,dc=ldevops,dc=local"</span> <span class="token parameter variable">-f</span> /root/openldap/add_user_to_groups.ldif
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>查询测试</strong> 刚才添加的 <strong>OpenLDAP</strong> 用户组信息，如下：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>ldapsearch <span class="token parameter variable">-LLL</span> <span class="token parameter variable">-x</span> <span class="token parameter variable">-D</span> <span class="token string">"cn=cloud,dc=uit,dc=ldevops,dc=local"</span> <span class="token parameter variable">-w</span> <span class="token string">"user@dev"</span> <span class="token parameter variable">-b</span> <span class="token string">"dc=uit,dc=ldevops,dc=local"</span> <span class="token string">"cn=ldapgroup1"</span>

dn: <span class="token assign-left variable">cn</span><span class="token operator">=</span>ldapgroup1,ou<span class="token operator">=</span>Group,dc<span class="token operator">=</span>uit,dc<span class="token operator">=</span>ldevops,dc<span class="token operator">=</span>local
objectClass: posixGroup
objectClass: <span class="token function">top</span>
cn: ldapgroup1
userPassword:: <span class="token assign-left variable">e2NyeXB0fXg</span><span class="token operator">=</span>
gidNumber: <span class="token number">1002</span>
memberUid: ldapuser1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-开启-openldap-日志访问" tabindex="-1"><a class="header-anchor" href="#_3-2-开启-openldap-日志访问" aria-hidden="true">#</a> 3.2 开启 OpenLDAP 日志访问</h3>
<p>默认情况下 <strong>OpenLDAP</strong> 未启用日志记录功能，但实际使用过程中，定位问题需要使用 <strong>OpenLDAP</strong> 日志</p>
<p>新建日志配置 <strong>ldif</strong> 文件，如下</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">></span> /root/openldap/loglevel.ldif <span class="token operator">&lt;&lt;</span> <span class="token string">EOF
dn: cn=config
changetype: modify
replace: olcLogLevel
olcLogLevel: stats
EOF</span>

ldapmodify <span class="token parameter variable">-Y</span> EXTERNAL <span class="token parameter variable">-H</span> ldapi:/// <span class="token parameter variable">-f</span> /root/openldap/loglevel.ldif
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>修改 <strong>rsyslog</strong> 配置文件，并重启服务，如下</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">>></span> /etc/rsyslog.conf <span class="token operator">&lt;&lt;</span> <span class="token string">EOF
local4.* /var/log/slapd.log
EOF</span>

systemctl restart rsyslog
systemctl restart slapd
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用 <strong>ldapuser1</strong> 认证</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>ldapwhoami <span class="token parameter variable">-x</span> <span class="token parameter variable">-D</span> <span class="token assign-left variable">uid</span><span class="token operator">=</span>ldapuser1,ou<span class="token operator">=</span>People,dc<span class="token operator">=</span>uit,dc<span class="token operator">=</span>ldevops,dc<span class="token operator">=</span>local <span class="token parameter variable">-w</span> <span class="token number">123456</span>

dn:uid<span class="token operator">=</span>ldapuser1,ou<span class="token operator">=</span>People,dc<span class="token operator">=</span>uit,dc<span class="token operator">=</span>ldevops,dc<span class="token operator">=</span>local
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>查看 <strong>OpenLDAP</strong> 日志</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ <span class="token function">tail</span> /var/log/slapd.log

Nov  <span class="token number">1</span> <span class="token number">10</span>:24:55 <span class="token punctuation">[</span>localhost<span class="token punctuation">]</span> slapd<span class="token punctuation">[</span><span class="token number">30924</span><span class="token punctuation">]</span>: <span class="token assign-left variable">conn</span><span class="token operator">=</span><span class="token number">1006</span> <span class="token assign-left variable">fd</span><span class="token operator">=</span><span class="token number">11</span> closed
Nov  <span class="token number">1</span> <span class="token number">10</span>:25:12 <span class="token punctuation">[</span>localhost<span class="token punctuation">]</span> slapd<span class="token punctuation">[</span><span class="token number">30924</span><span class="token punctuation">]</span>: <span class="token assign-left variable">conn</span><span class="token operator">=</span><span class="token number">1007</span> <span class="token assign-left variable">fd</span><span class="token operator">=</span><span class="token number">11</span> ACCEPT from <span class="token assign-left variable">IP</span><span class="token operator">=</span><span class="token punctuation">[</span>::1<span class="token punctuation">]</span>:56602 <span class="token punctuation">(</span>IP<span class="token operator">=</span><span class="token punctuation">[</span>::<span class="token punctuation">]</span>:389<span class="token punctuation">)</span>
Nov  <span class="token number">1</span> <span class="token number">10</span>:25:12 <span class="token punctuation">[</span>localhost<span class="token punctuation">]</span> slapd<span class="token punctuation">[</span><span class="token number">30924</span><span class="token punctuation">]</span>: <span class="token assign-left variable">conn</span><span class="token operator">=</span><span class="token number">1007</span> <span class="token assign-left variable">op</span><span class="token operator">=</span><span class="token number">0</span> BIND <span class="token assign-left variable">dn</span><span class="token operator">=</span><span class="token string">"uid=ldapuser1,ou=People,dc=uit,dc=ldevops,dc=local"</span> <span class="token assign-left variable">method</span><span class="token operator">=</span><span class="token number">128</span>
Nov  <span class="token number">1</span> <span class="token number">10</span>:25:12 <span class="token punctuation">[</span>localhost<span class="token punctuation">]</span> slapd<span class="token punctuation">[</span><span class="token number">30924</span><span class="token punctuation">]</span>: <span class="token assign-left variable">conn</span><span class="token operator">=</span><span class="token number">1007</span> <span class="token assign-left variable">op</span><span class="token operator">=</span><span class="token number">0</span> BIND <span class="token assign-left variable">dn</span><span class="token operator">=</span><span class="token string">"uid=ldapuser1,ou=People,dc=uit,dc=ldevops,dc=local"</span> <span class="token assign-left variable">mech</span><span class="token operator">=</span>SIMPLE <span class="token assign-left variable">ssf</span><span class="token operator">=</span><span class="token number">0</span>
Nov  <span class="token number">1</span> <span class="token number">10</span>:25:12 <span class="token punctuation">[</span>localhost<span class="token punctuation">]</span> slapd<span class="token punctuation">[</span><span class="token number">30924</span><span class="token punctuation">]</span>: <span class="token assign-left variable">conn</span><span class="token operator">=</span><span class="token number">1007</span> <span class="token assign-left variable">op</span><span class="token operator">=</span><span class="token number">0</span> RESULT <span class="token assign-left variable">tag</span><span class="token operator">=</span><span class="token number">97</span> <span class="token assign-left variable">err</span><span class="token operator">=</span><span class="token number">0</span> <span class="token assign-left variable">text</span><span class="token operator">=</span>
Nov  <span class="token number">1</span> <span class="token number">10</span>:25:12 <span class="token punctuation">[</span>localhost<span class="token punctuation">]</span> slapd<span class="token punctuation">[</span><span class="token number">30924</span><span class="token punctuation">]</span>: <span class="token assign-left variable">conn</span><span class="token operator">=</span><span class="token number">1007</span> <span class="token assign-left variable">op</span><span class="token operator">=</span><span class="token number">1</span> EXT <span class="token assign-left variable">oid</span><span class="token operator">=</span><span class="token number">1.3</span>.6.1.4.1.4203.1.11.3
Nov  <span class="token number">1</span> <span class="token number">10</span>:25:12 <span class="token punctuation">[</span>localhost<span class="token punctuation">]</span> slapd<span class="token punctuation">[</span><span class="token number">30924</span><span class="token punctuation">]</span>: <span class="token assign-left variable">conn</span><span class="token operator">=</span><span class="token number">1007</span> <span class="token assign-left variable">op</span><span class="token operator">=</span><span class="token number">1</span> WHOAMI
Nov  <span class="token number">1</span> <span class="token number">10</span>:25:12 <span class="token punctuation">[</span>localhost<span class="token punctuation">]</span> slapd<span class="token punctuation">[</span><span class="token number">30924</span><span class="token punctuation">]</span>: <span class="token assign-left variable">conn</span><span class="token operator">=</span><span class="token number">1007</span> <span class="token assign-left variable">op</span><span class="token operator">=</span><span class="token number">1</span> RESULT <span class="token assign-left variable">oid</span><span class="token operator">=</span> <span class="token assign-left variable">err</span><span class="token operator">=</span><span class="token number">0</span> <span class="token assign-left variable">text</span><span class="token operator">=</span>
Nov  <span class="token number">1</span> <span class="token number">10</span>:25:12 <span class="token punctuation">[</span>localhost<span class="token punctuation">]</span> slapd<span class="token punctuation">[</span><span class="token number">30924</span><span class="token punctuation">]</span>: <span class="token assign-left variable">conn</span><span class="token operator">=</span><span class="token number">1007</span> <span class="token assign-left variable">op</span><span class="token operator">=</span><span class="token number">2</span> UNBIND
Nov  <span class="token number">1</span> <span class="token number">10</span>:25:12 <span class="token punctuation">[</span>localhost<span class="token punctuation">]</span> slapd<span class="token punctuation">[</span><span class="token number">30924</span><span class="token punctuation">]</span>: <span class="token assign-left variable">conn</span><span class="token operator">=</span><span class="token number">1007</span> <span class="token assign-left variable">fd</span><span class="token operator">=</span><span class="token number">11</span> closed
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-3-说明" tabindex="-1"><a class="header-anchor" href="#_3-3-说明" aria-hidden="true">#</a> 3.3 说明</h3>
<h4 id="配置-ldif-文件" tabindex="-1"><a class="header-anchor" href="#配置-ldif-文件" aria-hidden="true">#</a> 配置 LDIF 文件</h4>
<p><strong>.ldif</strong> 配置文件，通常用来进行数据添加、初始化等（<em>手动编辑效率低因此通常用上文的工具</em>），文件内容类似如下</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 假设要创建一个名为 uit.ldevops.local.ldif 的ldif 文件，内容如下</span>
<span class="token function">vim</span> uit.ldevops.local.ldif

<span class="token comment"># 创建名为 uit.ldevops.local 的 top根域</span>
dn: <span class="token assign-left variable">dc</span><span class="token operator">=</span>uit,dc<span class="token operator">=</span>ldevops,dc<span class="token operator">=</span>local			<span class="token comment"># 条目标识</span>
objectclass: <span class="token function">top</span>						<span class="token comment"># 对象类型为 顶级 即根</span>
objectclass: domain						<span class="token comment"># 对象类型为 域</span>
objectclass: dcobject					
objectclass: organization				
dc: uit									<span class="token comment"># 必须定义属性dc</span>
o: uit									<span class="token comment"># 必须定义属性 o</span>

<span class="token comment"># 创建名为 cloud 的组织 ou</span>
dn: <span class="token assign-left variable">ou</span><span class="token operator">=</span>cloud,dc<span class="token operator">=</span>uit,dc<span class="token operator">=</span>ldevops,dc<span class="token operator">=</span>local
ou: cloud
objectclass: organizationalUnit			<span class="token comment"># ou 组织</span>

<span class="token comment"># 创建名为 admin 的 person 用户</span>
dn: <span class="token assign-left variable">cn</span><span class="token operator">=</span>admin,ou<span class="token operator">=</span>cloud,dc<span class="token operator">=</span>uit,dc<span class="token operator">=</span>ldevops,dc<span class="token operator">=</span>local
cn: admin
sn: admin
objectclass: person						<span class="token comment"># person 类型的用户</span>

<span class="token comment"># 创建名为 zz 的 person 用户</span>
dn: <span class="token assign-left variable">cn</span><span class="token operator">=</span>zz,ou<span class="token operator">=</span>cloud,dc<span class="token operator">=</span>uit,dc<span class="token operator">=</span>ldevops,dc<span class="token operator">=</span>local
cn: zz
sn: zz
objectclass: person
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><strong>dn</strong> 是主键，要唯一，要确保这些数据不能与已有数据相同，否则操作中断</li>
</ul>
<p>有了 <strong>.ldif</strong> 文件，就可以将其添加到 <strong>目录数据库</strong>，导入到 <strong>LDAP</strong>，其创建的层级结构，类似如下</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>                 +-------------------------------+
                 <span class="token operator">|</span>  <span class="token assign-left variable">dc</span><span class="token operator">=</span>uit,dc<span class="token operator">=</span>ldeveops,dc<span class="token operator">=</span>local  <span class="token operator">|</span>
                 +-------------------------------+
                 <span class="token operator">|</span>
                 <span class="token function">v</span>
        +--------+--+
        <span class="token operator">|</span><span class="token assign-left variable">ou</span><span class="token operator">=</span>cloud<span class="token operator">|</span>
        +-+------+--+
          <span class="token operator">|</span>      <span class="token operator">|</span>
          <span class="token function">v</span>      <span class="token function">v</span>
   +------+-+   ++----+
   <span class="token operator">|</span><span class="token assign-left variable">cn</span><span class="token operator">=</span>admin<span class="token operator">|</span>   <span class="token operator">|</span><span class="token assign-left variable">cn</span><span class="token operator">=</span>zz<span class="token operator">|</span>
   +--------+   +-----+
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>若要添加管理员密码的 <strong>.ldif</strong> 文件</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 创建 passwd.ldif 如下</span>
dn: <span class="token assign-left variable">olcDatabase</span><span class="token operator">=</span><span class="token punctuation">{</span><span class="token number">2</span><span class="token punctuation">}</span>hdb,cn<span class="token operator">=</span>config
changetype: modify
replace: olcSuffix
olcSuffix: <span class="token assign-left variable">dc</span><span class="token operator">=</span>test,dc<span class="token operator">=</span>com

dn: <span class="token assign-left variable">olcDatabase</span><span class="token operator">=</span><span class="token punctuation">{</span><span class="token number">2</span><span class="token punctuation">}</span>hdb,cn<span class="token operator">=</span>config
changetype: modify
replace: olcRootDN
olcRootDN: <span class="token assign-left variable">cn</span><span class="token operator">=</span>dev3,dc<span class="token operator">=</span>test,dc<span class="token operator">=</span>com

dn: <span class="token assign-left variable">olcDatabase</span><span class="token operator">=</span><span class="token punctuation">{</span><span class="token number">2</span><span class="token punctuation">}</span>hdb,cn<span class="token operator">=</span>config 
changetype: modify
add: olcRootPW
olcRootPW: <span class="token punctuation">{</span>SSHA<span class="token punctuation">}</span>xvQKJMVV5699d7cIeDYlNhOZKQHwbCyo

<span class="token comment"># 执行如下命令添加</span>
ldapmodify <span class="token parameter variable">-Y</span> EXTERNAL <span class="token parameter variable">-H</span> ldapi:/// <span class="token parameter variable">-f</span> passwd.ldif	`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-4-ldap-的-curd-操作" tabindex="-1"><a class="header-anchor" href="#_3-4-ldap-的-curd-操作" aria-hidden="true">#</a> 3.4 LDAP 的 CURD 操作</h3>
<Tabs :data='[{"title":"添加"},{"title":"删除"},{"title":"修改"},{"title":"查询"}]'>
<template #tab0="{ title, value, isActive }">
<h5 id="ldapadd-添加" tabindex="-1"><a class="header-anchor" href="#ldapadd-添加" aria-hidden="true">#</a> <strong>ldapadd 添加</strong></h5>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 导入 ldap 命令</span>
$ ldapadd <span class="token parameter variable">-x</span> <span class="token parameter variable">-D</span> <span class="token string">"DN"</span> <span class="token parameter variable">-w</span> password <span class="token parameter variable">-f</span> idif-file.ldif

<span class="token comment"># 选项</span>
    <span class="token parameter variable">-x</span>   进行简单认证
    <span class="token parameter variable">-D</span>   用来绑定服务器的 DN
    <span class="token parameter variable">-h</span>   目录服务的地址
    <span class="token parameter variable">-w</span>   绑定 DN 的密码
    <span class="token parameter variable">-f</span>   使用 ldif 文件 来添加条目
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
<template #tab1="{ title, value, isActive }">
<h5 id="ldapdelete-删除" tabindex="-1"><a class="header-anchor" href="#ldapdelete-删除" aria-hidden="true">#</a> <strong>ldapdelete 删除</strong></h5>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ ldapdelete <span class="token parameter variable">-x</span> <span class="token parameter variable">-D</span> <span class="token string">"DN"</span> <span class="token parameter variable">-w</span> password <span class="token parameter variable">-f</span> idif-file.ldif

<span class="token comment"># 选项</span>
    <span class="token parameter variable">-c</span>         连续运行模式 <span class="token punctuation">(</span>运行出错时跳过继续执行<span class="token punctuation">)</span>
    <span class="token parameter variable">-f</span> <span class="token function">file</span>    指定文件
    <span class="token parameter variable">-M</span>         启用管理DSA IT控制
    <span class="token parameter variable">-P</span> version 协议版本<span class="token punctuation">(</span>default: <span class="token number">3</span><span class="token punctuation">)</span>
    <span class="token parameter variable">-r</span>         递归删除
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>将 <code v-pre>uit.ldeveops.local.ldif</code> 编写的数据导入到 <strong>ldap</strong> 删除示例</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 删除整个配置文件</span>
$ ldapdelete <span class="token parameter variable">-x</span> <span class="token parameter variable">-D</span> <span class="token string">"cn=cloud,dc=uit,dc=ldevops,dc=local"</span> <span class="token parameter variable">-w</span> <span class="token punctuation">{</span>SSHA<span class="token punctuation">}</span>SsnKledkDHBy6V8vU9kffRvM8GzWZhSx <span class="token parameter variable">-f</span> /root/uit.ldeveops.local.ldif

<span class="token comment"># 删除root用户</span>
ldapdelete <span class="token parameter variable">-x</span> <span class="token parameter variable">-D</span> <span class="token string">"cn=cloud,dc=uit,dc=ldevops,dc=local"</span> <span class="token parameter variable">-w</span> <span class="token punctuation">{</span>SSHA<span class="token punctuation">}</span>SsnKledkDHBy6V8vU9kffRvM8GzWZhSx <span class="token string">"cn=admin,ou=cloud,dc=uit,dc=ldevops,dc=local"</span>
ldapdelete <span class="token parameter variable">-x</span> <span class="token parameter variable">-D</span> <span class="token string">'cn=cloud,dc=uit,dc=ldevops,dc=local'</span> <span class="token parameter variable">-w</span> password <span class="token string">'uid=ldapuser1,,ou=People,dc=uit,dc=ldevops,dc=local'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
<template #tab2="{ title, value, isActive }">
<h5 id="ldapmodify-修改" tabindex="-1"><a class="header-anchor" href="#ldapmodify-修改" aria-hidden="true">#</a> <strong>ldapmodify 修改</strong></h5>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ ldapmodify <span class="token parameter variable">-x</span> <span class="token parameter variable">-D</span> DN <span class="token parameter variable">-w</span> password <span class="token parameter variable">-f</span> modify.ldif

<span class="token comment"># 选项</span>
    <span class="token parameter variable">-a</span> 添加新的条目.缺省的是修改存在的条目.
    <span class="token parameter variable">-C</span> 自动追踪引用.
    <span class="token parameter variable">-c</span> 出错后继续执行程序并不中止.缺省情况下出错的立即停止.
    <span class="token parameter variable">-D</span> binddn 指定搜索的用户名<span class="token punctuation">(</span>一般为一dn 值<span class="token punctuation">)</span>.
    <span class="token parameter variable">-e</span> 设置客户端证书文件,例: <span class="token parameter variable">-e</span> cert/client.crt
    <span class="token parameter variable">-E</span> 设置客户端证书私钥文件,例: <span class="token parameter variable">-E</span> cert/client.key
    <span class="token parameter variable">-f</span> <span class="token function">file</span> 从文件内读取条目的修改信息而不是从标准输入读取.
    <span class="token parameter variable">-H</span> ldapuri 指定连接到服务器uri.常见格式为ldap://hostname:port
    <span class="token parameter variable">-h</span> ldaphost 指定要连接的主机的名称/ip 地址.它和-p 一起使用.
    <span class="token parameter variable">-p</span> ldapport 指定要连接目录服务器的端口号.它和-h 一起使用.
    <span class="token parameter variable">-M</span> <span class="token punctuation">[</span>M<span class="token punctuation">]</span> 打开manage DSA IT 控制. <span class="token parameter variable">-MM</span> 把该控制设置为重要的.
    <span class="token parameter variable">-n</span> 用于调试到服务器的通讯.但并不实际执行搜索.服务器关闭时,返回错误；服务器打开时,常和-v 参数一起测试到服务器是否是一条通路.
    <span class="token parameter variable">-v</span> 运行在详细模块.在标准输出中打出一些比较详细的信息.比如:连接到服务器的ip 地址和端口号等.
    <span class="token parameter variable">-V</span> 启用证书认证功能,目录服务器使用客户端证书进行身份验证,必须与-ZZ 强制启用TLS 方式配合使用,并且匿名绑定到目录服务器.
    <span class="token parameter variable">-W</span> 指定了该参数,系统将弹出一提示入用户的密码.它和-w 参数相对使用.
    <span class="token parameter variable">-w</span> bindpasswd 直接指定用户的密码. 它和-W 参数相对使用.
    <span class="token parameter variable">-x</span> 使用简单认证.
    -Z<span class="token punctuation">[</span>Z<span class="token punctuation">]</span> 使用StartTLS 扩展操作.如果使用-ZZ,命令强制使用StartTLS 握手成功.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编写文件如下</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>dn: <span class="token assign-left variable">olcDatabase</span><span class="token operator">=</span><span class="token punctuation">{</span><span class="token number">2</span><span class="token punctuation">}</span>hdb,cn<span class="token operator">=</span>config
changetype: modify
replace: olcSuffix
olcSuffix: <span class="token assign-left variable">dc</span><span class="token operator">=</span>uit,dc<span class="token operator">=</span>ldevops,dc<span class="token operator">=</span>local

dn: <span class="token assign-left variable">olcDatabase</span><span class="token operator">=</span><span class="token punctuation">{</span><span class="token number">2</span><span class="token punctuation">}</span>hdb,cn<span class="token operator">=</span>config
changetype: modify
replace: olcRootDN
olcRootDN: <span class="token assign-left variable">cn</span><span class="token operator">=</span>root,dc<span class="token operator">=</span>uit,dc<span class="token operator">=</span>ldevops,dc<span class="token operator">=</span>local

dn: <span class="token assign-left variable">olcDatabase</span><span class="token operator">=</span><span class="token punctuation">{</span><span class="token number">2</span><span class="token punctuation">}</span>hdb,cn<span class="token operator">=</span>config
changetype: modify
add: olcRootPW
olcRootPW: <span class="token punctuation">{</span>SSHA<span class="token punctuation">}</span>SsnKledkDHBy6V8vU9kffRvM8GzWZhSx

$ ldapmodify <span class="token parameter variable">-Y</span> EXTERNAL <span class="token parameter variable">-H</span> ldapi:/// <span class="token parameter variable">-f</span> passwd.ldif
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ ldapmodify <span class="token parameter variable">-x</span> <span class="token parameter variable">-D</span> <span class="token string">"cn=root,dc=it,dc=com"</span> <span class="token parameter variable">-W</span> secret
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></template>
<template #tab3="{ title, value, isActive }">
<h5 id="ldapsearch-查询" tabindex="-1"><a class="header-anchor" href="#ldapsearch-查询" aria-hidden="true">#</a> <strong>ldapsearch 查询</strong></h5>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ ldapsearch <span class="token parameter variable">-LLL</span> <span class="token parameter variable">-x</span> <span class="token parameter variable">-D</span> DN <span class="token parameter variable">-w</span> password <span class="token parameter variable">-b</span> 根域 query_param

<span class="token comment"># 选项</span>
    <span class="token parameter variable">-x</span>   进行简单认证
    <span class="token parameter variable">-D</span>   用来绑定服务器的DN
    <span class="token parameter variable">-w</span>   绑定DN的密码
    <span class="token parameter variable">-b</span>   指定要查询的根节点
    <span class="token parameter variable">-H</span>   制定要查询的服务器
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>示例如下</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ ldapsearch <span class="token parameter variable">-LLL</span> <span class="token parameter variable">-x</span> <span class="token parameter variable">-D</span> <span class="token string">"cn=cloud,dc=uit,dc=ldevops,dc=local"</span> <span class="token parameter variable">-w</span> <span class="token string">"user@dev"</span> <span class="token parameter variable">-b</span> <span class="token string">"dc=uit,dc=ldevops,dc=local"</span> <span class="token string">"cn=ldapgroup1"</span>

<span class="token comment"># 查询 uit.ldevops.local 域下 cloud 组织的 ldapgroup1 用户组</span>

<span class="token parameter variable">-H</span> ldaps://192.168.10.192:389
<span class="token comment"># 貌似可以远程查询</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
</Tabs>
<h2 id="_4-图形化应用" tabindex="-1"><a class="header-anchor" href="#_4-图形化应用" aria-hidden="true">#</a> 4. 图形化应用</h2>
<h3 id="_4-1-phpldapadmin" tabindex="-1"><a class="header-anchor" href="#_4-1-phpldapadmin" aria-hidden="true">#</a> 4.1 phpldapadmin</h3>
<p><a href="http://phpldapadmin.sourceforge.net/wiki/index.php/Main_Page" target="_blank" rel="noopener noreferrer">phpldapadmin<ExternalLinkIcon/></a> 是用 <strong>php</strong> 开发的 <strong>Web</strong> 应用</p>
<h4 id="安装-phpldapadmin" tabindex="-1"><a class="header-anchor" href="#安装-phpldapadmin" aria-hidden="true">#</a> 安装 phpldapadmin</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 安装红帽衍生库</span>
yum <span class="token parameter variable">-y</span> <span class="token function">install</span> epel-release

<span class="token comment"># 安装</span>
yum <span class="token function">install</span> <span class="token parameter variable">-y</span> phpldapadmin 

<span class="token comment"># 或是</span>
yum <span class="token parameter variable">--enablerepo</span><span class="token operator">=</span>epel <span class="token parameter variable">-y</span> <span class="token function">install</span> phpldapadmin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>修改 php 配置</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">vim</span> /etc/phpldapadmin/config.php +397

<span class="token comment"># 397行取消注释，398行添加注释</span>
<span class="token variable">$servers</span>-<span class="token operator">></span>setValue<span class="token punctuation">(</span><span class="token string">'login'</span>,<span class="token string">'attr'</span>,<span class="token string">'dn'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
//<span class="token variable">$servers</span>-<span class="token operator">></span>setValue<span class="token punctuation">(</span><span class="token string">'login'</span>,<span class="token string">'attr'</span>,<span class="token string">'uid'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment"># 配置域名</span>
<span class="token variable">$servers</span>-<span class="token operator">></span>setValue<span class="token punctuation">(</span><span class="token string">'server'</span>,<span class="token string">'base'</span>,array<span class="token punctuation">(</span><span class="token string">'dc=uit,dc=ldevops,dc=local'</span><span class="token punctuation">))</span><span class="token punctuation">;</span>

<span class="token comment"># 绑定登录账户，默认填写</span>
<span class="token variable">$servers</span>-<span class="token operator">></span>setValue<span class="token punctuation">(</span><span class="token string">'login'</span>,<span class="token string">'bind_id'</span>,<span class="token string">'uid=ldapuser1,ou=People,dc=uit,dc=ldevops,dc=local'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>修改 <strong>httpd</strong> 的 <strong>apache</strong> 配置</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">vim</span> /etc/httpd/conf.d/phpldapadmin.conf

<span class="token comment"># 改写如下配置</span>
<span class="token comment">#  Web-based tool for managing LDAP servers</span>
<span class="token comment">#</span>

Alias /phpldapadmin /usr/share/phpldapadmin/htdocs
Alias /ldapadmin /usr/share/phpldapadmin/htdocs

<span class="token operator">&lt;</span>Directory /usr/share/phpldapadmin/htdocs<span class="token operator">></span>
  <span class="token operator">&lt;</span>IfModule mod_authz_core.c<span class="token operator">></span>
    <span class="token comment"># Apache 2.4</span>
    <span class="token comment"># Require local</span>
    <span class="token comment"># 还可以添加一行内容，指定可访问的ip段，按需</span>
    <span class="token comment"># Require ip 192.168.77.0/24</span>
    <span class="token comment"># 也可以所有</span>
    Require all granted
  <span class="token operator">&lt;</span>/IfModule<span class="token operator">></span>
  <span class="token operator">&lt;</span>IfModule <span class="token operator">!</span>mod_authz_core.c<span class="token operator">></span>
    <span class="token comment"># Apache 2.2</span>
    Order Deny,Allow
    Deny from all
    Allow from <span class="token number">127.0</span>.0.1
    Allow from ::1
  <span class="token operator">&lt;</span>/IfModule<span class="token operator">></span>
<span class="token operator">&lt;</span>/Directory<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>重启 httpd 并配置防火墙</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>systemctl restart httpd.service
systemctl <span class="token builtin class-name">enable</span> <span class="token parameter variable">--now</span> httpd

firewall-cmd <span class="token parameter variable">--permanent</span> <span class="token parameter variable">--zone</span><span class="token operator">=</span>public --add-service<span class="token operator">=</span>http
firewall-cmd <span class="token parameter variable">--reload</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>浏览器访问 phpldapadmin</strong></p>
<ul>
<li><strong>url：</strong> <a href="http://172.16.120.145/phpldapadmin/" target="_blank" rel="noopener noreferrer">http://172.16.120.145/phpldapadmin/<ExternalLinkIcon/></a></li>
<li><strong>用户名：</strong> 默认上文已经配置，需全称</li>
<li><strong>密码：</strong> 设定的管理员密码</li>
</ul>
<h3 id="_4-2-self-service-password" tabindex="-1"><a class="header-anchor" href="#_4-2-self-service-password" aria-hidden="true">#</a> 4.2 Self Service Password</h3>
<p><a href="https://ltb-project.org/documentation/self-service-password" target="_blank" rel="noopener noreferrer">Self Service Password<ExternalLinkIcon/></a> 是基于 <strong>php</strong> 的 <strong>Web</strong> 应用，用来自助修改密码，解放管理员的工作，让 <strong>OpenLDAP</strong> 用户可自行进行密码的修改和重置，支持标准的 <strong>LDAPv3</strong> 目录服务，包括：<strong>OpenLDAP</strong>、<strong>Active Directory</strong>、<strong>OpenDS</strong>、<strong>ApacheDS</strong> 等</p>
<p><a href="https://github.com/ltb-project/self-service-password" target="_blank" rel="noopener noreferrer">GItHub<ExternalLinkIcon/></a></p>
<h4 id="安装-self-service-password" tabindex="-1"><a class="header-anchor" href="#安装-self-service-password" aria-hidden="true">#</a> 安装 Self Service Password</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">></span> /etc/yum.repos.d/ltb-project-noarch.repo <span class="token operator">&lt;&lt;</span> <span class="token string">EOF
[ltb-project-noarch]
name=LTB project packages
baseurl=https://ltb-project.org/rpm/\<span class="token variable">$releasever</span>/noarch
enabled=1
gpgcheck=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-LTB-project
EOF</span>

<span class="token function">rpm</span> <span class="token parameter variable">--import</span> https://ltb-project.org/lib/RPM-GPG-KEY-LTB-project

yum <span class="token parameter variable">-y</span> <span class="token function">install</span> self-service-password
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>查看 <strong>Self Service Password</strong> 安装的文件，如下</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">rpm</span> <span class="token parameter variable">-ql</span> self-service-password
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li><code v-pre>/etc/httpd/conf.d/self-service-password.conf： </code> <strong>apache</strong> 配置文件</li>
<li><code v-pre>/usr/share/self-service-password/conf/config.inc.php：</code> <strong>self-service-password</strong> 配置文件</li>
</ul>
<p><strong>修改配置文件</strong></p>
<p>若不用虚拟机，可修改 <strong>apache</strong> 配置文件</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">cp</span> /etc/httpd/conf.d/self-service-password.conf<span class="token punctuation">{</span>,.bak<span class="token punctuation">}</span>
<span class="token function">cat</span> <span class="token operator">></span> /etc/httpd/conf.d/self-service-password.conf <span class="token operator">&lt;&lt;</span> <span class="token string">EOF
Alias /ssp /usr/local/self-service-password
 
&lt;Directory /usr/local/self-service-password>
        AllowOverride None
        &lt;IfVersion >= 2.3>
            Require all granted
        &lt;/IfVersion>
        &lt;IfVersion &lt; 2.3>
            Order Deny,Allow
            Allow from all
        &lt;/IfVersion>
        DirectoryIndex index.php
        AddDefaultCharset UTF-8
&lt;/Directory>
EOF</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>修改 <strong>LDAP</strong> 连接和 <strong>email</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">vim</span>  /usr/share/self-service-password/conf/config.inc.php +37

<span class="token variable">$ldap_url</span> <span class="token operator">=</span> <span class="token string">"ldap://localhost"</span><span class="token punctuation">;</span>
<span class="token variable">$ldap_starttls</span> <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
<span class="token variable">$ldap_binddn</span> <span class="token operator">=</span> <span class="token string">"cn=Manager,dc=uit,dc=ldevops,dc=local"</span><span class="token punctuation">;</span>
<span class="token variable">$ldap_bindpw</span> <span class="token operator">=</span> <span class="token string">"user@dev"</span><span class="token punctuation">;</span>
<span class="token variable">$ldap_base</span> <span class="token operator">=</span> <span class="token string">"ou=People,dc=uit,dc=ldevops,dc=local"</span><span class="token punctuation">;</span>
<span class="token variable">$ldap_login_attribute</span> <span class="token operator">=</span> <span class="token string">"uid"</span><span class="token punctuation">;</span>
<span class="token variable">$ldap_fullname_attribute</span> <span class="token operator">=</span> <span class="token string">"cn"</span><span class="token punctuation">;</span>
<span class="token variable">$ldap_filter</span> <span class="token operator">=</span> <span class="token string">"(&amp;(objectClass=person)(<span class="token variable">$ldap_login_attribute</span>={login}))"</span><span class="token punctuation">;</span>


<span class="token variable">$keyphrase</span> <span class="token operator">=</span> <span class="token string">"uitRandmon"</span><span class="token punctuation">;</span>

<span class="token variable">$hash</span> <span class="token operator">=</span> <span class="token string">"SSHA"</span><span class="token punctuation">;</span>

<span class="token variable">$who_change_password</span> <span class="token operator">=</span> <span class="token string">"manager"</span><span class="token punctuation">;</span>


<span class="token variable">$mail_from</span> <span class="token operator">=</span> <span class="token string">"admin@example.com"</span><span class="token punctuation">;</span>
<span class="token variable">$mail_from_name</span> <span class="token operator">=</span> <span class="token string">"Self Service Password"</span><span class="token punctuation">;</span>
<span class="token variable">$mail_signature</span> <span class="token operator">=</span> <span class="token string">""</span><span class="token punctuation">;</span>
<span class="token comment"># Notify users anytime their password is changed</span>
<span class="token variable">$notify_on_change</span> <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
<span class="token comment"># PHPMailer configuration (see https://github.com/PHPMailer/PHPMailer)</span>
<span class="token variable">$mail_sendmailpath</span> <span class="token operator">=</span> <span class="token string">'/usr/sbin/sendmail'</span><span class="token punctuation">;</span>
<span class="token variable">$mail_protocol</span> <span class="token operator">=</span> <span class="token string">'smtp'</span><span class="token punctuation">;</span>
<span class="token variable">$mail_smtp_debug</span> <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token variable">$mail_debug_format</span> <span class="token operator">=</span> <span class="token string">'error_log'</span><span class="token punctuation">;</span>
<span class="token variable">$mail_smtp_host</span> <span class="token operator">=</span> <span class="token string">'localhost'</span><span class="token punctuation">;</span>
<span class="token variable">$mail_smtp_auth</span> <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
<span class="token variable">$mail_smtp_user</span> <span class="token operator">=</span> <span class="token string">''</span><span class="token punctuation">;</span>
<span class="token variable">$mail_smtp_pass</span> <span class="token operator">=</span> <span class="token string">''</span><span class="token punctuation">;</span>
<span class="token variable">$mail_smtp_port</span> <span class="token operator">=</span> <span class="token number">25</span><span class="token punctuation">;</span>
<span class="token variable">$mail_smtp_timeout</span> <span class="token operator">=</span> <span class="token number">30</span><span class="token punctuation">;</span>
<span class="token variable">$mail_smtp_keepalive</span> <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
<span class="token variable">$mail_smtp_secure</span> <span class="token operator">=</span> <span class="token string">'tls'</span><span class="token punctuation">;</span>
<span class="token variable">$mail_smtp_autotls</span> <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
<span class="token variable">$mail_contenttype</span> <span class="token operator">=</span> <span class="token string">'text/plain'</span><span class="token punctuation">;</span>
<span class="token variable">$mail_wordwrap</span> <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token variable">$mail_charset</span> <span class="token operator">=</span> <span class="token string">'utf-8'</span><span class="token punctuation">;</span>
<span class="token variable">$mail_priority</span> <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>
<span class="token variable">$mail_newline</span> <span class="token operator">=</span> PHP_EOL<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>修改ldap的连接信息，<code v-pre>$keyphrase</code> 设定一个随机字符串</p>
</blockquote>
<p>重启 <strong>apache</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>systemctl restart httpd
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>访问页面</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>http://172.16.120.145/index.php
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>修改密码</p>
<img src="@source/unix/CentOS/LDAP/img/ssp.png">
<p>在终端验证修改的密码</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>ldapwhoami <span class="token parameter variable">-x</span> <span class="token parameter variable">-D</span> <span class="token assign-left variable">uid</span><span class="token operator">=</span>ldapuser1,ou<span class="token operator">=</span>People,dc<span class="token operator">=</span>lework,dc<span class="token operator">=</span>com <span class="token parameter variable">-w</span> <span class="token number">123456</span>
ldap_bind: Invalid credentials <span class="token punctuation">(</span><span class="token number">49</span><span class="token punctuation">)</span>
ldapwhoami <span class="token parameter variable">-x</span> <span class="token parameter variable">-D</span> <span class="token assign-left variable">uid</span><span class="token operator">=</span>ldapuser1,ou<span class="token operator">=</span>People,dc<span class="token operator">=</span>lework,dc<span class="token operator">=</span>com <span class="token parameter variable">-w</span> <span class="token number">12345678</span>
dn:uid<span class="token operator">=</span>ldapuser1,ou<span class="token operator">=</span>People,dc<span class="token operator">=</span>lework,dc<span class="token operator">=</span>com
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>也可以使用邮件找回，或者短信找回</p>
<h2 id="_5-管理软件" tabindex="-1"><a class="header-anchor" href="#_5-管理软件" aria-hidden="true">#</a> 5. 管理软件</h2>
<h3 id="_5-1-smbldap-tools" tabindex="-1"><a class="header-anchor" href="#_5-1-smbldap-tools" aria-hidden="true">#</a> 5.1 smbldap-tools</h3>
<p>是数据库管理软件，方便进行用户端的管理，但 <strong>smbldap-tools</strong> 有个缺点，不管你本地用户是否有相同的 <strong>UID</strong> 或则 <strong>GID</strong> 都会直接添加用户，故可能会引起冲突</p>
<blockquote>
<p><strong>smbldap-tools</strong> 的软件包在 <strong>epel</strong> 库，可能需先安装 <strong>epel</strong> 源</p>
</blockquote>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ yum <span class="token function">install</span> <span class="token parameter variable">-y</span> smbldap-tools
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>smbldap</strong> 会从 <code v-pre>/etc/samba/smb.conf</code> 读取部分信息，使用如下命令配置</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ smbldap-config

<span class="token comment"># 初始化配置 OPENldap 数据库</span>
$ smbldap-populate    
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建用户如下</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 添加用户User2</span>
$ smbldap-useradd <span class="token parameter variable">-a</span> <span class="token parameter variable">-m</span> igarashi <span class="token parameter variable">-u</span> <span class="token number">100001</span>
    -a： 指定添加的用户类型为 Windows，这样 samba 才能识别到该用户
    -m： 指定创建该用户的家目录

<span class="token comment"># 修改该用户的密码</span>
$ smbldap-passwd igarashi 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p><strong>注意：</strong> 如上方式加入用户，会默认使用客户端的 <strong>SID</strong> ，认证时需确认加入的节点同属于一个 <strong>SID</strong> （<em>服务端修改</em> ）</p>
</blockquote>
<h3 id="_5-2-其他-windows-管理工具" tabindex="-1"><a class="header-anchor" href="#_5-2-其他-windows-管理工具" aria-hidden="true">#</a> 5.2 其他 Windows 管理工具</h3>
<ul>
<li><strong>ldapadmin</strong></li>
<li><strong>apache Directory Studio</strong></li>
</ul>
<h2 id="_6-加域配置" tabindex="-1"><a class="header-anchor" href="#_6-加域配置" aria-hidden="true">#</a> 6. 加域配置</h2>
<p>以上述搭建环境 <strong>uit.ldevops.local</strong> 为例 ，现有目标节点 <strong>172.16.120.141</strong> 待加入域</p>
<ul>
<li><strong>ip: 172.16.120.145</strong></li>
<li><strong>域管理员: cloud</strong></li>
<li><strong>绑定DN：cn=cloud,dc=uit,dc=ldevops,dc=local</strong></li>
</ul>
<p>修改 <strong>Samba</strong> 配置文件</p>
<div class="language-ini ext-ini line-numbers-mode"><pre v-pre class="language-ini"><code>$ vim /etc/samba/smb.conf

<span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">global</span><span class="token punctuation">]</span></span>
<span class="token key attr-name">workgroup</span> <span class="token punctuation">=</span> <span class="token value attr-value">UIT</span>
<span class="token key attr-name">netbios name</span> <span class="token punctuation">=</span> <span class="token value attr-value">node141</span>
<span class="token key attr-name">security</span> <span class="token punctuation">=</span> <span class="token value attr-value">user</span>
<span class="token key attr-name">passdb backend</span> <span class="token punctuation">=</span> <span class="token value attr-value">ldapsam:ldap://172.16.120.145</span>
<span class="token key attr-name">ldap suffix</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">dc=uit,dc=ldevops,dc=local</span>"</span>
<span class="token key attr-name">ldap group suffix</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">cn=group</span>"</span>
<span class="token key attr-name">ldap user suffix</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">ou=people</span>"</span>
<span class="token key attr-name">ldap admin dn</span> <span class="token punctuation">=</span> <span class="token value attr-value">"<span class="token inner-value">cn=cloud,dc=uit,dc=ldevops,dc=local</span>"</span>
<span class="token key attr-name">ldap delete dn</span> <span class="token punctuation">=</span> <span class="token value attr-value">no</span>
<span class="token key attr-name">pam password change</span> <span class="token punctuation">=</span> <span class="token value attr-value">yes</span>
<span class="token key attr-name">ldap passwd sync</span> <span class="token punctuation">=</span> <span class="token value attr-value">yes</span>
<span class="token key attr-name">ldap ssl</span> <span class="token punctuation">=</span> <span class="token value attr-value">no</span>

<span class="token comment"># optimization</span>
<span class="token key attr-name">sync always</span> <span class="token punctuation">=</span> <span class="token value attr-value">no</span>
<span class="token key attr-name">write cache size</span> <span class="token punctuation">=</span> <span class="token value attr-value">10485760</span>
<span class="token key attr-name">socket options</span> <span class="token punctuation">=</span> <span class="token value attr-value">TCP_NODELAY IPTOS_LOWDELAY SO_RCVBUF=131072 SO_SNDBUF=131072</span>
<span class="token key attr-name">use sendfile</span> <span class="token punctuation">=</span> <span class="token value attr-value">yes</span>
<span class="token key attr-name">min receivefile size</span> <span class="token punctuation">=</span> <span class="token value attr-value">131072</span>

<span class="token comment"># common params</span>
<span class="token key attr-name">log file</span> <span class="token punctuation">=</span> <span class="token value attr-value">/var/log/samba/%m.log</span>
<span class="token key attr-name">max log size</span> <span class="token punctuation">=</span> <span class="token value attr-value">50</span>
<span class="token key attr-name">printcap name</span> <span class="token punctuation">=</span> <span class="token value attr-value">/etc/printcap</span>
<span class="token key attr-name">load printers</span> <span class="token punctuation">=</span> <span class="token value attr-value">no</span>
<span class="token key attr-name">wins server</span> <span class="token punctuation">=</span>
<span class="token key attr-name">unix charset</span> <span class="token punctuation">=</span> <span class="token value attr-value">utf-8</span>
<span class="token key attr-name">dos charset</span> <span class="token punctuation">=</span> <span class="token value attr-value">cp936</span>
<span class="token key attr-name">dns proxy</span> <span class="token punctuation">=</span> <span class="token value attr-value">no</span>
<span class="token key attr-name">delete readonly</span> <span class="token punctuation">=</span> <span class="token value attr-value">yes</span>
<span class="token key attr-name">create mask</span> <span class="token punctuation">=</span> <span class="token value attr-value">0777</span>
<span class="token key attr-name">directory mask</span> <span class="token punctuation">=</span> <span class="token value attr-value">0777</span>
<span class="token key attr-name">force create mode</span> <span class="token punctuation">=</span> <span class="token value attr-value">0777</span>
<span class="token key attr-name">force directory mode</span> <span class="token punctuation">=</span> <span class="token value attr-value">0777</span>
<span class="token key attr-name">template shell</span> <span class="token punctuation">=</span> <span class="token value attr-value">/bin/false</span>
<span class="token key attr-name">map to guest</span> <span class="token punctuation">=</span> <span class="token value attr-value">bad user</span>
<span class="token key attr-name">null passwords</span> <span class="token punctuation">=</span> <span class="token value attr-value">yes</span>
<span class="token key attr-name">usershare allow guests</span> <span class="token punctuation">=</span> <span class="token value attr-value">yes</span>
<span class="token key attr-name">include</span> <span class="token punctuation">=</span> <span class="token value attr-value">/etc/samba/smb_shares.conf</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container danger">
<p class="custom-container-title">特别注意</p>
<p><strong>include</strong> 共享文件路径参数，必须放在最后</p>
</div>
<p>修改 <strong>nsswitch</strong></p>
<div class="language-ini ext-ini line-numbers-mode"><pre v-pre class="language-ini"><code>$ vim /etc/nsswitch

passwd:        files ldap
shadow:        files ldap
group:         files ldap
hosts:         files dns ldap
bootparams:    files
ethers:        files
networks:      files
protocols:     files
rpc:           files
services:      files
netgroup:      files
publickey:     files
automount:     files
aliases:       files
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>修改 <strong>nslcd</strong></p>
<div class="language-ini ext-ini line-numbers-mode"><pre v-pre class="language-ini"><code>$ vim /etc/nslcd.conf

uid nslcd
gid ldap
uri ldap://172.16.120.145/
<span class="token key attr-name">base dc</span><span class="token punctuation">=</span><span class="token value attr-value">uit,dc=ldevops,dc=local</span>
ssl no
<span class="token key attr-name">binddn cn</span><span class="token punctuation">=</span><span class="token value attr-value">cloud,dc=uit,dc=ldevops,dc=local</span>
bindpw user@dev
<span class="token key attr-name">filter passwd (objectclass</span><span class="token punctuation">=</span><span class="token value attr-value">*)</span>
<span class="token key attr-name">filter shadow (objectclass</span><span class="token punctuation">=</span><span class="token value attr-value">*)</span>
<span class="token key attr-name">filter group  (objectclass</span><span class="token punctuation">=</span><span class="token value attr-value">*)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>修改 <strong>hosts</strong></p>
<div class="language-ini ext-ini line-numbers-mode"><pre v-pre class="language-ini"><code>$ vim /etc/hosts

172.16.120.145 uit.ldevops.local
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>加域验证操作</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 重启一系列服务</span>
systemctl restart nmb
systemctl restart nslcd
systemctl restart smb

<span class="token comment"># 重启成功此时应该可以列出域用户</span>
$ getent <span class="token function">passwd</span>

<span class="token comment"># 若有问题，先查看 Samba 配置文件是否正确</span>
$ testparm 

<span class="token comment"># 验证 Samba DB 是否能显示域用户的 SID</span>
$ pdbedit <span class="token parameter variable">-L</span>
igarashi:1000001:igarashi
jackson:150001:jackson
sasaki:100002:sasaki
jack:200041:jack
sid S-1-5-21-336872314-1070286693-535668972-1001 does not belong to our domain

<span class="token variable"><span class="token variable">`</span>最后一个 sid 则表示非域内用户，若Samba访问会显示 安全ID 结构无效，解决方式参考如下<span class="token variable">`</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>成功加入域的检测方式：</strong> 上述步骤正确，服务正常，且在 <strong>ldap</strong> 服务端可以查看到加入节点的域名，则表示成功（<em>加入域后，服务端会自动注册节点的 <strong>hostname</strong> 信息</em> ）</p>
<img src="@source/unix/CentOS/LDAP/img/ldap加域节点信息.png">
<div class="custom-container info">
<p class="custom-container-title">注意</p>
<p>若连接多个域，可能需要在服务端将每个节点自动生成的 <strong>SID</strong> 都改为域用户一致的 <strong>SID</strong>（<em>可用上述工具  <strong>smbldap-tool</strong> 方便的生成域用户</em> ）</p>
<p>若用户有（<em>不在服务端改写数据</em>）的需求，获取考虑获取域用户的 <strong>SID</strong>，然后重新对加域节点的 <strong>SID</strong> 进行改写一致操作，这一开始也许是为了多个域的不同域用户而设计的，实际需根据客户现场环境考虑</p>
</div>
</div></template>


