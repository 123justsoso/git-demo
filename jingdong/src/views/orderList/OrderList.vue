<template>
  <div class="wrapper">
    <div class="title">我的订单</div>
    <div class="orders">
      <div class="order" v-for="(item, index) in list" :key="index">
        <div class="order_title">
          {{ item.shopName }}
          <span class="order_status">
            {{ item.isCanceled ? "已取消" : "已下单" }}
          </span>
        </div>
        <div class="order_content">
          <div class="order_content_imgs">
              <template v-for="(innerItem, innerIndex) in item.products"
                    :key="innerIndex"
              >
            <img
              class="order_content_img"
              :src="innerItem.product.img"
              v-if="innerIndex <= 3"
            />
              </template>
          </div>
          <div class="order_content_info">
            <div class="order_content_price">¥{{item.totalPirce}}</div>
            <div class="order_content_count">共{{item.totalNumber}}件</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Docker :currentIndex="2" />
</template>

<script>
import { reactive, toRefs } from "vue";
import { get } from "../../utils/request";
import Docker from "../../components/Docker";

const useOrderListEffect = () => {
  const data = reactive({ list: [] });
  const getNearbyList = async () => {
    const result = await get("/api/order");
    if (result?.errno === 0 && result?.data?.length) {
        const orderList = result.data
        orderList.forEach((order)=>{
            const products = order.products || []
            let totalPirce = 0
            let totalNumber = 0
            products.forEach((productItem)=>{
                totalNumber += (productItem.orderSales || 0)
                totalPirce +=((productItem?.product?.price * productItem?.orderSales) || 0)
            })
            order.totalPirce = totalPirce
            order.totalNumber = totalNumber
        })
      data.list = result.data;
    }
  };
  getNearbyList();
  const { list } = toRefs(data);
  return { list };
};

export default {
  name: "OrderList",
  components: { Docker },
  setup() {
    const { list } = useOrderListEffect();
    return { list };
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/viriables.scss";
.wrapper {
  overflow-y: auto;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0.5rem;
  right: 0;
  background: rgb(248, 248, 248);
}
.title {
  font-size: 0.16rem;
  color: $content-fontcolor;
  line-height: 0.44rem;
  background: $bgColor;
  text-align: center;
}
// .orders{

// }
.order {
  margin: 0.16rem 0.18rem;
  padding: 0.16rem;
  background: $bgColor;
  &_title {
    margin-bottom: 0.16rem;
    line-height: 0.22rem;
    font-size: 0.16rem;
    color: $content-fontcolor;
  }
  &_status {
    float: right;
    font-size: 0.14rem;
    color: $light-fontColor;
  }
  &_content {
    display: flex;
    &_imgs {
      flex: 1;
    }
    &_img {
      width: 0.4rem;
      height: 0.4rem;
      margin-right: 0.12rem;
    }
    &_info {
      width: 0.7rem;
    }
    &_price {
      font-size: 0.14rem;
      color: $hightlight-fontColor;
      line-height: 0.2rem;
      text-align: right;
    }
    &_count {
      font-size: 0.12rem;
      line-height: 0.14rem;
      color: $content-fontcolor;
      text-align: right;
    }
  }
}
</style>