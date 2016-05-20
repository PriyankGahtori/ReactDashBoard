import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import configureStore from './stores/index';
import App from './containers/App';
import Layout from './components/Layout'
import Routes from './components/routes'
import Home from './containers/Home'
import reducers from './reducers';


const store = configureStore();
/*
<Provider store={store}>
        <App />
      </Provider>
*/
render(
   <Provider store={store}>
	
	<Routes/>
   </Provider>,
  document.getElementById('app')
);
