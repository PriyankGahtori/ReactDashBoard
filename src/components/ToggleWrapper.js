import React from 'react';
import Toggle from 'material-ui/Toggle';

export default class ToggleWrapper extends React.Component{

  onToggle(evt, value) {
    //this property is of redux-form
      this.props.onChange(value);

    //this property of components 
    if (this.props.onToggleChange){
      this.props.onToggleChange(evt, value);
    }
  }
  render() {
    return (
      <Toggle {...this.props} onToggle={this.onToggle.bind(this)} />
        
    );
  }
}
