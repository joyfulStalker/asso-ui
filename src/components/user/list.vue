<template>
  <el-row class="warp">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="warp-main" v-loading="loading" element-loading-text="拼命加载中">
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
          <el-form :inline="true" :model="searchForm">
            <el-form-item>
              <el-input v-model="searchForm.searchKey" placeholder="用户名/姓名/昵称" style="min-width: 240px;" @keyup.enter.native="handleSearch"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleSearch">查询</el-button>
            </el-form-item>
          </el-form>
        </el-col>

      <!--列表-->
      <el-table :data="users" highlight-current-row v-loading="loading" style="width: 100%;">
        <el-table-column type="index" width="60">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="120" sortable>
        </el-table-column>
        <el-table-column prop="nickName" label="昵称" width="120" sortable>
        </el-table-column>
        <el-table-column prop="sex" label="性别" width="100" :formatter="formatSex" sortable>
        </el-table-column>
        <el-table-column prop="email" label="邮箱" min-width="160" sortable>
        </el-table-column>
        <el-table-column prop="address" label="地址" sortable>
        </el-table-column>
      </el-table>

    </el-col>
  </el-row>
</template>

<script>
import request from "@/utils/request";
export default {
  data() {
    return {
      searchForm: {
        searchKey: '',
        page: '1',
        rows: '10'
      },
      users: [],
      total: 0,
      loading: false
    };
  },
  methods: {
    //性别显示转换
    formatSex: function(row, column) {
      return row.sex == 1 ? "男" : row.sex == 2 ? "女" : "未知";
    },
    handleCurrentChange(val) {
      this.page = val;
      
    },
    handleSearch() {
      request({
        url: "/userAccount/userList",
        method: "get",
        params: this.searchForm
      }).then(result => {
        if (result.data.resultCode == 200) {
          this.users = result.data.data;
        } else {
          this.$message.error("数据回显失败!");
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
  },
  mounted() {
    this.handleSearch();
  }
};
</script>

<style scoped>
</style>
