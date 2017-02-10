//Importing React components
import React from 'react';
import {Card,CardText,CardActions,CardHeader} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {hashHistory } from 'react-router';

//Importing files
import * as actionCreators  from '../../actions/index';
import Dialog from 'material-ui/Dialog';

class MigrateTopo extends React.Component {

  constructor(props) {
    super(props);
    this.updateTopo = this.updateTopo.bind(this);
    this.generateTopo = this.generateTopo.bind(this);
    console.log("in setting.js---",this.props)
    this.loader  = this.loader.bind(this);
  }

  updateTopo(){
   this.props.triggerLoader(true,null);
   this.props.updateTopology(this.loader);
   this.props.closeDialog();
  }

  generateTopo(){
    this.props.generateNdConf();
  }


  loader(){
    var msg = {'title':'Topology imported' , 'msg': ''}
    this.props.triggerLoader(false,msg)
  }

  render() {
    return (
      <div > 
      <RaisedButton
       style={{left:'195px',position:'absolute'}}
       label="Import Topologies" 
       backgroundColor="#3a9e95"
       onTouchTap={this.updateTopo} 
       labelStyle={{fontSize:12}}
       labelColor="#FFF"  /> 
       <p style={{paddingTop:'40px'}}><center><i>This feature is used to sync topology settings of GUI with the file system.</i></center></p>
     </div>
     );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}
export default connect(null,mapDispatchToProps)(MigrateTopo);
