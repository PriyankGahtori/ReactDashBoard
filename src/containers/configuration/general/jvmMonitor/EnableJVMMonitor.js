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
import FlatButton from 'material-ui/FlatButton';
import { hashHistory } from 'react-router';
import TextField from 'material-ui/TextField';
import { reduxForm } from 'redux-form';
import _ from "lodash";
import { Link } from 'react-router';
import ConfirmDialog from 'material-ui/Dialog';
import DialogEnableJVMMonitor from 'material-ui/Dialog';
import Checkbox from '../../../../components/CheckboxWrapper';

// Importing files
import * as validate from '../../../../actions/validateGeneralKeywords';
import { triggerRunTimeChanges } from '../../../../actions/runTimeChanges';
import * as actionCreators from '../../../../actions/index';
import { getKeywordsData, submitKeywordData } from '../../../../actions/index';
import FormEnableJVMMonitor from './Form_EnableJVMMonitor';
import * as constructValue from './ModifyValue.js';


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

class EnableJVMMonitor extends React.Component {

  constructor(props) {
    super(props);
    this.state = { openEnableJVMMonitorDialog: false }
    this.state = { getAllKeywordData: this.props.getAllKeywordData }
    this.state = { enableJVMMonitorCheckBox: false }
    this.state = { openSnackBar: false }
  }

  //this function is called first when component gets first loaded
  componentWillMount() {
    this.state = { openSnackBar: false }
  }
  componentWillReceiveProps(nextProps) {

    if (this.props.getAllKeywordData != nextProps.getAllKeywordData) {
      this.setState({
        getAllKeywordData: nextProps.getAllKeywordData,
        enableJVMMonitorCheckBox: nextProps.getAllKeywordData.enableJVMMonitorCheckBox
      });
    }

  }


  enableJVMThreadMonitorDialog() {
    this.setState({ openJVMMonitorDialog: true });
  }

  handleEnableJVMMonCheckBoxChange(event, isInputChecked) {

    if (isInputChecked === true) {
      this.setState({
        openSnackBar: true
      })
     this.submitForm(validate.setDefaultValuesJVMThreadMonitor(this.props.getAllKeywordData.data));
      this.props.enableJVMMonCheckBoxStatus(true);
    }
    else {
      this.props.enableJVMMonCheckBoxStatus(isInputChecked);
      this.setState({ openCnfrmDisbleDialog: true })
    }
  }

  handleCancelJVMMonitor() {
    console.log("handleCancelJVMMonitor")
    this.setState({ openJVMMonitorDialog: false });
  }

  handleSubmit() {
    this.refs.enableJVMMonForm.submit();
  }

  handleRequestClose() {
    this.setState({
      openSnackBar: false
    })
  }

  /*
  * Disable Dialog functions
  */
  confrmDisableJVMMon() {
    this.submitForm(validate.disabledJVMThreadMonitor);
    this.props.enableJVMMonCheckBoxStatus(false);
    this.setState({
      openCnfrmDisbleDialog: false
    })

  }

  handleCancelDisableJVMMon() {
    this.setState({
      openCnfrmDisbleDialog: false,
      enableJVMMonCheckBox: true
    })
  }

  submitForm(formData) {
		let keywordData = Object.assign({}, this.props.getAllKeywordData.data);
		let keywordDataList = [];

		/*
		* final data is data that is fetched from server and 
		* its value is updated according to user input,
		* Final data object contains all the keywords  .
		* enableJVMThreadMonitor  = 1%201%200
		* 
		*/

		var jvmVal = 0;
		var length = Object.keys(formData).length

		/* below check handles the case of disabling the keyword/enabling the kwyword i.e
			  *  when formData = {"enableJVMThreadMonitor":'0'}
			  *  there is no need to call constructVal function
			  */

		if (length > 1) {
			jvmVal = constructValue.constructJVMValue(formData);
		}
		else
			jvmVal = formData.enableJVMThreadMonitor;

		keywordData.enableJVMThreadMonitor["value"] = jvmVal;

		this.props.submitKeywordData(keywordData, this.props.profileId);

		//action for runtime change
		//triggerRunTimeChanges(trData,trModeDetail,formData);

		keywordDataList.push("enableJVMThreadMonitor" + "=" + jvmVal);
		triggerRunTimeChanges(this.props.trData, this.props.trModeDetail, keywordDataList);
		this.handleCancelJVMMonitor();
	}

  render() {
    const actions = [
      <FlatButton className="dialog-modal cancel"
        label="Cancel"
        primary={true}
        onTouchTap={this.handleCancelJVMMonitor.bind(this)}
        />,
      <FlatButton
        label="Save"
        primary={true}
        keyboardFocused={true}
        disabled={this.props.profileDisabled}
        onClick={this.handleSubmit.bind(this)}
        />
    ];

    const actionsJVMMonDisable = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleCancelDisableJVMMon.bind(this)}
        />,
      <FlatButton
        label="OK"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.confrmDisableJVMMon.bind(this)}
        />
    ]

    return (
      <div>
        <div className="row" style={{ 'paddingTop': 10 }}>
          <div className="col-md-5" >

            <Checkbox
              label="JVM Thread Stats Monitor"
              value="enableJVMMonitor"
              disabled={this.props.profileDisabled}
              checked={this.state.enableJVMMonitorCheckBox}
              onCustomChange={this.handleEnableJVMMonCheckBoxChange.bind(this)}
               />
            <i style={{ paddingLeft: 40 }}>Enable JVM Monitor with default settings</i>
          </div>
          <div className="col-md-2" >
            <RaisedButton
              disabled={!this.state.enableJVMMonitorCheckBox}
              onClick={this.enableJVMThreadMonitorDialog.bind(this)}
              style={{ width: 150 }}
              backgroundColor="#3a9e95"
              disabledLabelColor="#000"
              labelColor="#FFF"
              label="More Settings ..."
              labelStyle={{ fontSize: 12 }} />
          </div>
        </div>

        <DialogEnableJVMMonitor className="dialog-modal"
          style={{ paddingTop: 10 }}
          title="JVM Monitor Settings"
          actions={actions}
          modal={false}
          open={this.state.openJVMMonitorDialog}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
          titleStyle={styles.title}
          >
          <FormEnableJVMMonitor ref="enableJVMMonForm" onSubmit={this.submitForm.bind(this)} /> 
        </DialogEnableJVMMonitor>

        <Snackbar
          open={this.state.openSnackBar}
          message="JVM Monitor settings with default values is enabled now."
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose.bind(this)} />

        <ConfirmDialog
          title="Are you sure want to disable the applied settings ?"
          actions={actionsJVMMonDisable}
          modal={false}
          open={this.state.openCnfrmDisbleDialog} >
        </ConfirmDialog>

      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    getAllKeywordData: state.Keywords,
    trData: state.initialData.trData,
    trModeDetail: state.trModeDetail,
    profileDisabled: state.profileDisabled.disabled
  };
}

//method to dispatch actions to the reducers
function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(EnableJVMMonitor);
