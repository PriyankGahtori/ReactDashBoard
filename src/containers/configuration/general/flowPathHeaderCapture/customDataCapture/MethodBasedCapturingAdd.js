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
import * as actionCreators from '../../../../../actions/index';
import ReturnTypeComp from './ReturnTypeComponent';
import * as opData  from './OperationVal';


export const fields = ['fqm','enableArgumentType','enableReturnType','returnTypeList','argumentTypeList']

const validate = values => {
    const errors = {}
     if(!values.fqm)
      errors.fqm = 'Required'

     if(!values.returnType)
      errors.returnType = 'Required'


     if(values.enableArgumentType){
       if(!values.argumentIndex)
        errors.argumentIndex = 'Required'

     else if (isNaN(values.argumentIndex))
    errors.argumentIndex = 'Please Enter Only Numbers'
     }
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



class MethodBasedCapturingAdd extends React.Component {

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
                    enableArgumentType:false,
                    argumentIndexCss:'hidden',

                    returnTypeBlockCss:'hidden',
                    argTypeBlockCss :'hidden'
                 }
    console.log("MethodBasedCapturingAdd---constr called")
   
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
      console.log("nextProps--",nextProps.active)
      console.log("this.props.active --",this.props.active )
      console.log("nextProps.active == 'true'---",nextProps.active == 'true')
        if(nextProps.active){
            var data = {'fqm':this.state.fqm,
                        'enableReturnType':this.state.enableReturnType,
                        'returnTypeData':this.state.returnTypeData,
                        'enableArgumentType':this.state.enableArgumentType,
                        'argumentTypeData':this.state.argumentTypeData 
            }
            console.log("data of methodbasedcapoturing---",data)
             this.props.addMethodBasedCapturingDataToServer(data,this.props.profileId);
            this.props.toggleAddCustomCapture();
        }
           
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

        //for getting return Type
            let fqm = val;
            let returnType ;
            if(fqm != null){
            let li = fqm.indexOf(')');
            //let bi = fqm.indexOf('(');
            let i = li + 1;

                let pi = 1;
                let charArr = fqm.split('');
                console.log("charArr----",charArr)
            
            //  while (i < li)
            //{
                console.log("iiiiiiiiiiiiiii--",charArr[i])
        //      System.out.println("pi " + pi + ", index - " + index + ", char - " + charArr[i] + ", i" + i + " bracket -" + (bi +1));
            switch (charArr[i])
            {
            case 'Z':
                returnType = "boolean";
                break;
            case 'B':
                returnType = "byte";
                break;
            case 'C':
                returnType = "char";
                break;
            case 'S':
                returnType= "short";
                break;
            case 'I':
                returnType = "int";
                break;
            case 'J':
                returnType = "long";
                break;
            case 'F':
                returnType = "float";
                break;
            case 'D':
                returnType = "double";
                break;
            case 'L':
            case '[':
                while (charArr[i++] != ';')
                ;
                returnType = "object/string";
                break;
            default:
                returnType = "void";
                break;
            }
            
            console.log("returnType ---",returnType)
            let list = opData.opValList(returnType);
            console.log("list---",list)
            this.setState({listForReturnType:list})

            
    //}
  }

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
    const cellEditProp = {
      mode: 'click',
      blurToSave: true,
      beforeSaveCell: this.onBeforeSaveCell.bind(this), // a hook for before saving cell
      afterSaveCell: this.onAfterSaveCell.bind(this)  // a hook for after saving cell
 };

        return (
            <div>
                <div className="row col-md-10">
                    <div className="col-md-5">
                        <TextField
                            floatingLabelText="Fully qualified Method Name"
                            onChange = {this.fqmChange.bind(this)}
                            style ={{width:'500px'}}
                            />
                    </div>
                </div>

                   <div className = "row " style= {{top:'13px'}} >
                    <div className = "col-md-6">
                         <Checkbox
                        value="enableReturnType"
                        label="Return Value"
                        checked={this.state.enableReturnType}
                        onCustomChange={this.handleEnableReturnType.bind(this)}
                        labelStyle={{ fontWeight: 'normal' }}
                        />
                    </div>
                </div>

                    <div className = {`row col-md-10 ${this.state.returnTypeBlockCss}`} style = {{'position':'relative','left':'30px'}}>
                       {/*  <AddComp 
                            data = {this.returnTypeData.bind(this)} 
                            hideIndexField = {true} 
                            onHdrNameChange={this.onHdrNameChnge.bind(this)}
                            onOperationChange = {this.onOperationChange.bind(this)}
                            onOperationVal = {this.onOperationVal.bind(this)}
                            />
                    */}
                     <ReturnTypeComp data = {this.returnTypeData.bind(this)} oplistForReturnType={this.state.listForReturnType}/>
                    </div>

                    <div className = "row">
                     <div className = "col-md-8">
                        <Checkbox
                        value="enableArgumentType"
                        label="Argument Value"
                        checked={this.state.enableArgumentType}
                        onCustomChange={this.handleEnableArgumentType.bind(this)}
                        labelStyle={{ fontWeight: 'normal' }}
                        />
                    </div>
                 </div>

                 <div className = {`row col-md-10 ${this.state.argTypeBlockCss}`} style = {{'position':'relative','left':'30px'}}>
                        <ArgumentTypeComp data = {this.argumentTypeData.bind(this)} fqm = {this.state.fqm}/>
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
        );
    }
}


function mapStateToProps(state) {
  return {
    appDetail: state.applicationdata,
    getAllKeywordData: state.Keywords
  };
}

//method to dispatch actions to the reducers
function mapDispatchToProps(dispatch) {
  //const actionMap = { loadInitTreeData: bindActionCreators(fetchTreeData, dispatch) };
  //return actionMap;
  return bindActionCreators(actionCreators, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(MethodBasedCapturingAdd);


