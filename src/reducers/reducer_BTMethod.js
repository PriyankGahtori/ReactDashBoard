
const initialState = {
    tableData: [],
    openBTMethodDialog: false
}

export default function (state = initialState, action) {

    console.log('inside reducer Method BT');
    switch (action.type) {

        case 'FETCH_BTMETHOD_TABLEDATA':
            var newState = Object.assign({}, state);
            console.log("action.payload.data----", action.payload.data)
            newState.tableData = action.payload.data;
            newState.tableData.map(function(val){
                val.hrefReturnType = {"href":val.returnType}
            })
            console.log("newState---", newState.tableData)
            return newState;


        case 'TOGGLE_STATE_ADD_BT_METHOD':
            var newState = Object.assign({}, state);
            newState.openBTMethodDialog = !newState.openBTMethodDialog;
            return newState;

        case 'ADD_BT_METHOD':
            var newState = Object.assign({},state)
            console.log("action.payload---",action.payload)
            var data = action.payload.data;
            data.hrefReturnType ={"href":data.returnType};
            newState.tableData.push(data)
            console.log("newState--",newState)
            return newState
            

    }
    return state;
}