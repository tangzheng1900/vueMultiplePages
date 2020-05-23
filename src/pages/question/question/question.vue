<template>
  <div id="pageDiv" :style="{'padding-top':isWeiXin || isApps?'0':'0'}">

    <!-- 页面的主要内容 -->
    <section class="content">
      <div
        class="question-item"
        v-for="(item, index) in options.questions"
        :key="index"
      >
        <div class="title">{{ item.title }}</div>
        <van-checkbox-group
          class="checkbox-group"
          v-model="value[index]">
          <van-checkbox
            style="height: 35px"
            v-for="(check, index) in item.checkList"
            :key="index"
            shape="square"
            :name="check.value">{{ check.label }}
          </van-checkbox>
        </van-checkbox-group>
      </div>
      <van-field v-model="username" label="姓名" clearable required size="large" label-width="60" />
      <van-field v-model="phone" type="tel" label="手机号" clearable required size="large" label-width="60" />
      <van-button
        style="margin-top: 15px"
        type="info"
        block
        @click="handleSubmit"
      >点击提交，抽大奖</van-button>
      <van-button
        style="margin: 15px 0"
        type="info"
        block
        @click="changeUrl('result.html')"
      >查看结果</van-button>
    </section>
  </div>
</template>
<script>
import mynav from "@/components/mynav";
import {changeUrl} from "@/utils/changeUrl";
import options from "./options";
import {fetch} from "../../../utils/request";
import { GetQueryString } from "../../../statics/js/methods";

export default {
  data() {
    return {
      isWeiXin: TS_WEB.isWeiXin,
      isApps: TS_WEB.isApp,
      options,
      value: [[], [], [], []],
      username: '',
      phone: '',
      uid: '', // UID_CXkBtaSedeKS0XtySFe78EDuTMyr
    };
  },
  components: {
    mynav: mynav
  },
  methods: {
    changeUrl,
    handleSubmit() {
      if (this.username && this.phone) {
        const message = "<table><tr><th>产品</th><th>数量</th><th>产品说明</th></tr><tr><td>主卡</td><td>2</td><td>300分钟通话</td></tr></table>"
        this.pushMessage1(message);
      } else {
        this.$toast('请填写完成的个人信息！');
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
    }
  },
  mounted(){
    const uid = GetQueryString('uid');
    if(uid) {
      this.uid = uid;
    } else {
      this.$toast('请使用专属二维码进入');
    }
  },
  created() {
    document.title='查一查，礼品任你拿--问卷'
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
  .content{
    height: 100%;
    overflow: auto;
    background-color: #5D60B1;
    .page_title{
      text-align: center;
      margin-top: 1rem;
      font-size: 2rem;
    }
    .question-item{
      margin: 10px;
      .title{
        line-height: 30px;
        color: #fff;
      }
      .checkbox-group{
        background-color: #fff;
        padding: 5px 0 5px 10px;
        border-radius: 5px;
      }
    }
  }
}
</style>
