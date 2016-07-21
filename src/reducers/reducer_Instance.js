/* This file is used to fetch the instance data and saves into the state
*/
const initialState = {tableData:[]}
export default function(state = initialState, action) {

  switch(action.type) {
      case 'FETCH_INSTANCE_TABLE_DATA':
      	    var newState = Object.assign({}, state);
            var data=action.payload.data._embedded.instance;
            data.map(function(val){
            console.log("in val---",val)
            var index=val._links.self.href.lastIndexOf("/");
            var id= val._links.self.href.slice(index+1,val._links.self.href.length)
            val._links.self.href=id;
        })
        newState.tableData = data;
        return newState;
  }
  return state;
}