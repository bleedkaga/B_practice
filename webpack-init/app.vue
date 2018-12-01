<template>
    <div>
        Hello {{name}}
    </div>
</template>

<script>
    export default {
        data(){
            return {
                name : 'Vue.js'
            }
        }
    }   
</script>

<style lang="css">
    div{
        color: #f50;
        font-size: 40px;
    }
</style>
