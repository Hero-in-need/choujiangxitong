<template>
<div>
  <h1 class="title">
    抽奖系统
  </h1>
  <div id="banner">
    <!--动态将图片轮播图的容器高度设置成与图片一致-->
    <el-carousel height="260px">
      <el-carousel-item v-for="item in imgList" :key="item.id">
        <img :src="item.url" alt />
      </el-carousel-item>
    </el-carousel>
    </div>
  <el-row :gutter="80">
  <el-col :span="2"><div class="grid-content bg-purple" style="background:transparent"></div></el-col>
    <el-col :span="14"><div class="grid-content bg-purple">
    <div class="title2">我的抽奖</div>
        <el-radio-group v-model="radio2" fill="#A80000" style="margin:5px auto;">
        <el-radio-button label="我参与的"><div style="width:170px;">我参与的</div></el-radio-button>
        <el-radio-button label="我发布的"><div style="width:170px">我发布的</div></el-radio-button>
      </el-radio-group>
    <div v-if="radio2 === '我参与的'"><JoinList/></div>
    <div v-if="radio2 === '我发布的'"><ReleaseList/></div>
    <div style="float:left;width:50%"><MyTable/></div>
    <div style="float:left;width:50%"><MyChart1/></div>
    </div>
    </el-col>
  <el-col :span="6"><div class="grid-content bg-purple">  
        <el-radio-group v-model="radio1" fill="#A80000">
      <el-radio-button label="热门"><div style="width:80px">热门</div></el-radio-button>
      <el-radio-button label="全部"><div style="width:80px">全部</div></el-radio-button>
    </el-radio-group>
    <div v-if="radio1 === '热门'"><HotList/></div>
    <div v-if="radio1 === '全部'"><AllList/></div>
   </div>
   </el-col>
  </el-row>
</div>
</template>
 
<script>
  import HotList from "././Public/HotList.vue";
  import AllList from "././Public/AllList.vue";
  import JoinList from "././User/JoinList.vue";
  import ReleaseList from "././User/ReleaseList.vue";
  import MyTable from "././User/MyTable.vue";
  import MyChart1 from "././User/MyChart1.vue";

export default {
    components:{
      HotList,AllList,JoinList,MyTable,MyChart1,ReleaseList
  },
  data() {
    return {
      // 图片地址数组
    imgList: [
        {
          id:0,
          url: require("../../assets/cj1.jpg")
        },
        // {
        //   id:1,
        //   url: require("./assets/yemian2.jpg")
        // },
        // {
        //   id:2,
        //   url: require("./assets/yemian3.jpg")
        // }
      ],
      radio1: '热门',
      radio2: '我参与的',
    };
  },
  methods: {
  },
  mounted() {
  }
};
</script>
 
<style scoped>
.title{
  font-weight:bold;
  border-radius: 4px;
  border:2px solid gray;
  text-align:center;
  font-size:50px;
  color:#A00000;
  background-color:#330066;
  width:1000px; 
  margin:20px auto;
}
.title2{
  font-weight:bold;
  border-radius: 4px;
  border:2px solid gray;
  text-align:center;
  font-size:30px;
  color:#FF33CC;
  background-color:#330066;
}
#banner{
   margin:20px auto;
   width:1200px;  
}
img {
  /*设置图片宽度和浏览器宽度一致*/
  width: 100%;
  height: inherit;
}
  .el-row {
    margin:20px auto;
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 1300px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
