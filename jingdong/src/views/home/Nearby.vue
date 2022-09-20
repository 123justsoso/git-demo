<template>
  <div class="nearby">
    <h3 class="nearby_title">附近店铺</h3>
    <router-link :to="`/shop/${item._id}`"
     v-for="item in
      nearbyList" 
      :key="item._id"
      >
      <ShopInfo  :item="item" />
    </router-link>
  </div>
</template>
<script>
import { ref } from "vue";
import { get } from "../../utils/request";
import ShopInfo from "../../components/ShopInfo";

const nearbyListEffect = () => {
  const nearbyList = ref([]);
  const getNearbyList = async () => {
    const result = await get("/api/shop/hot-list");
    if (result?.errno === 0 && result?.data?.length) {
      nearbyList.value = result.data;
    } else {
      changeToast("登录失败");
    }
  };
  return { nearbyList, getNearbyList };
};
export default {
  components: { ShopInfo },
  name: "Nearby",
  setup() {
    const { nearbyList, getNearbyList } = nearbyListEffect();
    getNearbyList();
    return { nearbyList };
  },
};
</script>
<style lang="scss" scoped>
@import "../../style/viriables.scss";
@import "../../style/mixins.scss";
.nearby {
  &_title {
    margin: 0.16rem 0 0.04rem 0;
    font-size: 0.18rem;
    color: $content-fontcolor;
    font-weight: normal;
    font-family: PingFangSC-Medium;
  }
  a{
    text-decoration: none;
  }
}
</style>