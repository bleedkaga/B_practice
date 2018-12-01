<template>
  <div class="router">
    <h1>Render</h1>
    <ul>
      <li><router-link to="/router-transition/path1">path1</router-link></li>
      <li><router-link to="/router-transition/path2">path2</router-link></li>
      <li><router-link to="/router-transition/path3">path3</router-link></li>
      <li><router-link to="/router-transition/path4">path4</router-link></li>
    </ul>
    <p>{{transitionName}}</p>
    <transition :name="transitionName" >
      <router-view></router-view>
    </transition>

  </div>
</template>

<style type="text/css">
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s ease;
}
.fade-enter, .fade-leave-active {
  opacity: 0
}
.child-view {
  position: absolute;
  transition: all .5s cubic-bezier(.55,0,.1,1);
}
.slide-left-enter, .slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(30px, 0);
  transform: translate(30px, 0);
}
.slide-left-leave-active, .slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-30px, 0);
  transform: translate(-30px, 0);
}
</style>


<script type="text/javascript">
  // export default {
  //   data(){
  //     return {
  //       transitionName: ''
  //     }
  //   },
  //   watch : {
  //     "$route"( to, from){
  //       const toDepth = to.path.split('/').length
  //       const fromDepth = from.path.split('/').length
  //       console.log(toDepth, fromDepth)
  //       this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slideInLeft'
  //     }
  //   }
  // }
  import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Home = {
  template: `
    <div class="home">
      <h2>Home</h2>
      <p>hello</p>
    </div>
  `
}

const Parent = {
  data () {
    return {
      transitionName: 'slide-left'
    }
  },
  // dynamically set transition based on route change
  watch: {
    '$route' (to, from) {
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length
      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
    }
  },
  template: `
    <div class="parent">
      <h2>Parent</h2>
      <transition :name="transitionName">
        <router-view class="child-view"></router-view>
      </transition>
    </div>
  `
}

const Default = { template: '<div class="default">default</div>' }
const Foo = { template: '<div class="foo">foo</div>' }
const Bar = { template: '<div class="bar">bar</div>' }

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', component: Home },
    { path: '/parent', component: Parent,
      children: [
        { path: '', component: Default },
        { path: 'foo', component: Foo },
        { path: 'bar', component: Bar }
      ]
    }
  ]
})

new Vue({
  router,
  template: `
    <div id="app">
      <h1>Transitions</h1>
      <ul>
        <li><router-link to="/">/</router-link></li>
        <li><router-link to="/parent">/parent</router-link></li>
        <li><router-link to="/parent/foo">/parent/foo</router-link></li>
        <li><router-link to="/parent/bar">/parent/bar</router-link></li>
      </ul>
      <transition name="fade" mode="out-in">
        <router-view class="view"></router-view>
      </transition>
    </div>
  `
}).$mount('#app')
</script>
