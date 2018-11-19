<template>
  <div>
    <el-card class="box-card"  style="width:100%">
      <div slot="header" class="clearfix">
          <span>新增菜单</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="handleBack">返回</el-button>
      </div>
      <div class="filter-container" style="margin:20px 0">
        <el-form ref="form" :model="form" label-width="80px">
          <el-row :gutter="20">
            <el-col :span="8">
                <el-form-item label="菜单路由">
                    <el-input v-model="form.path"></el-input>
                </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="菜单组件">
                    <el-input v-model="form.component"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="菜单名称">
                    <el-input v-model="form.name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="图标名称">
                    <el-input v-model="form.iconCls"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <hr>
        <el-row style="text-align:left;">
            <el-button type="primary" @click="clear">清空</el-button>
            <el-button type="primary" @click="save">保存</el-button>
        </el-row>
      </div>
      </el-card>
  </div>
</template>
<script>
import request from "@/utils/request";
export default {
  name: "menuManage",
  data() {
    return {
      form: {
        id: "",
        pid: "",
        path: "",
        component: "",
        name: "",
        iconCls: ""
      }
    };
  },
  created() {},
  mounted() {
    if(!this.$parent.buttonStatus){
      this.form.pid = this.$parent.menuPid;
    }else{
      this.form.id = this.$parent.menuId;
      //查询菜单详情进行回显
      this.getDetail();
    }
  },
  methods: {
    getDetail(){
      request({
        url: "/menu/menuDetail",
        method: "get",
        params: {"id":this.form.id}
      }).then(result => {
        if (result.data.resultCode == 200) {
          this.form = result.data.data;
        } else {
          this.$message.error("数据回显失败!");
        }
      });
      
    },
    handleBack() {
      this.$parent.menuId = "";
      this.$parent.menuPid = "";
      this.$parent.show = "menuList";
    },
    clear() {
      this.form = {
        id: "",
        path: "",
        component: "",
        name: "",
        iconCls: ""
      };
    },
    save() {
      request({
        url: "/menu/manageMenu",
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