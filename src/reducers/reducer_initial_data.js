const initialState = {homeData:null,trData:{trno:null,status:null,switch:false},ns_wdir:null}
export default function(state = initialState, action) {

  switch(action.type) {
  case 'FETCH_INIT_DATA':
  	console.log("inside FETCH_INIT_DATA case");
  	var newState = Object.assign({}, state);
  	console.log("action.payload.data in reducerinitdata---",action.payload.data)
  	console.log("action.payload.data in reducerinitdata---",action.payload.data)
    let trStatus = action.payload.data.trData.status;
  	newState=action.payload.data;
    newState.trData.switch = trStatus == null ? false : trStatus;
  return newState;
  
  case 'TOGGLE_TR_STATE':
    var newState = Object.assign({}, state);
    newState.trData.switch = !newState.trData.switch;
  return newState;

  }

  return state;
}