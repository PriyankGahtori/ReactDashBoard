//Importing React components
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
import FlatButton from 'material-ui/FlatButton';
import { hashHistory } from 'react-router';
import TextField from 'material-ui/TextField';
import { reduxForm } from 'redux-form';
import _ from "lodash";
import { Link } from 'react-router';
import ConfirmDialog from 'material-ui/Dialog';
import DialogEnableMonitor from 'material-ui/Dialog';
import Checkbox from '../../../../components/CheckboxWrapper';

//Importing files
import * as actionCreators from '../../../../actions/index';
import { getKeywordsData, submitKeywordData } from '../../../../actions/index';
import FormEnableMonitors from './Form_EnableMonitors';
import * as validate from '../../../../actions/validateGeneralKeywords';


const styles = {
  text: {
    fontSize: 18,
    paddingLeft: 6
  },

  mainBlock: {
    paddingLeft: 10,
    paddingBottom: 20
  },

  row1: {
    paddingBottom: 20
  },

  row2: {
    paddingTop: 40
  },

  title: {
    fontSize: '16px',
    padding: '8px'
  }

};


/*
* data --- table column name
* key ---- acting as a primary key
* 
*/

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

class EnableMonitors extends React.Component {

  constructor(props) {
    super(props);
    this.state = { openSnackBar: false }
    this.state = { enableMonitorsCheckBox: false }
  }

  //this function is called first when component gets first loaded
  componentWillMount() {
    this.state = { openSnackBar: false }
  }

  componentWillReceiveProps(nextProps) {

    if (this.props.getAllKeywordData != nextProps.getAllKeywordData) {
      this.setState({
        getAllKeywordData: nextProps.getAllKeywordData,
        enableMonitorsCheckBox: nextProps.getAllKeywordData.enableMonitorsCheckBox
      });
    }

    if (this.props.getAllKeywordData.enableMonitorsCheckBox != nextProps.getAllKeywordData.enableMonitorsCheckBox)
      this.setState({ disableAdvancedSettingTab3: !nextProps.getAllKeywordData.enableMonitorsCheckBox })

  }

  handleDReqCheckboxChange(event, value) {
    console.log("event---", event)
    console.log("value---", value)
  }
  /*
  *  functions for enableBCICapturing Dialog
  */

  handleEnableMonitorsDialog() {
    this.setState({ openEnableMonitorsDialog: true });
  }

  handleEnableMonitors(event, isInputChecked) {

    if (isInputChecked === true) {
      this.setState({ openSnackBar: true })
      this.submitForm(validate.setDefaultValuesBackendMonitor(this.props.getAllKeywordData.data));
    }
    else {
      this.setState({ openCnfrmDisbleDialog: true })
    }
  }

  handleCancel() {
    this.setState({ openEnableMonitorsDialog: false });
  }


  handleSubmit() {
    this.refs.monitorForm.submit();
    this.handleCancel();
  }


  handleRequestClose() {
    this.setState({
      openSnackBar: false
    })
  }

  /*
  * Disable Dialog functions
  */
  handleConfirmDisableBackendMon() {

    this.submitForm(validate.disabledBackendMonitor);
    this.props.enableMonitorsCheckBoxStatus(false);
    this.setState({
      openCnfrmDisbleDialog: false
    })

  }

  handleCancelDisableBackendMon() {
    this.setState({
      openCnfrmDisbleDialog: false,
      EnableMonitorsCheckBox: true
    })
  }

  submitForm(formData) {
    let keywordData = Object.assign({}, this.props.getAllKeywordData.data);
    console.log("value of getKeywordsData is-------------->",keywordData)

    /*
    * final data is data that is fetched from server and its value is updated according to user input,
    * Final data object contains all the keywords  .
    */

    let finalFormData = _.forEach(formData, function (value, key) {
      if (value === "true" || value === true) {
        value = "1";
      }
      else if (value === "false" || value === false) {
        value = "0";
      }
      keywordData[key]["value"] = String(value);

    });
    console.log("finalFormData---", keywordData)
    this.props.submitKeywordData(keywordData, this.props.profileId);
  }

  render() {
    const actions = [
      <FlatButton className="dialog-modal cancel"
        label="Cancel"
        primary={true}
        onTouchTap={this.handleCancel.bind(this)}
        />,
      <FlatButton
        label="Submit"
        primary={true}
        disabled={this.props.profileDisabled}
        keyboardFocused={true}
        onClick={this.handleSubmit.bind(this)}
        />
    ];

    const actionsBackendMonDisable = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleCancelDisableBackendMon.bind(this)}
        />,
      <FlatButton
        label="OK"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleConfirmDisableBackendMon.bind(this)}
        />
    ];

    return (
      <div>
        <div className="row" style={{ 'paddingLeft': 10 }}>
          <div className="col-md-5">
            <Checkbox
              value="EnableMonitors"
              label="Enable Monitors Settings"
              disabled={this.props.profileDisabled}
              checked={this.state.enableMonitorsCheckBox}
              onCustomChange={this.handleEnableMonitors.bind(this)} />
            <i style={{ paddingLeft: 40 }}>Enable/Disable ND graph monitors </i>
          </div>
          <div>
            <div>
              <RaisedButton
                disabled={!this.state.enableMonitorsCheckBox}
                onClick={this.handleEnableMonitorsDialog.bind(this)}
                style={{ width: 150 }}
                backgroundColor="#3a9e95"
                disabledLabelColor="#000"
                labelColor="#FFF"
                label="More Settings ..."
                labelStyle={{ fontSize: 12 }} />
            </div>
          </div>
        </div>


        <DialogEnableMonitor className="dialog-modal"
          title="Enable Monitor"
          actions={actions}
          modal={false}
          open={this.state.openEnableMonitorsDialog}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
          titleStyle={styles.title}
          >
          <FormEnableMonitors ref="monitorForm" onSubmit={this.submitForm.bind(this)} />
        </DialogEnableMonitor>

        <Snackbar
          open={this.state.openSnackBar}
          message="Monitor(s) with default values is enabled now."
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose.bind(this)}
          />

        <ConfirmDialog
          title="Are you sure want to disable the Monitor(s)?"
          actions={actionsBackendMonDisable}
          modal={false}
          open={this.state.openCnfrmDisbleDialog}
          >
        </ConfirmDialog>

      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    getAllKeywordData: state.Keywords,
    profileDisabled: state.profileDisabled.disabled
  };
}

//method to dispatch actions to the reducers
function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(EnableMonitors);
