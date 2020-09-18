import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
	mode: 'history',
	scrollBehavior: () => ({ x: 0, y: 0 }),
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
			path: '/cat/:cat',
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
			path: '/search/:q',
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
			path: '/detail/:id',
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
		{
			path: '/catalogue',
			component: resolve => require(['../views/catalogue.vue'], resolve),
			meta: {
				auth: true
			},
			name: 'catalogue'
		}, //目录测试	
	]
})
