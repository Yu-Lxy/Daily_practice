import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui' // 引入element-ui
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import Axios from 'axios'

Vue.prototype.$http = Axios

Vue.use(ElementUI) // Vue全局使用

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})