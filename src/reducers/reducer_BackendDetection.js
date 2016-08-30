const initialState = { tableData :[]

}
export default function(state = initialState ,action){

switch(action.type){
  case 'FETCH_BACKEND_TABLEDATA':
  var newState = Object.assign({},state);
  var data = action.payload.data.backendDetail;
  data.map(function(value){
    var type = {'href':value.type};
    value.type = type;
  })
  newState.tableData = data;
  return newState;
}
return state;

}