<template><div><p><strong>MySQL</strong>，烂大街的关系型数据库，但我依然没有学好</p>
<!-- more -->
<h2 id="_1-安装" tabindex="-1"><a class="header-anchor" href="#_1-安装" aria-hidden="true">#</a> 1. 安装</h2>
<Tabs :data='[{"title":"CentOS"},{"title":"Window"}]'>
<template #tab0="{ title, value, isActive }">
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 安装</span>
yum <span class="token function">install</span> mysql-server <span class="token parameter variable">-y</span>

<span class="token comment"># 启动</span>
systemctl start mysqld

<span class="token comment"># 连接 mysql -h host -u user -p password</span>
mysql <span class="token parameter variable">-h</span> <span class="token number">127.0</span>.0.1 <span class="token parameter variable">-u</span> root <span class="token parameter variable">-p</span>

<span class="token comment"># 常见错误</span>
ERROR <span class="token number">2002</span> <span class="token punctuation">(</span>HY000<span class="token punctuation">)</span>: Can<span class="token string">'t connect to local MySQL server through socket '</span>/tmp/mysql.sock' <span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>, it means that
the MySQL server daemon <span class="token punctuation">(</span>Unix<span class="token punctuation">)</span> or <span class="token function">service</span> <span class="token punctuation">(</span>Windows<span class="token punctuation">)</span> is not running.

<span class="token comment"># QUIT 或者 Control + D</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
<template #tab1="{ title, value, isActive }">
<p><strong>bin目录：</strong> <strong>MYSQL</strong> 数据库下 <strong>bin</strong> 目录是 <strong>MYSQL</strong> 的可执行程序</p>
<ul>
<li>
<p>在 <strong>bin</strong> 目录下运行 <code v-pre>mysqld</code> 开启 <strong>mysql</strong> 的 <strong>socket</strong>，因此多种语言（<em>如  <strong>JAVA</strong>、<strong>Python</strong>、<strong>C#</strong>、<strong>Ruby</strong>、<strong>PHP</strong> 等等</em>）可以写对应的 <strong>socket</strong> 进行数据库的连接</p>
</li>
<li>
<p>数据库的服务器端运行起来就是一个 <strong>socket server</strong> ，之后启动客户端去连接服务端</p>
</li>
<li>
<p>认证连接后发送命令，数据库便可执行对应的命令。<strong>MySql</strong> 也提供了自己的一个连接 <strong>socket</strong>，在 <strong>bin</strong> 下运行 <strong>mysql</strong> 便可开启。</p>
</li>
</ul>
<p><strong>连接：</strong></p>
<div class="language-powershell ext-powershell line-numbers-mode"><pre v-pre class="language-powershell"><code>$ mysql <span class="token operator">-</span>u root <span class="token operator">-</span>p
<span class="token comment">#  -u: 用户名</span>
<span class="token comment">#  -p: password</span>
<span class="token comment"># root 初始化不设置密码，直接回车即可</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>把 <strong>mysqld</strong> 搞成一个 <strong>windows</strong> 服务（<em>任务管理器 - 服务</em>）每次开机会自动启动</p>
<ul>
<li>
<p><code v-pre>mysqld --install</code> 命令运行 <code v-pre>Install/Remove of the Service Denied!</code></p>
</li>
<li>
<p>用 <code v-pre>net start/stop mysql</code> 即可启动/关闭</p>
</li>
</ul>
</template>
</Tabs>
<h2 id="_2-用户权限" tabindex="-1"><a class="header-anchor" href="#_2-用户权限" aria-hidden="true">#</a> 2. 用户权限</h2>
<h5 id="默认数据库如下" tabindex="-1"><a class="header-anchor" href="#默认数据库如下" aria-hidden="true">#</a> <strong>默认数据库如下</strong></h5>
<ul>
<li><strong>mysql：</strong> 用户权限相关数据</li>
<li><strong>test：</strong> 用于用户测试数据</li>
<li><strong>information_schema：</strong> <strong>MySQL</strong> 本身架构相关数据</li>
</ul>
<h5 id="数据库简单使用" tabindex="-1"><a class="header-anchor" href="#数据库简单使用" aria-hidden="true">#</a> <strong>数据库简单使用</strong></h5>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 查看 MySQL 有那些数据库</span>
$ show databases<span class="token punctuation">;</span>

<span class="token comment"># #创建数据库 order （通常创建 utf-8 的）</span>
$ create database order<span class="token punctuation">;</span>

<span class="token comment"># 选则进入 order 数据库</span>
$ use order<span class="token punctuation">;</span>

<span class="token comment"># 创建 order 数据库中 的 user 表</span>
$ create table user<span class="token punctuation">(</span>nid int, name varchar<span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span>, <span class="token builtin class-name">pwd</span> varchar<span class="token punctuation">(</span><span class="token number">64</span><span class="token punctuation">))</span><span class="token punctuation">;</span>
	- <span class="token variable"><span class="token variable">`</span>varchar<span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span>:<span class="token variable">`</span></span> <span class="token string">"表示最长为20的字符串，超过则截取前20个"</span>

<span class="token comment"># 查看 order 数据库下，有那些表</span>
$ show tables<span class="token punctuation">;</span>


<span class="token comment"># 查看 user 表中所有数据</span>
<span class="token keyword">select</span> * from user<span class="token punctuation">;</span>

<span class="token comment"># 向 user 表插入一条数据</span>
insert into user<span class="token punctuation">(</span>nid, name, <span class="token builtin class-name">pwd</span><span class="token punctuation">)</span> values<span class="token punctuation">(</span><span class="token number">1</span>, <span class="token string">"zz"</span>, <span class="token string">"123"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment"># 清空 user 表内容</span>
delete from user<span class="token punctuation">;</span>
<span class="token variable"><span class="token variable">`</span>对于自增来说，即使清空，也保留了之前的自增号，从下一自增号开始<span class="token variable">`</span></span>

<span class="token comment"># 清空 user 表内容</span>
truncate table user<span class="token punctuation">;</span>
<span class="token variable"><span class="token variable">`</span>对于自增，也彻底清空，下次插入数据从 <span class="token number">1</span> 开始<span class="token variable">`</span></span>

<span class="token comment"># 删除 user 表</span>
drop table user<span class="token punctuation">;</span>

<span class="token comment"># 查询数据库的最大连接数</span>
show variables like <span class="token string">'max_connections'</span><span class="token punctuation">;</span>    
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="用户-授权" tabindex="-1"><a class="header-anchor" href="#用户-授权" aria-hidden="true">#</a> 用户&amp;授权:</h5>
<p><strong>MySQL</strong> 有默认创建好的用户表 <strong>user</strong>， 虽然可以用 <code v-pre>insert</code> 来创建用户，但不推荐</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 查看user表的所有数据（乱码）</span>
$ <span class="token keyword">select</span> * from user<span class="token punctuation">;</span>

<span class="token comment"># 查看user表中的各个字段详情</span>
$ desc user<span class="token punctuation">;</span>

<span class="token comment"># 查看user表中的host字段数据和user字段数据</span>
$ <span class="token keyword">select</span> host,user from user<span class="token punctuation">;</span>

<span class="token comment"># 查询权限，可看到数据库中所有权限相关信息</span>
$ <span class="token keyword">select</span> * from mysql.user<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="用户管理" tabindex="-1"><a class="header-anchor" href="#用户管理" aria-hidden="true">#</a> 用户管理：</h5>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 创建用户</span>
$ create user <span class="token string">'用户名'</span>@<span class="token string">'IP地址'</span> identified by <span class="token string">'密码'</span><span class="token punctuation">;</span>    
<span class="token variable"><span class="token variable">`</span>如（create user <span class="token string">"igarashi"</span>@<span class="token string">"localhost"</span> identified by <span class="token string">"123"</span>）下略<span class="token variable">`</span></span>

<span class="token comment"># 删除用户</span>
$ drop user <span class="token string">'用户名'</span>@<span class="token string">'IP地址'</span><span class="token punctuation">;</span>

<span class="token comment">#修改用户</span>
$ <span class="token function">rename</span> user <span class="token string">'用户名'</span>@<span class="token string">'IP地址'</span><span class="token punctuation">;</span> to <span class="token string">'新用户名'</span>@<span class="token string">'IP地址'</span><span class="token punctuation">;</span>

<span class="token comment"># 修改密码</span>
$ <span class="token builtin class-name">set</span> password <span class="token keyword">for</span> <span class="token string">'用户名'</span>@<span class="token string">'IP地址'</span> <span class="token operator">=</span> Password<span class="token punctuation">(</span><span class="token string">'新密码'</span><span class="token punctuation">)</span>
	<span class="token parameter variable">-h</span> <span class="token builtin class-name">:</span> <span class="token comment"># 登录时设置输入 IP 地址</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="权限管理" tabindex="-1"><a class="header-anchor" href="#权限管理" aria-hidden="true">#</a> 权限管理:</h5>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 授权</span>
$ grant 权限 on 数据库.表 to  <span class="token string">'用户'</span>@<span class="token string">'IP地址'</span>

如 grant <span class="token keyword">select</span> on test.tb1 to <span class="token string">"igarashi"</span>@<span class="token string">"localhost"</span><span class="token punctuation">;</span>

<span class="token comment"># 若远程管理连接, 只需要创建 对应IP地址 的用户，并进行授权</span>
$ grant <span class="token keyword">select</span> on test.tb1 to <span class="token string">"igarashi"</span>@<span class="token string">"192.168.1.12"</span><span class="token punctuation">;</span>
<span class="token variable"><span class="token variable">`</span> 即可让用户 fuuka 远程在 <span class="token number">192.168</span>.1.12 上登录 <span class="token variable">`</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>通配符</strong></p>
<ul>
<li>
<p><strong>用户名@IP地址 :</strong> 用户只能在 该 <strong>IP</strong> 下 访问</p>
</li>
<li>
<p><strong>用户名@192.168.1.% :</strong>   用户只能在 该 <strong>IP</strong> 段 下访问（<em><strong>%</strong> 表示任意，创建时需用 &quot;&quot; 号，</em><em>%</em>* 是特殊字符*）</p>
</li>
<li>
<p><strong>用户名@% :</strong>  用户可在 任意 <strong>IP</strong> 下访问 （<em>默认值</em>）</p>
</li>
<li>
<p>远程客户端连接登录命令如下</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ mysql <span class="token parameter variable">-u</span> <span class="token string">"username"</span> <span class="token parameter variable">-h</span> <span class="token string">"ip addr"</span> <span class="token parameter variable">-P</span> <span class="token number">3306</span> <span class="token parameter variable">-p</span> <span class="token string">"passwd"</span>
<span class="token comment"># 3306 默认值，修改自配的端口号</span>


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h5 id="其他" tabindex="-1"><a class="header-anchor" href="#其他" aria-hidden="true">#</a> 其他：</h5>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 刷新权限，将数据读取到内存中，使其立即生效</span>
$ flush privileges<span class="token punctuation">;</span>

<span class="token comment"># 若忘记密码： 启动免授权服务端，跳过数据库权限验证, 或是去修改 my.ini</span>
$ mysqld --skip-grant-tables

<span class="token comment"># 继续客户端输入</span>
$ mysql <span class="token parameter variable">-u</span> root <span class="token parameter variable">-p</span> <span class="token string">"任意"</span>

<span class="token comment"># 修改用户名密码</span>
$ use mysql
$ update mysql.user <span class="token builtin class-name">set</span> <span class="token assign-left variable">authentication_string</span><span class="token operator">=</span>password<span class="token punctuation">(</span><span class="token string">'user@dev'</span><span class="token punctuation">)</span> where <span class="token assign-left variable">user</span><span class="token operator">=</span><span class="token string">'root'</span><span class="token punctuation">;</span>

$ flush privileges<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-常用操作" tabindex="-1"><a class="header-anchor" href="#_3-常用操作" aria-hidden="true">#</a> 3. 常用操作</h2>
<h4 id="创建表" tabindex="-1"><a class="header-anchor" href="#创建表" aria-hidden="true">#</a> 创建表</h4>
<div class="language-mysql ext-mysql line-numbers-mode"><pre v-pre class="language-mysql"><code>create table 表名(
    列名  类型  是否可以为空，
    列名  类型  是否可以为空
)ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><strong>ENGINE：</strong> 数据库引擎， <strong>InnoDB</strong> 还是 <strong>MyISAM</strong>
<ul>
<li><strong>MyISAM:</strong> 支持 <strong>全文索引</strong>，速度快</li>
<li>**InnoDB: ** 支持 <strong>事务</strong>, 速度慢</li>
</ul>
</li>
<li><strong>事务：</strong> 原子操作，即 <strong>不能分割</strong> 的操作，如：<strong>转账</strong>（<em>减钱、加钱</em>）不能转一半断电数据丢失，因此断电要回退原来状态，<strong>把多个动作叠加在一起，称之为一个事务</strong></li>
<li><strong>是否可空：</strong>
<ul>
<li><strong>not null：</strong> 不可空</li>
<li><strong>null：</strong> 可空</li>
</ul>
</li>
</ul>
<div class="language-mysql ext-mysql line-numbers-mode"><pre v-pre class="language-mysql"><code>create table tb1(
    nid int not null defalut 2,
    num int not null
)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><strong>default：</strong> 默认值，创建可指定，插入数据若未设置，则自动使用默认值</li>
</ul>
<h5 id="主键自增" tabindex="-1"><a class="header-anchor" href="#主键自增" aria-hidden="true">#</a> <strong>主键自增：</strong></h5>
<div class="language-mysql ext-mysql line-numbers-mode"><pre v-pre class="language-mysql"><code>create table tb1(
    nid int not null auto_increment primary key,
	num int null
)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>
<p><strong>auto_increment：</strong> 自增，若某列设为自增列，插入无需再次指定，此列会自增（<em>表中只能有一个自增列</em> ）对于自增列：</p>
<ul>
<li><strong>必须是索引</strong>（<em>含主键</em>）</li>
<li>可以设置 <strong>步长</strong> 和 <strong>起始值</strong></li>
</ul>
</li>
<li>
<p>修改自增列</p>
<div class="language-mysql ext-mysql line-numbers-mode"><pre v-pre class="language-mysql"><code>-- 修改 users 表 自增 id 为 123456
alter table users AUTO_INCREMENT=123456;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>primary key：</strong> 主键，特殊的 <strong>唯一索引</strong>，<strong>不允许有空值</strong>，若主键使用：</p>
<ul>
<li><strong>单个列：</strong> 则它的 <strong>值 必须唯一</strong></li>
<li><strong>多列：</strong> 则其 <strong>组合 必须唯一</strong></li>
</ul>
<div class="language-mysql ext-mysql line-numbers-mode"><pre v-pre class="language-mysql"><code>create table tb1(
    nid int not null auto_increment primary key, -- or primary key(nid,num) 
	...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h5 id="约束-联合-唯一" tabindex="-1"><a class="header-anchor" href="#约束-联合-唯一" aria-hidden="true">#</a> <strong>约束（联合）唯一：</strong></h5>
<p><strong>与主键约束相似</strong> ，都可以 <strong>确保列的唯一性</strong>，不同的是，唯一约束在一个表中 <strong>可有多个</strong> ，设置唯一约束的列允许有空值，但也 <strong>仅有一个空值</strong></p>
<div class="language-mysql ext-mysql line-numbers-mode"><pre v-pre class="language-mysql"><code>CREATE TABLE `textbook_edition` (
    `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT ' 默认 id',
    列名 类型 unsigned NOT NULL DEFAULT '1' COMMENT 'XX',
    PRIMARY KEY (`id`), 										-- 设置主键
    UNIQUE KEY `idx_grade_subject` (`grade_type`,`subject`) 	-- 设置联合唯一
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COMMENT='XX表';
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>UNIQUE KEY</li>
</ul>
<h5 id="索引" tabindex="-1"><a class="header-anchor" href="#索引" aria-hidden="true">#</a> <strong>索引：</strong></h5>
<p>用来 <strong>快速查找</strong> 出在一个列上 <strong>用一特定值</strong> 的行，无索引则会顺序遍历（<em>表越长越耗时</em> ）</p>
<div class="custom-container tip">
<p class="custom-container-title">提示</p>
<p>所有的 <strong>MySQL 索引</strong> （<em><strong>PRIMARY</strong>、<strong>UNIQUE</strong> 和 <strong>INDEX</strong></em> ）是在 <strong>B树</strong> 中存储</p>
</div>
<pre><code>    外键，foreign key一个特殊的索引，只能是指定内容（一般对两个表有关系的列进行约束，一个表的外键通常是另一表的主键）
        constraint fk_cc foreign key (color_id) references color(nid) （constraint后面接的是 外键的标签）

    例：建表时创建联合唯一：
        CREATE TABLE `textbook_edition` (
          `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT ' 默认 id',
          列名 类型 unsigned NOT NULL DEFAULT '1' COMMENT 'XX',
          PRIMARY KEY (`id`), -- 设置主键
          UNIQUE KEY `idx_grade_subject` (`grade_type`,`subject`) -- 设置联合唯一
        ) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COMMENT='XX表';

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
    删除索引：ALTER TABLE `table_name` DROP INDEX `column`;

    修改默认值：ALTER TABLE testalter_tbl ALTER i SET DEFAULT 1000;
    删除默认值：ALTER TABLE testalter_tbl ALTER i DROP DEFAULT;

3.查看表结构
    desc 表名;  查看某个表的完整的表结构
</code></pre>
<h2 id="三、数据类型-数值、时间、字符串" tabindex="-1"><a class="header-anchor" href="#三、数据类型-数值、时间、字符串" aria-hidden="true">#</a> 三、数据类型：（数值、时间、字符串）</h2>
<pre><code>    [M]:表示总长度（例如：二进制位有多长）超出长度就报错
    [D]:表示小数位总长度（如decimal的m为50，d为30）
    char：定长查找速度快，但浪费空间
    二进制数据：
        TinyBlob、Blob、MediumBlob、LongBlob（专门存二进制数据的，比如图片、视频，若非要保存在数据库中，用read rb以二进制方式读取它）
        但一般没人这么干，通常上传图片、视频，都是把上传的东西以文件的形式保存到本地目录（硬盘中），而数据库中只保存一个路径。
        因此一般用varchar(65)这种方式，把文件存在某个硬盘（D:\1.avi）因此以后要的话就通过数据库把文件路径拿走再open打开即可。

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
                size ENUM('x-small', 'small', 'medium', 'large', 'x-large')
            );（表示以后插入数据只能是枚举中的某一个，不然报错）
            INSERT INTO shirts (name, size) VALUES ('dress shirt','large'), ('t-shirt','medium'),('polo shirt','small');

    set:（集合）
        示例：
            CREATE TABLE myset (col SET('a', 'b', 'c', 'd'));（与枚举不同的是，set可以插入多个集合内的数据）
            INSERT INTO myset (col) VALUES ('a,d'), ('d,a'), ('a,d,a'), ('a,d,d'), ('d,a,d');


    其他详细参考博客
</code></pre>
<h2 id="四、数据表内容操作" tabindex="-1"><a class="header-anchor" href="#四、数据表内容操作" aria-hidden="true">#</a> 四、数据表内容操作</h2>
<pre><code>1、增：
    insert into 表 (列名,列名...) values (值,值,值...)
    insert into 表 (列名,列名...) values (值,值,值...),(值,值,值...)（插入多条数据）
    insert into 目标表 (列名,列名...) select 列名,列名... from 另一张表 （把另外一张表的数据（可选列）全部导入目标表里）
        若两表中的数据类型不同（能够类型转换的）则会转换，不然报错 当然后面还可以接where nid&gt;2 and..之类的

2、删：
    delete from 表
    delete from 表 where id＝1 and name＝'alex'

3、改：
    update 表 set name ＝ 'igarashi' where id&gt;1 and 1=1 ...
    UPDATE 表 set `init_service_num` = `service_num`;    --令表中的一列等于表中的另一列

4、查：
    select * from 表
    select * from 表 where id &gt; 1
    select nid,name,gender as gg from 表 where id &gt; 1
    注：尽量不要用select *，因为select *的效率低，最好是把要查找的数据都写一遍。

5、其他：（必须熟）
    a、条件：
        select * from 表 where id &gt; 1 and name != 'alex' and num = 12;

        select * from 表 where id between 5 and 16;

        select * from 表 where id in (11,22,33)
        select * from 表 where id not in (11,22,33)
        select * from 表 where id in (select nid from 表)

    b、通配符：
        select * from 表 where name like 'ale%'  - ale开头的所有（多个字符串）
        select * from 表 where name like 'ale_'  - ale开头的所有（一个字符）

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
</code></pre>
</div></template>


