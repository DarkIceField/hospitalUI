<template>
</template>

<script>
	import {mapState,mapMutations} from 'vuex'
	export default {
		data() {
			return {
			}
		},
		computed: {
			...mapState([])
		},
		onLoad(){
			// let storeID = uni.getStorage('ID')
			// if (storeID) {
			// 	this.login(storeID)
			// } else {
			// 	uni.reLaunch({
			// 		url: '../login/login'
			// 	})
			// }
		},
		methods: {
			...mapMutations([])
		}
	}
</script>

<style>
</style>
