
const initialState = {
    tableData: [],
    openBTMethodDialog: false
}

export default function (state = initialState, action) {

    console.log('inside reducer Method BT');
    switch (action.type) {

        case 'FETCH_BT_METHOD_TABLE':
            var newState = Object.assign({}, state);
            console.log("action.payload.data----", action.payload.data)
            newState.tableData = action.payload.data;
            console.log("newState---", newState.tableData)
            return newState;

        case 'ADD_NEW_BT_METHOD':
            var newState = Object.assign({}, state);
            let resData = action.payload.data;
            newState.tableData.push(resData)
            return newState;

        case 'TOGGLE_STATE_ADD_BT_METHOD':
            var newState = Object.assign({}, state);
            newState.openBTMethodDialog = !newState.openBTMethodDialog;
            return newState;

    }
    return state;
}