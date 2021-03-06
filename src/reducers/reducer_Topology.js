const initialState = {tableData:[],
					 openNewTopoDialog:false,  //initializing varia
					 openEditTopoDialog:false,
                     topoInitializeForm:null,
                     openTopoDialogType:null};

export default function(state = initialState, action) {

  switch(action.type) {
    case 'FETCH_TOPOlOGYTABLE_DATA':
      console.log("inside FETCH_TOPOlOGYTABLE_DATA case action.payload.data-----",action.payload);
  	   var newState = Object.assign({}, state);
  	   var data =action.payload.data;
       data.map(function(val){
        	val.profLink = {"href":val.profileName}
   	 });
    	newState.tableData = data;
  	   console.log("newState---",newState.tableData)
       return newState;


    case 'TOGGLE_STATE_ADD_NEW_TOPO':
	    var newState = Object.assign({},state);
	    console.log("newState.openNewTopoDialog--",newState.openNewTopoDialog)
	    newState.openNewTopoDialog = !newState.openNewTopoDialog;
	    console.log("newState.openNewTopoDialog--",newState.openNewTopoDialog)
	    return newState;

	 case 'TOGGLE_STATE_EDIT_TOPO':
	 	var newState = Object.assign({},state);
	    console.log("newState.openEditTopoDialog--",newState.openEditTopoDialog)
	    newState.openEditTopoDialog = !newState.openEditTopoDialog;
	    console.log("newState.openEditTopoDialog--",newState.openEditTopoDialog)
	    return newState;

	case 'ATTACH_PROFTO_TOPO':
		var newState = Object.assign({},state);
		newState.tableData.map(function(value){
			if(value.dcTopoId == action.payload.data.dcTopoId)
				value.profLink = {"href":action.payload.data.profileName};
		})
		return newState;

	case 'UPDATE_TOPO_FORM':
	    console.log("update form topoooooooooooooo");
	    var newState = Object.assign({}, state);
	    var initial = null;
	    console.log("in updating form----",action.payload)
	   // console.log("in updating form  flag---",action.payload.openTopoDialogType)
	   if(action.payload.data != null){
	 	  initial = {"dcTopoId":action.payload.data[0].dcTopoId,"profileId":action.payload.data[0].profileId};
	}
	    newState.topoInitializeForm = initial;
	    console.log("reducer topo---", newState.topoInitializeForm)
	    //newState.openTopoDialogType=action.payload.openTopoDialogType;
	    newState.dcId = action.payload.dcId;
	    return newState;

	case 'TOPOTABLE_DEL_ROW_UPDATE_TREE':
	    console.log("inside DEL_ROW_TABLE---case")
	    var newState = Object.assign({}, state);
	    console.log("line no 23---",action)
	    console.log("line no 24--newState---",newState)
	    console.log("line no 25--action.payload--",action.payload)
	    newState.tableData = newState.tableData.filter(function(val){
	      console.log("line no 33---",val.dcTopoId)
	      console.log("action.payload.indexOf(val._links.self.href) == -1-----",action.payload.indexOf(val.dcTopoId) == -1)
	       return action.payload.indexOf(val.dcTopoId) == -1; //value sto be deleted should return false
	     })
	    console.log("newState.tableData---",newState.tableData)
	    return newState; 

	 case 'TOPOLOGY_ADD_ROW':
  		console.log("addig row to topology table payload--",action.payload)
  		var newState = Object.assign({}, state);
  		newState.tableData.push(action.payload.data);
  		return newState; 

    case 'TOGGLE_STATE' :
    console.log("toggling state reducer--in topology--",action.payload) 
    var newState = Object.assign({},state);
    newState.tableData.forEach(function(value){
      
      if(value.dcTopoId == action.payload.data.dcTopoId){
          console.log("val---",value)
          value.topoState = action.payload.data.topoState ;
      }
    })
    console.log("aaftr changing-topology--",newState.tableData)
    return newState;

  }

  return state;
}