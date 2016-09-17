export default function(state = null, action) {

  switch(action.type) {
  case 'FETCH_INIT_DATA':
  	console.log("inside FETCH_INIT_DATA case");
  	var newState = Object.assign({}, state);
  	console.log("action.payload.data in reducerinitdata---",action.payload.data)
  	console.log("action.payload.data in reducerinitdata---",action.payload.data)
  	newState=action.payload.data;
    return newState;
  }

  return state;
}