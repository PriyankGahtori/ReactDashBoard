const initialState = {tableData:[], openNewDCDialog:false,dcDetailInitializeForm:null,openDCDialogType:null,appId:null};

export default function(state = initialState, action) {

	console.log("inside init reducer for tree", action.type);
  console.log("reducerdcdetail called----")
  switch(action.type) {

  case 'FETCH_TABLE_DATA':
	  console.log("inside  FETCH_DCDETAIL_DATA", action);
    var newState = Object.assign({}, state);
    console.log("action.payload.data._embedded.dcdetail---",action.payload.data._embedded.dcdetail)
    var data=action.payload.data._embedded.dcdetail;
      data.map(function(val){
        console.log("in val---",val)
        var index = val._links.self.href.lastIndexOf("/");
        var id = val._links.self.href.slice(index+1,val._links.self.href.length)
        val.id = id;
        console.log("id----",id)
    })
    console.log("action.payload.data._embedded.dcdetail---",data)

    newState.tableData = data;
    return newState
    //return [{"id":1,"name":"priyank"},{"id":2,"name":"Gahtori"}]

  case 'DCTABLE_ADD_ROW_UPDATE_TREE':
    console.log("inside ADD_ROW_TABLE case---action.payload.data",action.payload);
    var newState = Object.assign({}, state);
    console.log("newState- line no 16-",newState)
    console.log("action.payload.data,",action.payload.data)
    //action.payload.data._l={self:{href:action.payload.data.id}};
    console.log("action.payload.data")
    newState.tableData.push(action.payload.data);
    console.log("newState---",newState)
    return newState;

  case 'DCTABLE_DEL_ROW_UPDATE_TREE':
    console.log("inside DEL_ROW_TABLE---case")
    var newState = Object.assign({}, state);
    console.log("line no 24--newState---",newState)
    console.log("line no 25--action.payload--",action.payload)
    newState.tableData = newState.tableData.filter(function(val){
      console.log("line no 33---",val.id)
      console.log("action.payload.indexOf(val._links.self.href) == -1-----",action.payload.indexOf(val.id) == -1)
       return action.payload.indexOf(val.id) == -1; //value sto be deleteed should return false
     })
    console.log("newState.tableData---",newState.tableData)
    return newState; 

  case 'TOGGLE_STATE_ADD_NEW_DC':
    var newState = Object.assign({}, state);
    console.log("newState.openNewDCDialog--",newState.openNewDCDialog)
    newState.openNewDCDialog= !newState.openNewDCDialog;
    console.log("newState.openNewDCDialog---",newState.openNewDCDialog)
    return newState;

  case 'UPDATE_FORM':
    console.log("update form");
    var newState = Object.assign({}, state);
    console.log("in updating form----",action.payload)
    console.log("in updating form  flag---",action.payload.openDCDialogType)
    newState.dcDetailInitializeForm=action.payload.data;
    newState.openDCDialogType=action.payload.openDCDialogType;
    newState.appId = action.payload.appId;
    console.log("newState.updateFormInitialValues--",newState.dcDetailInitializeForm)
    console.log("newState.openDCDialogType--",newState.openDCDialogType)
    console.log(" newState.appId", newState.appId)
    return newState

  case 'DCTABLE_UPDATE_ROW_UPDATE_TREE':
    console.log("updating row--action.payload",action.payload)
    console.log("updating row--action.payload",action.payload.data.id)
    var newState = Object.assign({}, state);
      newState.tableData = newState.tableData.filter(function(val){
      console.log("line no 61-------val.id",val.id)
      if(val.id == action.payload.data.id){
          console.log("condition matched")
          val.dcName=action.payload.data.dcName;
          val.dcIp=action.payload.data.dcIp;
          val.dcPort=action.payload.data.dcPort;
          val.ndeIp=action.payload.data.ndeIp;
          val.ndePort=action.payload.data.ndePort;
      }

      return val;
     })
     console.log(" newState.tableData ", newState.tableData )
    return newState;


  default :
    return state;

  }

}
