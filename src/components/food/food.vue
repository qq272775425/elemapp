<template>
	<transition name="move">
  		<div class="food" v-show="showFlag" ref="food">
   			<div class="food-content">
				<div class="img-header">
					<div class="header-bar"></div>
					<img :src="food.image">
					<div class="back" @click="hide">
						<i class="icon-arrow_lift"></i>
					</div>
				</div>
				<div class="content">
					<h1 class="title">{{ food.name }}</h1>
					<div class="detail">
						<span class="sell-count">月售{{ food.sellCount }}</span>
						<span class="rating">好评率{{ food.rating }}%</span>
						<div class="price">
							<span class="now">￥ {{ food.price }}</span>
							<span class="old" v-show="food.oldPrice">$ {{ food.oldPrice }}</span>
						</div>	
					</div>
					<div class="cartcontrol-wrapper">
						<cartcontrol :food="food"></cartcontrol>
					</div>	
					<transition name="fade">
						<div @click="addFirst($event)" class="buy" v-show="!food.count||food.count===0">加入购物车</div>	
					</transition>	
				</div>
				<split v-show="food.info"></split>
				<div class="info" v-show="food.info">
					<h1 class="title">商品信息</h1>
					<p class="text" >{{ food.info }}</p>
				</div>
				<split></split>
				<div class="rating">
					<h1 class="title">商品评价</h1>
					<ratingselect 
						:select-type="selectType" 
						:only-content="onlyContent" 
						:desc="desc" 
						:ratings="food.ratings"
						@ratingtypeselect="ratingtypeselect"
						@contenttoogle="contenttoogle">
					</ratingselect>
				</div>	
				<div class="rating-wrapper">
					<ul v-show="food.ratings && food.ratings.length">
						<li v-show="needShow(rating.rateType,rating.text)" v-for="rating in food.ratings" class="rating-item">
							<div class="user">
								<span class="name">{{ rating.username }}</span>
								<img class="avatar" width="12px" height="12px" :src="rating.avatar"></img>
							</div>	
							<div class="time">{{ rating.rateTime | formatDate }}</div>
							<p class="text">
								<span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>{{ rating.text }}
							</p>	
						</li>
					</ul>
					<div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
				</div>			
   			</div>	
  		</div>
	</transition>
</template>

<script>
	import {formatDate} from '../../common/js/date.js'
	const POSITIVE = 0
    const NEGATIVE = 1
    const ALL = 2
	import BScroll from "better-scroll"
	import vue from "vue"
	import cartcontrol from "../cartcontrol/cartcontrol"
	import split from "../split/split"
	import ratingselect from "../ratingselect/ratingselect"
export default {
  name: 'food',
  filters:{
  	formatDate(time){
  		let date = new Date(time)
  		return formatDate(date,"yyyy-MM-dd hh:mm")

  	}
  },
  data () {
    return {
     showFlag:false,
     selectType:ALL,
     onlyContent:true,
     desc:{
     	all:"全部",
     	positive:'推荐',
     	negative:'吐槽'
     }
    }
  },
  components:{
  	cartcontrol,
  	split,
  	ratingselect
  },
  props:{
  	food:{
  		type:Object
  	}
  },
  events:{
  	
  },
  methods:{
  	ratingtypeselect(type){
  		this.selectType = type
  		// this.nextTick(() => {
  		// 	this.scroll.refresh()
  		// })
  	},
  	contenttoogle(onlyContent){
  		this.onlyContent = onlyContent
  		// this.nextTick(() => {
  		// 	this.scroll.refresh()
  		// })
  	},
  	show(){
  		this.showFlag = true
  		this.selectType = ALL
  		this.onlyContent = false	
		this.$nextTick(() => {
			if(!this.scroll){
				this.scroll = new BScroll(this.$refs.food,{
					click:true
				})
			}else{
				this.scroll.refresh();
			}
		})
  	},
  	hide(){
  		this.showFlag = false
  	},
  	addFirst(event){
  		if(!event._constructed){
  			return;
  		}
  		vue.set(this.food,'count',1)

  	},
  	needShow(type,text){
  		if(this.onlyContent && !text){
  			return false
  		}
  		if(this.selectType === ALL){
  			return true
  		}else{
  			return type === this.selectType
  		}
  	}
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin"
	.food
		position:fixed
		left 0
		top 0
		bottom 48px
		/*z-index 30*/
		width 100%
		background #fff

		&.move-enter,&.move-leave-to /*进入之前状态*/
			/*transform:translate3d(0,0,0)*/
			/* opacity:0 */
			transform:translate3d(100%,0,0)
			
		&.move-enter-active, &.move-leave-active        /* 进入过程动画	 */
			/* transition:opacity .5s  */
			
			transition: all .5s ease
			
		&.move-enter-to,&.move-leave  /*进入结束状态 */
			transform:translate3d(0,0,0)
			/*opacity:1   好用*/
		.img-header
			position: relative
			width: 100%;
			height: 0;
			padding-top: 100%;    /*当我们给padding设置成100%他会根据盒子的宽度设置,会把盒子变成宽高相等的盒子,这样防止图片缓慢加载的时候页面抖动*/
			img
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
			.back
				position: absolute;
				top: 10px;
				left: 0px;
			.icon-arrow_lift
				position: absolute;
				top: 0;
				left: 10px;
				display: block;
				padding: 10px;
				color:#fff
				height: 20px;
				width: 20px;
				border-radius:50% ;
				background: rgba(147,153,120,0.5);
				font-size: 20px;
		.content
			padding: 18px;
			position: relative;
			.title
				line-height: 14px;
				margin-bottom: 12px;
				font-size: 14px;
				font-weight: 700;
				color: rgb(7,17,27);
			.detail
				margin-bottom: 18px;
				line-height: 10px;
				height: 10px;
				font-size: 0;
				.sell-count, .rating
					font-size: 10px;
					color: rgb(147,153,159);
				.sell-count
					margin-right: 12px;
				.price
					font-weight:700
					line-height:24px
					margin-top:2px
					.now
						margin-right:8px
						font-size:16px
						color:rgb(240,20,20)
					.old
						text-secoration: line-through
						font-size: 10px
						color:rgb(147,153,159)
						text-decoration:line-through
						font-style:italic
		.info
			padding: 18px;
			.title
				line-height: 16px;
				margin-bottom: 16px;
				font-size: 14px;
				color: rgb(7,17,27);
			.text
				line-height: 24px
				padding: 0 4px;
				font-size: 12px;
				color: rgb(77,87,93);	
		.rating
			padding-top: 18px;
			.title
				line-height: 16px;
				margin-left: 18px;
				font-size: 14px;
				color: rgb(7,17,27);
		.rating-wrapper
			padding: 0 18px;
			.rating-item
				position: relative;
				padding: 8px 0;
				border-1px(rgba(7,17,27,.1))
				.user
					position: absolute;
					right: 0;
					top: 16px;
					font-size: 0;
					line-height: 12px;
					.name
						display: inline-block;
						vertical-align: top;
						font-size: 10px;
						margin-right: 6px;
						color: rgb(147,153,159);
					.avatar
						border-radius:50% ;
				.time
					margin-bottom: 6px;
					line-height: 12px;
					font-size: 10px;
					color: rgb(147,153,159);
				.text
					line-height: 16px;
					font-size: 12px;
					color: rgb(7,17,27);
					.icon-thumb_up,.icon-thumb_down
						line-height: 16px;
						margin-right: 4px;
						font-size: 12px;
					.icon-thumb_up
						color: rgb(0,160,220);
					.icon-thumb_down
						color: rgba(7,17,27,.5);
			.no-rating
				padding: 16px 0;
				font-size: 12px;
				color: rgb(147,153,159);
				margin-left: 4px;






		.cartcontrol
			position: absolute;
			right: 12px;
			bottom: 12px;
		.buy
			position: absolute;
			right: 18px;
			bottom: 18px;
			z-index: 10;
			height: 24px;
			line-height: 2;
			padding: 0 12px;
			-webkit-box-sizing: border-box;
			-moz-box-sizing: border-box;
			box-sizing: border-box;
			font-size: 10px;
			border-radius: 12px;
			color: #fff;
			background: rgb(0,160,220);
			
			&.fade-enter-active,&.fade-leave-active
				transition:opacity .5s
			&.fade-enter, &.fade-leave-to
				opacity:0
</style>
