<template><div><p>常用命令备忘速查</p>
<!--more-->
<h5 id="netstat-ntlp" tabindex="-1"><a class="header-anchor" href="#netstat-ntlp" aria-hidden="true">#</a> netstat -ntlp</h5>
<p>场景：出现 http500 时，利用 netstat -tnlp 来排查</p>
<pre><code>-n或--numeric：直接使用ip地址，而不通过域名服务器
-t或--tcp：显示TCP传输协议的连线状况
-l或--listening：显示监控中的服务器的Socket
-p或--programs：显示正在使用Socket的程序识别码和程序名称（显示进程pid，配合kill杀死）
</code></pre>
<h4 id="ps-ef-aux" tabindex="-1"><a class="header-anchor" href="#ps-ef-aux" aria-hidden="true">#</a> ps -ef | -aux</h4>
<p>场景：查看进程，显示状态</p>
<pre><code>ps -ef |less 命令： ps查看进程所有信息并通过less分页显示
ps -ef | grep etutorservice : 利用管道符精确查询需要的进程，之后kill第一个的总进程即可。
</code></pre>
<h4 id="chmod-改权限" tabindex="-1"><a class="header-anchor" href="#chmod-改权限" aria-hidden="true">#</a> chmod：改权限</h4>
<p>场景：更改无法访问的文件权限（修改某个目录或文件的访问权限）</p>
<pre><code>语法：chmod [-cfvR] [--help] [--version] [who] [+ | - | =] [mode] 文件名
例子：chmod -R 777 /home/linux 使其拥有所有权限
     chmod +x ./test.sh 使 test.sh 脚本具有可执行权限 （为啥要 ./ ：若没有./ 则去PATH中寻找脚本 ./意味当前目录）
</code></pre>
<h4 id="chown-改组" tabindex="-1"><a class="header-anchor" href="#chown-改组" aria-hidden="true">#</a> chown：改组</h4>
<p>场景：更改文件的用户名和用户组</p>
<pre><code>语法：chown 用户名:组名 文件路径
例1：chown root:root /tmp/tmp1
    就是把tmp下的tmp1的用户名和用户组改成root和root（只修改了tmp1的属组）。

例2：chown -R root:root /tmp/tmp1
    就是把tmp下的tmp1下的所有文件的属组都改成root和root。-R指代递归
</code></pre>
<h4 id="more-less-cat" tabindex="-1"><a class="header-anchor" href="#more-less-cat" aria-hidden="true">#</a> more &amp; less &amp; cat</h4>
<pre><code>more -s testfile：
    按space显示下一页，b（back）显示上一页，s把所有行空白替换为一行

less [参数] 文件：
     好处： less 可以随意浏览文件，而 more 仅能向前移动，却不能向后移动。less 在查看之前不会加载整个文件。

cat [参数] 文件：
    cat 命令用于连接文件并打印到标准输出设备上。过于大的文件查看时不要用cat命令，会消耗内存可能把服务器拖崩。
</code></pre>
<h4 id="ssh" tabindex="-1"><a class="header-anchor" href="#ssh" aria-hidden="true">#</a> ssh</h4>
<p>SSH 为 Secure Shell 的缩写，由 IETF 的网络工作小组（Network Working Group）所制定。为建立在应用层和传输层基础上的安全协议。</p>
<p>场景：需要远程连接</p>
<pre><code>例：ssh ubuntu@192.168.0.225   以ubuntu身份登入服务器（然后输入用户名密码即可登录）
    -p 22 表示端口为22，默认通常为22

公钥登录：
    ssh-keygen：                 用户提供自己的公钥，生成
    ssh-copy-id user@host        将公钥传送到远程主机host上面，

    在远程主机的.ssh文件下 authorized_keys里会记录认证信息，若删除则下次需要输入密码

service ssh restart             重启远程主机的ssh服务
</code></pre>
<h4 id="scp" tabindex="-1"><a class="header-anchor" href="#scp" aria-hidden="true">#</a> scp</h4>
<p>scp 就是远程复制文件，可以把 本地复制到远程、远程复制到本地、远程复制到远程等等，只要之前 ssh 是互通的即可</p>
<pre><code>scp 待复制的文件路径 将要复制到的文件路径
例：
scp /etc/hosts 172.16.120.104:/etc/hosts    # 本地复制到远程：从本地 复制到远程104

scp 172.16.120.103:/etc/hosts /etc/hosts    # 远程复制到本地：从远程103 复制到本地

scp 172.16.120.103:/etc/hosts 172.16.120.104/etc/hosts  # 远程复制到远程：从远程103 复制到 远程104 需要输两次密码
</code></pre>
<h4 id="alias" tabindex="-1"><a class="header-anchor" href="#alias" aria-hidden="true">#</a> alias</h4>
<p>场景：利用别名简化命令</p>
<pre><code>alias cr=&quot;cross=http://172.16.0.225:9300 npm start&quot; 简化一串命令为cr
若每次自动生效，需要 vim ~/.bashrc 修改 bashrc 文件，在最后添加以上命令。
source ~/.bashrc 使环境变量立即生效
</code></pre>
<h4 id="ping" tabindex="-1"><a class="header-anchor" href="#ping" aria-hidden="true">#</a> ping</h4>
<p>走的是 ICMP 协议：（Internet Control Message Protocol）Internet 控制报文协议。详见本节笔记 6.3</p>
<pre><code>-c：指定ping的次数
</code></pre>
<h4 id="tar-zxvf" tabindex="-1"><a class="header-anchor" href="#tar-zxvf" aria-hidden="true">#</a> tar -zxvf</h4>
<p>场景：解压.tar.gz 操作</p>
<pre><code>例：tar -zxvf xx.tar.gz
tar 解压缩命令详解
-c: 建立压缩档案

-x：解压
-t：查看内容
-r：向压缩归档文件末尾追加文件
-u：更新原压缩包中的文件

这五个是独立的命令，压缩解压都要用到其中一个，可以和别的命令连用但只能用其中一个。下面的参数是根据需要在压缩或解压档案时可选的。
</code></pre>
<p>范例一：将整个 /etc 目录下的文件全部打包成为 /tmp/etc.tar</p>
<pre><code>[root@linux ~]# tar -cvf /tmp/etc.tar /etc&lt;==仅打包，不压缩！
[root@linux ~]# tar -zcvf /tmp/etc.tar.gz /etc&lt;==打包后，以 gzip 压缩
[root@linux ~]# tar -jcvf /tmp/etc.tar.bz2 /etc&lt;==打包后，以 bzip2 压缩
</code></pre>
<p>范例二：查阅上述 /tmp/etc.tar.gz 文件内有哪些文件？</p>
<pre><code>[root@linux ~]# tar -tvf /tmp/etc.tar
[root@linux ~]# tar -ztvf /tmp/etc.tar.gz
# 由於我们使用 gzip 压缩，所以要查阅该 tar file 内的文件时，
# 就得要加上 z 这个参数了！这很重要的！
</code></pre>
<p>范例三：将 /tmp/etc.tar 解压到/etc 目录下（若文件存在便覆盖）</p>
<pre><code>tar zxvf /tmp/etc.tar.gz -C /
[注意]： 该命令没有 - ，这个是将绝对路径下 /tmp/etc.tar.gz 的所有文件解压对对应 / 目录下的各个文件打包路径，一开始文件是
/etc/xx文件 那么就解压对应目录 / -&gt; /etc/xx
</code></pre>
<h4 id="unzip-file" tabindex="-1"><a class="header-anchor" href="#unzip-file" aria-hidden="true">#</a> unzip file</h4>
<p>场景：解压.tar.gz 操作</p>
<pre><code>例：unzip file.zip
-d &lt;目录&gt;: 解压到指定目录下
-P &lt;密码&gt;：使用zip的密码选项
</code></pre>
<h5 id="快捷键" tabindex="-1"><a class="header-anchor" href="#快捷键" aria-hidden="true">#</a> 快捷键：</h5>
<ul>
<li>Home 跳转到命令开头，End 跳转到命令结尾</li>
<li>ctrl 按单词跳转，按上箭头显示上一条命令</li>
</ul>
<p>linux awk tac 查看日志</p>
<h5 id="dos2unix" tabindex="-1"><a class="header-anchor" href="#dos2unix" aria-hidden="true">#</a> dos2unix</h5>
<p>场景：当前目录下所有 <strong>windows</strong> 格式的文件转为 <strong>linux</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">find</span> <span class="token builtin class-name">.</span> <span class="token parameter variable">-type</span> f <span class="token parameter variable">-exec</span> dos2unix <span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token punctuation">\</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></div></template>


