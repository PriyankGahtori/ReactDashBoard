import ReduxPromise from 'redux-promise';
const redux = require('redux');
const reducers = require('../reducers');

module.exports = function(initialState) {
 // const store = redux.createStore(reducers, initialState)
  const createStoreWithMiddleware = redux.applyMiddleware(ReduxPromise)(redux.createStore);
  const store = createStoreWithMiddleware(reducers, initialState,redux.compose( window.devToolsExtension ? window.devToolsExtension() : f => f));

  if (module.hot) {
    // Enable Web
    //pack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers')
      store.replaceReducer(nextReducer)
    })
  }

  return store
}