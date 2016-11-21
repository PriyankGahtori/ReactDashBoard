
const initialState = {tableData:[],openNewMethodMonDialog:false}

export default function(state = initialState, action) {

  console.log('inside reducer method monitors');
  switch(action.type) {

    case 'FETCH_METHOD_MON_TABLEDATA':
      var newState = Object.assign({}, state);
      console.log("action.payload.data--77--",action.payload.data)
      newState.tableData=action.payload.data;
      console.log("newState---",newState.tableData)
      return newState;

    case 'ADD_METHOD_MONITOR' :
         console.log("in reducer of adding new method monitor---payloaf--",action.payload.data)
         var newState = Object.assign({},state);
         console.log("newState----",newState)
         newState.tableData.push(action.payload.data)
         console.log("newState.tableData--adding new method monitor",newState.tableData)
         return newState;

    case 'TOGGLE_STATE_ADD_METHOD_MON':
      var newState = Object.assign({}, state);
      console.log("newState.openNewMethodMonDialog--",newState.openNewMethodMonDialog)
      newState.openNewMethodMonDialog= !newState.openNewMethodMonDialog;
      console.log("newState.openNewMethodMonDialog---",newState.openNewMethodMonDialog)
      return newState;

  }
  return state;
}