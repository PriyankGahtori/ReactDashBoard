//Importing React components
import React,{PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';
import RadioButton from 'material-ui/RadioButton';
import RaisedButton  from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import ConfirmDialog from 'material-ui/Dialog';
import MenuItem from 'material-ui/MenuItem';
import Is from 'is_js';

//Importing React components
import Checkbox from '../../../../components/CheckboxWrapper';
import Input from '../../../../components/InputWrapper';
import {submitKeywordData,initializeInstrException}  from '../../../../actions/index';
import RadioButtonGroup from '../../../../components/RadioButtonGroupWrapper';
import {triggerRunTimeChanges} from '../../../../actions/runTimeChanges';
import DropDownMenu from '../../../../components/SelectFieldWrapper';



export const fields = [
'excptPerct',
'fqm',
'exceptionTypeForMethod',
'exceptnName'
];

const validate = values=> {
  const errors = { }
  if(!values.excptPerct && values.excptPerct != 0 )
   errors.excptPerct ="Required"

 else if(values.excptPerct < 0 || values.excptPerct >100)
   errors.excptPerct ="Please Enter Values between 0 and 100"
 
 if(!values.exceptionTypeForMethod)
   errors.exceptionTypeForMethod = 'Required'

  if(!values.fqm)
  errors.fqm = "Required"

  else if(values.fqm.length > 500)
  errors.fqm = "Must be 500  Characters or less "

  if(!values.exceptnName)
  errors.exceptnName = "Required"

  else if(values.exceptnName.length > 100)
  errors.exceptnName = "Must be 100  Characters or less "

  else if (Number(values.exceptnName))
  errors.exceptnName = 'Please Enter Only Characters'

  else if(!Is.alphaNumeric(values.exceptnName))
    errors.exceptnName = 'Special characters are not allowed.'

return errors
}
const styles = {
  input: {
    width: 150,
  },
  customWidth: {
    width: 300
  },
  error:{
    fontSize: 12,
    color: 'red' 
  },
  
};
class Form_GenerateExceptInMethod extends React.Component {

  constructor(props) {
    super(props);
    this.state ={
      'exceptionType':"unhandledException",
      'enableGenExcptInMethodCheckbox' : false
    }
  }
  componentWillMount() {
   // this.props.initializeInstrException();
 }

 componentWillReceiveProps(nextProps)  {
  if(this.props.initialData != nextProps.initialData){
   this.setState({exceptionTypeForMethod:nextProps.initialData.exceptionTypeForMethod
   })
 }
}





handleGenExcptInMethodCheckboxChange(event,isInputChecked){
  this.setState({enableGenExcptInMethodCheckbox:isInputChecked})
}

//This function is called when dropdown of ExceptionType is Changed
changeExceptionTypeMethod(event, index, value){
  this.setState({exceptionTypeForMethod:value})
}

render() {
  const { fields: {
    excptPerct ,
    fqm ,
    exceptionTypeForMethod,
    exceptnName


  }, resetForm, handleSubmit,onSubmit, submitting } = this.props
  
  return (
    <div  style={{'paddingLeft':29}}>

    <form>

    <div className = "row">
    <div className = "col-md-2" style={{'paddingTop':29}}>
    <p for="sess_perct" >Percentage  </p>
    </div>

    <div className = "col-md-4" style={{'paddingTop':29}}>
    <Input
    {...excptPerct} 
    id="sess_perct"
    style={styles.input} 
    type="number" 
    min="0" 
    max="100" 
    step="1"   />
    <div style={styles.error}>   {excptPerct.touched && excptPerct.error && <div>{excptPerct.error} </div> } </div>

    </div>

    <div className = "col-md-6">
    <TextField
    hintText = "Hint Text"
    floatingLabelText = " Fully Qualified Method Name"
    {...fqm}
    errorText = {fqm.touched &&  fqm.error && <div> { fqm.error}</div> }

    />
    </div>
    </div>

    <div className = "row">
    
    <div className = "col-md-6">
    <DropDownMenu 
    {...exceptionTypeForMethod}
    
    style={styles.customWidth}
    value = {this.state.exceptionTypeForMethod}
    autoWidth={false}
    customOnChange={this.changeExceptionTypeMethod.bind(this)} 
    floatingLabelText="Exception Type"
    autoScrollBodyContent={true}
    >

    <MenuItem value = {"1"}  primaryText = "Null Pointer Exception"/>
    <MenuItem value = {"2"}  primaryText = "Array Index Out Of Bound Exception"/>
    <MenuItem value = {"3"}  primaryText = "Class cast Exception" />
    <MenuItem value = {"4"}  primaryText = "Arithmetic Exception" />
    <MenuItem value = {"5"}  primaryText = "Illegal Exception" />

    </DropDownMenu>
    <div style={styles.error}>{exceptionTypeForMethod.touched && exceptionTypeForMethod.error && <div>{exceptionTypeForMethod.error} </div> }</div>

    </div>


    <div className = "col-md-6">
    <TextField
    hintText="Hint Text"
    floatingLabelText=" Exception Name"
    {...exceptnName}
    errorText={exceptnName.touched && exceptnName.error && <div> {exceptnName.error}</div> }
    />
    </div>
    </div>
    </form>

    
    </div>

    );
}
}
Form_GenerateExceptInMethod.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
}

export default reduxForm({
  form: 'Form_EnableExcptcapturing',
  fields,
  validate

},
  state => ({ // mapStateToProps
    initialData :state.Keywords.initializeKeywords.genExcptInMethodObj,
    getAllKeywordData :state.Keywords,
    initialValues :state.Keywords.initializeKeywords.genExcptInMethodObj,
    trData : state.initialData.trData,
    trModeDetail: state.trModeDetail
  }),
  
  { 
   submitKeywordData:submitKeywordData,
   initializeInstrException:initializeInstrException
 } // mapDispatchToProps (will bind action creator to dispatch)
 )(Form_GenerateExceptInMethod);