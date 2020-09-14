<template>
  <div>
      <div class="joinlist" v-for="it in its" :key="it.id">
       {{ it.message }}
     </div>
     <div style="text-align:center;">
     <el-button type="primary" @click="dialogVisible = true" style="width:300px">添加抽奖活动</el-button>
     </div>
     <el-dialog title="抽奖活动设置" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
            <div>
              <Publish/>
            </div>
            <div style="text-align:center">
            <span slot="footer">
                  <el-button type="danger"  @click="dialogVisible = false">发布</el-button>
                  <el-button type="warning"  @click="dialogVisible = false">取消</el-button>
            </span>
            </div>
          </el-dialog>
 </div>
</template>
<script>
import Publish from "./Publish.vue";
export default {
  components:{
      Publish
  },
  data(){
    return{
          its: [
      {id:0,message: 'Foo4' },
      {id:1, message: 'Bar44' },
      {id:2, message: 'Foo44' },
    ],
     dialogVisible: false
    }
  },
  methods:{
          handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => { });
    },
  }
}
</script>
<style scoped>
.joinlist{
  background:gold;
  margin:10px 15px 20px 15px;
  height:100px;
  text-align:center
}
</style>