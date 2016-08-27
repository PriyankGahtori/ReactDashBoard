import React from 'react';
import Checkbox from 'material-ui/Checkbox';
import Toggle from 'material-ui/Toggle';
const list = [
								{"name":"FQM1","id":"1","toggled":true},
								{"name":"FQM2","id":"2","toggled":false},
								{"name":"FQM3","id":"3","toggled":false},
								{"name":"FQM4","id":"4","toggled":true}
							]
export default class BackendDetectionList extends React.Component {
  

  constructor(props) {
    super(props);
  }
  handleToggle(value)
  {
  	console.info("toggled",value);
  }

  render() {
    return (
    <div>	
			<div className='row'>
			 <h3>Naming Rules</h3>
			 <div className={'col-xs-4 col-md-3'} style={{display: 'flex'}}>
				<Checkbox label="Host" />
				<Checkbox label="Port" />
				<Checkbox label="URL" />
				<Checkbox label="Prefix" />
			 </div>
			</div>

      <div>
      	<h3>End Points</h3>
          {
          	list.map((value,index) =>(
          		<Toggle label={value.name} onToggle={this.handleToggle.bind(this,value)} />	
          	))
          } 
      List Wala Data : {this.props.backendType}<br/>
      Props : {JSON.stringify(this.props.selectedRow)}
      </div>
    </div>  
    );
  }
}