<template>
  <!-- 页面头部 -->
  <header class="pageHead" v-if="!isApps||type=='no_btn'">
    <div class="rows">
      <div class="rows-1">
        <span
          v-if="!(type=='no_btn')&&type != 'appPay'"
          :class="{'backIcon':btntype==1,'backIcon2':btntype==2,'backIcon3':btntype==3}"
          @click="jump()"
        ></span>
      </div>
      <div class="title" :style="{'color':color}">{{ title }}</div>
      <div class="rows-1"></div>
    </div>
  </header>
</template>

<script>
import { changeUrl } from "../utils/changeUrl";
import { goBack } from "../utils/back";

export default {
  name: "app-head",
  props: {
    color: {
      default: "#524B49"
    },
    btntype: {
      default: 3
    },
    type: String,
    poptitle:{
      default:''
    }
  },
  components: {},
  data: () => ({
    isWeiXin: false,
    isApps: false,
    title: ""
  }),
  methods: {
    goBack,
    changeUrl,
    goPage(path) {
      changeUrl(path);
    },
    jump() {
      if (this.type == "app") {
        this.goBack();
      } else if (this.type == "paysu") {
        if (
          navigator.userAgent.indexOf("Firefox") >= 0 ||
          navigator.userAgent.indexOf("Opera") >= 0 ||
          navigator.userAgent.indexOf("Safari") >= 0 ||
          navigator.userAgent.indexOf("Chrome") >= 0 ||
          navigator.userAgent.indexOf("WebKit") >= 0
        ) {
          if (window.history.length > 2) {
            window.history.go(-2);
          } else {
            window.history.go(-1);
          }
        } else {
          //未知的浏览器
          window.history.go(-1);
        }
      } else {
        if (
          navigator.userAgent.indexOf("Firefox") >= 0 ||
          navigator.userAgent.indexOf("Opera") >= 0 ||
          navigator.userAgent.indexOf("Safari") >= 0 ||
          navigator.userAgent.indexOf("Chrome") >= 0 ||
          navigator.userAgent.indexOf("WebKit") >= 0
        ) {
          if (window.history.length > 1) {
            window.history.go(-1);
          } else {
            //this.$router.go(-1);
            this.goBack();
          }
        } else {
          //未知的浏览器
          window.history.go(-1);
        }
      }
    }
  },
  created() {
    //判断是否app
    const storeLocal = require("store");
    this.isApps = storeLocal.get("renrenfo_webview_login") || false;
    if(this.poptitle==''){
    }else{
      this.title=this.poptitle
    }
  },
  mounted(){
    let that=this
    that.bus.$on('change_head_title',function(data){
      console.log(data)
     that.title=data
    })
  }
};
</script>

<style lang="less" scoped>
// 头部
.pageHead {
  position: absolute;
  width: 100%;
  height:3rem;
  top: 0;
  background: #ffffff;
  z-index: 3;
  .rows {
    width: 100%;
    height: 100%;
    display: flex;
    .rows-1 {
      width: 20%;
      height: 100%;
      .backIcon {
        display: block;
        width: 0.8rem;
        height: 1.2rem;
        background-image: url("../statics/images/system/back2.png");
        background-size: 100% auto;
        background-repeat: no-repeat;
        background-position: center center;
        position: relative;
        left: 8px;
        top: 0.9rem;
      }
      .backIcon2 {
        display: block;
        width: 0.8rem;
        height: 1.2rem;
        background-image: url("../statics/images/system/back.png");
        background-size: 100% auto;
        background-repeat: no-repeat;
        background-position: center center;
        position: relative;
        left: 8px;
        top: 0.9rem;
      }
      .backIcon3 {
        display: block;
        width: 1.13rem;
        height: 1.2rem;
        background-image: url("../statics/images/system/jiantou-3.png");
        background-size: 100% auto;
        background-repeat: no-repeat;
        background-position: center center;
        position: relative;
        left: 8px;
        top: 0.9rem;
      }
    }
    .title {
      width: 60%;
      text-align: center;
      font-size: 16px;
      color: white;
      font-family: PingFangSC-Medium;
      line-height: 3rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-weight: 600;
    }
  }
}
</style>