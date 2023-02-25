---
title: Samba服务
date: 2021-11-04
category:
  - 运维
  - SMB/CIFS
tag:
  - SMB/CIFS
star: true
---

[Samba 文档](https://www.samba.org/) 

<!-- more -->

# SAMBA Server

## 1. 概述



## 2.安装&配置

### 安装

- CentOS 下安装客户端

  ```
  
  ```

### 配置

<Alert type="info">通常在 `/etc/samba/smb.conf` 文件中指定**日志**文件名称和**共享**存放路径</Alert>

##### 常规全局配置：

> `#`号开头：默认的文字注释信息
>
> `；`号开头：默认的注释配置项

```
[global]
	workgroup = SAMBA
	security = user

#注释网卡配置项
;	interfaces = lo eth0 192.168.1.12/24 172.168.13.2/24
	passdb backend = tdbsam

	printing = cups
	printcap name = cups
	load printers = yes
	cups options = raw

	include = /etc/samba/smb_share.conf
```

**[global]**: 关键字，全局配置

- `workgroup = SAMBA` # Windows NT 域名（域环境为域名） 或 工作组名

- `security = user` # 设置用户访问 **Samba Server** 的验证方式，一共有四种安全级别模式：

  1. `auto：` 默认安全设置，**Samba Server** 查询角色参数，来自动判断安全模式

  2. `user：` 若未执指定服务器角色，则是 **Samba** 中的默认安全设置，访问 **Samba Server** ，需要提交合法的用户名和密码，由服务端负责检查账号和密码的正确性，共享目录只能被授权的用户访问，默认为此模式。

  3. `domain：` 仅当已使用 `net conf` 将此计算机添加到 **Windows NT** 域中时，此模式才能正常工作。**Samba** 会将用户名/密码传递到 Windows NT 主域控制器来验证用户名/密码

  4. `ads：` 在此模式下，**Samba** 将充当 **ADS 域**中的域成员。**Samba Server** 需要安装和配置 **Kerberos**，并且需要使用网络实用程序将 **Samba 加入 ADS 域**

- `realm = SAMBA` # 域选项，指定主机所属的 **AD 域**

  > 仅在设置了 `security = ads` 选项时使用

  ***

- `passdb backend = tdbsam` # 用于存储用户信息的后台，有三种：

  - `smbpasswd：` 使用 `smb` 自己的工具 **smbpasswd** 来给系统用户设置一个 `smb`密码，客户端使用这个密码来访问，默认在 `/etc/samba` 目录下
  - `tdbsam:` 使用数据库文件 `passdb.tdb` 来建立用户数据库，同上可通过工具 **smbpasswd** 创建用户，但前提是创建的用户必须是系统用户
  - `ldapsam：` 该方式则是基于 [LDAP]() 来验证用户
  - 首先要建立 LDAP 服务
  - 然后设置`passdb backend = ldapsam:ldap://LDAP Server`

  ***

- `printing = cups` # 设置共享打印机的类型，支持的打印系统有：`bsd`, `sysv`, `plp`, `lprng`, `aix`, `hpux`, `qnx`

- `printcap name = cups` # 设置共享打印机的配置文件

- `load printers = yes` # 是否在 **启动 `smb` 时** 共享打印机

- `cups options = raw` # 允许您将选项传递给 CUPS 库。设置这个选项，例如，允许您在 Windows 客户端上使用驱动程序。，而不是单独设置它们

  ***

- `include = /etc/samba/smb_share.conf` # 允许全局文件键入子文件，将全局配置和共享配置解耦，若指定文件不存在，则不会加载

  > 当配置 `include = registry` 时，不是键入当前目录下的 `registry` 文件，是从注册表中读取全局配置选项，此时可以通过 `net conf` 进行对 `samba` 的配置，如：

  ```bash
  net conf addshare igarashi /export/nas/igarashi
  net conf list
  ```

---

```ini
[homes]
	comment = Home Directories
	valid users = %S, %D%w%S
	browseable = No
	read only = No
	inherit acls = Yes
```

**[home]**: 默认共享，特殊共享目录，表示用户主目录

---

```ini
[printers]
	comment = All Printers
	path = /var/tmp
	printable = Yes
	create mask = 0600
	browseable = No
```

**[printers]**: 默认共享，表示共享打印机

---

##### 常规共享配置：

以一个常规 `ufs目录` 导出配置为例

```ini
[ufs]
	comment = UFS
	path = /export/nas
	browseable = yes
	public = yes
	hosts allow = 172.16.120.121/255.255.255.0
	hosts deny = 172.16.120.122
	admin users = root, @root
	valid users = root, @root
	invalid users = fred admin @wheel
	read only = no
	writable = yes
	read list = root
	write list = root
	inherit acls = yes
	create mask = 0664
	directory mask = 0775
```

**[ufs]**: 共享资源名

- `comment = UFS` # 共享的注释说明

- `path = /export/nas` # 共享路径

- `browseable = yes` # 是否允许用户查看共享内容，默认`yes`，若为`no`，必须写绝对路径才能查看

- `public = yes` # 是否允许匿名访问

- `hosts allow = 172.16.120.121/255.255.255.0` # 设置允许哪台主机访问

- `hosts deny = 172.16.120.122` # 设置拒绝哪台主机访问

  ***

- `admin users = root, @root` # 指定用户作为超级用户，无论文件权限如何，都拥有绝对权限

- `invalid users = fred admin @wheel` # 禁止登录到此服务的用户列表，确保不正确的设置不会破坏安全

- `valid users = root, @root` # 仅指定的 **用户 / 组** 可以访问该共享资源

  - 多个用户：若有多个用户名，中间用逗号隔开
  - 组名：需要用@

- `read only = no` # 设置目录只读，`yes` 为 **只读** ，`no` 为 **读写**

- `read list = root` # 控制只读范围，允许该字段填写的 **用户 / 组** 只读

- `writable = yes` # 设置目录可写，`yes` 为 **读写**，`no` 为 **只读**

- `write list = root` # 控制写入范围，允许该字段填写的 **用户 / 组** 可写

  > 若用户同时存在于 `read list` 和 `write list` 中，权限大于只读，赋予可写权限

- `inherit acls = yes` # 父目录上存在默认 acl，则在这些父目录中创建新文件或子目录时始终遵循这些 acl

- `create mask|mode = 0664` # 定义用户可在共享中有 **创建文件** 的权限

- `directory mask|mode = 0775` # 定义用户可在共享中有 **创建文件夹** 的权限，**用户 / 组 有 读、写、执行** 的权限

-

## 3. 命令

##### 基本的挂载、卸载

- 基本挂载

  ```shell
  # 通过IP挂载
  $ mount -t cifs //172.16.120./test /mnt/uit-share02/
  $ Password for root@//10.10.10.223/test

  ```

- 强制卸载

  ```shell
  $ umount -f -a -t cifs -l /挂载点
  ```

##### 清除 Window 下 samba 的缓存

- 查看缓存列表

  ```powershell
  $ net use
  ```

- 删除所有缓存

  ```powershell
  $ net use * /del
  ```

  > 再去 任务管理器 - 重启文件资源管理器，确保刷新

##### pdbedit 操作用户

- 列出当前用户：

  ```shell
  # 全部用户
  $ pdbedit -L

  # 指定用户
  $ pdbedit -L --user=zz
  ```

- 添加用户：

  ```shell
  # 无需回车确认输入
  $ echo -e "12345\n12345\n" | pdbedit -t -a zz
  ```

- 更新用户：

  ```shell
  # 也许这只是针对于修改密码
  $ echo -e "233333\n233333\n" | pdbedit -t -r -u zz
  ```

- 删除用户：

  ```shell
  $ pdbedit -x zz
  ```



### 4. 公网连接

#### Linux Samba 服务端

配置好共享后，需要去 `/etc/samba/smb.conf` 中修改 

```ini
[global]
		...
		smb ports = 6727
```

然后重启 **samba** 服务，或是直接路由器上设置 **NAT** 端口转发 **445** 转 **6727**

#### Windows 客户端

需要先关闭 **Windows 防火墙**，检查 **control** -> 程序 -> 启用或关闭 **Windows** 功能 -> 是否开启了 **CIFS** 文件共享支持（*可以关闭SMB直通，无影响*）

##### **1. 组策略关闭禁止访问无密码的 Samba 共享**

直接 <kbd>Windows</kbd> + <kbd>r</kbd> 输入 `gpedit.msc` 服务

在 **计算机配置** - **管理模板** - **网络-Lanman工作站** 中，找到并双击 **启用不安全的来宾登录**

选择 **已启用** 确定即可

##### **2.关闭 Windows 的 445 端口**

命令行如下

```powershell
sc config LanmanServer start= disabled
net stop LanmanServer
```

或是直接 <kbd>Windows</kbd> + <kbd>r</kbd> 输入 `services.msc` 服务中找到 **Server** 停止并禁用

##### **3. 启动 windows 的 ip helper 服务**

> 该服务用来端口转发

```powershell
sc config iphlpsvc start= auto

success
```

##### **4. 设置 windows 端口转发** 

> 假如 **公网IP** 是 **116.31.232.32** ，端口为上文的 **6727** 

运行如下命令设置转发

```powershell
# 若有域名，直接将地址改为域名即可
netsh interface portproxy add v4tov4 listenport=445 connectaddress=116.31.232.32 connectport=6727

# 查看
netsh interface portproxy show all

# 删除端口转发
netsh interface portproxy delete v4tov4 listenport=445 connectaddress=116.31.232.32 connectport=6727
```

##### **5.输入\\\\127.0.0.1 即可访问**

**Windows：**

直接 `\\127.0.0.1\共享名`  输入账户名，密码即可访问

**Linux:**

```shell
smbclient //116.31.232.32/myshare -p 6727 -U samba

# 若不知道目录，则要检索
smbclient -L //116.31.232.32 -p 6727 -U samba`

# 挂载卸载
mount -t cifs //116.31.232.32/myshare /samba/samba1/ -o username=xxx,password=xxx,port=6727
umount /samba/samba1/
```

**Mac:**

```shell
smb://用户名:密码@116.31.232.32:6727
```

手机可以用ES[文件管理器](https://www.zhihu.com/search?q=文件管理器&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra={"sourceType"%3A"answer"%2C"sourceId"%3A684689433})查看SMB，汉堡菜单-网络-局域网-新建-服务器填 [IP:端口]

