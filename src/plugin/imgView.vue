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
    <!-- 右上角Buttons -->
    <div class="right_button">
      <!-- 二维码功能区 -->
      <div class="qrcode_all" @mouseover="showCode = true" @mouseleave="showCode = false">
        <i class="iconfont iconshouji" />
          <i class="iconfont iconsanjiaoxing" v-show="showCode"></i>
          <div class="qrcode_show" v-show="showCode">
            <canvas id="qrcode" ref="qrcode"></canvas>
            <p>扫描二维码查看图片</p>
          </div>
      </div>
      <!-- 关闭功能区 -->
      <i class="iconfont iconguanbi" @click="close" />
    </div>
    <!-- 核心区 -->
    <div class="view_main">
      <!-- 图片主展示区 -->
      <div class="showimg">
        <img
          :src="layer.active"
          id="image"
          ref="image"
          @mousedown='mousedown($event)'
          :style="{ 'transform': 'scale(' + scale + ') rotate(' + rotate + 'deg)', 'marginLeft': marginLeft + 'px', 'marginTop': marginTop + 'px' }"
        >
      </div>
      <!-- 左切换按钮 -->
      <div class="left item" @click="previousOne" v-if="layer.data.length > 1">
        <i class="iconfont iconright" :class="{ 'disabled': layer.active === layer.data[0] }"></i>
      </div>
      <!-- 右切换按钮 -->
      <div class="right item" @click="nextOne" v-if="layer.data.length > 1">
        <i class="iconfont iconright1" :class="{ 'disabled': layer.active === layer.data[layer.data.length - 1] }"></i>
      </div>
    </div>
    <!-- 下方操作区 -->
    <div class="operation">
      <!-- 第一部分 -->
      <div class="operate_area">
        <i class="iconfont iconfangda" title="放大" @click="enlarge"></i>
        <i class="iconfont iconsuoxiao" title="缩小" @click="narrow"></i>
        <i class="iconfont iconhuifumorendaxiao" title="恢复" @click="recovery"></i>
        <i class="iconfont iconzuoxuanzhuan" title="左旋转" @click="turnLeft"></i>
        <i class="iconfont iconyouxuanzhuan" title="右旋转" @click="turnRight"></i>
        <span class="line" v-if="layer.data.length > 1">|</span>
        <span class="thumb_show_button" @click="changeExpand" v-if="layer.data.length > 1">{{ expandStatus.title }}<i :class="expandStatus.icon"></i></span>
      </div>
      <!-- 第二部分 -->
      <div class="thumb_wrap" :class="{ 'active': expandStatus.show }">
        <i class="iconfont iconright" @click="previousPage" :class="{ 'disabled': page.pageIndex === 1 }"></i>
        <ul>
          <li
            v-for="(item, key) in layer.data"
            :key="key"
            v-if="((page.pageIndex - 1) * page.pageSize) <= key && key < (page.pageIndex * page.pageSize)"
            :class="{ 'active': item === layer.active }"
            @click="changeActive(item, key)"
          >
            <img :src="item" alt="">
          </li>
        </ul>
        <i class="iconfont iconright1" @click="nextPage" :class="{ 'disabled': page.pageIndex === Math.ceil(layer.data.length / page.pageSize) }"></i>
      </div>
    </div>
  </div>
</template>

<script>
  import QRCode from 'qrcode'
  export default {
    name: 'vue-imgview',
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
        showCode: false,
        // 当前缩放大小
        scale: 1,
        // 当前旋转大小
        rotate: 0,
        // 左移距离
        marginLeft: 0,
        // 上移距离
        marginTop: 0,
        imgloading: false,
        expandStatus: {
          show: false,
          title: '展开缩略图',
          icon: 'iconfont iconsanjiaoxing',
        },
        page: {
          pageIndex: 1,
          pageSize: 20
        },
      }
    },
    watch: {
      'layer.active'(newVal) {
        this.useqrcode()
        this.initMargin()
        let data = this.layer.data
        for (const i in data) {
          if (newVal === data[i]) {
            // 处理page参数
            this.page.pageIndex = parseInt(Math.ceil((parseInt(i) + 1) / this.page.pageSize))
          }
        }
      },
      'layer.show'(newVal) {
        if (newVal) {
          this.scale = 1
          this.rotate = 0,
          this.initMargin()
        }
      }   
    },
    mounted() {
      this.useqrcode()
      this.initMargin()
      this.handleMouse()
      this.handleESC()
      this.handleLeftRight()
    },
    methods: {
      close() {
        this.layer.show = false
      },
      // 修改二维码
      useqrcode() {
        let canvas = this.$refs.qrcode
        QRCode.toCanvas(canvas, this.layer.active, function () {

        })
      },
      // 根据图片大小初始化marginTop和marginLeft
      initMargin() {
        let dom = this.$refs.image
        if (dom.width && dom.height) {
          this.marginLeft = -dom.width/2
          this.marginTop = -dom.height/2
        } else {
          dom.onload = () => {
            this.marginLeft = -dom.width/2
            this.marginTop = -dom.height/2
          }
        }
      },
      // 上一个
      previousOne() {
        let data = this.layer.data
        for (const i in data) {
          if (data[i] === this.layer.active) {
            if (parseInt(i) !== 0) {
              this.layer.active = data[parseInt(i) - 1]
            }
            return
          }
        }
      },
      // 下一个
      nextOne() {
        let data = this.layer.data
        for (const i in data) {
          if (data[i] === this.layer.active) {
            if (parseInt(i) !== data.length - 1) {
              this.layer.active = data[parseInt(i) + 1]
            }
            return
          }
        }
      },
      // 鼠标拖动事件
      mousedown(e) {
        e.preventDefault()
        let startX = e.clientX
        let startY = e.clientY
        document.onmousemove = (ev) => {
          this.marginLeft = ev.clientX - startX + this.marginLeft
          this.marginTop = ev.clientY - startY + this.marginTop
          startX = ev.clientX
          startY = ev.clientY
        }
        document.onmouseup = () => {
          document.onmousemove = null
          document.onmouseup = null
        }
      },
      // 监听鼠标滚轮滚动事件
      handleMouse() {
        let dom = this.$refs.image
        dom.onmousewheel = (event) => {
          if (event.wheelDelta === 120) {
            this.scale = this.scale + 0.1
          } else {
            if (this.scale > 0.3) {
              this.scale = this.scale - 0.1
            }
          }
        }
      },
      // 监听ESC退出功能
      handleESC() {
        document.addEventListener('keydown', (e) => {
          if (e.keyCode === 27) {
            this.layer.show = false
          }
        })
      },
      // 监听左右方向键切换active功能
      handleLeftRight() {
        document.addEventListener('keydown', (e) => {
          if (e.keyCode === 37) {
            // 监听左键
            this.previousOne()
          } else if (e.keyCode === 39) {
            // 监听右键
            this.nextOne()
          }
        })
      },
      // 修改展示状态
      changeExpand() {
        this.expandStatus.show = !this.expandStatus.show
        if (this.expandStatus.show) {
          this.expandStatus.title = "收起缩略图"
          this.expandStatus.icon = "iconfont iconxiasanjiaoxing"
        } else {
          this.expandStatus.title = "展开缩略图"
          this.expandStatus.icon = "iconfont iconsanjiaoxing"
        }
      },
      // 放大
      enlarge() {
        this.scale = this.scale + 0.2
      },
      // 缩小
      narrow() {
        if (this.scale > 0.3) {
          this.scale = this.scale - 0.2
        }
      },
      // 左旋转
      turnLeft() {
        this.rotate = this.rotate - 90
      },
      // 右旋转
      turnRight() {
        this.rotate = this.rotate + 90
      },
      // 恢复默认
      recovery() {
        this.scale = 1
        this.rotate = 0,
        this.initMargin()
      },
      // 缩略图修改当前显示的图片
      changeActive(item) {
        this.$set(this.layer, 'active', item)
      },
      // 上一页
      previousPage() {
        if (this.page.pageIndex > 1) {
          this.page.pageIndex -= 1
        }
      },
      // 下一页
      nextPage() {
        if (this.page.pageIndex < Math.ceil(this.layer.data.length / this.page.pageSize)) {
          this.page.pageIndex += 1
        }
      },
    }
  }
</script>

<style scoped="" lang="scss">
  @import './iconfont/iconfont.css';
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
    // 遮罩层
    .mask{
      width: 100%;
      height: 100%;
      position: absolute;
      background-color: #000;
      opacity: 0.9;
    }
    // 右上角按钮区
    .right_button{
      position: absolute;
      z-index: 3002;
      top: 0;
      right: 45px;
      height: 70px;
      display: flex;
      align-items: center;
      i{      
        color: #d0d0d0;
        font-size: 26px;
        cursor: pointer;
        font-weight: bold;
        &.iconguanbi{
          font-size: 18px;
        }
        &:hover {
          color: #fff;
        }
      }
      #qrcode{
        width: 180px !important;
        height: 180px !important;
      }
      .qrcode_all{
        margin-right: 20px;
        position: relative;
        .iconsanjiaoxing{
          position: absolute;
          top: 35px;
          left: 0px;
          font-size: 20px;
          color: #fff;
        }
        .qrcode_show{
          position: absolute;
          right: 3px;
          top: 52px;
          background-color: #fff;
          padding: 10px;
          border-radius: 4px;
          p{
            text-align: center;
            margin: 0;
            padding: 0;
          }
        }
      }
    }
    // 核心区
    .view_main{
      flex: 1;
      z-index: 3001;
      position: relative;
      overflow: hidden;
      &:hover{
        .switch{
          display: flex;
        }
      }
      .showimg{
        width: calc(100%);
        margin: 15px 0;
        height: calc(100% - 30px);
        position: relative;
        img{
          transition: transform 0.3s ease 0s;
          z-index: 3012;
          position: absolute;
          top: 50%;
          left: 50%;
        }
      }
      .item{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 300px;
        cursor: pointer;
        position: absolute;
        top: 0;
        height: 100%;
        i{
          font-size: 30px;
          font-weight: bold;
          background-color: #2f2626;
          border-radius: 43px;
          padding: 12px;
          transition: 0.3s;
          z-index: 3013;
          &.disabled {
            background-color: #2f2626 !important;
            cursor: not-allowed;
          }
        }
        &:hover {
          i{
            background-color: #04a7ff;
          }
        }
      }
      .left{
        left: 0;
      }
      .right{
        right: 0;
      }
      i{
        color: #fff;
      }
    }
    // 下方操作区
    .operation{
      width: 100%;
      z-index: 3001;
      // 操作区
      .operate_area{
        display: flex;
        width: 100%;
        height: 50px;
        background-color: #000;
        justify-content: center;
        align-items: center;
        color: #d0d0d0;
        i{
          color: #d0d0d0;
          cursor: pointer;
          font-size: 25px;
          margin: 0 20px;
          &:hover{
            color: #fff;

          }
          &.iconfangda{
            font-size: 22px;
          }
          &.iconsuoxiao{
            font-size: 22px;
            padding-bottom: 3px;
          }
          &.iconhuifumorendaxiao{
            font-size: 27px;
          }
          &.iconzuoxuanzhuan{
            font-size: 22px;
          }
          &.iconyouxuanzhuan{
            font-size: 22px;
          }
        }
        .line{
          margin-right: 18px;
        }
        span.thumb_show_button{
          color: #d0d0d0;
          position: relative;
          font-size: 16px;
          cursor: pointer;
          i{
            font-size: 18px;
            position: absolute;
            bottom: -1px;
            right: -44px;
          }
          &:hover{
            color: #fff;
          }
        }
      }
      // 缩略图展开后的显示区域
      .thumb_wrap{
        height: 0px;
        transition: 0.2s;
        background-color: #000;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        &.active{
          height: 100px;
        }
        i{
          background-color: #585858;
          font-size: 23px;
          padding: 22px 6px;
          margin: 0 10px;
          cursor: pointer;
          transition: 0.3s;
          &:hover{
            background-color: #eee;
          }
          &.disabled{
            cursor: not-allowed;
            background-color: #585858 !important;
          }
        }
        ul{
          display: flex;
          justify-content: center;
          overflow: hidden;
          margin: 0;
          padding: 0;
          li{
            width: 80px;
            height: 60px;
            cursor: pointer;
            overflow: hidden;
            text-align: center;
            border-radius: 2px;
            padding: 0 5px;
            margin: 0 5px;
            background-color: #eee;
            opacity: 0.5;
            border: 4px solid rgba(0, 0, 0, 1);
            img{
              height: 100%;
            }
            &:hover{
              opacity: 1;
            }
            &.active{
              opacity: 1;
              border: 4px solid #5272da;
            }
          }
        }
      }
    }
  }
</style>
