import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './stores';
import App from './containers/App';
import Layout from './components/Layout'
import Routes from './components/routes'

const store = configureStore();
/*
<Provider store={store}>
        <App />
      </Provider>
*/
render(
  
	<Routes />,
  document.getElementById('app')
);
