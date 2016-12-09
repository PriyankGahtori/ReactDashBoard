
const initialState = {tableData:[],
                      listOfGroupNames:[],
                      openNewBTPatternDialog:false,
                      selectedGroupName:"default",
                      selectedGrpId:null,
                      patternFormInitialData:null,
                      openBTPatternDialog:false,
                      BTPatternCheck:false
                     }

export default function(state = initialState, action) {

  console.log('inside reducer BT Pattern');
  switch(action.type) {

    case 'FETCH_BT_PATTERN_TABLEDATA':
      var newState = Object.assign({}, state);
      console.log("action.payload.data----",action.payload.data)
      newState.tableData=action.payload.data;
      console.log("newState---",newState.tableData)
      newState.tableData.map(function(value){
        console.log("in FETCH_BT_PATTERN_TABLEDATA--",value)
        value.enabled  = value.include == 'include' ?  true : false;
       })
      console.log("newState ------------> " ,newState)
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
         //console.log("newState----",newState)
        let resData = action.payload.data;
        console.log("chkinh include--",resData.include == 'include')
        resData.enabled  = resData.include == 'include' ?  true : false;
        console.log("resData--",resData)
        newState.tableData.push(resData)

         console.log("newState.tableData--adding new bt pattern-",newState.tableData)
         return newState;

     case 'PATTERN_INITIALIZE_FORM':
       var newState = Object.assign({},state);
         console.log(" in pattern iitialize form ----------->reducer",newState.tableData)
         console.log(" action.payload ------> ",action.payload)
         newState.patternFormInitialData = action.payload.data
         console.log(" pattern initial data -----> ", newState.patternFormInitialData)
         newState.openBTPatternDialog = action.payload.openBTPatternDialog

     return newState;

     case 'UPDATE_BT_PATTERN':
        console.log(" in reducer BT Pattern ------------>")
       var newState = Object.assign({},state);
         newState.tableData = newState.tableData.filter(function(value){
            console.log(" value id ------->",value.id)
            console.log(" action.payload.data.id  --->  ",action.payload.data.id)
          if(value.id == action.payload.data.id){
            value.btName        = action.payload.data.btName
            value.urlName       = action.payload.data.urlName
            value.matchType     = action.payload.data.matchType
            value.slowTransaction = action.payload.data.slowTransaction
            value.verySlowTransaction = action.payload.data.verySlowTransaction
            value.headerKeyValue = action.payload.data.headerKeyValue
            value.paramKeyValue  = action.payload.data.paramKeyValue
            value.reqMethod      = action.payload.data.reqMethod
            value.include        = action.payload.data.include
            value.enabled        = action.payload.data.include == 'include' ? true : false
           }
            console.log("action.payload.data.include----------> in reducer", action.payload.data.include)
          /* if(value.include == 'include'){
            value.include = true;
*/           return value;
       });
      console.log(" action.payload.data.include ---> ",action.payload.data.include)
      console.log(" new table data --------------> ",newState.tableData)
     return newState;
  }
  return state;
}