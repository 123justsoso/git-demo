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
    <div class="wrapper_login-button" @click="handleLogin">登录</div>
    <div class="wrapper_login-link" @click="handleReisterClick">立即注册</div>
    <Toast v-if="show" :message="toastMessage" />
  </div>
</template>

<script>
import {reactive,toRefs} from 'vue'
import {useRouter} from 'vue-router'
import {post} from '../../utils/request'
import Toast,{useToastEffect} from '../../components/Toast'
//处理注册逻辑
const useLoginEffect = (changeToast)=>{
   const router = useRouter();
   const data = reactive({username: '',password: ''})
   const handleLogin = async() => {
     try{
       const {username,password}=data;
       if(username ==='' || password === ''){
         return changeToast('用户名或密码为空！');
       }
         const result=await post('/api/user/login', {
        username: data.username,
        password: data.password
      })
      if(result?.errno === 0) {
          localStorage.isLogin = true
          router.push({ name: 'Home' })
        } else {
          changeToast('登录失败');
        }
     }catch(e){
            changeToast('请求失败');
     }
    }
    const {username,password}=toRefs(data);
    return{username,password,handleLogin}
}
//处理登录跳转
const useRegisterEffect = ()=>{
  const router = useRouter();
      const handleRegisterClick = () => {
      router.push({name: 'Register'})
    }
    return{handleRegisterClick}
}

export default {
  name: 'Login',
  components:{ Toast },
  setup() {
    
    const { show,toastMessage,changeToast } = useToastEffect()
    const{username,password,handleLogin} = useLoginEffect(changeToast)
    const{handleRegisterClick} = useRegisterEffect()
    
    return { 
      username,password,
      show,toastMessage,
      handleLogin, handleRegisterClick
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
      margin-top: .12rem;
      line-height: 0.22rem;
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
  &_login-button {
    margin: 0.32rem 0.4rem 0 0.4rem;
    background: $btn-bgColor;
    font-size: 0.16rem;
    line-height: 0.48rem;
    color:$bgColor ;
    box-shadow: 0 0.04rem 0.08rem 0 rgba(0, 145, 255, 0.32);
    border-radius: 0.04rem;
    border-radius: 0.04rem;
    text-align: center;
  }
  &_login-link{
      font-size: .14rem;
      text-align: center;
      color: $content-notice-fontcolor;
      margin-top: .16rem;
  }
}
</style>