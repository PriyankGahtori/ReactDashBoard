var _ = require('lodash');
export default function(state = [], action) {

  switch(action.type) {
  case 'FETCH_TREE_DATA':
  	var newState = Object.assign({}, state);
  	newState=action.payload.data;
    return newState
  
  case 'DCTABLE_ADD_ROW_UPDATE_TREE':
	  var newState = Object.assign({}, state);
    newState.children.push({"id":action.payload.data.id,"children":[],"name":action.payload.data.dcName})
    return newState

  case 'DCTABLE_DEL_ROW_UPDATE_TREE':
    var newState = Object.assign({}, state);
    console.log("State--in tree.js",state)
    newState.children = newState.children.filter(function(val){
       return action.payload.indexOf(""+val.id) == -1; 
    })
    return newState

case 'DCTABLE_UPDATE_ROW_UPDATE_TREE':
   var newState = Object.assign({}, state);
    newState.children.filter(function(val){
      if(val.id == action.payload.data.id){
          val.name=action.payload.data.dcName
        
      }
     })
    return newState;

  //Reducer for adding active topology to parent DC Node
  case 'FETCH_ACTIVE_TOPOLOGY':

      var newState = Object.assign({}, state);
      if(action.payload.data == null || action.payload.data.childNode == null){
          return newState;
      }
      var node = action.payload.data.childNode.parentId;
      var nodeArr = node.split(".");
      var stateObj = newState.children;
      var parent ;
      function getNode(obj,id){
        let index = _.findIndex(obj,(o)=> o.id == id)
        if(index >= 0){
             parent = obj[index];
            return obj[index].children;
          }
          else {
            return obj;
          }
        
    }

      for(var i = 1;i < nodeArr.length;i++){
        stateObj= getNode(stateObj ,nodeArr[i])
      }


      parent.loading = false;
    
     //stateObj.push({"id":action.payload.data.childNode.id,"children":[],"name":action.payload.data.childNode.name,"loading":action.payload.data.childNode.loading,"parentId":action.payload.data.childNode.parentId,"toggled":action.payload.data.toggled,"type":action.payload.data.childNode.type})
      stateObj.push(action.payload.data.childNode);
     return newState;

  

  //Reducer for adding tier chilld node to parent topology Node
  case 'FETCH_TIER_NODE':

      var newState = Object.assign({}, state);
      if(action.payload.data == null || action.payload.data.childNode == null){
          return newState;
      }
/* 
*function to identify parent node
*/
      var parent ;
      function getNode(obj,id){
        let index = _.findIndex(obj,(o)=> o.id == id)
        if(index >= 0){
             parent = obj[index];
            return obj[index].children;
          }
          else {
            return obj;
          }
    }

  var childArr= action.payload.data.childNode;
   var stateObj = newState.children;
    for(var i=0;i<childArr.length;i++){
      //var node = action.payload.data.childNode[i].parentId;
      var nodeArr = node.split(".");
      for(var j = 1;j < nodeArr.length;j++){
        stateObj= getNode(stateObj ,nodeArr[j])
      }
      parent.loading = false;
    
     //stateObj.push({"id":action.payload.data.childNode.id,"children":[],"name":action.payload.data.childNode.name,"loading":action.payload.data.childNode.loading,"parentId":action.payload.data.childNode.parentId,"toggled":action.payload.data.toggled,"type":action.payload.data.childNode.type})
      stateObj.push(action.payload.data.childNode[i]);
      }
      newState.loading = false ;
     return newState;

       //Reducer for adding server chilld node to parent tier Node
  case 'FETCH_SERVER_NODE':

      var newState = Object.assign({}, state);
      if(action.payload.data == null || action.payload.data.childNode == null){
          return newState;
      }
/* 
*function to identify parent node
*/
      var parent ;
      function getNode(obj,id){
        let index = _.findIndex(obj,(o)=> o.id == id)
        if(index >= 0){
             parent = obj[index];
            return obj[index].children;
          }
          else {
            return obj;
          }
        
    }

  var childArr= action.payload.data.childNode;
   var stateObj = newState.children;
    for(var i=0;i<childArr.length;i++){
      var node = action.payload.data.childNode[i].parentId;
      var nodeArr = node.split(".");
      for(var j = 1;j < nodeArr.length;j++){
        stateObj= getNode(stateObj ,nodeArr[j])
      }
      parent.loading = false;
    
     //stateObj.push({"id":action.payload.data.childNode.id,"children":[],"name":action.payload.data.childNode.name,"loading":action.payload.data.childNode.loading,"parentId":action.payload.data.childNode.parentId,"toggled":action.payload.data.toggled,"type":action.payload.data.childNode.type})
      stateObj.push(action.payload.data.childNode[i]);
      }
     return newState;


case 'FETCH_INSTANCE_NODE':

      var newState = Object.assign({}, state);
      if(action.payload.data == null || action.payload.data.childNode == null){
          return newState;
      }
    /* 
    *function to identify parent node
    */
      var parent ;
      function getNode(obj,id){
        let index = _.findIndex(obj,(o)=> o.id == id)
        if(index >= 0){
             parent = obj[index];
            return obj[index].children;
          }
          else {
            return obj;
          }
        
      }

      var childArr= action.payload.data.childNode;
      var stateObj = newState.children;
      for(var i=0;i<childArr.length;i++){
        var node = action.payload.data.childNode[i].parentId;
        var nodeArr = node.split(".");
        for(var j = 1;j < nodeArr.length;j++){
          stateObj= getNode(stateObj ,nodeArr[j])
        }

        parent.loading = false;
        stateObj.push(action.payload.data.childNode[i]);
      }
     return newState;

     

     case 'TOPO_ROOT_NODE':
     var newState = Object.assign({}, state);
     newState = action.payload.data.childNode;
     return newState ;


     case 'TIER_NODE_TO_TOPO_ROOT' :
     var newState = Object.assign({}, state);
     var childArr = action.payload.data.childNode;
     for(var i = 0 ; i < childArr.length;i++){
       newState.children.push(childArr[i])
     }
     newState.loading = false;
     return newState ;
  
     case 'CLEAR_TREE_STATE':
     var newState = Object.assign({},state)
     newState = {}
     return newState;  


  default :
      return state;
    //return [{"name":"rooting","toggled":true,"children":[{"name":"parent","children":[{"name":"child1"},{"name":"child2"}]},{"name":"loading parent","loading":true,"children":[]},{"name":"parent","children":[{"name":"nested parent","children":[{"name":"nested child 1"},{"name":"nested child 2"}]}]}]}];

  }
}
