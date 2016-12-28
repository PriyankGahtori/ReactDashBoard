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
    newState.homeData=action.payload.data.homeData;
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
    var respData = action.payload.data ;
    var newApp = {'dcId' : respData.dcId,
                   'id'  : respData.id,
                   'name' : respData.appName
    }
    newState.homeData[0].value.push(newApp)
    return newState;

    case 'UPDATE_TOPOLOGY':
    var newState = Object.assign({}, state);
    let topo = {id:2, type:"Topology", value: action.payload}
    let newData = [{id:0, type:"Application", value: newState.homeData[0].value },{id:1, type:"Profile", value: newState.homeData[1].value},{id:2, type:"Topology", value: action.payload.data}];
    newState.homeData = newData;
    return newState;

    case 'CLEAR_TREE_STATE':
    var newState =  Object.assign({}, state);
    newState.appId = -1 ;
    return newState;

  }
  return state;
}