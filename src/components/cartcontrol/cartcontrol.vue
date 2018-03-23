<template>
  <div class="cartcontrol">
    <div class="cart-decrease icon-remove_circle_outline"@click.stop="decreaseCart" v-show="food.count>0"></div>
    <div class="cart-count" v-show="food.count>0">{{ food.count }}</div>
    <div class="cart-add icon-add_circle" @click.stop="addCart"></div>
  </div>
</template>

<script>
import Vue from 'vue';
export default {
  name: "cartcontrol",
  data () {
    return {
     
    }
  },
  methods:{
  	addCart(event){
  		if(!event._constructed){
  			return
  		}
  		if(!this.food.count){
  			Vue.set(this.food,'count',1)
  		}else{
  			this.food.count ++
  		}
  	},
  	decreaseCart(event){
  		if(!event._constructed){
  			return
  		}
  		if(this.food.count){
  			this.food.count --
  		}

  	}
  },
  props:{
  	food:{
  		type:Object
  	}
  },
  created(){
  	// console.log(this.food);
  }
}
</script>

Add "scoped" attribute to limit CSS to this component only
<style scoped lang="stylus" rel="stylesheet/stylus">
	.cartcontrol
		font-size:0
		.cart-decrease
			display:inline-block
			padding:6px  /* 增加按钮可点击区域的大小 */
			font-size:24px
			line-height:24px
			padding:6px
			color:rgb(0,160,220)
			display: inline-block
			font-size:24px
			line-height:24px
			color:rgb(0,160,220)	
		.cart-count
			display:inline-block
			vertical-align:top
			width:12px
			padding-top:6px
			line-height:24px
			text-align:center
			font-size:10px
			color:rgb(147,153,159)
		.cart-add
			display:inline-block
			font-size:24px
			line-height:24px
			padding:6px
			color:rgb(0,160,220)
</style>




 