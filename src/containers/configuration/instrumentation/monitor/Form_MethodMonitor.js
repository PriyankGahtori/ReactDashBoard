//Importing React components
import React, { PropTypes } from 'react'
import {reduxForm} from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TextField from 'material-ui/TextField';
import Is from 'is_js';
import ContentSend from 'material-ui/svg-icons/content/send';

//Importing files
import Toggle from '../../../../components/ToggleWrapper';


export const fields = ['methodName','methodDisplayName','methodDesc']

 const validate = values=> {
  const errors = { }

  if(!values.methodDisplayName) 
     errors.methodDisplayName = 'Required'

   else if (values.methodDisplayName.length > 50) 
    errors.methodDisplayName = 'Must be 50 characters or less'

   if(!values.methodName) 
     errors.methodName = 'Required'

    if(!values.methodDesc) 
     errors.methodDesc = 'Required'

    else if (values.methodDesc.length > 100) 
    errors.methodDesc = 'Must be 100 characters or less'

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
    }
};


class Form_MethodMonitor extends React.Component {

  constructor(props) {
  super(props);
  this.handleChange=this.handleChange.bind(this);
  this.state ={enable:false}
  }

handleChange(event,index,value){  
}

  componentWillMount() {
  }

handleCheck(event,value)
{
}

  render() {
     const { fields: {methodName,methodDisplayName,methodDesc}, resetForm, handleSubmit,onSubmit, submitting} = this.props
  return (
    <form>
    <div className ="row">
        <div className ="col-md-12">
       
         <TextField
              // hintText="Hint Text"
               floatingLabelText="Fully Qualified Method Name"
               {...methodName}
                style={{ 'width': '550' }}
              errorText = {methodName.touched &&  methodName.error && <div> { methodName.error}</div> }
          />
    </div>
    </div>
     <div className ="row">
        <div className ="col-md-12">
             <TextField
              // hintText="Hint Text"
               floatingLabelText="Method Display Name"
               {...methodDisplayName}
               style={{ 'width': '350' }}
               errorText = {methodDisplayName.touched &&  methodDisplayName.error && <div> { methodDisplayName.error}</div> }
               />
    </div>
    </div>
     <div className ="row">
        <div className ="col-md-12">
          <TextField
              // hintText="Hint Text"
               floatingLabelText="Method Description"
               {...methodDesc}
               style={{ 'width': '550' }}
              errorText = {methodDesc.touched &&  methodDesc.error && <div> { methodDesc.error}</div> }
          />
    </div>
    </div>
    </form>
    );
  }
}

Form_MethodMonitor.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
}

export default reduxForm({ // <----- THIS IS THE IMPORTANT PART!
  form: 'Method Monitor ',        // a unique name for this form
  fields,
  validate
  
},
  state => ({ // mapStateToProps
    methodMonitor : state.methodMonitor,
    initialValues:state.methodMonitor.methodMonitorFormInitialData,

  
}),
 { 
 } // mapDispatchToProps (will bind action creator to dispatch)
) (Form_MethodMonitor);

