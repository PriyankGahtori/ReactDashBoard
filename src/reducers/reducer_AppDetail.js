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
    
  case 'DEL_APPTABLE_ROW':
    var newState = Object.assign({}, state);
    console.log("line no 23---",action)
    console.log("line no 24--newState---",newState)
    console.log("line no 25--action.payload--",action.payload)
    newState.tableData = newState.tableData.filter(function(val){
      console.log("line no 33---",val._links.self.href)
       return action.payload.indexOf(val._links.self.href) == -1; //value sto be deleteed should return false
     })
    console.log("newState.tableData---",newState.tableData)
    return newState; 

  case 'ADD_APPTABLE_ROW':
    console.log("inside ADD_ROW_TABLE case---action.payload.data",action.payload);
    var newState = Object.assign({}, state);
    console.log("newState- line no 16-",newState)
    console.log("action.payload.data,",action.payload.data)
    newState.tableData.push(action.payload.data);
    console.log("newState---",newState)
    return newState;



  default :
    return state;

  }

}
