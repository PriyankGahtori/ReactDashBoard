
const initialState = {tableData:[],
                      openNewErrorDetectionDialog:false,
                      openErrorDetectionDialog: false,
                      errorDetectionFormInitialData: null,
                    }

export default function(state = initialState, action) {

  console.log('inside reducer Error Detection');
  switch(action.type) {

    case 'FETCH_ERROR_DETECTION_TABLE':
      var newState = Object.assign({}, state);
      console.log("action.payload.data----",action.payload.data)
      newState.tableData=action.payload.data;
      console.log("newState---",newState.tableData)
      return newState;

    case 'TOGGLE_STATE_ADD_ERROR_DETECTION':
      var newState = Object.assign({}, state);
      console.log("newState.openNewErrorDetectionDialog--",newState.openNewErrorDetectionDialog)
      newState.openNewErrorDetectionDialog= !newState.openNewErrorDetectionDialog;
      console.log("newState.openNewErrorDetectionDialog---",newState.openNewErrorDetectionDialog)
      return newState;

    case 'ADD_NEW_ERROR_DETECTION' :
         var newState = Object.assign({},state);
         newState.tableData.push(action.payload.data)
         return newState;

     case  'INITIALIZE_ERROR_DETECTION_FORM':
        var newState = Object.assign({},state);
        newState.errorDetectionFormInitialData = action.payload.data;
        newState.openErrorDetectionDialog  = action.payload.errorDetectionType;
        return newState;

     case 'EDIT_ERROR_DETECTION':
       var newState = Object.assign({} , state)
       newState.tableData = newState.tableData.filter(function(value){
          if(value.errDetectionId == action.payload.errDetectionId){
            value.ruleName = action.payload.ruleName;
            value.errorFrom = action.payload.errorFrom;
            value.errorTo = action.payload.errorTo;
            value.enabled = action.payload.enabled;
            value.ruleDesc = action.payload.ruleDesc;
          
          }
       return value
     });
   return newState;

   case 'DEL_ERROR_DETECTION_ROW': 
       var newState =  Object.assign({},state)
       newState.tableData  = newState.tableData.filter(function(value) {
        return action.payload.data.indexOf(Number(value.errDetectionId)) == -1;
      });
    return newState;

  }
  return state;
}