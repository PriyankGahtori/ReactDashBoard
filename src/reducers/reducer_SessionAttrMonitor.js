const initialState = {tableData:[],
                     openNewAppDialog:false,  //initializing varia
                     appDetailInitializeForm:null,
                     openAppDialogType:null,
                     ndConfPath:null,
                     valData:[],
                     openNewSessAttrMonDialog:false,
                     disabled:false,
                     openAttrValDialog:false,
                     attrValues:[]
                   };

export default function(state = initialState, action) {

	/*console.log("inside reducerappdetail", action.type);*/

 /* console.log("reducerdcdetail called----",initialState)*/
  switch(action.type) {

    case 'FETCH_SESSION_ATTR_MONITOR':
    var newState = Object.assign({},state)
    var data = action.payload.data.attrList;
    console.log("action.payload in reducer session--",data)
    
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
    console.log("data---",data)
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
      newState.attrValues = attrValues ;
      return newState;

  default :
    return state;

  }

}
