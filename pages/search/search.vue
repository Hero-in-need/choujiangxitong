<template>
	<view>
		<view >
		<u-input v-model="value" :type="type" :border="border"  placeholder="请输入需要查询的城市名" class="input"/>
		<u-button  class="button"  type="primary" @tap="cancel">添加</u-button>
		</view>
		<view style="visibility:hidden">伴我天气</view>
		<u-toast ref="uToast" />
	    <view style="border-bottom:3px solid #c8c9cc;margin: 0px 20px 0px 20px"></view>
		<view style="margin: 20px 20px 10px 20px;font-size: 15px;color:#82848a">国内推荐城市</view>
			<view class="wrap">
				<u-row gutter="16">
					<u-col span="3">
						<button class="demo-layout" @click="chooseOne"  :class="{active:currentOne==1}">成都</button>
					</u-col>
					<u-col span="3">
						<button class="demo-layout" @click="chooseTwo"   :class="{active:currentTwo==2}">涪城</button>
					</u-col>
					<u-col span="3">
						<button class="demo-layout" @click="chooseThree"  :class="{active:currentThree==3}">哈尔滨</button>
					</u-col>
				</u-row>
		</view>
		<view style="margin: 20px 20px 10px 20px;font-size: 15px;color:#82848a">国内热门城市</view>
	<view class="wrap">
		<u-row gutter="16">
			<u-col span="3">
				<button class="demo-layout"  @click="searchCity">北京</button>
			</u-col>
			<u-col span="3">
				<button class="demo-layout"  @click="searchCity">上海</button>
			</u-col>
			<u-col span="3">
				<button class="demo-layout"  @click="searchCity">深圳</button>
			</u-col>
			<u-col span="3">
				<button class="demo-layout"  @click="searchCity">广州</button>
			</u-col>
		</u-row>
		<u-row gutter="16">
			<u-col span="3">
				<button class="demo-layout"  @click="searchCity">武汉</button>
			</u-col>
			<u-col span="3">
				<button class="demo-layout"  @click="searchCity">长沙</button>
			</u-col>
			<u-col span="3">
				<button class="demo-layout"  @click="searchCity">南京</button>
			</u-col>
			<u-col span="3">
				<button class="demo-layout"  @click="searchCity">苏州</button>
			</u-col>
		</u-row>
		<u-row gutter="16">
			<u-col span="3">
				<button class="demo-layout"  @click="searchCity">西安</button>
			</u-col>
			<u-col span="3">
				<button class="demo-layout"  @click="searchCity">济南</button>
			</u-col>
			<u-col span="3">
				<button class="demo-layout"  @click="searchCity">青岛</button>
			</u-col>
			<u-col span="3">
				<button class="demo-layout"  @click="searchCity">沈阳</button>
			</u-col>
		</u-row>
		<u-row gutter="16">
			<u-col span="3">
				<button class="demo-layout"  @click="searchCity">重庆</button>
			</u-col>
			<u-col span="3">
				<button class="demo-layout"  @click="searchCity">郑州</button>
			</u-col>
			<u-col span="3">
				<button class="demo-layout"  @click="searchCity">黑龙江</button>
			</u-col>
			<u-col span="3">
				<button class="demo-layout"  @click="searchCity">杭州</button>
			</u-col>
		</u-row>
		<u-row gutter="16">
			<u-col span="3">
				<button class="demo-layout"  @click="searchCity">厦门</button>
			</u-col>
			<u-col span="3">
				<button class="demo-layout"  @click="searchCity">香港</button>
			</u-col>
			<u-col span="3">
				<button class="demo-layout"  @click="searchCity">澳门</button>
			</u-col>
			<u-col span="3">
				<button class="demo-layout"  @click="searchCity">台北</button>
			</u-col>
		</u-row>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value: '',
				type: 'text',
				border: true,
				cityName:'',
				currentOne:0,
				currentTwo:0,
				currentThree:0,
			}
		},
		onReady(){
			if(uni.getStorageSync('list')=='')
			{
			uni.setStorageSync('current1',0);
			uni.setStorageSync('current2',0);
			uni.setStorageSync('current3',0);
			}
			else {
				for(var i=0;i<uni.getStorageSync('list').length;i++)
				{
				if(uni.getStorageSync('list')[i].city=='成都')
				{uni.setStorageSync('current1',1);break;}
				else {uni.setStorageSync('current1',0)}
				}
				for(var i=0;i<uni.getStorageSync('list').length;i++)
				{
				if(uni.getStorageSync('list')[i].city=='涪城')
				{uni.setStorageSync('current2',2);break;}
				else {uni.setStorageSync('current2',0)}
				}
				for(var i=0;i<uni.getStorageSync('list').length;i++)
				{
				if(uni.getStorageSync('list')[i].city=='哈尔滨')
				{uni.setStorageSync('current3',3);break;}
				else {uni.setStorageSync('current3',0)}
				}
			}
			if(uni.getStorageSync('current1')==''||uni.getStorageSync('current1')==0){console.log(1)}
			else {this.currentOne=1}
			if(uni.getStorageSync('current2')==''||uni.getStorageSync('current2')==0){console.log(2)}
			else {this.currentTwo=2}
			if(uni.getStorageSync('current3')==''||uni.getStorageSync('current3')==0){console.log(3)}
			else {this.currentThree=3}
		},
		methods:{
			cancel(){
				uni.redirectTo({
					url:'/pages/city/city?cityName='+this.value,
				})
			}, 
			chooseOne(){
				this.currentOne=1;
				uni.setStorageSync('current1',1)
				uni.redirectTo({
				url:'/pages/city/city?cityName=成都',
				})
			},
			chooseTwo(){
				this.currentTwo=2;
				uni.setStorageSync('current2',2)
				uni.redirectTo({
				url:'/pages/city/city?cityName=涪城',
				})
			},
			chooseThree(){
				this.currentThree=3;
				uni.setStorageSync('current3',3)
				uni.redirectTo({
				url:'/pages/city/city?cityName=哈尔滨',
				})
			},
			searchCity(){
				this.$refs.uToast.show({
					title: '暂无该城市信息',
					type: 'warning',
				})
			}
		}
	}
</script>
<style scoped lang="scss" >
	.input{margin: 50px 20px 15px 20px;width: 70%;float: left;height:37px;}
	.button{float:left;width: 13%;margin: 50px 5px  5px  5px;}
	.wrap {padding: 0px 20px 0px 20px;}
	.u-row {margin: 40rpx 0;}
	.demo-layout {background: #99a9bf;font-size:15px;}
	.active{background: #2979ff;pointer-events: none;}
</style>