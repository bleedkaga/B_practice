import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/router',
      name: 'router',
      component: resolve => require(['@/components/router2'], resolve),
    },
    {
      path: '/router-transition',
      name: 'router',
      component: resolve => require(['@/components/router'], resolve),
      children: [
        {
          path: 'path1',
          component: resolve => require(['@/components/path'], resolve)
        },
        {
          path: 'path2',
          component: resolve => require(['@/components/path2'], resolve)
        },
        {
          path: 'path3',
          component: resolve => require(['@/components/path'], resolve)
        },
        {
          path: 'path4',
          component: resolve => require(['@/components/path'], resolve)
        }
      ]
    }
  ]
})
