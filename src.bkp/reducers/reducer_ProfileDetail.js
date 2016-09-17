const initialState = { tableData:[],
                       openNewProfileDialog:false,
                       profileDetailInitializeForm:null
                     };

export default function(state = initialState, action) {

  switch(action.type) {
  case 'FETCH_PROFILEDETAIL_TABLEDATA':
    console.log("inside FETCH_INIT_DATA case");
    var newState = Object.assign({}, state);
    console.log("in reducer profile --------------->",newState)
    var data=action.payload.data._embedded.profiles;
    console.log(" data of profile------------------>",data)
    data.map(function(val){
        console.log("in val---",val)
        var index=val._links.self.href.lastIndexOf("/");
        console.log(" lastIndexOf --------------> ",index)
        var id= val._links.self.href.slice(index+1,val._links.self.href.length)
        val.id=id;
  //converting profileName as a string to object so as to make profileName field to act as hyperlink
        var profileName = {"href":val.profileName}
        val.profileName = profileName;
        console.log("id--of profile------------------>",id)

    })
    newState.tableData = data;
    console.log(" new State---------of profile-------->",newState.tableData)
    return newState;

    case 'UPDATE_PROFILE':
   
    var newState = Object.assign({}, state);
    console.log("in updating form--of profile-------------",newState.tableData)
    newState.profileInitializeForm=action.payload.data;
    console.log(" in reducer profile data---   profileInitializeForm ----------->------->",action.payload.data)
    newState.openProfileDialogType=action.payload.openProfileDialogType;
    console.log(" in reducer profile type-------------->",newState.openProfileDialogType)
  
    return newState;

     case 'ADD_PROFILE':
     console.log(" in reducer add profile-$------>",action.payload.data)
     var newState = Object.assign({}, state);
     var data = action.payload.data
     var index = data._links.self.href.lastIndexOf("/");
     var id = data._links.self.href.slice(index+1,data._links.self.href.length);
     data["id"] = id;
     console.log("aftr appending--",action.payload.data)
     newState.tableData.push(data)
     console.log("new state after push------------> ",newState.tableData)
     return newState;

     case 'DELETE_PROFILE_ROW':
     var newState = Object.assign({}, state);
     console.log(" in delete reducer profile---payload --------->",action.payload)
     newState.tableData = newState.tableData.filter(function(val){
        console.log(" value --in delete profile----------> ",val)
        return action.payload.indexOf(val.id) == -1; //vtalue to be deleteed should return false
      })
     console.log(" newState.tableData --in delete profile-------> ",newState.tableData)
     return newState;

    case 'EDIT_PROFILE':
      var newState = Object.assign({}, state);
      console.log(" payload data of profile ---------->",action.payload)
      var index= action.payload.data._links.self.href.lastIndexOf("/")
      console.log("  index- ------> " ,index)
      var hreflength = action.payload.data._links.self.href.length
      console.log("in reducer edit profile...length....---",hreflength)
      console.log(" action.payload.data -----------> ",action.payload.data)
      var profileIndex= action.payload.data._links.self.href.slice(index+1,hreflength)
      console.log(" in reducer  profile index",profileIndex)
      newState.tableData = newState.tableData.filter(function(val){
      console.log(" val.profileName----- profile--", newState.tableData)
     
      if(profileIndex == val.id)
      {
         val.profileName = action.payload.data.profileName;
         val.profileDesc = action.payload.data.profileDesc;
      }
      return  val;
 })
        
      
    return newState;

    case 'TOGGLE_STATE_NEW_PROFILE':
    var newState = Object.assign({}, state);
    console.log(" in profile-----------reducer ------------>",newState.tableData)
    newState.openNewProfileDialog = !newState.openNewProfileDialog;
    console.log("in profile reducer ---->--",newState.openNewProfileDialog)
    return newState;

  }


  return state;
}