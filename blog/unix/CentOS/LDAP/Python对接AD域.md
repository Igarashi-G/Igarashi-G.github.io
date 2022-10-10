---
title: Python对接AD域
date: 2022-10-08
category:
  - 运维
tag:
  - Linux
  - LDAP
  - 认证
star: true
sticky: true
---

**UFS** 管理平台 通过**ldap3** 对接 **AD** 域，加入域、退出域、**CIFS** 权限认证等 



<!-- more -->

# Python 对接AD域

## 1. 需求分析

> 支持所有存储节点加入到 **AD域 / LDAP**
>
> **CIFS** 服务（*NAS节点*）支持 **AD**域 | 本地认证

### 1.1 加入/退出域

##### **加入域的场景**

- **添加/扩容节点后：** 提示 `"当前节点尚未加入域"`  **手动执行加入域**
- **加入失败时：** 提示 `"当前节点加入域失败，请检查环境"`  **手动执行加入域**

##### **修改域的场景**

- **限制：**不支持修改 **AD** 服务器 **IP**

##### 退出域的场景

- **删除节点前：** 删除节点时校验，若该节点依然在域中，提示 "`请先退出AD/LDAP域，再重试删除`" 
  - 是否支持强制退出域？ 【支持/不支持】

### 1.2 AD/LDAP的配置

##### AD域配置参数

- **AD域名：** 如 `uit.devops.local`
- **AD DNS IP：** 如 `172.16.70.124`
- **域管理员：** 如 `zhengze`
- **域管理员密码：** 如 `user@dev`
  - 考虑加密
- 【待定】**过滤器：** 例如 OU、CN 等或自定义的结构，暂不考虑，直接获取所有数据
- 【待定】**认证方式选择：** 当前基于 **kerberos** 的 `GSS-API SASL` 认证
  - 其他方式还有 **Simple authentication** 的 `SSL/TLS` 认证
- 【默认内置】**version：** 仅支持 **v3** 
- **测试按钮：** 测试当前 **AD** 域是否连通，未测试通过前无法执行 **“加入域”** 操作
  - **成功：** 提示 "`连接成功`"
  - **失败：** 
    - **超时 10s 后：** 提示 "`服务器不在工作`"
    - **相同 hostname：** 提示 "`存在相同主机名，无法加入`"

##### LDAP配置参数

- **LDAP基准DN：** 如 `DC=uit,DC=devops,DC=local`
- **LDAP主服务器IP：** 如 `172.16.70.124`
- 【待定】**LDAP从服务器IP：** 
- **LDAP 端口：** 默认 `389`
- 【待定】**LDAP协议：** `LDAP/LDAPS` 
- **测试按钮：** 同上

### 1.3 集成到CIFS、文件设置、POSIX

**认证模式：** 支持 **本地认证** 或者 **域认证** （*验证是否同时支持，是否需要改全局配置文件*）

- **Samba共享导出：** 增加指定认证模式
- **文件高级设置：** 同上
- **POSIX共享：** 同上

##### **全局配置文件：** 

- 考虑是否可隐藏于交互逻辑中，而不是单独配置，减少工作量

- **匿名访问：** 若无法减少工作量，考虑是否提升为全局配置



---



## 2. 加入、退出域的实现

使用 `GSS-API SASL` 的方式认证 **realm + kerberos** ，需安装如下软件

- **realm：** 
- **kerberos：** 加密 **Ticket** 的网络身份认证协议，由 **Key Distribution Center** (*即KDC)*、**Client** 和 **Service** 组成，访问**KDC** 两次，拿到 **TGT**，再访问服务器

```shell
$ yum install krb5-devel krb5-workstation -y

# 安装后，客户端会生成 Kerberos 的配置文件
"/etc/krb5.conf"
```

```ini
[logging]
default = FILE:/var/log/krb5libs.log
kdc = FILE:/var/log/krb5kdc.log
admin_server = FILE:/var/log/kadmind.log

[libdefaults]
default_realm = UIT.DEVOPS.LOCAL
dns_lookup_realm = false
dns_lookup_kdc = false

[realms]
UIT.DEVOPS.LOCAL = {
    kdc = 172.16.70.104
    admin_server = uit.devops.local
}

[ad_realm]
uit.devops.local = UIT.DEVOPS.LOCAL
.uit.devops.local = UIT.DEVOPS.LOCAL

[kdc]
profile = /var/kerberos/krb5kdc/kdc.conf

[appdefaults]
pam = {
    debug = false
    ticket_lifetime = 36000
    renew_lifetime = 36000
    forwardable = true
    krb4_convert = false
}
```

- **[logging]：** 表示 **Server** 端的日志的打印位置
- **[libdefaults]：** 连接默认配置
  - `default_realm = UIT.DEVOPS.LOCAL` 大写，要和下文 **realms** 的一致　
-  **[realms]：**列举使用的realm
  - `kdc` 机器的 **hostname** 或 **IP** 地址
  - `admin_server` 机器的 **hostname** 或 **IP** 地址
  - `default_domain` 默认的域名
- **[appdefaults]：** 设定一些针对特定应用的配置，覆盖默认配置



```shell
$ yum install realmd oddjob oddjob-mkhomedir sssd adcli -y
```



## 3. ldap3

**pip** 安装 [ldap3](https://ldap3.readthedocs.io/en/latest/welcome.html) 库

```shell
$ pip Install ldap3
```

简单建立同步连接

```python
from ldap3 import Server, Connection, ALL

server = Server("uit.devops.local", get_info=ALL)	# Windows 搭建的AD Server 域名
conn = Connection(server, auto_bind=True)

print(repr(server))
print(repr(server.info))
print(repr(conn))

ret = conn.extend.standard.who_am_i()
print("who_am_i", ret)

....
# who_am_i None
```

**LDAP** 允许无需认证的匿名登入，因为 **DAP** 协议最早是读取电话簿的，任何人都可以阅读（*但内容上会部分受限*），但若建立身份认证的会话，就需要 **DN** 和 **密码** 

```python
from ldap3 import Server, Connection, ALL

server = Server("uit.devops.local", get_info=ALL)
# conn = Connection(server, user="zhengze", password="user@dev", auto_bind=True) # 或使用 DN
conn = Connection(server, user='cn=zhengze,cn=Users,dc=uit,dc=devops,dc=local', password='user@dev', auto_bind=True)

ret = conn.extend.standard.who_am_i()
print(ret)

# u:UIT\zhengze
```

### 2.1 查询

可使用 **上下文管理器** 自动绑定，查询操作如下

```python
with Connection(server, user='cn=zhengze,cn=Users,dc=uit,dc=devops,dc=local', password='user@dev') as conn:
    print(conn.extend.standard.who_am_i())
    conn.search('dc=uit,dc=devops,dc=local', '(objectclass=user)',
                attributes=['name', 'cn', 'mail', "description", "UserAccountControl"])
    print(conn.entries[3].name)
    print(conn.entries[3].entry_to_json())
```

使用 **search()** 查询，支持生成器方式如下

```python
def search_generator():
    with Connection(server, user='cn=zhengze,cn=Users,dc=uit,dc=devops,dc=local', password='user@dev') as conn:
        entry_generator = conn.extend.standard.paged_search(
            search_base="dc=uit,dc=devops,dc=local",
            search_filter='(objectClass=user)',
            search_scope=SUBTREE,
            attributes=['cn', 'name', 'mail', "description", "UserAccountControl"],
            paged_size=1000,
            generator=True
        )
        for entry in entry_generator:
            if not entry.get("attributes", None):
                continue
            yield entry['attributes']


users = []
entry = search_generator()
for item in range(0, 20):
    try:
        users.append(next(entry))
    except StopIteration:
        break
```

### 2.2 增加

```

```

