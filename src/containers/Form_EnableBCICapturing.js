import React, { PropTypes } from 'react'
import {reduxForm} from 'redux-form';
import DropDownMenu from '../components/SelectFieldWrapper';
import MenuItem from 'material-ui/MenuItem';

import Input from '../components/InputWrapper';
import TextField from 'material-ui/TextField';
import Checkbox from '../components/CheckboxWrapper';

export const fields = [ 'bciInstrSessionPct','logLevelOneFpMethod','enableBciError','doNotDiscardFlowPaths','enableBciDebug','setCavNVCookie','enableCpuTime','enableForcedFPChain'];
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
     const { fields: {bciInstrSessionPct,logLevelOneFpMethod,enableBciError,doNotDiscardFlowPaths,enableBciDebug,setCavNVCookie,enableCpuTime,enableForcedFPChain}, resetForm, handleSubmit,onSubmit, submitting } = this.props
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
              {...logLevelOneFpMethod}
              value="logLevelOneFpMethod"
              label="log Level One Fp Method"
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

                <div className = "col-md-6" style ={styles.setCavNVCookieBlock}>
                 
                <TextField
                  hintText="Hint Text"
                  floatingLabelText="Set Cav NV Cookie"
                  {...setCavNVCookie}
                  
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
                  floatingLabelText="Enable Cpu Time"
                >

                  <MenuItem value = {"0"}  primaryText = "Disable"/>
                  <MenuItem value = {"1"}  primaryText = "Enable at flowpath / BT level"/>
                  <MenuItem value = {"2"}  primaryText = "Enable at method level" />
                  <MenuItem value = {"3"}  primaryText = "Enable at bot method and flowpath level" />
                  <MenuItem value = {"1%201"}  primaryText = "CPU Time Ca[turing at flowpath level where child flowpath cpu time will also be added in bt monitor data" />
                  <MenuItem value = {"3%201"} primaryText = "cpu time capturing for method & BT level where child fp genereated by thread callout will also be added in cpu time for bt monitor"/>

    
                </DropDownMenu>
            </div>

            <div className = "col-md-6">
               <DropDownMenu 
                {...enableForcedFPChain}
                            
                  style={styles.customWidth}
                  autoWidth={false}
                  value={this.state.enableForcedFPChain}
                  customOnChange={this.ChangeEnableForcedFPChain.bind(this)} 
                  floatingLabelText="Enable Forced FPChain"
                >

                  <MenuItem value = {"0"}  primaryText = "Disable"/>
                  <MenuItem value = {"1"}  primaryText = "Enable to not discard any child fp"/>
                  <MenuItem value = {"2"}  primaryText = "Not to discard and  complete child flowpaths" />
    
                </DropDownMenu>
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
   initialValues : state.Keywords.initializeKeywords,
   initialData : state.Keywords.initializeKeywords

})
) (NewApplication);