import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)
const User = {
  template: '<span><h1>单个动态路由</h1><div>id is {{$route.params.id}}</div></span>'
}

const post = {
  template: '<span><h1>多个动态路由</h1><div>username is {{$route.params.username}}, post_id is {{$route.params.post_id}}</div></span>'
}

var responseRouter = {
  template: '<span><h1>单个动态路由</h1></span>',
  beforeRouteUpdate(to, from, next){
    console.log(to, from)
    next()
  }
}


const nesting = {
  template: `
    <div class="user">
      <h1>嵌套路由</h1>
      <hr>
      <h2>User {{$route.params.id}}</h2>
      <router-view></router-view>
    </div>
  `
}

const Profile = {
  template: '<div>Profile</div>'
}


export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: HelloWorld
    },
    {
      path: '/user/:id',
      component: User
    },
    {
      path: '/user/:username/post/:post_id',
      component: post
    },
    {
      path: '/response_router',
      component: responseRouter
    },
    {
      path: '/nesting/:id',
      component: nesting,
      children: [
        {
          path: 'profile',
          component: Profile
        }
      ]
    },

  ]
})
