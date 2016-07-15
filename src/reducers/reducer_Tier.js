
const initialState = {tableData:[]}
export default function(state = initialState, action) {

  switch(action.type) {
  case 'FETCH_TIER_TABLE_DATA':
  	console.log("inside FETCH_TIER_TABLE_DATA topology case");
  	var newState = Object.assign({}, state);
  var data=action.payload.data._embedded.tier;
      data.map(function(val){
        console.log("in val---",val)
        var index=val._links.self.href.lastIndexOf("/");
        var id= val._links.self.href.slice(index+1,val._links.self.href.length)
        val._links.self.href=id;
        console.log("id----",id)
        console.log(" val._links.self.href", val._links.self.href)
    })
    console.log("action.payload.data._embedded.dcdetail---",data)

    newState.tableData = data;
    return newState;
  }

  return state;
}