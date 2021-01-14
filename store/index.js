import Vue from 'vue'
import Vuex from 'vuex'
import serverURL from '../json.js'
Vue.use(Vuex)

const store = new Vuex.Store({  
    state: {  
		userID: '',
        userName: '',
		userSex: '',
		userAge: null,
		userType: 2,
		userContact: '',
		docDepartment: '',
		patientAddress: '',
		files:{
			"电子诊断书":[{
				date:'2020/12/03',
				content:'感冒'
				},{
				date:'2020/12/21',
				content:'咳嗽'
				}],
			"病情报告":[{
				date:'2020/12/04',
				content:'感冒好转'
				},{
				date:'2020/12/22',
				content:'咳嗽痊愈'
			}],
			"电子处方":[{
				date:'2020/12/03',
				content:'板蓝根冲剂 3'
				},{
				date:'2020/12/03',
				content:'感冒灵颗粒 2'
				},{
				date:'2020/12/21',
				content:'枇杷糖浆 1'
			}],
			"查房记录":[{
				date:'2020/12/04',
				content:'病人病情稳定，心态良好'
				},{
				date:'2020/12/22',
				content:'病人心态较好，积极配合治疗'
			}],
			"费用":[{
				name:'板蓝根冲剂',
				num:3,
				price:10.00,
				condition: false
				},{
				name:'感冒灵颗粒',
				num:2,
				price:8.00,
				condition: false
				},{
				name:'枇杷糖浆',
				num:1,
				price:15.00,
				condition: false
			}]
		}
    },  
    mutations: {  
        login(state,provider) {  
            state.userID = provider.userID;  
			state.userName = provider.userName;
			state.userSex = provider.userSex;
			state.userAge = provider.userAge;
			state.userType = provider.userType;
			state.userContact = provider.userContact;
			state.docDepartment = provider.docDepartment;
			state.patientAddress = provider.patientAddress;
			console.log(state)
			console.log(provider) 
			uni.setStorageSync('ID',provider.userID);
			uni.setStorageSync('pwd',provider.userPwd);
        },  
        logout(state) {  
			state.userID = null,
			state.userName = '',
			state.userSex = '',
			state.userAge = null
			state.userType = null,
			state.userContact = '',
			state.docDepartment = '',
			state.patientAddress = '',
			uni.clearStorage();
        },
		addFile(state,data){
			let file={
				date:data.date,
				content:data.content,
			}
			state.files[data.type].push(file);
			console.log(file);
		},
		modifyFile(state,data){
			// let file={
			// 	date:data.date,
			// 	content:data.content,
			// }
			// console.log(data);
			// console.log(state.files[data.type]);
			for(let i=0;i<state.files[data.type].length;i++)
				if(state.files[data.type][i].date==data.date)
				{
					state.files[data.type][i].content=data.content;
					console.log(state.files[data.type][i]);
				}
		},
		pay(state,index){
			state.files['费用'][index].condition=true;
		}
    }  
})
export default store