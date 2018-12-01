<template>
  <div class="router2">
    <canvas id="canvas"></canvas>
    <div class="div">
      <div class="item" v-for="w in wlength" :style="{height: w.height+'px'}"></div>
    </div>

  </div>
</template>

<style type="text/css">
  *{
    margin:0;
    padding:0;
  }
  .div{
    overflow: hidden;
  }
  #canvas{
    border: 1px solid red;
    width: 300px;
    height: 500px;
  }
  .item{
    width: 5px;
    height: 200px;
    background: green;
    float: left;
    transition: height 3s linear;
    transform: rotateZ(180deg);
  }
  .item:nth-child(2n){
    background: #188fff
  }
</style>

<script type="text/javascript">
  export default {
    data(){
      return {
        wlength: [],
        random:0
      }
    },
    mounted(){
      var len =  parseInt( 1919/ 5);
      for(var i = 0, j = len; i < j; i++){
        this.wlength.push({
          index: i,
          height: 200
        })
      }

      setInterval( ()=>{
        this.wlength.map(function(item){
          if(item.index < 100){
            item.height = Math.random() * 100 + 100;
          } else if(item.index < 300) {
            item.height = Math.random() * 300 + 100;
          } else if(item.index < 500) {
            item.height = Math.random() * 500 + 100;
          } else if(item.index < 700) {
            item.height = Math.random() * 700 + 100;
          } else if(item.index < 900) {
            item.height = Math.random() * 900 + 100;
          }

        })
      }, 300)

    }
  }
</script>
