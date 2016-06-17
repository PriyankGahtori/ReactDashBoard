const initialState = {tableData:[], dialogNewApp:false,appDetailInitializeForm:null,openAppDialogType:null};

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

  case 'ADD_ROW_APPTABLE':
    console.log("inside ADD_ROW_TABLE case---action.payload.data",action.payload);
    var newState = Object.assign({}, state);
    console.log("newState- line no 16-",newState)
    console.log("action.payload.data,",action.payload.data)
    newState.tableData.push(action.payload.data);
    console.log("newState---",newState)
    return newState;

  case 'UPDATE_APP_FORM' :
     console.log("update app form");
    var newState = Object.assign({}, state);
    console.log("in updating form----",action.payload)
    console.log("in updating form  flag---",action.payload.openAppDialogType)
    newState.appDetailInitializeForm=action.payload.data;
    newState.openAppDialogType=action.payload.openAppDialogType;
    console.log("newState.appDetailInitializeForm--",newState.appDetailInitializeForm)
    console.log("newState.openAppDialogType--",newState.openAppDialogType)
    return newState

    case 'UPDATE_ROW_APPTABLE':
    console.log("updating row--action.payload",action.payload)
    console.log("updating row--action.payload",action.payload.data)
    console.log("updatingrow table---",action.payload.data._links.self.href)
    var newState = Object.assign({}, state);
      newState.tableData = newState.tableData.filter(function(val){
      console.log("line no 61-------val._links.self.href")
      if(val._links.self.href == action.payload.data._links.self.href){
          console.log("condition matched")
          val.appDesc=action.payload.data.appDesc;
          val.appName=action.payload.data.appName;
          val.userName=action.payload.data.userName;
      }


      return val;
     })
     console.log(" newState.tableData ", newState.tableData )
    return newState;

  default :
    return state;

  }

}
