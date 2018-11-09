import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Dashboard from '@/components/Dashboard'
import lazyLoading from '../api/lazyLoading.js'
import initNode from '../api/menu.js'
import BookList from '@/components/book/list'
import BookCategoryList from '@/components/bookcategory/list'

import UserList from '@/components/user/list'
import UserChangePwd from '@/components/user/changepwd'
import UserProfile from '@/components/user/profile'
import ErrColl from '@/components/errColl/errManage'
// 懒加载方式，当路由被访问的时候才加载对应组件
const Login = resolve => require(['@/components/Login'], resolve)

Vue.use(Router)

let router = new Router({
// mode: 'history',
  routes: [
    {
      path: '/login',
      name: '登录',
      component: Login
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      redirect: '/dashboard',
      leaf: true, // 只有一个节点
      menuShow: true,
      iconCls: 'iconfont icon-home', // 图标样式class
      children: [
        {path: '/dashboard', component: Dashboard, name: '首页', menuShow: true}
      ]
    }
    // ,
    // {
    //   path: '/',
    //   component: Home,
    //   name: '用户管理',
    //   menuShow: true,
    //   leaf: true, // 只有一个节点
    //   iconCls: 'iconfont icon-users', // 图标样式class
    //   children: [
    //     {path: '/user/list', component: UserList, name: '用户列表', menuShow: true}
    //   ]
    // },
    // {
    //   path: '/',
    //   component: Home,
    //   name: '图书管理',
    //   menuShow: true,
    //   iconCls: 'iconfont icon-books',
    //   children: [
    //     {path: '/book/list', component: BookList, name: '图书列表', menuShow: true},
    //     {path: '/book/category', component: BookCategoryList, name: '图书分类', menuShow: true}
    //   ]
    // },
    // {
    //   path: '/',
    //   component: Home,
    //   name: '设置',
    //   menuShow: true,
    //   iconCls: 'iconfont icon-setting1',
    //   children: [
    //     {path: '/user/profile', component: UserProfile, name: '个人信息', menuShow: true},
    //     {path: '/user/changepwd', component: UserChangePwd, name: '修改密码', menuShow: true}
    //   ]
    // },
    // {
    //   path: '/',
    //   component: Home,
    //   name: '错误收集',
    //   menuShow: true,
    //   iconCls: 'iconfont icon-setting1',
    //   children: [
    //     {path: '/errColl/errManage', component: ErrColl, name: '错误管理', menuShow: true}
    //   ]
    // }
  ]
})
// initNode((ele) => {
//     ele.component = lazyLoading(ele.component);
//     ele.children.forEach(element => {
//       this.initNode(element);
//     });
// })



router.beforeEach((to, from, next) => {
  if (to.path.startsWith('/login')) {
    window.localStorage.removeItem('access-user')
    next()
  } else {
    let user = JSON.parse(window.localStorage.getItem('access-user'))
    // console.log(user);
    if (!user) {
      next({path: '/login'})
    } else {
      let dRouter = JSON.parse(sessionStorage.getItem('d_router'));
      if(dRouter){
        let routesd = [];
        dRouter.forEach(element => {
          // this.initNode(element);
          element.component = lazyLoading(element.component);
          element.children[0].component = lazyLoading(element.children[0].component);
          // console.log(element.children[0])
          routesd.push(element);
        });
        console.log(routesd)
        router.options.routes = routesd;
        // console.log(router.options.routes);
      }
      // next()
    }
  }
})
export default router
