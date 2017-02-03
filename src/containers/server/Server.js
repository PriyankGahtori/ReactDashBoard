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
import DataGrid from '../../components/DCDetailTable';

//Importing files
import * as actionCreators from '../../actions/index';
import DialogAttachProfile from '../profile/attachProfile//DialogAttachProfile_Server';

var columns = {
  "key": "serverId",
  "data": [' Name', ' Description', 'Profile Applied', 'Id'],
  "field": ['serverName', 'serverDesc', 'profLink', 'serverId']
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

class Server extends React.Component {

  constructor(props) {
    super(props);
    this.state = { treedata: this.props.treedata };
    this.updateNode = this.updateNode.bind(this);
    this.delRow = this.delRow.bind(this);
    this.state = { openNewTopoDialog: false }
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = { topologyData: this.props.topologyData };
    this.onSelectRow = this.onSelectRow.bind(this);
    this.loader = this.loader.bind(this);
  }

  onSelectRow() {
  }

  updateNode(e) {
    e.preventDefault()
    this.props.updateTreeNode(this.props.routeParams.something);
  }
  handleHref(row) {
    hashHistory.push(`${this.props.location.pathname}/server/${row.serverId}/configuration/${row.profileId}`)
  }

  delRow() {
    var selectedRowKeys = [];
    let selectedRowKeysObj = this.refs.topoTable.refs.table.state.selectedRowKeys;

    /*var selectRowsValueForServer= this.props.dcDetail.tableData
                        .filter(value => selectedRowKeysForUI.indexOf(value.dcName)!= -1)
                        .map((value,index) => value._links.self.href)
  
    console.log("selectRowsValue--",selectRowsValueForServer)*/
    this.props.delTopoTableRow(selectedRowKeysObj)
  }

  handleClick() {
  }

  handleOpen() {
    //for editing form
    // gets the selected key of table
    let selectedRow = this.refs.serverTable.refs.table.state.selectedRowKeys;

    if (selectedRow.length == 1) {
       this.setState({ open: false });
      let selectedRowData = this.props.serverData.tableData
        .filter(function (value) {
          return value.serverId === selectedRow[0];
        });

      //action to dispatch selectRowData
      this.props.serverInitializeForm(selectedRowData[0], this.props.params.tierId);
      this.props.toggleStateDialogServer();
      this.refs.serverTable.refs.table.cleanSelected();
    }
    else {
      //toster notification: Only one row can be edited
      this.setState({ open: true });
    }

  }

  componentWillMount() {

    /*
    * triggerring an action to fetch server table data
    *   here node.id is dc_id  
    */
    var tierId = this.props.params.tierId;
    var tier = this.props.tierData.tableData.filter(function (value) {
      return value.tierId == tierId;
    })
    var message = null;
    this.props.triggerLoader(true, message)
    this.props.fetchServerTableData(this.props.params.tierId, tier[0], this.loader);
  }

  componentWillReceiveProps(nextProps) {
    /*called when another tree node is selected and to trigger the action "fetchTopologyTableData"  
     * for new DC  selected.
     */
    if (this.props.params.tierId != nextProps.params.tierId) {

      var tierId = nextProps.params.tierId;
      var tier = nextProps.tierData.tableData.filter(function (value) {
        return value.tierId == tierId;
      })
      this.props.fetchServerTableData(nextProps.params.tierId, tier[0]);
    }


    if (this.props.serverData != nextProps.serverData) {
      this.setState({ serverData: nextProps.serverData });
    }
  }


  /* function to trigger event for loading progess bar 
  * called when request for fetching server data is sent
  */

  loader() {
    var message = { 'title': 'Server data loaded', 'msg': '' }
    this.props.triggerLoader(false, null);
  }


  render() {

    return (
      <div>
        <Paper zDepth={2} style={{ background: 'rgba(0,0,0,0.45)', color: '#FFF' }}>
          <div className='row row-no-margin tableheader'>
            <div className="col-md-10">
              <h4>Server Detail(s)</h4>
            </div>
            <div className="pull-right"  >
              <IconButton tooltip="Edit Server" onTouchTap={this.handleOpen.bind(this)}><FontIcon color="#FFF" className="material-icons">edit_mode</FontIcon></IconButton>
            </div>
          </div>

          <DataGrid data={this.props.serverData.tableData}
            pagination={false}
            ref="serverTable"
            column={columns}
            onClick={this.handleClick}
            onhref={this.handleHref.bind(this)}
            />
        </Paper>


        <Snackbar
          open={this.state.open}
          message="No row selected or multiple rows selected"
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
          />

        <DialogAttachProfile />
      </div>

    );
  }
}

function mapStateToProps(state) {
  return {
    serverData: state.serverData,
    tierData: state.tierData
  };
}

//method to dispatch actions to the reducers
function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Server);
