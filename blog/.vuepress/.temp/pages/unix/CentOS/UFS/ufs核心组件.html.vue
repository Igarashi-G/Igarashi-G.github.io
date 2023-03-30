<template><div><p>本文档提供 <strong>UFS</strong> 存储系统核心组件的配置说明</p>
<!-- more -->
<h2 id="_1-mss-组件" tabindex="-1"><a class="header-anchor" href="#_1-mss-组件" aria-hidden="true">#</a> 1. MSS 组件</h2>
<h3 id="_1-1-基本信息" tabindex="-1"><a class="header-anchor" href="#_1-1-基本信息" aria-hidden="true">#</a> 1.1 基本信息</h3>
<table>
<thead>
<tr>
<th>类目</th>
<th>信息</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td>核心进程</td>
<td>ufsmetaserver</td>
<td></td>
</tr>
<tr>
<td>进程路径</td>
<td>/usr/sbin/ufsmetaserver</td>
<td></td>
</tr>
<tr>
<td>配置文件路径</td>
<td>/etc/ufs/ufsmetaserver.cfg</td>
<td></td>
</tr>
<tr>
<td>日志文件路径</td>
<td>/var/log/ufs/ufsmetaserver.log</td>
<td></td>
</tr>
<tr>
<td>依赖项</td>
<td>license.bin</td>
<td>License 许可文件</td>
</tr>
<tr>
<td></td>
<td></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="_1-2-操作方式" tabindex="-1"><a class="header-anchor" href="#_1-2-操作方式" aria-hidden="true">#</a> 1.2 操作方式</h3>
<ul>
<li>通过 GUI 管理平台</li>
</ul>
<p>请以超级管理员账户的身份的登录 GUI 管理平台进行操作。</p>
<ul>
<li>通过 CLI 工具</li>
</ul>
<p>执行 CLI 工具需要以 root 账户身份登录节点服务器。</p>
<h3 id="_1-3-操作类型" tabindex="-1"><a class="header-anchor" href="#_1-3-操作类型" aria-hidden="true">#</a> 1.3 操作类型</h3>
<p><strong>启动服务：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>systemctl start ufs-metaserver
ufsmetaserver start
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>停止服务：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>systemctl stop ufs-metaserver
ufsmetaserver stop
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>重启服务：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>systemctl restart ufs-metaserver
ufsmetaserver restart
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>重新加载服务配置：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>systemctl reload ufs-metaserver
ufsmetaserver reload
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>查看服务的运行状态：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>systemctl status ufs-metaserver
ufsmetaserver <span class="token builtin class-name">test</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>启用/禁用开机启动：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>systemctl <span class="token builtin class-name">enable</span>  ufs-metaserver
systemctl disable ufs-metaserver
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>查看软件版本信息：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>ufsmetaserver <span class="token parameter variable">-v</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>查看帮助信息：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>ufsmetaserver <span class="token parameter variable">-h</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>支持的命令行参数：</strong></p>
<table>
<thead>
<tr>
<th>参数</th>
</tr>
</thead>
<tbody>
<tr>
<td>-v : print version number and exit</td>
</tr>
<tr>
<td>-f : run in foreground</td>
</tr>
<tr>
<td>-u : log undefined config variables</td>
</tr>
<tr>
<td>-n : do not attempt to increase limit of core dump size</td>
</tr>
<tr>
<td>-t locktimeout : how long wait for lockfile</td>
</tr>
<tr>
<td>-c cfgfile : use given config file</td>
</tr>
<tr>
<td>-i : ignore some metadata structure errors (attach orphans to root, ignore names without inode, etc.). DO NOT USE unless you are absoluttely sure that there are no other options to restore your metadata.</td>
</tr>
<tr>
<td>-a : automatically restore metadata from change logs</td>
</tr>
<tr>
<td>-e : start without metadata (download all from leader)</td>
</tr>
<tr>
<td>-x : produce more verbose output</td>
</tr>
<tr>
<td>-xx : even more verbose output</td>
</tr>
</tbody>
</table>
<h3 id="_1-4-参数配置" tabindex="-1"><a class="header-anchor" href="#_1-4-参数配置" aria-hidden="true">#</a> 1.4 参数配置</h3>
<p>配置说明：<code v-pre>/etc/ufs/ufsmetaserver.cfg</code></p>
<table>
<thead>
<tr>
<th>功能</th>
<th>配置项</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td></td>
<td>WORKING_USER = root</td>
<td>设置服务进程在运行时的有效用户身份（默认为 root）</td>
</tr>
<tr>
<td></td>
<td>WORKING_GROUP = root</td>
<td>设置服务进程在运行时的有效组身份（默认为 root）</td>
</tr>
<tr>
<td></td>
<td>SYSLOG_IDENT = ufsmetaserver</td>
<td>配置服务进程在 syslog 中的进程标示字段（默认为 ufsmetaserver）</td>
</tr>
<tr>
<td></td>
<td>LOCK_MEMORY = 0</td>
<td>配置 LOCK_MEMORY 以避免操作系统将进程所占用的内存交换到 swap 分区上（默认为 0，不开启）</td>
</tr>
<tr>
<td></td>
<td>LIMIT_GLIBC_MALLOC_ARENAS = 4</td>
<td>限制服务器使用大量的虚拟内存（默认为 4）</td>
</tr>
<tr>
<td></td>
<td>DISABLE_OOM_KILLER = 1</td>
<td>限制 OOM_KILLER（默认为 1，开启）</td>
</tr>
<tr>
<td></td>
<td>NICE_LEVEL = -19</td>
<td>用来运行守护程序的级别（默认值为-19；注意：必须以 root 身份启动进程才能增加优先级，如果设置优先级失败，进程将保留其启动时的级别）</td>
</tr>
<tr>
<td></td>
<td>FILE_UMASK = 027</td>
<td>设置组和其他用户的默认 umask（用户始终为 0，默认值为 027-阻止组写入，其他全部阻止）</td>
</tr>
<tr>
<td></td>
<td>DATA_PATH = /var/lib/ufs</td>
<td>设置服务进程的工作目录（默认为/var/lib/ufs，用来存放 changelog、metadata、pid 等）</td>
</tr>
<tr>
<td></td>
<td>EXPORTS_FILENAME = /etc/ufs/ufsexports.cfg</td>
<td>设置服务进程所需要的 ufsexports.cfg 路径</td>
</tr>
<tr>
<td></td>
<td>TOPOLOGY_FILENAME = /etc/ufs/ufstopology.cfg</td>
<td>设置服务进程所需要的 ufstopology.cfg 路径</td>
</tr>
<tr>
<td></td>
<td>BACK_LOGS = 50</td>
<td>MSS 日志备份数量（默认为 50）</td>
</tr>
<tr>
<td></td>
<td>METADATA_SAVE_FREQ = 1</td>
<td>设置 metadata 同步到本地的时间间隔（默认为 1，1 小时同步一次）</td>
</tr>
<tr>
<td></td>
<td>BACK_META_KEEP_PREVIOUS = 1</td>
<td>设置保留的先前元数据 DB 的数量（默认为 1）</td>
</tr>
<tr>
<td></td>
<td>CHANGELOG_PRESERVE_SECONDS = 1800</td>
<td>设置 changelog 在内存中保留时间限制（默认为 1800，单位为秒）</td>
</tr>
<tr>
<td></td>
<td>CHANGELOG_SAVE_MODE = 0</td>
<td>设置 changelog 的存档机制<br />（默认为 0，可选参数为 0、1、2）</td>
</tr>
<tr>
<td></td>
<td>MISSING_LOG_CAPACITY = 100000</td>
<td>限制在内存中记录的丢失的 chunk 块数量的上限（默认为 100000）</td>
</tr>
<tr>
<td></td>
<td>MATOML_LISTEN_HOST = *</td>
<td>metaserver</td>
</tr>
<tr>
<td></td>
<td>MATOML_LISTEN_PORT = 9419</td>
<td>配置监听与 metaserver、supervisors 的网络端口</td>
</tr>
<tr>
<td></td>
<td>MATOCS_LISTEN_HOST = *</td>
<td>配置监听与 chunkserver 的 IP 地址</td>
</tr>
<tr>
<td></td>
<td>MATOCS_LISTEN_PORT = 9420</td>
<td>配置监听与 chunkserver 的网络端口</td>
</tr>
<tr>
<td></td>
<td>MATOCS_TIMEOUT = 10</td>
<td>MSS 服务与 CSS 服务网络通信的超时时间（默认为 10，单位为秒）</td>
</tr>
<tr>
<td></td>
<td>AUTH_CODE = ufspassword</td>
<td>配置 metaserver 与 chunkserver 通信注册的凭证（默认不配置这个选项）</td>
</tr>
<tr>
<td></td>
<td>REPLICATIONS_DELAY_INIT = 60</td>
<td>限制开始数据修复的初始延迟，以秒为单位（默认为 60）</td>
</tr>
<tr>
<td></td>
<td>REPLICATIONS_RESPECT_TOPOLOGY = 0</td>
<td></td>
</tr>
<tr>
<td></td>
<td>CREATIONS_RESPECT_TOPOLOGY = 0</td>
<td></td>
</tr>
<tr>
<td></td>
<td>CHUNKS_UNIQUE_MODE = 0</td>
<td></td>
</tr>
<tr>
<td></td>
<td>CHUNKS_LOOP_MAX_CPS = 100000</td>
<td>限制每次 chunk_loop 检查次数操作的上限（默认为 100000）</td>
</tr>
<tr>
<td></td>
<td>CHUNKS_LOOP_MIN_TIME = 300</td>
<td>限制每次 chunk_loop 检查次数操作的时间下限（默认为 300 秒）</td>
</tr>
<tr>
<td></td>
<td>CHUNKS_SOFT_DEL_LIMIT = 10</td>
<td>限制 CSS 服务中软删除数据块的最大数量（默认为 10）</td>
</tr>
<tr>
<td></td>
<td>CHUNKS_HARD_DEL_LIMIT = 25</td>
<td>限制 CSS 服务中硬删除数据块的最大数量（默认为 25）</td>
</tr>
<tr>
<td></td>
<td>CHUNKS_WRITE_REP_LIMIT = 2,1,1,4</td>
<td>限制复制到一个 CSS 服务中的最大数据块数量</td>
</tr>
<tr>
<td></td>
<td>CHUNKS_READ_REP_LIMIT = 10,5,2,5</td>
<td>限制从一个 CSS 服务中复制的最大数据块数量</td>
</tr>
<tr>
<td></td>
<td>CS_HEAVY_LOAD_THRESHOLD = 150</td>
<td>CSS 服务的负载阈值（默认为 150）</td>
</tr>
<tr>
<td></td>
<td>CS_HEAVY_LOAD_RATIO_THRESHOLD = 5.0</td>
<td>CSS 负载的阈值比率（默认为 5.0，当 CSS 负载高于先前指定的阈值并且此比率高于平均负载时，CSS 将切换到“grace”模式）</td>
</tr>
<tr>
<td></td>
<td>CS_HEAVY_LOAD_GRACE_PERIOD = 900</td>
<td>定义 CSS 服务器将在“grace”模式下保持多长时间（以秒为单位）</td>
</tr>
<tr>
<td></td>
<td>ACCEPTABLE_PERCENTAGE_DIFFERENCE = 1.0</td>
<td>限制 CSS 服务空间使用之间的最大差异百分比（默认为 1.0 ；有效值：0.1 - 10.0）</td>
</tr>
<tr>
<td></td>
<td>PRIORITY_QUEUES_LENGTH = 1000000</td>
<td>优先队列的长度（默认值为 1000000）</td>
</tr>
<tr>
<td></td>
<td>CS_MAINTENANCE_MODE_TIMEOUT = 0</td>
<td>限制 CSS 服务可以处于维护模式的最大秒数（默认值为 0，无限制）</td>
</tr>
<tr>
<td></td>
<td>CS_TEMP_MAINTENANCE_MODE_TIMEOUT = 1800</td>
<td>CSS 服务器可以处于“临时”维护模式的最大秒数（只要正常停止服务器就会切换到此模式，重新连接后服务器会自动切换回正常模式；默认值：1800）</td>
</tr>
<tr>
<td></td>
<td>CS_DAYS_TO_REMOVE_UNUSED = 7</td>
<td>限制 MSS 中保留多少天未使用（断开连接）的 CSS 服务器（有效值：0 - 365；0 表示无限期；默认值为 7）</td>
</tr>
<tr>
<td></td>
<td>SESSION_SUSTAIN_TIME = 86400</td>
<td>保留离线的客户端会话的时间（以秒为单位；默认值为 86400 = 1 天）</td>
</tr>
<tr>
<td></td>
<td>QUOTA_DEFAULT_GRACE_PERIOD = 604800</td>
<td>软配额的默认宽限期（以秒为单位）（默认为 604800 - 7 天）</td>
</tr>
<tr>
<td></td>
<td>ATIME_MODE = 0</td>
<td>atime 修改方式（默认为 0 - 访问时始终修改 atime）</td>
</tr>
<tr>
<td></td>
<td>RESERVE_SPACE = 0</td>
<td></td>
</tr>
<tr>
<td></td>
<td>MAX_ALLOWED_HARD_LINKS = 32767</td>
<td>限定文件系统的硬链接数量</td>
</tr>
</tbody>
</table>
<h2 id="_2-css-组件" tabindex="-1"><a class="header-anchor" href="#_2-css-组件" aria-hidden="true">#</a> 2. CSS 组件</h2>
<h3 id="_2-1-基本信息" tabindex="-1"><a class="header-anchor" href="#_2-1-基本信息" aria-hidden="true">#</a> 2.1 基本信息</h3>
<table>
<thead>
<tr>
<th>类目</th>
<th>信息</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td>核心进程</td>
<td>ufschunkserver</td>
<td></td>
</tr>
<tr>
<td>进程路径</td>
<td>/usr/sbin/ufschunkserver</td>
<td></td>
</tr>
<tr>
<td>配置文件路径</td>
<td>/etc/ufs/ufschunkserver.cfg</td>
<td></td>
</tr>
<tr>
<td>日志文件路径</td>
<td>/var/log/ufs/ufschunkserver.log</td>
<td></td>
</tr>
<tr>
<td>依赖项</td>
<td>集群 ufs-metaserver 服务正常</td>
<td></td>
</tr>
<tr>
<td></td>
<td></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="_2-2-操作方式" tabindex="-1"><a class="header-anchor" href="#_2-2-操作方式" aria-hidden="true">#</a> 2.2 操作方式</h3>
<ul>
<li>通过 GUI 管理平台</li>
</ul>
<p>请以超级管理员账户的身份的登录 GUI 管理平台进行操作。</p>
<ul>
<li>通过 CLI 工具</li>
</ul>
<p>执行 CLI 工具需要以 root 账户身份登录节点服务器。</p>
<h3 id="_2-3-操作类型" tabindex="-1"><a class="header-anchor" href="#_2-3-操作类型" aria-hidden="true">#</a> 2.3 操作类型</h3>
<p><strong>启动服务：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>systemctl start ufs-chunkserver
ufschunkserver start
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>停止服务：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>systemctl stop ufs-chunkserver
ufschunkserver stop
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>重启服务：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>systemctl restart ufs-chunkserver
ufschunkserver restart
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>重新加载服务配置：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>systemctl reload ufs-chunkserver
ufschunkserver reload
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>查看服务的运行状态：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>systemctl status ufs-chunkserver
ufschunkserver <span class="token builtin class-name">test</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>启用/禁用开机启动：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>systemctl <span class="token builtin class-name">enable</span>  ufs-chunkserver
systemctl disable ufs-chunkserver
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>查看软件版本信息：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>ufschunkserver <span class="token parameter variable">-v</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>查看帮助信息：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>ufschunkserver <span class="token parameter variable">-h</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>支持的命令行参数：</strong></p>
<table>
<thead>
<tr>
<th>参数</th>
</tr>
</thead>
<tbody>
<tr>
<td>-v : print version number and exit</td>
</tr>
<tr>
<td>-f : run in foreground</td>
</tr>
<tr>
<td>-u : log undefined config variables</td>
</tr>
<tr>
<td>-n : do not attempt to increase limit of core dump size</td>
</tr>
<tr>
<td>-t locktimeout : how long wait for lockfile</td>
</tr>
<tr>
<td>-c cfgfile : use given config file</td>
</tr>
</tbody>
</table>
<h3 id="_2-4-参数配置" tabindex="-1"><a class="header-anchor" href="#_2-4-参数配置" aria-hidden="true">#</a> 2.4 参数配置</h3>
<p>配置说明：<code v-pre>/etc/ufs/ufschunkserver.cfg</code></p>
<table>
<thead>
<tr>
<th>功能</th>
<th>配置项</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td></td>
<td>WORKING_USER = root</td>
<td>设置服务进程在运行时的有效用户身份（默认为 root）</td>
</tr>
<tr>
<td></td>
<td>WORKING_GROUP = root</td>
<td>设置服务进程在运行时的有效组身份（默认为 root）</td>
</tr>
<tr>
<td></td>
<td>SYSLOG_IDENT = ufschunkserver</td>
<td>配置服务进程在 syslog 中的进程标示字段（默认为 ufsmetaserver）</td>
</tr>
<tr>
<td></td>
<td>LOCK_MEMORY = 0</td>
<td>是否锁定内存以避免使用 swap（默认为 0，即否）</td>
</tr>
<tr>
<td></td>
<td>LIMIT_GLIBC_MALLOC_ARENAS = 4</td>
<td>将 malloc arenas 限制为给定值 - 防止服务器使用大量虚拟内存（默认为 4）</td>
</tr>
<tr>
<td></td>
<td>DISABLE_OOM_KILLER = 1</td>
<td>禁用 OOM Killer（默认为 1）</td>
</tr>
<tr>
<td></td>
<td>NICE_LEVEL = -19</td>
<td>运行守护进程的 nice 级别（默认为 -19）</td>
</tr>
<tr>
<td></td>
<td>FILE_UMASK = 027</td>
<td>为组和其他人设置默认 umask（用户始终为 0，默认为 027）</td>
</tr>
<tr>
<td></td>
<td>DATA_PATH = /var/lib/ufs</td>
<td>设置服务进程的工作目录（默认为/var/lib/ufs）</td>
</tr>
<tr>
<td></td>
<td>HDD_CONF_FILENAME = /etc/ufs/ufshdd.cfg</td>
<td>设置磁盘信息的配置路径（默认为/etc/ufs/ufshdd.cfg）</td>
</tr>
<tr>
<td></td>
<td>HDD_TEST_SPEED = 1.0</td>
<td>数据块安全检查 IO 测试的执行周期（默认为 1.0，单位为秒）</td>
</tr>
<tr>
<td></td>
<td>HDD_MIN_TEST_INTERVAL = 86400</td>
<td>当上次 I/O（包括测试）的执行时间少于 HDD_MIN_TEST_INTERVAL 秒前时，不进行测试块完整性</td>
</tr>
<tr>
<td></td>
<td>HDD_FADVISE_MIN_TIME = 86400</td>
<td>数据块缓存刷新的最小间隔周期（默认为 86400，单位为秒）</td>
</tr>
<tr>
<td></td>
<td>HDD_LEAVE_SPACE_DEFAULT = 256MiB</td>
<td>设置每块磁盘的预留空间（默认为 256 MiB）</td>
</tr>
<tr>
<td></td>
<td>HDD_REBALANCE_UTILIZATION = 20</td>
<td>允许 CSS 节点在磁盘容量均衡上花费的总工作时间的百分比</td>
</tr>
<tr>
<td></td>
<td>HDD_ERROR_TOLERANCE_COUNT = 2</td>
<td>在单个硬盘驱动器上在给定的秒数 (PERIOD) 内可以容忍多少个 i/o 错误 (COUNT)； 如果错误数量超过此设置，则有问题的硬盘将被标记为损坏</td>
</tr>
<tr>
<td></td>
<td>HDD_ERROR_TOLERANCE_PERIOD = 600</td>
<td>在单个硬盘驱动器上在给定的秒数 (PERIOD) 内可以容忍多少个 i/o 错误 (COUNT)； 如果错误数量超过此设置，则有问题的硬盘将被标记为损坏</td>
</tr>
<tr>
<td></td>
<td>HDD_FSYNC_BEFORE_CLOSE = 0</td>
<td>启用/禁用数据块操作完成后执行 fsync</td>
</tr>
<tr>
<td></td>
<td>HDD_SPARSIFY_ON_WRITE = 1</td>
<td>启用/禁用数据块写入空洞内容</td>
</tr>
<tr>
<td></td>
<td>HDD_RR_CHUNK_COUNT = 10000</td>
<td>配置单个磁盘目录中一次可写入的最大数据块文件的上限（默认值为 10000）</td>
</tr>
<tr>
<td></td>
<td>HDD_KEEP_DUPLICATES_HOURS = 168</td>
<td>设置在删除之前应该保留多少小时的重复块（默认为 168，单位为小时）</td>
</tr>
<tr>
<td></td>
<td>ALLOW_STARTING_WITH_INVALID_DISKS = 0</td>
<td>启用/禁用是否允许存在无效磁盘的情况下 CSS 能够正常启动</td>
</tr>
<tr>
<td></td>
<td>WORKERS_MAX = 250<br/>WORKERS_MAX_IDLE = 40</td>
<td>工作线程数量的最大值<br />工作线程数量的空闲值</td>
</tr>
<tr>
<td></td>
<td>LABELS =</td>
<td>CSS 节点标签</td>
</tr>
<tr>
<td></td>
<td>MASTER_TIMEOUT = 10</td>
<td>配置与 MSS 服务通信的超时时间</td>
</tr>
<tr>
<td></td>
<td>MASTER_RECONNECTION_DELAY = 5</td>
<td>重连 MSS 服务的延迟时间</td>
</tr>
<tr>
<td></td>
<td>CHUNKS_PER_REGISTER_PACKET = 10000</td>
<td>CSS 节点向 MSS 注册过程中传递的单个数据包中允许的数据块上限（默认为 10000）</td>
</tr>
<tr>
<td></td>
<td></td>
<td></td>
</tr>
<tr>
<td></td>
<td></td>
<td></td>
</tr>
</tbody>
</table>
<h2 id="_3-client-组件" tabindex="-1"><a class="header-anchor" href="#_3-client-组件" aria-hidden="true">#</a> 3. CLIENT 组件</h2>
<h3 id="_3-1-基本信息" tabindex="-1"><a class="header-anchor" href="#_3-1-基本信息" aria-hidden="true">#</a> 3.1 基本信息</h3>
<table>
<thead>
<tr>
<th>类目</th>
<th>信息</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td>核心进程</td>
<td>ufsmount</td>
<td></td>
</tr>
<tr>
<td>进程路径</td>
<td>/usr/bin/ufsmount</td>
<td></td>
</tr>
<tr>
<td>配置文件路径</td>
<td>/etc/ufs/ufsmount.cfg</td>
<td></td>
</tr>
<tr>
<td>日志文件路径</td>
<td>/var/log/ufs/ufsmount.log</td>
<td></td>
</tr>
<tr>
<td>依赖项</td>
<td>UFS 集群状态正常</td>
<td></td>
</tr>
<tr>
<td></td>
<td></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="_3-2-操作方式" tabindex="-1"><a class="header-anchor" href="#_3-2-操作方式" aria-hidden="true">#</a> 3.2 操作方式</h3>
<p>执行 ufsmount 工具需要以 root 账户身份登录应用服务器。</p>
<h3 id="_3-3-操作类型" tabindex="-1"><a class="header-anchor" href="#_3-3-操作类型" aria-hidden="true">#</a> 3.3 操作类型</h3>
<p>创建本地挂载目录：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">mkdir</span> /mnt/ufs
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>挂载 UFS 根文件系统到本地的/mnt/ufs 目录：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>ufsmount /mnt/ufs
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>使用-H 参数挂载指定集群的 UFS 文件系统：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>ufsmount <span class="token parameter variable">-H</span> <span class="token number">192.168</span>.2.71 /mnt/ufs
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>使用 ufssubfolder 参数指定挂载的子目录：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>ufsmount <span class="token parameter variable">-o</span> <span class="token assign-left variable">ufssubfolder</span><span class="token operator">=</span>/sub /mnt/ufs
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>使用 ufsbind 指定客户端使用的 IP 地址：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>ufsmount <span class="token parameter variable">-o</span> <span class="token assign-left variable">ufsbind</span><span class="token operator">=</span><span class="token number">172.16</span>.130.157 /mnt/ufs
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>挂载回收站：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>ufsmount <span class="token parameter variable">-o</span> ufsmeta /mnt/meta
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>延迟挂载：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>ufsmount <span class="token parameter variable">-o</span> ufsdelayedinit /mnt/ufs
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>前台运行客户端程序：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>ufsmount <span class="token parameter variable">-f</span> /mnt/ufs
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>启用 DEBUG 输出模式：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>ufsmount <span class="token parameter variable">-f</span> <span class="token parameter variable">-o</span> ufsdebug /mnt/ufs
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>查看帮助信息：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>ufsmount <span class="token parameter variable">-h</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_3-4-参数配置" tabindex="-1"><a class="header-anchor" href="#_3-4-参数配置" aria-hidden="true">#</a> 3.4 参数配置</h3>
<p>客户端的挂载参数可以在命令行中指定，也可以在<code v-pre>/etc/ufs/ufsmount.cfg</code>中进行设置。</p>
<h4 id="_3-4-1-缓存配置" tabindex="-1"><a class="header-anchor" href="#_3-4-1-缓存配置" aria-hidden="true">#</a> 3.4.1 缓存配置</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>    <span class="token parameter variable">-o</span> <span class="token assign-left variable">ufscachemode</span><span class="token operator">=</span>CMODE       设置缓存模式<span class="token punctuation">(</span>default: AUTO<span class="token punctuation">)</span>
    <span class="token parameter variable">-o</span> <span class="token assign-left variable">ufsattrcacheto</span><span class="token operator">=</span>SEC       设置属性缓存超时 <span class="token punctuation">(</span>default: <span class="token number">1.0</span><span class="token punctuation">)</span>
    <span class="token parameter variable">-o</span> <span class="token assign-left variable">ufsxattrcacheto</span><span class="token operator">=</span>SEC      设置扩展属性 <span class="token punctuation">(</span>xattr<span class="token punctuation">)</span> 缓存超时 <span class="token punctuation">(</span>default: <span class="token number">30.0</span><span class="token punctuation">)</span>
    <span class="token parameter variable">-o</span> <span class="token assign-left variable">ufsentrycacheto</span><span class="token operator">=</span>SEC      设置文件entry缓存超时 <span class="token punctuation">(</span>default: <span class="token number">0.0</span><span class="token punctuation">)</span>
    <span class="token parameter variable">-o</span> <span class="token assign-left variable">ufsdirentrycacheto</span><span class="token operator">=</span>SEC   设置目录entry缓存超时 <span class="token punctuation">(</span>default: <span class="token number">1.0</span><span class="token punctuation">)</span>
    <span class="token parameter variable">-o</span> <span class="token assign-left variable">ufsnegentrycacheto</span><span class="token operator">=</span>SEC   设置neg entry缓存超时  <span class="token punctuation">(</span>default: <span class="token number">0.0</span><span class="token punctuation">)</span>
    <span class="token parameter variable">-o</span> <span class="token assign-left variable">ufsgroupscacheto</span><span class="token operator">=</span>SEC     设置用户组缓存超时 <span class="token punctuation">(</span>default: <span class="token number">300.0</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-4-2-io-调优" tabindex="-1"><a class="header-anchor" href="#_3-4-2-io-调优" aria-hidden="true">#</a> 3.4.2 IO 调优</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>    <span class="token parameter variable">-o</span> <span class="token assign-left variable">ufsfsyncmintime</span><span class="token operator">=</span>SEC      force fsync before last <span class="token function">file</span> close when <span class="token function">file</span> was opened/created at least SEC seconds earlier <span class="token punctuation">(</span>default: <span class="token number">0.0</span> - always <span class="token keyword">do</span> fsync before close<span class="token punctuation">)</span>
    <span class="token parameter variable">-o</span> <span class="token assign-left variable">ufswritecachesize</span><span class="token operator">=</span>N      设置write缓冲区大小，单位:MiB <span class="token punctuation">(</span>default: <span class="token number">256</span><span class="token punctuation">)</span>
    <span class="token parameter variable">-o</span> <span class="token assign-left variable">ufsreadaheadsize</span><span class="token operator">=</span>N       设置read缓冲区大小，单位:MiB  <span class="token punctuation">(</span>default: <span class="token number">256</span><span class="token punctuation">)</span>
    <span class="token parameter variable">-o</span> <span class="token assign-left variable">ufsreadaheadleng</span><span class="token operator">=</span>N       设置read预读取的文件大小，单位：B <span class="token punctuation">(</span>default: <span class="token number">1048576</span><span class="token punctuation">)</span>
    <span class="token parameter variable">-o</span> <span class="token assign-left variable">ufsreadaheadtrigger</span><span class="token operator">=</span>N    设置按顺序读取开启预读的字节数 <span class="token punctuation">(</span>default: <span class="token number">10</span> * ufsreadaheadleng<span class="token punctuation">)</span>
    <span class="token parameter variable">-o</span> ufserroronlostchunk      启用数据块丢失时直接返回io error
    <span class="token parameter variable">-o</span> ufserroronnospace        启用空间不足时直接返回io error
    <span class="token parameter variable">-o</span> <span class="token assign-left variable">ufsioretries</span><span class="token operator">=</span>N           设置I/O错误返回前的重试次数<span class="token punctuation">(</span>default: <span class="token number">30</span><span class="token punctuation">)</span>
    <span class="token parameter variable">-o</span> <span class="token assign-left variable">ufstimeout</span><span class="token operator">=</span>N             设置I/O错误返回前的最大超时秒数<span class="token punctuation">(</span>default: <span class="token number">0</span> - <span class="token function">which</span> means no <span class="token function">timeout</span><span class="token punctuation">)</span>
    <span class="token parameter variable">-o</span> <span class="token assign-left variable">ufslogretry</span><span class="token operator">=</span>N            定义超过多少次I/O重试操作后客户端开始记录日志 <span class="token punctuation">(</span>default: <span class="token number">5</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-4-3-系统调优" tabindex="-1"><a class="header-anchor" href="#_3-4-3-系统调优" aria-hidden="true">#</a> 3.4.3 系统调优</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>    <span class="token parameter variable">-o</span> <span class="token assign-left variable">ufsrlimitnofile</span><span class="token operator">=</span>N        设置客户端进程允许使用的fd句柄上限<span class="token punctuation">(</span>root身份运行<span class="token punctuation">)</span>  <span class="token punctuation">(</span>default: <span class="token number">100000</span><span class="token punctuation">)</span>
    <span class="token parameter variable">-o</span> <span class="token assign-left variable">ufsnice</span><span class="token operator">=</span>N                运行守护进程的 <span class="token function">nice</span> 级别 <span class="token punctuation">(</span>default: -19<span class="token punctuation">)</span>
    <span class="token parameter variable">-o</span> ufsmemlock               允许锁定内存以避免使用swap
    <span class="token parameter variable">-o</span> <span class="token assign-left variable">ufslimitarenas</span><span class="token operator">=</span>N         将malloc arenas限制为给定值 - 防止服务器使用大量虚拟内存 <span class="token punctuation">(</span>default: <span class="token number">4</span><span class="token punctuation">)</span>
    <span class="token parameter variable">-o</span> ufsallowoomkiller        允许OOM Killer
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-4-4-通用配置" tabindex="-1"><a class="header-anchor" href="#_3-4-4-通用配置" aria-hidden="true">#</a> 3.4.4 通用配置</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>    <span class="token parameter variable">-o</span> nonempty                 允许UFS挂载非空目录
    <span class="token parameter variable">-o</span> <span class="token assign-left variable">ufscfgfile</span><span class="token operator">=</span>CFGFILE       设置客户端配置文件以便从文件中加载配置参数<span class="token punctuation">(</span>default: /etc/ufs/ufsmount.cfg<span class="token punctuation">)</span>
    <span class="token parameter variable">-o</span> ufsdebug                 输出调试信息
    <span class="token parameter variable">-o</span> ufsmeta                  挂载meta文件系统<span class="token punctuation">(</span>包含回收站<span class="token punctuation">)</span>
    <span class="token parameter variable">-o</span> ufsflattrash             设置回收站挂载目录的显示格式为flat模式
    <span class="token parameter variable">-o</span> ufsdelayedinit           允许客户端异步连接UFS集群<span class="token punctuation">(</span>特别适用于/etc/fstab开机挂载场景<span class="token punctuation">)</span>
    <span class="token parameter variable">-o</span> <span class="token assign-left variable">ufsioretries</span><span class="token operator">=</span>N           配置发生IO异常时的重试的次数<span class="token punctuation">(</span>default: <span class="token number">30</span><span class="token punctuation">)</span>
    <span class="token parameter variable">-o</span> <span class="token assign-left variable">ufstimeout</span><span class="token operator">=</span>N             配置发生IO异常时的最大超时时间 <span class="token punctuation">(</span>default: <span class="token number">0</span> - 表示不限制超时<span class="token punctuation">)</span>
    <span class="token parameter variable">-o</span> <span class="token assign-left variable">ufsmaster</span><span class="token operator">=</span>HOST           指定UFS集群IP<span class="token punctuation">(</span>default: ufsmetaserver<span class="token punctuation">)</span>
    <span class="token parameter variable">-o</span> <span class="token assign-left variable">ufsport</span><span class="token operator">=</span>PORT             指定UFS集群网络端口 <span class="token punctuation">(</span>default: <span class="token number">9421</span><span class="token punctuation">)</span>
    <span class="token parameter variable">-o</span> <span class="token assign-left variable">ufsbind</span><span class="token operator">=</span>IP               指定客户端bind的网络地址
    <span class="token parameter variable">-o</span> <span class="token assign-left variable">ufssubfolder</span><span class="token operator">=</span><span class="token environment constant">PATH</span>        指定挂载的集群目录 <span class="token punctuation">(</span>default: /<span class="token punctuation">)</span>
    <span class="token parameter variable">-o</span> <span class="token assign-left variable">ufspassword</span><span class="token operator">=</span>PASSWORD     配置客户端访问密码
    <span class="token parameter variable">-o</span> <span class="token assign-left variable">ufspreflabels</span><span class="token operator">=</span>LABELEXPR
    <span class="token parameter variable">-o</span> ufsnoxattrs              关闭xattr功能
    <span class="token parameter variable">-o</span> ufsnoposixlocks          关闭posix locks <span class="token punctuation">(</span>lockf + ioctl<span class="token punctuation">)</span>功能
    <span class="token parameter variable">-o</span> ufsnobsdlocks            关闭BSD locks <span class="token punctuation">(</span>flock<span class="token punctuation">)</span>功能
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-4-5-附加特性" tabindex="-1"><a class="header-anchor" href="#_3-4-5-附加特性" aria-hidden="true">#</a> 3.4.5 附加特性</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>	<span class="token parameter variable">-o</span> <span class="token assign-left variable">fsname</span><span class="token operator">=</span>NAME ⾃定义⽂件系统名称
	<span class="token parameter variable">-o</span> <span class="token assign-left variable">ufspreflabels</span><span class="token operator">=</span>LABELEXPR 指定在 I/O 期间选择chunkserver的⾸选标签
	<span class="token parameter variable">-o</span> ufsnoxattrs 关闭xattr功能
	<span class="token parameter variable">-o</span> ufsnoposixlocks 关闭posix locks <span class="token punctuation">(</span>lockf + ioctl<span class="token punctuation">)</span>功能
	<span class="token parameter variable">-o</span> ufsnobsdlocks 关闭BSD locks <span class="token punctuation">(</span>flock<span class="token punctuation">)</span>功能
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-5-应用场景" tabindex="-1"><a class="header-anchor" href="#_3-5-应用场景" aria-hidden="true">#</a> 3.5 应用场景</h3>
<h4 id="_3-5-1-自动挂载" tabindex="-1"><a class="header-anchor" href="#_3-5-1-自动挂载" aria-hidden="true">#</a> 3.5.1 自动挂载</h4>
<p>对于 <strong>CentOS、Ubuntu/Debian</strong> 等 <strong>Linux</strong> 操作系统，⽀持以 <strong>fstab</strong> 和 <strong>systemd</strong> 两种⽅式进⾏开机⾃动挂载</p>
<div class="custom-container warning">
<p class="custom-container-title">注意</p>
<ol>
<li>
<p>通过定义/etc/hosts主机配置，在ufsmount命令⾏中可以简化 &quot;-H&quot;、&quot;-o ufsmaster=&quot;等参数定义。&quot;-H&quot;参数可以指定多个meta服务IP或者主机名；&quot;-o ufsmaster=&quot;参数仅⽀持指定单个meta服务IP或者主机名</p>
</li>
<li>
<p>通过定义默认的/etc/ufs/ufsmount.cfg挂载配置⽂件，在ufsmount命令⾏和fstab中可以简化 &quot;-o &quot;等系列参数的定义</p>
</li>
<li>
<p>由于客户端可能优先启动于 UFS 集群，导致客户端注册失败从⽽⽆法⾃动挂载，这种情况下需要在客户端配置⽂件(/etc/ufs/ufsmount.cfg)或者命令⾏中增加ufsdelayedinit参数项，以便⽀持此场景</p>
</li>
</ol>
</div>
<h5 id="_3-5-1-1-systemd-自动挂载" tabindex="-1"><a class="header-anchor" href="#_3-5-1-1-systemd-自动挂载" aria-hidden="true">#</a> <strong>3.5.1.1 systemd ⾃动挂载</strong></h5>
<p>在 <strong>Linux</strong> 操作系统中通过 <strong>systemd</strong> 系统管理⼯具实现 <strong>ufsmount</strong> 开机⾃动挂载功能</p>
<p><strong>步骤1：</strong> 创建 <strong>systemd</strong> 配置模板</p>
<p>新建名为 <strong>ufs-automount.service</strong> 的⽂本⽂件（配置名字可以⾃<em>定义</em>），存放到 <code v-pre>/usr/lib/systemd/system</code> 路径下，通过 <strong>systemd</strong> 配置语法指定相应的启动参数</p>
<p><strong>ufs-automount.service</strong> 的内容⽰例如下</p>
<div class="language-ini ext-ini line-numbers-mode"><pre v-pre class="language-ini"><code><span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">Unit</span><span class="token punctuation">]</span></span>
<span class="token key attr-name">Description</span><span class="token punctuation">=</span><span class="token value attr-value">UFS Client Helper</span>
<span class="token key attr-name">Wants</span><span class="token punctuation">=</span><span class="token value attr-value">network-online.target</span>
<span class="token key attr-name">After</span><span class="token punctuation">=</span><span class="token value attr-value">network.target network-online.target</span>

<span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">Service</span><span class="token punctuation">]</span></span>
<span class="token key attr-name">Type</span><span class="token punctuation">=</span><span class="token value attr-value">forking</span>
<span class="token key attr-name">ExecStart</span><span class="token punctuation">=</span><span class="token value attr-value">/usr/bin/ufsmount3 -o ufssubfolder=/,ufsdelayedinit -H</span>
172.16.120.111,172.16.120.112,172.16.120.113 /mnt/ufs
<span class="token key attr-name">Restart</span><span class="token punctuation">=</span><span class="token value attr-value">on-abnormal</span>
<span class="token key attr-name">RestartSec</span><span class="token punctuation">=</span><span class="token value attr-value">120s</span>

<span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">Install</span><span class="token punctuation">]</span></span>
<span class="token key attr-name">WantedBy</span><span class="token punctuation">=</span><span class="token value attr-value">multi-user.target</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>⚠️<strong>注意：</strong> <strong>ExecStart</strong> 为命令⾏挂载语法，⽤户需要替换为实际的挂载参数</p>
</blockquote>
<p>通过配置<code v-pre>/etc/fstab</code>可实现 Unix/Linux 平台下客户端自动挂载</p>
<p><strong>步骤2：</strong> 通过 <strong>systemctl</strong> ⼯具设置开机启动</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 0. 向操作系统注册 ufs-automount.service</span>
systemctl daemon-reload

<span class="token comment"># 1. 启⽤服务 - 允许开机⾃动运⾏</span>
systemctl <span class="token builtin class-name">enable</span> ufs-automount.service

<span class="token comment"># 2. ⽴即启动服务</span>
systemctl start ufs-automount.service

<span class="token comment"># 3. ⽴即停⽌服务</span>
systemctl stop ufs-automount.service

<span class="token comment"># 4. 查看服务运⾏状态</span>
systemctl status ufs-automount.service
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>步骤3：</strong> 验证以上配置是否⽣效，重启查看是否挂载即可</p>
<h5 id="_3-5-1-2-fstab-自动挂载" tabindex="-1"><a class="header-anchor" href="#_3-5-1-2-fstab-自动挂载" aria-hidden="true">#</a> <strong>3.5.1.2  fstab ⾃动挂载</strong></h5>
<p>在 <strong>Linux</strong> 操作系统中通过 <strong>fstab</strong> 方式实现 <strong>ufsmount</strong> 开机⾃动挂载功能</p>
<p><strong>步骤1：</strong>  安装 <strong>fuse</strong> ⼯具包</p>
<Tabs :data='[]'>
</Tabs>
<p><strong>步骤2：</strong> 配置 <strong>fstab</strong></p>
<p>通过 <strong>vim</strong> 编辑 <code v-pre>/etc/fstab</code> ，增加⾃动挂载路径（<code v-pre>/mnt/ufs</code>），示例如下</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># /etc/fstab</span>
ufsmount3 /mnt/ufs fuse ufsdelayedinit,ufsioretries<span class="token operator">=</span><span class="token number">120</span>,ufssubfolder<span class="token operator">=</span>/0 <span class="token number">0</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>步骤3：</strong> 验证以上配置是否⽣效</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 验证 /mnt/ufs 是否能挂载</span>
<span class="token function">mount</span> /mnt/ufs

<span class="token comment"># 卸载/mnt/ufs</span>
<span class="token function">umount</span> /mnt/ufs
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-5-2-查看操作日志" tabindex="-1"><a class="header-anchor" href="#_3-5-2-查看操作日志" aria-hidden="true">#</a> 3.5.2 查看操作⽇志</h4>
<p>以 <code v-pre>/mnt/ufs</code> 为客户端挂载点为⽰例</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">cat</span> /mnt/ufs/.oplog
<span class="token comment"># 输出⽰例如下</span>
08.18 <span class="token number">17</span>:48:30.986145: uid:0 gid:0 pid:27219 cmd:readdirplus
<span class="token punctuation">(</span><span class="token number">165735,4096</span>,1414<span class="token punctuation">)</span> <span class="token punctuation">[</span>handle:00000007<span class="token punctuation">]</span>: OK <span class="token punctuation">(</span><span class="token number">3984</span><span class="token punctuation">)</span>
08.18 <span class="token number">17</span>:48:30.986247: uid:0 gid:0 pid:27219 cmd:readdir <span class="token punctuation">(</span><span class="token number">165735,4096</span>,2493<span class="token punctuation">)</span>
<span class="token punctuation">[</span>handle:00000007<span class="token punctuation">]</span>: OK <span class="token punctuation">(</span><span class="token number">880</span><span class="token punctuation">)</span>
08.18 <span class="token number">17</span>:48:30.986307: uid:0 gid:0 pid:27219 cmd:readdir <span class="token punctuation">(</span><span class="token number">165735,4096</span>,2493<span class="token punctuation">)</span>
<span class="token punctuation">[</span>handle:00000007<span class="token punctuation">]</span>: OK <span class="token punctuation">(</span>no data<span class="token punctuation">)</span>
08.18 <span class="token number">17</span>:48:30.986682: uid:0 gid:0 pid:0 cmd:releasedir <span class="token punctuation">(</span><span class="token number">165735</span><span class="token punctuation">)</span>
<span class="token punctuation">[</span>handle:00000000<span class="token punctuation">]</span>: OK
08.18 <span class="token number">17</span>:48:30.986687: uid:0 gid:0 pid:0 cmd:releasedir <span class="token punctuation">(</span><span class="token number">165731</span><span class="token punctuation">)</span>
<span class="token punctuation">[</span>handle:00000000<span class="token punctuation">]</span>: OK
08.18 <span class="token number">17</span>:48:30.987260: uid:0 gid:0 pid:27219 cmd:opendir <span class="token punctuation">(</span><span class="token number">136392</span><span class="token punctuation">)</span>: OK
<span class="token punctuation">[</span>handle:00000002<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-5-3-自定义挂载参数" tabindex="-1"><a class="header-anchor" href="#_3-5-3-自定义挂载参数" aria-hidden="true">#</a> 3.5.3 自定义挂载参数</h4>
<p><strong>方法1：</strong> 通过命令⾏参数</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>ufsmount /mnt/ufs <span class="token punctuation">\</span>
	<span class="token parameter variable">-H</span> <span class="token number">172.16</span>.120.111,172.16.120.112,172.16.120.113 <span class="token punctuation">\</span>
	<span class="token parameter variable">-o</span> <span class="token assign-left variable">ufsloglevel</span><span class="token operator">=</span>debug <span class="token punctuation">\</span>
	<span class="token parameter variable">-o</span> <span class="token assign-left variable">ufslogfile</span><span class="token operator">=</span>/var/log/ufs/ufsmount_xingang.log <span class="token punctuation">\</span>
	<span class="token parameter variable">-o</span> <span class="token assign-left variable">ufsrlimitnofile</span><span class="token operator">=</span><span class="token number">1024000</span> <span class="token punctuation">\</span>
	<span class="token parameter variable">-o</span> <span class="token assign-left variable">ufsioretries</span><span class="token operator">=</span><span class="token number">120</span> <span class="token punctuation">\</span>
	<span class="token parameter variable">-o</span> <span class="token assign-left variable">ufssubfolder</span><span class="token operator">=</span>/Users/Xingang
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>方法2：</strong> 通过配置⽂件</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>ufsmount /mnt/ufs <span class="token parameter variable">-c</span> /etc/ufs/your_ufsmount.cfg
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="_3-5-4-查询挂载参数" tabindex="-1"><a class="header-anchor" href="#_3-5-4-查询挂载参数" aria-hidden="true">#</a> 3.5.4 查询挂载参数</h4>
<p>以 <code v-pre>/mnt/ufs</code> 为客户端挂载点为示例</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>cat /mnt/ufs/.params
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>输出示例如下：</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>ufsmaster: ufsmetaserver
ufsport: 9421
ufsbind: (not defined)
ufsproxy: 127.0.0.1
ufssubfolder: /
ufspassword: (not defined)
ufspassfile: (not defined)
ufsmd5pass: (not defined)
ufspreflabels: (not defined)
ufsrlimitnofile: 100000
ufsnice: -19
ufssuid: (not defined)
ufsdev: (not defined)
ufsmemlock: (not defined)
ufslimitarenas: 4
ufsallowoomkiller: (not defined)
nonempty: (not defined)
ufswritecachesize: 256
ufsreadaheadsize: 256
ufsreadaheadleng: 1048576
ufsreadaheadtrigger: 10485760
ufserroronlostchunk: (not defined)
ufserroronnospace: (not defined)
ufsioretries: 3
ufstimeout: 1
ufslogretry: 5
ufsdebug: (not defined)
ufsmeta: (not defined)
ufsflattrash: (not defined)
ufsdelayedinit: (defined)
ufsdonotrememberpassword: (not defined)
ufscachefiles: (not defined)
ufsnoxattrs: (not defined)
ufsnoposixlocks: (not defined)
ufsnobsdlocks: (not defined)
ufscachemode: (not defined)
ufsmkdircopysgid: 1
ufssugidclearmode: (not defined)
ufsattrcacheto: 1.000
ufsxattrcacheto: 30.000
ufsentrycacheto: 0.000
ufsdirentrycacheto: 1.000
ufsnegentrycacheto: 0.000
ufsgroupscacheto: 300.000
ufsfsyncmintime: 0.000
ufsfsyncbeforeclose: (not defined)
working_keep_cache_mode: AUTO
working_sugid_clear_mode: EXT
no_std_mount_options: (not defined)
master_sesflags: 24
master_umaskval: 0000
master_maproot: 0:0
master_mapall: 0:0
master_goallimit: 1:9
master_trashlimit: 0:4294967295
master_disables: 0x0
ufs_master_version: 4.0.10
ufs_mount_version: 4.0.10-1
ufs_mount_build: 20210712
compiled_with_fuse: 3.2
fuse_library_version: 3.2
kernel_fuse_protocol: 7.22
kernel_capability_mask: 0xFFDB
kernel_defaults_mask: 0xFC0B
kernel_working_mask: 0xEC5B
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-5-5-查看操作日志" tabindex="-1"><a class="header-anchor" href="#_3-5-5-查看操作日志" aria-hidden="true">#</a> 3.5.5 查看操作日志</h4>
<p>以<code v-pre>/mnt/ufs</code>为客户端挂载点为示例。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>cat /mnt/ufs/.oplog
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>输出示例如下：</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>08.18 17:48:30.986145: uid:0 gid:0 pid:27219 cmd:readdirplus (165735,4096,1414) [handle:00000007]: OK (3984)
08.18 17:48:30.986247: uid:0 gid:0 pid:27219 cmd:readdir (165735,4096,2493) [handle:00000007]: OK (880)
08.18 17:48:30.986307: uid:0 gid:0 pid:27219 cmd:readdir (165735,4096,2493) [handle:00000007]: OK (no data)
08.18 17:48:30.986682: uid:0 gid:0 pid:0 cmd:releasedir (165735) [handle:00000000]: OK
08.18 17:48:30.986687: uid:0 gid:0 pid:0 cmd:releasedir (165731) [handle:00000000]: OK
08.18 17:48:30.986733: uid:0 gid:0 pid:27219 cmd:getattr (136392) [no handle] (using open dir cache): OK (0.0,[drwxr-xr-x:0040755,3,0,0,1628796967,1628233002,1628233002,2000181])
08.18 17:48:30.987260: uid:0 gid:0 pid:27219 cmd:opendir (136392): OK [handle:00000002]
08.18 17:48:30.987344: uid:0 gid:0 pid:27219 cmd:getattr (136392) [no handle] (using open dir cache): OK (0.0,[drwxr-xr-x:0040755,3,0,0,1628796967,1628233002,1628233002,2000181])
08.18 17:48:30.987388: uid:0 gid:0 pid:27219 cmd:getattr (136392) [no handle] (using open dir cache): OK (0.0,[drwxr-xr-x:0040755,3,0,0,1628796967,1628233002,1628233002,2000181])
08.18 17:48:30.987940: uid:0 gid:0 pid:27219 cmd:readdirplus (136392,4096,137) [handle:00000002]: OK (488)
08.18 17:48:30.988008: uid:0 gid:0 pid:27219 cmd:readdir (136392,4096,137) [handle:00000002]: OK (no data)
...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-5-6-查询运行日志" tabindex="-1"><a class="header-anchor" href="#_3-5-6-查询运行日志" aria-hidden="true">#</a> 3.5.6 查询运行日志</h4>
<p>以 <code v-pre>/var/log/ufs/ufsmount.log</code> 为⽇志⽰例</p>
<ol>
<li>
<p>客户端启动⽇志</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span><span class="token number">2022</span>-07-28 <span class="token number">10</span>:36:54.520 info <span class="token number">30275</span>:30275<span class="token punctuation">]</span> setting glibc malloc arena max to <span class="token number">4</span>
<span class="token punctuation">[</span><span class="token number">2022</span>-07-28 <span class="token number">10</span>:36:54.520 info <span class="token number">30275</span>:30275<span class="token punctuation">]</span> setting glibc malloc arena <span class="token builtin class-name">test</span> to <span class="token number">4</span>
<span class="token punctuation">[</span><span class="token number">2022</span>-07-28 <span class="token number">10</span>:36:54.520 info <span class="token number">30275</span>:30275<span class="token punctuation">]</span> out of memory killer disabled
<span class="token number">17</span> / <span class="token number">22</span><span class="token punctuation">[</span><span class="token number">2022</span>-07-28 <span class="token number">10</span>:36:54.520 info <span class="token number">30275</span>:30275<span class="token punctuation">]</span> monotonic clock function: clock_gettime
<span class="token punctuation">[</span><span class="token number">2022</span>-07-28 <span class="token number">10</span>:36:54.530 info <span class="token number">30275</span>:30275<span class="token punctuation">]</span> monotonic clock speed: <span class="token number">679351</span> ops / <span class="token number">10</span> miliseconds
<span class="token punctuation">[</span><span class="token number">2022</span>-07-28 <span class="token number">10</span>:36:54.541 info <span class="token number">30275</span>:30287<span class="token punctuation">]</span> my st_dev: <span class="token number">51</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>Leader离线</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span><span class="token number">2022</span>-07-28 <span class="token number">11</span>:04:32.264 warning <span class="token number">4681</span>:4684<span class="token punctuation">]</span> master: connection lost <span class="token punctuation">(</span>header<span class="token punctuation">)</span>
<span class="token punctuation">[</span><span class="token number">2022</span>-07-28 <span class="token number">11</span>:04:32.267 warning <span class="token number">4681</span>:4684<span class="token punctuation">]</span> ufsmaster <span class="token number">172.16</span>.120.112 - doesn<span class="token string">'t know his
leader, waiting a moment and retrying using different IP
[2022-07-28 11:04:32.268 warning 4681:4684] ufsmaster 172.16.120.112 - doesn'</span>t know his
leader, waiting a moment and retrying using different IP
<span class="token punctuation">[</span><span class="token number">2022</span>-07-28 <span class="token number">11</span>:04:34.269 warning <span class="token number">4681</span>:4684<span class="token punctuation">]</span> ufsmaster <span class="token number">172.16</span>.120.112 - doesn<span class="token string">'t know his
leader, waiting a moment and retrying using different IP
[2022-07-28 11:04:34.270 warning 4681:4684] ufsmaster 172.16.120.113 - doesn'</span>t know his
leader, waiting a moment and retrying using different IP
<span class="token punctuation">[</span><span class="token number">2022</span>-07-28 <span class="token number">11</span>:04:36.272 warning <span class="token number">4681</span>:4684<span class="token punctuation">]</span> ufsmaster <span class="token number">172.16</span>.120.113 - doesn't know his
leader, waiting a moment and retrying using different IP
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>向New Leader注册</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span><span class="token number">2022</span>-07-28 <span class="token number">11</span>:04:36.272 warning <span class="token number">4681</span>:4684<span class="token punctuation">]</span> ufsmaster found leader: <span class="token number">172.16</span>.120.113
<span class="token punctuation">[</span><span class="token number">2022</span>-07-28 <span class="token number">11</span>:04:38.274 warning <span class="token number">4681</span>:4684<span class="token punctuation">]</span> ufsmaster <span class="token number">172.16</span>.120.113 - doesn<span class="token string">'t know his
leader, waiting a moment and retrying using different IP
[2022-07-28 11:04:38.275 warning 4681:4684] can'</span>t connect to master
<span class="token punctuation">(</span><span class="token string">"172.16.120.112"</span><span class="token builtin class-name">:</span><span class="token string">"9421"</span><span class="token punctuation">)</span>
<span class="token punctuation">[</span><span class="token number">2022</span>-07-28 <span class="token number">11</span>:04:42.279 warning <span class="token number">4681</span>:4684<span class="token punctuation">]</span> ufsmaster <span class="token number">172.16</span>.120.113 - doesn<span class="token string">'t know his
leader, waiting a moment and retrying using different IP
[2022-07-28 11:04:42.279 warning 4681:4684] ufsmaster found leader: 172.16.120.113
[2022-07-28 11:04:42.280 warning 4681:4684] ufsmaster 172.16.120.113 - doesn'</span>t know his
leader, waiting a moment and retrying using different IP
<span class="token punctuation">[</span><span class="token number">2022</span>-07-28 <span class="token number">11</span>:04:44.281 info <span class="token number">4681</span>:4684<span class="token punctuation">]</span> registered to master
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>⽂件的数据块离线, 导致客户端⽆法读数据(read)、写数据(write)</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># a. 存储节点不在线</span>
<span class="token comment"># b. CSS服务未启动</span>
<span class="token punctuation">[</span><span class="token number">2022</span>-07-28 <span class="token number">11</span>:09:11.859 warning <span class="token number">4681</span>:4817<span class="token punctuation">]</span> file: <span class="token number">359987</span>, index: <span class="token number">0</span>, chunk:
0000000010AF62DE, version: 00000003 - there are no valid copies
<span class="token punctuation">[</span><span class="token number">2022</span>-07-28 <span class="token number">11</span>:09:21.860 warning <span class="token number">4681</span>:4688<span class="token punctuation">]</span> file: <span class="token number">359987</span>, index: <span class="token number">0</span>, chunk:
0000000010AF62DE, version: 00000003 - there are no valid copies
<span class="token punctuation">[</span><span class="token number">2022</span>-07-28 <span class="token number">11</span>:09:21.860 warning <span class="token number">4681</span>:4818<span class="token punctuation">]</span> file: <span class="token number">359987</span>, index: <span class="token number">0</span>, chunk:
0000000010AF62DE, version: 00000003 - there are no valid copies
<span class="token punctuation">[</span><span class="token number">2022</span>-07-28 <span class="token number">11</span>:32:45.770 warning <span class="token number">8706</span>:12146<span class="token punctuation">]</span> file: <span class="token number">72628</span>, index: <span class="token number">0</span>, chunk:
0000000010B2618C, version: 00000002 - there are no valid copies
<span class="token punctuation">[</span><span class="token number">2022</span>-07-28 <span class="token number">11</span>:32:55.771 warning <span class="token number">8706</span>:12147<span class="token punctuation">]</span> file: <span class="token number">72628</span>, index: <span class="token number">0</span>, chunk:
0000000010B2618C, version: 00000002 - there are no valid copies 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>chunkserver离线，导致客户端⽆法写数据</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span><span class="token number">2022</span>-07-28 <span class="token number">11</span>:20:41.754 warning <span class="token number">8706</span>:8715<span class="token punctuation">]</span> file: <span class="token number">72628</span>, index: <span class="token number">0</span> - fs_writechunk returned
status: Chunkserver not present
<span class="token punctuation">[</span><span class="token number">2022</span>-07-28 <span class="token number">11</span>:20:43.255 warning <span class="token number">8706</span>:9629<span class="token punctuation">]</span> file: <span class="token number">72628</span>, index: <span class="token number">0</span> - fs_writechunk returned
status: Chunkserver not present
<span class="token punctuation">[</span><span class="token number">2022</span>-07-28 <span class="token number">11</span>:20:45.056 warning <span class="token number">8706</span>:8715<span class="token punctuation">]</span> file: <span class="token number">72628</span>, index: <span class="token number">0</span> - fs_writechunk returned
status: Chunkserver not present
<span class="token punctuation">[</span><span class="token number">2022</span>-07-28 <span class="token number">11</span>:20:47.157 warning <span class="token number">8706</span>:9629<span class="token punctuation">]</span> file: <span class="token number">72628</span>, index: <span class="token number">0</span> - fs_writechunk returned
status: Chunkserver not present
<span class="token punctuation">[</span><span class="token number">2022</span>-07-28 <span class="token number">11</span>:20:49.558 warning <span class="token number">8706</span>:8715<span class="token punctuation">]</span> file: <span class="token number">72628</span>, index: <span class="token number">0</span> - fs_writechunk returned
status: Chunkserver not present
<span class="token punctuation">[</span><span class="token number">2022</span>-07-28 <span class="token number">11</span>:20:52.260 warning <span class="token number">8706</span>:9629<span class="token punctuation">]</span> file: <span class="token number">72628</span>, index: <span class="token number">0</span> - fs_writechunk returned
status: Chunkserver not present
<span class="token punctuation">[</span><span class="token number">2022</span>-07-28 <span class="token number">11</span>:20:55.261 warning <span class="token number">8706</span>:8715<span class="token punctuation">]</span> file: <span class="token number">72628</span>, index: <span class="token number">0</span> - fs_writechunk returned
status: Chunkserver not present
<span class="token punctuation">[</span><span class="token number">2022</span>-07-28 <span class="token number">11</span>:20:58.562 warning <span class="token number">8706</span>:9629<span class="token punctuation">]</span> file: <span class="token number">72628</span>, index: <span class="token number">0</span> - fs_writechunk returned
status: Chunkserver not present
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>磁盘离线， 导致客户端⽆法写数据</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span><span class="token number">2022</span>-07-28 <span class="token number">11</span>:25:19.261 warning <span class="token number">8706</span>:9629<span class="token punctuation">]</span> file: <span class="token number">72628</span>, index: <span class="token number">0</span> - fs_writechunk returned
status: Chunk lost
<span class="token punctuation">[</span><span class="token number">2022</span>-07-28 <span class="token number">11</span>:25:21.063 warning <span class="token number">8706</span>:8715<span class="token punctuation">]</span> file: <span class="token number">72628</span>, index: <span class="token number">0</span> - fs_writechunk returned
status: Chunk lost
<span class="token punctuation">[</span><span class="token number">2022</span>-07-28 <span class="token number">11</span>:25:23.164 warning <span class="token number">8706</span>:9629<span class="token punctuation">]</span> file: <span class="token number">72628</span>, index: <span class="token number">0</span> - fs_writechunk returned
status: Chunk lost
<span class="token punctuation">[</span><span class="token number">2022</span>-07-28 <span class="token number">11</span>:25:25.565 warning <span class="token number">8706</span>:8715<span class="token punctuation">]</span> file: <span class="token number">72628</span>, index: <span class="token number">0</span> - fs_writechunk returned
status: Chunk lost
<span class="token punctuation">[</span><span class="token number">2022</span>-07-28 <span class="token number">11</span>:25:28.266 warning <span class="token number">8706</span>:9629<span class="token punctuation">]</span> file: <span class="token number">72628</span>, index: <span class="token number">0</span> - fs_writechunk returned
status: Chunk lost
<span class="token punctuation">[</span><span class="token number">2022</span>-07-28 <span class="token number">11</span>:27:16.594 warning <span class="token number">8706</span>:8715<span class="token punctuation">]</span> error writing <span class="token function">file</span> number <span class="token number">72628</span>: ENXIO <span class="token punctuation">(</span>No
such device or address<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>磁盘离线， 导致客户端⽆法读数据</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span><span class="token number">2022</span>-07-28 <span class="token number">11</span>:28:31.087 warning <span class="token number">8706</span>:12146<span class="token punctuation">]</span> file: <span class="token number">72628</span>, index: <span class="token number">0</span> - fs_readchunk returned
status: Chunk lost
<span class="token punctuation">[</span><span class="token number">2022</span>-07-28 <span class="token number">11</span>:28:32.289 warning <span class="token number">8706</span>:12147<span class="token punctuation">]</span> file: <span class="token number">72628</span>, index: <span class="token number">0</span> - fs_readchunk returned
status: Chunk lost
<span class="token punctuation">[</span><span class="token number">2022</span>-07-28 <span class="token number">11</span>:28:33.488 warning <span class="token number">8706</span>:8713<span class="token punctuation">]</span> file: <span class="token number">72628</span>, index: <span class="token number">0</span> - fs_readchunk returned
status: Chunk lost
<span class="token punctuation">[</span><span class="token number">2022</span>-07-28 <span class="token number">11</span>:28:34.990 warning <span class="token number">8706</span>:12146<span class="token punctuation">]</span> file: <span class="token number">72628</span>, index: <span class="token number">0</span> - fs_readchunk returned
status: Chunk lost
<span class="token punctuation">[</span><span class="token number">2022</span>-07-28 <span class="token number">11</span>:28:36.491 warning <span class="token number">8706</span>:12147<span class="token punctuation">]</span> file: <span class="token number">72628</span>, index: <span class="token number">0</span> - fs_readchunk returned
status: Chunk lost
<span class="token punctuation">[</span><span class="token number">2022</span>-07-28 <span class="token number">11</span>:28:38.291 warning <span class="token number">8706</span>:8713<span class="token punctuation">]</span> file: <span class="token number">72628</span>, index: <span class="token number">0</span> - fs_readchunk returned
status: Chunk lost
<span class="token punctuation">[</span><span class="token number">2022</span>-07-28 <span class="token number">11</span>:28:40.093 warning <span class="token number">8706</span>:12146<span class="token punctuation">]</span> file: <span class="token number">72628</span>, index: <span class="token number">0</span> - fs_readchunk returned
status: Chunk lost
<span class="token punctuation">[</span><span class="token number">2022</span>-07-28 <span class="token number">11</span>:29:26.301 warning <span class="token number">8706</span>:12146<span class="token punctuation">]</span> file: <span class="token number">72628</span>, index: <span class="token number">0</span> - fs_readchunk returned
status: Chunk lost
<span class="token punctuation">[</span><span class="token number">2022</span>-07-28 <span class="token number">11</span>:29:26.301 warning <span class="token number">8706</span>:12146<span class="token punctuation">]</span> error reading <span class="token function">file</span> number <span class="token number">72628</span>: ENXIO <span class="token punctuation">(</span>No
such device or address<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
</div></template>


