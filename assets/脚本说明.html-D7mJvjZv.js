import{_ as n}from"./plugin-vueexport-helper-DlAUqK2U.js";import{c as d,d as a,o as r}from"./app-BhrB-knK.js";const t={};function i(s,e){return r(),d("div",null,e[0]||(e[0]=[a(`<h1 id="说明" tabindex="-1"><a class="header-anchor" href="#说明"><span>说明</span></a></h1><h4 id="文件路径" tabindex="-1"><a class="header-anchor" href="#文件路径"><span>文件路径：</span></a></h4><pre><code>测试环境：172.18.70.203
路径：
    /usr/lib/uraid/scripts/dns
</code></pre><h4 id="命令参数" tabindex="-1"><a class="header-anchor" href="#命令参数"><span>命令参数:</span></a></h4><p>通过 sh 启动：/usr/lib/uraid/scripts/dns/dns-bind.sh</p><pre><code>optional arguments:
  -h, --help        show this help message and exit
  -method METHOD    方法包含
                        start_bind：同步uetcdc中数据，启动bind
                        add_conf：添加配置项
                        del_conf：删除配置项
                        list: 显示所有域名
                            若指定 -addr 则显示对应域名的所有ip

  -ip IP            ip地址
  -addr ADDR        域名
</code></pre><ul><li><p>首先要从 utecd 中导入数据,启动 bind:<br> /usr/lib/uraid/scripts/dns/dns-bind.sh -method start_bind</p></li><li><p>添加配置项:</p><pre><code>  /usr/lib/uraid/scripts/dns/dns-bind.sh -method add_conf -ip 192.168.1.1 -addr www.abc.com

  注：添加配置项时，可以单独配置域名，然后再配置ip，也可以一同配置，但不能单独配置ip
</code></pre></li><li><p>删除配置项:</p><pre><code>  /usr/lib/uraid/scripts/dns/dns-bind.sh -method del_conf -ip 192.168.1.1 -addr www.abc.com
</code></pre></li><li><p>列出所有域名：<br> /usr/lib/uraid/scripts/dns/dns-bind.sh -method list</p></li><li><p>列出对应域名的 ip：<br> /usr/lib/uraid/scripts/dns/dns-bind.sh -method list -addr <a href="http://abc.com" target="_blank" rel="noopener noreferrer">abc.com</a></p></li></ul><h4 id="返回值类型" tabindex="-1"><a class="header-anchor" href="#返回值类型"><span>返回值类型：</span></a></h4><pre><code>    添加配置项:
    {&#39;result&#39;: {&#39;code&#39;: 0, &#39;msg&#39;: [&#39;添加IP成功&#39;, &#39;添加域名成功&#39;]},
     &#39;data&#39;: [{&#39;www.kkk.com.&#39;: [&#39;172.14.1.1&#39;, &#39;172.14.1.3&#39;]},
      {&#39;qwe.kkk.com&#39;: [&#39;172.14.1.2&#39;]},
      {&#39;www.kkk.com&#39;: [&#39;172.14.1.1&#39;, &#39;172.14.1.3&#39;]}],
     &#39;end&#39;: 1}

    列出所有域名：
    {&#39;data&#39;: [&#39;localhost.localdomain&#39;, &#39;localhost&#39;, &#39;kkk.come&#39;, &#39;iii.come&#39;],
     &#39;end&#39;: 1,
     &#39;result&#39;: {&#39;code&#39;: 0, &#39;msg&#39;: [&#39;列出所有域名&#39;]}}

    列出对应域名的ip：
    {&#39;data&#39;: [&#39;172.14.1.2&#39;, &#39;172.14.1.1&#39;, &#39;172.14.1.3&#39;, &#39;172.14.1.4&#39;],
     &#39;end&#39;: 1,
     &#39;result&#39;: {&#39;code&#39;: 0, &#39;msg&#39;: [&#39;找到配置文件：kkk.come 对应的ip&#39;]}}
</code></pre><h4 id="定义文件" tabindex="-1"><a class="header-anchor" href="#定义文件"><span>定义文件</span></a></h4><p>/usr/lib/uraid/scripts/const.py</p><pre><code>    NAMED_PATH = &#39;/etc/named.conf&#39;  - named配置文件地址
    ZONE_CONF_PATH = &#39;/var/named/&#39;  - zone配置文件地址
    UETCD_NAMED = &#39;/dns-bind/named.rfc1912.zones&#39; - uetcd named配置文件地址
    UETCD_ZONE = &#39;/dns-bind/var-named/&#39; - uetcd zone配置文件地址

    返回值：CODE...
</code></pre><h4 id="日志" tabindex="-1"><a class="header-anchor" href="#日志"><span>日志</span></a></h4><p>/usr/local/bind/bind.log</p><pre><code>用于记录添加或删除配置项的操作日志
如 add_conf 添加信息 to /var/named/配置文件.zone
</code></pre><h4 id="使用-uetcdctl-命令查看" tabindex="-1"><a class="header-anchor" href="#使用-uetcdctl-命令查看"><span>使用 uetcdctl 命令查看</span></a></h4><ul><li>查看 named.rfc1912.zones 文件<br> uetcdctl ls dns-bind<br> uetcdctl get dns-bind/named.rfc1912.zones</li><li>查看 zone 的配置文件<br> uetcdctl ls dns-bind/var-named<br> uetcdctl get dns-bind/var-named/{文件名}.zone<br> and<br> uetcdctl get dns-bind/var-named/{文件名}.arpa</li></ul><h3 id="脚本业务规则说明" tabindex="-1"><a class="header-anchor" href="#脚本业务规则说明"><span>脚本业务规则说明：</span></a></h3><h4 id="_1-删除-ip-和域名" tabindex="-1"><a class="header-anchor" href="#_1-删除-ip-和域名"><span>1.删除 ip 和域名：</span></a></h4><ul><li><p>当前规则为执行删除命令必须要有 -addr 参数，通常执行</p><p>python3 <a href="http://dns.py" target="_blank" rel="noopener noreferrer">dns.py</a> -method del_conf -addr <a href="http://www.abc.com" target="_blank" rel="noopener noreferrer">www.abc.com</a> -ip 192.168.1.1</p></li><li><p>执行上述命令：</p><ul><li><p>1.若域名 addr 下存在多个 ip，则不删除域名，只删除 ip，并返回 &quot;域名下还存在对应的 ip&quot; 的提示</p></li><li><p>2.若域名 addr 下只有唯一一个 ip，则会默认将 ip 和域名 一同删除，并返回成功</p></li></ul></li></ul><p>[注意]：若一旦只执行了</p><pre><code>-method del_conf -addr www.abc.com 命令 并未携带 -ip 参数，
</code></pre><p>会正常删除域名，而不删除 ip。若要再删除 ip，则继续执行</p><pre><code>-method del_conf -addr www.abc.com -ip 192.168.1.2
</code></pre><p>删除 ip 和域名命令，即可完成继续删除 ip 动作（或是继续添加域名，可恢复原状）</p>`,25)]))}const c=n(t,[["render",i]]),l=JSON.parse('{"path":"/unix/CentOS/DNS/%E8%84%9A%E6%9C%AC%E8%AF%B4%E6%98%8E.html","title":"DNS脚本说明","lang":"zh-CN","frontmatter":{"title":"DNS脚本说明","order":4,"description":"说明 文件路径： 命令参数: 通过 sh 启动：/usr/lib/uraid/scripts/dns/dns-bind.sh 首先要从 utecd 中导入数据,启动 bind: /usr/lib/uraid/scripts/dns/dns-bind.sh -method start_bind 添加配置项: 删除配置项: 列出所有域名： /usr/lib...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"DNS脚本说明\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-10-09T12:42:17.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"悦·宝宝\\",\\"url\\":\\"https://github.com/Igarashi-G\\"}]}"],["meta",{"property":"og:url","content":"https://igarashi-g.github.io/unix/CentOS/DNS/%E8%84%9A%E6%9C%AC%E8%AF%B4%E6%98%8E.html"}],["meta",{"property":"og:site_name","content":"悦 ▪ 宝宝"}],["meta",{"property":"og:title","content":"DNS脚本说明"}],["meta",{"property":"og:description","content":"说明 文件路径： 命令参数: 通过 sh 启动：/usr/lib/uraid/scripts/dns/dns-bind.sh 首先要从 utecd 中导入数据,启动 bind: /usr/lib/uraid/scripts/dns/dns-bind.sh -method start_bind 添加配置项: 删除配置项: 列出所有域名： /usr/lib..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-10-09T12:42:17.000Z"}],["meta",{"property":"article:modified_time","content":"2022-10-09T12:42:17.000Z"}]]},"git":{"createdTime":1664462137000,"updatedTime":1665319337000,"contributors":[{"name":"Igarashi","username":"Igarashi","email":"2545369032@qq.com","commits":2,"url":"https://github.com/Igarashi"}]},"readingTime":{"minutes":2.1,"words":631},"filePathRelative":"unix/CentOS/DNS/脚本说明.md","excerpt":"\\n<h4>文件路径：</h4>\\n<pre><code>测试环境：172.18.70.203\\n路径：\\n    /usr/lib/uraid/scripts/dns\\n</code></pre>\\n<h4>命令参数:</h4>\\n<p>通过 sh 启动：/usr/lib/uraid/scripts/dns/dns-bind.sh</p>\\n<pre><code>optional arguments:\\n  -h, --help        show this help message and exit\\n  -method METHOD    方法包含\\n                        start_bind：同步uetcdc中数据，启动bind\\n                        add_conf：添加配置项\\n                        del_conf：删除配置项\\n                        list: 显示所有域名\\n                            若指定 -addr 则显示对应域名的所有ip\\n\\n  -ip IP            ip地址\\n  -addr ADDR        域名\\n</code></pre>","autoDesc":true}');export{c as comp,l as data};
