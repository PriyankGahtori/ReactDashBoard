import axios from 'axios';
import * as url from './restURL';

const ROOT_URL = '../data.json';
const ROOT_URL_TREE = '../treedata.json';

export const FETCH_INIT_DATA = 'FETCH_INIT_DATA';
export const FETCH_TREE_DATA = 'FETCH_TREE_DATA';

/*
*  Action Creators for fetching home Screen Data
*/

export function fetchInitData() {
  
  console.log("url.HOME_URL - ",url)
  const request = axios.get(url.HOME_SCREEN_URL);
  console.log("Action ajax.................",request);

  return {
    type: FETCH_INIT_DATA,
    payload:request
    //payload: [{"type":"Application","id":1,"value":["Nsecom","Kohls_Mobile","ATG","Stress_Pref1"]},{"type":"Profile","id":2,"value":["Nsecom","Kohls_Mobile","ATG","Stress_Pref1"]},{"type":"Topology","id":3,"value":["Nsecom","Kohls_Mobile","ATG","Stress_Pref1"]},{"type":"Setting","id":4,"value":["Nsecom","Kohls_Mobile","ATG","Stress_Pref1"]}]
  };
}

/*
*  fetching Json for tree
*/
export function fetchTreeData(appId) {
  console.log("inside fetchTreeData-----------------------------------",appId)
 //const URL =  `http://10.10.40.7:8050/configUI/custom/tree/application/${appId}`;
  const URL =  `${url.APP_TREE_URL}/${appId}`;

  console.log("URL - - ",URL)
  const request_tree = axios.get(URL);
  console.log("Action ajax...fetching trreeedataaa..............",request_tree);

  return {
    type: FETCH_TREE_DATA,
    payload:request_tree
    //payload: [{"type":"Application","id":1,"value":["Nsecom","Kohls_Mobile","ATG","Stress_Pref1"]},{"type":"Profile","id":2,"value":["Nsecom","Kohls_Mobile","ATG","Stress_Pref1"]},{"type":"Topology","id":3,"value":["Nsecom","Kohls_Mobile","ATG","Stress_Pref1"]},{"type":"Setting","id":4,"value":["Nsecom","Kohls_Mobile","ATG","Stress_Pref1"]}]
  };
}

export function fetchDCTableData(appId){

  console.log("appId-----",appId)
  //const URLTable = `http://10.10.40.7:8050/configUI/application/${appId}/dcDetails`;
  const URL = `${url.DC_TABLE_DATA_URL}/${appId}/dcDetails`;
  const request_table = axios.get(URL);
  console.log("request_table----",request_table)
  return {
    type   :'FETCH_TABLE_DATA',
    payload: request_table
  };
}
/*
*  URL For adding- `http://10.10.40.7:8050/configUI/custom/dcdetail/${appId}`
*        editing -http://10.10.40.7:8050/configUI/custom/dcdetail/appId/dcId
*   ie for POST / PUT method 
        url should be : http://10.10.40.7:8050/configUI/custom/dcdetail/
      and for get 
      url :
                  http://10.10.40.7:8050/configUI/dcdetail
*/

export function addRowDCTable(formData,openDCDialogType,appId){
  console.log("appId",appId)
 console.log("add_Row_table--action called--",formData)
 console.log("openDCDialogType----",openDCDialogType);
  //when action is called from updating form
  if(openDCDialogType == "edit"){

   console.log("edit flag")
   var response = axios({
    method:'put',
     url : `${url.ADD_ROW_DC_URL}/${appId}/${formData.id}`,
  //  url:  `http://10.10.40.7:8050/configUI/custom/dcdetail/${appId}/${formData._links.self.href}`,
    data: formData,
    headers:{'Content-Type':'application/json'}
  });

   console.log("response",response)
      return {
        type: 'DCTABLE_UPDATE_ROW_UPDATE_TREE',
        payload: response
      };
  }
 else{
//action called for adding new DC
  var response = axios({
    method:'post',
   // url: `http://10.10.40.7:8050/configUI/custom/dcdetail/${appId}`,
     url : `${url.ADD_ROW_DC_URL}/${appId}`,
    data: formData,
    headers:{'Content-Type':'application/json'}
  });

  console.log("response",response)
  return {
    type: 'DCTABLE_ADD_ROW_UPDATE_TREE',
    payload: response
  };
}
}

export function delDCTableRow(selectedRowKeys){

  console.log("selectedRowKeys----",selectedRowKeys)
  selectedRowKeys.forEach(value => 
    {
     console.log("value--",value)
     axios({
        method: 'delete',
        url : `${url.DEL_ROW_DC_URL}/${value}`
     //   url   : `http://10.10.40.7:8050/configUI/dcdetail/${value}`  //url-{value=dcId acting as a primary key}
        });
})
  
  return{
    type:'DCTABLE_DEL_ROW_UPDATE_TREE',
    payload:selectedRowKeys
  }
}

export function updateTreeNode(data) {
  console.log("Heloo... from update node.... ");
  return {
    type: 'UPDATE_TREE_DATA',
    payload:data
  }
}

export function toggleStateDialogNewDC(){
  console.log("action triggered--toggling----for new add dc")
  return {
    type:'TOGGLE_STATE_ADD_NEW_DC'
  }
}

/*
 * Initializes value of Dialog box's form field
 *    type :  add ( state is set to null) 
 *            edit( state assigned to selected row )          
*/

export function dcDetailInitializeForm(data,openDCDialogType,appId){
  console.log("updateformInitialValue",data )
  console.log("flag---",openDCDialogType)
  console.log("appId",appId)
  var payload={ "data":data,"openDCDialogType":openDCDialogType,"appId":appId};

  return {
    type:'UPDATE_FORM',
    payload:payload
  }
}

/*
* <----------------ActionCreators for ApplicationDetail Screen ---------------------->
*
*/

export function toggleStateDialogNewApp(){
  console.log("action triggered---for new add app")
  return {
    type:'TOGGLE_STATE_NEW_APP'

  }
}

export function fetchAppTableData(){
//  const URLTable =  "http://10.10.40.7:8050/configUI/application";
  const URLTable =  `${url.FETCH_APP_TABLE_DATA}`;
  const request_table = axios.get(URLTable);
  console.log("request_table",request_table)

  return {
    type: 'FETCH_APP_TABLE_DATA',
    payload: request_table
  };
}

export function delAppTableRow(selectedRowKeys){

  console.log("selectedRowKeys----",selectedRowKeys)
  selectedRowKeys.forEach(value => 
    {
     console.log("value--",value)
     axios({
        method : 'delete',
         url : `${url.DEL_ROW_APP_URL}/${value}`
       // url : `http://10.10.40.7:8050/configUI/application/${value}`
        });
})
console.log()  
  return{
    type:'DEL_APPTABLE_ROW',
    payload:selectedRowKeys
  }
}

export function addRowApplicationTable(formData,openAppDialogType){
 console.log("add_Row_table--action called--",formData)
 console.log("openAppDialogType----",openAppDialogType);
  //when action is called from updating form
  if(openAppDialogType == "edit"){

   console.log("edit flag")
   var response = axios({
    method:'put',
    //url: `http://10.10.40.7:8050/configUI/custom/application/${formData._links.self.href}`,
    url : `${url.ADD_ROW_APP_URL}/${formData.id}`,
    data: formData,
    headers:{'Content-Type':'application/json'}
  });

   console.log("response",response)
      return {
        type: 'UPDATE_ROW_APPTABLE',
        payload: response
      };
  }
 else{
//action called for adding new DC
  var response = axios({
    method:'post',
    //url: 'http://10.10.40.7:8050/configUI/custom/application',
     url : `${url.ADD_ROW_APP_URL}`,
    data: formData,
    headers:{'Content-Type':'application/json'}
  });
  

  console.log("response",response)
  return {
    type: 'ADD_ROW_APPTABLE',
    payload: response
  };
}

}
/*
*Initializes value of ApplicationDetail Screen Dialog box's form field
 *    type :  add ( state is set to null) 
 *            edit( state assigned to selected row )   
*/
export function appDetailInitializeForm(data,openAppDialogType){
  console.log("openAppDialogType",data )
  console.log("flag---",openAppDialogType)
  var payload={ "data":data,"openAppDialogType":openAppDialogType};

  return {
    type:'UPDATE_APP_FORM',
    payload:payload
  }
}

/*
*   Action Creators for Topology Screen
*   
*

*/

// fetching data for the table Topology screens loads
export function fetchTopologyTableData(dcId){
  console.log("fetchTopologyTableData action called");
  const URL =  `${url.FETCH_TOPO_TABLE_URL}/${dcId}`;
  //const URLTable =  `http://10.10.40.7:8050/configUI/custom/topology/${dcId}`;
  const request_table = axios.get(URL);
  console.log("request_table in fetching topotable",request_table)

  return {
    type: 'FETCH_TOPOlOGYTABLE_DATA',
    payload:request_table
  };
}

export function fetchTopologyTreeData(parentDCNode){

  console.log("in post request for fetchtreetopodata")
   var response = axios({
    method:'post',
    url : `${url.FETCH_TOPO_TREE_URL}/${parentDCNode.id}`,
    //url:   `http://10.10.40.7:8050/configUI/custom/tree/topology/${parentDCNode.id}`,
    data: parentDCNode,
    headers:{'Content-Type':'application/json'}
  });

console.log("in activetopologydata--response---",response)
  return {
    type:'FETCH_ACTIVE_TOPOLOGY',
    payload:response
  }
}

//Topology Screen
export function toggleStateDialogNewTopo(){
  console.log("action triggered---for new topology")
  return {
    type:'TOGGLE_STATE_ADD_NEW_TOPO'

  }
}

export function toggleStateDialogEditTopo(){
  console.log("action triggered---for new topology")
  return {
    type:'TOGGLE_STATE_EDIT_TOPO'

  }
}

/*
 * Initializes value of Dialog box's form field
 *    type :  add ( state is set to null) 
 *            edit( state assigned to selected row )          
*/

export function topoInitializeForm(data,dcId){
 
  console.log("dcTopoId--",data)
  var payload={ "data":data,"dcId":dcId};

  return {
    type:'UPDATE_TOPO_FORM',
    payload:payload
  }
}

//called on submitting edit profile to topology form
export function attachProfToTopology(data){
  
 var response = axios({
        method: 'GET',
        url : `${url.ATTACH_PROFTO_TOPO}/${data.dcTopoId}/${data.profileId}`,

        }); 
 return{
  type:'ATTACH_PROFTO_TOPO',
  payload:response
 }
}

export function addRowTopoTable(data,dcId){
  console.log("addRowTopoTable function called--",data)
   var response = axios({
    method:'post',
   
     url : `${url.ADD_ROW_TOPOLOGY_URL}/${dcId}`,
    data: data,
    headers:{'Content-Type':'application/json'}
  });

  console.log("response",response)
  return {
    type: 'TOPOLOGY_ADD_ROW',
    payload: response
  };


}
/*
* Action creators for TopologyDetail Screen
*
*/

export function fetchTopoDetailTable(){
  console.log("fetch topo detail action called")
  //const URLTable =  "http://10.10.40.7:8050/configUI/topology";
  const URLTable = `${url.FETCH_ALL_TOPODATA}`; 
  const request_table = axios.get(URLTable);
  console.log("request_table",request_table)

  return {
    type: 'FETCH_TOPODETAIL_TABLE_DATA',
    payload: request_table
  };


}

/*
* Action creators for toggling topology 
*/

export function updateToggleStateTopology(rowToggled){
  console.log("in actions---",rowToggled)
   var response = axios({
        method: 'put',
        url : `${url.TOGGLE_STATE_TOPOLOGY}/${rowToggled.dcTopoId}/${rowToggled.topoState}`,

 });
   console.log("response og toggling toggle button---",response)

   return {
    type : 'TOGGLE_STATE',
    payload : response
  }
}



/**
  * function used for the deletion of row for the topology table
*/
export function delTopoTableRow(selectedRowKeys){

  console.log("selectedRowKeys REDUCER----",selectedRowKeys)
  selectedRowKeys.forEach(value => 
    {
     console.log("value--",value)
     axios({
        method: 'delete',
        url : `${url.DEL_TOPO_ROW_URL}/${value}`,
        //url   : `http://10.10.40.7:8050/configUI/dctopoassociation/${value}`  //url-{value=dcId acting as a primary key}
        });
})
  
  return{
    type:'TOPOTABLE_DEL_ROW_UPDATE_TREE',
    payload:selectedRowKeys
  }
}


/*
* uppdating state of topo aftr toggling the toggle button for topo table
*/

export function updateStateofTableData(row){
  

  console.log("updateStateofTableData");
  const URL =  `${url.FETCH_SERVER_TABLE_URL}/${tierId}/server`;
  //const URLTable =  `http://10.10.40.7:8050/configUI/custom/topology/${dcId}`;
  const request_table = axios.get(URL);
  console.log("request_table in fetching topotable",request_table)

  return {
    type: '',
    payload:request_table
  };
}

/*
*
*  ActionCreators for ProfileDetail
*
*/

export function fetchProfileDetailData(){
  console.log("fetch topo detail action called")
  const URLTable =  `${url.FETCH_PROFILE_TABLEDATA}`;
  const request_table = axios.get(URLTable);
  console.log("request_table",request_table)

  return {
    type: 'FETCH_PROFILEDETAIL_TABLEDATA',
    payload: request_table
  };
}

export function toggleStateDialogNewProfile(){
  console.log(" in actions------------->profile" )
  return{
    type:'TOGGLE_STATE_NEW_PROFILE'
  }
}

export function delProfileTableRow(selectedRowKeys){
  console.log(" in delete row function ------------------------> ",selectedRowKeys)
   selectedRowKeys.forEach(value => 
    {
     console.log(" value in action---------------> ",value)
     console.log(" selectedRowKeys------------------>",selectedRowKeys)
     axios({
        method : 'delete',
        url : `${url.UPDATE_PROFILE_TABLE}/${value}`,
   });
})
  
  return {
    type: 'DELETE_PROFILE_ROW',
    payload: selectedRowKeys
  }
}

export function profileInitializeForm(data,type)
{
  console.log("in profileDetailInitializeForm-------data----->",data)
  console.log("in profileDetailInitializeForm--type---------->",type)
  var profileData = {"data":data,"openProfileDialogType":type};
  return {
     type    : 'UPDATE_PROFILE',
     payload :profileData
  }
}

export function addRowProfileTable(data,type)
{
  console.log(" in actions profile----------------data--------->",data)
  console.log(" in actions profile----------------type--------->",type)
   if(type =="edit")
   {
        console.log("type is edit--------------------------->")
        var response = axios({
        method:'put',
        url : `${url.UPDATE_PROFILE_TABLE}/${data.id}`,
        data: data
      });
    console.log("  edit data when -submit is clicked-->",response)

    return{
      type: 'EDIT_PROFILE',
      payload: response
    }
      
  }
 
   else{
   console.log("adding console triggered-------------->")   
    var response = axios({
    method:'post',
    url : `${url.UPDATE_PROFILE_TABLE}`,
    data: data,
  
  });
  console.log(" response------------------->",response)
  return{
    type: 'ADD_PROFILE',
    payload: response
  }
 }
}

/*
* Action creators for adding Tier node to parent Topo node
*/
export function fetchTierTreeData(parentTopologyNode){
  console.log("in post request for fetchtreetopodata---",parentTopologyNode)
   var response = axios({
    method:'post',
   // url: `http://10.10.40.74:8090/configUI/custom/tree/tier/${parentTopologyNode.id}`,
    url :  `${url.FETCH_TIER_TREE_URL}/${parentTopologyNode.id}`,
    data: parentTopologyNode,
    headers:{'Content-Type':'application/json'}
  });

console.log("in activetopologydata--response---",response)
  return {
    type:'FETCH_TIER_NODE',
    payload:response
  }

}

export function fetchTierTableData(topoId,topology){
  console.log("fetchTierTableData action called-topology-",topology);
 
  
  var response = axios({
    method:'post',
    url :   `${url.FETCH_TIER_TABLE_URL}/${topoId}`,
    data: topology,
    headers:{'Content-Type':'application/json'}
  
  });
 
  console.log("request_table in fetching topotable",response)
  return {
    type: 'FETCH_TIER_TABLE_DATA',
    payload:response
  };

}


export function tierInitializeForm(data,topoId){
 
  console.log("tier data--",data)
  //var payload={ "data":data};

  return {
    type:'UPDATE_TIER_FORM',
    payload: data
  }
}

export function toggleStateDialogTier(){
  return {
    type:'TOGGLE_STATE_TIER_DIALOG'

  }

}

export function attachProfToTier(data){
  console.log("darta--",data)
   
  const response = axios.get(`${url.ATTACH_PROFTO_TIER}/${data.tierId}/${data.profileId}`);

    return {
    type: 'ATTACH_PROFTO_TIER',
    payload:response
    }
}



/*
action creators for server
*/

export function fetchServerTreeData(parentTierNode){
  console.log("fetchServerTreeData")
   console.log("in post request for fetchtreetopodata")
   var response = axios({
    method:'post',
   // url: `http://10.10.40.74:8090/configUI/custom/tree/tier/${parentTopologyNode.id}`,
    url :  `${url.FETCH_SERVER_TREE_URL}/${parentTierNode.id}`,
    data: parentTierNode,
    headers:{'Content-Type':'application/json'}
  });

console.log("in activetopologydata--response---",response)
  return {
    type:'FETCH_SERVER_NODE',
    payload:response
  }


}


export function fetchServerTableData(tierId,tier){

  console.log("fetchTierTableData action called---",tier);
  const URL =  `${url.FETCH_SERVER_TABLE_URL}/${tierId}`;
  //const URLTable =  `http://10.10.40.7:8050/configUI/custom/topology/${dcId}`;
 
  
  var response = axios({
    method:'post',
    url : `${url.FETCH_SERVER_TABLE_URL}/${tierId}`,
    data: tier,
    headers:{'Content-Type':'application/json'}
  
  });
 
 console.log("fetching srver---",response)
  return {
    type: 'FETCH_SERVER_TABLE_DATA',
    payload:response
  };

}

export function serverInitializeForm(data){
 
  console.log("tier data--",data)
  //var payload={ "data":data};

  return {
    type:'UPDATE_SERVER_FORM',
    payload: data
  }
}

export function toggleStateDialogServer(){
  return {
    type:'TOGGLE_STATE_SERVER_DIALOG'

  }

}

export function attachProfToServer(data){
  console.log("darta- i  server-",data)
   
  const response = axios.get(`${url.ATTACH_PROFTO_SERVER}/${data.serverId}/${data.profileId}`);

    return {
    type: 'ATTACH_PROFTO_SERVER',
    payload:response
    }
}

/*
  Action creators for Instance screen
*/

export function fetchInstanceTableData(serverId,server){
  console.log("fetchInstanceTableData action called");

  /*const URL =  `${url.FETCH_INSTANCE_TABLE_URL}/${serverId}/instance`;
  const response = axios.get(URL);
  console.log("request_table in fetching topotable",response)
*/

  console.log("fetchTierTableData action called---",server);
 
  //const URLTable =  `http://10.10.40.7:8050/configUI/custom/topology/${dcId}`;
 
  var response = axios({
    method:'post',
    url : `${url.FETCH_INSTANCE_TABLE_URL}/${serverId}`,
    data: server,
    headers:{'Content-Type':'application/json'}
  
  });

  return {
    type: 'FETCH_INSTANCE_TABLE_DATA',
    payload:response
  };
}

export function fetchInstanceTreeData(parentTierNode){
   console.log("in post request for fetchtreetopodata")
   var response = axios({
    method:'post',
    url :  `${url.FETCH_INSTANCE_TREE_URL}/${parentTierNode.id}`,
    data: parentTierNode,
    headers:{'Content-Type':'application/json'}
  });

console.log("in activetopologydata--response---",response)
  return {
    type:'FETCH_INSTANCE_NODE',
    payload:response
  }


}

export function instanceInitializeForm(data){
   console.log("instance data--",data)
  //var payload={ "data":data};

  return {
    type:'UPDATE_INSTANCE_FORM',
    payload: data
  }

}

export function toggleStateDialogInstance(){
  return {
    type:'TOGGLE_STATE_INSTANCE_DIALOG'

  }

}

export function attachProfToInstance(data){
  console.log("darta- i  instance",data)
   
  const response = axios.get(`${url.ATTACH_PROFTO_INSTANCE}/${data.instanceId}/${data.profileId}`);
  console.log("response---",response)
    return {
    type: 'ATTACH_PROFTO_INSTANCE',
    payload:response
    }
}
/*
* Action creators for service entry points
*
*/

export function fetchServiceEntryPointsTabledata(profileId){
  console.log("fetchServiceEntryPointsTabledata action triggere-----")
  const URL = `${url.FETCH_SERVICE_POINTS_TABLEDATA}/${profileId}`
  const request_table = axios.get(URL);
  console.log("request_table in fetching serviceentrypoints---",request_table)
  return {
    type:'FETCH_SERVICE_POINTS_TABLEDATA',
    payload:request_table
  }
}


export function toggleStateDialogNewServiceEntryPts(){
  console.log("action triggered--toggling----for new serviceentrypints")
  return {
    type:'TOGGLE_STATE_ADD_NEW_SERVICEENTRY_PTS'
  }
}

export function ListOfServiceEntryPointType(){
  console.log("action triggered---")
  const URL =`${url.FETCHING_SERVICE_ENTRYPOINTS_FORM}`
  const response = axios.get(URL);
  console.log("ListOfServiceEntryPointType----",response)
  return{
    type :'LIST_SERVICEENTRYPOINT_TYPE',
    payload:response
  }
}

export function ServiceEntryPointsOfSelectedEntryType(entryTypeId){

  console.log("ServiceEntryPointsOfSelectedEntryType action called----",entryTypeId)
  const URL =`${url.FETCHING_SERVICE_ENTRYPOINTS_FORM}/${entryTypeId}/serviceEntryPoint`
  const response = axios.get(URL);
  console.log("respose of getting sep od entrytypeid--",response)
  
  return {
    type:'FETCHING_SERVICE_ENTRYPOINTS_FORM',
    payload:response
  }
}

export function addServiceEntryPoint(formData,profileId){

  console.log("addServiceEntryPoint------in actions--",formData)
  console.log("profileId----",profileId)
   var response = axios({
    method:'post',
     url : `${url.ADD_NEW_SERVICE_ENTRY_POINTS}/${profileId}`,
    data: formData,
    headers:{'Content-Type':'application/json'}
  });

console.log("response----adding sepss---",response)
  return {
    type : 'ADD_NEW_SEP',
    payload : response
  }
  
}
export function delSepRow(selectedRowKeys){

   selectedRowKeys.forEach(value=>{
    axios({
       method: 'delete',
       url : `${url.DEL_SERVICE_ENTRY_POINTS}/${value}`,
    })

   })
  return {
    type: "DELETE_SEP_ROW",
    payload: selectedRowKeys
  }


}

export function toggleGenerateFileDialog(){
  console.log("action triggered--toggling dialog generatimf sep")
  return {
    type:'TOGGLE_DIALOG_GENERATEFILE'
  }
}


/*
* Action creators for updating toggle button
*/
export function updateToggleState(rowToggled){
  console.log("in actions---",rowToggled)
   var response = axios({
        method: 'put',
        url : `${url.UPDATE_TOGGLE_PROFSEPASSOC}/${rowToggled.id}/${rowToggled.enabled}`,

        });
   console.log("response og toggling toggle button---",response)

   return {
    type : 'TOGGLE_STATE_SEP',
    payload : response
  }
}

/*
* Action creators for BT Global
*
*/
export function initializeBTFields(profileId){
  console.log("initializebt compo action called--",profileId)
  const URL = `${url.GET_BT}/${profileId}/bussinessTransGlobal`
  var response = axios.get(URL);
  console.log("response--",response)
  return {
    type    :'INITIALIZE_FIELDS',
    payload :response 
  }
}

export function addBTData(data,profileId){
  console.log("addBTData func called profileId",profileId)
  var response = axios({
    method : 'post',
    url    : `${url.ADD_BT}/${profileId}`,
    data   : data,
    headers: {'Content-Type':'application/json'}
  })

  console.log("response----",response)
  return{
    type:'ADD_BT_DATA',
    payload:response
  }
}

/*
* Action creators for backend detection screen
*/

export function fetchBackendTableData(profileId){
  console.log("fetchBackendTableData function called profileId---",profileId)
  var response = axios.get(`${url.FETCH_BACKEND_TABLEDATA}/${profileId}`);
  console.log("agtr getting backend data")
  return{
    type :'FETCH_BACKEND_TABLEDATA',
    payload :response
  }
}

export function fetchBackendTypes(){   
  var response = axios.get(`${url.FETCH_BACKEND_TYPES}`);  
  return{
    type :'FETCH_BACKEND_TYPES',
    payload :response
  }
}

export function fetchBackendPoints(backendId){   
  var response = axios.get(`${url.FETCH_BACKEND_TYPES}/${backendId}/backendPoints`);  
  return{
    type :'FETCH_BACKEND_POINTS',
    payload :response
  }
}


export function initializeBackendPtsEditForm(selectedRow){
  console.log("in initializeBackendPtsEditForm--",selectedRow)
 
  return{
    type :'INITIALIZE_BACKEND_FORM',
    payload :selectedRow
  }
}

export function addNewBackendPoint(data,profileId){
  var response = axios({
    method : 'post',
    url    : `${url.ADD_NEW_BACKEND_POINT}/${profileId}`,
    data   : data,
    headers: {'Content-Type':'application/json'}
  });
  return{
    type : 'ADD_NEW_BACKEND_POINT',
    payload : response
  }
}




/*
* BTpattern screen
*/

/*=======
>>>>>>> a8c5c839ac424d7b651162db045ff45a0e21ece2*/
/* Action creators for Bussiness Transaction pattern screen*/

export function ListOfGroupNames(){
  console.log("action triggered- fetchListOfGroupNames --")
  const URL =`${url.FETCH_LIST_GROUP_NAMES_FORM}`
  const response = axios.get(URL);
  console.log("ListOf group names----",response)
  return{
    type :'LIST_GROUP_NAMES',
    payload:response
  }
}

export function fetchBTPatternTableData(profileId){
  console.log("fetchBTPatternTabledata action triggere-----")

  const URL = `${url.FETCH_BT_PATTERN_TABLEDATA}/${profileId}`
  const request_table = axios.get(URL);
  console.log("request_table in fetching bt pattern---",request_table)
  return {
    type:'FETCH_BT_PATTERN_TABLEDATA',
    payload:request_table
  }
}

export function addBTPatternData(formData,profileId,groupId){

  console.log("addBTPatternData------in actions--",formData)
  console.log("profileId----",profileId)
  console.log("groupId----",groupId)
   var response = axios({
    method:'post',
     url : `${url.ADD_NEW_BT_PATTERN_DETAILS}/${profileId}/${groupId}`,
    data: formData,
    headers:{'Content-Type':'application/json'}
  });

console.log("response----adding addBTPatternData---",response)
  return {
    type : 'ADD_NEW_BT_PATTERN',
    payload : response
  }
}

export function toggleStateAddBTPattern(){
  console.log("action triggered--toggling----for new bt pattern")
  return {
    type:'TOGGLE_STATE_ADD_BT_PATTERN'
  }
}

export function addBTGroupData(formData,profileId){

  console.log("addBTPatternData------in actions--",formData.chkNewGroup)
  console.log("profileId----",profileId)

  if(formData.chkNewGroup == true)
  {
      var response = axios({
      method:'post',
       url : `${url.ADD_NEW_BT_GROUP_DETAILS}/${profileId}`,
      data: formData,
      headers:{'Content-Type':'application/json'}
    });
    return {
      type : 'ADD_NEW_BT_GROUP',
      payload : response
    }
  }
  else

  {
     const URL = `${url.FETCH_BT_PATTERN_TABLEDATA}/${profileId}/${formData.id}`
     const request_table = axios.get(URL);

    return {
      type : 'SELECTED_BT_GROUP',
      payload:request_table,
      meta:formData
    }
  }   

 }

 /*
  * Action creators for General keywords screen
 */
export function getKeywordsData(profileId){

  const response = axios.get(`${url.GET_KEYWORDS_DATA}/${profileId}`)
  console.log("response---",response)

  return{
    type : 'GET_ALL_KEYWORDS',
    payload : response
  }
}

export function submitKeywordData(data,profileId){
  console.log("data----",data)
   var response = axios({
      method:'post',
       url : `${url.UPDATE_KEYWORDS_DATA}/${profileId}`,
      data: data,
      headers:{'Content-Type':'application/json'}
    });
   return{
    type : 'UPDATE_KEYWORDS_DATA',
    payload : response
   }
}