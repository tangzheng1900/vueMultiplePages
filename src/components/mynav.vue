<template>
  <!-- 页面头部 -->
  <div class="nav">
    <div class="nav-item" @click="go_page('')">
      <img :src="navs1" class="nav-icon" v-if="pageName == 'home'">
      <img :src="nav1" class="nav-icon" v-else>
      <h3 :class="{'active':pageName == 'home'}">主页</h3>
    </div>
    <div class="nav-item" @click="go_page('discover')">
      <img :src="navs2" class="nav-icon" v-if="pageName == 'discover'">
      <img :src="nav2" class="nav-icon" v-else>
      <h3 :class="{'active':pageName == 'discover'}">发现</h3>
    </div>
    <div class="nav-item" @click="go_page('study')">
      <img :src="navs3" class="nav-icon" v-if="pageName == 'study'">
      <img :src="nav3" class="nav-icon" v-else>
      <h3 :class="{'active':pageName == 'study'}">动态</h3>
    </div>
    <div class="nav-item" @click="go_page('sale')">
      <img :src="navs4" class="nav-icon" v-if="pageName == 'sale'">
      <img :src="nav4" class="nav-icon" v-else>
      <h3 :class="{'active':pageName == 'sale'}">销售</h3>
    </div>
    <div class="nav-item" @click="go_page('question')">
      <img :src="navs5" class="nav-icon" v-if="pageName == 'question'">
      <img :src="nav5" class="nav-icon" v-else>
      <h3 :class="{'active':pageName == 'question'}">问卷</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    pagename: [String]
  },
  components: {},
  data: () => ({
    isWeiXin: false,
    isApps: false,
    title: "",
    navs1: require("@/statics/images/system/nav/navs-1.png"),
    nav1: require("@/statics/images/system/nav/nav-1.png"),
    navs2: require("@/statics/images/system/nav/navs-2.png"),
    nav2: require("@/statics/images/system/nav/nav-2.png"),
    navs3: require("@/statics/images/system/nav/navs-3.png"),
    nav3: require("@/statics/images/system/nav/nav-3.png"),
    navs4: require("@/statics/images/system/nav/navs-4.png"),
    nav4: require("@/statics/images/system/nav/nav-4.png"),
    navs5: require("@/statics/images/system/nav/navs-5.png"),
    nav5: require("@/statics/images/system/nav/nav-5.png"),
    pageName: ""
  }),
  methods: {
    go_page(name) {
      if (name == "") {
        window.location.href = "index.html";
      } else {
        window.location.href = name + ".html";
      }
    }
  },
  created() {
    this.pageName=this.pagename
  }
};
</script>

<style lang="less" scoped>
// 头部
.nav {
  width: 100%;
  height: 3.27rem;
  position: absolute;
  bottom: 0;
  background: #c5b9a7;
  display: flex;
  z-index: 8;
  .nav-item {
    width: 20%;
    height: 100%;
    .nav-icon {
      height: 1.53rem;
      margin: 0 auto;
      margin-top: 0.5rem;
      display: block;
    }
    h3 {
      font-size: 0.8rem;
      font-weight: 400;
      color: #968774;
      line-height: 1.25rem;
      text-align: center;
      &.active {
        color: #a33836;
      }
    }
  }
}
</style>
