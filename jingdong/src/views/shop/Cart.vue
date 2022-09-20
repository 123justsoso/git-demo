<template>
<div class="mask" 
v-if="showCart && calculations.total > 0"
@click="handleCartShowChange"
 />
  <div class="cart">
    <div class="product" v-if="showCart && calculations.total > 0">
      <div class="product_header">
        <div class="product_header_call" @click="() => setCartItemsChecked(shopId)">
            <span
            class="product_header_icon iconfont"   
            v-html="calculations.allChecked ? '&#xe69b;' : '&#xe6f7;' ">
          
          </span>
            全选
        </div>
        <div 
        class="product_header_clear">
            <span @click="() => cleanCartProducts(shopId)"
                class="product__header__clear__btn"
                >清空购物车</span>
        </div>
      </div>
        <div class="product_item"
            v-for="(item, index) in productList" :key="{ index }"
        >
          <div
            class="product_item_checked iconfont"
            v-html="item.check ? '&#xe69b;' : '&#xe6f7;'"
            @click="() => changeCartItemChecked(shopId, item._id)"
          ></div>
          <img class="product_item_img" :src="item.imgUrl" alt="" />
          <div class="product_item_detail">
            <h4 class="product_item_title">{{ item.name }}</h4>
            <p class="product_item_price">
              <span class="product_item_yen">&yen;</span>{{ item.price }}
              <span class="product_item_origin">&yen;{{ item.oldPrice }}</span>
            </p>
          </div>
          <div class="product_number">
            <span
              class="product_number_minus"
              @click="
                () => {
                  changeCartItemInfo(shopId, item._id, item, -1);
                }
              "
              >-</span
            >
            {{ item.count || 0 }}
            <span
              class="product_number_plus"
              @click="
                () => {
                  changeCartItemInfo(shopId, item._id, item, 1);
                }
              "
              >+</span
            >
          </div>
        </div>
    </div>
    <div class="check">
      <div class="check__icon">
        <img
          src="http://www.dell-lee.com/imgs/vue3/basket.png"
          class="check__icon__img"
          @click="handleCartShowChange"
        />
        <div class="check__icon__tag">{{ calculations.total }}</div>
      </div>
      <div class="check__info">
        总计：<span class="check__info__price">&yen;{{ calculations.price }}</span>
      </div>
      <div class="check__btn" v-show="calculations.total > 0">
          <router-link :to="{path: `/orderConfirmation/${shopId}`}">
          去结算
        </router-link>
        </div>
    </div>
  </div>
 
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { useCommonCartEffect } from "../../effects/cartEffects";

// 获取购物车信息逻辑
const useCartEffect = (shopId) => {
     const store = useStore();
  const { productList,changeCartItemInfo,calculations } = useCommonCartEffect(shopId);

  const changeCartItemChecked = (shopId, productId) => {
    store.commit("changeCartItemChecked", { shopId, productId });
  };

  const cleanCartProducts = (shopId) => {
      store.commit('cleanCartProducts', { shopId })
    }
    const setCartItemsChecked = (shopId) => {
      store.commit('setCartItemsChecked', { shopId })
    }

  return {
    calculations,
    productList,
    changeCartItemInfo,
    changeCartItemChecked,
    cleanCartProducts,
    setCartItemsChecked
  };
};

// 展示隐藏购物车逻辑
const toggleCartEffect = () => {
  const showCart = ref(false)
  const handleCartShowChange = () => {
    showCart.value = !showCart.value;
  }
  return { showCart, handleCartShowChange}
}

export default {
  name: "Cart",
  setup() {
    const route = useRoute();
    const shopId = route.params.id;
    const {
     calculations,
      productList,
      changeCartItemInfo,
      changeCartItemChecked,
      cleanCartProducts,
      setCartItemsChecked
    } = useCartEffect(shopId);
    const { showCart, handleCartShowChange } = toggleCartEffect()
    return {
      calculations,
      productList,
      changeCartItemInfo,
      shopId,
      changeCartItemChecked,
      cleanCartProducts,
      setCartItemsChecked,
      showCart,handleCartShowChange
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/viriables.scss";
@import "../../style/mixins.scss";
.mask {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: rgba(0, 0, 0, .5);
  z-index: 1;
}
.cart {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  background: $bgColor;
}
.product {
  &_header {
    display: flex;
    line-height: 0.52rem;
    border-bottom: .01rem solid $content-bgColor;
    font-size: .14rem;
    color: $content-fontcolor;
     &_call{
         width: .64rem;
         margin-left: .18rem;
     }
     &_icon {
      display: inline-block;
      color: $btn-bgColor;
      font-size: .2rem;
      vertical-align: top;
      margin-right: .1rem;
    }
    &_clear{
        flex: 1;
        text-align: right;
        margin-right: .18rem;
        &_btn{
            display: inline-block;
        }
    }
  }
  overflow-y: scroll;
  flex: 1;
  background: $bgColor;
  &_item {
    position: relative;
    display: flex;
    padding: 0.12rem 0;
    margin: 0 0.16rem;
    border-bottom: 0.01rem solid $content-bgColor;
    &_detail {
      overflow: hidden;
    }
    &_checked {
      line-height: 0.5rem;
      margin-right: 0.2rem;
      color: $btn-bgColor;
      font-size: 0.2rem;
    }
    &_img {
      width: 0.46rem;
      height: 0.46rem;
      margin-right: 0.16rem;
    }
    &_title {
      line-height: 0.2rem;
      font-size: 0.14rem;
      margin: 0;
      color: $content-fontcolor;
      @include ellipsis;
    }
    &_price {
      line-height: 0.2rem;
      font-size: 0.14rem;
      margin: 0.06rem 0 0 0;
      color: $hightlight-fontColor;
    }
    &_yen {
      font-size: 0.12rem;
    }
    &_origin {
      margin-left: 0.06rem;
      line-height: 0.2rem;
      font-size: 0.12rem;
      color: $light-fontColor;
      text-decoration: line-through;
    }
    .product_number {
      position: absolute;
      right: 0.18rem;
      bottom: 0.26rem;
      &_minus,
      &_plus {
        display: inline-block;
        width: 0.2rem;
        height: 0.2rem;
        line-height: 0.17rem;
        border-radius: 50%;

        font-size: 0.2rem;
        text-align: center;
      }
      &_minus {
        border: 0.01rem solid $medium-fontColor;
        color: $medium-fontColor;
        margin-right: 0.05rem;
      }
      &_plus {
        background: $btn-bgColor;
        color: $bgColor;
        margin-left: 0.05rem;
      }
    }
  }
}
.check {
  display: flex;
  height: 0.49rem;
  border-top: 0.01rem solid $content-bgColor;
  line-height: 0.49rem;
  &__icon {
    position: relative;
    width: 0.84rem;
    &__img {
      display: block;
      margin: 0.12rem auto;
      width: 0.28rem;
      height: 0.26rem;
    }
    &__tag {
      position: absolute;
      left: 0.46rem;
      top: 0.04rem;
      padding: 0 0.04rem;
      min-width: 0.2rem;
      height: 0.2rem;
      line-height: 0.2rem;
      background-color: $hightlight-fontColor;
      border-radius: 0.1rem;
      font-size: 0.12rem;
      text-align: center;
      color: $bgColor;
      transform: scale(0.5);
      transform-origin: left center;
    }
  }
  &__info {
    flex: 1;
    color: $content-fontcolor;
    font-size: 0.12rem;
    &__price {
      line-height: 0.49rem;
      color: $hightlight-fontColor;
      font-size: 0.18rem;
    }
  }
  &__btn {
    width: 0.98rem;
    background-color: #4fb0f9;
    text-align: center;
    font-size: 0.14rem;
     a {
      color: $bgColor;
      text-decoration: none;
    }
  }
}
</style>