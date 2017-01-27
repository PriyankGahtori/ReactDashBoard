import axios from 'axios';
import * as url from './restURL';

const ROOT_URL = '../data.json';
const ROOT_URL_TREE = '../treedata.json';

export const FETCH_INIT_DATA = 'FETCH_INIT_DATA';
export const FETCH_TREE_DATA = 'FETCH_TREE_DATA';

/*
*  Action Creators for fetching home Screen Data
*/

export function fetchInitData(loader) {

  const response = axios.get(url.HOME_SCREEN_URL);
//trigger action for loading progressBar change once promise is resolved
 response.then(function(data){
  loader();
});


return {
  type: FETCH_INIT_DATA,
  payload:response
  };
}

/*
*  fetching Json for tree
*/
export function fetchTreeData(appId) {
 //const URL =  `http://10.10.40.7:8050/configUI/custom/tree/application/${appId}`;
 const URL =  `${url.APP_TREE_URL}/${appId}`;
 const request_tree = axios.get(URL);

 return {
  type: FETCH_TREE_DATA,
  payload:request_tree
    //payload: [{"type":"Application","id":1,"value":["Nsecom","Kohls_Mobile","ATG","Stress_Pref1"]},{"type":"Profile","id":2,"value":["Nsecom","Kohls_Mobile","ATG","Stress_Pref1"]},{"type":"Topology","id":3,"value":["Nsecom","Kohls_Mobile","ATG","Stress_Pref1"]},{"type":"Setting","id":4,"value":["Nsecom","Kohls_Mobile","ATG","Stress_Pref1"]}]
  };
}

export function fetchDCTableData(appId){

  //const URLTable = `http://10.10.40.7:8050/configUI/application/${appId}/dcDetails`;
  const URL = `${url.DC_TABLE_DATA_URL}/${appId}/dcDetails`;
  const request_table = axios.get(URL);
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
  return {
    type:'TOGGLE_STATE_NEW_APP'

  }
}

export function fetchAppTableData(appLoader){
//  const URLTable =  "http://10.10.40.7:8050/configUI/application";
const URLTable =  `${url.FETCH_APP_TABLE_DATA}`;
const request_table = axios.get(URLTable);
request_table.then(function(data){
  appLoader();
})
return {
  type: 'FETCH_APP_TABLE_DATA',
  payload: request_table
};
}

export function delAppTableRow(selectedRowData){
  var response = axios({
      method:'post',
   // url: `http://10.10.40.7:8050/configUI/custom/dcdetail/${appId}`,
      url : `${url.DEL_ROW_APP_URL}`,
      data: selectedRowData,
      headers:{'Content-Type':'application/json'}
 });

 return{
    type    :'DEL_APPTABLE_ROW',
    payload :response
  }
}

export function addRowApplicationTable(formData,openAppDialogType){

  //when action is called from updating form
  if(openAppDialogType == "edit"){

   var response = axios({
    method:'put',
    //url: `http://10.10.40.7:8050/configUI/custom/application/${formData._links.self.href}`,
    url : `${url.ADD_ROW_APP_URL}/${formData.appId}`,
    data: formData,
    headers:{'Content-Type':'application/json'}
  });

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

  var payload={ "data":data,"openAppDialogType":openAppDialogType};
  return {
    type    :'UPDATE_APP_FORM',
    payload :payload
  }
}

/*
*   Action Creators for Topology Screen
*   
*/

// fetching data for the table Topology screens loads
export function fetchTopologyTableData(dcId,loader){

  const URL =  `${url.FETCH_TOPO_TABLE_URL}/${dcId}`;
  const response = axios.get(URL);

//trigger action for loading progressBar change once promise is resolved
response.then(function(data){
  loader();
});

return {
  type: 'FETCH_TOPOlOGYTABLE_DATA',
  payload:response
};
}

export function fetchTopologyTreeData(parentDCNode){

  var response = axios({
    method:'post',
    url : `${url.FETCH_TOPO_TREE_URL}/${parentDCNode.id}`,
    //url:   `http://10.10.40.7:8050/configUI/custom/tree/topology/${parentDCNode.id}`,
    data: parentDCNode,
    headers:{'Content-Type':'application/json'}
  });

  return {
    type:'FETCH_ACTIVE_TOPOLOGY',
    payload:response
  }
}

//Topology Screen
export function toggleStateDialogNewTopo(){
  return {
    type:'TOGGLE_STATE_ADD_NEW_TOPO'

  }
}

export function toggleStateDialogEditTopo(){
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

  var response = axios({
    method:'post',
    url : `${url.ADD_ROW_TOPOLOGY_URL}/${dcId}`,
    data: data,
    headers:{'Content-Type':'application/json'}
  });
  return {
    type: 'TOPOLOGY_ADD_ROW',
    payload: response
  };
}
/*
* Action creators for TopologyDetail Screen
*
*/

export function fetchTopoDetailTable(loader){
  //const URLTable =  "http://10.1p0.40.7:8050/configUI/topology";
  const URLTable = `${url.FETCH_ALL_TOPODATA}`; 
  const request_table = axios.get(URLTable);
  request_table.then(function(data){
    loader();
  })
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

  return {
    type : 'TOGGLE_STATE',
    payload : response
  }
}



/**
  * function used for the deletion of row for the topology table
  */
  export function delTopoTableRow(selectedRowKeys){

    selectedRowKeys.forEach(value => 
    {
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

  const URL =  `${url.FETCH_SERVER_TABLE_URL}/${tierId}/server`;
  //const URLTable =  `http://10.10.40.7:8050/configUI/custom/topology/${dcId}`;
  const request_table = axios.get(URL);
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

export function fetchProfileDetailData(loader){

  const URLTable =  `${url.FETCH_PROFILE_TABLEDATA}`;
  const request_table = axios.get(URLTable);
  request_table.then(function(data){
    loader();
  })
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
   axios({
    method : 'delete',
    url : `${url.DELETE_PROFILE_TABLE}/${value}`,
  });
 })
  
  return {
    type: 'DELETE_PROFILE_ROW',
    payload: selectedRowKeys
  }
}

export function profileInitializeForm(data,type)
{
  var profileData = {"data":data,"openProfileDialogType":type};
  return {
   type    : 'UPDATE_PROFILE',
   payload :profileData
 }
}

export function addRowProfileTable(data,type)
{
 if(type =="edit")
 {
  var response = axios({
    method:'put',
    url : `${url.UPDATE_PROFILE_TABLE}/${data.id}`,
    data: data
  });
  return{
    type: 'EDIT_PROFILE',
    payload: response
  }
}
else{
  var response = axios({
    method:'post',
    url : `${url.UPDATE_PROFILE_TABLE}`,
    data: data,
  });
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

export function fetchTierTableData(topoId,topology,loader){
  console.log("fetchTierTableData action called-topology-",topology);

  
  var response = axios({
    method:'post',
    url :   `${url.FETCH_TIER_TABLE_URL}/${topoId}`,
    data: topology,
    headers:{'Content-Type':'application/json'}

  });

//trigger action for loading progressBar change once promise is resolved
response.then(function(data){
  console.log("calling log function")
  loader();
});

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


export function fetchServerTableData(tierId,tier,loader){

  const URL =  `${url.FETCH_SERVER_TABLE_URL}/${tierId}`;
  
  var response = axios({
    method:'post',
    url : `${url.FETCH_SERVER_TABLE_URL}/${tierId}`,
    data: tier,
    headers:{'Content-Type':'application/json'}

  });

 //trigger action for loading progressBar change once promise is resolved
 response.then(function(data){
  loader();
});

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

  export function fetchInstanceTableData(serverId,server,loader){

    var response = axios({
      method:'post',
      url : `${url.FETCH_INSTANCE_TABLE_URL}/${serverId}`,
      data: server,
      headers:{'Content-Type':'application/json'}

    });

//trigger action for loading progressBar change once promise is resolved
response.then(function(data){
  loader();
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

  const response = axios.get(`${url.ATTACH_PROFTO_INSTANCE}/${data.instanceId}/${data.profileId}`);
  return {
    type: 'ATTACH_PROFTO_INSTANCE',
    payload:response
  }
}

export function updateInstanceEnabled(row,runTimeChange){
   var response = axios({
    method: 'put',
    url : `${url.TOGGLED_INSTANCE_STATE}/${row.instanceId}/${row.enabled}`,

  });
   //trigger callback function for runtime change, when promise resolves
   response.then(function(data){    
    runTimeChange();
  });

   return {
    type : 'TOGGLE_STATE_INSTANCE',
    payload : response
  }

}

/*
* Action creators for service entry points
*
*/

export function fetchServiceEntryPointsTabledata(profileId,loader){
  const URL = `${url.FETCH_SERVICE_POINTS_TABLEDATA}/${profileId}`
  const request_table = axios.get(URL);
  request_table.then(function(){

   loader();
 });
  return {
    type:'FETCH_SERVICE_POINTS_TABLEDATA',
    payload:request_table
  }
}


export function toggleStateDialogNewServiceEntryPts(){
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

  const URL =`${url.FETCHING_SERVICE_ENTRYPOINTS_FORM}/${entryTypeId}/serviceEntryPoint`
  const response = axios.get(URL);
  console.log("respose of getting sep od entrytypeid--",response)
  
  return {
    type:'FETCHING_SERVICE_ENTRYPOINTS_FORM',
    payload:response
  }
}

export function addServiceEntryPoint(formData,profileId,runTimeChange){

 var response = axios({
  method:'post',
  url : `${url.ADD_NEW_SERVICE_ENTRY_POINTS}/${profileId}`,
  data: formData,
  headers:{'Content-Type':'application/json'}
});

 //trigger runtime change once promise is resolved
 response.then(function(data){
  runTimeChange();
});

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
export function updateToggleState(rowToggled,runTimeChange){
  console.log("in actions---",rowToggled)
  var response = axios({
    method: 'put',
    url : `${url.UPDATE_TOGGLE_PROFSEPASSOC}/${rowToggled.id}/${rowToggled.enabled}`,

  });
   //trigger callback function for runtime change, when promise resolves
   response.then(function(data){    
    runTimeChange();
  });

   return {
    type : 'TOGGLE_STATE_SEP',
    payload : response
  }
}

/*
* Action creators for BT Global
*
*/
export function initializeBTFields(profileId,loader){
  const URL = `${url.GET_BT}/${profileId}/bussinessTransGlobal`
  var response = axios.get(URL);
  response.then(function(){
    loader();
  })
  return {
    type    :'INITIALIZE_FIELDS',
    payload :response 
  }
}


export function addBTData(data,profileId,submitLoader){

  var response = axios({
    method : 'post',
    url    : `${url.ADD_BT}/${profileId}`,
    data   : data,
    headers: {'Content-Type':'application/json'}
  })
   response.then(function(){
    submitLoader();
   })
  return{
    type:'ADD_BT_DATA',
    payload:response
  }
}

/*
* Action creators for backend detection screen
*/

export function fetchBackendTableData(profileId,loader){
  var response = axios.get(`${url.FETCH_BACKEND_TABLEDATA}/${profileId}`);
  response.then(function(){
    loader()
  })
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

  return{
    type :'INITIALIZE_BACKEND_FORM',
    payload :selectedRow
  }
}

export function addNewBackendPoint(data,profileId,runTimeChange){
  var response = axios({
    method : 'post',
    url    : `${url.ADD_NEW_BACKEND_POINT}/${profileId}`,
    data   : data,
    headers: {'Content-Type':'application/json'}
  });

  //trigger callback function 'runTimeChange', when promise resolves
  response.then(function(data){
    runTimeChange();
  });

  return{
    type : 'ADD_NEW_BACKEND_POINT',
    payload : response
  }
}

export function updateBackendType(data,profileId,runTimeChange){
  var response = axios({
    method : 'post',
    //url    : `${url.UPDATE_BACKEND_POINT}/${data.backend_Type_id}/${profileId}`,
    url    : `${url.UPDATE_BACKEND_POINT}/${profileId}/${data.backendTypeId}`,
    data   : data,
    headers: {'Content-Type':'application/json'}
  });

  //trigger callback function 'runTimeChange', when promise resolves
  response.then(function(data){
    runTimeChange();
  });


  return{
    type : 'UPDATE_BACKEND_POINT',
    payload : response
  }
}



/*
* BTpattern screen
*/

/* Action creators for Bussiness Transaction pattern screen*/



export function fetchBTPatternTableData(profileId,loader){

  const URL = `${url.FETCH_BT_PATTERN_TABLEDATA}/${profileId}`
  const request_table = axios.get(URL);
  request_table.then(function(data){
    loader();
  })
  return {
    type:'FETCH_BT_PATTERN_TABLEDATA',
    payload:request_table
  }
}

export function addBTPatternData(formData,profileId,type){

if(type == 'edit'){
  var response = axios({
    method:'put',
    url: `${url.ADD_NEW_BT_PATTERN_DETAILS}/updateBTPattern/${profileId}/${formData.id}`,
    data: formData,
    headers:{'Content-Type':'application/json'}


  });
  return{
    type: 'UPDATE_BT_PATTERN',
    payload: response,
 
  }

}
else{
   var response = axios({
    method:'post',
    url : `${url.ADD_NEW_BT_PATTERN_DETAILS}/${profileId}`,
    data: formData,
    headers:{'Content-Type':'application/json'}
  });

   return {
    type : 'ADD_NEW_BT_PATTERN',
    payload : response
    
 }
}
}

export function toggleStateAddBTPattern(){
  return {
    type:'TOGGLE_STATE_ADD_BT_PATTERN'
  }
}


/* Action creators for generating the nd.conf file */

export function createConfFile(appId,Keyword,loader)
{
  const URL = `${url.GENERATE_ND_CONF}/${appId}`;
  const response = axios.get(URL);

  //trigger action for loading progressBar change once promise is resolved
  response.then(function(data){
   loader(data.data[0]);
 });

  return {
    type: 'GENERATE_ND_CONF_REDU',
    payload:response
  };
}


export function patternInitializeForm(data,type){
   var patternData = {"data":data, "openBTPatternDialog" : type } 
 return {
    type: 'PATTERN_INITIALIZE_FORM',
    payload:patternData
  };
}
 /*
  * Action creators for General keywords screen
  * 
  */
 //function for getting keywords data when general keywords screen gets loaded
 export function getKeywordsData(profileId,loader){
  const response = axios.get(`${url.GET_KEYWORDS_DATA}/${profileId}`)
  response.then(function(data){
   loader(data);
 });

  return{
    type : 'GET_ALL_KEYWORDS',
    payload : response
  }
}

export function submitKeywordData(data,profileId){
  var response = axios({
    method:'post',
    url : `${url.UPDATE_KEYWORDS_DATA}/${profileId}`,
    data: data,
    headers:{'Content-Type':'application/json'}
  });

  return{
    type : 'GET_ALL_KEYWORDS',
    payload : response
  }
}

/*export function submitKeywordData(data,profileId,keywordsGroup){
  console.log("data----",data)
   var response = axios({
      method:'post',
       url : `${url.UPDATE_KEYWORDS_DATA}/${profileId}`,
      data: data,
      headers:{'Content-Type':'application/json'}
    });

   if(keywordsGroup === 'bciCapturing')
     return{
      type : 'UPDATE_BCI_KEYWORDS',
      payload : response
     }

    else if(keywordsGroup === 'hotSpotCapturing')
      return{
        type :'UPDATE_HOTSPOT_KEYWORDS',
        payload : response
      }

    else if(keywordsGroup === 'instrProfile')
      return{
        type : 'UPDATE_INSTRPROFILE_KEYWORDS',
        payload :response
      }
    else if(keywordsGroup === 'debugCapturing')
      return{
        type:'UPDATE_DEBUG_KEYWORDS',
        payload:response
      }
}
*/
export function setDefValBCICapturingKeywords() {
  return{
    type : 'SET_DEFAULT_BCICapturingKeywords'

  }
}

export function enableBCICheckBoxStatus(flag){
  return{
    type : 'ENABLE_BCI_CHECKBOX',
    payload:flag

  }
}

export function enableHotSpotCheckBoxStatus(flag){
  return{
    type : 'ENABLE_HOTSPOT_CHECKBOX',
    payload:flag

  }
}

export function enableExcptCheckBoxStatus(flag){
  return{
    type : 'ENABLE_EXCPT_CHECKBOX',
    payload:flag

  }
}


export function setDefValHotSpotCapturingKeywords(){
  return{
    type : 'SET_DEFAULT_HOTSPOTKEYWORDS'

  }
}
export function generateNdConf(){
  const URL =  `${url.UPDATE_TOPOLOGY}`;
  const response = axios.get(URL);
  return ;
}

export function updateTopology(loader){
  const URL =  `${url.UPDATE_TOPOLOGY}`;
  const response = axios.get(URL);
  response.then(function(data){
    loader(data);
  })
  return {
    type : 'UPDATE_TOPOLOGY',
    payload : response
  }
}

/*
* function for Debug Level Capturing keywords 
*/
export function enableDebugCheckBoxStatus(flag){
  return{
    type :'ENABLE_DEBUG_CHECKBOX',
    payload :flag
  }
}

export function setDefValDebugCapturingKeywords() {
  return{
    type : 'SET_DEFAULT_DEBUGKEYWORDS'

  }
}

/*
* function for Backend Monitor keywords 
*/
export function enableBackendMonitorCheckBoxStatus(flag){
  return{
    type :'ENABLE_BACKEND_MONITOR_CHECKBOX',
    payload :flag
  }
}

export function setDefValBackendMonitorKeywords() {
  return{
    type : 'SET_DEFAULT_BACKEND_MONITOR_KEYWORDS'

  }
}

/*
* function for Monitor keywords 
*/
export function enableMonitorsCheckBoxStatus(flag){
  return{
    type :'ENABLE_MONITORS_CHECKBOX',
    payload :flag
  }
}

export function setDefValMonitorsKeywords() {
  return{
    type : 'SET_DEFAULT_MONITORS_KEYWORDS'

  }
}


export function getListOfXmlFiles(){
  const URL = `${url.GET_INSTR_PROFILE_LIST}`;
  const response = axios.get(URL);
  return{
    type : 'LIST_OF_XMLFILES',
    payload :response
  }
}

export function initializeInstrProf(profileId) {
  return{
    type : 'INITIALIZE_INSTRPROFILE'
  }
}

/* Action Creators for the method monitor screen  */

export function toggleStateAddMethodMonitor(){
  return {
    type:'TOGGLE_STATE_ADD_METHOD_MON'
  }
}

// Action creator for delete
export function delMethodMonitorRow(profileId,selectedRowKeys){
   var response = axios({
      method:'post',
      url : `${url.DEL_METHOD_MONITOR}/${profileId}`,
     data: selectedRowKeys,
     headers:{'Content-Type':'application/json'}
 });
  return{
    type: 'DEL_METHOD_MONITOR_ROW',
    payload: response
  }
}

export function fetchMethodMonitorTableData(profileId,loader){

  const URL = `${url.FETCH_METHOD_MON_TABLEDATA}/${profileId}`
  const request_table = axios.get(URL);
  request_table.then(function(){

    loader();
  })
  return {
    type:'FETCH_METHOD_MON_TABLEDATA',
    payload:request_table
  }
}

export function insertMethodMonitorDetails(formData,profileId){
  if(formData.openMethodMonitorDialogType == 'edit'){
  var response = axios({
    method:'put',
    url: `${url.ADD_METHOD_MONITOR}/updateMethodMonitor/${profileId}/${formData.methodId}`,
    data: formData,
    headers:{'Content-Type':'application/json'}


  });
      return{

        type:'UPDATE_METHOD_MONITOR',
        payload: response,

      }
    }
  else  if(formData.openMethodMonitorDialogType == 'add'){
     var response = axios({
      method:'post',
      url : `${url.ADD_METHOD_MONITOR}/${profileId}`,
      data: formData,
      headers:{'Content-Type':'application/json'}
    });
   
   return {
    type : 'ADD_METHOD_MONITOR',
    payload : response
    }
 }
}
export function methodMonitorInitializeForm(data,type){
     var payload = { "data": data ,"openMethodMonitorDialogType": type} 
  return {
       type: 'INITIALIZE_METHOD_MONITOR',
       payload: payload
    }

}

/*********** Error Detection *************/



export function fetchErrorDetectionTableData(profileId,loader){
  const URL = `${url.FETCH_ERROR_DETECTION_TABLEDATA}/${profileId}`
  const request_table = axios.get(URL);
  request_table.then(function(){
    loader();
  })
  return {
    type:'FETCH_ERROR_DETECTION_TABLE',
    payload:request_table
  }
}

export function editErrorDetection(formData,profileId){
   var response = axios({
      method:'put',
      url : `${url.ADD_NEW_ERROR_DETECTION}/updateErrorDetection/${profileId}/${formData.errDetectionId}`,
      data: formData,
      headers:{'Content-Type':'application/json'}
    });

    return {
    type : 'EDIT_ERROR_DETECTION',
    payload : formData
    }
  }
export function addErrorDetection(formData,profileId){
      var response = axios({
      method:'post',
      url : `${url.ADD_NEW_ERROR_DETECTION}/${profileId}`,
      data: formData,
      headers:{'Content-Type':'application/json'}
      });

     return {
      type : 'ADD_NEW_ERROR_DETECTION',
      payload : response
      }
    }


export function toggleStateErrorDetection(){
  return {
    type:'TOGGLE_STATE_ADD_ERROR_DETECTION'
  }
}
export function initializeErrorDetectionForm(data,type){
   var payload  = {"data": data , "errorDetectionType" : type }
  return{
    type: 'INITIALIZE_ERROR_DETECTION_FORM',
    payload: payload
  }
}

export function delErrorDetectionRow(profileId,selectedRowKeys)
{
    var response = axios({
       method:'post',
       url : `${url.DEL_ERROR_DETECTION}/${profileId}`,
       data: selectedRowKeys,
       headers:{'Content-Type':'application/json'}
 });
  return{
    type: 'DEL_ERROR_DETECTION_ROW',
    payload: response
  }
}

/* ********** Toggle TR state *********  */
export function toggleTRState(){
  return {
    type:'TOGGLE_TR_STATE'
  }
}

/* *********** TR Mode Detail*************** */
export function setTRModeDetail(trModeobj,loader){

  return {
    type:'SET_TRMode_Detail',
    payload: trModeobj
  }
}


/* ************** Send Run Time Changes ******************* */

export function sendRunTimeChange(URL,keywordList){

  var response = axios({
    method:'post',
    url : URL,
    data: keywordList,
    headers:{'Content-Type':'application/json'}
  });

  return {
    type : 'RUNTIME_CHANGE',
    payload : response
  }
}

/*
* Action creators for http Stats Condition
*
*/
export function getHttpStatsCond(profileId,loader){

  const URL = `${url.FETCH_HTTP_STATS_COND_TABLEDATA}/${profileId}`
  var response= axios.get(URL);
  response.then(function(){
    loader();
  });
  return{
    type :'FETCH_HTTP_STATS_COND_TABLEDATA',
    payload:response
  }
}

export function toggleStateAddHttpStatsCond(){
  return{
    type:'TOGGLE_STATE_ADD_HTTP_STATS'
  }
}

export function getListOfHeaders(headerTypeId){
  const URL = `${url.GET_HTTP_HEADERS_lIST}/${headerTypeId}`
  var response = axios.get(URL);
  return{
    type :'LIST_OF_HEADERS',
    payload:response
  }
}

export function getListOfTypes(){
  const URL = `${url.GET_TYPE_HTTP_STATS}`
  var response = axios.get(URL);
  return{
    type:'LIST_OF_TYPES',
    payload:response
  }
}

export function getListOfValueType(){
  const URL = `${url.GET_LIST_OF_VALUETYPE}`
  var response = axios.get(URL);
  return{
    type:'LIST_OF_VALUETYPE',
    payload:response
  }
}
export function getListOfOperators(valId){
  const URL = `${url.GET_LIST_OF_OPERATORS}/${valId}`
  var response = axios.get(URL);
  return{
    type :'LIST_OF_OPERATORS',
    payload:response
  }

}

export function editHttpStatsCond(data,profileId){

  var response = axios({
      method:'put',
      url : `${url.ADD_NEW_HTTP_STATS_COND}/updateHTTPCond/${profileId}/${data.hscid}`,
      data: data,
      headers:{'Content-Type':'application/json'}
    });
  return{
    type: 'EDIT_HTTP_STATS_COND',
    payload: response
  }
}
export function addHttpStatsCond(data,profileId){

 var response = axios({
  method:'post',
  url : `${url.ADD_NEW_HTTP_STATS_COND}/${profileId}`,
  data: data,
  headers:{'Content-Type':'application/json'}
});
 return{
  type    : 'ADD_HTTP_STATS_COND',
  payload : response
}  

}
export function initializeHTTPForm(data,openHttpStatsDialog){
  var payload = {'data' :data , 'type':openHttpStatsDialog}
  return{
    type:'INITIALIZE_HTTP_STATS',
    payload:payload
  }

}
export function delHTTPselectedRow(profileId,selectedRowKeys){
  var response = axios({
     method: 'post',
     url   : `${url.DEL_HTTP_STATS_COND}/${profileId}`,
     data: selectedRowKeys,
     headers:{'Content-Type':'application/json'}
  })
  return{
    type: 'DEL_HTTP_STATS',
    payload: response
  }
}

/*
*  Action creatrors for Loader
*/

export function triggerLoader(show ,message){

  var data = {show : show , message : message}
  return{
    type    : 'LOAD_PROGRESSBAR',
    payload :data
  }
}


export function genExcptInMethod(flag){
 return{
  type :'GEN_EXCEPTION_IN_METHOD',
  payload :flag
} 
}

/**************** Action creators for tree when Topo acts as Root node **********************/

export function fetchTreeTopoRootNode(dcId){
   var parentDCNode = {};
   var response = axios({
    method:'post',
    url : `${url.FETCH_TOPO_TREE_URL}/${dcId}`,
     data: parentDCNode,
    headers:{'Content-Type':'application/json'}
  });

  return {
    type:'TOPO_ROOT_NODE',
    payload:response
  }
}

export function fetchTierNodeTopoRootNode(parentTopologyNode){
  console.log("in fetchTierNodeTopoRootNode method called ",parentTopologyNode)
  var response = axios({
    method:'post',
    url :  `${url.FETCH_TIER_TREE_URL}/${parentTopologyNode.id}`,
    data: parentTopologyNode,
    headers:{'Content-Type':'application/json'}
 });

  return {
    type:'TIER_NODE_TO_TOPO_ROOT',
    payload:response
  }
}

export function storeAppId(appId){
  console.log("appId---",appId)
  return {
    type :'APP_ID',
    payload:appId
  }
}

/* Action for the ND Agent Status */

  export function fetchNDAgentStatusTableData(){

  const URL = `${url.FETCH_ND_AGENT_TABLEDATA}`
  const request_table = axios.get(URL);
  console.log("request_table in fetching nd agent Status---",request_table)
  return {
    type:'FETCH_ND_AGENT_TABLEDATA',
    payload:request_table
  }
}

export function emptyTreeState(){

	return{
		type    :'CLEAR_TREE_STATE',
	}
}


/* Action for Disabling Profile*/
export function disableProfile(disabled = false){
  console.log("disabled--",disabled)
  return {
    type:'DISABLE_PROFILE',
    payload: disabled
  }
}

/** Action for SessionAttributeMonitor  */
export function fetchSessionAttrMonitorData(profileId){
  const URL = `${url.FETCH_SESSION_ATTR_TABLEDATA}/${profileId}`
  const response = axios.get(URL);
  return{
    type :'FETCH_SESSION_ATTR_MONITOR',
    payload:response
  }
}

export function addingValData(valData){
  console.log("valData--",valData)
  return{
    type:'VAL_DATA',
    payload:valData
  }
}

export function clearValData(){
  return{
    type:'CLEAR_VAL_DATA',
    payload:[]
  }
}

export function addSpecificAttrMon(data,profileId){
  console.log("data--",data)
  var response = axios({
    method:'post',
    url :  `${url.ADD_SPECIFIC_ATTR}/${profileId}`,
    data: data,
    headers:{'Content-Type':'application/json'}
 });
  
  return{
    type:'ADD_ATTRIBUTE',
    payload:response
  }
}

export function toggleStateAttrValDialog(rowId){
  return{
    type:'TOGGLE_ATTR_VAL_DIALOG_STATE',
    payload:rowId
}
}

export function toggleStateAddSessionAttrMonitor(){
  return {
    type:'TOGGLE_STATE_ADD_SESSION_MON'
  }
}



export function updateSessionType(profileId,data){
  var response = axios({
    method:'post',
    url :  `${url.UPDATE_SESSION_TYPE}/${profileId}`,
    data: data,
    headers:{'Content-Type':'application/json'}
 });
  
  return{
    type:'UPDATE_SESSION_TYPE',
    payload:response
  }
  
}

export function updateAttrValueTypes(data){

   var response = axios({
    method:'post',
    url :  `${url.UPDATE_ATTR_VALUES}`,
    data: data,
    headers:{'Content-Type':'application/json'}
 });
  
  return{
    type:'UPDATE_ATTR_VALUES',
    payload:response
  }

}
export function addValueType(value,attrId){
  console.log("value--",value)
   var response = axios({
    method:'post',
    url :  `${url.ADD_ATTR_VALUES}/${attrId}`,
    data: value,
    headers:{'Content-Type':'application/json'}
 });
  
  return{
    type:'ADD_ATTR_VALUES',
    payload:response
  }
}

 export function toggleStateMethodBT(){
  return {
    type:'TOGGLE_STATE_ADD_BT_METHOD'
  } 
 }


export function addBTMethod(data,profileId){

  console.log("profileId--",profileId)
  console.log("data---",data)
   var response = axios({
    method:'post',
    url :  `${url.ADD_BT_METHOD}/${profileId}`,
    data: data,
    headers:{'Content-Type':'application/json'}
 });
  
  return{
    type:'ADD_BT_METHOD',
    payload:response
  }

}

export function fetchBTMethodTableData(profileId){
  console.log("fetchBTMethodTableData method called")
  const URL =  `${url.FETCH_BTMETHOD_URL}/${profileId}`;
  const response = axios.get(URL);

  return{
    type:'FETCH_BTMETHOD_TABLEDATA',
    payload:response
  }
}



export function btMethodInitializeForm(data){
  console.log("btMethodInitializeForm---",data)
  return {
       type: 'INITIALIZE_BT_METHOD',
       payload: data
    }
}

export function toggleStateMethodBTEdit(){
  return{
    type:'TOGGLE_BTMETHOD_EDIT'
  }
}

export function addBTMethodRule(data,parentRowId){

   var response = axios({
    method:'post',
    url :  `${url.ADD_BTMETHOD_RULE}/${parentRowId}`,
    data: data,
    headers:{'Content-Type':'application/json'}
 });
  
  return{
    type:'ADD_BTMETHOD_RULE',
    payload:response
  }
}

export function updateBTMethod(data,btMethodId){
  console.log("data---",data)

   var response = axios({
    method:'post',
    url :  `${url.UPDATE_BTMETHOD}/${btMethodId}`,
    data: data,
    headers:{'Content-Type':'application/json'}
 });
  
  return{
    type:'UPDATE_BTMETHOD',
    payload:response
  }


}