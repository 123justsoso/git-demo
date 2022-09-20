<template>
     <div class="top">
      <div class="top_header">
        <div class="iconfont top_header_back"
            @click="handleBackClick"
        >&#xe677;</div>
        确认订单
      </div>
      <div class="top_receiver">
        <div class="top_receiver_title">收货地址</div>
        <div class="top_receiver_address">北京理工大学国防科技园2号楼10层</div>
        <div class="top_receiver_info">
          <span class="top_receiver_info_name">瑶妹(先生)</span>
          <span class="top_receiver_info_name">18911024266</span>
        </div>
        <div class="iconfont top_receiver_icon">&#xe677;</div>
      </div>
    </div>
</template>

<script>
import { useRouter } from 'vue-router'
export default {
    name:'TopArea',
    setup(){
         const router = useRouter();
        const handleBackClick = ()=>{ router.back() }
        return{handleBackClick}
    }
}
</script>

<style lang="scss" scoped>
@import "../../style/viriables.scss";

.top {
  position: relative;
  height: 1.96rem;
  background-size: 100% 1.59rem;
  background-image: linear-gradient(0deg, rgba(0, 145, 255, 0) 4%, #0091ff 50%);
  background-repeat: no-repeat;
  &_header {
    position: relative;
    padding-top: 0.2rem;
    line-height: 0.24rem;
    color: $bgColor;
    text-align: center;
    font-size: 0.16rem;
    &_back {
      position: absolute;
      left: 0.18rem;
      font-size: 0.22rem;
    }
  }
  &_receiver {
    position: absolute;
    left: 0.18rem;
    right: 0.18rem;
    bottom: 0;
    height: 1.11rem;
    background: $bgColor;
    border-radius: 0.04rem;
    &_title {
      line-height: 0.22rem;
      padding: 0.16rem 0 0.14rem 0.16rem;
      font-size: 0.16rem;
      color: $content-fontcolor;
    }
    &_address {
      padding: 0 0.4rem 0 0.16rem;
      font-size: 0.14rem;
      color: $content-fontcolor;
    }
    &_info {
      padding: 0.06rem 0 0 0.16rem;
      &_name {
        margin-right: 0.06rem;
        font-size: 0.12rem;
        color: $medium-fontColor;
        line-height: 0.18rem;
      }
    }
    &_icon {
      transform: rotate(180deg);
      position: absolute;
      right: 0.16rem;
      top: 0.5rem;
      color:$medium-fontColor;
      font-size: 0.2rem;
    }
  }
}
</style>