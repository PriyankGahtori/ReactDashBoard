const initialState = { 
						tableData :[],
						listBackendTypes : [], 
						listBackendPoints : []
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

  case 'FETCH_BACKEND_TYPES':
  	var newState = Object.assign({},state);
  	var responseData = action.payload.data._embedded.backendTypes;
  	//iterate over respone add 'key'->id with 'value' as primaryKey
	responseData.map(function(val){        
    	var index=val._links.self.href.lastIndexOf("/");
    	var primaryKey = val._links.self.href.slice(index+1,val._links.self.href.length)
    	val.id = primaryKey;        
	});
	newState.listBackendTypes = responseData;
  return newState;

  case 'FETCH_BACKEND_POINTS':
  	var newState = Object.assign({},state);
  	var responseData = action.payload.data._embedded.backendPoints;
  	//iterate over respone add 'key'->id with 'value' as primaryKey
	responseData.map(function(val){        
    	var index=val._links.self.href.lastIndexOf("/");
    	var primaryKey = val._links.self.href.slice(index+1,val._links.self.href.length)
    	val.id = primaryKey;        
	});
	newState.listBackendPoints = responseData;
	console.info("responseData listBackendPoints",responseData);
  return newState;

}
return state;

}