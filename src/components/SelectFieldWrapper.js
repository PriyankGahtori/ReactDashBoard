import React from 'react';
import SelectField from 'material-ui/SelectField';

export default class SelectFieldWrapper extends React.Component{
  onChange(evt, index, value) {

    if (this.props.onChange) {
      this.props.onChange(value);
      
    }
    
    //Custom callback event handling
    if (this.props.customOnChange){
      this.props.customOnChange(evt, index, value);
    }

  }
  render() {
    return (
      <SelectField {...this.props} onChange={this.onChange.bind(this)}>
        {this.props.children}
      </SelectField>
    );
  }
}

