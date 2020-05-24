<template>
  <div id="pageDiv" :style="{'padding-top':isWeiXin || isApps?'0':'3rem'}">

    <!-- 页面头部-->
    <header-com :poptitle="'参与查一查，礼物任你拿'" :type="'doc_title'" v-if="!isWeiXin && !isApps"></header-com>
    <!-- 页面的主要内容 -->
    <section class="content">
      <div class="recommend">
        {{ recommend.title + recommend.overview }}
      </div>
      <div>具体组合</div>
      <van-cell
        v-for="item in Object.keys(recommend.component)"
        :key="item">
        <span>{{ recommend.component[item].title }}</span>
        <span style="margin-left: 10px">{{ recommend.component[item].num }}</span>
        <span style="margin-left: 10px">{{ recommend.component[item].desc }}</span>
      </van-cell>
      <div style="padding: 20px">中奖信息：{{ reward }}</div>
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
      options: { ...options },
      checkList: [], // 多选的结果
      radio: [], // 单选的结果
      userName: '', // 用户名
      userPhone: '', // 用户电话
      uid: '', // 客户经理的uid
      networking: 0, // 智能组网个数
      watchDog: 0, // 天翼看家个数
      doorbell: 0, // 门铃个数
      baseFee: 0, // 基础费用
      reward: '三等奖', // 奖励
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
      let baseRecommend = this.options.result['130'];
      if (170 <= this.baseFee < 200) {
        baseRecommend = this.options.result['151'];
      }
      if (this.baseFee >= 200) {
        baseRecommend = this.options.result['191'];
      }
      baseRecommend.title = `推荐您电信智家${this.totalFee}套餐`;
      if(this.networking) {
        baseRecommend.component.networking = {title: '智能组网', num: this.networking, desc: ''};
      }
      if(this.watchDog) {
        baseRecommend.component.watchDog = {title: '天翼看家', num: this.watchDog, desc: ''};
      }
      if (this.doorbell) {
        baseRecommend.component.doorbell = {title: '智能门铃', num: this.doorbell, desc: ''};
      }
      baseRecommend.component.cloud = {title: '家庭云', num: '', desc: '赠送'};
      return baseRecommend;
    }
  },
  components: {
    HeaderCom
  },
  methods: {
    changeUrl,
    handleSubmit() {
      this.saveData();
      if(this.userName && this.userPhone) {
        this.$toast('信息已保存，请到营业厅办理套餐，凭当前截图领奖');
        const title = `<h3>姓名：${this.userName}</h3><h3>电话：${this.userPhone}</h3>`;
        const recommendTitle = this.recommend.title + this.recommend.overview;
        const tableTile = '<tr><th>产品</th><th>数量</th><th>产品说明</th></tr>';
        let tableContent = '';
        Object.keys(this.recommend.component).forEach(key => {
          let item = this.recommend.component[key];
          tableContent +=`<tr><td>${item.title}</td><td>${item.num}</td><td>${item.desc}</td></tr>`;
        })
        const message = title + recommendTitle + `<table>${tableTile}${tableContent}</table>`;
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
        this.$toast('----信息已保存');
      });
    },
    saveData() {
      // const api = 'http://220.179.41.8:38651/api/msg_board/add';
      const api = 'http://192.168.0.18:8090/api/customer/add'; // 本地调试使用的接口
      const params = {  // 构造要保存的信息
        uid: this.uid,
        userName: this.userName,
        userPhone: this.userPhone,
        baseFee: this.baseFee,
        totalFee: this.totalFee,
        networking: this.networking,
        watchDog: this.watchDog,
        doorbell: this.doorbell,
        recommend: JSON.stringify(this.recommend),
      };
      fetch().post(api, params).then(() => {
        this.$toast('信息保存成功！');
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
      this.uid = result.uid;
    }
  },
  mounted(){ // 所有的推送和保存逻辑都在这个页面处理
   this.initData();
  },
  created() {
    document.title='参与查一查，礼品任你拿！';
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
      line-height: 30px;
      font-size: 18px;
    }

  }
}
</style>
