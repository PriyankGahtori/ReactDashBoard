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
import { syncHistoryWithStore} from 'react-router-redux';
import { Router, Route, browserHistory } from 'react-router'


const store = configureStore();

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store)
/*history.listen(location => analyticsService.track(location.pathname))*/

/*
<Provider store={store}>
        <App />
      </Provider>
*/
render(
   <Provider store={store}>
	
	<Routes  history={history}/>
   </Provider>,
  document.getElementById('app')
);
