import React from 'react';
import MultiSelect from 'react-select';

export default class MultiSelectWrapper extends React.Component {

 
onChange(value){
	console.log("value----",value)
	console.log("in multiSelect wrpper---",this.props)

	  if (this.props.onChange)
      	this.props.onChange(value);

	  if (this.props.onCustomChange)
     	 this.props.onCustomChange(value);
    
}
/* Redux-form props -onBlur function
* onBlur- A function to call when the form field loses focus. 
* It expects to either receive the React SyntheticEvent or
*  the current value of the field.   
*
* Earlier on changing value and after clicking outside anywhere in the screen, field was losing its value
* as internally onBlur function was being called with blank value as a parameter.
* Thus now manually calling this function with selelcted value.
*/
 onBlur(value){
   
 }

 


  render() {
    return (
    	<MultiSelect 
    		{...this.props}
            onChange={this.onChange.bind(this)}
            onBlur = {this.onBlur.bind(this)}
           
      />
     
    );
  }
}
