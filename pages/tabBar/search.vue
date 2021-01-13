<template>
	<view class="container">
		<hx-navbar :fixed="true" :config="config"></hx-navbar>
		<view class="search-container">
			<view class="card-box">
				<view class="card-text">医保卡号：</view>
				<input class="card-input" type="text" v-model="cardNum" placeholder="请输入医保卡号" placeholder-class="placeholderclass">
				</input>
				<button class="search-btn" @click="startSearch">查询</button>
			</view>
		</view>
		<view class="show-container">
			<view class="basic-msgbox">
				<view class="line">
					<view class="item">
						<view class="title">姓名：</view>
						<view class="show">{{patient.name}}</view>
					</view>
					<view class="item">
						<view class="title">性别：</view>
						<view class="show">{{patient.sex}}</view>
					</view>
					<view class="item">
						<view class="title">年龄：</view>
						<view class="show">{{patient.age}}</view>
					</view>
				</view>
				<view class="line">
					<view class="item">
						<view class="title">住址：</view>
						<view class="show">{{patient.address}}</view>
					</view>
				</view>
				<view class="line">
					<view class="item">
						<view class="title">联系方式：</view>
						<view class="show">{{patient.contact}}</view>
					</view>
				</view>
			</view>
			<view class="file-selectbox">
				<view class="btn-line">
					<multiSelect class="select-box" :list="selectList" :clearable='false' :initValue="'电子诊断书'" @change="change"></multiSelect>
					<button class="file-btn" @click="seeFile">查看</button>
					<button v-if="enableAdd" class="file-btn" @click="showSubnvue">添加</button>
				</view>
				<view class="scroller-line">
					<scroll-view class="scroller" scroll-y="true">
						<view class="title-line" >
							<text class="title">序号</text>
							<text class="title">日期</text>
						</view>
						<view class="div"></view>
						<view class="file-line" v-for="(file,index) in fileShow">
							<view class="content-line" :class="{focus: detailIndex==index}" @click="chosen(index)">
								<text class="content">{{index}}</text>
								<text class="content">{{file.date}}</text>
							</view>
							<view class="div"></view>
						</view>
					</scroll-view>
					<view class="btn-container">
						<button class="detail-btn" @click="showFile">详细信息</button>
					</view>
				</view>
			</view>
			<view class="file-detailbox">
				<textarea class="detail-view"v-model="contentShow" disabled="true"></textarea>
				<view class="btn-container">
					<button class="modify-btn" v-if="enableAdd" @click="showSubnvue">修改</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import multiSelect from '../../components/xfl-select/xfl-select.vue'
	import {mapState,mapMutations} from 'vuex'
	import serverURL from '../../json.js'
	export default{
		components:{
			multiSelect
		},
		data(){
			return{
				config:{
					title: '查询',
					back: false,
					color: '#FFFFFF',
					backgroundColor: [1,'#00BFFF']
				},
				cardNum: '',
				patient: {
					cardNo: null,
					name: '',
					age: null,
					sex: '',
					address: '',
					contact: ''
				},
				selectList:["电子诊断书","病情报告","电子处方","患者日志","查房记录"],
				selectedValue: "电子诊断书",
				fileShow:[],
				detailIndex: -1,
				contentShow: ''
			}
		},
		onLoad() {
			this.$nextTick(function(){
				uni.$on('search',(data) =>{
					console.log(data);
					this.cardNum=data.msg;
					this.startSearch()
				})
				uni.$on('add',(data) =>{
					console.log(data);
					this.addFile(data);
				})
			})
		},
		onUnload(){
			uni.$off()
		},
		computed:{
			...mapState(['userType','files']),
			enableAdd: function(){
				if(this.userType==2 && this.selectedValue!="患者日志")
					return true;
				return false;
			}
		},
		methods:{
			...mapMutations(['addFile']),
			change({newVal,oldVal,index,orignItem}) {
				this.selectedValue = newVal;
			},
			showSubnvue(){
				uni.$emit('popup-init', {
					type: this.selectedValue,
					patientId: this.cardNum
				});
				const subNVue = uni.getSubNVueById('fileEditorSearch')
				subNVue.show('zoom-out', 250)
			},
			startSearch(){
				uni.request({
					url: serverURL+'/doctor/getPatientMessage',
					method: 'GET',
					data: {
						patientId: this.cardNum
					},
					success: (res) => {
						this.patient.cardNo=res.data.patientId;
						this.patient.name=res.data.patientName;
						this.patient.age=res.data.patientAge;
						this.patient.sex=res.data.patientSex;
						this.patient.address=res.data.patientA
						this.patient.address=res.data.patientAddress;
						this.patient.contact=res.data.patientContact
					},
					fail: () => {
						console.log('/doctor/getPatientMessage失败');
					}
				})
			},
			seeFile(){
				console.log(this.userType);
				if(this.selectedValue=='电子诊断书')this.fileShow=this.files['电子诊断书'];
					// uni.request({
					// 	url: serverURL+'/doctor/getDiagnosis',
					// 	method: 'GET',
					// 	data: {
					// 		patientId: this.cardNum
					// 	},
					// 	success: (res) => {
					// 		// this.patient.cardNo=res.data.patientId;
					// 		// this.patient.name=res.data.patientName;
					// 		// this.patient.age=res.data.patientAge;
					// 		// this.patient.sex=res.data.patientSex;
					// 		// this.patient.address=res.data.patientA
					// 		// this.patient.address=res.data.patientAddress;
					// 		// this.patient.contact=res.data.patientContact
					// 	},
					// 	fail: () => {
					// 		console.log('/doctor/getDiagnosis失败');
					// 	}
					// })
				else if(this.selectedValue=='病情报告')this.fileShow=this.files['病情报告'];
					// uni.request({
					// 	url: serverURL+'/doctor/getConditionReport',
					// 	method: 'GET',
					// 	data: {
					// 		patientId: this.cardNum
					// 	},
					// 	success: (res) => {
					// 		// this.patient.cardNo=res.data.patientId;
					// 		// this.patient.name=res.data.patientName;
					// 		// this.patient.age=res.data.patientAge;
					// 		// this.patient.sex=res.data.patientSex;
					// 		// this.patient.address=res.data.patientA
					// 		// this.patient.address=res.data.patientAddress;
					// 		// this.patient.contact=res.data.patientContact
					// 	},
					// 	fail: () => {
					// 		console.log('/doctor/getConditionReport失败');
					// 	}
					// })
				else if(this.selectedValue=='电子处方')this.fileShow=this.files['电子处方'];
					// uni.request({
					// 	url: serverURL+'/doctor/getPrescription',
					// 	method: 'GET',
					// 	data: {
					// 		patientId: this.cardNum
					// 	},
					// 	success: (res) => {
					// 		// this.patient.cardNo=res.data.patientId;
					// 		// this.patient.name=res.data.patientName;
					// 		// this.patient.age=res.data.patientAge;
					// 		// this.patient.sex=res.data.patientSex;
					// 		// this.patient.address=res.data.patientA
					// 		// this.patient.address=res.data.patientAddress;
					// 		// this.patient.contact=res.data.patientContact
					// 	},
					// 	fail: () => {
					// 		console.log('/doctor/getPrescription失败');
					// 	}
					// })
				// else if(this.selectedValue=='患者日志')
					// uni.request({
					// 	url: serverURL+'/bed//getHistory',
					// 	method: 'GET',
					// 	data: {
					// 		patientId: this.cardNum
					// 	},
					// 	success: (res) => {
					// 		// this.patient.cardNo=res.data.patientId;
					// 		// this.patient.name=res.data.patientName;
					// 		// this.patient.age=res.data.patientAge;
					// 		// this.patient.sex=res.data.patientSex;
					// 		// this.patient.address=res.data.patientA
					// 		// this.patient.address=res.data.patientAddress;
					// 		// this.patient.contact=res.data.patientContact
					// 	},
					// 	fail: () => {
					// 		console.log('/doctor/getPatientMessage失败');
					// 	}
					// })
				else if(this.selectedValue=='查房记录')this.fileShow=this.files['查房记录'];
				// 	uni.request({
				// 		url: serverURL+'/doctor//getWardRoundRecord',
				// 		method: 'GET',
				// 		data: {
				// 			patientId: this.cardNum
				// 		},
				// 		success: (res) => {
				// 			// this.patient.cardNo=res.data.patientId;
				// 			// this.patient.name=res.data.patientName;
				// 			// this.patient.age=res.data.patientAge;
				// 			// this.patient.sex=res.data.patientSex;
				// 			// this.patient.address=res.data.patientA
				// 			// this.patient.address=res.data.patientAddress;
				// 			// this.patient.contact=res.data.patientContact
				// 		},
				// 		fail: () => {
				// 			console.log('/doctor/getWardRoundRecord失败');
				// 		}
				// 	})
				
			},
			showFile(){
				console.log(this.fileShow[this.detailIndex].content);
				this.contentShow=this.fileShow[this.detailIndex].content;
			},
			chosen(index){
				this.detailIndex=index;
			}
		}
	}
</script>

<style lang="scss">
	page{
		//background-color: #E1FFFF;
		background-color: #F4F6F8;
	}
	.container{
		width: 750upx;
		//background-color: #00BFFF;
		.search-container{
			width: 750upx;
			//background-color: #E1FFFF;
			.card-box{
				width: 750upx;
				height: 100upx;
				line-height: 100upx;
				padding-top: 10upx;
				padding-bottm: 10upx;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				.card-text{
					height: 80upx;
					line-height: 80upx;
					font-size: 32upx;
					//font-weight: bold;
					color: #00BFFF;
				}
				.card-input{
					border-radius: 10upx;
					width: 400upx;
					height: 80upx;
					background-color: white;
					border-style: solid;
					border-width: 5upx;
					border-color: #808080;
				}
				.placeholderclass{
					line-height: 80upx;
					color: #87CEFA;
					font-size: 32upx;
				}
				.search-btn{
					width: 150upx;
					height: 80upx;
					line-height: 80upx;
					font-size: 32upx;
					color: #00BFFF; 
					border-color: #00BFFF;
					border-style: solid;
					border-radius: 14upx;
				}
			}
		}
		.show-container{
			width: 750upx;
			//background-color: red;
			.basic-msgbox{
				padding-top: 10upx;
				width: 750upx;
				//background-color: #E1FFFF;			
				padding-bottom: 40upx;
				.line{
					display: flex;
					justify-content: sapce-between;
					height: 50upx;
					line-height: 50upx;
					padding-top: 10upx;
					padding-bottom: 10upx;
					.item{
						display: flex;
						justify-content: flex-start;
						width: 100%;
						.title{
							font-size: 40upx;
							text-align: center;
							color: #00BFFF;
						}
						.show{
							padding-left: 20upx;
							padding-right: 20upx;
							height: 50upx;
							font-size: 36upx;
							background-color: #FFFFFF;
							box-shadow: 2px 2px 1px grey inset;
							max-width: 600upx;
							white-space: nowrap; 
							overflow: hidden;
							text-overflow: ellipsis;
							//color: #00BFFF;
						}
					}
				}
			}
			.file-selectbox{
				width: 750upx;
				//background-color: #E1FFFF;
				.btn-line{
					width: 750upx;
					//background-color: green;
					height: 70upx;
					line-height: 70upx;
					padding-top: 10upx;
					padding-bottom: 10upx;
					display: flex;
					justify-content: space-around;
					.select-box{
						height: 70upx;
						width: 400upx;
						font-size: 40upx;
						//color: #87CEFA;
					}
					.file-btn{
						height: 70upx;
						line-height: 70upx;
						width: 150upx;
						font-size: 40upx;
						//background-color: #E1FFFF;
						color: #00BFFF; 
						border-color: #00BFFF;
						border-style: solid;
						border-radius: 14upx;
					}
				}
				.scroller-line{
					width: 750upx;
					display: flex;
					justify-content: space-between;
					//background-color: #00BFFF;
					//padding: 20upx;
					.scroller{
						margin: 20upx;
						width: 600upx;
						height: 400upx;
						background-color: white;
						box-shadow: 3px 3px 2px #888888 inset;
						.title-line{
							display: flex;
							justify-content: flex-start;
							height: 100upx;
							align-items: center;
							padding: 0upx 20upx;
							.title{
								height: 80upx;
								line-height: 80upx;
								width: 200upx;
								font-size: 32upx;
								font-weight: bold;
								// color: #8E8E8E;
								// width: 40upx;
							}
						}
						.div{
							z-index: 3;
							height: 2upx;
							weight: 750upx;
							background-image: linear-gradient(to right, #FFFFFF 0%, black 0%);
						}
						.file-line{
							.content-line{
								display: flex;
								justify-content: flex-start;
								height: 100upx;
								align-items: center;
								padding: 0upx 20upx;
								.content{
									height: 80upx;
									line-height: 80upx;
									width: 200upx;
									font-size: 32upx;
									// color: #8E8E8E;
									// width: 40upx;
								}
							}
							.focus{
								font-weight: bold;
							}
							.div{
								z-index: 3;
								height: 2upx;
								weight: 750upx;
								background-image: linear-gradient(to right, #FFFFFF 0%, black 0%);
							}
						}
					}
					.btn-container{
						height: 400upx;
						flex-grow: 1;
						margin: auto;
						.detail-btn{
							height: 200upx;
							line-height: 200upx;
							margin: 80upx auto;
							width: 80upx;
							//background-color: #E1FFFF;
							color: #00BFFF; 
							border-color: #00BFFF;
							border-style: solid;
							border-radius: 14upx;
							word-wrap: break-word;
							writing-mode: vertical-rl;
							writing-mode: tb-rl;
							text-align: center;
							padding:0px;  
							display:flex;
							-webkit-display:flex;
							flex-direction:column; 
							justify-content:center;
						}
					}
				}
			}
			.file-detailbox{
				width: 750upx;
				position: absolute;
				bottom: 0;
				display: flex;
				justify-content: space-between;
				//background-color: #E1FFFF;
				.detail-view{
					margin: 20upx;
					// padding: 50upx;
					width: 600upx;
					height: 450upx;
					background-color: white;
					box-shadow: 3px 3px 2px #888888 inset;
					font-size: 48upx;
				}
				.btn-container{
					height: 400upx;
					flex-grow: 1;
					//margin: auto;
					.modify-btn{
						height: 150upx;
						//line-height: 200upx;
						//margin: 160upx 10upx;
						margin: 125upx auto;
						width: 80upx;
						// background-color: #E1FFFF;
						color: #00BFFF; 
						border-color: #00BFFF;
						border-style: solid;
						border-radius: 14upx;
						
						// height: 200upx;
						// line-height: 200upx;
						// margin: 80upx auto;
						// width: 80upx;
						// background-color: #E1FFFF;
						// color: #00BFFF; 
						// border-color: #00BFFF;
						// border-style: solid;
						// border-radius: 14upx;
						word-wrap: break-word;
						writing-mode: vertical-rl;
						writing-mode: tb-rl;
						text-align: center;
						padding:0px;  
						display:flex;
						-webkit-display:flex;
						flex-direction:column; 
						justify-content:center;
					}
				}
			}
		}
	}
</style>
