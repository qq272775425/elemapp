<template>
  	<div id="header">
		<div class="content-wrapper">
			<div class="avatar">
				<img width="64" height="64" :src="seller.avatar">
			</div>
			<div class="content">
				<div class="title">
					<span class="brand"></span>
					<span class="name">{{ seller.name }}</span>
				</div>
				<div class="support-count" v-if="seller.supports" @click="showDetial">
					<span class="count">{{ seller.supports.length }}个</span><i class="icon-keyboard_arrow_right"></i>
				</div>
				<div class="discription">
					{{ seller.description }}/{{ seller.deliveryTime }}分钟送达
				</div>	
				<div v-if="seller.supports" class="supports" @click="showDetial">
					<span class="icon" :class="classMap[seller.supports[0].type]"></span>
					<span class="text">{{ seller.supports[0].description }}</span>
				</div>
			</div>
		</div>
		<div class="bulletin-wrapper" @click="showDetial">
			<span class="bulletin-title"></span><span class="bulletin-text">{{ seller.bulletin }}</span>
			<i class="icon-keyboard_arrow_right"></i>
		</div>
		
		<div class="background">
			<img :src="seller.avatar" width="100%" height="100%">
		</div>
		
		<div class="detail" v-show="detialShow" >
			<div class="detail-wapper" clearfix>
				<div class="detail-main">
					<h1 class="name">{{ seller.name }}</h1>
					<div class="star-wrapper">
						<star :size="48" :score="seller.score"></star>
					</div>
					<div class="tetile">
						<div class="line"></div>
						<div class="text">用户信息</div>
						<div class="line"></div>
					</div>
				</div>
			</div>
			<div class="detail-close">
				<i class="icon-close"></i>
			</div>
		</div>
  	</div>
</template>

<script>
import star from '../star/star';
export default {
  name: 'Header',
  components:{
  	star
  },
  data () {
    return {
     	detialShow:false
    }
  },
  props:['seller'],
  created(){
  	this.classMap = ['decrease','discount','special','invoice','guarantee']
  },
  methods:{
  	showDetial(){
  		this.detialShow = !this.detialShow
  	}
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import "../../common/stylus/mixin"

	#header
		position: relavite
		overflow: hidden
		background: rgba(1, 17, 27, 0.4)
		color:#fff
		.content-wrapper
			padding: 24px 12px 18px 24px
			font-size: 0
			position: relative
			.avatar
				display: inline-block
				vertical-align: top
				img
					border-radius:4px
			.content	
				display: inline-block
				margin-left: 16px
				font-size: 14px
				.title
					margin: 2px  0 8px 0
					.brand
						display: inline-block
						vertical-align: top
						width: 30px
						height: 18px
						bg-image('brand')
						background-size: 30px 18px
						background-repeat: no-repeat
					.name
						margin-left: 6px
						font-size: 16px
						line-height: 18px
						font-weight: bold
				.description
					margin-botton: 10px
					line-height:12px
					font-size: 12px
				.supports
					margin-top: 8px
					.icon
						display: inline-block
						vertical-align: top
						width: 12px
						height: 12px
						margin-right: 4px
						margin-top: 1px
						background-size: 12px 12px 
						background-repeat: no-repeat
						background-image: url(decrease_1@2x.png)
						&.decrease
							bg-image('decrease_1')
						&.discount
							bg-image('discount_1')
						&.guarantee
							bg-image('guarantee_1')
						&.invoice
							bg-image('invoice_1')
						&.special
							bg-image('special_1')
					.text
						line-height: 12px
						font-size: 12px
			.support-count
				position: absolute
				right: 12px
				bottom: 14px
				padding: 0 8px
				heigh: 24px
				line-height 24px
				border-radius: 14px
				background: rgba(0, 0, 0, 0.2)
				text-align: center
				.count
					font-size: 10px
				.icon-keyboard_arrow_right
					line-height: 24px
					margin-left: 2px
					font-size: 10px
		.bulletin-wrapper
			height: 28px
			line-height: 28px
			padding:0 22px 0 12px
			white-space: nowrap
			overflow: hidden
			text-overflow: ellipsis
			background: rgba(7, 17, 27, 0.2)
			.bulletin-title
				display: inline-block
				vertical-align: top
				width: 22px
				height: 12px
				bg-image('bulletin')
				background-size: 22px 12px
				background-repeat: no-repeat
				margin:8px 0 0 0 
			.bulletin-text
				vertical-align: top
				font-size: 10px
				margin:0 4px 
			.icon-keyboard_arrow_right
				position: absolute
				right: 12px
				top: 114px
				font-size: 10px
		.background
			position: absolute
			top: -10px
			left: 0
			width: 370px
			height: 134px
			z-index: -1
			filter: blur(10px)
			overflow: hidden
		.detail
			position: fixed
			top: 0px
			left: 0
			z-index:100
			width:100%
			height:100%
			overflow: hidden
			overfloe: auto
			background: rgba(7, 17, 17, 0.8)
			.detail-wapper
				min-height:100%
				width:100%
				position:relative
				.detail-main
					margin-top: 64px
					padding-bottom: 64px /* 给最下面的关闭按钮提供空间 */
					.name
						line-height:16px
						text-align:center
						font-size:16px
						font-weight:700
						margin-bottom: 28px
					.star-wrapper
						margin-top:2px 0
						text-align: center
					.tittle
						width: 80%
						margin: 30px auto 24px auto
						.line
							flex: 1
							position: relative
							top: -6px
							border-bottom:1px
			.detail-close
				position:relative
				width:32px
				height:32px
				margin:-64px auto 0 auto
				alear:both
				font-size:32px























		





</style>
