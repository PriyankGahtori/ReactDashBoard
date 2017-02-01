
const initialState = {
    tableData: [],
    openBTMethodDialog: false,
    btMethodInitializeForm: {},
    openBTMethodDialogEdit: false,
    editRuleTypes: []
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
                if (val.rules != null) {
                    val.rules.map(function (ruleData) {
                        ruleData.opCodeDropDown = { "dropDownVal": ruleData.opCode }
                    })
                }
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
            if (data.rules != null) {
                data.rules.map(function (val) {
                    val.opCodeDropDown = { "dropDownVal": val.opCode }
                })
            }
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
                    respData.opCodeDropDown = { "dropDownVal": respData.opCode }
                    val.rules.push(respData)
                }

            })
            return newState;

        case 'UPDATE_BTMETHOD':
            var newState = Object.assign({}, state)
            console.log("action.payload---", action.payload)
            var data = action.payload.data;
            newState.tableData = newState.tableData.filter(function (val) {
                if (val.btMethodId == data.btMethodId) {
                    val.hrefFqm = { "href": data.fqm }
                    val.argumentIndex = data.argumentIndex
                    val.enableArgumentType = data.enableArgumentType
                    val.returnType = data.returnType
                }
                return val;
            })
            return newState;

        case 'EDIT_RULE_TYPES':
            var newState = Object.assign({}, state)
            newState.editRuleTypes = action.payload;
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
            newState.tableData = newState.tableData.filter(function (value) {
                return action.payload.data.indexOf(Number(value.btMethodId)) == -1;
            });
            return newState;


    }
    return state;
}