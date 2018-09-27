<template>
  <div class="app-container">
    <div class="filter-container" style="margin:20px 0">
      <el-form :model="queryParm" label-width="80px">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="错误描述">
              <el-input v-model="queryParm.errDescription"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="错误原因">
              <el-input v-model="queryParm.errCauseBy"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="解决方法">
              <el-input v-model="queryParm.errSolution"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="分类">
              <el-select v-model="queryParm.category" clearable placeholder="请选择">
                <el-option v-for="item in cates" :key="item.value" :label="item.value" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="text-align:right;">
          <el-button type="primary" @click="getErrList">查询</el-button>
          <el-button type="primary" @click="clear">清空查询</el-button>
          <el-button type="primary" @click="handleNew">新建错误</el-button>
        </el-row>
      </el-form>
    </div>

    <div style="margin:10px 0">
      <el-table :data="errList" border style="width: 100%">
          <el-table-column align="center" label="序号" width="65"  type="index"> </el-table-column>
          <el-table-column align="center" prop="errDescription" label="错误描述" width="260"></el-table-column>
          <el-table-column align="center" prop="errCauseBy" label="错误原因" width="260"></el-table-column>
          <el-table-column align="center" prop="errSolution" label="解决方法" width="260"></el-table-column>
          <el-table-column align="center" prop="category" label="类别" width="140"></el-table-column>
          <el-table-column align="center" prop="solveTime" label="解决时间" width="180"></el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button  @click="handleClick(scope.row)"  type="info" size="small" icon="el-icon-search"></el-button>
              <el-button type="info" size="small" icon="el-icon-edit"></el-button>
              <el-button type="danger" icon="el-icon-delete" size="small" @click="handleDel(scope.row.id)"></el-button>
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
        visible2: false,
        errList:[],
        listLoading: false,
        total: null,
        queryParm: {
          errDescription: '',
          errCauseBy: '',
          errSolution: '',
          category: '',
          page: 1,
          rows: 10
        },
        cates:[{value: 'java'},{value: 'vue'},{value: 'linux'}]
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
    },
    handleNew(){
      this.$parent.show = 'errCollAdd';
    },
    handleDel(id){
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            request({
              url: '/errCollection/errDel?errCollId='+id,
              method: 'post'
            }).then(result => {
              if(result.data.resultCode == 200){
                this.getErrList();
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
              }else{
                this.$message.error('删除失败!');
              }
            })
          }).catch(() => {
                   
          });
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
