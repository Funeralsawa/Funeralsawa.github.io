const n=`---
# 可以选择的标签有：全部，IT，生活，学习，旅行，梦话，其他
TAGS: [IT, 学习]
AUTHOR: Aysel
TITLE: 粒子特效被覆盖
ABSTRACT: 介绍stacking context
IMG:
---
### 起因
起因是这样，我写了一个鼠标点击扩散粒子特效，在点击的位置会生成拥有随机方向，速度并往外扩散的粒子特效。特效在首页的演示效果是正常的，但是当我打开文章的时候粒子特效就会被文章的背景覆盖，尽管我给它设置了足够高的z-index。

### 过程
询问了GPT以及相关资料之后，了解到**层叠上下文（stacking context）**，才知道我的粒子特效被覆盖并不是z-index的问题，而是被其他元素的stacking context覆盖。

### stacking context
- 在浏览器里，HTML元素在屏幕上的显示顺序 是由 stacking context 决定的。

- 简单理解：<font color="red">**stacking context 是一个元素和它的子元素组成的独立层叠空间，这个空间内部的 z-index 可以相互比较，但不能直接跟外部的 stacking context 比较**</font>。

- 但**并不是所有的元素都会创建一个新的 stacking context**。例如 body 默认会创建 stacking context。

- 不同 stacking context 的 z-index 不可直接比较。除非它们同在一个父 stacking context 中。

### 生成 stacking context 的条件
一个元素满足下面任意条件就会创建 stacking context：
1. 根元素：\\<html> 本身就是 stacking context
2. position + z-index
3. opacity < 1
4. 任何 2D/3D transform
5. filter值不为“none”的元素
6. mix-blend-mode 属性值不为 "normal"的元素
7. flex / grid 子元素中某些属性
8. -webkit-overflow-scrolling 属性被设置 "touch"的元素

### 堆叠规则
在一个 stacking context 内的显示顺序（从下到上）：
1. 背景和边框
2. 负 z-index 元素
3. block块状盒子
4. float浮动盒子
5. inline/inline-block水平盒子
6. 普通流元素（z-index auto/0）
7. z-index: 正数元素
8. 子 stacking context 的 z-index 对应层

拥有相同 Stack Level 的 box，层叠顺序由 DOM 树顺序决定。

这里列出了八个，是为了把子元素加进去便于理解，而实际上应该是七层堆叠水平：  

<img src="https://pic1.imgdb.cn/item/6927145a3203f7be003455d8.png" width="500px">

<br>
<font color="red">重点是！</font>  

1. 外部 stacking context 的元素始终在内部 stacking context 的所有元素上层或下层

2. 所以即使内部元素 z-index = 9999，也可能被外部 stacking context 的元素遮住

例子：
\`\`\`html
<body>
  <div class="parent" style="position: relative; z-index: 1;">
    <div class="child" style="z-index: 1000;">child</div>
  </div>

  <div class="overlay" style="position: fixed; z-index: 10;">overlay</div>
</body>
\`\`\`
- .child z=1000 在 .parent 内部

- .overlay z=10 在外部 stacking context

- 最终 overlay 会盖住 child，因为 .overlay 在父 stacking context 外面

### 参考文献
- https://github.com/chokcoco/iCSS/issues/48`;export{n as default};
