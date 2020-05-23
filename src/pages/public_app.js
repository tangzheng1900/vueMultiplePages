import Vue from 'vue'
// 本地存储
import storeLocal from 'store';
//图片懒加载
import VueLazyload from 'vue-lazyload';
import loading_img from '../statics/images/system/image-loading.png';
//引用公用的css
import '../statics/css/common.less';
//mint-ui样式引入
import 'mint-ui/lib/style.css';
import MintUI from 'mint-ui';
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(MintUI);
Vue.use(Vant);
// 定义全局本地存储组件
Vue.prototype.$storeLocal = storeLocal;
// 全局的事件总线对象
Vue.prototype.bus = new Vue()
//引入公用js
import '../statics/js/public'
// lazyload for images
Vue.use(VueLazyload, {
  loading: loading_img,
  preLoad: 1,
});

