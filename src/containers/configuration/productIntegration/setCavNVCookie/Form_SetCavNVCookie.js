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


const validate = values =>{
  const errors = {}

  if(!values.cookieName)
    errors.cookieName = 'Required'

  // if(!values.serviceMethodDepth)
  //   errors.serviceMethodDepth = 'Required'

  // else if(isNaN(values.serviceMethodDepth))
  //   errors.serviceMethodDepth = 'Must enter only numbers'

   if(values.maxFpBucketSize != null && isNaN(values.maxFpBucketSize))
    errors.maxFpBucketSize = 'Must enter only numbers'

  return errors;
}

export const fields = [
'cookieName',
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
class Form_SetCavNVCookie extends React.Component {

  constructor(props) {
    super(props);
    this.state ={
    //  enableNewFormat :this.props.initialData.enableNewFormat
    }
    // this.enableNewFormat = this.enableNewFormat.bind(this);
  }
  componentWillMount() {
   // this.props.initializeInstrException();
 }

 componentWillReceiveProps(nextProps)  {
  if(this.props.initialData != nextProps.initialData){
 }
}



enableNewFormat(evt,isInputChecked){
  console.log("isInputChecked--",isInputChecked)
  let maxDepthSizeCss = isInputChecked ?'show':'hidden'
  this.setState({'maxDepthSizeCss':maxDepthSizeCss})

}

handleGenExcptInMethodCheckboxChange(event,isInputChecked){
  this.setState({enableGenExcptInMethodCheckbox:isInputChecked})
}


render() {
  const { fields: {
          cookieName,
          maxFpBucketSize


  }, resetForm, handleSubmit,onSubmit, submitting } = this.props
  
  return (
    <div  style={{'paddingLeft':29}}>

    <form>

    <div className = "row">
      <div className = "col-md-8">
          <TextField
          floatingLabelText = " Cookie Name"
          {...cookieName}
          style={{ 'width': '350' }}
         errorText={cookieName.touched && cookieName.error && <div>{cookieName.error}</div>}/>   
        
      </div>
      {/*<div className = "col-md-4">
          <TextField
          floatingLabelText="Service Method Depth"
          {...serviceMethodDepth}
          style={{ 'width': '150' }}
        errorText={serviceMethodDepth.touched && serviceMethodDepth.error && <div>{serviceMethodDepth.error}</div>}/>   
       
        </div>*/}
    </div>

   
    <div className = "row">
      {/*<div className = "col-md-6">
        <Checkbox
        {...enableNewFormat}
        label="Capture All Flow Paths "
        value = "enableNewFormat"
        checked  = {this.state.enableNewFormat}
        onCustomChange ={this.enableNewFormat.bind(this)}  />
    </div>*/}
  </div>

    
          <div className = "col-md-6">
            <TextField
            floatingLabelText="Maximum flow path Bucket Size"
          {...maxFpBucketSize}
         errorText={maxFpBucketSize.touched && maxFpBucketSize.error && <div>{maxFpBucketSize.error}</div>}/>   
        </div>
    </form>

    
    </div>

    );
}
}
Form_SetCavNVCookie.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
}

export default reduxForm({
  form: 'Form_setCavNVCookie',
  fields,
  validate
  

},
  state => ({ // mapStateToProps
    initialData :state.Keywords.initializeKeywords.setCavCookieInitializeObj,
    getAllKeywordData :state.Keywords,
    initialValues :state.Keywords.initializeKeywords.setCavCookieInitializeObj,
    trData : state.initialData.trData,
    trModeDetail: state.trModeDetail
  }),
  
  { 
   submitKeywordData:submitKeywordData,
   initializeInstrException:initializeInstrException
 } // mapDispatchToProps (will bind action creator to dispatch)
 )(Form_SetCavNVCookie);