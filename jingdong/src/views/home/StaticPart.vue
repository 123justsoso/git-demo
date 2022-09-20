<template>
<div class="position">
        <span class="iconfont position_iconfont">&#xe61f;</span>
        北京理工大学国防科技园2号楼10层北京理工大学国防科技园2号楼10层北京理工大学国防科技园2号楼10层
        <span class="iconfont position_notice">&#xe60a;</span>
      </div>
      <div class="search">
        <span class="iconfont">&#xe60a;</span>
        <span class="search_text">山姆会员商店优惠商品</span>
      </div>
      <div class="banner">
        <img
          class="banner_img"
          src="http://www.dell-lee.com/imgs/vue3/banner.jpg"
          alt=""
        />
      </div>
      <div class="icons">
        <div class="icons_item"
        v-for="item in iconsList"
        :key="item.desc"
        >
          <img
            class="icons_item_img"
            :src="`http://www.dell-lee.com/imgs/vue3/${item.imgName}.png`" alt="" />
          <p class="icons_item_desc">{{item.desc}}</p>
        </div> 
      </div>
      <div class="gap"></div>
</template>

<script>
    export default{
        name:'StaticPart',
        setup(){
          const iconsList=[
            {imgName:'超市',desc:'超市便利'},
            {imgName:'菜市场',desc:'菜市场'},
            {imgName:'水果店',desc:'水果店'},
            {imgName:'鲜花',desc:'鲜花'},
            {imgName:'医药健康',desc:'医药健康'},
            {imgName:'家居',desc:'家具时尚'},
            {imgName:'蛋糕',desc:'烘焙蛋糕'},
            {imgName:'签到',desc:'签到'},
            {imgName:'大牌免运',desc:'大牌免运'},
            {imgName:'红包',desc:'红包套餐'},
          ];
          return{iconsList}
        }
    }
</script>

<style lang="scss" scoped>

@import "../../style/viriables.scss";
@import "../../style/mixins.scss";

.position {
  position: relative;
  padding: 0.26rem 0.24rem 0.26rem 0;
  line-height: 0.22rem;
  font-size: 0.16rem;
  @include ellipsis;
  &_iconfont {
    position: relative;
    top: 0.01rem;
    font-size: 0.2rem !important;
  }
  &_notice {
    position: absolute;
    right: 0;
    top: 0.27rem;
    font-size: 0.2rem !important;
  }
  color: $content-fontcolor;
}
.search {
  line-height: 0.32rem;
  background-color: $search-bgColor;
  border-radius: 0.16rem;
  color: $search-fontColor;
  margin-bottom: 0.12rem;
  .iconfont {
    font-size: 0.18rem;
    padding: 0 0.12rem 0 0.16rem;
  }
  &_text {
    display: inline-block;
    font-size: 0.14rem;
  }
}
.banner {
  height: 0;
  overflow: hidden;
  padding-bottom: 25.4%;
  &_img {
    width: 100%;
  }
}
.icons {
  display: flex;
  flex-wrap: wrap;
  margin: 0.16rem 0;
  &_item {
    width: 20%;
    &_img {
      width: 0.4rem;
      height: 0.4rem;
      margin: 0 auto;
      display: block;
    }
    &_desc {
      text-align: center;
      margin: 0.06rem 0 0.16rem 0;
      color: $content-fontcolor;
      font-size: 0.12rem;
    }
  }
}
.gap {
  height: 0.1rem;
  margin: 0 -.18rem;
  background-color: $content-bgColor;
}
</style>