<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <ul>
      <li><router-link to='/router'>router</router-link></li>
    </ul>
    <hr>
    <render></render>
    <h1>Vue Awesome project categories!</h1>
    <anchored-heading :level="1"><span>Hello world! span</span></anchored-heading>
    <button type="button" name="button" @click="toast">Toasted</button>
    <input type="text" v-model="level">
  </div>
</template>

<script>
import Vue from 'vue';
import Toasted from 'vue-toasted'
import mixins from '../mixin';
import render from '@/components/render';

Vue.use(Toasted)
Vue.config.errorHandler = function(err){
  console.log('err',err)
}
console.log()

Vue.config.optionMergeStrategies.width = function(){
  alert('a')
}

export default {
  name: 'hello',
  mixins: [mixins],
  components: {
    render
  },
  data () {
    return {
      level: 1,
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    toast(){
      // this.$toasted.show("hello bleed!", {
      //   duration: 4000,
      //   position: 'bottom-center',
      //   fitToScreen: true
      // })
      this.everthing()


      console.log(this.$toasted.global)
      this.$toasted.success("hello bleed!", {
        duration: 4000,
        position: 'bottom-center',
        fitToScreen: true,
        icon : {
            name : 'check',
            after : false
        }
      })
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
