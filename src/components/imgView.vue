<!--
 * @Descripttion: 
 * @version: 0.1
 * @Author: 飘逸跑酷
 * @Date: 2019年12月5日20:28:37
 * @LastEditors: 飘逸跑酷
 * @LastEditTime: 2019年12月5日20:44:47
 -->
<template>
  <div class="imgs_view" v-show="layer.show">
    <div class="mask" @click="close" />
  </div>
</template>

<script>
  export default {
    components: {

    },
    props: {
      'layer': {
        type: Object,
        default: () => {
          return {
            show: false,
            active: '',
            data: []
          }
        }
      }
    },
    data() {
      return {
        
      }
    },
    watch: {

    },
    mounted() {
      
    },
    methods: {
      
    }
  }
</script>

<style scoped="" lang="scss">
  .imgs_view{
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 3000;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    .mask{
      width: 100%;
      height: 100%;
      position: absolute;
      background-color: #000;
      opacity: 0.9;
    }
  }
</style>
