
const initialState = {
    tableData: [],
    openBTMethodDialog: false,
    btMethodInitializeForm:{},
    openBTMethodDialogEdit:false
}

export default function (state = initialState, action) {

    console.log('inside reducer Method BT');
    switch (action.type) {

        case 'FETCH_BTMETHOD_TABLEDATA':
            var newState = Object.assign({}, state);
            console.log("action.payload.data----", action.payload.data)
            newState.tableData = action.payload.data;
            newState.tableData.map(function(val){
                val.hrefFqm = {"href":val.fqm}
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
            data.hrefFqm ={"href":data.fqm};
            newState.tableData.push(data)
            return newState;

        case 'INITIALIZE_BT_METHOD':
             var newState = Object.assign({},state)
             console.log("action.apyload--",action.payload)
             newState.btMethodInitializeForm = action.payload;
             console.log("newState---",newState)
             return newState;

        case 'TOGGLE_BTMETHOD_EDIT':
            var newState = Object.assign({},state)
            newState.openBTMethodDialogEdit = ! newState.openBTMethodDialogEdit;
            return newState;

        case 'ADD_BTMETHOD_RULE':
            var newState = Object.assign({},state)
            console.log("action.payload--",action.payload.data)
            newState.tableData.map(function(val){
             if(val.btMethodId == newState.btMethodInitializeForm.btMethodId){
                 val.rules.push(action.payload.data)
             }
             
            })
            return newState;

        case 'UPDATE_BTMETHOD':
           var newState =  Object.assign({},state)
           console.log("action.payload---",action.payload)
           var data = action.payload.data;
           newState.tableData.map(function(val){
               console.log("val---",val)
               if(val.btMethodId = data.btMethodId){
                    val.hrefFqm = {"href":data.fqm}
               }

           })
           console.log("newState--",newState)
           return newState;
                

    }
    return state;
}