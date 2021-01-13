<template>
	<view class="container">
		<image class="background" src="/static/indexBackground.jpg" mode="aspectFill"></image>
		<view class="box-container">
			<view class="display-container">
				<view class="title">
					<text>欢迎注册</text>
				</view>
			</view>
			<view class="register-container">
				<input class="input-box" type="text" v-model="accountNum" placeholder="请输入账号" placeholder-class="placeholderclass"></input>
				<input class="input-box" type="text" v-model="pwd" placeholder="请输入密码" placeholder-class="placeholderclass"></input>
				<button class="register-btn" @click="register" >注册</button>
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
		computed:{
			...mapState(['userID','userName','userType','userSex','userAge','userType','userContact','docDepartment','patientAddress']),
		},
		methods: {
			...mapMutations([
				'login'
			]),
			register(){
				uni.request({
					url: serverURL+'/register',
					method:'GET',
					data:{
						id: this.accountNum,
						password: this.pwd
					},
					success: (res) => {
						if(res.data==1){
							uni.showToast({
								title: '注册成功！',
								icon: 'none',
								duration: 1000,
							})
							setTimeout(()=>{
								uni.navigateBack({
									delta: 1
								})
							},1000)
						}
						else{
							uni.showToast({
								title: '注册失败！',
								icon: 'none',
								duration: 1000,
							})
						}
					},
					fail: () =>{
						uni.showToast({
							title: '接口调用失败！',
							icon: 'none',
							duration: 1000,
						})
					}
				})
			}
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
			.register-container{
				margin-top: 100upx;
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
				.register-btn{
					margin: 100upx 125upx;
					border-radius: 10upx;
					width: 500upx;
					height: 80upx;
					line-height: 80upx;
					font-size: 36upx;
					font-weight: bold;
					color: white;
					background-color: #00BFFF;
				}
			}
		}
	}
</style>
