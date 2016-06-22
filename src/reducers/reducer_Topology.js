const initialState = {tableData:[]};

export default function(state = initialState, action) {

  /*console.log("inside topogy reducer", action);*/
  switch(action.type) {
  case 'FETCH_TOPOlOGYTABLE_DATA':
  	console.log("inside FETCH_TOPOlOGYTABLE_DATA case");
  	var newState = Object.assign({}, state);
  	newState.tableData=action.payload.data;
    return newState;
  }
  return state;
}