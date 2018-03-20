<template>
  <div class="star" :class="starType">
    <span v-for="item in items" :class="item" class="star-item"></span>
  </div>
</template>

<script>
/*封装接口方便维护*/
const LENGTH = 5;
const CLS_ON = 'on';
const CLS_HALF = 'half';
const CLS_OFF = 'off';

export default {
  name: 'star',
  data () {
    return {
     
    }
  },
  props:{//从父组件传入星星大小和分数
  	size:{
  		type:Number
  	},
  	score:{
  		type:Number
  	}
  },
  computed:{
  	starType(){
  		return 'star-'+ this.size;
  	},
  	items(){
  		let result = [];
  		let score = Math.floor(this.score*2)/2;//分数化成.5的算法
  		let hasDecimal = score %1 !==0;//判断是否有半星
  		let integer = Math.floor(score);
  		for(let i=0;i<integer;i++){//插入整星
  			result.push(CLS_ON);
  		}
  		if(hasDecimal){//插入半星
  			result.push(CLS_HALF);
  		}
  		while(result.length<LENGTH){//插入空星
  			result.push(CLS_OFF);
  		}
  		return result;
  	}

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
	@import "../../common/stylus/mixin"
	.star
		font-size:0
		&.star-48自动匹配样式
			.star-item
				width: 20px
				height: 20px
				margin-right: 22px
				background-size: 20px 20px
				&:last-child
					margin-right: 0
				&.on
					bg-image('star48_on')
				&.half
					bg-image('star48_half')
				&.off
					bg-image('star48_off')
		&.star-36
			.star-item
				width: 15px
				height: 15px
				margin-right: 16px
				background-size: 15px 15px
				&:last-child
					margin-right: 0
				&.on
					bg-image('star36_on')
				&.half
					bg-image('star36_half')
				&.off
					bg-image('star36_off')
		&.star-24
			.star-item
				width: 10px
				height: 10px
				margin-right: 3px
				background-size: 10px 10px
				&:last-child
					margin-right: 0
				&.on
					bg-image('star24_on')
				&.half
					bg-image('star24_half')
				&.off
					bg-image('star24_off')
		.star-item
			display: inline-block
			background-repeat: no-repeat



</style>
