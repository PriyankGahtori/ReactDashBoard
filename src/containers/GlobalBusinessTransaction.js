import React,{PropTypes} from 'react';
import { reduxForm } from 'redux-form';
import RadioButton from 'material-ui/RadioButton';
import RadioButtonGroup from '../components/RadioButtonGroupWrapper';
import SelectField from '../components/SelectFieldWrapper';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import Checkbox from '../components/CheckboxWrapper';

export const fields = ["uriType","segType","segValue","dynamicReqType","dynamicReqValue","parameter","method","header"];
export const initialValues = {'uriType':'complete',"segType":"first"};
class GlobalBusinessTransaction extends React.Component {
  

  constructor(props) {
    super(props);
    this.state={
    	'segmentDivCSS' : 'hidden',
    	'dynamicReqType' : false,
    	'paramDiv' : true, 
  		'methodDiv': false,
  		'headerDiv': false    	
    }
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
  	let paramDiv  = value === "parameter";
  	let methodDiv = value === "method";
  	let headerDiv = value === "header";
  	this.setState({'paramDiv': paramDiv,
  					'methodDiv': methodDiv, 
  					'headerDiv':headerDiv 
  				  });	
  	
  	console.info(value);
  }

  render() {

  	const {
      fields: {uriType, segType, segValue, dynamicReqType,dynamicReqValue,parameter, method, header},
      handleSubmit,
      resetForm,
      submitting
      } = this.props;

    return (
    <form onSubmit={handleSubmit( data => alert(JSON.stringify(data)) )}>

      <div style={{'paddingTop':20}}>
      	<h4>What Part of URI should be used in Transaction Name.</h4>
      </div>
	  <RadioButtonGroup 
	  		{...uriType}
	  		name="uriType" 
	  		defaultSelected="complete"
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
		<SelectField value={"first"} {...segType} >
          <MenuItem value={"first"} primaryText="First" />
          <MenuItem value={"last"} primaryText="Last" />
          <MenuItem value={"segNo"} primaryText="Segment Number" />
        </SelectField>
        <TextField      	 
          {...segValue}	 
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
  		defaultSelected="parameter"
  		onCustomChange={this.handleDReqRadioChange.bind(this)}
	  >
       <RadioButton
          value="parameter"
          label="Parameter Name"
          disabled={!this.state.dynamicReqType}                    
       />
       <RadioButton
          value="method"
          label="Method"
          disabled={!this.state.dynamicReqType}          
       />
       <RadioButton
          value="header"
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
          		{...parameter}
        	/>
		</div>
		
		<div className={this.state.methodDiv === true ? 'show' :'hidden'}>
			<p>Use the request method (GET/POST/PUT) in Transaction names.</p>
		</div>
		
		<div className={this.state.headerDiv === true ? 'show' :'hidden'}>
			<TextField
				{...header}      	  
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
  fields,
  initialValues
})(GlobalBusinessTransaction);