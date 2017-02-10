//Importing React components
import React, { PropTypes } from 'react'
import {reduxForm} from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TextField from 'material-ui/TextField';
import Is from 'is_js';
import MenuItem from 'material-ui/MenuItem';
import {List, ListItem} from 'material-ui/List';
import ContentSend from 'material-ui/svg-icons/content/send';

//Importing React components
import DropDownMenu from '../../../../components/SelectFieldWrapper';
import Toggle from '../../../../components/ToggleWrapper';


export const fields = ['ruleName','errorFrom','errorTo','enabled','ruleDesc']
 const validate = values=> {
  const errors = { }

  if(!values.ruleName) 
     errors.ruleName = 'Required'

   else if(!Is.alphaNumeric(values.ruleName))
      errors.ruleName = 'Special character is not allowed.'

   else if (values.ruleName.length > 50)
    errors.ruleName = 'Must be 50 characters or less'

   if(!values.errorFrom) 
     errors.errorFrom = 'Required'

   else if(values.errorFrom.length > 5)
     errors.errorFrom = "Please Enter upto 5 Digits Only"

   else if(isNaN(values.errorFrom ))
    errors.errorFrom = " Please Enter Only Numbers"

   if(!values.errorTo) 
     errors.errorTo = 'Required'

   else if(values.errorTo.length > 5)
     errors.errorTo = "Please Enter upto 5 Digits Only "

    else if(isNaN(values.errorTo))
      errors.errorTo = 'Please Enter Numbers Only'

   if(!values.ruleDesc) 
     errors.ruleDesc = 'Required'

    else if (values.ruleDesc.length > 100)
    errors.ruleDesc = 'Must be 100 characters or less'

   return errors
 }


const styles = {
  block: {
    maxWidth: 250,
    paddingBottom:5
  },
   toggle: {
      marginTop:30 ,
      paddingLeft:80
  },
  customWidth: {
      width: 200
    },
  checkbox: {
    marginBottom: 16,
    paddingTop:35
  }
};


class Form_ErrorDetection extends React.Component {

  constructor(props) {
  super(props);
  this.handleChange=this.handleChange.bind(this);
  this.state ={enable:false}
  }

handleChange(event,index,value){  
  console.log("event-----",event)
  console.log("index------",index)                             
  console.log("on handleChange----",value)

}


componentWillMount() {
  }

handleCheck(event,value)
{
  console.log("inside check value - ",value)
  // this.setState({'dynamicReqDiv': value})  
}

  render() {
    
     const { fields: {ruleName,errorFrom,errorTo,enabled,ruleDesc}, resetForm, handleSubmit,onSubmit, submitting} = this.props
  return (
    <form>
    <div className ="row">
        <div className ="col-md-8">
          <TextField
              // hintText="Hint Text"
               floatingLabelText="Rule Name"
               {...ruleName}
               style={{ 'width': '400' }}
               errorText = {ruleName.touched &&  ruleName.error && <div> { ruleName.error}</div> }
          />
        </div>
      
  </div>

     <div className="row">
       <div className ="col-md-3">
       <TextField
          // hintText="Hint Text"
           floatingLabelText="From"
           {...errorFrom}
           style={{ 'width': '100' }}
          errorText = {errorFrom.touched &&  errorFrom.error && <div> { errorFrom.error}</div> }

          />
        </div>
        
        <div className ="col-md-3">
       <TextField
          // hintText="Hint Text"
           floatingLabelText=" To"
           {...errorTo}
           style={{ 'width': '100' }}
          errorText = {errorTo.touched &&  errorTo.error && <div> { errorTo.error}</div> }
          />
        </div>
          <div className ="col-md-3">
         <Toggle 
          {...enabled} 
          style={styles.toggle} 
          label="Enabled" 
        />
      </div>
     </div>
     
      <div className ="row">
        <div className ="col-md-8">
          <TextField
              // hintText="Hint Text"
               floatingLabelText="Description"
               {...ruleDesc}
               style={{ 'width': '450' }}
               errorText = {ruleDesc.touched &&  ruleDesc.error && <div> { ruleDesc.error}</div> }
          />
        </div>
  </div>
    
    </form>
    );
  }
}

Form_ErrorDetection.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
}

export default reduxForm({ // <----- THIS IS THE IMPORTANT PART!
  form: 'Error Detection ',        // a unique name for this form
  fields,
  validate
  
},
  state => ({ // mapStateToProps
     errorDetection : state.errorDetection,
     initialValues: state.errorDetection.errorDetectionFormInitialData,
  
}),
 { 

 } // mapDispatchToProps (will bind action creator to dispatch)
) (Form_ErrorDetection);

