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
        <div>
       <Card style={{'paddingTop':1 ,'paddingLeft':5,'background':'rgba(0,0,0,0.45)', 'color':'#FFF'}}> 
      <h3 style={{'bottom': 8, 'position': 'relative'}}>Bussiness Transaction Configuration</h3>
	    <div className='row' style= {{'bottom':6,'position': 'relative', color: '#FFF'}}>
	      <RadioButtonGroup name="btType" 
      		className={'col-xs-4 col-md-4'} 
      		style={{display: 'flex',color:'#FFF'}}
      		onChange={this.handleChange.bind(this)}
      		defaultSelected="global" >

	        <RadioButton
	          value="global"
            label="Global" 
            labelStyle={{'color':'#FFF'}}
             /> 
        
	        <RadioButton
	          value="pattern" 
            label="Pattern"
            labelStyle={{'color':'#FFF'}}
           />
        
	      </RadioButtonGroup>

	    </div> 
      </Card>
      {this.props.children}

      </div>     
    );

  }
}
