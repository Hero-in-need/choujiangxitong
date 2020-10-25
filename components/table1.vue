<template>
			<canvas canvas-id="canvasLineA" id="canvasLineA" class="charts" ></canvas>
</template>

<script>
	// 引入uCharts 方法组件。
	import uCharts from '@/u-charts/u-charts.js';
	// 定义全局变量
	var _self;
	var canvaLineA=null;
	export default {
		data() {
			return {
				cWidth:'',
				cHeight:'',
				pixelRatio:1,
			}
		},
		// 页面加载执行的函数
		mounted() {
			_self = this;
			this.cWidth=uni.upx2px(750);
			this.cHeight=uni.upx2px(450);
			this.getServerData();
		},
		methods: {
			// 获取数据，发请求
			getServerData(){
				uni.request({
					url: this.websiteUrl+'/weather/temp7d',
					data:{
						city: uni.getStorageSync('list')[uni.getStorageSync('cityIndex')].city,
					},
					success: (res)=> {
						let LineA={categories:[],series:[]};
						LineA.series=[{
							name:"最高",
							data:[],
							color:'#409eff',
							textColor:'#409eff',
						},{
							name:"最低",
							data:[],
							color:'#7FFFD4',
							textColor:'#7FFFD4',
						}];
						var maxArray=new Array();
						for(var i=0;i<7;i++)
						{
							LineA.categories[i]=res.data.data[i].day.substring(5);
							maxArray[i]=res.data.data[i].tem_max;
							LineA.series[0].data[i]=res.data.data[i].tem_max;
							LineA.series[1].data[i]=res.data.data[i].tem_min;
						}
						var max=maxArray[0];
						for(var i=0;i<7;i++)
						{
						if(max<maxArray[i]){max=maxArray[i];}
						}//找出最大的那个温度数据
						_self.showLineA("canvasLineA",LineA,max);
						console.log(res.data)
					},					// 请求成功的回调函数
				});					
					},
			showLineA(canvasId,chartData,maxData){
				canvaLineA=new uCharts({
					$this:_self,
					canvasId: canvasId,
					type: 'line',
					fontSize:13,
					legend:{show:false},
					dataLabel:true,
					dataPointShape:true,
					pixelRatio:_self.pixelRatio,
					categories: chartData.categories,
					series: chartData.series,
					animation: true,
					// x轴显示的内容
					xAxis: {
						type:'grid',
						gridType:'dash',
						disableGrid:true,
						gridType:'dash',
						fontColor:'white',
					},
					// y轴显示的内容
					yAxis: {
						    disabled:true,
						    disableGrid:true,
						    max:parseInt(maxData)+1,//为了保证最大的数据能够完成的在图标里面显示出来
					},
					width: _self.cWidth*_self.pixelRatio,
					height: _self.cHeight*_self.pixelRatio,
					extra: {
                           lineStyle: 'straight'
					}
				});
				
			},
		}
	}
</script>

<style>
	.charts {width: 100%;height: 500upx;}
</style>