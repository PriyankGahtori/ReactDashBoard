import React, { PropTypes } from 'react'
import {reduxForm} from 'redux-form';
import DropDownMenu from '../components/SelectFieldWrapper';
import MenuItem from 'material-ui/MenuItem';

import Input from '../components/InputWrapper';
import TextField from 'material-ui/TextField';
//import Checkbox from '../components/CheckboxWrapper';
import Checkbox from 'material-ui/Checkbox';
import {initializeKeywords} from '../actions/index';

export const fields = [ 'ASSampleInterval','ASThresholdMatchCount','ASReportInterval','ASDepthFilter','ASTraceLevel','ASStackComparingDepth'];
//export const fields = [ 'ASSampleInterval','ASThresholdMatchCount','ASReportInterval','ASDepthFilter'];

const initialValues = { 
              

              }

  
  const styles = {
  input: {
    width: 150,

  },
  block:{
    paddingTop:10
  }
  
};

class Form_EnableHotSpotCapturing extends React.Component {

  constructor(props) {
  super(props);
  console.log("in form topo-- !!!",this.props.data)
  console.log("this.props.data[2]value - ")
  this.state = {enableHotSpotBlock:false};
 
  }

handleEnableHotSpot(event,isInputChecked){
 
 this.setState({enableHotSpotBlock:!isInputChecked})
}



componentWillMount() {
    console.log("inside will mount") 
  // this.props.initializeKeywords();
  }

 componentWillReceiveProps(nextProps)
  {
    
  }

  render() {
     const { fields: {ASSampleInterval,ASThresholdMatchCount,ASReportInterval,ASDepthFilter,ASTraceLevel,ASStackComparingDepth}, resetForm, handleSubmit,onSubmit, submitting } = this.props
     return (
        <form >
            <div className ="row" style={{paddingTop:8}}>
              <div className = "col-md-6">
                <Checkbox  
                value="enableLevel1FPCapturing"
                label="Enable HotSpots"
                 defaultChecked = {true} 
                onCheck={this.handleEnableHotSpot.bind(this)}            
            />
              </div>
           </div>

           <div className = "row">

            <div className = "col-md-6">
            <p>{this.state.enableHotSpotBlock}</p>
             <TextField
                  hintText="Hint Text"
                  floatingLabelText="AS Sample Interval For Stack Trace"
                  disabled={this.state.enableHotSpotBlock}
                  {...ASSampleInterval}
                />
            

            </div>
          



             <div className = "col-md-6" style = {styles.block}>
                   <TextField
                  hintText="Hint Text"
                  floatingLabelText="AS Threshold Match Count"
                    disabled={this.state.enableHotSpotBlock}
                  {...ASThresholdMatchCount}
                />
             </div>
             </div>

             <div className = "row">

             <div className= "col-md-6">
                   <TextField
                  hintText="Hint Text"
                  floatingLabelText="HotSpot Reporting Interval "
                    disabled={this.state.enableHotSpotBlock}
                  {...ASReportInterval}
                  
                />
             </div>

              <div className= "col-md-6">
                   <TextField
                  hintText="Hint Text"
                  floatingLabelText="Min Stack Depth for HotSpot"
                  disabled={this.state.enableHotSpotBlock}
                  {...ASDepthFilter}
                  />
              </div>
             </div>

           

             <div className = "row">

             <div className= "col-md-6">
                   <TextField
                  hintText="Hint Text"
                  floatingLabelText="AS Trace Level"
                    disabled={this.state.enableHotSpotBlock}
                  {...ASTraceLevel}
                  
                />
             </div>

             <div className= "col-md-6">
                   <TextField
                  hintText="Hint Text"
                  floatingLabelText="ASStackComparingDepth"
                  disabled={this.state.enableHotSpotBlock}
                  {...ASStackComparingDepth}
                  
                />
             </div>


              
         </div>

      
           
       </form>
     );
   }
}
Form_EnableHotSpotCapturing.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
}

export default reduxForm({ // <----- THIS IS THE IMPORTANT PART!
  form: 'contact',                           // a unique name for this form
  fields
},
  state => ({ // mapStateToProps
   //initialValues : state.Keywords.initializeKeywords,
   initialValues :{ ASSampleInterval:state.Keywords.initializeKeywords.ASSampleInterval,
                    ASThresholdMatchCount:state.Keywords.initializeKeywords.ASThresholdMatchCount,
                    ASReportInterval:state.Keywords.initializeKeywords.ASReportInterval,
                    ASDepthFilter:state.Keywords.initializeKeywords.ASDepthFilter,
                    ASTraceLevel:state.Keywords.initializeKeywords.ASTraceLevel,
                    ASStackComparingDepth:state.Keywords.initializeKeywords.ASStackComparingDepth
                  }
})
) (Form_EnableHotSpotCapturing);
