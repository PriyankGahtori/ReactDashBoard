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



// const validate = values =>{
//   const errors = {}

//   if(!values.cookieName)
//     errors.cookieName = 'Required'

//   // if(!values.serviceMethodDepth)
//   //   errors.serviceMethodDepth = 'Required'

//   // else if(isNaN(values.serviceMethodDepth))
//   //   errors.serviceMethodDepth = 'Must enter only numbers'

//    if(values.maxFpBucketSize != null && isNaN(values.maxFpBucketSize))
//     errors.maxFpBucketSize = 'Must enter only numbers'

//   return errors;
// }

export const fields = [

       'serviceMethodEntryDepth',
         'serviceMethodExitDepth',
          'onResponseCommitEvent',
          'enableCavNVHeader',
          'ndSessionCookieName',
          'domainName',
          'idleTimeOut',
          'maxFlowpathInSessionCount'

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
                   serviceMethodEntryDepth : this.props.initialData.serviceMethodEntryDepth,
                    serviceMethodExitDepth : this.props.initialData.serviceMethodExitDepth,
                    onResponseCommitEvent:this.props.initialData.onResponseCommitEvent,
                    enableCavNVHeader:this.props.initialData.enableCavNVHeader
    }
    // this.enableNewFormat = this.enableNewFormat.bind(this);
  }
  componentWillMount() {
   // this.props.initializeInstrException();
 }

 componentWillReceiveProps(nextProps)  {
  if(this.props.initialData != nextProps.initialData){
    this.setState({ serviceMethodEntryDepth : nextProps.initialData.serviceMethodEntryDepth,
                    serviceMethodExitDepth : nextProps.initialData.serviceMethodExitDepth,
                    onResponseCommitEvent:nextProps.initialData.onResponseCommitEvent,
                    enableCavNVHeader:nextProps.initialData.enableCavNVHeader
    })
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

handleServiceMethodEntryDepth(evt,isInputChecked){
  this.setState({serviceMethodEntryDepth:isInputChecked})
}

handleServiceMethodExitDepth(evt,isInputChecked){
  this.setState({serviceMethodExitDepth:isInputChecked})
}

handleOnResponseCommitEvent(evt,isInputChecked){
  this.setState({onResponseCommitEvent:isInputChecked})
}

handleEnableCavNVHeader(evt,isInputChecked){
  this.setState({enableCavNVHeader:isInputChecked})
}



render() {
  const { fields: {
          serviceMethodEntryDepth,
          serviceMethodExitDepth,
          onResponseCommitEvent,
          enableCavNVHeader,
          ndSessionCookieName,
          domainName,
          idleTimeOut,
          maxFlowpathInSessionCount
  }, resetForm, handleSubmit,onSubmit, submitting } = this.props
  
  return (
    <div  style={{'paddingLeft':29,'paddingTop':20}}>

    <form>

    <div className = "row">
      <div className = "col-md-6">
         <Checkbox
              {...serviceMethodEntryDepth}
              value="serviceMethodEntryDepth"
              label = "Enable Cookie at Method Entry"
              checked={this.state.serviceMethodEntryDepth}
              onCustomChange={this.handleServiceMethodEntryDepth.bind(this)}
              />
      </div>

       <div className = "col-md-6">
         <Checkbox
              {...serviceMethodExitDepth}
              value="serviceMethodExitDepth"
              label = "Enable Cookie at Method Exit"
              checked={this.state.serviceMethodExitDepth}
              onCustomChange={this.handleServiceMethodExitDepth.bind(this)}
              />
      </div>
      
    </div>

   
    <div className = "row">
      <div className = "col-md-6">
        <Checkbox
        {...onResponseCommitEvent}
        label="Enable Cookie OnResponseCommitEvent "
        value = "onResponseCommitEvent"
         checked={this.state.onResponseCommitEvent}
        onCustomChange={this.handleOnResponseCommitEvent.bind(this)}
        />
    </div>

     <div className = "col-md-6">
         <Checkbox
        {...enableCavNVHeader}
        label="Enable X CavNV Header "
        value = "enableCavNVHeader"
         checked={this.state.enableCavNVHeader}
        onCustomChange={this.handleEnableCavNVHeader.bind(this)}
        /> 
    </div>
  </div>

      <div className = "row">
          <div className = "col-md-6">
            <TextField
            floatingLabelText="ND Session Cookie Name"
            {...ndSessionCookieName}
            />
         </div>

          <div className = "col-md-6">
            <TextField
            floatingLabelText="Domain Name"
            {...domainName}
            />
         </div>
      </div>

      <div className = "row">
        <div className = "col-md-6">
         <TextField
            floatingLabelText="Idle TimeOut"
            {...idleTimeOut}
            />
        </div>

       <div className = "col-md-6">
          <TextField
            floatingLabelText="Maximum Flowpath In SessionCount"
            {...maxFlowpathInSessionCount}
            />
        </div> 
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
  fields
  //validate
  

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