Vue.component("tabs", {
	template: `<div class="tabs">
		<div class="tabs-bar">
			<div :class="tabCls(item)"
					v-for="(item, index) in navList"
					@click="handleChange(index)">
				{{item.label}}
			</div>
		</div>
		<div class="tabs-content">
			<slot></slot>
		</div>
	</div>`,
	props: {
		value: {
			type: [String, Number]
		}
	},
	data: function(){
		return {
			currentValue: this.value,
			navList: []
		}
	},
	methods: {
		tabCls: function( item ){
			return [
				'tabs-tab',
				{
					'tabs-tab-active': item.name === this.currentValue
				}
			]
		},
		getTabs: function(){
			return this.$children.filter( function  (item) {
				return item.$options.name === 'pane'
			})
		},
		updateNav: function(){
			this.navList = []
			const that = this;
			
			this.getTabs().forEach( (pane, index) => {
				that.navList.push({
					label: pane.label,
					name: pane.name || index
				})

				if(!pane.name) pane.name = index;
				if(index === 0){
					if(!that.currentValue){
						that.currentValue = pane.name || index
					}
				}
			})

			this.updateStatus()
		},

		updateStatus(){
			const tabs = this.getTabs();
			const that = this;

			tabs.forEach( tab => {
				return tab.show = tab.name === that.currentValue;
			})
		},

		handleChange: function(index){
			console.log(this.navList)
			const nav = this.navList[index];

			const name = nav.name;
			this.currentValue = name;
			this.$emit('input', name)
			this.$emit('on-click', name)
		}
	},
	watch: {
		value: val => {
			this.currentValue = val
		},
		currentValue(){
			this.updateStatus()
		}
	}
})