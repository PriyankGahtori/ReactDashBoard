
const initialState = {tableData:[],listOfGroupNames:[],openNewBTPatternDialog:false,selectedGroupName:"default",selectedGrpId:null}

export default function(state = initialState, action) {

  console.log('inside reducer BT Pattern');
  switch(action.type) {

    case 'FETCH_BT_PATTERN_TABLEDATA':
      var newState = Object.assign({}, state);
      console.log("action.payload.data----",action.payload.data)
      newState.tableData=action.payload.data;
      console.log("newState---",newState.tableData)
      return newState;

    case 'TOGGLE_STATE_ADD_BT_PATTERN':
      var newState = Object.assign({}, state);
      console.log("newState.openNewBTPatternDialog--",newState.openNewBTPatternDialog)
      newState.openNewBTPatternDialog= !newState.openNewBTPatternDialog;
      console.log("newState.openNewBTPatternDialog---",newState.openNewBTPatternDialog)
      return newState;

    case 'LIST_GROUP_NAMES':
      console.log("reducer of group names list-action.payload----",action.payload.data)
      var newState = Object.assign({},state);
      console.log("action.payload.data._embedded.btgroup---",action.payload.data._embedded.btgroup)
       var data=action.payload.data._embedded.btgroup;
        data.map(function(val){
          var index=val._links.self.href.lastIndexOf("/");
          var id= val._links.self.href.slice(index+1,val._links.self.href.length)
          val.id=id;
      })
      newState.listOfGroupNames = data;
      return newState;

    case 'ADD_NEW_BT_PATTERN' :
         console.log("in reducer of adding new bt pattern---payloaf--",action.payload.data)
         var newState = Object.assign({},state);
         console.log("newState----",newState)
         newState.tableData.push(action.payload.data)
         console.log("newState.tableData--adding new bt pattern-",newState.tableData)
         return newState;

    case 'ADD_NEW_BT_GROUP' :
         console.log("in reducer of adding new bt group---payloaf--",action.payload.data)
         var newState = Object.assign({},state);
         console.log("newState----",newState)
         newState = action.payload.data;
         return newState;

    case 'SELECTED_BT_GROUP' :
         console.log("in reducer of Selected bt group --",action.payload)

         console.log("form data - ", action.payload);
         var newState = Object.assign({},state);
         newState.tableData=action.payload.data;
         console.info("action id ",action.meta.id);
         newState.selectedGroupName = action.meta.menuGroupName;
         newState.selectedGrpId = action.meta.id;
         return newState;
  
  }
  return state;
}