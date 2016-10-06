
const initialState = {tableData:[],openNewErrorDetectionDialog:false}

export default function(state = initialState, action) {

  console.log('inside reducer Error Detection');
  switch(action.type) {

    case 'FETCH_ERROR_DETECTION_TABLE':
      var newState = Object.assign({}, state);
      console.log("action.payload.data----",action.payload.data)
      newState.tableData=action.payload.data;
      console.log("newState---",newState.tableData)
      return newState;

    case 'TOGGLE_STATE_ADD_ERROR_DETECTION':
      var newState = Object.assign({}, state);
      console.log("newState.openNewErrorDetectionDialog--",newState.openNewErrorDetectionDialog)
      newState.openNewErrorDetectionDialog= !newState.openNewErrorDetectionDialog;
      console.log("newState.openNewErrorDetectionDialog---",newState.openNewErrorDetectionDialog)
      return newState;

    case 'ADD_NEW_ERROR_DETECTION' :
         console.log("in reducer of adding new bt pattern---payloaf--",action.payload.data)
         var newState = Object.assign({},state);
         console.log("newState----",newState)
         newState.tableData.push(action.payload.data)
         console.log("newState.tableData--adding new error detction pattern-",newState.tableData)
         return newState;

  
  }
  return state;
}