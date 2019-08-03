<template>
  <div id="pageDiv" :style="{'padding-top':isWeiXin || isApps?'0':'3rem'}">

    <!-- 页面头部-->
    <header-com :poptitle="'子页'" :type="'doc_title'" v-if="!isWeiXin && !isApps"></header-com>
    <!-- 页面的主要内容 -->
    <section class="content">
      <h3 class="page_title" v-for="(item,index) in 10" :key="index">子页</h3>
    </section>
  </div>
</template>
<script>
import HeaderCom from "@/components/header"; //页面头部
import {changeUrl} from "@/utils/changeUrl"
export default {
  data() {
    return {
      isWeiXin: TS_WEB.isWeiXin,
      isApps: TS_WEB.isApp
    };
  },
  components: {
    HeaderCom
  },
  methods: {
    changeUrl
  },
  mounted(){

  },
  created() {
    document.title='子页'
  }
};
</script>

<style lang="less" scoped>
// 盒子模型
#pageDiv {
  width: 100%;
  height: 100%;
  padding-top: 0;
  padding-bottom: 0;
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