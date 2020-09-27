<template>
<div style="margin:10px 15px 0px 15px">
 <div class="text">我的中奖情况</div>
  <el-table :header-cell-style="{background:'#FFFF33',color:'#FF99FF'}"
    :data="tableData"
    :default-sort = "{prop: 'date', order: 'descending'}"
      :cell-style="{background:'#CCFFFF',color:'#FF99FF'}"
    style="width: 100%;" max-height="290">
    <el-table-column
      prop="date"
      label="日期"
      sortable
      width="100">
    </el-table-column>
    <el-table-column
      prop="name"
      label="发布者"
      width="100">
    </el-table-column>
    <el-table-column
      prop="address"
      label="中奖情况"
       width="100">
    </el-table-column>
        <el-table-column
      prop="address"
      label="中奖内容"
       width="92">
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '特等奖'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '一等奖'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '未中奖'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '二等奖'
        },, {
          date: '2016-05-03',
          name: '王小虎',
          address: '二等奖'
        },, {
          date: '2016-05-03',
          name: '王小虎',
          address: '二等奖'
        }]
      }
    },
  }
</script>
<style scoped>
.el-pager li.active {
color: #080909;
cursor: default;
background-color: #17B3A3;
border-radius: 2px;
}
.text {
  text-align: center;
  background-color: #330066;
  border-top-left-radius: 7.9px;
  border-top-right-radius: 7.9px;
  font-size: 25px;
  color: #FF33CC;
  /*上右下左*/
}
</style>