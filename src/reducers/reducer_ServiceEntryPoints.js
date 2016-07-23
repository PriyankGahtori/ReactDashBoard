const initialState = {tableData :[],openNewServiceEntryPtsDialog:false};

export default function(state = initialState, action) {

  switch(action.type) {
  case 'FETCH_SERVICE_POINTS_TABLEDATA':
      var newState = Object.assign({}, state);
      newState.tableData=action.payload.data;
      console.log("newState---",newState.tableData)
      return newState;

  case 'TOGGLE_STATE_ADD_NEW_SERVICEENTRY_PTS':
    var newState = Object.assign({}, state);
    console.log("newState.openNewServiceEntryPtsDialog--",newState.openNewServiceEntryPtsDialog)
    newState.openNewServiceEntryPtsDialog= !newState.openNewServiceEntryPtsDialog;
    console.log("newState.openNewServiceEntryPtsDialog---",newState.openNewServiceEntryPtsDialog)
    return newState;
}
  return state;
}