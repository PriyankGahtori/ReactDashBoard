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
import Checkbox from '../../../../../components/CheckboxWrapper';
import Paper from 'material-ui/Paper';
// import DropDownComponent from './DropDownComponent';

//Importing files
// import { BTPatternCheck } from '../../../../actions/index';
import DropDownMenu from '../../../../../components/SelectFieldWrapper';
import Toggle from '../../../../../components/ToggleWrapper';
import DataGrid from '../../../../../components/DCDetailTable';
import AddComp from './AddComponent';
import ArgumentTypeComp from './ArgumentTypeComponent';
import ReturnTypeComp from './ReturnTypeComponent';
import * as opData  from './OperationVal';
import { addingValData, disableSubmitButtonState, toggleAddCustomCapture,addRules,updateHttpReqHdr } from '../../../../../actions/index';


export const fields = ['fqm','enableArgumentType','enableReturnType']


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
        paddingLeft:3,
    },
};

const NewButtonstyle = {                                                                                                                                                                                                                      
    left: 3,
    top: -7
};

const errMsgCss = {
    color: 'red',
    paddingTop: 13,

}

var columns = {
                "key" : "btMethodRuleId",
                "data":['Value', 'Operation','BT Name', 'ID'],
                "field":['value', 'operationName', 'btName','btMethodRuleId']
              };  



class Form_MethodBasedCaptureEdit extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
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
                    ruleTypes:[],
                    ruleTypesChanged:[],
                    argumentIndexCss:'hidden',

                   
                    fqm :this.props.initialData != null ? this.props.initialData.fqm :'',
                    returnTypeTableData:this.props.initialData != null?this.props.initialData.returnTypeData:[],
                    argumentTypeTableData:this.props.initialData != null ?this.props.initialData.argumentTypeData:[],
                    enableReturnType:this.props.initialData != null ?this.props.initialData.enableReturnType :false,
                    enableArgumentType:this.props.initialData != null ? this.props.initialData.enableArgumentType:false,
                    returnTypeBlockCss:this.props.initialData != null && this.props.initialData.enableReturnType?'show':'hidden',
                    argTypeBlockCss :this.props.initialData != null && this.props.initialData.enableArgumentType?'show':'hidden',
                 }

    console.log("MethodBasedCapturingAdd---constr called",this.props.initialData)
   
    }

    handleChange(event, index, value) {
        console.log("handleChange value - ", value)
         this.setState({'operator' : value,
                        'ruleTypeDivCss':'show',
                        'addComp': 'show',
                            
            })            
                     
    }


    componentWillMount() {
        console.log("this.satte---",this.state.ruleTypes)
    }

    componentWillReceiveProps(nextProps) {
      console.log("nextProps--Form_MethodBasedCaptureEdit---",nextProps.initialData)
      if(this.props.initialData != nextProps.initialData){
          this.setState({'fqm':nextProps.initialData.fqm,
                        'returnTypeTableData':nextProps.initialData.returnTypeData,
                        'argumentTypeTableData':nextProps.initialData.argumentTypeData
         })
    }
 }

    handleCheck(event, value) {
        this.setState({ 'dynamicPartReq': value })
    }

    submitValType() {

    if(this.state.paramName == '' || this.state.btName == '' ||this.state.opCode == '' ){
       this.setState({errMsgCss:'show'})
    }
    else{
       this.setState({count:this.state.count+1,
                      errMsgCss:'hidden'
        })
       var ruleType = {'paramName':this.state.paramName,
                     'opCode':this.state.opCode,
                     'btName':this.state.btName,
                     'operationName':this.state.operationName
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

    operationChange(value, id,operationName) {
        console.log("operationChange called--",value);
        this.setState({opCode:value,
                        operationName:operationName
        })
    }

    btNameChange(value, id) {
        console.log("btNameChange called--",value);
        this.setState({btName:value})
        // this.editValArr(id,'lb',value)
    }

 //NOT USED   
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
  console.log("this.state.value--",this.state.value)
  console.log("this.state.opCode--",this.state.opCode)
  console.log("this.state.btName--",this.state.btName)

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
                     'operationName':this.state.operationName,
                     'opCodeDropDown': {"dropDownVal":this.state.opCode}, 
                     'btMethodRuleId':this.state.count
    }
  
 
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
  console.log("this.state.rilrtYpe--",this.state.ruleTypesChanged)
  var arrData = Object.assign([],this.state.ruleTypesChanged)
   //var arrData = this.state.changedValArr;
  
  if(arrData != null && arrData.length != 0){
    arrData.map(function(value){
        console.log("value---",value)
      if(value.btMethodRuleId == row.btMethodRuleId){ //handling the case when 1 row is edited multiple times or same row but diff column
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
    console.log("onBeforeSaveCell method called in dialog_AttrValues",row)
    console.log("onBeforeSaveCell method called in dialog_AttrValues--",cellName)
    console.log("cellValue---",cellValue)
  }

  handleOpen(){
      this.setState({addCompCSS:'show'})
  }

handleEnableArgumentType(evnt,isInputChecked){
    console.log("handleEnableArgumentType method called--",isInputChecked)
    let argTypeBlockCss = isInputChecked ?'show':'hidden';
    this.setState({enableArgumentType:isInputChecked,
                   argTypeBlockCss :argTypeBlockCss
    })
}

   onChangeOpDropDown(val,row){
        console.log("val----",val)
        console.log("row---",row)
        this.onAfterSaveCell(row,"opCode", val)
    }

handleEnableReturnType(evt,isInputChecked){
    console.log("isInputChecked---",isInputChecked)
    let returnTypeBlockCss = isInputChecked ?'show':'hidden'
    this.setState({enableReturnType  : isInputChecked,
                   returnTypeBlockCss  : returnTypeBlockCss,
                 
    })
}

    

    
    returnTypeData(data){
         console.log("data-----",data)
        this.setState({returnTypeData:data})
    }


    submit(){
        console.log("data-submit method of methodbasedaddcaotyring called-",data)
        var data = {'a':'def'}
        this.props.finalData(data);
    }

    fqmChange(evt,val){
        console.log("fqmChange method called",val)
      this.setState({'fqm':val})

      

    }

/**********for return Type add component fields************** */
    onHdrNameChnge(val){
        console.log("onHdrNameChngeval---",val)
        this.setState({returnTypeHdr:val})
    }

    onOperationChange(operationId,operationName){
        console.log("val---onOperationChange---",operationId)
        console.log("operationName---",operationName)
        this.setState({returnTypeOperation:operationName})
    }

    onOperationVal(val,operatorName){
        console.log("operatorName---",operatorName)
        this.setState({returnTypeOpVal:val,
                        returnTypeOperatorName:operatorName
        })
    }
    
    argumentTypeData(data){
        console.log("data-----",data)
        this.setState({argumentTypeData:data})
    }

    lbChange(lbVal){
        this.setState({lbVal:lbVal})
    }
    
    rbChange(rbVal){
        this.setState({rbVal:rbVal})
    }

    addData(){

    }

    render() {

    const { fields: {fqm, enableReturnType, enableArgumentType}, resetForm, handleSubmit, onSubmit, submitting, isActive} = this.props
    const cellEditProp = {
      mode: 'click',
      blurToSave: true,
      beforeSaveCell: this.onBeforeSaveCell.bind(this), // a hook for before saving cell
      afterSaveCell: this.onAfterSaveCell.bind(this)  // a hook for after saving cell
 };

        return (
             <form >
            <div>
                <div className="row col-md-10">
                    <div className="col-md-5">
                        <TextField
                            {...fqm}
                            floatingLabelText="Fully qualified Method Name"
                            onChange = {this.fqmChange.bind(this)}
                            defaultValue = {this.state.fqm}
                            style ={{width:'500px'}}
                            disabled = 'true'
                            />
                    </div>
                </div>

                   <div className = "row " style= {{top:'13px'}} >
                    <div className = "col-md-6">
                         <Checkbox
                         {...enableReturnType}
                        value="enableReturnType"
                        label="Return Value"
                        checked={this.state.enableReturnType}
                        onCustomChange={this.handleEnableReturnType.bind(this)}
                        labelStyle={{ fontWeight: 'normal' }}
                        />
                    </div>
                </div>

                    <div className = {`row col-md-10 ${this.state.returnTypeBlockCss}`} style = {{'position':'relative','left':'30px'}}>
                     <ReturnTypeComp 
                     data = {this.returnTypeData.bind(this)} 
                     oplistForReturnType={this.state.listForReturnType}
                     fqm = {this.state.fqm}
                     tableData = {this.state.returnTypeTableData}

                     
                     />
                    </div>

                    <div className = "row">
                     <div className = "col-md-8">
                        <Checkbox
                        {...enableArgumentType}
                        value="enableArgumentType"
                        label="Argument Value"
                        checked={this.state.enableArgumentType}
                        onCustomChange={this.handleEnableArgumentType.bind(this)}
                        labelStyle={{ fontWeight: 'normal' }}
                        />
                    </div>
                 </div>

                 <div className = {`row col-md-10 ${this.state.argTypeBlockCss}`} style = {{'position':'relative','left':'30px'}}>
                        <ArgumentTypeComp 
                        data = {this.argumentTypeData.bind(this)} 
                        fqm = {this.state.fqm}
                        tableData = {this.state.argumentTypeTableData}
                        />
                 </div>
                 
          {/*   <RaisedButton className="pull-right"
              backgroundColor="#18494F"
              label="Submit"
              labelColor="#FFF"
              onClick={this.addData.bind(this)}
              disabled={this.props.profileDisabled}
              disabledLabelColor="#000"
              labelStyle={{ fontSize: 12 }}
              style={{ position: 'relative', left:'100px'}}>
            </RaisedButton>         
            */
          }
            
              </div>
            </form>
        );
    }
}


Form_MethodBasedCaptureEdit.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
}

export default reduxForm({ // <----- THIS IS THE IMPORTANT PART!
  form: 'Session Attribute Monitor ',        // a unique name for this form
  fields
 
},
  state => ({ // mapStateToProps
    valData: state.sessionAttrMonitor.valData,
    initialValues : state.methodBasedCustomData.initializeForm,
    initialData : state.methodBasedCustomData.initializeForm
  }),
  {
   
    toggleAddCustomCapture: toggleAddCustomCapture,
    addRules:addRules,
    updateHttpReqHdr :updateHttpReqHdr 
  } // mapDispatchToProps (will bind action creator to dispatch)
)(Form_MethodBasedCaptureEdit);

