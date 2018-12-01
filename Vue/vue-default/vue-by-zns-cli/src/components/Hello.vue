<template>
  <div class="hello">
    <h1>{{ msg | upper }}</h1>
    <h1>{{ msg2 | lower }}</h1>
    <h1>{{ time | format }}</h1>
    <h2>Essential Links</h2>
    <h1></h1>
    <button @click="nextTicks">Update Test nextTick</button>
    <p>{{nextTick}}</p>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      msg2: 'WELCOME TO YOUR VUE.JS APP',
      time : 1501678642380,
      nextTick: '没有更新'
    }
  },
  methods: {
    nextTicks: function(){
      console.log(this.nextTick)
      this.nextTick = '更新完成';

      this.$nextTick( function (){
        console.log(this.nextTick)
      })
    }
  },
  filters: {
    upper: function( val ){
      return val.toUpperCase()
    },
    lower: function( val ){
      return val.toLowerCase()
    },
    format: function( time ){
      const dateTime = new Date( time );
      return dateTime.getFullYear()+'-'+((dateTime.getMonth() + 1) > 10 ? dateTime.getMonth()  + 1: '0'+(dateTime.getMonth() + 1))
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
