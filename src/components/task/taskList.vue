<template>
  <div class="app-container">
    <div class="filter-container" style="margin:20px 0">
      <el-form :model="queryParm" label-width="80px">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="任务名称">
              <el-input v-model="queryParm.jobName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="任务描述">
              <el-input v-model="queryParm.description"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="任务分组">
              <el-input v-model="queryParm.jobGroup"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="任务状态">
              <el-select v-model="queryParm.jobStatus" clearable placeholder="请选择">
                <el-option v-for="item in cates" :key="item.value" :label="item.name" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="text-align:right;">
          <el-button type="primary" @click="getList">查询</el-button>
          <el-button type="primary" @click="clear">清空查询</el-button>
          <el-button type="primary" @click="handleNew">新建任务</el-button>
        </el-row>
      </el-form>
    </div>

    <div style="margin:10px 0">
      <el-table :data="list" border >
          <el-table-column align="center" label="序号" width="65"  type="index"> </el-table-column>
          <el-table-column align="center" prop="jobName" label="任务名称" width="100"></el-table-column>
          <el-table-column align="center" prop="description" label="任务描述" width="100"></el-table-column>
          <el-table-column align="center" prop="cronExpression" label="cron表达式" width="200"></el-table-column>
          <el-table-column align="center" prop="jobGroup" label="任务组名" width="100"></el-table-column>
          <el-table-column align="center" prop="invokedUrl" label="被调用的url" width="300"></el-table-column>
          <el-table-column align="center" prop="createTime" label="创建时间" width="200"></el-table-column>
          <el-table-column align="center" label="状态" width="80" prop="jobStatus">
            <template slot-scope="scope">
               <span v-if="scope.row.jobStatus == 1" style="color:green">运行中 </span>
               <span v-else style="color:gray"> 已停止  </span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button type="info" size="small" icon="el-icon-edit" @click="handleEidt(scope.row.id,scope.row.jobStatus)"></el-button>
              <el-button type="success" icon="iconfont icon-yunhang" size="small" @click="handleRun(scope.row.id,1)"></el-button>
              <el-button type="danger" icon="el-icon-circle-close-outline" size="small" @click="handleStop(scope.row.id,0)"></el-button>
              <el-button type="danger" icon="el-icon-remove" size="small" @click="handleDelete(scope.row.id)"></el-button>
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
import request from "@/utils/request";
export default {
  name: "errManage",
  data() {
    return {
      visible2: false,
      list: [],
      listLoading: false,
      total: null,
      queryParm: {
        jobName: "",
        description: "",
        jobGroup: "",
        jobStatus: "",
        page: 1,
        rows: 10
      },
      cates: [{ value: "1", name: "启动中" }, { name: "未启动", value: "0" }]
    };
  },
  created() {
    this.getList();
  },
  mounted() {},
  methods: {
    getList() {
      request({
        url: "/task/taskList",
        method: "post",
        data: this.queryParm
      }).then(result => {
        this.list = result.data.data;
        this.total = result.data.total;
      });
    },
    clear() {
      this.queryParm = {
        errDescription: "",
        errCauseBy: "",
        errSolution: "",
        page: 1,
        rows: 10
      };
    },
    handleSizeChange(val) {
      this.queryParm.rows = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.queryParm.page = val;
      this.getList();
    },
    handleNew() {
      this.$parent.show = "taskAdd";
    },
    handleEidt(id, jobStatus) {
      if (1 == jobStatus) {
        this.$message({
          message: "请先停止任务再进行修改！",
          type: "warning"
        });
        return false;
      }
      this.$parent.taskId = id;
      this.$parent.show = "taskAdd";
    },
    //val 1运行  0 停止
    handleRun(id, val) {
      this.changeStatus(id, val, "运行");
    },
    handleStop(id, val) {
      this.changeStatus(id, val, "停止");
    },
    handleDelete(id) {
      request({
        url: "/task/delete",
        method: "get",
        params: { id: id }
      }).then(result => {
        if (result.data.resultCode == 200) {
          this.getList();
          this.$message({
            message: "删除成功！",
            type: "success"
          });
        } else {
          this.$message({
            message: result.data.errMsg,
            type: "error"
          });
        }
      });
    },
    changeStatus(id, val, str) {
      request({
        url: "/task/changeStatus",
        method: "post",
        data: { id: id, jobStatus: val }
      }).then(result => {
        if (result.data.resultCode == 200) {
          this.getList();
          this.$message({
            message: "恭喜你，" + str + "成功！",
            type: "success"
          });
        }
      });
    }
  }
};
</script>
<style>
</style>
