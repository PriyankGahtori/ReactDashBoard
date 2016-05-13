const redux = require('redux');
//const reducers = require('../reducers');
import InitialData from '../reducers/reducer_initial_data';
import ReduxPromise from 'redux-promise';

module.exports = function(initialState) {
	const createStoreWithMiddleware = redux.applyMiddleware(ReduxPromise)(redux.createStore);

    //const store = redux.createStore(InitialData, initialState)
    const store = createStoreWithMiddleware(InitialData, initialState);
    //createStoreWithMiddleware(reducers)

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers')
      store.replaceReducer(nextReducer)
    })
  }

  return store
}



