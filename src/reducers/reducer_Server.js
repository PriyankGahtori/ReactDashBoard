
const initialState = {tableData:[],
                      serverInitializeForm :null,
                      openServerDialog:false
                    }
export default function(state = initialState, action) {

  switch(action.type) {
  case 'FETCH_SERVER_TABLE_DATA':
  	console.log("inside FETCH_TIER_TABLE_DATA topology case");
  	var newState = Object.assign({}, state);
    var data=action.payload.data;
    data.map(function(val){
        val.profLink = {"href":val.profileName}
    });
    console.log("action.payload.data._embedded.dcdetail---",data)
    newState.tableData = data;
    return newState;

    case 'UPDATE_SERVER_FORM':
    console.log("update form server");
      var newState = Object.assign({}, state);
      var initial = null;
      console.log("in updating form server --payload--",action.payload)
     if(action.payload != null){
      initial = {"serverId":action.payload.serverId,"profileId":action.payload.profileId};
  }
      newState.serverInitializeForm = initial;
      console.log("reducer topo---", newState.serverInitializeForm)
      //newState.openTopoDialogType=action.payload.openTopoDialogType;
      
      return newState;

    case 'TOGGLE_STATE_SERVER_DIALOG':
    console.log("toggling state")
    var newState = Object.assign({}, state);
    newState.openServerDialog = !newState.openServerDialog;
    console.log("newState.openServerDialog--",newState.openServerDialog)
    return newState;

    case 'ATTACH_PROFTO_SERVER':
    var newState = Object.assign({},state);
    console.log("payload data-ATTACH_PROFTO_SRVER-----",action.payload.data)

    newState.tableData.map(function(value){
      console.log("iterating topotable--",value)
      if(value.serverId == action.payload.data.serverId)
      {
        value.profileName = action.payload.data.profileName ;
        value.profileId = action.payload.data.profileId;
        value.profLink = {"href":action.payload.data.profileName };
      }
    })
    console.log("aftr updating-server-",newState.tableData)
    return newState;


  }

  return state;
}