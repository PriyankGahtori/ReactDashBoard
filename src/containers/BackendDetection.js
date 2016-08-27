import React from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import AddNewButton from 'material-ui/FloatingActionButton';
import AddIcon from 'material-ui/svg-icons/content/add';
import DataGrid from '../components/DCDetailTable';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import DialogBackendList from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import BackendDetectionList from './BackendDetectionList'


/*
* data --- table column name
* key ---- acting as a primary key
* 
*/

var columns = {
                "key" : "id",
                "data":['Type', 'Description','Enable All','LINK'],
                "field":['type', 'desc', 'enable','id']
              }; 

var data = [{"type": {"href":"HTTP"},"desc": "All HTTP Backends", "enable": true,"id": 1},
			{"type": {"href":"DB"},"desc": "All HTTP Backends", "enable": true,"id": 2},
			{"type": {"href":"RMI"},"desc": "All HTTP Backends", "enable": true,"id": 3}
			];

const style = {
  //margin: 20,
  textAlign: 'center',
  display: 'inline-block'
};

const NewButtonstyle = {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 30,
    left: 'auto',
    position: 'fixed'

};
export default class BackendDetection extends React.Component {  

  constructor(props) {
    super(props);
    this.state = {'openBackendList': false, 'backendType': 'Backends','selecteRow':{}}
  }
  
  handleHref(row)
  {
  	console.log("in function handleHref--",row);
  	this.setState({backendType: row.type.href ,openBackendList: true,selecteRow: row});  	
  } 

  handleOpen(){
    this.setState({openBackendList: true});
  };

  handleClose(){
    this.setState({openBackendList: false});
  };

  render() {
   
   const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose.bind(this)}
      />,
      <FlatButton
        label="Discard"
        primary={true}
        onTouchTap={this.handleClose.bind(this)}
      />,
    ];


    return (
      <div>
        <Paper zDepth={2}>     
       <div className='row row-no-margin tableheader'>
          <div className="col-md-10">
              <h4>Backend Detection</h4>
          </div>

          <div className="col-md-2"  >
            <IconButton><FontIcon className="material-icons">edit_mode</FontIcon></IconButton>
            <IconButton><FontIcon className="material-icons">delete</FontIcon></IconButton>
          </div>
       </div>
             
        {/* Rendering table component  ,
          * passing data (received from store) to the table component to be displayed at table 
         */}
        <DataGrid 
          pagination={false} 
          ref="appTable" 
          column = {columns}
          data={data}
          onhref={this.handleHref.bind(this)}
        />
        </Paper>
		
		<DialogBackendList
		  title={this.state.backendType}
		  actions={actions}
          modal={true}
          autoScrollBodyContent={true}
          open={this.state.openBackendList}
          onRequestClose={this.handleClose.bind(this)}

		>
		  <BackendDetectionList 
		    backendType={this.state.backendType}
		    selectedRow={this.state.selecteRow}/>
		</DialogBackendList>       

      <div>
         <AddNewButton style={NewButtonstyle}>
            <AddIcon />
         </AddNewButton>      
      </div>

   </div>
    );
  }
}
