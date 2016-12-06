
const initialState = {tableData:[],
                      listOfGroupNames:[],
                      openNewBTPatternDialog:false,
                      selectedGroupName:"default",
                      selectedGrpId:null,
                      patternFormInitialData:null,
                     openBTPatternDialog:false}

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

     case 'PATTERN_INITIALIZE_FORM':
       var newState = Object.assign({},state);
         console.log(" in pattern iitialize form ----------->reducer",newState.tableData)
         console.log(" action.payload ------> ",action.payload)
         newState.patternFormInitialData = action.payload.data
         newState.openBTPatternDialog = action.payload.openBTPatternDialog
         
         {/* var splitParam =  action.payload.data.paramKeyValue.split("=")
         var splitHeader = action.payload.data.headerKeyValue.split("=")
         console.log(" array  --[1]--->in reducer ----->",splitParam[1])
         console.log(" initial data ---------> ", newState.patternFormInitialData)
        action.payload.data.reqParamKey  = splitParam[0];
         action.payload.data.reqParamValue = splitParam[1]
         action.payload.data.reqHeaderKey = splitHeader[0]
         action.payload.data.reqHeaderValue = splitHeader[1]
          console.log(" req param key ---->", action.payload.data.reqParamKey)*/
}
       

     return newState;


  
  }
  return state;
}