
const initialState = {
    tableData: [],
    openBTMethodDialog: false,
    btMethodInitializeForm: {},
    openBTMethodDialogEdit: false
}

export default function (state = initialState, action) {

    console.log('inside reducer Method BT');
    switch (action.type) {

        case 'FETCH_BTMETHOD_TABLEDATA':
            var newState = Object.assign({}, state);
            console.log("action.payload.data----", action.payload.data)
            newState.tableData = action.payload.data;
            newState.tableData.map(function (val) {
                val.hrefFqm = { "href": val.fqm }
            })
            console.log("newState---", newState.tableData)
            return newState;


        case 'TOGGLE_STATE_ADD_BT_METHOD':
            var newState = Object.assign({}, state);
            newState.openBTMethodDialog = !newState.openBTMethodDialog;
            return newState;

        case 'ADD_BT_METHOD':
            var newState = Object.assign({}, state)
            console.log("action.payload---", action.payload)
            var data = action.payload.data;
            data.hrefFqm = { "href": data.fqm };
            newState.tableData.push(data)
            return newState;

        case 'INITIALIZE_BT_METHOD':
            var newState = Object.assign({}, state)
            console.log("action.apyload--", action.payload)
            var data = action.payload;
            if (data.rules == null) {
                data.rules = []
            }
            newState.btMethodInitializeForm = data;
            console.log("newState---", newState)
            return newState;

        case 'TOGGLE_BTMETHOD_EDIT':
            var newState = Object.assign({}, state)
            newState.openBTMethodDialogEdit = !newState.openBTMethodDialogEdit;
            return newState;

        case 'ADD_BTMETHOD_RULE':
            var newState = Object.assign({}, state)
            console.log("action.payload--", action.payload.data)
            console.log("newState.btMethodInitializeForm.btMethodId--", newState.btMethodInitializeForm.btMethodId)
            var respData = action.payload.data;
            newState.tableData.map(function (val) {
                if (val.btMethodId == respData.parentBTMethodId) {
                    val.rules.push(respData)
                }

            })
            console.log("newState-=---", newState)
            return newState;

        case 'UPDATE_BTMETHOD':
            var newState = Object.assign({}, state)
            console.log("action.payload---", action.payload)
            var data = action.payload.data;
            /*newState.tableData= newState.tableData.map(function(val){
                                  console.log("val---",val)
                             if(val.btMethodId = data.btMethodId){
                                     val.hrefFqm = {"href":data.fqm}
                             }
            }) 
            */
            newState.tableData = newState.tableData.filter(function (val) {
                if (val.btMethodId == data.btMethodId) {
                    val.hrefFqm = { "href": data.fqm }
                }
                return val;
            })
            console.log("newState--", newState)
            return newState;

        case 'DEL_METHOD_RULES_ROW':
            var newState = Object.assign({}, state)
            newState.tableData.map(function (val) {

                if (val.btMethodId == newState.btMethodInitializeForm.btMethodId) {

                    val.rules = val.rules.filter(function (value) {
                        console.log("value---", value)
                        return action.payload.data.indexOf(Number(value.btMethodRuleId)) == -1;
                    })
                    newState.btMethodInitializeForm = val
                }
            })
            return newState;

        case 'DEL_METHOD_BT_ROW':
            var newState = Object.assign({}, state)
            console.log("payload - ", action.payload.data)
            console.log("newState.tableData - ", newState.tableData)
            newState.tableData = newState.tableData.filter(function (value) {
                console.log("value - ", value)
                return action.payload.data.indexOf(Number(value.btMethodId)) == -1;
            });
            return newState;

    }
    return state;
}