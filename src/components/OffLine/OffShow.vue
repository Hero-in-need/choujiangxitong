<template>
  <div id="offline">
    <h1 style="text-align:center;color:white;padding-bottom:20px;padding-top:20px">Open your unknown adventure!</h1>
            <div style="width:800px;margin:0px auto;">
              <div v-for="(idtem1,m) in prizeList" :key="m">
                <el-alert type="warning" effect="dark"  :closable="false">{{prizeList[m].prize}}:{{prizeList[m].depict}}<br>{{win[m]}}</el-alert>
              </div>
              </div>
                <!-- 中奖信息通知 -->
      <div class="list"
        v-loading="loading"
        element-loading-text="开始自定义吧"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(255,228,196,1.0)">
        <div style="float:left;width:408px;padding-right:25px">
          <img src="../../assets/wode1.jpg" />  
        </div>
        <div style="padding:5px">
            <span style="float:left;font-weight:bold">名称:</span> 
            <div style="height:20px;text-align:center;padding-right:20px;color:#606266;font-weight:bold">{{ list.name }}</div>
        </div>
        <!-- <div style="border-bottom:2px solid #FFFFFF;margin:0px 20px"></div> -->
        <div style="padding:5px">
            <span style="float:left;height:115px;font-weight:bold">简介:</span> 
            <div style="height:115px;text-indent:2em;padding-right:20px;font-size:14px;color:#606266;font-weight:bold"> {{list.introduce}}</div>
        </div>
        <div  class="button" >
            <el-button icon="el-icon-user"  style="color:#FFFFFF;background-color:#4B0082			;"  @click="dialogVisible1 = true">查看奖项</el-button>
            <el-badge :value="count"> 
            <el-button icon="el-icon-user"  style="color:#FFFFFF;background-color:#4B0082			;"  @click="dialogVisible2 = true" >参与人数</el-button>
            </el-badge>
        </div>
        <div style="padding :5px 15px 0px 0px">
            <span style="font-size:14px;color:#660099;font-weight:bold">开奖时间:</span> 
            <div style="float:right;font-size:14px;color:#660099;font-weight:bold">{{list.date}}</div>
        </div>
     </div>
          <el-dialog title="抽奖活动设置" :visible.sync="dialogVisible1" width="50%" :before-close="handleClose">           
             <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>奖项设置</span>
              </div>
              <div v-for="(idtem,t) in prizeList" :key="t" class="text item">
                {{prizeList[t].prize}}:{{prizeList[t].depict}}<span style="float:right">+{{prizeList[t].num}}</span>
              </div>
            </el-card>
            <div style="text-align:center">
            <span slot="footer">
                  <el-button type="warning"  style="width:150px" @click="dialogVisible1 = false">关闭</el-button>
            </span>
            </div>
        </el-dialog>
        <!-- 查看奖项设置 -->
            <el-dialog title="参与人员名单" :visible.sync="dialogVisible2" width="50%" :before-close="handleClose">           
             <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>参与人员设置</span>      
                <div style="float:right;width:200px">          
                <el-input-number v-model="count"  :min="1" :max="999" label="人数设置"  @click="handleChange"></el-input-number>  
                <el-button type="danger" style="width:80px;margin-top:5px" @click="replace">序号</el-button>    
                <el-button type="danger" style="width:80px;margin-top:5px" @click="newData">电话</el-button>            
                </div>
                </div>
              <div>
                <ul class="infinite-list"  style="overflow:auto">
                  <li v-for="(i,num) in count" :key="i" style="list-style:decimal">
                    <div class="input">
                      <span class="el-icon-user" style="float:left;font-size:30px;color:white;padding-left:65px"></span>
                      <el-input v-model="participant[num]" placeholder="请输入手机号" style="width:200px;text-align:center;"  maxlength="11"></el-input>
                      </div>
                  </li>
               </ul>
             </div>
            </el-card>
            <div style="text-align:center">
            <span slot="footer">
                  <el-button type="warning"  style="width:150px" @click="dialogVisible2 = false">关闭</el-button>
            </span>
            </div>
        </el-dialog>
        <!-- 参与人员设置 -->
        <el-dialog title="抽奖活动设置" :visible.sync="dialogVisible3" width="50%" :before-close="handleClose">
                <div>
                  <OffPublish @getChildData="show"/>
                </div>
                <span slot="footer">
                      <el-button type="danger"  @click="dialogVisible3 = false">发布</el-button>
                      <el-button type="warning"  @click="dialogVisible3 = false">取消</el-button>
                </span>
        </el-dialog>
           <div style="text-align:center;padding-top:20px;padding-bottom:5px">
           <el-button type="warning"  @click="dialogVisible3 = true" style="width:800px;;height:40px;">添加抽奖活动</el-button>
           </div>
           <!-- 添加抽奖活动 -->
 </div>
</template>
<script>
  import OffPublish from "./OffPublish.vue";
  import '../../fmt/date.js';
export default {
    components:{
      OffPublish
  },
  data(){
    return{
      rank:[],
      win:[],
      count:1,
      participant:[],
         list: [
      { 
        id:0,
        name: "", 
        introduce:"",
        date:"",
        url:"",
        user:"",
      },
    ],
    prizeList:[
      {
        prize:"",depict:"",num: 0,
      }
    ],
    loading:true,
    dialogVisible1: false,
    dialogVisible2: false,
    dialogVisible3: false
    }
  },
  methods:{
      handleChange(value) {
        console.log(value);
        this.prizeList.length=this.count;
      },
      replace(){
        for(var i=0;i<this.count;i++)
        {
        this.rank[i]=i+1;
        }
          this.participant=this.rank
      },
      newData(){
        this.participant=0
      },
    show(data){
      this.list=data;
      this.list.date = new Date(data.date1).Format("yyyy-MM-dd")+" "+new Date(data.date2).Format("hh:mm:ss");
      if(data.prize === '三等奖'||data.prize === '四等奖'||data.prize === '五等奖')
      {
              var getList=[
              {
        prize:"",depict:"",num: 0,
      },   {
        prize:"",depict:"",num: 0,
      },   {
        prize:"",depict:"",num: 0,
      } , {
        prize:"",depict:"",num: 0,
      }
      ]
         getList[0].prize='特等奖';
         getList[0].depict=data.grand;
         getList[0].num=data.num0;
         getList[1].prize='一等奖';
         getList[1].depict=data.first;
         getList[1].num=data.num1;
         getList[2].prize='二等奖';
         getList[2].depict=data.second;
         getList[2].num=data.num2;
         getList[3].prize='三等奖';
         getList[3].depict=data.three;
         getList[3].num=data.num3;
      }
      if(data.prize === '四等奖'||data.prize === '五等奖')
      {
              var getList=[
              {
        prize:"",depict:"",num: 0,
      },   {
        prize:"",depict:"",num: 0,
      },   {
        prize:"",depict:"",num: 0,
      } , {
        prize:"",depict:"",num: 0,
      }, {
        prize:"",depict:"",num: 0,
      }
      ]
         getList[0].prize='特等奖';
         getList[0].depict=data.grand;
         getList[0].num=data.num0;
         getList[1].prize='一等奖';
         getList[1].depict=data.first;
         getList[1].num=data.num1;
         getList[2].prize='二等奖';
         getList[2].depict=data.second;
         getList[2].num=data.num2;
         getList[3].prize='三等奖';
         getList[3].depict=data.three;
         getList[3].num=data.num3;
         getList[4].prize='四等奖';
         getList[4].depict=data.fourth;
         getList[4].num=data.num4;
      }
      if(data.prize === '五等奖')
      {
              var getList=[
              {
        prize:"",depict:"",num: 0,
      },   {
        prize:"",depict:"",num: 0,
      },   {
        prize:"",depict:"",num: 0,
      } , {
        prize:"",depict:"",num: 0,
      }, {
        prize:"",depict:"",num: 0,
      }, {
        prize:"",depict:"",num: 0,
      }
      ]
         getList[0].prize='特等奖';
         getList[0].depict=data.grand;
         getList[0].num=data.num0;
         getList[1].prize='一等奖';
         getList[1].depict=data.first;
         getList[1].num=data.num1;
         getList[2].prize='二等奖';
         getList[2].depict=data.second;
         getList[2].num=data.num2;
         getList[3].prize='三等奖';
         getList[3].depict=data.three;
         getList[3].num=data.num3;
         getList[4].prize='四等奖';
         getList[4].depict=data.fourth;
         getList[4].num=data.num4;
         getList[5].prize='五等奖';
         getList[5].depict=data.fifth;
         getList[5].num=data.num5;
      }
      console.log(getList)
      this.prizeList=getList;
      this.loading=false;
    },
      openLottery(){
        setInterval(() => {
          if(this.list.date===new Date(new Date()).Format("yyyy-MM-dd hh:mm:ss"))
          {
                  var result=new Array();
        for(var i=0;i<this.prizeList.length;i++)
        {
            result[i]=new Array(); 
            for(var j=0;j<this.prizeList[i].num;j++)
            {
                  result[i][j]=""; 
            }
        }
          for(var i=0;i<this.prizeList.length;i++)
          {
            for(var j=0;j<this.prizeList[i].num;j++)
            {
              var winners= Math.floor(Math.random()*this.participant.length);
              result[i][j]= parseInt(this.participant.splice(winners,1)[0]);
              console.log(this.participant)
            }
            this.win[i]=result[i];
          }  
          console.log(result)
          console.log(this.participant)
          }
        },1000)},
      handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => { });
    },
  },
    mounted(){  
    this.openLottery();
  }
}
</script>
<style scoped>
#offline{
    width:1300px;
    margin: 100px auto;
    border:2px solid gold;
    border-radius: 15px;
    background:url("../../assets/beijing.jpg");
    background-size:100%;
}
.list{
  width:800px;
  background:gold;
  margin:10px auto;
  height:230px;
}
.button{
  text-align: center;
}
img {
  /*设置图片宽度和浏览器宽度一致*/
  width: 100%;
  height: inherit;
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