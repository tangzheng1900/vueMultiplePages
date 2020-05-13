<template>
  <div id="pageDiv" :style="{'padding-top':isWeiXin || isApps?'0':'0'}">

    <!-- 页面的主要内容 -->
    <section class="content">
      <mt-button size="small"  @click.native="handleClick">small</mt-button>
      <mt-checklist
              v-for="(option, index) in options.questions"
              :key="index"
              :title="option.title"
              v-model="value[index]"
              :options="option.checkList">
      </mt-checklist>
      <mt-field label="用户名" placeholder="请输入用户名" v-model="username"></mt-field>
      <mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model="phone"></mt-field>
      <mt-button type="primary"  @click.native="handleSubmit">点击提交，抽大奖</mt-button>
      <mt-button type="primary"  @click.native="changeUrl('result.html')">查看结果</mt-button>
    </section>
    </section>
    <mynav :pagename="'my'"/>
  </div>
</template>
<script>
import mynav from "@/components/mynav";
import {changeUrl} from "@/utils/changeUrl";
import options from "./options";

export default {
  data() {
    return {
      isWeiXin: TS_WEB.isWeiXin,
      isApps: TS_WEB.isApp,
        options,
        value: [[],[],[],[]],
        username: '',
        phone: ''
    };
  },
  components: {
    mynav: mynav
  },
  methods: {
      changeUrl,
      handleClick() {
        this.$toast({message: '提示',
            position: 'top',
            duration: 5000});
      },
      handleSubmit() {
          this.$toast({message: '提交内容',
              position: 'top',
              duration: 5000});
          console.log(this.value);
      }
  },
  mounted(){

  },
  created() {
    document.title='查一查，礼品任你拿'
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
      margin-top: 1rem;
      font-size: 2rem;
    }
  }
}
</style>