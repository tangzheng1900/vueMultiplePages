<template>
  <div id="pageDiv" :style="{'padding-top':isWeiXin || isApps?'0':'0'}">

    <!-- 页面的主要内容 -->
    <section class="content">
      <h3 class="page_title">二维码生成</h3>
      <mt-button type="primary"  @click.native="handleSubmit">点击生成个人二维码</mt-button>
      <div @click="getQrocde">二维码</div>
      <div id="qrcode"></div>
      <div @click="downs()"></div>
    </section>
    <mynav :pagename="'liking'"/>
  </div>
</template>
<script>
import mynav from "@/components/mynav";
import {changeUrl} from "@/utils/changeUrl"
import QRCode from 'qrcodejs2'  // 引入qrcode
export default {
  data() {
    return {
      isWeiXin: TS_WEB.isWeiXin,
      isApps: TS_WEB.isApp,
        link: 'http://test.wx.jia-r.com/temporaryCarIndex.html' //需要生成二维码图片的字符串
    };
  },
  components: {
    mynav: mynav,
      QRCode
  },
  methods: {
    changeUrl,
      getQrocde(){
          document.getElementById('qrcode').innerHTML=''
          this.$nextTick (function () {//生成二维码
              this.qrcode();
          })
      },
      qrcode () {
          let that = this;
          let qrcode = new QRCode('qrcode', {
              width: 200,
              height: 200,        // 高度
              text:  this.link,   // 二维码内容
              // render: 'canvas' ,   // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
              // background: '#f0f',   // 背景色
              // foreground: '#ff0'    // 前景色
          })
      },
      downs(){
          // //找到canvas标签
          let myCanvas = document.getElementById('qrcode').getElementsByTagName('canvas');
          let img=document.getElementById('qrcode').getElementsByTagName('img')
          // // //创建一个a标签节点
          let a= document.createElement("a")
          // //设置a标签的href属性（将canvas变成png图片）
          let imgURL=myCanvas[0].toDataURL('image/jpg');
          let ua = navigator.userAgent;
          if (ua.indexOf("Trident") != -1 && ua.indexOf("Windows") != -1) { // IE内核 并且  windows系统 情况下 才执行;
              var bstr = atob(imgURL.split(',')[1])
              var n = bstr.length
              var u8arr = new Uint8Array(n)
              while (n--) {
                  u8arr[n] = bstr.charCodeAt(n)
              }
              var blob = new Blob([u8arr])
              window.navigator.msSaveOrOpenBlob(blob, '下载' + '.' + 'png')
          }else if(ua.indexOf("Firefox") > -1){ //火狐兼容下载
              let blob = this.base64ToBlob(imgURL); //new Blob([content]);
              let evt = document.createEvent("HTMLEvents");
              evt.initEvent("click", true, true);//initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
              a.download = ' ';//下载图片名称，如果填内容识别不到，下载为未知文件，所以我这里就不填为空
              a.href = URL.createObjectURL(blob);
              a.dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true, view: window}));//兼容火狐
          }else{ //谷歌兼容下载
              img.src=myCanvas[0].toDataURL('image/jpg');
              // a.href = myCanvas[0].toDataURL('image/png').replace('image/png', 'image/octet-stream')
              a.href=img.src
              //设置下载文件的名字
              a.download = "下载"
              //点击
              a.click()
          }
      },
      //base64转blob
      base64ToBlob(code) {
          let parts = code.split(';base64,');
          let contentType = parts[0].split(':')[1];
          let raw = window.atob(parts[1]);
          let rawLength = raw.length;
          let uInt8Array = new Uint8Array(rawLength);
          for (let i = 0; i < rawLength; ++i) {
              uInt8Array[i] = raw.charCodeAt(i);
          }
          return new Blob([uInt8Array], {type: contentType});
      }
  },
  mounted(){

  },
  created() {
    document.title='商城'
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
    #qrcode { //图片有白边填充css
      display: inline-block;
      img {
        width: 132px;
        height: 132px;
        background-color: #fff; //设置白色背景色
        padding: 6px; // 利用padding的特性，挤出白边
      }
    }
  }
}
</style>