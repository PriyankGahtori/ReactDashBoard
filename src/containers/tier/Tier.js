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
import DialogAttachProfile from '../profile/attachProfile/DialogAttachProfile_Tier';
import DialogNewTopology from '../topology/Dialog_Topo_NewTopo';

var columns = {
  "key": "tierId",
  "data": [' Name', ' Description', 'Profile Applied', 'Id'],
  "field": ['tierName', 'tierDesc', 'profLink', 'tierId']
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



class Tier extends React.Component {

  constructor(props) {
    super(props);
    this.state = { treedata: this.props.treedata };
    this.updateNode = this.updateNode.bind(this);
    this.delRow = this.delRow.bind(this);
    this.state = { openNewTopoDialog: false }
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.onSelectRow = this.onSelectRow.bind(this);
    this.loader = this.loader.bind(this);
  }

  onSelectRow() {
  }

  updateNode(e) {
    e.preventDefault()
    this.props.updateTreeNode(this.props.routeParams.something);
  }

  delRow() {
    var selectedRowKeys = [];
    let selectedRowKeysObj = this.refs.topoTable.refs.table.state.selectedRowKeys;
    /* selectedRowKeysObj.forEach(
                           value =>{
                           selectedRowKeys.push(value.self.href)
                           }) */

    /*var selectRowsValueForServer= this.props.dcDetail.tableData
                        .filter(value => selectedRowKeysForUI.indexOf(value.dcName)!= -1)
                        .map((value,index) => value._links.self.href)
  
    console.log("selectRowsValue--",selectRowsValueForServer)*/
    this.props.delTopoTableRow(selectedRowKeysObj)
  }

  handleClick() {
  }

  handleHref(row) {
    hashHistory.push(`${this.props.location.pathname}/tier/${row.tierId}/configuration/${row.profileId}`)
  }

  handleOpen() {
    //for editing form
    // gets the selected key of table
    let selectedRow = this.refs.tierTable.refs.table.state.selectedRowKeys;

    if (selectedRow.length == 1) {
      this.setState({ open: false });
      let selectedRowData = this.props.tierData.tableData
        .filter(function (value) {
          return value.tierId === selectedRow[0];
        });

      //action to dispatch selectRowData
      this.props.tierInitializeForm(selectedRowData[0], this.props.params.topoId);
      this.props.toggleStateDialogTier();
      this.refs.tierTable.refs.table.cleanSelected();
    }
    else {
      //toster notification: Only one row can be edited
      this.setState({ open: true });
    }
  }

  componentWillMount() {
    /*
    * triggerring an action to fetch topology table data
    *   here node.id is dc_id  
    */
    var topoId = this.props.params.topoId;
    var topology = this.props.topologyData.tableData.filter(function (value) {
      return value.topoId === topoId;
    })
    var message = null;
    this.props.triggerLoader(true, message)
    this.props.fetchTierTableData(this.props.params.topoId, topology[0], this.loader)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.tierData != nextProps.tierData) {
      this.setState({ tierData: nextProps.tierData });
    }
  }

  /* function to trigger event for closing progressBar  
  * called when request for fetching tier data is sent
  */
  loader() {
    var message = { 'title': 'Tier data loaded', 'msg': '' }
    this.props.triggerLoader(false, null);
  }

  render() {

    return (
      <div>
        <Paper zDepth={2} style={{ background: 'rgba(0,0,0,0.45)', color: '#FFF' }}>
          <div className='row row-no-margin tableheader'>
            <div className="col-md-10">
              <h4>Tier Detail(s)</h4>
            </div>
            <div className="pull-right" >
              <IconButton tooltip='Edit Tier' onTouchTap={this.handleOpen.bind(this)}><FontIcon color="#FFF" className="material-icons" style={{ "color": "#FFF" }}>edit_mode</FontIcon></IconButton>

            </div>
          </div>

          <DataGrid data={this.props.tierData.tableData}
            pagination={false}
            ref="tierTable"
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
    tierData: state.tierData,
    topologyData: state.topologyData
  };
}

//method to dispatch actions to the reducers
function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Tier);
