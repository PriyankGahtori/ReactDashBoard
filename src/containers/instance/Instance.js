//Importing react components
import React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import AddNewButton from 'material-ui/FloatingActionButton';
import AddIcon from 'material-ui/svg-icons/content/add';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import Snackbar from 'material-ui/Snackbar';
import { hashHistory } from 'react-router';

//Importing files
import * as actionCreators from '../../actions/index';
import DataGrid from '../../components/DCDetailTable';
import DialogNewInstance from '../profile/attachProfile/DialogAttachProfile_Instance';


var columns = {
  "key": "instanceId",
  "data": [' Name', ' Description', 'Profile Applied', 'Enabled', 'Id'],
  "field": ['instanceName', 'instanceDesc', 'profLink', 'enabled', 'instanceId']
};

const style = {
  //margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};

const NewButtonstyle = {
  margin: 0,
  top: 'auto',
  right: 20,
  bottom: 30,
  left: 'auto',
  position: 'fixed',

};


class Instance extends React.Component {

  constructor(props) {
    super(props);
    this.state = { treedata: this.props.treedata };
    this.updateNode = this.updateNode.bind(this);
    this.state = { openNewTopoDialog: false }
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = { instanceData: this.props.instanceData };
    this.onSelectRow = this.onSelectRow.bind(this);
    this.loader = this.loader.bind(this);
    this.makeRunTimeChange = this.makeRunTimeChange.bind(this);
  }

  handleHref(row) {
    hashHistory.push(`${this.props.location.pathname}/instance/${row.instanceId}/configuration/${row.profileId}`)
  }

  onSelectRow() {
  }

  updateNode(e) {
    e.preventDefault()
    this.props.updateTreeNode(this.props.routeParams.something);
  }


  handleClick() {
  }


  handleOpen() {
    //for editing form
    // gets the selected key of table
    let selectedRow = this.refs.instanceTable.refs.table.state.selectedRowKeys;

    if (selectedRow.length == 1) {
     this.setState({ open: false });

      let selectedRowData = this.props.instanceData.tableData
        .filter(function (value) {
          return value.instanceId === selectedRow[0];
        });
      //action to dispatch selectRowData
      this.props.instanceInitializeForm(selectedRowData[0], this.props.params.serverId);
      this.props.toggleStateDialogInstance();
      this.refs.instanceTable.refs.table.cleanSelected();
    }
    else {
      //toster notification: Only one row can be edited
      this.setState({ open: true });
    }


  }

  componentWillMount() {
    var serverId = this.props.params.serverId;
    var server = this.props.serverData.tableData.filter(function (value) {
      return value.serverId == serverId;
    })
    var message = null;
    this.props.triggerLoader(true, message)
    this.props.fetchInstanceTableData(this.props.params.serverId, server[0], this.loader);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.instanceData != nextProps.instanceData) {
      this.setState({ instanceData: nextProps.instanceData });
    }
    if (this.props.params.serverId != nextProps.params.serverId) {
      var serverId = nextProps.params.serverId;
      var server = this.props.serverData.tableData.filter(function (value) {
        return value.serverId == serverId;
      })
      var message = null;
      this.props.triggerLoader(true, message)
      this.props.fetchInstanceTableData(serverId, server[0], this.loader);
    }

  }

  /* function to trigger event for loading progess bar 
  * called aftr receiving response for fetching instance data
  */

  loader() {
    var message = { 'title': 'Instance data loaded', 'msg': '' }
    this.props.triggerLoader(false, null);
  }

  makeRunTimeChange() {

  }

  onToggle(row) {
    //Runtime left TO DO
    row.enabled = !row.enabled;
    this.props.updateInstanceEnabled(row, this.makeRunTimeChange);
    //triggering runtime changes
    //this.makeRunTimeChange();
  }


  render() {

    return (
      <div>
        <Paper zDepth={2} style={{ background: 'rgba(0,0,0,0.45)', color: '#FFF' }}>
          <div className='row row-no-margin tableheader'>
            <div className="col-md-10">
              <h4>Instance Detail(s)</h4>
            </div>
            <div className="pull-right"  >
              <IconButton tooltip="Edit Instance" onTouchTap={this.handleOpen.bind(this)}><FontIcon color="#FFF" className="material-icons">edit_mode</FontIcon></IconButton>
            </div>
          </div>

          <DataGrid data={this.props.instanceData.tableData}
            pagination={false}
            ref="instanceTable"
            column={columns}
            onClick={this.handleClick}
            onhref={this.handleHref.bind(this)}
            onToggle={this.onToggle.bind(this)}
            />
        </Paper>


        <Snackbar
          open={this.state.open}
          message="No row selected or multiple rows selected"
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
          />
        <DialogNewInstance />
      </div>

    );
  }
}

function mapStateToProps(state) {
  return {
    instanceData: state.instanceData,
    serverData: state.serverData
  };
}

//method to dispatch actions to the reducers
function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Instance);
