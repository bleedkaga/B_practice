Vue.component("vue-tabs", {
    template: `
        <div class="tabs">
            <div class="tabs-bar">
                <div :class="tabCls(item)" v-for="(item, index) in navList" @click="handleChange(index)">
                    {{item.label}}
                    <i class="closeable" v-if="item.closable" @click.stop="destoryItem(index)"></i>
                </div>
            </div>
            <div class="tabs-content"> 
                <slot></slot>
            </div>
        </div>
    `,
    props:{
        // 这里的value是为了可以使用v-model
        value: {
            type: [String, Number]
        }
    },
    data(){
        return {
            // 因为不能修改value, 所以复制一份自己维护
            currentValue: this.value,
            navList: [],
            closeable: false
        }
    },
    watch: {
        value(val){
            this.currentValue = val
        },
        currentValue(){
            // 在当前选中的tab发生变化时，更新pane的显示状态
            this.updateStatus()
        }
    },
    methods:{
        destoryItem( index ){
            console.log(index)
        },
        tabCls( item ){
            return [
                'tabs-tab',
                {
                    // 给当前选中的tab 加一个class
                    'tabs-tab-active': item.name === this.currentValue
                }
            ]
        },
        // 点击tab 标题时触发
        handleChange(index){
            var nav = this.navList[index];
            var name = nav.name;

            // 改变当前选中的tab 并触发下面的watch
            this.currentValue = name;

            // 更新value
            this.$emit("input", name)
            this.$emit("on-click", name)
        },
        getTabs(){
            // 通过遍历子组件, 得到所有的pane组件
            return this.$children.filter( item => {
                return item.$options.name === 'pane'
            })
        },
        updateNav(){
            this.navList = [];
            // 设置对this的引用. 在function回调里，this指向的并不是Vue实例
            var _this = this;
            this.getTabs().forEach( (pane, index) => {
                console.log(pane)
                _this.navList.push({
                    label: pane.label,
                    name: pane.name || index,
                    closable: pane.closable
                })

                if(!pane.name) pane.name = index;
                if(index === 0){
                    if(!this.currentValue){
                        _this.currentValue = pane.name || index;
                    }
                }
            })

            console.log(this.navList)

            this.updateStatus();
        },
        updateStatus(){
            var tabs = this.getTabs();
            var _this = this;

            tabs.forEach( tab => {
                return tab.show = tab.name === this.currentValue;
            })
        }
    }
})