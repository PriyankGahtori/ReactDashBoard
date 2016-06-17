import React from 'react';
import TextField from 'material-ui/TextField';

export default class Testing extends React.Component {
 

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
      	<TextField 
      	  hintText="Hint Text"
          id="text-field-default"
          defaultValue="Testing"
          floatingLabelText="DCName"
      	/>
      </div>
    );
  }
}
