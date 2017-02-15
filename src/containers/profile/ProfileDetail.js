//Importing React components
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Paper from 'material-ui/Paper';
import AddNewButton from 'material-ui/FloatingActionButton';
import AddIcon from 'material-ui/svg-icons/content/add';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import Snackbar from 'material-ui/Snackbar';
import { hashHistory } from 'react-router';

//Importing files
import DialogProfile from './Dialog_Profile_NewProfile';
import * as actionCreators from '../../actions/index';
import DataGrid from '../../components/DCDetailTable';

/*
* data --- table column name
* key ---- acting as a primary key
* 
*/

var columns = {
  "key": "id",
  "data": ['Name', ' Description', 'LINK'],
  "field": ['profileHref', 'profileDesc', 'id']
};

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

class ProfileDetail extends React.Component {

  constructor(props) {
    super(props);
    this.delRow = this.delRow.bind(this);
    this.state = { openNewAppDialog: false } //
    this.handleOpen = this.handleOpen.bind(this);
    this.loader = this.loader.bind(this)
  }

  delRow() {
    let selectedRowKeys = this.refs.profileDetailTable.refs.table.state.selectedRowKeys;
    this.props.delProfileTableRow(selectedRowKeys)

    //cleaning state of selectedRowKeys
    this.refs.profileDetailTable.refs.table.cleanSelected();
  }

  handleHref(row) {
    hashHistory.push(`/profile/${row.id}`)
  }

  /*
  * flag "openProfileDialogType" used to determine FormDialog to be opened will be for which functionality
  * add OR edit
  */
  handleOpen(openProfileDialogType) {

    let selectedRowData = [];
    if (openProfileDialogType == "edit") {

      let selectedRow = this.refs.profileDetailTable.refs.table.state.selectedRowKeys;
      if (selectedRow.length == 1) {
        selectedRowData = this.props.profileDetail.tableData
          .filter(function (value) {
            return value.id === selectedRow[0]
          });
        this.props.profileInitializeForm(selectedRowData[0], openProfileDialogType);
        this.props.toggleStateDialogNewProfile(); //opens dialog box
        this.refs.profileDetailTable.refs.table.state.cleanState();

      }
    }

    else if (openProfileDialogType == "add") { //for adding new row
      this.props.profileInitializeForm(null, openProfileDialogType); //clears previous/initial values
      this.props.toggleStateDialogNewProfile(); //opens dialog box
    }

  }
  //this function is called fPirst when component gets first loaded
  componentWillMount() {
    this.props.triggerLoader(true, null);
    this.props.fetchProfileDetailData(this.loader);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.profileDetail != nextProps.profileDetail)
      this.setState({ profileDetail: nextProps.profileDetail });
  }
  loader() {
    var msg = { 'title': 'Profile Data Loaded ', 'msg': '' }
    this.props.triggerLoader(false, msg)
  }
  render() {

    return (
      <div>
        <Paper zDepth={2} style={{ background: 'rgba(0,0,0,0.45)', color: '#FFF' }}>
          <div className='row row-no-margin tableheader'>
            <div className="col-md-10">
              <h4>Profile Detail(s)</h4>
            </div>

            <div className="col-md-2"  >
              {/*<IconButton  tooltip="Edit Profile" onTouchTap={this.handleOpen.bind(this,"edit")}><FontIcon className="material-icons">edit_mode</FontIcon></IconButton>
            <IconButton tooltip="Delete Profile" onTouchTap={this.delRow}><FontIcon className="material-icons">delete</FontIcon></IconButton>
           */}
            </div>
          </div>


          {/* Rendering table component  ,
          * passing data (received from store) to the table component to be displayed at table 
         */
          }
          <DataGrid data={this.props.profileDetail.tableData}
            pagination={false}
            ref="profileDetailTable"
            column={columns}
            onClick={this.handleClick}
            onhref={this.handleHref.bind(this)}
            />
        </Paper>

        <div>
          <AddNewButton className="add-btn" style={NewButtonstyle} onTouchTap={this.handleOpen.bind(this, "add")} >
            <AddIcon />
          </AddNewButton>

          <DialogProfile />

        </div>

        <Snackbar
          open={this.state.open}
          message="No row selected or multiple rows selected"
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
          />

      </div>

    );
  }
}

function mapStateToProps(state) {
  return {
    profileDetail: state.profileDetailData
  };
}

//method to dispatch actions to the reducers
function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(ProfileDetail);
