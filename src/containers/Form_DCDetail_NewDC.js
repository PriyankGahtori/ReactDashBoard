import React, { PropTypes } from 'react'
import {reduxForm} from 'redux-form';
import TextField from 'material-ui/TextField';
export const fields = [ 'dcName', 'dcIP', 'dcPort','ndeIP','ndePort' ]

const validate = values => {
  const errors = {}
 
  if (!values.dcName) {
    errors.dcName = 'Required'
  } else if (values.dcName.length > 15) {
    errors.dcName = 'Must be 15 characters or less'
  }
  if (!values.dcIP) {
    errors.dcIP = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.dcIP)) {
    errors.dcIP = 'Invalid email address'
  }
  if (!values.dcPort) {
    errors.dcPort = 'Required'
  } else if (isNaN(Number(values.dcPort))) {
    errors.dcPort = 'Must be a number'
  } else if (Number(values.dcPort) < 18) {
    errors.dcPort = 'Sorry, you must be at least 18 years old'
  }
  if (!values.ndeIP) {
    errors.ndeIP = 'Required'
  } else if (values.ndeIP.length > 15) {
    errors.ndeIP = 'Must be 15 characters or less'
  }
  if (!values.ndePort) {
    errors.ndePort = 'Required'
  } else if (values.ndePort.length > 15) {
    errors.ndePort = 'Must be 15 characters or less'
  }


  return errors
}
class NewApplication extends React.Component {
  render() {
      console.log("props",this.props);

     const { fields: { u2,dcName, dcIP, dcPort,ndeIP, ndePort}, resetForm, handleSubmit, submitting } = this.props
     return (
       <form onSubmit={handleSubmit(data =>{ alert(JSON.stringify(data))})}>
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
                  {...dcIP}
                  errorText={dcIP.touched && dcIP.error && <div>{dcIP.error}</div>}
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
                  {...ndeIP}
                  errorText={ndeIP.touched && ndeIP.error && <div>{ndeIP.error}</div>}
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
             <div>
               <button type="submit" disabled={submitting}>
                 {submitting ? <i/> : <i/>} Submit
               </button>
               <button type="button" disabled={submitting} onClick={resetForm}>
                 Clear Values
               </button>
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
