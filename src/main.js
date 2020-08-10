// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/style.less'
import store from './store'
import moment from 'moment'
// import MetaInfo from 'vue-meta-info';

// Vue.use(MetaInfo);
import VueMeta from 'vue-meta'
Vue.use(VueMeta)
Vue.prototype.$moment = moment
moment.suppressDeprecationWarnings = true;
Vue.config.productionTip = false
Vue.use(ElementUI)





/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store,
})


