# tailscale

[tailscale](https://tailscale.com/blog/how-tailscale-works) 

<!--more-->



### 常用命令

#### 中继

##### **列节点**

```
$ docker exec -ti headscale headscale nodes list 
```



#### 边侧

##### **注册** 

```shell
$ docker exec -ti tailscale tailscale login --login-server http://59.110.140.40:8080
```

##### **验证连通性** 

```shell
$ docker exec -ti tailscale tailscale ping 99.1.1.4

pong from iz2ze5felqlqt3x6irll8ez (99.1.1.4) via 59.110.140.40:59836 in 44ms
```

##### **网络检查** 

显示当前设备的物理网络状况, 会列出中继服务器（**DERP**）列表，及当前设备连接到每个服务器所需的时间。

```shell
$ docker exec -ti tailscale tailscale netcheck –verbose
	Report:
        * Time: 2025-08-28T09:31:33.04254326Z
        * UDP: true
        * IPv4: yes, 14.153.167.75:2238
        * IPv6: no, but OS has support
        * MappingVariesByDestIP: 
        * PortMapping: 
        * Nearest DERP: Myself Derper
        * DERP latency:
                - Myself: 57.2ms  (Myself Derper)
```

