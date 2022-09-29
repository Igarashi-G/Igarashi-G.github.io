<template><div><h1 id="docker-命令" tabindex="-1"><a class="header-anchor" href="#docker-命令" aria-hidden="true">#</a> Docker 命令</h1>
<h2 id="docker-常用命令" tabindex="-1"><a class="header-anchor" href="#docker-常用命令" aria-hidden="true">#</a> Docker 常用命令</h2>
<p>可以在官网找到 <a href="https://docs.docker.com/reference/" target="_blank" rel="noopener noreferrer">所有命令<ExternalLinkIcon/></a></p>
<blockquote>
<p>可以使用 <kbd>Ctrl</kbd> + <kbd>F</kbd> 在页面中快速搜索</p>
</blockquote>
<h3 id="docker-version" tabindex="-1"><a class="header-anchor" href="#docker-version" aria-hidden="true">#</a> <code v-pre>docker version</code></h3>
<p>查看 Docker 版本</p>
<details class="custom-container details"><summary>示例</summary>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>Client: Docker Engine - Community
 Cloud integration: <span class="token number">1.0</span>.7
 Version:           <span class="token number">20.10</span>.2
 API version:       <span class="token number">1.41</span>
 Go version:        go1.13.15
 Git commit:        2291f61
 Built:             Mon Dec <span class="token number">28</span> <span class="token number">16</span>:14:16 <span class="token number">2020</span>
 OS/Arch:           windows/amd64
 Context:           default
 Experimental:      <span class="token boolean">true</span>

Server: Docker Engine - Community
 Engine:
  Version:          <span class="token number">20.10</span>.2
  API version:      <span class="token number">1.41</span> <span class="token punctuation">(</span>minimum version <span class="token number">1.12</span><span class="token punctuation">)</span>
  Go version:       go1.13.15
  Git commit:       8891c58
  Built:            Mon Dec <span class="token number">28</span> <span class="token number">16</span>:15:28 <span class="token number">2020</span>
  OS/Arch:          linux/amd64
  Experimental:     <span class="token boolean">false</span>
 containerd:
  Version:          <span class="token number">1.4</span>.3
  GitCommit:        269548fa27e0089a8b8278fc4fc781d7f65a939b
 runc:
  Version:          <span class="token number">1.0</span>.0-rc92
  GitCommit:        ff819c7e9184c13b7c2607fe6c30ae19403a7aff
 docker-init:
  Version:          <span class="token number">0.19</span>.0
  GitCommit:        de40ad0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>
<h3 id="docker-info" tabindex="-1"><a class="header-anchor" href="#docker-info" aria-hidden="true">#</a> <code v-pre>docker info</code></h3>
<p>查看 Docker 的系统信息</p>
<details class="custom-container details"><summary>示例</summary>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>Client:
 Context:    default
 Debug Mode: <span class="token boolean">false</span>
 Plugins:
  app: Docker App <span class="token punctuation">(</span>Docker Inc., v0.9.1-beta3<span class="token punctuation">)</span>
  buildx: Build with BuildKit <span class="token punctuation">(</span>Docker Inc., v0.5.1-docker<span class="token punctuation">)</span>
  scan: Docker Scan <span class="token punctuation">(</span>Docker Inc., v0.5.0<span class="token punctuation">)</span>

Server:
 Containers: <span class="token number">1</span>
  Running: <span class="token number">1</span>
  Paused: <span class="token number">0</span>
  Stopped: <span class="token number">0</span>
 Images: <span class="token number">1</span>
 Server Version: <span class="token number">20.10</span>.2
 Storage Driver: overlay2
  Backing Filesystem: extfs
  Supports d_type: <span class="token boolean">true</span>
  Native Overlay Diff: <span class="token boolean">true</span>
 Logging Driver: json-file
 Cgroup Driver: cgroupfs
 Cgroup Version: <span class="token number">1</span>
 Plugins:
  Volume: <span class="token builtin class-name">local</span>
  Network: bridge <span class="token function">host</span> ipvlan macvlan null overlay
  Log: awslogs fluentd gcplogs gelf journald json-file <span class="token builtin class-name">local</span> logentries splunk syslog
 Swarm: inactive
 Runtimes: runc io.containerd.runc.v2 io.containerd.runtime.v1.linux
 Default Runtime: runc
 Init Binary: docker-init
 containerd version: 269548fa27e0089a8b8278fc4fc781d7f65a939b
 runc version: ff819c7e9184c13b7c2607fe6c30ae19403a7aff
 init version: de40ad0
 Security Options:
  seccomp
   Profile: default
 Kernel Version: <span class="token number">5.4</span>.72-microsoft-standard-WSL2
 Operating System: Docker Desktop
 OSType: linux
 Architecture: x86_64
 CPUs: <span class="token number">8</span>
 Total Memory: <span class="token number">6</span>.126GiB
 Name: docker-desktop
 ID: GEVB:2QBS:GAWG:ZFNQ:7ITG:VHFB:MP2G:CKI4:7RTO:2E2M:H6SH:KQKO
 Docker Root Dir: /var/lib/docker
 Debug Mode: <span class="token boolean">false</span>
 Registry: https://index.docker.io/v1/
 Labels:
 Experimental: <span class="token boolean">false</span>
 Insecure Registries:
  <span class="token number">127.0</span>.0.0/8
 Live Restore Enabled: <span class="token boolean">false</span>

WARNING: No blkio weight support
WARNING: No blkio weight_device support
WARNING: No blkio throttle.read_bps_device support
WARNING: No blkio throttle.write_bps_device support
WARNING: No blkio throttle.read_iops_device support
WARNING: No blkio throttle.write_iops_device support
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>
<h3 id="docker-命令-help" tabindex="-1"><a class="header-anchor" href="#docker-命令-help" aria-hidden="true">#</a> <code v-pre>docker &lt;命令&gt; --help</code></h3>
<p>查看 Docker 命令帮助</p>
<details class="custom-container details"><summary>示例</summary>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> <span class="token parameter variable">--help</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>Usage:  docker [OPTIONS] COMMAND

A self-sufficient runtime for containers

Options:
      --config string      Location of client config files (default
                           "C:\\Users\\Yue_plus\\.docker")
  -c, --context string     Name of the context to use to connect to the
                           daemon (overrides DOCKER_HOST env var and
                           default context set with "docker context use")
  -D, --debug              Enable debug mode
  -H, --host list          Daemon socket(s) to connect to
  -l, --log-level string   Set the logging level
                           ("debug"|"info"|"warn"|"error"|"fatal")
                           (default "info")
      --tls                Use TLS; implied by --tlsverify
      --tlscacert string   Trust certs signed only by this CA (default
                           "C:\\Users\\Yue_plus\\.docker\\ca.pem")
      --tlscert string     Path to TLS certificate file (default
                           "C:\\Users\\Yue_plus\\.docker\\cert.pem")
      --tlskey string      Path to TLS key file (default
                           "C:\\Users\\Yue_plus\\.docker\\key.pem")
      --tlsverify          Use TLS and verify the remote
  -v, --version            Print version information and quit

Management Commands:
  app*        Docker App (Docker Inc., v0.9.1-beta3)
  builder     Manage builds
  buildx*     Build with BuildKit (Docker Inc., v0.5.1-docker)
  config      Manage Docker configs
  container   Manage containers
  context     Manage contexts
  image       Manage images
  manifest    Manage Docker image manifests and manifest lists
  network     Manage networks
  node        Manage Swarm nodes
  plugin      Manage plugins
  scan*       Docker Scan (Docker Inc., v0.5.0)
  secret      Manage Docker secrets
  service     Manage services
  stack       Manage Docker stacks
  swarm       Manage Swarm
  system      Manage Docker
  trust       Manage trust on Docker images
  volume      Manage volumes

Commands:
  attach      Attach local standard input, output, and error streams to a running container
  build       Build an image from a Dockerfile
  commit      Create a new image from a container's changes
  cp          Copy files/folders between a container and the local filesystem
  create      Create a new container
  diff        Inspect changes to files or directories on a container's filesystem
  events      Get real time events from the server
  exec        Run a command in a running container
  export      Export a container's filesystem as a tar archive
  history     Show the history of an image
  images      List images
  import      Import the contents from a tarball to create a filesystem image
  info        Display system-wide information
  inspect     Return low-level information on Docker objects
  kill        Kill one or more running containers
  load        Load an image from a tar archive or STDIN
  login       Log in to a Docker registry
  logout      Log out from a Docker registry
  logs        Fetch the logs of a container
  pause       Pause all processes within one or more containers
  port        List port mappings or a specific mapping for the container
  ps          List containers
  pull        Pull an image or a repository from a registry
  push        Push an image or a repository to a registry
  rename      Rename a container
  restart     Restart one or more containers
  rm          Remove one or more containers
  rmi         Remove one or more images
  run         Run a command in a new container
  save        Save one or more images to a tar archive (streamed to STDOUT by default)
  search      Search the Docker Hub for images
  start       Start one or more stopped containers
  stats       Display a live stream of container(s) resource usage statistics
  stop        Stop one or more running containers
  tag         Create a tag TARGET_IMAGE that refers to SOURCE_IMAGE
  top         Display the running processes of a container
  unpause     Unpause all processes within one or more containers
  update      Update configuration of one or more containers
  version     Show the Docker version information
  wait        Block until one or more containers stop, then print their exit codes

Run 'docker COMMAND --help' for more information on a command.

To get more help with docker, check out our guides at https://docs.docker.com/go/guides/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>
<h3 id="docker-search" tabindex="-1"><a class="header-anchor" href="#docker-search" aria-hidden="true">#</a> <code v-pre>docker search</code></h3>
<p>在 <a href="https://hub.docker.com/" target="_blank" rel="noopener noreferrer">Docker Hub<ExternalLinkIcon/></a> 上搜索镜像。</p>
<p>语法：<code v-pre>docker search [OPTIONS] TERM</code></p>
<p>选项：</p>
<ul>
<li><code v-pre>--filter , -f</code>
<ul>
<li>根据提供的条件过滤输出</li>
</ul>
</li>
<li><code v-pre>--format</code>
<ul>
<li>使用 Go 模板进行漂亮的打印搜索</li>
</ul>
</li>
<li><code v-pre>--limit</code>
<ul>
<li>默认为 <code v-pre>25</code></li>
<li>最多搜索结果数</li>
</ul>
</li>
<li><code v-pre>--no-trunc</code>
<ul>
<li>不截断输出</li>
</ul>
</li>
</ul>
<h3 id="docker-pull" tabindex="-1"><a class="header-anchor" href="#docker-pull" aria-hidden="true">#</a> <code v-pre>docker pull</code></h3>
<p>从仓库拉取镜像。</p>
<p>语法：<code v-pre>docker pull [OPTIONS] NAME[:TAG|@DIGEST]</code></p>
<blockquote>
<p><a href="https://docs.docker.com/engine/reference/commandline/pull/" target="_blank" rel="noopener noreferrer">参考官网手册<ExternalLinkIcon/></a></p>
</blockquote>
<p>选项：</p>
<ul>
<li><code v-pre>--all-tags , -a</code>
<ul>
<li>下载仓库中所有标记的镜像</li>
</ul>
</li>
<li><code v-pre>--disable-content-trust</code>
<ul>
<li>默认为：<code v-pre>true</code></li>
<li>跳过镜像验证</li>
</ul>
</li>
<li><code v-pre>--platform</code>
<ul>
<li><code v-pre>1.32+</code> 可用</li>
<li>如果服务器支持多平台，则设置平台</li>
</ul>
</li>
<li><code v-pre>--quiet , -q</code>
<ul>
<li>禁止详细输出</li>
</ul>
</li>
</ul>
<h3 id="docker-run" tabindex="-1"><a class="header-anchor" href="#docker-run" aria-hidden="true">#</a> <code v-pre>docker run</code></h3>
<p>在新容器中运行命令。</p>
<p>语法：<code v-pre>docker run [OPTIONS] IMAGE [COMMAND] [ARG...]</code></p>
<blockquote>
<p><a href="https://docs.docker.com/engine/reference/commandline/run/" target="_blank" rel="noopener noreferrer">参考官方手册<ExternalLinkIcon/></a></p>
</blockquote>
<p>选项：</p>
<ul>
<li><code v-pre>--add-host</code>
<ul>
<li>添加自定义主机到 IP 映射（主机：ip）</li>
</ul>
</li>
<li><code v-pre>--attach , -a</code>
<ul>
<li>连接到 STDIN、STDOUT 或 STDERR</li>
</ul>
</li>
<li><code v-pre>--blkio-weight</code>
<ul>
<li>块 IO（相对权重），介于 10 和 1000 之间，或 0 禁用（默认 0）</li>
</ul>
</li>
<li><code v-pre>--blkio-weight-device</code>
<ul>
<li>块 IO 权重（相对设备重量）</li>
</ul>
</li>
<li><code v-pre>--cap-add</code>
<ul>
<li>添加 Linux 功能</li>
</ul>
</li>
<li><code v-pre>--cap-drop</code>
<ul>
<li>放弃 Linux 功能</li>
</ul>
</li>
<li><code v-pre>--cgroup-parent</code>
<ul>
<li>容器的可选父 cgroup</li>
</ul>
</li>
<li>`--cgroupns
<ul>
<li><code v-pre>1.41+</code> 可用</li>
<li>要使用的 C 组命名空间（主机|私有）&quot;主机&quot;：
在 Docker 主机的 cgroup 命名空间&quot;私有&quot;中运行容器：
在其自己的专用 cgroup 命名空间中运行容器'：
使用由守护程序上的默认 cgroupns 模式选项配置的 cgroup 命名空间（默认）</li>
</ul>
</li>
<li><code v-pre>--cidfile</code>
<ul>
<li>将容器 ID 写入文件</li>
</ul>
</li>
<li><code v-pre>--cpu-count</code>
<ul>
<li>CPU 计数（仅窗口）</li>
</ul>
</li>
<li><code v-pre>--cpu-percent</code>
<ul>
<li>CPU 百分比（仅窗口）</li>
</ul>
</li>
<li><code v-pre>--cpu-period</code>
<ul>
<li>限制 CPU CFS（完全公平的调度程序）周期</li>
</ul>
</li>
<li><code v-pre>--cpu-quota</code>
<ul>
<li>限制 CPU CFS（完全公平的调度程序）配额</li>
</ul>
</li>
<li><code v-pre>--cpu-rt-period</code>
<ul>
<li><code v-pre>1.25+</code> 可用</li>
<li>以微秒为单位限制 CPU 实时周期</li>
</ul>
</li>
<li><code v-pre>--cpu-rt-runtime</code>
<ul>
<li><code v-pre>1.25+</code> 可用</li>
<li>以微秒为单位限制 CPU 实时运行时间</li>
</ul>
</li>
<li><code v-pre>--cpu-shares , -c</code>
<ul>
<li>CPU 共享（相对权重）</li>
</ul>
</li>
<li><code v-pre>--cpus</code>
<ul>
<li><code v-pre>1.25+</code> 可用</li>
<li>CPU 数量</li>
</ul>
</li>
<li><code v-pre>--cpuset-cpus</code>
<ul>
<li>允许执行的 CPU （0-3， 0，1）</li>
</ul>
</li>
<li><code v-pre>--cpuset-mems</code>
<ul>
<li>允许执行的 MEM （0-3， 0，1）</li>
</ul>
</li>
<li><code v-pre>--detach , -d</code>
<ul>
<li>在后台运行容器并打印容器 ID</li>
</ul>
</li>
<li><code v-pre>--detach-keys</code>
<ul>
<li>覆盖分离容器的键序列</li>
</ul>
</li>
<li><code v-pre>--device</code>
<ul>
<li>将主机设备添加到容器</li>
</ul>
</li>
<li><code v-pre>--device-cgroup-rule</code>
<ul>
<li>将规则添加到 cGroup 允许的设备列表</li>
</ul>
</li>
<li><code v-pre>--device-read-bps</code>
<ul>
<li>限制设备读取速率（字节/秒）</li>
</ul>
</li>
<li><code v-pre>--device-read-iops</code>
<ul>
<li>限制设备读取速率（IO/秒）</li>
</ul>
</li>
<li><code v-pre>--device-write-bps</code>
<ul>
<li>将写入速率（字节/秒）限制为设备</li>
</ul>
</li>
<li><code v-pre>--device-write-iops</code>
<ul>
<li>将写入速率（IO/秒）限制为设备</li>
</ul>
</li>
<li><code v-pre>--disable-content-trust</code>
<ul>
<li>默认为：<code v-pre>true</code></li>
<li>跳过镜像验证</li>
</ul>
</li>
<li><code v-pre>--dns</code>
<ul>
<li>设置自定义 DNS 服务器</li>
</ul>
</li>
<li><code v-pre>--dns-opt</code>
<ul>
<li>设置 DNS 选项</li>
</ul>
</li>
<li><code v-pre>--dns-option</code>
<ul>
<li>设置 DNS 选项</li>
</ul>
</li>
<li><code v-pre>--dns-search</code>
<ul>
<li>设置自定义 DNS 搜索域</li>
</ul>
</li>
<li><code v-pre>--domainname</code>
<ul>
<li>容器 NIS 域名</li>
</ul>
</li>
<li><code v-pre>--entrypoint</code>
<ul>
<li>覆盖图像的默认入口点</li>
</ul>
</li>
<li><code v-pre>--env , -e</code>
<ul>
<li>设置环境变量</li>
</ul>
</li>
<li><code v-pre>--env-file</code>
<ul>
<li>在环境变量文件中读取</li>
</ul>
</li>
<li><code v-pre>--expose</code>
<ul>
<li>暴露端口或一系列端口</li>
</ul>
</li>
<li><code v-pre>--gpus</code>
<ul>
<li><code v-pre>1.40+</code> 可用</li>
<li>要添加到容器的 GPU 设备（&quot;全部&quot;通过所有 GPU）</li>
</ul>
</li>
<li><code v-pre>--group-add</code>
<ul>
<li>添加要加入的其他组</li>
</ul>
</li>
<li><code v-pre>--health-cmd</code>
<ul>
<li>命令运行以检查运行状况</li>
</ul>
</li>
<li><code v-pre>--health-interval</code>
<ul>
<li>运行检查之间的时间（ms | s | h）（默认 0s）</li>
</ul>
</li>
<li><code v-pre>--health-retries</code>
<ul>
<li>报告不正常行为所需的连续故障</li>
</ul>
</li>
<li><code v-pre>--health-start-period</code>
<ul>
<li><code v-pre>1.29+</code> 可用</li>
<li>容器的开始周期在开始运行状况重倒数之前初始化（ms | s | h）（默认 0s）</li>
</ul>
</li>
<li><code v-pre>--health-timeout</code>
<ul>
<li>允许运行一次检查的最大时间（ms | s | h）（默认 0s）</li>
</ul>
</li>
<li><code v-pre>--help</code>
<ul>
<li>输出帮助</li>
</ul>
</li>
<li><code v-pre>--hostname , -h</code>
<ul>
<li>容器主机名</li>
</ul>
</li>
<li><code v-pre>--init</code>
<ul>
<li><code v-pre>1.25+</code> 可用</li>
<li>在容器内运行一个 init，该容器转发信号并收获进程</li>
</ul>
</li>
<li><code v-pre>--interactive , -i</code>
<ul>
<li>即使未连接，也保持 STDIN 打开</li>
</ul>
</li>
<li><code v-pre>--io-maxbandwidth</code>
<ul>
<li>系统驱动器的最大 IO 带宽限制（仅窗口）</li>
</ul>
</li>
<li><code v-pre>--io-maxiops</code>
<ul>
<li>系统驱动器的最大 IOps 限制（仅 Windows）</li>
</ul>
</li>
<li><code v-pre>--ip</code>
<ul>
<li>IPv4 地址（例如：<code v-pre>172.30.100.104</code>）</li>
</ul>
</li>
<li><code v-pre>--ip6</code>
<ul>
<li>IPv6 地址（例如：<code v-pre>2001:db8::33</code>）</li>
</ul>
</li>
<li><code v-pre>--ipc</code>
<ul>
<li>要使用的 IPC 模式</li>
</ul>
</li>
<li><code v-pre>--isolation</code>
<ul>
<li>容器隔离技术</li>
</ul>
</li>
<li><code v-pre>--kernel-memory</code>
<ul>
<li>内核内存限制</li>
</ul>
</li>
<li><code v-pre>--label , -l</code>
<ul>
<li>在容器上设置元数据</li>
</ul>
</li>
<li><code v-pre>--label-file</code>
<ul>
<li>在标签的行分隔文件中读取</li>
</ul>
</li>
<li><code v-pre>--link</code>
<ul>
<li>将链接添加到另一个容器</li>
</ul>
</li>
<li><code v-pre>--link-local-ip</code>
<ul>
<li>容器 IPv4/IPv6 链路本地地址</li>
</ul>
</li>
<li><code v-pre>--log-driver</code>
<ul>
<li>容器的日志记录驱动程序</li>
</ul>
</li>
<li><code v-pre>--log-opt</code>
<ul>
<li>日志驱动程序选项</li>
</ul>
</li>
<li><code v-pre>--mac-address</code>
<ul>
<li>容器 MAC 地址（例如：<code v-pre>92:d0:c6:0a:29:33</code>）</li>
</ul>
</li>
<li><code v-pre>--memory , -m</code>
<ul>
<li>内存限制</li>
</ul>
</li>
<li><code v-pre>--memory-reservation</code>
<ul>
<li>内存软限制</li>
</ul>
</li>
<li><code v-pre>--memory-swap</code>
<ul>
<li>交换限制等于内存加交换：'-1'，支持无限制交换</li>
</ul>
</li>
<li><code v-pre>--memory-swappiness</code>
<ul>
<li>默认为：<code v-pre>-1</code></li>
<li>调整容器内存交换（0 到 100）</li>
</ul>
</li>
<li><code v-pre>--mount</code>
<ul>
<li>将文件系统装载附加到容器</li>
</ul>
</li>
<li><code v-pre>--name</code>
<ul>
<li>为容器分配名称</li>
</ul>
</li>
<li><code v-pre>--net</code>
<ul>
<li>将容器连接到网络</li>
</ul>
</li>
<li><code v-pre>--net-alias</code>
<ul>
<li>为容器添加网络范围别名</li>
</ul>
</li>
<li><code v-pre>--network</code>
<ul>
<li>将容器连接到网络</li>
</ul>
</li>
<li><code v-pre>--network-alias</code>
<ul>
<li>为容器添加网络范围别名</li>
</ul>
</li>
<li><code v-pre>--no-healthcheck</code>
<ul>
<li>禁用任何容器指定的运行状况检查</li>
</ul>
</li>
<li><code v-pre>--oom-kill-disable</code>
<ul>
<li>禁用 OOM 杀手</li>
</ul>
</li>
<li><code v-pre>--oom-score-adj</code>
<ul>
<li>调整主机的 OOM 首选项 （-1000 到 1000）</li>
</ul>
</li>
<li><code v-pre>--pid</code>
<ul>
<li>要使用的 PID 命名空间</li>
</ul>
</li>
<li><code v-pre>--pids-limit</code>
<ul>
<li>调整容器皮斯限制（设置为 -1 无限制）</li>
</ul>
</li>
<li><code v-pre>--platform</code>
<ul>
<li><code v-pre>1.32+</code> 可用</li>
<li>设置平台，如果服务器是多平台功能</li>
</ul>
</li>
<li><code v-pre>--privileged</code>
<ul>
<li>向此容器授予扩展权限</li>
</ul>
</li>
<li><code v-pre>--publish , -p</code>
<ul>
<li>将容器的端口发布到主机</li>
</ul>
</li>
<li><code v-pre>--publish-all , -P</code>
<ul>
<li>将所有公开端口发布到随机端口</li>
</ul>
</li>
<li><code v-pre>--pull missing</code>
<ul>
<li>运行前拉图像（&quot;始终&quot;|&quot;缺少&quot;|&quot;从不&quot;）</li>
</ul>
</li>
<li><code v-pre>--read-only</code>
<ul>
<li>将容器的根文件系统装载为只读</li>
</ul>
</li>
<li><code v-pre>--restart no</code>
<ul>
<li>重新启动策略，在容器退出时应用</li>
</ul>
</li>
<li><code v-pre>--rm</code>
<ul>
<li>容器退出时自动移除容器</li>
</ul>
</li>
<li><code v-pre>--runtime</code>
<ul>
<li>用于此容器的运行时</li>
</ul>
</li>
<li><code v-pre>--security-opt</code>
<ul>
<li>安全选项</li>
</ul>
</li>
<li><code v-pre>--shm-size</code>
<ul>
<li>大小 /开发/shm</li>
</ul>
</li>
<li><code v-pre>--sig-proxy</code>
<ul>
<li>默认为 <code v-pre>true</code></li>
<li>代理接收到进程的信号</li>
</ul>
</li>
<li><code v-pre>--stop-signal</code>
<ul>
<li>SIGTERM 停止容器的信号</li>
</ul>
</li>
<li><code v-pre>--stop-timeout</code>
<ul>
<li><code v-pre>1.25+</code> 可用</li>
<li>停止容器的超时（以秒为单位）</li>
</ul>
</li>
<li><code v-pre>--storage-opt</code>
<ul>
<li>容器的存储驱动程序选项</li>
</ul>
</li>
<li><code v-pre>--sysctl</code>
<ul>
<li>Sysctl 选项</li>
</ul>
</li>
<li><code v-pre>--tmpfs</code>
<ul>
<li>装载 tmpfs 目录</li>
</ul>
</li>
<li><code v-pre>--tty , -t</code>
<ul>
<li>分配伪 TTY</li>
</ul>
</li>
<li><code v-pre>--ulimit</code>
<ul>
<li>极限选项</li>
</ul>
</li>
<li><code v-pre>--user , -u</code>
<ul>
<li>用户名或 UID（格式：<code v-pre>&lt;name|uid&gt;[:&lt;group|gid&gt;]</code>）</li>
</ul>
</li>
<li><code v-pre>--userns</code>
<ul>
<li>要使用的用户名空间</li>
</ul>
</li>
<li><code v-pre>--uts</code>
<ul>
<li>要使用的 UTS 命名空间</li>
</ul>
</li>
<li><code v-pre>--volume , -v</code>
<ul>
<li>绑定装载卷</li>
</ul>
</li>
<li><code v-pre>--volume-driver</code>
<ul>
<li>容器的可选卷驱动程序</li>
</ul>
</li>
<li><code v-pre>--volumes-from</code>
<ul>
<li>从指定的容器中装载卷</li>
</ul>
</li>
<li><code v-pre>--workdir , -w</code>
<ul>
<li>容器内的工作目录</li>
</ul>
</li>
</ul>
<h3 id="docker-exec" tabindex="-1"><a class="header-anchor" href="#docker-exec" aria-hidden="true">#</a> <code v-pre>docker exec</code></h3>
<p>在正在运行的容器中执行命令。</p>
<p>语法：<code v-pre>docker exec [OPTIONS] CONTAINER COMMAND [ARG...]</code></p>
<blockquote>
<p><a href="https://docs.docker.com/engine/reference/commandline/exec/" target="_blank" rel="noopener noreferrer">参考官网手册<ExternalLinkIcon/></a></p>
</blockquote>
<p>选项：</p>
<ul>
<li><code v-pre>--detach , -d</code>
<ul>
<li>分离模式：在后台运行命令</li>
</ul>
</li>
<li><code v-pre>--detach-keys</code>
<ul>
<li>覆盖分离容器的键序列</li>
</ul>
</li>
<li><code v-pre>--env , -e</code>
<ul>
<li><code v-pre>1.25+</code> 以上可用</li>
<li>设置环境变量</li>
</ul>
</li>
<li><code v-pre>--env-file</code>
<ul>
<li><code v-pre>1.25+</code> 以上可用</li>
<li>在环境变量文件中读取</li>
</ul>
</li>
<li><code v-pre>--interactive , -i</code>
<ul>
<li>即使未连接，也保持 STDIN 打开</li>
</ul>
</li>
<li><code v-pre>--privileged</code>
<ul>
<li>向命令授予扩展权限</li>
</ul>
</li>
<li><code v-pre>--tty , -t</code>
<ul>
<li>分配伪 TTY</li>
</ul>
</li>
<li><code v-pre>--user , -u</code>
<ul>
<li>用户名或 UID（格式：<code v-pre>&lt;name|uid&gt;[:&lt;group|gid&gt;]</code>）</li>
</ul>
</li>
<li><code v-pre>--workdir , -w</code>
<ul>
<li><code v-pre>1.35+</code> 以上可用</li>
<li>容器内的工作目录</li>
</ul>
</li>
</ul>
</div></template>


