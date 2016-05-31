export default function(state = [], action) {

	console.log("inside init reducer for tree", action.type);
  switch(action.type) {

  case 'FETCH_DCDETAIL_DATA':
	  console.log("inside  FETCH_DCDETAIL_DATA", action);
    var newState = Object.assign([], state);
    newState=action.payload.data;
    return newState
    //return [{"id":1,"name":"priyank"},{"id":2,"name":"Gahtori"}]

  case 'ADD_ROW_TABLE':
    console.log("inside ADD_ROW_TABLE case---action.payload.data",action.payload.data);
    var newState = Object.assign([], state);
    console.log("newState- line no 16-",newState)
    newState.push({"id":0,"index":1,"DCName":"New","DCIP":"30.20.88.11","DCPort":"jon@gmail.com","NDEIP":"10.10.40.11"});
    console.log("newState---",newState)
    return newState;

  case 'DEL_ROW_TABLE':
    console.log("inside DEL_ROW_TABLE---case")
    var newState = Object.assign([], state);
    console.log("line no 23---",action)
    console.log("line no 24--newState---",newState)
    console.log("line no 25--action.payload.data--",action.payload.data)
    newState = newState.filter(function(val){ return val.DCName != action.payload})
    console.log("newState----",newState)
    return newState;   


  default :
    return state;

  }

}
