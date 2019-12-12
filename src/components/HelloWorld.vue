<template>
  <div class="hello">
    <h3 @click="openView" style="cursor: pointer;">点我查看图片预览组件</h3>
    <vue-lookimg :layer="layer" />
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
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
        'http://blog.51weblove.com/blog/wp-content/themes/grace8.2.1/timthumb.php?src=http://blog.51weblove.com/blog/wp-content/uploads/2019/12/2019120611565250.jpg&h=284&w=710&zc=1',
        'http://blog.51weblove.com/blog/wp-content/themes/grace8.2.1/timthumb.php?src=http://blog.51weblove.com/blog/wp-content/uploads/2019/12/2019120511570034-e1575518238834.jpeg&h=284&w=710&zc=1',
        'http://blog.51weblove.com/blog/wp-content/uploads/2018/12/2018120513104820.jpg',
        'http://blog.51weblove.com/blog/wp-content/uploads/2018/12/2018120513105920.jpg',
        'http://blog.51weblove.com/blog/wp-content/uploads/2019/03/2019032323443850.jpg'
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
