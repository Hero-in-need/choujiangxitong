<template>
<div class="login">
    <h1 style="font-size:30px;text-align:center;color:white;">Life is like a prize paper, full of the unknown! </h1>
       <div style="float:left;width:400px;">
          <img src="../../assets/wode2.jpg"/>
        </div>
        <div style="height:225px;float:left;width:400px;background-color:rgb(218,112,214,0.5);">
            <div class="input">
            <span class="el-icon-user" style="float:left;font-size:30px;color:white;padding-left:65px"></span>
            <el-input v-model="userName" placeholder="请输入用户名" style="width:200px;text-align:center;"></el-input>
            </div>
            <!-- 用户名 -->
           <div class="input">
            <span class="el-icon-lock" style="float:left;font-size:30px;color:white;padding-left:65px"></span>
            <el-input v-model="password" placeholder="请输入密码" style="width:200px;text-align:center;" show-password></el-input>
            </div>
            <!-- 密码 -->
            <div style="text-align:center;padding-bottom:10px">
                  <el-button type="success" @click="Login" style="width:90px;height:30px;line-height:7px;">登录</el-button>
                  <el-button type="success" @click="Register" style="width:90px;height:30px;line-height:7px;">注册</el-button>            
           </div>
           <div style="text-align:center;">
           <el-button type="danger"  @click="OffLine" style="width:190px;;height:30px;line-height:7px;">离线模式</el-button>
           </div>
        </div>
</div>
</template>

<script>
export default {
    data(){
        return{
            userName:"",
            password:""
        }
    },
    methods:{
        Login(){
        this.$router.push({
          path: "/index"
        });
        },
        Register(){
        this.$router.push({
          path: "/Register"
        });
        },
        OffLine(){
        this.$router.push({
          path: "/OffShow"
        });
        }     
    }
}
</script>
<style scoped>
.login{
    width:800px;
    margin:250px auto;
    height:306px;
    border:2px solid gold;
    border-radius: 20px 20px 5px 5px;
    background-color:rgb(255,255,0,0.4);
    background:url("../../assets/beijing.jpg");
    background-size:100%;
}
img {
  /*设置图片宽度和浏览器宽度一致*/
  width: 100%;
  height: inherit;
}
.input{
    margin-top:25px;
    margin-bottom:15px;
}
</style>