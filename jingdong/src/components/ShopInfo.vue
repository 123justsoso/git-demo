<template>
  <div class="shop">
    <img class="shop_img" :src="item.imgUrl" alt="图片无法显示" />
    <div 
    :class="{'shop_content':true,'shop_content--border':hideBorder ? false:true }"
    >
      <div class="shop_content_title">{{ item.name }}</div>
      <div class="shopcontent_tags">
        <span class="shop_content_tag"> 月售:{{ item.sales }} </span>
        <span class="shop_content_tag"> 起送:{{ item.expressLimit }} </span>
        <span class="shop_content_tag">
          基础运费:{{ item.expressPrice }}
        </span>
      </div>
      <p class="shop_content_highlight">{{ item.slogan }}</p>
    </div>
  </div>
</template>

<script>
export default {
    name:'ShopInfo',
    props:['item','hideBorder']
};
</script>

<style lang="scss" scoped>
@import "../style/viriables.scss";
.shop {
    display: flex;
    padding-top: 0.12rem;
    &_img {
      width: 0.56rem;
      height: 0.56rem;
      margin-right: 0.26rem;
    }
     &_content {
    flex: 1;
    padding-bottom: 0.12rem;
    &--border{
         border-bottom: 0.01rem solid $content-bgColor;
    }
    &_title {
      color: $content-fontcolor;
      line-height: 0.22rem;
      font-size: 0.16rem;
      margin-bottom: .08rem;
    }
    &_tags {
      
      line-height: .18rem;
      font-size: .13rem;
    }
    &_tag {
      margin-right: .16rem;
      color:$content-fontcolor
    }
    &_highlight {
      color: $hightlight-fontColor;
      line-height: 0.18rem;
      font-size: .13rem;
      margin: 0.08rem 0 0 0;
    }
  }
  }
 
</style>