import axios from 'axios';


const ROOT_URL = '../data.json';
const ROOT_URL_TREE = '../treedata.json';

export const FETCH_INIT_DATA = 'FETCH_INIT_DATA';
export const FETCH_TREE_DATA = 'FETCH_TREE_DATA';


export function fetchInitData() {

  const request = axios.get("http://10.10.40.7:8050/configUI/home");

  console.log("Action ajax.................",request);

  return {
    type: FETCH_INIT_DATA,
    payload:request
    //payload: [{"type":"Application","id":1,"value":["Nsecom","Kohls_Mobile","ATG","Stress_Pref1"]},{"type":"Profile","id":2,"value":["Nsecom","Kohls_Mobile","ATG","Stress_Pref1"]},{"type":"Topology","id":3,"value":["Nsecom","Kohls_Mobile","ATG","Stress_Pref1"]},{"type":"Setting","id":4,"value":["Nsecom","Kohls_Mobile","ATG","Stress_Pref1"]}]
  };
}



export function fetchTreeData(value) {

  const URL =  `../${value}.json`;
  console.log("on action---",URL)
  const request_tree = axios.get(URL);

  console.log("Action ajax.................",request_tree);

  return {
    type: FETCH_TREE_DATA,
    payload:request_tree
    //payload: [{"type":"Application","id":1,"value":["Nsecom","Kohls_Mobile","ATG","Stress_Pref1"]},{"type":"Profile","id":2,"value":["Nsecom","Kohls_Mobile","ATG","Stress_Pref1"]},{"type":"Topology","id":3,"value":["Nsecom","Kohls_Mobile","ATG","Stress_Pref1"]},{"type":"Setting","id":4,"value":["Nsecom","Kohls_Mobile","ATG","Stress_Pref1"]}]
  };
}

export function fetchDCTableData(value){

  //const URLTable =  `../${value}Table.json`;
  const URLTable =  "http://10.10.40.7:8050/configUI/dcdetail";

  const request_table = axios.get(URLTable);

  return {
    type: 'FETCH_TABLE_DATA',
    payload: request_table
  };
}

export function addRowDCTable(formData,flagAddOREdit){

  console.log("add_Row_table--action called--",formData)
 console.log("flagAddOREdit----",flagAddOREdit);
  //when action is called from updating form
  if(flagAddOREdit == "edit"){

   console.log("edit flag")
   var response = axios({
    method:'put',
    url: formData._links.self.href,
    data: formData,
    headers:{'Content-Type':'application/json'}
  });

   console.log("response",response)
      return {
        type: 'UPDATE_ROW_TABLE',
        payload: response
      };
  }
 else{
//action called for adding new DC
  var response = axios({
    method:'post',
    url: 'http://10.10.40.7:8050/configUI/dcdetail',
    data: formData,
    headers:{'Content-Type':'application/json'}
  });

  console.log("response",response)
  return {
    type: 'ADD_ROW_TABLE',
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
        method : 'delete',
        url : value
        });
})
  
  return{
    type:'DEL_DC_ROW_TABLE',
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
//initializing the form fields
export function updateFormInitialValue(data,flag){
  console.log("updateformInitialValue",data )
  console.log("flag---",flag)
  var payload={ "data":data,"flag":flag};

  return {
    type:'UPDATE_FORM',
    payload:payload

  }
}


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
        url : value
        });
})
  
  return{
    type:'DEL_APPTABLE_ROW',
    payload:selectedRowKeys
  }
}

export function addRowApplicationTable(formData){

  console.log("add_Row_table--action called--",formData)
  var response = axios({
    method:'post',
    url: 'http://10.10.40.7:8050/configUI/application',
    data: formData,
    headers:{'Content-Type':'application/json'}
  });

  console.log("response inadd row application---",response)
  return {
    type: 'ADD_APPTABLE_ROW',
    payload: response
  }; 
}