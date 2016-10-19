import React, { PropTypes } from 'react'
import {reduxForm} from 'redux-form';
import DropDownMenu from '../components/SelectFieldWrapper';
import MenuItem from 'material-ui/MenuItem';

import Input from '../components/InputWrapper';
import TextField from 'material-ui/TextField';
import Checkbox from '../components/CheckboxWrapper';
import {initializeInstrProf} from '../actions/index';
export const fields = [ 'enableBciError','enableBciDebug','InstrTraceLevel'];
//export const fields = [ 'bciInstrSessionPct','logLevelOneFpMethod','enableBciError','doNotDiscardFlowPaths','enableBciDebug'];
const initialValues = { 
                'logLevelOneFpMethod' : true, 
                'doNotDiscardLevel1FP' : false,

              }

  const validate = (values) =>{
    const errors = {}
     console.log(" enable -bci error ---------->",values.enableBciDebug)
     console.log("values.enableBciDebug < 0--",values.enableBciDebug < 0)
    if(!values.enableBciDebug)
      errors.enableBciDebug = 'Required' 
    
    else if(values.enableBciDebug < 0 || values.enableBciDebug >6)
      errors.enableBciDebug = 'Please Enter Values Between 0 and 6'

    if(!values.enableBciError)
      errors.enableBciError = 'Required'
    
    else if(values.enableBciError < 1 || values.enableBciError > 100)
        errors.enableBciError = 'Please Enter Values Between 0 and 100'

    if(!values.InstrTraceLevel)
      errors.InstrTraceLevel = 'Required'

    else if(values.InstrTraceLevel < 0 || values.InstrTraceLevel > 11)
      errors.InstrTraceLevel = 'Please Enter Values Between 0 and 11'
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

class Form_EnableDebugLevelCapturing extends React.Component {

  constructor(props) {
  super(props);
  console.log("in form topo-- !!!",this.props)
  console.log("this.props.data[2]value - ")
  this.state = { 'enableCpuTime':this.props.initialData.enableCpuTime,
               'enableForcedFPChain':this.props.initialData.enableForcedFPChain

    }
 
  }




componentWillMount() {
   
  }

 componentWillReceiveProps(nextProps)
  {
    console.log("nextProps---",nextProps.initialData)
    console.log("this,props---",this.props.initialData)
    if(this.props.initialData != nextProps.initialData){
        this.setState({enableCpuTime:nextProps.initialData.enableCpuTime,
         enableForcedFPChain:nextProps.initialData.enableForcedFPChain 
        })
    }
    
  }

ChangeEnableCpuTime(event, index, value){
  console.log("ChangeEnableCpuTime method called",value)
  this.setState({enableCpuTime:value})
}

ChangeEnableForcedFPChain(event,index ,value){
  console.log("ChangeEnableForcedFPChain---",value)
  this.setState({enableForcedFPChain:value})
}

  render() {
     const { fields: {enableBciError,enableBciDebug,InstrTraceLevel}, resetForm, handleSubmit,onSubmit, submitting } = this.props
     return (
        <form >
             <div className = "row" style = {styles.block}>
               <div className = "col-md-3">
                <label for="sess_perct">BCI Debug Level </label>
              </div>

              <div className = "col-md-3">
                 <Input
                {...enableBciDebug} 
                 id="sess_perct"
                style={styles.input} 
                 type="number" 
                 min="1" 
                 max="6" 
                 step="1"   />
             {enableBciDebug.touched && enableBciDebug.error && <div>{enableBciDebug.error} </div> }

             </div>

              <div className = "col-md-3">
                <label for="sess_perct"> Error Level </label>
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
             {enableBciError.touched && enableBciError.error && <div>{enableBciError.error} </div> }

             </div>


             </div>


             <div className = "row" style={{paddingTop:10}}>
              <div className = "col-md-3">
                <label for="sess_perct"> InstrTrace Level </label>
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
             {InstrTraceLevel.touched && InstrTraceLevel.error && <div>{InstrTraceLevel.error} </div> }
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
  validate
},
  state => ({ // mapStateToProps
  // initialValues : state.Keywords.initializeKeywords,
   initialValues :{
                   enableBciError:state.Keywords.initializeKeywords.enableBciError,
                   enableBciDebug:state.Keywords.initializeKeywords.enableBciDebug,
                   InstrTraceLevel:state.Keywords.initializeKeywords.InstrTraceLevel
                  },
   initialData : state.Keywords.initializeKeywords

})
) (Form_EnableDebugLevelCapturing);
