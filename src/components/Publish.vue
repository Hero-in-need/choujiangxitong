<template>
<div style="margin:40px auto;width:465px">
<el-form ref="form" :model="prizeForm" label-width="80px" size="medium" style="text-align:center">
  <el-form-item label="活动名称:">
    <el-input v-model="prizeForm.name" style="width:350px" ></el-input>
  </el-form-item>
    <el-form-item label="活动简介:">
    <el-input v-model="prizeForm.introduce" style="width:350px;" type="textarea" :rows="3" ></el-input>
  </el-form-item>
  <el-form-item label="奖项设置:">
      <el-radio-group v-model="prizeForm.prize" style="margin:0px auto;">
      <el-radio-button label="三等奖"><div style="width:76px">三等奖</div></el-radio-button>
      <el-radio-button label="四等奖"><div style="width:76px">四等奖</div></el-radio-button>
      <el-radio-button label="五等奖"><div style="width:76px">五等奖</div></el-radio-button>
    </el-radio-group>
  <el-form-item label="特等奖:">  
    <el-input v-model="prizeForm.grand" style="width:274px" ></el-input>
  </el-form-item>
  <el-form-item label="一等奖:">
    <el-input v-model="prizeForm.first" style="width:274px" ></el-input>
  </el-form-item>
    <el-form-item label="二等奖:">
    <el-input v-model="prizeForm.second" style="width:274px" ></el-input>
  </el-form-item>
    <el-form-item label="三等奖:"  v-if="prizeForm.prize === '三等奖'||prizeForm.prize === '四等奖'||prizeForm.prize === '五等奖'">
    <el-input v-model="prizeForm.three" style="width:274px" ></el-input>
  </el-form-item>
    <el-form-item label="四等奖:"  v-if="prizeForm.prize === '四等奖'||prizeForm.prize === '五等奖'">
    <el-input v-model="prizeForm.fourth" style="width:274px" ></el-input>
  </el-form-item>
    <el-form-item label="五等奖:"  v-if="prizeForm.prize === '五等奖'">
    <el-input v-model="prizeForm.fifth" style="width:274px" ></el-input>
  </el-form-item>
  </el-form-item>
  <el-form-item label="开奖时间:">
    <el-col :span="10" style="padding:0px">
      <el-date-picker type="date" placeholder="选择日期" v-model="prizeForm.date1" style="width: 100%;"></el-date-picker>
    </el-col>
    <el-col class="line" :span="2">-</el-col>
    <el-col :span="9" style="padding:0px">
      <el-time-picker placeholder="选择时间" v-model="prizeForm.date2" style="width: 100%;"></el-time-picker>
    </el-col>
  </el-form-item>
</el-form>
</div>
</template>
<script>
  export default {
    data() {
      return {
        prizeForm: {
          name: '',
          introduce:'',
          prize: '三等奖',
          date1: '',
          date2: '',
          grand:'',
          first:'',
          second:'',
          three:'',
          fourth:'',
          fifth:'',
        }
      };
    },
    methods: {
      publish(){
        this.$axios({
        method: 'get',
        url: '/data/data.json',
        dataType: 'json',
    }).then((res) =>{
         console.log(res.data)
    })
      }
    }
  };
</script>