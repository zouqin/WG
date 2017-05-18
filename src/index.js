import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './components/App';
// import styles from '../css/style.css';
// import '../css/test.scss';

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