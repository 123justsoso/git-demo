<template>
    <div class="order">
        <div class="order_price">实付金额 <b>¥{{calculations.price}}</b></div>
        <div class="order_btn" @click="()=>handleSubmitClick(true)">提交订单</div>
    </div>
    <div class="mask" v-show="showConfirm"
        @click="()=>handleSubmitClick(false)"
    >
        <div class="mask_content" @click.stop>
            <h3 class="mask_content_title">确认要离开收银台?</h3>
            <p class="mask_content_desc">请尽快完成支付,否则将会被取消</p>
            <div class="mask_content_btns">
                <div 
                class="mask_content_btn mask_content_btn--first"
                @click="() => handleConfirmOrder(true)"
                >取消订单</div>
                <div 
                class="mask_content_btn mask_content_btn--last"
                @click="() => handleConfirmOrder(false)"
                >确认支付</div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
import { useRoute,useRouter } from "vue-router";
import {  useStore } from 'vuex'
import { useCommonCartEffect } from "../../effects/cartEffects";
import {post} from '../../utils/request'

const useMakeOrderEffect = (productList,shopName,shopId)=>{
        const router = useRouter();
        const store = useStore();
        const handleConfirmOrder = async(isCanceled) => {
    const products = []
    for(let i in productList.value){
        const product = productList.value[i]
        products.push({id:parseInt(product._id,10),num:product.count});
    }
     try{
        const result=await post('/api/order', {
        addressId:1,
        shopId,
        shopName:shopName.value,
        isCanceled,
        products 
      })
      if(result?.errno === 0) {
          store.commit('clearCartData',shopId);
          router.push({ name: 'OrderList' })
        }
     }catch(e){
            //changeToast('请求失败');
     }
    }
    return { handleConfirmOrder, }
}

export default {
    name:'Order',
    setup(){
    
    const route = useRoute();
    const showConfirm = ref(false)

    const shopId = parseInt(route.params.id,10);
    const { calculations,shopName,productList } = useCommonCartEffect(shopId);
    const { handleConfirmOrder } = useMakeOrderEffect(productList,shopName,shopId)
    const handleSubmitClick = (status)=>{
        showConfirm.value = status
    }
    
    
    return{ calculations,handleConfirmOrder,handleSubmitClick,showConfirm }
    }
}
</script>

<style lang="scss" scoped>
@import "../../style/viriables.scss";
    .order{
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    height: .49rem;
    line-height: .49rem;
    background: $bgColor;
    &_price{
        flex: 1;
        text-indent: .24rem;
        font-size: .14rem;
        color: $content-fontcolor;
    }
    &_btn{
        width: .98rem;
        background: #4FB0F9;
        color: $bgColor;
        text-align: center;
        font-size: .14rem;
    }
}
.mask{
    z-index: 1;
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.50);
    &_content{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        width: 3rem;
        height: 1.5rem;
        background: #fff;
         text-align: center;
        border-radius: .04rem;
        &_title{
            margin-top: .24rem 0 0 0;
            line-height: .26rem;
            font-size: .18rem;
            color: #333;
        }
        &_desc{
            margin-top: .08rem 0 0 0 ;
            font-size: .14rem;
            color: #666;
        }
        &_btns{
            display: flex;
            margin: .24rem .58rem 0 .58rem ;
        }
        &_btn{
            flex: 1;
            width: .8rem;
            line-height: .32rem;
            border-radius: .16rem;
            font-size: .14rem;
            &--first{
                margin-right: .12rem;
                border: .01rem solid #4FB0F9;
                color: #4FB0F9;
            }
            &--last{
                margin-left: .12rem;
                background: #4FB0F9;
                color: #fff;
            }
        }
    }
}

</style>