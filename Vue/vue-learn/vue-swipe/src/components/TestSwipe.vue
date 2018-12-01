<template>
  <div>
    <swipe class="my-swipe">
      <swipe-item class="slide1">Slide1</swipe-item>
      <swipe-item class="slide2">Slide2</swipe-item>
      <swipe-item class="slide3">Slide3</swipe-item>
    </swipe>

    <swipe class="my-swipe" ref="mySwipe2" :auto="0" :continuous="false" :show-indicators="false" @change="changeSwipe">
      <swipe-item class="slide1">Slide1</swipe-item>
      <swipe-item class="slide2">Slide2</swipe-item>
      <swipe-item class="slide3">Slide3</swipe-item>
    </swipe>
  </div>
</template>

<script>
  import { Swipe, SwipeItem } from '@/components/swipe';

  export default {
    components: {
      swipe: Swipe,
      swipeItem: SwipeItem
    },

    methods: {
      changeSwipe(newIndex, index){
        console.log(newIndex, index)
      }
    }


  }
</script>

<style type="text/css">
  .my-swipe{
    height: 200px;
    color: #fff;
    font-size: 30px;
    text-align: center;
  }
  .slide1 {
    background-color: #0089dc;
    color: #fff;
  }
  .slide2 {
    background-color: #ffd705;
    color: #000;
  }
  .slide3 {
    background-color: #ff2d4b;
    color: #fff;
  }
</style>
