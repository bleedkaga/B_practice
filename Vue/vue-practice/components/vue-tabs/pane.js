Vue.component("vue-pane", {
    name: "pane",
    template: `
       <transition name="slide" mode="in-out">
            <div class="pane" v-show="show">
                <slot></slot>
            </div>
       </transition>
    `,
    props: {
        name: {
            type: String
        },
        label:{
            type: String,
            default: ''
        },
        closable: {
            type: Boolean
        }
    },
    data(){
        return {
            show: true
        }
    },
    methods: {
        updateNav(){
            this.$parent.updateNav();
        }
    },
    watch: {
        label(){
            this.updateNav();
        }
    },
    mounted(){
        this.updateNav();
    }
})