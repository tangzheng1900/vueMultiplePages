<template>
  <div id="pageDiv" :style="{'padding-top':isWeiXin || isApps?'0':'3rem'}">

    <!-- 页面头部-->
    <header-com :poptitle="'参与查一查，礼物任你拿'" :type="'doc_title'" v-if="!isWeiXin && !isApps"></header-com>
    <!-- 页面的主要内容 -->
    <section class="content">
      <h2>611分</h2>
      <a href="">答案解析</a>
      <div
        class="recommend"
        v-if="recommend"
      >
        {{ options.result[recommend].overview }}
      </div>
      <div style="padding: 20px">中奖信息：三等奖</div>
      <van-field v-model="userName" label="姓名" clearable required size="large" label-width="60" />
      <van-field v-model="userPhone" type="tel" label="手机号" clearable required size="large" label-width="60" />
      <van-button
        style="margin-top: 15px"
        type="info"
        block
        @click="handleSubmit"
      >提交领奖信息</van-button>
    </section>
  </div>
</template>
<script>
import HeaderCom from "@/components/header"; //页面头部
import {changeUrl} from "@/utils/changeUrl";
import options from "../question/options";
import {fetch} from "@/utils/request";

export default {
  data() {
    return {
      isWeiXin: TS_WEB.isWeiXin,
      isApps: TS_WEB.isApp,
      options,
      checkList: [], // 多选的结果
      radio: [], // 单选的结果
      userName: '', // 用户名
      userPhone: '', // 用户电话
      uid: '', // 客户经理的uid
      networking: 0, // 智能组网个数
      watchDog: 0, // 天翼看家个数
      doorbell: 0, // 门铃个数
      baseFee: 0, // 基础费用
    };
  },
  computed: {
    totalFee() { // 总费用
      const networkingPrice = 10;
      const watchDogPrice = 15;
      const doorbellPrice = 20;
      return this.baseFee + networkingPrice * this.networking + watchDogPrice * this.watchDog + doorbellPrice * this.doorbell;
    },
    recommend() {
      if (this.radio[2] === 'A') { return '130'}
      if (this.radio[2] === 'B') { return '151'}
      if (this.radio[2] === 'C') { return '191'}
      return '130';
    }
  },
  components: {
    HeaderCom
  },
  methods: {
    changeUrl,
    handleSubmit() {
      if(this.userName && this.userPhone) {
        this.$toast('信息已保存，请到营业厅办理套餐，凭当前截图领奖');
        const message = "<table><tr><th>产品</th><th>数量</th><th>产品说明</th></tr><tr><td>主卡</td><td>2</td><td>300分钟通话</td></tr></table>"
        this.pushMessage1(message);
      } else {
       this.$toast('必须提交完整的个人信息才能领奖');
      }
    },
    pushMessage(message) {
      const api = 'http://wxpusher.zjiecode.com/api/send/message/';
      const appToken = 'AT_GND5DX81k9aDK4DrdpPjtI5gO00jKIg2';
      const { uid } = this;
      const content = encodeURI(message);
      const url = `${api}?appToken=${appToken}&uid=${uid}&content=${content}`;
      fetch().get(url).then(() => {
        this.$toast('信息已保存');
      });
    },
    pushMessage1(content) {
      const api = 'http://wxpusher.zjiecode.com/api/send/message';
      const appToken = 'AT_GND5DX81k9aDK4DrdpPjtI5gO00jKIg2';
      const { uid } = this;
      const params = {
        appToken,
        content,
        summary: '推荐套餐',
        contentType: 2,
        uids: [uid]
      };
      fetch().post(api, params).then(() => {
        this.$toast('post,,,,信息已保存');
      });
    },
    initData() { // 初始化结果页的数据，做逻辑处理
      const result = JSON.parse(sessionStorage.getItem('result'));
      console.log(result);
      this.checkList = result.checkList;
      this.radio = result.radio;
      this.userName = result.userName;
      this.userPhone = result.userPhone;
      this.networking = result.checkList[0].length;
      this.watchDog = result.checkList[1].length;
      this.doorbell = result.radio[0];
      this.baseFee = result.baseFee;
    }
  },
  mounted(){ // 所有的推送和保存逻辑都在这个页面处理
   this.initData();
  },
  created() {
    document.title='参与查一查，礼品任你拿！'
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
    overflow: auto;
    h2{
      text-align: center;
      margin: 20px;
    }
    .recommend{
      padding: 10px;
      line-height: 20px;
    }

  }
}
</style>
