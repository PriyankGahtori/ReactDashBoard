
const initialState = {tableData:[],
                      openEditHttpReqHdrDialog:false,
                      httpReqHdrBasedId:'-1'
                      
}

function modifyingData(data){
  console.log("data---",data)
  let rulesHdrName='';
  if(data.rules != null){
    if(data.rules.length != 0){
    data.rules.map(function(val,index){
        if(index != (data.rules.length -1)){
            rulesHdrName = rulesHdrName + val.valName +"," ;
        }
        else {
          rulesHdrName = rulesHdrName + val.valName
        }
        
      })
    }
    else{
        rulesHdrName = "NA"
    }
  }
  else{
    rulesHdrName = "NA"
  }
  
  data.rulesHdrName = rulesHdrName;
  if(data.dumpMode == "1"){
    data.dumpModeName = "Specific "
  }
  else if(data.dumpMode == "2"){
    data.dumpModeName = "Complete",
    data.rulesHdrName = "NA"
  }
  else{
    data.dumpModeName = "Complete,Specific"
  }
}



export default function(state = initialState, action) {

  switch(action.type) {
  case 'FETCH_HTTPREQ_HDR':
  	console.log("inside FETCH_TIER_TABLE_DATA topology case---",action.payload.data);
  	var newState = Object.assign({}, state);
    var data = action.payload.data ;
    data.map(function(val){
      modifyingData(val);
      })
    newState.tableData = data;
    console.log("newState---",newState)
    return newState;


    case 'ADD_HTTPREQ_HDR':
    var newState = Object.assign({}, state);
    var data = action.payload.data ;
    modifyingData(data);
    console.log("data-=-",data)
    newState.tableData.push(data);
    console.log("newState---",newState.tableData)
    return newState;

     case 'DEL_HTTP_REQ_HEADER_ROW': 
        var newState =  Object.assign({},state)
        newState.tableData  = newState.tableData.filter(function(value) {
          return action.payload.data.indexOf(Number(value.httpReqHdrBasedId)) == -1;
        })
      return newState;


   case 'TOGGLE_HTTPREQHDR_EDIT':
      var newState = Object.assign({}, state);
      newState.openEditHttpReqHdrDialog= !newState.openEditHttpReqHdrDialog;
      console.log("newState---in reducer nsesionATrr",newState)
      return newState;

    case 'INITIALIZE_HTTPREQHDR_FORM':
      var newState = Object.assign({}, state);
      var data = action.payload;
      if(data.dumpMode == 1){
        data.specific = true,
        data.complete = false
     }
    else if(data.dumpMode == 2){
        data.complete = true,
        data.specific = false
    }
    else{
        data.complete = true,
        data.specific = true
    }

    
    if(data.rules != null && data.rules.length != 0){
      data.rules.map(function(val){
        if(val.type == 0)
          val.customValTypeName = 'String'

        else if(val.type == 1)
          val.customValTypeName = 'Integer'
        
        else if(val.type == 2)
          val.customValTypeName = 'Decimal'
    })
    }
    console.log("data ----",data)
      newState.initializeForm = data
      newState.httpReqHdrBasedId = data.httpReqHdrBasedId;
      console.log("newState.initializeForm --",newState.initializeForm)
      return newState;

      case 'ADD_RULES_HTTPREQHDR':
      var newState = Object.assign({}, state);
      newState.tableData.map(function(val){
        if(val.httpReqHdrBasedId == newState.httpReqHdrBasedId){
          console.log("val---",val)
          var data = action.payload.data
          if(data != null && data.length != 0){
            
              if(data.type == 0)
                data.customValTypeName = 'String'

              else if(data.type == 1)
                data.customValTypeName = 'Integer'
              
              else if(data.type == 2)
                data.customValTypeName = 'Decimal'
        
          val.rules.push(data)
          //modifyingData(val);
        }
        }
      })
     
      return newState;
    
    case 'UPDATE_HTTPREQHDR':
       var newState = Object.assign({}, state);
        newState.tableData.map(function(val){
           console.log("action.payload.data--",action.payload.data)
          if(val.httpReqHdrBasedId == action.payload.data.httpReqHdrBasedId)
          {
             val.headerName = action.payload.data.headerName
             val.dumpMode = action.payload.data.dumpMode
             val.rules = action.payload.data.rules
             modifyingData(val);
             return val;
          }
         });
      console.log("newState--",newState.tableData)  
      return newState;

     case 'DEL_HTTP_CUSTOM_ROW':
        var newState = Object.assign({},state);
        newState.tableData.map(function(value) {
          if(value.httpReqHdrBasedId == newState.httpReqHdrBasedId){
            value.rules =  value.rules.filter(function(value){
                return action.payload.data.indexOf(value.ruleId) == -1;
            })
          }
      });
      return newState

  }
  return state;

  





}