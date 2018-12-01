import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './component/EssayForm';
import registerServiceWorker from './registerServiceWorker';
// function NumberList(props) {
//   const numbers = props.numbers;
//   const listItems = numbers.map((number) =>
//     <li key={number.toString()}>{number} {number.toString()}</li>
//   );
//   return (
//     <ul>{listItems}</ul>
//   );
// }

// const numbers = [1, 2, 3, 4, 5];
// ReactDOM.render(
//   <NumberList numbers={numbers} />,
//   document.getElementById('root')
// );

ReactDOM.render(<App />, document.getElementById('root'));

// function tick(){
// 	const element = (
// 		<div>
// 			<h1>hello world</h1>
// 			<h2>It is { new Date().toLocaleTimeString()}</h2>
// 		</div>
// 	)

// 	ReactDOM.render(element, document.getElementById('root'))
// }

// setInterval(tick, 1000)

// 可重用的组件
// const Clock = (props) => {
// 	return (
// 		<div>
// 			<h1>Hello react</h1>
// 			<h2>It is { props.date.toLocaleTimeString()	}</h2>
// 		</div>
// 	)
// }

// const tick2 = () => {
// 	ReactDOM.render(
// 		<Clock date = {new Date()} />,
// 		document.getElementById('root')
// 	)
// }

// setInterval(tick2, 1000)
registerServiceWorker();
