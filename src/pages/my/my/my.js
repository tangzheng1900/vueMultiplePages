import Vue from 'vue'
import a from './my.vue'
import '@/pages/public_app'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(a)
})