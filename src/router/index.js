import Vue from "vue";
import VueRouter from "vue-router";

// 引入组件
import Login from "../components/Login/Login.vue";
import Register from "../components/Register/Register.vue";
import OffShow from "../components/OffLine/OffShow.vue";
import index from "../components/OnLine/index.vue";


// 要告诉 vue 使用 vueRouter
Vue.use(VueRouter);
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}
const routes = [
    {
        path: "/",
        name:"Home",
        component: Login
    },
    {
        path:"/index",
        name:"index",
        component: index
    },
    {
        path:"/Register",
        name:"Register",
        component: Register
    },
    {
        path:"/OffShow",
        name:" OffShow",
        component:  OffShow
    },

]

var router =  new VueRouter({
    routes
})
export default router;