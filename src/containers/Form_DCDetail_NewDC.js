import React, { PropTypes } from 'react'
import {reduxForm} from 'redux-form';
import TextField from 'material-ui/TextField';
import Is from 'is_js';
export const fields = [ 'DCName', 'DCIP', 'DCPort','NDEIP','NDEPort' ]

const validate = values => {
  const errors = {}
 
  if (!values.DCName) {
    errors.DCName = 'Required'
  } else if (values.DCName.length > 15) {
    errors.DCName = 'Must be 15 characters or less'
  }else if (!Is.alphaNumeric(values.DCName)) {
    errors.DCName = 'Invalid DC Name'
  }
  if (!values.DCIP) {
    errors.DCIP = 'Required'
  } else if (!Is.ip(values.DCIP)) {
    errors.DCIP = 'Invalid IP address'
  }

  if (!values.DCPort) {
    errors.DCPort = 'Required'
  } else if (isNaN(Number(values.DCPort))) {
    errors.DCPort = 'Must be a number'
  } else if (values.DCPort.length > 4) {
    errors.DCPort = 'Must be 4 digits'
  }
  
  if (!values.NDEIP) {
    errors.NDEIP = 'Required'
  } else if (!Is.ip(values.NDEIP)) {
    errors.NDEIP = 'Invalid IP address'
 }
  if (!values.NDEPort) {
    errors.NDEPort = 'Required'
  } else if (isNaN(Number(values.NDEPort))){
    errors.NDEPort = 'Must be a number'
  } else if (values.NDEPort.length > 4) {
    errors.NDEPort = 'Must be 4 digits'
  }

  return errors
}
class NewApplication extends React.Component {

  constructor(props) {
    super(props);
    console.log("in form dc detail--",this.props)
  }


  render() {
      console.log("props",this.props);

     const { fields: { u2,DCName, DCIP, DCPort,NDEIP, NDEPort}, resetForm, handleSubmit,onSubmit, submitting } = this.props
     return (
  <form >
            <div className ="row" >
              <div className ="col-md-6">
                <TextField
                  hintText="Hint Text"
                  floatingLabelText="DCName"
                  {...DCName}
                  errorText={DCName.touched && DCName.error && <div>{DCName.error}</div>}
                />
             </div>


             <div className="col-md-6">
               <TextField
                  hintText="Hint Text"
                  floatingLabelText="DCIP"
                  {...DCIP}
                  errorText={DCIP.touched && DCIP.error && <div>{DCIP.error}</div>}
                />
             </div>
        </div>

             <div className ="row">
              <div className ="col-md-6">
              <TextField
                  hintText="Hint Text"
                  floatingLabelText="DCPort"
                  {...DCPort}
                  errorText={DCPort.touched && DCPort.error && <div>{DCPort.error}</div>}
                />
             </div>
            </div>

            <div className="row">
              <div className ="col-md-6">
              <TextField
                  hintText="Hint Text"
                  floatingLabelText="NDEIP"
                  {...NDEIP}
                  errorText={NDEIP.touched && NDEIP.error && <div>{NDEIP.error}</div>}
                />
             </div>


             <div className="col-md-6">
              <TextField
                  hintText="Hint Text"
                  floatingLabelText="NDEPort"
                  {...NDEPort}
                  errorText={NDEPort.touched && NDEPort.error && <div>{NDEPort.error}</div>}
                />
             </div>

            </div>
            

       </form>
     );
   }
}
NewApplication.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
}

export default reduxForm({ // <----- THIS IS THE IMPORTANT PART!
  form: 'contact',                           // a unique name for this form
  fields,
  validate
})(NewApplication);
