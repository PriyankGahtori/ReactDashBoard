var _ = require('lodash');
export default function(state = [], action) {

	console.log("inside init reducer for tree--", action.type);
  switch(action.type) {
  case 'FETCH_TREE_DATA':
  	console.log("inside FETCH_INIT_DATA case");
  	var newState = Object.assign({}, state);
  	newState=action.payload.data;
    return newState
  
  case 'DCTABLE_ADD_ROW_UPDATE_TREE':
	  var newState = Object.assign({}, state);
    newState.children.push({"id":action.payload.data.id,"children":[],"name":action.payload.data.dcName})
    console.log("new State", newState);
    return newState

  case 'DCTABLE_DEL_ROW_UPDATE_TREE':
    console.log("deleting dc row---action.payload-",action.payload)
    var newState = Object.assign({}, state);
    console.log("State--in tree.js",state)
    newState.children = newState.children.filter(function(val){
      console.log("val.id----",val.id)
      console.log("action.payload--",action.payload)
      console.log(action.payload.indexOf(""+val.id) == -1)
       return action.payload.indexOf(""+val.id) == -1; 
    })
    console.log("new State for tree-----", newState);
    return newState

case 'DCTABLE_UPDATE_ROW_UPDATE_TREE':
   console.log("in updating form")
   var newState = Object.assign({}, state);
    console.log("State--in tree.js",state)
    console.log("action.payload---",action.payload.data)
    console.log("action.payload.data.id",action.payload.data.id)
    newState.children.filter(function(val){
      if(val.id == action.payload.data.id){
          console.log("val.id ---",val.id ) 
          console.log("matched")
          val.name=action.payload.data.dcName
        
      }
     })
    console.log("newState.children---",newState.children)
    return newState;

  //Reducer for adding active topology to parent DC Node
  case 'FETCH_ACTIVE_TOPOLOGY':

      var newState = Object.assign({}, state);
      if(action.payload.data == null || action.payload.data.childNode == null){
          return newState;
      }
      console.log("action.payload.data.childNode",action.payload.data.childNode)
      var node = action.payload.data.childNode.parentId;
      var nodeArr = node.split(".");
      var stateObj = newState.children;
      var parent ;
      function getNode(obj,id){
        let index = _.findIndex(obj,(o)=> o.id == id)
        console.log("index---",index);
        if(index >= 0){
             parent = obj[index];
            return obj[index].children;
          }
          else {
            return obj;
          }
        
    }

      console.log("nodeArr.length--",nodeArr.length)
      for(var i = 1;i < nodeArr.length;i++){
        console.log("nodeArr[i]---",nodeArr[i])
        stateObj= getNode(stateObj ,nodeArr[i])
        console.log("stateObj---",stateObj)
      }


     console.log("stateObj---aftr for loop--",stateObj)
      console.log("parent.loading --",parent.loading )
      parent.loading = false;
      console.log("parent.loading --",parent.loading)
    
     //stateObj.push({"id":action.payload.data.childNode.id,"children":[],"name":action.payload.data.childNode.name,"loading":action.payload.data.childNode.loading,"parentId":action.payload.data.childNode.parentId,"toggled":action.payload.data.toggled,"type":action.payload.data.childNode.type})
      stateObj.push(action.payload.data.childNode);
     return newState;

  

  //Reducer for adding tier chilld node to parent topology Node
  case 'FETCH_TIER_NODE':

      var newState = Object.assign({}, state);
      if(action.payload.data == null || action.payload.data.childNode == null){
          return newState;
      }
      console.log("action.payload.data.childNode",action.payload.data.childNode)
/* 
*function to identify parent node
*/
      var parent ;
      function getNode(obj,id){
        let index = _.findIndex(obj,(o)=> o.id == id)
        console.log("index---",index);
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
      console.log("i-----",i)
      var node = action.payload.data.childNode[i].parentId;
      console.log("node---",node)
      var nodeArr = node.split(".");
      console.log("in children----",stateObj)
      console.log("nodeArr.length--",nodeArr.length)
      for(var j = 1;j < nodeArr.length;j++){
        console.log("nodeArr[i]---",nodeArr[j])
        stateObj= getNode(stateObj ,nodeArr[j])
        console.log("stateObj---",stateObj)
      }


     console.log("stateObj---aftr for loop--",stateObj)
      console.log("parent.loading --",parent.loading )
      parent.loading = false;
      console.log("parent.loading --",parent.loading)
    
     //stateObj.push({"id":action.payload.data.childNode.id,"children":[],"name":action.payload.data.childNode.name,"loading":action.payload.data.childNode.loading,"parentId":action.payload.data.childNode.parentId,"toggled":action.payload.data.toggled,"type":action.payload.data.childNode.type})
      stateObj.push(action.payload.data.childNode[i]);
      }
     return newState;

       //Reducer for adding server chilld node to parent tier Node
  case 'FETCH_SERVER_NODE':

      var newState = Object.assign({}, state);
      if(action.payload.data == null || action.payload.data.childNode == null){
          return newState;
      }
      console.log("action.payload.data.childNode",action.payload.data.childNode)
/* 
*function to identify parent node
*/
      var parent ;
      function getNode(obj,id){
        let index = _.findIndex(obj,(o)=> o.id == id)
        console.log("index---",index);
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
      console.log("i-----",i)
      var node = action.payload.data.childNode[i].parentId;
      console.log("node---",node)
      var nodeArr = node.split(".");
      console.log("in children----",stateObj)
      console.log("nodeArr.length--",nodeArr.length)
      for(var j = 1;j < nodeArr.length;j++){
        console.log("nodeArr[i]---",nodeArr[j])
        stateObj= getNode(stateObj ,nodeArr[j])
        console.log("stateObj---",stateObj)
      }


     console.log("stateObj---aftr for loop--",stateObj)
      console.log("parent.loading --",parent.loading )
      parent.loading = false;
      console.log("parent.loading --",parent.loading)
    
     //stateObj.push({"id":action.payload.data.childNode.id,"children":[],"name":action.payload.data.childNode.name,"loading":action.payload.data.childNode.loading,"parentId":action.payload.data.childNode.parentId,"toggled":action.payload.data.toggled,"type":action.payload.data.childNode.type})
      stateObj.push(action.payload.data.childNode[i]);
      }
     return newState;


case 'FETCH_INSTANCE_NODE':

      var newState = Object.assign({}, state);
      console.log("action.apyload ---",action.payload.data)
      if(action.payload.data == null || action.payload.data.childNode == null){
          return newState;
      }
    /* 
    *function to identify parent node
    */
      var parent ;
      function getNode(obj,id){
        let index = _.findIndex(obj,(o)=> o.id == id)
        console.log("index---",index);
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





  default :
      return state;
    //return [{"name":"rooting","toggled":true,"children":[{"name":"parent","children":[{"name":"child1"},{"name":"child2"}]},{"name":"loading parent","loading":true,"children":[]},{"name":"parent","children":[{"name":"nested parent","children":[{"name":"nested child 1"},{"name":"nested child 2"}]}]}]}];

  }

  
}
