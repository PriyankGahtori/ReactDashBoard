//Importing React components
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';
import RadioButton from 'material-ui/RadioButton';
import FlatButton from 'material-ui/FlatButton';
import ConfirmDialog from 'material-ui/Dialog';
import DialogPutDelayInMethod from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import Checkbox from '../../../../components/CheckboxWrapper';
import RadioButtonGroup from '../../../../components/RadioButtonGroupWrapper';

//Importing files
import FormPutDelayInMethod from './Form_PutDelayInMethod';
import { submitKeywordData, initializeInstrException } from '../../../../actions/index';
import { triggerRunTimeChanges } from '../../../../actions/runTimeChanges';

export const fields = ['fromRange', 'toRange', 'isCpuHogg', 'isAutoInstrument', 'fqm'];

const styles = {
  title: {
    fontSize: '16px',
    padding: '8px'
  }
}

class PutDelayInMethod extends React.Component {

  constructor(props) {
    super(props);
    this.state = { putDelayInMethod: false }
    this.state = { openPutDelayInMethodDialog: false }
  }


  componentWillReceiveProps(nextProps) {

    if (this.props.initialData != nextProps.initialData) {
      if (nextProps.initialData != 0)
        this.setState({
          putDelayInMethod: true
        });
      this.state = { openSnackBar: false }
    }
  }

  handlePutDelayInMethod(event, isInputChecked) {
    if (isInputChecked === "false" || isInputChecked === false) {
      this.setState({ openCnfrmDisbleDialog: true })
    }
    else
      this.setState({
        putDelayInMethod: true,
        openSnackBar: true
      })
  }

  handleCancelDisablePutDelay() {
    this.setState({
      putDelayInMethod: true,
      openCnfrmDisbleDialog: false
    })
  }

  cnfrmDisable() {
    let keywordData = Object.assign({}, this.props.getAllKeywordData.data);
    keywordData["putDelayInMethod"]["value"] = 0;

    this.props.submitKeywordData(keywordData, this.props.profileId);
    this.setState({
      putDelayInMethod: false,
      openCnfrmDisbleDialog: false
    })
  }

  enablePutDelayInMethodDialog() {
    this.setState({ openPutDelayInMethodDialog: true });
  }

  submitForm(formData) {
    let keywordData = Object.assign({}, this.props.getAllKeywordData.data);
    var putDelayInMethod;
    /*
    * final data is data that is fetched from server and its value is updated according to user input,
    * Final data object contains all the keywords  .
    *  modifying formdata in order to form key value as:
    *   putDelayInMethod = 5:20:0:1%20fqm for putDelayInMethod keyword
    */

    putDelayInMethod = formData.fromRange + ":";

    /*if user does not entr the value of toRange,then
    * toRange = fromRange
    */

    if (formData.toRange == null)
      putDelayInMethod = putDelayInMethod + formData.fromRange + ":";
    else
      putDelayInMethod = putDelayInMethod + formData.toRange + ":";

    if (formData.isCpuHogg === "true" || formData.isCpuHogg === true)
      putDelayInMethod = putDelayInMethod + 1 + ":";
    else
      putDelayInMethod = putDelayInMethod + 0 + ":";

    if (formData.isAutoInstrument === "true" || formData.isAutoInstrument === true)
      putDelayInMethod = putDelayInMethod + 1;
    else
      putDelayInMethod = putDelayInMethod + 0;

    if (formData.fqm != null)
      putDelayInMethod = putDelayInMethod + "%20" + formData.fqm;

    keywordData.putDelayInMethod["value"] = putDelayInMethod;

    this.props.submitKeywordData(keywordData, this.props.profileId);

    //action for runtime change
    //triggerRunTimeChanges(trData,trModeDetail,formData);
    let keywordDataList = [];
    keywordDataList.push("putDelayInMethod" + "=" + putDelayInMethod);
    triggerRunTimeChanges(this.props.trData, this.props.trModeDetail, keywordDataList);
    this.handleCancelPutDelayInMethod();
  }

  handleSubmitPutDelayInMethod() {
    this.refs.putDelayInMethodForm.submit();

  }

  handleCancelPutDelayInMethod() {
    this.setState({ openPutDelayInMethodDialog: false });
  }

  handleCancelDisablePutDelay() {
    this.setState({
      openCnfrmDisbleDialog: false,
      enableBCICheckBox: true
    })
  }

  handleRequestClose() {
    this.setState({
      openSnackBar: false
    })
  }
  render() {

    const actionsPutDelayDisable = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleCancelDisablePutDelay.bind(this)}
        />,
      <FlatButton
        label="OK"
        primary={true}
        keyboardFocused={true}
        onClick={this.cnfrmDisable.bind(this)}
        />
    ];

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleCancelPutDelayInMethod.bind(this)}
        />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleSubmitPutDelayInMethod.bind(this)}
        />
    ];

    return (
      <div  >
        <div className="row" style={{ 'paddingLeft': 10 }}>
          <div className="col-md-5" >
            <Checkbox
              label="Put Delay in Method"
              value="putDelayInMethod"
              checked={this.state.putDelayInMethod}
              onCustomChange={this.handlePutDelayInMethod.bind(this)} />
            <i style={{ paddingLeft: 40 }}>Add delay in any specified method using instrumentation</i>
          </div>

          <div>
            <RaisedButton
              disabled={!this.state.putDelayInMethod}
              onClick={this.enablePutDelayInMethodDialog.bind(this)}
              style={{ width: 150 }}
              backgroundColor="#18494F"
              disabledLabelColor="#000"
              labelColor="#FFF"
              label="More Settings ..."
              labelStyle={{ fontSize: 12 }} />
          </div>
        </div>

        <DialogPutDelayInMethod
          title="Put Delay in Method"
          actions={actions}
          modal={false}
          open={this.state.openPutDelayInMethodDialog}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
          titleStyle={styles.title}
          >
          <FormPutDelayInMethod ref="putDelayInMethodForm" onSubmit={this.submitForm.bind(this)} />
        </DialogPutDelayInMethod>

        <Snackbar
          open={this.state.openSnackBar}
          message="PutDelayInMethod keyword with its default value is enabled now."
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose.bind(this)}
          />

        <ConfirmDialog
          title="Are you sure want to disable the applied settings?"
          actions={actionsPutDelayDisable}
          modal={false}
          open={this.state.openCnfrmDisbleDialog}
          >
        </ConfirmDialog>
      </div>
    );
  }
}
PutDelayInMethod.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
}

export default reduxForm({
  form: 'PutDelayInMethod',
  fields
},
  state => ({ // mapStateToProps
    getAllKeywordData: state.Keywords,
    initialData: state.Keywords.initializeKeywords.putDelayInMethodObj,
    initialValues: state.Keywords.initializeKeywords.putDelayInMethodObj,
    trData: state.initialData.trData,
    trModeDetail: state.trModeDetail
  }),

  {
    submitKeywordData: submitKeywordData,
  } // mapDispatchToProps (will bind action creator to dispatch)
)(PutDelayInMethod);