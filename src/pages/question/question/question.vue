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
            :name="check.value">{{ check.label }}
          </van-checkbox>
        </van-checkbox-group>
      </div>
      <van-field label="用户名" placeholder="请输入用户名" v-model="username"></van-field>
      <van-field label="手机号" placeholder="请输入手机号" type="tel" v-model="phone"></van-field>
      <mt-button type="primary"  @click.native="handleSubmit">点击提交，抽大奖</mt-button>
      <mt-button type="primary"  @click.native="changeUrl('result.html')">查看结果</mt-button>
    </section>
    <mynav :pagename="'question'"/>
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
      uid: '',
    };
  },
  components: {
    mynav: mynav
  },
  methods: {
    changeUrl,
    handleClick() {
      this.$toast({
        message: '提示',
        position: 'top',
        duration: 5000
      });
    },
    handleSubmit() {
      this.$toast({
        message: '提交内容',
        position: 'top',
        duration: 5000
      });
      console.log(this.value);
      this.pushMessage('120套餐推荐给您！！！！');
    },
    pushMessage(message) {
      const api = 'http://wxpusher.zjiecode.com/api/send/message/'
      const appToken = 'AT_GND5DX81k9aDK4DrdpPjtI5gO00jKIg2';
      const { uid } = this;
      const content = encodeURI(message);
      const url = `${api}?appToken=${appToken}&uid=${uid}&content=${content}`;
      fetch().get(url).then(() => {
        this.$toast('信息已推送并保存');
      });
    },
  },
  mounted(){
    this.uid = GetQueryString('uid');
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
  padding-bottom: 3.27rem;
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
