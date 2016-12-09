
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
      newState.tableData=action.payload.data;
      newState.tableData.map(function(value){
        value.enabled  = value.include == 'include' ?  true : false;
       })
      return newState;

    case 'TOGGLE_STATE_ADD_BT_PATTERN':
      var newState = Object.assign({}, state);
      newState.openNewBTPatternDialog= !newState.openNewBTPatternDialog;
      return newState;

    case 'ADD_NEW_BT_PATTERN' :
        var newState = Object.assign({},state);
        let resData = action.payload.data;
        resData.enabled  = resData.include == 'include' ?  true : false;
        newState.tableData.push(resData)
        return newState;

     case 'PATTERN_INITIALIZE_FORM':
       var newState = Object.assign({},state);
       newState.patternFormInitialData = action.payload.data
       newState.openBTPatternDialog = action.payload.openBTPatternDialog
       return newState;

     case 'UPDATE_BT_PATTERN':
       var newState = Object.assign({},state);
       newState.tableData = newState.tableData.filter(function(value){
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
            value.dynamicPartReq =  action.payload.data.dynamicPartReq ;
           }
           return value;
       });
     return newState;
  }
  return state;
}