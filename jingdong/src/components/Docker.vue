<template>
<div class="docker">
      <div
      v-for="(item,index) in DockerList"
      :class="{'docker_item':true,'docker_item--active':index === currentIndex}"
       :key="item.icon"
       >
       <router-link :to='item.to'>
        <div class="iconfont" v-html="item.icon" />
        <div class="docker_title">{{item.text}}</div>
        </router-link>
      </div>
</div>
</template>


<script>
    export default{
        name:'Docker',
        props:['currentIndex'],
        setup(){
            const DockerList=[
                {icon:'&#xe6ee;',text:'首页', to: {name: 'Home'}},
                {icon:'&#xe61d;',text:'购物车', to: {name: 'CartList'}},
                {icon:'&#xe663;',text:'订单', to: {name: 'OrderList'}},
                {icon:'&#xe640;',text:'我的', to: {name: 'Home'}},
            ];
            return{DockerList}
        }
    }
</script>

<style lang="scss" scoped>
@import "../style/viriables.scss";
.docker {
  display: flex;
  position: absolute;
  box-sizing: border-box;
  padding: 0 0.18rem;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 0.49rem;
  border-top: 0.01rem solid $content-bgColor;
  color: $content-fontcolor;
  &_item {
    flex: 1;
    text-align: center;
    a{
      color: $content-fontcolor;
      text-decoration: none;
    }
    .iconfont {
      font-size: 0.18rem;
      margin: 0.07rem 0.02rem 0;
    }
    &--active {
      a{color: #1fa4fc;}
    }
  }
  &_title {
    font-size: 0.2rem;
    transform-origin: center top;
    transform: scale(0.5, 0.5);
  }
}
</style>