function isValueNumber(value){
    return (/(^-?[0-9)+\.{1}\d+$)|(^-?[1-9][0-9]*$)|(^-?0{1}$)/).test(value+'')
}
Vue.component("input-number", {
    template: `
        <div class="input-number">
            <input type="text" @keydown.up="upvalue" @keydown.down="downvalue" @focus="focus=true" @blur="focus=false" :value="currentValue" @change="handleChange">
            <button @click="handleDown" :disabled="currentValue <= min">-</button>
            <button @click="handleUp" :disabled="currentValue >= max">+</button>
        </div>
    `,
    props: {
        max: {
            type: Number,
            default: Infinity
        },
        min: {
            type: Number,
            default: Infinity
        },
        value: {
            type: Number,
            default: 0
        },
        step: {
            type: Number,
            defalut: 1
        }
    },
    data(){
        return {
            currentValue: this.value,
            focus: false
        }
    },
    watch: {
        currentValue: function(val) {
            this.$emit("input", val)
            this.$emit("on-change", val)
        },
        value: function(val){
            this.updateValue( val )
        }
    },
    methods: {
        upvalue(){
            if(this.focus){
                this.handleUp();
            }
        },
        downvalue(){
            if(this.focus){
                this.handleDown();
            }
        },
        handleDown(){
            if(this.currentValue <= this.min) return;
            this.currentValue -= this.step || 1
        },
        handleUp(){
            if(this.currentValue >= this.max) return;
            this.currentValue += this.step || 1;
        },
        handleChange( event ){
            var val = event.target.value.trim();
            var max = this.max;
            var min = this.min;

            if(isValueNumber(val)){
                val = Number(val);
                this.currentValue = val;

                if(val > max){
                    this.currentValue = max;
                } else if(val < min){
                    this.currentValue = min;
                }
            } else{
                event.target.value = this.currentValue;
            }
        },
        updateValue: val => {
            if(val > this.max) val = this.max;
            if(val < this.min) val = this.min;
            this.currentValue = val;
        }
    },
    mounted(){
        this.updateValue(this.value)
    }
})