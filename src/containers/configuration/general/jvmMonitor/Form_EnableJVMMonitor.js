//Importing react components
import React, { PropTypes } from 'react'
import { reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from '../../../../components/SelectFieldWrapper';
import Input from '../../../../components/InputWrapper';
import Checkbox from '../../../../components/CheckboxWrapper';
import Is from 'is_js';

//Importing files


export const fields = ['enableJVM','cpuFilter', 'doNotDelfactor'];

const initialValues = {
}

/* Code for validating form fields
*/
const validate = values => {
  const errors = {}
  
   if(values.enableJVM){
      if(!values.cpuFilter)
        errors.cpuFilter = 'Required'

    else if (isNaN(values.cpuFilter))
    errors.cpuFilter = 'Please Enter Only Numbers'

    else if(!values.doNotDelfactor)
      errors.doNotDelfactor = 'Please enable Do not delete factor'
  }
   

  return errors
}

const styles = {
  input: {
    width: 150,

  },
  customWidth: {
    width: 334,
    paddingTop: 7
  },
  error: {
    fontSize: 12,
    color: 'red',
    position: 'relative'
  },
};

class Form_EnableJVMMonitor extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      'enableJVMThreadMonitor': this.props.initialData.enableJVMThreadMonitor,
    }

  }
  componentWillMount() {

  }

  componentWillReceiveProps(nextProps) {
    if (this.props.initialData != nextProps.initialData) {
      this.setState({
        enableJVMThreadMonitor: nextProps.initialData.enableJVMThreadMonitor,
      })
    }
  }

 

  render() {
    const { fields: {enableJVM,cpuFilter,doNotDelfactor}, resetForm, handleSubmit, onSubmit, submitting } = this.props
    return (
      <form >
         <div>
            <Checkbox
              {...enableJVM}
              value="enableJVM"
              label="Enable JVM Monitor"
              style={{paddingTop:'15'}}
              />
          </div>

           <div >
             <TextField
                {...cpuFilter}
                floatingLabelText="Minimum CPU % filter"
                style={{paddingLeft:'15'}}
                errorText = {cpuFilter.touched && cpuFilter.error && <div>{cpuFilter.error} </div>}
                />

              <Checkbox
                {...doNotDelfactor}
                value="doNotDelfactor"
                label="Do not delete factor"
                labelStyle={{ fontWeight: 'normal' }}
                style={{paddingLeft:'15'}}
                />
          <div style={styles.error}> {doNotDelfactor.touched && doNotDelfactor.error && <div>{doNotDelfactor.error}</div>}</div>
            </div>
      </form>
    );
  }
}
Form_EnableJVMMonitor.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
}

export default reduxForm({ // <----- THIS IS THE IMPORTANT PART!
  form: 'contact',                           // a unique name for this form
  fields,
  validate
},
  state => ({ // mapStateToProps
    initialValues: state.Keywords.initializeKeywords.setJVMMonInitializeObj,
    initialData: state.Keywords.initializeKeywords

  })
)(Form_EnableJVMMonitor);
