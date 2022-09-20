<template>
  <div class="content">
    <div class="category">
      <div
        :class="{
          category_item: true,
          'category_item--active': currentTab === item.tab,
        }"
        v-for="item in categories"
        :key="item.name"
        @click="() => handleTabClick(item.tab)"
      >
        {{ item.name }}
      </div>
    </div>
    <div class="product">
      <div class="product_item" v-for="(item, index) in list" :key="{ index }">
        <img class="product_item_img" :src="item.imgUrl" alt="" />
        <div class="product_item_detail">
          <h4 class="product_item_title">{{ item.name }}</h4>
          <p class="product_item_sales">月售{{ item.sales }}件</p>
          <p class="product_item_price">
            <span class="product_item_yen">&yen;</span>{{ item.price }}
            <span class="product_item_origin">&yen;{{ item.oldPrice }}</span>
          </p>
        </div>
        <div class="product_number">
          <span 
          class="product_number_minus"
           @click="() => {changeCartItem(shopId,item._id,item,-1,shopName);}"
          >-</span>
           {{getProductCartCount(shopId, item._id)}}
          <span
            class="product_number_plus"
            @click="() => {changeCartItem(shopId,item._id,item,1,shopName);}"
            >+</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, ref, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { useStore } from 'vuex'
import { get } from "../../utils/request";
import { useCommonCartEffect } from "../../effects/cartEffects";

const categories = [
  {
    name: "全部商品",
    tab: "all",
  },
  {
    name: "秒杀",
    tab: "seckill",
  },
  {
    name: "新鲜水果",
    tab: "fruit",
  },
];
//和tab相关的逻辑
const useTabEffect = () => {
  const currentTab = ref(categories[0].tab);
  const handleTabClick = (tab) => {
    currentTab.value = tab;
  };
  return { currentTab, handleTabClick };
};
//和列表相关的逻辑
const useCurrentListEffect = (currentTab, shopId) => {
  const content = reactive({ list: [] });
  const getContentData = async (tab) => {
    const result = await get(`/api/shop/${shopId}/products`, {
      tab: currentTab.value,
    });
    if (result?.errno === 0 && result?.data?.length) {
      content.list = result.data;
    }
  };

  watchEffect(() => {
    getContentData();
  });
  const { list } = toRefs(content);
  return { list };
};

// 购物车相关逻辑
const useCartEffect = () => {
  const store = useStore()
  const { cartList, changeCartItemInfo } = useCommonCartEffect()
  const changeShopName = (shopId, shopName) => {
    store.commit('changeShopName', { shopId, shopName })
  }
  const changeCartItem = (shopId, productId, item, num, shopName) => {
    changeCartItemInfo(shopId, productId, item, num)
    changeShopName(shopId, shopName)
  }
  const getProductCartCount = (shopId, productId) => {
    return cartList?.[shopId]?.productList?.[productId]?.count || 0
  }
  return { cartList, changeCartItem,getProductCartCount }
}

export default {
  name: "Content",
  props:['shopName'],
  setup() {
    const route = useRoute();
    const shopId = route.params.id;
    const { currentTab, handleTabClick } = useTabEffect();
    const { list } = useCurrentListEffect(currentTab, shopId);
     const { changeCartItem, cartList,getProductCartCount } = useCartEffect()
    
    return {
      list,
      categories,
      currentTab,
      handleTabClick,
      shopId,
      changeCartItem,
      cartList,
      getProductCartCount
    };
  },
};
</script>


<style lang="scss" scoped>
@import "../../style/viriables.scss";
@import "../../style/mixins.scss";
.content {
  display: flex;
  position: absolute;
  left: 0;
  right: 0;
  top: 1.5rem;
  bottom: 0.5rem;
}
.category {
  width: 0.76rem;
  height: 100%;
  overflow-y: scroll;
  background: #f5f5f5;
  font-size: 0.14rem;
  color: $content-fontcolor;
  &_item {
    line-height: 0.4rem;
    text-align: center;
    &--active {
      background: $bgColor;
    }
  }
}
.product {
  overflow-y: scroll;
  flex: 1;
  &_item {
    position: relative;
    display: flex;
    padding: 0.12rem 0;
    margin: 0 0.16rem;
    border-bottom: 0.01rem solid #f1f1f1;
    &_detail {
      overflow: hidden;
    }
    &_img {
      width: 0.68rem;
      height: 0.68rem;
      margin-right: 0.16rem;
    }
    &_title {
      line-height: 0.2rem;
      font-size: 0.14rem;
      margin: 0;
      color: $content-fontcolor;
      @include ellipsis;
    }
    &_sales {
      margin: 0.06rem 0;
      font-size: 0.12rem;
      color: $content-fontcolor;
    }
    &_sales {
      line-height: 0.16rem;
      font-size: 0.12rem;
      margin: 0.06rem 0;
      color: $content-fontcolor;
    }
    &_price {
      line-height: 0.2rem;
      font-size: 0.14rem;
      margin: 0;
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
      bottom: 0.12rem;
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
</style>