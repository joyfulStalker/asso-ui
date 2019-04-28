import axios from 'axios';
import store from "../store/store"

// 创建axios实例
const service = axios.create({
  baseURL: '/mypath', // api的base_url
  timeout: 5000// 请求超时时间
});
axios.interceptors.request.use(config => {

  let token = localStorage.getItem("token");
  if (token == null || token == '') {
    // console.log("token为空")
  } else {
    // console.log("token不为空" + localStorage.getItem("token"))
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

// axios.interceptors.response.use(
//   response => {
//     console.log(response)
//     //关闭遮罩层，非常重要，不然页面都不能操作了！
//     loadinginstace.close();
//     return response
//   }
// );

// axios.defaults.headers.common['Authorization'] = store.getters.getToken;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
export default service;
