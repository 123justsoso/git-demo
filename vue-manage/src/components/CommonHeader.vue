<template>
  <header>
    <div class="l-content">
      <el-button plain icon="el-icon-menu" size="mini" @click="handleClick"></el-button>
      <!-- <h3 style="color: #fff">首页</h3> -->
      <!-- <el-breadcrumb separator="/">
            <el-breadcrumb-item style="color:red" v-for="item in tags" :key="item.name" :to="{ path: item.path }">
                {{item.label}}
            </el-breadcrumb-item>
      </el-breadcrumb>   -->
      <el-breadcrumb separator="/">
          <el-breadcrumb-item v-for="item in tags" :key="item.name"  :to="{ path: item.path }">{{item.label}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown trigger="click" size="mini">
          <span>
              <img class="user" :src="userImg" alt="">
          </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item @click.native="loginOut">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name:'CommonHeader',
    data() {
        return {
            userImg: require('../assets/images/user.png')
        }
    },
    methods:{
        handleClick(){
            this.$store.commit('collapseMenu');
        },
        loginOut(){
            this.$store.commit('clearMenu');
            this.$store.commit('clearToken');
            this.$router.push({name:'login'})
        }
    },
    computed:{
        ...mapState({
            tags:state => state.tab.tabsList
        })
    }
}
</script>

<style lang="less" scoped>

header{
    display: flex;
    height: 100%;
    width: 100%;
    justify-content: space-between;
    align-content: center;
    background-color: #ccc;
    margin-left: -20px;
    padding-left: 20px;
}

.l-content{
    display: flex;
    align-items: center;
    .el-button{
        margin-right: 20px;
    }
}
.r-content{
    .user{
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-top: 10px;
    }
}




</style>

