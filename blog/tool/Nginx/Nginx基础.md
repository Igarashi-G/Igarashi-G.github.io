---
title: Nginx基础
date: 2020-08-03
category:
  - 工具
tag:
  - Nginx
  - Web
star: true
---

[Nginx](http://nginx.org/) 是 **WEB Server**（*放置 **Web** 服务的*），**C** 语言写的，号称支持百万并发，对 **windows** 支持较差

<!-- more -->

# Nginx

## 1. WEB Server

- **[WSGI]()**：**Python** 自带网关，功能测试用，无法处理并发，**30 MAX** 服务器崩溃
- **[Apache]()**：过去市面主流，现占有率下降，多为银行证券，追求稳定性，**每个连接都会开辟1个线程**，**MAX 1k+** 线程
- **[iis]()**：**Windows** 下是最著名的 **Web** 服务器
- [**Tengine**](http://tengine.taobao.org/)：淘宝在 **Nginx** 的基础上进行了二次封装，开源的，针对大访问量网站的需求（_没啥区别_）
- **[F5]()**：硬件负载，收购了 **Nginx**
- **[A10]()**：对应 **F5** 的，也是硬件负载
- **[LVS]()**：**Linux** 下著名的 **负载均衡软件** ，告诉用户在多台服务器的情况下，该访问那台机器（*国人开发者：章文嵩，阿里 -> 滴滴*，*另一个出名的国人开发者是：尤雨溪，前端 **Vue** 框架*）
- **[Nginx]()**：当下最主流，比 **Apache** 轻量，且处理并发的能力还强很多（_更能承载高并发_）底层用 **epoll**（*IO 多路复用*）故能处理上万个并发

:::tip

- **Nginx** 可作为静态页面的 **Web** 服务器，支持 **CGI** 协议的动态语言（*perl，php等*）但不支持 **Java**，**Java** 程序只能通过与 **tomcat** 配合完成

- **Nginx** 专为性能优化而开发，实现上非常注重效率，能经受高负载的考验，有报告表明能支持高达 **50000** 个并发连接数

**Nginx 的必要性：** 用专门的 **HTTP Server** 做一层缓冲，避免 **并发量过大** 导致服务宕掉

:::

## 2. 安装

### 2.1 流程

:::tabs

@tab CentOS

##### **[源码包安装](http://blog.sikacode.com/article/97)**

安装依赖包

```shell
$ yum install -y gcc gcc-c++ make libtool wget pcre pcre-devel zlib zlib-devel openssl openssl-devel
```

下载源码包

```shell
wget http://nginx.org/download/nginx-1.18.0.tar.gz
```

解压

```shell
tar -zxvf nginx-1.18.0.tar.gz
```

安装

```shell
cd nginx-1.18.0

./configure
make && make install
```

编译前，可先 `cat README`

```shell
./configure --help

- 找到安装路径指令： --prefix=PATH
- 找到支持https协议指令： --with-http_ssl_module
- 找到查看nginx状态的指令：--with-http_stub_status_module

./configure --prefix=PATH --with-http_ssl_module --with-http_stub_status_module
```

安装后的路径为 `/usr/local/nginx`

@tab Debain

更新并安装基础包

```shell
sudo apt update

sudo apt install curl gnupg2 ca-certificates lsb-release
```

安装 **Nginx**

```shell
sudo apt install nginx
```

重启并添加开机启动

```shell
sudo systemctl restart nginx
sudo systemctl enable nginx
```

查看版本

```shell
nginx -v
## nginx version: nginx/1.18.0
```

配置文件路径

```shell
vim /etc/nginx/sites-available/default
```

查看是否已建立软连接，若无手动创建

```shell
ls -ahl /etc/nginx/sites-enabled
sudo ln -s /etc/nginx/sites-available/default /etc/nginx/sites-enabled/default
```

`reload` 生效

```shell
sudo nginx -s reload
```

:::

### 2.2 简单配置

**Debain** 下的 **Blog** 图片服务器

- 备份配置文件

  ```shell
  cp /etc/nginx/sites-available/default /etc/nginx/sites-available/default_bak
  ```

- 修改配置项

  ```ini
  server {
  	listen 8999;		# 改为监听 8999 端口
  	listen [::]:8999;
  	
  	server_name _;
  	...
  
  	location / {
  		# First attempt to serve request as file, then
  		# as directory, then fall back to displaying a 404.
  		root /home/igarashi/images/;	# 存放图片路径
          autoindex on;					# 打开浏览功能
  	}
  	
  # 监听多个
  server {
  	listen 443 ssl;		# ssl认证
  	listen [::]:443 ssl;
  	
      # 指定加密证书路径
  	ssl_certificate /home/igarashi/web/ssl/8500011_www.igarashi.fun.pem;
  	ssl_certificate_key /home/igarashi/web/ssl/8500011_www.igarashi.fun.key;
  	...
  ```

- 重载服务

  ```shell
  $ sudo nginx -s reload
  ```

## 3. 使用基础

### 3.1 目录结构

- **conf**：配置文件

- **html**：存放静态文件 `index.html` 是默认的欢迎页面

- **logs**：日志目录

- **sbin**：二进制文件

**Nginx** 启动后会运行一个主进程，跟据配置文件的设置 `worker_processes : 1` 生成子进程（_工作进程_）

主进程不负责处理用户的请求，只用来转发给子进程，真正负责处理用户请求的是子进程

### 3.2 命令

- 普通启动服务：`/usr/local/nginx/sbin/nginx`
- 配置文件启动：`/usr/local/nginx/sbin/nginx -c /usr/local/nginx/conf/nginx.conf`
- 暴力停止服务：`/usr/local/nginx/sbin/nginx -s stop`
- 优雅停止服务：`/usr/local/nginx/sbin/nginx -s quit`
- 检查配置文件：`/usr/local/nginx/sbin/nginx -t`
- 重新加载配置：`/usr/local/nginx/sbin/nginx -s reload`
- 查看相关进程：`ps -ef | grep nginx`

##### 帮助

```shell
-?,-h         : this help
-v            : show version and exit                                               显示版本号
-V            : show version and configure options then exit
-t            : test configuration and exit                                         测试配置文件
-T            : test configuration, dump it and exit
-q            : suppress non-error messages during configuration testing
-s signal     : send signal to a master process: stop, quit, reopen, reload         停止退出，重启等
-p prefix     : set prefix path (default: /usr/share/nginx/)
-c filename   : set configuration file (default: /etc/nginx/nginx.conf)
-g directives : set global directives out of configuration file
```

##### 开放防火墙

```shell
/sbin/iptables -I INPUT -p tcp --dport 80 -j ACCEPT
/etc/rc.d/init.d/iptables save
# iptables：将防火墙规则保存到 /etc/sysconfig/iptables：[确定]

# or 暴力关闭防火墙（注：危险操作，清除防火墙规则，但只要没有save还行）
$ iptables -F
$ setenforce 0
```

### 3.3 配置文件

::: details 示例

```ini
#user  nobody;              # 使用哪个用户来启动子进程
    worker_processes  1;        # 工作进程的个数，配置cpu的核心数-1或-2，cpu的亲缘性绑定，让nginx的子进程工作再哪个核心上

    #error_log  logs/error.log;              # 错误日志的存放位置
    #error_log  logs/error.log  notice;
    #error_log  logs/error.log  info;

    #pid        logs/nginx.pid;              # 启动之后会生成一个pid文件（socket文件）
    events {
        worker_connections  1024;           # 每一个子进程工作可以处理的最大连接数，默认1024
                                            # 还可以设置 use [epoll|select|poll] 默认则是自己选择
    }
    http {
        include       mime.types;                   # 导入
        default_type  application/octet-stream;     # 默认的请求方式

        #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
        #                  '$status $body_bytes_sent "$http_referer" '
        #                  '"$http_user_agent" "$http_x_forwarded_for"';

                                                    # log_format main 可以定义日志格式

        #access_log  logs/access.log  main;         # 日志用什么格式输出

        sendfile        on;
        #tcp_nopush     on;

        #keepalive_timeout  0;
        keepalive_timeout  65;                      # 保持长连接的超时时间 65秒

        #gzip  on;

        server {
            listen       80;                        # 监听端口
            server_name  localhost;                 # 设置域名 此处为域名，直接写是肯定不会有个，除非本地HOSTS设置对应的

            #charset koi8-r;

            #access_log  logs/host.access.log  main;

            location / {
                root   html;                        # 指定静态文件地址
                index  index.html index.htm;        # 指定默认的index页面
            }

            #error_page  404              /404.html;    # 错误页面 找不到页面

            # redirect server error pages to the static page /50x.html
            #
            error_page   500 502 503 504  /50x.html;    # 错误页面 服务端错误（后端代码逻辑性错误等）
            location = /50x.html {
                root   html;
            }

            location /img {
                root /data/img;         # 若为root，那么表示/data/img 这个地址为根，还要有个/img目录才行
                alias /data/img;        # 若为alias， 那么表示/data/img 这个地址就是/img的所在目录
            }

            # proxy the PHP scripts to Apache listening on 127.0.0.1:80
            #
            #location ~ \.php$ {
            #    proxy_pass   http://127.0.0.1;
            #}

            # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
            #
            #location ~ \.php$ {
            #    root           html;
            #    fastcgi_pass   127.0.0.1:9000;
            #    fastcgi_index  index.php;
            #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
            #    include        fastcgi_params;
            #}

            # deny access to .htaccess files, if Apache's document root
            # concurs with nginx's one
            #
            #location ~ /\.ht {
            #    deny  all;
            #}
        }
        # another virtual host using mix of IP-, name-, and port-based configuration
        #
        #server {
        #    listen       8000;
        #    listen       somename:8080;
        #    server_name  somename  alias  another.alias;

        #    location / {
        #        root   html;
        #        index  index.html index.htm;
        #    }
        #}
        # HTTPS server
        #
        #server {
        #    listen       443 ssl;
        #    server_name  localhost;

        #    ssl_certificate      cert.pem;
        #    ssl_certificate_key  cert.key;

        #    ssl_session_cache    shared:SSL:1m;
        #    ssl_session_timeout  5m;

        #    ssl_ciphers  HIGH:!aNULL:!MD5;
        #    ssl_prefer_server_ciphers  on;

        #    location / {
        #        root   html;
        #        index  index.html index.htm;
        #    }
        #}

    }
```

:::

## 4. 其他操作

### 4.1 域名设置

**server_name**: `server` 下的 `server_name` 进行设置，由于没有备案需要更改本地 `HOSTS` 才能成功解析。

```ini
server_name www.yukiball.com www.mmmmohime.com mmmmohime.com;
```

**多域名访问（虚拟主机）**： 在 **Nginx** 的设置里面设置多个 `server`

- 基于 `ip` 地址的

- 基于端口的

- 基于域名的：最简单的方式

      server {
          listen 80 default_server; # 设置 default 当使用 ip 地址访问，默认进入 server 设置的页面
          server_name www.taobao.dom taobao.com;
        location / {
            root /data/taobao;
            index index.html;
        }
        }

# 6.Nginx 日志

    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
            #                  '$status $body_bytes_sent "$http_referer" '
            #                  '"$http_user_agent" "$http_x_forwarded_for"';
    
                                                        # log_format main 可以定义日志格式
            #access_log  logs/access.log  main;         # 日志用什么格式输出
    
    把注释去掉即可打开日志

**查看日志**

    tail -f logs/access.log
    remote_addr: 访问ip地址
    remote_user: 访问的用户
    [$time_local]: 访问的本地时间
    request: 包括请求方式、请求地址、请求协议版本
    status： 状态码
    body_bytes_sent 发送的大小
    http_user_agent 用户请求的浏览器
    http_x_forwarded_for

**设置网段禁止访问**

    deny 192.168.21.0/255.255.255.0;    设置这个网段都不能访问，不加子网掩码可以单独设置ip
    deny 192.168.21.0/24;  同上

**设置白名单**

    allow 192.168.21.131;
    以上均可写在server或location里面

# 7.反向代理

- **作用**：起到保护网站安全的作用，用户访问的永远是这台反向代理的 nginx 机器，因此只用维护 nginx 这台机器的安全防护即可。

- **动静分离**：动态网站和静态网站分离，nginx 可以直接请求静态文件，而避免请求 Django 和后端交互。直接缓存静态文件即可。

- **负载均衡**：F5、V10、LVS、haproxy（支持 4 层还支持 7 层）nginx 最早出来之前只支持 7 层，新版支持 4 层还支持 UDP 的负载均衡。缓解一台服务器压力，可以承受更多请求。

  假设目前在 ip 为 192.168.21.131 的一台主机下 配置文件中添加
  upstream django {
  server 192.168.21.128:81;
  server 192.168.21.131L81; # 若此时再加上一个 131 的 81 端口，当访问 131 的 81 端口，会发现在 128 和 131 之前轮询
  }

  server{
  listen 81;
  location / {
  root /data/html;
  index index.html;
  }
  }

### 权重

    upstream django {
        server 192.168.21.128:81 weight=3; # 表示权重访问3次128才访问一次131
        server 192.168.21.131L81;
    }
    
    server{
        listen 80 default_server;
        listem [::]:80 default_server;
        server_name _;
    
        location {
            proxy_pass http://django; #注意这里一定要加http:// + upstream别名
        }
    }

### ip_hash

每个请求做 hash 运算，这样每个固定的访客都会被负载到后端固定的机器

    upstream django {
        ip_hash;
        server 192.168.21.128:81;
        server 191.168.21.131:81;
    }

### backup

备份：

