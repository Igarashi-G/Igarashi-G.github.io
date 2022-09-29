<template><div><p>微软 <strong>LDAP</strong> 协议的一个实现，但又不仅仅实现了 <strong>LDAP</strong> 协议，它先实现了一个 <strong>LDAP</strong> 服务器，在此基础上又实现了具体的应用 <strong>（<em>Windows 域控</em>）</strong> ，常用于公司的用户、计算机资源统一管理</p>
<!-- more -->
<h1 id="_1-ad" tabindex="-1"><a class="header-anchor" href="#_1-ad" aria-hidden="true">#</a> 1. AD</h1>
<p><strong>AD（<em>Active Directory 活动目录</em>）：</strong> 可以作为数据源， <strong>和各种应用集成</strong>，比如公司内部的软件系统、<strong>Web</strong> 应用等，还可以设立群组、访问权限等</p>
<h2 id="_1-1-核心概念" tabindex="-1"><a class="header-anchor" href="#_1-1-核心概念" aria-hidden="true">#</a> 1.1 核心概念</h2>
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
<h2 id="_1-2-关键字" tabindex="-1"><a class="header-anchor" href="#_1-2-关键字" aria-hidden="true">#</a> 1.2 关键字</h2>
<img src="@source/unix/Linux/LDAP/img/核心概念.jpg">
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
<h1 id="_2-ad-ds" tabindex="-1"><a class="header-anchor" href="#_2-ad-ds" aria-hidden="true">#</a> 2. AD DS</h1>
<p>Active Directory 的 Directory 则是用来存储用户帐户、计算机帐户、打印机与共享文件等对象，这些对象的存储位置都是目录数据库（Directory Database），而 Active Directory 负责提供目录服务的组件就是 Active Directory 域服务（AD DS），负责操作（增删改查）目录数据库。</p>
<p>AD DS 可以在一台计算机、一个小型 LAN 或是数个 WAN 的结合中。它包含此范围内所有的对象，如文件、打印机、应用程序、服务器、域控制器与用户帐号等。</p>
</div></template>


