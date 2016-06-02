import React, { PropTypes } from 'react'
import {reduxForm} from 'redux-form';
import TextField from 'material-ui/TextField';
export const fields = [ 'u2','username', 'email', 'age' ]

const validate = values => {
  const errors = {}
  if (!values.u2) {
    errors.username = 'Required'
  } else if (values.u2.length > 15) {
    errors.username = 'Must be 15 characters or less'
  }
  if (!values.username) {
    errors.username = 'Required'
  } else if (values.username.length > 15) {
    errors.username = 'Must be 15 characters or less'
  }
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if (!values.age) {
    errors.age = 'Required'
  } else if (isNaN(Number(values.age))) {
    errors.age = 'Must be a number'
  } else if (Number(values.age) < 18) {
    errors.age = 'Sorry, you must be at least 18 years old'
  }
  return errors
}
class NewApplication extends React.Component {
  render() {
      console.log("props",this.props);

     const { fields: { u2,username, email, age }, resetForm, handleSubmit, submitting } = this.props
     return (
       <form onSubmit={handleSubmit(data =>{ alert(JSON.stringify(data))})}>
            <div>
               <label>Username</label>
               <div>
                 <input type="text" placeholder="Username" {...username}/>
               </div>
               {username.touched && username.error && <div>{username.error}</div>}
             </div>

             <div>
               <TextField
                  hintText="Hint Text"
                  floatingLabelText="Floating Label Text"
                  {...u2}
                  errorText={username.touched && username.error && <div>{username.error}</div>}
                />
             </div>

             <div>
               <label>Email</label>
               <div>
                 <input type="text" placeholder="Email" {...email}/>
               </div>
               {email.touched && email.error && <div>{email.error}</div>}
             </div>
             <div>
               <label>Age</label>
               <div>
                 <input type="text" placeholder="Age" {...age}/>
               </div>
               {age.touched && age.error && <div>{age.error}</div>}
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
