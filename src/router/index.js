import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
	mode: 'history',
	scrollBehavior(to, from, savePosition) { // 在点击浏览器的“前进/后退”，或者切换导航的时候触发。
		if (savePosition) {
			return savePosition;
		} else {
            var top;
            if (window.innerWidth >= 700) {
                 top = 676
            } else {
                 top = 267
            }
			return {
				x: 0,
				y: top
			}
		}
	},
	routes: [
		{
			path: '/',
			component: resolve => require(['../views/Home.vue'], resolve),
			meta: {
				auth: true
			},
			name: 'Home'
		}, //首页
		{
			path: '/Home',
			component: resolve => require(['../views/Home.vue'], resolve),
			meta: {
				auth: true
			},
			name: 'Home'
		}, //首页
		{
			path: '/Share',
			component: resolve => require(['../views/Share.vue'], resolve),
			meta: {
				auth: true
			},
			name: 'Share'
		}, //文章列表
		{
			path: '/artilce',
			component: resolve => require(['../views/DetailShare.vue'], resolve),
			meta: {
				auth: true
			},
			name: 'detail'
		}, //文章详情
		{
			path: '/Aboutme',
			component: resolve => require(['../views/Aboutme.vue'], resolve),
			meta: {
				auth: true
			},
			name: 'Aboutme'
		}, //关于		
	]
})
