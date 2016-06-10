const initialState = {tableData:[], dialogNewApp:false};

export default function(state = initialState, action) {

	console.log("inside reducerappdetail", action.type);

  console.log("reducerdcdetail called----",initialState)
  switch(action.type) {

   case 'FETCH_APP_TABLE_DATA':
    console.log("inside  FETCH_APP_TABLE_DATA", action.payload.data);
    var newState = Object.assign({}, state);
   newState.tableData=action.payload.data._embedded.application;
    return newState;
  
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
