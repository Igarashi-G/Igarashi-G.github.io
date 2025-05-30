import{_ as h}from"./plugin-vueexport-helper-DlAUqK2U.js";import{c as r,a as s,e as k,d as p,b as i,w as a,r as d,o}from"./app-BSKYQGO5.js";const g={};function c(A,n){const t=d("Tabs");return o(),r("div",null,[n[4]||(n[4]=s("p",null,[s("strong",null,"MySQL"),i("，烂大街的关系型数据库，但我依然没有学好")],-1)),n[5]||(n[5]=s("h2",{id:"_1-安装",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#_1-安装"},[s("span",null,"1. 安装")])],-1)),k(t,{id:"7",data:[{id:"CentOS"},{id:"Window"}]},{title0:a(({value:l,isActive:e})=>n[0]||(n[0]=[i("CentOS")])),title1:a(({value:l,isActive:e})=>n[1]||(n[1]=[i("Window")])),tab0:a(({value:l,isActive:e})=>n[2]||(n[2]=[s("div",{class:"language-shell line-numbers-mode","data-highlighter":"shiki","data-ext":"shell",style:{"--shiki-light":"#383A42","--shiki-dark":"#abb2bf","--shiki-light-bg":"#FAFAFA","--shiki-dark-bg":"#282c34"}},[s("pre",{class:"shiki shiki-themes one-light one-dark-pro vp-code"},[s("code",null,[s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#A0A1A7","--shiki-light-font-style":"italic","--shiki-dark":"#7F848E","--shiki-dark-font-style":"italic"}},"# 安装")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#4078F2","--shiki-dark":"#61AFEF"}},"yum"),s("span",{style:{"--shiki-light":"#50A14F","--shiki-dark":"#98C379"}}," install"),s("span",{style:{"--shiki-light":"#50A14F","--shiki-dark":"#98C379"}}," mysql-server"),s("span",{style:{"--shiki-light":"#986801","--shiki-dark":"#D19A66"}}," -y")]),i(`
`),s("span",{class:"line"}),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#A0A1A7","--shiki-light-font-style":"italic","--shiki-dark":"#7F848E","--shiki-dark-font-style":"italic"}},"# 启动")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#4078F2","--shiki-dark":"#61AFEF"}},"systemctl"),s("span",{style:{"--shiki-light":"#50A14F","--shiki-dark":"#98C379"}}," start"),s("span",{style:{"--shiki-light":"#50A14F","--shiki-dark":"#98C379"}}," mysqld")]),i(`
`),s("span",{class:"line"}),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#A0A1A7","--shiki-light-font-style":"italic","--shiki-dark":"#7F848E","--shiki-dark-font-style":"italic"}},"# 连接 mysql -h host -u user -p password")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#4078F2","--shiki-dark":"#61AFEF"}},"mysql"),s("span",{style:{"--shiki-light":"#986801","--shiki-dark":"#D19A66"}}," -h"),s("span",{style:{"--shiki-light":"#986801","--shiki-dark":"#D19A66"}}," 127.0.0.1"),s("span",{style:{"--shiki-light":"#986801","--shiki-dark":"#D19A66"}}," -u"),s("span",{style:{"--shiki-light":"#50A14F","--shiki-dark":"#98C379"}}," root"),s("span",{style:{"--shiki-light":"#986801","--shiki-dark":"#D19A66"}}," -p")]),i(`
`),s("span",{class:"line"}),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#A0A1A7","--shiki-light-font-style":"italic","--shiki-dark":"#7F848E","--shiki-dark-font-style":"italic"}},"# 常见错误")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#4078F2","--shiki-dark":"#61AFEF"}},"ERROR"),s("span",{style:{"--shiki-light":"#986801","--shiki-dark":"#D19A66"}}," 2002"),s("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}}," (HY000): Can"),s("span",{style:{"--shiki-light":"#50A14F","--shiki-dark":"#98C379"}},"'t connect to local MySQL server through socket '"),s("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},"/tmp/mysql.sock"),s("span",{style:{"--shiki-light":"#50A14F","--shiki-dark":"#98C379"}},"' (2), it means that")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#50A14F","--shiki-dark":"#98C379"}},"the MySQL server daemon (Unix) or service (Windows) is not running.")]),i(`
`),s("span",{class:"line"}),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#50A14F","--shiki-dark":"#98C379"}},"# QUIT 或者 Control + D")])])]),s("div",{class:"line-numbers","aria-hidden":"true",style:{"counter-reset":"line-number 0"}},[s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"})])],-1)])),tab1:a(({value:l,isActive:e})=>n[3]||(n[3]=[s("p",null,[s("strong",null,"bin目录："),i(),s("strong",null,"MYSQL"),i(" 数据库下 "),s("strong",null,"bin"),i(" 目录是 "),s("strong",null,"MYSQL"),i(" 的可执行程序")],-1),s("ul",null,[s("li",null,[s("p",null,[i("在 "),s("strong",null,"bin"),i(" 目录下运行 "),s("code",null,"mysqld"),i(" 开启 "),s("strong",null,"mysql"),i(" 的 "),s("strong",null,"socket"),i("，因此多种语言（"),s("em",null,[i("如 "),s("strong",null,"JAVA"),i("、"),s("strong",null,"Python"),i("、"),s("strong",null,"C#"),i("、"),s("strong",null,"Ruby"),i("、"),s("strong",null,"PHP"),i(" 等等")]),i("）可以写对应的 "),s("strong",null,"socket"),i(" 进行数据库的连接")])]),s("li",null,[s("p",null,[i("数据库的服务器端运行起来就是一个 "),s("strong",null,"socket server"),i(" ，之后启动客户端去连接服务端")])]),s("li",null,[s("p",null,[i("认证连接后发送命令，数据库便可执行对应的命令。"),s("strong",null,"MySql"),i(" 也提供了自己的一个连接 "),s("strong",null,"socket"),i("，在 "),s("strong",null,"bin"),i(" 下运行 "),s("strong",null,"mysql"),i(" 便可开启。")])])],-1),s("p",null,[s("strong",null,"连接：")],-1),s("div",{class:"language-powershell line-numbers-mode","data-highlighter":"shiki","data-ext":"powershell",style:{"--shiki-light":"#383A42","--shiki-dark":"#abb2bf","--shiki-light-bg":"#FAFAFA","--shiki-dark-bg":"#282c34"}},[s("pre",{class:"shiki shiki-themes one-light one-dark-pro vp-code"},[s("code",null,[s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},"$ mysql "),s("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#56B6C2"}},"-"),s("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},"u root "),s("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#56B6C2"}},"-"),s("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},"p")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#A0A1A7","--shiki-light-font-style":"italic","--shiki-dark":"#7F848E","--shiki-dark-font-style":"italic"}},"#  -u: 用户名")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#A0A1A7","--shiki-light-font-style":"italic","--shiki-dark":"#7F848E","--shiki-dark-font-style":"italic"}},"#  -p: password")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#A0A1A7","--shiki-light-font-style":"italic","--shiki-dark":"#7F848E","--shiki-dark-font-style":"italic"}},"# root 初始化不设置密码，直接回车即可")])])]),s("div",{class:"line-numbers","aria-hidden":"true",style:{"counter-reset":"line-number 0"}},[s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"})])],-1),s("p",null,[i("把 "),s("strong",null,"mysqld"),i(" 搞成一个 "),s("strong",null,"windows"),i(" 服务（"),s("em",null,"任务管理器 - 服务"),i("）每次开机会自动启动")],-1),s("ul",null,[s("li",null,[s("p",null,[s("code",null,"mysqld --install"),i(" 命令运行 "),s("code",null,"Install/Remove of the Service Denied!")])]),s("li",null,[s("p",null,[i("用 "),s("code",null,"net start/stop mysql"),i(" 即可启动/关闭")])])],-1)])),_:1}),n[6]||(n[6]=p(`<h2 id="_2-用户权限" tabindex="-1"><a class="header-anchor" href="#_2-用户权限"><span>2. 用户权限</span></a></h2><h5 id="默认数据库如下" tabindex="-1"><a class="header-anchor" href="#默认数据库如下"><span><strong>默认数据库如下</strong></span></a></h5><ul><li><strong>mysql：</strong> 用户权限相关数据</li><li><strong>test：</strong> 用于用户测试数据</li><li><strong>information_schema：</strong> <strong>MySQL</strong> 本身架构相关数据</li></ul><h5 id="数据库简单使用" tabindex="-1"><a class="header-anchor" href="#数据库简单使用"><span><strong>数据库简单使用</strong></span></a></h5><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># 查看 MySQL 有那些数据库</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> show</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> databases</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># #创建数据库 order （通常创建 utf-8 的）</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> create</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> database</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> order</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># 选则进入 order 数据库</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> use</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> order</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># 创建 order 数据库中 的 user 表</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> create</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> table</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> user</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">nid</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> int,</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> name</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> varchar</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">20</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">,</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> pwd</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> varchar</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">64</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">));</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">	-</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> \`</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">varchar(20</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">):\`</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> &quot;表示最长为20的字符串，超过则截取前20个&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># 查看 order 数据库下，有那些表</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> show</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> tables</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># 查看 user 表中所有数据</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">select</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;"> *</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> from user;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># 向 user 表插入一条数据</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">insert</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> into</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> user</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">nid,</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> name,</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> pwd</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">) </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">values</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">1,</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &quot;zz&quot;,</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &quot;123&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># 清空 user 表内容</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">delete</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> from</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> user</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">\`</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">对于自增来说，即使清空，也保留了之前的自增号，从下一自增号开始</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">\`</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># 清空 user 表内容</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">truncate</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> table</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> user</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">\`</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">对于自增，也彻底清空，下次插入数据从</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 1</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> 开始\`</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># 删除 user 表</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">drop</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> table</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> user</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># 查询数据库的最大连接数</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">show</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> variables</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> like</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &#39;max_connections&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="用户-授权" tabindex="-1"><a class="header-anchor" href="#用户-授权"><span>用户&amp;授权:</span></a></h5><p><strong>MySQL</strong> 有默认创建好的用户表 <strong>user</strong>， 虽然可以用 <code>insert</code> 来创建用户，但不推荐</p><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># 查看user表的所有数据（乱码）</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> select</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;"> *</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> from</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> user</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># 查看user表中的各个字段详情</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> desc</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> user</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># 查看user表中的host字段数据和user字段数据</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> select</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> host,user</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> from</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> user</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># 查询权限，可看到数据库中所有权限相关信息</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> select</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;"> *</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> from</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> mysql.user</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="用户管理" tabindex="-1"><a class="header-anchor" href="#用户管理"><span>用户管理：</span></a></h5><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># 创建用户</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> create</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> user</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &#39;用户名&#39;@&#39;IP地址&#39;</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> identified</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> by</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &#39;密码&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;    </span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">\`</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">如（create</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> user &quot;igarashi&quot;@&quot;localhost&quot; identified by &quot;123&quot;）下略\`</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># 删除用户</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> drop</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> user</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &#39;用户名&#39;@&#39;IP地址&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">#修改用户</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> rename</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> user</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &#39;用户名&#39;@&#39;IP地址&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">; </span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">to</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &#39;新用户名&#39;@&#39;IP地址&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># 修改密码</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> set</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> password</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> for</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &#39;用户名&#39;@&#39;IP地址&#39;</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> =</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> Password</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">&#39;新密码&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">	-h</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> :</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"> # 登录时设置输入 IP 地址</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="权限管理" tabindex="-1"><a class="header-anchor" href="#权限管理"><span>权限管理:</span></a></h5><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># 授权</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> grant</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> 权限</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> on</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> 数据库.表</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> to</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">  &#39;用户&#39;@&#39;IP地址&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">如</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> grant</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> select</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> on</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> test.tb1</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> to</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &quot;igarashi&quot;@&quot;localhost&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># 若远程管理连接, 只需要创建 对应IP地址 的用户，并进行授权</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> grant</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> select</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> on</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> test.tb1</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> to</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &quot;igarashi&quot;@&quot;192.168.1.12&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">\` </span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">即可让用户</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> fuuka 远程在 </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">192.168.1.12</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> 上登录 \`</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>通配符</strong></p><ul><li><p><strong>用户名@IP地址 :</strong> 用户只能在 该 <strong>IP</strong> 下 访问</p></li><li><p><strong>用户名@192.168.1.% :</strong> 用户只能在 该 <strong>IP</strong> 段 下访问（<em><strong>%</strong> 表示任意，创建时需用 &quot;&quot; 号，</em><em>%</em>* 是特殊字符*）</p></li><li><p><strong>用户名@% :</strong> 用户可在 任意 <strong>IP</strong> 下访问 （<em>默认值</em>）</p></li><li><p>远程客户端连接登录命令如下</p><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> mysql</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -u</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &quot;username&quot;</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -h</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &quot;ip addr&quot;</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -P</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 3306</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -p</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &quot;passwd&quot;</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># 3306 默认值，修改自配的端口号</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h5 id="其他" tabindex="-1"><a class="header-anchor" href="#其他"><span>其他：</span></a></h5><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># 刷新权限，将数据读取到内存中，使其立即生效</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> flush</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> privileges</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># 若忘记密码： 启动免授权服务端，跳过数据库权限验证, 或是去修改 my.ini</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> mysqld</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> --skip-grant-tables</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># 继续客户端输入</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> mysql</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -u</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> root</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -p</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &quot;任意&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># 修改用户名密码</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> use</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> mysql</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> update</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> mysql.user</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> set</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> authentication_string=password</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">&#39;user@dev&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">) </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">where</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> user=&#39;root&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> flush</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> privileges</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-常用操作" tabindex="-1"><a class="header-anchor" href="#_3-常用操作"><span>3. 常用操作</span></a></h2><h4 id="创建表" tabindex="-1"><a class="header-anchor" href="#创建表"><span>创建表</span></a></h4><div class="language-mysql line-numbers-mode" data-highlighter="shiki" data-ext="mysql" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>create table 表名(</span></span>
<span class="line"><span>    列名  类型  是否可以为空，</span></span>
<span class="line"><span>    列名  类型  是否可以为空</span></span>
<span class="line"><span>)ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><strong>ENGINE：</strong> 数据库引擎， <strong>InnoDB</strong> 还是 <strong>MyISAM</strong><ul><li><strong>MyISAM:</strong> 支持 <strong>全文索引</strong>，速度快</li><li>**InnoDB: ** 支持 <strong>事务</strong>, 速度慢</li></ul></li><li><strong>事务：</strong> 原子操作，即 <strong>不能分割</strong> 的操作，如：<strong>转账</strong>（<em>减钱、加钱</em>）不能转一半断电数据丢失，因此断电要回退原来状态，<strong>把多个动作叠加在一起，称之为一个事务</strong></li><li><strong>是否可空：</strong><ul><li><strong>not null：</strong> 不可空</li><li><strong>null：</strong> 可空</li></ul></li></ul><div class="language-mysql line-numbers-mode" data-highlighter="shiki" data-ext="mysql" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>create table tb1(</span></span>
<span class="line"><span>    nid int not null defalut 2,</span></span>
<span class="line"><span>    num int not null</span></span>
<span class="line"><span>)</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><strong>default：</strong> 默认值，创建可指定，插入数据若未设置，则自动使用默认值</li></ul><h5 id="主键自增" tabindex="-1"><a class="header-anchor" href="#主键自增"><span><strong>主键自增：</strong></span></a></h5><div class="language-mysql line-numbers-mode" data-highlighter="shiki" data-ext="mysql" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>create table tb1(</span></span>
<span class="line"><span>    nid int not null auto_increment primary key,</span></span>
<span class="line"><span>	num int null</span></span>
<span class="line"><span>)</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p><strong>auto_increment：</strong> 自增，若某列设为自增列，插入无需再次指定，此列会自增（<em>表中只能有一个自增列</em> ）对于自增列：</p><ul><li><strong>必须是索引</strong>（<em>含主键</em>）</li><li>可以设置 <strong>步长</strong> 和 <strong>起始值</strong></li></ul></li><li><p>修改自增列</p><div class="language-mysql line-numbers-mode" data-highlighter="shiki" data-ext="mysql" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>-- 修改 users 表 自增 id 为 123456</span></span>
<span class="line"><span>alter table users AUTO_INCREMENT=123456;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p><strong>primary key：</strong> 主键，特殊的 <strong>唯一索引</strong>，<strong>不允许有空值</strong>，若主键使用：</p><ul><li><strong>单个列：</strong> 则它的 <strong>值 必须唯一</strong></li><li><strong>多列：</strong> 则其 <strong>组合 必须唯一</strong></li></ul><div class="language-mysql line-numbers-mode" data-highlighter="shiki" data-ext="mysql" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>create table tb1(</span></span>
<span class="line"><span>    nid int not null auto_increment primary key, -- or primary key(nid,num) </span></span>
<span class="line"><span>	...</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h5 id="约束-联合-唯一" tabindex="-1"><a class="header-anchor" href="#约束-联合-唯一"><span><strong>约束（联合）唯一：</strong></span></a></h5><p><strong>与主键约束相似</strong> ，都可以 <strong>确保列的唯一性</strong>，不同的是，唯一约束在一个表中 <strong>可有多个</strong> ，设置唯一约束的列允许有空值，但也 <strong>仅有一个空值</strong></p><div class="language-mysql line-numbers-mode" data-highlighter="shiki" data-ext="mysql" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>CREATE TABLE \`textbook_edition\` (</span></span>
<span class="line"><span>    \`id\` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT &#39; 默认 id&#39;,</span></span>
<span class="line"><span>    列名 类型 unsigned NOT NULL DEFAULT &#39;1&#39; COMMENT &#39;XX&#39;,</span></span>
<span class="line"><span>    PRIMARY KEY (\`id\`), 										-- 设置主键</span></span>
<span class="line"><span>    UNIQUE KEY \`idx_grade_subject\` (\`grade_type\`,\`subject\`) 	-- 设置联合唯一</span></span>
<span class="line"><span>) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COMMENT=&#39;XX表&#39;;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>UNIQUE KEY</li></ul><h5 id="索引" tabindex="-1"><a class="header-anchor" href="#索引"><span><strong>索引：</strong></span></a></h5><p>用来 <strong>快速查找</strong> 出在一个列上 <strong>用一特定值</strong> 的行，无索引则会顺序遍历（<em>表越长越耗时</em> ）</p><div class="hint-container tip"><p class="hint-container-title">提示</p><p>所有的 <strong>MySQL 索引</strong> （<em><strong>PRIMARY</strong>、<strong>UNIQUE</strong> 和 <strong>INDEX</strong></em> ）是在 <strong>B树</strong> 中存储</p></div><pre><code>    外键，foreign key一个特殊的索引，只能是指定内容（一般对两个表有关系的列进行约束，一个表的外键通常是另一表的主键）
        constraint fk_cc foreign key (color_id) references color(nid) （constraint后面接的是 外键的标签）

    例：建表时创建联合唯一：
        CREATE TABLE \`textbook_edition\` (
          \`id\` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT &#39; 默认 id&#39;,
          列名 类型 unsigned NOT NULL DEFAULT &#39;1&#39; COMMENT &#39;XX&#39;,
          PRIMARY KEY (\`id\`), -- 设置主键
          UNIQUE KEY \`idx_grade_subject\` (\`grade_type\`,\`subject\`) -- 设置联合唯一
        ) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COMMENT=&#39;XX表&#39;;

    修改表名：
        ALTER TABLE 表名 RENAME [TO|AS] 新表名

2.修改表：
    添加列：alter table 表名 add 列名 类型
    删除列：alter table 表名 drop column 列名
    修改列：
            alter table 表名 modify column 列名 类型;  -- 类型
            alter table 表名 change 原列名 新列名 类型; -- 列名，类型

    添加主键：
            alter table 表名 add primary key(列名);
    删除主键：
            alter table 表名 drop primary key;
            alter table 表名  modify  列名 int, drop primary key;

    添加外键：alter table 主表 add constraint 外键名称（形如：FK_主表_从表） foreign key 主表(外键字段) references 从表(主键字段);
    删除外键：alter table 表名 drop foreign key 外键名称
    （添加外键之后两张表便有了约束，多为一对多关系）
    这也是为了满足第三范式，并且防止脏数据的产生，但人为的话若依出错，干脆加个外键约束，则每次插入就不用担心

    添加联合唯一：ALTER TABLE 表名 ADD UNIQUE INDEX(列名1,列名2...);
    删除索引：ALTER TABLE \`table_name\` DROP INDEX \`column\`;

    修改默认值：ALTER TABLE testalter_tbl ALTER i SET DEFAULT 1000;
    删除默认值：ALTER TABLE testalter_tbl ALTER i DROP DEFAULT;

3.查看表结构
    desc 表名;  查看某个表的完整的表结构
</code></pre><h2 id="三、数据类型-数值、时间、字符串" tabindex="-1"><a class="header-anchor" href="#三、数据类型-数值、时间、字符串"><span>三、数据类型：（数值、时间、字符串）</span></a></h2><pre><code>    [M]:表示总长度（例如：二进制位有多长）超出长度就报错
    [D]:表示小数位总长度（如decimal的m为50，d为30）
    char：定长查找速度快，但浪费空间
    二进制数据：
        TinyBlob、Blob、MediumBlob、LongBlob（专门存二进制数据的，比如图片、视频，若非要保存在数据库中，用read rb以二进制方式读取它）
        但一般没人这么干，通常上传图片、视频，都是把上传的东西以文件的形式保存到本地目录（硬盘中），而数据库中只保存一个路径。
        因此一般用varchar(65)这种方式，把文件存在某个硬盘（D:\\1.avi）因此以后要的话就通过数据库把文件路径拿走再open打开即可。

    enum:（枚举）
        若想知道星期几，先可以建立一个对应关系：比如x对应星期一，y对应星期二。。。（类似字典）
        Enum week:
            x = &quot;星期一&quot;
            y = &quot;星期二&quot;
            z = &quot;星期三&quot;
        print week.x ————————因此以后想引用直接通过这种方式
        在例如FTP中的对应数字1003：未授权之类的 ————unauth = 2003
        示例：
            CREATE TABLE shirts (
                name VARCHAR(40),
                size ENUM(&#39;x-small&#39;, &#39;small&#39;, &#39;medium&#39;, &#39;large&#39;, &#39;x-large&#39;)
            );（表示以后插入数据只能是枚举中的某一个，不然报错）
            INSERT INTO shirts (name, size) VALUES (&#39;dress shirt&#39;,&#39;large&#39;), (&#39;t-shirt&#39;,&#39;medium&#39;),(&#39;polo shirt&#39;,&#39;small&#39;);

    set:（集合）
        示例：
            CREATE TABLE myset (col SET(&#39;a&#39;, &#39;b&#39;, &#39;c&#39;, &#39;d&#39;));（与枚举不同的是，set可以插入多个集合内的数据）
            INSERT INTO myset (col) VALUES (&#39;a,d&#39;), (&#39;d,a&#39;), (&#39;a,d,a&#39;), (&#39;a,d,d&#39;), (&#39;d,a,d&#39;);


    其他详细参考博客
</code></pre><h2 id="四、数据表内容操作" tabindex="-1"><a class="header-anchor" href="#四、数据表内容操作"><span>四、数据表内容操作</span></a></h2><pre><code>1、增：
    insert into 表 (列名,列名...) values (值,值,值...)
    insert into 表 (列名,列名...) values (值,值,值...),(值,值,值...)（插入多条数据）
    insert into 目标表 (列名,列名...) select 列名,列名... from 另一张表 （把另外一张表的数据（可选列）全部导入目标表里）
        若两表中的数据类型不同（能够类型转换的）则会转换，不然报错 当然后面还可以接where nid&gt;2 and..之类的

2、删：
    delete from 表
    delete from 表 where id＝1 and name＝&#39;alex&#39;

3、改：
    update 表 set name ＝ &#39;igarashi&#39; where id&gt;1 and 1=1 ...
    UPDATE 表 set \`init_service_num\` = \`service_num\`;    --令表中的一列等于表中的另一列

4、查：
    select * from 表
    select * from 表 where id &gt; 1
    select nid,name,gender as gg from 表 where id &gt; 1
    注：尽量不要用select *，因为select *的效率低，最好是把要查找的数据都写一遍。

5、其他：（必须熟）
    a、条件：
        select * from 表 where id &gt; 1 and name != &#39;alex&#39; and num = 12;

        select * from 表 where id between 5 and 16;

        select * from 表 where id in (11,22,33)
        select * from 表 where id not in (11,22,33)
        select * from 表 where id in (select nid from 表)

    b、通配符：
        select * from 表 where name like &#39;ale%&#39;  - ale开头的所有（多个字符串）
        select * from 表 where name like &#39;ale_&#39;  - ale开头的所有（一个字符）

    c、限制：分页（比如打印多少个数据）
        select * from 表 limit 5;            - 前5行
        select * from 表 limit 4,5;          - 从第4行之后的5行
        select * from 表 limit 5 offset 4    - 从第4行之后的5行————推荐使用（与上写法相反，但功能一样）

    d、排序：
        select * from 表 order by 列 asc              - 根据 “列” 从小到大排列（a,b,c,d从小到大）
        select * from 表 order by 列 desc             - 根据 “列” 从大到小排列（d,c,b,a从大到小）
        select * from 表 order by 列1 desc,列2 asc    - 根据 “列1” 从大到小排列，如果相同则按列2从小到大排序
            （前一次排序出现列相同则按第二次顺序再排）

    e、分组：（重点，想让数据根据某列进行分组）
        select num from 表 group by num（通过分组来按组取出num，把重复的数据整合）
        select num,nid from 表 group by num,nid（大致同上）
        select num,nid from 表  where nid &gt; 10 group by num,nid order by nid desc
        select num,nid,count(*),sum(score),max(score),min(score) from 表 group by num,nid（利用聚合函数进行分组取值）
        max：表示取最大值
        min：最小值
        sum：取和，比如再取成绩之和时
        count：计数，计算出现的次数
        avg：平均数
        （注意这些聚合函数是在查询列时运用的）

        当写select count(nid),part from userinfo where count(nid)&gt;2 group by part;会报错，这是因为group by是后执行。此时part还
        尚未分组，因此count（nid）无法获取。所以如下：（若想对聚合后的列进行操作）

        select num from 表 group by num having max(id) &gt; 10（在根据聚合函数的结果进行筛选时，where条件无法使用，因此用having）

        特别的：group by 必须在where之后，order by之前

    f、连表：（非常重要，查找两表有对应关系[例如：外键]数据则可以进行连表）
        1.无对应关系则不显示：(条件连表一)
        select A.num, A.name, B.name
        from A,B
        用这种方式去普通查询两表数据，会显示为笛卡尔积，单纯的吧两表的数据进行相乘，大量垃圾数据出现。
        #Where A.nid = B.nid（加上对应关系则会正常显示）

        2.无对应关系则不显示:(条件连表二)————与上加条件相同只是写法不一样
        select A.num, A.name, B.name
        from A inner join B（inner：表示互相迁就，对left的数据进行过滤，有为null的数据进行清空，永远不会出现null）
        on A.nid = B.nid（这里条件用on，类似where）

        3.A表所有显示，如果B中无对应关系，则值为null：（用join进行连表操作，可以left join、right join）
        select A.num, A.name, B.name
        from A left join B
        on A.nid = B.nid（A表有的数据B表没有对应数据则显示NULL）

        4.B表所有显示，如果B中无对应关系，则值为null：（以后用连表操作优先用left outer join,因为效率高）
        select A.num, A.name, B.name
        from A right join B
        on A.nid = B.nid

    g、组合：（想让多个表的某列数据进行组合）
        组合，自动处理重合
        select nickname
        from A
        union
        select name
        from B

        组合，不处理重合
        select nickname
        from A
        union all（加all则查找两表的全部数据）
        select name
        from B
</code></pre>`,37))])}const m=h(g,[["render",c]]),F=JSON.parse('{"path":"/database/MySQL/MySQL.html","title":"MySQL","lang":"zh-CN","frontmatter":{"title":"MySQL","date":"2018-03-21T00:00:00.000Z","category":["数据库"],"tag":["MySQL"],"description":"MySQL，烂大街的关系型数据库，但我依然没有学好","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"MySQL\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2018-03-21T00:00:00.000Z\\",\\"dateModified\\":\\"2023-02-25T05:41:54.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"悦·宝宝\\",\\"url\\":\\"https://github.com/Igarashi-G\\"}]}"],["meta",{"property":"og:url","content":"https://igarashi-g.github.io/database/MySQL/MySQL.html"}],["meta",{"property":"og:site_name","content":"悦 ▪ 宝宝"}],["meta",{"property":"og:title","content":"MySQL"}],["meta",{"property":"og:description","content":"MySQL，烂大街的关系型数据库，但我依然没有学好"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-02-25T05:41:54.000Z"}],["meta",{"property":"article:tag","content":"MySQL"}],["meta",{"property":"article:published_time","content":"2018-03-21T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-02-25T05:41:54.000Z"}]]},"git":{"createdTime":1665586687000,"updatedTime":1677303714000,"contributors":[{"name":"Igarashi","username":"Igarashi","email":"2545369032@qq.com","commits":3,"url":"https://github.com/Igarashi"}]},"readingTime":{"minutes":11.75,"words":3524},"filePathRelative":"database/MySQL/MySQL.md","excerpt":"<p><strong>MySQL</strong>，烂大街的关系型数据库，但我依然没有学好</p>\\n","autoDesc":true}');export{m as comp,F as data};
