 new Vue({
 	el: '#app',
 	data: {
 		all: false,
 		list: [
 			{
 				id: 1,
 				name: 'iPhone 8',
 				checked: false,
 				price: 6188,
 				count: 1
 			},
 			{
 				id: 2,
 				name: 'iPad Pro',
 				checked: false,
 				price: 5888,
 				count: 1
 			},
 			{
 				id: 3,
 				name: 'MacBook Pro',
 				checked: false,
 				price: 21488,
 				count: 1
 			},
 			{
 				id: 4,
 				name: 'iPhone X',
 				checked: false,
 				price: 6188,
 				count: 1
 			}
 		]
 	},
 	computed:{

 		totalPrice: function(){
 			var total = 0;

 			for(var i = 0; i < this.list.length; i++){
 				var item = this.list[i]
 				if(item.checked){
 					total+=item.price * item.count
 				}	
 			}

 			return total.toString().replace(/\B(?=(\d{3})+$)/g, ',')
 		},

 	},
 	methods: {
 		priceChecked: function( index ){
 			var total = 0;
 			this.list[index].checked = !this.list[index].checked;
 			
 			for(var i = 0; i < this.list.length; i++){
 				var item = this.list[i]
 				if(item.checked){
 					total+=item.price * item.count
 				}	
 			}

 			return total.toString().replace(/\B(?=(\d{3})+$)/g, ',')
 		},
 		handleReduce: function( index ){
 			if(this.list[index].count === 1) return ;
 			this.list[index].count--
 		},
 		selectedAll: function(){
 			this.all = !this.all
 			this.list.forEach( item => {
 				item.checked = !item.checked
 			})
 		},
 		handleAdd: function( index ){
 			this.list[index].count++
 		},
 		handleRemove: function( index ){
 			this.list.splice(index, 1)
 		}
 	}
 })