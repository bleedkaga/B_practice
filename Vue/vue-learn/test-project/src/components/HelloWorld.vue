<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
      <br>
      <li><a href="http://vuejs-templates.github.io/webpack/" target="_blank">Docs for This Template</a></li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
      <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
      <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
    </ul>

    <h1> 前端早读课 <a href="https://mp.weixin.qq.com/s?__biz=MjM5MTA1MjAxMQ==&mid=2651227257&idx=1&sn=be85c150f86d0e4918a5c9e5c246a192&chksm=bd495dfd8a3ed4ebeed3c63191dc584d1e11f29c6acaab86dbaa341ad38d0fe03ff1dab06bc2&scene=38#wechat_redirect">【第1103期】vue 自定义指令的魅力</a></h1>
    <p v-tack:left="70"> 现在我会在距离左侧70px的地方 </p>
    <p v-tack2="{top:'40',left:'100'}"> 我固定在离顶部40px、左侧100px的地方 </p>

    <div class="box" v-scroll="handleScroll">
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A atque amet harum aut ab veritatis earum porro praesentium ut corporis. Quasi provident dolorem officia iure fugiat, eius mollitia sequi quisquam.</p>
    </div>
    <h3>状态驱动</h3>
    <button :class="validate ? 'enable' : 'disabled'">提交</button>
    <hr>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      validate: true
    }
  },
  created(){
    console.log(this.$bl)
  },
  directives: {
    'tack': {
      bind(el, binding, vnode){
        el.style.position = 'fixed';
        el.style.top = binding.value + 'px'

        // 假设我们想要区分偏离的70px是在顶部还是左侧，可以通过传递一个参数来实现：
        const s = (binding.arg == 'left' ? 'left' : top)
        el.style[s] = binding.value + 'px'
      }
    },
    'tack2': {
      bind(el, binding, vnode){
        el.style.position = 'fixed';
        el.style.top = binding.value.top + 'px';
        el.style.left = binding.value.left + 'px';
      }
    },

    //更复杂的指令
    'scroll': {
      inserted: function(el, binding){
        let f = evt => {
          if(binding.value(evt, el)){
            window.removeEventListener('scroll', f)
          }
        }

        window.addEventListener('scroll', f)
      }
    }
  },
  methods: {
    handleScroll: function(evt, el){
      var els = this.$el.querySelector(".box")
      console.log(els)
      if(window.scrollY>50){
         console.log(window.scrollY)
      }
      return window.scrollY>100;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
