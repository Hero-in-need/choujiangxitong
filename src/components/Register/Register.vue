<template>
<div class="Register">
    <h1 style="font-size:30px;text-align:center;color:white">Welcome to join, Good luck! </h1>
        <div style="height:315px;margin:0px auto;width:400px;padding-top:5px">
            <div class="input">
            <span class="el-icon-user" style="float:left;font-size:30px;color:white;padding-left:70px"></span>
            <el-input v-model="userName" placeholder="请输入用户名" style="width:200px;text-align:center;"></el-input>
            </div>
            <!-- 用户名 -->
           <div class="input">
            <span class="el-icon-lock" style="float:left;font-size:30px;color:white;padding-left:70px"></span>
            <el-input v-model="password" placeholder="请输入密码" style="width:200px;text-align:center;" show-password></el-input>
            </div>
            <!-- 密码 -->
           <div class="input">
            <span class="el-icon-unlock" style="float:left;font-size:30px;color:white;padding-left:70px"></span>
            <el-input v-model="aPassword" placeholder="请验证密码" style="width:200px;text-align:center;" show-password></el-input>
            </div>
            <!-- 再次输入密码 -->
                       <div class="input">
            <span class="el-icon-phone-outline" style="float:left;font-size:30px;color:white;padding-left:70px"></span>
            <el-input v-model="telephoneNumber" placeholder="请输入手机号" style="width:200px;text-align:center;" show-password></el-input>
            </div>
            <!-- 请输入手机号 -->
           <div style="text-align:center;">
           <el-button type="success"  @click="Register" style="width:190px;;height:30px;line-height:7px;">注册</el-button>
           </div>
        </div>
</div>
</template>

<script>
export default {
    data(){
        return{
            userName:"",
            password:"",
            aPassword:"",
            telephoneNumber:""
        }
    },
    methods:{
        Register(){
        this.$router.push({
          path: "/"
        });
        }
        
    }
}
</script>
<style scoped>
.Register{
    width:800px;
    margin:200px auto;
    height:400px;
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