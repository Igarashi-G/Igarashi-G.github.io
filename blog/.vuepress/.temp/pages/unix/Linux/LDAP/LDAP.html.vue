<template><div><h1 id="ldap" tabindex="-1"><a class="header-anchor" href="#ldap" aria-hidden="true">#</a> LDAP</h1>
<p><strong>DAP（Directry Access Protocol）：</strong> 即目录访问协议，较老、复杂且重量级，后面又出轻量级、更好用的 <strong>LDAP</strong></p>
<!-- more -->
<h2 id="_1-x-500-协议" tabindex="-1"><a class="header-anchor" href="#_1-x-500-协议" aria-hidden="true">#</a> 1. X.500 协议</h2>
<h3 id="_1-1-概述" tabindex="-1"><a class="header-anchor" href="#_1-1-概述" aria-hidden="true">#</a> 1.1 概述</h3>
<p><strong>X.500</strong> 定义了目录系统，<strong>LDAP</strong> 只是它的轻量级实现</p>
<h5 id="目录系统" tabindex="-1"><a class="header-anchor" href="#目录系统" aria-hidden="true">#</a> <strong>目录系统</strong></h5>
<p><strong>Directory：</strong> 目录服务，旨在提供一个用户友好的 <code v-pre>name-address</code> 类的映射，其中 <code v-pre>name</code> 不可变，<code v-pre>address</code> 允许动态变化，即<code v-pre>key-value</code> 结构</p>
<p><strong>DIB：</strong> 目录信息库，由一批系统组成，每个系统持有对应现实世界的逻辑数据，这些存储的数据叫做 <strong>DIB</strong></p>
<img src="@source/unix/Linux/LDAP/img/X500.png">
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
<img src="@source/unix/Linux/LDAP/img/DIT.png">
<div class="custom-container tip">
<p class="custom-container-title">提示</p>
<p>故这种树形存储结构适用于，查询多、更新少</p>
</div>
<h3 id="_1-3-分布式-directory" tabindex="-1"><a class="header-anchor" href="#_1-3-分布式-directory" aria-hidden="true">#</a> 1.3 分布式 Directory</h3>
<p><strong>Directory</strong> 支持分布式操作，此时的服务端组成如下</p>
<img src="@source/unix/Linux/LDAP/img/分布式.png">
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
<img src="@source/unix/Linux/LDAP/img/LDAP.jpg">
<h3 id="_2-1-概念说明" tabindex="-1"><a class="header-anchor" href="#_2-1-概念说明" aria-hidden="true">#</a> 2.1 概念说明</h3>
<p><strong>Entry：</strong> 最小单元 (<em>对象</em>）</p>
<p><strong>LDIF：</strong> 上文 <strong>Entry</strong> 的纯文本表示文件</p>
<p><strong>Schema：</strong> 模式（<em>对象类的集合</em>）对属性做了限制</p>
<p><strong>attribute：</strong> 基本对象的属性</p>
<p><strong>ObjectClass：</strong> 属性集合（<em>基本对象的继承属性</em>）</p>
<p><strong>backend &amp; database</strong></p>
<p><a href="./AD">属性说明 - 参考 AD</a></p>
<p><a href="https://blog.csdn.net/zou8944/article/details/122287398" target="_blank" rel="noopener noreferrer">参考详解 LDAP<ExternalLinkIcon/></a></p>
<h2 id="_3-安装" tabindex="-1"><a class="header-anchor" href="#_3-安装" aria-hidden="true">#</a> 3. 安装</h2>
<Tabs :data='[{"title":"CentOS"}]'>
<template #tab0="{ title, value, isActive }">
<p>安装 <strong>LDAP</strong> 所需的软件包</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ yum <span class="token function">install</span> openldap openldap-devel openldap-servers openldap-clients <span class="token parameter variable">-y</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>启动 <strong>slapd</strong> 服务</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>systemctl start slapd
systemctl <span class="token builtin class-name">enable</span> slapd
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>创建 <strong>LDAP</strong> 根密码（<em>默认是空密码</em>）</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>slappasswd
<span class="token comment"># {SSHA}SsnKledkDHBy6V8vU9kffRvM8GzWZhSx</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>记住生成的 <strong>ssha</strong>，如：密码 <code v-pre>user@dev</code> 得到 <code v-pre>{SSHA}SsnKledkDHBy6V8vU9kffRvM8GzWZhSx</code></p>
</blockquote>
</template>
</Tabs>
<h2 id="_3-操作" tabindex="-1"><a class="header-anchor" href="#_3-操作" aria-hidden="true">#</a> 3. 操作</h2>
<h3 id="_3-1-配置-ldif-文件" tabindex="-1"><a class="header-anchor" href="#_3-1-配置-ldif-文件" aria-hidden="true">#</a> 3.1 配置 LDIF 文件</h3>
<p>安装后的初始化配置文件位置如下，需要先编辑并创建一个域，添加到 <strong>目录数据库</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">cat</span> /etc/openldap/slapd.d/cn<span class="token punctuation">\</span><span class="token operator">=</span>config/olcDatabase<span class="token punctuation">\</span><span class="token operator">=</span><span class="token punctuation">\</span><span class="token punctuation">{</span><span class="token number">2</span><span class="token punctuation">\</span><span class="token punctuation">}</span>hdb.ldif

<span class="token comment"># AUTO-GENERATED FILE - DO NOT EDIT!! Use ldapmodify.</span>
<span class="token comment"># CRC32 c0f701a0</span>
dn: <span class="token assign-left variable">olcDatabase</span><span class="token operator">=</span><span class="token punctuation">{</span><span class="token number">2</span><span class="token punctuation">}</span>hdb
objectClass: olcDatabaseConfig
objectClass: olcHdbConfig
olcDatabase: <span class="token punctuation">{</span><span class="token number">2</span><span class="token punctuation">}</span>hdb
olcDbDirectory: /var/lib/ldap
olcSuffix: <span class="token assign-left variable">dc</span><span class="token operator">=</span>my-domain,dc<span class="token operator">=</span>com
olcRootDN: <span class="token assign-left variable">cn</span><span class="token operator">=</span>Manager,dc<span class="token operator">=</span>my-domain,dc<span class="token operator">=</span>com
olcDbIndex: objectClass eq,pres
olcDbIndex: ou,cn,mail,surname,givenname eq,pres,sub
structuralObjectClass: olcHdbConfig
entryUUID: 509c001e-ce6c-103c-88d2-9b98d85c0d0d
creatorsName: <span class="token assign-left variable">cn</span><span class="token operator">=</span>config
createTimestamp: 20220922024508Z
entryCSN: <span class="token number">20220922024508</span>.183007Z<span class="token comment">#000000#000#000000</span>
modifiersName: <span class="token assign-left variable">cn</span><span class="token operator">=</span>config
modifyTimestamp: 20220922024508Z
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>层级结构可类似于如下</p>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因此创建一个 <strong>.ldif</strong> 后缀的文件</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">touch</span> uit.ldeveops.local.ldif
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>键入</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 创建了一个 uit.ldevops.local  top根域</span>
dn: <span class="token assign-left variable">dc</span><span class="token operator">=</span>uit,dc<span class="token operator">=</span>ldevops,dc<span class="token operator">=</span>local			<span class="token comment"># 条目标识</span>
dc: uit
objectclass: <span class="token function">top</span>						<span class="token comment"># 属性</span>
<span class="token comment">#objectclass: dcobject					# 必须定义属性dc</span>
<span class="token comment">#objectclass: organization				# 必须定义属性 o</span>
objectclass: domain				<span class="token comment"># 必须定义属性 o</span>
o: uit

<span class="token comment"># 创建了一个 名为cloud组织</span>
dn: <span class="token assign-left variable">ou</span><span class="token operator">=</span>cloud,dc<span class="token operator">=</span>uit,dc<span class="token operator">=</span>ldevops,dc<span class="token operator">=</span>local
ou: cloud
objectclass: organizationalUnit

<span class="token comment"># 创建了一个 admin person用户</span>
dn: <span class="token assign-left variable">cn</span><span class="token operator">=</span>admin,ou<span class="token operator">=</span>cloud,dc<span class="token operator">=</span>uit,dc<span class="token operator">=</span>ldevops,dc<span class="token operator">=</span>local
cn: admin
sn: admin
objectclass: person

<span class="token comment"># 创建了一个 zz person用户</span>
dn: <span class="token assign-left variable">cn</span><span class="token operator">=</span>zz,ou<span class="token operator">=</span>cloud,dc<span class="token operator">=</span>uit,dc<span class="token operator">=</span>ldevops,dc<span class="token operator">=</span>local
cn: zz
sn: zz
objectclass: person
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><strong>dn</strong> 主键唯一，要确保这些数据不能与已有数据相同，否则操作中断</li>
</ul>
<h3 id="_3-2-ldap-的-curd-操作" tabindex="-1"><a class="header-anchor" href="#_3-2-ldap-的-curd-操作" aria-hidden="true">#</a> 3.2 LDAP 的 CURD 操作</h3>
<Tabs :data='[{"title":"添加"},{"title":"删除"},{"title":"修改"},{"title":"查询"}]'>
<template #tab0="{ title, value, isActive }">
<h5 id="ldapadd-添加" tabindex="-1"><a class="header-anchor" href="#ldapadd-添加" aria-hidden="true">#</a> <strong>ldapadd 添加</strong></h5>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>选项:
<span class="token parameter variable">-x</span>   进行简单认证
<span class="token parameter variable">-D</span>   用来绑定服务器的DN
<span class="token parameter variable">-h</span>   目录服务的地址
<span class="token parameter variable">-w</span>   绑定DN的密码
<span class="token parameter variable">-f</span>   使用ldif文件进行条目添加的文件
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>将 <code v-pre>uit.ldeveops.local.ldif</code> 编写的数据导入到 <strong>ldap</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>ldapadd <span class="token parameter variable">-x</span> <span class="token parameter variable">-D</span> <span class="token string">"cn=root,dc=uit,dc=ldevops,dc=local"</span> <span class="token parameter variable">-w</span> <span class="token punctuation">{</span>SSHA<span class="token punctuation">}</span>SsnKledkDHBy6V8vU9kffRvM8GzWZhSx <span class="token parameter variable">-f</span> /root/uit.ldeveops.local.ldif
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></template>
<template #tab1="{ title, value, isActive }">
<h5 id="ldapdelete-删除" tabindex="-1"><a class="header-anchor" href="#ldapdelete-删除" aria-hidden="true">#</a> <strong>ldapdelete 删除</strong></h5>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>选项:
<span class="token parameter variable">-c</span>         连续运行模式 <span class="token punctuation">(</span>运行出错时跳过继续执行<span class="token punctuation">)</span>
<span class="token parameter variable">-f</span> <span class="token function">file</span>    指定文件
<span class="token parameter variable">-M</span>         启用管理DSA IT控制
<span class="token parameter variable">-P</span> version 协议版本<span class="token punctuation">(</span>default: <span class="token number">3</span><span class="token punctuation">)</span>
<span class="token parameter variable">-r</span>         递归删除
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>将 <code v-pre>uit.ldeveops.local.ldif</code> 编写的数据导入到 <strong>ldap</strong> 删除</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 删除root用户</span>
ldapdelete <span class="token parameter variable">-x</span> <span class="token parameter variable">-D</span> <span class="token string">"cn=cloud,dc=uit,dc=ldevops,dc=local"</span> <span class="token parameter variable">-w</span> <span class="token punctuation">{</span>SSHA<span class="token punctuation">}</span>SsnKledkDHBy6V8vU9kffRvM8GzWZhSx <span class="token string">"cn=admin,ou=cloud,dc=uit,dc=ldevops,dc=local"</span>
ldapdelete <span class="token parameter variable">-x</span> <span class="token parameter variable">-D</span> <span class="token string">'cn=root,dc=it,dc=com'</span> <span class="token parameter variable">-w</span> password <span class="token string">'uid=zyx,dc=it,dc=com'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
<template #tab2="{ title, value, isActive }">
<h5 id="ldapmodify-修改" tabindex="-1"><a class="header-anchor" href="#ldapmodify-修改" aria-hidden="true">#</a> <strong>ldapmodify 修改</strong></h5>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>选项
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>dn: <span class="token assign-left variable">olcDatabase</span><span class="token operator">=</span><span class="token punctuation">{</span><span class="token number">2</span><span class="token punctuation">}</span>hdb,cn<span class="token operator">=</span>config
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>ldapmodify -Y EXTERNAL -H ldapi:/// -f passwd.ldif


# ldapmodify -x -D "cn=root,dc=it,dc=com" -W -f modify.ldif
# 交互式修改
# ldapmodify -x -D "cn=root,dc=it,dc=com" -W secret
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
<template #tab3="{ title, value, isActive }">
<h5 id="ldapsearch-查询" tabindex="-1"><a class="header-anchor" href="#ldapsearch-查询" aria-hidden="true">#</a> <strong>ldapsearch 查询</strong></h5>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>选项
<span class="token parameter variable">-x</span>   进行简单认证
<span class="token parameter variable">-D</span>   用来绑定服务器的DN
<span class="token parameter variable">-w</span>   绑定DN的密码
<span class="token parameter variable">-b</span>   指定要查询的根节点
<span class="token parameter variable">-H</span>   制定要查询的服务器
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>ldapsearch <span class="token parameter variable">-x</span> <span class="token parameter variable">-D</span> <span class="token string">"cn=dev3,dc=uit,dc=ldevops,dc=local"</span> <span class="token parameter variable">-w</span> <span class="token punctuation">{</span>SSHA<span class="token punctuation">}</span>SsnKledkDHBy6V8vU9kffRvM8GzWZhSx <span class="token parameter variable">-b</span> <span class="token string">"dc=ldevops,dc=local"</span>
<span class="token string">"cn=root,dc=uit,dc=ldevops,dc=local"</span>
<span class="token comment"># 使用简单认证,用 "cn=root,dc=kevin,dc=com" 进行绑定,要查询的根是 "dc=kevin,dc=com".这样会把绑定的用户能访问"dc=kevin,dc=com"下的所有数据显示出来.</span>

<span class="token comment"># ldapsearch -x -W -D "cn=administrator,cn=users,dc=osdn,dc=cn" -b "cn=administrator,cn=users,dc=osdn,dc=cn" -h troy.osdn.zzti.edu.cn</span>
<span class="token comment"># ldapsearch -b "dc=canon-is,dc=jp" -H ldaps://192.168.10.192:389</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
</Tabs>
<h3 id="_3-3-图形化应用" tabindex="-1"><a class="header-anchor" href="#_3-3-图形化应用" aria-hidden="true">#</a> 3.3 图形化应用</h3>
<h5 id="安装-phpldapadmin" tabindex="-1"><a class="header-anchor" href="#安装-phpldapadmin" aria-hidden="true">#</a> <strong>安装 phpldapadmin</strong></h5>
<ol>
<li>
<p>安装软件</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 安装红帽衍生库</span>
yum <span class="token parameter variable">-y</span> <span class="token function">install</span> epel-release

<span class="token comment"># 安装</span>
yum <span class="token function">install</span> <span class="token parameter variable">-y</span> phpldapadmin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>修改配置</p>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>重启并配置防火墙</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>systemctl restart httpd.service

firewall-cmd <span class="token parameter variable">--permanent</span> <span class="token parameter variable">--zone</span><span class="token operator">=</span>public --add-service<span class="token operator">=</span>http
firewall-cmd <span class="token parameter variable">--reload</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>php</strong> 的配置文件中配置</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">vim</span> /etc/phpldapadmin/config.php

<span class="token comment"># 配置域名</span>
<span class="token variable">$servers</span>-<span class="token operator">></span>setValue<span class="token punctuation">(</span><span class="token string">'server'</span>,<span class="token string">'base'</span>,array<span class="token punctuation">(</span><span class="token string">'dc=uit,dc=ldevops,dc=local'</span><span class="token punctuation">))</span><span class="token punctuation">;</span>

<span class="token comment"># 绑定登录账户，默认填写</span>
<span class="token variable">$servers</span>-<span class="token operator">></span>setValue<span class="token punctuation">(</span><span class="token string">'login'</span>,<span class="token string">'bind_id'</span>,<span class="token string">'cn=ldapadm,dc=uit,dc=ldevops,dc=local'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment"># 取消注释并注释下行</span>
<span class="token variable">$servers</span>-<span class="token operator">></span>setValue<span class="token punctuation">(</span><span class="token string">'login'</span>,<span class="token string">'attr'</span>,<span class="token string">'dn'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
// <span class="token variable">$servers</span>-<span class="token operator">></span>setValue<span class="token punctuation">(</span><span class="token string">'login'</span>,<span class="token string">'attr'</span>,<span class="token string">'uid'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
</div></template>


