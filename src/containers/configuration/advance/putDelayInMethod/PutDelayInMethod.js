//Importing React components
import React,{PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';
import RadioButton from 'material-ui/RadioButton';
import FlatButton  from 'material-ui/FlatButton';
import ConfirmDialog from 'material-ui/Dialog';
import DialogPutDelayInMethod from 'material-ui/Dialog';

//Importing files
import FormPutDelayInMethod from './Form_PutDelayInMethod';
import Checkbox from '../../../../components/CheckboxWrapper';
import RadioButtonGroup from '../../../../components/RadioButtonGroupWrapper';
import {submitKeywordData,initializeInstrException}  from '../../../../actions/index';
import {triggerRunTimeChanges} from '../../../../actions/runTimeChanges';

export const fields = [ 'fromRange','toRange','isCpuHogg','isAutoInstrument','fqm'];

class PutDelayInMethod extends React.Component {
 
  constructor(props) {
    super(props);
    this.state = {putDelayInMethod:false}
    this.state = {openPutDelayInMethodDialog : false}
  }


componentWillReceiveProps(nextProps)
{
    console.log("nextprops--putDeolayinmrthod-",nextProps.initialData)
    
    if(this.props.initialData != nextProps.initialData){
      console.log("nextProps.initialData != 0---",nextProps.initialData != 0)
      if(nextProps.initialData != 0)
      this.setState({putDelayInMethod : true
      });
    }
}

handlePutDelayInMethod(event,isInputChecked){
  	console.log("isInputChecked----",isInputChecked)
    if(isInputChecked === "false" || isInputChecked === false)
      this.setState({openCnfrmDisbleDialog:true})
  	// this.setState({putDelayInMethod:isInputChecked})
    else
       this.setState({putDelayInMethod : true})
    
  }

handleCancelDisablePutDelay(){
     this.setState({putDelayInMethod:true,
                    openCnfrmDisbleDialog:false
     })
  }

cnfrmDisable(){
    let keywordData = Object.assign({},this.props.getAllKeywordData.data);
    keywordData["putDelayInMethod"]["value"] = 0 ;
    this.props.submitKeywordData(keywordData,this.props.profileId); 
    this.setState({putDelayInMethod:false,
                    openCnfrmDisbleDialog:false
    })

  }

enablePutDelayInMethodDialog(){
    this.setState({openPutDelayInMethodDialog:true});
    console.log("enablePutDelayInMethodDialog function callded---")
  }

submitForm(formData){
  	let keywordData = Object.assign({},this.props.getAllKeywordData.data);
    console.log("keywordData in putDelayInMethod--",putDelayInMethod)
    var putDelayInMethod;
    console.log("formData---",formData)
    /*
    * final data is data that is fetched from server and its value is updated according to user input,
    * Final data object contains all the keywords  .
    *  modifying formdata in order to form key value as:
    *   putDelayInMethod = 5:20:0:1%20fqm for putDelayInMethod keyword
    */

    putDelayInMethod = formData.fromRange+":";

    /*if user does not entr the value of toRange,then
    * toRange = fromRange
    */

    if(formData.toRange == null)
      putDelayInMethod = putDelayInMethod +formData.fromRange+":";
    else
      putDelayInMethod = putDelayInMethod +formData.toRange+":";

    if(formData.isCpuHogg === "true" || formData.isCpuHogg === true)
      putDelayInMethod = putDelayInMethod +1+":";
    else
      putDelayInMethod = putDelayInMethod +0+":";

    if(formData.isAutoInstrument === "true" || formData.isAutoInstrument === true)
      putDelayInMethod = putDelayInMethod +1;
    else
      putDelayInMethod = putDelayInMethod +0;

    if(formData.fqm != null)
      putDelayInMethod = putDelayInMethod +"%20"+formData.fqm;
           
      console.log("putDelayInMethod finaly appended--",putDelayInMethod)      
      keywordData.putDelayInMethod["value"] = putDelayInMethod;

    console.log("finalFormData---",keywordData)
    this.props.submitKeywordData(keywordData,this.props.profileId); 

    //action for runtime change
   //triggerRunTimeChanges(trData,trModeDetail,formData);
   let keywordDataList = [];
   keywordDataList.push("putDelayInMethod" + "=" + putDelayInMethod);   
   triggerRunTimeChanges(this.props.trData, this.props.trModeDetail,keywordDataList); 

  }

handleSubmitPutDelayInMethod(){
  console.log("handleSubmit---", this.refs)
  this.refs.putDelayInMethodForm.submit();
  this.handleCancelPutDelayInMethod();
  console.log("after closing the dialog----")
  }

handleCancelPutDelayInMethod(){
    // this.props.toggleStateDialogEditTopo();
     this.setState({openPutDelayInMethodDialog:false});
  }

handleCancelDisablePutDelay(){
  this.setState({ openCnfrmDisbleDialog:false,
                  enableBCICheckBox :true 
   })
}

render() {

const actionsPutDelayDisable =[
        <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleCancelDisablePutDelay.bind(this)}
      />,
      <FlatButton
        label="OK"
        primary={true}
        keyboardFocused={true}
        onClick={this.cnfrmDisable.bind(this)}
      />
];

const actions =[
        <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleCancelPutDelayInMethod.bind(this)}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleSubmitPutDelayInMethod.bind(this)}
      />
]


return (
      <div  >
     
      	<div className = "row" style={{'paddingLeft':10}}>
         <div className = "col-md-5" >
      		 <Checkbox
              label="Put Delay in Method"
              value="putDelayInMethod"
              checked  = {this.state.putDelayInMethod}
              onCustomChange={this.handlePutDelayInMethod.bind(this)}    />
            <i style={{paddingLeft:40}}>(Add Delay in any specified method Using instrumentation)</i>
            </div>
          
         <div>
         <FlatButton   className = "col-md-4" 
                      disabled ={!this.state.putDelayInMethod} 
                      onClick ={this.enablePutDelayInMethodDialog.bind(this)} 
                      label="Advanced Settings" />
         </div>
        </div> 

        <DialogPutDelayInMethod
          title="Put Delay in Method"
          actions={actions}
          modal={false}
          open={this.state.openPutDelayInMethodDialog}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}         
        >
        <FormPutDelayInMethod ref="putDelayInMethodForm" onSubmit ={this.submitForm.bind(this) } />
       </DialogPutDelayInMethod>
    	
       <ConfirmDialog
          title="Are you sure want to disable the applied settings?"
          actions={actionsPutDelayDisable}
          modal={false}
          open={this.state.openCnfrmDisbleDialog}
        >
        </ConfirmDialog>
      </div>
    );
  }
}
PutDelayInMethod.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
}

export default reduxForm({
  form: 'PutDelayInMethod',
  fields
},
  state => ({ // mapStateToProps
  getAllKeywordData :state.Keywords,
  initialData :state.Keywords.initializeKeywords.putDelayInMethodObj,
  initialValues :state.Keywords.initializeKeywords.putDelayInMethodObj,
  trData : state.initialData.trData,
  trModeDetail: state.trModeDetail
}),
  
  { 
   submitKeywordData:submitKeywordData,
 } // mapDispatchToProps (will bind action creator to dispatch)
)(PutDelayInMethod);