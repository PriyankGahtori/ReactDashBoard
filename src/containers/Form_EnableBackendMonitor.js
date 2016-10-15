import React, { PropTypes } from 'react'
import {reduxForm} from 'redux-form';
import DropDownMenu from '../components/SelectFieldWrapper';
import MenuItem from 'material-ui/MenuItem';

import Input from '../components/InputWrapper';
import TextField from 'material-ui/TextField';
import Checkbox from '../components/CheckboxWrapper';
import {initializeInstrProf} from '../actions/index';
export const fields = [ 'enableBackendMonitor'];
const initialValues = { 
                'enableBackendMonitor' : true, 
              }

  
  const styles = {
  input: {
    width: 150,

  },
  block:{
    paddingTop:10
  },
  setCavNVCookieBlock:{
    marginTop:-30
  },
  customWidth: {
      width: 300
    }
  
};

class Form_EnablebackendMonitor extends React.Component {

  constructor(props) {
  super(props);
  console.log("in form topo-- !!!",this.props)
 
  }




componentWillMount() {
   
  }

 componentWillReceiveProps(nextProps)
  {
  }




  render() {
     const { fields: {enableBackendMonitor}, resetForm, handleSubmit,onSubmit, submitting } = this.props
     return (
        <form >
             <div className = "row" style = {styles.block}>
              
            <div className ="col-md-8">
            <p>{this.props.enableBackendMonitorCheckBox}</p>
            <Checkbox
                  value = "enableBackendMonitor"
                  label = "Backend Monitor"
                  checked  = {this.props.enableBackendMonitorCheckBox}
                  {...enableBackendMonitor}
             />
            </div>
         
      </div>        

       
       </form>
     );
   }
}
Form_EnablebackendMonitor.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
}

export default reduxForm({ // <----- THIS IS THE IMPORTANT PART!
  form: 'contact',                           // a unique name for this form
  fields
},
  state => ({ // mapStateToProps
   initialValues :{
                   enableBackendMonitor:state.Keywords.initializeKeywords.enableBackendMonitor
                  },
     initialData : state.Keywords.initializeKeywords

})
) (Form_EnablebackendMonitor);
