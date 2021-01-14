<template>
	<view class="container">
		<hx-navbar :fixed="true" :config="config"></hx-navbar>
		<image class="image" src="../../static/code.png"></image>
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
		margin: auto;
		.image{
			width: 400upx;
			height: 400upx;
			margin:400upx 175upx;
			background-color: #FFFFFF;
		}
	}
</style>
