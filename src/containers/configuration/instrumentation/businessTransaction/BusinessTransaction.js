//Importing React components
import React from 'react';
import {hashHistory } from 'react-router';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import {Card} from 'material-ui/Card';
export default class BusinessTransaction extends React.Component {
  
  constructor(props) {
    super(props);    
  }

  handleChange(event,value){
  	value = value === "global" ? "" : value
  	let profileId = this.props.params.profileId;
    //let routeURL = `instrumentation/${profileId}/bt/${value}`;
    let currPath = `${this.props.location.pathname}`;
        currPath = currPath.substring(0, currPath.indexOf("bt")+2)
    let routeURL = `${currPath}/${value}`;
    hashHistory.push(routeURL);
    
  }

  render() {
    
    return (    
      <div><h3>Bussiness Transaction Configuration</h3>
       <Card style={{'marginTop':10,'paddingLeft':5}}>

	    <div className='row'>
	      <RadioButtonGroup name="btType" 
      		className={'col-xs-4 col-md-4'} 
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
      </Card>
      {this.props.children}

      </div>     
    );

  }
}
