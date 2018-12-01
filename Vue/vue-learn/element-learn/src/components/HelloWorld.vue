<template>
  <div class="hello">
    <p>
      <p>Time select</p>
      <el-time-select
        v-model="time"
        :picker-options="{
          start: '08:30',
          step: '00:15',
          end: '18:30'
        }"
        placeholder="请选择时间"
      >

      </el-time-select>
      <el-button type="primary" @click="consoles"> 打印时间 </el-button>
      {{time}}
    </p>

    <div class="date-picker">
      <div><strong>Date Picker</strong></div>
      <el-date-picker v-model="start" :picker-options="pickerOptions1"/>
      <input type="hidden" :value="start|grep"  name="">
      {{start | grep}}
      <br><br>
      <el-date-picker v-model="end" />
      {{end | grep}}
      <br>
    </div>

  </div>
</template>

<script>
import mixins from '@/mixins/mixin'
export default {
  name: 'HelloWorld',
  data () {
    return {
      time: '',
      start: '',
      end:"",
      pickerOptions1: {
      },
    }
  },
  mixins: [mixins],
  methods: {
    consoles(){
      console.log(this.start)
    },
    onTap(){
      alert("tap")
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
