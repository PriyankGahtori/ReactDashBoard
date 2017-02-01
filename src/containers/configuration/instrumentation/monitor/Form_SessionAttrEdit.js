//Importing React components
import React, { PropTypes } from 'react'
import {reduxForm} from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TextField from 'material-ui/TextField';
import Is from 'is_js';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from '../../../../components/CheckboxWrapper';

export const fields = ['attrName','complete','specific']

const validate = values=>{
  const errors ={}   
    if(!values.attrName)
    errors.attrName = 'Required'
        
   else if(Number(values.attrName))
    errors.attrName = "Please enter only characters."

   else if(!Is.alphaNumeric(values.attrName))
      errors.attrName = 'Special characters are not allowed.'

     if(!values.complete && !values.specific)
     errors.complete = 'Must select any of the  Attribute Type'

      return errors;
}

const  error={
        fontSize: 12,
        color: 'red',
        paddingLeft:3,
    };

class FormSessionAttrEdit extends React.Component {

  constructor(props) {
  super(props);
  }

  render() {
     const { fields: {attrName,complete,specific}, resetForm, handleSubmit,onSubmit, submitting} = this.props
  return (
    <form >
      <div className ="col-md-12">
          <TextField
              // hintText="Hint Text"
               floatingLabelText=" Name"
               {...attrName}
              errorText = {attrName.touched  && attrName.error && <div> {attrName.error}</div> }
               />
       </div>

    <div className ="row ">
        <div className ="col-md-5">
              <Checkbox
              {...complete}
              value="complete"
              label="Complete"
             />
          <div style={error}> {complete.touched && complete.error && <div>{complete.error}</div>}</div>

        
        </div>
        <div className = "col-md-3">
             <Checkbox
              {...specific}
              value="specific"
              label="Specific"
           />
            
        </div>
    </div>

    </form>
    );
  }
}


FormSessionAttrEdit.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
}

export default reduxForm({ // <----- THIS IS THE IMPORTANT PART!
  form: 'Session Attribute Monitor ',        // a unique name for this form
  fields,
  validate,
},
  state => ({ // mapStateToProps
    valData:state.sessionAttrMonitor.valData,
    initialValues: state.sessionAttrMonitor.sessionAttrInitializeForm,
}),
 {
 } // mapDispatchToProps (will bind action creator to dispatch)
) (FormSessionAttrEdit);

