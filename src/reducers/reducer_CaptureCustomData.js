const initialState = { openDialog    :false,
                        stepperData :[],
                        openStepperDialog:false,
                        methodBasedCapturingAdd:{},
                        httpReqCapturingBasedAdd:{}
                       

}
export default function(state = initialState, action) {
  switch(action.type) {
  case 'TOGGLE_LISTOFCAPTUREMETHODS_DIALOG':
  	var newState     = Object.assign({}, state);
    newState.openDialog = !newState.openDialog ;
    console.log("newState in--",newState)
    return newState;

    case 'LIST_METHODS_CONFIGURE':
    var newState   = Object.assign({}, state);
    console.log("acion.payload---",action.payload)
    var data = action.payload ;

    /*sorting arr on the basid of thei ids as[{id:0},{id:1}] as per requirement of logic applied in Dialog_stepper 
    for finding next active or selected element */

    data.sort(function(a, b){
        return a.id-b.id
    })
     console.log("data---",data)
    newState.stepperData = data;
    newState.openStepperDialog = !newState.openStepperDialog
    console.log("newState.openStepperDialog--",newState)
    return newState;

    case 'TOGGLE_DIALOG_STEPPER':
     var newState   = Object.assign({}, state);
     newState.openStepperDialog = !newState.openStepperDialog
     return newState;

     case 'ADD_DATA_METHODBASED':
      var newState   = Object.assign({}, state);
      console.log("action.payloaff---",action.payload)
      newState.methodBasedCapturingAdd = action.payload
      return newState;

      case 'CLEAR_STEPPER_DATA':
      var newState   = Object.assign({}, state);
      newState.stepperData = [{},{},{}];
      return newState;

      case 'ADD_DATA_HTTPREQBASED':
       var newState   = Object.assign({}, state);
       console.log("action.payload----",action.payload)
       newState.httpReqCapturingBasedAdd = action.payload
       return newState ;


  }
  return state;
}