const initialState = { 
						tableData :[],
						listBackendTypes : [], 
						listBackendPoints : [],
            initializeBackendForm :{} ,
            fields:[]
				      }
export default function(state = initialState ,action){
  console.log("in main reducer func bacjend--",action)

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

  case 'INITIALIZE_BACKEND_FORM':
  var newState = Object.assign({},state);
  let fields = ['backendTypeId','host','port','url','serviceName','topicName','tableName'];
  console.log("in reducer ---",action.payload)
   console.log("in INITIALIZE_BACKEND_FORM--",newState.initializeBackendForm)

  newState.initializeBackendForm.backendTypeId = action.payload.id;
  newState.initializeBackendForm.host = action.payload.namingRule.host,
  newState.initializeBackendForm.port = action.payload.namingRule.port,
  newState.initializeBackendForm.url  = action.payload.namingRule.url,
  newState.initializeBackendForm.serviceName = action.payload.namingRule.serviceName,
  newState.initializeBackendForm.tableName = action.payload.namingRule.tableName,
  newState.initializeBackendForm.topicName = action.payload.namingRule.topicName

  action.payload.lstEndPoints.map(function(value){
    console.log("value---",value)
    fields.push("endPoint_"+value.id);
    newState.initializeBackendForm["endPoint_"+value.id ]= value.enabled;
  })
  newState.fields = fields;
  console.log("aftr initializing---",newState.initializeBackendForm)
  return newState;

  case 'ADD_NEW_BACKEND_POINT':
    var newState = Object.assign({},state);
    var responseData = action.payload.data;
               //creating endpoint from responseobj  
    console.log("responseData--",responseData)  
    var endPointObj = {};
        endPointObj.id = responseData.id;
        endPointObj.name = responseData.name;
        endPointObj.description = responseData.desc;
        endPointObj.enabled = responseData.enabled;
       //Adding new endpoint 
    newState.tableData.map(function(val){
       if(val.id === responseData.backendTypeId)
               val.lstEndPoints.push(endPointObj);
    });        

   return newState;

   case 'UPDATE_BACKEND_POINT':
   var newState = Object.assign({},state);
   /*var response = action.payload.data;
      let endPoints = responseData.endPoints;
       endPoints.forEach(function(value){
          responseData["endPoint_"+value.id] = value.enabled;
       })       
  let tableData = newState.tableData ;
  //get data for current backendTypeId
  let backendTypeId = response.backendTypeId;
  let currentObj;
  tableData.forEach(function(val){ 
                    if(backendTypeId == val.id)
                        currentObj = val;
                  });
//modify the currentObj's Naming Rule
Object.keys(currentObj.namingRule).forEach(function(key) {
    //console.log(key, obj[key]);
    currentObj.namingRule[key] = response[key];
});

//modify the lstEndPoints enabled value as per response
currentObj.lstEndPoints.forEach(function(val){
    val.enabled = response["endPoint_"+val.id];
    
})      

   console.info("in updating---",responseData)
*/
   return newState;
}
return state;

}