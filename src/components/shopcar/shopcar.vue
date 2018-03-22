<template>
  <div class="shopcar">
	<div class="content" @click="toggleList">
		<div class="content-left">
			<div class="logo-wrapper">
				<div class="logo" :class="{'highlight':totalCount>0}">
					<span class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></span>
				</div>
				<div class="num" v-show="totalCount>0">{{ totalCount }}</div>
			</div>
			<div class="price" :class="{'highlight':totalCount>0}">￥{{ totalPrice }}</div>
			<div class="desc">另需配送费 ￥{{ deliveryprice }}元</div>
		</div>
		<div class="content-right" @click.stop="pay">
			<div class="pay" :class="payClass">
				{{payDesc}}
			</div>
		</div>	
	</div>
	<transition name="fold">
		<div class="shopcart-list" v-show="listShow">
			<div class="list-header">
				<h1 class="title">购物车</h1>
				<span class="empty" @click="empty">清空</span>
			</div>
			<div class="list-content" ref="listcontent">
				<ul>
					<li class="food" v-for="food in selectFoods">
						<span class="name">{{ food.name }}</span>
						<div class="price">
							<span>￥{{ food.price*food.count }}</span>
						</div>	
						<div class="cartcontrol-wapper">
							<cartcontrol :food="food"></cartcontrol>
						</div>			
					</li>
				</ul>
			</div>
		</div>
	</transition>
	<div class="list-mask" v-show="listShow" @click="hideList"></div>
  </div>
  
</template>
	
<script>
	import cartcontrol from "../cartcontrol/cartcontrol"
	import BScroll from "better-scroll"
export default {

  name: 'shopcar',
  components:{
  	cartcontrol
  },
  data () {
    return {
    	fold:true
    }
  },
  props:{
  	selectFoods:{
  		type:Array,
  		default(){
  			return [{
  				price:10,
     			count:1
  			}];
  		}
  	},
  	deliveryprice:{
  		type:Number,
  		default:0
  	},
  	minprice:{
  		type:Number,
  		default:0
  	}
  },
  computed:{
  	totalPrice(){
  		let total = 0;
  		this.selectFoods.forEach((food)=>{
  			total += food.price*food.count;
  		});
  		return total;
  	},
  	totalCount(){
  		let count = 0;
  		this.selectFoods.forEach((food) => {
  			count += food.count;
  		});
  		return count
  	},
  	payDesc(){
		if(this.totalPrice === 0){
			return '￥'+this.minprice+'元起送'
		}else if(this.totalPrice<this.minprice){
			let diff = this.minprice-this.totalPrice
			return "还差￥"+diff+"元起送"
		}else{
			return '去结算'
		}
  	},
  	payClass(){
  		if(this.totalPrice < this.minprice){	
			return "not-enough";
		}else{
			return "enough";
		}
  	},
  	listShow(){
  		if(!this.totalCount){
  			this.fold = true;
  			return false;
  		}
  		let show = !this.fold;
  		if(show){
  			this.$nextTick(() => {
  				if(!this.scroll) {
  						this.scroll = new BScroll(this.$refs.listcontent,{
  							click:true
  						})
  				}else{
  					this.scroll.refresh()
  				}
  				
  				})
  			
  		}
  		return show;
  			
  	}
  },
  methods:{
  	toggleList(){
  		if(!this.totalCount){
  			return;
  		}
  		this.fold = !this.fold;
  	},
  	empty(){
  		this.selectFoods.forEach((food) => {
  			food.count = 0
  		})
  	},
  	hideList(){
  		this.fold = true
  	},
  	pay(){
  		if(this.totalPrice<this.minPrice){
  			return;
  		}
  		window.alert("支付"+this.totalPrice+"元")
  	}
  }  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
	@import "../../common/stylus/mixin"
	.shopcar
		position:fixed
		left:0
		bottom:0
		z-index:100
		height:48px
		width:100%
		font-size:0	
		.content
			display:flex
			background:#141d27
			.content-left
				flex:1
				.logo-wrapper
					displat:inline-block
					position:relative
					top:-10px
					margin:0 12px 
					padding: 6px
					width:56px
					height:56px
					box-sizing:border-box
					vertical-align:top
					border-radius: 50% 
					background:#141d27
					.logo
						width:100%
						height:100%
						border-radius:50%
						background:#2b343c
						text-align:center
						&.highlight
							background:rgb(0,160,220)
						.icon-shopping_cart
							position:absolute
							top:17px
							left:17px
							font-size:24px
							line-hight:44px
							color:#80858a
							&.highlight
								color:#fff
				.num
					position:absolute
					top:0
					right:0
					width: 24px
					height: 16px
					line-height: 16px
					text-align: center
					border-radius:16px
					font-size:9px
					font-weight:700
					color:#fff
					background:rgb(240,20,20)
					box-shadow:0 4px 8px 0 rgba(0,0,0,0.4)
				.price
					display: inline-block
					vertical-align: top
					line-height: 24px
					margin-top: 12px
					box-sizing: border-box
					padding-right: 12px
					border-right: 1px solid rgba(255,255,255,0.1)
					font-size: 16px
					font-weight: 700
					position:absolute
					top:0px
					left:80px
					color: rgba(255,255,255,0.4)
					&.highlight
						color:#fff
				.desc
					displat:inline-block
					vertical-align: top
					line-height: 24px
					margin: 12px 0 0 12px
					line-height: 24px
					color: rgba(255,255,255,0.4)
					font-size: 10px
					position:absolute
					top:0px
					right:140px
			.content-right
				width:105px
				flex:0 0 105px
				.pay
					height:48px
					line-height:48px
					text-align:center
					font-size:12px
					color: rgba(255,255,255,0.4)
					background:#2b333b
					&.not-enough
						background:#2b333b
					&.enough
						background:#00b43c
						color: #fff
		.shopcart-list
			position:absolute
			left:0
			top:0
			z-index:-1
			width:100%
			transform: translate3d(0,-100%,0)

			&.fold-enter-active,&.fold-leave-active
				transition:all 0.5s
				
			&.fold-enter,&.fold-leave-active
				transform: translate3d(0,0,0)
			.list-header
				height:40px
				line-height:40px
				padding:0 18px
				background:#f3f5f7
				border-bottom:1px solid rgba(7,17,27,0.1)
				.title
					float:left
					font-size: 14px;
					color: rgb(7,17,27)
				.empty
					float: right;
					font-size: 12px;
					color: rgb(0,160,220)
			.list-content
				padding:0 18px
				max-height: 217px
				overflow:hidden
				background:#fff
				.food
					position: relative
					padding:12px 0 
					box-sizing: border-box
					border-1px(rgba(7,17,27,0.1))
					.name
						line-height:24px
						font-size:14px
						color:rgb(7,17,27)
					.price
						position: absolute
						right:90px
						bottom:16px
						font-size:14px
						font-weight:700
						color:rgb(240,20,20)
					.cartcontrol-wapper
						position:absolute
						right: 0;
						bottom: 5px;
	.list-mask
		position:fixed
		top:0
		left:0
		width: 100%;
		height: 100%;
		z-index:-2
		background: rgba(7,17,27,0.6);
		backdrop-fliter:blur(10px)





</style>
