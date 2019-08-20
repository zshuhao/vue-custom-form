# 前端开发规范

## Table of Contents
  1. [命名](#命名)
  1. [注释](#注释)
  1. [版本规范](#版本规范)
  1. [空格&空行](#符号空格空行)
  1. [异常处理](#异常处理)
  1. [优化点](#优化点)
  1. [附录](#附录)
  
  

# 命名

`关键词`：英文单词，驼峰(首字母小写)，语义化，TAB缩进(4格,IDE可设置)

`目标`：统一标准，降低代码理解成本，友好团队合作    

<br>
<a name="type--Project"></a><a name="1.1"></a>
  - [1.1](#type--Project) **Project & file** 
  
  首字母小写，驼峰命名，语义化


<br>
<a name="type--html"></a><a name="1.2"></a>
  - [1.2](#type--html) **HTML** 
  
  > `ID`    
    首字母小写，驼峰命名，语义化  
	js程序和样式不共用相同的id
  注：<span style="color: red;">非必须的情况下，不得使用ID，因为ID会产生全局变量</span>

```html
	<div id="demoText">我是栗子</div>
```

  
  > `Class`    
    **样式相关**：小写单词，语义化，多个单词间用连字符连接  
	**js程序绑定相关**：’js-’开头，小写单词，语义化，多个单词间用连字符连接  
	**js程序和样式不共用相同的class**


```html
	<div class="submit-button js-submit">我是一个提交按钮</div>
```
```
<view class="payment-list-seat">
    <view class="payment-list-seat-type">一等座</view>
    <view class="payment-list-seat-price">¥104.5</view>
</view>
```
  > `other`    
    标签名语义化，小写字母  
	标签属性名采用小写字母，属性值用双引号括起


```html
	<a href="http://www.baidu.com">点我跳转</a>
```
<br>
<a name="type--css"></a><a name="1.3"></a>
  - [1.3](#type--css) **CSS**     
    class: 小写单词,多个单词间用连字符连接  
    不要对绑定js程序的class或者id添加样式  
    其他非必要，不要为class添加类型选择器的限定，`css不使用ID选择器` 

	```
	div#demoId (not recommend) ,  p.demo (bad), .demo (good)
    ```
    
<br>
<a name="type--js"></a><a name="1.4"></a>
  - [1.4](#type--js) **JS**     
   
> 函数方法

> 一般方法，首字母小写，驼峰命名

```javascript
    	function demoFunc() {
    		console.log('I am a demo function');
    	}
```  
> 构造方法/类，首字母大写，驼峰命名
```javascript
    	function DemoClass() {
            this.type = 'class';
        };
        
        DemoClass.prototype.demoFunc = function() {
            console.log('I am a demo function of DemoClass');
        }
```  
> 私有函数，单个下划线开头，首字母小写，驼峰命名(仅建议)
```javascript
    	function _privateFunc() {
           console.log('I am a private function called by');
       }
```  

>  `上下文this`  

    使用箭头函数避免改变this,一定要使用function是，用 _this = this,避免混乱 

    回调函数不允许使用function，替换为 () => {}
```javascript
    wx.showToast({
      title: '我是一个toast'
      success: () => {
        // TODO
      }
    })
    this.$ajax().then(res => {
      // TODO
    })
```



>  `变量` 
    
    首字母小写，驼峰命名，语义化--见名知意，要根据函数或者事件的名称判断出大致要干什么事情，英文单词
    
```javascript
    	let usualParam = '我是一般变量';
```
    
    *iOS在变量名中小写第一个，大写后两个字母  
	Android在变量名中大写第一个字母  
	JQuery,Zepto对象必须以`$`开头命名*

> `常量`
    
    大写英文单词，多个单词之间用下划线连接，并添加对应注释
```javascript
    	const CONSTANT_VALUE = '我是常量值'; // 这是个常量命名例子
```
    [`建议`]业务中使用到的写死的内容都在用这种常量统一配置，方便管理维护，有统一收口的地方更好
    
> `数组、对象`
    
    对象属性名字不需要加引号（分开的单词作为属性名例外）
    
   <br>
   <a name="type--vue"></a><a name="1.5"></a>
  - [1.5](#type--vue) **VUE**   

    [`建议`]props定义中添加上类型的形式，方便使用者一目了然和添加默认值
```javascript
    	props: {
				demo: {
					type: String,
					default: ''
				}
			}
```
    
    [`建议`]使用组件的时候采用小写单词，多个单词间用连字符连接
```html
components: {
	DemoComponent
}
<demo-component></demo-component>
```
    

**[⬆ back to top](#table-of-contents)**


# 注释

`关键词`：区块注释，行注释

`目标`：降低代码理解成本，友好团队合作；帮助梳理代码逻辑，清晰实现思路    

<br>
<a name="note--file"></a><a name="2.1"></a>
  - [2.1](#note--file) **文件注释（可以配置IDE来统一实现）** 

  位于文件开头，声明文件作者、创建时间、简介

  ```javascript
    /**
    * @desc File Info
    * @author Author Name
    * @date 2015-10-10
    */
  ```

<br>
<a name="note--JS"></a><a name="2.2"></a>
  - [2.2](#note--JS) **JS注释** 

  > `函数方法/类`  
  
  每个函数（类）声明处前都应当加上注释，描述函数（类）的功能和用途用法，除非一目了然的函数

  注释的内容：  
    a）函数名称  
    b）函数描述  
    c）函数的输入输出  
    d）函数的参数及其意义  
    e）函数的属性（private……）  
    f）[建议]使用demo  

  ```javascript 
      /**
      * 函数功能简述
      *
      * 具体描述一些细节
      *
      * @param    {string}  address     地址
      * @param    {array}   com         商品数组
      * @param    {string}  pay_status  支付方式
      * @returns  void
      *
      * @date     2014-04-12 00:00:00
      * @author  Author Name<author@email.com>
      */
  ```
  *如sublime: Docblockr(可配置)*

  > `TODO注释`   

  对于待完善、优化的解决方案，添加TODO注释  
  注释内容：待完善的内容，也可以加上添加注释或执行的人  

  ```javascript 
    // TODO: remove the 'Last visitors' feature
  ```

  > `变量注释`   

  全局变量：说明该全局含义及用途, 以及作为全局变量的原因  
  注释内容：待完善的内容，也可以加上添加注释或执行的人  

  ```javascript 
    const TEST_TOTAL_NUM = 6; // The total number of tests cases that we run through in this regression test
  ```

  > `代码中的注释`   

  **代码块在其上面单行注释**，内容多的话使用多行注释  
  巧妙或复杂的代码段前要加注释
  隐晦的地方要在行尾加入注释，注释前空一格

<br>
<a name="note--css"></a><a name="2.3"></a>
  - [2.3](#note--css) **CSS注释**   

  大文件中，说明每一块样式的功能作用
  ```
  /* bof BLOCK_NAME */
  内容区
  /* eof BLOCK_NAME */
  ```
<br>
<a name="note--html"></a><a name="2.4"></a>
  - [2.4](#note--html) **HTML注释**   

  说明一个模块的作用
  ```html
    <!-- Comment Text —>
    <div>..</div>
  ```

**[⬆ back to top](#table-of-contents)**

# 版本规范

## git分支使用规范

- 发布功能使用对应的release分支，新功能新建feature分支
- 开发时从目标分支上检出子分支，功能完成后合并到目标分支

## Git Commit Message规范
参考[AngularJS Git Commit Message Conventions](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit#heading=h.t7ifoyph8bd3)。
做简化处理，基本格式为：
```
<type>: <subject>
<BLANK LINE>
<body>
```

- **type**用于说明commit的类别，枚举值包括

```
feat：新功能（feature）
fix：修补bug
docs：文档（documentation）
style： 格式（不影响代码运行的变动）
refactor：重构（即不是新增功能，也不是修改bug的代码变动）
perf: 项目性能相关优化,
test: 增加测试相关脚本,
build: 增加构建相关脚本,
ci: 修改最后一次提交记录,
chore: 构建过程或辅助工具的变动,
revert: 恢复或回滚
```

- **subject**是commit目的的简短描述，不超过50个字符，不可空。
- **Body**部分是对本次commit的详细描述，可以分成多行，可为空。

栗子
```
feat: 增加路由配置

- 创建模板
- 查看模板列表
- 接入模板
```

中文介绍参考
[Commit message 和 Change log 编写指南](http://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html)
<br>
**[⬆ back to top](#table-of-contents)**
<br>

# 符号空格空行

<br>
<a name="symbols--operator"></a><a name="3.1"></a>
  - [3.1](#symbols--operator) **运算符** 

  运算符前后用一个空格来保持表达式的整洁(模板中的=除外)

  ```javascript
    var i = x || 0;
    var len = items ? items.length : 0;
    if(a === 1 && b > 2) {
      for(i; i <= len; i++) {
      }
    }
  ```
<br>
<a name="symbols--brace"></a><a name="3.2"></a>
  - [3.2](#symbols--brace) **大括号** 

  大括号缩进对齐，其左边是)时，前面加一个空格

  ```javascript
    function test() {
        while(n > 1) {}
    }
  ```
<br>
<a name="symbols--curves"></a><a name="3.3"></a>
  - [3.3](#symbols--curves) **圆括号** 

  圆括号间距：紧接左括号之后和紧接右括号之前不应该有空格

  ```javascript
    if(flag && (count > 5)) {
        var isShow = ((a === 1 && b === 2) || (c === 3 && d === 4))
    }
  ```
<br>
<a name="symbols--comma"></a><a name="3.4"></a>
  - [3.4](#symbols--comma) **逗号** 

  逗号:参数列表中之后应当保留一个空格

  ```javascript
    function comma(x, y, z) {
        test(x, y, z);
    }
  ```
<br>
<a name="symbols--quotes"></a><a name="3.5"></a>
  - [3.5](#symbols--quotes) **引号** 

  JS和CSS文件字符串使用单引号 ' '  
  **HTML等模板文件中使用 双引号 " "**  
  对象字面量每个属性的key值不含引号


  ```javascript
    var name = 'quotation';
    var age = 18;
    
    // bad
    var person = {
        'name': name,
        'age': age
    }

    //good
    var person = {
        name,
        age
    }
  ```
<br>
<a name="symbols--colon"></a><a name="3.6"></a>
  - [3.6](#symbols--colon) **冒号** 

  冒号：后面加上一个空格(除时间格式16:48:37这样的除外)

  ```javascript
    var obj = {
        a: 1,
        b: 2,
        getA: function() {
          return this.a != 0 ? this.a : this.b;
        }
    }
  ```
<br>
<a name="symbols--semicolon"></a><a name="3.7"></a>
  - [3.7](#symbols--semicolon) **分号** 
  <br>
  在vue项目中省略分号，不做强制要求
  <br>

<br>
<a name="symbols--semicolon"></a><a name="3.8"></a>
  - [3.8](#symbols--semicolon) **空格** 

  在使用长方法链或者多条件判断逻辑时 进行缩进  

  ```javascript
    var leds = stage.selectAll('.led')
        .data(data)
      .enter().append('svg:svg')
        .classed('led', true)
        .attr('width', (radius + margin) * 2)
      .append('svg:g')
        .attr('transform', 'translate(' + (radius + margin))
        .call(tron.led);

    data.shouldLoadAnimation =  
      (data.isGrabOrder === 0 && data.isOnlineTicket === 0)
      && ((data.placeForNight === 0 && data.orderStatus === '占座中') 
      || (data.isChangeTicket === 1 && data.orderStatus === '占座中') 
      || (data.placeForNight === 2 && data.orderStatus === '出票中'));
  ```
  注释符号前后各间隔一个空格
  ```javascript
    <template>
        <!-- nav module -->
        <Nav></Nav>

        <!-- temp component -->
        <Aside></Aside>
    </template>

    <script type="text/javascript">
        var x = 0;  // init value is better
        var y; 

        /**
        * name: blankLine
         * date: 2017.6.2 17:53
         * ...
         */
        function blankLine(x, y, z) {
            test(x, y, z);
        }

        // execute it
        blankLine();

    </script>

    <style type="text/css">
        .nav-bar {
            min-width: 200px; /* adjust mini device */
        }
    </style>
  ```
<br>
<a name="symbols--Blank"></a><a name="3.9"></a>
  - [3.9](#symbols--Blank) **空行** 

**[⬆ back to top](#table-of-contents)**

  
# 异常处理

<br>
<a name="exception--handling"></a><a name="4.1"></a>
  - [4.1](#exception--handling) **异常处理** 

**在JS代码中，对于一些可能会有异常的操作或者导致未知结果的，使用try catch语句和自定义异常来处理，使代码更健壮。**  

  ```javascript
    try {
        doSomeThing();
    } catch(e) {
        console.log(e.stack);
    } finally() {
        // ..
    };
      
    if(para === 'undefined') {
        throw 'para must be defined line:86 at fileA.js';
    }
  ```

**[⬆ back to top](#table-of-contents)**

# 优化点

<br>
<a name="optimize--Object"></a><a name="5.1"></a>
  - [5.1](#optimize--Object) **Object** 

  不使用 new 关键字  
  不使用保留字作为键值  
  

  ```javascript
    // bad
    var obj = new Object({
        a: 1,
        class: 'type'
    })

    // good
    var obj = {
        a: 1,
        type: 'type'
    }
  ```
<br>
<a name="optimize--Array"></a><a name="5.2"></a>
  - [5.2](#optimize--Array) **Array** 

   不使用 new 关键字  
   当你需要复制一个数组时，使用数组的slice方法  
  

  ```javascript
    itemsCopy = items.slice();
  ```
 把“类似数组对象”转为数组时，使用数组的slice方法
  ```javascript
    function arrayLike() {
      var args = Array.prototype.slice.call(arguments);
      ...
    }
    ES6: Array.from();
  ```
<br>
<a name="optimize--Function"></a><a name="5.3"></a>
  - [5.3](#optimize--Function) **Function** 

   + 不要直接在非函数块（if，while等）里声明一个函数，最好将函数赋值给一个变量。虽然浏览器允许你在非函数块中声明函数，但是由于不同的浏览器对Javascript的解析方式不同，这样做就很可能造成麻烦  
   + 不要将参数命名为arguments，它将在每个函数的作用范围内优先于arguments对象  
   + 函数在定义变量或者属性之后  
   + 匿名函数表达式提升变量名，但函数赋值并没有提升
   + 函数声明能提升他们的函数名和函数体
  
<br>
<a name="optimize--CSS"></a><a name="5.4"></a>
  - [5.4](#optimize--CSS) **CSS书写顺序**   
     顺序从上到下：
   + 位置属性(position, top, right, z-index, display, float等)  
   + 大小(width, height, padding, margin)  
   + 文字系列(font, line-height, letter-spacing, color- text-align等)  
   + 背景(background, border等)  
   + 其他(animation, transition等)

<br>
<a name="optimize--ES6"></a><a name="5.5"></a>
  - [5.5](#optimize--ES6) **ES6** 

   使用 `… `拓展运算符而不是Object.assign()来实现对象的浅拷贝
  
   ```javascript
    // bad 
    const original = { a: 1, b: 2 };
    const copy = Object.assign({}, original, { c: 3 }); // copy => { a: 1, b: 2, c: 3 }
    delete copy.a; 
      
    // good 
    const original = { a: 1, b: 2 }; 
    const copy = { ...original, c: 3 }; // copy => { a: 1, b: 2, c: 3 }  
    const { a, ...noA } = copy; // noA => { b: 2, c: 3 }
  ```

<br>
<a name="optimize--cache"></a><a name="5.6"></a>
  - [5.6](#optimize--cache) **合理使用缓存**   
   + 缓存循环的数组长度
   + 缓存dom查询需要多次操作的对象
   + 缓存需要经复杂计算得到的变量

<br>
<a name="optimize--module"></a><a name="5.7"></a>
  - [5.7](#optimize--module) **组件化/模块化开发思想**   
   + 一个function只负责一件事情 
   + 一个文件只关注一个具体业务的实现 
   + 重复的代码抽取出来      


**[⬆ back to top](#table-of-contents)**

# 参考附录

1. https://github.com/airbnb/javascript
1. https://www.kancloud.cn/digest/code-guide/42605
1. https://my.oschina.net/lianyi/blog/48955
1. https://guide.aotu.io/docs/css/note.html
1. https://segmentfault.com/a/1190000006130628 


