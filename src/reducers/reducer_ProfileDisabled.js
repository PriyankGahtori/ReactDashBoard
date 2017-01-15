
const initialState = {disabled: false}
export default function(state = initialState, action) {

  switch(action.type) {
  case 'DISABLE_PROFILE':
  	let newState = Object.assign({}, state);
        newState.disabled = action.payload;
    return newState;
  }  

  return state;
}