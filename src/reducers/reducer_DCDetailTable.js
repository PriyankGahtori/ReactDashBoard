const initialState = {tableData:[], dialogNewDC:false};

export default function(state = initialState, action) {

	console.log("inside init reducer for tree", action.type);

  console.log("reducerdcdetail called----")
  switch(action.type) {

  case 'FETCH_TABLE_DATA':
	  console.log("inside  FETCH_DCDETAIL_DATA", action);
    var newState = Object.assign({}, state);
    newState.tableData=action.payload.data._embedded.dcdetail;
    return newState
    //return [{"id":1,"name":"priyank"},{"id":2,"name":"Gahtori"}]

  case 'ADD_ROW_TABLE':
    console.log("inside ADD_ROW_TABLE case---action.payload.data",action.payload);
    console.log("add row table-state--",state);
    var newState = Object.assign({}, state);
    console.log("newState- line no 16-",newState)
    newState.tableData.push(JSON.parse(action.payload));
    console.log("newState---",newState)
    return newState;

  case 'DEL_DC_ROW_TABLE':
    console.log("inside DEL_ROW_TABLE---case")
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

  case 'TOGGLE_STATE_ADD_NEW_DC':
    var newState = Object.assign({}, state);
    console.log("newState.dialogNewDC--",newState.dialogNewDC)
    newState.dialogNewDC= !newState.dialogNewDC;
    console.log("newState.dialogNewDC---",newState.dialogNewDC)
    return newState;
    



  default :
    return state;

  }

}
