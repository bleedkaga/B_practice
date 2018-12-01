import React from 'react';

class ComponentsList extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			numbers: props.numbers
		}
		this.listItems = this.state.numbers.map( number => {
			<li>{number}</li>
		})
	}

	render(){
		return (
			<ul>{listItems}</ul>
		)
	}

}

export default ComponentsList