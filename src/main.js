import Vue from 'vue'
import App from './App.vue'
import imgView from './plugin/index.js'

Vue.config.productionTip = false
Vue.use(imgView)
new Vue({
  render: h => h(App)
}).$mount('#app')
