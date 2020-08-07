import Vue from 'vue'
import Vuex from 'vuex'
// import * as getters from './getters.js'

Vue.use(Vuex)

/** 状态定义 */
export const state = {
  loading: false,
  themeObj: 0,//主题
  aboutmeObj:'',//关于我的信息
  host:"www.hinzzz.cn",
  git:"https://github.com/hinzzz",
  email:"157957329@qq.com",
  deployTime:"2020/08/08 08:08:08",
  keywords:'',//关键词
  errorImg: 'this.onerror=null;this.src="' + require('../../static/img/tou.jpg') +'"'
}

export default new Vuex.Store({
    state,
})
