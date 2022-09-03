<template>
  <div class="tab">
      <el-tag
      v-for="(item,index) in tags"
      :key="item.name"
      :closable="item.name !== 'home'"
      :effect="$route.name === item.name ? 'dark' : 'plain' "
      @click="changeMenu(item)"
      @close="changeClose(item,index)"
       size="small"
      >
        {{item.label}}
      </el-tag>
  </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
export default {
    name:'CommonTag',
    data() {
        return {

        }
    },
    computed:{
        ...mapState({
            tags:state => state.tab.tabsList
        })
    },
    methods:{
        ...mapMutations({close:'closeTag'}),
        changeMenu(item){
            this.$router.push({
                name:item.name
            })
        },
        changeClose(item,index){
            const length = this.tags.length - 1;
            this.close(item);
            if(this.$route.name !== item.name){
                return;
            }
            if(length === index){
                this.$router.push({
                    name:this.tags[index - 1].name
                })
            }else{
                this.$router.push({
                    name:this.tags[index].name
                })
            }
        }
    }
}
</script>

<style lang="less">
.tab{
    padding: 20px;
    .el-tag{
        margin-right:15px;
        cursor: pointer;
    }
}
</style>