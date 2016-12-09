const initialState = {tableData:[],
                     openNewAppDialog:false,  //initializing varia
                     appDetailInitializeForm:null,
                     openAppDialogType:null,
                     ndConfPath:null
                   };

export default function(state = initialState, action) {

	/*console.log("inside reducerappdetail", action.type);*/

 /* console.log("reducerdcdetail called----",initialState)*/
  switch(action.type) {

   case 'FETCH_APP_TABLE_DATA':
    console.log("inside  FETCH_APP_TABLE_DATA", action.payload.data);
    var newState = Object.assign({}, state);
    var data=action.payload.data;
      data.map(function(val){
        console.log("in val---ApplicationDetail",val)
        val.appHrefName ={"href":val.appName};
    })
    newState.tableData = data;
    return newState;
  
  case 'TOGGLE_STATE_NEW_APP':
    var newState = Object.assign({}, state);
    console.log("newState.openNewAppDialog--",newState.openNewAppDialog)
    newState.openNewAppDialog= !newState.openNewAppDialog;
    console.log("newState.openNewAppDialog---",newState.openNewAppDialog)
    return newState;

  case 'GENERATE_ND_CONF_REDU':
    console.log("inside nd conf reducer--",action.payload);
    var newState        = Object.assign({}, state);
    newState.ndConfPath = action.payload.data[0];
    console.log("newState.ndConfPath--",newState.ndConfPath)
    return newState;
      
  case 'DEL_APPTABLE_ROW':
    var newState = Object.assign({}, state);
    newState.tableData = newState.tableData.filter(function(val){
       return action.payload.indexOf(val.id) == -1; //value to be deleteed should return false
     });
    console.log("newState.tableData---",newState.tableData)
    return newState; 

  case 'ADD_ROW_APPTABLE':
    var newState = Object.assign({}, state);
    var data =  action.payload.data ;
    data.id=action.payload.data.appId;
    data.appHrefName = {"href" : action.payload.data.appName}
    newState.tableData.push(data);
    console.log(" newState.tableData -------> ",newState.tableData)
    return newState;

  case 'UPDATE_APP_FORM' :
     console.log("update app form");
    var newState = Object.assign({}, state);
    console.log("in updating form----",action.payload.data)
    console.log("in updating form  flag---",action.payload.openAppDialogType)
    newState.appDetailInitializeForm = action.payload.data;
    newState.openAppDialogType=action.payload.openAppDialogType;
    console.log("newState.appDetailInitializeForm--",newState.appDetailInitializeForm)
    console.log("newState.openAppDialogType--",newState.openAppDialogType)
    return newState ;

    case 'UPDATE_ROW_APPTABLE':
    console.log("updating row--action.payload",action.payload)
    console.log("updating row--action.payload",action.payload.data)
    var newState = Object.assign({}, state);
      newState.tableData = newState.tableData.filter(function(val){
      console.log("line no 61-------val._links.self.href")
      console.log("val-------",val)
      if(val.id == action.payload.data.appId){
          console.log("condition matched")
          val.appDesc=action.payload.data.appDesc;
          val.appHrefName={"href": action.payload.data.appName};
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
