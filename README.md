# vue-lookimg

# 简介

插件：vue-lookimg

作者：罗茜

版本：0.1.0

描述：图片预览插件，是一款专注于vue上图片预览功能的插件，更多功能，欢迎扩展

功能：

1. 图片的大屏预览，
2. 图片的切换，
3. 图片的拖拽、缩放、旋转
4. 图片自动生成可访问二维码

![预览图片](http://blog.51weblove.com/blog/wp-content/uploads/2019/12/2019121215373484.png)

# 如何使用

## 安装

```
npm install vue-lookimg --save // npm 安装
cnpm install vue-lookimg --save // cnpm 安装
yarn add vue-lookimg // yarn 安装
```

## 全局调用

在main.js中

```
import vueLookimg from 'vue-lookimg'
Vue.use(vueLookimg)
```

## 局部调用

```
import vueLookimg from 'vue-lookimg'
...
components: {
    vueLookimg
}
```

## 具体使用

在具体组件中使用，

插件可自动监听**show**、**active**、**data**值的动态变化，并做出实时响应

即可随时修改这三个参数的值，插件均能自动监听到变化。

```
<template>
	<vue-lookimg :layer="layer" />
</template>

<script>
export default {
  data() {
    return {
      layer: {
        show: false,
        active: '',
        data: []
      }
    }
  },
  methods: {
      // 打开弹窗
    openView() {
      this.layer.show = true
      this.layer.active = 'http://blog.51weblove.com/blog/wp-content/uploads/2018/12/2018120513264371.jpg'
      this.layer.data = [
        'http://blog.51weblove.com/blog/wp-content/uploads/2018/12/2018120513264371.jpg',
        'http://blog.51weblove.com/blog/wp-content/uploads/2018/12/2018120513104820.jpg',
        'http://blog.51weblove.com/blog/wp-content/uploads/2018/12/2018120513105920.jpg',
        'http://blog.51weblove.com/blog/wp-content/uploads/2019/03/2019032323443850.jpg'
      ]
    }
  }
}
```

## 参数说明

```
layer: {
    show: false, // 开启或关闭图片预览组件
    data: [],  // 所有的图片地址集合
    active: '' // 当前应该展示的图片地址
}
注：只有单张图片时可不传data属性，即可实现单图展示的效果
```



# 备注信息

## 公用组件实现解析

暂无地址

## github

master版本：https://github.com/cmdparkour/vue-imgView.git

插件版本：https://github.com/cmdparkour/vue-imgView.git

### blog

http://blog.51weblove.com
