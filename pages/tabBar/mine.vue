<template>
	<view class="container">
		<!-- 自定义导航栏 -->
		<hx-navbar :fixed="true" :config="config"></hx-navbar>
		<view class="setting-content">
			<view class="text">基础资料</view>
			<view class="list-cell"  hover-class="cell-hover" :hover-stay-time="50">
				<text class="cell-tit">姓名</text>
				<text class="cell-tip">{{userName}}</text> 
			</view>
			<view class="div"></view>
			<view class="list-cell"  hover-class="cell-hover" :hover-stay-time="50">
				<text class="cell-tit">性别</text>
				<text class="cell-tip">{{userSex}}</text>
			</view>
			<view class="div"></view>
			<view class="list-cell" hover-class="cell-hover" :hover-stay-time="50" >
				<text class="cell-tit">年龄</text>
				<text class="cell-tip">{{userAge}}</text>
			</view>
			<view class="text">身份资料</view>
			<view class="list-cell"  hover-class="cell-hover" :hover-stay-time="50">
				<text class="cell-tit">身份</text>
				<text class="cell-tip">{{getStringType(userType)}}</text>
			</view>
			<view class="div"></view>
			<view class="list-cell"  hover-class="cell-hover" :hover-stay-time="50">
				<text class="cell-tit">ID</text>
				<text class="cell-tip">{{userID}}</text>
			</view>
			<view class="div"></view>
			<view class="list-cell"  hover-class="cell-hover" :hover-stay-time="50">
				<text class="cell-tit">联系方式</text>
				<text class="cell-tip">{{userContact}}</text>
			</view>
			<view class="div"></view>
			<view class="list-cell"  hover-class="cell-hover" :hover-stay-time="50" v-if="userType==2">
				<text class="cell-tit">所属科室</text>
				<text class="cell-tip">{{docDepartment}}</text>
			</view>
			<view class="div"></view>
			<view class="btn-container">
				<button class="log-out-btn" @click="toLogout">退出登录</button>
			</view>
		</view>
	</view>
</template>
<script>
	import {mapState,mapMutations} from 'vuex'
	import serverURL from '@/json.js'
	export default{
		data(){
			return{
				config:{
					title: '我的',
					back: false,
					color: '#FFFFFF',
					backgroundColor: [1,'#00BFFF']
				}
			}
		},
		computed:{
			...mapState(['userID','userName','userType','userSex','userAge','userType','userContact','docDepartment','patientAddress']),
		},
		methods:{
			...mapMutations([
				'logout'
			]),
			getStringType(type){
				if(type==0)return '患者';
				else if(type==1)return '护士';
				return '医生';
			},
			toLogout(){
				// console.log(this.userName);
				this.logout();
				uni.reLaunch({
					url: '/pages/login/login'
				})
			}
		}
	}
</script>
<style lang="scss">
	page {
		background: #F4F6F8;
	}
	
	.container {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		flex: 1;
	
		.setting-content {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			flex: 1;
	
			.text {
				height: 80upx;
				line-height: 80upx;
				font-size: 20upx;
				color: #8E8E8E;
				padding-left: 32upx;
			}
	
			.list-cell {
				display: flex;
				justify-content: space-between;
				height: 100upx;
				align-items: center;
				padding: 0upx 32upx;
				background: #fff;
				position: relative;
	
				&.cell-hover {
					background: #fafafa;
				}
	
				.cell-tit {
					font-size: 28upx;
					color: #5E5E5E;
				}
	
				.cell-tip {
					position: absolute;
					right: 80upx;
					font-size: 28upx;
					color: #8E8E8E;
				}
	
				.image-arrow {
					width: 32upx;
					height: 32upx;
				}
	
				.image-head {
					position: absolute;
					right: 80upx;
					width: 48upx;
					height: 48upx;
				}
			}
	
			.div {
				z-index: 3;
				height: 1upx;
				weight: 750upx;
				background-image: linear-gradient(to right, #FFFFFF 4%, #F2F2F2 4%);
			}
	
			.btn-container {
				display: flex;
				flex-direction: column;
				align-items: center;
	
				.log-out-btn {
					position: absolute;
					width: 560upx;
					height: 96upx;
					//margin-top: 400upx;
					bottom: 100upx;
					line-height: 96upx;
					//border-radius: 4upx;
					color: #00BFFF;
					border-color: #00BFFF;
					border-style: solid;
					border-radius: 14upx;
				}
			}
		}
	}
</style>