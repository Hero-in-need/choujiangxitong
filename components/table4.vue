<template>
			<canvas canvas-id="canvasRadar" id="canvasRadar" class="charts"></canvas>
</template>

<script>
	import uCharts from '@/u-charts/u-charts.js';
	var _self;
	var canvaRadar=null;
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
					url: this.websiteUrl+'/weather/wind7d',
					data:{
						city:uni.getStorageSync('list')[uni.getStorageSync('cityIndex')].city,
					},
					success: (res)=> {
						let Radar={categories:[],series:[]};
						Radar.categories=['北风', '东北风', '东风', '东南风', '南风', '西南风','西风','西北风'],
						Radar.series=[{
									name: '',
									data: [0,0,0,0,0,0,0,0],
								}, {
									name: '',
									data: [0,0,0,0,0,0,0,0],
								}, {
									name: '',
									data: [0,0,0,0,0,0,0,0],
								}, {
									name: '',
									data: [0,0,0,0,0,0,0,0],
								},{
									name: '',
									data: [0,0,0,0,0,0,0,0],
								}, {
									name: '',
									data: [0,0,0,0,0,0,0,0],
									color:'#00FFFF'
								},{
									name: '',
									data: [0,0,0,0,0,0,0,0],
									color:'#f29100'
								},{
									name: '',
									data: [0,0,0,0,0,0,0,0],
									color:'#FFA500',
								}]
								for(var i=0;i<7;i++)
								{
										Radar.series[i].name=res.data.data[i].day.substring(5);
										for(var j=0;j<=7;j++)
										{		
											if(res.data.data[i].wind_dir==Radar.categories[j])
											{
											  Radar.series[i].data[j]=parseInt(res.data.data[i].wind_scale.substring(0,1))+0.1*i;
											  break;
										    }
										}
							    }
								console.log(Radar)
						_self.showRadar("canvasRadar",Radar);
					},
					});
						},
			showRadar(canvasId,chartData){
				canvaRadar=new uCharts({
					$this:_self,
					canvasId: canvasId,
					type: 'radar',
					fontSize:13,
					legend:{
						show:true,
						fontColor:'#FFFFFF',
						},
					pixelRatio:_self.pixelRatio,
					animation: true,
					dataLabel: true,
					categories: chartData.categories,
					series: chartData.series,
					width: _self.cWidth*_self.pixelRatio,
					height: _self.cHeight*_self.pixelRatio,
					extra: {
						radar:
						{
							labelColor:'white',
							gridCount:3,
						}
					}
				});
			}
		}
	}
</script>

<style>
    .charts {width: 100%;height: 500upx;}
</style>
