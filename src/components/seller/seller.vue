<template>
  <div class="seller" ref="seller">
    <div class="seller-content">
		<div class="overview">
			<h1 class="title">{{ seller.name }}</h1>
			<div class="desc border-1px" >
				<star :size="48" :score="seller.score"></star>
				<span class="text">({{seller.ratingCount}})</span>
				<span class="text">月售{{ seller.sellCount }}单</span>
			</div>
			<ul class="remark">
				<li class="block">
					<h2>起送价</h2>
					<div class="content">
						<span class="stress">{{seller.minPrice}}</span>元
					</div>
				</li>
				<li class="block">
					<h2>商家配送</h2>
					<div class="content">
						<span class="stress">{{seller.deliveryPrice}}</span>元
					</div>
				</li>
				<li class="block">
					<h2>平均配送时间</h2>
					<div class="content">
						<span class="stress">{{seller.deliveryTime}}</span>分钟
					</div>
				</li>
			</ul>
			<div class="favorite"></div>		
		</div>
		<split></split>
		<div class="bulletin">
			<div class="title">公告活动</div>
			<div class="content">{{seller.bulletin}}</div>
			<ul v-if="seller.supports" class="supports">
				<li class="supports-item" v-for="(item,index) in seller.supports">
					<span class="icon" :class="classMap[seller.supports[index].type]"></span>
					<span class="text" >{{ seller.supports[index].description }}</span>
				</li>
			</ul>
		</div>
		<split></split>
		<div class="pics">
			<h1 class="title">商家实景</h1>
			<div class="pic-wrapper" ref="picwrapper">
				<ul class="pic-list" ref="piclist">
					<li class="pic-item" v-for="item in seller.pics">
						<img :src="item" width="120px" height="90px">
					</li>
				</ul>	
			</div>
		</div>
		<split></split>
		<div class="info">
			<h1 class="title">商家信息</h1>
			<ul>
				<li class="info-item" v-for="item in seller.infos">{{ item }}</li>
			</ul>
		</div>	
    </div>
  </div>
</template>

<script>
	import BScroll from "better-scroll"
	import star from '../star/star'
	import split from '../split/split'

export default {
  name: 'seller',
  created(){
  	this.classMap = ['decrease','discount','special','invoice','guarantee']
  },
  watch:{
  	'seller'(){
		this._initScroll();
		this._initPics();
  	}
  	},
  	methods:{
		_initScroll(){

			if(!this.scroll){
				this.scroll = new BScroll(this.$refs.seller,{
					click:true
				})
			}
			else{
				this.scroll.refresh()
			}
		},
		_initPics(){
			if(this.seller.pics){
				let picWidth = 120
				let margin = 6
				let width = (picWidth+margin)*this.seller.pics.length
				this.$refs.piclist.style.width = width + "px"
				this.$nextTick(() => {
					if(!this.picScroll){
						this.picScroll = new BScroll(this.$refs.picwrapper,{
							scrollX:true,
							eventPassthrough: "vertivcal"
						})						
					}else{
						this.picScroll.refresh()
					}										
				})
			}
		}
  	},
  mounted(){//生命周期
	this._initScroll();
	this._initPics()
  	},
  components:{
  	star,
  	split,
  	BScroll
  },
  data () {
    return {
     
    }
  },
  props:{
  	seller:{
  		type:Object 
  	}
  },
  computed:{
  	selectFoods(){
  		let foods = []
  		this.goods.forEach((good) => {
  			good.foods.forEach((food) => {
  				if(food.count){
  					foods.push(food)
  				}
  			})
  		})
  		return foods
  	}
  }
} 	
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin"
.seller
	position: absolute
	top: 174px
	bottom: 48px
	width: 100%
	left: 0
	overflow: hidden
	.overview
		padding: 12px 18px
		.title
			margin-bottom: 8px
			line-height: 16px
			font-size: 16px
			color: rgb(7,17,27)
			font-weight 800
			margin-top 6px
		.desc
			padding 16px 0 
			line-height 18px
			font-size 0
			border-1px(rgba(7,17,27,0.1))
			.star
				display inline-block
				vertical-align top
				margin-right 8px
			.text	
				display inline-block
				vertical-align top
				margin-right 12px
				font-size 10px
				color rgb(77,85,93)
		.remark
			display flex
			padding-top 18px
			.block
				flex 1	
				text-align center
				border-right 1px solid rgba(7,17,27,0.1)
				font-size 10px
				&:last-child
					border none
				h2
					margin-bottom 4px
					line-height 10px
					color rgb(147,153,159)
				.content span
					font-size 24px
					font-weight 200
					line-height 24px
					color rgb(7,17,27)
		
	.bulletin
		padding 18px 18px 16px 19px
		.title
			margin-bottom: 8px
			line-height: 16px
			font-size: 16px
			color: rgb(7,17,27)
			font-weight 800
			margin-top 6px
		.content
			font-size: 12px;
			font-weight: 200;
			color:rgb(240,20,20)
			line-height: 24px;
			margin: 0  12px;
			padding-top: 6px;
		.supports
			margin-top: 8px

			.supports-item
				&:last-child
					border-none()
				border-top: 1px solid rgba(7,17,27,0.1);
				.icon
					display: inline-block
					vertical-align: top
					width: 16px
					height: 16px
					margin: 16px 6px 16px 12px
					
					background-size: 12px 12px 
					background-repeat: no-repeat
					&.decrease
						bg-image('decrease_4')
					&.discount
						bg-image('discount_4')
					&.guarantee
						bg-image('guarantee_4')
					&.invoice
						bg-image('invoice_4')
					&.special
						bg-image('special_4')
				.text
					display: inline-block;
					font-size: 12px;
					font-weight: 200;
					color: rgb(7,17,27);
					line-height: 16px;
					text-align: center;
					margin-top: 16px;
	.pics
		padding: 18px;
		.title
			margin-bottom: 12px
			line-height: 16px
			font-size: 16px
			color: rgb(7,17,27)
			font-weight 800
			margin-top 6px
		.pic-wrapper
			width: 100%;
			overflow: hidden;
			white-space: nowrap;
			.pic-list
				font-size: 0;
				.pic-item
					margin-right: 6px;
					display: inline-block;
					width: 120px;
					height: 90px;
					&:last-child
						margin: 0;
	.info
		padding: 18px;
		padding-bottom: 0;
		.title
			padding-bottom: 12px;
			line-height: 16px
			font-size: 16px
			color: rgb(7,17,27)
			font-weight 800
			margin-top 6px
			border-1px(rgba(7,17,27,0.1))
		.info-item
			padding: 16px 12px;
			line-height: 16px;
			border-1px(rgba(7,17,27,0.1))
			color: rgb(7,17,27);
			&:last-child
				border-none()





</style>
