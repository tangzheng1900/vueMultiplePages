<template>
  <div id="pageDiv" :style="{'padding-top':isWeiXin || isApps?'0':'0'}">

    <!-- 页面的主要内容 -->
    <section class="content">
      <h3 class="page_title">二维码生成</h3>
      <mt-field label="UID" placeholder="请输入UID" v-model="uid"></mt-field>
      <mt-button type="primary"  @click.native="getQrocde">点击生成个人二维码</mt-button>
      <qrcode-vue v-if="headImg" :logoSrc="headImg" :text="text" :logoScale="50" :size="300" />
        <div>{{ url }}</div>
    </section>
    <mynav :pagename="'liking'"/>
  </div>
</template>
<script>
import mynav from "@/components/mynav";
import {changeUrl} from "@/utils/changeUrl"
import { getSaleInfoByUid } from "../../../utils/request";
import QrcodeVue from 'vue-qr';
export default {
    data() {
        return {
            isWeiXin: TS_WEB.isWeiXin,
            isApps: TS_WEB.isApp,
            text: '', //需要生成二维码图片的字符串
            uid: 'UID_CXkBtaSedeKS0XtySFe78EDuTMyr',
            headImg: '',
            url: '11111'
        };
    },
  components: {
    mynav: mynav,
      QrcodeVue
  },
  methods: {
    changeUrl,
      getQrocde(){
          getSaleInfoByUid().get('http://wxpusher.zjiecode.com/api/fun/wxuser?appToken=AT_GND5DX81k9aDK4DrdpPjtI5gO00jKIg2&uid=UID_CXkBtaSedeKS0XtySFe78EDuTMyr').then(res => {
              console.log('uid====', res);
              this.headImg = res.data.data.records[0].headImg;
              this.text=`http://192.168.0.106:8080/liking.html?uid=${this.uid}`;
          });
      },
  },
  mounted(){
     this.url = location.href;
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
  }
}
</style>