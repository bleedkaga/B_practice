import Vue from 'vue';
import VueRouter from 'vue-router'
import App from './app.vue'

Vue.use(VueRouter)

const Routers = [
	{
		path: '/index',
		component: resolve => require(['./src/packages/index.vue'], resolve)
	},{
		path: '/about',
		component: resolve => require(['./src/packages/about.vue'], resolve)
	}
]

const router = new VueRouter({
	Routers
})
new Vue({
	el: '#app',
	router,
	render: h => h(App)
})