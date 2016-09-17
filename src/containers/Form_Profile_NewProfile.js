import React, { PropTypes } from 'react';
import {reduxForm} from 'redux-form';
import TextField from 'material-ui/TextField';
import Is from 'is_js';
export const fields = ['profileName', 'profileDesc'];

const initialValues={
                          'profileName' :"profileName" ,
                          'profileDesc':"description",
                }

  
//validating the fields of form
const validate = values => {
  const errors = {}
 
  if (!values.profileName) {
    errors.profileName = 'Required'
  } else if (values.profileName.length > 15) {
    errors.profileName = 'Must be 15 characters or less'
  }  else if (Number(values.profileName)){
    errors.profileName = 'Must enter only characters'
  }
 
 
  if (!values.profileDesc) {
    errors.profileDesc = 'Required'
  } else if (values.profileDesc.length > 50) {
    errors.profileDesc = 'Must be 50 characters or less'
  } else if (Number(values.profileDesc)){
    errors.profileDesc = 'Must enter only characters'
  }
   
  return errors
}
class NewApplication extends React.Component {
  
  constructor(props) {
    super(props);
  }
   render() {
         const { fields: { profileName, profileDesc}, resetForm, handleSubmit,onSubmit, submitting } = this.props

    return (
   
       <form>
          <div className ="row" >
              <div className ="col-md-6">
               <TextField
                hintText="Hint Text"
                floatingLabelText="Profile Name"  
                 {...profileName}
                errorText={profileName.touched && profileName.error && <div>{profileName.error}</div>}/>   
               </div>
                <div className ="col-md-6">
               <TextField
                hintText="Hint Text"
                floatingLabelText="Profile Desc" 
                 {...profileDesc}
                errorText={profileDesc.touched && profileDesc.error && <div>{profileDesc.error}</div>}/>
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

  
},
  state => ({ // mapStateToProps
  initialValues:state.profileDetailData.profileInitializeForm
})
) (NewApplication);
