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

## 1. 需求



## 2. ldap3

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

