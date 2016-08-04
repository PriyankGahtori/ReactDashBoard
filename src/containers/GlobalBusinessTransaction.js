import React,{PropTypes} from 'react';
import { reduxForm } from 'redux-form';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import SelectField from '../components/SelectFieldWrapper';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
//import Checkbox from 'material-ui/Checkbox';
import Checkbox from '../components/CheckboxWrapper';

export const fields = ["uriType","segType","parameter","method","header"];
export const initialValues = {'uriType':'complete',"segType":"first"};
class GlobalBusinessTransaction extends React.Component {
  

  constructor(props) {
    super(props);
    this.state={
    	'segmentDivCSS' : 'hidden',
    	'parameterCheckbox' : false,
    	'methodCheckbox' : false,
    	'headerCheckbox' : false
    }
  }
  handleURITypeChange(event, value){
  	//show and hidden are bootstrap CSS to show and hide
  	let css = value === 'segment' ? 'show' : 'hidden';
  	this.setState({'segmentDivCSS':css})
  }
  handleCheckboxChange(type,event,value){
  	console.log("event",event);
  	console.log("value",value);
  	console.log("type",type);
  	this.setState({'parameterCheckbox': value});
  }

  render() {

  	const {
      fields: {uriType, segType, parameter, method, header},
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
	  		onChange={this.handleURITypeChange.bind(this) }
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
          floatingLabelText="Segments of URI in Transaction"
        />        
      </div>

      <Checkbox
      	  {...parameter}	
          value="parameter"
          label="Parameter Value"
          checked={this.state.parameterCheckbox}
          onCustomChange={this.handleCheckboxChange.bind(this,"parameter")}              
       />
       <Checkbox
       	  {...method}
          value="method"
          label="Method"
                          
          onCustomChange={this.handleCheckboxChange.bind(this,"method")}
       />       
       <Checkbox
          {...header}
          value="header"
          label="Header"
          
          onCustomChange={this.handleCheckboxChange.bind(this,"header")}                    
       />
		
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