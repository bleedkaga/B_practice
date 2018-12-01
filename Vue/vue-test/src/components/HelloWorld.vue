<template>
  <div>
    <ul>
      <li v-for="item in 10" :key="item">
        {{item}}
        <button @click="number = item">click me</button>
      </li>
    </ul>
    <test :text="number"></test>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        number: ''
      }
    },
    components : {
      test: {
        props: ['text'],
        template: `<input v-model="txt">`,
        computed:{
          txt:{
            get(){
              return this.text
            },
            set(){
              
            }
          }
        }
      }
    }
  }
</script>
