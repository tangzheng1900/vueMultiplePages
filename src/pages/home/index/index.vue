<template>
  <div id="pageDiv" :style="{'padding-top':isWeiXin || isApps?'0':'0'}">

    <!-- 页面的主要内容 -->
    <section class="content">
      <h3 class="page_title">主页</h3>
      <button @click="changeUrl('home1.html')">前往子页</button>
      <h3 class="page_title" v-for="(item,index) in 10" :key="index">主页</h3>
    </section>
    <mynav :pagename="'home'"/>
  </div>
</template>
<script>
import mynav from "@/components/mynav";
import {changeUrl} from "@/utils/changeUrl"
export default {
  data() {
    return {
      isWeiXin: TS_WEB.isWeiXin,
      isApps: TS_WEB.isApp
    };
  },
  components: {
    mynav: mynav
  },
  methods: {
    changeUrl
  },
  mounted(){

  },
  created() {
    document.title='主页'
  }
};
</script>

<style lang="less" scoped>
// 盒子模型
#pageDiv {
  width: 100%;
  height: 100%;
  padding-top: 0;
  padding-bottom: 3.27rem;
  overflow: hidden;
  position: relative;
  box-sizing: border-box;
  .content{
    height: 100%;
    overflow: scroll;
    .page_title{
      text-align: center;
      margin-top: 10rem;
      font-size: 2rem;
    }
    button{
      font-size: 1.2rem;
      margin: 0 auto;
      text-align: center;
      display: block;
      margin-top: 1rem;
    }
  }
}
</style>