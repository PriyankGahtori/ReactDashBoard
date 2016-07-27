const initialState = {tableData :[],openNewServiceEntryPtsDialog:false,serviceEntryPoints:[],listOfEntryType:[]};

export default function(state = initialState, action) {

  switch(action.type) {
  case 'FETCH_SERVICE_POINTS_TABLEDATA':
      var newState = Object.assign({}, state);
      console.log("action.payload.data----",action.payload.data)
      newState.tableData=action.payload.data;
      console.log("newState---",newState.tableData)
      return newState;

  case 'TOGGLE_STATE_ADD_NEW_SERVICEENTRY_PTS':
    var newState = Object.assign({}, state);
    console.log("newState.openNewServiceEntryPtsDialog--",newState.openNewServiceEntryPtsDialog)
    newState.openNewServiceEntryPtsDialog= !newState.openNewServiceEntryPtsDialog;
    console.log("newState.openNewServiceEntryPtsDialog---",newState.openNewServiceEntryPtsDialog)
    return newState;


  case 'FETCHING_SERVICE_ENTRYPOINTS_FORM':
    console.log("fetching service entrypoints form -----",action.payload.data)
    var newState = Object.assign({},state);
    console.log("newState---",newState)
    newState.serviceEntryPoints=action.payload.data._embedded.serviceEntryPoint;
    console.log("newstate.serviceEntryPoints--",newState.serviceEntryPoints)
    return newState;

  case 'LIST_SERVICEENTRYPOINT_TYPE':
    console.log("reducer of serviceentrypount list-action.payload----",action.payload.data)
    var newState = Object.assign({},state);
    console.log("newState---",newState)
     var data=action.payload.data._embedded.entryTypes;
      data.map(function(val){
        console.log("in gentaing list of entrytype",val)
        var index=val._links.self.href.lastIndexOf("/");
        var id= val._links.self.href.slice(index+1,val._links.self.href.length)
        val.id=id;
        console.log("id----",id)
    })
    newState.listOfEntryType = data;
    return newState;

   }
    
  return state;
}