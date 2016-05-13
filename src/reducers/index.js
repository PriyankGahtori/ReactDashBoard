/* Combine all available reducers to a single root reducer.
 *
 * CAUTION: When using the generators, this file is modified in some places.
 *          This is done via AST traversal - Some of your formatting may be lost
 *          in the process - no functionality should be broken though.
 *          This modifications only run once when the generator is invoked - if
 *          you edit them, they are not updated again.
 */
import { combineReducers } from 'redux';
import InitialData from './reducer_initial_data';

/*import {INITIALIZE_APP}  from "../actions/const.js";
/* Populated by react-webpack-redux:reducer */

module.exports = combineReducers({
	initialData: InitialData
});

//const reducers = {addInitialAppData};

/*function addInitialAppData(state,action){
	switch (action.type) {
    case INITIALIZE_APP:
      
    default:
      return state
  }
}*/