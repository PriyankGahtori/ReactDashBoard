import React from 'react';
import Checkbox from 'material-ui/Checkbox';

var data = {}
export default class GeneralSettings extends React.Component {

  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div>
      	<Checkbox label="Enable Applogs Data" />
		<Checkbox label="Port" />
		<Checkbox label="URL" />
		<Checkbox label="Prefix" />
      </div>
    );
  }
}
