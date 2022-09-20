<template>
    <div class="toast">{{message}}</div>
</template>

<script>
import {reactive,toRefs} from 'vue'
export default {
    props:['message']
}
export const useToastEffect = ()=>{
    const toastData=reactive({
        show:false,
        toastMessage:''
    })
     const changeToast = (message)=>{
            toastData.show = true;
          toastData.toastMessage = message;
          setTimeout(()=>{
            toastData.show = false;
             toastData.toastMessage='';
          },2000);
    }
    const { show,toastMessage } = toRefs(toastData);
    return{ show,toastMessage,changeToast }
}
</script>


<style lang="scss" scoped>
@import '../style/viriables.scss';
.toast{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    padding: .1rem;
    background: rgba(0, 0, 0, .35);
    border-radius: .05rem;
    color: $bgColor;
}

</style>