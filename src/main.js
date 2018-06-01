/**
 * @Author: alcwynparker
 * @Date:   2018-03-12T22:22:05+00:00
 * @Last modified by:   alcwynparker
 * @Last modified time: 2018-03-12T23:56:59+00:00
 */

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueSplit from 'vue-split-panel'

import './assets/sass/ioi.scss'

Vue.config.productionTip = false
Vue.use(VueSplit)

Vue.prototype.$editor = {instance: null}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
/*
window.onerror = function myErrorHandler(errorMsg, url, lineNumber) {
    alert("Error occured: " + errorMsg);//or any message
    return false;
}*/
