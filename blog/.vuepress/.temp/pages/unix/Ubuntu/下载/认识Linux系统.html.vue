<template><div><p>linux 系统下一切皆文件,就是说一切都是文件这个概念<br>
/所有文件都源于&quot;/&quot;根<br>
从根开始以下均为树形目录<br>
/boot 存放 boot 配置文件、内核及其他启动文件<br>
/etc 存放系统配置有关的文件<br>
/home 存放普通用户的文件<br>
/mnt 硬盘上手动挂载的文件系统<br>
/opt 存放一些可选程序 入某个程序的测试版本,安装到该目录的程序的所有数据,库文件都存在于同个目录下<br>
/media 自动挂载的硬盘分区以及类似 cd、数码相机等可移动介质<br>
/root 系统管理员的目录 root 如上帝 一般情况不要使用<br>
/bin 存放常用的应用程序(命令文件)<br>
/tmp 临时目录存放临时文件<br>
/usr 这个目录下,你可以找到那些不适合放在/bin 或/etc 目录下的额外工具<br>
/var 存放那些经常被修改的文件,包括各种日志,数据文件<br>
/lib 存放程序运行等等所需要的文件<br>
/lost+found 突然断电时存放的临时文件<br>
/dev 存放设备文件(光驱、硬盘什么的)<br>
/proc /sys 虚拟文件相关 系统的一些信息 如 cat /proc/cpuinfo 伪文件系统、</p>
<pre><code>    挂载:移动设备和操作系统联系起来,挂载之后便可以使用移动设备,这大概就是挂载 想象插u盘便能读取

    swap分区:内存不够时,将物理内存中的一部分空间释放，等那些程序运行时，在从swap分区以便利用,默认值60
        辅助物理内存
        swappiness=0 最大限度的使用内存
        swappiness=0 积极的使用swap分区

    安装软件: apt-get -h sudo apt-get install package   -f install 强制安装
    搜索软件: apt-cache search package
    更新软件: sudo apt-get update
    sudo 更改系统时常用 权限不够时利用 普通用户没有办法安装软件,因此获取管理员的身份执行命令

    /etc/apt/sources.list 设置软件包的获取来源 一旦改了一定要先更新一下 sudo apt-get update 更新源数据
    软件包是网上存储的,因此都是称为源,也就是安装源,网易阿里什么的也都有提供 在sources.list中 有deb 地址可更改

    安装源分为四个部分:
        main、restricted、universe、multiverse

        配置文件的一段内容 tail /etc/sources.list
        第一个deb表示软件包的格式 可以是deb或deb-src 前者表示二进制 binary格式(以编译) 后者表示sources格式(源代码)
        deb(拿了就能直接安装)  -src必须经过一定处理(编译)才能使用

        第二个是URL 即通用资源标识符 可以是以 file(系统) cdrom、http、ftp、copy、rsh、ssh等开头的软件包所在位置

        第三个Distribution 指代发行版本号 具体参考Debian官方文档

    dpkg方式安装:不推荐，因为无法安装依赖包 apt这种方式可以自动安装一系列依赖包 red-hat7下Fedora 和 CentOS开始利用
    dnf来代替yum

    命令:
        -h --help一般情况下即可获取命令帮助信息，可能不准确
        info 按q退出 可获取命令的帮助信息 用的少
        man 用得最多 Manual pagedown/up移动

        date cal tzselect gedit 类似notepad++ ctrl+z/c/e光标跳到行末/u删到行首/w以空格为表示删除/y贴上清除的部分
        /l清屏/r根据缓存找命令
        设置--&gt;键盘查看快捷键
        shutdown -h +5 5分钟后关机 -h 12:00 十二点关机 -c取消关机操作
        .当前目录 ..上一级目录 ../..上多级目录 - 从哪个目录来的回去
        passwd 修改当前用户密码 指定+username
        ls -a 以.开头的文件时隐藏文件,用-a来查看 ./.. 不希望显示 则使用ls -A
        ls -lx 显示详细信息 中间的表示是用户名属于哪个用户组 目录的话一般默认为4096 4k大小
        tree 安装之后树形遍历目录
        cat/tac -n .bash_history 正反查看历史命令 history 10 查看最后10条命令
        less more 都是查看文件操作
        chmod chown 更改权限rwx r-- --x 741 更改用户组


    后续命令不写了,没啥意义,熟练运用常用命令即可,有问题去开篇博客上浏览

    ./: ubuntu用./的方执行文件时 文件必须有x的可执行权限 用ls -l查看
        ubuntu默认安装了俩python2.7和3.5 用gedit写一个helloworld 用python3 p.py执行
        此时用./还不能执行 修改权限chmod a+x p.py 更改p.py的内容首行#!/usr/bin/env python3即可执行
        上面语句叫做#! Shebang 后面跟的用来指定解释器 env 有的系统安装python目录不一样 用env就是找python位置

    useradd -m -s /bin/bash user #通常以这种方式来添加用户,能自动生成/home/user 的一系列配置
    user userpwd 设置密码
    sudo userdel -r user 删除用户
    注:
        若是写成 useradd -d / user
                userdel -r user 明天也不用来了 这里是把user指定到了根目录下 正常应为/home/user
                因此/目录下一切文件被删

    su  用来切换用户
    su -  没有-不加载用户配置文件
    sudo sudo可以以管理员的身份执行某条命令 注意 sudo是有配置文件并可以修改的 可以让用户以某个身份来运行命令
        root ALL=(ALL:ALL)ALL
        两种方式 一种直接找到/etc/sudoers 另一种visudo vi是一种编辑器

    给root设置密码：
        sudo passwd root 设置后用 su - root即可登录root用户


    alias 给命令起别名 若起为 alias cd='rm -rf /'明天就不用来了
</code></pre>
<p>Debian<br>
ubuntu:</p>
<p>Linux 系统：</p>
<p>一、Linux 系统启动过程：<br>
Linux 启动时我们会看到许多启动信息。并不复杂，其过程可以分为 5 个阶段：<br>
1、内核的引导。<br>
2、运行 init。<br>
3、系统初始化。<br>
4、建立终端 。<br>
5、用户登录系统。</p>
<pre><code>内核引导：
    当计算机打开电源后，首先是BIOS开机自检，按照BIOS中设置的启动设备（通常是硬盘）来启动。操作系统接管硬件以后，首先读入
     /boot 目录下的内核文件。
        操作系统 -&gt;    /boot

运行init:
    init 进程是系统所有进程的起点，你可以把它比拟成系统所有进程的老祖宗，没有这个进程，系统中任何进程都不会启动。
    init 程序首先是需要读取配置文件 /etc/inittab。
        /boot   -&gt;    init 进程

运行级别:
    许多程序需要开机启动。它们在Windows叫做&quot;服务&quot;（service），在Linux就叫做&quot;守护进程&quot;（daemon）。
    init进程的一大任务，就是去运行这些开机启动的程序。
    但是，不同的场合需要启动不同的程序，比如用作服务器时，需要启动Apache，用作桌面就不需要。
    Linux允许为不同的场合，分配不同的开机启动程序，这就叫做&quot;运行级别&quot;（runlevel）。也就是说，启动时根据&quot;运行级别&quot;，确定要
    运行哪些程序。
       init 进程    -&gt;    运行级别

Linux系统有7个运行级别(runlevel)：
    运行级别0：系统停机状态，系统默认运行级别不能设为0，否则不能正常启动
    运行级别1：单用户工作状态，root权限，用于系统维护，禁止远程登陆
    运行级别2：多用户状态(没有NFS)
    运行级别3：完全的多用户状态(有NFS)，登陆后进入控制台命令行模式
    运行级别4：系统未使用，保留
    运行级别5：X11控制台，登陆后进入图形GUI模式
    运行级别6：系统正常关闭并重启，默认运行级别不能设为6，否则不能正常启动

系统初始化
    在init的配置文件中有这么一行： si::sysinit:/etc/rc.d/rc.sysinit　它调用执行了/etc/rc.d/rc.sysinit，而rc.sysinit是
    一个bash shell的脚本，它主要是完成一些系统初始化的工作，rc.sysinit是每一个运行级别都要首先运行的重要脚本。

    它主要完成的工作有：激活交换分区，检查磁盘，加载硬件模块以及其它一些需要优先执行任务。
        l5:5:wait:/etc/rc.d/rc 5

    这一行表示以5为参数运行/etc/rc.d/rc，/etc/rc.d/rc是一个Shell脚本，它接受5作为参数，去执行/etc/rc.d/rc5.d/目录下的所有的
    rc启动脚本，/etc/rc.d/rc5.d/目录中的这些启动脚本实际上都是一些连接文件，而不是真正的rc启动脚本，真正的rc启动脚本实际上都
    是放在/etc/rc.d/init.d/目录下。

    而这些rc启动脚本有着类似的用法，它们一般能接受start、stop、restart、status等参数。
    /etc/rc.d/rc5.d/中的rc启动脚本通常是K或S开头的连接文件，对于以 S 开头的启动脚本，将以start参数来运行。
    而如果发现存在相应的脚本也存在K打头的连接，而且已经处于运行态了(以/var/lock/subsys/下的文件作为标志)，则将首先以stop为
    参数停止这些已经启动了的守护进程，然后再重新运行。

    这样做是为了保证是当init改变运行级别时，所有相关的守护进程都将重启。
    至于在每个运行级中将运行哪些守护进程，用户可以通过chkconfig或setup中的&quot;System Services&quot;来自行设定。
        运行级别    -&gt;    系统初始化/etc/init.d

建立终端
    rc执行完毕后，返回init。这时基本系统环境已经设置好了，各种守护进程也已经启动了。

    init接下来会打开6个终端，以便用户登录系统。在inittab中的以下6行就是定义了6个终端：
        1:2345:respawn:/sbin/mingetty tty1
        2:2345:respawn:/sbin/mingetty tty2  ...

    从上面可以看出在2、3、4、5的运行级别中都将以respawn方式运行mingetty程序，mingetty程序能打开终端、设置模式。
    同时它会显示一个文本登录界面，这个界面就是我们经常看到的登录界面，在这个登录界面中会提示用户输入用户名，而用户输入的用户
    将作为参数传给login程序来验证用户的身份。


用户登录系统
    一般来说，用户的登录方式有三种：
    （1）命令行登录
    （2）ssh登录
    （3）图形界面登录

    对于运行级别为5的图形方式用户来说，他们的登录是通过一个图形化的登录界面。登录成功后可以直接进入 KDE、Gnome 等窗口管理器。
    而本文主要讲的还是文本方式登录的情况：当我们看到mingetty的登录界面时，我们就可以输入用户名和密码来登录系统了。

    Linux 的账号验证程序是 login，login 会接收 mingetty 传来的用户名作为用户名参数。
    然后 login 会对用户名进行分析：如果用户名不是 root，且存在 /etc/nologin 文件，login 将输出 nologin 文件的内容，然后退出。
    这通常用来系统维护时防止非root用户登录。只有/etc/securetty中登记了的终端才允许 root 用户登录，如果不存在这个文件，
    则 root 用户可以在任何终端上登录。
    /etc/usertty文件用于对用户作出附加访问限制，如果不存在这个文件，则没有其他限制。
        系统初始化/etc/init.d    -&gt;    用户登录

图形模式与文字模式的切换方式：
    Linux预设提供了六个命令窗口终端机让我们来登录。
    默认我们登录的就是第一个窗口，也就是tty1，这个六个窗口分别为tty1,tty2 … tty6，你可以按下Ctrl + Alt + F1 ~ F6 来切换它们。
    如果你安装了图形界面，默认情况下是进入图形界面的，此时你就可以按Ctrl + Alt + F1 ~ F6来进入其中一个命令窗口界面。
    当你进入命令窗口界面后再返回图形界面只要按下Ctrl + Alt + F7 就回来了。
    如果你用的vmware 虚拟机，命令窗口切换的快捷键为 Alt + Space + F1~F6. 如果你在图形界面下请按Alt + Shift + Ctrl + F1~F6
    切换至命令窗口。
        用户登录    -&gt;    login shell
</code></pre>
<p>补充：<br>
Linux 关机:<br>
在 linux 领域内大多用在服务器上，很少遇到关机的操作。毕竟服务器上跑一个服务是永无止境的，除非特殊情况下，不得已才会关机。<br>
正确的关机流程为：sync &gt; shutdown &gt; reboot &gt; halt<br>
关机指令为：shutdown ，你可以 man shutdown 来看一下帮助文档。</p>
<pre><code>    例如你可以运行如下命令关机：
        sync 将数据由内存同步到硬盘中。
        shutdown 关机指令，你可以man shutdown 来看一下帮助文档。例如你可以运行如下命令关机：
        shutdown –h 10 ‘This server will shutdown after 10 mins’ 这个命令告诉大家，计算机将在10分钟后关机，并且会显示在
            登陆用户的当前屏幕中。
        Shutdown –h now 立马关机
        Shutdown –h 20:25 系统会在今天20:25关机
        Shutdown –h +10 十分钟后关机
        Shutdown –r now 系统立马重启
        Shutdown –r +10 系统十分钟后重启
        reboot 就是重启，等同于 shutdown –r now
        halt 关闭系统，等同于shutdown –h now 和 poweroff
    最后总结一下，不管是重启系统还是关闭系统，首先要运行 sync 命令，把内存中的数据写到磁盘中。
    关机的命令有 shutdown –h now halt poweroff 和 init 0 , 重启系统的命令有 shutdown –r now reboot init 6。
</code></pre>
<p>二、Linux 系统目录结构：<br>
<a href="http://www.runoob.com/linux/linux-system-contents.html" target="_blank" rel="noopener noreferrer">http://www.runoob.com/linux/linux-system-contents.html</a></p>
<p>三、Linux 文件基本属性：<br>
Linux 系统是一种典型的多用户系统，不同的用户处于不同的地位，拥有不同的权限。为了保护系统的安全性，Linux 系统对不同的用户访问<br>
同一文件（包括目录文件）的权限做了不同的规定。</p>
<pre><code>在Linux中我们可以使用ll或者ls –l命令来显示一个文件的属性以及文件所属的用户和组
在Linux中第一个字符代表这个文件是目录、文件或链接文件等等。bin 文件的第一个属性用&quot;d&quot;表示，代表是一个目录文件。
    [d]: 目录     [-]: 文件     [l]: link文件
    [b]: 表示为装置文件里面的可供储存的接口设备(可随机存取装置)
    [c]: 表示为装置文件里面的串行端口设备，例如键盘、鼠标(一次性读取装置)。
    [r]: 代表可读(read)     [w]: 代表可写(write)    [x]: 代表可执行(execute)。

rwx是以三个为一组 文件类型 + 三个大权限进行组合，rwx的位置不会变，若没有权限则出现 [-]
</code></pre>
</div></template>


