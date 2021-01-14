<template>
	<view class="container">
		<hx-navbar :fixed="true" :config="config"></hx-navbar>
		<image class="image" src="../../static/schedule.jpg"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				config:{
					color: '#FFFFFF',
					backgroundColor: [1,'#00BFFF']
				},
			};
		}
	}
</script>

<style lang="scss">
	.container{
		width: 750upx;
		.image{
			width: 750upx;
			height: 750upx;
			margin:250upx auto;
		}
	}
</style>
