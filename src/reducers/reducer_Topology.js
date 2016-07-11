const initialState = {tableData:[],
					 openNewTopoDialog:false,  //initializing varia
                     topoInitializeForm:null,
                     openTopoDialogType:null};

export default function(state = initialState, action) {

  switch(action.type) {
    case 'FETCH_TOPOlOGYTABLE_DATA':
    	console.log("inside FETCH_TOPOlOGYTABLE_DATA case action.payload.data-----",action.payload);
  	   var newState = Object.assign({}, state);
  	   newState.tableData=action.payload.data;
  	   console.log("newState---",newState.tableData)
       return newState;


    case 'TOGGLE_STATE_ADD_NEW_TOPO':
	    var newState = Object.assign({},state);
	    console.log("newState.openNewTopoDialog--",newState.openNewTopoDialog)
	    newState.openNewTopoDialog = !newState.openNewTopoDialog;
	    console.log("newState.openNewTopoDialog--",newState.openNewTopoDialog)
	    return newState;

	case 'UPDATE_TOPO_FORM':
	    console.log("update form topoooooooooooooo");
	    var newState = Object.assign({}, state);
	    console.log("in updating form----",action.payload)
	    console.log("in updating form  flag---",action.payload.openTopoDialogType)
	    newState.topoInitializeForm=action.payload.data;
	    newState.openTopoDialogType=action.payload.openTopoDialogType;
	    newState.dcId = action.payload.dcId;
	    return newState;

	case 'TOPOTABLE_DEL_ROW_UPDATE_TREE':
	    console.log("inside DEL_ROW_TABLE---case")
	    var newState = Object.assign({}, state);
	    console.log("line no 23---",action)
	    console.log("line no 24--newState---",newState)
	    console.log("line no 25--action.payload--",action.payload)
	    newState.tableData = newState.tableData.filter(function(val){
	      console.log("line no 33---",val._links.self.href)
	      console.log("action.payload.indexOf(val._links.self.href) == -1-----",action.payload.indexOf(val._links.self.href) == -1)
	       return action.payload.indexOf(val._links.self.href) == -1; //value sto be deleteed should return false
	     })
	    console.log("newState.tableData---",newState.tableData)
	    return newState; 
	  }
  


  return state;
}