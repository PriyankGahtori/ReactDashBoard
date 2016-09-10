
const initialState = {tableData:[],
                      openTierDialog:false,
                      tierInitializeForm:null
}
export default function(state = initialState, action) {

  switch(action.type) {
  case 'FETCH_TIER_TABLE_DATA':
  	console.log("inside FETCH_TIER_TABLE_DATA topology case");
  	var newState = Object.assign({}, state);
    console.log("in tree reducer---",action.payload.data)
    
    var data=action.payload.data;
      data.map(function(val){
        val.profLink = {"href":val.profileName}
    });
    newState.tableData = data;
    return newState;

  case 'TOGGLE_STATE_TIER_DIALOG':
    console.log("toggling state")
    var newState = Object.assign({}, state);
    newState.openTierDialog = !newState.openTierDialog;
    console.log("newState.openTierDialog--",newState.openTierDialog)
    return newState;
  
    case 'UPDATE_TIER_FORM':
      console.log("update form topoooooooooooooo");
      var newState = Object.assign({}, state);
      var initial = null;
      console.log("in updating form----",action.payload)
     if(action.payload != null){
      initial = {"tierId":action.payload.tierId,"profileId":action.payload.profileId};
  }
      newState.tierInitializeForm = initial;
      console.log("reducer topo---", newState.tierInitializeForm)
      //newState.openTopoDialogType=action.payload.openTopoDialogType;
      newState.dcId = action.payload.dcId;
      return newState;

      case 'ATTACH_PROFTO_TIER':
    var newState = Object.assign({},state);
    console.log("payload data-ATTACH_PROFTO_TIER-----",action.payload.data)

    newState.tableData.map(function(value){
      console.log("iterating topotable--",value)
      if(value.tierId == action.payload.data.tierId)
      {
        value.profileName = action.payload.data.profileName ;
        value.profileId = action.payload.data.profileId;
        value.profLink = {"href":action.payload.data.profileName };
      }
    })
    console.log("aftr updating--",newState.tableData)
    return newState;
  }


  return state;
}