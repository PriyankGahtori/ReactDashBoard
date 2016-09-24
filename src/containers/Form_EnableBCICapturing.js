import React, { PropTypes } from 'react'
import {reduxForm} from 'redux-form';
import DropDownMenu from '../components/SelectFieldWrapper';
import MenuItem from 'material-ui/MenuItem';

import Input from '../components/InputWrapper';
import TextField from 'material-ui/TextField';
import Checkbox from '../components/CheckboxWrapper';

export const fields = [ 'bciInstrSessionPct','enableLevel1FPCapturing','enableBciError','doNotDiscardFlowPaths','enableBciDebug' ];
const initialValues = { 
                'enableLevel1FPCapturing' : true, 
                'doNotDiscardLevel1FP' : false,

              }

  
  const styles = {
  input: {
    width: 150,

  },
  block:{
    paddingTop:10
  }
  
};

class NewApplication extends React.Component {

  constructor(props) {
  super(props);
  console.log("in form topo-- !!!",this.props.data)
  console.log("this.props.data[2]value - ")
 
  }




componentWillMount() {
    console.log("inside will mount")  
  }

 componentWillReceiveProps(nextProps)
  {
    
  }

  render() {
     const { fields: {bciInstrSessionPct,enableLevel1FPCapturing,enableBciError,doNotDiscardFlowPaths,enableBciDebug}, resetForm, handleSubmit,onSubmit, submitting } = this.props
     return (
        <form >
            <div className ="row" >
              <div className = "col-md-3">
                <label for="sess_perct">Session Percentage   </label>
              </div>

            <div className = "col-md-3">
               <Input
                {...bciInstrSessionPct} 
                 id="sess_perct"
                style={styles.input} 
                 type="number" 
                 min="0" 
                 max="30" 
                 step="1" 
                 
                 />

                </div>
           

            <div className = "col-md-6">
            <Checkbox
              {...enableLevel1FPCapturing}
              value="enableLevel1FPCapturing"
              label="Enable Level 1FP Capturing"
              defaultChecked={true}              
            />
 
            </div>
             </div>



             <div className = "row" style = {styles.block}>


               <div className = "col-md-3">
                <label for="sess_perct">BCI Debug Trace Level </label>
              </div>

              <div className = "col-md-3">
                 <Input
                {...enableBciDebug} 
                 id="sess_perct"
                style={styles.input} 
                 type="number" 
                 min="1" 
                 max="6" 
                 step="1" 
                 
                 />

             </div>

             <div className= "col-md-6">
              <Checkbox
              {...doNotDiscardFlowPaths}
              value="doNotDiscardFlowPaths"
              label="Do Not Discard Level FP"

                          
            />
             </div>

             </div>


             <div className = "row">
              <div className = "col-md-3">
                <label for="sess_perct">BCI Error Trace Level </label>
              </div>

              <div className = "col-md-3">
                 <Input
                {...enableBciError} 
                 id="sess_perct"
                style={styles.input} 
                 type="number" 
                 min="0" 
                 max="6" 
                 step="1" 
                 
                 />
             </div>

              <div className = "col-md-6">
              </div>




             </div>
       </form>
     );
   }
}
NewApplication.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
}

export default reduxForm({ // <----- THIS IS THE IMPORTANT PART!
  form: 'contact',                           // a unique name for this form
  fields
},
  state => ({ // mapStateToProps
   initialValues : state.Keywords.initializeKeywords

})
) (NewApplication);
