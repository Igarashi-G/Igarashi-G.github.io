<template><div><p>一些操作系统整理</p>
<!-- more -->
<h2 id="_1-操作系统" tabindex="-1"><a class="header-anchor" href="#_1-操作系统" aria-hidden="true">#</a> 1. 操作系统</h2>
<h3 id="_1-1-操作系统架构" tabindex="-1"><a class="header-anchor" href="#_1-1-操作系统架构" aria-hidden="true">#</a> 1.1 操作系统架构</h3>
<p>其常用的操作系统架构如下</p>
<h4 id="_1-1-1-windows-架构" tabindex="-1"><a class="header-anchor" href="#_1-1-1-windows-架构" aria-hidden="true">#</a> 1.1.1 windows 架构</h4>
<p>如下图所示</p>
<img src="@source/unix/Linux/操作系统/img/windows操作系统架构.jpg" />  
<p><strong>windows</strong> 分为 <strong>用户</strong> 和 <strong>内核</strong> 两种模式，区别是对系统数据的访问权限不同，<strong>内核</strong> 有更高的权限（<em>为了保护操作系统</em> ），<strong>代码是运行在用户模式下</strong></p>
<p>当需要使用内核时，应用程序会通过 <strong>硬件指令</strong> 切换到内核模式，完成请求后再切回用户模式，因此，有时 <strong>多线程程序不一定高效</strong> ，因为线程切换会占用很多 <strong>CPU周期</strong></p>
<h4 id="_1-1-2-unix-层次架构" tabindex="-1"><a class="header-anchor" href="#_1-1-2-unix-层次架构" aria-hidden="true">#</a> 1.1.2 Unix 层次架构</h4>
<p><a href="https://www.w3cschool.cn/unix/8a4k1pd2.html" target="_blank" rel="noopener noreferrer">UNIX<ExternalLinkIcon/></a> 架构如下图所示</p>
<img src="@source/unix/Linux/操作系统/img/Unix操作系统架构.jpg" /> 
<blockquote>
<p><strong>hardware</strong>：硬件，比如屏幕显示，键盘输入等
<strong>kernel：</strong> 内核，负责连接硬件和内核，只有通过内核才能操作硬件
<strong>shell：</strong> 可以理解为一个框架（更多的翻译将其翻译为壳），通过这个框架外层的应用可以调用内核</p>
<p><strong>application programs：</strong> 应用程序，比如数据库（<em><strong>DBMS</strong></em> ），邮件服务（<em><strong>mail</strong></em> ）等，他们可能需要使用到硬件，这时候就要通过 <strong>shell</strong> 去调用内核，继而操作硬件</p>
</blockquote>
<p>总结所有版本的 <strong>UNIX</strong> 的主要概念包含以下四个基本要素:</p>
<ul>
<li>**内核：**内核是操作系统的核心。它与硬件和大多数任务像内存管理任务调度和文件管理交互。</li>
<li><strong>Shell：</strong> 是用于处理您的请求的实用程序。当您在您的终端键入命令时，<strong>Shell</strong> 将命令解释并调用你想要的程序。<strong>Shell</strong> 使用标准语法的所有命令，<strong>C Shell, Bourne Shell 和 Korn Shell</strong>  是最著名的 <strong>shell</strong> ，适用于大多数 <strong>UNIX</strong> 变体</li>
<li>**命令和实用程序：**有各种各样的命令和实用程序可供您使用。<strong>cp</strong>, <strong>mv</strong>, <strong>cat</strong> 和 <strong>grep</strong> 等是命令和实用程序的几个例子。有超过 <strong>250</strong> 标准命令，再加上通过第三方软件提供的其他命令</li>
<li>**文件和目录：**在 <strong>UNIX</strong> 中的所有数据被都组织到文件中，所有文件被都组织到目录中，这些目录被组织成一个称为文件系统的树状结构</li>
</ul>
<h4 id="_1-1-3-linux-架构" tabindex="-1"><a class="header-anchor" href="#_1-1-3-linux-架构" aria-hidden="true">#</a> 1.1.3 <strong>Linux</strong> 架构</h4>
<h3 id="中断" tabindex="-1"><a class="header-anchor" href="#中断" aria-hidden="true">#</a> 中断</h3>
</div></template>


