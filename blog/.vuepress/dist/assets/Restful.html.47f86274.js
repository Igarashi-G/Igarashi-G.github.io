import{_ as e}from"./_plugin-vue_export-helper.cdc0426e.js";import{o,c as r,a as n}from"./app.7662c2a9.js";const t={},s=n("p",null,"RESTful \u89C4\u8303\u4ECB\u7ECD\uFF1A \u521D\u8BC6 RESTful \u67B6\u6784\uFF1A \u8D8A\u6765\u8D8A\u591A\u7684\u4EBA\u5F00\u59CB\u610F\u8BC6\u5230\uFF0C\u7F51\u7AD9\u5373\u8F6F\u4EF6\uFF0C\u800C\u4E14\u662F\u4E00\u79CD\u65B0\u578B\u7684\u8F6F\u4EF6\u3002 5G \u7684\u817E\u7A7A\u51FA\u4E16\uFF0C\u7528\u53D1\u5C55\u7684\u773C\u5149\u6765\u770B\u7684\u8BDD\u3002\u4E0B\u8F7D\u4E00\u4E2A 2GB \u7684\u7535\u5F71\u4EC5\u9700\u8981 1\u30012 \u79D2\uFF0C\u6B64\u65F6\u5F80\u672C\u5730\u65B9\u786C\u76D8\u7684\u610F\u4E49\u5C31\u4E0D\u5927\u4E86\u3002\u7F51\u4E0A\u8BFB\u53D6\u6BD4\u672C\u5730\u786C\u76D8\u8FD8\u5FEB\uFF0C \u6211\u4E3A\u4EC0\u4E48\u8981\u653E\u786C\u76D8\u554A\uFF1F",-1),i=n("pre",null,[n("code",null,`    \u8FD9\u79CD"\u4E92\u8054\u7F51\u8F6F\u4EF6"\u91C7\u7528\u6D4F\u89C8\u5668/\u670D\u52A1\u5668\u6A21\u5F0F\u3002\u5206\u5E03\u5F0F\u7684\u4F53\u7CFB\uFF0C\u901A\u8FC7\u4E92\u8054\u7F51\u901A\u4FE1\uFF0C\u5177\u6709\u9AD8\u5EF6\u65F6\uFF08high latency\uFF09\u3001\u9AD8\u5E76\u53D1\u7B49\u7279\u70B9\u3002\uFF08\u73B0\u5728\u80AF\u5B9A\u6BD4\u672C\u5730\u6162\u5F88\u591A\uFF09

    \u7F51\u7AD9\u5F00\u53D1\uFF0C\u5B8C\u5168\u53EF\u4EE5\u91C7\u7528\u8F6F\u4EF6\u5F00\u53D1\u7684\u6A21\u5F0F\u3002\u4F46\u662F\u4F20\u7EDF\u4E0A\uFF0C\u8F6F\u4EF6\u548C\u7F51\u7EDC\u662F\u4E24\u4E2A\u4E0D\u540C\u7684\u9886\u57DF\uFF0C\u5F88\u5C11\u6709\u4EA4\u96C6\uFF1B\u8F6F\u4EF6\u5F00\u53D1\u4E3B\u8981\u9488\u5BF9\u5355\u673A\u73AF\u5883\uFF0C\u7F51\u7EDC\u5219\u4E3B\u8981\u7814\u7A76
    \u7CFB\u7EDF\u4E4B\u95F4\u7684\u901A\u4FE1\u3002\u4E92\u8054\u7F51\u7684\u5174\u8D77\uFF0C\u4F7F\u5F97\u8FD9\u4E24\u4E2A\u9886\u57DF\u5F00\u59CB\u878D\u5408\uFF0C\u73B0\u5728\u6211\u4EEC\u5FC5\u987B\u8003\u8651\uFF0C\u5982\u4F55\u5F00\u53D1\u5728\u4E92\u8054\u7F51\u73AF\u5883\u4E2D\u4F7F\u7528\u7684\u8F6F\u4EF6\u3002
    restful\u662F\u76EE\u524D\u6700\u6D41\u884C\u7684\u4E00\u79CD\u4E92\u8054\u7F51\u8F6F\u4EF6\u67B6\u6784\u3002

\u4E00\u3001\u8D77\u6E90\uFF1A
    REST\u662F2000\u5E74Roy Thomas Fielding\u5728\u535A\u58EB\u8BBA\u6587\u4E2D\u63D0\u51FA\u7684\u3002\uFF08HTTP\u534F\u8BAE1.0\u30011.1\u7684\u4E3B\u8981\u8BBE\u8BA1\u8005\u3001Apache\u670D\u52A1\u5668\u8F6F\u4EF6\u7684\u4F5C\u8005\u4E4B\u4E00\uFF09
    \u7814\u7A76\u7684\u662F\u8BA1\u7B97\u673A\u7684\u4E24\u5927\u524D\u6CBF---\u8F6F\u4EF6\u548C\u7F51\u7EDC\u7684\u4EA4\u53C9\u70B9\u3002\u6539\u53D8\u5E94\u7528\u7A0B\u5E8F\u7684\u4E92\u52A8\u98CE\u683C\u3002

\u4E8C\u3001\u540D\u79F0\uFF1A
    Representational State Transfer\uFF1A\u8868\u73B0\u5C42\u72B6\u6001\u8F6C\u5316\u3002    \u5982\u679C\u4E00\u4E2A\u67B6\u6784\u7B26\u5408REST\u539F\u5219\uFF0C\u5C31\u79F0\u5B83\u4E3ARESTful\u67B6\u6784\u3002

\u4E09\u3001\u8D44\u6E90\uFF08Resources\uFF09\uFF1A
    REST\u7684\u540D\u79F0"\u8868\u73B0\u5C42\u72B6\u6001\u8F6C\u5316"\u4E2D\uFF0C\u7701\u7565\u4E86\u4E3B\u8BED\u3002"\u8868\u73B0\u5C42"\u5176\u5B9E\u6307\u7684\u662F"\u8D44\u6E90"\uFF08Resources\uFF09\u7684"\u8868\u73B0\u5C42"\u3002
    \u5565\uFF1F\u5373\u7F51\u7EDC\u4E0A\u7684\u4FE1\u606F\uFF08\u6587\u672C\u3001\u56FE\u7247\u3001\u6B4C....\uFF09\u53EF\u4EE5\u7528URI\uFF08\u7F51\u7EDC\u8D44\u6E90\u5B9A\u4F4D\u7B26\uFF09\u8BBF\u95EE\u72EC\u4E00\u65E0\u4E8C\u7684\u8BC6\u522B\u7B26\u3002\u4E0A\u7F51\uFF0C\u5373\u4E0E\u7F51\u4E0A\u4E00\u7CFB\u5217\u8D44\u6E90\u7684\u4E92\u52A8\uFF0C\u8C03\u7528URI\u3002

\u56DB\u3001\u8868\u73B0\u5C42\uFF08Representation\uFF09\uFF1A
    "\u8D44\u6E90"\u662F\u4E00\u79CD\u4FE1\u606F\u5B9E\u4F53\uFF0C\u5B83\u53EF\u4EE5\u6709\u591A\u79CD\u5916\u5728\u8868\u73B0\u5F62\u5F0F\u3002\u6211\u4EEC\u628A"\u8D44\u6E90"\u5177\u4F53\u5448\u73B0\u51FA\u6765\u7684\u5F62\u5F0F\uFF0C\u53EB\u505A\u5B83\u7684"\u8868\u73B0\u5C42"\uFF08Representation\uFF09\u3002
    \u6BD4\u5982\uFF0C\u6587\u672C\u53EF\u4EE5\u7528txt\u683C\u5F0F\u8868\u73B0\uFF0C\u4E5F\u53EF\u4EE5\u7528HTML\u683C\u5F0F\u3001XML\u683C\u5F0F\u3001JSON\u683C\u5F0F\u8868\u73B0\uFF0C\u751A\u81F3\u53EF\u4EE5\u91C7\u7528\u4E8C\u8FDB\u5236\u683C\u5F0F\uFF1B\u56FE\u7247\u53EF\u4EE5\u7528JPG\u683C\u5F0F\u8868\u73B0\uFF0C\u4E5F\u53EF\u4EE5\u7528PNG\u683C\u5F0F\u8868\u73B0\u3002

    URI\u4EC5\u4EE3\u8868\u8D44\u6E90\u5B9E\u4F53\uFF0C\u4E25\u683C\u7684\u8BF4\uFF0C\u90E8\u5206\u7F51\u5740\u540E\u7F00.html\u662F\u4E0D\u5FC5\u8981\u7684\uFF0C\u56E0\u4E3A\u540E\u7F00\u540D\u8868\u793A\u683C\u5F0F\uFF0C\u5C5E\u4E8E"\u8868\u73B0\u5C42"\u8303\u7574\uFF0C\u800CURI\u5E94\u8BE5\u53EA\u4EE3\u8868"\u8D44\u6E90"\u7684\u4F4D\u7F6E\u3002
    \u5B83\u7684\u5177\u4F53\u8868\u73B0\u5F62\u5F0F\uFF0C\u5E94\u8BE5\u5728HTTP\u8BF7\u6C42\u7684\u5934\u4FE1\u606F\u4E2D\u7528Accept\u548CContent-Type\u5B57\u6BB5\u6307\u5B9A\uFF0C\u8FD9\u4E24\u4E2A\u5B57\u6BB5\u624D\u662F\u5BF9"\u8868\u73B0\u5C42"\u7684\u63CF\u8FF0\u3002
    \u5B9E\u9645\u4E0Ahtml\u5E94\u8BE5\u5199\u5728Content-Type\u91CC\uFF0CDjango\u5C31\u662F\u8FD9\u4E48\u5E72\u7684\u3002

\u4E94\u3001\u72B6\u6001\u8F6C\u5316\uFF08State Transfer\uFF09\uFF1A
    HTTP\u662F\u65E0\u72B6\u6001\u534F\u8BAE\uFF0C\u6240\u6709\u72B6\u6001\u90FD\u662F\u4FDD\u5B58\u5728\u670D\u52A1\u7AEF\u4E0A\u7684\u3002\u5982\u679C\u5BA2\u6237\u7AEF\u8981\u64CD\u4F5C\u670D\u52A1\u5668\uFF0C\u5FC5\u987B\u901A\u8FC7\u67D0\u79CD\u624B\u6BB5\u8BA9\u670D\u52A1\u7AEF\u53D1\u751F\u72B6\u6001\u8F6C\u5316\u3002
    \u8FD9\u79CD\u8F6C\u5316\u8981\u5148\u901A\u8FC7\u5B83\u8FD9\u4E2A\u8868\u73B0\u683C\u5F0F\u62FF\u5230\u6570\u636E\uFF0C\u57FA\u4E8E\u8FD9\u79CD\u683C\u5F0F\u53BB\u66F4\u6539\u3002\uFF08\u5373\u6570\u636E\u4E00\u6539\uFF0C\u72B6\u6001\u5373\u53D1\u751F\u53D8\u5316\uFF09
    \u5BA2\u6237\u7AEF\u80FD\u7528\u5230\u7684\u624B\u6BB5\u53EA\u80FD\u662FHTTP\u534F\u8BAE\u3002\u5373\u5BF9\u5E94\u56DB\u4E2A\u64CD\u4F5CGET\uFF1A\u83B7\u53D6\u8D44\u6E90\u3001POST\u65B0\u5EFA\u8D44\u6E90\u3001PUT\u66F4\u65B0\u8D44\u6E90\u3001DELETE\u5220\u9664\u8D44\u6E90\u3002

\u516D\u3001\u7EFC\u8FF0\uFF1A
    1.\u6BCF\u4E00\u4E2AURI\u4EE3\u8868\u4E00\u79CD\u8D44\u6E90\uFF08\u8D44\u6E90\uFF1AURI\uFF09
    2.\u5BA2\u6237\u7AEF\u548C\u670D\u52A1\u5668\u4E4B\u95F4\uFF0C\u4F20\u9012\u8FD9\u79CD\u8D44\u6E90\u7684\u67D0\u79CD\u8868\u73B0\u5C42\uFF08HTML\u683C\u5F0F\u3001XML\u683C\u5F0F\u3001JSON\u683C\u5F0F\uFF0C\u8868\u73B0\u5C42\uFF1A\u7528\u4EC0\u4E48\u683C\u5F0F\u4F20\u9012\u6570\u636E\uFF09
    3.\u5BA2\u6237\u7AEF\u901A\u8FC7\u56DB\u4E2AHTTP\u52A8\u8BCD\uFF0C\u5BF9\u670D\u52A1\u5668\u7AEF\u8D44\u6E90\u8FDB\u884C\u64CD\u4F5C\uFF0C\u5B9E\u73B0"\u8868\u73B0\u5C42\u72B6\u6001\u8F6C\u5316"\uFF08\u7528\u56DB\u4E2A\u65B9\u6CD5\u8F6C\u5316\u72B6\u6001\uFF09
    RESTful\u5C31\u662F\u4E00\u5806API\u7684\u8BBE\u8BA1\u89C4\u8303\uFF08\u53EF\u4EE5\u7406\u89E3\u4E3A\u662F\u4E00\u5806url\u7684\u8BBE\u8BA1\u89C4\u8303\uFF0C\u5373\u5B9A\u4E49\u597D\u6309\u4EC0\u4E48\u6837\u7684\u89C4\u5219\u6765\u8BBF\u95EE\u670D\u52A1\u5668\u7AEF\u7684\u6570\u636E\uFF09

\u4E03\u3001\u8BEF\u533A\uFF1A
    1.\u6700\u5E38\u89C1\u7684\u5C31\u662FURI\u5305\u542B\u52A8\u8BCD\u3002\u56E0\u4E3A\u8D44\u6E90\u662F\u4E00\u79CD\u5B9E\u4F53\uFF0C\u6240\u4EE5\u5E94\u8BE5\u53EA\u6709\u540D\u8BCD\uFF0C\u52A8\u8BCD\u5E94\u653E\u4E8EHTTP\u534F\u8BAE\u4E2D\u3002\uFF08\u5F00\u53D1\u4E2DURL\u5207\u5FCC\u52A8\u8BCD\uFF09
        \u82E5\u6709\u4E9B\u5C31\u662F\u52A8\u8BCD\uFF0C\u6BD4\u5982\u8F6C\u8D26transfer\uFF0C\u4E5F\u8981\u8F6C\u4E3A\u540D\u8BCD\u5F62\u5F0Ftransaction
    2.\u53E6\u4E00\u4E2A\u5C31\u662FURI\u4E2D\u5305\u542B\u7248\u672C\u53F7\u3002\u5982http://www.example.com/app/1.0/foo  \u8FD9\u662F\u4E0D\u5408\u9002\u7684
        \u56E0\u4E3A\u4E0D\u540C\u7248\u672C\uFF0C\u5E94\u8BE5\u7406\u89E3\u4E3A\u4E0D\u540C\u7684\u8868\u73B0\u5F62\u5F0F\u3002\u6240\u4EE5\u5E94\u8BE5\u91C7\u7528\u540C\u4E00\u4E2AURI\uFF0C\u5728\u8BF7\u6C42\u5934\u4E2D\u7528Accept\u5B57\u6BB5\u6765\u8FDB\u884C\u533A\u5206\u3002
        Accept:vnd.example-com.foo+json;version=1.0

    *\u6CE8\uFF0C\u867D\u8BF4restfull\u89C4\u8303\u5EFA\u8BAE\u7248\u672C\u53F7\u653E\u5728\u8BF7\u6C42\u5934\u800C\u4E0D\u662Furl\u91CC\uFF0C\u4F46\u4E8B\u5B9E\u4E0A\u4E3A\u4E86\u4F7F\u7528\u65B9\u4FBF\uFF0C\u5927\u591A\u6570\u5F00\u53D1\u8005\u8FD8\u662F\u559C\u6B22\u628A\u7248\u672C\u53F7\u653E\u5728url\u4E0A\uFF0C\u8FD9\u6837\u5BB9\u6613\u76F4\u89C2\u533A\u5206
`)],-1),a=n("p",null,"Restful API \u8BBE\u8BA1\u6307\u5357\uFF1A(\u5982\u4F55\u8BBE\u8BA1\u4E00\u5957\u5408\u7406\u3001\u597D\u7528\u7684 API) \u4E00\u3001\u534F\u8BAE API \u4E0E\u7528\u6237\u901A\u4FE1\uFF0C\u603B\u662F\u4F7F\u7528 HTTPs \u534F\u8BAE\uFF08\u901A\u4FE1\u52A0\u5BC6\uFF0C\u5C31\u7B97\u88AB\u52AB\u6301\u4E86\uFF0C\u4E5F\u770B\u4E0D\u89C1\u6570\u636E\uFF0C\u4E3B\u6D41\uFF0C\u8FD0\u7EF4\u8D1F\u8D23\uFF09",-1),l=n("pre",null,[n("code",null,`\u4E8C\u3001\u57DF\u540D
    \u5E94\u8BE5\u5C3D\u91CF\u5C06API\u90E8\u7F72\u5728\u4E13\u7528\u57DF\u540D\u4E4B\u4E0B\u3002
    https://api.example.com
    \u5982\u679C\u786E\u5B9AAPI\u5F88\u7B80\u5355\uFF0C\u4E0D\u4F1A\u6709\u8FDB\u4E00\u6B65\u6269\u5C55\uFF0C\u53EF\u4EE5\u8003\u8651\u653E\u5728\u4E3B\u57DF\u540D\u4E0B\u3002\u3000\u3000
    https://example.org/api/


\u4E09\u3001\u7248\u672C\uFF08Versioning\uFF09
    \u5E94\u8BE5\u5C06API\u7684\u7248\u672C\u53F7\u653E\u5165URL\u3002
    https://api.example.com/v1/

    \u53E6\u4E00\u79CD\u505A\u6CD5\u662F\uFF0C\u5C06\u7248\u672C\u53F7\u653E\u5728HTTP\u5934\u4FE1\u606F\u4E2D\uFF0C\u4F46\u4E0D\u5982\u653E\u5165URL\u65B9\u4FBF\u548C\u76F4\u89C2\u3002Github\u91C7\u7528\u8FD9\u79CD\u505A\u6CD5\u3002

\u56DB\u3001\u8DEF\u5F84\uFF08Endpoint\uFF09
    \u8DEF\u5F84\u53C8\u79F0"\u7EC8\u70B9"\uFF08endpoint\uFF09\uFF0C\u8868\u793AAPI\u7684\u5177\u4F53\u7F51\u5740\u3002

    \u5728RESTful\u67B6\u6784\u4E2D\uFF0C\u6BCF\u4E2A\u7F51\u5740\u4EE3\u8868\u4E00\u79CD\u8D44\u6E90\uFF08resource\uFF09\uFF0C\u6240\u4EE5\u7F51\u5740\u4E2D\u4E0D\u80FD\u6709\u52A8\u8BCD\uFF0C\u53EA\u80FD\u6709\u540D\u8BCD\uFF0C\u800C\u4E14\u6240\u7528\u7684\u540D\u8BCD\u5F80\u5F80\u4E0E\u6570\u636E\u5E93\u7684\u8868\u683C\u540D\u5BF9\u5E94\u3002\u4E00\u822C\u6765\u8BF4\uFF0C\u6570\u636E\u5E93\u4E2D\u7684\u8868\u90FD\u662F\u540C\u79CD\u8BB0\u5F55\u7684"\u96C6\u5408"\uFF08collection\uFF09\uFF0C\u6240\u4EE5API\u4E2D\u7684\u540D\u8BCD\u4E5F\u5E94\u8BE5\u4F7F\u7528\u590D\u6570\u3002

    \u4E3E\u4F8B\u6765\u8BF4\uFF0C\u6709\u4E00\u4E2AAPI\u63D0\u4F9B\u52A8\u7269\u56ED\uFF08zoo\uFF09\u7684\u4FE1\u606F\uFF0C\u8FD8\u5305\u62EC\u5404\u79CD\u52A8\u7269\u548C\u96C7\u5458\u7684\u4FE1\u606F\uFF0C\u5219\u5B83\u7684\u8DEF\u5F84\u5E94\u8BE5\u8BBE\u8BA1\u6210\u4E0B\u9762\u8FD9\u6837\u3002

    https://api.example.com/v1/zoos
    https://api.example.com/v1/animals
    https://api.example.com/v1/employees

\u4E94\u3001HTTP\u52A8\u8BCD
    \u5BF9\u4E8E\u8D44\u6E90\u7684\u5177\u4F53\u64CD\u4F5C\u7C7B\u578B\uFF0C\u7531HTTP\u52A8\u8BCD\u8868\u793A\u3002

    \u5E38\u7528\u7684HTTP\u52A8\u8BCD\u6709\u4E0B\u9762\u4E94\u4E2A\uFF08\u62EC\u53F7\u91CC\u662F\u5BF9\u5E94\u7684SQL\u547D\u4EE4\uFF09\u3002

    1.GET\uFF08SELECT\uFF09\uFF1A\u4ECE\u670D\u52A1\u5668\u53D6\u51FA\u8D44\u6E90\uFF08\u4E00\u9879\u6216\u591A\u9879\uFF09\u3002
    2.POST\uFF08CREATE\uFF09\uFF1A\u5728\u670D\u52A1\u5668\u65B0\u5EFA\u4E00\u4E2A\u8D44\u6E90\u3002
    3.PUT\uFF08UPDATE\uFF09\uFF1A\u5728\u670D\u52A1\u5668\u66F4\u65B0\u8D44\u6E90\uFF08\u5BA2\u6237\u7AEF\u63D0\u4F9B\u6539\u53D8\u540E\u7684\u5B8C\u6574\u8D44\u6E90\uFF09\u3002
    4.PATCH\uFF08UPDATE\uFF09\uFF1A\u5728\u670D\u52A1\u5668\u66F4\u65B0\u8D44\u6E90\uFF08\u5BA2\u6237\u7AEF\u63D0\u4F9B\u6539\u53D8\u7684\u5C5E\u6027\uFF09\u3002
    5.DELETE\uFF08DELETE\uFF09\uFF1A\u4ECE\u670D\u52A1\u5668\u5220\u9664\u8D44\u6E90\u3002
    \u8FD8\u6709\u4E24\u4E2A\u4E0D\u5E38\u7528\u7684HTTP\u52A8\u8BCD\u3002

    6.HEAD\uFF1A\u83B7\u53D6\u8D44\u6E90\u7684\u5143\u6570\u636E\u3002
    7.OPTIONS\uFF1A\u83B7\u53D6\u4FE1\u606F\uFF0C\u5173\u4E8E\u8D44\u6E90\u7684\u54EA\u4E9B\u5C5E\u6027\u662F\u5BA2\u6237\u7AEF\u53EF\u4EE5\u6539\u53D8\u7684\u3002
    \u4E0B\u9762\u662F\u4E00\u4E9B\u4F8B\u5B50\u3002

        GET /zoos\uFF1A\u5217\u51FA\u6240\u6709\u52A8\u7269\u56ED
        POST /zoos\uFF1A\u65B0\u5EFA\u4E00\u4E2A\u52A8\u7269\u56ED
        GET /zoos/ID\uFF1A\u83B7\u53D6\u67D0\u4E2A\u6307\u5B9A\u52A8\u7269\u56ED\u7684\u4FE1\u606F
        PUT /zoos/ID\uFF1A\u66F4\u65B0\u67D0\u4E2A\u6307\u5B9A\u52A8\u7269\u56ED\u7684\u4FE1\u606F\uFF08\u63D0\u4F9B\u8BE5\u52A8\u7269\u56ED\u7684\u5168\u90E8\u4FE1\u606F\uFF09
        PATCH /zoos/ID\uFF1A\u66F4\u65B0\u67D0\u4E2A\u6307\u5B9A\u52A8\u7269\u56ED\u7684\u4FE1\u606F\uFF08\u63D0\u4F9B\u8BE5\u52A8\u7269\u56ED\u7684\u90E8\u5206\u4FE1\u606F\uFF09
        DELETE /zoos/ID\uFF1A\u5220\u9664\u67D0\u4E2A\u52A8\u7269\u56ED
        GET /zoos/ID/animals\uFF1A\u5217\u51FA\u67D0\u4E2A\u6307\u5B9A\u52A8\u7269\u56ED\u7684\u6240\u6709\u52A8\u7269
        DELETE /zoos/ID/animals/ID\uFF1A\u5220\u9664\u67D0\u4E2A\u6307\u5B9A\u52A8\u7269\u56ED\u7684\u6307\u5B9A\u52A8\u7269

\u516D\u3001\u8FC7\u6EE4\u4FE1\u606F\uFF08Filtering\uFF09
    \u5982\u679C\u8BB0\u5F55\u6570\u91CF\u5F88\u591A\uFF0C\u670D\u52A1\u5668\u4E0D\u53EF\u80FD\u90FD\u5C06\u5B83\u4EEC\u8FD4\u56DE\u7ED9\u7528\u6237\u3002API\u5E94\u8BE5\u63D0\u4F9B\u53C2\u6570\uFF0C\u8FC7\u6EE4\u8FD4\u56DE\u7ED3\u679C\u3002

    \u4E0B\u9762\u662F\u4E00\u4E9B\u5E38\u89C1\u7684\u53C2\u6570\u3002

    ?limit=10\uFF1A\u6307\u5B9A\u8FD4\u56DE\u8BB0\u5F55\u7684\u6570\u91CF
    ?offset=10\uFF1A\u6307\u5B9A\u8FD4\u56DE\u8BB0\u5F55\u7684\u5F00\u59CB\u4F4D\u7F6E\u3002
    ?page=2&per_page=100\uFF1A\u6307\u5B9A\u7B2C\u51E0\u9875\uFF0C\u4EE5\u53CA\u6BCF\u9875\u7684\u8BB0\u5F55\u6570\u3002
    ?sortby=name&order=asc\uFF1A\u6307\u5B9A\u8FD4\u56DE\u7ED3\u679C\u6309\u7167\u54EA\u4E2A\u5C5E\u6027\u6392\u5E8F\uFF0C\u4EE5\u53CA\u6392\u5E8F\u987A\u5E8F\u3002
    ?animal_type_id=1\uFF1A\u6307\u5B9A\u7B5B\u9009\u6761\u4EF6

    \u53C2\u6570\u7684\u8BBE\u8BA1\u5141\u8BB8\u5B58\u5728\u5197\u4F59\uFF0C\u5373\u5141\u8BB8API\u8DEF\u5F84\u548CURL\u53C2\u6570\u5076\u5C14\u6709\u91CD\u590D\u3002\u6BD4\u5982\uFF0CGET /zoo/ID/animals \u4E0E GET /animals?zoo_id=ID \u7684\u542B\u4E49\u662F\u76F8\u540C\u7684\u3002

\u4E03\u3001\u72B6\u6001\u7801\uFF08Status Codes\uFF09
    \u670D\u52A1\u5668\u5411\u7528\u6237\u8FD4\u56DE\u7684\u72B6\u6001\u7801\u548C\u63D0\u793A\u4FE1\u606F\uFF0C\u5E38\u89C1\u7684\u6709\u4EE5\u4E0B\u4E00\u4E9B\uFF08\u65B9\u62EC\u53F7\u4E2D\u662F\u8BE5\u72B6\u6001\u7801\u5BF9\u5E94\u7684HTTP\u52A8\u8BCD\uFF09\u3002

    200 OK - [GET]\uFF1A\u670D\u52A1\u5668\u6210\u529F\u8FD4\u56DE\u7528\u6237\u8BF7\u6C42\u7684\u6570\u636E\uFF0C\u8BE5\u64CD\u4F5C\u662F\u5E42\u7B49\u7684\uFF08Idempotent\uFF09\u3002
    201 CREATED - [POST/PUT/PATCH]\uFF1A\u7528\u6237\u65B0\u5EFA\u6216\u4FEE\u6539\u6570\u636E\u6210\u529F\u3002
    202 Accepted - [*]\uFF1A\u8868\u793A\u4E00\u4E2A\u8BF7\u6C42\u5DF2\u7ECF\u8FDB\u5165\u540E\u53F0\u6392\u961F\uFF08\u5F02\u6B65\u4EFB\u52A1\uFF09\u89C1\u7684\u5C11\u662F\u56E0\u4E3A\u7F51\u7AD9\u4E0D\u662F\u5F02\u6B65\u7684\uFF0C\u7528Tronado\u5F02\u6B65\u5C31\u4F1A\u7ECF\u5E38\u770B\u89C1
    204 NO CONTENT - [DELETE]\uFF1A\u7528\u6237\u5220\u9664\u6570\u636E\u6210\u529F\u3002
    301
    302
    304
    400 INVALID REQUEST - [POST/PUT/PATCH]\uFF1A\u7528\u6237\u53D1\u51FA\u7684\u8BF7\u6C42\u6709\u9519\u8BEF\uFF0C\u670D\u52A1\u5668\u6CA1\u6709\u8FDB\u884C\u65B0\u5EFA\u6216\u4FEE\u6539\u6570\u636E\u7684\u64CD\u4F5C\uFF0C\u8BE5\u64CD\u4F5C\u662F\u5E42\u7B49\u7684\u3002
    401 Unauthorized - [*]\uFF1A\u8868\u793A\u7528\u6237\u6CA1\u6709\u6743\u9650\uFF08\u4EE4\u724C\u3001\u7528\u6237\u540D\u3001\u5BC6\u7801\u9519\u8BEF\uFF09\u3002
    403 Forbidden - [*] \u8868\u793A\u7528\u6237\u5F97\u5230\u6388\u6743\uFF08\u4E0E401\u9519\u8BEF\u76F8\u5BF9\uFF09\uFF0C\u4F46\u662F\u8BBF\u95EE\u662F\u88AB\u7981\u6B62\u7684\u3002
    404 NOT FOUND - [*]\uFF1A\u7528\u6237\u53D1\u51FA\u7684\u8BF7\u6C42\u9488\u5BF9\u7684\u662F\u4E0D\u5B58\u5728\u7684\u8BB0\u5F55\uFF0C\u670D\u52A1\u5668\u6CA1\u6709\u8FDB\u884C\u64CD\u4F5C\uFF0C\u8BE5\u64CD\u4F5C\u662F\u5E42\u7B49\u7684\u3002
    406 Not Acceptable - [GET]\uFF1A\u7528\u6237\u8BF7\u6C42\u7684\u683C\u5F0F\u4E0D\u53EF\u5F97\uFF08\u6BD4\u5982\u7528\u6237\u8BF7\u6C42JSON\u683C\u5F0F\uFF0C\u4F46\u662F\u53EA\u6709XML\u683C\u5F0F\uFF09\u3002
    410 Gone -[GET]\uFF1A\u7528\u6237\u8BF7\u6C42\u7684\u8D44\u6E90\u88AB\u6C38\u4E45\u5220\u9664\uFF0C\u4E14\u4E0D\u4F1A\u518D\u5F97\u5230\u7684\u3002
    422 Unprocesable entity - [POST/PUT/PATCH] \u5F53\u521B\u5EFA\u4E00\u4E2A\u5BF9\u8C61\u65F6\uFF0C\u53D1\u751F\u4E00\u4E2A\u9A8C\u8BC1\u9519\u8BEF\u3002
    500 INTERNAL SERVER ERROR - [*]\uFF1A\u670D\u52A1\u5668\u53D1\u751F\u9519\u8BEF\uFF0C\u7528\u6237\u5C06\u65E0\u6CD5\u5224\u65AD\u53D1\u51FA\u7684\u8BF7\u6C42\u662F\u5426\u6210\u529F\u3002\u767E\u5206\u4E4B\u767E\u540E\u53F0\u51FA\u95EE\u9898

    \u72B6\u6001\u7801\u7684\u5B8C\u5168\u5217\u8868\u53C2\u89C1https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html\u3002

\u516B\u3001\u9519\u8BEF\u5904\u7406\uFF08Error handling\uFF09
    \u5982\u679C\u72B6\u6001\u7801\u662F4xx\uFF0C\u5C31\u5E94\u8BE5\u5411\u7528\u6237\u8FD4\u56DE\u51FA\u9519\u4FE1\u606F\u3002\u4E00\u822C\u6765\u8BF4\uFF0C\u8FD4\u56DE\u7684\u4FE1\u606F\u4E2D\u5C06error\u4F5C\u4E3A\u952E\u540D\uFF0C\u51FA\u9519\u4FE1\u606F\u4F5C\u4E3A\u952E\u503C\u5373\u53EF\u3002

    {
        error: "Invalid API key"
    }
    \u73B0\u5728\u8FD4\u56DE\u90FD\u662Fjson\uFF0C\u547D\u540D\u901A\u5E38\u7528error\u3002\u5E94\u8BE5\u52A0\u9519\u8BEF\u4EE3\u7801\uFF0C\u89E3\u51B3\u65B9\u6848\u624D\u662F\u597D\u7684\u8FD4\u56DE\u4FE1\u606F\u3002\uFF08\u662F\u5728\u4E0D\u884C\u628A\u81EA\u5DF1\u7684\u7535\u8BDD\u653E\u5728\u4E0A\u9762\uFF09

\u4E5D\u3001\u8FD4\u56DE\u7ED3\u679C
    \u9488\u5BF9\u4E0D\u540C\u64CD\u4F5C\uFF0C\u670D\u52A1\u5668\u5411\u7528\u6237\u8FD4\u56DE\u7684\u7ED3\u679C\u5E94\u8BE5\u7B26\u5408\u4EE5\u4E0B\u89C4\u8303\u3002

    GET /collection\uFF1A\u8FD4\u56DE\u8D44\u6E90\u5BF9\u8C61\u7684\u5217\u8868\uFF08\u6570\u7EC4\uFF09\u5982\u5217\u8868\u3002\u5217\u8868\u5957\u5B57\u5178
    GET /collection/resource\uFF1A\u8FD4\u56DE\u5355\u4E2A\u8D44\u6E90\u5BF9\u8C61 \u5373\u4E00\u4E2A\u5B57\u5178
    POST /collection\uFF1A\u8FD4\u56DE\u65B0\u751F\u6210\u7684\u8D44\u6E90\u5BF9\u8C61
    PUT /collection/resource\uFF1A\u8FD4\u56DE\u5B8C\u6574\u7684\u8D44\u6E90\u5BF9\u8C61
    PATCH /collection/resource\uFF1A\u8FD4\u56DE\u5B8C\u6574\u7684\u8D44\u6E90\u5BF9\u8C61
    DELETE /collection/resource\uFF1A\u8FD4\u56DE\u4E00\u4E2A\u7A7A\u6587\u6863

\u5341\u3001Hypermedia API
    RESTful API\u6700\u597D\u505A\u5230Hypermedia\uFF0C\u5373\u8FD4\u56DE\u7ED3\u679C\u4E2D\u63D0\u4F9B\u94FE\u63A5\uFF0C\u8FDE\u5411\u5176\u4ED6API\u65B9\u6CD5\uFF0C\u4F7F\u5F97\u7528\u6237\u4E0D\u67E5\u6587\u6863\uFF0C\u4E5F\u77E5\u9053\u4E0B\u4E00\u6B65\u5E94\u8BE5\u505A\u4EC0\u4E48\u3002

    \u6BD4\u5982\uFF0C\u5F53\u7528\u6237\u5411api.example.com\u7684\u6839\u76EE\u5F55\u53D1\u51FA\u8BF7\u6C42\uFF0C\u4F1A\u5F97\u5230\u8FD9\u6837\u4E00\u4E2A\u6587\u6863\u3002

        {"link": {
          "rel":   "collection https://www.example.com/zoos",
          "href":  "https://api.example.com/zoos",
          "title": "List of zoos",
          "type":  "application/vnd.yourformat+json"
        }}
    \u4E0A\u9762\u4EE3\u7801\u8868\u793A\uFF0C\u6587\u6863\u4E2D\u6709\u4E00\u4E2Alink\u5C5E\u6027\uFF0C\u7528\u6237\u8BFB\u53D6\u8FD9\u4E2A\u5C5E\u6027\u5C31\u77E5\u9053\u4E0B\u4E00\u6B65\u8BE5\u8C03\u7528\u4EC0\u4E48API\u4E86\u3002rel\u8868\u793A\u8FD9\u4E2AAPI\u4E0E\u5F53\u524D\u7F51\u5740\u7684\u5173\u7CFB\uFF08collection\u5173\u7CFB\uFF0C\u5E76\u7ED9\u51FA\u8BE5collection\u7684\u7F51\u5740\uFF09\uFF0Chref\u8868\u793AAPI\u7684\u8DEF\u5F84\uFF0Ctitle\u8868\u793AAPI\u7684\u6807\u9898\uFF0Ctype\u8868\u793A\u8FD4\u56DE\u7C7B\u578B\u3002

    Hypermedia API\u7684\u8BBE\u8BA1\u88AB\u79F0\u4E3AHATEOAS\u3002Github\u7684API\u5C31\u662F\u8FD9\u79CD\u8BBE\u8BA1\uFF0C\u8BBF\u95EEapi.github.com\u4F1A\u5F97\u5230\u4E00\u4E2A\u6240\u6709\u53EF\u7528API\u7684\u7F51\u5740\u5217\u8868\u3002

        {
          "current_user_url": "https://api.github.com/user",
          "authorizations_url": "https://api.github.com/authorizations",
          // ...
        }
    \u4ECE\u4E0A\u9762\u53EF\u4EE5\u770B\u5230\uFF0C\u5982\u679C\u60F3\u83B7\u53D6\u5F53\u524D\u7528\u6237\u7684\u4FE1\u606F\uFF0C\u5E94\u8BE5\u53BB\u8BBF\u95EEapi.github.com/user\uFF0C\u7136\u540E\u5C31\u5F97\u5230\u4E86\u4E0B\u9762\u7ED3\u679C\u3002


        {
          "message": "Requires authentication",
          "documentation_url": "https://developer.github.com/v3"
        }
    \u4E0A\u9762\u4EE3\u7801\u8868\u793A\uFF0C\u670D\u52A1\u5668\u7ED9\u51FA\u4E86\u63D0\u793A\u4FE1\u606F\uFF0C\u4EE5\u53CA\u6587\u6863\u7684\u7F51\u5740

\u5341\u4E00\u3001\u5176\u4ED6
    \uFF081\uFF09API\u7684\u8EAB\u4EFD\u8BA4\u8BC1\u5E94\u8BE5\u4F7F\u7528OAuth 2.0\u6846\u67B6\u3002
        \u4E3A\u4E86\u5438\u5F15\u7528\u6237\uFF0C\u7528\u6237\u53C8\u61D2\u5F97\u6CE8\u518C\u9EBB\u70E6\uFF0C\u5229\u7528\u7B2C\u4E09\u65B9\u767B\u5F55\u8BA4\u8BC1\u3002\u4F46\u8981\u8BA4\u8BC1\u624D\u884C\uFF0C\u5373\u7B2C\u4E09\u65B9\u82E5QQ\u8BA4\u53EF\u767B\u5F55\uFF0C\u90A3\u4E48\u5C31\u80FD\u767B\u5F55\u7F51\u7AD9\u3002
        /oauth/XXX../client_id=xxxx     --\u8FD9\u662F\u7F51\u7AD9\u7684id\uFF0C\u7F51\u7AD9\u5728QQ\u90A3\u91CC\u6CE8\u518C\u4E86\u4E00\u4E2Aid,QQ\u624D\u4F1A\u5E2E\u4F60\u9A8C\u8BC1\u3002\u4F60\u5C31\u544A\u8BC9\u817E\u8BAF\u4F60\u7684\u7F51\u7AD9\u662F\u4EC0\u4E48\uFF0C\u5728\u544A\u8BC9\u817E\u8BAF
            \u6709\u90A3\u4E2AQQ\u7528\u6237\u8BBF\u95EE\u4F60\u7684\u7F51\u7AD9\uFF0CQQ\u5E2E\u4F60\u9A8C\u8BC1\u3002\u5982\u679C\u9A8C\u8BC1\u6210\u529F\u4E86\u5219\u5728\u544A\u8BC9\u8FD9\u4E2A\u7F51\u7AD9\u3002
        &response_type=token ... http://.../yourwebpage/    --\u8FD4\u56DE\u5230\u4F60\u8FD9\u4E2Aurl\u544A\u8BC9\u4F60\u9A8C\u8BC1\u662F\u5426\u6210\u529F\u3002\u6210\u529F\u5373\u7F51\u7AD9\u62FF\u5230\u8FD4\u56DE\u7684\u6570\u636E\u5E76\u8DF3\u8F6C\u3002

        \u53EF\u4EE5\u7533\u8BF7\u63A5\u5165\uFF0C\u4E4B\u540E\u518D\u9875\u9762a\u6807\u7B7E\u4E2Donclick\u52A0\u4E00\u6BB5\u8FDE\u63A5\u5373\u53EF\u3002\u6709\u8BE6\u7EC6\u7684\u6587\u6863\u3002

    \uFF082\uFF09\u670D\u52A1\u5668\u8FD4\u56DE\u7684\u6570\u636E\u683C\u5F0F\uFF0C\u5E94\u8BE5\u5C3D\u91CF\u4F7F\u7528JSON\uFF0C\u907F\u514D\u4F7F\u7528XML\u3002

\u5341\u4E8C\u3001Django rest framework\u6700\u4F73\u5B9E\u8DF5
    http://www.cnblogs.com/alex3714/articles/7131523.html

    pip\u4E0B\u8F7Ddjangorestframework

    \u914D\u7F6EINSTALLED_APPS = [
        'rest_framework',
    ]\u3000\u3000
    \u518D\u52A0\u5165\u4E00\u4E0B\u5230settings\u91CC\u9762
    REST_FRAMEWORK = {
        # Use Django's standard \`django.contrib.auth\` permissions,
        # or allow read-only access for unauthenticated users.
        'DEFAULT_PERMISSION_CLASSES': [
            'rest_framework.permissions.DjangoModelPermissionsOrAnonReadOnly'
        ]
    }


    1.\u628A\u6570\u636E\u4ECE\u6570\u636E\u5E93\u53D6\u51FA\uFF0C\u5E76\u5E8F\u5217\u5316\uFF08\u8981\u6709\u5E8F\u5217\u5316\u7684\u683C\u5F0F\uFF09\u5E94\u8BE5\u6709\u4E2A\u8D1F\u8D23\u5E8F\u5217\u5316\u7684\u7C7B
    2.\u628A\u6570\u636E\u5E93\u91CC\u7684model\u5BF9\u8C61\uFF0C\u4EA4\u7ED9\u5E8F\u5217\u5316\u7684\u7C7B\u53BB\u8FDB\u884C\u5E8F\u5217\u5316
    3.\u8FD4\u56DE\u7ED9\u524D\u7AEF

\u521B\u5EFA\u5E8F\u5217\u5316\u7684\u7C7Brest_serializer\u5373\u5982\u4E0B\uFF1A
    from django.contrib.auth.models import User     # \u4F60\u7684app \u5982\uFF1Afrom app01 import models
    from rest_framework import serializers

    # Serializers define the API representation.
        class Meta:
            model = User    # \u4F60\u7684\u6570\u636E\u5E93\u8868\uFF0C\u5982\uFF1Amodel = models.User
            fields = ('url', 'username', 'email', 'is_staff')   # \u4F60\u8981\u663E\u793A\u7684\u5B57\u6BB5url\u5FC5\u586B


\u4E4B\u540E\u521B\u5EFA\u4E00\u4E2Arest_views\u5F53\u505A\u89C6\u56FE\uFF1A
    from rest_framework import viewsets

    from app01 import models
    from app01.rest_serializer import UserSerializer    # \u89C4\u5B9A\u6B7B\u7684\u5FC5\u987B\u8FD9\u4E48\u5199
    # ViewSets define the view behavior.
    class UserViewSet(viewsets.ModelViewSet):
        queryset = models.User.objects.all()    # \u628A\u6570\u636E\u53D6\u51FA\u6765
        serializer_class = UserSerializer       # \u4EA4\u7ED9\u5B83\u53D6\u5E8F\u5217\u5316

\u6700\u540E\u914D\u7F6Eurl
    from rest_framework import routers
    from app01.rest_views import UserViewSet

    # Routers provide an easy way of automatically determining the URL conf.
    router = routers.DefaultRouter()        # \u5B9A\u4E49\u4E86\u4E00\u4E2Arouter\u7684\u5B9E\u4F8B
    router.register(r'users', UserViewSet)  # \u7136\u540E\u6CE8\u518C

    # Wire up our API using automatic URL routing.
    # Additionally, we include login URLs for the browsable API.
    urlpatterns = [
        url(r'^', include(router.urls)),    # \u5373\u4E0A\u9762\u5B9E\u4F8B\u5316\u7684\u5B9E\u4F8B\u53EF\u6539\u4E3Ar'^api/$'\uFF0C\u603B\u5165\u53E3\u8FD8\u662FDjango\uFF0C\u4F46\u662Frouter\u662F\u81EA\u5DF1\u7684
        url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))  # \u8FD9\u91CC\u7684\u60F3\u5199\u6CD5\u6539\u4E3A\u4E86\u6CE8\u518C\u7684\u683C\u5F0F
    ]

\u4E4B\u540E\u767B\u9646app01/api/\u663E\u793AApi Root \u5373\u6839
HTTP 200 OK
Allow: GET, HEAD, OPTIONS
Content-Type: application/json
Vary: Accept
{
    "users": "http://127.0.0.1:8080/app01/api/users/"   # \u70B9\u51FB\u5219\u53D6\u51FA\u4E86\u6240\u6709\u7528\u6237fields\u5B9A\u4E49\u663E\u793A\u7684\u5B57\u6BB5
}

\u771F\u6B63\u8FD4\u56DE\u7ED9\u524D\u7AEF\u7684\u662FGET\u65C1\u8FB9\u9009\u62E9\u7684json\u5B57\u6BB5?format=json
HyperlinkedModelSerializer\u4E3A\u663E\u793A\u8FDE\u63A5\uFF0C\u82E5\u60F3\u8981\u5173\u8054\u7684\u5916\u952E\u5B57\u6BB5\u7684id\u5219ModelSerializer
\u82E5\u8FD8\u8981\u53D6\u4E0B\u4E00\u5C42\u7684\u6570\u636E\u5219\u53EF\u4EE5\u8BBE\u7F6Edepth = 2\uFF0C\u751A\u81F3\u90FD\u80FD\u53D6\u5230\u5916\u952E\u5173\u8054\u7684\u3001\u5916\u952E\u3001\u591A\u5BF9\u591A\u6570\u636E\uFF08\u6CA1\u5B9A\u4E49\u90FD\u80FD\u51FA\u7684\u6765\uFF09
`)],-1),p=[s,i,a,l];function c(T,m){return o(),r("div",null,p)}const d=e(t,[["render",c],["__file","Restful.html.vue"]]);export{d as default};