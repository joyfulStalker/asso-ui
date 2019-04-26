import axios from 'axios';

// 创建axios实例
const service = axios.create({
  baseURL: '/mypath', // api的base_url
  timeout: 5000,// 请求超时时间
  headers: {
    'Authorization': window.localStorage.getItem('access-user') == null ? '' : JSON.parse(window.localStorage.getItem('access-user')).token
  }
});

export default service;
