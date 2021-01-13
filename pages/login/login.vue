<template>
	<view class="container">
		<image class="background" src="/static/indexBackground.jpg" mode="aspectFill"></image>
		<view class="box-container">
			<view class="display-container">
				<view class="title">
					<text>患者监护系统</text>
				</view>
				<view class="group">
					<text><b>软件工程第25组</b></text>
				</view>
				<view class="member">
					<text><b>小组成员：夏江涵、邹迪、朴靖龙</b></text>
				</view>
			</view>
			<view class="login-container">
				<input class="input-box" type="text" v-model="accountNum" placeholder="请输入账号" placeholder-class="placeholderclass"></input>
				<input class="input-box" type="text" v-model="pwd" placeholder="请输入密码" placeholder-class="placeholderclass"></input>
				<button class="login-btn" @click="startLogin" >登录</button>
				<view class="line-container">
					<view @click="naviTo('/pages/register/register')">注册账号(仅病人)</view>
					<view>忘记密码</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import serverURL from '../../json.js'
	import {mapState,mapMutations} from 'vuex'
	export default {
		data() {
			return {
				accountNum: null,
				pwd: null
			}
		},
		onLoad(){
			this.$nextTick(function(){
				let userId=uni.getStorageSync('ID');
				console.log(userId);
				if(userId){
					uni.showModal({
					    content: '是否进行指纹登录？',
					    success: (res) => {
					        if (res.confirm) {
					           this.startSoterAuthenticationFingerPrint();
					        } 
					    }
					});
				}
			})
		},
		computed:{
			...mapState(['userID','userName','userType','userSex','userAge','userType','userContact','docDepartment','patientAddress']),
		},
		methods: {
			...mapMutations([
				'login'
			]),
			naviTo(url){
				uni.navigateTo({
					url
				})
			},
			startLogin(){
				console.log(this.accountNum);
				console.log(this.pwd);
				uni.request({
					url: serverURL + '/login',
					method: 'GET',
					data: {
						id: this.accountNum,
						password: this.pwd
					},
					success: (res) => {
						if(res.data==0){
							let provider={
								userID: '',
								userName: '',
								userSex: '',
								userAge: 0,
								userType: 2,
								userContact: '',
								docDepartment: '',
								patientAddress: '',
								userPwd: ''
							}
							if(this.accountNum[0]=='P'){
								uni.request({
									url: serverURL + '/patient/getDetailMessage',
									method: 'GET',
									success: (res) => {
										console.log(res.data);
										provider.userID=this.accountNum;
										provider.userName=res.data.patientName;
										provider.userSex=res.data.patientSex;
										provider.userAge=res.data.patientAge;
										provider.userType=0;
										provider.userContact=res.data.patientContact;
										provider.patientAddress=res.data.patientAddress;
										provider.userPwd=this.pwd;
										console.log(provider);
										this.login(provider);
										console.log(this.userName);
										this.setTabBar(true);
										uni.switchTab({
											url: '/pages/tabBar/index'
										})
									},
									fail: () => {
										console.log("无法获取病人信息");
									}
								})
							}
							else if(this.accountNum[0]=='D'){
								uni.request({
									url: serverURL + '/reception/getDoctor',
									method: 'GET',
									success: (res) => {
										provider.userID=res.data.doctorId;
										provider.userName=res.data.doctorName;
										provider.userSex=res.data.doctorSex;
										provider.userAge=res.data.doctorAge;
										provider.userType=2;
										provider.userContact=res.data.doctorContact;
										provider.docDepartment=res.data.doctorDepartment;
										provider.userPwd=this.pwd;
										this.login(provider);
										this.setTabBar(false);
										uni.switchTab({
											url: '/pages/tabBar/index'
										})
									},
									fail: () => {
										console.log("无法获取医生信息");
									}
								})
							}
							else if(this.accountNum[0]=='N'){
								uni.request({
									url: serverURL + '/reception/getNurse',
									method: 'GET',
									success: (res) => {
										provider.userID=res.data.nurseId;
										provider.userName=res.data.nurseName;
										provider.userSex='女';
										provider.userAge=res.data.nurseAge;
										provider.userType=1;
										provider.userContact=res.data.nurseContact;
										provider.userPwd=this.pwd;
										this.login(provider);
										this.setTabBar(false);
										uni.switchTab({
											url: '/pages/tabBar/index'
										})
									},
									fail: () => {
										console.log("无法获取护士信息");
									}
								})
							}
						}
						else
							uni.showToast({
								title: '账号或密码错误！',
								icon: 'none',
								duration: 1000
							})
					},
					fail: () => {
						console.log("访问失败");
					},
				})
			},
			setTabBar(isPatient){
				if(isPatient){
					uni.setTabBarItem({
					  index: 1,
					  text: '状况',
					  pagePath: "/pages/tabBar/myCondition"
					})
					uni.setTabBarItem({
					  index: 2,
					  text: '费用',
					  pagePath: "/pages/tabBar/myCost",
					  iconPath: 'static/cost_normal.png',
					  selectedIconPath: 'static/cost_pressed.png'
					})
				}
				else{
					uni.setTabBarItem({
					  index: 1,
					  text: '查询',
					  pagePath: "/pages/tabBar/search"
					})
					uni.setTabBarItem({
					  index: 2,
					  text: '病床',
					  pagePath: "/pages/tabBar/beds",
					  iconPath: 'static/tab_icon_bed_normal.png',
					  selectedIconPath: 'static/tab_icon_bed_pressed.png',
					})
				}
			},
			startSoterAuthenticationFingerPrint() {
                uni.startSoterAuthentication({
                    requestAuthModes: ['fingerPrint'],
                    authContent: '请用指纹登录',
                    success: (res) => {
                        if(res.errCode==0){
							let userId=uni.getStorageSync('ID');
							let userPwd=uni.getStorageSync('pwd');
							this.accountNum=userId;
							this.pwd=userPwd;
							console.log(this.accountNum);
							this.startLogin();
						}
                    },
                    fail(err) {
                        console.log(err);
                    },
                    complete(res) {
                        console.log(res);
                    }
                })
            },
		}
	}
</script>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: column;
		width: 750upx;
		.background{
			position: fixed;
			z-index: -1;
			width: 750upx;
			height: 1624upx;
			opacity: 0.2;
		}
		.box-container{
			position: absolute;
			top: 400upx;
			bottom: 400upx;
			.display-container{
				width: 750upx;
				.title{
					height: 100upx;
					line-height: 100upx;
					text-align: center;
					font-size: 64upx;
					font-weight: bold;
					color: 	#1E90FF;
					text-shadow: 5px 5px 5px #696969;
				}
				.group{
					text-align: center;
					height: 100upx;
					line-height: 100upx;
				}
				.member{
					text-align: center;
					height: 100upx;
					line-height: 100upx;
				}
			}
			.login-container{
				width: 750upx;
				padding-top: 20upx;
				padding-bottom: 20upx;
				.input-box{
					margin: 10upx 125upx;
					border-radius: 10upx;
					width: 500upx;
					height: 80upx;
					background-color: white;
					border-style: solid;
					border-width: 5upx;
					border-color: #808080;
				}
				.placeholderclass{
					line-height: 80upx;
					color: #C4C4C4;
					font-size: 32upx;
				}
				.login-btn{
					margin: 10upx 125upx;
					border-radius: 10upx;
					width: 500upx;
					height: 80upx;
					line-height: 80upx;
					font-size: 36upx;
					font-weight: bold;
					color: white;
					background-color: #00BFFF;
				}
				.line-container{
					margin: 20upx 125upx;
					width: 500upx;
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					color: #1E90FF;
				}
			}
		}
	}
</style>
