<template>
			<canvas canvas-id="canvasArea" id="canvasArea" class="charts" ></canvas>
</template>

<script>
	import uCharts from '@/u-charts/u-charts.js';
	var _self;
	var canvaArea=null;
	export default {
		data() {
			return {
				cWidth:'',
				cHeight:'',
				pixelRatio:1,
			}
		},
		mounted() {
			_self = this;
			this.cWidth=uni.upx2px(750);
			this.cHeight=uni.upx2px(450);
			this.getServerData();
		},
		methods: {
			getServerData(){
					uni.request({
						url: this.websiteUrl+'/weather/aiq7d',
						data:{
							city:uni.getStorageSync('list')[uni.getStorageSync('cityIndex')].city,
						},
						success: (res)=> {				
						let Area={categories:[],series:[]};
						Area.categories= ['08-20','08-20','08-20','08-20','08-20','08-20','08-20'];
						Area.series=[{
								name: '空气',
								data: [120,300,310,250,150,20,420],
								color: '#FFFFFF'
							},{
								name: '优',
								data: [50,50,50,50,50,50,50],
								color: '#2fc25b'
							}, {
								name: '良',
								data: [100,100,100,100,100,100,100],
								color: '#facc14'
							}, {
								name: '轻度',
								data: [200,200,200,200,200,200,200],
								color: '#f29100'
							}, {
								name: '中度',
								data: [300,300,300,300,300,300,300],
								color: '#fa3534'
							}, {
								name: '重度',
								data: [400,400,400,400,400,400,400],
								color: '#4B0082'
							}];
						_self.showArea("canvasArea",Area);
						console.log(res.data)
						for(var i=0;i<7;i++)
						{
						Area.categories[i]=res.data.data[i].day.substring(5);
						Area.series[0].data[i]=res.data.data[i].aiq;
						}
					},
					})
				},
			showArea(canvasId,chartData){
				canvaArea=new uCharts({
					$this:_self,
					canvasId: canvasId,
					type: 'area',
					fontSize:14,
					legend:{
						show:true,
						fontColor:'#FFFFFF',
						},
					dataLabel:false,
					dataPointShape:true,
					background:'#FFFFFF',
					pixelRatio:_self.pixelRatio,
					categories: chartData.categories,
					series: chartData.series,
					animation: true,
					xAxis: {
						type:'grid',
						gridType:'dash',
						disableGrid:true,
						axisLineColor:'transparent',
						gridType:'dash',
						fontColor:'white',
					},
					yAxis: {
						disabled:true,
						disableGrid:true,
						min:0
					},
					width: _self.cWidth*_self.pixelRatio,
					height: _self.cHeight*_self.pixelRatio,
					extra: {
						area:{
							type: 'straight',
							opacity:0.2,
							addLine:true,
							width:2,
							gradient:true
						}
					}
				});
				
			},
		}
	}
</script>

<style>
.charts {width: 100%;height: 500upx;}
</style>