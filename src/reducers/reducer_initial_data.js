export default function(state = null, action) {

  switch(action.type) {
  case 'FETCH_INIT_DATA':
  	console.log("inside FETCH_INIT_DATA case");
  	var newState = Object.assign({}, state);
  	newState=action.payload.data;
    return newState;
  }

  return state;
}