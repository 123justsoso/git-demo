<template>
<div class="wrapper">
    <div class="search">
        <div class="search_back iconfont"  @click="handleBackClick">&#xe677;</div>
        <div class="search_content">
            <span class="search_content_icon iconfont">&#xe679;</span>
            <input
          class="search_content_input"
          placeholder="请输入商品名称"
        />
        </div>
    </div>
  <ShopInfo :item="item" :hideBorder="true" v-show="item.imgUrl"/>
  <Content :shopName="item.name" />
  <Cart />
</div>  
</template>

<script>
import { reactive,toRefs } from 'vue'
import { useRouter,useRoute } from 'vue-router'
import ShopInfo from "../../components/ShopInfo";
import { get } from "../../utils/request";
import Content from './Content'
import Cart from './Cart'

//根据接口，获取当前商铺信息
const useShopInfoEffect = () => {
     const route = useRoute();
        const data = reactive({item:{}});
         const getItemData = async () => {
        const result = await get(`/api/shop/${route.params.id}`)
        if(result?.errno === 0 && result?.data){
            data.item = result.data;
        }
    }
    const {item} = toRefs(data);
    return{ item,getItemData } 
}
//点击回退首页
const useBackRouterEffet = () =>{
     const router = useRouter();
    const handleBackClick = () => {
      router.back()
    }
    return handleBackClick;
}

export default {
  name: "Shop",
  components: {ShopInfo,Content,Cart},
  setup() {
     const {item,getItemData}=useShopInfoEffect();
      const handleBackClick = useBackRouterEffet();
    getItemData();
    return {item,handleBackClick}
  }
};
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
    .wrapper{
        padding: 0 .18rem;
    }
   .search {
  display: flex;
  margin: .14rem 0 .04rem 0;
  line-height: .32rem;
  &_back {
    width: .3rem;
    font-size: .24rem;
    color: #B6B6B6;
  }
  &_content {
    display: flex;
    flex: 1;
    background: $search-bgColor;
    border-radius: .16rem;
    &_icon {
      width: .44rem;
      text-align: center;
      color: $search-fontColor;
    }
    &_input {
      display: block;
      width: 100%;
      padding-right: .2rem;
      border: none;
      outline: none;
      background: none;
      height: .32rem;
      font-size: .14rem;
      color: $content-fontcolor;
      &::placeholder {
        color: $content-fontcolor;
      }
    }
  }
}
</style>