<template><div><p>目前比较主流，基于 <strong>Golang</strong> 开发的 <strong>gRPC</strong></p>
<!-- more -->
<h1 id="grpc" tabindex="-1"><a class="header-anchor" href="#grpc"><span>gRPC</span></a></h1>
<h3 id="_1-部分文档" tabindex="-1"><a class="header-anchor" href="#_1-部分文档"><span>1. 部分文档</span></a></h3>
<h5 id="_1-1-论文" tabindex="-1"><a class="header-anchor" href="#_1-1-论文"><span>1.1 论文</span></a></h5>
<p><a href="https://github.com/grpc/proposal" target="_blank" rel="noopener noreferrer">graphics</a></p>
<h5 id="_1-2-服务配置" tabindex="-1"><a class="header-anchor" href="#_1-2-服务配置"><span>1.2 服务配置</span></a></h5>
<p><a href="https://github.com/grpc/grpc/blob/master/doc/service_config.md" target="_blank" rel="noopener noreferrer">Service Config in gRPC</a><br>
<a href="https://grpc.github.io/grpc/core/group__grpc__arg__keys.html" target="_blank" rel="noopener noreferrer">arg_keys</a></p>
<h5 id="_1-3-重试策略" tabindex="-1"><a class="header-anchor" href="#_1-3-重试策略"><span>1.3 重试策略</span></a></h5>
<p><a href="https://github.com/grpc/grpc/blob/master/doc/grpc_xds_features.md" target="_blank" rel="noopener noreferrer">what is xDS</a></p>
<h5 id="_1-4-开源引用" tabindex="-1"><a class="header-anchor" href="#_1-4-开源引用"><span>1.4 开源引用</span></a></h5>
<p><a href="/data-base/etcd/aioetcd3">aioetcd3:</a> 版本较老，非 <code v-pre>asyncio</code> 是基于线程实现的库</p>
<h5 id="_1-5-python-文档" tabindex="-1"><a class="header-anchor" href="#_1-5-python-文档"><span>1.5 Python 文档</span></a></h5>
<p><a href="https://grpc.github.io/grpc/python/index.html" target="_blank" rel="noopener noreferrer">gRPC Python’s documentation</a> 此 <strong>API 是稳定</strong> 的</p>
<p><a href="https://github.com/grpc/grpc/tree/master/src/python/grpcio" target="_blank" rel="noopener noreferrer">grpc (github.com)</a> 需要 <code v-pre>python &gt;= 3.6</code></p>
<p><a href="https://doc.oschina.net/grpc?t=56831" target="_blank" rel="noopener noreferrer">官方文档中文版</a></p>
<h5 id="_1-6-proto3" tabindex="-1"><a class="header-anchor" href="#_1-6-proto3"><span>1.6 proto3</span></a></h5>
<p><a href="https://developers.google.com/protocol-buffers/docs/proto3#simple" target="_blank" rel="noopener noreferrer">protocol buffers</a></p>
<table>
<thead>
<tr>
<th>proto3</th>
<th>JSON</th>
<th>JSON示例</th>
<th>注意</th>
</tr>
</thead>
<tbody>
<tr>
<td>message</td>
<td>object</td>
<td “fBar”:="" v,="" “g”:="" null,="" …=""></td>
<td>产生JSON对象，消息字段名可以被映射成lowerCamelCase形式，并且成为JSON对象键，null被接受并成为对应字段的默认值</td>
</tr>
<tr>
<td>enum</td>
<td>string</td>
<td>“FOO_BAR”</td>
<td>枚举值的名字在proto文件中被指定</td>
</tr>
<tr>
<td>map</td>
<td>object</td>
<td “k”:="" v,="" …=""></td>
<td>所有的键都被转换成string</td>
</tr>
<tr>
<td>repeated V</td>
<td>array</td>
<td>[v, …]</td>
<td>null被视为空列表</td>
</tr>
<tr>
<td>bool</td>
<td>true, false</td>
<td>true, false</td>
<td></td>
</tr>
<tr>
<td>string</td>
<td>string</td>
<td>“Hello World!”</td>
<td></td>
</tr>
<tr>
<td>bytes</td>
<td>base64 string</td>
<td>“YWJjMTIzIT8kKiYoKSctPUB+”</td>
<td></td>
</tr>
<tr>
<td>int32, fixed32, uint32</td>
<td>number</td>
<td>1, -10, 0</td>
<td>JSON值会是一个十进制数，数值型或者string类型都会接受</td>
</tr>
<tr>
<td>int64, fixed64, uint64</td>
<td>string</td>
<td>“1”, “-10”</td>
<td>JSON值会是一个十进制数，数值型或者string类型都会接受</td>
</tr>
<tr>
<td>float, double</td>
<td>number</td>
<td>1.1, -10.0, 0, “NaN”, “Infinity”</td>
<td>JSON值会是一个数字或者一个指定的字符串如”NaN”,”infinity”或者”-Infinity”，数值型或者字符串都是可接受的，指数符号也可以接受</td>
</tr>
<tr>
<td>Any</td>
<td>object</td>
<td “@type”:="" “url”,="" “f”:="" v,="" …=""></td>
<td>如果一个Any保留一个特上述的JSON映射，则它会转换成一个如下形式：<code v-pre>{&quot;@type&quot;: xxx, &quot;value&quot;: yyy}</code>否则，该值会被转换成一个JSON对象，<code v-pre>@type</code>字段会被插入所指定的确定的值</td>
</tr>
<tr>
<td>Timestamp</td>
<td>string</td>
<td>“1972-01-01T10:00:20.021Z”</td>
<td>使用RFC 339，其中生成的输出将始终是Z-归一化啊的，并且使用0，3，6或者9位小数</td>
</tr>
<tr>
<td>Duration</td>
<td>string</td>
<td>“1.000340012s”, “1s”</td>
<td>生成的输出总是0，3，6或者9位小数，具体依赖于所需要的精度，接受所有可以转换为纳秒级的精度</td>
</tr>
<tr>
<td>Struct</td>
<td>object</td>
<td …=""></td>
<td>任意的JSON对象，见struct.proto</td>
</tr>
<tr>
<td>Wrapper types</td>
<td>various types</td>
<td>2, “2”, “foo”, true, “true”, null, 0, …</td>
<td>包装器在JSON中的表示方式类似于基本类型，但是允许nulll，并且在转换的过程中保留null</td>
</tr>
<tr>
<td>FieldMask</td>
<td>string</td>
<td>“f.fooBar,h”</td>
<td>见fieldmask.proto</td>
</tr>
<tr>
<td>ListValue</td>
<td>array</td>
<td>[foo, bar, …]</td>
<td></td>
</tr>
<tr>
<td>Value</td>
<td>value</td>
<td></td>
<td>任意JSON值</td>
</tr>
<tr>
<td>NullValue</td>
<td>null</td>
<td></td>
<td>JSON null</td>
</tr>
</tbody>
</table>
</div></template>


