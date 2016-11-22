
const initialState = {tableData:[]}

export default function(state = initialState, action) {

  console.log('inside reducer ND Agent Status');
  switch(action.type) {

    case 'FETCH_ND_AGENT_TABLEDATA':
      var newState = Object.assign({}, state);
      console.log("action.payload.data----",action.payload.data)
      newState.tableData= action.payload.data;
      // newState.tableData=action.payload.data;
      console.log("newState tableData --- ",newState.tableData)
      return newState;
  }
  return state;
}