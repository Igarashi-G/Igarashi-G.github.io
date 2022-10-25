---
title: Kubernets基础-工作负载
date: 2022-10-03
category:
  - 运维
  - k8s
tag:
  - k8s
star: true
---

**k8s** 的工作负载、服务

<!-- more -->

# Workload （*工作负载*）

::: warning  只使用 Pod, 将会面临如下需求难以解决

1. 业务应用如何启动多个副本
2. **Pod** 重建后 **IP** 会变化，如何保证依然能通信
3. 外部如何访问 **Pod** 服务
4. 运行业务 **Pod** 的某个节点挂了，如何故障自动转移
5. 若需求是收集各节点监控数据，如何将 **Pod** 运行在 **k8s** 集群的各个节点上

:::

## 1. 控制器 *Controller*

控制器又称 **工作负载**，是 **管理 Pod 的中间层**，确保 **Pod** 资源符合预期的状态

- 资源出现故障时，会尝试 进行重启
- 当根据重启策略无效，则会重新创建 **Pod** 资源

简要预览如下控制器

- **ReplicaSet：** 代用户创建指定数量的 **Pod 副本** 数量，确保副本数量符合预期状态，并且 **支持滚动式自动扩容和缩容功能**

- **Deployment：** 工作在 **ReplicaSet** 之上，用于 **管理无状态应用**，目前来说 **最好** 的控制器，**支持滚动更新和回滚** 功能，还提供声明式配置

- **DaemonSet：**用于确保集群中，每一个节点只运行特定的 **Pod** 副本（*通常也就一个*），通常用于**实现系统级后台任务**，比如**ELK** 日志服务、监控服务

- **Job：** 只要完成就立即退出，不需要重启或重建

- **Cronjob：** **周期性任务** 控制，不需要持续后台运行

- **StatefulSet：** 管理 **有状态应用**

### 1.1 Deployments

**Deployments** 是管理 **Pod** 的控制器，工作在 **ReplicaSet** 之上，用于 **管理无状态应用**，之前 **Pod** 的配置，会指定在 `template:` 之下

##### **中间件容器：** 

```yaml
apiVersion: apps/v1
kind: Deployment            # 此时为控制器 Deployment
metadata:
  name: mysql
  namespace: uit
  labels:
    component: zz
spec:
  replicas: 1               # 指定 Pod 副本数
  selector:                 # 指定 Pod 选择器
    matchLabels:            # 必定与下文 labels 对应
      app: mysql
  template:
    metadata:
      labels:               # 给 Pod 打 label，与上文 matchLabels: 对应
        app: mysql
    spec:
      hostNetwork: true     # 声明 pod 的网络模式为host模式，效果同 docker run --net=host
      volumes:
      - name: mysql-data
        hostPath:
          path: /opt/mysql/data
      nodeSelector:         # 使用节点选择器将 Pod 调度到指定 label 的节点
        component: zz
      containers:
      - name: mysql
        image: 192.168.3.171:5000/mysql:5.7
        imagePullPolicy: IfNotPresent
        ports:
        - containerPort: 3306
        env:
        - name: MYSQL_PASSWD
          valueFrom:
            secretKeyRef:
              name: ublog
              key: MYSQL_PASSWD
        - name: MYSQL_DATABASE
          value: "myblog"
        resources:
          requests:
            memory: 100Mi
            cpu: 50m
          limits:
            memory: 500Mi
            cpu: 100m
        readinessProbe:
          tcpSocket:
            port: 3306
          initialDelaySeconds: 5
          periodSeconds: 10
        livenessProbe:
          tcpSocket:
            port: 3306
          initialDelaySeconds: 5
          periodSeconds: 20
        volumeMounts:
        - name: mysql-data
          mountPath: /var/lib/mysql
```

控制器通过 **label** 可以找到对应的 **Pod** ，此时可通过 **label** 进行过滤

```shell
$ kubectl -n uit get po -l component=zz
```

##### **业务容器：（*改造同上*）**  

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: ublog
  namespace: uit
spec:
  replicas: 1 
  selector:  
    matchLabels:
      app: myblog
  template:
    metadata:
      labels:  
        app: myblog
    spec:
      containers:
      - name: myblog
        image: 192.168.3.171:5000/myblog:v1
        imagePullPolicy: IfNotPresent
        ports:
        - containerPort: 8002
        env:
        - name: MYSQL_HOST
          valueFrom:						# 同上 映射配置 configmap.txt 指定的环境变量
            configMapKeyRef:
              name: ublog
              key: MYSQL_HOST
        - name: MYSQL_PASSWD
          valueFrom:
            secretKeyRef:
              name: ublog
              key: MYSQL_PASSWD
        resources:
          requests:
            memory: 100Mi
            cpu: 50m
          limits:
            memory: 500Mi
            cpu: 100m
        livenessProbe:
          httpGet:
            path: /blog/index/
            port: 8002
            scheme: HTTP
          initialDelaySeconds: 10 # 容器启动后第一次执行探测是需要等待多少秒
          periodSeconds: 15 # 执行探测的频率
          timeoutSeconds: 2 # 探测超时时间
        readinessProbe:
          httpGet:
            path: /blog/index/
            port: 8002
            scheme: HTTP
          initialDelaySeconds: 10
          timeoutSeconds: 2
          periodSeconds: 15
```

#### **操作** 

**Deployment** 创建、查看

```shell
# 创建
$ kubectl create -f deployxx.yaml

# 查看
$ kubectl -n uit get deploy
NAME    READY   UP-TO-DATE   AVAILABLE   AGE
mysql   1/1     1            1           11m
ublog   1/1     1            1           10m

* `NAME` 		# 列出了集群中 Deployments 的名称
* `READY` 		# 显示当前 正在运行的/期望的 副本数
* `UP-TO-DATE`	# 显示已更新 以实现期望状态的 副本数
* `AVAILABLE`	# 显示应用程序 可供用户使用的 副本数
* `AGE` 		# 显示应用程序运行的 时间量

# 查看 replicasets 或是 rs 简写
$ kubectl -n uit get replicasets
NAME               DESIRED   CURRENT   READY   AGE
mysql-6fbb5cc967   1         1         1       10m
ublog-5ff678657f   1         1         1       10m

# 查看 pod
kubectl -n uit get po
NAME                     READY   STATUS    RESTARTS   AGE
mysql-6fbb5cc967-48dfd   1/1     Running   0          12m
ublog-5ff678657f-m42hz   1/1     Running   0          11m

"此时会发现 Pod 的名字是 deployment -> replicasets -> pod 一步步根据 被管理者名称 拼接的"
```

**Deployment** 更新，有如下三种方式

```shell
#修改yaml文件，使用 apply 应用更新
$ kubectl -n uit apply -f ublog.yaml

# 通过命令更新，太长太难记
$ kubectl set image deploy ublog ublog=192.168.3.171:5000/myblog:v2 --record

# 推荐：直接在线编辑
$ kubectl -n uit edit deploy ublog
```

### 1.2 Replicaset（*副本保障机制*）

[官方文档](https://kubernetes.io/zh-cn/docs/concepts/workloads/controllers/replicaset/)

```yaml
# 修改 yaml 文件的副本数
...
  replicas: 2		# 修改为2，然后执行 apply 即可更新
...
```

将上文的 **deployment** 的副本数量修改为 **2**，然后执行 `apply` 即可更新

```shell
$ kubectl apply -f mysql.yaml

# 查看 Pod，此时发现新的副本正在创建中...但由于调度指定，且端口被占了，中间件是不会创建成功的
kubectl -n uit get po
NAME                     READY   STATUS    RESTARTS   AGE
mysql-6fbb5cc967-48dfd   1/1     Running   0          23m
mysql-6fbb5cc967-rdlrb   0/1     Pending   0          58s
ublog-5ff678657f-m42hz   1/1     Running   0          22m
```

当然，还可以 **通过命令** 修改副本数量

```shell
# 通过命令设置 3个副本
$ kubectl -n uit scale deploy mysql --replicas=3
deployment.apps/mysql scaled

# 观察 Pod, 此时发现又有一个新的副本正在创建中...
$ kubectl -n uit get po
NAME                     READY   STATUS    RESTARTS   AGE
mysql-6fbb5cc967-48dfd   1/1     Running   0          25m
mysql-6fbb5cc967-957gj   0/1     Pending   0          8s
mysql-6fbb5cc967-rdlrb   0/1     Pending   0          3m27s
ublog-5ff678657f-m42hz   1/1     Running   0          25m
```

::: info 其他方式 

当然，还可通过 `kubectl -n uit edit deploy mysql` 的方式，但最好还是上文改 **yaml** 文件然后 `apply` 的方式，有迹可循

:::

##### **Replicasets 高可用** 

**Replicasets controller** 实时检测 **Pod** 状态，并保障副本数一直处于期望的值，此时是无法通过普通的指定来删除 **Pod** 的，由于要保证预期副本数，执行删除，也会被 **Replicasets** 自动拉起

```shell
# 删除 Pod，观察 Pod 状态变化
$ kubectl -n uit delete pod ublog-5ff678657f-m42hz

# 发现 旧副本执行删除，并有新副本创建
$ kubectl -n uit get pod
NAME                     READY   STATUS              RESTARTS   AGE
mysql-6fbb5cc967-48dfd   1/1     Running             0          34m
ublog-5ff678657f-8xcp7   0/1     ContainerCreating   0          1s
ublog-5ff678657f-nbs77   1/1     Terminating         0          82s

# 然后 新副本成功运行，继续删除旧副本
mysql-6fbb5cc967-48dfd   1/1     Running       0          35m
ublog-5ff678657f-8xcp7   1/1     Running       0          39s
ublog-5ff678657f-nbs77   0/1     Terminating   0          2m

# 最后 恢复如初
mysql-6fbb5cc967-48dfd   1/1     Running   0          35m
ublog-5ff678657f-8xcp7   1/1     Running   0          41s
```

#### **1.2.1 Replicaset  服务更新**

修改 **Dockerfile**，重新打 **tag** 可以模拟服务更新（*v1 -> v2*）

```shell
# 修改前端的显示文案
$ vim ./python-demo/blog/templates/index.html

# 重新 build 镜像，但是指定 tag 未生效，只有镜像ID
$ docker build . -t 192.168.3.171:5000/myblog:v2 -f Dockerfile

# 手动打 tag 并上传
$ docker tag 728e50e60021 192.168.3.171:5000/myblog:v2
$ docker push 192.168.3.171:5000/myblog:v2
```

此时副本数为 **3** 的情况下，修改镜像版本

```shell
# 查看 Pod，发现 新版本镜像正在 滚动更新
kubectl -nuit get po -owide
NAME                     READY   STATUS              RESTARTS   AGE     IP              NODE            NOMINATED NODE   READINESS GATES
mysql-6fbb5cc967-48dfd   1/1     Running             0          11h     192.168.3.172   k8s-slave-172   <none>           <none>
ublog-5f55c5568b-2ggd7   1/1     Running             0          48s     10.244.1.27     k8s-slave-172   <none>           <none>
ublog-5f55c5568b-jstms   1/1     Running             0          24s     10.244.2.24     k8s-slave-173   <none>           <none>
ublog-5f55c5568b-mgn96   0/1     ContainerCreating   0          1s      <none>          k8s-slave-172   <none>           <none>
ublog-5ff678657f-5k2d7   1/1     Terminating         0          2m35s   10.244.1.26     k8s-slave-172   <none>           <none>
ublog-5ff678657f-8xcp7   1/1     Running             0          10h     10.244.2.22     k8s-slave-173   <none>           <none>
ublog-5ff678657f-d8fkk   1/1     Terminating         0          2m35s   10.244.2.23     k8s-slave-173   <none>           <none>
```

##### **更新策略**

也可通过执行如下命令查看到

```shell
$ kubectl -nuit get deploy ublog -oyaml|grep -n7 strategy
```

```yaml
...
spec:
  progressDeadlineSeconds: 600
  replicas: 3						# 上文修改 Pod 副本数
  revisionHistoryLimit: 10			# 保留的历史版本
  selector:							# 上文指定的 Pod 选择器
    matchLabels:
      app: myblog
      
  strategy:							# 此时发现会有如下默认配置项
    rollingUpdate:
      maxSurge: 25%
      maxUnavailable: 25%
    type: RollingUpdate				# 指定更新方式为 滚动更新，默认策略
  
  template:
    metadata:
      creationTimestamp: null
      labels:
        app: myblog
...
```

<img src="./img/滚动更新.jpg">

**策略控制** 

- **maxSurge：** 最大激增（*存活*）数，指更新过程中，最多可比 **replicas** （*预设副本数*）多出的 **Pod** 数量
  - 可为 固定值 或 百分比，默认为 **desired Pods** 数的 **25%**，
  - 计算时 **向上取整** （*比如 3.2，取 4*），更新过程中最多会有 **replicas + maxSurge** 个 **Pod**

- **maxUnavailable：** 最大不可用数，指更新过程中，最多有几个 **Pod** 处于无法服务状态 ,
  - 可以为 固定值 或 百分比，默认为 **desired Pods** 数的 **25%**
  - 计算时 **向下取整** （*比如 2.8，取 2*）


::: info Deployment rollingUpdate 时，需要

- 保证 **Running** 活着的（*非异常状态的*） **Pods** 数不超过 **desired pods number + maxSurge**

- 保证 **Available（*Ready状态的*） Pods** 数不低于 **desired pods number - maxUnavailable** 

:::

::: note 假设 3 副本的 ublog

**Running** 状态的 **Pod** 最多不超过 **3 + 1（*3 x 25%=0.75*） = 4** 个 

**Running** 状态的 **Pod** 最少不低于 **3 - 1（*3 x 25%=0.75*） = 3** 个 

1. 先 新增一个 **v2** 版本的 **Pod**，此时 **3** 个 **v1** 版本 **+ 1** 个**v2** 版本的，当前 **Pod=4** 不能再增加
2. 然后 删掉一个 **v1** 版本的 **Pod**，此时 **2** 个 **v1** 版本 **+ 1** 个**v2** 版本的，当前 **Pod=3** 不能再删除
3. 滚动重复 **1、2** 步骤，直到更新结束

:::

```shell
# 查看副本rs 发现有两个ublog，一个 3副本，一个 0副本
$ kubectl -n uit get rs
NAME               DESIRED   CURRENT   READY   AGE
mysql-6fbb5cc967   1         1         1       2d
ublog-5f55c5568b   3         3         3       37h
ublog-5ff678657f   0         0         0       2d

# 此时，edit 回退到 v1版本，查看滚动更新事件
$ kubectl -n uit describe deploy ublog
...
Conditions:
  Type           Status  Reason
  ----           ------  ------
  Available      True    MinimumReplicasAvailable
  Progressing    True    NewReplicaSetAvailable
OldReplicaSets:  <none>
NewReplicaSet:   ublog-5ff678657f (3/3 replicas created)
Events:
  Type    Reason             Age                From                   Message
  ----    ------             ----               ----                   -------
  Normal  ScalingReplicaSet  89s (x2 over 2d)   deployment-controller  Scaled up replica set ublog-5ff678657f to 1
  Normal  ScalingReplicaSet  66s                deployment-controller  Scaled down replica set ublog-5f55c5568b to 2
  Normal  ScalingReplicaSet  66s                deployment-controller  Scaled up replica set ublog-5ff678657f to 2
  Normal  ScalingReplicaSet  49s (x2 over 37h)  deployment-controller  Scaled up replica set ublog-5ff678657f to 3
  Normal  ScalingReplicaSet  49s                deployment-controller  Scaled down replica set ublog-5f55c5568b to 1
  Normal  ScalingReplicaSet  27s                deployment-controller  Scaled down replica set ublog-5f55c5568b to 0

$ kubectl -n uit get rs
NAME               DESIRED   CURRENT   READY   AGE
mysql-6fbb5cc967   1         1         1       2d
ublog-5f55c5568b   0         0         0       37h
ublog-5ff678657f   3         3         3       2d
```

**replicaset** 会创建不同的名称的 **rs** 副本，然后仅调节对应的副本数更新即可，默认会缓存 **10** 个历史版本数便于回滚

#### **1.2.2 Replicaset 服务回滚**

通过滚动升级策略，可平滑升级 **Deployment**，但升级出现问题，需要最快、最好的方式回退到上个正常版本，就需要回滚机制

**revision**：

- 更新应用时，**k8s** 会记录当前的 **revision** （*版本号*），当升级出现问题时，可通过 **revision** 回滚
- 默认配置下，只保留最近的几个 **revision**，可通过 **Deployment** 配置的 `spec.revisionHistoryLimit` 属性增加数量，默认为**10**
- 历史记录，记录的是 **操作过 replicaset 的** 历史

```shell
# 查看版本历史记录
$ kubectl -nuit rollout history deploy ublog
deployment.apps/ublog 
REVISION  CHANGE-CAUSE
2         <none>
3         <none>

# 配置如下，revisionHistoryLimit 为默认 10条记录
$ kubectl -n uit get deploy ublog -oyaml|grep revision
    deployment.kubernetes.io/revision: "3"
  revisionHistoryLimit: 10

"但查看时不会全部显示完整的10条，而是默认显示最近的 2条记录，所以上文从 REVISION 2 开始"
```

发现 **CHANGE-CAUSE** 为 \<none\> 是由于没有添加记录参数，**记录回滚**

```shell
# 使用命令来修改配置文件的版本 v2 -> v1 -> v2
$ kubectl -nuit set image deploy ublog myblog=192.168.3.171:5000/myblog:v1 --record
deployment.apps/ublog image updated

$ kubectl -nuit set image deploy ublog myblog=192.168.3.171:5000/myblog:v2 --record
deployment.apps/ublog image updated

# 再次查看 版本历史记录，发现已经有了命令显示
$ kubectl -nuit rollout history deploy ublog
deployment.apps/ublog 
REVISION  CHANGE-CAUSE
5         kubectl set image deploy ublog myblog=192.168.3.171:5000/myblog:v1 --namespace=uit --record=true
6         kubectl set image deploy ublog myblog=192.168.3.171:5000/myblog:v2 --namespace=uit --record=true
```

删除 **Deployment** 再重建，版本记录会清空，并从 **1** 记录

```shell
$ kubectl delete -f ublog.yaml
deployment.apps "ublog" deleted

# 将版本记录再改为 v1
$ vim ublog.yaml 

# 增加 --record 参数，重新创建
$ kubectl create -f ublog.yaml --record
deployment.apps/ublog created

# 通过命令修改版本
$ kubectl -nuit set image deploy ublog myblog=192.168.3.171:5000/myblog:v2 --record

# 查看历史记录
$ kubectl -nuit rollout history deploy ublog
deployment.apps/ublog 
REVISION  CHANGE-CAUSE
1         kubectl create --filename=ublog.yaml --record=true
2         kubectl set image deploy ublog myblog=192.168.3.171:5000/myblog:v2 --namespace=uit --record=true
```

回滚到具体的 **revision**

```shell
# 执行回滚操作
$ kubectl -nuit rollout undo deploy ublog --to-revision=1
deployment.apps/ublog rolled back

# 此时历史记录更新，重复记录了回滚记录
$ kubectl -nuit rollout history deploy ublog
deployment.apps/ublog 
REVISION  CHANGE-CAUSE
2         kubectl set image deploy ublog myblog=192.168.3.171:5000/myblog:v2 --namespace=uit --record=true
3         kubectl create --filename=ublog.yaml --record=true

# 此时访问应用，查看输出版本，此时又变回 v1
curl 10.244.1.35:8002/blog/index/
```

## 2. Service 服务

此时，已能通过 **Deployment** 创建带副本的 **Pod** 提供高可用性的服务了，但即使每个 **Pod** 都会分配单独 **IP**，却存在如下问题

- **Pod IP** 仅仅是集群内可见的虚拟 **IP**，外部无法访问
- **Pod IP** 会随着 **Pod** 销毁而消失，当 **ReplicaSet** 对 **Pod** 进行动态伸缩时，**Pod IP** 可能随时随地都会变化，对于访问服务带来了难度

### 2.1 Cluster IP 负载均衡

**Service** 是一组 **Pod** 的服务抽象，相当于一组 **Pod** 的 **LB（*Load Balance*）**，负责将请求分发给对应的**Pod**

**Service** 会为这个 **LB** 提供一个 **Cluster IP** ，使用 **Service** 对象，通过 **selector 进行标签选择**，即可找到对应的 **Pod** 

```shell
# 每次都输入一串 kubectl xxx太累，可以起别名
$ alias kd='kubectl -n uit'

# 此时查看 pod 标签，在 deploy 配置中曾指定了 app=myblog
$ kd get po --show-labels
NAME                     READY   STATUS    RESTARTS   AGE     LABELS
mysql-6fbb5cc967-48dfd   1/1     Running   0          2d12h   app=mysql,pod-template-hash=6fbb5cc967
ublog-5ff678657f-7qx5z   1/1     Running   0          42m     app=myblog,pod-template-hash=5ff678657f
ublog-5ff678657f-rk92z   1/1     Running   0          43m     app=myblog,pod-template-hash=5ff678657f
ublog-5ff678657f-tzspj   1/1     Running   0          42m     app=myblog,pod-template-hash=5ff678657f
```

**Service** 的 **yaml** 文件如下

```yaml
apiVersion: v1
kind: Service
metadata:
  name: ublog-svc
  namespace: uit
spec:
  ports:
  - port: 80
    protocol: TCP
    targetPort: 8002
  selector:
    app: myblog
  type: ClusterIP
```

创建 **Service** 并查看

```shell
# 创建 svc
$ kubectl create -f svc-ublog.yaml 
service/svc-ublog created

# 查看 svc，此时已经创建了 CLUSTER-IP 10.105.146.135 80 端口的服务
$ kubectl -nuit get svc
NAME        TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)   AGE
svc-ublog   ClusterIP   10.105.146.135   <none>        80/TCP    7m51s


# 查看详情，此时发现 endpoints 已经代理了对应的 app = myblog
$ kubectl -nuit describe svc
Name:              svc-ublog
Namespace:         uit
Labels:            <none>
Annotations:       <none>
Selector:          app=myblog
Type:              ClusterIP
IP:                10.105.146.135
Port:              <unset>  80/TCP
TargetPort:        8002/TCP
Endpoints:         10.244.1.35:8002,10.244.2.32:8002,10.244.2.33:8002
Session Affinity:  None
Events:            <none>

# 此时访问 80 端口，服务正常
curl 10.105.146.135/blog/index/

# 缩容 ublog 服务
$ kubectl -n uit scale deploy ublog --replicas=2
deployment.apps/ublog scaled

# 查看svc详情，此时发现 endpoints 自动减一
$ kubectl -n uit describe svc
Name:              svc-ublog
Namespace:         uit
Labels:            <none>
Annotations:       <none>
Selector:          app=myblog
Type:              ClusterIP
IP:                10.105.146.135
Port:              <unset>  80/TCP
TargetPort:        8002/TCP
Endpoints:         10.244.1.35:8002,10.244.2.32:8002
Session Affinity:  None
Events:            <none>
```

::: tip 

创建 **Service**时，会创建同名的 **endpoints** 对象，若 **Pod** 上配置了 `readinessProbe`，检测失败时，**endpoints** 列表会剔除掉对应的 **Pod IP**，这样流量就不会分发到健康检测失败的 **Pod** 上

```shell
$ kubectl -n uit get endpoints svc-ublog
NAME        ENDPOINTS                           AGE
svc-ublog   10.244.1.35:8002,10.244.2.32:8002   21m
```

:::

再次改造 **MySQL**，创建 **Service**

```yaml
apiVersion: v1
kind: Service
metadata:
  name: svc-mysql
  namespace: uit
spec:
  ports:
  - port: 3306
    protocol: TCP
    targetPort: 3306
  selector:
    app: mysql
  type: ClusterIP
```

创建并访问

```shell
$ kubectl create -f svc-mysql.yaml 
service/mysql created

$ kubectl -n uit get svc-mysql
NAME        TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)    AGE
svc-mysql   ClusterIP   10.98.22.166   <none>        3306/TCP   21s

$ curl 10.98.22.166:3306
```

::: warning hostNetwork 部署，通过宿主机 ip:port 形式访问，有如下弊端

- 服务使用 **hostNetwork**，使得宿主机的端口大量暴漏，**存在安全隐患** 
- 容易引发端口冲突

因此，应该为 **MySQL** 创建固定 **Cluster IP** 的 **Service**，并配到 **ublog** 的环境变量中，利用集群服务发现的能力，组件间通过 **service name** 访问

::: 

### 2.2 服务发现（*环境变量去 IP 化* ）

**k8s** 集群中，组件间可以通过 **service name** 实现通信，**Pods** 间，无需通过 **固定环境变量 IP** 的形式

```shell
# 查看上文创建的 svc
$ kubectl -n uit get svc svc-mysql
NAME        TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)    AGE
svc-mysql   ClusterIP   10.98.22.166   <none>        3306/TCP   151m

# 访问任意一个业务 pod ublog
$ kubectl -n uit exec -ti ublog-5ff678657f-rk92z /bin/bash

# curl cluster ip，可正常连通 MySQL
curl 10.98.22.166:3306

# curl svc-mysql，发现依然可正常连通 MySQL，
curl svc-mysql:3306
```

尽管 **Pod IP** 和 **Cluster IP** 都不固定，但 **service name** 是固定的，且完全具有跨集群的可移植性，实现原理如下

```shell
# 查看当前的 DNS 配置，发现有个 10.96.0.10 的 IP
cat /etc/resolv.conf 
nameserver 10.96.0.10
search uit.svc.cluster.local svc.cluster.local cluster.local
options ndots:5

# 退出容器，并查看所有命名空间，发现 kube-system 下有个 kube-dns，它的 IP 刚好同上
$ kubectl get svc --all-namespaces
NAMESPACE              NAME                        TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)                  AGE
default                kubernetes                  ClusterIP   10.96.0.1        <none>        443/TCP                  23d
kube-system            kube-dns                    ClusterIP   10.96.0.10       <none>        53/UDP,53/TCP,9153/TCP   23d
kubernetes-dashboard   dashboard-metrics-scraper   ClusterIP   10.96.54.184     <none>        8000/TCP                 22d
kubernetes-dashboard   kubernetes-dashboard        NodePort    10.97.63.15      <none>        443:30100/TCP            22d
uit                    svc-mysql                   ClusterIP   10.98.22.166     <none>        3306/TCP                 157m
uit                    svc-ublog                   ClusterIP   10.105.146.135   <none>        80/TCP                   3h5m

# 查看 kube-dns 这个 service，查找选择器 Selector 是 k8s-app=kube-dns 这个标签
$ kubectl -n kube-system describe svc kube-dns
Name:              kube-dns
Namespace:         kube-system
Labels:            k8s-app=kube-dns
                   kubernetes.io/cluster-service=true
                   kubernetes.io/name=KubeDNS
Annotations:       prometheus.io/port: 9153
                   prometheus.io/scrape: true
Selector:          k8s-app=kube-dns
Type:              ClusterIP
IP:                10.96.0.10
Port:              dns  53/UDP
TargetPort:        53/UDP
Endpoints:         10.244.0.5:53,10.244.0.6:53
Port:              dns-tcp  53/TCP
TargetPort:        53/TCP
Endpoints:         10.244.0.5:53,10.244.0.6:53
Port:              metrics  9153/TCP
TargetPort:        9153/TCP
Endpoints:         10.244.0.5:9153,10.244.0.6:9153
Session Affinity:  None
Events:            <none>

# 根据 选择器 找Pod，发现是初始化时 coredns 用的
$ kubectl -n kube-system get po -l k8s-app=kube-dns -o wide
NAME                       READY   STATUS    RESTARTS   AGE   IP           NODE             NOMINATED NODE   READINESS GATES
coredns-58cc8c89f4-hzprn   1/1     Running   1          23d   10.244.0.5   k8s-master-171   <none>           <none>
coredns-58cc8c89f4-vvj77   1/1     Running   2          23d   10.244.0.6   k8s-master-171   <none>           <none>

"初始化时创建了 coredns 然后建立 kube-dns 这个service（固定的IP），然后新建 Pod 就可注入到 DNS 配置中，最终解析的就是 coredns 的IP，"
```

故容器内部组件间调用，完全可以通过 **service name**（类似域名）来解析 **IP** 通信，避免了大量 **IP** 维护的成本，因此再次对部署进行优化改造

1. **MySQL** 去掉 **hostNetwork** 部署，使得服务只暴露在 **k8s** 集群内部网络环境中

   ```yaml
   ...
   hostNetwork: false			# 去掉此行 或 改为false
   ...
   ```

2. **configMap** 中的数据库固定 **IP** 地址换成 **service name**，这样跨环境的时候，配置内容基本上可以保持不用变化

   ```yaml
   apiVersion: v1
   kind: ConfigMap
   metadata:
     name: ublog
     namespace: uit
   data:
     MYSQL_HOST: "svc-mysql"     # 此处替换为mysql
     MYSQL_PORT: "3306"
   ```

   重新执行

   ```shell
   $ kubectl apply -f configmap.yaml
   $ kubectl apply -f deploy-mysql.yaml
   
   # 也可以删除 configmap 再通过 .txt 重建
   $ kubectl -n uit delete cm ublog
   $ kubectl -n uit create configmap ublog --from-env-file=configmap.txt
   ```

### 2.3 NodePort（*外部访问* ）

**Cluster IP** 为虚拟地址，只能在 **k8s** 集群内部进行访问，集群外部如果访问内部服务，可以配置 **NodePort**

- 若不指定 **NodePort** 端口，则会默认在 **30000-32767（*端口号* ）** 中随机使用其中一个

```yaml
apiVersion: v1
kind: Service
metadata:
  name: svc-np-ublog
  namespace: uit
spec:
  ports:
  - port: 80
    protocol: TCP
    targetPort: 8002
    nodePort: 32333				# 这里还是手动指定了端口 32333 看效果
  selector:
    app: myblog
  type: NodePort				# 只需将之前的 Cluster IP 改为 NodePort 即可
```

创建并查看服务

```shell
# 创建 svc
$ kubectl create -f svc-np-ublog.yaml
service/svc-np-ublog created

# 查看当前服务
$ kubectl -n uit get svc
NAME           TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)        AGE
svc-mysql      ClusterIP   10.98.22.166     <none>        3306/TCP       2d11h
svc-np-ublog   NodePort    10.107.82.31     <none>        80:32543/TCP   4m57s
svc-ublog      ClusterIP   10.105.146.135   <none>        80/TCP         2d11h

# 查看详情
$ kubectl -n uit describe svc svc-np-ublog 
Name:                     svc-np-ublog
Namespace:                uit
Labels:                   <none>
Annotations:              <none>
Selector:                 app=myblog
Type:                     NodePort
IP:                       10.107.82.31
Port:                     <unset>  80/TCP
TargetPort:               8002/TCP
NodePort:                 <unset>  32543/TCP
Endpoints:                10.244.1.35:8002,10.244.2.32:8002
Session Affinity:         None
External Traffic Policy:  Cluster
Events:                   <none>
```

此时发现类型变为 `Type: NodePort` ，且多了随机的端口 `NodePort: <unset> 32543/TCP`，但 **CLUSTER-IP** 和 **Endpoints** 依然没变

```shell
# 故可删除之前的 svc
kubectl delete -f svc-ublog.yaml 
service "svc-ublog" deleted

# 同时发现，集群内每个节点的 NodePort 端口都会进行监听
$ curl 192.168.3.171:32333/blog/index/
$ curl 192.168.3.172:32333/blog/index/
$ curl 192.168.3.173:32333/blog/index/
```

**k8s** 集群的 **业务 Pod** 变为类似 **高可用** 一样，都能在浏览器上，通过每个节点的 **IP**，对服务进行外部访问（*即使该节点未跑对应的业务 Pod* ）

- http://192.168.3.171:32333/blog/index/  
- http://192.168.3.172:32333/blog/index/  
- http://192.168.3.173:32333/blog/index/  

::: note 此时会有如下疑惑？

1. **NodePort** 的端口监听，是如何转发到对应的 **Pod** 服务的？
2. **CLUSTER-IP** 是  **虚拟 IP**，集群内是如何通过这个 **虚拟 IP** 访问到具体的 **Pod** 服务的？

:::

### 2.4 Service 实现原理

```shell
# 查看 32333 端口的监听，看到如下 kube-proxy 在监听
$ netstat -ntpl |grep 32333
tcp6       0      0 :::32333                :::*                    LISTEN      28426/kube-proxy  
```

#### kube-proxy

[官方文档](https://kubernetes.io/docs/concepts/services-networking/service/#virtual-ips-and-service-proxies)

**运行在每个节点上**，监听 **API Server** 中服务对象的变化，再通过创建流量路由规则来实现网络的转发，有如下模式

- ~~**User space**, 让 Kube-Proxy 在用户空间监听一个端口，所有的 Service 都转发到这个端口，然后 Kube-Proxy 在内部应用层对其进行转发 ， 所有报文都走一遍用户态，性能不高，k8s v1.2版本后废弃~~。
- **Iptables**， 当前默认模式，**完全由 IPtables 来实现**， 通过各个节点上的 **iptables** 规则来实现 **service** 的负载均衡，但是随着 **service** 数量的增大，**iptables** 模式由于线性查找匹配、全量更新等特点，其性能会显著下降
- **IPVS**， 与 **iptables** 同样基于 **Netfilter（*iptable内核态的一种实现*）**，采用 **hash** 表，因此当 **service** 数量达到一定规模时，**hash** 查表速度快，从而提高 **service** 的服务性能
  - **k8s 1.8** 版本开始引入，**1.11** 版本开始稳定，需要开启宿主机的 **ipvs** 模块


```shell {9-10,}
# 查看 svc-np-ublog 的 iptables
$ iptables-save  |grep svc-np-ublog
-A KUBE-NODEPORTS -p tcp -m comment --comment "uit/svc-np-ublog:" -m tcp --dport 32333 -j KUBE-MARK-MASQ
-A KUBE-NODEPORTS -p tcp -m comment --comment "uit/svc-np-ublog:" -m tcp --dport 32333 -j KUBE-SVC-FQQJWIJEBH5A6SF6
-A KUBE-SERVICES ! -s 10.244.0.0/16 -d 10.107.82.31/32 -p tcp -m comment --comment "uit/svc-np-ublog: cluster IP" -m tcp --dport 80 -j KUBE-MARK-MASQ
-A KUBE-SERVICES -d 10.107.82.31/32 -p tcp -m comment --comment "uit/svc-np-ublog: cluster IP" -m tcp --dport 80 -j KUBE-SVC-FQQJWIJEBH5A6SF6
`将IP 10.107.82.31 转发到 80端口，转向 KUBE-SVC-FQQJWIJEBH5A6SF6 这个链`

# 继续抓链
$ iptables-save|grep KUBE-SVC-FQQJWIJEBH5A6SF6
:KUBE-SVC-FQQJWIJEBH5A6SF6 - [0:0]
...
-A KUBE-SVC-FQQJWIJEBH5A6SF6 -m statistic --mode random --probability 0.50000000000 -j KUBE-SEP-U4JA5WF5RRIRERN5
-A KUBE-SVC-FQQJWIJEBH5A6SF6 -j KUBE-SEP-ME7MACTOWWVFKRBM
`静态 模式 随机 50%的可能性 打到 KUBE-SEP-U4JA5WF5RRIRERN5 链上`

# 进一步抓取 KUBE-SEP-U4JA5WF5RRIRERN5
$ iptables-save|grep KUBE-SEP-U4JA5WF5RRIRERN5
:KUBE-SEP-U4JA5WF5RRIRERN5 - [0:0]
-A KUBE-SEP-U4JA5WF5RRIRERN5 -s 10.244.1.35/32 -j KUBE-MARK-MASQ
-A KUBE-SEP-U4JA5WF5RRIRERN5 -p tcp -m tcp -j DNAT --to-destination 10.244.1.35:8002
-A KUBE-SVC-FQQJWIJEBH5A6SF6 -m statistic --mode random --probability 0.50000000000 -j KUBE-SEP-U4JA5WF5RRIRERN5
`此时 DNAT 到了具体的 Pod IP 10.244.1.35:8002 上`

# KUBE-SEP-ME7MACTOWWVFKRBM 也是如此
iptables-save|grep KUBE-SEP-ME7MACTOWWVFKRBM
:KUBE-SEP-ME7MACTOWWVFKRBM - [0:0]
-A KUBE-SEP-ME7MACTOWWVFKRBM -s 10.244.2.32/32 -j KUBE-MARK-MASQ
-A KUBE-SEP-ME7MACTOWWVFKRBM -p tcp -m tcp -j DNAT --to-destination 10.244.2.32:8002
-A KUBE-SVC-FQQJWIJEBH5A6SF6 -j KUBE-SEP-ME7MACTOWWVFKRBM
```

此时发现是按照 **Pod** ，进行流量分配，若要 **灰度发布**，做 **流量分配 / 治理**，此时仍无法实现，需要 **istio**

```shell
#重建pod
$ kubectl -n demo delete po mysql-7f747644b8-6npzn

#去掉taint
$ kubectl taint node k8s-slave1 smoke-
$ kubectl taint node k8s-slave2 drunk-

## myblog不用动，会自动因健康检测不过而重启
```

服务发现实现：

`CoreDNS`是一个`Go`语言实现的链式插件`DNS服务端`，是CNCF成员，是一个高性能、易扩展的`DNS服务端`。

```powershell
$ kubectl -n kube-system get po -o wide|grep dns
coredns-d4475785-2w4hk 1/1 Running 0 4d22h 10.244.0.64
coredns-d4475785-s49hq 1/1 Running 0 4d22h 10.244.0.65

# 查看myblog的pod解析配置
$ kubectl -n demo exec -ti myblog-5c97d79cdb-j485f bash
[root@myblog-5c97d79cdb-j485f myblog]# cat /etc/resolv.conf
nameserver 10.96.0.10
search demo.svc.cluster.local svc.cluster.local cluster.local
options ndots:5

## 10.96.0.10 从哪来
$ kubectl -n kube-system get svc
NAME TYPE CLUSTER-IP EXTERNAL-IP PORT(S) AGE
kube-dns ClusterIP 10.96.0.10 <none> 53/UDP,53/TCP 51d

## 启动pod的时候，会把kube-dns服务的cluster-ip地址注入到pod的resolve解析配置中，同时添加对应的namespace的search域。 因此跨namespace通过service name访问的话，需要添加对应的namespace名称，
service_name.namespace_name
$ kubectl get svc
NAME TYPE CLUSTER-IP EXTERNAL-IP PORT(S) AGE
kubernetes ClusterIP 10.96.0.1 <none> 443/TCP 26h
```

## 3. Ingress（*流量路由* ）

[官方文档](https://kubernetes.io/zh-cn/docs/concepts/services-networking/ingress/)

对于 **k8s** 的 **Service**，无论是 **Cluster IP** 还是 **NodePort**，都是 **四层负载**，要让集群内的服务实现 **七层负载均衡**，要借助于 **Ingress**，**Ingress**控制器的实现方式有很多，比如 **Nginx**, **Contour**, **Haproxy**, **trafik**, **Istio**，下文**Nginx** 实现为例

### 3.1 Ingress-nginx

**Ingress-nginx** 是 **7层的负载均衡器** ，负责统一管理外部对 **k8s cluster** 中 **Service** 的请求，包含如下

- **ingress-nginx-controller：** 根据用户编写的 **ingress** 规则（*创建的 ingress 的 yaml 文件* ），动态的去更改**nginx** 服务的配置文件，并且 **reload** 重载使其生效（*是自动化的，通过 lua 脚本来实现* ）
- **ingress资源对象：** 将 **Nginx** 的配置抽象成一个 **Ingress** 对象，每添加一个新的 **Service** 资源对象只需写一个新的 **Ingress** 规则的 **yaml** 文件即可（*或修改已存在的 ingress 规则的 yaml 文件* ）

###### 示意图：

###### 实现逻辑

1）ingress controller通过和kubernetes api交互，动态的去感知集群中ingress规则变化
2）然后读取ingress规则(规则就是写明了哪个域名对应哪个service)，按照自定义的规则，生成一段nginx配置
3）再写到nginx-ingress-controller的pod里，这个Ingress controller的pod里运行着一个Nginx服务，控制器把生成的nginx配置写入/etc/nginx.conf文件中
4）然后reload一下使配置生效。以此达到域名分别配置和动态更新的问题。

###### 安装

[官方文档](https://github.com/kubernetes/ingress-nginx/blob/master/docs/deploy/index.md)

```powershell
$ wget https://raw.githubusercontent.com/kubernetes/ingress-nginx/nginx-0.30.0/deploy/static/mandatory.yaml
## 或者使用myblog/deployment/ingress/mandatory.yaml
## 修改部署节点
$ grep -n5 nodeSelector mandatory.yaml
212- spec:
213- hostNetwork: true #添加为host模式
214- # wait up to five minutes for the drain of connections
215- terminationGracePeriodSeconds: 300
216- serviceAccountName: nginx-ingress-serviceaccount
217: nodeSelector:
218- ingress: "true" #替换此处，来决定将ingress部署在哪些机器
219- containers:
220- - name: nginx-ingress-controller
221- image: quay.io/kubernetes-ingress-controller/nginx-ingress-controller:0.30.0
222- args:
```

使用示例：`myblog/deployment/ingress.yaml`

```yaml
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
name: myblog
namespace: demo
spec:
rules:
- host: myblog.devops.cn
http:
paths:
- path: /
backend:
serviceName: myblog
servicePort: 80
```

ingress-nginx动态生成upstream配置：

```yaml
...
server_name myblog.devops.cn ;

listen 80 ;
listen [::]:80 ;
listen 443 ssl http2 ;
listen [::]:443 ssl http2 ;

set $proxy_upstream_name "-";

ssl_certificate_by_lua_block {
certificate.call()
}

location / {

set $namespace "demo";
set $ingress_name "myblog";
...
```

###### 访问

域名解析服务，将 `myblog.devops.cn`解析到ingress的地址上。ingress是支持多副本的，高可用的情况下，生产的配置是使用lb服务（内网F5设备，公网elb、slb、clb，解析到各ingress的机器，如何域名指向lb地址）

本机，添加如下hosts记录来演示效果。

```json
192.168.136.128 myblog.devops.cn
```

然后，访问 http://myblog.devops.cn/blog/index/

HTTPS访问：

```powershell
#自签名证书
$ openssl req -x509 -nodes -days 2920 -newkey rsa:2048 -keyout tls.key -out tls.crt -subj "/CN=*.devops.cn/O=ingress-nginx"

# 证书信息保存到secret对象中，ingress-nginx会读取secret对象解析出证书加载到nginx配置中
$ kubectl -n demo create secret tls https-secret --key tls.key --cert tls.crt
secret/https-secret created
```

修改yaml

```yaml
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
name: myblog-tls
namespace: demo
spec:
rules:
- host: myblog.devops.cn
http:
paths:
- path: /
backend:
serviceName: myblog
servicePort: 80
tls:
- hosts:
- myblog.devops.cn
secretName: https-secret
```

然后，访问 https://myblog.devops.cn/blog/index/



#### 

##### 
