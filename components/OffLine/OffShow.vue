<template>
    <div id="offline">
      <h1 class="title">Open your unknown adventure!</h1>
      <!-- 中奖信息通知 -->
      <div class="message">
        <div v-for="(idtem1,m) in prizeList" :key="m">
          <el-alert type="warning" effect="dark"  :closable="false">
           {{prizeList[m].prize}}{{sign}}{{prizeList[m].depict}}<br>{{win[m]}}
          </el-alert>
        </div>
      </div>
      <!-- 查看奖项设置 -->
      <div class="list"
        v-loading="loading"
        element-loading-text="开始自定义吧"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(255,228,196,1.0)">
        <!-- loading加载 -->
        <div class="picture" @dragstart="dragStart">
          <img src="../../assets/wode1.jpg"/>  
        </div>
        <div class="name">
            <span>名称:</span> 
            <div class="ncontent">{{ list.name }}</div>
        </div>
        <div class="name">
            <span>简介:</span> 
            <div class="icontent"> {{list.introduce}}</div>
        </div>
        <div class="button" >
            <el-button icon="el-icon-user" @click="dialogVisible1 = true">查看奖项</el-button>
            <el-badge :value="count"> 
            <el-button icon="el-icon-user" @click="dialogVisible2 = true" >参与人数</el-button>
            </el-badge>
        </div>
        <div class="time">
            <span>开奖时间:</span> 
            <div>{{list.date}}</div>
        </div>
      </div> 
      <!-- 具体的奖项内容 -->
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
          <span slot="footer" class="clearfix">
              <el-button type="warning"  style="width:150px" @click="dialogVisible1 = false">关闭</el-button>
          </span>
        </div>
    </el-dialog>
    <!-- 参与人员设置 -->
    <el-dialog title="参与人员名单" :visible.sync="dialogVisible2" width="50%" :before-close="handleClose">           
        <el-card class="box-card">
          <div slot="header"  class="clearfix">
            <span>参与人员设置</span>      
            <div class="people">          
              <el-input-number v-model="count"  :min="1" :max="999" label="人数设置"  @click="handleChange"></el-input-number>  
              <el-button type="danger" @click="replace">序号</el-button>    
              <el-button type="danger" @click="newData">电话</el-button>            
            </div>
          </div>
          <div>
            <ul class="infinite-list"  style="overflow:auto">
              <li v-for="(i,num) in count" :key="i" style="list-style:decimal">
                <div class="input">
                  <span class="el-icon-user"></span>
                  <el-input v-model="participant[num]" placeholder="请输入手机号" maxlength="11"></el-input>
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
    <!-- 创建抽奖活动 -->
    <el-dialog title="抽奖活动设置" :visible.sync="dialogVisible3" width="50%" :before-close="handleClose">
          <div>
            <OffPublish @getChildData="show"/>
          </div>
          <span slot="footer">
              <el-button type="danger"  @click="dialogVisible3 = false">发布</el-button>
              <el-button type="warning"  @click="dialogVisible3 = false">取消</el-button>
          </span>
    </el-dialog>
    <div class="create">
      <el-button type="warning"  @click="establish">创建抽奖活动</el-button>
    </div>
 </div>
</template>
<script>
  import OffPublish from "./OffPublish";
  import '../../fmt/date.js';
export default {
    components:{
      OffPublish
  },
  data(){
    return{
        sign:"",
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
        var i=0;
        var t=this.count
        for(i;i<t;i++)
        {
        this.rank[i]=i+1;
        }
          this.participant=this.rank;
      },
      newData(){
        //让以序号为抽奖依据变为以电话为抽奖依据
        this.participant=0
      },
      establish(){
       // 重新创建活动时，清空中奖者
       this.win.splice(0, this.win.length); 
       this.dialogVisible3 = true;
      },
      //使用this.$emit来进行子向父传递自己设置的prizeForm活动
      show(data){
      // 由于数组必须先定义足够的长度才能够进行赋值，这里过于复杂后续会改进；
      this.list=data;
      this.sign=':';
      this.list.date = new Date(data.date1).Format("yyyy-MM-dd")+" "+new Date(data.date2).Format("hh:mm:ss");
      var judge=data.prize;
      var getList=[
              {
        prize:"",depict:"",num: 0,
      },   {
        prize:"",depict:"",num: 0,
      },   {
        prize:"",depict:"",num: 0,
      },{
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
      if(data.prize === '四等奖'||data.prize === '五等奖')
      {
        getList[4]={
        prize:"",depict:"",num: 0,
      }
         getList[4].prize='四等奖';
         getList[4].depict=data.fourth;
         getList[4].num=data.num4;
      }
       if(data.prize === '五等奖')
      {
              getList[5]={
        prize:"",depict:"",num: 0,
      } 
         getList[5].prize='五等奖';
         getList[5].depict=data.fifth;
         getList[5].num=data.num5;
      }
      console.log(getList)
      this.prizeList=getList;
      this.loading=false;
        this.$message({
          showClose: true,
          message: '请确保设定好了时间，不然会导致无法开奖',
          type: 'warning'
        });
    },
      //通过拖动进行提前抽奖
      dragStart(){
        var time1=this.list.date;
        //在show（data）这个事件里面时间已经完成了转换如：2020-09-27 16:12:16。这种格式不能直接利用js的.getTime()转换为毫秒数。所以进行符号转换为2020/09/27 16:12:16即可。
        time1=time1.replace(new RegExp("-","gm"),"/");
        time1=(new Date(time1)).getTime(); 
        var time2=new Date().getTime();
        if(time1>time2)
        {
         this.list.date=new Date(new Date()).Format("yyyy-MM-dd hh:mm:ss");
         console.log(this.list.date)
        }
        else {
          this.$notify({
          title: '警告',
          message: '抽奖已完成或时间设置错误',
          type: 'warning'
        });
        }
      },
      openLottery(){
        // 设置定时器监控时间
        setInterval(() => {
          //设置时间如果等于当地时间，就触发开奖
          if(this.list.date===new Date(new Date()).Format("yyyy-MM-dd hh:mm:ss"))
          {
                  // 给result数组赋予跟奖项同样的奖项等级和每个奖项的中奖人数
                  var result=new Array();
                  for(var i=0;i<this.prizeList.length;i++)
                  {
                      result[i]=new Array(); 
                      for(var j=0;j<this.prizeList[i].num;j++)
                      {
                            result[i][j]=""; 
                      }
                  }
                  //通过产生随机数的方法来完成抽奖
                  for(var i=0;i<this.prizeList.length;i++)
                  {
                    for(var j=0;j<this.prizeList[i].num;j++)
                    {
                      //random生成的是0-1之间的随机数,通过设置的人数，而生成的是0-1之间的小数点，再乘以人数的话，最大也就是[（人数-1）.999999999...]，然后利用Math.floor()向下取整，去掉小数点之后的数，就可以得到随机数
                      var winners= Math.floor(Math.random()*this.participant.length);
                      //将产生的随机数让数组取出值并且赋值给result数组，原数组删除对应的值，避免因为再次产生同样的随机数而取到同样的值
                      result[i][j]= parseInt(this.participant.splice(winners,1)[0]);
                      console.log(this.participant)
                    }
                   this.win[i]=result[i];
                  }
                  // 提示已经开奖
                  this.$notify({
                  title: '已开奖！！！',
                  message: 'Best Wishes For You',
                  type: 'success'
                })
                console.log(result)
                console.log(this.participant)
        }
        },500)},
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
    width:1350px;
    margin: 100px auto;
    border:2px solid gold;
    border-radius: 15px;
    background:url("../../assets/beijing.jpg");
    background-size:100%;
  }
  .title{
    text-align:center;
    color:white;
    padding-bottom:20px;
    padding-top:20px;
  }
  .message{
    width:800px;
    margin:0px auto;
  }
  .list{
    width:800px;
    background:gold;
    margin:10px auto;
    height:230px;
  }
  .picture{
    float:left;
    width:408.85px;
    padding-right:25px;
  }
  .name{
    padding:5px;
  }
  .name span{
    float:left;
    font-weight:bold;
  }
  .ncontent{
    /* 防止内容溢出 */
    word-wrap:break-word;
    overflow:hidden;
    height:20px;
    text-align:center;
    padding-right:20px;
    color:#606266;
    font-weight:bold;
  }
  .icontent{
    /* 防止内容溢出 */
    word-wrap:break-word;
    overflow:hidden;
    height:115px;
    text-indent:2em;
    padding-right:20px;
    font-size:14px;
    color:#606266;
    font-weight:bold;
  }
  .button{
    text-align: center;
  }
  .button .el-button{
    color:#FFFFFF;
    background-color:#4B0082;
  }
  .time{
    padding :5px 15px 0px 0px;
  }
  .time span{
    font-size:14px;
    color:#660099;
    font-weight:bold;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  .time div{
    float:right;
    font-size:14px;
    color:#660099;
    font-weight:bold;
    }
  .people{
    float:right;
    width:200px;
  }
  .people .el-button{
    width:80px;
    margin-top:5px;
  }
  .input span{
    float:left;
    font-size:30px;
    color:white;
    padding-left:65px;
  }
  .input div{
    width:200px;
    text-align:center;  
  }
  .create{
   text-align:center;
   padding-top:20px;
   padding-bottom:5px;
  }
  .create .el-button{
     width:800px;
     height:40px;
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
  .box-card {
    width: 480px;
    margin: 20px auto;
  }
</style>