
const initialState = {tableData:[],
                      openTierDialog:false,
                      tierInitializeForm:null
}
export default function(state = initialState, action) {

  switch(action.type) {
  case 'FETCH_METHOD_BASED_CAPTURE_TABLEDATA':
  	console.log("inside FETCH_TIER_TABLE_DATA topology case");
  	var newState = Object.assign({}, state);
//    newState.tableData = data;
    console.log("newState---",newState)
    return newState;

  }


  return state;
}