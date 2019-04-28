<script type="text/javascript">

//-------------公共的常量
//const httpUrl = 'http://39.105.17.99:8080/'


//-------------公共的方法

/**
 * 清除用户信息，包含token
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
  clearUserInfo
};
</script>