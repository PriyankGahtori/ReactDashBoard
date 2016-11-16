import React from 'react';
import MultiSelect from 'react-select';

export default class MultiSelectWrapper extends React.Component {

 
onChange(value){
	console.log("value----",value)
	console.log("in multiSelect wrpper---",this.props)

	  if (this.props.onUpdate)
      	this.props.onUpdate(value);
    
    console.log("this.props---",this.props)

	  if (this.props.customOnChange)
     	 this.props.customOnChange(value);
    
}
 

  render() {
    return (
    	<MultiSelect 
    		{...this.props}
            onChange={this.onChange.bind(this)}
      />
     
    );
  }
}
