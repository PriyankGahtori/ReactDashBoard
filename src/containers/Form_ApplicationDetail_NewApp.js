import React, { PropTypes } from 'react'
import {reduxForm} from 'redux-form';
import TextField from 'material-ui/TextField';
import Is from 'is_js';
export const fields = [ 'Name','Date', 'User' ]

const validate = values => {
  const errors = {}
 
  if (!values.Name) {
    errors.Name = 'Required'
  } else if (values.Name.length > 15) {
    errors.Name = 'Must be 15 characters or less'
  } else if (!Is.alphaNumeric(values.Name)) {
    errors.Name = 'Invalid Application Name'
  }

  if (!values.Date) {
    errors.Date = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(Date)) {
    errors.Date = 'Invalid email address'
  }

  if (!values.User) {
    errors.User = 'Required'
  } else if (isNaN(Number(values.dcPort))) {
    errors.dcPort = 'Must be a number'
  } else if (!Is.alphaNumeric(values.User)) {
    errors.Name = 'Invalid User'
  }
  
  return errors
}
class NewApplication extends React.Component {
  render() {
      console.log("props",this.props);

     const { fields: { Name, Date, User}, resetForm, handleSubmit, submitting } = this.props
     return (
       <form onSubmit={handleSubmit(data =>{ alert(JSON.stringify(data))})}>
            <div className ="row" >
              <div className ="col-md-6">
                <TextField
                  hintText="Hint Text"
                  floatingLabelText="Name"
                  {...Name}
                  errorText={Name.touched && Name.error && <div>{Name.error}</div>}
                />
             </div>


             <div className="col-md-6">
               <TextField
                  hintText="Hint Text"
                  floatingLabelText="Date"
                  {...Date}
                  errorText={Date.touched && Date.error && <div>{Date.error}</div>}
                />
             </div>
        </div>

             <div className ="row">
              <div className ="col-md-6">
              <TextField
                  hintText="Hint Text"
                  floatingLabelText="User"
                  {...User}
                  errorText={User.touched && User.error && <div>{User.error}</div>}
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
