<template>
	<div id="app"><!-- Hello {{name}}  -->
		<!-- <v-title ></v-title> -->
		<v-button color="red" @click="handleClick">
			打击盗版
		</v-button>
		<img src="https://cn.vuejs.org/images/logo.png">
		<router-view></router-view>
	</div>
</template>

<script>
	import vTitle from './src/packages/index.vue'
	import vButton from './button.vue'
	export default {
		data(){
			return {
				name: 'Vue.js'
			}
		},
		components: {
			vButton,
			vTitle
		},
		methods: {
			handleClick(e){
				console.log(e)
			}
		}
	}
</script>

<style type="text/css" scoped>
	div{
		color:#188fff;
		font-size: 42px;
	}
</style>