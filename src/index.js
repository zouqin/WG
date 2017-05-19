import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './components/App';
// import './components/App.css';
import '../css/test.scss';
// import Moment from 'moment';

var moment = require('moment');

console.log( moment().format() );

const render = ( Component ) => {
	ReactDOM.render(
		<AppContainer>
			<Component/>
		</AppContainer>,
		document.getElementById('plan') 
	);
}

render( App );

// 模块热替换的 API
if (module.hot) {
  module.hot.accept(App, () => {
    render(App);
  });
}