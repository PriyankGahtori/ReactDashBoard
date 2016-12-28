import React from 'react';
import {RadioButtonGroup} from 'material-ui/RadioButton';

export default class RadioButtonGroupWrapper extends React.Component {

	 
	onChange(event,value){
		if(this.props.onChange){
			this.props.onChange(value)
		}

		//custom callback function
		if(this.props.onCustomChange){
			this.props.onCustomChange(event,value)
		}


	}

  render() {
    return (      
    <RadioButtonGroup {...this.props} onChange={this.onChange.bind(this)}>
	    {this.props.children}
    </RadioButtonGroup>
    );
  }
}
