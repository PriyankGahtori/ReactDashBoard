export default function(state = [], action) {

	console.log("inside init reducer for tree", action.type);
  switch(action.type) {

  case 'FETCH_DCDETAIL_DATA':
	  console.log("inside  FETCH_DCDETAIL_DATA", action);
    var newState = Object.assign([], state);
    newState=action.payload.data;
    return newState
    //return [{"id":1,"name":"priyank"},{"id":2,"name":"Gahtori"}]



  default :
    return state;

  }

}
