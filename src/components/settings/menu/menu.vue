 <template>
  <div class="app-container calendar-list-container">
    <menuList v-if="show=='menuList'"></menuList>
    <menuAdd v-if="show=='menuAdd'"></menuAdd>
  </div>
</template>

<script>
import menuList from "./menuList";
import menuAdd from "./menuAdd";
export default {
  name: "menuManage",
  components: {
    menuList,
    menuAdd
  },
  data() {
    return {
      //定义menu的全局变量
      show: "menuList",
      buttonStatus: false,
      menuId: '',
      menuPid: ''
    };
  },
  created() {},

  mounted() {
    // var ue = window.UE.getEditor('editor');
  },
  methods: {}
};
</script>
