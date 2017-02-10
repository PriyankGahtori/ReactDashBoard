//Importing React components
import React, { PropTypes } from 'react'
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import is from 'is_js';
import { List, ListItem } from 'material-ui/List';
import ContentSend from 'material-ui/svg-icons/content/send';
import Checkbox from '../../../../components/CheckboxWrapper';
import DropDownMenu from '../../../../components/SelectFieldWrapper';
import Toggle from '../../../../components/ToggleWrapper';

//Importing files
import { ListOfGroupNames, BTPatternCheck } from '../../../../actions/index';


export const fields = ['enabled', 'btName', 'matchType', 'urlName', 'include', 'slowTransaction', 'verySlowTransaction', 'reqParamKey', 'reqParamValue', 'reqMethod', 'reqHeaderKey', 'reqHeaderValue', 'dynamicPartReq']

const validate = values => {
  const errors = {}
  if (!values.btName)
    errors.btName = 'Required'

  else if (values.btName.length > 50)
    errors.btName = "Must be 50 characters or less"

  else if (!is.alphaNumeric(values.btName))
    errors.btName = 'Special character is not allowed.'

  if (!values.slowTransaction)
    errors.slowTransaction = 'Required'

  else if (isNaN(values.slowTransaction))
    errors.slowTransaction = 'Please Enter Only Numbers'

  if (!values.verySlowTransaction)
    errors.verySlowTransaction = 'Required'

  else if (Number(values.slowTransaction) > Number(values.verySlowTransaction))
    errors.slowTransaction = 'Please enter values less than verySlowTransaction'

  else if (isNaN(values.verySlowTransaction))
    errors.verySlowTransaction = 'Please Enter Only Numbers'

  else if (Number(values.verySlowTransaction) < Number(values.slowTransaction))
    errors.verySlowTransaction = 'Please enter values greater than SlowTransaction'

  if (!values.urlName)
    errors.urlName = 'Required'

  else if (values.urlName.length > 300)
    errors.urlName = 'Must be 300 characters or less'

  if (!values.matchType)
    errors.matchType = 'Required'

  if (values.dynamicPartReq) {
    if (!values.reqParamKey && !values.reqHeaderKey && !values.reqMethod && !values.reqParamValue && !values.reqHeaderValue)
      errors.dynamicPartReq = 'Please select atleast one Dynamic Part'

    if (!values.reqParamValue && values.reqParamKey)
      errors.reqParamValue = 'Please enter Value'

    if (!values.reqParamKey && values.reqParamValue)
      errors.reqParamKey = 'Please enter reqParamKey'

    if (values.reqHeaderKey && !values.reqHeaderValue)
      errors.reqHeaderValue = 'Please enter Value'

    if (!values.reqHeaderKey && values.reqHeaderValue)
      errors.reqHeaderKey = 'Please enter reqHeaderKey'

  }

  return errors
}
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
    width: 150
  },
  checkbox: {
    marginBottom: 16,
    paddingTop: 35
  },
  error: {
    fontSize: 12,
    color: 'red',
    paddingLeft: 40,
  },
  btNameWidth: {
    width: 400
  }
};


class Form_BTPattern extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = { enable: false }
    this.state = { 'dynamicReqDiv': false }
    this.state = {
      BTPattern: null,
      dynamicPartReq: this.props.initialData != null ? this.props.initialData.dynamicPartReq : false
    }

  }

  handleChange(event, index, value) {

  }

  componentWillMount() {
  }

  componentWillReceiveProps(nextProps) {
    /*  if(this.props.initialData != nextProps.initialData)
        this.setState({dynamicPartReq : nextProps.initialData.dynamicPartReq})*/
  }

  handleCheck(event, value) {
    this.setState({ 'dynamicPartReq': value })
  }

  render() {
    const { fields: {enabled, btName, include, matchType, urlName, slowTransaction, verySlowTransaction, reqParamKey, reqParamValue, reqMethod, reqHeaderKey, reqHeaderValue, dynamicPartReq}, resetForm, handleSubmit, onSubmit, submitting} = this.props
    return (
      <form>
        <div className="row">
          <div className="col-md-8">
            <TextField
              // hintText="Hint Text"
              floatingLabelText="Bussiness Transaction Name"
              {...btName}
              style={styles.btNameWidth}
              errorText={btName.touched && btName.error && <div>{btName.error}</div>} />
          </div>
          <div className="col-md-4">
            <Checkbox
              style={styles.checkbox}
              label="Include"
              {...enabled}
              />
          </div>
        </div>

        <div className="row">
          <div className="col-md-4">
            <DropDownMenu
              value={this.state.value}
              onChange={this.handleChange}
              style={styles.customWidth}
              autoWidth={false}
              floatingLabelText="Match Mode"
              {...matchType}

              >
              <MenuItem value={"Exact Match"} primaryText="Exact Match" />
              <MenuItem value={"Starts With"} primaryText="Starts With" />
            </DropDownMenu>
            <div style={styles.error}>  {matchType.touched && matchType.error && <div>{matchType.error} </div>} </div>

          </div>
          <div className="col-md-6">
            <TextField
              // hintText="Hint Text"
              floatingLabelText="URL"
              {...urlName}
              style={{ 'width': '400' }}
              errorText={urlName.touched && urlName.error && <div>{urlName.error}</div>} />
          </div>

        </div>

        <div className="row">
          <div className="col-md-4">  <p style={{ paddingTop: 40 }}>Transaction Threshold (ms) </p> </div>
          <div className="col-md-3">
            <TextField
              {...slowTransaction}
              style={{ 'width': '150' }}
              floatingLabelText="Slow"
              errorText={slowTransaction.touched && slowTransaction.error && <div>{slowTransaction.error}</div>} />

          </div>
          <div className="col-md-3">
            <TextField
              {...verySlowTransaction}
              style={{ 'width': '150' }}
              floatingLabelText="Very Slow "
              errorText={verySlowTransaction.touched && verySlowTransaction.error && <div>{verySlowTransaction.error}</div>} />

          </div>


        </div>

        <div className="row">
          <Checkbox
            {...dynamicPartReq}
            style={styles.checkbox}
            checked={this.state.dynamicPartReq}
            label="Dynamic part Request"
            onCustomChange={this.handleCheck.bind(this)} />
          <div style={styles.error}> {dynamicPartReq.touched && dynamicPartReq.error && <div>{dynamicPartReq.error}</div>}</div>

        </div>

        <div className={this.state.dynamicPartReq === true ? 'show' : 'hidden'}>

          <div className="row">
            <div className="col-md-6">
              <TextField
                // hintText="Hint Text"
                floatingLabelText="Request Parameter key"
                {...reqParamKey}
                errorText={reqParamKey.touched && reqParamKey.error && <div>{reqParamKey.error}</div>} />

            </div>

            <div className="col-md-4">
              <TextField
                // hintText="Hint Text"
                floatingLabelText=" Value"
                {...reqParamValue}
                errorText={reqParamValue.touched && reqParamValue.error && <div>{reqParamValue.error}</div>} />


            </div>

          </div>

          <div className="row">
            <div className="col-md-4">
              <DropDownMenu
                value={this.state.value}
                onChange={this.handleChange}
                style={styles.customWidth}
                autoWidth={false}
                floatingLabelText="Select Method type"
                {...reqMethod}
                >
                <MenuItem value={"GET"} primaryText="GET" />
                <MenuItem value={"PUT"} primaryText="PUT" />
                <MenuItem value={"POST"} primaryText="POST" />
                <MenuItem value={"DELETE"} primaryText="DELETE" />
                <MenuItem value={"HEAD"} primaryText="HEAD" />
                <MenuItem value={"TRACE"} primaryText="TRACE" />
                <MenuItem value={"CONNECT"} primaryText="CONNECT" />
                <MenuItem value={"OPTIONS"} primaryText="OPTIONS" />
              </DropDownMenu>
              <div style={styles.error}> {reqMethod.touched && reqMethod.error && <div>{reqMethod.error} </div>}</div>

            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <TextField
                // hintText="Hint Text"
                floatingLabelText="Request Header key"
                {...reqHeaderKey}
                errorText={reqHeaderKey.touched && reqHeaderKey.error && <div>{reqHeaderKey.error}</div>} />
            </div>

            <div className="col-md-6">
              <TextField
                // hintText="Hint Text"
                floatingLabelText="Value"
                {...reqHeaderValue}
                errorText={reqHeaderValue.touched && reqHeaderValue.error && <div>{reqHeaderValue.error}</div>} />
            </div>

          </div>

        </div>
      </form>
    );
  }
}

Form_BTPattern.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
}

export default reduxForm({ // <----- THIS IS THE IMPORTANT PART!
  form: 'Bussiness Transaction pattern ',        // a unique name for this form
  fields,
  validate

},
  state => ({ // mapStateToProps
    BTPattern: state.BTPattern,
    initialValues: state.BTPattern.patternFormInitialData,

    initialData: state.BTPattern.patternFormInitialData
  }),
  {
    loadGroupNames: ListOfGroupNames,
    BTPatternCheck: BTPatternCheck
  } // mapDispatchToProps (will bind action creator to dispatch)
)(Form_BTPattern);

