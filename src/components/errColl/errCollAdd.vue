<template>
   <div class="filter-container" style="margin:20px 0">
      <el-form ref="form" :model="form" label-width="80px">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="分类选择">
              <el-select v-model="form.category" clearable placeholder="请选择">
                <el-option v-for="item in cates" :key="item.value" :label="item.value" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="错误描述">
              <el-input type="textarea" v-model="form.errDescription"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="错误原因">
              <el-input type="textarea" v-model="form.errCauseBy"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="解决方法">
              <el-input type="textarea" v-model="form.errSolution"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <hr id="seg">
      <ul style="padding:0">
          <li v-for='(list,index) in form.refers' v-bind:key='list.id' style="list-style: none">
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="参考描述">
                  <el-input v-model="list.sourceDesc"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="参考url">
                  <el-input v-model="list.sourceUrl"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="是否有用">
                  <el-switch v-model="list.isUseful"></el-switch>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-button type="danger" icon="el-icon-delete" @click='list.splice(index, 1)'>删除</el-button>
              </el-col>
            </el-row>
          </li>
      </ul>
        <el-row style="text-align:left;">
          <el-button type="primary" @click="handleBack">返回</el-button>
          <el-button type="primary" @click="clear">清空</el-button>
          <el-button type="primary" @click="addRefer">添加参考</el-button>
          <el-button type="primary" @click="save">保存</el-button>
        </el-row>
      </el-form>
     
    </div>
</template>
<script>
import request from '@/utils/request';
export default {
  name: "errManage",
  data() {
    return {
        form: {
          id: '',
          errDescription: '',
          errCauseBy: '',
          errSolution: '',
          category: '',
          refers: []
        },
        cates:[{value: 'java'},{value: 'vue'},{value: 'linux'}]
    }
  },
  created() {
    
  },
  mounted(){

  },
  methods: {
    save() {
      request({
        url: '/errCollection/saveOrUpdate',
        method: 'post',
        data: this.form
      }).then(result => {
        if(result.data.resultCode == 200){
          this.handleBack();
          this.$message({
            message: '恭喜你，保存成功！',
            type: 'success'
          });
        }else{
          this.$message.error('保存失败, '+result.data.errMsg+"!");
        }
      })
    },
    clear(){
      this.form = {
          id: '',
          errDescription: '',
          errCauseBy: '',
          errSolution: '',
          category: '',
          refers: []
      }
    },
    handleBack(){
      this.clear();
      this.$parent.show = 'errCollList';
    },
    addRefer(){
      //通过向数组里面添加数据来动态控制dom个数，然后利用vue双向绑定来赋值，上面的list其实就是每个dom的值，
      this.form.refers.push({
			  sourceDesc: '',
        sourceUrl: '',
        isUseful: true
      })
    }
  }
}
</script>