
const initialState = {btGlobalInitialize:{"uriType":"complete",
                                          "segmentType":"first",
                                          "segmentValue":"2",
                                          "dynamicReqType":false,
                                          "dynamicReqValue":"NA",
                                          "requestParam":'',
                                          "httpMethod":false,
                                          "requestHeader":"NA"
                                        },
                                    tableData:[] }
export default function(state = initialState, action) {

  switch(action.type) {
  case 'INITIALIZE_FIELDS':
  	console.log("INITIALIZE_FIELDS");
  	var newState = Object.assign({}, state);
   
    console.log("newState.btGlobalInitialize---",newState.btGlobalInitialize)
    return newState;
  
  case 'ADD_BT_DATA':
    console.log("action.payload---",action.payload.data)
    var newState = Object.assign({}, state);
   // newState.tableData.push(action.payload.data)
    console.log("newState.tableData---",newState.tableData)
    return newState;
  }
  return state;
}