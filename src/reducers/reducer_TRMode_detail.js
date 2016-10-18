const initialState = {profileId:null,dcId:null,nodeType:null,topoId:null,tierId:null,serverId:null,instanceId:null};
export default function(state = initialState, action) {

  switch(action.type) {
  case 'SET_TRMode_Detail':
  	console.log("inside FETCH_INIT_DATA case");
  	var newState = Object.assign({}, state);  	
  	newState=action.payload;
  return newState;  

  }

  return state;
}