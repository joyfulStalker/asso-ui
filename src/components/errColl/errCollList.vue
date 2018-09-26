<template>
  <div class="app-container">
    <div class="filter-container" style="margin:20px 0">
      <el-form :model="queryParm" label-width="80px">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="错误描述">
              <el-input v-model="queryParm.errDescription"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="错误原因">
              <el-input v-model="queryParm.errCauseBy"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="解决方法">
              <el-input v-model="queryParm.errSolution"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="text-align:right;">
          <el-button type="primary" @click="getErrList">查询</el-button>
          <el-button type="primary" @click="clear">清空查询</el-button>
          <el-button type="primary" @click="clear">新建错误</el-button>
        </el-row>
      </el-form>
    </div>

    <div style="margin:10px 0">
      <el-table :data="errList" border style="width: 100%">
          <el-table-column align="center" label="序号" width="65"  type="index"> </el-table-column>
          <el-table-column align="center" prop="errDescription" label="错误描述" width="334"></el-table-column>
          <el-table-column align="center" prop="errCauseBy" label="错误原因" width="334"></el-table-column>
          <el-table-column align="center" prop="errSolution" label="解决方法" width="334"></el-table-column>
          <el-table-column align="center" prop="solveTime" label="解决时间" width="180"></el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button  @click="handleClick(scope.row)" type="info" size="small">查看</el-button>
              <el-button type="info" size="small">编辑</el-button>
            </template>
          </el-table-column>
      </el-table>
    </div>
    <div v-show="!listLoading" class="pagination-container">
      <el-pagination @size-change="handleSizeChange" background @current-change="handleCurrentChange" :current-page.sync="queryParm.page" :page-sizes="[10,20,30, 50]" :page-size="queryParm.rows" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
    </div>
  </div>
</template>
<script>
import request from '@/utils/request';
export default {
  name: "errManage",
  data() {
    return {
        errList:[],
        listLoading: false,
        total: null,
        queryParm: {
          errDescription: '',
          errCauseBy: '',
          errSolution: '',
          page: 1,
          rows: 10
        }
    }
  },
  created() {
    this.getErrList();
  },
  mounted(){

  },
  methods: {
    getErrList() {
      request({
        url: '/errCollection/errList',
        method: 'post',
        data: this.queryParm
      }).then(result => {
        this.errList = result.data.data;
        this.total = result.data.total;
      })
    },
    clear() {
      this.queryParm = {
        errDescription: '',
        errCauseBy: '',
        errSolution: '',
        page: 1,
        rows: 10
      }
    },
    handleSizeChange(val) {
      this.queryParm.rows = val;
      this.getErrList();
    },
    handleCurrentChange(val) {
      this.queryParm.page = val;
      this.getErrList();
    },
    // this.$parent.show='activityadd';
    handleClick(row) {
        this.$parent.show = 'errCollDetail';
        this.$parent.errCollId = row.id;
    }
  }
}
</script>
<style>
  .cell{
    height: 36px !important;
    overflow: auto !important;
  }
</style>
