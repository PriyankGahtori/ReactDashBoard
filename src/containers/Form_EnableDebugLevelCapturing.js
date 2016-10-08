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

class NewApplication extends React.Component {

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
                 step="1" 
                 
                 />

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
                 step="1" 
                 
                 />
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
                 step="1" 
                 
                 />
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
  // initialValues : state.Keywords.initializeKeywords,
   initialValues :{
                   enableBciError:state.Keywords.initializeKeywords.enableBciError,
                   enableBciDebug:state.Keywords.initializeKeywords.enableBciDebug,
                   InstrTraceLevel:state.Keywords.initializeKeywords.InstrTraceLevel
                  },
   initialData : state.Keywords.initializeKeywords

})
) (NewApplication);