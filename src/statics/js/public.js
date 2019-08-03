//自动设置font-zise
(function (doc, win) {
  var docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function () {
      var clientWidth = docEl.clientWidth;
      if (!clientWidth) return;
      window.font = docEl.style.fontSize = parseInt(30 * (clientWidth / 750)) + 'px';
    };
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

import storeLocal from 'store';
import { GetQueryString } from './methods';
window.TS_WEB = {
  "isWeiXin": false,
  "isApp": false
}

/**
 * 判断微信浏览器
 * @method isWeiXin
 */
function isWeiXin() {
  var ua = window.navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    return true;
  } else {
    return false;
  }
}
if (isWeiXin()) {
  TS_WEB.isWeiXin = true;
}

/**
 * 判断是否app
 */
let isapp_local = storeLocal.get('webview_login') || false;

//再看参数
let isapp_para = GetQueryString('isApp') || false;
TS_WEB.isApp = isapp_local || isapp_para;

if (TS_WEB.isApp && TS_WEB.isApp != '') {
  storeLocal.set('webview_login', TS_WEB.isApp);
  //调用安卓显示原生头部,与隐藏底部
  let u = navigator.userAgent;
  let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
  let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  if (isAndroid) {
    console.log('isAndroid')
  } else if (isiOS) {
    console.log('ios')
  }
}

//取消ios下双击页面上滑问题
function cancleDbclick() {
  let agent = navigator.userAgent.toLowerCase(); //检测是否是ios
  let iLastTouch = null; //缓存上一次tap的时间
  if (agent.indexOf('iphone') >= 0 || agent.indexOf('ipad') >= 0) {
    document.body.addEventListener('touchend', function (event) {
      let iNow = new Date().getTime();
      iLastTouch = iLastTouch || iNow + 1 /** 第一次时将iLastTouch设为当前时间+1 */ ;
      let delta = iNow - iLastTouch;
      if (delta < 500 && delta > 0) {
        event.preventDefault();
        return false;
      }
      iLastTouch = iNow;
    }, false);
  }
}
cancleDbclick();