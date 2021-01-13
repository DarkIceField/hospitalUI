<template>
	<view class="container">
		<hx-navbar :fixed="true" :config="config"></hx-navbar>
		<scroll-view class="scroller" scroll-y="true">
			<view class="list-cell "  hover-class="cell-hover" :hover-stay-time="50">
				<text class="title-txt">序号</text>
				<text class="title-txt">药物名</text>
				<text class="title-txt">数量</text>
				<text class="title-txt">价格</text>
				<text class="title-txt">支付状态</text>
			</view>
			<view class="div"></view>
			<view class="item" v-for="(record,index) in files['费用']">
				<view class="list-cell"  hover-class="cell-hover" :hover-stay-time="50">
					<text class="cell-tit">{{index+1}}</text>
					<text class="cell-tit">{{files['费用'][index].name}}</text>
					<text class="cell-tit">{{files['费用'][index].num}}</text>
					<text class="cell-tit">{{files['费用'][index].price}}</text>
					<text class="cell-tit" v-if="files['费用'][index].condition">已支付</text>
					<view class="pay-btn" v-if="!files['费用'][index].condition" @click="pay(index)">未支付</view>
					<!-- <button >支付</button> -->
				</view>
				<view class="div"></view>
			</view>
		</scroll-view>
		<view class="total-container">
			<span class="title">总花费：</span>
			<span class="text">{{totalCost}}</span>
		</view>
	</view>
</template>

<script>
	import serverURL from '../../json.js'
	import {mapState,mapMutations} from 'vuex'
	export default{
		data(){
			return{
				config:{
					title: '费用',
					back: false,
					color: '#FFFFFF',
					backgroundColor: [1,'#00BFFF']
				},
			}
		},
		onLoad() {
			this.$nextTick(function(){
				// uni.request({
				// 	url: serverURL+'/getMedicineByPrescriptionId',
				// 	method:'GET',
				// 	data:{
				// 		patientId: this.userID
				// 	},
				// 	success: (res) => {
				// 		this.records=res.data;
				// 	},
				// 	fail: () => {
				// 		uni.showToast({
				// 			title: '调用药物信息接口失败！',
				// 			icon: 'none',
				// 			duration: 1000
				// 		})
				// 	}
				// })
				// uni.request({
				// 	url: serverURL+'/getCost',
				// 	method:'GET',
				// 	data:{
				// 		patientId: this.userID
				// 	},
				// 	success: (res) => {
				// 		this.totalCost=res.data;
				// 	},
				// 	fail: () => {
				// 		uni.showToast({
				// 			title: '调用花费接口失败！',
				// 			icon: 'none',
				// 			duration: 1000
				// 		})
				// 	}
				// })
			})
		},
		computed:{
			...mapState(['userID','userName','userType','userSex','userAge','userType','userContact','docDepartment','patientAddress','files']),
			totalCost: function(){
				let sum=0;
				for(let i=0;i<this.files['费用'].length;i++)
					if(!this.files['费用'][i].condition)sum+=this.files['费用'][i].price;
				return sum;
			}
		},
		methods:{
			...mapMutations(['pay']),
		}
	}
</script>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	
		.scroller {
			margin: 30upx 0;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			// background-color: #00BFFF;
			border-width: 0;
			border-top-width: 10upx;
			border-bottom-width: 10upx;
			border-style: solid;
			border-color: #87CEFA;
			height: 1000upx;
			.item{
				//background-color: blue;
			}
			.list-cell {
				display: flex;
				justify-content: space-between;
				height: 100upx;
				align-items: center;
				padding: 0upx 20upx;
				//background: #fff;
				position: relative;
	
				&.cell-hover {
					background: #fafafa;
				}
				.title-txt {
					height: 80upx;
					line-height: 80upx;
					font-size: 40upx;
					font-weight: bold;
					color: #8E8E8E;
					// width: 40upx;
				}
				.cell-tit {
					height: 80upx;
					line-height: 80upx;
					font-size: 40upx;
					color: #5E5E5E;
					// width: 40upx;
				}
	
				.cell-tip {
					position: absolute;
					right: 80upx;
					font-size: 28upx;
					color: #8E8E8E;
				}
				.pay-btn{
					height: 80upx;
					line-height: 80upx;
					text-align: center;
					width: 150upx;
					background-color: #00BFFF;
					font-size: 40upx;
					// font-color: white;
					color: white;
				}
			}
			.div {
				z-index: 3;
				height: 1upx;
				weight: 750upx;
				background-image: linear-gradient(to right, #FFFFFF 4%, #F2F2F2 4%);
			}
	
		}
		.total-container{
			display: flex;
			justify-content: space-around;
			align-items: center;
			margin: 100upx 200upx;
			height: 80upx;
			// background-color: purple;
			.title{
				// background-color: yellow;
				color: #00BFFF;
				text-align: center;
				font-size: 40upx;
				font-weight: bold;
			}
			.text{
				// background-color: red;
				text-align: center;
				font-size: 40upx;
				font-weight: bold;
				// background-color: white;
			}
		}
	}
</style>
