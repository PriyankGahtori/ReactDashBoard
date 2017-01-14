//Importing react Components
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
import DialogEnableHotSpotCapturing from 'material-ui/Dialog';
import { Link } from 'react-router';
import ConfirmDialog from 'material-ui/Dialog';

//Importing files
import { getKeywordsData, submitKeywordData } from '../../../../actions/index';
import FormEnableHotSpotCapturing from './Form_EnableHotSpotCapturing';
import * as validate from '../../../../actions/validateGeneralKeywords'
import { triggerRunTimeChanges } from '../../../../actions/runTimeChanges';
import * as actionCreators from '../../../../actions/index';
import Checkbox from '../../../../components/CheckboxWrapper';

const styles = {
  text: {
    fontSize: 18,
    paddingLeft: 6
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

class EnableHotSpotCapturing extends React.Component {

  constructor(props) {
    super(props);
    this.state = { enableBCIDebug: false }
    this.state = { openEnableHotSpotCapturingDlog: false }
    this.state = { getAllKeywordData: this.props.getAllKeywordData }
  }


  //this function is called first when component gets first loaded
  componentWillMount() {
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.getAllKeywordData != nextProps.getAllKeywordData) {
      this.setState({
        getAllKeywordData: nextProps.getAllKeywordData,
        hotSpotCapturingCheckBox: nextProps.getAllKeywordData.hotSpotCapturingCheckBox,
        disableAdvancedSettingTab2: !nextProps.getAllKeywordData.hotSpotCapturingCheckBox
      });
    }

    /*if(this.props.getAllKeywordData.hotSpotCapturingCheckBox != nextProps.getAllKeywordData.hotSpotCapturingCheckBox)
      this.setState({disableAdvancedSettingTab2:!nextProps.getAllKeywordData.hotSpotCapturingCheckBox})*/
  }


  handleDReqCheckboxChange(event, value) {
  }

  /*
  * functions for hotSpot capturing
  */
  handleEnableHotSpotCapturingCheckboxChange(event, isInputChecked) {
    if (isInputChecked === true) {
      //console.log("action trigegerd")
      //  this.props.setDefValHotSpotCapturingKeywords();
      /*
      * opening cnfirm dialog 
      */
      this.setState({
        openSnackBar: true
      })
      //  this.props.setDefValHotSpotCapturingKeywords();

      this.submitForm(validate.setDefaultValuesHotSpotCapturing(this.props.getAllKeywordData.data));
      this.props.enableHotSpotCheckBoxStatus(true);


    }
    else {
      this.props.enableHotSpotCheckBoxStatus(isInputChecked);
      this.setState({ openCnfrmDisbleDialog: true })
    }


  }

  enableHotSpotCapturingDialog() {
    this.setState({ openEnableHotSpotCapturingDialog: true });
  }

  handleCancelEnableHotSpotCapturing() {
    // this.props.toggleStateDialogEditTopo();
    this.setState({ openEnableHotSpotCapturingDialog: false });
  }


  handleSubmitEnableHotSpotCapturing() {
    this.refs.enableHotSpotCapturingForm.submit();
  }



  handleRequestClose() {
    this.setState({
      openSnackBar: false
    })
  }
  /*
  * Disable Dialog functions
  */
  cnfrmDisableBCIVal() {

    this.submitForm(validate.disabledHotSpotCapturing);
    this.props.enableHotSpotCheckBoxStatus(false);
    this.setState({
      openCnfrmDisbleDialog: false
    })

  }

  handleCancelDisableBCIVal() {
    this.setState({
      openCnfrmDisbleDialog: false,
      hotSpotCapturingCheckBox: true
    })
  }

  submitForm(formData) {

    //form data contains, only keywords of this group i.e HotspotCapturing  


    //clone all keywords data and modify keywords of HOTSPOT Capturing
    let keywordData = Object.assign({}, this.props.getAllKeywordData.data);


    /*
    * final data is data that is fetched from server and its value is updated according to user input,
    * Final data object contains all the keywords  .
    */

    //iterate over keywords passed by form i.e HotspotCapturing keywords 
    let finalFormData = _.forEach(formData, function (value, key) {
      //change true --> 1 and false --> 0
      if (value === "true" || value === true) {
        value = "1";
      }
      else if (value === "false" || value === false) {
        value = "0";
      }

      //update HotspotCapturing Keyword's ('keywordData' contains all available keywords)
      keywordData[key]["value"] = String(value);

    });
    //   this.props.submitKeywordData(keywordData,this.props.profileId,"hotSpotCapturing"); 
    this.props.submitKeywordData(keywordData, this.props.profileId);
    this.handleCancelEnableHotSpotCapturing();

    //action for runtime change
    let keywordDataList = [];
    Object.keys(formData).forEach(function (key) {
      keywordDataList.push(key + "=" + formData[key]);
    })
    triggerRunTimeChanges(this.props.trData, this.props.trModeDetail, keywordDataList);
  }

  render() {


    const actionsHotSpotCapturing = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleCancelEnableHotSpotCapturing.bind(this)}
        />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleSubmitEnableHotSpotCapturing.bind(this)}
        />
    ];


    /* const actionsHotSpotDefault = [
       <FlatButton
         label="Cancel"
         primary={true}
         onTouchTap={this.handleCancelEnableHotSpotDefVal.bind(this)}
       />,
       <FlatButton
         label="OK"
         primary={true}
         keyboardFocused={true}
         onClick={this.cnfrmEnableHotSpotDefVal.bind(this)}
       />
     ];  */

    const actionsHotSpotDisable = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleCancelDisableBCIVal.bind(this)}
        />,
      <FlatButton
        label="OK"
        primary={true}
        keyboardFocused={true}
        onClick={this.cnfrmDisableBCIVal.bind(this)}
        />
    ]


    return (
      <div style={{ paddingTop: 15 }}>
        <div className="row" >
          <div className="col-md-5">
            <Checkbox
              label="Enable Hotspot Capturing"
              value="enableHotSpotCapturing"
              checked={this.state.hotSpotCapturingCheckBox}
              onCustomChange={this.handleEnableHotSpotCapturingCheckboxChange.bind(this)} />
            <i style={{ paddingLeft: 40 }}>Capture thread hotspots using BCI autoSensor </i>
          </div>

          <div className="col-md-2" >
            <RaisedButton
              disabled={!this.state.hotSpotCapturingCheckBox}
              onClick={this.enableHotSpotCapturingDialog.bind(this)}
              style={{ width: 150 }}
              backgroundColor="#18494F"
              disabledLabelColor="#000"
              labelColor="#FFF"
              label="More Settings ..."
              labelStyle={{ fontSize: 12 }} />

          </div>
        </div>

        <DialogEnableHotSpotCapturing
          title="Hotspot Capturing"
          actions={actionsHotSpotCapturing}
          modal={false}
          open={this.state.openEnableHotSpotCapturingDialog}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
          titleStyle={styles.title}
          >
          <FormEnableHotSpotCapturing ref="enableHotSpotCapturingForm" onSubmit={this.submitForm.bind(this)} />
        </DialogEnableHotSpotCapturing>



        { /* <ConfirmDialog
    title="Are you sure want to enable the HotSpot keywords with default Values?"
    actions={actionsHotSpotDefault}
    modal={false}
    open={this.state.openCnfrmHotSpotDialog}
    onRequestClose={this.handleClose}
    >
         
   </ConfirmDialog>*/}

        <Snackbar
          open={this.state.openSnackBar}
          message="HotSpot capturing keywords with default values is enabled now."
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose.bind(this)} />


        <ConfirmDialog
          title="Are you sure want to disable the applied settings?"
          actions={actionsHotSpotDisable}
          modal={false}
          open={this.state.openCnfrmDisbleDialog}
          onRequestClose={this.handleClose}
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
    trModeDetail: state.trModeDetail
  };
}

//method to dispatch actions to the reducers
function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(EnableHotSpotCapturing);
