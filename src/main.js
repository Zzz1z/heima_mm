import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false

// 全局样式导入
import "./style/base.css"

Vue.use(ElementUI)
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
