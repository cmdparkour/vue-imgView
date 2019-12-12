import imgView from './imgView.vue'
let plugin = {}
plugin.install = function (Vue) {
	Vue.component(imgView.name, imgView)
}
export default plugin