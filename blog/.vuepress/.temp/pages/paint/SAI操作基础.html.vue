<template><div><h2 id="sai-应用基础" tabindex="-1"><a class="header-anchor" href="#sai-应用基础"><span>SAI 应用基础</span></a></h2>
<h3 id="_1-新建图像" tabindex="-1"><a class="header-anchor" href="#_1-新建图像"><span>1. 新建图像：</span></a></h3>
<p><strong>尺寸</strong>：</p>
<ul>
<li><strong>B5</strong>：适合做练习</li>
<li><strong>A4</strong>：本子，商插等</li>
</ul>
<hr>
<h3 id="_2-快捷键" tabindex="-1"><a class="header-anchor" href="#_2-快捷键"><span>2. 快捷键：</span></a></h3>
<h4 id="_2-1-画布" tabindex="-1"><a class="header-anchor" href="#_2-1-画布"><span>2.1 画布</span></a></h4>
<p><strong>图像</strong>：图像大小一般不调整</p>
<p><strong>画布大小</strong>：一般使用延长，然后输入多少毫米即可</p>
<p><strong>水平翻转图层</strong>：<code v-pre>h</code></p>
<p><strong>垂直翻转图层</strong>：<code v-pre>y</code></p>
<p><strong>顺/逆 90 度旋转图层</strong>：正常给出的快捷键是<code v-pre>u | k</code>，但系统没配，这个和上面设置了都是固定的，下次打开图层不会还原</p>
<h4 id="_2-2-编辑" tabindex="-1"><a class="header-anchor" href="#_2-2-编辑"><span>2.2 编辑</span></a></h4>
<ul>
<li><strong>粘贴</strong>：<code v-pre>ctrl + v</code> 若剪贴板有图，或 setuna 这类的截图工具复制过，可以直接粘贴到图层</li>
<li><strong>撤销</strong>：<code v-pre>ctrl + z</code></li>
<li><strong>还原</strong>： <code v-pre>ctrl + y</code> 若中途有新动作发生，则会以新动作为基准覆盖原有动作</li>
<li><strong>剪贴</strong>：<code v-pre>ctrl + x</code> 和代码一样，常用于直接删除，比如像删除图中的某一部分，直接套索起来剪切掉，就等于删掉了</li>
<li><strong>填充</strong>： <code v-pre>ctrl+ f</code> 类似于油漆桶一样的存在</li>
</ul>
<h4 id="_2-3-选择" tabindex="-1"><a class="header-anchor" href="#_2-3-选择"><span>2.3 选择</span></a></h4>
<ul>
<li><strong>去掉选区</strong>：<code v-pre>ctrl + d</code> 套索工具、选区笔选中的区域</li>
<li><strong>反选</strong>：官方提示，未配置，选区时反向选择使用的</li>
<li><strong>选区边缘</strong>：<code v-pre>ctrl + h</code> 当需要选区状态，但不显示选区的虚线标识时使用</li>
<li><strong>扩大选区</strong>：和 PS 涂色技巧时一直，使用场景往往在上色边缘缺像素时，扩大那么一下子</li>
</ul>
<h4 id="_2-4-滤镜" tabindex="-1"><a class="header-anchor" href="#_2-4-滤镜"><span>2.4 滤镜</span></a></h4>
<ul>
<li><strong>调整色相饱和度</strong>：<code v-pre>ctrl + u</code>
<ul>
<li>色相：调整不同颜色的</li>
<li>饱和度：调整黑白还是鲜艳色彩</li>
<li>明度：调整效果变黑还是变白</li>
</ul>
</li>
<li><strong>亮度/对比度</strong>：
<ul>
<li>对比度：用于形成鲜明对比
<ul>
<li>亮 | 饱和度<strong>高</strong>的地方，更亮|鲜艳，</li>
<li>暗 | 饱和度<strong>低</strong>的地方，更暗淡</li>
</ul>
</li>
<li>颜色浓度：调整颜色的纯度</li>
</ul>
</li>
</ul>
<h4 id="_2-5-视图" tabindex="-1"><a class="header-anchor" href="#_2-5-视图"><span>2.5 视图</span></a></h4>
<ul>
<li><strong>新建视图</strong>：原封不动的复制了一份工作区</li>
<li><strong>关闭</strong>：关闭当前所在的工作区</li>
<li><strong>全部关闭</strong>：关闭所有工作区</li>
</ul>
<h4 id="_2-6-窗口" tabindex="-1"><a class="header-anchor" href="#_2-6-窗口"><span>2.6 窗口</span></a></h4>
<ul>
<li>
<p><strong>色轮</strong>：上色用的一定要打开</p>
</li>
<li>
<p><strong>RGB</strong>：调色常用</p>
</li>
<li>
<p><strong>HSV</strong>：分别对应色相、饱和度、明度</p>
</li>
<li>
<p><strong>灰度滑块</strong>：画漫画的才用</p>
</li>
<li>
<p><strong>色盘</strong>：保留调好的颜色的，右键即可添加删除，赶单子使用</p>
</li>
<li>
<p><strong>调色盘</strong>：顾名思义，调色使用的（鸡肋功能，直接新建图层调色更合适直观）</p>
</li>
<li>
<p><strong>导航器</strong>：局部显示整体（小图显示整个画面）</p>
</li>
<li>
<p><strong>快捷工具/视图选择栏</strong>：打开就好</p>
</li>
<li>
<p><strong>状态栏</strong>：显示内存负荷率等（负荷率 8~90 的时候，合并图层就可能会失败）</p>
</li>
<li>
<p><strong>笔刷工具显示笔刷大小、原点光标</strong>：都打开就好</p>
</li>
<li>
<p><strong>隐藏控制面板、全屏: TAB/F11 (F11 + TAB)</strong> 整个屏幕都清净了</p>
</li>
</ul>
<h4 id="_2-7-其他" tabindex="-1"><a class="header-anchor" href="#_2-7-其他"><span>2.7 其他</span></a></h4>
<ul>
<li><strong>选项</strong>：最大图像尺寸可以设置 <code v-pre>10000*10000</code> 这个可以提高 <code v-pre>sai</code> 的运行速度，数位板和工具可以不用调</li>
</ul>
<h4 id="_2-8-自定义" tabindex="-1"><a class="header-anchor" href="#_2-8-自定义"><span>2.8 自定义</span></a></h4>
<blockquote>
<p>以下为自设快捷键，部分保留与 <strong>PS</strong> 一致，便于通用</p>
</blockquote>
<ul>
<li><strong>笔</strong>： <strong>n</strong></li>
<li><strong>水彩笔： c</strong></li>
<li><strong>喷枪：b</strong></li>
<li><strong>铅笔：n</strong></li>
<li><strong>套索：l</strong></li>
<li><strong>魔棒：w</strong></li>
<li><strong>色差范围</strong>：表示色差范围越大，选区颜色时越笼统 <strong>20 左右</strong>比较合适</li>
<li><strong>选区来源</strong>：可见图像，便于选画面上的所有可见图层</li>
<li><strong>旋转：r</strong></li>
<li><strong>橡皮擦：e</strong></li>
<li><strong>吸取：i，<strong>或是在任意笔的状态下，按</strong>alt</strong></li>
<li><strong>放大：z</strong></li>
<li><strong>缩小：g</strong></li>
<li><strong>切换前/背景色：x</strong> （据说透明色画透过头发的皮肤有奇效）</li>
</ul>
<hr>
<h3 id="_3-属性" tabindex="-1"><a class="header-anchor" href="#_3-属性"><span>3 属性：</span></a></h3>
<h4 id="_3-1-常用效果" tabindex="-1"><a class="header-anchor" href="#_3-1-常用效果"><span>3.1 常用效果</span></a></h4>
<ul>
<li>
<p><strong>混合模式</strong>: 比 ps 要少很多很多</p>
</li>
<li>
<p><strong>正片叠底</strong>：颜色叠加/加深，通常来找暗部色，之后留下深色痕迹，浅颜色不会被叠加变浅，最浅就是用白色叠加，效果是未进行叠加的效果，相当于叠加色的橡皮擦。</p>
</li>
<li>
<p><strong>滤色</strong>：整体发白，与正片叠底相反，用同样颜色叠加变浅，用白色直接变白</p>
</li>
<li>
<p><strong>覆盖</strong>：使饱和度更高，色彩更鲜艳，暗的地方更暗，亮的地方更亮（头发边缘渐变色）</p>
</li>
<li>
<p><strong>发光</strong>：使明度提高，若黑色发光，则为橡皮擦，实际上是曝光效果（比 ps 线性减淡好）</p>
</li>
<li>
<p><strong>阴影</strong>：相当于加深版本的正片叠底，白色为橡皮擦</p>
</li>
<li>
<p><strong>明暗</strong>：相当于加深版本的覆盖，但区别在于极端情况会直接纯黑纯白</p>
</li>
<li>
<p><strong>黑白</strong>：不透明度 100 就几乎全黑，切割用的</p>
</li>
</ul>
<h4 id="_3-2-画材效果" tabindex="-1"><a class="header-anchor" href="#_3-2-画材效果"><span>3.2 画材效果</span></a></h4>
<blockquote>
<p>几乎用不到，做效果用 ps 即可</p>
</blockquote>
<ol>
<li><strong>画纸质感</strong>：改变画布质地，通常厚涂或提高画面塑造效果才使用（画面单薄添加质感）</li>
<li><strong>画材效果</strong>：水彩边缘，边缘就会有像画水墨画的黑边，不融入画面的颜料感觉</li>
</ol>
<blockquote>
<p><strong>注</strong>：以上属性均可叠加，画材效果可网上扩展</p>
</blockquote>
<h4 id="_3-3-各类笔属性" tabindex="-1"><a class="header-anchor" href="#_3-3-各类笔属性"><span>3.3 各类笔属性</span></a></h4>
<h5 id="铅笔" tabindex="-1"><a class="header-anchor" href="#铅笔"><span>铅笔</span></a></h5>
<ul>
<li>
<p><strong>形状</strong>：比较硬的时候，比如勾线，用后两个形状，前两个画比较软的物体，比如球</p>
</li>
<li>
<p><strong>最小直径</strong>：控制笔头大小</p>
<ul>
<li>针管：笔放大，最小直径 0，能画出纤细类似头发的线条</li>
<li>超细笔：笔缩到极小，最小直径 100，笔压（笔刷浓度 90+、边缘硬度 0、最小浓度 0）去掉，可以用于勾线</li>
</ul>
</li>
<li>
<p><strong>笔刷浓度</strong>：控制笔刷的出墨量</p>
</li>
<li>
<p><strong>边缘硬度</strong>：控制边缘软件程度（边缘减淡程度），（无锯齿）</p>
</li>
<li>
<p><strong>最小浓度</strong>：使用最轻的力气画出来的浓度，赛璐璐上色直接拉满 100（非常坚硬）</p>
</li>
<li>
<p><strong>最大浓度笔压</strong>：控制出墨量的笔压，通常为 100 不动</p>
</li>
<li>
<p><strong>笔压</strong>（软-&gt;硬）：控制笔的压感，通常 40 左右</p>
</li>
</ul>
<p><strong>喷枪</strong>：</p>
<p>其实和笔一样，只是部分数值不同</p>
<p><strong>笔：</strong></p>
<ul>
<li><strong>混色</strong>：数值越大，颜色越容易搅在一起</li>
<li><strong>水分量</strong>：数值越大，想水彩的水沿出效果越强</li>
<li><strong>色延伸</strong>：在同颜色的基础上向外部延伸，用于延展颜色（比较鸡肋）</li>
<li><strong>维持不透明度</strong>：勾选后稀释颜色比较少（比较鸡肋）</li>
<li><strong>模糊笔压</strong>：使颜色变得模糊（比较鸡肋，鬼刀等绘画风格，场景焦距等地方使用）</li>
</ul>
<p>通常混色+水分量即可完成各种效果</p>
<p><strong>马克笔：</strong></p>
<p>色块、单色涂鸦常用，阴影效果特别好</p>
<p>**注意：**笔的正片叠底不建议使用</p>
</div></template>


