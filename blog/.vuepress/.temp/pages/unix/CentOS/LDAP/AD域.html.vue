<template><div><p>微软 <strong>LDAP</strong> 协议的一个实现，但又不仅仅实现了 <strong>LDAP</strong> 协议，它先实现了一个 <strong>LDAP</strong> 服务器，在此基础上又实现了具体的应用 <strong>（<em>Windows 域控</em>）</strong> ，常用于公司的用户、计算机资源统一管理</p>
<!-- more -->
<h2 id="_1-ad" tabindex="-1"><a class="header-anchor" href="#_1-ad"><span>1. AD</span></a></h2>
<p><strong>AD（<em>Active Directory 活动目录</em>）：</strong> 可以作为数据源， <strong>和各种应用集成</strong>，比如公司内部的软件系统、<strong>Web</strong> 应用等，还可以设立群组、访问权限等</p>
<h3 id="_1-1-核心概念" tabindex="-1"><a class="header-anchor" href="#_1-1-核心概念"><span>1.1 核心概念</span></a></h3>
<p><strong>DomainController</strong> （<strong>DC</strong>： <em>域控制器</em>），就是一台装了 <strong>AD</strong> 活动目录服务的 <strong>Windows</strong> 服务器，所有的域用户等的资源信息都会存在 <strong>DC</strong> 里</p>
<div class="hint-container tip">
<p class="hint-container-title">提示</p>
<p>一旦装上域控制器，就 <strong>没有本地用户</strong> 了，会自动的变为域用户，实际应用场景可能会有多个 <strong>DC</strong></p>
</div>
<p><strong>成员计算机：</strong> 公司有很多计算机，需要和域控制器通信、连接时，需要加入域，和一套 <strong>信任机制</strong> 的，加入到域时，会生成信任密钥（<em>类似 token</em>），每隔一段时间会刷新 <strong>key</strong>，不同成员间需要访问的话，也要通过 <strong>DC 的 token</strong></p>
<p><strong>sid：</strong> 用户和计算机都有（<em>security id</em>）作为唯一标识</p>
<p><strong>Directory：</strong> 用来存储用户帐户、计算机帐户、打印机与共享文件等对象，这些对象的存储位置都是目录数据库（<em>Directory Database</em>）</p>
<div class="hint-container note">
<p class="hint-container-title">注</p>
<p><strong>AD</strong> 活动目录都要配一个本地的 <strong>DNS</strong> 服务，因为活动目录一般都不会通过 <strong>ip</strong> ，而是通过域名来登录，这样用户可以通过域名来访问 <strong>DC</strong> 域控制器</p>
</div>
<h3 id="_1-2-关键字" tabindex="-1"><a class="header-anchor" href="#_1-2-关键字"><span>1.2 关键字</span></a></h3>
<img src="@source/unix/CentOS/LDAP/img/核心概念.jpg">
<p><strong>DIT（<em>Driectory Information Tree</em>）：</strong> 目录信息树</p>
<p><strong>Root DSE（<em>Root DSA-specific entry</em>）：</strong> 根节点项</p>
<p><strong>ObjectClass：</strong> 对象类，指定规则，比如本项中必须有、可能有的属性，比如规定 <strong>User</strong> 必须有人名</p>
<p><strong>项：</strong> 如 <code v-pre>uid=einstein</code>、<code v-pre>CN=zhengze</code> ，每个项都会包含 <strong>对象类</strong> 和 <strong>属性</strong></p>
<p><strong>DN（<em>distinguishedName</em>）：</strong> 代表了该条目的 <strong>唯一标识</strong> ，类似数据库的主键，可以通过该名字找到唯一记录，实际是从左到右，记录了 <strong>当前节点到树根的路径</strong> ，也可以理解为 <strong>叶子节点</strong></p>
<div class="hint-container tip">
<p class="hint-container-title">不仅能直接用户登入，AD 也可以通过 DN 来登入的</p>
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
<h3 id="_1-3-ad-ds" tabindex="-1"><a class="header-anchor" href="#_1-3-ad-ds"><span>1.3 AD DS</span></a></h3>
<p><strong>Active Directory</strong> 的 <strong>Directory</strong> 则是用来存储用户帐户、计算机帐户、打印机与共享文件等对象，这些对象的存储位置都是目录数据库（<em>Directory Database</em>），而 <strong>Active Directory</strong> 负责提供目录服务的组件就是 <strong>AD域服务</strong>（<em>AD DS</em>），负责操作（<em>增删改查</em>）目录数据库。</p>
<p><strong>AD DS</strong> 可以在一台计算机、一个小型 <strong>LAN</strong> 或是数个 <strong>WAN</strong> 的结合中，它包含此范围内所有的对象，如文件、打印机、应用程序、服务器、域控制器与用户帐号等</p>
<h2 id="_2-加域配置" tabindex="-1"><a class="header-anchor" href="#_2-加域配置"><span>2. 加域配置</span></a></h2>
<p>以内部自建环境 <strong>uit.devops.local</strong> 为例 ，现有目标节点 <strong>172.16.120.141</strong> 需要加入域</p>
<ul>
<li><strong>ip: 172.16.70.124</strong></li>
<li><strong>域管理员: administrator</strong></li>
</ul>
<p>修改 <strong>Samba</strong> 配置文件</p>
<div class="language-ini line-numbers-mode" data-highlighter="shiki" data-ext="ini" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">$ vim /etc/samba/smb.conf</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">[global]</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#C678DD">workgroup</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#98C379"> UIT</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">netbios </span><span style="--shiki-light:#E45649;--shiki-dark:#C678DD">name</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#98C379"> 172.16.70.124 </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">server </span><span style="--shiki-light:#E45649;--shiki-dark:#C678DD">string</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> =</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#C678DD">security</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#98C379"> ads</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#C678DD">realm</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#98C379"> UIT.DEVOPS.LOCAL</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">password </span><span style="--shiki-light:#E45649;--shiki-dark:#C678DD">server</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#98C379"> UIT.DEVOPS.LOCAL</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">encrypt </span><span style="--shiki-light:#E45649;--shiki-dark:#C678DD">passwords</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#98C379"> yes</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">local </span><span style="--shiki-light:#E45649;--shiki-dark:#C678DD">master</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#98C379"> no</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">domain </span><span style="--shiki-light:#E45649;--shiki-dark:#C678DD">master</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#98C379"> no</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">preferred </span><span style="--shiki-light:#E45649;--shiki-dark:#C678DD">master</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#98C379"> no</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">idmap config * : </span><span style="--shiki-light:#E45649;--shiki-dark:#C678DD">backend</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#98C379"> tdb</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">idmap config * : </span><span style="--shiki-light:#E45649;--shiki-dark:#C678DD">range</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#98C379"> 100000-999999</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">idmap config UIT : </span><span style="--shiki-light:#E45649;--shiki-dark:#C678DD">backend</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#98C379"> rid</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">idmap config UIT : </span><span style="--shiki-light:#E45649;--shiki-dark:#C678DD">range</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#98C379"> 1000000-2000000</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">winbind use default </span><span style="--shiki-light:#E45649;--shiki-dark:#C678DD">domain</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#98C379"> no</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">winbind enum </span><span style="--shiki-light:#E45649;--shiki-dark:#C678DD">users</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#98C379"> yes</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">winbind enum </span><span style="--shiki-light:#E45649;--shiki-dark:#C678DD">groups</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#98C379"> yes</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">winbind </span><span style="--shiki-light:#E45649;--shiki-dark:#C678DD">separator</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#98C379"> +</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># optimization</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">sync </span><span style="--shiki-light:#E45649;--shiki-dark:#C678DD">always</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#98C379"> no</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">write cache </span><span style="--shiki-light:#E45649;--shiki-dark:#C678DD">size</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#98C379"> 10485760</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">socket </span><span style="--shiki-light:#E45649;--shiki-dark:#C678DD">options</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#98C379"> TCP_NODELAY IPTOS_LOWDELAY </span><span style="--shiki-light:#E45649;--shiki-dark:#C678DD">SO_RCVBUF</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">=</span><span style="--shiki-light:#383A42;--shiki-dark:#98C379">131072 </span><span style="--shiki-light:#E45649;--shiki-dark:#C678DD">SO_SNDBUF</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">=</span><span style="--shiki-light:#383A42;--shiki-dark:#98C379">131072</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">use </span><span style="--shiki-light:#E45649;--shiki-dark:#C678DD">sendfile</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#98C379"> yes</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">min receivefile </span><span style="--shiki-light:#E45649;--shiki-dark:#C678DD">size</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#98C379"> 131072</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># ad common params</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">log </span><span style="--shiki-light:#E45649;--shiki-dark:#C678DD">file</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#98C379"> /var/log/samba/%m.log</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">max log </span><span style="--shiki-light:#E45649;--shiki-dark:#C678DD">size</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#98C379"> 50</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">printcap </span><span style="--shiki-light:#E45649;--shiki-dark:#C678DD">name</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#98C379"> /etc/printcap</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">load </span><span style="--shiki-light:#E45649;--shiki-dark:#C678DD">printers</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#98C379"> no</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">wins </span><span style="--shiki-light:#E45649;--shiki-dark:#C678DD">server</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> =</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">unix </span><span style="--shiki-light:#E45649;--shiki-dark:#C678DD">charset</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#98C379"> utf-8</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">dos </span><span style="--shiki-light:#E45649;--shiki-dark:#C678DD">charset</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#98C379"> cp936</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">dns </span><span style="--shiki-light:#E45649;--shiki-dark:#C678DD">proxy</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#98C379"> no</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">delete </span><span style="--shiki-light:#E45649;--shiki-dark:#C678DD">readonly</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#98C379"> yes</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">create </span><span style="--shiki-light:#E45649;--shiki-dark:#C678DD">mask</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#98C379"> 0777</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">directory </span><span style="--shiki-light:#E45649;--shiki-dark:#C678DD">mask</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#98C379"> 0777</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">force create </span><span style="--shiki-light:#E45649;--shiki-dark:#C678DD">mode</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#98C379"> 0777</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">force directory </span><span style="--shiki-light:#E45649;--shiki-dark:#C678DD">mode</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#98C379"> 0777</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">template </span><span style="--shiki-light:#E45649;--shiki-dark:#C678DD">shell</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#98C379"> /bin/false</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">map to </span><span style="--shiki-light:#E45649;--shiki-dark:#C678DD">guest</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#98C379"> bad user</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">null </span><span style="--shiki-light:#E45649;--shiki-dark:#C678DD">passwords</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#98C379"> yes</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">usershare allow </span><span style="--shiki-light:#E45649;--shiki-dark:#C678DD">guests</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#98C379"> yes</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#C678DD">include</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#98C379"> smb_shares.conf</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container caution">
<p class="hint-container-title">特别注意</p>
<p><strong>include</strong> 共享文件路径参数，必须放在最后</p>
</div>
<p>修改 <strong>nsswitch</strong></p>
<div class="language-ini line-numbers-mode" data-highlighter="shiki" data-ext="ini" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">$ vim /etc/nsswitch</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">passwd:        files winbind</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">shadow:        files winbind</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">group:         files winbind</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">hosts:         files dns winbind</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">bootparams:    files</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">ethers:        files</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">networks:      files</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">protocols:     files</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">rpc:           files</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">services:      files</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">netgroup:      files</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">publickey:     files</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">automount:     files</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">aliases:       files</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>修改认证</p>
<div class="language-ini line-numbers-mode" data-highlighter="shiki" data-ext="ini" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">vim /etc/krb5.conf</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">[logging]</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#C678DD">default</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#98C379"> FILE:/var/log/krb5libs.log</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#C678DD">kdc</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#98C379"> FILE:/var/log/krb5kdc.log</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#C678DD">admin_server</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#98C379"> FILE:/var/log/kadmind.log</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">[libdefaults]</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#C678DD">default_realm</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#98C379"> UIT.DEVOPS.LOCAL</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#C678DD">dns_lookup_realm</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#98C379"> false</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#C678DD">dns_lookup_kdc</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#98C379"> false</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">[realms]</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#C678DD">UIT.DEVOPS.LOCAL</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#98C379"> {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#C678DD">    kdc</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#98C379"> 172.16.70.124</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#C678DD">    default_ad</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#98C379"> UIT.DEVOPS.LOCAL</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">[ad_realm]</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">.</span><span style="--shiki-light:#E45649;--shiki-dark:#C678DD">UIT.DEVOPS.LOCAL</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#98C379"> UIT.DEVOPS.LOCAL</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#C678DD">UIT.DEVOPS.LOCAL</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#98C379"> UIT.DEVOPS.LOCAL</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">[kdc]</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#C678DD">profile</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#98C379"> /var/kerberos/krb5kdc/kdc.conf</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">[appdefaults]</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#C678DD">pam</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#98C379"> {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#C678DD">    debug</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#98C379"> false</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#C678DD">    ticket_lifetime</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#98C379"> 36000</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#C678DD">    renew_lifetime</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#98C379"> 36000</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#C678DD">    forwardable</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#98C379"> true</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#C678DD">    krb4_convert</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#98C379"> false</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>修改 <strong>hosts</strong></p>
<div class="language-ini line-numbers-mode" data-highlighter="shiki" data-ext="ini" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">$ vim /etc/hosts</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#98C379">172.16.70.124 uit.devops.local</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>加域退域操作（<em>加域前记得配置 <strong>DNS 172.16.70.124</strong></em> ）</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 通过配置文件，访问域信息</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> net</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> ads</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> info</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -s</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /etc/samba/smb.conf</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 加域命令</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> net</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> ads</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> join</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -U</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> administrator%user@dev</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 退域命令， -S 接完整 域主机+域名</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> net</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> ads</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> leave</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -U</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> administrator%user@dev</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -S</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> server124.uit.devops.local</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 可以检测是否加域成功 </span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> net</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> ads</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> testjoin</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container warning">
<p class="hint-container-title">登入</p>
<p>加入域后，客户端登入 <strong>Samba</strong> ，<strong>cmd</strong> 访问 <strong>\\172.16.120.141\Users</strong> 后，输入用户 需要使用 <strong>用户@域</strong> 形式，如： <strong>igarashi@UIT</strong></p>
</div>
</div></template>


