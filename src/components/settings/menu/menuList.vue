<template>
<div>
    <div class="buttons"  style="text-align:left;">
        <el-button type="danger" icon="el-icon-delete" @click="remMenu">删除该节点</el-button>
        <el-button type="success" icon="el-icon-edit" @click="updateMenu">更新该节点节点</el-button>
        <el-button type="primary" icon="el-icon-edit" @click="addMenu">为该节点添加子节点</el-button>
    </div>
    <hr> 
    <div style="height: 600px">
        <el-tree :data="menuConfData" :check-strictly="true" :check-on-click-node="true" show-checkbox
            default-expand-all node-key="id" ref="tree" highlight-current :props="defaultProps"
        >
        </el-tree>
    </div>
</div>
</template>
<script>
import request from "@/utils/request";
export default {
  data() {
    return {
      menuConfData: [],
      defaultProps: {
        children: "children",
        label: "label",
        id: ""
      },
      checkedStatus: true
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      request({
        url: "/menu/menuConfList",
        method: "get"
      }).then(result => {
        this.menuConfData = result.data.data;
      });
    },
    checkedVolid() {
      this.checkedStatus = true; //初始化
      if (0 == this.$refs.tree.getCheckedNodes().length) {
        this.$message.error("请选择节点!");
        this.checkedStatus = false;
      }
      if (1 < this.$refs.tree.getCheckedNodes().length) {
        this.$message.error("请选择一个节点!");
        this.checkedStatus = false;
      }
    },
    addMenu() {
      this.checkedVolid();
      if (!this.checkedStatus) {
        return false;
      }
      this.$parent.buttonStatus = false;
      this.$parent.menuPid = this.$refs.tree.getCheckedNodes()[0].id;
      this.$parent.show = "menuAdd";
    },
    remMenu() {
      this.checkedVolid();
      if (!this.checkedStatus) {
        return false;
      }
      this.id = this.$refs.tree.getCheckedNodes()[0].id;
      console.log(this.id);
      request({
        url: "/menu/remMenu",
        method: "delete",
        params: { id: this.id }
      }).then(result => {
        if (result.data.resultCode == 200) {
          this.getList();
          this.$message({
            message: "删除成功！",
            type: "success"
          });
        } else {
          this.$message.error("删除失败, " + result.data.errMsg + "!");
        }
      });
    },
    updateMenu() {
      this.checkedVolid();
      if (!this.checkedStatus) {
        return false;
      }
      this.$parent.buttonStatus = true;
      this.$parent.menuId = this.$refs.tree.getCheckedNodes()[0].id;
      this.$parent.show = "menuAdd";
    }
  }
};
</script>