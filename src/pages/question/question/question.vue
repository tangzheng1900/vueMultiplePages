<template>
  <div id="pageDiv" :style="{'padding-top':isWeiXin || isApps?'0':'0'}">

    <!-- 页面的主要内容 -->
    <section class="content">
      <div
        class="question-item"
        v-for="(item, index) in options.questions"
        :key="index"
      >
        <div class="title">{{ `${index + 1}. ${item.title}`}}</div>
        <van-checkbox-group
          class="checkbox-group"
          v-model="checkList[index]">
          <van-checkbox
            style="height: 35px"
            v-for="(check, index) in item.checkList"
            :key="index"
            shape="square"
            :name="check.value">{{ check.label }}
          </van-checkbox>
        </van-checkbox-group>
      </div>
      <div
        class="question-item"
        v-for="(item, index) in options.radioQuestions"
        :key="index + 3"
      >
        <div class="title">{{ `${index + 3}. ${item.title}`}}</div>
        <van-radio-group
          class="checkbox-group"
          v-model="radio[index]">
          <van-radio
            style="height: 35px"
            v-for="(check, index) in item.checkList"
            :key="index"
            :name="check.value">{{ check.label }}
          </van-radio>
        </van-radio-group>
      </div>
      <div class="question-item">
        <div class="title">6.全家一个月话费多少元?</div>
        <van-field v-model="digit1" type="digit" label="夫妻" label-width="60" placeholder="请输入整数"/>
        <van-field v-model="digit2" type="digit" label="父母" label-width="60" placeholder="请输入整数"/>
        <van-field v-model="digit3" type="digit" label="子女" label-width="60" placeholder="请输入整数"/>
      </div>
      <div class="question-item">
        <div class="title">个人信息（非必填）</div>
        <van-field v-model="userName" label="姓名" clearable size="large" label-width="60" />
        <van-field v-model="userPhone" type="tel" label="手机号" clearable size="large" label-width="60" />
      </div>
      <van-button
        style="margin: 15px 0"
        type="info"
        block
        @click="handleSubmit"
      >点击提交，抽大奖</van-button>
    </section>
  </div>
</template>
<script>
import mynav from "@/components/mynav";
import {changeUrl} from "@/utils/changeUrl";
import options from "./options";
import { GetQueryString } from "../../../statics/js/methods";

export default {
  components: {
    mynav: mynav
  },
  data() {
    return {
      isWeiXin: TS_WEB.isWeiXin,
      isApps: TS_WEB.isApp,
      options,
      checkList: [[], []], // 多选的值
      radio: ['','',''], // 单选额值
      digit1: '',
      digit2: '',
      digit3: '',
      userName: '',
      userPhone: '',
      uid: '', // UID_CXkBtaSedeKS0XtySFe78EDuTMyr
    };
  },
  computed: {
    baseFee() {
      return Number(this.digit1) + Number(this.digit2) + Number(this.digit3);
    }
  },
  methods: {
    changeUrl,
    handleSubmit() {
      console.log(this.checkList, this.radio);
      const { checkList, radio, userName, userPhone, uid, baseFee } = this;
      // 先校验，不通过直接提醒
      // if(!uid) {
      //   this.$toast('客户经理不存在，请扫描客户经理的二维码进入填写！');
      //   return;
      // }
      if (this.baseFee < 5) { // 基本话费不可低于5元
        this.$toast('话费必填！');
        return;
      }
      let valid = true;
      checkList.forEach(item => {
        if(item.length < 1) {
          this.$toast('每道题至少选择一项！');
          valid = false;
          return;
        }
      });
      radio.forEach(item => {
        if(item === '') {
          this.$toast('每道题至少选择一项！');
          valid = false;
          return;
        }
      });
      if (valid) {
        sessionStorage.setItem('result', JSON.stringify({ checkList, radio, userName, userPhone, uid, baseFee })); // 存储，给result页面使用，统一在result推送
        this.changeUrl('result.html'); // 跳转
      }
    },
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
    document.title='查一查，礼品任你拿！'
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
      margin: 15px;
      .title{
        line-height: 25px;
        color: #fff;
        margin-bottom: 5px;
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
