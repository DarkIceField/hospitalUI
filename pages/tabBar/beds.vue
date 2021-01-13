<template>
	<view class="container">
		<hx-navbar :fixed="true" :config="config"></hx-navbar>
		<scroll-view class="beds-container" scroll-y="true">
			<image v-for="(bed,index) in beds" @click="showBodyData(index)" :src="imgSrc(index)" class="bed-image" :class="{chosen: index==chosenIndex}" mode="widthFix"></image>
		</scroll-view>
		<view class="detail-container">
			<view class="detail-box">
				<view class="item">
					<view class="msg-item">
						<span class="title">病例卡号:</span>
						<span class="show">{{dataShow.patientId  }}</span>
					</view>
				</view>
				<view class="item">
					<view class="msg-item">
						<span class="title">姓名:</span>
						<span class="show">{{dataShow.patientName}}</span>
						<!-- chosenIndex==-1 ? '' : beds[chosenIndex].patientName -->
					</view>
				</view>
				<view class="item">
					<view class="msg-item">
						<span class="title">心跳:</span>
						<span class="show">{{dataShow.heartBeat}}</span>
					</view>
					<view class="msg-item">
						<span class="title">体温:</span>
						<span class="show">{{dataShow.temperature}}</span>
					</view>
				</view>
				<view class="item">
					<view class="msg-item">
						<span class="title">收缩压:</span>
						<span class="show">{{dataShow.sysPressure}}</span>
					</view>
					<view class="msg-item">
						<span class="title">舒张压:</span>
						<span class="show">{{dataShow.diaPressure}}</span>
					</view>
				</view>
				<view class="item">
					<view class="msg-item">
						<span class="title">血氧含量:</span>
						<span class="show">{{dataShow.bloodOxy}}</span>
					</view>
				</view>
			</view>
			<view class="btn-container">
				<button class="btn" @click="showDetail">详细信息</button>
				<button class="btn" v-if="isDoc" @click="showSubnvue">查房</button>
				<button class="btn" v-if="false">给药计划</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState,mapMutations} from 'vuex'
	import serverURL from '../../json.js'
	export default{
		data(){
			return{
				config:{
					title: '病床',
					back: false,
					color: '#FFFFFF',
					backgroundColor: [1,'#00BFFF']
				},
				beds:[],
				chosenIndex: -1,
				dataShow:{
					patientId: null,
					patientName: null,
					heartBeat: null,
					temperature: null,
					sysPressure: null,
					diaPressure: null,
					bloodOxy: null
				},
				intervalID: null,
				bedsIntervalID: null,
			}
		},
		onShow() {
			// console.log("123");
			this.$nextTick(function(){
				// console.log("456");
				uni.request({
					url: serverURL+'/bed/getBeds',
					method:'GET',
					success: (res) => {
						// console.log(res.data);
						this.beds=[];
						for(let i=0;i<res.data.length;i++){
							let bed = {bedId:'',patientId:''};
							bed.bedId=res.data[i].bedId;
							bed.patientId=res.data[i].patientId;
							// console.log(bed);
							this.beds.push(bed);
						}
						// console.log("????");
						// for(let i=0;i<this.beds.length;i++)
						// 	if(this.beds[i].patientId){
						// 		console.log(i,this.beds[i].patientId);
						// 		uni.request({
						// 			url: serverURL+'/doctor/getPatientMessage',
						// 			method:'GET',
						// 			data:{
						// 				patientId: this.beds[i].patientId
						// 			},
						// 			success: (res) => {
						// 				// console.log(res);
						// 				this.beds[i].patientName=res.data.patientName;
						// 			},
						// 			fail: () => {
						// 				console.log("getDetailMessage调用失败",i);
						// 			}
						// 		})
						// 	}
						let patientNo=0;
						for(let i=0;i<this.beds.length;i++){
							// console.log(this.beds[i]);
							if(this.beds[i].patientId)patientNo++;
						}	
						// console.log(patientNo);
						this.bedsIntervalID=setInterval(()=>{
							uni.request({
								url: serverURL+'/bed/getBodyDataList',
								method:'GET',
								success: (res) => {
									for(let i=0,j=0;i<this.beds.length;i++)
										if(this.beds[i].patientId){
											// console.log(res.data);
											this.beds[i].patientName=res.data[j].patientName;
											this.beds[i].heartBeat=res.data[j].heartbeat;
											this.beds[i].temperature=res.data[j].temperature;
											this.beds[i].sysPressure=res.data[j].systolicPressure;
											this.beds[i].diaPressure=res.data[j].diastolicPressure;
											this.beds[i].bloodOxy=res.data[j++].bloodOxygenContent;
											this.beds[i].condition=this.judgeCondition(i);
											// console.log(this.beds[this.chosenIndex]);
										}
								},
								fail: () => {
									console.log("getBodyDataList调用失败");
								}
							})
						},2000)
					},
					fail: () => {
						// console.log("getBeds调用失败");
					},
				})
				this.showBodyData(0);
			})
		},
		onHide() {
			clearInterval(this.bedsIntervalID);
		},
		computed:{
			...mapState(['userType']),
			isDoc: function(){
				if(this.userType==2)
					return true;
				return false;
			},
			isNurse: function(){
				if(this.userType==1)
					return true;
				return false;
			}
		},
		methods:{
			showSubnvue(){
				uni.$emit('popup-init', {
					type: '查房记录',
					patientId: this.cardNum
				});
				const subNVue = uni.getSubNVueById('fileEditorBeds')
				subNVue.show('zoom-out', 250)
			},
			judgeCondition(index){
				if(!this.beds[index].patientId)return 0;
				else if(this.inDanger(index)) return 2;
				return 1;
			},
			inDanger(index){
				if(this.beds[index].heartBeat<50 || this.beds[index].heartBeat>100)return true;
				else if(this.beds[index].temperature<36 || this.beds[index].temperature>38)return true;
				else if(this.beds[index].bloodOxy<0.95)return true;
				else if(this.beds[index].sysPressure>140 || this.beds[index].diasPressure<60)return true;
				return false;
			},
			imgSrc(index){
				if(this.beds[index].condition==1)return "../../static/bedGreen.png"
				else if(this.beds[index].condition==2)return "../../static/bedRed.png"
				return "../../static/bedGrey.png"
			},
			// imageStyle(index){
			// 	return{
			// 		'green-image': this.beds[index].condition==1,
			// 		'red-image': this.beds[index].condition==2,
			// 		'chosen': true//index==this.chosenIndex
			// 	}
			// },
			showDetail(){
				uni.switchTab({
					url: './search'
				})
				console.log(this.beds[this.chosenIndex].patientId);
				uni.$emit('search',{
					msg:this.beds[this.chosenIndex].patientId,
				})
			},
			showBodyData(index){
				if(this.intervalID){clearInterval(this.intervalID);}
				this.chosenIndex=index;
				// console.log(this.chosenIndex);
				//console.log(this.beds[index]);
				this.intervalID=setInterval(()=>{
					this.dataShow.patientId=this.beds[index].patientId;
					this.dataShow.patientName=this.beds[index].patientName;
					this.dataShow.heartBeat=this.beds[index].heartBeat;
					this.dataShow.temperature=this.beds[index].temperature;
					this.dataShow.sysPressure=this.beds[index].sysPressure;
					this.dataShow.diaPressure=this.beds[index].diaPressure;
					this.dataShow.bloodOxy=this.beds[index].bloodOxy;
				},1000)
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F4F6F8;
	}
	.container{
		.beds-container{
			margin: 40upx 0upx;
			padding: 20upx 0upx;
			width: 750upx;
			background-color: #FFFFFF;
			height: 700upx;
			border-style: groove;
			border-width: 10upx 0upx;
			border-color: #DCDCDC;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			.bed-image{
				margin: 10upx 10upx;
				width: 230upx;
			}
			// .green-image{
			// 	filter: invert(32%) sepia(95%) saturate(6648%) hue-rotate(111deg) brightness(96%) contrast(106%);
			// }
			// .red-image{
			// 	filter: invert(42%) sepia(84%) saturate(7390%) hue-rotate(351deg) brightness(89%) contrast(131%);
			// }
			// .purple-image{
			// 	filter: invert(17%) sepia(98%) saturate(6586%) hue-rotate(295deg) brightness(61%) contrast(108%);
			// }
			.chosen{
				// border-style: solid;
				// border-width: 10upx;
				// border-radius: 30upx;
				// border-color: #000000;
				// box-shadow: 3px 3px 2px #888888 inset;
			}
		}
		.detail-container{
			display: flex;
			margin-top: 50upx;
			//padding: 0 20upx;
			width: 750upx;
			height: 500upx;
			.detail-box{
				margin: 0 20upx;
				width: 500upx;
				height: 450upx;
				background-color: white;
				box-shadow: 3px 3px 2px #888888 inset;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				.item{
					display: flex;
					justify-content: space-between;
					flex: 1;
					//background-color: pink;
					.msg-item{
						margin: auto;
						//background-color: pink;
						width: 260upx;
						//background-color: blue;
						.title{
							color: #00BFFF;
							font-size: 32upx;
						}
						.show{
							color: black;
							font-size: 32upx;
							padding: 0 10upx;
						}
					}
				}
			}
			.btn-container{
				height: 400upx;
				flex-grow: 1;
				margin: auto;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				.btn{
					height: 80upx;
					line-height: 80upx;
					font-size: 36upx;
					width: 200upx;
					margin: auto;
					color: #00BFFF; 
					border-color: #00BFFF;
					border-style: solid;
					border-radius: 14upx;
				}
			}
		}
	}
</style>
