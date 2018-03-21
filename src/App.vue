<template>
  <div id="app">
    <!-- <router-view/> -->
    <Header :seller="seller"></Header>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <router-view></router-view>
    
  </div>
</template>

<script>
import Header from './components/header/header'

export default {
  name: 'App',
  data() {
    return {
      seller:{},
    }
  },
  created(){
    this.$axios.get('/api/seller')
    .then((res) => {
      res = res.data;
      console.log("seller当前信息状态码: "+res.errno)
      console.log(res)
      if(res.errno == 0){//自定义的errno的值 判断数据的状态码是否正确
          this.seller = res.data
      }
      console.log(this.seller);
    })
    .catch((error) => {
      console.log(error);
    })
  },
  components:{
    Header
  }

}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "./common/stylus/mixin"

  #app .tab
    display: flex
    width: 100%
    height: 40px
    line-height: 40px
    border-1px(rgba(7,17,27,0.1)) 
    .tab-item
      flex: 1
      text-align: center
      & > a
        display:block  /* 做成大按钮自动撑满父元素 */
        /* text-decoration:none  放倒初始化css中*/
        font-siz: 14px
        color:rgb(77, 85, 93)
        &.active
          color: rgb(240, 20, 20)

</style>
