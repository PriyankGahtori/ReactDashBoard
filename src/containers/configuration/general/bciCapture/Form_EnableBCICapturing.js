//Importing react components
import React, { PropTypes } from 'react'
import { reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from '../../../../components/SelectFieldWrapper';
import Input from '../../../../components/InputWrapper';
import Checkbox from '../../../../components/CheckboxWrapper';
import Is from 'is_js';

//Importing files
import { initializeInstrProf } from '../../../../actions/index';


export const fields = ['bciInstrSessionPct', 'logLevelOneFpMethod', 'correlationIDHeader', 'doNotDiscardFlowPaths', 'setCavNVCookie', 'enableCpuTime', 'enableForcedFPChain'];

const initialValues = {
  'logLevelOneFpMethod': true,
  'doNotDiscardLevel1FP': false,
}

/* Code for validating form fields
*/
const validate = values => {
  const errors = {}

  if (!values.setCavNVCookie)
    errors.setCavNVCookie = 'Required'

  else if(isNaN(values.setCavNVCookie))
    errors.setCavNVCookie = 'Please enter only Numbers'

  else if( values.setCavNVCookie.length >= 30)
    errors.setCavNVCookie = 'Please enter 30 characters or less '

  if (!values.bciInstrSessionPct && values.bciInstrSessionPct != 0)
    errors.bciInstrSessionPct = 'Required'

  else if (values.bciInstrSessionPct < 0 || values.bciInstrSessionPct > 100)
    errors.bciInstrSessionPct = "Please Enter values between 0 and 100"

  if (!values.correlationIDHeader)
    errors.correlationIDHeader = 'Required'


  return errors
}

const styles = {
  input: {
    width: 60,

  },
  setCavNVCookieBlock: {
    marginTop: -10,
    width: 280,
  },
  customWidth: {
    width: 334,
    paddingTop: 7,
    color :'#000'
  },
  error: {
    fontSize: 12,
    color: 'red'
  },
};

class Form_EnableBCICapturing extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      'enableCpuTime': this.props.initialData.enableCpuTime,
      'enableForcedFPChain': this.props.initialData.enableForcedFPChain,
      'logLevelOneFpMethod': this.props.initialData.logLevelOneFpMethod === '1',
      'doNotDiscardFlowPaths': this.props.initialData.doNotDiscardFlowPaths === '1'
    }

  }
  componentWillMount() {

  }

  componentWillReceiveProps(nextProps) {
    if (this.props.initialData != nextProps.initialData) {
      this.setState({
        enableCpuTime: nextProps.initialData.enableCpuTime,
        enableForcedFPChain: nextProps.initialData.enableForcedFPChain,
        logLevelOneFpMethod: nextProps.initialData.logLevelOneFpMethod === '1',
        doNotDiscardFlowPaths: nextProps.initialData.doNotDiscardFlowPaths === '1'
      })
    }
  }

  //called on change of checkbox of logLevelOneFpMethod
  ChangeLogLevel(event, isInputChecked) {
    this.setState({ logLevelOneFpMethod: isInputChecked })

  }

  //called on change of checkbox of doNotDiscardFlowPaths
  ChangeDoNotDiscardFlowPaths(event, isInputChecked) {
    this.setState({ doNotDiscardFlowPaths: isInputChecked })
  }

  ChangeEnableCpuTime(event, index, value) {
    this.setState({ enableCpuTime: value })
  }

  ChangeEnableForcedFPChain(event, index, value) {
    this.setState({ enableForcedFPChain: value })
  }

  render() {
    const { fields: {bciInstrSessionPct, logLevelOneFpMethod, correlationIDHeader, doNotDiscardFlowPaths, setCavNVCookie, enableCpuTime, enableForcedFPChain}, resetForm, handleSubmit, onSubmit, submitting } = this.props
    return (
      <form >
        <div className="row" style={{ paddingTop: 16,color :'#000' }}>
          <div className="col-md-5">
            <p for="sess_perct" >Full Flow Path capturing percentage   </p>
          </div>

          <div className="col-md-3" >
            <Input
              {...bciInstrSessionPct}
              id="sess_perct"
              style={styles.input}
              type="number"
              min="0"
              max="100"
              step="1" />
            <div style={styles.error}> {bciInstrSessionPct.touched && bciInstrSessionPct.error && <div>{bciInstrSessionPct.error} </div>}</div>

          </div>
        </div>

        {/*    <div className="row" style={{ paddingTop: 10, paddingRight: 8 }}>
          <div className="col-md-1" >
            <Checkbox
              {...logLevelOneFpMethod}
              value="logLevelOneFpMethod"
              checked={this.state.logLevelOneFpMethod}
              onCustomChange={this.ChangeLogLevel.bind(this)} />
          </div>
          <p >Enable level one capturing for flowPaths </p>
        </div>
        <div className="row" style={{ paddingTop: 3 }}>
          <div className="col-md-1" >
            <Checkbox
              {...doNotDiscardFlowPaths}
              value="doNotDiscardFlowPaths"

              checked={this.state.doNotDiscardFlowPaths}
              onCustomChange={this.ChangeDoNotDiscardFlowPaths.bind(this)} />
          </div>
          <p>Dump all level one flowPaths</p>
        </div>
     
     */}
        <div className="col-md-6" style={{ right: 12 }}>
          <DropDownMenu
            {...enableForcedFPChain}

            style={styles.customWidth}
            autoWidth={false}
            value={this.state.enableForcedFPChain}
            customOnChange={this.ChangeEnableForcedFPChain.bind(this)}
            floatingLabelText="Capture complete transaction flow forcefully"
            >

            <MenuItem value={"0"} primaryText="Disable" />
            <MenuItem value={"1"} primaryText="Enable" />
            <MenuItem value={"2"} primaryText="Enable all with complete FP" />

          </DropDownMenu>
        </div>

        <div className="row">
          <div className="col-md-6">

            <DropDownMenu
              {...enableCpuTime}

              style={styles.customWidth}
              value={this.state.enableCpuTime}
              autoWidth={false}
              customOnChange={this.ChangeEnableCpuTime.bind(this)}
              floatingLabelText="Capture CPU time"
              autoScrollBodyContent={true}
              labelStyle={{}}
              >

              <MenuItem value={"0"} primaryText="Disable" />
              <MenuItem value={"1"} primaryText="Enable at FP/ BT level" />
              <MenuItem value={"2"} primaryText="Enable at method level" />
              <MenuItem value={"3"} primaryText="Enable both method and flowpath level" />
              <MenuItem value={"1%201"} primaryText="CPU time capturing at FP level where child FP CPU time added in BT Monitor" />
              <MenuItem value={"3%201"} primaryText="CPU time capturing for Method & BT level where child FP generated by thread callout added in CPU time for BT Monitor"
                style={{ 'wordWrap': 'breakWord' }} />
            </DropDownMenu>
          </div>
        </div>
        <div className="row" style={{ paddingTop: 18 }}>
          <div className="col-md-6" >

            <TextField
              style={styles.setCavNVCookieBlock}
              floatingLabelText="Capture HTTP header for correlation id"
              {...correlationIDHeader}
               style={{ 'width': '300' }}
              errorText={correlationIDHeader.touched && correlationIDHeader.error && <div> {correlationIDHeader.error}</div>}
              />
          </div>

    {/*     <div className="col-md-6"  >

            <TextField
              style={styles.setCavNVCookieBlock}
              hintText="Set flowPath id in response cookie"
              floatingLabelText="Set flowPath id in response cookie"
              {...setCavNVCookie}
              errorText={setCavNVCookie.touched && setCavNVCookie.error && <div> {setCavNVCookie.error}</div>}
              />
          </div>
  */}
        </div>
      </form>
    );
  }
}
Form_EnableBCICapturing.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
}

export default reduxForm({ // <----- THIS IS THE IMPORTANT PART!
  form: 'contact',                           // a unique name for this form
  fields,
  validate
},
  state => ({ // mapStateToProps
    initialValues: {
      bciInstrSessionPct: state.Keywords.initializeKeywords.bciInstrSessionPct,
      logLevelOneFpMethod: state.Keywords.initializeKeywords.logLevelOneFpMethod,
      correlationIDHeader: state.Keywords.initializeKeywords.correlationIDHeader,
      doNotDiscardFlowPaths: state.Keywords.initializeKeywords.doNotDiscardFlowPaths,
      setCavNVCookie: state.Keywords.initializeKeywords.setCavNVCookie,
      enableCpuTime: state.Keywords.initializeKeywords.enableCpuTime,
      enableForcedFPChain: state.Keywords.initializeKeywords.enableForcedFPChain
    },
    initialData: state.Keywords.initializeKeywords

  })
)(Form_EnableBCICapturing);
