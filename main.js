import Vue from 'vue'
import App from './App'
import hxNavbar from "./components/hx-navbar/hx-navbar"
import store from './store' 
 
Vue.prototype.$store = store


Vue.component('hx-navbar',hxNavbar)

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
