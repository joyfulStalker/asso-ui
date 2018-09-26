 <template>
  <div class="app-container calendar-list-container">
    <errCollList v-if="show=='errCollList'"> </errCollList>
    <errCollAdd v-if="show=='errCollAdd'"> </errCollAdd>
    <errCollDetail v-if="show=='errCollDetail'"> </errCollDetail>
  </div>
</template>

<script>
import errCollList from './errCollList'
import errCollAdd from './errCollAdd'
import errCollDetail from './errCollDetail'
export default {
  name: "user",
  components:{
    errCollList,
    errCollAdd,
    errCollDetail
  },
  data() {
    return {//定义errColl的全局变量
      show:'errCollList',
      errCollId: ''
    };
  },
  created() {
    
  },

  mounted(){
    // var ue = window.UE.getEditor('editor');
  },
  methods: {

  }
};
</script>
