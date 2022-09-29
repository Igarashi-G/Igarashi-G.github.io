---
title: 认识Linux系统
order: 2
---

Linux 系统:www.cnblogs.com/resn/p/5800922.html http://www.cnblogs.com/resn/（注！废弃）

linux 系统下一切皆文件,就是说一切都是文件这个概念
/所有文件都源于"/"根
从根开始以下均为树形目录
/boot 存放 boot 配置文件、内核及其他启动文件
/etc 存放系统配置有关的文件
/home 存放普通用户的文件
/mnt 硬盘上手动挂载的文件系统
/opt 存放一些可选程序 入某个程序的测试版本,安装到该目录的程序的所有数据,库文件都存在于同个目录下
/media 自动挂载的硬盘分区以及类似 cd、数码相机等可移动介质
/root 系统管理员的目录 root 如上帝 一般情况不要使用
/bin 存放常用的应用程序(命令文件)
/tmp 临时目录存放临时文件
/usr 这个目录下,你可以找到那些不适合放在/bin 或/etc 目录下的额外工具
/var 存放那些经常被修改的文件,包括各种日志,数据文件
/lib 存放程序运行等等所需要的文件
/lost+found 突然断电时存放的临时文件
/dev 存放设备文件(光驱、硬盘什么的)
/proc /sys 虚拟文件相关 系统的一些信息 如 cat /proc/cpuinfo 伪文件系统、

        挂载:移动设备和操作系统联系起来,挂载之后便可以使用移动设备,这大概就是挂载 想象插u盘便能读取

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
            设置-->键盘查看快捷键
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

Debian
ubuntu:
