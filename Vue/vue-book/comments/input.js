Vue.component('vInput', {
	props: {
		value: {
			type: [String, Number],
			default: ''
		}
	},
	render: function( h ){
		var _this = this;
		return h('div', [
			h('span', ['昵称：']),
			h('input', {
				attrs: {
					type: 'text',
					class: 'form-control'
				},
				domProps: {
					value: this.value
				},
				on: {
					input: function( event ){
						_this.$emit('input', event.target.value)
					}
				}
			})
		])
	}
})

Vue.component('vTextarea', {
	props: {
		value: {
			type: String,
			default: ''
		}
	},
	render: function( h ){
		var _this = this;
		return h('div', [
			h('span', '留言内容：'),
			h('textarea', {
				attrs: {
					placeholder: '请输入留言内容',
					class: 'form-control'
				},
				domProps: {
					value: this.value
				},
				ref: 'message',
				on: {
					input: event => {
						_this.$emit('input', event.target.value)
					}
				}
			})
		])
	},
	methods: {
		focus: function(){
			this.$refs.message.focus()
		}
	}
})