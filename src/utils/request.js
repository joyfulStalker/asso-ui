import axios from 'axios'
import router from "../router/index.js"
import store from '../store/store.js';
// 创建axios实例
const service = axios.create({
  baseURL: '/mypath', // api的base_url
  timeout: 5000// 请求超时时间
});
/**
 * 这里使用service来为自己的封装做拦截器，而官方文档使用的axios是针对的是全局的baseURL
 */
service.interceptors.request.use(config => {
  let token = localStorage.getItem("token");
  let user = JSON.parse(localStorage.getItem("access-user"));
  if (token == null || user == null || token == '') {
    router.go("/login"); //用go刷新
  } else {
    //登录信息接近失效刷新一下用户信息
    let day = (user.systemTime + user.tokenExpireTime - new Date().getTime()) / 3600 / 24;
    if (day > 0) {
      if(!sessionStorage.getItem("isFlushed")){
        //只在首次打开浏览器时判断是否要刷新，其他情况不去刷新
        sessionStorage.setItem("isFlushed",true);
        //调用刷新用户登录信息的接口
        service({
          url: "/userAccount/flushUserLoginStatus",
          method: "post"
        }).then(result => {
          localStorage.setItem('access-user', JSON.stringify(result.data.data));
          localStorage.setItem('token', result.data.data.token);
          store.commit("initToken", result.data.data.token);
        })
      }else{
      }

    }else{//已经过期，删除登录数据
      //用户信息,不知道这里为什么不能用公用方法来清除用户信息，用公用方法会报错
      localStorage.removeItem("access-user");
      //token信息
      localStorage.removeItem("token");
    }
    //每个请求头上携带token信息
    config.headers.Authorization = localStorage.getItem("token");
  }
  return config
},
  err => {
    //这边是参考上面的链接的，具体有什么用我目前还没测到，反正加载超时不是在这边显示
    loadinginstace.close()
    Message.error({
      message: '加载超时'
    })
    return Promise.reject(err)
  }
);
/**
 * 这里使用service来为自己的封装做拦截器，而官方文档使用的axios是针对的是全局的baseURL
 */
service.interceptors.response.use(
  response => {
    //自定义的请求code，由后端确定
    if (response.data.resultCode == 10010005) {
      //用户信息,不知道这里为什么不能用公用方法来清除用户信息，用公用方法会报错
      localStorage.removeItem("access-user");
      //token信息
      localStorage.removeItem("token");
      router.go("/login"); //用go刷新
    }
    return response
  }
);

export default service;
