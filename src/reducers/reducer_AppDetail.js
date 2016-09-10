const initialState = {tableData:[],
                     openNewAppDialog:false,  //initializing varia
                     appDetailInitializeForm:null,
                     openAppDialogType:null
                   };

export default function(state = initialState, action) {

	/*console.log("inside reducerappdetail", action.type);*/

 /* console.log("reducerdcdetail called----",initialState)*/
  switch(action.type) {

   case 'FETCH_APP_TABLE_DATA':
    console.log("inside  FETCH_APP_TABLE_DATA", action.payload.data);
    var newState = Object.assign({}, state);
    var data=action.payload.data._embedded.application;
      data.map(function(val){
        console.log("in val---ApplicationDetail",val)
        var index=val._links.self.href.lastIndexOf("/");
        var id= val._links.self.href.slice(index+1,val._links.self.href.length)
//        val._links.self.href=id;
        val.id = id ;
        val.appName ={"href":val.appName};
        console.log("id----",id)
        
    })
    newState.tableData = data;
    return newState;
  
  case 'TOGGLE_STATE_NEW_APP':
    var newState = Object.assign({}, state);
    console.log("newState.openNewAppDialog--",newState.openNewAppDialog)
    newState.openNewAppDialog= !newState.openNewAppDialog;
    console.log("newState.openNewAppDialog---",newState.openNewAppDialog)
    return newState;
    
  case 'DEL_APPTABLE_ROW':
    var newState = Object.assign({}, state);
    console.log("line no 23---",action)
    console.log("line no 24--newState---",newState)
    console.log("line no 25--action.payload--",action.payload)
    newState.tableData = newState.tableData.filter(function(val){
       return action.payload.indexOf(val.id) == -1; //value sto be deleteed should return false
     })
    console.log("newState.tableData---",newState.tableData)
    return newState; 

  case 'ADD_ROW_APPTABLE':
    console.log("inside ADD_ROW_TABLE case-application reducer--action.payload.data",action.payload.data);
    var newState = Object.assign({}, state);
    action.payload.data.id=action.payload.data.appId;
    console.log("aftr adding link in application adding row reducer--",action.payload.data)
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
    var newState = Object.assign({}, state);
      newState.tableData = newState.tableData.filter(function(val){
      console.log("line no 61-------val._links.self.href")
      console.log("val-------",val)
      if(val.id == action.payload.data.appId){
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
