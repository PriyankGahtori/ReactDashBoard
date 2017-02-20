
const initialState = {tableData:[],
                      openTierDialog:false,
                      tierInitializeForm:null,
                      openArgTypeDialog:false,
                      openReturnTypeDialog:false,
                      argumentTypeData:[],
                      returnTypeData:[]
}
export default function(state = initialState, action) {

  function getHdrNames(data){
     let hdrNamesHref ='';
     data.map(function(val,index){
     
      if(index != (data.length -1)){
          hdrNamesHref = hdrNamesHref + val.headerName +"," ;
      }
      else {
        hdrNamesHref = hdrNamesHref + val.headerName
      }
      
    })
    console.log("hdrNamesHref---",hdrNamesHref)
    return hdrNamesHref ;
  }


  function modifyData(val){
    
      if(val.returnTypeData != null && val.returnTypeData.length != 0){
          let hdrNames = getHdrNames(val.returnTypeData);
            val.returnTypeHref = hdrNames
      }
      else{
         val.returnTypeHref = "NA"
      } 
      
      if(val.argumentTypeData != null && val.argumentTypeData.length != 0){
          let hdrNames = getHdrNames(val.argumentTypeData);
          val.argTypeHref = hdrNames
      }
      else{
         val.argTypeHref = "NA"
      } 
      console.log("in modifyData function valled--",val)
        return val;
  }

  switch(action.type) {
  case 'FETCH_METHOD_BASED_CUSTOMDATA':
  	console.log("inside FETCH_TIER_TABLE_DATA topology case---",action.payload.data);
  	var newState = Object.assign({}, state);
    var data = action.payload.data ;
    data.map(function(val){
      modifyData(val);
      })
    newState.tableData = data;
    console.log("newState---",newState)
    return newState;

    case 'ADD_METHODBASED_CAPTURINGDATA':
    	var newState = Object.assign({}, state);
      console.log("action.payload---",action.payload.data)
      var data = modifyData(action.payload.data);
      console.log("data--",data)
      newState.tableData.push(data);
      return newState;

    case 'TOGGLE_ARGTYPE_DIALOG':
    	var newState = Object.assign({}, state);
      console.log("TOGGLE_ARGTYPE_DIALOG--",action.payload)
      newState.openArgTypeDialog = !newState.openArgTypeDialog 
      if(action.payload.argumentTypeData != null )
          newState.argumentTypeData = action.payload.argumentTypeData ;
      
      newState.methodBasedId = action.payload.methodBasedId; 
      console.log("newState--",newState)
      return newState;

      case 'TOGGLE_RETURNTYPE_DIALOG':
      var newState = Object.assign({}, state);
      console.log("action.payload.data---",action.payload)
      if(action.payload.returnTypeData != null )
          newState.returnTypeData = action.payload.returnTypeData ;
      
      newState.openReturnTypeDialog = !newState.openReturnTypeDialog ;
      newState.methodBasedId = action.payload.methodBasedId;      
      console.log("newState---",newState)
      return newState;

      case 'ADD_RETURN_TYPE':
       var newState = Object.assign({}, state);
       newState.tableData.map(function(value){
         if(value.methodBasedId == newState.methodBasedId){
           if(value.returnTypeData == null){
             value.returnTypeData = [];
          }
            value.returnTypeData.push(action.payload.data)
            newState.returnTypeData =  value.returnTypeData;
            modifyData(value);
         }
       })
       return newState;

      case 'ADD_ARGUMENT_TYPE':
       var newState = Object.assign({}, state);
       newState.tableData.map(function(value){
       if(value.methodBasedId == newState.methodBasedId){
            if(value.argumentTypeData == null){
             value.argumentTypeData = [];
          }
            value.argumentTypeData.push(action.payload.data)
            newState.argumentTypeData =  value.argumentTypeData;
            modifyData(value);
           }
       })
       return newState;
  
  
    case 'DEL_METHOD_CUSTOM_DATA':
        var newState =  Object.assign({},state)
        newState.tableData  = newState.tableData.filter(function(value) {
          return action.payload.data.indexOf(Number(value.methodBasedId)) == -1;
        })
      return newState;
  }


  return state;
}