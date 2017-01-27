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
import Snackbar from 'material-ui/Snackbar';
import ConfirmDelDialog from 'material-ui/Dialog'

//Importing files
import DialogMethodBT from './Dialog_BTMethod';
import DialogMethodBTEdit from './Dialog_BTMethodEdit';
import DropDownMenu from '../../../../components/SelectFieldWrapper';
import DataGrid from '../../../../components/DCDetailTable';
import * as actionCreators from '../../../../actions/index';


export const fields = ['fqm', 'parameterName', 'operation', 'btName']


var columns = {
  "key": "btMethodId",
  "data": ['Fully Qualified Method Name', 'Return Type', 'ID'],
  "field": ['hrefFqm', 'returnType', 'btMethodId']
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

const styles = {
  block: {
    maxWidth: 250,
    paddingBottom: 5
  },
  toggle: {
    marginTop: 30,
    paddingLeft: 80
  },
  customWidth: {
    width: 200
  },
  checkbox: {
    marginBottom: 16,
    paddingTop: 35
  },
  btSetBlock: {
    paddingLeft: 10,

    paddingTop: 5
  }
};

class MethodBT extends React.Component {

  constructor(props) {
    super(props);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = { errorDetection: this.props.errorDetection }
    this.loader = this.loader.bind(this)
    this.state = { openSnack: false, cnfmDelDialog: false }
    this.handleClose = this.handleClose.bind(this);
    // this.delErrorDetection = this.delErrorDetection.bind(this);
  }

  handleClick() {

  }

  componentWillMount() {
//    this.props.triggerLoader(true, null)
    this.props.fetchBTMethodTableData(this.props.params.profileId); 
  }

  loader() {
    // var message = {'title': 'Error Detection Loaded','msg' : ''}
    this.props.triggerLoader(false, null);

  }

  onToggle(row) {
    // console.log("ontoggle function --event triggered---",row)

  }

  componentWillReceiveProps(nextProps) {
    if (this.props.methodBT.tableData != nextProps.methodBT.tableData)
      this.setState({ methodBT: nextProps.methodBT });
  }

  handleDelErrorDetection() {
    var selectedRow = [];
    selectedRow = this.refs.errorDetectionTable.refs.table.state.selectedRowKeys;
    if (selectedRow.length >= 1) {
      this.setState({ openSnack: false, cnfmDelDialog: true })
    }
    else {
      this.setState({ openSnack: true, cnfmDelDialog: false })
    }
  }

  handleCancel() {
    console.log("inside handle cancel")
    this.props.toggleStateMethodBT();
  }

  handleCheck(event, value) {
    console.log("inside handle check")

  };
  handleClose() {
    this.setState({ cnfmDelDialog: false })
  }

  // Below Method is called when the user tries to delete the Error Detection.
  /* delErrorDetection(){
      var selectedRow = [] ;
      selectedRow = this.refs.errorDetectionTable.refs.table.state.selectedRowKeys;
      this.props.delErrorDetectionRow(this.props.params.profileId,selectedRow);
      try{
         this.refs.errorDetectionTable.refs.table.cleanSelected();
      }
      catch(e)
      {
        console.error(" Exception Occured: FileName: ErrorDetection,MethodName: delErrorDetection() ",e)
      }
 
      this.setState({cnfmDelDialog: false})
 
   } */

  handleOpen() {

    //for adding  form
    this.props.toggleStateMethodBT(); //opens dialog box
  }

//for edit form
handleHref(row){
  console.log("handleOpenEditForm method called--",row)
    // gets the selected key of table
        this.setState({openSnack:false})
        let selectedRowData = this.props.methodBT.tableData
                                  .filter(function(value){
                                    return value.btMethodId === row.btMethodId
                                  });
        //action to dispatch selectedRowData to set initialValue to the fields in case of editing the row
        console.log("line no 175--",selectedRowData[0])
        this.props.btMethodInitializeForm(row);
       
       //called this act                                                                                                                                                                                             ion to toggle the state of opened FormDialog. 
        this.props.toggleStateMethodBTEdit();
}

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose} />,

      <FlatButton
        label="Delete"
        primary={true}
        onTouchTap={this.delErrorDetection} />
    ];

    return (
      <div>
        <Paper zDepth={2} style={{ background: 'rgba(0,0,0,0.45)', color: '#FFF' }}>
          <div className='row row-no-margin tableheader'>
            <div className="col-md-4">
              <h4 style={{ position: 'relative' }}>Method Bussiness Transaction(s)</h4>
            </div>
            <IconButton tooltip="Delete Method BT" className="pull-right" onTouchTap={this.handleDelErrorDetection.bind(this)}><FontIcon color="#FFF" className="material-icons"> delete </FontIcon> </IconButton>
            <DataGrid data={this.props.methodBT.tableData}
              pagination={false}
              ref="btMethodTable"
              column={columns}
              onClick={this.handleClick}
              onToggle={this.onToggle.bind(this)}
              onhref={this.handleHref.bind(this)}
              />

            <div>
              <AddNewButton style={NewButtonstyle} onTouchTap={this.handleOpen.bind(this)}>
                <AddIcon />
              </AddNewButton>
              <DialogMethodBT profileId={this.props.params.profileId} />
              <ConfirmDelDialog
                open={this.state.cnfmDelDialog}
                title="Are you sure want to delete the Error Detection(s)?"
                actions={actions}
                modal={false} />
              <DialogMethodBTEdit profileId={this.props.params.profileId} />

            </div>
          </div>
          <Snackbar
            open={this.state.openSnack}
            message="No row selected or multiple rows selected"
            autoHideDuration={4000}
            />

        </Paper>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    methodBT: state.methodBT
  };
}

//method to dispatch actions to the reducers
function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MethodBT);
