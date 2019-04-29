<script type="text/javascript">
import request from "@/utils/request";
//-------------公共的常量
//const httpUrl = 'http://39.105.17.99:8080/'

//-------------公共的方法

/**
 * 调用后台接口清除用户信息，包含token
 */
function clearUserInfoByLogout() {
  //调用退出接口
  request({
    url: "/userAccount/logout",
    method: "post"
  }).then(result => {
    //响应后再去清除用户信息，否则后台拿不到token信息
    clearUserInfo();
  });
}
/**
 * 仅清除前端存储的用户信息
 */
function clearUserInfo() {
  //用户信息
  localStorage.removeItem("access-user");
  //token信息
  localStorage.removeItem("token");
}
//-------------暴露出这些属性和方法
export default {
  //httpUrl,
  //对应上面clearUserInfo()方法
  clearUserInfo,
  clearUserInfoByLogout
};
</script>