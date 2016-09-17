import React from 'react';
import Checkbox from 'material-ui/Checkbox';

export default class CheckboxWrapper extends React.Component {
 
  onCheck(evt, value) {
    console.log("on check fun called",this.props)
    console.log("value---",value)

    if(this.props.onChange)
      this.props.onChange(value); 

    //custom callback function  
    if(this.props.onCustomChange){
    	this.props.onCustomChange(evt, value);
    }    
  }

  render() {
    return (
      <Checkbox {...this.props} onCheck={this.onCheck.bind(this)} />        
    );
  }
}
