<template><div><p>常用命令备忘速查</p>
<!--more-->
<h5 id="netstat-ntlp" tabindex="-1"><a class="header-anchor" href="#netstat-ntlp"><span>netstat -ntlp</span></a></h5>
<p>场景：出现 http500 时，利用 netstat -tnlp 来排查</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">netstat</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -tnlp</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">-n或--numeric：直接使用ip地址，而不通过域名服务器</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">-t或--tcp：显示TCP传输协议的连线状况</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">-l或--listening：显示监控中的服务器的Socket</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">-p或--programs：显示正在使用Socket的程序识别码和程序名称（显示进程pid，配合kill杀死）</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="ps-ef-aux" tabindex="-1"><a class="header-anchor" href="#ps-ef-aux"><span>ps -ef | -aux</span></a></h4>
<p>场景：查看进程，显示状态</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">ps</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -ef</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> |</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">less</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 命令：</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> ps查看进程所有信息并通过less分页显示</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">ps</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -ef</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> | </span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">grep</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> etutorservice</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> :</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 利用管道符精确查询需要的进程，之后kill第一个的总进程即可。</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="chmod-改权限" tabindex="-1"><a class="header-anchor" href="#chmod-改权限"><span>chmod：改权限</span></a></h4>
<p>场景：更改无法访问的文件权限（修改某个目录或文件的访问权限）</p>
<p><strong>语法：</strong> chmod [-cfvR] [--help] [--version] [who] [+ | - | =] [mode] 文件名</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 使其拥有所有权限</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">chmod</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -R</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 777</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /home/linux</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> </span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 使 test.sh 脚本具有可执行权限</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">chmod</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> +x</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> ./test.sh</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="chown-改组" tabindex="-1"><a class="header-anchor" href="#chown-改组"><span>chown：改组</span></a></h4>
<p><strong>场景：</strong> 更改文件的用户名和用户组</p>
<p>**语法： **chown 用户名:组名 文件路径</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 就是把tmp下的tmp1的用户名和用户组改成root和root（只修改了tmp1的属组）</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">chown</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> root:root</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /tmp/tmp1</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 把tmp下的tmp1下的所有文件的属组都改成root和root。-R指代递归</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">chown</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -R</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> root:root</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /tmp/tmp1</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="more-less-cat" tabindex="-1"><a class="header-anchor" href="#more-less-cat"><span>more &amp; less &amp; cat</span></a></h4>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">more</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -s</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> testfile：</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 按space显示下一页，b（back）显示上一页，s把所有行空白替换为一行</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">less</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> [参数] 文件</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 好处： less 可以随意浏览文件，而 more 仅能向前移动，却不能向后移动。less 在查看之前不会加载整个文件。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">cat</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> [参数] 文件</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># cat 命令用于连接文件并打印到标准输出设备上。过于大的文件查看时不要用cat命令，会消耗内存可能把服务器拖崩。</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="ssh" tabindex="-1"><a class="header-anchor" href="#ssh"><span>ssh</span></a></h4>
<p><strong>SSH</strong> 为 Secure Shell 的缩写，由 IETF 的网络工作小组（Network Working Group）所制定。为建立在应用层和传输层基础上的安全协议。</p>
<p>场景：需要远程连接</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">例：ssh</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> ubuntu@192.168.0.225</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">   以ubuntu身份登入服务器（然后输入用户名密码即可登录）</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">    -p</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 22</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 表示端口为22，默认通常为22</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">公钥登录：</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">    ssh-keygen：</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">                 用户提供自己的公钥，生成</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">    ssh-copy-id</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> user@host</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">        将公钥传送到远程主机host上面，</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">    在远程主机的.ssh文件下</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> authorized_keys里会记录认证信息，若删除则下次需要输入密码</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">service</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> ssh</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> restart</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">             重启远程主机的ssh服务</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="scp" tabindex="-1"><a class="header-anchor" href="#scp"><span>scp</span></a></h4>
<p>scp 就是远程复制文件，可以把 本地复制到远程、远程复制到本地、远程复制到远程等等，只要之前 ssh 是互通的即可</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># scp 待复制的文件路径 将要复制到的文件路径</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 本地复制到远程：从本地 复制到远程104</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">scp</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /etc/hosts</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 172.16.120.104:/etc/hosts</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    </span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 远程复制到本地：从远程103 复制到本地</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">scp</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 172.16.120.103:/etc/hosts</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /etc/hosts</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    </span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 远程复制到远程：从远程103 复制到 远程104 需要输两次密码</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">scp</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 172.16.120.103:/etc/hosts</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 172.16.120.104/etc/hosts</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="alias" tabindex="-1"><a class="header-anchor" href="#alias"><span>alias</span></a></h4>
<p>场景：利用别名简化命令</p>
<pre><code>alias cr=&quot;cross=http://172.16.0.225:9300 npm start&quot; 简化一串命令为cr
若每次自动生效，需要 vim ~/.bashrc 修改 bashrc 文件，在最后添加以上命令。
source ~/.bashrc 使环境变量立即生效
</code></pre>
<h4 id="ping" tabindex="-1"><a class="header-anchor" href="#ping"><span>ping</span></a></h4>
<p>走的是 <strong>ICMP</strong> 协议：（Internet Control Message Protocol）Internet 控制报文协议。详见本节笔记 6.3</p>
<pre><code>-c：指定ping的次数
</code></pre>
<h4 id="tar-zxvf" tabindex="-1"><a class="header-anchor" href="#tar-zxvf"><span>tar -zxvf</span></a></h4>
<p>场景：解压 <code v-pre>.tar.gz</code> 操作，例：</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> tar</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -zxvf</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> xx.tar.gz</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">    -c:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 建立压缩档案</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">    -x：解压</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">    -t：查看内容</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">    -r：向压缩归档文件末尾追加文件</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">    -u：更新原压缩包中的文件</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol>
<li>
<p>将整个 <code v-pre>/etc</code> 目录下的文件全部打包成为 <code v-pre>/tmp/etc.tar</code></p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 仅打包，不压缩</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">tar</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -cvf</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /tmp/etc.tar</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /etc</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> </span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 打包后，以 gzip 压缩</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">tar</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -zcvf</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /tmp/etc.tar.gz</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /etc</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 打包后，以 bzip2 压缩</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">tar</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -jcvf</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /tmp/etc.tar.bz2</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /etc</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>查阅上述 <code v-pre>/tmp/etc.tar.gz</code> 文件内有哪些文件？</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">tar</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -tvf</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /tmp/etc.tar</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">tar</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -ztvf</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /tmp/etc.tar.gz</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># -v 查看</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># -z 使用 gzip 压缩</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>将 <code v-pre>/tmp/etc.tar</code> 解压到 <code v-pre>/etc</code> 目录下（<em><strong>若文件存在则覆盖</strong></em> ）</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">tar</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> zxvf</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /tmp/etc.tar.gz</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -C</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 一开始文件是 /etc/xx 文件 则会解压到对应目录 / 下 -> /etc/xx</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h4 id="unzip-file" tabindex="-1"><a class="header-anchor" href="#unzip-file"><span>unzip file</span></a></h4>
<p>场景：解压.tar.gz 操作，例如：</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> unzip</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> file.zip</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">	-d</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> &#x3C;</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">目</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">录></span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 解压到指定目录下</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">	-P</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> &#x3C;</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">密</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">码></span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">：使用zip的密码选项</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">	</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 压缩</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> zip</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -r</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> file.zip</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> ./file</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> </span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">         `</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">压缩包名</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">`</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">  `</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">文件名</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> / 文件1 ~ N`</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="快捷键" tabindex="-1"><a class="header-anchor" href="#快捷键"><span>快捷键：</span></a></h5>
<ul>
<li>Home 跳转到命令开头，End 跳转到命令结尾</li>
<li>ctrl 按单词跳转，按上箭头显示上一条命令</li>
</ul>
<p>linux awk tac 查看日志</p>
<h5 id="dos2unix" tabindex="-1"><a class="header-anchor" href="#dos2unix"><span>dos2unix</span></a></h5>
<p>场景：当前目录下所有 <strong>windows</strong> 格式的文件转为 <strong>linux</strong></p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">find</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> .</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -type</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> f</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -exec</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> dos2unix</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> {}</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> \;</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></div></template>


