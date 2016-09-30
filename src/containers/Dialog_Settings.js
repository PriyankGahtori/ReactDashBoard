import React from 'react';
import {Card,CardText,CardActions,CardHeader} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators  from '../actions/index';
 class Dialog_Settings extends React.Component {
 
  constructor(props) {
    super(props);
    this.updateTopo = this.updateTopo.bind(this);
    this.generateTopo = this.generateTopo.bind(this);
    console.log("in setting.js---",this.props)
  }

updateTopo(){
  this.props.updateTopology();
   this.props.closeDialog();

}
generateTopo(){
  this.props.generateNdConf();
}

  render() {
    return (
      <div   > 
          <div >
      
         <FlatButton style={{left:'150' }} label="Migrate Topologies" onTouchTap={this.updateTopo} primary={true} /> 
        </div>
     {/*   <div >
       <p style={{paddingLeft:'100'}}>Generate ndonfig ile </p>
       <FlatButton style={{left:'270',bottom: '40'}} label="Generate" onTouchTap={this.generateTopo} primary={true} /> 
       </div>
     */} 
      </div>

    );
  }
}

function mapDispatchToProps(dispatch) {
return bindActionCreators(actionCreators, dispatch);
}
export default connect(null,mapDispatchToProps)(Dialog_Settings);
