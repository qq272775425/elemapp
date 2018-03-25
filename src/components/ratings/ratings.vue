<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-conent">
		<div class="overview">
			<div class="overview-left">
				<h1 class="score">{{ seller.score }}</h1>
				<div class="title">综合评分</div>
				<div class="rank">高于周边商家{{seller.rankRate}}%</div>
			</div>
			<div class="overview-right">
				<div class="score-wrapper">
					<span class="title">服务态度:
						<span class="score">{{ seller.serviceScore }}</span>
						<star :size="36" :score="seller.serviceScore"></star>
					</span>
					
				</div>
				<div class="score-wrapper">
					<span class="title">商品评分:
						<span class="score">{{ seller.foodScore }}</span>
						<star :size="36" :score="seller.foodScore"></star>
					</span>
					
				</div>
				<div class="delivery-wrapper">
					<span class="title">送达时间</span>
					<span class="detial">{{ seller.deliveryTime }}分钟</span>
				</div>
			</div>
		</div>	
		<split></split>
		<ratingselect 
						:select-type="selectType" 
						:only-content="onlyContent" 
						:ratings="ratings">						
		</ratingselect>
		<div class="rating-wrapper">
			<ul>
				<li class="rating-item border-1px" v-for="rating in ratings" v-show="needShow(rating.rateType,rating.text)">
					<div class="avatar" >
						<img :src="rating.avatar" width="28px" height="28px">
					</div>
					<div class="content">
						<h1 class="name">{{ rating.username }}
						</h1>
						<div class="star-wrapper">
							<star class="star" :size="24" :score="rating.score"></star>
							<span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>	
						</div>
						<p class="text">{{rating.text}}</p>
						<div class="recommend" v-show="rating.recommend.length">
							<span class="icon-thumb_up"></span>
							<span class="item" v-for="item in rating.recommend">{{ item }}</span>
						</div>
						<div class="time">{{ rating.rateTime | formatDate }}</div>
							
					</div>		
				</li>
			</ul>
		</div>	
    </div>
  </div>
</template>

<script>
	import BScroll from "better-scroll"
	import {formatDate} from "../../common/js/date"
	import star from '../star/star'
	import split from '../split/split'
	import ratingselect from "../ratingselect/ratingselect"
	import shopcar from "../shopcar/shopcar"
	const ALL = 2

export default {
  name: 'ratings',
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
  	},
  components:{
  	star,
  	split,
  	ratingselect,
  	shopcar
  },
  props:{
  	seller:{
  		type:Object
  	}
  },
  created(){
  	this.$axios.get('/api/ratings')
  	.then((res) => {
    	res = res.data;
    	if(res.errno === 0){
        	this.ratings = res.data;
        	this.$nextTick(()=>{
        		this.scroll = new BScroll(this.$refs.ratings,{
        			click:true
        		})
        		
        	})
        	
        	}
     	}) 
    .catch((error) => {
      console.log(error);
    })
  	},


  data () {
    return {
    	goods:[],
    	ratings:[],
    	showFlag:false,
    	selectType:ALL,
    	onlyContent:true
    }
  },
  filters:{
  	formatDate(time){
  		let date = new Date(time)
  		return formatDate(date,"yyyy-MM-dd hh:mm")

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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin"
 	.ratings
 		position: absolute;
 		top: 174px;
 		bottom: 0px;
 		width: 100%;
 		left: 0;
 		overflow: hidden;
 		.shopcar
 			height: 200px;
 			z-index: 99999;
 		.overview
 			display: flex;
 			padding: 18px 0;
 			.overview-left
	 			-webkit-flex: 0 0 137px;
	 			-moz-flex: 0 0 137px;
	 			-ms-flex: 0 0 137px;
	 			-o-flex: 0 0 137px;
	 			flex: 0 0 137px;
	 			width: 137px;
	 			border-right: 1px solid rgba(7,17,27,.2);
	 			text-align: center
 				padding: 6px 0; 
 				@media only screen and (max-width:320px)
 					flex: 0 0 120px;
 					width:120px
 				@media only screen and (max-width:375px)
 					flex: 0 0 120px;
 					width:120px

	 			.score
 					line-height: 28px;
 					font-size: 24px;
 					color: rgb(255,153,0);
 					margin-bottom: 6px;
 				.title
 					font-size: 12px;
 					line-height: 12px;
 					color: rgb(1,17,27);
 					margin-bottom: 8px;
 				.rank
 					line-height: 10px;
 					font-size: 10px;
 					color: rgb(147,153,159);
 			.overview-right
 				-webkit-flex: 1;
 				-moz-flex: 1;
 				-ms-flex: 1;
 				-o-flex: 1;
 				flex: 1;
 				padding-left: 24px;
 				padding-top: 6px;
 				@media only screen and (max-width:320px)
 					padding-left: 2px;	
 					padding-top: 0;
 				@media only screen and (max-width:375px)
 					padding-left: 6px;
 					padding-top: 2px;
 				.score-wrapper
 					margin-bottom: 8px;
 					font-size: 0;
 					@media only screen and (max-width:320px)
 						margin-bottom: 2px;

 					.title
 						display: inline-block;
 						line-height: 18px;
 						font-size: 12px;
 						color: rgb(7,17,27);
 						.score
	 						line-height: 18px;
	 						display: inline-block;
	 						vertical-align: top;
	 						font-size: 12px;
	 						color: rgb(255,153,0);	
	 						margin-left 4px	
 					.star
 						display: inline-block;
 						margin: 0 8px;
 						vertical-align: top;
 						@media only screen and (max-width:320px)
		 					margin 0 2px
		 					font-size 10px
	 					
 				.delivery-wrapper
 					font-size: 0;
 					.title						
 						line-height: 18px;						
 						font-size: 12px;	
 					.detial
 						color: rgb(147,153,159);
 						margin-left: 14px;
 						font-size: 12px;
 		.rating-wrapper
 			padding 0 18px
	 		.rating-item
	 			display flex
	 			padding 18px 0 
	 			border-bottom 1px solid rgba(7,17,27,0.2)
				&:last-child
					border-none()
				.avatar
					flex 0 0 28px
					width 28px
					margin-right 12px
					img
						border-radius 50%
				.content
					flex 1
					position relative
					.name
						line-height 12px
						font-size 10px
						color rgb(7,17,27)
						margin-bottom 4px
					.star-wrapper	
						margin-bottom 6px
						font-size 0
						.star
							display inline-block
							vertical-align top
							margin-right 6px
						.delivery

							display inline-block
							vertical-align top
							margin-right 6px
							font-size 10px
							font-weight 200
							color rgb(147,153,159)
							line-height 12px
					.text
						font-size 12px
						color rgb(7,17,27)						
						line-height 18px
						margin-bottom 8px
					.recommend
						font-size 0
						line-height 16px
						.icon-thumb_up, .item
							display inline-block
							vertical-align top
							font-size 9px
							line-height 18px							
							margin-right 8px
							margin-bottom 4px
						.icon-thumb_up
							color rgb(0,160,220)
							
						.item
							border 1px solid rgba(7,17,27,0.1)
							border-radius 1px
							font-size 9px
							line-height 16px
							padding 0 6px
							color rgb(147,153,159)
							background #fff
					.time
						position absolute
						top 0
						right 0
						font-size 10px
						font-weight 200
						color rgb(147,153,159)
						line-height 12px
















</style>
