import React,{PropTypes} from 'react';
import { reduxForm } from 'redux-form';
import RadioButton from 'material-ui/RadioButton';
import RadioButtonGroup from '../components/RadioButtonGroupWrapper';
import SelectField from '../components/SelectFieldWrapper';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import Checkbox from '../components/CheckboxWrapper';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {initializeBTFields,addBTData}  from '../actions/index';

export const fields = ["uriType","segmentType","segmentValue","dynamicReqType","dynamicReqValue","requestParam","httpMethod","requestHeader"];
/*export const initialValues = {
                              "uriType"      :"complete",
                              "segmentType"   :"first",
                              "segmentValue"  : "NA",
                              "dynamicReqType":false,
                              "dynamicReqValue":"NA",
                              "requestParam" :"NA",
                              "method"       :false,
                              "header"       :"NA"
                            };*/
class GlobalBusinessTransaction extends React.Component {
  

  constructor(props) {
    super(props);
    console.log("in globalbt---",this.props)
    console.log("mountinf compo")
    this.state={
    	'segmentDivCSS' : 'hidden',
    	'dynamicReqType' : false,
    	'paramDiv' : true, 
  		'methodDiv': false,
  		'headerDiv': false    	
    }
  }

   componentWillMount() {
    console.log("componentWillMount")
    this.props.initializeBTFields();
  }

 

  handleURITypeChange(event, value){
  	//show and hidden are bootstrap CSS to show and hide
  	let css = value === 'segment' ? 'show' : 'hidden';
  	this.setState({'segmentDivCSS':css})
  }

  handleDReqCheckboxChange(event,value){
  	this.setState({'dynamicReqType': value})	
  }

  handleDReqRadioChange(event,value){
  	let paramDiv  = value === "requestParam";
  	let methodDiv = value === "httpMethod";
  	let headerDiv = value === "requestHeader";
  	this.setState({'paramDiv': paramDiv,
  					'methodDiv': methodDiv, 
  					'headerDiv':headerDiv 
  				  });	
  	
  	console.info(value);
  }

submit(data){
    data = JSON.stringify(data);
    console.log("data---",data)
    console.log("profileId--",this.props.params.profileId)
    this.props.addBTData(data,this.props.params.profileId);       
}

  render() {

  	const {
      fields: {uriType, segmentType, segmentValue, dynamicReqType,dynamicReqValue,requestParam, httpMethod, requestHeader},
      handleSubmit,
      resetForm,
      submitting
      } = this.props;

    return (
    <form onSubmit ={handleSubmit(this.submit.bind(this)) }>

      <div style={{'paddingTop':20}}>
      	<h4>What Part of URI should be used in Transaction Name.</h4>
      </div>
	  <RadioButtonGroup 
	  		{...uriType}
	  		name="uriType" 
	  		defaultSelected={uriType.initialValue}
	  		onCustomChange={this.handleURITypeChange.bind(this) }
	  		>
       <RadioButton
          value="complete"
          label="Complete"          
       />
       <RadioButton
          value="segment"
          label="Use Segment of URI"          
       />

      </RadioButtonGroup>

      <div className={`row ${this.state.segmentDivCSS}`} style={{'marginLeft':30}} enabled={false}>
		<SelectField value={"first"} {...segmentType} >
          <MenuItem value={"first"} primaryText="First" />
          <MenuItem value={"last"} primaryText="Last" />
          <MenuItem value={"segNo"} primaryText="Segment Number" />
        </SelectField>
        <TextField      	 
          {...segmentValue}	 
          floatingLabelText="Segments of URI in Transaction"
        />        
      </div>

{/*---------------------Dynamic Request Type--------------------------*/}

<div style={{'marginTop':30, 'marginBottom':30}}>
	 <Checkbox
 	  {...dynamicReqType}
      value="dynamicReq"
      label="Use Dynamic Request Type ?"
      labelStyle={{"fontSize":18,"fontWeight":0}}           
      onCustomChange={this.handleDReqCheckboxChange.bind(this)}
      checked={this.state.dynamicReqType}              
     />

  {/*------------Radio Button Group---------------*/}

     <div className='row'>
     <RadioButtonGroup
     	{...dynamicReqValue} 
  		className={'col-xs-4 col-md-3'} 
  		style={{display: 'flex'}}  		
  		name="requestType" 
  		defaultSelected={dynamicReqValue.initialValue}
  		onCustomChange={this.handleDReqRadioChange.bind(this)}
	  >
       <RadioButton
          value="requestParam"
          label="Parameter Name"
          disabled={!this.state.dynamicReqType}                    
       />
       <RadioButton
          value="httpMethod"
          label="Method"
          disabled={!this.state.dynamicReqType}          
       />
       <RadioButton
          value="requestHeader"
          label="Header"
          disabled={!this.state.dynamicReqType}          
       />
     </RadioButtonGroup>
     </div>

  {/*------------Dynamic Request Type Div---------------*/}

  	<div className={this.state.dynamicReqType === true ? 'show' :'hidden'}>
		<div className={this.state.paramDiv === true ? 'show' :'hidden'}>
			<TextField      	  
          		floatingLabelText="Parameter Name"
          		{...requestParam}
        	/>
		</div>
		
		<div className={this.state.methodDiv === true ? 'show' :'hidden'}>
			<p>Use the request method (GET/POST/PUT) in Transaction names.</p>
		</div>
		
		<div className={this.state.headerDiv === true ? 'show' :'hidden'}>
			<TextField
				{...requestHeader}      	  
          		floatingLabelText="Header Name"
        	/>
		</div>
  	</div>   

	</div> 	
      
		
		<div>
          <button type="submit" disabled={submitting}>
            {submitting ? <i/> : <i/>} Submit
          </button>
          <button type="button" disabled={submitting} onClick={resetForm}>
            Clear Values
          </button>
        </div>  
    </form>  
    );
  }
}

GlobalBusinessTransaction.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
}

export default reduxForm({
  form: 'globalBT',
  fields
},
  state => ({ // mapStateToProps
  initialValues:state.BTGlobal.btGlobalInitialize
}),
  { 
   initializeBTFields : initializeBTFields,
   addBTData          : addBTData
 } // mapDispatchToProps (will bind action creator to dispatch)
)(GlobalBusinessTransaction);