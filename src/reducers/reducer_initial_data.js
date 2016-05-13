export default function(state = null, action) {

	console.log("inside init reducer", action);
  switch(action.type) {
  case 'FETCH_INIT_DATA':
  	console.log("inside FETCH_INIT_DATA case");
  	var newState = Object.assign({}, state);
  	newState.todo=action.payload.data;
    return newState;
  }

  return state;
}