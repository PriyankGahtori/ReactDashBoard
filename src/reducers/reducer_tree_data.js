export default function(state = [], action) {

	console.log("inside init reducer for tree", action.type);
  switch(action.type) {
  case 'FETCH_TREE_DATA':
  	console.log("inside FETCH_INIT_DATA case");
  	var newState = Object.assign({}, state);
  	newState=action.payload.data;
    return newState

  //case 'FETCH_DCDETAIL_DATA':
		//var newState = Object.assign({}, state);
		///newState=action.treeData.data;
		//return newState
		//return [{"name":"dcDetail","toggled":true,"children":[]}];

  case 'UPDATE_TREE_DATA':
	  var newState = Object.assign([], state);
    newState[0].children.push({"name":"new Child","children":[]});
    console.log("bmmm State", state);
    return newState



  default :
	    return state;
    //return [{"name":"rooting","toggled":true,"children":[{"name":"parent","children":[{"name":"child1"},{"name":"child2"}]},{"name":"loading parent","loading":true,"children":[]},{"name":"parent","children":[{"name":"nested parent","children":[{"name":"nested child 1"},{"name":"nested child 2"}]}]}]}];

  }

}
