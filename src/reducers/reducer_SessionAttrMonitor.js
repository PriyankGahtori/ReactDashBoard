const initialState = {tableData:[],
                     openNewAppDialog:false,  //initializing varia
                     sessionAttrInitializeForm:null,
                     openAppDialogType:null,
                     ndConfPath:null,
                     valData:[],
                     openNewSessAttrMonDialog:false,
                     openEditSessAttrMonDialog:false,
                     disabled:false,
                     openAttrValDialog:false,
                     attrValues:[],
                     sessionType:'all',
                     openSessAttrMonDialog:null
                   };

function modifyingData(data){
  console.log("data--",data)
    data.map(function(val){
        var value='';
        if(val.attrValues != null && val.attrValues.length != 0){
          val.attrValues.map(function(attrVal,index){
          console.log("attrVal--",attrVal)
          console.log("index--",index)
          console.log("val.attrValues.length--",val.attrValues.length)
          if(index != (val.attrValues.length - 1)){
            value = value+attrVal.valName+",";
          }
          else{
            value = value+attrVal.valName ;
          }
        console.log("value--",value)
      })
      val["values"]= {"href":value};
    }
      else{
        val["values"] = "NA"
      }
    })
    return data;

}

export default function(state = initialState, action) {

	/*console.log("inside reducerappdetail", action.type);*/

 /* console.log("reducerdcdetail called----",initialState)*/
  switch(action.type) {

    case 'FETCH_SESSION_ATTR_MONITOR':
    var newState = Object.assign({},state)
    newState.sessionType = action.payload.data.sessionType ;
     var data = [];
    console.log("action.payload--",action.payload.data)
    if(action.payload.data.attrList != null){
      data = action.payload.data.attrList;
       var data = modifyingData(data);
    }
     newState.tableData = data;
    return newState;

    case 'VAL_DATA':
    var newState = Object.assign({},state)
    console.log("valdata reducer--",action.payload)
    newState.valData.push(action.payload);
    console.log("newState.valData--",newState.valData)
    return newState;

    case 'CLEAR_VAL_DATA':
     var newState = Object.assign({},state)
      newState.valData = [];
      return newState;


    case 'ADD_ATTRIBUTE':
    var newState = Object.assign({},state)
    console.log("add attr--",action.payload)
    var data = action.payload.data;
    if(data.attrValues != null && data.attrValues.length != 0){
      var value='';
      data.attrValues.map(function(attrVal,index){
         if(index != (data.attrValues.length - 1)){
          value = value+attrVal.valName+",";
        }
        else{
          value = value+attrVal.valName ;
        }
        
    })
     data["values"]= {"href":value};
    }
    else{
      data["values"]= "NA"
    }
    newState.tableData.push(data)
    console.log("newState--",newState.tableData)
    return newState;
     
     case 'TOGGLE_STATE_ADD_SESSION_MON':
      var newState = Object.assign({}, state);
      console.log("newState.openNewMethodMonDialog--",newState.openNewMethodMonDialog)
      newState.openNewSessAttrMonDialog= !newState.openNewSessAttrMonDialog;
      console.log("newState.openNewMethodMonDialog---",newState.openNewSessAttrMonDialog)
      return newState;


        //NOT USED
      case 'TOGGLE_STATE_SUBMIT_BUTTON':
      var newState = Object.assign({},state)
      newState.disabled = !newState.disabled
      console.log("newState--",newState.disabled)
      return newState;

      case 'TOGGLE_ATTR_VAL_DIALOG_STATE':
      var newState = Object.assign({},state)
      newState.openAttrValDialog= !newState.openAttrValDialog
      console.log("vvv---",action.payload)
      console.log("newState--",newState.openAttrValDialog)
      let attrValues = [];
      newState.tableData.map(function(val){
        console.log("values---",val)
        if(val.sessAttrId == action.payload){
          console.log("val--",val)
          attrValues = val.attrValues;
        }
      })
      console.log("attrValues--",attrValues)
      newState.attrRowId =  action.payload ;
      newState.attrValues = attrValues ;
      return newState;

      case 'UPDATE_ATTR_VALUES':
      var newState = Object.assign({},state)
      console.log("action.payload---",action.payload)
      newState.tableData.map(function(val){
        if(val.sessAttrId == newState.attrRowId){
          val.attrValues.map(function(attrVal){
              action.payload.data.map(function(respData){
                if(respData.specAttrValId == attrVal.specAttrValId ){
                  attrVal = respData ;
                }
              })
          }) 
        }
      })
      var data = modifyingData(newState.tableData);
      newState.tableData = data;
      return newState; 


      case 'ADD_ATTR_VALUES':
      var newState = Object.assign({},state)
      console.log("action-",action.payload)
      newState.tableData.map(function(val){
        if(val.sessAttrId == newState.attrRowId){
          console.log("val---",val)
          val.attrValues.push(action.payload.data)
        }
      })
      var data = modifyingData(newState.tableData);
      newState.tableData = data;
      return newState;

     case 'TOGGLE_EDIT_SESSION_ATTR':
      var newState = Object.assign({}, state);
      newState.openEditSessAttrMonDialog= !newState.openEditSessAttrMonDialog;
      return newState;

      case  'INITIALIZE_SESSION_ATTR':
        var newState = Object.assign({}, state);
        var data = action.payload;
        if(data.attrType == "specific"){
          data.specific = true
          data.complete = false
        }else {
          data.complete = true
          data.specific = false
        } 
        newState.sessionAttrInitializeForm = action.payload;
      return newState;

      case  'EDIT_SESSION_ATTR':
        var newState = Object.assign({}, state);
         newState.tableData.map(function(val){
          if(val.sessAttrId == action.payload.sessAttrId)
          {
             val.attrName = action.payload.attrName;
             val.attrType = action.payload.attrType;
          }
             return val;
         });  
         console.log(" newstate data ------> ",newState.tableData)
      return newState;

  default :
    return state;

  }

}
