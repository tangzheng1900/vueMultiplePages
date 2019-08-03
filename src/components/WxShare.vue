<template></template>
<script type="text/javascript">
import wx from "weixin-js-sdk";
import { addAccessToken } from "../utils/request";
export default {
  props: {
    title: String, //分享朋友圈、发送朋友的标题
    desc: String, //发送朋友的描述
    link: String, //跳转的连接
    imgUrl: String //分享图片的连接
  },
  data() {
    return {
      appId: "", // API前缀 例如 feeds
      timestamp: 0, // 被供养的资源 例如 5
      nonceStr: "", // API方法 例如 rewards/rewarders
      signature: "", // 被供养的数据源
      invite: ""
    };
  },
  methods: {
    shardConfig() {
      console.log("微信参数?", this.title, this.link, this.imgUrl);

      //分享内容配置
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: this.appId, // 必填，公众号的唯一标识
        timestamp: this.timestamp, // 必填，生成签名的时间戳
        nonceStr: this.nonceStr, // 必填，生成签名的随机串
        signature: this.signature, // 必填，签名，见附录1
        jsApiList: ["onMenuShareTimeline", "onMenuShareAppmy_message"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      }),
        wx.onMenuShareTimeline({
          title: this.title, // 分享标题
          link: this.link + "?invite=" + this.invite, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: this.imgUrl, // 分享图标
          success() {
            //alert('分享朋友圈成功')
            // 用户确认分享后执行的回调函数
          },
          cancel() {
            //alert('分享朋友圈失败')
            // 用户取消分享后执行的回调函数
          }
        }),
        wx.onMenuShareAppmy_message({
          title: this.title, // 分享标题
          desc: this.desc, // 分享描述
          link: this.link + "?invite=" + this.invite, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: this.imgUrl, // 分享图标
          // type: 'link', // 分享类型,music、video或link，不填默认为link
          // dataUrl: this.details.videoUrl, // 如果type是music或video，则要提供数据链接，默认为空
          success: function() {
            //alert('分享给朋友成功')
            // 用户确认分享后执行的回调函数
          },
          cancel: function() {
            //alert('分享给朋友成功')
            // 用户取消分享后执行的回调函数
          }
        });
    },
    getSignatureInfo() {
      //获取签名
      let url = location.href.split("#")[0];
      url = encodeURIComponent(url);

      // alert(url);

      // addAccessToken().get('https://www.renrenfo.com/api/v2/wechat/share?url='+url).then(res => {
      addAccessToken()
        .get("/api/v2/wechat/share?url=" + url)
        .then(res => {
          this.appId = res.data.appId;
          this.signature = res.data.signature;
          this.timestamp = res.data.timestamp;
          this.nonceStr = res.data.nonceStr;
          this.shardConfig();
        })
        .catch(error => {
          console.log("获取签名异常:", error);
        });
    },
    init() {
      this.getSignatureInfo();
    }
  },
  created() {
    this.invite = window.$invite;
    this.init();
    console.log(this.title, this.desc, this.link, this.imgUrl);
  }
};
</script>