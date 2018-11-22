 <template>
  <div class="app-container calendar-list-container">
    <taskList v-if="show=='taskList'"></taskList>
    <taskAdd v-if="show=='taskAdd'"></taskAdd>
  </div>
</template>

<script>
import taskList from "./taskList";
import taskAdd from "./taskAdd";
export default {
  name: "taskManage",
  components: {
    taskList,
    taskAdd
  },
  data() {
    return {
      //定义task的全局变量
      show: "taskList",
      buttonStatus: false,//false添加按钮 true更新按钮
      taskId: '',
      taskPid: ''
    };
  },
  created() {},

  mounted() {
    // var ue = window.UE.getEditor('editor');
  },
  methods: {}
};
</script>
