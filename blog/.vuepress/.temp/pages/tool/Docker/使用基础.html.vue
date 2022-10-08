<template><div><p><strong>Docker</strong> 的基础操作，构建 <strong>DockerFile</strong>，以及一个启动案例</p>
<!-- more -->
<h2 id="_1-docker-常规操作" tabindex="-1"><a class="header-anchor" href="#_1-docker-常规操作" aria-hidden="true">#</a> 1. Docker 常规操作</h2>
<h3 id="_1-1-核心要素" tabindex="-1"><a class="header-anchor" href="#_1-1-核心要素" aria-hidden="true">#</a> 1.1 核心要素</h3>
<p><strong>Docker</strong>如下三核心：</p>
<ul>
<li><strong>镜像</strong>（<em>Images</em>）：打包了业务代码、运行环境的包，是静态文件，不对外直接提供服务</li>
<li><strong>容器</strong>（<em>Containers</em>）：镜像运行时，对外提供服务</li>
<li><strong>仓库</strong>（<em>Registry</em>）：存放镜像的地方，容器和仓库不会直接交互，都是以镜像为载体</li>
</ul>
<div class="custom-container note">
<p class="custom-container-title">仓库说明</p>
<p><strong>公有仓库：</strong> Docker Hub、阿里、网易... 一般存放以下几类镜像</p>
<ul>
<li>操作系统基础镜像：CentOS、Ubuntu、suse、alpine</li>
<li>中间件：Nginx、Redis、MySQL</li>
<li>语言编译环境：python、go、rust</li>
<li>业务镜像：breath-for-code</li>
</ul>
<p><strong>私有仓库：</strong> 企业内部搭建</p>
<ul>
<li><strong>Docker Registry：</strong> 官方提供仓库存储</li>
<li><strong>Harbor：</strong> 上述封装，WebUI、权限、操作审计等功能（常用）</li>
</ul>
</div>
<img src="@source/tool/Docker/img/核心要素.png">
<p><strong>Docker</strong> 执行流程</p>
<ul>
<li>
<p><strong>docker pull：</strong> <code v-pre>client</code> 通过 <code v-pre>grpc</code> 和 <code v-pre>DOCKER_HOST</code> 通信，<code v-pre>daemon</code> 进程去 <code v-pre>images</code> 中查看目标镜像，若没有则去远程仓库 <code v-pre>registry</code> 下载到本地 <code v-pre>images</code> 中</p>
</li>
<li>
<p><strong>docker run：</strong> 镜像是静态的，需要容器来运行，因此 <code v-pre>daemon</code> 会启动一个容器服务运行镜像来对外提供服务</p>
</li>
<li>
<p><strong>docker build：</strong> 通过 <code v-pre>build</code> 执行 <RouterLink to="/tool/Docker/%E4%BD%BF%E7%94%A8%E5%9F%BA%E7%A1%80.html#_2-1-dockerfile">DockerFile</RouterLink> 来自定义的打包自己的镜像</p>
</li>
</ul>
<h3 id="_1-2-基本流程" tabindex="-1"><a class="header-anchor" href="#_1-2-基本流程" aria-hidden="true">#</a> 1.2 基本流程</h3>
<ol>
<li>
<p>查看镜像列表</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> images <span class="token operator">||</span> <span class="token function">docker</span> image <span class="token function">ls</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>远程仓库拉取镜像</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 格式为： 镜像名称:tag标签</span>
<span class="token function">docker</span> pull nginx:alpine

<span class="token comment"># 若不加 tag</span>
<span class="token function">docker</span> pull ubuntu
<span class="token comment"># 等同于</span>
<span class="token function">docker</span> pull docker.io/library/ubuntu:lastest
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>通过镜像来启动容器</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">--name</span> z-nginx-alpine <span class="token parameter variable">-d</span> nginx:alpine
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>进入容器并查看进程</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 进入容器内部，分配一个tty终端</span>
<span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-ti</span> z-nginx-alpine /bin/shell	<span class="token comment"># or sh or /bin/sh or bash</span>
<span class="token function">ps</span> aux

<span class="token comment"># 退出</span>
<span class="token builtin class-name">exit</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>本地构建镜像</p>
<ul>
<li>
<p>创建 <strong>DockerFile</strong></p>
<p><strong>centos-nfs：</strong> 创建一个带有 <strong>NFS</strong> 功能的 <strong>CentOS</strong> 镜像</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 定义docker使用那个基础系统镜像作为模板，后续命令都已这个基础镜像为准,等同于 pull 操作</span>
FROM centos:7.6.1810

<span class="token comment"># RUN命令会在模板镜像中执行</span>
RUN yum <span class="token parameter variable">-y</span> <span class="token function">install</span> nfs-utils

<span class="token comment"># 启动容器后执行如下命令（这就是docker容器启动后执行命令的原因）</span>
CMD <span class="token punctuation">[</span><span class="token string">"systemctl"</span>, <span class="token string">"restart"</span>, <span class="token string">"nfs"</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>ubuntu-nginx：</strong> 创建一个带有 <strong>Nginx</strong> 功能的 <strong>Ubuntu</strong> 镜像</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>FROM ubuntu

RUN <span class="token function">apt-get</span> update <span class="token operator">&amp;&amp;</span> <span class="token function">apt</span> i <span class="token parameter variable">-y</span> nginx

CMD <span class="token punctuation">[</span><span class="token string">"/usr/sbin/nginx"</span>, <span class="token string">"-g"</span>, <span class="token string">"daemon off;"</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>构建本地镜像</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 将如上DockerFile 构建出名为 z-nginx-ubuntu 的镜像</span>
<span class="token function">docker</span> build <span class="token builtin class-name">.</span> <span class="token parameter variable">-t</span> z-nginx:ubuntu <span class="token parameter variable">-f</span> DockerFile
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>使用新镜像启动</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">--name</span> z-nginx-ubuntu <span class="token parameter variable">-d</span> z-nginx:ubuntu
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>容器端口转发</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 查看 nginx 页面</span>
<span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-ti</span> z-nginx-ubuntu <span class="token function">bash</span>
<span class="token function">curl</span> localhost

<span class="token comment"># 移除容器 并 重启设置端口转发再启动</span>
<span class="token function">docker</span> <span class="token function">rm</span> <span class="token parameter variable">-f</span> z-nginx-ubuntu
<span class="token function">docker</span> run <span class="token parameter variable">--name</span> z-nginx-ubuntu <span class="token parameter variable">-d</span> <span class="token parameter variable">-p</span> <span class="token number">8080</span>:80 z-nginx:ubuntu

<span class="token comment"># 查看是否转发（获取到nginx首页）</span>
<span class="token function">curl</span> localhost:8080
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
</li>
<li>
<p>删除容器服务</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> <span class="token function">rm</span> <span class="token parameter variable">-f</span> z-nginx-ubuntu
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>删除镜像</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> rmi z-nginx:ubuntu
<span class="token comment"># 若指定 ID，则同样 ID 的镜像（源文件），均会删除</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h3 id="_1-3-部署镜像仓库" tabindex="-1"><a class="header-anchor" href="#_1-3-部署镜像仓库" aria-hidden="true">#</a> 1.3 部署镜像仓库</h3>
<p><strong>Docker</strong> 复杂命令流程图</p>
<img src="@source/tool/Docker/img/基本流程.png">
<ol>
<li>
<p>镜像打包</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 将 nginx:alpine 镜像 导出为 z-nginx-ubuntu.tar 包</span>
<span class="token function">docker</span> save <span class="token parameter variable">-o</span> z-nginx-ubuntu.tar z-nginx:ubuntu
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>从 <code v-pre>tar</code> 包中加载镜像</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> load <span class="token parameter variable">-i</span> z-nginx-ubuntu.tar
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>部署 <a href="https://docs.docker.com/registry/" target="_blank" rel="noopener noreferrer">镜像仓库<ExternalLinkIcon/></a> 服务，默认仓库不带认证，若需要认证，请参考 <a href="https://docs.docker.com/registry/deploying/#restricting-access" target="_blank" rel="noopener noreferrer">身份认证<ExternalLinkIcon/></a></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 用docker官方提供的镜像，来启动一个 镜像仓库服务</span>
<span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">-p</span> <span class="token number">5000</span>:5000 <span class="token parameter variable">--restart</span> always <span class="token parameter variable">--name</span> registry registry:2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><code v-pre>--restart always:</code> 重启 <code v-pre>docker</code> 后，会自动拉起该镜像服务</li>
</ul>
</li>
<li>
<p>推送本地镜像到上述自建的镜像仓库中</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 给镜像 打tag</span>
<span class="token function">docker</span> tag z-nginx:ubuntu localhost:5000/znginx:ubuntu

<span class="token comment"># 推送到本地自建仓库</span>
<span class="token function">docker</span> push localhost:5000/znginx:ubuntu
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>查看仓库内的镜像元数据</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-X</span> GET http://localhost:5000/v2/_catalog
<span class="token comment"># {"repositories":["znginx"]}</span>

<span class="token function">curl</span> <span class="token parameter variable">-X</span> GET http://localhost:5000/v2/nginx/tags/list
<span class="token comment"># {"name":"nginx","tags":["alpine"]}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>若需要镜像仓库给外部访问</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> tag z-nginx:ubuntu <span class="token number">120.53</span>.122.253:5000/znginx:ubuntu

<span class="token comment"># 若需要push 到外网地址，此时会报错</span>
<span class="token function">docker</span> push <span class="token number">120.53</span>.122.253:5000/znginx:ubuntu
<span class="token comment">## The push refers to repository [120.53.122.253:5000/znginx]</span>
<span class="token comment">## Get "https://120.53.122.253:5000/v2/": http: server gave HTTP response to HTTPS client</span>

<span class="token comment"># 这是由于docker默认不允许想http仓库地址推送，需要弄成https的</span>
<span class="token comment"># 这就需要证书机构颁发的证书和域名，自签名证书需要再每个节点上拷贝证书文件，比较麻烦，因此通过修改daemon配置的方式，来跳过证书验证：</span>
$ <span class="token function">cat</span> /etc/docker/daemon.json
<span class="token punctuation">{</span>
  <span class="token string">"registry-mirrors"</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span><span class="token string">"https://ubhu1j5h.mirror.aliyuncs.com"</span><span class="token punctuation">]</span>,
  <span class="token string">"insecure-registries"</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span><span class="token string">"120.53.122.253:5000"</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>
$ systemctl restart <span class="token function">docker</span>
$ <span class="token function">docker</span> push <span class="token number">120.53</span>.122.253:5000/znginx:ubuntu
$ <span class="token function">docker</span> images <span class="token comment"># IMAGE ID 相同，等同于起别名，或是快捷方式</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>限制内存启动</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 限制资源，最大可用内存500M</span>
$ <span class="token function">docker</span> run <span class="token parameter variable">--name</span> znginx <span class="token parameter variable">-d</span> <span class="token parameter variable">-p</span> <span class="token number">8080</span>:80 <span class="token parameter variable">--memory</span><span class="token operator">=</span>500m localhost:5000/znginx:ubuntu
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>查看容器进程（<em>状态</em>）</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 查看运行状态的容器列表</span>
<span class="token function">docker</span> <span class="token function">ps</span>

<span class="token comment"># 查看全部状态</span>
<span class="token function">docker</span> <span class="token function">ps</span> <span class="token parameter variable">-a</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>挂载目录（<em>数据持久化</em>）</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 挂载主机目录，若目录不存在则自动创建</span>
<span class="token function">docker</span> run <span class="token parameter variable">--name</span> test-volume <span class="token parameter variable">-v</span> /opt:/opt/sub <span class="token parameter variable">-d</span> znginx:ubuntu
<span class="token function">docker</span> run <span class="token parameter variable">--name</span> mysql <span class="token parameter variable">-e</span> <span class="token assign-left variable">MYSQL_ROOT_PASSWORD</span><span class="token operator">=</span><span class="token number">123456</span> <span class="token parameter variable">-d</span> <span class="token parameter variable">-v</span> /opt/mysql/: /var/lib/mysql mysql:5.7

<span class="token comment"># 查看 test-volume 挂载后的文件</span>
<span class="token function">docker</span> <span class="token builtin class-name">exec</span> test-volume <span class="token function">ls</span> /opt/sub/

<span class="token comment"># 使用 volumes 卷（很少使用）</span>
$ <span class="token function">docker</span> volume <span class="token function">ls</span>
<span class="token comment">## DRIVER    VOLUME NAME</span>
<span class="token comment">## local     0ea556cf67053a251e6c5cdd52ee861fef78729574f38b21faecf1ef1df7e687</span>
<span class="token comment">## local     5537ee1392f3c89fe872a5af562ae7238168e3eaa81fb4453ed7b1dcf17703e7</span>
<span class="token comment"># 通过命令 -v 挂载的，则会自动创建 volume name</span>

<span class="token comment"># 相对路径下，创建一个名为 my-vol 的数据卷</span>
$ <span class="token function">docker</span> volume create my-vol
$ <span class="token function">docker</span> run <span class="token parameter variable">--name</span> naginx <span class="token parameter variable">-d</span> <span class="token parameter variable">-v</span> my-vol:/opt/my-vol znginx:ubuntu
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>主机与容器之间拷贝数据</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 主机文件拷贝到容器</span>
<span class="token builtin class-name">echo</span> <span class="token string">"123"</span> <span class="token operator">></span> /tmp/test.txt
<span class="token function">docker</span> <span class="token function">cp</span> /tmp/test.txt znginx:ubuntu
<span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-ti</span> znginx <span class="token function">cat</span> /tmp/test.txt

<span class="token comment"># 容器文件拷贝到主机</span>
<span class="token function">docker</span> <span class="token function">cp</span> znginx:/tmp/test.txt ./
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>若网络不佳，可离线打包重建仓库，并修改默认的挂载</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 比如公司网慢，线上下载卡顿，直接从源哪里打一个离线的registry包，拷贝到本地</span>
<span class="token comment"># 解压离线镜像文件</span>
<span class="token function">tar</span> zxf registry.tar.gz <span class="token parameter variable">-C</span> /opt

<span class="token comment"># 删除当前镜像仓库容器</span>
<span class="token function">docker</span> <span class="token function">rm</span> <span class="token parameter variable">-f</span> registry

<span class="token comment"># 使用docker 镜像启动镜像仓库服务</span>
<span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">-p</span> <span class="token number">5000</span>:5000 <span class="token parameter variable">--restart</span> always <span class="token parameter variable">-v</span> /opt/registry:/var/lib/registry <span class="token parameter variable">--name</span> registry registry:2

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>查看日志</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 实时查看 最新的 100条日志</span>
<span class="token function">docker</span> logs <span class="token parameter variable">-f</span> <span class="token parameter variable">--tail</span><span class="token operator">=</span><span class="token number">100</span> znginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>查看容器或镜像的明细</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 查看容器的详细信息，包括IP地址等</span>
<span class="token function">docker</span> inspect z-nginx:ubuntu <span class="token operator">|</span> <span class="token function">more</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h5 id="一号进程" tabindex="-1"><a class="header-anchor" href="#一号进程" aria-hidden="true">#</a> <strong>一号进程</strong></h5>
<p><strong>1</strong> 号进程比较特殊，若退出则容器销毁，不仅能通过 <code v-pre>CMD</code> 定义，还能在容器启动时，通过命令去覆盖默认的 <code v-pre>CMD</code></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># &lt;自定义命令> 会覆盖镜像中指定的CMD指令，作为容器的 1号进程 启动</span>
<span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">--name</span> xx nginx:alpine <span class="token operator">&lt;</span>自定义命令<span class="token operator">></span>

<span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">--name</span> test-3 nginx:alpine <span class="token builtin class-name">echo</span> <span class="token number">123</span>	<span class="token comment"># 直接退出</span>

<span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">--name</span> test-4 nginx:alpine <span class="token function">ping</span> www.baidu.com	<span class="token comment"># 卡死在ping命令</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因此每个容器都是个隔离进程</p>
<h3 id="_1-4-注意事项与实用小技巧" tabindex="-1"><a class="header-anchor" href="#_1-4-注意事项与实用小技巧" aria-hidden="true">#</a> 1.4 注意事项与实用小技巧</h3>
<h5 id="注意" tabindex="-1"><a class="header-anchor" href="#注意" aria-hidden="true">#</a> <strong>注意</strong></h5>
<p>不建议使用 <mark>commit</mark> 和 <mark>import</mark> 命令</p>
<ul>
<li>
<p>通常，可以通过历史命令，来查看镜像的执行过程</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> <span class="token function">history</span> z-nginx:ubuntu

<span class="token comment"># IMAGE          CREATED        CREATED BY                                      SIZE      COMMENT</span>
<span class="token comment"># 226cb3d00202   6 months ago   /bin/sh -c #(nop)  CMD ["/usr/sbin/nginx" "-…   0B</span>
<span class="token comment"># 4f9c565b5c26   6 months ago   /bin/sh -c apt-get update &amp;&amp; apt install -y …   92.7MB</span>
<span class="token comment"># ba6acccedd29   9 months ago   /bin/sh -c #(nop)  CMD ["bash"]                 0B</span>
<span class="token comment"># &lt;missing>      9 months ago   /bin/sh -c #(nop) ADD file:5d68d27cc15a80653…   72.8MB</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>若使用如上命令操作，则为黑盒、不可控，执行过程根本无从追溯，也无法二次改造</p>
</li>
<li>
<p>若出现 <strong>dangling image</strong>（<em>悬空镜像</em>）类似 <code v-pre>&lt;none&gt;:&lt;none&gt;</code> 这类镜像</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 使用如下命令，删除垃圾镜像</span>
<span class="token function">docker</span> rmi <span class="token variable"><span class="token variable">$(</span><span class="token function">docker</span> images <span class="token parameter variable">-f</span> <span class="token string">"dangling=true"</span> <span class="token parameter variable">-q</span><span class="token variable">)</span></span>

<span class="token comment"># 检查</span>
<span class="token function">docker</span> images <span class="token operator">|</span> <span class="token function">grep</span> <span class="token string">'&lt;none>'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h5 id="实用技巧" tabindex="-1"><a class="header-anchor" href="#实用技巧" aria-hidden="true">#</a> <strong>实用技巧</strong></h5>
<ol>
<li>
<p>清理主机上的所有 <strong>退出状态</strong> 的容器</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> <span class="token function">rm</span> <span class="token variable"><span class="token variable">$(</span><span class="token function">docker</span> <span class="token function">ps</span> <span class="token parameter variable">-aq</span><span class="token variable">)</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>调试或者排查容器启动错误</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 若遇到容器 启动失败 情况，先实用相同的镜像，启动一个临时容器，先进入容器</span>
<span class="token function">docker</span> run <span class="token parameter variable">--rm</span> ti <span class="token operator">&lt;</span>image_id<span class="token operator">></span> <span class="token function">sh</span>

<span class="token comment"># 进入容器后，手动指定该容器对应的 ENTRYPOINT 或 CMD 命令，此时即使出错，容器也不会退出</span>
<span class="token comment"># 因为 bash 作为 1号进程，只要不主动退出容器，该容器就不会自动退出， --rm 容器跟随退出</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<hr>
<h2 id="_2-docker-构建镜像" tabindex="-1"><a class="header-anchor" href="#_2-docker-构建镜像" aria-hidden="true">#</a> 2. Docker 构建镜像</h2>
<h3 id="_2-1-dockerfile" tabindex="-1"><a class="header-anchor" href="#_2-1-dockerfile" aria-hidden="true">#</a> 2.1 Dockerfile</h3>
<p><strong>Dockerfile</strong> 是一堆指令，用来构建镜像的文本文件，在 <code v-pre>docker build</code> 时，按照该指令进行操作，最终生成期望的镜像</p>
<p><strong>相关文档：</strong></p>
<ul>
<li><a href="https://docs.docker.com/engine/reference/builder/" target="_blank" rel="noopener noreferrer">Dockerfile 文档（英文）<ExternalLinkIcon/></a></li>
<li><a href="https://docs.docker.com/engine/userguide/eng-image/dockerfile_best-practices/" target="_blank" rel="noopener noreferrer">Dockerfile 最佳实践（英文）<ExternalLinkIcon/></a></li>
<li><a href="https://www.runoob.com/docker/docker-dockerfile.html" target="_blank" rel="noopener noreferrer">Dockerfile | 菜鸟教程<ExternalLinkIcon/></a></li>
<li><a href="https://www.w3cschool.cn/reqsgr/redknozt.html" target="_blank" rel="noopener noreferrer">Dockerfile 基本结构 | w3cschool<ExternalLinkIcon/></a></li>
</ul>
<h5 id="构建命令" tabindex="-1"><a class="header-anchor" href="#构建命令" aria-hidden="true">#</a> 构建命令：</h5>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ <span class="token function">docker</span> build <span class="token builtin class-name">.</span> <span class="token parameter variable">-t</span> image_name:image_tag <span class="token parameter variable">-f</span> DockerFile
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>
<p><strong>FROM:</strong> 指定基础镜像，必须为第一个命令</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 格式</span>
	FROM <span class="token operator">&lt;</span>image<span class="token operator">></span>
	FROM <span class="token operator">&lt;</span>image<span class="token operator">></span>:<span class="token operator">&lt;</span>tag<span class="token operator">></span>
<span class="token comment"># 示例</span>
	FROM mysql:5.7
<span class="token comment"># 注意</span>
	tag 是可选的，如果不使用tag时，会使用latest版本的基础镜像
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>MAINTAINER</strong> 镜像维护者信息</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 格式</span>
	MAINTAINER <span class="token operator">&lt;</span>name<span class="token operator">></span>
<span class="token comment"># 示例</span>
	MAINTAINER Fuuka Igarashi
	MAINTAINER <span class="token number">2545369032</span>@qq.com
	MAINTAINER Fuuka Igarashi <span class="token operator">&lt;</span><span class="token number">2545369032</span>@qq.com<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>COPY|ADD</strong> 添加本地源代码到镜像</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 格式</span>
	COPY <span class="token operator">&lt;</span>src<span class="token operator">></span><span class="token punctuation">..</span>. <span class="token operator">&lt;</span>dest<span class="token operator">></span>
<span class="token comment"># 示例</span>
	COPY <span class="token builtin class-name">.</span> <span class="token builtin class-name">.</span>
	ADD hom* /mydir/ 		<span class="token comment"># 添加所有已 'hom' 开头的文件</span>
	ADD <span class="token builtin class-name">test</span> relativeDir 	<span class="token comment"># 添加 "test" 到 `WORKDIR` /relativeDir/</span>
<span class="token comment"># 注意</span>
	ADD 和 COPY 相比，若指定<span class="token operator">&lt;</span>src<span class="token operator">></span>是个压缩文件，会自动进行解压而导致不可控，因此不要用ADD
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>WORKDIR</strong> 工作目录</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 格式</span>
	WORKDIR /path/to/workdir
<span class="token comment"># 示例</span>
	WORKDIR /opt/ufs		<span class="token comment"># 工作目录为 /opt/ufs</span>
<span class="token comment"># 注意</span>
	通过 WORKDIR 设置工作目录后，Dokcerfile 中启动后的命令
	RUN、COM、ENTRYPOINT、ADD、COPY等都会在该目录下执行
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>RUN</strong> 构建镜像过程中执行命令</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 格式</span>
	RUN <span class="token operator">&lt;</span>command<span class="token operator">></span>
<span class="token comment"># 示例</span>
	RUN yum <span class="token function">install</span> nginx
	RUN pip <span class="token function">install</span> <span class="token parameter variable">-r</span> ./requirements.txt
	RUN <span class="token function">mkdir</span> <span class="token builtin class-name">test</span> <span class="token operator">&amp;&amp;</span> <span class="token function">rm</span> <span class="token parameter variable">-rf</span> /var/lib/unusedfiles
<span class="token comment"># 注意</span>
	RUN 指令创建的中间镜像会被缓存，并会在下次构建中使用.
	如果不想使用这些缓存镜像，可以在构建时指定 --no-cache 参数
	如： <span class="token function">docker</span> build --no-cache
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>CMD</strong> 构建容器后调用，也就是在容器启动时才进行调用</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 格式</span>
	CMD <span class="token punctuation">[</span><span class="token string">"executable"</span>, <span class="token string">"param1"</span>, <span class="token string">"param2"</span><span class="token punctuation">]</span>	<span class="token comment"># 执行 可执行文件，优先</span>
	CMD <span class="token punctuation">[</span><span class="token string">"param1"</span>, <span class="token string">"param2"</span><span class="token punctuation">]</span>				<span class="token comment"># 设置了 ENTRYPOINT，则直接调用 ENTRYPOINT 添加参数</span>
	CMD <span class="token builtin class-name">command</span> param1 param2 				<span class="token comment"># 执行 shell内部命令</span>
<span class="token comment"># 示例</span>
	CMD <span class="token punctuation">[</span><span class="token string">"/usr/bin/wc"</span>, <span class="token string">"--help"</span><span class="token punctuation">]</span>
	CMD <span class="token function">ping</span> www.baidu.com
<span class="token comment"># 注意</span>
	CMD 不同于RUN, CMD 用于指定在容器启动时所要执行的命令
	而 RUN 用于指定镜像构建时所要执行的命令
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>ENTRYPOINT</strong> 设置容器初始化命令，使其可执行化</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 格式</span>
	ENTRYPOINT <span class="token punctuation">[</span><span class="token string">"executable"</span>, <span class="token string">"param1"</span>, <span class="token string">"param2"</span><span class="token punctuation">]</span>	<span class="token comment"># 执行 可执行文件，优先</span>
	ENTRYPOINT <span class="token builtin class-name">command</span> param1 param2 				<span class="token comment"># 执行 shell内部命令</span>
<span class="token comment"># 示例</span>
	ENTRYPOINT <span class="token punctuation">[</span><span class="token string">"/usr/bin/wc"</span>, <span class="token string">"--help"</span><span class="token punctuation">]</span>
<span class="token comment"># 注意</span>
	ENTRYPOINT 和 CMD 类似，不同的是通过 <span class="token function">docker</span> run 执行的命令不会覆盖 ENTRYPOINT,
	而 <span class="token function">docker</span> run 命令中指定的任何参数，都会被当做参数再次传递给 ENTRYPOINT
		
	Dockerfile中只允许有一个 ENTRYPOINT 命令
	多指定时会覆盖前面的设置，而仅执行最后的 ENTRYPOINT 指令
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>ENV</strong> 环境变量</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 格式</span>
	ENV <span class="token operator">&lt;</span>key<span class="token operator">></span> <span class="token operator">&lt;</span>value<span class="token operator">></span>
	ENV <span class="token operator">&lt;</span>key<span class="token operator">>=</span><span class="token operator">&lt;</span>value<span class="token operator">></span>
<span class="token comment"># 示例</span>
	ENV NODE_VERSION <span class="token number">7.2</span>.0
	ENV <span class="token assign-left variable">MYSQL_ROOT_PASSWORD</span><span class="token operator">=</span><span class="token number">123456</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>EXPOSE</strong> 声明端口，无重要意义</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 格式</span>
	EXPOSE <span class="token operator">&lt;</span>port<span class="token operator">></span> <span class="token punctuation">[</span><span class="token operator">&lt;</span>port<span class="token operator">></span><span class="token punctuation">..</span>.<span class="token punctuation">]</span>
<span class="token comment"># 示例</span>
	EXPOSE <span class="token number">80</span> <span class="token number">443</span>
	EXPOSE <span class="token number">8080</span>
	EXPOSE <span class="token number">11211</span>/tcp <span class="token number">11211</span>/udp
<span class="token comment"># 注意</span>
	EXPOSE 并不会让容器的端口访问到主机
	要使其访问，需要在 <span class="token function">docker</span> run 运行容器时 指定 <span class="token parameter variable">-p</span> 来发布端口映射
	或通过 <span class="token parameter variable">-P</span> 参数来发布 EXPOSE 导出的所有端口
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h3 id="_2-2-示例" tabindex="-1"><a class="header-anchor" href="#_2-2-示例" aria-hidden="true">#</a> 2.2 示例</h3>
<p>构建一个 <a href="https://gitee.com/igarashi/python-demo" target="_blank" rel="noopener noreferrer">blog<ExternalLinkIcon/></a> 的 <strong>Python Web</strong> 应用，<strong>Dockerfile 如下</strong></p>
<div class="language-docker ext-docker line-numbers-mode"><pre v-pre class="language-docker"><code><span class="token comment"># This is my first django Dockerfile</span>
<span class="token comment"># Version 1.0</span>

<span class="token comment"># Base images 基础镜像</span>
<span class="token instruction"><span class="token keyword">FROM</span> centos:centos7.5.1804</span>

<span class="token comment"># MAINTAINER 维护者信息</span>
<span class="token instruction"><span class="token keyword">MAINTAINER</span> Igarashi-G</span>

<span class="token comment"># ENV 设置环境变量</span>
<span class="token instruction"><span class="token keyword">ENV</span> LANG en_US.UTF-8</span>
<span class="token instruction"><span class="token keyword">ENV</span> LC_ALL en_US.UTF-8</span>

<span class="token comment"># RUN 执行以下命令</span>
<span class="token instruction"><span class="token keyword">RUN</span> curl -so /etc/yum.repos.d/Centos-7.repo http://mirrors.aliyun.com/repo/Centos-7.repo  &amp;&amp; rpm -Uvh http://nginx.org/packages/centos/7/noarch/RPMS/nginx-release-centos-7-0.el7.ngx.noarch.rpm</span>
<span class="token instruction"><span class="token keyword">RUN</span> yum install -y python36 python3-devel gcc pcre-devel zlib-devel make net-tools nginx</span>

<span class="token comment"># 工作目录</span>
<span class="token instruction"><span class="token keyword">WORKDIR</span> /opt/myblog</span>

<span class="token comment"># 拷贝文件到工作目录</span>
<span class="token instruction"><span class="token keyword">COPY</span> . .</span>

<span class="token comment"># 拷贝 nginx 配置文件</span>
<span class="token instruction"><span class="token keyword">COPY</span> myblog.conf /etc/nginx</span>

<span class="token comment"># 安装依赖的插件</span>
<span class="token instruction"><span class="token keyword">RUN</span> pip3 install -i http://mirrors.aliyun.com/pypi/simple/ --trusted-host mirrors.aliyun.com -r requirements.txt</span>
<span class="token instruction"><span class="token keyword">RUN</span> chmod +x run.sh &amp;&amp; rm -rf ~/.cache/pip</span>

<span class="token comment"># EXPOSE映射端口</span>
<span class="token instruction"><span class="token keyword">EXPOSE</span> 8002</span>

<span class="token comment"># 容器启动时执行命令</span>
<span class="token instruction"><span class="token keyword">CMD</span> [<span class="token string">"./run.sh"</span>]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>执行构建</strong></p>
<div class="language-sehll ext-sehll line-numbers-mode"><pre v-pre class="language-sehll"><code>docker build . -t myblog:v1 -f Dockerfile
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>运行 mysql</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ <span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">-p</span> <span class="token number">3306</span>:3306 <span class="token parameter variable">--name</span> mysql <span class="token parameter variable">-v</span> /opt/mysql:/var/lib/mysql <span class="token parameter variable">-e</span> <span class="token assign-left variable">MYSQL_DATABASE</span><span class="token operator">=</span>myblog <span class="token parameter variable">-e</span> <span class="token assign-left variable">MYSQL_ROOT_PASSWORD</span><span class="token operator">=</span><span class="token number">123456</span> mysql:5.7

<span class="token comment"># 查看数据库</span>
$ <span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-ti</span> mysql <span class="token function">bash</span>
<span class="token comment">#/ mysql -uroot -p123456</span>
<span class="token comment">#/ show databases;</span>

<span class="token comment"># navicator连接</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>启动 Django 应用</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 启动容器</span>
$ <span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">-p</span> <span class="token number">8002</span>:8002 <span class="token parameter variable">--name</span> myblog <span class="token parameter variable">-e</span> <span class="token assign-left variable">MYSQL_HOST</span><span class="token operator">=</span><span class="token number">120.53</span>.122.253 <span class="token parameter variable">-e</span> <span class="token assign-left variable">MYSQL_USER</span><span class="token operator">=</span>root <span class="token parameter variable">-e</span> <span class="token assign-left variable">MYSQL_PASSWD</span><span class="token operator">=</span><span class="token number">123456</span> myblog:v1

<span class="token comment"># migrate</span>
$ <span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-ti</span> myblog <span class="token function">bash</span>
<span class="token comment">#/ python3 manage.py makemigrations</span>
<span class="token comment">#/ python3 manage.py migrate</span>
<span class="token comment">#/ python3 manage.py createsuperuser</span>

<span class="token comment"># 创建超级用户</span>
$ <span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-ti</span> myblog python3 manage.py createsuperuser

<span class="token comment"># 收集静态文件</span>
<span class="token comment">#$ docker exec -ti myblog python3 manage.py collectstatic</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>访问：</strong> <a href="http://120.53.122.253:8002/admin" target="_blank" rel="noopener noreferrer">腾讯云地址<ExternalLinkIcon/></a></p>
<h5 id="替换-mysql的默认编码为-utf-8" tabindex="-1"><a class="header-anchor" href="#替换-mysql的默认编码为-utf-8" aria-hidden="true">#</a> <strong>替换 MySQL的默认编码为 UTF-8</strong></h5>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code> <span class="token comment"># dockerfiles/mysq1/my.cnf</span>
$ <span class="token function">cat</span> my.cnf
<span class="token punctuation">[</span>mysqld<span class="token punctuation">]</span>
<span class="token assign-left variable">user</span><span class="token operator">=</span>root
character-set-server<span class="token operator">=</span>utf8
<span class="token assign-left variable">lower_case_table_names</span><span class="token operator">=</span><span class="token number">1</span>

<span class="token punctuation">[</span>client<span class="token punctuation">]</span>
default-character-set<span class="token operator">=</span>utf8
<span class="token punctuation">[</span>mysql<span class="token punctuation">]</span>
default-character-set<span class="token operator">=</span>utf8

<span class="token operator">!</span>includedir /etc/mysql/conf.d/
<span class="token operator">!</span>includedir /etc/mysql/mysql.conf.d/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>重做 MySQL 镜像</strong></p>
<div class="language-docker ext-docker line-numbers-mode"><pre v-pre class="language-docker"><code><span class="token comment"># 基于 mysql5.7 覆盖</span>
<span class="token instruction"><span class="token keyword">FROM</span> mysql5.7</span>
<span class="token instruction"><span class="token keyword">COPY</span> my.cnf /etc/mysql/my.cnf</span>

<span class="token comment"># 若不指定 CMD 则会自动继承</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container warning">
<p class="custom-container-title">注意</p>
<ul>
<li>通常不会直接写 <strong>FROM</strong> 这种很原生的 <strong>Dockerfile</strong>，因为每次 <code v-pre>build</code> 构建会拖慢整个自动化的速度</li>
<li>因此将所需的环境、依赖啥的，打一个 <strong>基础镜像</strong>，方便直接引入</li>
</ul>
</div>
</div></template>


