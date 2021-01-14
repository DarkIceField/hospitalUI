<template>
	<view class="container"> 
		<hx-navbar :fixed="true" :config="config"></hx-navbar>
		<view class="top">
			<view class="background"></view>
			<swiper class="swiper-box" indicator-dots="true" indicator-color="rgba(255, 255, 255)" indicator-active-color="#00BFFF" circular="true">
				<swiper-item v-for="(src,index) in itemSrc" :key="index">
					<view class="swiper-image">
						<image :src="src" mode="scaleToFill"/>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="tab">
			<view class="tab-box" v-for="(tab,index) in tabBox" v-if="userType==0 ? tab.isPatient: !tab.isPatient" @click="turn(tab)">
				<image class="tab-image" :src="tab.src"></image>
				<text class="tab-text">{{tab.title}}</text>
			</view>
		</view>
		<view class="report" >
				<textarea class="report_word" disabled="true"v-model="content"></textarea>
		</view>
		<view class="phone">
			<span class="phone_title">热线电话：</span>
			<span class="phone_word" >4008823823</span>
		</view>
	</view>
</template>

<script>
	import {mapState,mapMutations} from 'vuex'
	import multiSelect from '../../components/xfl-select/xfl-select.vue'
	export default {
		data() {
			return {
				config:{
					title: '浙江工业大学校医院',
					back: false,
					color: '#FFFFFF',
					backgroundColor: [1,'#00BFFF'],
					style_Container: "'height: 50px; font-size: 16px;'"
				},
				itemSrc:[
				'/static/roundImage1.jpg',
				'/static/roundImage2.jpg',
				'/static/roundImage3.jpg',
				'/static/roundImage4.jpg'],
				tabBox:[{
					title: '健康码',
					src: '/static/tab_code.png',
					isPatient: false,
					isTab: false,
					url: '../file/code'
				},{
					title: '健康码',
					src: '/static/tab_code.png',
					isPatient: true,
					isTab: false,
					url: '../file/code'
				},{
					title: '健康贴士',
					src: '/static/tab_tips.png',
					isPatient: false,
					isTab: false,
					url: '../file/tips'
				},{
					title: '健康贴士',
					src: '/static/tab_tips.png',
					isPatient: true,
					isTab: false,
					url: '../file/tips'
				},{
					title: '病例查询',
					src: '/static/tab_case.png',
					isPatient: false,
					isTab: true,
					url: './search'
				},{
					title: '个人信息',
					src: '/static/tab_msg.png',
					isPatient: false,
					isTab: true,
					url: './mine'
				},{
					title: '个人信息',
					src: '/static/tab_msg.png',
					isPatient: true,
					isTab: true,
					url: './mine'
				},{
					title: '病例查询',
					src: '/static/tab_case.png',
					isPatient: true,
					isTab: true,
					url: './myCondition'
				},{
					title: '住院费用',
					src: '/static/tab_cost.png',
					isPatient: true,
					isTab: true,
					url: './myCost'
				},{
					title: '医院排班',
					src: '/static/tab_schedule.png',
					isPatient: false,
					isTab: false,
					url: '../file/schedule'
				},{
					title: '病床查看',
					src: '/static/tab_bed.png',
					isPatient: false,
					isTab: true,
					url: './beds'
				},{
					title: '医院介绍',
					src: '/static/tab_hospital.png',
					isPatient: true,
					isTab: false,
					url: '../file/introduce'
				}],
				content: '医院春节放假通知2021年春节在即，根据国务院办公厅节假日安排的通知并结合本院的实际情况，将春节期,间的放假安排通知如下\n1、为了方便市民在春节假期间就诊，2月18日-2月24日(除夕至初六）医院普通门诊正常开放，市民可通过以下方式预约就诊。\n电话预约:400-677-0366\n2、2月18日-2月24日（除夕至初六）特需专家门诊停诊，2月25日（年初七）正常上班。'
			}
		},
		computed: {
			...mapState(['userType']),
		},
		methods: { 	
			turn(tab){
				// console.log(tab);
				if(tab.isTab)uni.switchTab({
					url: tab.url
				})
				else uni.navigateTo({
					url: tab.url
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F4F6F8;
	}
	.container {
		background-color: #f4f6f8;
		.top {
			.background {
				position: absolute;
				width: 750upx;
				height: 360upx;
				background-image: linear-gradient(to top, #F4F6F8,#00BFFF);
			}
			.swiper-box {
				position: relative;
				top: 40upx;
				width: 686upx;
				height: 280upx;
				border-radius: 28upx;
				margin: 0 auto;
				box-shadow: 0px 10px 15px #888888;
				.swiper-image {
					width: 686upx;
					height: 280upx;
					image {
						width: 100%;
						height: 100%;
						opacity: 0.7;
						display: inline-block;
						border-radius: 20upx;
					}
				}
			}
		}
		.tab {
			position: absolute;
			top: 500upx; 
			font-size: 32upx;
			width: 686upx;
			height: 300upx;
			margin: 0 32upx;
			// background-color: yellow;
			display: flex;
			justify-content: space-around;
			flex-wrap: wrap;
			.tab-box{
				margin:20upx 50upx;
				width: 120upx;
				text-align: center;
				// background-color: blue;
				.tab-image{
					width: 120upx;
					height: 120upx;
				}
				.tab-text{
					font-size: 24upx;
				}
			}
		}
		.report {
			position: absolute;
			top: 964upx;
			background-color: #FFFFFF;
			width: 650upx;
			margin: 0 32upx;
			padding: 0 24upx;
			// height: 80upx;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			border-radius: 16upx;
			height: 160upx;
			align-items: center;
			background-color: rgba(0,191,255,0.5);
			.report_word {
				margin-left: 12upx;
				width: 600upx;
				height: 150upx;
				overflow: hidden;
				text-overflow: ellipsis;
				color: #FFFFFF;
				// background-color: yellow;
			}
			
		}
		.phone{
			position: absolute;
			bottom: 100upx;
			margin: 0 50upx;
			width: 650upx;
			height: 100upx;
			background-color: white;
			text-align: center;
			line-height: 100upx;
			.phone_title{
				// width: 600upx;
				// height: 150upx;
				// overflow: hidden;
				// text-overflow: ellipsis;
				font-size: 48upx;
				color: #00BFFF;
			}
			
			.phone_word{
				// width: 600upx;
				// height: 150upx;
				// overflow: hidden;
				// text-overflow: ellipsis;
				font-size: 32upx;
			}
		}
	}
</style>