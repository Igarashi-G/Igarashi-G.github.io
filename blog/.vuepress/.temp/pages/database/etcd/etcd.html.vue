<template><div><p><strong>etcd</strong> 是 <strong>k8s</strong> 用于服务发现注册的分布式键值对数据库，通常作为注册中心</p>
<!-- more -->
<p><a href="https://etcd.io/" target="_blank" rel="noopener noreferrer">官网</a></p>
<p><a href="https://github.com/etcd-io/etcd" target="_blank" rel="noopener noreferrer">GitHub | etcd</a></p>
<blockquote>
<p><strong>13</strong> 年 <strong>CoreOS</strong> 创业团队，构建了产品 <strong>Container Linux</strong> 一个开源、轻量、可自动化、快速部署的操作系统，在容器中运行，目的是管理机器像单机一样方便，于 <strong>2020.6</strong> 流产，后被 <strong>Fedora CoreOS</strong> 接盘。</p>
<ul>
<li>这种大型的分布式系统 <strong>不会容忍裂脑操作</strong>，并且 <strong>愿意牺牲可用性</strong></li>
<li>故开发了一个能为多节点提供稳定地协调服务来满足 <strong>发现</strong>、 <strong>注册</strong>、<strong>分布式锁</strong> 等需求，并保证 <strong>高可用</strong></li>
</ul>
</blockquote>
<p>故 <strong>etcd</strong> 诞生，<strong>etc</strong> 取自 <strong>unix</strong> 系统的 <code v-pre>/etc</code> 路径（<em>通常存放配置文件</em>），<strong>d</strong> 指的是分布式系统（<em>distributed system</em>）</p>
<h5 id="kubernetes-中的使用场景" tabindex="-1"><a class="header-anchor" href="#kubernetes-中的使用场景"><span><strong>Kubernetes 中的使用场景</strong></span></a></h5>
<ul>
<li><strong>k8s</strong> 用其存储配置数据，实现服务发现和集群管理</li>
<li><strong>k8s</strong>  的 <strong>API Server</strong> 把集群的状态存储在 <strong>etcd</strong> 中</li>
<li>并用其 <strong>watch</strong> 机制监控集群和回滚关键配置变化</li>
</ul>
<h2 id="_1-简介" tabindex="-1"><a class="header-anchor" href="#_1-简介"><span>1. 简介</span></a></h2>
<h5 id="特点" tabindex="-1"><a class="header-anchor" href="#特点"><span><strong>特点</strong></span></a></h5>
<ul>
<li>简单：安装配置简单，而且提供了 <strong>HTTP API</strong> 进行交互，使用也很简单</li>
<li>安全：支持 <strong>SSL</strong> 证书验证</li>
<li>快速：根据官方提供的 <strong>benchmark</strong> 数据，单实例支持每秒 <strong>2k+</strong> 读操作</li>
<li>可靠：采用 <strong>raft</strong> 算法，实现分布式系统数据的可用性和一致性</li>
</ul>
<h5 id="兼容性" tabindex="-1"><a class="header-anchor" href="#兼容性"><span><strong>兼容性</strong></span></a></h5>
<p><strong>etcd v2</strong> 和 <strong>etcd v3</strong> 不兼容，两者的 <strong>api</strong> 参数也不同，可用不同版本的 <strong>api</strong> 向 <strong>v3</strong> 写入数据，但读必须用 <strong>v3</strong> 版本的读</p>
<h5 id="协调服务" tabindex="-1"><a class="header-anchor" href="#协调服务"><span><strong>协调服务</strong></span></a></h5>
<p>一个协调服务，理想状态下需满足以下条件:</p>
<ul>
<li><strong>可用性角度：</strong> <mark>高可用</mark>，集群可容错，宕节点依然正常提供服务</li>
<li><strong>数据一致性角度：</strong> <mark>提供读取 最新 数据的机制</mark>，既然协调服务必须具备高可用的目标，就必然不能存在单点故障（ <em>single point of failure</em> ），而多节点又需要保证数据一致性</li>
<li><strong>容量角度：</strong> <mark>低容量、仅存储关键元数据配置</mark>，协调服务保存的仅仅是服务、节点的配置信息（属于控制面配置）*，而不是与用户相关的数据。所以存储上不需要考虑数据分片，无需过度设计</li>
<li><strong>功能：</strong> <mark>增删改查，监听数据变化的机制</mark>，由于为了保存服务状态信息，当服务有变更或异常，相比控制端定时去轮询检查一个个服务状态，<strong>若能快速推送变更事件给控制端，则可提升服务可用性、减少协调服务不必要的性能开销</strong></li>
<li><strong>运维复杂度：</strong> <mark>可维护性</mark>，在分布式系统中往往会遇到 <strong>硬/软件 Bug</strong>、人为操作错误导致节点宕机，以及新增、替换节点等运维场景，都需要对协调服务成员进行变更。若能提供 <strong>API</strong> 实现平滑地变更成员节点信息，就可以大大降低运维复杂度，减少运维成本，同时可避免因人工变更不规范可能导致的服务异常</li>
</ul>
<h5 id="比较-zookeeper" tabindex="-1"><a class="header-anchor" href="#比较-zookeeper"><span><strong>比较 Zookeeper</strong></span></a></h5>
<p><strong>ZK</strong> 已经满足了协调服务特点，但为何还用 <strong>etcd</strong></p>
<blockquote>
<p>高可用、数据一致性、功能三角度分析如下</p>
</blockquote>
<ul>
<li>不支持通过 <strong>API</strong> 安全地变更成员，需人工修改一个个节点的配置，并重启进程</li>
<li>姿势不正确，经常会 <strong>脑裂 !</strong>，因此适配云环境、平滑调整集群规模都很困难，运维成本高</li>
<li><strong>JAVA</strong> 编写，部署复杂，吃内存多，序列化是 <strong>Jute</strong> ，自己实现的 <strong>RPC</strong>，无法使用 <strong>curl</strong> 工具互动易用性差，无法使用 <strong>HTTP/S</strong> 安全性差</li>
<li><strong>ZK</strong> 生态不够活跃，<strong>Consul</strong> 未必可靠稳定</li>
</ul>
<div class="hint-container tip">
<p class="hint-container-title">提示</p>
<p><strong>etcd</strong> 的一致性协议易理解性，运维、安全等多维度上，比 <strong>ZK</strong> 都占据优势。</p>
</div>
<h5 id="适用场景" tabindex="-1"><a class="header-anchor" href="#适用场景"><span>适用场景</span></a></h5>
<ol>
<li>配置管理</li>
<li>服务注册、发现</li>
<li>选主</li>
<li>应用调度</li>
<li>分布式队列</li>
<li>分布式锁</li>
</ol>
<h5 id="读写性能" tabindex="-1"><a class="header-anchor" href="#读写性能"><span><strong>读写性能</strong></span></a></h5>
<p>按照官网给出的 <strong>Benchmark：</strong></p>
<p><strong>2核CPU</strong>，<strong>1.8G内存</strong>，<strong>SSD磁盘</strong> 这种配置下，单节点的写性能可以达到 <strong>16K QPS</strong>, 而先写后读也能达到 <strong>12K QPS</strong>，看上去性能还是比较可观的</p>
<h2 id="_2-工作原理" tabindex="-1"><a class="header-anchor" href="#_2-工作原理"><span>2. 工作原理</span></a></h2>
<p><strong>etcd</strong> 集群是一个分布式系统，由多个节点相互通信构成，整体对外服务，<strong>每个节点都存储了完整的数据</strong>，用 <strong>Raft</strong> 协议来维护集群内各个节点状态的一致性</p>
<ol>
<li>
<p>每个节点都会维护一个状态机</p>
</li>
<li>
<p>任意时刻至多存在一个有效的主节点</p>
</li>
<li>
<p>主节点处理所有来自客户端的写操作，并通过 <strong>Raft</strong> 协议保证写操作对状态机的改动会可靠的同步到其他节点</p>
</li>
</ol>
<p><strong>etcd 工作原理核心部分在于 Raft 协议。主要分为三个部分：选主，日志复制，安全性</strong></p>
<h3 id="_2-1-选主" tabindex="-1"><a class="header-anchor" href="#_2-1-选主"><span>2.1 选主</span></a></h3>
<p><strong>Raft</strong> 协议是用于维护一组服务节点数据一致性的协议，这一组服务节点构成一个集群，并且有一个主节点来对外提供服务</p>
<p>当集群初始化，或者主节点挂掉后，面临选主问题，集群中每个节点，任意时刻处于 <strong>Leader</strong>、<strong>Follower</strong>、 <strong>Candidate</strong> 这三个角色之一</p>
<h5 id="选举如下" tabindex="-1"><a class="header-anchor" href="#选举如下"><span><strong>选举如下</strong></span></a></h5>
<ul>
<li>初始化时，每个节点都是 <strong>Follower</strong> 角色</li>
<li><strong>Follower</strong> 一定时间内未收到 <strong>Leader</strong> 节点的心跳，会将自己角色提升为 <strong>Candidate</strong>，并发起一次选主投票
<ul>
<li>选票 <strong>包括自己在内 超过半数节点赞成</strong>，则选举成功</li>
<li>选票不足半数，则选举失败，或选举超时</li>
<li>若本轮未选出主节点，将进行下一轮选举（<em>出现这种情况，是由于多个节点同时选举，所有节点均未获得过半选票</em>）</li>
</ul>
</li>
<li>若 <strong>Candidate</strong> 节点收到来自主节点的心跳，立即终止选举流程，降低为 <strong>Follower</strong> 角色</li>
<li>为了避免陷入选主失败循环，每个节点未收到心跳发起选举的时间，是一定范围内的 <strong>随机值</strong>，这样能够<strong>避免两个节点同时发起选主</strong></li>
</ul>
<h3 id="_2-2-日志复制" tabindex="-1"><a class="header-anchor" href="#_2-2-日志复制"><span>2.2 日志复制</span></a></h3>
<p><strong>Leader</strong> 将每次操作记录日志，<strong>持久化</strong> 到本地磁盘，<strong>然后通过网络 IO 发送给其他节点</strong></p>
<p><strong>Follower</strong> 根据日志的逻辑时钟（<em>TERM</em>），和日志编号（<em>INDEX</em>）判断是否将该日志记录持久化到本地</p>
<p>当 <strong>Leader</strong> 收到 <strong>包括自己在内超过半数</strong> 的成功返回时，认为日志可提交（<em>committed</em>）将日志输入到状态机，并将结果返回给客户端。</p>
<div class="hint-container tip">
<p class="hint-container-title">提示</p>
<p>每次选主都会形成一个唯一的 <strong>TERM</strong> 编号，相当于逻辑时钟，每一条日志都有 <strong>全局唯一</strong> 的编号</p>
</div>
<h5 id="追加日志" tabindex="-1"><a class="header-anchor" href="#追加日志"><span><strong>追加日志</strong></span></a></h5>
<p><strong>Leader</strong> 通过网络 IO 向其他节点追加日志</p>
<ul>
<li>若 <strong>Follower</strong> 节点收到日志追加的消息
<ul>
<li>首先判断该日志的 <strong>TERM</strong> 是否过期</li>
<li>而后该日志条目的 <strong>INDEX</strong> 是否比当前 / 以及提交日志的 <strong>INDEX</strong> 更早
<ul>
<li>若过期 / 更早，则 <strong>拒绝追加</strong>，返回当前已经提交的日志编号</li>
<li>否则，将日志追加，并返回成功</li>
</ul>
</li>
</ul>
</li>
<li>当 <strong>Leader</strong> 收到 <strong>Follower</strong> 日志追加回复后
<ul>
<li>若发现有拒绝，将进入日志探测阶段，一条一条发送日志，直到目标节点接受日志，然后进入快速复制阶段，进行批量日志追加</li>
</ul>
</li>
</ul>
<div class="hint-container note">
<p class="hint-container-title">按如上日志复制逻辑</p>
<ul>
<li>
<p>集群中 慢节点不影响整个集群的性能</p>
</li>
<li>
<p>数据只从 <strong>Leader</strong> 复制到 <strong>Follower</strong> ，大大简化了逻辑流程</p>
</li>
</ul>
</div>
<h3 id="_2-3-安全性" tabindex="-1"><a class="header-anchor" href="#_2-3-安全性"><span>2.3 安全性</span></a></h3>
<div class="hint-container warning">
<p class="hint-container-title">注意</p>
<p>截止此刻，<strong>选主</strong> 及 <strong>日志复制</strong> 并不能保证节点间数据一致</p>
<ol>
<li>试想，某个节点挂了，一段时间后重启，并当选为了 <strong>Leader</strong></li>
<li>在其挂掉这段时间中，集群若有超过半数节点存活，依然会正常工作，那么必然 <strong>会有日志提交</strong></li>
<li>这些提交的日志无法传递给挂掉的节点，当挂掉的节点再次当选 <strong>Leader</strong> 时，它缺了部分已提交的日志</li>
</ol>
<p>此时按 <strong>Raft</strong> 协议，它将自己的日志复制给其他节点，会把集群已提交的日志给覆盖掉，显然是不可接受的</p>
</div>
<h5 id="其他协议解决办法" tabindex="-1"><a class="header-anchor" href="#其他协议解决办法"><span><strong>其他协议解决办法</strong></span></a></h5>
<p>新当选的 <strong>Leader</strong> 询问其他节点，和自己数据对比，<strong>确定出集群已提交数据</strong>，然后将缺失的数据同步过来</p>
<blockquote>
<p><strong>明显缺陷：</strong> 增加了集群恢复服务的时间（<em>选举阶段不可服务</em>），且增加了协议复杂度</p>
</blockquote>
<h5 id="raft-解决的办法" tabindex="-1"><a class="header-anchor" href="#raft-解决的办法"><span><strong>Raft 解决的办法</strong></span></a></h5>
<ul>
<li>
<p>选主逻辑中，对能够成为 <strong>Leader</strong> 的节点加以限制，确保选出的 <strong>Leader</strong> 一定包含集群已经提交的所有日志</p>
</li>
<li>
<p>若新 <strong>Leader</strong> 已包含集群所有提交的日志，就不需要和其他节点比对数据了</p>
</li>
</ul>
<blockquote>
<p>简化了流程，且缩短了集群恢复服务的时间</p>
</blockquote>
<div class="hint-container tip">
<p class="hint-container-title">这样限制后，能否选出主呢 ?</p>
<ul>
<li>
<p>只要超过半数节点存活，这样的主一定能够选出</p>
</li>
<li>
<p>已经提交的日志必然被集群中超过半数节点持久化，显然前个 <strong>Leader</strong> 提交的最后一条日志，也会被集群中大部分节点持久化</p>
</li>
<li>
<p>当 <strong>Leader</strong> 挂掉后，集群中仍有大部分节点存活，那 <strong>存活的节点中一定存在一个节点</strong> 包含了已经提交的日志</p>
</li>
</ul>
</div>
<h2 id="_3-使用说明" tabindex="-1"><a class="header-anchor" href="#_3-使用说明"><span>3. 使用说明</span></a></h2>
<p><strong>etcd</strong> 提供 <strong>HTTP</strong> 协议，最新版支持 <strong>gRPC</strong> 访问，具体接口情况如下：</p>
<ul>
<li>支持 <strong>PUT</strong> / <strong>GET</strong> / <strong>DELETE</strong> 接口</li>
<li>为了服务注册与发现，支持 <strong>WATCH</strong> 接口（<em>通过 http long poll 实现</em> ）</li>
<li>支持 <strong>KEY</strong> 持有 <strong>TTL</strong> 属性</li>
<li><strong>CAS</strong>（<em>compare and swap</em>）操作</li>
<li>支持 <strong>多 KEY 事务</strong> 操作</li>
<li>支持 <strong>目录</strong> 操作</li>
</ul>
<h3 id="_3-1-安装搭建" tabindex="-1"><a class="header-anchor" href="#_3-1-安装搭建"><span>3.1 安装搭建</span></a></h3>
<h4 id="单节点搭建-测试" tabindex="-1"><a class="header-anchor" href="#单节点搭建-测试"><span><strong>单节点搭建（<em>测试</em> ）</strong></span></a></h4>
<p><a href="https://github.com/etcd-io/etcd/releases" target="_blank" rel="noopener noreferrer">GitHub Releases</a></p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 下载</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">wget</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> https://github.com/coreos/etcd/releases/download/v3.x.x/etcd-v3.x.x-linux-amd64.tar.gz</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 解压</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">tar</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> xzvf</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> etcd-v3.1.5-linux-amd64.tar.gz</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 移动目录</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">mv</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> etcd-v3.1.5-linux-amd64</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /opt/etcd</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>解压后是一些文档和两个二进制文件 <strong>etcd</strong> （<em>Server</em>）和 <strong>etcdctl</strong>（<em>Client</em>）</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> ls</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># Documentation  etcd  etcdctl  README-etcdctl.md  README.md  READMEv2-etcdctl.md</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>操作后会生成一个 <strong>default.etcd</strong> ，用来存储 <strong>etcd</strong> 数据</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 启动单节点的 etcd 服务，运行 etcd 命令即可，若出现以下问题</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> etcd</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># ./etcd bash: ./etcd: 权限不够，需要提高文件的权限，再次启动</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> chmod</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 755</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> etcd</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> etcd</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 启动成功则出现类似如下提示</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">134431</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> I</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> | </span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">etcdmain:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> etcd</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> Version:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 3.x.xx</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">134941</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> I</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> | </span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">etcdmain:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> Git</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> SHA:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 27fc7e2</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">135324</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> I</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> | </span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">etcdmain:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> Go</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> Version:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> go1.x.x</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">135572</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> I</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> | </span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">etcdmain:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> Go</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> OS/Arch:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> linux/amd64</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">...</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="集群版-etcd-搭建" tabindex="-1"><a class="header-anchor" href="#集群版-etcd-搭建"><span><strong>集群版 etcd 搭建</strong></span></a></h4>
<h5 id="创建-systemd-服务" tabindex="-1"><a class="header-anchor" href="#创建-systemd-服务"><span>创建 systemd 服务</span></a></h5>
<p>设定 etcd 配置文件<br>
建立相关目录</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> mkdir</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -p</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /var/lib/etcd/</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> mkdir</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -p</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /opt/etcd/config/</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>创建 etcd 配置文件</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> cat</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> &#x3C;&#x3C;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">EOF</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> | </span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">sudo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> tee</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /opt/etcd/config/etcd.conf</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"> #节点名称</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">ETCD_NAME=$(</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">hostname</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -s</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">) #数据存放位置</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">ETCD_DATA_DIR=/var/lib/etcd</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">EOF</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建 systemd 配置文件</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> cat</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> &#x3C;&#x3C;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">EOF</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> | </span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">sudo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> tee</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> /etc/systemd/system/etcd.service</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">[Unit]</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">Description=Etcd Server</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">Documentation=https://github.com/coreos/etcd</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">After=network.target</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">[Service]</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">User=root</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">Type=notify</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">EnvironmentFile=-/opt/etcd/config/etcd.conf</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">ExecStart=/opt/etcd/etcd</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">Restart=on-failure</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">RestartSec=10s</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">LimitNOFILE=40000</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">[Install]</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">WantedBy=multi-user.target</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">EOF</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>启动 <strong>etcd</strong></p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">$</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> systemctl</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> daemon-reload</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> &#x26;&#x26; </span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">systemctl</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> enable</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> etcd</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> &#x26;&#x26; </span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">systemctl</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> restart</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> etcd</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h3 id="_3-2-操作说明" tabindex="-1"><a class="header-anchor" href="#_3-2-操作说明"><span>3.2 操作说明</span></a></h3>
<p>官方提供了 <strong>etcdctl</strong> 命令行客户端，无需使用 <strong>HTTP API</strong> 更为方便，命令分为 数据库操作 和 非数据库操作</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 查看帮助</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">etcdctl</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -h</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>建议先创建环境变量</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">touch</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> etcd.rc</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>键入类似如下</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># etcd v3 环境变量</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">export</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> ETCDCTL_WRITE_OUT</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"table"</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">export</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> ETCDCTL_API</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">3</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">export</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> ETCDCTL_ENDPOINTS</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"172.16.120.141:22379,172.16.120.142:22379,172.16.120.143:22379"</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><strong>ETCDCTL_WRITE_OUT：</strong>  输出信息格式，有 <code v-pre>&quot;fields&quot;</code>、<code v-pre>&quot;json&quot;</code>、 <code v-pre>&quot;protobuf&quot;</code>、 <code v-pre>&quot;simple&quot;</code>、 <code v-pre>&quot;table&quot;</code></li>
</ul>
<h5 id="列目录" tabindex="-1"><a class="header-anchor" href="#列目录"><span>列目录</span></a></h5>
<p>etcd3 没有 ls 使用 get 替代</p>
<ul>
<li>
<p>api 2 使用方法</p>
<pre><code>  ETCDCTL_API=2 etcdctl ls /
</code></pre>
</li>
<li>
<p>api 3 使用方法</p>
<pre><code>  ETCDCTL_API=3 etcdctl get /
</code></pre>
</li>
</ul>
<p>例如：</p>
<ul>
<li>
<p>查询所有 key 或 value :</p>
<pre><code>  $ etcdctl --endpoints=${ETCD_ENDPOINTS} get / --prefix --keys-only
  $ etcdctl --endpoints=${ETCD_ENDPOINTS} get / --prefix --print-value-only |jq [.]
</code></pre>
</li>
<li>
<p>使用证书查询：</p>
<pre><code>  $ export ETCDCTL_API=3
  $ etcdctl --endpoints=${ETCD_ENDPOINTS} --cacert=/etc/kubernetes/ssl/ca.pem --cert=/etc/kubernetes/ssl/admin.pem --key=/etc/kubernetes/ssl/admin-key.pem --prefix --keys-only=true get /
</code></pre>
</li>
</ul>
<h5 id="_4-修改键值对" tabindex="-1"><a class="header-anchor" href="#_4-修改键值对"><span>4.修改键值对</span></a></h5>
<ul>
<li>
<p>api v2 版本：</p>
<pre><code>  $ etcdctl set test hello
</code></pre>
</li>
<li>
<p>api v3 版本：</p>
<pre><code>  $ etcdctl put test hello
</code></pre>
</li>
</ul>
<p>参考：<a href="https://github.com/coreos/etcd/issues/6904" target="_blank" rel="noopener noreferrer">https://github.com/coreos/etcd/issues/6904</a></p>
<h3 id="数据库操作" tabindex="-1"><a class="header-anchor" href="#数据库操作"><span>数据库操作</span></a></h3>
<h4 id="set" tabindex="-1"><a class="header-anchor" href="#set"><span>set</span></a></h4>
<p>指定某个键的值</p>
<pre><code>etcdctl set /testdir/testkey &quot;Hello world&quot; --ttl '5'
Hello world

支持的选项包括：
-ttl '0' 该键值的超时时间(单位为秒)，不配置(默认为0)则永不超时

–swap-with-value value 若该键现在的值是value，则进行设置操作

–swap-with-index '0' 若该键现在的索引值是指定索引，则进行设置操作
</code></pre>
<h3 id="get" tabindex="-1"><a class="header-anchor" href="#get"><span>get</span></a></h3>
<p>获取指定键的值。</p>
<pre><code>etcdctl get /testdir/testkey
Hello world

# 等待5秒后，再执行
etcdctl get /testdir/testkey
keyError:  100: Key not found (/key) [8]
第一个get是5秒内的操作，第二get是5秒后的操作，此刻key的值已经消失了。

# 当键不存在时，则会报错
etcdctl get /testdir/testkey2
Error:  100: Key not found (/testdir/testkey2) [5]

支持的选项为：
--sort 对结果进行排序

--consistent 将请求发给主节点，保证获取内容的一致性。
</code></pre>
<h4 id="update" tabindex="-1"><a class="header-anchor" href="#update"><span>update：</span></a></h4>
<p>当键存在时，更新值内容</p>
<pre><code># 先设置一个5秒的值
$ etcdctl set /testdir/testkey &quot;Hello world&quot; --ttl '5'

# 再修改值
$ etcdctl update /testdir/testkey &quot;Hello&quot;
Hello

# 等待10秒，再次执行
$ etcdctl get /testdir/testkey
Hello
可以发现，即使10秒，也可以get到。说明ttl和value同时更新了！ （ttl不重新设置则更新为了0 永不超时）

当键不存在时，则会报错。例如:
$ etcdctl update /testdir/testkey2 &quot;Hello&quot;
Error:  100: Key not found (/testdir/testkey2) [6]
</code></pre>
<h4 id="rm" tabindex="-1"><a class="header-anchor" href="#rm"><span>rm</span></a></h4>
<p>删除某个键值。如果给定的键不存在，则创建一个新的键值。</p>
<pre><code># 删除
$ etcdctl rm /testdir/testkey
PrevNode.Value: Hello

#当键不存在时，则会报错
$ etcdctl rm /testdir/testkey
Error:  100: Key not found (/testdir/testkey) [7]

支持的选项:
-dir 如果键是个空目录或者键值对则删除

–recursive 删除目录和所有子键

–with-value 检查现有的值是否匹配

–with-index ‘0’检查现有的index是否匹配
</code></pre>
<h4 id="mk" tabindex="-1"><a class="header-anchor" href="#mk"><span>mk</span></a></h4>
<p>如果给定的键不存在，则创建一个新的键值。</p>
<pre><code>$ etcdctl mk /testdir/testkey &quot;Hello world&quot;
Hello world

# 当键存在的时候，执行该命令会报错
$ etcdctl mk /testdir/testkey &quot;Hello world&quot;
Error:  105: Key already exists (/testdir/testkey) [8]
</code></pre>
<h4 id="mkdir" tabindex="-1"><a class="header-anchor" href="#mkdir"><span>mkdir</span></a></h4>
<p>如果给定的键目录不存在，则创建一个新的键目录。</p>
<pre><code>$ etcdctl mkdir testdir2

# 当键目录存在的时候，执行该命令会报错
$ etcdctl mkdir testdir2
Error:  105: Key already exists (/testdir2) [9]
</code></pre>
<h4 id="setdir" tabindex="-1"><a class="header-anchor" href="#setdir"><span>setdir</span></a></h4>
<p>创建一个键目录。如果目录不存在就创建，如果目录存在更新目录 TTL。</p>
<pre><code>$ etcdctl setdir testdir3
</code></pre>
<h4 id="updatedir" tabindex="-1"><a class="header-anchor" href="#updatedir"><span>updatedir</span></a></h4>
<p>更新一个已经存在的目录。</p>
<pre><code>$ etcdctl updatedir testdir2
</code></pre>
<h4 id="rmdir" tabindex="-1"><a class="header-anchor" href="#rmdir"><span>rmdir</span></a></h4>
<p>删除一个空目录，或者键值对。</p>
<pre><code>$ etcdctl setdir dir1
$ etcdctl rmdir dir1

# 若目录不空，会报错
$ etcdctl set /dir/testkey hi
hi
$ etcdctl rmdir /dir
Error:  108: Directory not empty (/dir) [17]
</code></pre>
<h4 id="ls" tabindex="-1"><a class="header-anchor" href="#ls"><span>ls</span></a></h4>
<p>列出目录(默认为根目录)下的键或者子目录，默认不显示子目录中内容。</p>
<pre><code>$ etcdctl ls
/testdir
/testdir2
/dir

$ etcdctl ls dir
/dir/testkey

支持的选项：
--sort 将输出结果排序

--recursive 如果目录下有子目录，则递归输出其中的内容

-p 对于输出为目录，在最后添加/进行区分
</code></pre>
<h3 id="非数据库操作" tabindex="-1"><a class="header-anchor" href="#非数据库操作"><span>非数据库操作</span></a></h3>
<ul>
<li>
<p>backup</p>
<p>备份 etcd 的数据。</p>
<pre><code>  $ etcdctl backup --data-dir /var/lib/etcd  --backup-dir /home/etcd_backup
</code></pre>
<p>支持的选项包括:</p>
<pre><code>  --data-dir  etcd的数据目录
  --backup-dir 备份到指定路径
</code></pre>
</li>
<li>
<p>watch</p>
<p>监测一个键值的变化，一旦键值发生更新，就会输出最新的值并退出。</p>
<p>例如:用户更新 testkey 键值为 Hello watch。</p>
<pre><code>  $ etcdctl get /testdir/testkey
  Hello world
  $ etcdctl set /testdir/testkey &quot;Hello watch&quot;
  Hello watch
  $ etcdctl watch testdir/testkey
  Hello watch
</code></pre>
<p>支持的选项包括:</p>
<pre><code>  --forever  一直监测直到用户按CTRL+C退出
  --after-index '0' 在指定index之前一直监测
  --recursive 返回所有的键值和子键值
</code></pre>
</li>
<li>
<p>exec-watch</p>
<p>监测一个键值的变化，一旦键值发生更新，就执行给定命令。</p>
<p>例如：用户更新 testkey 键值。</p>
<pre><code>  $ etcdctl exec-watch testdir/testkey -- sh -c 'ls'
  config  Documentation  etcd  etcdctl  README-etcdctl.md  README.md  READMEv2-etcdctl.md
</code></pre>
<p>支持的选项包括:</p>
<pre><code>  --after-index '0' 在指定 index 之前一直监测
  --recursive 返回所有的键值和子键值
</code></pre>
</li>
<li>
<p>member</p>
<p>通过 list、add、remove 命令列出、添加、删除 etcd 实例到 etcd 集群中。</p>
<p>查看集群中存在的节点</p>
<pre><code>  $ etcdctl member list
  8e9e05c52164694d: name=dev-master-01 peerURLs=http://localhost:2380 clientURLs=http://localhost:2379 isLeader=true
</code></pre>
<p>删除集群中存在的节点</p>
<pre><code>  $ etcdctl member remove 8e9e05c52164694d
  Removed member 8e9e05c52164694d from cluster
</code></pre>
<p>向集群中新加节点</p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code><span class="line"><span>  $ etcdctl member add etcd3 http://192.168.1.100:2380</span></span>
<span class="line"><span>  Added member named etcd3 with ID 8e9e05c52164694d to cluster</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
</div></template>


