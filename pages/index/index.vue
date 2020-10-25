<template>
	 <view class="content" >
       <view>
       	<u-navbar back-text="退出" title="伴我天气":background="background">
       		<view class="slot-wrap">
       		</view>
       		<view class="iconfont icon-weizhi" style="display:inline-block;font-size:40px;color:black;padding-top:5px;text-align:right" @tap="changeCity"></view>
       	</u-navbar>	 
       </view>
	   <view>    
		 <ul class="ban">
        <li v-for="(ban,num) in menus" :class="{active:currentNumber==num}" :data-current="num" >
        </li>
      </ul>
	  </view>
	  <u-toast ref="uToast" />
    <swiper class="swiper" :duration="600" :disable-touch="false" :current="currentNumber" @change="getChange" touch-action: none>
    <swiper-item v-for="(item, number) in menus" :key="item.id">	
	   <view> 
	    <view style="text-align: center;font-size: 20px;">{{menus[number].city}}</view>
		 <view style="padding-bottom:50px;padding-top:50px;text-align: center;color:white">
			<view style="font-size:90px;">{{ tem }}<div style="display:inline-block;font-size: 40rpx;width:25px;">{{wea}}</div></view>		 
			<view style="font-size:15px;">{{quality}}<div style="display:inline-block;padding-left:53px;font-size: 13px;">{{aiq}}</div></view>
			<view style="font-size:15px;">{{wind_dir}}<div style="display:inline-block;padding-left:75px;font-size: 13px;font-size: 13px;">{{wind_scale}}</div></view>
		</view>
		 <!-- 具体天气情况以及位置信息 -->
		 <view class="prompt">
		 <p style="color:white;font-size:30px;text-align: center;">{{slogan}}</p>
		 </view>
		 <!-- 提示语 -->
          <view class="tomorrow">
			  <view style="float: left;width:50%;height:69px;border-right: 1px  solid white;">		  
			  <view style="text-align: center;">
		  		  <u-loading style="margin:10px auto;" mode="flower" size="100"  :show="state1" ></u-loading>
		          </view>{{ weekdayDatas[0].week_day }}<div>{{ weekdayDatas[0].tem_min }}{{sign1}}{{ weekdayDatas[0].tem_max }}{{sign2}}</div><br/><p :class="weekdayIcon[0]" style="font-size:40px;display: inline-block;color:#f4ea2a"></p><div style="font-size: 20px;">{{ weekdayDatas[0].wea }}</div></view>
			  <view style="float: left;width:50%;height:69px;border-left: 1px  solid white;">		 
			  <view style="text-align: center;">
		  		  <u-loading style="margin:10px auto;" mode="flower" size="100"  :show="state2" ></u-loading>
		          </view>{{ weekdayDatas[1].week_day}}<div>{{ weekdayDatas[1].tem_min }}{{sign1}}{{ weekdayDatas[0].tem_max }}{{sign2}}</div><br/><p :class="weekdayIcon[1]" style="font-size:40px;display: inline-block;color:#f4ea2a"></p><div style="font-size: 20px;">{{ weekdayDatas[1].wea }}</div></view>
	      </view>
		  <!-- 今天和明天的天气情况 -->
		  <view class="oneDay">
		  <view class="title">未来24小时的温度情况</view>
		  <view style="text-align: center;">
		  		  <u-loading style="margin:50px auto;" mode="flower" size="200"  :show="state3" ></u-loading>
		  </view>
		  <view class="twentyFour" @touchmove.stop>
		  <ul id = "list" >
		    <li v-for="(twentyFourData,index1) in twentyFourDatas">
		  	    <view>{{ twentyFourDatas[index1].time}}</br>{{ twentyFourDatas[index1].tem}}{{sign3}}<p :class="twentyFourIcon[index1]" style="font-size:50px;color:#f4ea2a"></p>{{ twentyFourDatas[index1].wea }}</view>
		    </li>
		  </ul>
		  </view>
		  </view>
		  <!-- 24小时天气监控 -->
		  <view class="oneDay">
		  <view class="title">未来7天的天气具体情况</view>
		  <view style="text-align: center;">
		  		  <u-loading style="margin:50px auto;" mode="flower" size="200"  :show="state4" ></u-loading>
		  </view>
		  <view class="seven"@touchmove.stop>
		  <ul  id = "list">		  
             <li v-for="(sevenData,index2) in sevenDatas">
			  <view>{{sevenDatas[index2].week_day}}</br>{{sevenDatas[index2].day}}</br><span style="font-size:12px">{{sevenDatas[index2].tem_min}}{{sign4}}{{sevenDatas[index2].tem_max}}{{sign5}}</span><p :class="weekdayIcon[index2]" style="font-size:50px;color:#f4ea2a"></p></br>{{sevenDatas[index2].wea}}</br>{{sevenDatas[index2].wind_dir}}</br>{{sevenDatas[index2].wind_scale}}</br>{{sevenDatas[index2].aiq}}</view>
		     </li>
		  </ul>
		  </view>
		  </view>
		  <!-- 未来7天的天气具体情况 -->
		<view class="mycharts">
		  <u-subsection :list="list" :current="current"  mode="subsection" @change="sectionChange" active-color="#fcbd71" style="margin-top:10rpx" ></u-subsection>
		              <view v-if="current === 0" class="charts">
		                  <myCharts1/>
						  <!-- 温度折线图 -->
		              </view>
		              <view v-if="current === 1" class="charts">
						 <myCharts2/>
		                  <!-- 空气质量图 -->
		              </view>
		              <view v-if="current === 2" class="charts">
						  <myCharts3/>
		                  <!-- 降水量柱状图 -->
		              </view>
					  <view v-if="current === 3" class="charts">
						  <myCharts4/>
					      <!-- 风力风向雷达图 -->
					  </view>
		  </view>
		  <!-- 4个数据的图表展示 -->
		  </view>
    </swiper-item>  
</swiper>
	</view>
</template>

<script>
	    import myCharts1 from '../../components/table1.vue';
		import myCharts2 from '../../components/table2.vue';
		import myCharts3 from '../../components/table3.vue';
		import myCharts4 from '../../components/table4.vue';
		export default {
			    components: {
			        myCharts1,myCharts2,myCharts3,myCharts4
			    },
			data() {
				return {
					// city:"城市",
					slogan:'',
					scrollTop: 0,
					background: {
					backgroundColor: 'yellow',},
					currentNumber:0,
					tem:"",
					quality:"",
					wea:"",
					aiq:"",
					wind_dir:"",
					wind_scale:"",
					todayIcon:'iconfont icon-tianqi_qingtian',
					weekdayIcon:[],
					twentyFourIcon:[],	
					weekdayDatas:
					[{
						"week_day":"",
						"tem_min":"",
						"tem_max":"",
						"wea":"",
		            },{
						"week_day":"",
						"tem_min":"",
						"tem_max":"",
						"wea":"",
		            }],
				    twentyFourDatas:[{
						"time": "",
						"tem": "",
						"wea": "",
					}],
					sevenDatas: [{
								"week_day": "",
								"day": "",
								"tem_max": "",
								"tem_min": "",
								"wea": "",
								"wind_dir":"",
								"wind_scale": "",
								"aiq": "",
					}],
					list: [
						{
							name: '温度'
						}, 
						{
							name: '空气质量'
						}, 
						{
							name: '降水量'
						},
						{
							name: '风力风向'
						}
					],
				    menus: [],
					current:0,
					state1:true,
					state2:true,
					state3:true,
					state4:true,
					sign1:"",
					sign2:"",
					sign3:"",
					sign4:"",
					sign5:"",
					 }
			},
			onReady(){
				console.log(this.menus)
				this.showToast();
			},
			onLoad(){
				uni.setStorageSync('cityIndex',0)
				if(uni.getStorageSync('list')==='')
				{console.log('无城市')}
				else{
					this.menus= uni.getStorageSync('list');
					console.log(this.menus)
					this.getWeaNowData();//当天的温度信息
					this.getWeekdayData();//未来七天的温度信息	
					this.getTwentyFourData();//未来24小时的温度信息
				}
			},
			methods: {
				showToast(){
					if(this.menus==''){
					this.$refs.uToast.show({
						title: '请先添加城市',
						type: 'warning',
						url: '/pages/search/search'
					})
					}
				},
				changeCity(){
					// uni.clearStorageSync('list');
					uni.navigateTo({
						url:"/pages/city/city",
					})
				},
				getChange:function(e){	
							var index=e.target.current|| e.detail.current;
							this.currentNumber = index;
							uni.setStorageSync('cityIndex', index);
							console.log(uni.getStorageSync('cityIndex'));
							this.getWeaNowData();//当天的温度信息
							this.getTwentyFourData();//未来24小时的温度信息
							this.getWeekdayData();//未来七天的温度信息	
				},
				getWeaNowData(){						
					uni.request({
						url: this.websiteUrl+'/weather/weaNow',
						data:{
							city:this.menus[uni.getStorageSync('cityIndex')].city,
						},
						success: (res)=> {
						   this.tem=res.data.data.tem;//当天的温度
						   this.wea=res.data.data.wea;//当天的天气
						   this.quality='空气质量',
						   this.wind_dir=res.data.data.wind_dir;//当天的风力方向
						   this.wind_scale=res.data.data.wind_scale;//当天的风力大小
						   this.menus[uni.getStorageSync('cityIndex')].tem=res.data.data.tem;
						   this.menus[uni.getStorageSync('cityIndex')].wea=res.data.data.wea;
						   this.menus[uni.getStorageSync('cityIndex')].aiq=res.data.data.aiq;
						   uni.setStorageSync('list',this.menus);//为了让 city列表里面的数据能够更新
						   this.aiq=res.data.data.aiq;//当天的空气质量指数
						   if(res.data.data.wea==='小雨'||res.data.data.wea==='中雨'||res.data.data.wea==='大雨'||res.data.data.wea==='阵雨'||res.data.data.wea==='雷阵雨')
						   this.slogan=this.sloganArray[0];
						   if(res.data.data.wea==='多云'||res.data.data.wea==='阴')
						   this.slogan=this.sloganArray[1];
						   if(res.data.data.wea==='晴')
						   this.slogan=this.sloganArray[2];
						   if(res.data.data.wea==='小雪'||res.data.data.wea==='中雪'||res.data.data.wea==='大雪')
						   this.slogan=this.sloganArray[3];		
						   console.log(res.data)
						},
					});
				},//获取当天的天气情况
				getWeekdayData(){
					console.log(this.menus)
					uni.request({
						url: this.websiteUrl+'/weather/wea7d',
						data:{
							city:this.menus[uni.getStorageSync('cityIndex')].city,
						},
						success: (res)=> {
							this.weekdayDatas=res.data.data;
							this.state1=false;
							this.state2=false;
							this.sign1='~';
							this.sign2='°';
							this.sign4='/',
							this.sign5='°';
							this.sevenDatas=res.data.data;
							for(var i=0;i<7;i++)
							{
						     this.sevenDatas[i].day=res.data.data[i].day.substring(5);
							 if(res.data.data[i].aiq>=0&&res.data.data[i].aiq<=50)
							 this.sevenDatas[i].aiq='优';
							 else if(res.data.data[i].aiq>50&&res.data.data[i].aiq<=100)
							 this.sevenDatas[i].aiq='良好';
							 else if(res.data.data[i].aiq>100&&res.data.data[i].aiq<=200)
							 this.sevenDatas[i].aiq='轻度';
							 else if(res.data.data[i].aiq>200&&res.data.data[i].aiq<=300)
							 this.sevenDatas[i].aiq='中度';
							 else if(res.data.data[i].aiq>300)
							 this.sevenDatas[i].aiq='重度';
							 for(var j=0;j<11;j++)
							 {
							 if(res.data.data[i].wea===this.weatherArray[j]){this.weekdayIcon[i]=this.iconArray[j]; break;}
							 } 
							}	
							this.state4=false
							console.log(res.data)
						},
					});
				},//获取未来七天的天气情况
				getTwentyFourData(){
					uni.request({
						url: this.websiteUrl+'/weather/weather24h',
						data:{
							city:this.menus[uni.getStorageSync('cityIndex')].city,
						},
						success: (res)=> {
							this.twentyFourDatas=res.data.data;
							this.sign3='°';
							for(var i=0;i<24;i++)
							{
							 for(var j=0;j<11;j++)
							 {
							 if(res.data.data[i].wea===this.weatherArray[j]){this.twentyFourIcon[i]=this.iconArray[j]; break;}
							 }
							}	
							this.state3=false
							console.log(res.data)
						},
					});
				},//获取未来24小时的天气情况
				sectionChange(index) {
					this.current = index;
				}
			}
		}
	</script>
	
	<style lang="scss" scoped>
			.slot-wrap {align-items: center;text-align:center;flex: 1;}
			.ban {text-align: center;padding:10px 0px 0px 0px;}
			.ban li {display: inline-block;width: 10px;height: 10px; margin-right:3px;border: 0.5px solid white;border-radius: 50%;background-color: transparent;}	
			.ban .active{ background-color:white;}
		    .tomorrow{margin: 40rpx;padding-bottom:20px;height: 70px;background-color: orange;border:1px solid orange;border-radius:3px;}
			.tomorrow view{font-size: 40rpx;color:white;float: left;padding-left:10px;}
			.tomorrow view div{display:inline-block;float: right;padding-right:20px;font-size: 38rpx;color:white}
			.wrap { padding: 40rpx;}
			#lists{ overflow-x: auto; list-style: none; white-space:nowrap; width: auto;padding:0rpx;text-align: center;}
			#list { overflow-x: auto; list-style: none; white-space:nowrap; width: auto;padding:0rpx;}
			.twentyFour ul li{ margin: 1px; display: inline-block;text-align:center;}
			.twentyFour ul li view{font-size: 35rpx;color:white;} 
			.twentyFour ul li view div{display:inline-block;padding-left:40rpx;font-size: 35rpx;color:white}
			.seven ul li{ margin: 1px; display: inline-block;   border-right:2px solid orange;border-radius:3px;text-align:center;}
			.seven ul li view{font-size: 35rpx;color:white;} 
			.seven ul li view div{display:inline-block;padding-left:40rpx;font-size: 35rpx;color:white}
			.prompt{margin: 40rpx; border:2px solid orange;border-radius:11px;padding:10px ;background-color:orange}
			.oneDay{margin: 40rpx; border:2px solid orange;border-radius:11px;padding:0px 0px 10px 0px; background-color:orange}
			.title{font-size:35rpx;color:white;border-top-right-radius:11px;border-top-left-radius:11px;border:2px solid  orange;background: orange;margin:-2px -2px 10px -2px;padding:5px 0px 5px 10px;}
			.charts{text-align: center;background-color:orange}
			.content {background-color:#f29100;background-size: 100% 100%;height: 100%;}
			swiper { height:1310px;color: #fff;}
	</style>