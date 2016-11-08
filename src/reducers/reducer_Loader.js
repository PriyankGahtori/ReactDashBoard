const initialState = { show    :false,
                       message :{}

}
export default function(state = initialState, action) {

  switch(action.type) {
  case 'LOAD_PROGRESSBAR':
  	console.log("inside LOAD_PROGRESSBAR case--",action.payload);
  	var newState     = Object.assign({}, state);
    newState.show    = action.payload.show;
    newState.message = action.payload.message ;
    console.log("newState--",newState)
    return newState;
  }
  return state;
}