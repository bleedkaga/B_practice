<template>
  <div class="render">
    <h1>Render</h1>
    <ul v-if="items.length">
      <li v-for="item in items">{{ item.name }}</li>
    </ul>
    <p v-else>No items found.</p>
    <test :items="items"></test>
    <input-res @input="run"></input-res>
    <render-function :level="1"> <span>hello bleed</span></render-function>
    <render-repeat text="hello" :level="true">render repeat 20</render-repeat>
  </div>
</template>


<script type="text/javascript">
  import Vue from 'vue';

  const getChildrenTextContent = function( children ){
    return children.map( function( node ){
      return node.children ? getChildrenTextContent(node.children) : node.text
    }).join("")
  }


  Vue.component("render-function", {
    render: function(createElement){

      var headingId = getChildrenTextContent(this.$slots.default)
                        .toLowerCase()
                        .replace(/\W+/g, '-')
                        .replace(/(^\-|\-$)/g, '');

      return createElement('h' + this.level, [
        createElement('a', {
          attrs: {
            name: headingId,
            href: '#'+headingId
          },
          style: {
            fontSize: '20px',
            textDecoration: 'none'
          },
          class: {
            'modifier-a': true
          }
        }, this.$slots.default)
      ])
    },

    props: {
      level: {
        type: Number,
        required: true
      }
    }
  })

  Vue.component("render-repeat", {
    render: function(createElement){

      var headingId = getChildrenTextContent(this.$slots.default)
                        .toLowerCase()
                        .replace(/\W+/g, '-')
                        .replace(/(^\-|\-$)/g, '');

      return createElement("div",
        Array.apply(null, { length : 20}).map(function(){
          return createElement("p", {
            class: {
              isClass: this.level
            }
          }, "hello ")
        })
      )
    },

    props: {
      level: {
        type: Boolean,
        required: true
      }
    }
  })


  export default {
    name: 'render',
    data(){
      return {
        items: [
          {
            name: '123',
            value: '123'
          },
          {
            name: '456',
            value: '456'
          }
        ]
      }
    },
    methods: {
      run(val){
        console.log(val)
      }
    },
    components: {
      'test': {
        render: function( createElement ){
          if(this.items.length){
            return createElement("ul", this.items.map(function( item ){
              return createElement("li", {
                class: {
                  hello: true
                }
              }, item.name)
            }))
          } else {
            return createElement("p", 'No items NotFound!')
          }
        },
        props: {
          items: {
            type: Array,
            required: true
          }
        }
      },
      'input-res': {
        render: function(createElement){
          var self = this;
          return createElement("input", {
            domProps: {
              value: self.value
            },
            on: {
              input: function(event){
                self.value = event.target.value
                self.$emit('input', event.target.value)
              }
            }
          })
        }
      }
    }

  }


/*
    createElement 参数：
      createElement(
        //{String | Object | Function}
        //一个HTML 标签字符串， 组件选项对象，或者一个返回值类型为 String/Object 的函数， 必要参数
        'div',

        //{Object}
        //一个包含模板相关属性的数据对象
        //这样， 你可以在 template 中使用这些属性，可选参数

        {
          //见下一节
        },

        //{String | Array}
        //子节点（VNodes), 由  `createElement` 构建而成
        //或简单的使用字符串来生成 "文本节点"。 可选参数。
        [
          '先写一些文字',
          createElement("h1", "一则头条"),
          createElement(MyComponent, {
            props: {
              someProp: "foobar"
            }
          })
        ]

      )

*/

/*
*   深入 data object 参数
*
*   有一件事要注意： 正如在模板语法中， v-bind:class 和 v-bind:style， 会被特别对待一样，在VNodes 数据对象中，下列属性名是级别最高
*   的字段。 该对象也允许你绑定普通的HTML 特性， 就像 DOM 属性一样， 比如 innerHTML(这会取代 v-html 指定)
*
*   {
      // 和 `v-bind:class` 一样的API
      'class': {
        foo: true,
        bar: false
      },

      //和 `v-bind:style` 一样的API
      'style': {
        color: 'red',
        fontSize: '40px'
      },

      //正常的 HTML 特性
      attrs : {
        id: 'foo'
      },

      //组件props
      props: {
        myProp: 'bar'
      },

      //DOM 属性
      domProps: {
        innerHTML: 'baz'
      },

      //事件监听器基于 `on`
      //所以不再支持如 `v-on:keyup.enter` 修饰器
      //需要手动匹配keyCode.
      on: {
        click: this.nativeHandler
      },

      //仅对于组件，用于监听原生事件，而不是组件内部使用 `vm.$emit` 触发的事件
      nativeOn: {
        click: this.nativeClickHandler
      },

      //自定义指令，注意事项：不能对绑定的旧值设值
      //Ve 会为您持续追踪
      directives: [
        {
          name: 'my-custom-directive',
          value: '2',
          exporession: '1 + 1',
          arg: 'foo',
          modifiers: {
            bar: true
          }
        }
      ],

      //Scoped slots in the form of
      //{ name : props => VNode | Array<VNode> }
      scopedSlots: {
        default: props => createElement("span", props.text)
      },

      //如果组件是其他的子组件，需为 slot 指定名称
      slot: 'name-of-slot',

      //其他特殊顶层属性
      key: 'myKey',
      ref: 'myRef'

    }
*
*
*
*
*
*
*
*/

</script>
