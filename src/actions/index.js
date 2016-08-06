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
  const URLTable =  "http://10.10.40.7:8050/configUI/application";
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

/*
 * Initializes value of Dialog box's form field
 *    type :  add ( state is set to null) 
 *            edit( state assigned to selected row )          
*/

export function topoInitializeForm(data,openTopoDialogType,dcId){
  console.log("updateformInitialValue Topo",data )
  console.log("flag---",openTopoDialogType)
  console.log("dcId",dcId)
  var payload={ "data":data,"openTopoDialogType":openTopoDialogType,"dcId":dcId};

  return {
    type:'UPDATE_TOPO_FORM',
    payload:payload
  }
}

/*
* Action creators for TopologyDetail Screen
*
*/

export function fetchTopoDetailTable(){
  console.log("fetch topo detail action called")
  const URLTable =  "http://10.10.40.7:8050/configUI/topology";
  const request_table = axios.get(URLTable);
  console.log("request_table",request_table)

  return {
    type: 'FETCH_TOPODETAIL_TABLE_DATA',
    payload: request_table
  };


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
  console.log("in post request for fetchtreetopodata")
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

export function fetchTierTableData(topoId){
  console.log("fetchTierTableData action called");
  const URL =  `${url.FETCH_TIER_TABLE_URL}/${topoId}/tier`;
  //const URLTable =  `http://10.10.40.7:8050/configUI/custom/topology/${dcId}`;
  const request_table = axios.get(URL);
  console.log("request_table in fetching topotable",request_table)

  return {
    type: 'FETCH_TIER_TABLE_DATA',
    payload:request_table
  };

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


export function fetchServerTableData(tierId){
  console.log("fetchTierTableData action called");
  const URL =  `${url.FETCH_SERVER_TABLE_URL}/${tierId}/server`;
  //const URLTable =  `http://10.10.40.7:8050/configUI/custom/topology/${dcId}`;
  const request_table = axios.get(URL);
  console.log("request_table in fetching topotable",request_table)

  return {
    type: 'FETCH_SERVER_TABLE_DATA',
    payload:request_table
  };

}

/*
  Action creators for Instance screen
*/

export function fetchInstanceTableData(serverId){
  console.log("fetchTierTableData action called");
  const URL =  `${url.FETCH_INSTANCE_TABLE_URL}/${serverId}/instance`;
  const request_table = axios.get(URL);
  console.log("request_table in fetching topotable",request_table)

  return {
    type: 'FETCH_INSTANCE_TABLE_DATA',
    payload:request_table
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
export function initializeBTFields(){
  console.log("initializebt compo action called")
  return {
    type:'INITIALIZE_FIELDS',
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