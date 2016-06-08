const initialState = {tableData:[], dialogNewApp:false};

export default function(state = initialState, action) {

	console.log("inside reducerappdetail", action.type);

  console.log("reducerdcdetail called----",initialState)
  switch(action.type) {
  
  case 'TOGGLE_STATE_NEW_APP':
    var newState = Object.assign({}, state);
    console.log("newState.dialogNewApp--",newState.dialogNewApp)
    newState.dialogNewApp= !newState.dialogNewApp;
    console.log("newState.dialogNewApp---",newState.dialogNewApp)
    return newState;
    



  default :
    return state;

  }

}
