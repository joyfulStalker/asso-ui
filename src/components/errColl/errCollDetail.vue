<template>
  <el-card class="box-card" >
    <div slot="header" class="clearfix">
      <span>错误详情</span>
      <el-button style="float: right; padding: 3px 0" type="text" @click="handleBack">返回</el-button>
    </div>
      <el-form label-width="100px"  style="width:1200px;height:600px">
          <el-row label-width="100px">
            <el-form-item label="错误描述: " style="color: green;margin:10px 0;">{{showData.errDescription}}</el-form-item>
          </el-row>
          <el-row label-width="100px">
            <el-form-item label="错误原因: " style="color: green;margin:10px 0;">{{showData.errCauseBy}}</el-form-item>
          </el-row>
          <el-row label-width="100px">
            <el-form-item label="解决方法: " style="color: green;margin:10px 0;">{{showData.errSolution}}</el-form-item>
          </el-row>

          <hr>

          <ul >
            <li v-for='(list,index) in showData.refers' v-bind:key='list.id' style="list-style: none">
              <el-row :gutter="10" >
                <el-col :span="2" style="text-align:left;height:21px">
                     {{index+1}}.
                </el-col>
                <el-col :span="6" style="text-align:left">
                    {{list.sourceDesc}}
                </el-col>
                <el-col :span="4" style="text-align:left">
                    <a type="success" class="el-icon-search" round size="mini" @click='goUrl(list.sourceUrl)'></a>
                </el-col>
                <el-col :span="2" style="text-align:right">
                  <li v-if="list.isUseful"><i class="el-icon-check" style="green"></i></li>
                  <li v-else><i class="el-icon-close" style="red"></i></li>
                </el-col>
              </el-row>
            </li>
          </ul>       
      </el-form>
  </el-card>

</template>
<script>
import request from '@/utils/request';
export default {
  name: "errManage",
  data() {
    return {
        showData:{
          "errDescription": '',
          "errCauseBy": '',
          "errSolution": '',
          "errCollId": '',
          "refers": []
        },

    }
  },
  created() {
    this.showData.errCollId = this.$parent.errCollId;
    this.getDetail();
  },
  mounted(){
   
  },
  methods: {
    getDetail() {
      request({
        url: '/errCollection/detail?'+'errCollId='+this.showData.errCollId,
        method: 'post'
      }).then(result => {
        this.showData = result.data.data;
      })
    },
    handleBack() {
        this.$parent.show = 'errCollList';
    },
    goUrl(url){
      window.open(url);
    }
  }
}
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
    clear: both
  }

  .box-card {
    width: 100%;
    height: 100%;
  }
</style>