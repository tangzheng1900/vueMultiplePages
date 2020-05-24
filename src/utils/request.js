import axios from 'axios';
import storeLocal from 'store';

const protocolStr = document.location.protocol;
// const protocolStr = document.location.protocol + document.domain ;
let domain = document.domain;
const apiv1 = '/api/v1';
const api = '/api/v2';
var env = `${domain === 'localhost' ? '/env': ''}/ts/v2`;//根据域名加env字段
if(domain == 'h5.dev.renrenfo.cn'){
  env='ts/v2'
}

// Created the request address of API.
export const createAPI = PATH => `${api}/${PATH}`;

// Created the request address of API V1.
export const createOldAPI = PATH => `${apiv1}/${PATH}`;
export const createEnvAPI = PATH => `${env}/${PATH}`;
// 注入access-token验证
export const addAccessToken = () => {
  // 如果有才发送
  let new_toke = storeLocal.get('UserLoginInfo');
  const {
    token = ''
  } = storeLocal.get('UserLoginInfo') || {};
  let _token = token ? `Bearer ${token}` : '';

  axios.defaults.headers.common = {
    'Authorization': _token,
    'Accept': 'application/json',
    'Cache-Control': 'no-cache'
  };
  return axios;
};

export const config = {
  wxpushApi: 'http://wxpusher.zjiecode.com', // 微信推送的服务地址
  appToken: 'AT_GND5DX81k9aDK4DrdpPjtI5gO00jKIg2', // 推送服务的token
  frontendApi: 'http://192.168.0.108:8080', // 前端页面服务地址
  backendApi: 'http://192.168.0.108:8090', // 本地开发后端服务的地址
  // frontendApi: 'http://220.179.41.8:38557', // 生产环境的服务
  // backendApi: 'http://220.179.41.8:38651', // 生产环境的服务
};

export const fetch = () => {
    axios.defaults.headers.common = {
        'Accept': 'application/json',
        'Cache-Control': 'no-cache'
    };
    return axios;
}

axios.interceptors.response.use(
  function (response) {
    //在不需要处理的页面
    return response;
  },
  // 错误请求处理
  function (error) {
    if (error.response) {
      const {
        status
      } = error.response;
      // token失效 提示: 重新登录
      if (status === 401) {
        // 清除本地保存的 token
        storeLocal.remove('UserLoginInfo');
        //如果在app中则前往app登陆
        let isApps = storeLocal.get('renrenfo_webview_login') || false;
        if (isApps) {
          // 安卓app中回调
          let u = navigator.userAgent;
          let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
          let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
          if (isAndroid) {
            try {
              window.native.login();
            } catch (error) {
              console.log(error)
            }
            return
          } else if (isiOS) {
            try {
              webkit.messageHandlers.showLoginHandler.postMessage('');
            } catch (error) {
              console.log(error)
            }
            return
          }
        }
        //非app内，前往web页登录
        window.location.href = 'login.html'
        return Promise.reject({
          response: {
            data: {
              message: "登录失效, 请重新登录"
            }
          }
        });
      }
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log('Error', error.message);
    }
    return Promise.reject(error);
  }
);

export default axios;
