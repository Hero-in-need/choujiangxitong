<template>
  <div style="margin:10px 15px 0px 15px ">
      <div class="text">我的中奖分布图
      </div>
      <div id='mychart1'>
      </div>
  </div>
</template>
<script>
var echarts = require("echarts");
export default {
  data () {    return {
   option:{
    tooltip: {
        trigger: 'item',
        formatter: '{a}<br/>{b}: {c}次  ({d}%)'
    },
    color:['#4962FC','#dd3ee5','#12e78c','#fe8104','#01C2F9','#C71585','#FFA500'],
    legend: {
        orient: 'vertical',
        left: 10,
    },
    series: [
        {
            name: '中奖情况',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
                show: false,
                position: 'center'
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: '30',
                    fontWeight: 'bold'
                }
            },
            labelLine: {
                show: false
            },
            data: [
                {value: 0, name: '特等奖'},
                {value: 0, name: '一等奖'},
                {value: 5, name: '二等奖'},
                {value: 2, name: '三等奖'},
                {value: 0, name: '四等奖'},
                {value: 7, name: '五等奖'},
                {value: 10, name: '未中奖'}
            ]
        }
    ]
}
    }
  },
  mounted () {
    var mychart1 = echarts.init(document.getElementById("mychart1"));
    mychart1.setOption(this.option);
  }
}
</script>
<style scoped>
#mychart1 {
  width: 100%;
  height: 280px;
  padding-top:10px;
  background:#C0C0C0;
}
.text {
  text-align: center;
  background-color: #330066;
  border-top-left-radius: 7.9px;
  border-top-right-radius: 7.9px;
  font-size: 25px;
  color: #FF33CC;
}
</style>