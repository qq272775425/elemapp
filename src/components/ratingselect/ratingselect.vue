<template>
  <div class="ratingselect
  s">
    <div class="rating-type border=1px">
		<span @click="select(2,$event)" class="block positive" :class="{'active':selectType===2}">{{ desc.all }}<span class="count">{{ ratings.length }}</span></span>
		<span @click="select(0,$event)" class="block positive" :class="{'active':selectType===0}">{{ desc.positive }}<span class="count">{{ positives.length }}</span></span>
		<span @click="select(1,$event)" class="block negative" :class="{'active':selectType===1}">{{ desc.negative }}<span class="count">{{ negatives.length }}</span></span>
    </div>
    <div @click="toogle($event)" class="switch" :class="{'on':onlyContent}">
		<span class="icon-check_circle"></span>
		<span class="text">只看有内容评价</span>
    </div>
  </div>
</template>

<script>
  const POSITIVE = 0
  const NEGATIVE = 1
  const ALL = 2
export default {
  
  name: 'ratingselect',
  data () {
    return {
     	selectType:{
		type: Number,
		default: ALL
  	},
  	onlyContent:{
  		type:Boolean,
  		default:false
  	},
    }
  },
  computed:{
  	positives(){
  		return this.ratings.filter((rating) => {
  			return rating.rateType === POSITIVE
  		})
  	},
  	negatives(){
  		return this.ratings.filter((rating) => {
  			return rating.rateType === NEGATIVE
  		})
  	}
  },
  methods:{
  	select(type,event){
  		if(!event._constructed){
  			return
  		}
  		this.selectType = type
  		this.$emit('ratingtypeselect',type)
  	},
  	toogle(event){
  		if(!event._constructed){
  			return
  		}
  		this.onlyContent = !this.onlyContent
  		this.$emit('contenttoogle',this.onlyContent)
  	}
  },
  props:{
  	ratings:{
  		type: Array,
  		default(){
  			return []
  		}
  	},
  	
  	desc:{
  		type:Object,
  		default(){
  			return{
  				all:"全部",
  				positive:"满意",
  				negative:"不满意"
  			}
  		}
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin"
	.ratingselect
		.rating-type
			padding: 18px 0;
			margin: 0 18px;
			border-1px(rgba(7,17,27,.2))
			font-size: 0;
			.block
				display: inline-block;
				padding: 8px 12px;
				border-radius:2px ;
				margin-right: 8px;
				color: rgb(77,85,93);
				font-size: 12px;
				&.active
					color: #fff;
				.count
					font-size: 8px;
					margin-left: 2px;
					line-height: 16px;
				&.positive
					background: rgba(0,160,220,0.2);
					&.active
						background: rgb(0,160,220);
				&.negative
					background: rgba(77,85,93,0.2);
					&.active
						background: rgb(77,85,93);
		.switch
			padding:6px 18px
			margin-top: 8px;
			line-height: 24px;
			border-bottom: 1px solid rgba(7,17,27,.1);
			color: rgb(147,153,159);
			font-size: 0;
			&.on
				.icon-check_circle
					color: #00c850;
			.icon-check_circle
				display: inline-block;
				margin-right: 4px;
				font-size: 24px;
			.text
				font-size: 12px;
				vertical-align: top;



</style>
