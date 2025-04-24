<template><div><p>Ubuntu: 注 上篇记录的博客大概是 linux 和旗下 redhat 适用的 有些 ubuntu 稍有区别 更详细的在博客中浏览 这里只为温故有印象（已废弃，改！！）</p>
<pre><code>用户配置文件 :
    已知useradd -m -s /bin/bash user 能系统自动创建好一个用户 那么当自定义时 useradd username 则需要知道
    几个用户配置文件.bash_history 存放历史命令 .bash_logout 用户登出 .bashrc .profile
    一般在cp /etc/skel/下拷贝
    source命令: 加载配置文件 一般上述没有生效(终端还是$符号没有用户名提示时)则用source .bashrc 来再加载一遍

    当批量安装时 sudo apt-get install 软件名 -y(批量软件命令) -y表示全部同意 yes 直接赋值安装后自动安装
    etc下的配置文件都是个所有用户配置的,其中包括 /bash.bashrc  /profile 等 都是全局性的

配置环境变量：·····
    一般安装软件都有/software/bin 下面目录有可执行命令
    ~/.profile---&gt;PATH=&quot;要添加的路径:$PATH&quot; 这里是修改当前用户的 设置完之后记得source
    所有用户则是 /etc/profile ---&gt;同上 但是修改所有人的这种方式不推荐 一般只修改当前用户即可

    env:查看当前环境变量 env
    export:设置或显示环境变量 export name=&quot;SN&quot;
    source:在当前环境下读取并执行FileName中的命令。该filename文件可以无执行权限 source /etc/profile

echo: erko
    默认为空换行 -n不换行 类似print echo $变量名 printf不换行==echo -n 一般不用忽略

管道符：|
    把前一条命令执行的结果给后一条使用 如 cat -n p.py |sort -rn |wc -l

重定向:
    &gt;xx.txt 文件空 若文件不存在则创建 存在则清空 类似python的w模式
    echo &quot;123&quot;&gt;&gt;xx.txt 追加123到文件

查找:
    locate 查找所有 包括路径 /etc/sh 只要路径有就能查找出来 不会扫描磁盘,而是从数据库里面拿
    locate -i ~/a 搜索用户主目录下所有以a开头的文件并忽略大小写
    locate是从数据库查找 每天晚上4点更新 执行sudo updatedb能更新数据库之后即可查找 因此查找当天的文件先更新

    find 是把磁盘目录全部遍历一遍
    find /home -iname filename 根据文件名查找 i不区分大小写 *通配符
    find /home/ -type f根据文件类型查找
    反引号`与~在一起 作用是把里面的当做命令来执行 如:ls -a `sudo find / -type f普通文件/l连接/d目录`
    sudo find /home/ -maxdepth 2 -type f 指定目录深度来查找 max/min
    sudo find /home -size +10M 根据文件大小来查找 b块(512字节)c字节w字(2字节)k千字节 -10k 小于10k
    sudo find /home/ -mtime n 其中n为数字 n为5就是 第五天一天的时间段 +5表示五天前的 -5表示后的
    对查找结果进行处理 -exec -ok 用的多一点针对删除等敏感操作
    很多操作,不详细说明 见博客

挂载:挂载后就像系统的某个目录可以复制查看等 就是不能写
    df -Th 查看分区如何挂载的 装系统时默认一个分区/dev/sda1
    du -sh ./* 查看文件下的目录及大小
    du -sh . 查看文件一共有多大 s后面的目录只显示一层 h每一个文件最大的大小

    mount:挂载 可以挂载光驱镜像硬盘什么的
        sudo mount /dev/cdrom /mnt 此时mnt就是一个挂载点 ls /mnt/挂载了一个光盘
    umount:卸载 先挂载新的首先要先卸载再挂载 -l强制卸载
        sudo umount /mnt
    -o参数 remount 可以不卸载就挂载 还可以指定属性,模式

压缩:linux常用
    tar:
        -c 创建一个压缩文件create
        -z 是否同时具有gzip的属性?亦是否需要用gzip压缩
        -j 是否同时具有bzip2的属性?亦是否需要用bzip2压缩
        -t 查看tarfile里面的文件
        -x 解开一个压缩文件的参数指令
        -v 压缩文件的过程中显示文件！常用 但不建议用在背景执行过程中
        -f 使用档名 请留意在f之后要立即接文件名
        -p 使用原来文件的属性(属性不会依据使用者而改变)
        -P 可以使用绝对路径来压缩
        -N 比后面接的日期还要新才能打包到新建文件中(yyyy/mm/dd)
        示例:
            tar czvf this.tar.gz ./*txt  将目录下面所有的.txt文件打包压缩归档到this.tar.gz当中
            tar xzvf this.tar.gz ./ 将当前目录下的this.tar.gz 中的文件解压到当前文件中
        不用zj的就只压缩 不打包
            tar -xf this.tar.gz -C /tmp 以指定路径的方式来解压目标到/tmp路径下

Linux三剑客之一:
    grep:匹配一个给定的模式 其实就是用来做检索的 搜索 过滤
        -c --count 计算符合样式的列数
        -l --file--with--matches 列出文件名
        -i --ignore--case 不区分大小写
        -v --revert-match 显示不包含匹配文本的所有行
        -E 使用正则表达式RE  指定-E解析为一定使用正则表达式

    正则·简 :linux下用的不要太多 几乎没有用不到的地方 后面学python的re模块才真正开始(略有不同)
        ^: 匹配开头 这里指的真的只是开头   在[]中^表示取反
        $: 匹配结尾
        []: 范围匹配
        [a-z]:匹配所有小写字母
        [A-Z]:大小同上
        [0-9]:匹配所有数字 [^0-9] 所有非数字
        .: 匹配单个字符  也就是匹配任意字符 当 grep -E &quot;.&quot; this.txt 时匹配所有字符
        *: 表示*前面的内容出现过0次或多次  如[a-z]*表示 0个或多个小写字母 只和前面的有关 就算[0-9][a-z]*也只和az有关
        +: 表示+前面的内容出现过1次或多次  至少出现一次
        ?: 表示?前面的内容出现过0次或1次  至多出现一次

        因此开头通常为 ^sddsds$来表达
        以上必须记下来 必须!!! 应用范围太广

Linux三剑客之二:
    sed:流编辑器,一次处理一行的数据
    sed [-nefr] [动作] [文件]  模式  下面介绍参数
        -n: 使用安静模式(slient).在一般的sed用法中,所有来自STDIN的数据一般都会被列出到终端上。但如果加上-n参
            数后,则只有经过sed特殊处理的一行才会被列出来
        -e: 用的不多 在命令模式上进行sed编辑
        -f: 直接将sed的动作写在一个文件内 -f filename 则可以运行filename内的sed动作
        -r: sed的动作支持的是延伸型正规表示法语法。(默认是基础正规表示法语法)
        -i: 直接修改读取的文件内容,而不是输出到终端

    动作说明:[n1[,n2]]动作:
        n1,n2 不一定存在,一般代表选择进行动作的行数,比如,如果我的动作是需要在10到20行之间进行的,则10,20动作为1

    动作:
        #a:新增,a后面可以接字符串,而这些字符串会在新的下一行出现
        #c:取代,同a可以接字符串,会取代 n1,n2 之间的行
        #d:删除,因为删除 因此不接任何东西
            sed &quot;3d&quot; 删除第三行 sed &quot;1,3d&quot;一到三行 sed &quot;/word/,13d&quot;删除目标单词所在的行到第13行
            +3则是之后的三行 1~2d 保留偶数行 sed &quot;/56\|76/d&quot;匹配行中有56或是76的则删除 |要转义 不然就当成普通字符

        #i:插入,同a,c  i的后面可以接字符串,而这些字符串会出现在新的上一行
            sed &quot;3i 2333&quot; 2333则会出现在第三行的上面

        #p:列印,亦将某个选择的数据印出。通常p会与参数sed -n 一起运行 用的也不少
            sed &quot;3p&quot; 又多打印了第三行一次
            sed -n &quot;3p&quot; 只打印了第三行 因为-n只打印了经过处理的行 sed -n &quot;3p;5p&quot; 只打印了三五行
            sed -n &quot;3~5p&quot; 从第三行开始隔五行打印
            sed -n &quot;$=&quot; 显示文件行数   sed -n &quot;$&quot;p 打印最后一行 p放在里面要转义 &quot;\$p&quot;

        #s:替换 可以直接进行取代的工作。通常这个d的动作可以搭配正规表示法,例如1,20s/old/new/g 前面的还好但s用的最多
            sed &quot;s///&quot; 标准写法&gt;。&lt;    sed &quot;s/than/2333/&quot; 替换than为2333
            sed -r &quot;s/(th)(an)/\2BOOM~\1/&quot; 转义2转义1 -r 双括号进行分组   输出 anBOOM~th

Linux三剑客之三: sed&amp;awk 曾被&quot;饭醉团伙&quot;业余爱好者翻译过
    awk:一个强大的文本分析工具,相对于grep的查找,sed的编辑,awk在其对数据分析并生成报告时,显得尤为强大.
        简单来说awk就是吧文件逐行的读入,以空格为默认分隔符将每行切片,切开的部分再进行各种分析处理

    awk [-F field-separator] 'commands' input-file(s) 以上为命令行调用方式
    其中 commands是真正awk命令 [-F域分隔符] 是可选的。 input-file(s) 是待处理的文件  在awk中 文件每一行 由
    域分隔符分开的每一项称为一个域 通常 在不指定-F域分隔符的情况下 默认的域分隔符是空格
        例：tail -10 /etc/passwd | awk -F&quot;:&quot; '{print $1}' 取10行passwd下的以&quot;:&quot;分割的第一个单词 0就是所有了
    awk的工作流程:
        读入有'\n'换行符分割的一条记录,然后将记录按指定的 域分隔符划分域,填充域, $0则表示所有域 $n表示第n个域
        默认域分隔符是空白键 或 &quot;tab&quot;键 所以$1表示登录用户 $3 表示登录用户ip 以此类推
    awk常用内置变量:
        ARGC    命令行的参数个数  awk '{print ARGC,ARGV[0],ARGV[1],FILENAME}' a.txt
        ARGV    命令行参数排列    其实很少用
        ENVIRON    支持队列中系统环境变量的使用
        FILENAME    awk浏览文件名
        FNR    浏览文件的记录数
        FS    设置输入域分隔符 等价于命令 -F选项  awk '{FS=&quot;:&quot;}{print NF}' /etc/passwd 这大概就是它的用法吧QAQ
        NF    浏览记录的域的个数
        NR    已读的记录数
        OFS    输出域分隔符 awk 'BEGIN{OFS=&quot;_&quot;;}{print $1,$2,$3}'  a.txt  注意别用$0小心被坑
        ORS    输出记录分隔符
        RS    控制记录分隔符
        使用方法 awk '{print ARGC}' a.txt
        BEGIN就是在开始之前做一些预定义的动作 END则是结束后去做

        awk -F&quot;:&quot; '{printf(&quot;filename:%10s,linenumber:%s,columns:%s,linecontent:%s\n&quot;,FILENAME,
        NR,NF,$0)}' /etc/passwd 这种指令只是更放便阅读


vi 和 vim:
    vim是vi的升级版 是一款强大的编辑器 有许多命令 小抄请见一章博客
    set nu 临时显示行号 若想要每次都显示的话就把 set nu 写到vimrc里
    ctrl + r重做 u撤销 ^光标跳到行首 $光标跳到行尾
</code></pre>
</div></template>


