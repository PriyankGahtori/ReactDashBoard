
const initialState = {tableData:[],
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
    data.dumpModeName = "complete"
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
  }
  return state;
}