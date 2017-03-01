
const initialState = {tableData:[],
                      openTierDialog:false,
                      tierInitializeForm:null,
                      openArgTypeDialog:false,
                      openReturnTypeDialog:false,
                      argumentTypeData:[],
                      returnTypeData:[],
                      openEditMethodBasedCaptureDialog:false,
                      initializeForm:{}
                      
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

  


  function getCustomTypeName(data){
    console.log("data---",data)
    if(data.type == 0)
      data.customValTypeName = 'String'
    else if(data.type == 1) 
      data.customValTypeName = 'Integer'
    else if(data.type == 2)
      data.customValTypeName ='Decimal'
    
    return data;
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
       var data = action.payload.data
       newState.tableData.map(function(value){
         if(value.methodBasedId == newState.methodBasedId){
           if(value.returnTypeData == null){
             value.returnTypeData = [];
          }
          //this fuction used to get custom Type name to display in table
            getCustomTypeName(data)
            value.returnTypeData.push(data)
            modifyData(value);
         }
       })
       return newState;

      case 'ADD_ARGUMENT_TYPE':
       var newState = Object.assign({}, state);
       var data = action.payload.data ;
       newState.tableData.map(function(value){
       if(value.methodBasedId == newState.methodBasedId){
            if(value.argumentTypeData == null){
             value.argumentTypeData = [];
          }
            getCustomTypeName(data)
            value.argumentTypeData.push(data)
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


    case 'TOGGLE_METHODBASED_EDIT':
      var newState = Object.assign({}, state);
      newState.openEditMethodBasedCaptureDialog= !newState.openEditMethodBasedCaptureDialog;
      console.log("newState---in reducer nsesionATrr",newState)
      return newState;

    case 'INITIALIZE_METHODBASEDCAPTURE_FORM':
      var newState = Object.assign({}, state);
      var data = action.payload;
      if(data.returnTypeData != null ){
        console.log("not null returnTypeData")
        data.returnTypeData.map(function(val){
          getCustomTypeName(val)
        })
      }
      console.log("data aftr returnType---",data)

       if(data.argumentTypeData != null ){
        data.argumentTypeData.map(function(val){
          getCustomTypeName(val)
        })
      }
      console.log("data-----",data)
      newState.initializeForm = data
      newState.methodBasedId = data.methodBasedId;
      return newState;


      case 'UPDATE_METHODBASED_CUSTOMDATA':
       var newState = Object.assign({}, state);
       var data = action.payload.data;
       console.log("data----",data)
       newState.tableData.map(function(val){
         if(val.methodBasedId == data.methodBasedId){
           val.enableArgumentType = data.enableArgumentType,
           val.enableReturnType = data.enableReturnType,
           val.returnTypeData = data.returnTypeData,
           val.argumentTypeData = data.argumentTypeData
           modifyData(val);
         }
       })
       return newState;

        case 'DEL_CUSTOM_METHOD_RETURN_VALUE_ROW':
            var newState = Object.assign({}, state)
            console.log("newState.table - ",newState)
            newState.tableData.map(function (val) {
                if (val.methodBasedId == newState.initializeForm.methodBasedId) {
                    val.returnTypeData = val.returnTypeData.filter(function (value) {
                        console.log("value deleted - ",value.returnTypeId)
                        return action.payload.data.indexOf(value.returnTypeId) == -1;
                    })
 //                   newState.initializeForm = val
                }
            }) 
            console.log("newState--deletimg return type----",newState)
            return newState;

             case 'DEL_CUSTOM_METHOD_ARG_VALUE_ROW':
            var newState = Object.assign({}, state)
            console.log("newState.table - ",newState)
            newState.tableData.map(function (val) {
                if (val.methodBasedId == newState.initializeForm.methodBasedId) {
                    val.argumentTypeData = val.argumentTypeData.filter(function (value) {
                        console.log("value deleted - ",value.argTypeId)
                        return action.payload.data.indexOf(value.argTypeId) == -1;
                    })
   //                 newState.initializeForm = val
                }
            }) 
             console.log("newState--deletimg argument type----",newState)
            return newState;
  }


  return state;
}