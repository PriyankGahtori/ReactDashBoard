const initialState = { openNewServiceEntryPtsDialog:false};

export default function(state = initialState, action) {

  switch(action.type) {
  case 'TOGGLE_STATE_ADD_NEW_SERVICEENTRY_PTS':
    var newState = Object.assign({}, state);
    console.log("newState.openNewServiceEntryPtsDialog--",newState.openNewServiceEntryPtsDialog)
    newState.openNewServiceEntryPtsDialog= !newState.openNewServiceEntryPtsDialog;
    console.log("newState.openNewServiceEntryPtsDialog---",newState.openNewServiceEntryPtsDialog)
    return newState;
}
  return state;
}