const initialState = { tableData :[],
					   openNewHttpStatsCondDialog:false,
					   listOfHeaders :[],
					   listOfTypes:[],
					   listOfValueType:[],
					   listOfOperators:[],
             openHttpStatsDialog: false,
             httpStatsFormInitialData:null,

}
export default function(state = initialState,action){
	switch(action.type){
	case 'FETCH_HTTP_STATS_COND_TABLEDATA':
	var newState = Object.assign({},state)
	console.log(" action.payload.data---", action.payload.data)
	newState.tableData = action.payload.data
	return newState;


	 case 'TOGGLE_STATE_ADD_HTTP_STATS':
      var newState = Object.assign({}, state);
      console.log("newState.openNewMethodMonDialog--",newState.openNewMethodMonDialog)
      newState.openNewHttpStatsCondDialog= !newState.openNewHttpStatsCondDialog;
      console.log("newState.openNewHttpStatsCondDialog---",newState.openNewHttpStatsCondDialog)
      return newState;

      case 'LIST_OF_HEADERS':
      var newState = Object.assign({},state);
      console.log("action.payload.data-list of headers---",action.payload.data)
      newState.listOfHeaders = action.payload.data;
      return newState;

      case 'LIST_OF_TYPES':
      var newState = Object.assign({},state);
      console.log("action.payload.data-list of headers type---",action.payload.data)
      newState.listOfTypes = action.payload.data;
      return newState;

      case 'LIST_OF_VALUETYPE':
      var newState = Object.assign({},state)
      console.log("list of valtypes---",action.payload.data)
      newState.listOfValueType = action.payload.data;
      return newState;

      case 'LIST_OF_OPERATORS':
      var newState = Object.assign({},state)
      newState.listOfOperators= action.payload.data;
      return newState;

      case 'ADD_HTTP_STATS_COND':
      var newState = Object.assign({},state)
      console.log("action.payload.data tabldata--",action.payload.data)
      newState.tableData.push(action.payload.data)
      return newState;

      case 'DEL_HTTP_STATS':
       var newState = Object.assign({},state)
       newState.tableData = newState.tableData.filter(function(value){
            return action.payload.data.indexOf(value.hscid) == -1;
       })
      return newState;

      case 'INITIALIZE_HTTP_STATS':
       var newState = Object.assign({},state)
       newState.httpStatsFormInitialData = action.payload.data;
       newState.openHttpStatsDialog = action.payload.type;
      return newState;

       case 'EDIT_HTTP_STATS_COND':
        var newState = Object.assign({},state)
        newState.tableData = newState.tableData.map(function(value){
          if(value.hscid == action.payload.data.hscid)
           value = action.payload.data
         return value
        })
       return newState;
      }
    return state;
}
