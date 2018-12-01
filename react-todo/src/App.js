import React, { Component } from 'react';

class Clock extends React.Component {
  constructor(props){
    super(props)
    this.state = { 
      date: new Date(),
      string: 'hello'
    }
  }

  componentDidMount(){
    this.timerID = setInterval(
      () => this.tick(), 30
    )
  }

  componentWillUnmount(){
    clearInterval(this.timerID)
  }

  tick(){
    // this.setState({
    //   date: new Date(),
    //   string: Math.random()
    // })

    this.setState((prevState, props) => ({
      date: new Date,
      prevString: prevState.string,
      string: Math.random()
    }))
  }

  render(){
    return (
      <div>
        <h1>上一次随机数是: {this.state.prevString}</h1>
        <h1>Hello world, is {this.state.string}</h1>
        <h2>It is {this.state.date.toLocaleTimeString() }</h2>
      </div>
    )
  }
}

export default Clock
 
