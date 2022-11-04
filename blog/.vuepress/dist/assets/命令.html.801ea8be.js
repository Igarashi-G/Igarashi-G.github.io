import{_ as o}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as d,c,e as a,a as e,b as i,d as n,f as s,r}from"./app.3e57035c.js";const u={},t=e("p",null,[e("strong",null,"Docker"),i(" \u5E38\u7528\u547D\u4EE4\u5927\u5168")],-1),v=e("h1",{id:"docker-\u547D\u4EE4",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#docker-\u547D\u4EE4","aria-hidden":"true"},"#"),i(" Docker \u547D\u4EE4")],-1),m={href:"https://docs.docker.com/reference/",target:"_blank",rel:"noopener noreferrer"},p=s(`<blockquote><p>\u53EF\u4EE5\u4F7F\u7528 <kbd>Ctrl</kbd> + <kbd>F</kbd> \u5728\u9875\u9762\u4E2D\u5FEB\u901F\u641C\u7D22</p></blockquote><h3 id="docker-version" tabindex="-1"><a class="header-anchor" href="#docker-version" aria-hidden="true">#</a> <code>docker version</code></h3><p>\u67E5\u770B Docker \u7248\u672C</p><details class="custom-container details"><summary>\u793A\u4F8B</summary><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>Client: Docker Engine - Community
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h3 id="docker-info" tabindex="-1"><a class="header-anchor" href="#docker-info" aria-hidden="true">#</a> <code>docker info</code></h3><p>\u67E5\u770B Docker \u7684\u7CFB\u7EDF\u4FE1\u606F</p><details class="custom-container details"><summary>\u793A\u4F8B</summary><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>Client:
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h3 id="docker-\u547D\u4EE4-help" tabindex="-1"><a class="header-anchor" href="#docker-\u547D\u4EE4-help" aria-hidden="true">#</a> <code>docker &lt;\u547D\u4EE4&gt; --help</code></h3><p>\u67E5\u770B Docker \u547D\u4EE4\u5E2E\u52A9</p><details class="custom-container details"><summary>\u793A\u4F8B</summary><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">docker</span> <span class="token parameter variable">--help</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>Usage:  docker [OPTIONS] COMMAND

A self-sufficient runtime for containers

Options:
      --config string      Location of client config files (default
                           &quot;C:\\\\Users\\\\Yue_plus\\\\.docker&quot;)
  -c, --context string     Name of the context to use to connect to the
                           daemon (overrides DOCKER_HOST env var and
                           default context set with &quot;docker context use&quot;)
  -D, --debug              Enable debug mode
  -H, --host list          Daemon socket(s) to connect to
  -l, --log-level string   Set the logging level
                           (&quot;debug&quot;|&quot;info&quot;|&quot;warn&quot;|&quot;error&quot;|&quot;fatal&quot;)
                           (default &quot;info&quot;)
      --tls                Use TLS; implied by --tlsverify
      --tlscacert string   Trust certs signed only by this CA (default
                           &quot;C:\\\\Users\\\\Yue_plus\\\\.docker\\\\ca.pem&quot;)
      --tlscert string     Path to TLS certificate file (default
                           &quot;C:\\\\Users\\\\Yue_plus\\\\.docker\\\\cert.pem&quot;)
      --tlskey string      Path to TLS key file (default
                           &quot;C:\\\\Users\\\\Yue_plus\\\\.docker\\\\key.pem&quot;)
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
  commit      Create a new image from a container&#39;s changes
  cp          Copy files/folders between a container and the local filesystem
  create      Create a new container
  diff        Inspect changes to files or directories on a container&#39;s filesystem
  events      Get real time events from the server
  exec        Run a command in a running container
  export      Export a container&#39;s filesystem as a tar archive
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

Run &#39;docker COMMAND --help&#39; for more information on a command.

To get more help with docker, check out our guides at https://docs.docker.com/go/guides/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h3 id="docker-search" tabindex="-1"><a class="header-anchor" href="#docker-search" aria-hidden="true">#</a> <code>docker search</code></h3>`,11),b={href:"https://hub.docker.com/",target:"_blank",rel:"noopener noreferrer"},h=s('<p>\u8BED\u6CD5\uFF1A<code>docker search [OPTIONS] TERM</code></p><p>\u9009\u9879\uFF1A</p><ul><li><code>--filter , -f</code><ul><li>\u6839\u636E\u63D0\u4F9B\u7684\u6761\u4EF6\u8FC7\u6EE4\u8F93\u51FA</li></ul></li><li><code>--format</code><ul><li>\u4F7F\u7528 Go \u6A21\u677F\u8FDB\u884C\u6F02\u4EAE\u7684\u6253\u5370\u641C\u7D22</li></ul></li><li><code>--limit</code><ul><li>\u9ED8\u8BA4\u4E3A <code>25</code></li><li>\u6700\u591A\u641C\u7D22\u7ED3\u679C\u6570</li></ul></li><li><code>--no-trunc</code><ul><li>\u4E0D\u622A\u65AD\u8F93\u51FA</li></ul></li></ul><h3 id="docker-pull" tabindex="-1"><a class="header-anchor" href="#docker-pull" aria-hidden="true">#</a> <code>docker pull</code></h3><p>\u4ECE\u4ED3\u5E93\u62C9\u53D6\u955C\u50CF\u3002</p><p>\u8BED\u6CD5\uFF1A<code>docker pull [OPTIONS] NAME[:TAG|@DIGEST]</code></p>',6),k={href:"https://docs.docker.com/engine/reference/commandline/pull/",target:"_blank",rel:"noopener noreferrer"},g=s('<p>\u9009\u9879\uFF1A</p><ul><li><code>--all-tags , -a</code><ul><li>\u4E0B\u8F7D\u4ED3\u5E93\u4E2D\u6240\u6709\u6807\u8BB0\u7684\u955C\u50CF</li></ul></li><li><code>--disable-content-trust</code><ul><li>\u9ED8\u8BA4\u4E3A\uFF1A<code>true</code></li><li>\u8DF3\u8FC7\u955C\u50CF\u9A8C\u8BC1</li></ul></li><li><code>--platform</code><ul><li><code>1.32+</code> \u53EF\u7528</li><li>\u5982\u679C\u670D\u52A1\u5668\u652F\u6301\u591A\u5E73\u53F0\uFF0C\u5219\u8BBE\u7F6E\u5E73\u53F0</li></ul></li><li><code>--quiet , -q</code><ul><li>\u7981\u6B62\u8BE6\u7EC6\u8F93\u51FA</li></ul></li></ul><h3 id="docker-run" tabindex="-1"><a class="header-anchor" href="#docker-run" aria-hidden="true">#</a> <code>docker run</code></h3><p>\u5728\u65B0\u5BB9\u5668\u4E2D\u8FD0\u884C\u547D\u4EE4\u3002</p><p>\u8BED\u6CD5\uFF1A<code>docker run [OPTIONS] IMAGE [COMMAND] [ARG...]</code></p>',5),f={href:"https://docs.docker.com/engine/reference/commandline/run/",target:"_blank",rel:"noopener noreferrer"},D=s('<p>\u9009\u9879\uFF1A</p><ul><li><code>--add-host</code><ul><li>\u6DFB\u52A0\u81EA\u5B9A\u4E49\u4E3B\u673A\u5230 IP \u6620\u5C04\uFF08\u4E3B\u673A\uFF1Aip\uFF09</li></ul></li><li><code>--attach , -a</code><ul><li>\u8FDE\u63A5\u5230 STDIN\u3001STDOUT \u6216 STDERR</li></ul></li><li><code>--blkio-weight</code><ul><li>\u5757 IO\uFF08\u76F8\u5BF9\u6743\u91CD\uFF09\uFF0C\u4ECB\u4E8E 10 \u548C 1000 \u4E4B\u95F4\uFF0C\u6216 0 \u7981\u7528\uFF08\u9ED8\u8BA4 0\uFF09</li></ul></li><li><code>--blkio-weight-device</code><ul><li>\u5757 IO \u6743\u91CD\uFF08\u76F8\u5BF9\u8BBE\u5907\u91CD\u91CF\uFF09</li></ul></li><li><code>--cap-add</code><ul><li>\u6DFB\u52A0 Linux \u529F\u80FD</li></ul></li><li><code>--cap-drop</code><ul><li>\u653E\u5F03 Linux \u529F\u80FD</li></ul></li><li><code>--cgroup-parent</code><ul><li>\u5BB9\u5668\u7684\u53EF\u9009\u7236 cgroup</li></ul></li><li>`--cgroupns <ul><li><code>1.41+</code> \u53EF\u7528</li><li>\u8981\u4F7F\u7528\u7684 C \u7EC4\u547D\u540D\u7A7A\u95F4\uFF08\u4E3B\u673A|\u79C1\u6709\uFF09&quot;\u4E3B\u673A&quot;\uFF1A \u5728 Docker \u4E3B\u673A\u7684 cgroup \u547D\u540D\u7A7A\u95F4&quot;\u79C1\u6709&quot;\u4E2D\u8FD0\u884C\u5BB9\u5668\uFF1A \u5728\u5176\u81EA\u5DF1\u7684\u4E13\u7528 cgroup \u547D\u540D\u7A7A\u95F4\u4E2D\u8FD0\u884C\u5BB9\u5668&#39;\uFF1A \u4F7F\u7528\u7531\u5B88\u62A4\u7A0B\u5E8F\u4E0A\u7684\u9ED8\u8BA4 cgroupns \u6A21\u5F0F\u9009\u9879\u914D\u7F6E\u7684 cgroup \u547D\u540D\u7A7A\u95F4\uFF08\u9ED8\u8BA4\uFF09</li></ul></li><li><code>--cidfile</code><ul><li>\u5C06\u5BB9\u5668 ID \u5199\u5165\u6587\u4EF6</li></ul></li><li><code>--cpu-count</code><ul><li>CPU \u8BA1\u6570\uFF08\u4EC5\u7A97\u53E3\uFF09</li></ul></li><li><code>--cpu-percent</code><ul><li>CPU \u767E\u5206\u6BD4\uFF08\u4EC5\u7A97\u53E3\uFF09</li></ul></li><li><code>--cpu-period</code><ul><li>\u9650\u5236 CPU CFS\uFF08\u5B8C\u5168\u516C\u5E73\u7684\u8C03\u5EA6\u7A0B\u5E8F\uFF09\u5468\u671F</li></ul></li><li><code>--cpu-quota</code><ul><li>\u9650\u5236 CPU CFS\uFF08\u5B8C\u5168\u516C\u5E73\u7684\u8C03\u5EA6\u7A0B\u5E8F\uFF09\u914D\u989D</li></ul></li><li><code>--cpu-rt-period</code><ul><li><code>1.25+</code> \u53EF\u7528</li><li>\u4EE5\u5FAE\u79D2\u4E3A\u5355\u4F4D\u9650\u5236 CPU \u5B9E\u65F6\u5468\u671F</li></ul></li><li><code>--cpu-rt-runtime</code><ul><li><code>1.25+</code> \u53EF\u7528</li><li>\u4EE5\u5FAE\u79D2\u4E3A\u5355\u4F4D\u9650\u5236 CPU \u5B9E\u65F6\u8FD0\u884C\u65F6\u95F4</li></ul></li><li><code>--cpu-shares , -c</code><ul><li>CPU \u5171\u4EAB\uFF08\u76F8\u5BF9\u6743\u91CD\uFF09</li></ul></li><li><code>--cpus</code><ul><li><code>1.25+</code> \u53EF\u7528</li><li>CPU \u6570\u91CF</li></ul></li><li><code>--cpuset-cpus</code><ul><li>\u5141\u8BB8\u6267\u884C\u7684 CPU \uFF080-3\uFF0C 0\uFF0C1\uFF09</li></ul></li><li><code>--cpuset-mems</code><ul><li>\u5141\u8BB8\u6267\u884C\u7684 MEM \uFF080-3\uFF0C 0\uFF0C1\uFF09</li></ul></li><li><code>--detach , -d</code><ul><li>\u5728\u540E\u53F0\u8FD0\u884C\u5BB9\u5668\u5E76\u6253\u5370\u5BB9\u5668 ID</li></ul></li><li><code>--detach-keys</code><ul><li>\u8986\u76D6\u5206\u79BB\u5BB9\u5668\u7684\u952E\u5E8F\u5217</li></ul></li><li><code>--device</code><ul><li>\u5C06\u4E3B\u673A\u8BBE\u5907\u6DFB\u52A0\u5230\u5BB9\u5668</li></ul></li><li><code>--device-cgroup-rule</code><ul><li>\u5C06\u89C4\u5219\u6DFB\u52A0\u5230 cGroup \u5141\u8BB8\u7684\u8BBE\u5907\u5217\u8868</li></ul></li><li><code>--device-read-bps</code><ul><li>\u9650\u5236\u8BBE\u5907\u8BFB\u53D6\u901F\u7387\uFF08\u5B57\u8282/\u79D2\uFF09</li></ul></li><li><code>--device-read-iops</code><ul><li>\u9650\u5236\u8BBE\u5907\u8BFB\u53D6\u901F\u7387\uFF08IO/\u79D2\uFF09</li></ul></li><li><code>--device-write-bps</code><ul><li>\u5C06\u5199\u5165\u901F\u7387\uFF08\u5B57\u8282/\u79D2\uFF09\u9650\u5236\u4E3A\u8BBE\u5907</li></ul></li><li><code>--device-write-iops</code><ul><li>\u5C06\u5199\u5165\u901F\u7387\uFF08IO/\u79D2\uFF09\u9650\u5236\u4E3A\u8BBE\u5907</li></ul></li><li><code>--disable-content-trust</code><ul><li>\u9ED8\u8BA4\u4E3A\uFF1A<code>true</code></li><li>\u8DF3\u8FC7\u955C\u50CF\u9A8C\u8BC1</li></ul></li><li><code>--dns</code><ul><li>\u8BBE\u7F6E\u81EA\u5B9A\u4E49 DNS \u670D\u52A1\u5668</li></ul></li><li><code>--dns-opt</code><ul><li>\u8BBE\u7F6E DNS \u9009\u9879</li></ul></li><li><code>--dns-option</code><ul><li>\u8BBE\u7F6E DNS \u9009\u9879</li></ul></li><li><code>--dns-search</code><ul><li>\u8BBE\u7F6E\u81EA\u5B9A\u4E49 DNS \u641C\u7D22\u57DF</li></ul></li><li><code>--domainname</code><ul><li>\u5BB9\u5668 NIS \u57DF\u540D</li></ul></li><li><code>--entrypoint</code><ul><li>\u8986\u76D6\u56FE\u50CF\u7684\u9ED8\u8BA4\u5165\u53E3\u70B9</li></ul></li><li><code>--env , -e</code><ul><li>\u8BBE\u7F6E\u73AF\u5883\u53D8\u91CF</li></ul></li><li><code>--env-file</code><ul><li>\u5728\u73AF\u5883\u53D8\u91CF\u6587\u4EF6\u4E2D\u8BFB\u53D6</li></ul></li><li><code>--expose</code><ul><li>\u66B4\u9732\u7AEF\u53E3\u6216\u4E00\u7CFB\u5217\u7AEF\u53E3</li></ul></li><li><code>--gpus</code><ul><li><code>1.40+</code> \u53EF\u7528</li><li>\u8981\u6DFB\u52A0\u5230\u5BB9\u5668\u7684 GPU \u8BBE\u5907\uFF08&quot;\u5168\u90E8&quot;\u901A\u8FC7\u6240\u6709 GPU\uFF09</li></ul></li><li><code>--group-add</code><ul><li>\u6DFB\u52A0\u8981\u52A0\u5165\u7684\u5176\u4ED6\u7EC4</li></ul></li><li><code>--health-cmd</code><ul><li>\u547D\u4EE4\u8FD0\u884C\u4EE5\u68C0\u67E5\u8FD0\u884C\u72B6\u51B5</li></ul></li><li><code>--health-interval</code><ul><li>\u8FD0\u884C\u68C0\u67E5\u4E4B\u95F4\u7684\u65F6\u95F4\uFF08ms | s | h\uFF09\uFF08\u9ED8\u8BA4 0s\uFF09</li></ul></li><li><code>--health-retries</code><ul><li>\u62A5\u544A\u4E0D\u6B63\u5E38\u884C\u4E3A\u6240\u9700\u7684\u8FDE\u7EED\u6545\u969C</li></ul></li><li><code>--health-start-period</code><ul><li><code>1.29+</code> \u53EF\u7528</li><li>\u5BB9\u5668\u7684\u5F00\u59CB\u5468\u671F\u5728\u5F00\u59CB\u8FD0\u884C\u72B6\u51B5\u91CD\u5012\u6570\u4E4B\u524D\u521D\u59CB\u5316\uFF08ms | s | h\uFF09\uFF08\u9ED8\u8BA4 0s\uFF09</li></ul></li><li><code>--health-timeout</code><ul><li>\u5141\u8BB8\u8FD0\u884C\u4E00\u6B21\u68C0\u67E5\u7684\u6700\u5927\u65F6\u95F4\uFF08ms | s | h\uFF09\uFF08\u9ED8\u8BA4 0s\uFF09</li></ul></li><li><code>--help</code><ul><li>\u8F93\u51FA\u5E2E\u52A9</li></ul></li><li><code>--hostname , -h</code><ul><li>\u5BB9\u5668\u4E3B\u673A\u540D</li></ul></li><li><code>--init</code><ul><li><code>1.25+</code> \u53EF\u7528</li><li>\u5728\u5BB9\u5668\u5185\u8FD0\u884C\u4E00\u4E2A init\uFF0C\u8BE5\u5BB9\u5668\u8F6C\u53D1\u4FE1\u53F7\u5E76\u6536\u83B7\u8FDB\u7A0B</li></ul></li><li><code>--interactive , -i</code><ul><li>\u5373\u4F7F\u672A\u8FDE\u63A5\uFF0C\u4E5F\u4FDD\u6301 STDIN \u6253\u5F00</li></ul></li><li><code>--io-maxbandwidth</code><ul><li>\u7CFB\u7EDF\u9A71\u52A8\u5668\u7684\u6700\u5927 IO \u5E26\u5BBD\u9650\u5236\uFF08\u4EC5\u7A97\u53E3\uFF09</li></ul></li><li><code>--io-maxiops</code><ul><li>\u7CFB\u7EDF\u9A71\u52A8\u5668\u7684\u6700\u5927 IOps \u9650\u5236\uFF08\u4EC5 Windows\uFF09</li></ul></li><li><code>--ip</code><ul><li>IPv4 \u5730\u5740\uFF08\u4F8B\u5982\uFF1A<code>172.30.100.104</code>\uFF09</li></ul></li><li><code>--ip6</code><ul><li>IPv6 \u5730\u5740\uFF08\u4F8B\u5982\uFF1A<code>2001:db8::33</code>\uFF09</li></ul></li><li><code>--ipc</code><ul><li>\u8981\u4F7F\u7528\u7684 IPC \u6A21\u5F0F</li></ul></li><li><code>--isolation</code><ul><li>\u5BB9\u5668\u9694\u79BB\u6280\u672F</li></ul></li><li><code>--kernel-memory</code><ul><li>\u5185\u6838\u5185\u5B58\u9650\u5236</li></ul></li><li><code>--label , -l</code><ul><li>\u5728\u5BB9\u5668\u4E0A\u8BBE\u7F6E\u5143\u6570\u636E</li></ul></li><li><code>--label-file</code><ul><li>\u5728\u6807\u7B7E\u7684\u884C\u5206\u9694\u6587\u4EF6\u4E2D\u8BFB\u53D6</li></ul></li><li><code>--link</code><ul><li>\u5C06\u94FE\u63A5\u6DFB\u52A0\u5230\u53E6\u4E00\u4E2A\u5BB9\u5668</li></ul></li><li><code>--link-local-ip</code><ul><li>\u5BB9\u5668 IPv4/IPv6 \u94FE\u8DEF\u672C\u5730\u5730\u5740</li></ul></li><li><code>--log-driver</code><ul><li>\u5BB9\u5668\u7684\u65E5\u5FD7\u8BB0\u5F55\u9A71\u52A8\u7A0B\u5E8F</li></ul></li><li><code>--log-opt</code><ul><li>\u65E5\u5FD7\u9A71\u52A8\u7A0B\u5E8F\u9009\u9879</li></ul></li><li><code>--mac-address</code><ul><li>\u5BB9\u5668 MAC \u5730\u5740\uFF08\u4F8B\u5982\uFF1A<code>92:d0:c6:0a:29:33</code>\uFF09</li></ul></li><li><code>--memory , -m</code><ul><li>\u5185\u5B58\u9650\u5236</li></ul></li><li><code>--memory-reservation</code><ul><li>\u5185\u5B58\u8F6F\u9650\u5236</li></ul></li><li><code>--memory-swap</code><ul><li>\u4EA4\u6362\u9650\u5236\u7B49\u4E8E\u5185\u5B58\u52A0\u4EA4\u6362\uFF1A&#39;-1&#39;\uFF0C\u652F\u6301\u65E0\u9650\u5236\u4EA4\u6362</li></ul></li><li><code>--memory-swappiness</code><ul><li>\u9ED8\u8BA4\u4E3A\uFF1A<code>-1</code></li><li>\u8C03\u6574\u5BB9\u5668\u5185\u5B58\u4EA4\u6362\uFF080 \u5230 100\uFF09</li></ul></li><li><code>--mount</code><ul><li>\u5C06\u6587\u4EF6\u7CFB\u7EDF\u88C5\u8F7D\u9644\u52A0\u5230\u5BB9\u5668</li></ul></li><li><code>--name</code><ul><li>\u4E3A\u5BB9\u5668\u5206\u914D\u540D\u79F0</li></ul></li><li><code>--net</code><ul><li>\u5C06\u5BB9\u5668\u8FDE\u63A5\u5230\u7F51\u7EDC</li></ul></li><li><code>--net-alias</code><ul><li>\u4E3A\u5BB9\u5668\u6DFB\u52A0\u7F51\u7EDC\u8303\u56F4\u522B\u540D</li></ul></li><li><code>--network</code><ul><li>\u5C06\u5BB9\u5668\u8FDE\u63A5\u5230\u7F51\u7EDC</li></ul></li><li><code>--network-alias</code><ul><li>\u4E3A\u5BB9\u5668\u6DFB\u52A0\u7F51\u7EDC\u8303\u56F4\u522B\u540D</li></ul></li><li><code>--no-healthcheck</code><ul><li>\u7981\u7528\u4EFB\u4F55\u5BB9\u5668\u6307\u5B9A\u7684\u8FD0\u884C\u72B6\u51B5\u68C0\u67E5</li></ul></li><li><code>--oom-kill-disable</code><ul><li>\u7981\u7528 OOM \u6740\u624B</li></ul></li><li><code>--oom-score-adj</code><ul><li>\u8C03\u6574\u4E3B\u673A\u7684 OOM \u9996\u9009\u9879 \uFF08-1000 \u5230 1000\uFF09</li></ul></li><li><code>--pid</code><ul><li>\u8981\u4F7F\u7528\u7684 PID \u547D\u540D\u7A7A\u95F4</li></ul></li><li><code>--pids-limit</code><ul><li>\u8C03\u6574\u5BB9\u5668\u76AE\u65AF\u9650\u5236\uFF08\u8BBE\u7F6E\u4E3A -1 \u65E0\u9650\u5236\uFF09</li></ul></li><li><code>--platform</code><ul><li><code>1.32+</code> \u53EF\u7528</li><li>\u8BBE\u7F6E\u5E73\u53F0\uFF0C\u5982\u679C\u670D\u52A1\u5668\u662F\u591A\u5E73\u53F0\u529F\u80FD</li></ul></li><li><code>--privileged</code><ul><li>\u5411\u6B64\u5BB9\u5668\u6388\u4E88\u6269\u5C55\u6743\u9650</li></ul></li><li><code>--publish , -p</code><ul><li>\u5C06\u5BB9\u5668\u7684\u7AEF\u53E3\u53D1\u5E03\u5230\u4E3B\u673A</li></ul></li><li><code>--publish-all , -P</code><ul><li>\u5C06\u6240\u6709\u516C\u5F00\u7AEF\u53E3\u53D1\u5E03\u5230\u968F\u673A\u7AEF\u53E3</li></ul></li><li><code>--pull missing</code><ul><li>\u8FD0\u884C\u524D\u62C9\u56FE\u50CF\uFF08&quot;\u59CB\u7EC8&quot;|&quot;\u7F3A\u5C11&quot;|&quot;\u4ECE\u4E0D&quot;\uFF09</li></ul></li><li><code>--read-only</code><ul><li>\u5C06\u5BB9\u5668\u7684\u6839\u6587\u4EF6\u7CFB\u7EDF\u88C5\u8F7D\u4E3A\u53EA\u8BFB</li></ul></li><li><code>--restart no</code><ul><li>\u91CD\u65B0\u542F\u52A8\u7B56\u7565\uFF0C\u5728\u5BB9\u5668\u9000\u51FA\u65F6\u5E94\u7528</li></ul></li><li><code>--rm</code><ul><li>\u5BB9\u5668\u9000\u51FA\u65F6\u81EA\u52A8\u79FB\u9664\u5BB9\u5668</li></ul></li><li><code>--runtime</code><ul><li>\u7528\u4E8E\u6B64\u5BB9\u5668\u7684\u8FD0\u884C\u65F6</li></ul></li><li><code>--security-opt</code><ul><li>\u5B89\u5168\u9009\u9879</li></ul></li><li><code>--shm-size</code><ul><li>\u5927\u5C0F /\u5F00\u53D1/shm</li></ul></li><li><code>--sig-proxy</code><ul><li>\u9ED8\u8BA4\u4E3A <code>true</code></li><li>\u4EE3\u7406\u63A5\u6536\u5230\u8FDB\u7A0B\u7684\u4FE1\u53F7</li></ul></li><li><code>--stop-signal</code><ul><li>SIGTERM \u505C\u6B62\u5BB9\u5668\u7684\u4FE1\u53F7</li></ul></li><li><code>--stop-timeout</code><ul><li><code>1.25+</code> \u53EF\u7528</li><li>\u505C\u6B62\u5BB9\u5668\u7684\u8D85\u65F6\uFF08\u4EE5\u79D2\u4E3A\u5355\u4F4D\uFF09</li></ul></li><li><code>--storage-opt</code><ul><li>\u5BB9\u5668\u7684\u5B58\u50A8\u9A71\u52A8\u7A0B\u5E8F\u9009\u9879</li></ul></li><li><code>--sysctl</code><ul><li>Sysctl \u9009\u9879</li></ul></li><li><code>--tmpfs</code><ul><li>\u88C5\u8F7D tmpfs \u76EE\u5F55</li></ul></li><li><code>--tty , -t</code><ul><li>\u5206\u914D\u4F2A TTY</li></ul></li><li><code>--ulimit</code><ul><li>\u6781\u9650\u9009\u9879</li></ul></li><li><code>--user , -u</code><ul><li>\u7528\u6237\u540D\u6216 UID\uFF08\u683C\u5F0F\uFF1A<code>&lt;name|uid&gt;[:&lt;group|gid&gt;]</code>\uFF09</li></ul></li><li><code>--userns</code><ul><li>\u8981\u4F7F\u7528\u7684\u7528\u6237\u540D\u7A7A\u95F4</li></ul></li><li><code>--uts</code><ul><li>\u8981\u4F7F\u7528\u7684 UTS \u547D\u540D\u7A7A\u95F4</li></ul></li><li><code>--volume , -v</code><ul><li>\u7ED1\u5B9A\u88C5\u8F7D\u5377</li></ul></li><li><code>--volume-driver</code><ul><li>\u5BB9\u5668\u7684\u53EF\u9009\u5377\u9A71\u52A8\u7A0B\u5E8F</li></ul></li><li><code>--volumes-from</code><ul><li>\u4ECE\u6307\u5B9A\u7684\u5BB9\u5668\u4E2D\u88C5\u8F7D\u5377</li></ul></li><li><code>--workdir , -w</code><ul><li>\u5BB9\u5668\u5185\u7684\u5DE5\u4F5C\u76EE\u5F55</li></ul></li></ul><h3 id="docker-exec" tabindex="-1"><a class="header-anchor" href="#docker-exec" aria-hidden="true">#</a> <code>docker exec</code></h3><p>\u5728\u6B63\u5728\u8FD0\u884C\u7684\u5BB9\u5668\u4E2D\u6267\u884C\u547D\u4EE4\u3002</p><p>\u8BED\u6CD5\uFF1A<code>docker exec [OPTIONS] CONTAINER COMMAND [ARG...]</code></p>',5),y={href:"https://docs.docker.com/engine/reference/commandline/exec/",target:"_blank",rel:"noopener noreferrer"},_=s("<p>\u9009\u9879\uFF1A</p><ul><li><code>--detach , -d</code><ul><li>\u5206\u79BB\u6A21\u5F0F\uFF1A\u5728\u540E\u53F0\u8FD0\u884C\u547D\u4EE4</li></ul></li><li><code>--detach-keys</code><ul><li>\u8986\u76D6\u5206\u79BB\u5BB9\u5668\u7684\u952E\u5E8F\u5217</li></ul></li><li><code>--env , -e</code><ul><li><code>1.25+</code> \u4EE5\u4E0A\u53EF\u7528</li><li>\u8BBE\u7F6E\u73AF\u5883\u53D8\u91CF</li></ul></li><li><code>--env-file</code><ul><li><code>1.25+</code> \u4EE5\u4E0A\u53EF\u7528</li><li>\u5728\u73AF\u5883\u53D8\u91CF\u6587\u4EF6\u4E2D\u8BFB\u53D6</li></ul></li><li><code>--interactive , -i</code><ul><li>\u5373\u4F7F\u672A\u8FDE\u63A5\uFF0C\u4E5F\u4FDD\u6301 STDIN \u6253\u5F00</li></ul></li><li><code>--privileged</code><ul><li>\u5411\u547D\u4EE4\u6388\u4E88\u6269\u5C55\u6743\u9650</li></ul></li><li><code>--tty , -t</code><ul><li>\u5206\u914D\u4F2A TTY</li></ul></li><li><code>--user , -u</code><ul><li>\u7528\u6237\u540D\u6216 UID\uFF08\u683C\u5F0F\uFF1A<code>&lt;name|uid&gt;[:&lt;group|gid&gt;]</code>\uFF09</li></ul></li><li><code>--workdir , -w</code><ul><li><code>1.35+</code> \u4EE5\u4E0A\u53EF\u7528</li><li>\u5BB9\u5668\u5185\u7684\u5DE5\u4F5C\u76EE\u5F55</li></ul></li></ul>",2);function I(S,x){const l=r("ExternalLinkIcon");return d(),c("div",null,[t,a(" more "),v,e("p",null,[i("\u53EF\u4EE5\u5728\u5B98\u7F51\u627E\u5230 "),e("a",m,[i("\u6240\u6709\u547D\u4EE4"),n(l)])]),p,e("p",null,[i("\u5728 "),e("a",b,[i("Docker Hub"),n(l)]),i(" \u4E0A\u641C\u7D22\u955C\u50CF\u3002")]),h,e("blockquote",null,[e("p",null,[e("a",k,[i("\u53C2\u8003\u5B98\u7F51\u624B\u518C"),n(l)])])]),g,e("blockquote",null,[e("p",null,[e("a",f,[i("\u53C2\u8003\u5B98\u65B9\u624B\u518C"),n(l)])])]),D,e("blockquote",null,[e("p",null,[e("a",y,[i("\u53C2\u8003\u5B98\u7F51\u624B\u518C"),n(l)])])]),_])}const w=o(u,[["render",I],["__file","\u547D\u4EE4.html.vue"]]);export{w as default};
