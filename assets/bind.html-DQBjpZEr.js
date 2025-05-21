import{_ as n}from"./plugin-vueexport-helper-DlAUqK2U.js";import{c as a,d as r,o}from"./app-DZhy38pQ.js";const t={};function s(d,e){return o(),a("div",null,e[0]||(e[0]=[r(`<h1 id="dns-bind" tabindex="-1"><a class="header-anchor" href="#dns-bind"><span>DNS BIND</span></a></h1><h2 id="dns-主配置文件" tabindex="-1"><a class="header-anchor" href="#dns-主配置文件"><span>DNS 主配置文件：</span></a></h2><p>vim /etc/named.conf</p><pre><code>//
// named.conf
//
// Provided by Red Hat bind package to configure the ISC BIND named(8) DNS
// server as a caching only nameserver (as a localhost DNS resolver only).
//
// See /usr/share/doc/bind*/sample/ for example named configuration files.
//
// See the BIND Administrator&#39;s Reference Manual (ARM) for details about the
// configuration located in /usr/share/doc/bind-{version}/Bv9ARM.html

options {
        listen-on port 53 { 127.0.0.1; }; //监听地址和端口，没特殊要求建议删除，删除后默认会在所有接口的UDP 53 端口监听服务
        listen-on-v6 port 53 { ::1; };
        directory       &quot;/var/named&quot;; // 区域数据文件的默认存放位置
        dump-file       &quot;/var/named/data/cache_dump.db&quot;;    // 用于指定缓存数据库文件、状态统计文件的位置
        statistics-file &quot;/var/named/data/named_stats.txt&quot;;  // 同上
        memstatistics-file &quot;/var/named/data/named_mem_stats.txt&quot;;
        recursing-file  &quot;/var/named/data/named.recursing&quot;;
        secroots-file   &quot;/var/named/data/named.secroots&quot;;
        allow-query     { localhost; }; // 允许使用本DNS服务器的网段，建议删除，删除后默认响应所有客户机的查询请求

        /*
         - If you are building an AUTHORITATIVE DNS server, do NOT enable recursion.
         - If you are building a RECURSIVE (caching) DNS server, you need to enable
           recursion.
         - If your recursive DNS server has a public IP address, you MUST enable access
           control to limit queries to your legitimate users. Failing to do so will
           cause your server to become part of large scale DNS amplification
           attacks. Implementing BCP38 within your network would greatly
           reduce such attack surface
        */
        recursion yes;

        dnssec-enable yes;
        dnssec-validation yes;  // 据说以上三个选项为yes会有影响，但目前测试无影响，若有则置为 no

        /* Path to ISC DLV key */
        bindkeys-file &quot;/etc/named.root.key&quot;;

        managed-keys-directory &quot;/var/named/dynamic&quot;;

        pid-file &quot;/run/named/named.pid&quot;;
        session-keyfile &quot;/run/named/session.key&quot;;
};

logging {
        channel default_debug {
                file &quot;data/named.run&quot;;
                severity dynamic;
        };
};

zone &quot;.&quot; IN {   // 正向 &quot;xx.com&quot; 区域
        type hint;  // 类型为hint
        file &quot;named.ca&quot;; // 区域数据文件为 name.ca
};

include &quot;/etc/named.rfc1912.zones&quot;;
include &quot;/etc/named.root.key&quot;;
</code></pre><p>在区域 zone 下面添加自定义的新 zone</p><pre><code>    zone &quot;ykb.com&quot; in {
            type master;
            file &quot;ykb.com.zone&quot;;
            allow-transfer { 172.18.1.20; };
    };
    zone &quot;1.18.172.in-addr.arpa&quot; in {
            type master;
            file &quot;172.18.1.arpa&quot;;
    };
</code></pre><p>定义好主配置文件后，就可以去配置区域数据文件了，通常默认存放在 /var/named 目录下，每个区域数据文件对应一个 DNS 解析区域，文件名<br> 及内容我们自己定义</p><p>以我们在主配置文件中指定的区域数据文件名新建一个文本：（文件名一定要和主配置文件中指定的区域数据文件名一致）</p><pre><code>vim /var/named/ykb.com.zone
</code></pre><p>进入新建的配置文件中，在末行模式下执行如下操作可以把配置文件的模板写入当前文件：<br> :r /var/named/named.localhost</p><pre><code>$TTL 1D //有效解析记录的生存周期
@       IN SOA  @ rname.invalid. ( // SOA标记、域名、管理邮箱 （按需修改）
                                        0       ; serial  // 更新序列号，可以是10位以内的整数
                                        1D      ; refresh
                                        1H      ; retry
                                        1W      ; expire
                                        3H )    ; minimum // 从1D到3H依次为：刷新时间，重新下载地址数据的间隔；重试延时，
                                        //下载失败后的重试间隔；失效时间，超时改时间依然无法下载则放弃下载；无效解析记录的生存周期
        NS      @
        A       127.0.0.1
        AAAA    ::1


        以上单位时间为M（分）、H（时）、W（周）、D（天）。
</code></pre><p>以下为修改后的 ykb.com.zone</p><pre><code>$TTL 1D
@       IN SOA  ykb.com. admin.ykb.com (
                                        0       ; serial
                                        1D      ; refresh
                                        1H      ; retry
                                        1W      ; expire
                                        3H )    ; minimum
@       IN      NS      skn.ykb.com.
skn     IN      A       172.18.1.1
ilu     IN      A       172.18.1.2
www     IN      A       172.18.1.3
</code></pre><p>然后创建另一个反向解析的配置文件，（同样，要和主配置文件中指定的文件名一样）</p><pre><code>vim /var/named/172.18.1.arpa
</code></pre><p>因为此反向解析是对应的刚才的正向区域，所以可以在末行模式下执行以下操作，把刚才编写的正向解析记录复制到当前文件。</p><pre><code>r: /var/named/ykb.com.zone
</code></pre><p>修改后的文件如下：</p><pre><code>$TTL 1D
@       IN SOA  ykb.com. admin.ykb.com (
                                        0       ; serial
                                        1D      ; refresh
                                        1H      ; retry
                                        1W      ; expire
                                        3H )    ; minimum
@       IN      NS      skn.ykb.com.
1       IN      PTR     skn.ykb.com.
2       IN      PTR     ilu.ykb.com.
3       IN      PTR     www.ykb.com.
</code></pre><h5 id="根据自己的需要编辑完后如下操作" tabindex="-1"><a class="header-anchor" href="#根据自己的需要编辑完后如下操作"><span>根据自己的需要编辑完后如下操作：</span></a></h5><p><strong>全部配置文件编写完成后可以使用以下命令对所有 DNS 相关的配置文件进行检查，如有语法错误的地方，会依次指出。</strong></p><pre><code>named-checkconf -z /etc/named.conf
</code></pre><p>看到如下结果即为正常：</p><pre><code>zone ykb.com/IN: loaded serial 0
zone 1.18.172.in-addr.arpa/IN: loaded serial 0
zone localhost.localdomain/IN: loaded serial 0
zone localhost/IN: loaded serial 0
zone 1.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.ip6.arpa/IN: loaded serial 0
zone 1.0.0.127.in-addr.arpa/IN: loaded serial 0
zone 0.in-addr.arpa/IN: loaded serial 0
</code></pre><p>执行 systemctl start named 启动 DNS 服务。</p><pre><code>&gt; netstat -ntpl|grep named 查看named是否已启动

tcp        0      0 127.0.0.1:953           0.0.0.0:*               LISTEN      6011/named
tcp6       0      0 ::1:53                  :::*                    LISTEN      6011/named
tcp6       0      0 ::1:953                 :::*                    LISTEN      6011/named
</code></pre><p>测试解析可以用 dig 命令或者 nslookup 命令：</p><pre><code>nslookup示例：
    [root@node83 named]# nslookup
    &gt; skn.ykb.com
    Server:		172.18.70.203
    Address:	172.18.70.203#53

    Name:	skn.ykb.com
    Address: 172.18.1.1
    &gt; ilu.ykb.com
    Server:		172.18.70.203
    Address:	172.18.70.203#53

    Name:	ilu.ykb.com
    Address: 192.168.1.2
    &gt; www.ykb.com
    Server:		172.18.70.203
    Address:	172.18.70.203#53

    Name:	www.ykb.com
    Address: 172.18.1.3
</code></pre><p>出现如上效果即 OK，以下是主机解析不出来，下一个 nameserver 进行解析的例子</p><pre><code>    &gt; www.baidu.com
    ;; Got recursion not available from 172.18.70.203, trying next server
    Server:		172.16.1.250
    Address:	172.16.1.250#53

    Non-authoritative answer:
    www.baidu.com	canonical name = www.a.shifen.com.
    Name:	www.a.shifen.com
    Address: 14.215.177.38
    Name:	www.a.shifen.com
    Address: 14.215.177.39
</code></pre><p>或可以直接运行</p><pre><code>nslookup www.xxx.com 来查看结果（推荐）
</code></pre><p>[注意]：<br> 当你发现无论如何都 ping 不通，nslookup 也找不到服务器，那么多半是出现了以下问题：</p><p>1.检查/etc/resolv.conf 里面 的 ip （加上 nameserver 自己的 IP，指本机 ip）</p><p><strong><em>若有多个 nameserver 必须将本机 ip 写在最前面</em></strong></p><pre><code>nameserver 127.0.0.1    # 或是可以直接简单粗暴的改为127.0.0.1 这十分重要
nameserver 172.18.70.203 # 本机ip
nameserver 172.16.1.250  # 其他的nameserver

然后重启网络命令：(若像腾讯云之类的则重启会还原，那么就没必要重启[其实也不用重启])
    service network restart

之后再重启dns服务：
    systemctl restart named
</code></pre><p>2./etc/named.conf<br> options 下的<br> listen-on 和 allow-query 请删除，即使就算置空 { } ; 也会导致 DNS 无法解析</p><p>3.每次增删改地址后需要重启 named 服务</p><h1 id="bind-以下补习" tabindex="-1"><a class="header-anchor" href="#bind-以下补习"><span>BIND（以下补习）</span></a></h1><p><a href="https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/7/html/networking_guide/sec-bind" target="_blank" rel="noopener noreferrer">https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/7/html/networking_guide/sec-bind</a></p><h3 id="bind-作为名称服务器" tabindex="-1"><a class="header-anchor" href="#bind-作为名称服务器"><span>bind 作为名称服务器</span></a></h3><p>BIND 由一组与 DNS 相关的程序组成。包含以下 3 个</p><ul><li>named：名称服务器</li><li>rndc：管理实用程序</li><li>dig： 调试工具</li></ul><h4 id="空区-empty-zones" tabindex="-1"><a class="header-anchor" href="#空区-empty-zones"><span>空区：Empty Zones</span></a></h4><p>bind 可以配置多个空白区域，防止递归服务器向无法处理它们的 Internet 服务器发送不必要的查询</p><ul><li>empty-zones-enable：控制是否创建空白区域</li><li>disable-empty-zone：使用该选项来从要使用的默认前缀列表中禁用一个或多个空白区域</li></ul><h4 id="配置-named-service" tabindex="-1"><a class="header-anchor" href="#配置-named-service"><span>配置 named Service</span></a></h4><ul><li>/etc/named.conf： 主要配置文件。</li><li>/etc/named/： 主配置文件中包含的配置文件的辅助目录。</li></ul><p>配置文件会嵌套，选项由({ and }) 串起来，编辑文件时，必须注意不要出现任何语法错误，否则 named 服务将无法启动。</p><pre><code>/etc/named.conf文件的组织如下：
statement-1 [“ statement-1-name ”] [ statement-1-class ] {
   option-1 ;
  选项2 ;
  选项-N ;
}; statement-2 [“ statement-2-name ”] [ statement-2-class ] {
   option-1 ;
  选项2 ;
  选项-N ;
}; statement-N [“ statement-N-name ”] [ statement-N-class ] {
   option-1 ;
  选项2 ;
  选项-N ;
};
</code></pre><h4 id="位置说明" tabindex="-1"><a class="header-anchor" href="#位置说明"><span>位置说明</span></a></h4><pre><code>/etc/logrotate.d/named/etc/named.conf   #主配置文件
/etc/named.rfc1912.zones    #区域配置文件（用include指令包含在主配置文件）
/etc/named.root.key         #根区域的key文件以实现事务签名；
/etc/rndc.conf                  #rndc（远程名称服务器控制器）配置文件
/etc/rndc.key                   #rndc加密密钥
/etc/sysconfig/named
/var/named/named.ca      #13个根服务器存放文件/var/named/named.empty
/var/named/named.localhost
/var/named/named.loopback
</code></pre><h4 id="常用语句类型" tabindex="-1"><a class="header-anchor" href="#常用语句类型"><span>常用语句类型</span></a></h4><p>以下类型的语句通常用于/etc/named.conf</p><ul><li><p>acl：该 acl（访问控制列表）语句允许你定义主机组，使他们能够被允许或拒绝访问域名服务器。</p><pre><code>acl acl-name {
   match-element ;
  ...
};
</code></pre><p>预定义的访问控制列表</p><pre><code>any	        匹配每个IP地址。
localhost	匹配IP本地系统正在使用的任何地址。
localnets	匹配IP本地系统连接到的任何网络上的任何地址。
none	    与任何IP地址都不匹配。

示例：
acl black-hats {
  10.0.2.0/24;
  192.168.0.0/24;
  1234:5678::9abc/24;
};
acl red-hats {
  10.0.1.0/24;
};
options {
  blackhole { black-hats; };
  allow-query { red-hats; };
  allow-query-cache { red-hats; };
};
定义了两个访问控制列表black-hats和red-hats，并black-hats在授予red-hats正常访问权限的同时添加了黑名单。
</code></pre></li><li><p>include：include 语句允许您将文件包括在中/etc/named.conf，以便将可能敏感的数据放置在具有受限权限的单独文件中。</p><p>例：将文件放到/etc/named.conf 中<br> include &quot;/etc/named.rfc1912.zones&quot;;</p></li><li><p>options：options 语句允许您定义全局服务器配置选项以及为其他语句设置默认值。它可以用来指定 named 工作目录的位置，允许的查询类型等等。</p><p>选项 描述<br> allow-query 指定允许哪些主机查询名称服务器以获取权威资源记录。它接受 IPCIDR 表示法的访问控制列表，地址集合或网络。默认情况下，允许所有主机。<br> allow-query-cache 指定允许哪些主机查询名称服务器以获取非权威数据，例如递归查询。默认情况下，仅 localhost 和 localnets 被允许。<br> blackhole 指定哪台主机都不会允许查询域名服务器。当特定主机或网络向服务器发送请求时，应使用此选项。默认选项是 none。<br> directory 指定服务的工作目录 named。默认选项是/var/named/。<br> disable-empty-zone 用于禁用将使用的默认前缀列表中的一个或多个空白区域。可以在 options 语句和 view 语句中指定。可以多次使用。<br> dnssec-enable 指定是否返回与 DNSSEC 相关的资源记录。默认选项是 yes。<br> dnssec-validation 指定是否通过 DNSSEC 证明资源记录是真实的。默认选项是 yes。<br> empty-zones-enable 控制是否创建空白区域。只能在 options 语句中指定。<br> forwarders 指定 IP 名称服务器的有效地址列表，请求应转发到这些地址以进行解析。<br> forward 指定 forwarders 指令的行为。它接受以下选项：<br> first— forwarders 在尝试自行解析名称之前，服务器将查询指令中列出的名称服务器。<br> only—当无法查询 forwarders 指令中列出的名称服务器时，服务器将不会尝试自行解析名称。<br> listen-on 指定 IPv4 用于侦听查询的网络接口。在 DNS 还充当网关的服务器上，您可以使用此选项来回答仅来自单个网络的查询。IPv4 默认情况下使用所有接口。<br> listen-on-v6 指定 IPv6 用于侦听查询的网络接口。在 DNS 还充当网关的服务器上，您可以使用此选项来回答仅来自单个网络的查询。IPv6 默认情况下使用所有接口。<br> max-cache-size 指定用于服务器缓存的最大内存量。达到限制后，服务器使记录过早过期，因此不会超过该限制。在具有多个视图的服务器中，该限制分别应用于每个视图的缓存。默认选项是 32M。<br> notify 指定在区域更新时是否通知辅助名称服务器。它接受以下选项：<br> yes —服务器将通知所有辅助名称服务器。<br> no—服务器将不会通知任何辅助名称服务器。<br> master-only —服务器将仅通知主服务器该区域。<br> explicit—服务器将仅通知 also-notify 区域语句内列表中指定的辅助服务器。<br> pid-file 指定 named 服务创建的进程 ID 文件的位置。<br> recursion 指定是否充当递归服务器。默认选项是 yes。<br> statistics-file 指定统计文件的备用位置。/var/named/named.stats 默认情况下使用该文件。</p><p>示例：<br> options {<br> allow-query { localhost; };<br> listen-on port 53 { 127.0.0.1; };<br> listen-on-v6 port 53 { ::1; };<br> max-cache-size 256M;<br> directory &quot;/var/named&quot;;<br> statistics-file &quot;/var/named/data/named_stats.txt&quot;;</p><pre><code>    recursion         yes;
    dnssec-enable     yes;
    dnssec-validation yes;

    pid-file          &quot;/run/named/named.pid&quot;;
    session-keyfile   &quot;/run/named/session.key&quot;;
  };
</code></pre></li><li><p>zone：zone 语句允许您定义区域的特征，例如其配置文件的位置和特定于区域的选项，并且可以用来覆盖全局 options 语句。</p><p>选项 描述<br> allow-query 指定允许哪些客户端请求有关此区域的信息。此选项将覆盖全局 allow-query 选项。默认情况下，所有查询请求都是允许的。<br> allow-transfer 指定允许哪些辅助服务器请求区域信息的传输。默认情况下，所有传输请求都是允许的。<br> allow-update<br> 指定允许哪些主机动态更新其区域中的信息。默认选项是拒绝所有动态更新请求。<br> 请注意，允许主机更新有关其区域的信息时应小心。IP 除非服务器位于受信任的网络中，否则不要在此选项中设置地址。而是使用第 15.2.6.3 节“事务 SIGnatures（TSIG）”中所述的 TSIG 密钥。<br> file 指定 named 工作目录中包含区域配置数据的文件名。<br> masters 指定从哪个 IP 地址请求权威区域信息。仅当区域定义为时，才使用此选项 type slave。<br> notify<br> 指定在区域更新时是否通知辅助名称服务器。它接受以下选项：<br> yes —服务器将通知所有辅助名称服务器。<br> no—服务器将不会通知任何辅助名称服务器。<br> master-only —服务器将仅通知主服务器该区域。<br> explicit—服务器将仅通知 also-notify 区域语句内列表中指定的辅助服务器。<br> type<br> 指定区域类型。它接受以下选项：<br> delegation-only—增强基础结构区域（例如 COM，NET 或 ORG）的委派状态。在没有显式或隐式委派的情况下收到的任何答案均视为 NXDOMAIN。此选项仅适用于递归或缓存实施中使用的 TLD（顶级域）或根区域文件。<br> forward —将有关此区域信息的所有请求转发到其他名称服务器。<br> hint—一种特殊类型的区域，用于指向根名称服务器，该名称服务器在其他情况下未知时解析查询。对于区域，不需要超出默认配置的任何配置 hint。<br> master—将名称服务器指定为该区域的权威。master 如果区域的配置文件位于系统上，则应将区域设置为。<br> slave—将名称服务器指定为该区域的从属服务器。主服务器在 masters 指令中指定。</p><p>示例：<br> zone &quot;<a href="http://example.com" target="_blank" rel="noopener noreferrer">example.com</a>&quot; IN {<br> type master;<br> file &quot;example.com.zone&quot;;<br> allow-transfer { 192.168.0.2; };<br> };</p><p>zone &quot;<a href="http://example.com" target="_blank" rel="noopener noreferrer">example.com</a>&quot; {<br> type slave;<br> file &quot;slaves/example.com.zone&quot;;<br> masters { 192.168.0.1; };<br> };<br> 该 named 服务配置为在 192.168.0.1 IP 地址处查询主服务器以获取有关 <a href="http://example.com" target="_blank" rel="noopener noreferrer">example.com</a> 区域的信息。然后将收到的信息保存到/var/named/slaves/example.com.zone 文件中。</p></li></ul><h4 id="公共资源记录-common-resource-records" tabindex="-1"><a class="header-anchor" href="#公共资源记录-common-resource-records"><span>公共资源记录：Common Resource Records</span></a></h4><p>给 ip 地址分配名称：hostname IN A IP-address<br> 若省略 hostname 则会指向最后指向的主机名</p><pre><code>对请求server1.example.com指向10.0.1.3或10.0.1.5。
server1  IN  A  10.0.1.3
     IN  A  10.0.1.5

alias-name IN CNAME real-name
</code></pre><ul><li>cname： 该规范记录一个名称映射到另一个，将这种类型的记录称为别名记录。<br> alias-name IN CNAME real-name<br> CNAME 记录最常用于指向使用通用命名方案的服务，例如 wwwWeb 服务器。但是，其用法有多个限制：</li></ul><h2 id="" tabindex="-1"><a class="header-anchor" href="#"><span></span></a></h2>`,60)]))}const l=n(t,[["render",s]]),m=JSON.parse(`{"path":"/unix/CentOS/DNS/bind.html","title":"DNS-BIND","lang":"zh-CN","frontmatter":{"title":"DNS-BIND","order":2,"description":"DNS BIND DNS 主配置文件： vim /etc/named.conf 在区域 zone 下面添加自定义的新 zone 定义好主配置文件后，就可以去配置区域数据文件了，通常默认存放在 /var/named 目录下，每个区域数据文件对应一个 DNS 解析区域，文件名 及内容我们自己定义 以我们在主配置文件中指定的区域数据文件名新建一个文本：（文件...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"DNS-BIND\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-10-09T12:42:17.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"悦·宝宝\\",\\"url\\":\\"https://github.com/Igarashi-G\\"}]}"],["meta",{"property":"og:url","content":"https://igarashi-g.github.io/unix/CentOS/DNS/bind.html"}],["meta",{"property":"og:site_name","content":"悦 ▪ 宝宝"}],["meta",{"property":"og:title","content":"DNS-BIND"}],["meta",{"property":"og:description","content":"DNS BIND DNS 主配置文件： vim /etc/named.conf 在区域 zone 下面添加自定义的新 zone 定义好主配置文件后，就可以去配置区域数据文件了，通常默认存放在 /var/named 目录下，每个区域数据文件对应一个 DNS 解析区域，文件名 及内容我们自己定义 以我们在主配置文件中指定的区域数据文件名新建一个文本：（文件..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-10-09T12:42:17.000Z"}],["meta",{"property":"article:modified_time","content":"2022-10-09T12:42:17.000Z"}]]},"git":{"createdTime":1664462137000,"updatedTime":1665319337000,"contributors":[{"name":"Igarashi","username":"Igarashi","email":"2545369032@qq.com","commits":2,"url":"https://github.com/Igarashi"}]},"readingTime":{"minutes":12.22,"words":3666},"filePathRelative":"unix/CentOS/DNS/bind.md","excerpt":"\\n<h2>DNS 主配置文件：</h2>\\n<p>vim /etc/named.conf</p>\\n<pre><code>//\\n// named.conf\\n//\\n// Provided by Red Hat bind package to configure the ISC BIND named(8) DNS\\n// server as a caching only nameserver (as a localhost DNS resolver only).\\n//\\n// See /usr/share/doc/bind*/sample/ for example named configuration files.\\n//\\n// See the BIND Administrator's Reference Manual (ARM) for details about the\\n// configuration located in /usr/share/doc/bind-{version}/Bv9ARM.html\\n\\noptions {\\n        listen-on port 53 { 127.0.0.1; }; //监听地址和端口，没特殊要求建议删除，删除后默认会在所有接口的UDP 53 端口监听服务\\n        listen-on-v6 port 53 { ::1; };\\n        directory       \\"/var/named\\"; // 区域数据文件的默认存放位置\\n        dump-file       \\"/var/named/data/cache_dump.db\\";    // 用于指定缓存数据库文件、状态统计文件的位置\\n        statistics-file \\"/var/named/data/named_stats.txt\\";  // 同上\\n        memstatistics-file \\"/var/named/data/named_mem_stats.txt\\";\\n        recursing-file  \\"/var/named/data/named.recursing\\";\\n        secroots-file   \\"/var/named/data/named.secroots\\";\\n        allow-query     { localhost; }; // 允许使用本DNS服务器的网段，建议删除，删除后默认响应所有客户机的查询请求\\n\\n        /*\\n         - If you are building an AUTHORITATIVE DNS server, do NOT enable recursion.\\n         - If you are building a RECURSIVE (caching) DNS server, you need to enable\\n           recursion.\\n         - If your recursive DNS server has a public IP address, you MUST enable access\\n           control to limit queries to your legitimate users. Failing to do so will\\n           cause your server to become part of large scale DNS amplification\\n           attacks. Implementing BCP38 within your network would greatly\\n           reduce such attack surface\\n        */\\n        recursion yes;\\n\\n        dnssec-enable yes;\\n        dnssec-validation yes;  // 据说以上三个选项为yes会有影响，但目前测试无影响，若有则置为 no\\n\\n        /* Path to ISC DLV key */\\n        bindkeys-file \\"/etc/named.root.key\\";\\n\\n        managed-keys-directory \\"/var/named/dynamic\\";\\n\\n        pid-file \\"/run/named/named.pid\\";\\n        session-keyfile \\"/run/named/session.key\\";\\n};\\n\\nlogging {\\n        channel default_debug {\\n                file \\"data/named.run\\";\\n                severity dynamic;\\n        };\\n};\\n\\nzone \\".\\" IN {   // 正向 \\"xx.com\\" 区域\\n        type hint;  // 类型为hint\\n        file \\"named.ca\\"; // 区域数据文件为 name.ca\\n};\\n\\ninclude \\"/etc/named.rfc1912.zones\\";\\ninclude \\"/etc/named.root.key\\";\\n</code></pre>","autoDesc":true}`);export{l as comp,m as data};
