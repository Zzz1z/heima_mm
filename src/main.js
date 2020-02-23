import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false

// 全局样式导入
import "./style/base.css"
axios.defaults.baseURL = "http://127.0.0.1/heimamm/public"
// axios.defaults.baseURL = "http://183.237.67.218:3002"
import axios from 'axios'

Vue.prototype.$axios = axios

Vue.use(ElementUI)
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
