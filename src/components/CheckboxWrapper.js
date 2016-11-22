import React from 'react';
import Checkbox from 'material-ui/Checkbox';

export default class CheckboxWrapper extends React.Component {
 
  onCheck(evt, value) {
    console.log("in chkboxwrapperr-----",value)
    console.log("in chkboxwrapperr--before onChange-----",this.props)
    if(this.props.onChange)
      this.props.onChange(value); 

     console.log("aftr calling update functoj chckbox this.props---",this.props)
    


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
