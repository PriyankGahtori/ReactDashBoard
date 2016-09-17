
const initialState = {tableData:[],listOfGroupNames:[],openNewBTPatternDialog:false,selectedGroupName:"default",selectedGrpId:null}

export default function(state = initialState, action) {

  console.log('inside reducer BT Pattern');
  switch(action.type) {

    case 'FETCH_BT_PATTERN_TABLEDATA':
      var newState = Object.assign({}, state);
      console.log("action.payload.data----",action.payload.data)
      newState.tableData=action.payload.data;
      console.log("newState---",newState.tableData)
      return newState;

    case 'TOGGLE_STATE_ADD_BT_PATTERN':
      var newState = Object.assign({}, state);
      console.log("newState.openNewBTPatternDialog--",newState.openNewBTPatternDialog)
      newState.openNewBTPatternDialog= !newState.openNewBTPatternDialog;
      console.log("newState.openNewBTPatternDialog---",newState.openNewBTPatternDialog)
      return newState;

    case 'ADD_NEW_BT_PATTERN' :
         console.log("in reducer of adding new bt pattern---payloaf--",action.payload.data)
         var newState = Object.assign({},state);
         console.log("newState----",newState)
         newState.tableData.push(action.payload.data)
         console.log("newState.tableData--adding new bt pattern-",newState.tableData)
         return newState;

  
  }
  return state;
}