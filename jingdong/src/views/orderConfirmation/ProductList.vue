<template>
    <div class="products">
      <div class="products_title">{{shopName}}</div>
      <div class="products_list">
      <div class="products_list">
          
        <div 
        v-for="item in productList"
        class="products_item" 
        :key="item._id" 
       >
          <img class="products_item_img" :src="item.imgUrl" alt="" />
          <div class="products_item_detail">
            <h4 class="products_item_title">{{ item.name }}</h4>
            <p class="products_item_price">
              <span>
                <span class="products_item_yen">&yen;</span>
                {{ item.price }} × {{ item.count }}
              </span>

              <span class="products_item_total">
                <span class="products_item_yen">&yen;</span>
                {{ (item.price * item.count).toFixed(2) }}
              </span>
            </p>
          </div>
        </div>
      </div>
      </div>
    </div>
</template>

<script>
import { useRoute } from "vue-router";
import { useCommonCartEffect } from "../../effects/cartEffects";
export default {
  name: "ProductList",
  setup() {
    const route = useRoute();
    const shopId = route.params.id;
    const { productList,shopName } = useCommonCartEffect(shopId);
    return { productList,shopName };
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/viriables.scss";
@import "../../style/mixins.scss";
.products {
  margin: 0.16rem 0.18rem 0.1rem 0.18rem;
  background: $bgColor;
  &_title {
     padding: .16rem;
      font-size: .16rem;
      color: $content-fontcolor;
  }
  &_wrapper{
       overflow-y: scroll;
     margin: 0 .18rem;
      position: absolute;
      left: 0;
      right: 0;
      bottom: .6rem;
      top: 2.6rem;
  }
  &_list{
      background: $bgColor;
  }
  &_item {
    position: relative;
    display: flex;
    padding:0 .16rem .16rem .16rem;
    &_img {
      width: 0.46rem;
      height: 0.46rem;
      margin-right: 0.16rem;
    }
    &_detail {
      flex: 1;
    }
    &_title {
      line-height: 0.2rem;
      font-size: 0.14rem;
      margin: 0;
      color: $content-fontcolor;
      @include ellipsis;
    }
    &_price {
        display: flex;
      line-height: 0.2rem;
      font-size: 0.14rem;
      margin: 0.06rem 0 0 0;
      color: $hightlight-fontColor;
    }
    &_total{
        flex: 1;
        text-align: center;
        color: #000;
    }
    &_yen {
      font-size: 0.12rem;
    }
  }
}
</style>