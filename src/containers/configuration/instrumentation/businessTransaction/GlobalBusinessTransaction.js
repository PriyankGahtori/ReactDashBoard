//Importing React components
import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import RadioButton from 'material-ui/RadioButton';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
  import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Card } from 'material-ui/Card';
import SelectField from '../../../../components/SelectFieldWrapper';
import Checkbox from '../../../../components/CheckboxWrapper';
import RadioButtonGroup from '../../../../components/RadioButtonGroupWrapper';

//Importing React components
import { initializeBTFields, addBTData, triggerLoader } from '../../../../actions/index';
import { triggerRunTimeChanges } from '../../../../actions/runTimeChanges';

export const fields = ["uriType", "segmentType", "segmentValue", "slowTransaction", "verySlowTransaction", "dynamicReqType", "dynamicReqValue", "requestParam", "httpMethod", "requestHeader"];

const validate = values => {
  const errors = {}

  if (!values.slowTransaction)
    errors.slowTransaction = 'Required'

  else if (isNaN(values.slowTransaction))
    errors.slowTransaction = 'Please Enter Only Numbers'

  if (!values.verySlowTransaction)
    errors.verySlowTransaction = 'Required'

  else if (isNaN(values.verySlowTransaction))
    errors.verySlowTransaction = 'Please Enter Only Numbers'

   if( (values.slowTransaction)/1000 > 100000)
    errors.slowTransaction  = 'Please enter values greater than 100000000 ms'

  if( (values.verySlowTransaction)/1000 > 1000000)
    errors.verySlowTransaction  = 'Please enter values  less than 1000000000 ms'

  if(values.slowTransaction == values.verySlowTransaction)
    errors.verySlowTransaction = 'Please enter values greater than very slow transaction'

  if((values.slowTransaction)/1000 > (values.verySlowTransaction)/1000)
    errors.slowTransaction = 'Please enter values less than very slow transaction'

  if((values.verySlowTransaction)/1000 < (values.slowTransaction)/1000)
    errors.verySlowTransaction = 'Please enter values greater than slow transaction'

  return errors;
}

class GlobalBusinessTransaction extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      'segmentDivCSS': (this.props.initialData && this.props.initialData.uriType) === 'segment' ? 'show' : 'hidden',
      'dynamicReqType': this.props.initialData != null ? this.props.initialData.dynamicReqType : false,
      'dynamicReqValue':this.props.initialData != null ? this.props.initialData.dynamicReqValue:'',
      'paramDiv': false,
      'methodDiv': false,
      'headerDiv': false,
      'uriType': this.props.initialData != null ? this.props.initialData.uriType : "segment"
    }
    this.loader = this.loader.bind(this)
    this.submitLoader = this.submitLoader.bind(this);
  }

  componentWillMount() {
    this.props.triggerLoader(true, null);
  }

  componentWillReceiveProps(nextProps) {
    if (null != nextProps.initialData) {

      if (this.props.initialData != nextProps.initialData) {
        let data = nextProps.initialData;
        this.setState({
          "segmentDivCSS": data.uriType === "segment" ? "show" : "hidden",
          "dynamicReqType": data.dynamicReqType,
          "paramDiv": data.dynamicReqValue === "requestParam" ? true : false,
          "methodDiv": data.dynamicReqValue === "httpMethod" ? true : false,
          "headerDiv": data.dynamicReqValue === "requestHeader" ? true : false,
          "uriType": nextProps.initialData.uriType
        })
      }
     
    }
  }
  loader() {
    //var message = {'title': ' BT Global Loaded' , 'msg' : '' }
    this.props.triggerLoader(false, null)

  }
  submitLoader() {
    var message = { title: " Bussiness Transaction Global settings are successfully submitted" }
    this.props.triggerLoader(false, message)
  }

  getProfileName(profileId) {
    let profileData = this.props.homeData[1]
      .value
      .filter(function (obj) { return obj.id == profileId });
    if (profileData.length != 0)
      return profileData[0].name;
    else
      return null;
  }

  handleURITypeChange(event, value) {
    //show and hidden are bootstrap CSS to show and hide
    let css = value === 'segment' ? 'show' : 'hidden';
    this.setState({ 'segmentDivCSS': css })
  }

  handleDReqCheckboxChange(event, value) {
    this.setState({ 'dynamicReqType': value })
  }

  handleDReqRadioChange(event, value) {
    let paramDiv = value === "requestParam";
    let methodDiv = value === "httpMethod";
    let headerDiv = value === "requestHeader";
    this.setState({
      'paramDiv': paramDiv,
      'methodDiv': methodDiv,
      'headerDiv': headerDiv
    });

  }

  submit(data) {
    data = JSON.stringify(data);
    this.props.addBTData(data, this.props.params.profileId, this.submitLoader);
    this.props.triggerLoader(true, null)
    //action for runtime change
    var filePath = this.props.ns_wdir + "/ndprof/conf/" + this.getProfileName(this.props.trModeDetail.profileId) + '/btGlobal.btr';

    let keywordDataList = [];
    keywordDataList.push("BTRuleConfig" + "=" + filePath);

    triggerRunTimeChanges(this.props.trData, this.props.trModeDetail, keywordDataList);
  }


  render() {
    const {
      fields: {uriType, segmentType, segmentValue, slowTransaction, verySlowTransaction, dynamicReqType, dynamicReqValue, requestParam, httpMethod, requestHeader},
      handleSubmit,
      resetForm,
      submitting
    } = this.props;

    return (

      <form onSubmit={handleSubmit(this.submit.bind(this))}>
        <Card style={{ 'height': 460, 'marginTop': 4, 'paddingLeft': 5 }}>
          <div style={{ 'paddingTop': 12 }}>
            <h4>Select part of URI used in Transaction name</h4>
          </div>
          <RadioButtonGroup
            {...uriType}
            name="uriType"
            defaultSelected={this.state.uriType}
            onCustomChange={this.handleURITypeChange.bind(this)}
            >
            <RadioButton
              value="complete"
              label="Complete"

              />
            <RadioButton
              value="segment"
              label="Segment of URI"
              />

          </RadioButtonGroup>
          <div className={`row ${this.state.segmentDivCSS}`} style={{ 'marginLeft': 40 }} enabled={false}>
            <SelectField value={"first"} {...segmentType} >
              <MenuItem value={"first"} primaryText="First" />
              <MenuItem value={"last"} primaryText="Last" />
              <MenuItem value={"segNo"} primaryText="Segment Number" />
            </SelectField>
            <TextField
              {...segmentValue}
              floatingLabelText="Segments of URI in Transaction"

              />
          </div>

          <div className="col-md-12" style={{ paddingLeft: 40 }} >
            <TextField
              {...slowTransaction}
              floatingLabelText="Slow Transaction Threshold (ms)"
              errorText={slowTransaction.touched && slowTransaction.error} />

            <TextField
              {...verySlowTransaction}
              floatingLabelText="Very Slow Transaction Threshold (ms)"
              style={{ width: 280 }}
              errorText={verySlowTransaction.touched && verySlowTransaction.error}

              />
          </div>

          {/*---------------------Dynamic Request Type--------------------------*/}

          <div style={{ 'marginTop': 30, 'marginBottom': 30 }}>
            <Checkbox
              {...dynamicReqType}
              value="dynamicReq"
              label="Choose Dynamic Request type "
              labelStyle={{ "fontSize": 16, "fontWeight": 0 }}
              onCustomChange={this.handleDReqCheckboxChange.bind(this)}
              checked={this.state.dynamicReqType}
              />

            {/*------------Radio Button Group---------------*/}

            <div className='row' style={{ paddingLeft: 40 }} >

              <RadioButtonGroup
                {...dynamicReqValue}
                className={'col-xs-8 col-md-8'}
                style={{ display: 'flex' }}
                name="requestType"
                defaultSelected={dynamicReqValue.initialValue}
                onCustomChange={this.handleDReqRadioChange.bind(this)}
                >
                <RadioButton
                  value="requestParam"
                  label="Query Parameter"
                  style={{ width: '50%' }}
                  disabled={!this.state.dynamicReqType} />
                <RadioButton
                  value="httpMethod"
                  label="HTTP Method"
                  style={{ width: '50%' }}
                  disabled={!this.state.dynamicReqType} />
                <RadioButton
                  value="requestHeader"
                  label="HTTP Header"
                  style={{ width: '50%' }}
                  disabled={!this.state.dynamicReqType}
                  />
              </RadioButtonGroup>
            </div>

            {/*------------Dynamic Request Type Div---------------*/}

            <div style={{ paddingLeft: 40, paddingTop: 5 }} className={this.state.dynamicReqType === true ? 'show' : 'hidden'}>
              <div className={this.state.paramDiv === true ? 'show' : 'hidden'}>
                <TextField
                  floatingLabelText="Query Parameter"
                  {...requestParam}
                  />
              </div>
              <div className={this.state.methodDiv === true ? 'show' : 'hidden'}>
                <p >Use the request method (GET/POST/PUT) in Transaction names.</p>
              </div>

              <div className={this.state.headerDiv === true ? 'show' : 'hidden'}>
                <TextField
                  {...requestHeader}
                  floatingLabelText="HTTP Header"
                  />
              </div>
            </div>

          </div>
          <RaisedButton 
            backgroundColor="rgb(58, 158, 149)"
            label=" Save"
            labelColor="#FFF"
            type="submit" 
            disabled={this.props.profileDisabled}
            disabledLabelColor="#000"
            labelStyle={{ fontSize: 12 }}
            style={{ position: 'absolute'}}> {submitting ? <i/> : <i/>} 
          </RaisedButton>
        </Card>
      </form>
    );
  }
}

GlobalBusinessTransaction.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
}

export default reduxForm({
  form: 'globalBT',
  fields,
  validate
},
  state => ({ // mapStateToProps
    initialValues: state.BTGlobal.btGlobalInitialize, //used by redux-form
    initialData: state.BTGlobal.btGlobalInitialize, // for initializing state
    trData: state.initialData.trData,
    trModeDetail: state.trModeDetail,
    homeData: state.initialData.homeData,
    ns_wdir: state.initialData.ns_wdir,
    profileDisabled: state.profileDisabled.disabled
  }),
  {
    initializeBTFields: initializeBTFields,
    addBTData: addBTData,
    triggerLoader: triggerLoader,

  } // mapDispatchToProps (will bind action creator to dispatch)
)(GlobalBusinessTransaction);