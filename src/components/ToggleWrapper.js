import React from 'react';
import Toggle from 'material-ui/Toggle';

export default class ToggleWrapper extends React.Component{
  onToggle(evt, value) {
      this.props.onChange(value);

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
