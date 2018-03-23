<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuwraper">
		<ul>
			<li v-for="(item,index) in goods" class="menu-item" ref="current" :class="{'current':currentIndex == index}" @click="getIndex(index)">
				<span class="text" border-1px><span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{ item.name }}</span>
			</li>
		</ul>
    </div>
    <div class="foods-wrapper" ref="foodswraper">
		<ul>
			<li  class="food-list food-list-hook" v-for="item in goods">
				<h1 class="title">{{ item.name }}</h1>
				<ul>
					<li @click="selectFood(food,$event)" v-for="food in item.foods" class="food-item border-1px">
						<div class="icon"><img :src="food.icon" height="70px" width="70px"></div>
						<div class="content">
							<h2 class="name">{{ food.name }}</h2>
							<p class="desc"> {{ food.description }}</p>
							<div class="extra">
								<span class="count">月售{{ food.sellCount }}份</span>
								<span>好评率{{ food.rating }}%</span>
							</div>
							<div class="price">
								<span class="now">$ {{ food.price }}</span>
								<span class="old" v-show="food.oldPrice">$ {{ food.oldPrice }}</span>
							</div>
							<div class="cartcontrol-wrapper">
								<cartcontrol :food="food"></cartcontrol>
							</div>	
						</div>
					</li>
				</ul>
			</li>
		</ul>
    </div>
    <shopcar :selectFoods="selectFoods" :deliveryprice="seller.deliveryPrice" :minprice="seller.minPrice"></shopcar>
  <food :food="selectedFood" ref="food"></food>
  </div>
  
</template>

<script>

	import BScroll from "better-scroll"
	import shopcar from "../shopcar/shopcar"
	import cartcontrol from "../cartcontrol/cartcontrol"
	import food from "../food/food"

export default {
  name: 'goods',
  components:{
  	shopcar,
  	cartcontrol,
  	food
  },
  data () {
    return {
     goods:[],
     listheight:[],
     scrollY: 0,
     selectedFood:{}
    };
  },
  props:['seller'],
  computed:{

  	currentIndex(){
  		for(let i = 0; i < this.listheight.length; i++){
  			let height1 = this.listheight[i];
  			let height2 = this.listheight[i+1];
  			if(!height2 || (this.scrollY >= height1 && this.scrollY < height2)){
  				return i;
  			}
  		};
  		return 0; 		
  	},
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
  },

  methods:{
  	
  	_initScroll(){
  		this.menuScroll = new BScroll(this.$refs.menuwraper,{click:true});
  		this.foodScroll = new BScroll(this.$refs.foodswraper,{click:true,probeType:3});
  		this.foodScroll.on('scroll',(pos) => {
  			this.scrollY = Math.abs(Math.round(pos.y));
  			// console.log(this.scrollY);
  			// if(this.scrollY!==0){console.log(this.currentIndex)} 索引验证
  		});
  	},

  	_getheight(){//获取高度
  		let foodlist = this.$refs.foodswraper.getElementsByClassName('food-list-hook');
  		let height  = 0;
  		this.listheight.push(height);
  		for(let i = 0; i < foodlist.length; i++){
  			let item = foodlist[i];
  			height += item.clientHeight;
  			this.listheight.push(height);
  		}
  	},
  	getIndex(index){
  		// console.log(index);
  		let foodlist = this.$refs.foodswraper.getElementsByClassName('food-list-hook');
  		let el = foodlist[index];
  		this.foodScroll.scrollToElement(el,500)
  	},
  	selectFood(food,event){
  		if(!event._constructed){
  			return
  		}
  		this.selectedFood = food
  		this.$refs.food.show()
  		console.log(this.$refs.food)
  	}

  },
  created(){
    this.$axios.get('/api/goods')
    .then((res) => {
      res = res.data;
      /*console.log("goods当前信息状态码: "+res.errno)*/
      /*console.log(res)*/
      if(res.errno == 0){//自定义的errno的值 判断数据的状态码是否正确
          this.goods = res.data;
          this.$nextTick(()=>{
          	this._initScroll();
          	this._getheight();
          }); 
      }
      /*console.log(this.goods);*/
    })
    .catch((error) => {
      console.log(error);
    });
    this.classMap = ['decrease','discount','special','invoice','guarantee']
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
	@import "../../common/stylus/mixin"
	.goods
		display: flex
		position: absolute
		top: 174px
		bottom: 46px
		width: 100%
		overflow: hidden
		.menu-wrapper
			flex: 0 0 80px
			width: 80px
			background: #f3f5f7
			.menu-item 
				display:table  /* 多行文字垂直居中最好的布局 */
				height:54px
				width:56px
				line-height:16px
				padding-left:14px
				&.current
					width:65px
					z-index:10
					position:relative
					margin-top: -1px
					background:#fff
					font-weight:700
					.text
						border-none()
				.icon
					display: inline-block
					vertical-align: top
					width: 12px
					height: 12px
					margin-right: 2px
					margin-top: 2px
					background-size: 12px 12px 
					background-repeat: no-repeat
					&.decrease
						bg-image('decrease_3')
					&.discount
						bg-image('discount_3')
					&.guarantee
						bg-image('guarantee_3')
					&.invoice
						bg-image('invoice_3')
					&.special
						bg-image('special_3')
				.text
					display:table-cell
					width:56px
					text-align:center
					vertical-align:middle
					border-1px(rgba(7,17,27,0.1))
					font-size:12px
					padding-left:2px
		.foods-wrapper
			flex: 1
			.title
				padding-left:14px
				height:26px
				line-height:26px
				bodrder-left:2px solid #d9dde1
				font-size:12px
				color:rgb(147,153,159)
				background:#f3f5f7
				border-left: 3px solid #d9dde1
			.food-item
				display:flex
				margin:18px
				padding-bottom:18px /* 上下margin 重合 */
				border-1px(rgba(7,17,27,0.1))
				&:last-child
					boder-none()
					margin-bottom:18px
				.icon
					flex: 0 0 57px
					margin-right: 10px
					img
						border-radius:4px
				.content
					flex:1
					.name
						display: inline-block;
						height:14px
						margin:2px 0 6px 0px
						font-size:14px
						color:rgb(7,17,27)
						line-height:14px
						height:14px
					.desc, .extra

						line-height:14px
						font-size:10px
						color:rgb(147,153,159)
					.desc
						display: inline-block
						margin-bottom:8px
					.extra
						line-height:10px
						.count
							margin-right:1px

					.price
						font-weight:700
						line-height:24px
						margin-top:6px

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
					.cartcontrol-wrapper
						position: absolute
						right:0
						bottom:12px
						z-index: 100;
</style>
