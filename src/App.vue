<template>
  <div id="app">
    <hello-world />
  </div>
</template>

<script>
import helloWorld from './components/HelloWorld'
export default {
  components: {
    helloWorld
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

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
