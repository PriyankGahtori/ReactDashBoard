import React from 'react';
import {hashHistory } from 'react-router';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

export default class BusinessTransaction extends React.Component {
  
  constructor(props) {
    super(props);    
  }

  handleChange(event,value){
  	value = value === "global" ? "" : value
  	let profileId = this.props.params.profileId;
    let routeURL = `instrumentation/${profileId}/bt/${value}`;
    hashHistory.push(routeURL);
    
  }

  render() {
    
    return (    
      <div><h3>Bussiness Transaction Configuration</h3>
	    <div className='row'>
	      <RadioButtonGroup name="btType" 
      		className={'col-xs-4 col-md-3'} 
      		style={{display: 'flex'}}
      		onChange={this.handleChange.bind(this)}
      		defaultSelected="global" >

	        <RadioButton
	          value="global"
	          label="Global Rule"              
	        /> 
	        <RadioButton
	          value="pattern"
	          label="Pattern Rule"              
	        />
	      </RadioButtonGroup>
	    </div> 

      {this.props.children}
      </div>     
    );

  }
}
