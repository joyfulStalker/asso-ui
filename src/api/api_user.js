/**
 * Created by jerry on 2017/11/13.
 * 用户相关api
 */
import * as API from './'

export default {
  //登录
  login: params => {
    return API.POST('/mypath/userAccount/login', params)
  },
  //登出
  logout: params => {
    return API.POST('/mypath/userAccount/logout', params)
  },
  //修改个人信息
  changeProfile: params => {
    return API.POST('/mypath/userAccount/changeProfile', params)
  },

  //查询获取user列表(通过page分页)
  findList: params => {
    return API.GET('/mypath/v1/users', params)
  },
}
