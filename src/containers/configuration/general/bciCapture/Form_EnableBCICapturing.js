//Importing react components
import React, { PropTypes } from 'react'
import {reduxForm} from 'redux-form';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';

//Importing files
import DropDownMenu from '../../../../components/SelectFieldWrapper';
import Input from '../../../../components/InputWrapper';
import Checkbox from '../../../../components/CheckboxWrapper';
import {initializeInstrProf} from '../../../../actions/index';

export const fields = [ 'bciInstrSessionPct','logLevelOneFpMethod','correlationIDHeader','doNotDiscardFlowPaths','setCavNVCookie','enableCpuTime','enableForcedFPChain'];

const initialValues = { 
                'logLevelOneFpMethod' : true, 
                'doNotDiscardLevel1FP' : false,

              }

  /* Code for validating form fields
  */
 const validate = values=> {
  const errors = { }

  if(!values.setCavNVCookie) 
     errors.setCavNVCookie = 'Required'

  else if ( values.setCavNVCookie < 0  || values.setCavNVCookie > 10240)
     errors.setCavNVCookie = "Please Enter values between 0 and 10240"

  else if (isNaN(values.setCavNVCookie))
    errors.setCavNVCookie = 'Please Enter Only Numbers'

 
  if(!values.bciInstrSessionPct)
    errors.bciInstrSessionPct = 'Required'

  else if(values.bciInstrSessionPct < 0 || values.bciInstrSessionPct > 100)
    errors.bciInstrSessionPct = "Please Enter values between 0 and 100"
  
  if(!values.correlationIDHeader)
    errors.correlationIDHeader = 'Required'

  else if( values.correlationIDHeader < 0  || values.correlationIDHeader > 1024)
    errors.correlationIDHeader = "Please Enter values between 0 and 1024"
  
  else if (isNaN(values.correlationIDHeader))
    errors.correlationIDHeader = 'Please Enter Only Numbers'

    return errors
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

class Form_EnableBCICapturing extends React.Component {

  constructor(props) {
  super(props);
  console.log("in form topo-- !!!",this.props)
  console.log("this.props.data[2]value - ")
  this.state = { 'enableCpuTime'        :this.props.initialData.enableCpuTime,
                 'enableForcedFPChain'  :this.props.initialData.enableForcedFPChain,
                 'logLevelOneFpMethod'  :this.props.initialData.logLevelOneFpMethod === '1',
                 'doNotDiscardFlowPaths':this.props.initialData.doNotDiscardFlowPaths === '1'

    }
 
  }




componentWillMount() {
   
  }

  componentWillReceiveProps(nextProps)
  {
    if(this.props.initialData != nextProps.initialData){
        this.setState({enableCpuTime:nextProps.initialData.enableCpuTime,
                       enableForcedFPChain:nextProps.initialData.enableForcedFPChain,
                       logLevelOneFpMethod:nextProps.initialData.logLevelOneFpMethod === '1',
                       doNotDiscardFlowPaths:nextProps.initialData.doNotDiscardFlowPaths === '1'
        })
    }
  }

//called on change of checkbox of logLevelOneFpMethod
  ChangeLogLevel(event,isInputChecked){
    this.setState({logLevelOneFpMethod:isInputChecked})

  }

//called on change of checkbox of doNotDiscardFlowPaths
  ChangeDoNotDiscardFlowPaths(event,isInputChecked){
    this.setState({doNotDiscardFlowPaths:isInputChecked})
  }

  ChangeEnableCpuTime(event, index, value){
    this.setState({enableCpuTime:value})
  }

  ChangeEnableForcedFPChain(event,index ,value){
    this.setState({enableForcedFPChain:value})
  }

  render() {
     const { fields: {bciInstrSessionPct,logLevelOneFpMethod,correlationIDHeader,doNotDiscardFlowPaths,setCavNVCookie,enableCpuTime,enableForcedFPChain}, resetForm, handleSubmit,onSubmit, submitting } = this.props
     return (
        <form >
            <div className ="row"  style={{paddingTop:15}}>
              <div className = "col-md-3">
                <label for="sess_perct" >Session Percentage   </label>
              </div>

            <div className = "col-md-3">
               <Input
                {...bciInstrSessionPct} 
                 id="sess_perct"
                style={styles.input} 
                 type="number" 
                 min="0" 
                 max="100" 
                 step="1"  />
             {bciInstrSessionPct.touched && bciInstrSessionPct.error && <div>{bciInstrSessionPct.error} </div> }

                </div>
           

            <div className = "col-md-6">
            <Checkbox
              {...logLevelOneFpMethod}
              value="logLevelOneFpMethod"
              label="Log Level One FP Method"
              checked={this.state.logLevelOneFpMethod}
              onCustomChange ={this.ChangeLogLevel.bind(this)}       
            />
 
            </div>
             </div>

             <div className = "row" style = {styles.block}>
             <div className= "col-md-6">
              <Checkbox
              {...doNotDiscardFlowPaths}
              value="doNotDiscardFlowPaths"
              label="Do Not Discard Level FP"
              checked = {this.state.doNotDiscardFlowPaths}
              onCustomChange = {this.ChangeDoNotDiscardFlowPaths.bind(this)}
            />
             </div>

             </div>


             <div className = "row" style={{paddingTop:10}}>
           <div className = "col-md-6" style ={styles.setCavNVCookieBlock}>
                 
                <TextField
                  hintText="Hint Text"
                  floatingLabelText="Correlation ID Header"
                  {...correlationIDHeader}
             errorText = {correlationIDHeader.touched &&  correlationIDHeader.error && <div> { correlationIDHeader.error}</div> }

                  
                />
              </div>


                <div className = "col-md-6" style ={styles.setCavNVCookieBlock}>
                 
                <TextField
                  hintText="Hint Text"
                  floatingLabelText="Set Cav NV Cookie"
                  {...setCavNVCookie}
                  errorText = {setCavNVCookie.touched &&  setCavNVCookie.error && <div> { setCavNVCookie.error}</div> }

                />
              </div>

          </div>        

        <div className = "row">
            <div className = "col-md-6">
             
               <DropDownMenu 
                {...enableCpuTime}
                              
                  style={styles.customWidth}
                  value = {this.state.enableCpuTime}
                  autoWidth={false}
                  customOnChange={this.ChangeEnableCpuTime.bind(this)} 
                  floatingLabelText="Enable CPU Time"
                  autoScrollBodyContent={true}
                >

                  <MenuItem value = {"0"}  primaryText = "Disable"/>
                  <MenuItem value = {"1"}  primaryText = "Enable at FP/ BT level"/>
                  <MenuItem value = {"2"}  primaryText = "Enable at method level" />
                  <MenuItem value = {"3"}  primaryText = "Enable both method and flowpath level" />
                  <MenuItem value = {"1%201"}  primaryText = "CPU time capturing at FP level where child FP CPU time added in BT Monitor." />
                  <MenuItem value = {"3%201"} primaryText = "CPU time capturing for Method & BT level where child FP generated by thread callout added in CPU time for BT Monitor."/>

    
                </DropDownMenu>
            </div>

            <div className = "col-md-6">
               <DropDownMenu 
                {...enableForcedFPChain}
                            
                  style={styles.customWidth}
                  autoWidth={false}
                  value={this.state.enableForcedFPChain}
                  customOnChange={this.ChangeEnableForcedFPChain.bind(this)} 
                  floatingLabelText="Enable Forced FP Chain"
                >

                  <MenuItem value = {"0"}  primaryText = "Enable"/>
                  <MenuItem value = {"1"}  primaryText = "Disable"/>
                  <MenuItem value = {"2"}  primaryText = "Enable all with complete FP" />
    
                </DropDownMenu>
            </div>
          </div>
       </form>
     );
   }
}
Form_EnableBCICapturing.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
}

export default reduxForm({ // <----- THIS IS THE IMPORTANT PART!
  form: 'contact',                           // a unique name for this form
  fields,
  validate
},
  state => ({ // mapStateToProps
   initialValues :{bciInstrSessionPct:state.Keywords.initializeKeywords.bciInstrSessionPct,
                   logLevelOneFpMethod:state.Keywords.initializeKeywords.logLevelOneFpMethod,
                   correlationIDHeader:state.Keywords.initializeKeywords.correlationIDHeader,
                   doNotDiscardFlowPaths:state.Keywords.initializeKeywords.doNotDiscardFlowPaths,                   
                   setCavNVCookie:state.Keywords.initializeKeywords.setCavNVCookie,
                   enableCpuTime:state.Keywords.initializeKeywords.enableCpuTime,
                   enableForcedFPChain:state.Keywords.initializeKeywords.enableForcedFPChain
                  },
   initialData : state.Keywords.initializeKeywords

})
) (Form_EnableBCICapturing);