//Importing React components
import React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import AddNewButton from 'material-ui/FloatingActionButton';
import AddIcon from 'material-ui/svg-icons/content/add';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import { Link } from 'react-router';
import FlatButton from 'material-ui/FlatButton';

//Importing files
import * as actionCreators  from '../../../actions/index';
import DataGrid from '../../../components/DCDetailTable';

var columns = {
                "key" : "agentId",
                "data":['Tier', 'Server', 'Instance','Installation Dir', 'Version', 'Running since','State','ID'],
                "field":['tier', 'server', 'instance','installDir', 'version', 'bciRunningSince', 'state','agentId']
              };    

const customContentStyle = {
  width: '80%',
  maxWidth: 'none',
};

 class NDAgentStatus extends React.Component {
 
  constructor(props) {
    super(props);
    // this.generateTopo = this.generateTopo.bind(this);
    console.log("in setting.js---",this.props)
  }

 componentWillMount() {
    console.log("inside  componentWillMount ");
    this.props.fetchNDAgentStatusTableData();
  }

  componentWillReceiveProps(nextProps)
  {
     console.log("nextProps---",nextProps)
    if(this.props.ndAgent.tableData != nextProps.ndAgent.tableData){
      console.log("inside if conddddddddddddddddd")
      this.setState({ndAgent:nextProps.ndAgent});

       console.log("this.propssss - ", this.state)
    }
}

  onToggle(row){
    console.log("ontoggle function --event triggered---",row)
   
  }



  render() {
    return (
      <div>
        <div className='row row-no-margin tableheader'>
       
        <DataGrid data = {this.props.ndAgent.tableData} 
            pagination = {false} 
            ref        = "ndAgentTable" 
            column     = {columns}
            contentStyle = {customContentStyle}
            onClick    = {this.handleClick}
            onToggle   = {this.onToggle.bind(this)}
         />
         
      </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log("ndagent state -  " + state.ndagent)
  return {
     ndAgent : state.ndAgent
   };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(NDAgentStatus);