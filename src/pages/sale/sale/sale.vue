<template>
  <div id="pageDiv" :style="{'padding-top':isWeiXin || isApps?'0':'0'}">

    <!-- 页面的主要内容 -->
    <section class="content">
      <h3>销售专属页面</h3>
      <van-cell title="UID获取说明" is-link size="large"@click="show=true"/>
      <van-action-sheet v-model="show" title="UID说明">
        <div style="padding: 16px 16px 100px;">
          <div>UID是每个销售人员唯一的身份ID，点击按钮，扫码关注我们的服务即可获取</div>
          <div style="text-align: center; margin-top: 10px">
            <van-button
              type="info"
              url="http://wxpusher.zjiecode.com/api/qrcode/FuEd8hhLDKUeFTHp7zQ0fEVE4MgYFEM5aR4B6EgE1dljITAXRFtQiy61LGcairBl.jpg"
            >扫码关注，获取UID</van-button>
          </div>
        </div>
      </van-action-sheet>
      <van-field v-model.trim="uid" label="UID" clearable required size="large" label-width="60"/>
      <van-field v-model="name" label="姓名" clearable required size="large" label-width="60" />
      <van-field v-model="phone" type="tel" label="手机号" clearable required size="large" label-width="60" />
      <van-button
        style="margin-top: 15px"
        type="info"
        block
        @click="getQrocde"
      >生成我的专属二维码</van-button>
      <div v-if="headImg" class="qrcode">
        <qrcode-vue :logoSrc="headImg" :text="text" :logoScale="50" :size="300"/>
      </div>
    </section>
  </div>
</template>
<script>
  import {changeUrl} from "@/utils/changeUrl"
  import {fetch} from "../../../utils/request";
  import QrcodeVue from 'vue-qr';

  export default {
    data() {
      return {
        isWeiXin: TS_WEB.isWeiXin,
        isApps: TS_WEB.isApp,
        text: '', //需要生成二维码图片的字符串
        // demouid: 'UID_CXkBtaSedeKS0XtySFe78EDuTMyr',
        headImg: '',
        uid: '',
        name: '',
        phone: '',
        show: false
      };
    },
    components: {
      QrcodeVue
    },
    methods: {
      changeUrl,
      getQrocde() {
        if (this.uid && this.name && this.phone) {
          // 'http://wxpusher.zjiecode.com/api/fun/wxuser?appToken=AT_GND5DX81k9aDK4DrdpPjtI5gO00jKIg2&uid=UID_CXkBtaSedeKS0XtySFe78EDuTMyr'
          const url = `http://wxpusher.zjiecode.com/api/fun/wxuser?appToken=AT_GND5DX81k9aDK4DrdpPjtI5gO00jKIg2&uid=${this.uid}`;
          fetch().get(url).then(res => {
            if (res.data.data.total === 1) {
              console.log('uid====', res);
              this.headImg = res.data.data.records[0].headImg;
              this.text = `http://192.168.0.106:8080/question.html?uid=${this.uid}`;  // 问卷地址
            } else {
              this.headImg = '';
              this.$toast('请输入正确的uid信息！');
            }
          });
        } else {
          this.$toast('请输入完整的个人信息！');
        }
      },
    },
    mounted() {
      console.log('当前页面的url===', location.href);
    },
    created() {
      document.title = '获取我的二维码'
    }
  };
</script>

<style lang="less" scoped>
  // 盒子模型
  #pageDiv {
    width: 100%;
    height: 100%;
    padding-top: 0;
    /*padding-bottom: 3.27rem;*/
    overflow: hidden;
    position: relative;
    box-sizing: border-box;

    .content {
      height: 100%;
      overflow: auto;
      background-color: #F7F8FA;

      h3{
        text-align: center;
        margin: 20px 0;
      }
      .page_title {
        text-align: center;
        margin-top: 3rem;
        font-size: 1rem;
      }
      .qrcode{
        text-align: center;
        padding: 20px;
      }
    }
  }
</style>
