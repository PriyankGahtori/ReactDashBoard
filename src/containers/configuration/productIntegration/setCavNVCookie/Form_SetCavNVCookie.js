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
import {triggerRunTimeChanges} from '../../../../actions/runTimeChanges';



export const fields = [
'cookieName',
'serviceMethodDepth',
'enableNewFormat',
'maxFpBucketSize'

];

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
     'maxDepthSizeCss':'hidden'
    }
    this.enableNewFormat = this.enableNewFormat.bind(this);
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



enableNewFormat(evt,isInputChecked){
  console.log("isInputChecked--",isInputChecked)
  let maxDepthSizeCss = isInputChecked ?'show':'hidden'
  this.setState({'maxDepthSizeCss':maxDepthSizeCss,
                 'enableNewFormat':isInputChecked
  })

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
          cookieName,
          serviceMethodDepth,
          enableNewFormat,
          maxFpBucketSize


  }, resetForm, handleSubmit,onSubmit, submitting } = this.props
  
  return (
    <div  style={{'paddingLeft':29}}>

    <form>

    <div className = "row">
      <div className = "col-md-6">
          <TextField
          hintText = "Hint Text"
          floatingLabelText = " Cookie Name"
          {...cookieName}
          />
      </div>
    </div>

    <div className = "row">
      <div className = "col-md-6">
          <TextField
          hintText="Hint Text"
          floatingLabelText="Service Method Depth"
          {...serviceMethodDepth}
          />
        </div>
    </div>

  
    <div className = "row">
      <div className = "col-md-6">
        <Checkbox
        {...enableNewFormat}
        label="capture All FlowPaths "
        value = "enableNewFormat"
        checked  = {this.state.enableNewFormat}
        onCustomChange ={this.enableNewFormat.bind(this)}  />
{/* <p style={{paddingLeft:35}}> (Enable/Disable BT Monitor)</p>*/}

    </div>
  </div>

      <div className = {`row ${this.state.maxDepthSizeCss}`}>
          <div className = "col-md-6">
            <TextField
            hintText="Hint Text"
            floatingLabelText="Maximum flowPath Bucket Size"
          {...maxFpBucketSize}
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
  form: 'Form_setCavNVCookie',
  fields
  

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