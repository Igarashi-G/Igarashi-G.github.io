<template><div><p>AI Agent 开发踩坑</p>
<!-- more -->
<h1 id="ai-agent-踩坑" tabindex="-1"><a class="header-anchor" href="#ai-agent-踩坑"><span>AI Agent 踩坑</span></a></h1>
<h3 id="_1-架构的坑" tabindex="-1"><a class="header-anchor" href="#_1-架构的坑"><span>1. 架构的坑</span></a></h3>
<h4 id="_1-1-react架构" tabindex="-1"><a class="header-anchor" href="#_1-1-react架构"><span>1.1 ReAct架构</span></a></h4>
<div class="hint-container warning">
<p class="hint-container-title">注意</p>
<p>ReAct 的默认行为是 <strong>继续循环而非停止</strong></p>
<p><strong>要理解框架在做什么，而不只是调它的 API</strong></p>
</div>
<p>LLM 不擅长判断 <strong>&quot;够了&quot;</strong> 这个时刻，它倾向于继续调用工具、继续推理，最终陷入无限循环。</p>
<p>LLM 输出的非确定性会被 <strong>循环放大</strong> ，多次迭代可能产出完全不靠谱的结果，甚至导致 API 成本失控</p>
<p>LangGraph 所谓的 <strong>&quot;图结构&quot;</strong> 底层本质就是:</p>
<ul>
<li>一个模型节点（Model）</li>
<li>若干个工具节点（Tools）</li>
<li>加几条条件边（根据 state 决定下一步调谁）</li>
</ul>
<p><a href="https://www.decodingai.com/p/building-production-react-agents" target="_blank" rel="noopener noreferrer">但框架把这个简单结构裹了厚厚一层抽象</a>（换成裸 Python + if/else + 调 API，功能上甚至是可以自己手写的）</p>
<h5 id="生产环境中-react-agent-必须解决的三类故障" tabindex="-1"><a class="header-anchor" href="#生产环境中-react-agent-必须解决的三类故障"><span><strong>生产环境中 ReAct Agent 必须解决的三类故障：</strong></span></a></h5>
<ol>
<li><strong>循环控制：</strong> 如何控制 迭代次数 和 超时时间？</li>
<li><strong>降级策略：</strong> 工具失败如何优雅降级，如何设置重试策略、备用路径？</li>
<li><strong>幻觉检测：</strong> Agent 声称观察到了工具根本没返回的内容</li>
</ol>
<p>单 Agent 循环的工程实现，看 OpenAI 开源的 <a href="https://link.zhihu.com/?target=https%3A//github.com/openai/codex" target="_blank" rel="noopener noreferrer">Codex CLI</a>（Rust 实现的终端编码 Agent）</p>
<p>OpenAI 专门写了一篇 <a href="https://openai.com/zh-Hans-CN/index/unrolling-the-codex-agent-loop/" target="_blank" rel="noopener noreferrer">Unrolling the Codex agent loop</a> 详细拆解其 Agent 循环的内部机制，从 Responses API 的 JSON 构造到 prompt caching 的工程细节全部公开。</p>
<h4 id="_1-2-plan-and-execute-架构" tabindex="-1"><a class="header-anchor" href="#_1-2-plan-and-execute-架构"><span>1.2 Plan and Execute 架构</span></a></h4>
<blockquote>
<p>先列计划再执行</p>
</blockquote>
<h4 id="_1-3-orchestrator-worker-架构" tabindex="-1"><a class="header-anchor" href="#_1-3-orchestrator-worker-架构"><span>1.3 Orchestrator-Worker 架构</span></a></h4>
<blockquote>
<p>一个协调Agent 分发子任务给多个专业的Sub Agent （Claude Research）</p>
</blockquote>
<img src="@source/ai/HelloAgents/img/research架构.webp" /> 
<p>读 <a href="https://link.zhihu.com/?target=https%3A//github.com/bytedance/deer-flow" target="_blank" rel="noopener noreferrer">DeerFlow</a> 源码，2026 年 2 月 v2.0 从零重写，基于 LangGraph + LangChain 构建。</p>
<p>它的核心架构是 Lead Agent 拆解任务 → 子 Agent 在 Docker 隔离容器中并行执行 → 结果回收拼装，配合持久化 Memory 和可扩展的 Skills 系统。</p>
<p><strong>价值在于：</strong> 这是一个<strong>真正的 Orchestrator-Worker 架构的生产实现</strong></p>
<ul>
<li>能看到 LangGraph 的图结构在实际多 Agent 编排中是怎么用的</li>
<li>子 Agent 的上下文隔离怎么做</li>
<li>Skills 怎么按需加载来控制 token 消耗</li>
</ul>
<h4 id="_1-4-evaluator-optimizer-架构" tabindex="-1"><a class="header-anchor" href="#_1-4-evaluator-optimizer-架构"><span>1.4 Evaluator-Optimizer 架构</span></a></h4>
<blockquote>
<p>一个Agent执行，另一个Agent评估并反馈建议</p>
</blockquote>
<p>四篇必读：</p>
<p><a href="https://arxiv.org/abs/2201.11903" target="_blank" rel="noopener noreferrer">Chain-of-Thought</a>（推理基础）</p>
<p><a href="https://arxiv.org/abs/2210.03629" target="_blank" rel="noopener noreferrer">ReAct</a>（Agent 工具调用开创性工作）</p>
<p><a href="https://arxiv.org/abs/2201.11903" target="_blank" rel="noopener noreferrer">Toolformer</a>（LLM 自主学习使用工具）</p>
<p><a href="https://arxiv.org/abs/2303.11366" target="_blank" rel="noopener noreferrer">Reflexion</a>（自我反思纠错）</p>
<p>系统论文：Generative Agents、HuggingGPT、Voyager。<a href="https://link.zhihu.com/?target=https%3A//lilianweng.github.io/posts/2023-06-23-agent/" target="_blank" rel="noopener noreferrer">Lilian Weng</a> 的 Agent 综述是领域被引用最多的文章</p>
<h3 id="_2-rag的坑" tabindex="-1"><a class="header-anchor" href="#_2-rag的坑"><span>2. RAG的坑</span></a></h3>
<h4 id="_2-1-切片" tabindex="-1"><a class="header-anchor" href="#_2-1-切片"><span><strong>2.1 切片</strong></span></a></h4>
<p><strong>80% 的 RAG 失败追溯到 chunking（文档切分）决策，而非检索或生成环节</strong> ， 切分策略对检索质量的影响 <strong>不亚于甚至超过 Embedding 模型</strong> 的选择</p>
<p>大多数人第一反应是 &quot;语义切分&quot;（semantic chunking，按语义相似度断句）肯定比&quot;按字符数固定切分&quot;效果好，毕竟名字听起来就更聪明，但 FloTorch 2026 年 2 月的 <a href="https://ragaboutit.com/the-2026-rag-performance-paradox-why-simpler-chunking-strategies-are-outperforming-complex-ai-driven-methods/" target="_blank" rel="noopener noreferrer">基准测试</a> 把这个直觉打了个粉碎。</p>
<p><strong>递归字符切分 512 tokens 以 69% 准确率排名第一</strong>，全面碾压语义切分。为什么？语义切分会产生 3-5 倍的向量碎片，平均 chunk 只有 43 个 token，检索召回率看起来高达 91.9%，但 <a href="https://blog.premai.io/rag-chunking-strategies-the-2026-benchmark-guide/" target="_blank" rel="noopener noreferrer">端到端回答准确率只有 54%</a> 比递归切分低了 15 个百分点。原因是 chunk 太短了，LLM 拿到一堆句子碎片根本拼不出完整答案。</p>
<h4 id="_2-2-embedding-漂移" tabindex="-1"><a class="header-anchor" href="#_2-2-embedding-漂移"><span><strong>2.2 Embedding 漂移</strong></span></a></h4>
<p>知识库嵌入一次之后，半年过去了，业务术语变了、新产品上线了、法规更新了，但向量是旧的，检索质量无声无息地退化，用户投诉增加但你完全不知道哪层出了问题</p>
<p><a href="https://brlikhon.engineer/blog/building-production-rag-systems-in-2026-complete-tutorial-with-langchain-pinecone" target="_blank" rel="noopener noreferrer">生产级RAG必做的事</a>：增量嵌入、监控余弦相似度分布变化、冷数据每季度重新嵌入、像管理源码版本一样管理 Embedding 模型版本</p>
<h4 id="_2-3-故障级联" tabindex="-1"><a class="header-anchor" href="#_2-3-故障级联"><span><strong>2.3 故障级联</strong></span></a></h4>
<p><strong>RAG 说到底是一条 pipeline：</strong></p>
<p><code v-pre>Query 分类 → 检索 → 重排序 → Context 组装 → 生成 → 验证</code></p>
<p>每层 95% 准确率听起来很高，五层串下来整体可靠性只有 81%</p>
<p><strong>90%</strong> 的 <strong>Agentic RAG</strong> 项目在生产环境失败，技术本身没有问题，问题出在工程师低估了每层故障的复合效应，这意味着你必须能对每层独立做可观测性，而不是出了问题 <mark>只知道 <strong>&quot;答案不对&quot;</strong> 却不知道是 <strong>检索错了</strong> 还是 <strong>生成幻觉了</strong></mark> 。</p>
<p><a href="https://github.com/vibrantlabsai/ragas" target="_blank" rel="noopener noreferrer">ragas - RAG评估工具</a>：量化 <strong>Faithfulness</strong>（是否忠于检索证据？） 和 <strong>Context Precision</strong>（检索回来的上下文是否真的相关？）</p>
<ul>
<li><strong>量化：</strong> 不是拍脑袋说“感觉还行”，而是给出可比较的分数</li>
<li><strong>Faithfulness <code v-pre>/ˈfeɪθf(ə)lnəs/</code>（忠实度）：</strong> 回答里的说法，有多少是能在检索到的 context 里找到依据的，<mark>即看 <strong>“生成有没有编”</strong></mark>
<ul>
<li>高：基本都“有据可查”</li>
<li>低：模型在瞎补、幻觉</li>
</ul>
</li>
<li><strong>Context Precision <code v-pre>/prɪˈsɪʒən/</code>（上下文精确率）：</strong> 检索返回的内容里，有多少是真正和问题相关、对回答有用的，<mark>即看 <strong>“检索有没有捞准”</strong></mark>
<ul>
<li>高：返回的段落大多有用</li>
<li>低：召回很多噪音，虽然也许夹杂少量有用信息</li>
</ul>
</li>
</ul>
<p>**举例：**用户问：A 产品的适用人群？检索回来 5 段，其中 2 段是 A 产品适用人群（有用），3 段是 B 产品介绍（无关）</p>
<p><strong>模型回答：</strong> 如果 <strong>回答只说了那 2 段</strong> 里确实写过的内容 -&gt; <strong>Faithfulness 高</strong>，但检索 <strong>5 段里只有 2 段有用 -&gt; Context Precision 偏低</strong></p>
<h4 id="_2-4-上下文幻觉" tabindex="-1"><a class="header-anchor" href="#_2-4-上下文幻觉"><span><strong>2.4 上下文幻觉</strong></span></a></h4>
<p><a href="https://blog.premai.io/building-production-rag-architecture-chunking-evaluation-monitoring-2026-guide/" target="_blank" rel="noopener noreferrer">Chroma 2025 年 7 月的研究</a> 测试了 18 个模型（包括 GPT-4.1、Claude 4、Gemini 2.5），发现随着上下文长度增加，<strong>所有模型的检索质量都在退化</strong>。更短更精确的上下文反而比灌 50K token 效果更好。实战建议是把组装后的上下文控制在 <strong>8K token 以内</strong>，超了说明你的重排序阈值太松了。</p>
<h4 id="_2-5-必须思考的问题" tabindex="-1"><a class="header-anchor" href="#_2-5-必须思考的问题"><span><strong>2.5 必须思考的问题</strong></span></a></h4>
<ul class="task-list-container">
<li class="task-list-item">
<p><input type="checkbox" class="task-list-item-checkbox" id="task-item-0" disabled="disabled"><label class="task-list-item-label" for="task-item-0"> ##### 不同文档类型（PDF、表格、代码）需要不同的切分策略，如何设计？</label></p>
</li>
<li class="task-list-item">
<p><input type="checkbox" class="task-list-item-checkbox" id="task-item-1" disabled="disabled"><label class="task-list-item-label" for="task-item-1"> <strong>混合检索（向量搜索 + BM25关键词搜索）在什么场景下 <mark>优于</mark> 纯向量检索？</strong></label></p>
</li>
<li class="task-list-item">
<p><input type="checkbox" class="task-list-item-checkbox" id="task-item-2" disabled="disabled"><label class="task-list-item-label" for="task-item-2"> <strong>怎么设计评估体系，用来在上线前发现检索退化？</strong></label></p>
</li>
<li class="task-list-item">
<p><input type="checkbox" class="task-list-item-checkbox" id="task-item-3" disabled="disabled"><label class="task-list-item-label" for="task-item-3"> <strong>怎么处理权限控制（谁能看到哪些文档）？</strong></label></p>
</li>
</ul>
</div></template>


