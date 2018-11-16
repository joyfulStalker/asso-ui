<template>
<div>
    <div style="height: 600px">
        <el-tree :data="menuConfData" :check-strictly="true" :check-on-click-node="true" show-checkbox
            default-expand-all node-key="id" ref="tree" highlight-current :props="defaultProps">
        </el-tree>
    </div>
    <hr> 
    <div class="buttons"  style="text-align:left;">
        <el-button @click="remMenu">为该节点添加子节点</el-button>
        <el-button @click="updateMenu">为该节点添加子节点</el-button>
        <el-button @click="addMenu">为该节点添加子节点</el-button>
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
        label: "label"
      }
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
    addMenu() {
        this.$parent.buttonStatus = false;
        this.$parent.menuPid = this.$refs.tree.getCheckedNodes()[0].id;
      this.$parent.show = 'menuAdd';
    },
    remMenu(){

    },
    updateMenu(){

    }
  }
};
</script>