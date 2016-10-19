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

const validate = values =>{ 
    const errors = { }
 

  if(!values.ASSampleInterval)
    errors.ASSampleInterval = 'Required'

  else if (isNaN(values.ASSampleInterval))
    errors.ASSampleInterval = 'Please Enter Only Numbers'

  else if( values.ASSampleInterval < 0 || values.ASSampleInterval > 5000)
    errors.ASSampleInterval = 'Please Enter Values Between 0 and 5000'
  
  if(!values.ASThresholdMatchCount)
    errors.ASThresholdMatchCount = 'Required'

   else if (isNaN(values.ASThresholdMatchCount))
    errors.ASThresholdMatchCount = 'Please Enter Only Numbers'

   else if( values.ASThresholdMatchCount < 1 || values.ASThresholdMatchCount > 100)
    errors.ASThresholdMatchCount = 'Please Enter Values Between 1 and 100'
  

   if(!values.ASReportInterval)
    errors.ASReportInterval = 'Required'

   else if(isNaN(values.ASReportInterval))
    errors.ASReportInterval = 'Please Enter Only Numbers'

   else if(values.ASReportInterval< 0 || values.ASReportInterval > 900000)
    errors.ASReportInterval = 'Please Enter Values Between 0 and 900000'
  

   if(!values.ASDepthFilter)
    errors.ASDepthFilter = 'Required'

   else if (isNaN(values.ASDepthFilter))
    errors.ASDepthFilter =  'Please Enter Only Numbers'

   else if(values.ASDepthFilter<0 || values.ASDepthFilter > 100) 
      errors.ASDepthFilter = 'Please Enter Values Between 0 and 100'
   
  if(!values.ASTraceLevel)
    errors.ASTraceLevel = 'Required'

   else if (isNaN(values.ASTraceLevel))
    errors.ASTraceLevel = 'Please Enter Only Numbers'

   else if(values.ASTraceLevel < 0 || values.ASTraceLevel > 20)
    errors.ASTraceLevel = 'Please Enter Values Between 0 and 20'
  
   if(!values.ASStackComparingDepth)
    errors.ASStackComparingDepth = 'Required'

   else if (isNaN(values.ASStackComparingDepth))
    errors.ASStackComparingDepth = 'Please Enter Only Numbers'

   else if(values.ASStackComparingDepth < 0 || values.ASStackComparingDepth > 1000)
    errors.ASStackComparingDepth = 'Please Enter Values Between 0 and 1000'
  
 return errors;
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
                  errorText={ASSampleInterval.touched && ASSampleInterval.error && <div>{ASSampleInterval.error}</div>}
                />
            

            </div>
          



             <div className = "col-md-6" style = {styles.block}>
                   <TextField
                  hintText="Hint Text"
                  floatingLabelText="AS Threshold Match Count"
                    disabled={this.state.enableHotSpotBlock}
                  {...ASThresholdMatchCount}
                  errorText={ASThresholdMatchCount.touched && ASThresholdMatchCount.error && <div>{ASThresholdMatchCount.error}</div>}
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
                  errorText={ASReportInterval.touched && ASReportInterval.error && <div>{ASReportInterval.error}</div>}
                  
                />
             </div>

              <div className= "col-md-6">
                   <TextField
                  hintText="Hint Text"
                  floatingLabelText="Min Stack Depth for HotSpot"
                  disabled={this.state.enableHotSpotBlock}
                  {...ASDepthFilter}
                   errorText={ASDepthFilter.touched && ASDepthFilter.error && <div>{ASDepthFilter.error}</div>}
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
                   errorText={ASTraceLevel.touched && ASTraceLevel.error && <div>{ASTraceLevel.error}</div>}
                  
                />
             </div>

             <div className= "col-md-6">
                   <TextField
                  hintText="Hint Text"
                  floatingLabelText="ASStackComparingDepth"
                  disabled={this.state.enableHotSpotBlock}
                  {...ASStackComparingDepth}
                   errorText={ASStackComparingDepth.touched && ASStackComparingDepth.error && <div>{ASStackComparingDepth.error}</div>}
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
  fields,
  validate
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
