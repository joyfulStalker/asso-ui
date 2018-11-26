<template>
  <div>
    <el-card class="box-card"  style="width:100%">
      <div slot="header" class="clearfix">
          <span>新增任务</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="handleBack">返回</el-button>
      </div>
      <div class="filter-container" style="margin:20px 0">
        <el-form ref="form" :model="form" label-width="100px" label-position="left">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="任务名称">
                <el-input type="text" v-model="form.jobName"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="任务分组">
                <el-input type="text" v-model="form.jobGroup"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="被调用的url">
                <el-input type="text" v-model="form.invokedUrl"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="任务描述">
                <el-input type="text" v-model="form.description"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="cron表达式">
                <el-input type="text" v-model="form.cronExpression"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
         
          <el-row style="text-align:left">
            <el-button type="primary" @click="clear">清空</el-button>
            <el-button type="primary" @click="save(1)">保存并启动</el-button>
            <el-button type="primary" @click="save(0)">保存</el-button>
          </el-row>
        </el-form>
      </div>
      </el-card>
  </div>
</template>
<script>
import request from "@/utils/request";
export default {
  name: "errManage",
  data() {
    return {
      form: {
        id: "",
        jobName: "",
        description: "",
        cronExpression: "",
        jobStatus: "0",
        jobGroup: "",
        invokedUrl: ""
      },
      cates: [{ value: "java" }, { value: "vue" }, { value: "linux" }]
    };
  },
  created() {
    this.form.id = this.$parent.taskId;
    if(null != this.form.id && '' != this.form.id){
      this.getData();
    }
  },
  mounted() {},
  methods: {
    getData() {
      request({
        url: "/task/detail",
        method: "get",
        params: {id:this.form.id}
      }).then(result => {
        if (result.data.resultCode == 200) {
          this.form = result.data.data;
        }
      });
    },
    save(val) {
      if (val == 1) {
        this.form.jobStatus = 1;
      }
      request({
        url: "/task/taskManage",
        method: "post",
        data: this.form
      }).then(result => {
        if (result.data.resultCode == 200) {
          this.handleBack();
          this.$message({
            message: "恭喜你，保存成功！",
            type: "success"
          });
        } else {
          this.$message.error("保存失败, " + result.data.errMsg + "!");
        }
      });
    },
    clear() {
      this.form = {
        id: "",
        jobName: "",
        description: "",
        cronExpression: "",
        jobStatus: "",
        jobGroup: "",
        invokedUrl: ""
      };
    },
    handleBack() {
      this.clear();
      this.$parent.show = "taskList";
    }
  }
};
</script>
<style>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 100%;
  height: 100%;
}

.avatar {
  width: 278px;
  height: 278px;
  display: block;
}
</style>