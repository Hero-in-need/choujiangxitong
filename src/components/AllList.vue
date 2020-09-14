<template>
  <div>
      <div class="allList" v-for="(item,index) in allList" :key="item.id"
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)">
        <div style="padding:5px">
            <span style="float:left;">名称:</span> 
            <div style="text-align:center;padding-right:20px;color:#606266">{{ allList[index].name }}</div>
        </div>
        <!-- <div style="border-bottom:2px solid #FFFFFF;margin:0px 20px"></div> -->
        <div style="padding:5px">
            <span style="float:left;height:100px;">简介:</span> 
            <div style="height:100px;text-indent:2em;padding-right:20px;font-size:14px;color:#606266"> {{allList[index].introduce}}</div>
        </div>
        <div  class="button" >
            <el-badge :value="allList[index].people">
            <el-button size="small" @click="join" style="color:#FF33CC;background-color:#67C23A;">立即参加</el-button>
            </el-badge>
        </div>
        <div style="padding :5px 15px 0px 5px">
            <span style="float:left;font-size:14px;color:#F56C6C">开奖时间:</span> 
            <div style="float:right;font-size:14px;color:#F56C6C">{{allList[index].date1}} {{allList[index].date2}}</div>
        </div>
     </div>
 </div>
</template>
<script>
export default {
  data(){
    return{
         allList: [
      { 
        id:0,
        name: "", 
        introduce:"",
        people:"",
        date1:"",
        date2:"",
      },
    ],
    loading:true,
    }
  },
  mounted(){
    this.getList();
  },
  methods:{
       getList(){
        this.$axios({
        method: 'get',
        url: '/data/data.json',
        dataType: 'json',
    }).then((res) =>{
         console.log(res.data)
          this.allList=res.data.data.prizeForm;
          this.loading=false;
    })
      },
      join(){
        alert('感谢参与')
      }
  }
}
</script>
<style scoped>
.allList{
  background:gold;
  margin:10px 15px 20px 15px;
  height:200px;
}
.button{
  text-align: center;
}
</style>