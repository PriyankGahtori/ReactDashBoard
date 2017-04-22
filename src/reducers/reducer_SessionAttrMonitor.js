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
    data.map(function(val){
        var value='';
        if(val.attrValues != null && val.attrValues.length != 0){
          val.attrValues.map(function(attrVal,index){
          if(index != (val.attrValues.length - 1)){
            value = value+attrVal.valName+",";
          }
          else{
            value = value+attrVal.valName ;
          }
      })
      //val["values"]= {"href":value};
       val["values"]= value
    }
      else{
        //if(val.attrType == 'specific')
        //    val["values"] = {"href":"Add Values"};
        // val["values"] = "Add Values";

        //else
            val["values"]= 'NA'
      }
    })
    return data;

}

//function to display only hdrNames on tableData

function getValNames(val){

    var value='';
        if(val.attrValues != null && val.attrValues.length != 0){
          val.attrValues.map(function(attrVal,index){
          if(index != (val.attrValues.length - 1)){
            value = value+attrVal.valName+",";
          }
          else{
            value = value+attrVal.valName ;
          }
      })
      val["values"]= value;
    }
      else{
        if(val.attrType == 'specific')
            val["values"]= 'NA'
      }
      return val;
}


export default function(state = initialState, action) {

  switch(action.type) {

    case 'FETCH_SESSION_ATTR_MONITOR':
    var newState = Object.assign({},state)
    newState.sessionType = action.payload.data.sessionType ;
     var data = [];
    if(action.payload.data.attrList != null){
      data = action.payload.data.attrList;
      //need to optimise code
       var data = modifyingData(data);
    }
     newState.tableData = data;
    return newState;

    case 'VAL_DATA':
    var newState = Object.assign({},state)
    newState.valData.push(action.payload);
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
//     data["values"]= {"href":value};
       data["values"]= value;
    }
    else{
        if(data.attrType == 'specific')
            // data["values"]= {"hrefAdd values"}
        //else
            data["values"]= 'NA'
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
      console.log(" newState.sessionAttrInitializeForm.sessAttrId--", newState.sessionAttrInitializeForm)
      newState.tableData.map(function(val){
        if(val.sessAttrId == newState.sessionAttrInitializeForm.sessAttrId){
          val.attrValues.push(action.payload.data)
        }
      })
      var data = modifyingData(newState.tableData);
      newState.tableData = data;
      return newState;

     case 'TOGGLE_EDIT_SESSION_ATTR':
      var newState = Object.assign({}, state);
      newState.openEditSessAttrMonDialog= !newState.openEditSessAttrMonDialog;
      console.log("newState---in reducer nsesionATrr",newState)
      return newState;

      case  'INITIALIZE_SESSION_ATTR':
        var newState = Object.assign({}, state);
        var data = action.payload;
        if(data.attrType == "specific"){
          data.specific = true
          data.complete = false
        }else if(data.attrType == "complete"){
          data.complete = true
          data.specific = false
        } 
        else{
          data.complete = true
          data.specific = true
        }
        newState.sessionAttrInitializeForm = action.payload;
      return newState;

      case  'EDIT_SESSION_ATTR':
        var newState = Object.assign({}, state);
         newState.tableData.map(function(val){
          if(val.sessAttrId == action.payload.data.sessAttrId)
          {
             val.attrName = action.payload.data.attrName;
             val.attrType = action.payload.data.attrType;
             if(action.payload.data.attrType == 'complete'){
               console.log("action.payload.data.attrType --",action.payload.data.attrType)
               val.values = "NA"
             }
          }
             return val;
         });  
      return newState;

      case 'DELETE_SESSION_ROWS':
        var newState = Object.assign({},state);
        console.log(" payload data -----> ",action.payload.data)
        newState.tableData  = newState.tableData.filter(function(value) {
        return action.payload.data.indexOf(Number(value.sessAttrId)) == -1;
      });
      return newState


      case 'DEL_ATTR_VALUES':
        var newState = Object.assign({},state);
        let data = action.payload.data;
        newState.tableData.map(function(val){
          if(val.sessAttrId == newState.sessionAttrInitializeForm.sessAttrId){
            val.attrValues = val.attrValues.filter(function(values){
              return  data.indexOf(values.specAttrValId) == -1
            })
           val = getValNames(val)
          }
          console.log("val------",val)
        })
        
        return newState

  default :
    return state;

  }

}
