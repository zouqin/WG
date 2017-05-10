import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import styles from '../css/style.css';
import '../css/test.scss';

console.log( document.getElementById('plan') );
ReactDOM.render(
	<AppContainer>
		<div>hello worldsssssssssssss</div>
	</AppContainer>
	,
	document.getElementById('plan') 
);

// const render = ( text ) => {
// 	ReactDOM.render(
// 		<AppContainer>
// 			<div>text</div>
// 		</AppContainer>
// 		,we
// 		document.getElementById('plan') 
// 	);
// }


// 模块热替换的 API
// if (module.hot) {
//   module.hot.accept('./components/App', () => {
//     render(App)
//   });
// }