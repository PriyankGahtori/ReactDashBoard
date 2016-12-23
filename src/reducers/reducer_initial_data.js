const initialState = {homeData:null,
                      trData:{trno:null,status:null,switch:false},
                      ns_wdir:null,
                      appId:null
                    
                    }
export default function(state = initialState, action) {

  switch(action.type) {
    case 'FETCH_INIT_DATA':
    var newState = Object.assign({}, state);
    let trStatus = action.payload.data.trData.status;
    newState=action.payload.data;
    newState.trData.switch = trStatus == null ? false : trStatus;
    return newState;

    case 'TOGGLE_TR_STATE':
    var newState = Object.assign({}, state);
    newState.trData.switch = !newState.trData.switch;
    return newState;

    case 'APP_ID':
    var newState = Object.assign({},state)
    newState.appId = action.payload;
    return newState ;

    case 'ADD_ROW_APPTABLE':
    var newState = Object.assign({},state)
    console.log("newState--in home initial data--",newState)
    console.log("in home initial data---",action.payload.data)
    var respData = action.payload.data ;
    var newApp = {'dcId' : respData.dcId,
                   'id'  : respData.id,
                   'name' : respData.appName
    }
    newState.homeData[0].value.push(newApp)
    return newState;


  }

  return state;
}