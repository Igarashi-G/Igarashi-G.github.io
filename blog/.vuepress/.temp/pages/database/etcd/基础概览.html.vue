<template><div><h1 id="etcd-基础概览" tabindex="-1"><a class="header-anchor" href="#etcd-基础概览" aria-hidden="true">#</a> etcd 基础概览</h1>
<blockquote>
<p>13 年 <strong>CoreOS</strong> 创业团队，构建了产品 <code v-pre>Container Linux</code> 一个开源、轻量、可自动化、快速部署的操作系统，在容器中运行，目的是管理机器像单机一样方便，2020-6 月其寿命终结，现被 <strong>Fedora CoreOS</strong> 继任</p>
</blockquote>
<p>但是多节点提供稳定服务需要一个协调服务来存储配置信息，并保证<strong>高可用</strong>、有<strong>分布式锁</strong>等需求，故 <strong>etcd</strong> 诞生。</p>
<h3 id="_1-简介" tabindex="-1"><a class="header-anchor" href="#_1-简介" aria-hidden="true">#</a> 1. 简介</h3>
<p><strong>etcd</strong>：高可用的 <strong>分布式键值(key-value)</strong> 数据库。作为服务发现系统，具备以下的特点：</p>
<ul>
<li>简单：安装配置简单，而且提供了 HTTP API 进行交互，使用也很简单</li>
<li>安全：支持 SSL 证书验证</li>
<li>快速：根据官方提供的 benchmark 数据，单实例支持每秒 2k+读操作</li>
<li>可靠：采用 raft 算法，实现分布式系统数据的可用性和一致性</li>
</ul>
<h4 id="_1-1-协调服务" tabindex="-1"><a class="header-anchor" href="#_1-1-协调服务" aria-hidden="true">#</a> 1.1 协调服务</h4>
<p>一个协调服务，理想状态下需满足以下条件：</p>
<ul>
<li><strong>可用性角度</strong>：<strong>高可用</strong>，集群可容错，宕节点依然正常提供服务。</li>
<li><strong>数据一致性角度：提供读取“最新”数据的机制</strong>。既然协调服务必须具备高可用的目标，就必然不能存在单点故障*（single point of failure）*，而多节点又需要保证数据一致性。</li>
<li>**容量角度：低容量、仅存储关键元数据配置。*<em>协调服务保存的仅仅是服务、节点的配置信息</em>（属于控制面配置）*，而不是与用户相关的数据。所以存储上不需要考虑数据分片，无需过度设计。</li>
<li><strong>功能：增删改查，监听数据变化的机制</strong>。由于为了保存服务状态信息，当服务有变更或异常，相比控制端定时去轮询检查一个个服务状态，<strong>若能快速推送变更事件给控制端，则可提升服务可用性、减少协调服务不必要的性能开销</strong>。</li>
<li>**运维复杂度：可维护性。**在分布式系统中往往会遇到硬/软件 Bug、人为操作错误导致节点宕机，以及新增、替换节点等运维场景，都需要对协调服务成员进行变更。若能提供 API 实现平滑地变更成员节点信息，就可以大大降低运维复杂度，减少运维成本，同时可避免因人工变更不规范可能导致的服务异常。</li>
</ul>
<h4 id="_1-2-为啥不用-zk" tabindex="-1"><a class="header-anchor" href="#_1-2-为啥不用-zk" aria-hidden="true">#</a> 1.2 为啥不用 ZK？</h4>
<p><strong>ZooKeeper</strong>已经满足了协调服务特点，但为何不使用呢？</p>
<blockquote>
<p>高可用、数据一致性、功能三角度分析如下</p>
</blockquote>
<ul>
<li>不支持通过 <code v-pre>API</code> 安全地变更成员，需要人工修改一个个节点的配置，并重启进程。</li>
<li>姿势不正确，经常会<strong>脑裂</strong>，因此适配云环境、平滑调整集群规模都很困难，运维成本高。</li>
<li><code v-pre>JAVA</code> 编写，部署复杂，吃内存多，序列化是 <code v-pre>Jute</code> ，自己实现的 RPC，无法使用 curl 工具互动易用性差，无法使用 http/s 安全性差。</li>
<li><code v-pre>ZK</code> 生态不够活跃，<code v-pre>Consul</code> 未必可靠稳定。</li>
</ul>
<p>由于存在以上缺点，故 <code v-pre>CoreOS</code>团队 决定自己造轮子便造出了 <strong>etcd</strong> 。在后续的项目实现，一致性协议易理解性，运维，安全等多个维度上，比 <code v-pre>ZK</code> 都占据优势。</p>
<p><a href="./pdf/etcd1.pdf">etcd</a></p>
<iframe src="./pdf/etcd1.pdf" width="100%" height="100%"></iframe>
<h3 id="_2-etcd-v3" tabindex="-1"><a class="header-anchor" href="#_2-etcd-v3" aria-hidden="true">#</a> 2. etcd v3</h3>
<p>并选择如下方案：</p>
<ul>
<li>
<p><strong>Go 语言</strong>：</p>
</li>
<li>
<p><strong>Raft 一致性算法</strong>：将复杂的一致性问题分解成 Leader 选举、日志同步、安全性三个相对独立的子问题，只要集群一半以上节点存活就可提供服务，具备良好的可用性</p>
</li>
<li>
<p><strong>key-value 存储引擎</strong>：</p>
</li>
</ul>
<h2 id="三、应用场景" tabindex="-1"><a class="header-anchor" href="#三、应用场景" aria-hidden="true">#</a> 三、应用场景</h2>
<p>和 ZK 类似，ETCD 有很多使用场景，包括：</p>
<ul>
<li>
<p>1.配置管理</p>
</li>
<li>
<p>2.服务注册于发现</p>
</li>
<li>
<p>3.选主</p>
</li>
<li>
<p>4.应用调度</p>
</li>
<li>
<p>5.分布式队列</p>
</li>
<li>
<p>6.分布式锁</p>
</li>
</ul>
<h2 id="四、读写性能" tabindex="-1"><a class="header-anchor" href="#四、读写性能" aria-hidden="true">#</a> 四、读写性能</h2>
<p>按照官网给出的[Benchmark], 在 2CPU，1.8G 内存，SSD 磁盘这样的配置下，单节点的写性能可以达到 16K QPS, 而先写后读也能达到 12K QPS。
这个性能还是相当可观的。</p>
<h2 id="五、工作原理" tabindex="-1"><a class="header-anchor" href="#五、工作原理" aria-hidden="true">#</a> 五、工作原理</h2>
<p>ETCD 使用 Raft 协议来维护集群内各个节点状态的一致性。</p>
<p>简单说，ETCD 集群是一个分布式系统，由多个节点相互通信构成整体对外服务，每个节点都存储了完整的数据，并且通过 Raft 协议保证每个节点维护的数据是一致的。</p>
<p>1.每个节点都会维护一个状态机。</p>
<p>2.任意时刻至多存在一个有效的主节点。</p>
<p>3.主节点处理所有来自客户端的写操作，并通过 Raft 协议保证写操作对状态机的改动会可靠的同步到其他节点。</p>
<p><strong>ETCD 工作原理核心部分在于 Raft 协议。主要分为三个部分：选主，日志复制，安全性。</strong></p>
<h3 id="_1-选主" tabindex="-1"><a class="header-anchor" href="#_1-选主" aria-hidden="true">#</a> 1.选主</h3>
<ul>
<li>
<p>Raft 协议是用于维护一组服务节点数据一致性的协议。</p>
</li>
<li>
<p>这一组服务节点构成一个集群，并且有一个主节点来对外提供服务。</p>
</li>
<li>
<p>当集群初始化，或者主节点挂掉后，面临一个选主问题。集群中每个节点，任意时刻处于 Leader, Follower, Candidate 这三个角色之一。选举特点如下：</p>
<ul>
<li>
<p>当集群初始化时候，每个节点都是 Follower 角色；</p>
</li>
<li>
<p>当 Follower 在一定时间内没有收到来自主节点的心跳，会将自己角色改变为 Candidate，并发起一次选主投票；当收到包括自己在内超过半
数节点赞成后，选举成功；当收到票数不足半数选举失败，或者选举超时。若本轮未选出主节点，将进行下一轮选举
（出现这种情况，是由于多个节点同时选举，所有节点均为获得过半选票）。</p>
</li>
<li>
<p>若 Candidate 节点收到来自主节点的信息后，会立即终止选举过程，进入 Follower 角色。</p>
</li>
<li>
<p>为了避免陷入选主失败循环，每个节点未收到心跳发起选举的时间是一定范围内的随机值，这样能够避免 2 个节点同时发起选主。</p>
</li>
</ul>
</li>
</ul>
<h3 id="_2-日志复制" tabindex="-1"><a class="header-anchor" href="#_2-日志复制" aria-hidden="true">#</a> 2.日志复制</h3>
<p>所谓日志复制，是指<strong>主节点</strong>将每次操作形成日志条目，并<strong>持久化</strong>到本地磁盘，然后通过网络 IO 发送给其他节点。</p>
<p>其他节点根据日志的逻辑时钟(TERM)和日志编号(INDEX)来判断是否将该日志记录持久化到本地。当主节点收到包括自己在内<strong>超过半数</strong>节点成功返回，
那么认为该日志是可提交的(committed），并将日志输入到状态机，将结果返回给客户端。</p>
<p>注：每次选主都会形成一个唯一的 TERM 编号，相当于逻辑时钟。每一条日志都有全局唯一的编号。</p>
<p>主节点通过网络 IO 向其他节点追加日志。若某节点收到日志追加的消息，首先判断该日志的 TERM 是否过期，以及该日志条目的 INDEX 是否比当前以及
提交的日志的 INDEX 跟早。若已过期，或者比提交的日志更早，那么就拒绝追加，并返回该节点当前的已提交的日志的编号。否则，将日志追加，并返回成功。</p>
<p>当主节点收到其他节点关于日志追加的回复后，若发现有拒绝，则根据该节点返回的已提交日志编号，发生其编号下一条日志。</p>
<p>主节点像其他节点同步日志，还作了拥塞控制。具体地说，主节点发现日志复制的目标节点拒绝了某次日志追加消息，将进入日志探测阶段，一条一条
发送日志，直到目标节点接受日志，然后进入快速复制阶段，可进行批量日志追加。</p>
<p>按照日志复制的逻辑，我们可以看到，集群中慢节点不影响整个集群的性能。另外一个特点是，数据只从主节点复制到 Follower 节点，这样大大简化了逻辑流程。</p>
<h3 id="_3-安全性" tabindex="-1"><a class="header-anchor" href="#_3-安全性" aria-hidden="true">#</a> 3.安全性</h3>
<p>####【引出问题】：
截止此刻，选主以及日志复制并不能保证节点间数据一致。</p>
<ul>
<li>
<p>试想，当一个某个节点挂掉了，一段时间后再次重启，并当选为主节点。</p>
</li>
<li>
<p>而在其挂掉这段时间内，集群若有超过半数节点存活，集群会正常工作，那么会有日志提交。</p>
</li>
<li>
<p>这些提交的日志无法传递给挂掉的节点。当挂掉的节点再次当选主节点，它将缺失部分已提交的日志。</p>
</li>
<li>
<p>在这样场景下，按 Raft 协议，它将自己日志复制给其他节点，会将集群已经提交的日志给覆盖掉</p>
</li>
</ul>
<p>这显然是不可接受的。</p>
<p>####【其他协议解决办法】：</p>
<ul>
<li>新当选的主节点会询问其他节点，和自己数据对比，确定出集群已提交数据，然后将缺失的数据同步过来。</li>
</ul>
<p>这个方案有明显缺陷，增加了集群恢复服务的时间（集群在选举阶段不可服务），并且增加了协议的复杂度。</p>
<p>####【Raft 解决的办法】</p>
<ul>
<li>
<p>在选主逻辑中，对能够成为主的节点加以限制，确保选出的节点已定包含了集群已经提交的所有日志。</p>
</li>
<li>
<p>如果新选出的主节点已经包含了集群所有提交的日志，那就不需要从和其他节点比对数据了。</p>
</li>
</ul>
<p>简化了流程，缩短了集群恢复服务的时间。</p>
<p>####【疑惑】
这里存在一个问题，加以这样限制之后，还能否选出主呢？</p>
<p>答案是：
只要仍然有超过半数节点存活，这样的主一定能够选出。</p>
<p>因为已经提交的日志必然被集群中超过半数节点持久化，显然前一个主节点提交的最后一条日志也被集群中大部分节点持久化。</p>
<p>当主节点挂掉后，集群中仍有大部分节点存活，那这存活的节点中一定存在一个节点包含了已经提交的日志了。</p>
<p>至此，关于 Raft 协议的简介就全部结束了。</p>
<h2 id="六、接口" tabindex="-1"><a class="header-anchor" href="#六、接口" aria-hidden="true">#</a> 六、接口</h2>
<p>ETCD 提供 HTTP 协议，在最新版本中支持 Google gRPC 方式访问。具体支持接口情况如下：</p>
<ul>
<li>
<p>ETCD 是一个高可靠的 KV 存储系统，支持 PUT/GET/DELETE 接口；</p>
</li>
<li>
<p>为了支持服务注册与发现，支持 WATCH 接口（通过 http long poll 实现）；</p>
</li>
<li>
<p>支持 KEY 持有 TTL 属性；</p>
</li>
<li>
<p>CAS（compare and swap)操作;</p>
</li>
<li>
<p>支持多 key 的事务操作；</p>
</li>
<li>
<p>支持目录操作</p>
</li>
<li></li>
</ul>
</div></template>


