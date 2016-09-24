import React from 'react';

export default class InputWrapper extends React.Component {

  

  render() {
    return (
      <input {...this.props} type="number" min="0" max = "30"/>
    );
  }
}
