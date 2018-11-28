<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    
    <div class="el">
      
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import Velocity from 'velocity-animate'

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted(){
    this.init()
  },
  methods: {
    init(){
      collie.ImageManager.add({
          "logo" : "http://jindo.dev.naver.com/collie/img/small/logo.png"
      });
       
      // Create a layer
      var layer = new collie.Layer({
          width : 320,
          height : 480
      });

      // Create an object that will be displayed on the screen
      var item = new collie.DisplayObject({
          x : "center",
          y : "center",
          velocityRotate : 180,
          backgroundImage : "logo" // The background image is re-sized to the pre-loaded logo.png size
      }).addTo(layer); // Add to a layer
       
      // Add a layer to renderer
      collie.Renderer.addLayer(layer);
       
      // Retrieve renderer from the container ID element
      collie.Renderer.load(document.getElementById("el"));
       
      // Start rendering
      collie.Renderer.start();
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
.el{
  width: 150px;
  height: 150px;
  background: red;
}
</style>
