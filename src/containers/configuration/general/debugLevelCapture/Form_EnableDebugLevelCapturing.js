//Importing react components
import React, { PropTypes } from 'react'
import {reduxForm} from 'redux-form';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';

//Importing files
import Checkbox from '../../../../components/CheckboxWrapper';
import {initializeInstrProf} from '../../../../actions/index';
import Input from '../../../../components/InputWrapper';
import DropDownMenu from '../../../../components/SelectFieldWrapper';


export const fields = [ 'enableBciError','enableBciDebug','InstrTraceLevel','ndMethodMonTraceLevel'];
const initialValues = { 
                'logLevelOneFpMethod' : true, 
                'doNotDiscardLevel1FP' : false,

              }

 const validate = values=> {
  const errors = { }

  if(!values.enableBciError) 
     errors.enableBciError = 'Required'

  else if ( values.enableBciError < 1  || values.enableBciError > 100)
     errors.enableBciError = "Please Enter values between 1 and 100"

  if(!values.enableBciDebug && values.enableBciDebug != 0) 
     errors.enableBciDebug = 'Required'

   else if (values.enableBciDebug > 6)
     errors.enableBciDebug = "Please Enter values between 0 and 6"
  
   if(!values.InstrTraceLevel && values.InstrTraceLevel != 0) 
     errors.InstrTraceLevel = 'Required'

   else if (values.InstrTraceLevel > 11 )
     errors.InstrTraceLevel = "Please Enter values between 0 and 11"

   if(!values.ndMethodMonTraceLevel && values.ndMethodMonTraceLevel != 0) 
     errors.ndMethodMonTraceLevel = 'Required'

   else if (values.ndMethodMonTraceLevel > 10)
     errors.ndMethodMonTraceLevel = "Please Enter values between 0 and 10"
 
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
    },
     error:{
    fontSize: 12,
    color: 'red' 
  },
  




};

class Form_EnableDebugLevelCapturing extends React.Component {

  constructor(props) {
  super(props);
  this.state = { 'enableCpuTime':this.props.initialData.enableCpuTime,
               'enableForcedFPChain':this.props.initialData.enableForcedFPChain

    }
 
  }

componentWillMount() {
   
  }

 componentWillReceiveProps(nextProps)
  {
    if(this.props.initialData != nextProps.initialData){
        this.setState({enableCpuTime:nextProps.initialData.enableCpuTime,
         enableForcedFPChain:nextProps.initialData.enableForcedFPChain 
        })
    }
    
  }

ChangeEnableCpuTime(event, index, value){
  this.setState({enableCpuTime:value})
}

ChangeEnableForcedFPChain(event,index ,value){
  this.setState({enableForcedFPChain:value})
}

  render() {
     const { fields: {enableBciError,enableBciDebug,InstrTraceLevel,ndMethodMonTraceLevel}, resetForm, handleSubmit,onSubmit, submitting } = this.props
     return (
        <form >
             <div className = "row" style = {styles.block}>
               <div className = "col-md-3">
                <p for="sess_perct">BCI Debug Level </p>
              </div>

              <div className = "col-md-3">
                 <Input
                {...enableBciDebug} 
                 id="sess_perct"
                style={styles.input} 
                 type="number" 
                 min="0" 
                 max="6" 
                 step="1"   />
             <div style = {styles.error}>  {enableBciDebug.touched && enableBciDebug.error && <div>{enableBciDebug.error} </div> } </div>

             </div>

              <div className = "col-md-3">
                <p for="sess_perct"> Error Level </p>
              </div>

              <div className = "col-md-3">
                 <Input
                {...enableBciError} 
                 id="sess_perct"
                style={styles.input} 
                 type="number" 
                 min="0" 
                 max="6" 
                 step="1"   />
           <div style = {styles.error}>  {enableBciError.touched && enableBciError.error && <div>{enableBciError.error} </div> } </div>

             </div>


             </div>


             <div className = "row" style={{paddingTop:10}}>
              <div className = "col-md-3">
                <p for="sess_perct"> InstrTrace Level </p>
              </div>

              <div className = "col-md-3">
                 <Input
                {...InstrTraceLevel} 
                 id="sess_perct"
                style={styles.input} 
                 type="number" 
                 min="0" 
                 max="11" 
                 step="1"   />
            <div style = {styles.error}>  {InstrTraceLevel.touched && InstrTraceLevel.error && <div>{InstrTraceLevel.error} </div> } </div>

             </div>

             <div className = "col-md-3">
                <p for="sess_perct"> NdMethodMonTrace Level </p>
              </div>

              <div className = "col-md-3">
                 <Input
                {...ndMethodMonTraceLevel} 
                 id="sess_perct"
                style={styles.input} 
                 type="number" 
                 min="5" 
                 max="10" 
                 step="1"   />
           <div style = {styles.error}>  {ndMethodMonTraceLevel.touched && ndMethodMonTraceLevel.error && <div>{ndMethodMonTraceLevel.error} </div> } </div>
        </div>
      </div>        
       </form>
     );
   }
}
Form_EnableDebugLevelCapturing.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
}

export default reduxForm({ // <----- THIS IS THE IMPORTANT PART!
  form: 'contact',                           // a unique name for this form
  fields,
  validate,
  
},
  state => ({ // mapStateToProps
  // initialValues : state.Keywords.initializeKeywords,
   initialValues :{
                   enableBciError       : state.Keywords.initializeKeywords.enableBciError,
                   enableBciDebug       : state.Keywords.initializeKeywords.enableBciDebug,
                   InstrTraceLevel      : state.Keywords.initializeKeywords.InstrTraceLevel,
                   ndMethodMonTraceLevel: state.Keywords.initializeKeywords.ndMethodMonTraceLevel
                  },
   initialData : state.Keywords.initializeKeywords

})
) (Form_EnableDebugLevelCapturing);
