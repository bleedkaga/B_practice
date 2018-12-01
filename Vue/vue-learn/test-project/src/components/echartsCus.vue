<template>
    <!-- <div class="main" id="main"></div> -->
    <div>
        <el-checkbox-group v-model="form">
            <el-checkbox v-for="(arr, index) in array" :key="index" :label="arr">{{arr.name}}</el-checkbox>
        </el-checkbox-group>
        <h1>{{form}}</h1>
        <button @click="sub">提交</button>
        <h1>提交后: {{computedArr}}</h1>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                 array:[{
                    id:1,
                    name:111
                },{
                    id:2,
                    name:222
                },{
                    id:3,
                    name:333
                }],
                form: [],
            }
        },
        computed: {
            computedArr(){
                let arr = []
                 this.form.forEach( item => {
                     this.array.filter( val => {
                         if(item == val.id){
                             arr.push({
                                name: val.name,
                                id: val.id
                            })
                         }
                    })
                })
                return arr
            }
        },
        mounted(){
            this.init();
        },
        methods: {
            sub(){
                this.computedArr = []
                this.form.forEach( item => {
                    this.array.forEach( val => {
                        if( item == val.id){
                            this.computedArr.push({
                                name: val.name,
                                id: val.id
                            })
                        }
                    })
                })
            },  
            init(){
                const echart = this.$echarts.init(document.getElementById('main'));
                echart.setOption({
                    title: {
                        text: 'ECharts 入门示例'
                    },
                    tooltip: {},
                    xAxis: {
                        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
                    },
                    yAxis: {},
                    series: [{
                        name: '销量',
                        type: 'bar',
                        data: [5, 20, 36, 10, 10, 20]
                    }]
                });
            }
        }
    }
</script>
<style>
.main{
    height: 500px;
}
</style>

