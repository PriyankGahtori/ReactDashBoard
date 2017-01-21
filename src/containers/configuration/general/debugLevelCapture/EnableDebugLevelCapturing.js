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
import DialogEnableDebugCapturing from 'material-ui/Dialog';
import Checkbox from '../../../../components/CheckboxWrapper';

//Importing files
import { getKeywordsData, submitKeywordData } from '../../../../actions/index';
import FormEnableDebugCapturing from './Form_EnableDebugLevelCapturing';
import * as validate from '../../../../actions/validateGeneralKeywords';
import { triggerRunTimeChanges } from '../../../../actions/runTimeChanges';
import * as actionCreators from '../../../../actions/index';

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

class EnableDebugLevelCapturing extends React.Component {

  constructor(props) {
    super(props);
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
        enableDebugCheckBox: nextProps.getAllKeywordData.enableDebugCheckBox
      });
    }

    if (this.props.getAllKeywordData.enableDebugCheckBox != nextProps.getAllKeywordData.enableDebugCheckBox)
      this.setState({ disableAdvancedSettingTab3: !nextProps.getAllKeywordData.enableDebugCheckBox })

  }


  handleDReqCheckboxChange(event, value) {
  }
  /*
  *  functions for enableBCICapturing Dialog
  */

  enableDebugCapturingDialog() {
    this.setState({ openEnableDebugCapturingDialog: true });
  }

  handleEnableDebugCapturingCheckboxChange(event, isInputChecked) {

    if (isInputChecked === true) {
      this.setState({
        openSnackBar: true
      })
      this.submitForm(validate.setDefaultValuesDebugCapturing(this.props.getAllKeywordData.data));
      this.props.enableDebugCheckBoxStatus(true);
      this.handleCancelEnableDebugCapturing();

    }
    else {
      this.props.enableDebugCheckBoxStatus(isInputChecked);
      this.setState({ openCnfrmDisbleDialog: true })
    }
  }

  handleCancelEnableDebugCapturing() {
    this.setState({ openEnableDebugCapturingDialog: false });
  }


  handleSubmitDebugCapturing() {
    this.refs.enableDebugCapturingForm.submit();
  }

  handleRequestClose() {
    console.log("handle close")
    this.setState({
      openSnackBar: false
    })
  }

  /*
  * Disable Dialog functions
  */
  cnfrmDisableDebugVal() {
    this.submitForm(validate.disabledDebugCapturing);
    this.props.enableDebugCheckBoxStatus(false);
    this.setState({
      openCnfrmDisbleDialog: false
    })

  }

  handleCancelDisableDebugVal() {
    this.setState({
      openCnfrmDisbleDialog: false,
      enableDebugCheckBox: true
    })
  }

  submitForm(formData) {

    let keywordData = Object.assign({}, this.props.getAllKeywordData.data);

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
    this.props.submitKeywordData(keywordData, this.props.profileId);
    //action for runtime change
    let keywordDataList = [];
    Object.keys(formData).forEach(function (key) {
      keywordDataList.push(key + "=" + formData[key]);
    })
    triggerRunTimeChanges(this.props.trData, this.props.trModeDetail, keywordDataList);
    this.handleCancelEnableDebugCapturing();
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleCancelEnableDebugCapturing.bind(this)}
        />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        disabled={this.props.profileDisabled}
        onClick={this.handleSubmitDebugCapturing.bind(this)}
        />
    ];

    const actionsDebugDisable = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleCancelDisableDebugVal.bind(this)}
        />,
      <FlatButton
        label="OK"
        primary={true}
        keyboardFocused={true}
        onClick={this.cnfrmDisableDebugVal.bind(this)}
        />
    ];

    return (
      <div style={{ paddingTop: 10 }}>

        <div className="row" style={{ 'paddingLeft': 10 }}>
          <div className="col-md-5">
            <Checkbox
              label="Enable Debug Level Capturing"
              value="enableDebugLevel"
              disabled={this.props.profileDisabled}
              checked={this.state.enableDebugCheckBox}
              onCustomChange={this.handleEnableDebugCapturingCheckboxChange.bind(this)} />

            <i style={{ paddingLeft: 40 }}>Trace level configuration for various BCI features</i>
          </div>
          <div>
            <RaisedButton
              disabled={!this.state.enableDebugCheckBox}
              onClick={this.enableDebugCapturingDialog.bind(this)}
              style={{ width: 150 }}
              backgroundColor="#18494F"
              disabledLabelColor="#000"
              labelColor="#FFF"
              label="More Settings ..."
              labelStyle={{ fontSize: 12 }} />
          </div>
        </div>

        <DialogEnableDebugCapturing
          title="Debug Level Capturing"
          actions={actions}
          modal={false}
          open={this.state.openEnableDebugCapturingDialog}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
          titleStyle={styles.title} >
          <FormEnableDebugCapturing ref="enableDebugCapturingForm" onSubmit={this.submitForm.bind(this)} />
        </DialogEnableDebugCapturing>

        {/*<ConfirmDialog
          title="Are you sure want to enable the keywords with default Values?"
          actions={actionsBCIDefault}
          modal={false}
          open={this.state.openCnfrmBCIDialog}
          onRequestClose={this.handleClose}
        >
        </ConfirmDialog>*/}

        <Snackbar
          open={this.state.openSnackBar}
          message="enabled  Debug capturing keywords with default values"
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose.bind(this)} />

        <ConfirmDialog
          title="Are you sure want to disable the applied settings?"
          actions={actionsDebugDisable}
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
    trData: state.initialData.trData,
    trModeDetail: state.trModeDetail,
    profileDisabled: state.profileDisabled.disabled
  };
}

//method to dispatch actions to the reducers
function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(EnableDebugLevelCapturing);
