<template><div><p>微软 <strong>LDAP</strong> 协议的一个实现，但又不仅仅实现了 <strong>LDAP</strong> 协议，它先实现了一个 <strong>LDAP</strong> 服务器，在此基础上又实现了具体的应用 <strong>（<em>Windows 域控</em>）</strong> ，常用于公司的用户、计算机资源统一管理</p>
<!-- more -->
<h2 id="_1-ad" tabindex="-1"><a class="header-anchor" href="#_1-ad" aria-hidden="true">#</a> 1. AD</h2>
<p><strong>AD（<em>Active Directory 活动目录</em>）：</strong> 可以作为数据源， <strong>和各种应用集成</strong>，比如公司内部的软件系统、<strong>Web</strong> 应用等，还可以设立群组、访问权限等</p>
<h3 id="_1-1-核心概念" tabindex="-1"><a class="header-anchor" href="#_1-1-核心概念" aria-hidden="true">#</a> 1.1 核心概念</h3>
<p><strong>DomainController</strong> （<strong>DC</strong>： <em>域控制器</em>），就是一台装了 <strong>AD</strong> 活动目录服务的 <strong>Windows</strong> 服务器，所有的域用户等的资源信息都会存在 <strong>DC</strong> 里</p>
<div class="custom-container tip">
<p class="custom-container-title">提示</p>
<p>一旦装上域控制器，就 <strong>没有本地用户</strong> 了，会自动的变为域用户，实际应用场景可能会有多个 <strong>DC</strong></p>
</div>
<p><strong>成员计算机：</strong> 公司有很多计算机，需要和域控制器通信、连接时，需要加入域，和一套 <strong>信任机制</strong> 的，加入到域时，会生成信任密钥（<em>类似 token</em>），每隔一段时间会刷新 <strong>key</strong>，不同成员间需要访问的话，也要通过 <strong>DC 的 token</strong></p>
<p><strong>sid：</strong> 用户和计算机都有（<em>security id</em>）作为唯一标识</p>
<p><strong>Directory：</strong> 用来存储用户帐户、计算机帐户、打印机与共享文件等对象，这些对象的存储位置都是目录数据库（<em>Directory Database</em>）</p>
<div class="custom-container note">
<p class="custom-container-title">注</p>
<p><strong>AD</strong> 活动目录都要配一个本地的 <strong>DNS</strong> 服务，因为活动目录一般都不会通过 <strong>ip</strong> ，而是通过域名来登录，这样用户可以通过域名来访问 <strong>DC</strong> 域控制器</p>
</div>
<h3 id="_1-2-关键字" tabindex="-1"><a class="header-anchor" href="#_1-2-关键字" aria-hidden="true">#</a> 1.2 关键字</h3>
<img src="@source/unix/CentOS/LDAP/img/核心概念.jpg">
<p><strong>DIT（<em>Driectory Information Tree</em>）：</strong> 目录信息树</p>
<p><strong>Root DSE（<em>Root DSA-specific entry</em>）：</strong> 根节点项</p>
<p><strong>ObjectClass：</strong> 对象类，指定规则，比如本项中必须有、可能有的属性，比如规定 <strong>User</strong> 必须有人名</p>
<p><strong>项：</strong> 如 <code v-pre>uid=einstein</code>、<code v-pre>CN=zhengze</code> ，每个项都会包含 <strong>对象类</strong> 和 <strong>属性</strong></p>
<p><strong>DN（<em>distinguishedName</em>）：</strong> 代表了该条目的 <strong>唯一标识</strong> ，类似数据库的主键，可以通过该名字找到唯一记录，实际是从左到右，记录了 <strong>当前节点到树根的路径</strong> ，也可以理解为 <strong>叶子节点</strong></p>
<div class="custom-container tip">
<p class="custom-container-title">不仅能直接用户登入，AD 也可以通过 DN 来登入的</p>
</div>
<p><strong>RDN：</strong> 是 <strong>DN</strong> 的组成部分，一个键值对就是一个 <strong>RDN</strong> ，如 <code v-pre>CN=zhengze</code> , <code v-pre>CN=Users</code> , <code v-pre>DC=uit</code> , <code v-pre>DC=devops</code> , <code v-pre>DC=local</code> 就是 <strong>5</strong> 个 <strong>RND</strong></p>
<p><strong>DC（<em>domain component</em>）：</strong> 这里不是上文的域控制器，而是 <strong>域名组成</strong> ，比如 <code v-pre>uit.deveops.local</code> 拆出来的域名组成</p>
<p><strong>C（<em>country</em>）：</strong> 指国家，国际化公司常用</p>
<p><strong>O（<em>organization</em>）：</strong> 指公司</p>
<p><strong>OU（<em>organization unit</em>）：</strong> 组织单元，指部门、分公司，可以理解为一个 <strong>树</strong></p>
<blockquote>
<p>下面可以包含：用户、计算机、工作组、打印机、安全策略、其他组织等</p>
</blockquote>
<p><strong>CN（<em>Common name</em>）：</strong> 通用记录名，也会用 <strong>uid</strong> ，也指记录名/用户唯一标识，又时会共存</p>
<h3 id="_1-3-ad-ds" tabindex="-1"><a class="header-anchor" href="#_1-3-ad-ds" aria-hidden="true">#</a> 1.3 AD DS</h3>
<p><strong>Active Directory</strong> 的 <strong>Directory</strong> 则是用来存储用户帐户、计算机帐户、打印机与共享文件等对象，这些对象的存储位置都是目录数据库（<em>Directory Database</em>），而 <strong>Active Directory</strong> 负责提供目录服务的组件就是 <strong>AD域服务</strong>（<em>AD DS</em>），负责操作（<em>增删改查</em>）目录数据库。</p>
<p><strong>AD DS</strong> 可以在一台计算机、一个小型 <strong>LAN</strong> 或是数个 <strong>WAN</strong> 的结合中，它包含此范围内所有的对象，如文件、打印机、应用程序、服务器、域控制器与用户帐号等</p>
<h3 id="_1-4-加域配置" tabindex="-1"><a class="header-anchor" href="#_1-4-加域配置" aria-hidden="true">#</a> 1.4 加域配置</h3>
<p>以内部自建环境 <strong>uit.devops.local</strong> 为例 ，现有目标节点 <strong>172.16.120.141</strong> 需要加入域</p>
<ul>
<li><strong>ip: 172.16.70.124</strong></li>
<li><strong>域管理员: administrator</strong></li>
</ul>
<p>修改 <strong>Samba</strong> 配置文件</p>
<div class="language-ini ext-ini line-numbers-mode"><pre v-pre class="language-ini"><code>$ vim /etc/samba/smb.conf

<span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">global</span><span class="token punctuation">]</span></span>
<span class="token key attr-name">workgroup</span> <span class="token punctuation">=</span> <span class="token value attr-value">UIT</span>
<span class="token key attr-name">netbios name</span> <span class="token punctuation">=</span> <span class="token value attr-value">172.16.70.124</span> 
<span class="token key attr-name">server string</span> <span class="token punctuation">=</span>
<span class="token key attr-name">security</span> <span class="token punctuation">=</span> <span class="token value attr-value">ads</span>
<span class="token key attr-name">realm</span> <span class="token punctuation">=</span> <span class="token value attr-value">UIT.DEVOPS.LOCAL</span>
<span class="token key attr-name">password server</span> <span class="token punctuation">=</span> <span class="token value attr-value">UIT.DEVOPS.LOCAL</span>
<span class="token key attr-name">encrypt passwords</span> <span class="token punctuation">=</span> <span class="token value attr-value">yes</span>
<span class="token key attr-name">local master</span> <span class="token punctuation">=</span> <span class="token value attr-value">no</span>
<span class="token key attr-name">domain master</span> <span class="token punctuation">=</span> <span class="token value attr-value">no</span>
<span class="token key attr-name">preferred master</span> <span class="token punctuation">=</span> <span class="token value attr-value">no</span>
<span class="token key attr-name">idmap config * : backend</span> <span class="token punctuation">=</span> <span class="token value attr-value">tdb</span>
<span class="token key attr-name">idmap config * : range</span> <span class="token punctuation">=</span> <span class="token value attr-value">100000-999999</span>
<span class="token key attr-name">idmap config UIT : backend</span> <span class="token punctuation">=</span> <span class="token value attr-value">rid</span>
<span class="token key attr-name">idmap config UIT : range</span> <span class="token punctuation">=</span> <span class="token value attr-value">1000000-2000000</span>
<span class="token key attr-name">winbind use default domain</span> <span class="token punctuation">=</span> <span class="token value attr-value">no</span>
<span class="token key attr-name">winbind enum users</span> <span class="token punctuation">=</span> <span class="token value attr-value">yes</span>
<span class="token key attr-name">winbind enum groups</span> <span class="token punctuation">=</span> <span class="token value attr-value">yes</span>
<span class="token key attr-name">winbind separator</span> <span class="token punctuation">=</span> <span class="token value attr-value">+</span>

<span class="token comment"># optimization</span>
<span class="token key attr-name">sync always</span> <span class="token punctuation">=</span> <span class="token value attr-value">no</span>
<span class="token key attr-name">write cache size</span> <span class="token punctuation">=</span> <span class="token value attr-value">10485760</span>
<span class="token key attr-name">socket options</span> <span class="token punctuation">=</span> <span class="token value attr-value">TCP_NODELAY IPTOS_LOWDELAY SO_RCVBUF=131072 SO_SNDBUF=131072</span>
<span class="token key attr-name">use sendfile</span> <span class="token punctuation">=</span> <span class="token value attr-value">yes</span>
<span class="token key attr-name">min receivefile size</span> <span class="token punctuation">=</span> <span class="token value attr-value">131072</span>

<span class="token comment"># ad common params</span>
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
<span class="token key attr-name">include</span> <span class="token punctuation">=</span> <span class="token value attr-value">smb_shares.conf</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>修改 <strong>nsswitch</strong></p>
<div class="language-ini ext-ini line-numbers-mode"><pre v-pre class="language-ini"><code>$ vim /etc/nsswitch

passwd:        files winbind
shadow:        files winbind
group:         files winbind
hosts:         files dns winbind
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>修改认证</p>
<div class="language-ini ext-ini line-numbers-mode"><pre v-pre class="language-ini"><code>vim /etc/krb5.conf

<span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">logging</span><span class="token punctuation">]</span></span>
<span class="token key attr-name">default</span> <span class="token punctuation">=</span> <span class="token value attr-value">FILE:/var/log/krb5libs.log</span>
<span class="token key attr-name">kdc</span> <span class="token punctuation">=</span> <span class="token value attr-value">FILE:/var/log/krb5kdc.log</span>
<span class="token key attr-name">admin_server</span> <span class="token punctuation">=</span> <span class="token value attr-value">FILE:/var/log/kadmind.log</span>

<span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">libdefaults</span><span class="token punctuation">]</span></span>
<span class="token key attr-name">default_realm</span> <span class="token punctuation">=</span> <span class="token value attr-value">UIT.DEVOPS.LOCAL</span>
<span class="token key attr-name">dns_lookup_realm</span> <span class="token punctuation">=</span> <span class="token value attr-value">false</span>
<span class="token key attr-name">dns_lookup_kdc</span> <span class="token punctuation">=</span> <span class="token value attr-value">false</span>

<span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">realms</span><span class="token punctuation">]</span></span>
<span class="token key attr-name">UIT.DEVOPS.LOCAL</span> <span class="token punctuation">=</span> <span class="token value attr-value">{</span>
    <span class="token key attr-name">kdc</span> <span class="token punctuation">=</span> <span class="token value attr-value">172.16.70.124</span>
    <span class="token key attr-name">default_ad</span> <span class="token punctuation">=</span> <span class="token value attr-value">UIT.DEVOPS.LOCAL</span>
}

<span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">ad_realm</span><span class="token punctuation">]</span></span>
<span class="token key attr-name">.UIT.DEVOPS.LOCAL</span> <span class="token punctuation">=</span> <span class="token value attr-value">UIT.DEVOPS.LOCAL</span>
<span class="token key attr-name">UIT.DEVOPS.LOCAL</span> <span class="token punctuation">=</span> <span class="token value attr-value">UIT.DEVOPS.LOCAL</span>

<span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">kdc</span><span class="token punctuation">]</span></span>
<span class="token key attr-name">profile</span> <span class="token punctuation">=</span> <span class="token value attr-value">/var/kerberos/krb5kdc/kdc.conf</span>

<span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">appdefaults</span><span class="token punctuation">]</span></span>
<span class="token key attr-name">pam</span> <span class="token punctuation">=</span> <span class="token value attr-value">{</span>
    <span class="token key attr-name">debug</span> <span class="token punctuation">=</span> <span class="token value attr-value">false</span>
    <span class="token key attr-name">ticket_lifetime</span> <span class="token punctuation">=</span> <span class="token value attr-value">36000</span>
    <span class="token key attr-name">renew_lifetime</span> <span class="token punctuation">=</span> <span class="token value attr-value">36000</span>
    <span class="token key attr-name">forwardable</span> <span class="token punctuation">=</span> <span class="token value attr-value">true</span>
    <span class="token key attr-name">krb4_convert</span> <span class="token punctuation">=</span> <span class="token value attr-value">false</span>
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>修改 <strong>hosts</strong></p>
<div class="language-ini ext-ini line-numbers-mode"><pre v-pre class="language-ini"><code>$ vim /etc/hosts

172.16.70.124 uit.devops.local
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>加域退域操作（<em>加域前记得配置 <strong>DNS 172.16.70.124</strong></em> ）</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 通过配置文件，访问域信息</span>
$ net ads info <span class="token parameter variable">-s</span> /etc/samba/smb.conf

<span class="token comment"># 加域命令</span>
$ net ads <span class="token function">join</span> <span class="token parameter variable">-U</span> administrator%user@dev

<span class="token comment"># 退域命令， -S 接完整 域主机+域名</span>
$ net ads leave <span class="token parameter variable">-U</span> administrator%user@dev <span class="token parameter variable">-S</span> server124.uit.devops.local

<span class="token comment"># 可以检测是否加域成功 </span>
$ net ads testjoin

<span class="token comment"># 重启一系列服务</span>
systemctl restart winbind
systemctl restart nmb
systemctl restart smb
getent <span class="token function">passwd</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container warning">
<p class="custom-container-title">登入</p>
<p>加入域后，客户端登入 <strong>Samba</strong> ，<strong>cmd</strong> 访问 <strong>\\172.16.120.141\Users</strong> 后，输入用户 需要使用 <strong>用户@域</strong> 形式，如： <strong>zhengze@UIT</strong></p>
</div>
</div></template>


