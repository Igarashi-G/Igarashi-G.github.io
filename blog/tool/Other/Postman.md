---
title: Postman
order: 3
---

# Postman

**Postman** 是一款功能强大的网页调试与发送网页 `HTTP` 请求的 `Chrome` 插件。可以用于测试发送各种 `HTTP` 请求。

### 1. 基本操作

**Authorization - 授权**

身份认证，显示 `browser cookies`，需要开启 `Interceptor`

- `Basic Auth`：填写用户名和密码，点击 `update request` 后，`headers` 中自动添加 **Authorization**

**Headers - 请求头**

通常是 `json` 的数据格式，不同格式根据不同类型切换，比如： `excel` 就肯定是另一种格式

| key            | value              |
| -------------- | ------------------ |
| `Content-Type` | `application/json` |

**Body - 请求体**

- `form-data`

  表单数据 `key - value`形式

- `x-www-form-urlencoded`

  选择 `x-www-form-urlencoded` 的参数方式后，`postman` 自动设置了`Content-Type`，窗体数据被编码为`key - value`

- `raw`

  通常选项，里面写入原生的 `josn` 数据，配合 `JSON(application/json)` 进行验证是否参数正确

- `binary`

  二进制形式，文件流，字节流等

### 2. 测试

**可写脚本**

- 判断返回的状态码：

  ```js
  tests['Status code is 200'] = responseCode.code === 200;
  ```

- 校验包含字符串

  ```js
  tests['Body matches string'] = responseBody.has('test', 'POST');
  ```

- 解析 JSON 并检查

  ```js
  var jsonData = JSON.parse(responseBody);
  tests['request test'] = jsonData.test === 'POST';
  ```

**Collection**：
把测试用例保存，`Runner` 批量执行

> 在线可尝试商业版软件 [yapi](https://yapi.ymfe.org/)
