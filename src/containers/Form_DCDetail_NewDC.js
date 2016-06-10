import React, { PropTypes } from 'react'
import {reduxForm} from 'redux-form';
import TextField from 'material-ui/TextField';
import Is from 'is_js';
export const fields = [ 'dcName', 'dcIp', 'dcPort','ndeIp','ndePort' ]

const validate = values => {
  const errors = {}
 
  if (!values.dcName) {
    errors.dcName = 'Required'
  } else if (values.dcName.length > 15) {
    errors.dcName = 'Must be 15 characters or less'
  }else if (!Is.alphaNumeric(values.DCName)) {
    errors.dcName = 'Invalid DC Name'
  }

  if (!values.dcIp) {
    errors.dcIp = 'Required'
  } else if (!Is.ip(values.dcIp)) {
    errors.dcIp = 'Invalid IP address'
  }

  if (!values.dcPort) {
    errors.dcPort = 'Required'
  } else if (isNaN(Number(values.dcPort))) {
    errors.dcPort = 'Must be a number'
  } else if (values.dcPort.length > 4) {
    errors.dcPort = 'Must be 4 digits'
  }
  
  if (!values.ndeIp) {
    errors.ndeIp = 'Required'
  } else if (!Is.ip(values.ndeIp)) {
    errors.ndeIp = 'Invalid IP address'
 }
  if (!values.ndePort) {
    errors.ndePort = 'Required'
  } else if (isNaN(Number(values.ndePort))){
    errors.ndePort = 'Must be a number'
  } else if (values.ndePort.length > 4) {
    errors.ndePort = 'Must be 4 digits'
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

     const { fields: { dcName, dcIp, dcPort,ndeIp, ndePort}, resetForm, handleSubmit,onSubmit, submitting } = this.props
     return (
  <form >
            <div className ="row" >
              <div className ="col-md-6">
                <TextField
                  hintText="Hint Text"
                  floatingLabelText="DCName"
                  {...dcName}
                  errorText={dcName.touched && dcName.error && <div>{dcName.error}</div>}
                />
             </div>


             <div className="col-md-6">
               <TextField
                  hintText="Hint Text"
                  floatingLabelText="DCIP"
                  {...dcIp}
                  errorText={dcIp.touched && dcIp.error && <div>{dcIp.error}</div>}
                />
             </div>
        </div>

             <div className ="row">
              <div className ="col-md-6">
              <TextField
                  hintText="Hint Text"
                  floatingLabelText="DCPort"
                  {...dcPort}
                  errorText={dcPort.touched && dcPort.error && <div>{dcPort.error}</div>}
                />
             </div>
            </div>

            <div className="row">
              <div className ="col-md-6">
              <TextField
                  hintText="Hint Text"
                  floatingLabelText="NDEIP"
                  {...ndeIp}
                  errorText={ndeIp.touched && ndeIp.error && <div>{ndeIp.error}</div>}
                />
             </div>


             <div className="col-md-6">
              <TextField
                  hintText="Hint Text"
                  floatingLabelText="NDEPort"
                  {...ndePort}
                  errorText={ndePort.touched && ndePort.error && <div>{ndePort.error}</div>}
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
