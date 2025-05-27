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

  ```nginx
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
  	ssl_certificate /home/igarashi/web/ssl/8500011_www.igarashi.icu.pem;
  	ssl_certificate_key /home/igarashi/web/ssl/8500011_www.igarashi.icu.key;
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

```nginx
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

  ```nginx
  server {
      listen 80 default_server; # 设置 default 当使用 ip 地址访问，默认进入 server 设置的页面
      server_name www.taobao.dom taobao.com;
    location / {
        root /data/taobao;
        index index.html;
    }
    }
  ```

### 4.2 关于跨域

跨域是浏览器同源策略的限制，注意是针对与 **浏览器** 的，而比如微服务下，**服务A** —调用—> **服务B** 或者，其他应用比如桌面应用，创建一个 **Client** 去跨主机远程调用 **都是与跨域无关的！** 

::: important **仅作用于浏览器！！!** 

- 因此，通常 **前端** 的解决方案是另启动一个代理服务器，作为 **中间代理 Proxy 通信** ，帮助前端浏览器发送请求到后端
- 后端解决则可以通过服务器指定请求头 **CORS headers** 来实现
  - **`Access-Control-Allow-Origin：*`** 
  - **`Access-Control-Allow-Methods：*`** 
  - **`Access-Control-Allow-Headers：*`**  

::: 

那么使用了 **Nginx** 则可以通过反向代理配置文件中允许跨域来实现，如下：

```nginx
add_header 'Access-Control-Allow-Origin' '*' always;
add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS, PUT, DELETE' always;
add_header 'Access-Control-Allow-Headers' 'Origin, X-Requested-With, Content-Type, Accept, Authorization' always;
add_header 'Access-Control-Allow-Credentials' 'true' always;

# 处理预检请求
if ($request_method = 'OPTIONS') {
    add_header 'Access-Control-Max-Age' 1728000;
    add_header 'Content-Type' 'text/plain charset=UTF-8';
    add_header 'Content-Length' 0;
    return 204;
}
```



## 5. 示例

**nginx.conf 示例** 

```nginx
# daemon off;
worker_processes  auto; #should be 1 for Windows, for it doesn't support Unix domain socket
#worker_processes  auto; #from versions 1.3.8 and 1.2.5

#worker_cpu_affinity  0001 0010 0100 1000; #only available on FreeBSD and Linux
worker_cpu_affinity  auto; #from version 1.9.10

user root;
error_log /var/log/nginx/error.log error;
pid        /var/run/nginx.pid;

#located before events directive, otherwise the module won't be loaded
#or will be loaded unsuccessfully when NGINX is started

#load_module modules/ngx_http_flv_live_module.so;

events {
    use epoll;

    #设置单个工作进程的最大并发连接数
    worker_connections  4096;

    #on为同一时刻一个请求轮流由work进程处理,而防止被同时唤醒所有worker,避免多个睡眠进程被唤醒的设置，默认为off，新请求会唤醒所有worker进程,此过程也称为"惊群"，因此nginx刚安装完以后要进行适当的优化。建议设置为on
    accept_mutex on;

    #ON时Nginx服务器的每个工作进程可以同时接受多个新的网络连接，此指令默认为off，即默认为一个工作进程只能一次接受一个新的网络连接，打开后几个同时接受多个。建议设置为on
    multi_accept on;

}

http {
    include /usr/local/nginx/conf/mime.types;

    # 隐藏nginx的版本
    server_tokens off;

    # 已开启，提高文件传输效率
    sendfile       on;

    # 匹配变量http_upgrade的值，根据匹配情况为变量connection_upgrade赋值
    map $http_upgrade $connection_upgrade {
        default upgrade;
        ''      close;
    }

    client_max_body_size 2000m;
    client_body_buffer_size 4M;
    client_header_buffer_size 16k;
    large_client_header_buffers 4 32k;

    # 日志格式定义
    log_format main '$remote_addr - $remote_user [$time_local] "$request" '
                   '$status $body_bytes_sent "$http_referer" '
                   '"$http_user_agent" "$http_x_forwarded_for"';

    # 详细日志格式（推荐）
    log_format detailed '$remote_addr - $remote_user [$time_local] "$request" '
                        '$status $body_bytes_sent "$http_referer" '
                        '"$http_user_agent" "$http_x_forwarded_for" '
                        '$request_time $upstream_response_time $upstream_addr';

    # JSON 格式日志（适合日志分析）
    log_format json_log escape=json '{'
        '"time_local":"$time_local",'
        '"remote_addr":"$remote_addr",'
        '"remote_user":"$remote_user",'
        '"request":"$request",'
        '"status": "$status",'
        '"http_referer":"$http_referer",'
        '"body_bytes_sent":"$body_bytes_sent",'
        '"http_user_agent":"$http_user_agent",'
        '"request_time":$request_time,'
        '"upstream_response_time":$upstream_response_time'
    '}';

    # 日志路径配置
    error_log /var/log/nginx/error.log error;

    server {
        listen 8081;
        server_name _;
        charset utf-8;

        # 使用指定格式
        access_log /var/log/nginx/access.log detailed buffer=32k flush=5s;

        gzip_static on;
        gzip_proxied expired no-cache no-store private auth;
        gzip on;
        gzip_http_version 1.1;
        gzip_buffers 32 16K;
        gzip_comp_level 6;
        gzip_min_length 1k;
        gzip_types text/plain text/css text/xml text/javascript application/json application/javascript application/x-javascript application/xml image/svg+xml;
        gzip_vary on;
        gzip_disable "MSIE [1-6]\.";

        # 添加一些安全相关的请求头，用于防止常见的 Web 安全攻击
        add_header X-XSS-Protection "1; mode=block";
        add_header X-Content-Type-Options nosniff;

        proxy_set_header X-Forwarded-For $remote_addr;

        underscores_in_headers on;

        include location/*.conf ;

    }

    include /etc/nginx/conf.d/*.conf;

}

```

**nginx-ssl.conf 示例** 

```nginx
# daemon off;
worker_processes  auto; #should be 1 for Windows, for it doesn't support Unix domain socket
#worker_processes  auto; #from versions 1.3.8 and 1.2.5

#worker_cpu_affinity  0001 0010 0100 1000; #only available on FreeBSD and Linux
#worker_cpu_affinity  auto; #from version 1.9.10

user root;
error_log /var/log/nginx/error.log error;
pid        /var/run/nginx.pid;

#located before events directive, otherwise the module won't be loaded
#or will be loaded unsuccessfully when NGINX is started

#load_module modules/ngx_http_flv_live_module.so;

events {
    use epoll;
    worker_connections  4096;
    accept_mutex on;
    multi_accept on;
}

http {
    default_type  application/octet-stream;
    include /usr/local/nginx/conf/mime.types;

    client_max_body_size 2000m;
    client_body_buffer_size 4M;
    client_header_buffer_size 16k;
    large_client_header_buffers 4 32k;

    server_tokens off;

     # 已开启，提高文件传输效率
    sendfile       on;


    # 匹配变量http_upgrade的值，根据匹配情况为变量connection_upgrade赋值
    map $http_upgrade $connection_upgrade {
        default upgrade;
        ''      close;
    }

    # 日志格式定义
    log_format main '$remote_addr - $remote_user [$time_local] "$request" '
                   '$status $body_bytes_sent "$http_referer" '
                   '"$http_user_agent" "$http_x_forwarded_for"';

    # 详细日志格式（推荐）
    log_format detailed '$remote_addr - $remote_user [$time_local] "$request" '
                        '$status $body_bytes_sent "$http_referer" '
                        '"$http_user_agent" "$http_x_forwarded_for" '
                        '$request_time $upstream_response_time $upstream_addr';

    # JSON 格式日志（适合日志分析）
    log_format json_log escape=json '{'
        '"time_local":"$time_local",'
        '"remote_addr":"$remote_addr",'
        '"remote_user":"$remote_user",'
        '"request":"$request",'
        '"status": "$status",'
        '"http_referer":"$http_referer",'
        '"body_bytes_sent":"$body_bytes_sent",'
        '"http_user_agent":"$http_user_agent",'
        '"request_time":$request_time,'
        '"upstream_response_time":$upstream_response_time'
    '}';

    # 日志路径配置
    error_log /var/log/nginx/error.log error;

    server {
        # listen 8081 ssl http2;
        listen 8081 ssl;
        http2 on;

        server_name crip.corerain.com;

        charset utf-8;

        # 使用指定格式
        access_log /var/log/nginx/access.log detailed buffer=32k flush=5s;

        ssl_certificate /usr/local/nginx/cert/server.crt;
        ssl_certificate_key /usr/local/nginx/cert/server.key;
        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_session_timeout 5m;
        ssl_ciphers "ECDHE-RSA-AES256-GCM-SHA384:ECDHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-SHA384:ECDHE-RSA-AES128-SHA256:ECDHE-RSA-AES256-SHA:ECDHE-RSA-AES128-SHA:DHE-RSA-AES256-SHA256:DHE-RSA-AES128-SHA256:DHE-RSA-AES256-SHA:DHE-RSA-AES128-SHA:ECDHE-RSA-DES-CBC3-SHA:EDH-RSA-DES-CBC3-SHA:AES256-GCM-SHA384:AES128-GCM-SHA256:AES256-SHA256:AES128-SHA256:AES256-SHA:AES128-SHA:DES-CBC3-SHA:HIGH:!aNULL:!eNULL:!EXPORT:!DES:!MD5:!PSK:!RC4";
        ssl_prefer_server_ciphers on;

        gzip_static on;
        gzip_proxied expired no-cache no-store private auth;
        gzip on;
        gzip_http_version 1.1;
        gzip_buffers 32 16K;
        gzip_comp_level 6;
        gzip_min_length 1k;
        gzip_types application/x-javascript text/css text/xml;
        gzip_vary on;
        gzip_disable "MSIE [1-6]\.";

        add_header X-Content-Type-Options "nosniff";
        add_header X-XSS-Protection "1; mode=block";
        add_header Strict-Transport-Security "max-age=63072000; includeSubdomains; preload";
        add_header 'Referrer-Policy' 'origin';
        add_header X-Download-Options noopen;
        add_header X-Permitted-Cross-Domain-Policies none;

        proxy_set_header X-Forwarded-For $remote_addr;

        underscores_in_headers on;

        include location/*.
```



# 6.Nginx 日志

```nginx
#log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
        #                  '$status $body_bytes_sent "$http_referer" '
        #                  '"$http_user_agent" "$http_x_forwarded_for"';

                                                    # log_format main 可以定义日志格式
        #access_log  logs/access.log  main;         # 日志用什么格式输出

把注释去掉即可打开日志
```

**查看日志**

```shell
tail -f logs/access.log
remote_addr: 访问ip地址
remote_user: 访问的用户
[$time_local]: 访问的本地时间
request: 包括请求方式、请求地址、请求协议版本
status： 状态码
body_bytes_sent 发送的大小
http_user_agent 用户请求的浏览器
http_x_forwarded_for
```

**设置网段禁止访问**

```nginx
deny 192.168.21.0/255.255.255.0;    设置这个网段都不能访问，不加子网掩码可以单独设置ip
deny 192.168.21.0/24;  同上
```

**设置白名单**

```nginx
allow 192.168.21.131;
以上均可写在server或location里面
```

## 7. 反向代理

- **作用**：起到保护网站安全的作用，用户访问的永远是这台反向代理的 nginx 机器，因此只用维护 nginx 这台机器的安全防护即可。

- **动静分离**：动态网站和静态网站分离，nginx 可以直接请求静态文件，而避免请求 Django 和后端交互。直接缓存静态文件即可。

- **负载均衡**：F5、V10、LVS、haproxy（支持 4 层还支持 7 层）nginx 最早出来之前只支持 7 层，新版支持 4 层还支持 UDP 的负载均衡。缓解一台服务器压力，可以承受更多请求。

### 权重

```nginx
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
```

### ip_hash

每个请求做 hash 运算，这样每个固定的访客都会被负载到后端固定的机器

```nginx
upstream django {
    ip_hash;
    server 192.168.21.128:81;
    server 191.168.21.131:81;
}
```

### backup

备份：

