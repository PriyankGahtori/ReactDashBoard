import axios from 'axios';


const ROOT_URL = '../data.json';
const ROOT_URL_TREE = '../treedata.json';

export const FETCH_INIT_DATA = 'FETCH_INIT_DATA';
export const FETCH_TREE_DATA = 'FETCH_TREE_DATA';


export function fetchInitData() {

  const request = axios.get(ROOT_URL);

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

export function fetchTableData(value){

  const URLTable =  `../${value}Table.json`;


  const request_table = axios.get(URLTable);

  return {
    type: 'FETCH_TABLE_DATA',
    payload: request_table
  };
}

export function addRowTable(formData){

  console.log("add_Row_table--action called--",formData)

  return {
    type: 'ADD_ROW_TABLE',
    payload: formData
  };
}

export function delRowTable(key){
  console.log("key---",key)

  return{
    type:'DEL_ROW_TABLE',
    payload:key
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
  console.log("action triggered---for new add dc")
  return {
    type:'TOGGLE_STATE_ADD_NEW_DC'

  }
}


export function toggleStateDialogNewApp(){
  console.log("action triggered---for new add app")
  return {
    type:'TOGGLE_STATE_NEW_APP'

  }
}