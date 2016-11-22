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
                 min="1" 
                 max="6" 
                 step="1"   />

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
             </div>

             <div className = "col-md-3">
                <label for="sess_perct"> NdMethodMonTrace Level </label>
              </div>

              <div className = "col-md-3">
                 <Input
                {...ndMethodMonTraceLevel} 
                 id="sess_perct"
                style={styles.input} 
                 type="number" 
                 min="0" 
                 max="10" 
                 step="1"   />
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
