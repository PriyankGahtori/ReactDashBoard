const initialState = {tableData:[]};

export default function(state = initialState, action) {

  switch(action.type) {
  case 'FETCH_TOPOlOGYTABLE_DATA':
  	console.log("inside FETCH_TOPOlOGYTABLE_DATA case action.payload.data-----",action.payload.data);
  	var newState = Object.assign({}, state);
  	newState.tableData=action.payload.data;
  	console.log("newState---",newState.tableData)
    return newState;
  }
  return state;
}