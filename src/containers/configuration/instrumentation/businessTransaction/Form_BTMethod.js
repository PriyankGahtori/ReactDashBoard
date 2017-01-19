//Importing React components
import React, { PropTypes } from 'react'
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import is from 'is_js';
import { List, ListItem } from 'material-ui/List';
import ContentSend from 'material-ui/svg-icons/content/send';
import AddNewButton from 'material-ui/FloatingActionButton';
import AddIcon from 'material-ui/svg-icons/content/add';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
// import DropDownComponent from './DropDownComponent';

//Importing files
// import { BTPatternCheck } from '../../../../actions/index';
import DropDownMenu from '../../../../components/SelectFieldWrapper';
import Toggle from '../../../../components/ToggleWrapper';
import AddMethodValues from './AddMethodValues';
import MethodBTComponent from './MethodBTComponent';
import DataGrid from '../../../../components/DCDetailTable';

export const fields = ['fqm', 'returnType', 'rules']

const validate = values => {
    const errors = {}

    return errors
}
const styles = {
    block: {
        maxWidth: 250,
        paddingBottom: 5
    },
    toggle: {
        marginTop: 30,
        paddingLeft: 80
    },
    customWidth: {
        width: 200
    },
    checkbox: {
        marginBottom: 16,
        paddingTop: 35
    },
    error: {
        fontSize: 12,
        color: 'red',
        paddingLeft: 40,
    },
};

const NewButtonstyle = {
    left: 3,
    top: -7
};

const errMsgCss = {
    top: -12,
    left: '10px',
    color: '#ff0000'
}

var columns = {
                "key" : "id",
                "data":['Value', 'Operation','Bt Name', 'ID'],
                "field":['value', 'opCode', 'btName','id']
              };  



class Form_BTMethod extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = { enable: false,
                    selectedOperation : null,
                    valData : [],
                    paramName :'',
                    opCode:'',
                    btName:'',
                    operation:[],
                    btName : '',
                    valDataArr : [],
                    count :0,
                    data:{'paramName':'',
                            'operation':[],
                            'btName':''
                        },
                    operator :'',
                    ruleTypeDivCss:'hidden',
                    errMsgCss:'hidden',
                    tableCss:'hidden',
                    addCompCSS:'hidden',
                    ruleTypes:[]
                 }
    }

    handleChange(event, index, value) {
        console.log("handleChange value - ", value)
         this.setState({'operator' : value,
                        'ruleTypeDivCss':'show',
                        'addComp': 'show',
                            
            })            
                     
    }


    componentWillMount() {
    }

    componentWillReceiveProps(nextProps) {
        /*  if(this.props.initialData != nextProps.initialData)
            this.setState({dynamicPartReq : nextProps.initialData.dynamicPartReq})*/
    }

    handleCheck(event, value) {
        this.setState({ 'dynamicPartReq': value })
    }

    submitValType() {
       console.log("handlde submitvalue type called")
         console.log("this.state.paramName--",this.state.paramName)
         console.log("this.state.operation--",this.state.opCode)
         console.log("this.state.btName--",this.state.btName)

        

    if(this.state.paramName == '' || this.state.btName == '' ||this.state.opCode == '' ){
        console.log("insideif block")
       this.setState({errMsgCss:'show'})
    }
    else{
      console.log("in else c ondition")
       this.setState({count:this.state.count+1,
                      errMsgCss:'hidden'
        })
       var ruleType = {'paramName':this.state.paramName,
                     'opCode':this.state.opCode,
                     'btName':this.state.btName
    }
    //this.state.valDataArr.push(ruleType);
    }

     this.setState({addComp:'show'})
    }

    paramNameChange(value, id) {
        console.log("parameterName called--",value);
        this.setState({value:value})
        // this.editValArr(id,'lb',value)
    }

    operationChange(value, id) {
        console.log("operationChange called--",value);
        this.setState({opCode:value})
        // this.setState({lb:value})
        // this.editValArr(id,'lb',value)
    }

    btNameChange(value, id) {
        console.log("btNameChange called--",value);
        this.setState({btName:value})
        // this.editValArr(id,'lb',value)
    }

    
del(val){
  console.log("val--",val)
  let arr = this.state.valDataArr;
  arr = arr.filter(function(value){
   if(val == value.id)
   {
    return false;
   } 
   else
   return true;
  })
  console.log("arr---",arr)
  this.setState({valDataArr:arr})

}



handleSubmitValType(rules){
  
  console.log("handleSubmitValType method called--",rules)
    if(this.state.value == '' || this.state.opCode == '' || this.state.btName == '' ){
       this.setState({errMsgCss:'show'})
    }
    else{
       this.setState({count:this.state.count+1,
                    addCompCSS:'hidden'
            })
       var valData = {'value':this.state.value,
                     'opCode':this.state.opCode,
                     'btName':this.state.btName,
                     'id':this.state.count
    }
    console.log("this.props--",this.state.opCode)
    console.log("this.state--",this.state.btName)
    console.log("handleSubmitValType--",valData)
    this.state.ruleTypes.push(valData)
    this.setState({tableCss:'show'})
    rules.onChange(this.state.ruleTypes) ;
    
    //  this.props.disableSubmitButtonState();
    }
 }

 //for editing the values table
onAfterSaveCell(row, cellName, cellValue){
  console.log("in Dialog_Attr vcalues--",row)
  console.log("cellName--",cellName)
  console.log("cellVAlue--",cellValue)
  console.log("this.state.rilrtYpe--",this.state.ruleTypes)
var arrData = Object.assign([],this.state.ruleTypes)
   //var arrData = this.state.changedValArr;
  
  if(arrData != null && arrData.length != 0){
    arrData.map(function(value){

      if(value.id == row.id){ //handling the case when 1 row is edited multiple times or same row but diff column
        console.log("in if condition")
        value[cellName] = cellValue;
      }
    else{
      console.log("in ekse con")
      arrData.push(row);
      }
    })
  }
  else{
    arrData.push(row);
  }
  console.log("arrData--",arrData)
  this.setState({ruleTypes:arrData})
  console.log("this.state--",this.state.ruleTypes)
}

onBeforeSaveCell(row, cellName, cellValue){
    console.log("onBeforeSaveCell method called in dialog_AttrValues")
  }

  handleOpen(){
      this.setState({addCompCSS:'show'})
  }




    render() {
    const cellEditProp = {
      mode: 'click',
      blurToSave: true,
      beforeSaveCell: this.onBeforeSaveCell.bind(this), // a hook for before saving cell
      afterSaveCell: this.onAfterSaveCell.bind(this)  // a hook for after saving cell
 };

        const { fields: {fqm, returnType, rules}, resetForm, handleSubmit, onSubmit, submitting} = this.props
        return (
            <form >
                <div className="row col-md-10">
                    <div className="col-md-5">
                        <TextField
                            // hintText="Hint Text"
                            floatingLabelText="Fully qualified Method Name"
                            {...fqm}
                            />
                    </div>
                

                    <div className="col-md-5" style= {{position:'relative',left:'108px'}}>
                        <DropDownMenu
                              {...returnType}
                            value={this.state.operator+""}
                            customOnChange={this.handleChange}
                            style={styles.customWidth}
                            autoWidth={false}
                            floatingLabelText="Return type"
                            >
                            <MenuItem value={"Numeric"} primaryText="NUMERIC" />
                            <MenuItem value={"String"} primaryText="STRING" />
                            <MenuItem value={"Boolean"} primaryText="BOOLEAN" />
                            <MenuItem value={"Char or Byte"} primaryText="CHAR OR BYTE" />
                        </DropDownMenu>
                    </div>

                </div>

                <div className={`row col-md-10 ${this.state.ruleTypeDivCss}`}>
                        <h4>Add Rules </h4>
                        <div className="row col-md-8 ">
                            <div className={`col-md-5 ${this.state.errMsgCss}`}>
                                <p style={errMsgCss}>Fields are empty</p>
                            </div>

                        </div>

                    { /* {this.renderMethodBTValues(this.state.valDataArr)} */}



          <div className = {`row ${this.state.addComp}`} style={{paddingLeft:'12px'}}>

            <div className="pull-right"  >
                <IconButton  tooltip="Add" onTouchTap={this.handleOpen.bind(this)}><FontIcon  color="#FFF"  className="material-icons">playlist_add</FontIcon></IconButton>
            </div>
            
         
            <DataGrid data = {this.state.ruleTypes} 
                         cellEdit ={ cellEditProp }
                        pagination = {false} 
                        ref        = "sessionAttrMonitorData" 
                        column     = {columns}
                        onClick    = {this.handleClick}
                        style={{color:'#000000'}}
                        tableStyle={{background:'#ffffff'}}
            />

          <div className = {`row ${this.state.addCompCSS}`}>
             <MethodBTComponent value={this.state.operator}   paramNameChange={this.paramNameChange.bind(this)} operationChange={this.operationChange.bind(this)} btNameChange={this.btNameChange.bind(this)} /> 
            <RaisedButton className ="pull-right"
            label="Add"
            backgroundColor = "#D3D3D3" 
            onClick={this.handleSubmitValType.bind(this,rules)}
            style={{color:'#000',position:'relative',top:'18px'}}>
      
           </RaisedButton>
            </div>
         </div>

         </div>

           <div className="hidden">
        <TextField
         {...rules}
        floatingLabelText=" Name"
       
      />
      </div>
  
            </form>
        );
    }
}


Form_BTMethod.propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired
}

export default reduxForm({ // <----- THIS IS THE IMPORTANT PART!
    form: 'Bussiness Transaction Method ',        // a unique name for this form
    fields,
    validate

},
    state => ({ // mapStateToProps
        methodBT: state.methodBT,
    }),

)(Form_BTMethod);

