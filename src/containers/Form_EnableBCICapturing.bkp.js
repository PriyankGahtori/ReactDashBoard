import React, { PropTypes } from 'react'
import {reduxForm} from 'redux-form';
import TextField from 'material-ui/TextField';
import Is from 'is_js';
import DropDownMenu from '../components/SelectFieldWrapper';
import MenuItem from 'material-ui/MenuItem';
import Slider from 'material-ui/Slider';


export const fields = ['bciInstrSessionPct','enableLevel1FPCapturing', 'doNotDiscardlevel1FP','bciErrorTraceLevel','bciDebugTraceLevel'];
const initialValues = { 
               
              }
 const styles = {
    customWidth: {
      width: 300
    }
  };
//validating the fields of form

class Form_EnableBCICapturing extends React.Component {

constructor(props) {
  super(props);
  
  this.state = {enableLevel1FPCapturing : true};
  }

handleFirstSlider(value){
  console.log("in handleFirstSlider---",handleFirstSlider)
}

handleSecondSlider(value){
  console.log("in handleSecondSlider---",handleSecondSlider)
}

handleThirdSlider(value){
  console.log("in handleThirdSlider---",handleThirdSlider)
}




handledoNotDiscardlevel1FPChange(){
  console.log("handledoNotDiscardlevel1FPChange method called")
}

  render() {
    // const { fields: { bciInstrSessionPct, enableLevel1FPCapturing, doNotDiscardlevel1FP,bciErrorTraceLevel, bciDebugTraceLevel}, resetForm, handleSubmit,onSubmit, submitting } = this.props
     
     return (
      <div>
       <form onSubmit={handleSubmit(data =>{ alert(JSON.stringify(data))})}>
            <div className ="row" >
              <div className ="col-md-6">
                {...bciInstrSessionPct}
                 <Slider
                  defaultValue={0.0}
                  value={this.state.firstSlider}
                  onChange={this.handleFirstSlider.bind(this)}
                  />
             </div>


             <div className="col-md-6">
                <Checkbox
                  {...enableLevel1FPCapturing}
                  value="enableLevel1FPCapturing"
                  label="enable Level 1FP Capturing"
                  onCustomChange={this.handleDReqCheckboxChange.bind(this)}
                  checked={this.state.enableLevel1FCapturing}              
              />
            </div>
        </div>

            <div className ="row">
              <div className ="col-md-6">
               <Checkbox
                {...doNotDiscardlevel1FP}
                value="doNotDiscardlevel1FP"
                label="doNotDiscardlevel1FP"
                onCustomChange={this.handledoNotDiscardlevel1FPChange.bind(this)}
           />
             </div>

             <div className = "col-md-6">
                <Slider
                {...bciErrorTraceLevel}
                  defaultValue={0.0}
                  value={this.state.secondSlider}
                  onChange={this.handleSecondSlider.bind(this)}
                  />
               
                </div>
            </div>

            <div className = "row">
            <div className = "col-md-6">
           
               <Slider
               {...bciDebugTraceLevel}
                  defaultValue={0.0}
                  value={this.state.thirdSlider}
                  onChange={this.handleThirdSlider.bind(this)}
                  />
            </div>
            </div>
       </form>
       </div>
     );
   }
}
Form_EnableBCICapturing.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
}

export default reduxForm({ // <----- THIS IS THE IMPORTANT PART!
  form: 'Form_EnableBCICapturing',                           // a unique name for this form
  fields,
  validate
})
(Form_EnableBCICapturing);
