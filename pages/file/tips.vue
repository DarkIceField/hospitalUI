<!-- 用户隐私政策&服务协议 -->
<template>
	<view class="container">
		<hx-navbar :fixed="true" :config="config"></hx-navbar>
		
		<view  class="row_style">
			<view>
				日常生活中，很多的错误用药习惯是不被大家所关注的，但您知道么，这些习惯不仅会影响药物疗效，甚至会导致一些潜在的毒副作用。简单总结了常见的用药坏习惯，来看看您占了几条？
			</view>
			<view class="row_gap"></view>
			
			<view>
				<view>1.躺着服药。</view>
				<view>病了卧床休息，吃药的时候，往往有亲人送到床边，于是就躺在床上，用很艰难的姿势把药吃了。特别是重病在身的老人，更习惯于躺着服药。但是，一些口服药片或胶囊容易黏附在食管壁上，药物不能被吸收，反而刺激食管黏膜，引发局部炎症，甚至损伤食管，造成溃疡。躺着服药，也会造成老年患者吞咽困难，稍有不慎就容易发生误吸，水或药物误入歧途到气管中，会引起呛咳，严重的会出现吸入性肺炎的危险。</view>
				<view>正确的服药姿势应该是端坐或站立，如果患者能站立或端坐，请按这个体位服药。如果患者不能完全坐起来，在服药的时候，也至少应该抬高上身再服药。</view>
			</view>
			<view class="row_gap"></view>
			
			<view>
				<view> 2.干吞药片或胶囊。</view>
				<view>有人自豪地说能干吞药片，其实，这是非常危险的。干吞药，没有水的送服，药片或胶囊容易黏附在食管黏膜上，会刺激和损伤食管黏膜，严重者能够造成溃疡；还可能因为没有足够的水来帮助溶解，药物在体内的崩解和吸收过程受阻，影响疗效。</view>
				<view> 正确的办法是根据说明书的要求服用：①分散片和泡腾片，可以先加100~200ml的水，让药片崩解分散后饮用；②普通片剂可以直接用足量水送服；③咀嚼片则要求在口腔内咀嚼后吞咽，如孟鲁司特钠咀嚼片。</view>
				<view> 切忌不能干吞药片或胶囊。</view>
			</view>
			<view class="row_gap"></view>
			
			<view>
				<view> 3.所有的药物都掰开或研碎服用。药物能不能掰开、研碎和咀嚼服用，取决于药品的剂型。不分青红皂白，所有的药物都掰开或研碎服用是很危险的。</view>
				<view>1.有的药物是控释制剂，如拜新同(硝苯地平控释片)有大量硝苯地平被封包在一个“水库”内，药物到达体内(胃肠道)后，在“水库闸门”的控制下，缓慢匀速地释放硝苯地平，达到稳定地控制血压的作用。如果掰开或研碎，“水库”的大坝被破坏，大量的药物突然迅速释放，会造成严重的低血压和反射性的心动过速。</view>
				<view>2.有的药物在最外面包有肠溶衣，如阿司匹林肠溶片和奥美拉唑镁肠溶片，它们只能在肠道的碱性环境中才能崩解和释放药物，而在胃的酸性环境中肠溶衣不溶解，药物也就不释放，既可以保护胃不受刺激，也可以保护药物不在胃中被破坏。如果掰开或研碎了，药品就失去了“定位释放”的功能。</view>
				<view>3.有的药物有极其不愉快的味道，如开同(复方a-酮酸片)、黄连素(味极苦)等，用糖衣或胶囊包裹后可以掩盖其不良味道，如果掰开、研碎或打开胶囊服用，恶心的味道或苦味会严重影响患者的用药体验，降低服药的依从性。</view>
			</view>
			<view class="row_gap"></view>
			
			<view>
				<view> 4.用饮料送服药物。某些药物+饮料=毒药。安全起见，不推荐用饮料送服药物。</view>
				<view>1.有人喜欢用牛奶送服左氧氟沙星(可乐必妥、利复星、来立信等)，但是牛奶中的钙可以和左氧氟沙星发生络合反应，形成不能吸收的物质，影响吸收和疗效。</view>
				<view>2.有人喜欢用果汁送服药物，而西柚汁、橙汁、石榴汁中都有一些成分(呋喃香豆素等)，可以抑制肠道和肝脏中某些酶对药物的代谢，导致这些药物吸收过多、浓度升高，造成药物中毒或副作用增加，如西柚汁可以使辛伐他汀的血药浓度升高10倍，造成肌肉毒性或肝脏毒性的风险大大升高。</view>
				<view>3.茶水和咖啡中含有大量的茶碱和咖啡因，如果用这些饮料送服氟伏沙明(兰释片，抗抑郁药物)或依诺沙星(抗生素)或茶碱缓释片，可导致严重的中枢兴奋作用。</view>
				<view>正确的方法是用温开水送服药物。</view>
			</view>
			<view class="row_gap"></view>
			
			<view>
				<view> 5.服药期间不忌口。药物治疗期间，必须要有一个好的饮食习惯，才可能达到理想的效果。</view>
				<view>1.对于高血压患者，在接受药物治疗时，要注意限制食盐的摄入，因为钠摄入过多可加重高血压。</view>
				<view>2.对于糖尿病患者，在接受降糖药治疗的同时，应该控制淀粉和糖的摄入量，多吃蔬菜，少吃淀粉多的主食和油炸的高热量食物如果不控制饮食，即使用胰岛素都没有办法控制血糖。</view>
				<view>3.对于服用甲硝唑(灭滴灵)呋喃唑酮、头孢呋辛酯等抗生素的患者，必须忌酒，否则容易出现“双硫仑样反应”而伤害身体。</view>
				<view>4.接受奥美拉唑或埃索美拉唑治疗的胃-食管患者，应该避免饮酒，避免食用巧克力、肥肉、辛辣食物、富含淀粉如红薯)的食物，因为上述“食物”都能加重胃内容物反流的危险，使病恶化。</view>
			</view>
			<view class="row_gap"></view>
			
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				config:{
					color: '#FFFFFF',
					backgroundColor: [1,'#00BFFF']
				},
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #F4F6F8;
	}
	.container {
		.row_style {
			font-size: 24upx;
			color: #333333;
			margin: 24upx 32upx 48upx 32upx;
		}
		.row_gap {
			height: 36upx;
		}
	}
</style>