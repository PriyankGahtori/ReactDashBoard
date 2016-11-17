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

 const styles = {
  input: {
    width: 150,
  },
   customWidth: {
      width: 300
    }
}
class Form_GenerateExceptInMethod extends React.Component {

  constructor(props) {
    super(props);
    this.state ={
                'exceptionConfDivCss'    : 'hidden',
                'stackTraceDepthValueCss':'hidden',
                'enableCaptureExceptCheckBox':false,
                'exceptionType':"unhandledException",
                'enableGenExcptInMethodCheckbox' : false
    }
  }
  componentWillMount() {
   // this.props.initializeInstrException();
  }

  componentWillReceiveProps(nextProps)  {
    console.log("nextProps.initialData--",nextProps.initialData)
    console.log("this.props.initialData--",this.props.initialData)
    if(this.props.initialData != nextProps.initialData){
      console.log("nextProps.initialData.exceptionTypeForMethod",nextProps.initialData.exceptionTypeForMethod)
        this.setState({exceptionTypeForMethod:nextProps.initialData.exceptionTypeForMethod
        })
    }
}
  
 
 
 
  /************ function for GENERATEEXCEPTIONINMETHOD keyword **********************/

  handleGenExcptInMethodCheckboxChange(event,isInputChecked){
    console.log("isInputChecked---",isInputChecked)
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
      <div className ="row" style={{'paddingLeft':29}}>

        <form>

        <div className = "row">
           <div className = "col-md-2" style={{'paddingTop':29}}>
                <label for="sess_perct" >Percentage   </label>
           </div>

            <div className = "col-md-4" style={{'paddingTop':29}}>
               <Input
                {...excptPerct} 
                 id="sess_perct"
                style={styles.input} 
                 type="number" 
                 min="0" 
                 max="100" 
                 step="1"  
                 />
             </div>

              <div className = "col-md-6">
                 <TextField
                  hintText = "Hint Text"
                  floatingLabelText = "Enter FQM"
                  {...fqm}
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
       
        </div>


            <div className = "col-md-6">
                 <TextField
                  hintText="Hint Text"
                  floatingLabelText="Enter Exception Name"
                  {...exceptnName}
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