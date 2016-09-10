/* This file is used to fetch the instance data and saves into the state
*/
const initialState = {tableData:[],
                      openInstanceDialog:false,
                      instanceInitializeForm:null

}
export default function(state = initialState, action) {

  switch(action.type) {
    case 'FETCH_INSTANCE_TABLE_DATA':
    console.log("inside FETCH_TIER_TABLE_DATA topology case---",action.payload);
    var newState = Object.assign({}, state);
    var data=action.payload.data;
    data.map(function(val){
        val.profLink = {"href":val.profileName}
    });
    console.log("action.payload.data._embedded.dcdetail---",data)
    newState.tableData = data;
    return newState;

    case 'TOGGLE_STATE_INSTANCE_DIALOG':
    console.log("toggling state TOGGLE_STATE_INSTANCE_DIALOG---")
    var newState = Object.assign({}, state);
    newState.openInstanceDialog = !newState.openInstanceDialog;
    console.log("newState.openInstanceDialog--",newState.openInstanceDialog)
    return newState;

    case 'UPDATE_INSTANCE_FORM':
      console.log("update form instance");
      var newState = Object.assign({}, state);
      var initial = null;
      console.log("in updating form instance --payload--",action.payload)
     if(action.payload != null){
      initial = {"instanceId":action.payload.instanceId,"profileId":action.payload.profileId};
  }
      newState.instanceInitializeForm = initial;
      console.log("reducer topo---", newState.instanceInitializeForm)
      return newState;
  

  case 'ATTACH_PROFTO_INSTANCE':
  var newState = Object.assign({},state);
    console.log("payload data-ATTACH_PROFTO_INSTANCE-----",action.payload.data)

    newState.tableData.map(function(value){
      console.log("iterating topotable--",value)
      if(value.instanceId == action.payload.data.instanceId)
      {
        value.profileName = action.payload.data.profileName ;
        value.profileId = action.payload.data.profileId;
        value.profLink = {"href":action.payload.data.profileName };
      }
    })
    console.log("aftr updating-instance-",newState.tableData)
    return newState;
  }
  return state;
}