import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export const constantRoutes = [
    {
      path: '/login',
      name: '登录',
      component: (resolve)=> require(['../components/Login.vue'], resolve)
    },
    {
      path: '/',
      name: 'home',
      component: (resolve)=> require(['../components/Home.vue'], resolve),
      redirect: '/dashboard',
      leaf: true, // 只有一个节点
      menuShow: true,
      iconCls: 'iconfont icon-wxbzhuye', // 图标样式class
      children: [
        { path: '/dashboard', component: (resolve)=> require(['../components/Dashboard.vue'], resolve), name: '首页', menuShow: true }
      ]
    },
    {
        path: '/',
        name: '设置',
        component: (resolve)=> require(['../components/Home.vue'], resolve),
        redirect: '/dashboard',
        leaf: false, // 只有一个节点
        menuShow: true,
        iconCls: 'iconfont icon-shezhi', // 图标样式class
        children: [
          { path: '/settings/menu', component: (resolve)=> require(['../components/settings/menu/menu.vue'], resolve), name: '菜单配置',iconCls: 'iconfont icon-all', menuShow: true }
        ]
      }
  ];
let store = new Vuex.Store({
    // 1. state (类似存储全局变量的数据
    state: {
        //存放路由
        routes: constantRoutes,
        token: ''
    },

    // // 2. getters 提供用来获取state数据的方法
    getters: {
        //获取路由数据
        getRoutes(state) {
            return state.routes;
        },
        getToken(state){
          return state.token;
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
        },
        initToken(state,token) {
          state.token = token;
      },
    }
});

export default store;