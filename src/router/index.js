import Vue from 'vue'
import VueRouter from 'vue-router'
//login模块
import login from '../views/login/login'

//注册路由
Vue.use(VueRouter)
// 创建路由规则
const routes = [
    {
        path:'/login',
        component:login
    }
];
// 创建路由对象
const router = new VueRouter({
    routes
  });
  // 暴露
export default router;