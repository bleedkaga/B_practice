import Vue from 'vue'
import Slider from '@/components/Slider';


describe('Slider.vue', () => {
  it('slider test component', () => {
    const Constructor = Vue.extend(Slider)
    const vm = new Constructor().$mount();
    expect(vm.$el.querySelector('.hello h1').textContent)
      .to.equal('hello world')
  })
})
