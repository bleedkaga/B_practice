import Vue from 'vue';
import Hello from '@/components/Hello'


let id = 0;

const createElm = function(){
  const elm = document.createElement('div');
  elm.id  = ++id
  document.body.appendChild(elm)
  return elm
}

const createTest = function(compo, propsData = {}, mounted = false){
  if(propsData === true || propsData === false){
    mounted = propsData;
    propsData = {}
  }

  const elm = createElm()
  const Ctor = Vue.extend(compo);
  return new Ctor({propsData}).$mount(mounted === false ? null : elm)
}

describe('Hello.vue', () => {
  let Constructor =  Vue.extend(Hello);
  let vm  = new Constructor().$mount();

  it('测试获取元素内容', () => {
    vm = createTest(Hello, { content: 'Hello world'}, true);
    expect(vm.$el.querySelector('.hello h1').textContent).to.equal('Welcome');
    expect(vm.$el.querySelector('.hello h2').textContent).to.equal('Hello world')
  })

  it('测试获取Vue对象中数据', () => {
    vm =createTest(Hello, { content: 'Hello world'}, true)
    expect(vm.msg).to.equal('Welcome')
    expect(vm.content).to.equal("Hello world")
  })

  it('测试获取DOM中是否存在某个Class', () => {
    vm = createTest(Hello, { content: "Hello World"}, true);
    expect(vm.$el.classList.contains('hello')).to.be.true;
    const title = vm.$el.querySelector('.hello h1');
    expect(title.classList.contains('hello-title')).to.be.true;
  })
})
