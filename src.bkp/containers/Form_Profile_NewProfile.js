import React, { PropTypes } from 'react';
import {reduxForm} from 'redux-form';
import TextField from 'material-ui/TextField';
export const fields = ['profileName', 'profileDesc'];

const initialValues={
                          'profileName' :"profileName" ,
                          'profileDesc':"description",
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
  
},
  state => ({ // mapStateToProps
  initialValues:state.profileDetailData.profileInitializeForm
})
) (NewApplication);
