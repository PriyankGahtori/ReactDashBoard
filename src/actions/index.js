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


export function fetchTreeData() {
  
  const request_tree = axios.get(ROOT_URL_TREE);

  console.log("Action ajax.................",request_tree);

  return {
    type: FETCH_TREE_DATA,
    payload:request_tree
    //payload: [{"type":"Application","id":1,"value":["Nsecom","Kohls_Mobile","ATG","Stress_Pref1"]},{"type":"Profile","id":2,"value":["Nsecom","Kohls_Mobile","ATG","Stress_Pref1"]},{"type":"Topology","id":3,"value":["Nsecom","Kohls_Mobile","ATG","Stress_Pref1"]},{"type":"Setting","id":4,"value":["Nsecom","Kohls_Mobile","ATG","Stress_Pref1"]}]
  };
}