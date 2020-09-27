<template>
  <div >
      <div class="hotlist" v-for="(list,index) in hotList" :key="list.id" 
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)">
        <div style="padding:5px">
            <span style="float:left;">名称:</span> 
            <div style="height:20px;text-align:center;padding-right:20px;color:#606266">{{ hotList[index].name }}</div>
        </div>
        <!-- <div style="border-bottom:2px solid #FFFFFF;margin:0px 20px"></div> -->
        <div style="padding:5px">
            <span style="float:left;height:100px;">简介:</span> 
            <div style="height:100px;text-indent:2em;padding-right:20px;font-size:14px;color:#606266"> {{hotList[index].introduce}}</div>
        </div>
        <div  class="button" >
            <el-button size="small"  style="color:#FF33CC;background-color:#67C23A;"  @click="dialogVisible = true">查看奖项</el-button>
            <el-badge :value="hotList[index].people">
            <el-button size="small" @click="join" style="color:#FF33CC;background-color:#67C23A;">立即参加</el-button>
            </el-badge>
        </div>
        <div style="padding :5px 15px 0px 5px">
            <span style="float:left;font-size:14px;color:#F56C6C">开奖时间:</span> 
            <div style="float:right;font-size:14px;color:#F56C6C">{{hotList[index].date1}} {{hotList[index].date2}}</div>
        </div>
     </div>
    <el-dialog title="抽奖活动设置" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>奖项设置</span>
              </div>
              <div v-for="o in 4" :key="o" class="text item">
                {{'列表内容 ' + o }}
              </div>
            </el-card>
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
export default {
  data(){
    return{
         hotList: [
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
    dialogVisible: false
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
         var list=new Array();
          list=res.data.data.prizeForm;
          console.log(list)
         var min=0;
      for(var i=0;i<list.length;i++)
      {
        for (var j=i+1;j<list.length;j++)
            if(list[i].people<list[j].people)    //如果前一个数比后一个数小，则利用中间变量t实现两值互换
            {
                min=list[i];
                list[i]=list[j];
                list[j]=min;
            }
      }
      for(var i=0;list.length<=3?(i<list.length):(i<3);i++)
      {
        this.hotList[i]=list[i];
        this.hotList[i].id=i;
      }
      console.log(this.hotList)
      this.loading=false
    })
      },
      join(){
        alert('感谢参与')
      },
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
.hotlist{
  background:gold;
  margin:10px 15px 20px 15px;
  height:200px;
}
.button{
  text-align: center;
}
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
    width: 480px;
    margin: 20px auto;
  }
</style>