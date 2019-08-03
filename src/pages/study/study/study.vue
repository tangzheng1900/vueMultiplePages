<template>
  <div id="pageDiv" :style="{'padding-top':isWeiXin || isApps?'0':'0'}">

    <!-- 页面的主要内容 -->
    <section class="content">
      <h3 class="page_title">动态</h3>

    </section>
    <mynav :pagename="'study'"/>
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
    document.title='动态'
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
  }
}
</style>