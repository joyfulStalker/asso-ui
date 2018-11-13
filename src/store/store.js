import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const constantRoutes = [
    {
      path: '/login',
      name: '登录',
      component: "Login"
    },
    {
      path: '/',
      name: 'home',
      component: "Home",
      redirect: '/dashboard',
      leaf: true, // 只有一个节点
      menuShow: true,
      iconCls: 'iconfont icon-home', // 图标样式class
      children: [
        { path: '/dashboard', component: "Dashboard", name: '首页', menuShow: true }
      ]
    }
  ];


let store = new Vuex.Store({
    // 1. state (类似存储全局变量的数据
    state: {
        //存放路由
        routes: []
    },

    // // 2. getters 提供用来获取state数据的方法
    getters: {
        //获取路由数据
        getRoutes(state) {
            return state.routes;
        }
    },
    // 3. actions
    //提供跟后台接口打交道的方法，并调用mutations提供的方法
    actions: {

    },
    // 4. mutations 提供存储设置state数据的方法
    mutations: {
        //初始化菜单
        initMenu(state, menus) {
            state.routes = menus;
        }
    }
});

export default store;