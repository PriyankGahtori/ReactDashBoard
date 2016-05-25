export default function(state = null, action) {

	console.log("inside init reducer for tree", action.type);
  switch(action.type) {
  case 'FETCH_TREE_DATA':
  	console.log("inside FETCH_INIT_DATA case");
  	var newState = Object.assign({}, state);
  	newState=action.payload.data;
    return newState;

    default :
    return [{"name":"rooting","toggled":true,"children":[{"name":"parent","children":[{"name":"child1"},{"name":"child2"}]},{"name":"loading parent","loading":true,"children":[]},{"name":"parent","children":[{"name":"nested parent","children":[{"name":"nested child 1"},{"name":"nested child 2"}]}]}]}];

  }

}