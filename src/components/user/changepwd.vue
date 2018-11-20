<template>
  <el-row class="warp">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>修改密码</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="warp-main demo-ruleForm">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="原密码">
          <el-input type="password" v-model="form.oldPassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input type="password" v-model="form.newPassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码">
          <el-input type="password" v-model="form.confirmPwd" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="default" @click="handleChangepwd">提交</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>
<script>
import request from "@/utils/request";
export default {
  data() {
    return {
      form: {
        oldPassword: "",
        newPassword: "",
        confirmPwd: ""
      }
    }
  },
  methods: {
    handleClear(){
      this.form = {
        oldPassword: "",
        newPassword: "",
        confirmPwd: ""
      }
    },
    handleChangepwd() {
      //判断newPassword和confirmPwd是否一致
      if(this.form.newPassword != this.form.confirmPwd){
        this.$message.error("新密码和确认密码不一致!");
      }
      request({
        url: "/userAccount/changePwd",
        method: "post",
        data: this.form
      }).then(result => {
          if (result.data.resultCode == 200) {
            this.$message({
              message: "恭喜你，密码修改成功！",
              type: "success"
            });
          } else {
            this.$message.error(result.data.errMsg);
          }
        }).catch(function(error) {
          this.loading = false;
          console.log(error);
          this.$message.error({
            showClose: true,
            message: "请求出现异常",
            duration: 2000
          });
        });
    }
  }
};
</script>
