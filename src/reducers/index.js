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
import TreeData from './reducer_tree_data';
import DCDetailData from './reducer_DCDetailTable';
import {reducer as formReducer} from 'redux-form';
import ApplicationData from './reducer_AppDetail';
import TopologyData from './reducer_Topology';
import { routerReducer } from 'react-router-redux';
import TopoDetailData from './reducer_TopologyDetail';
import ProfileData from './reducer_ProfileDetail';
import TierData from './reducer_Tier';
import ServerData from './reducer_Server';
import InstanceData from './reducer_Instance';
import ServiceEntryPoints from './reducer_ServiceEntryPoints';
import BTGlobal from './reducer_BTGlobal';
import BackEndDetection from './reducer_BackendDetection';
import BTPattern from './reducer_BTPattern';
import KeyWords from './reducer_Keywords';
import MethodMonitor from './reducer_MethodMonitor';
import ErrorDetection from './reducer_ErrorDetection';
import HttpStatsData from './reducer_HttpStatsCond'

/*import {INITIALIZE_APP}  from "../actions/const.js";
/* Populated by react-webpack-redux:reducer */

module.exports = combineReducers({
	initialData       : InitialData,
	treeData          : TreeData,
	dcDetail          : DCDetailData,	
	form              : formReducer,
	applicationdata   : ApplicationData,
	topologyData      : TopologyData,
	routing           : routerReducer,
	topoDetailData    : TopoDetailData,
	profileDetailData : ProfileData,
	tierData          : TierData,
	serverData        : ServerData,
	instanceData      : InstanceData,
	ServiceEntryPoints:ServiceEntryPoints,
	BTGlobal          : BTGlobal,
	backEndDetection  : BackEndDetection,
	BTPattern         : BTPattern,
	Keywords          : KeyWords,
	methodMonitor     : MethodMonitor,
	errorDetection    : ErrorDetection,
	httpStatsData     : HttpStatsData
});

//const reducers = {addInitialAppData};

/*function addInitialAppData(state,action){
	switch (action.type) {
    case INITIALIZE_APP:

    default:
      return state
  }s
}*/
