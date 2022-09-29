<template><div><h1 id="说明" tabindex="-1"><a class="header-anchor" href="#说明" aria-hidden="true">#</a> 说明</h1>
<h4 id="文件路径" tabindex="-1"><a class="header-anchor" href="#文件路径" aria-hidden="true">#</a> 文件路径：</h4>
<pre><code>测试环境：172.18.70.203
路径：
    /usr/lib/uraid/scripts/dns
</code></pre>
<h4 id="命令参数" tabindex="-1"><a class="header-anchor" href="#命令参数" aria-hidden="true">#</a> 命令参数:</h4>
<p>通过 sh 启动：/usr/lib/uraid/scripts/dns/dns-bind.sh</p>
<pre><code>optional arguments:
  -h, --help        show this help message and exit
  -method METHOD    方法包含
                        start_bind：同步uetcdc中数据，启动bind
                        add_conf：添加配置项
                        del_conf：删除配置项
                        list: 显示所有域名
                            若指定 -addr 则显示对应域名的所有ip

  -ip IP            ip地址
  -addr ADDR        域名
</code></pre>
<ul>
<li>
<p>首先要从 utecd 中导入数据,启动 bind:
/usr/lib/uraid/scripts/dns/dns-bind.sh -method start_bind</p>
</li>
<li>
<p>添加配置项:</p>
<pre><code>  /usr/lib/uraid/scripts/dns/dns-bind.sh -method add_conf -ip 192.168.1.1 -addr www.abc.com

  注：添加配置项时，可以单独配置域名，然后再配置ip，也可以一同配置，但不能单独配置ip
</code></pre>
</li>
<li>
<p>删除配置项:</p>
<pre><code>  /usr/lib/uraid/scripts/dns/dns-bind.sh -method del_conf -ip 192.168.1.1 -addr www.abc.com
</code></pre>
</li>
<li>
<p>列出所有域名：
/usr/lib/uraid/scripts/dns/dns-bind.sh -method list</p>
</li>
<li>
<p>列出对应域名的 ip：
/usr/lib/uraid/scripts/dns/dns-bind.sh -method list -addr <a href="http://abc.com" target="_blank" rel="noopener noreferrer">abc.com<ExternalLinkIcon/></a></p>
</li>
</ul>
<h4 id="返回值类型" tabindex="-1"><a class="header-anchor" href="#返回值类型" aria-hidden="true">#</a> 返回值类型：</h4>
<pre><code>    添加配置项:
    {'result': {'code': 0, 'msg': ['添加IP成功', '添加域名成功']},
     'data': [{'www.kkk.com.': ['172.14.1.1', '172.14.1.3']},
      {'qwe.kkk.com': ['172.14.1.2']},
      {'www.kkk.com': ['172.14.1.1', '172.14.1.3']}],
     'end': 1}

    列出所有域名：
    {'data': ['localhost.localdomain', 'localhost', 'kkk.come', 'iii.come'],
     'end': 1,
     'result': {'code': 0, 'msg': ['列出所有域名']}}

    列出对应域名的ip：
    {'data': ['172.14.1.2', '172.14.1.1', '172.14.1.3', '172.14.1.4'],
     'end': 1,
     'result': {'code': 0, 'msg': ['找到配置文件：kkk.come 对应的ip']}}
</code></pre>
<h4 id="定义文件" tabindex="-1"><a class="header-anchor" href="#定义文件" aria-hidden="true">#</a> 定义文件</h4>
<p>/usr/lib/uraid/scripts/const.py</p>
<pre><code>    NAMED_PATH = '/etc/named.conf'  - named配置文件地址
    ZONE_CONF_PATH = '/var/named/'  - zone配置文件地址
    UETCD_NAMED = '/dns-bind/named.rfc1912.zones' - uetcd named配置文件地址
    UETCD_ZONE = '/dns-bind/var-named/' - uetcd zone配置文件地址

    返回值：CODE...
</code></pre>
<h4 id="日志" tabindex="-1"><a class="header-anchor" href="#日志" aria-hidden="true">#</a> 日志</h4>
<p>/usr/local/bind/bind.log</p>
<pre><code>用于记录添加或删除配置项的操作日志
如 add_conf 添加信息 to /var/named/配置文件.zone
</code></pre>
<h4 id="使用-uetcdctl-命令查看" tabindex="-1"><a class="header-anchor" href="#使用-uetcdctl-命令查看" aria-hidden="true">#</a> 使用 uetcdctl 命令查看</h4>
<ul>
<li>查看 named.rfc1912.zones 文件
uetcdctl ls dns-bind
uetcdctl get dns-bind/named.rfc1912.zones</li>
<li>查看 zone 的配置文件
uetcdctl ls dns-bind/var-named
uetcdctl get dns-bind/var-named/{文件名}.zone
and
uetcdctl get dns-bind/var-named/{文件名}.arpa</li>
</ul>
<h3 id="脚本业务规则说明" tabindex="-1"><a class="header-anchor" href="#脚本业务规则说明" aria-hidden="true">#</a> 脚本业务规则说明：</h3>
<h4 id="_1-删除-ip-和域名" tabindex="-1"><a class="header-anchor" href="#_1-删除-ip-和域名" aria-hidden="true">#</a> 1.删除 ip 和域名：</h4>
<ul>
<li>
<p>当前规则为执行删除命令必须要有 -addr 参数，通常执行</p>
<p>python3 <a href="http://dns.py" target="_blank" rel="noopener noreferrer">dns.py<ExternalLinkIcon/></a> -method del_conf -addr <a href="http://www.abc.com" target="_blank" rel="noopener noreferrer">www.abc.com<ExternalLinkIcon/></a> -ip 192.168.1.1</p>
</li>
<li>
<p>执行上述命令：</p>
<ul>
<li>
<p>1.若域名 addr 下存在多个 ip，则不删除域名，只删除 ip，并返回 &quot;域名下还存在对应的 ip&quot; 的提示</p>
</li>
<li>
<p>2.若域名 addr 下只有唯一一个 ip，则会默认将 ip 和域名 一同删除，并返回成功</p>
</li>
</ul>
</li>
</ul>
<p>[注意]：若一旦只执行了</p>
<pre><code>-method del_conf -addr www.abc.com 命令 并未携带 -ip 参数，
</code></pre>
<p>会正常删除域名，而不删除 ip。若要再删除 ip，则继续执行</p>
<pre><code>-method del_conf -addr www.abc.com -ip 192.168.1.2
</code></pre>
<p>删除 ip 和域名命令，即可完成继续删除 ip 动作（或是继续添加域名，可恢复原状）</p>
</div></template>


