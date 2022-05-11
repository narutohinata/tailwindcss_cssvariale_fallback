# tailwindcss_cssvariable_fallback

给`tailwindcss`中某些颜色属性添加降级选项。

## 安装

从npm上安装这个插件:

```sh
npm install -D tailwincss_cssvariable_fallback
```

然后添加这个插件到你的`tailwind.config.js`文件中
```js
// tailwind.config.js
module.exports = {
  theme: {
    // ...
  },
  plugins: [
    require('tailwincss_cssvariable_fallback'),
    // ...
  ],
}
```

## 用法
前提目前不支持JIT模式下的降级。因此你要使用某些颜色属性，同时希望触发降级特性，请在`tailwind.config.js`的`theme`中的`colors`属性中为它指定一个唯一的颜色名。例如:
```js
// tailwind.config.js

module.exports = {
  theme: {
    colors: {
      primary: '#04cb94',
    }
  }
}
```
现在如果你使用`bg-primary`为某个元素赋予背景颜色为`primary`会触发此插件，于是在生成的属性中你会看到
```css
.bg-primary {
  background-color: '#04cb94'
}
```

> 注意目前仅支持`bg-*`, `text-*`, `border-*`等属性, 对于`text-red-200/[0.2]`带透明度的写法，在tailwindcss v3中存在兼容问题，v3中这种写法会生成`rbg() with alpha`的css属性。例如: `text-red-200/20`会生成`color: rgb(254 202 202 / 0.2)`。这种写法IE是不兼容的，请考虑添加`postcss-color-rgb`插件到你的postcss配置中


## 新特性
目前支持`content`指令，为伪元素添加`content: " "`属性。你可以在任何使用`after`或者`before`的场景下使用`content`。以获得兼容IE的写法。

```html
<div class="after:conten">Demo</div>
```
将会生成
```css
.after\:content::after {
  content:" ";
}
```
