<template>
  <div class="wrapper">
    <img
      class="wrapper_img"
      src="http://www.dell-lee.com/imgs/vue3/user.png"
      alt=""
    />
    <div class="wrapper_input">
      <input class="wrapper_input_content"
       placeholder="请输入用户名"
       v-model="username"
       />
    </div>
    <div class="wrapper_input">
      <input
        class="wrapper_input_content"
        type="password"
        placeholder="请输入密码"
        v-model="password"
      />
    </div>
    <div class="wrapper_input">
      <input
        class="wrapper_input_content"
        type="password"
        placeholder="确认密码"
        v-model="ensurement"
      />
    </div>
    <div class="wrapper_register-button" @click="handleRegister">注册</div>
    <div class="wrapper_register-link" @click="handleLoginClick">已有账号去登录</div>
    <Toast v-if="show" :message="toastMessage" />
  </div>
</template>

<script>
import {useRouter} from 'vue-router';
import {reactive,toRefs} from 'vue'
import {post} from '../../utils/request'
import Toast, { useToastEffect } from '../../components/Toast'

//处理注册相关逻辑
const useRegisterEffect = (changeToast)=>{
   const router = useRouter();
   const data = reactive({username: '',password: '',ensurement:''})
   const handleRegister = async() => {
     try{
         const result=await post('/api/user/register', {
        username: data.username,
        password: data.password
      })
      if(result?.errno === 0) {
          router.push({ name: 'Login' })
        } else {
          changeToast('注册失败');
        }
     }catch(e){
            changeToast('请求失败');
     }
    }
    const {username,password,ensurement}=toRefs(data);
    return{username,password,handleRegister,ensurement}
}
//处理登录跳转
const useLoginEffect = ()=>{
  const router = useRouter();
  const handleLoginClick = () =>{
     router.push({name:'Login'});
  }
  return{handleLoginClick}
}

export default {
  name: "Register",
  components:{Toast},
  setup(){
      const { show, toastMessage, changeToast } = useToastEffect()
      const { username, password, ensurement, handleRegister  } = useRegisterEffect(changeToast)
      const {handleLoginClick} = useLoginEffect();
      return{
         username, password, ensurement, show, toastMessage,
      handleRegister,handleLoginClick
      }
  }
}
</script>

<style lang="scss" scoped>

@import '../../style/viriables.scss';

.wrapper {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  &_img {
    display: block;
    margin: 0 auto 0.4rem auto;
    width: 0.66rem;
    height: 0.66rem;
  }
  &_input {
    height: 0.48rem;
    margin: 0 0.4rem 0.16rem 0.4rem;
    padding: 0 0.16rem;
    border: 0.01rem solid rgba(0, 0, 0, 0.1);
    background-color: #f9f9f9;
    border-radius: 0.06rem;
    border-radius: 0.06rem;
    &_content {
      line-height: 0.22rem;
      margin-top: 12rem;
      outline: none;
      border: none;
      width: 100%;
      background: none;
      font-size: 0.16rem;
      &::placeholder {
        color: $content-notice-fontcolor;
      }
    }
  }
  &_register-button {
    margin: 0.32rem 0.4rem 0 0.4rem;
    background: $btn-bgColor;
    font-size: 0.16rem;
    line-height: 0.48rem;
    color:$bgColor;
    box-shadow: 0 0.04rem 0.08rem 0 rgba(0, 145, 255, 0.32);
    border-radius: 0.04rem;
    border-radius: 0.04rem;
    text-align: center;
  }
  &_register-link{
      font-size: .14rem;
      text-align: center;
      color: $content-notice-fontcolor;
      margin-top: .16rem;
  }
}
</style>