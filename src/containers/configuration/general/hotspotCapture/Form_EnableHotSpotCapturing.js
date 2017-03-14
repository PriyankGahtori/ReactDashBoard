//Importing react components
import React, { PropTypes } from 'react'
import { reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from '../../../../components/SelectFieldWrapper';
import Checkbox from '../../../../components/CheckboxWrapper';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import CheckboxWithoutWrapper from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Subheader from 'material-ui/Subheader'

//Importing files
import Input from '../../../../components/InputWrapper';
import { initializeKeywords } from '../../../../actions/index';
import AddComp from './AddComp';


export const fields = ['ASSampleInterval', 'ASThresholdMatchCount', 'ASReportInterval', 'ASDepthFilter', 'ASTraceLevel', 'ASStackComparingDepth', 'ASPositiveThreadFilters'];


const validate = values => {
  const errors = {}

  if (!values.ASSampleInterval)
    errors.ASSampleInterval = 'Required'

  else if (isNaN(values.ASSampleInterval))
    errors.ASSampleInterval = 'Please Enter Only Numbers'

  else if (values.ASSampleInterval < 0 || values.ASSampleInterval > 5000)
    errors.ASSampleInterval = 'Please Enter Values Between 0 and 5000'

  if (!values.ASThresholdMatchCount)
    errors.ASThresholdMatchCount = 'Required'

  else if (isNaN(values.ASThresholdMatchCount))
    errors.ASThresholdMatchCount = 'Please Enter Only Numbers'

  else if (values.ASThresholdMatchCount < 1 || values.ASThresholdMatchCount > 100)
    errors.ASThresholdMatchCount = 'Please Enter Values Between 1 and 100'

  if (!values.ASReportInterval)
    errors.ASReportInterval = 'Required'

  else if (isNaN(values.ASReportInterval))
    errors.ASReportInterval = 'Please Enter Only Numbers'

  else if (values.ASReportInterval < 0 || values.ASReportInterval > 900000)
    errors.ASReportInterval = 'Please Enter Values Between 0 and 900000'

  if (!values.ASDepthFilter)
    errors.ASDepthFilter = 'Required'

  else if (isNaN(values.ASDepthFilter))
    errors.ASDepthFilter = 'Please Enter Only Numbers'

  else if (values.ASDepthFilter < 0 || values.ASDepthFilter > 100)
    errors.ASDepthFilter = 'Please Enter Values Between 0 and 100'

  if (!values.ASTraceLevel)
    errors.ASTraceLevel = 'Required'

  else if (isNaN(values.ASTraceLevel))
    errors.ASTraceLevel = 'Please Enter Only Numbers'

  else if (values.ASTraceLevel < 0 || values.ASTraceLevel > 20)
    errors.ASTraceLevel = 'Please Enter Values Between 0 and 20'

  if (!values.ASStackComparingDepth)
    errors.ASStackComparingDepth = 'Required'

  else if (isNaN(values.ASStackComparingDepth))
    errors.ASStackComparingDepth = 'Please Enter Only Numbers'

  else if (values.ASStackComparingDepth < 0 || values.ASStackComparingDepth > 1000)
    errors.ASStackComparingDepth = 'Please Enter Values Between 0 and 1000'

  return errors;
}


const styles = {
  input: {
    width: 150,

  },
  block: {
    paddingTop: 10
  },
  asPositiveFilterThread: {
    paddingTop: 37
  },
  icons: {
    width: 7,
    height: 7
  },
  iconsButton: {
    width: 7,
    height: 7,
    paddingLeft: 12
  },
  errMsg: {
    color: 'red',
    paddingLeft: '439px'

  }

};

class Form_EnableHotSpotCapturing extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      enableHotSpotBlock: false,
      showAddThreadName: 'hidden',
      arr: [],
      count: 0,
      threadNames: '',
      asPositiveThreadNamesBlock: 'hidden',
      errMsg: 'hidden'
    };
    this.handleAddThreadNames = this.handleAddThreadNames.bind(this)
    this.renderAddThreadName = this.renderAddThreadName.bind(this)
    this.onChangeASPositiveThreadFilter = this.onChangeASPositiveThreadFilter.bind(this)
    this.handleDelThreadNames = this.handleDelThreadNames.bind(this)
  }

  handleAddThreadNames(threadNames) {
    console.log("threadNames--", threadNames)
    if (this.state.threadNames == '') {
      console.log("thread name blank")
      this.setState({ errMsg: 'show' })
    }
    else {
      this.setState({
        'showAddThreadName': 'show',
        count: this.state.count + 1,
        errMsg: 'hidden'
      })

      var data = {
        'threadName': this.state.threadNames,
        count: this.state.count
      }
      this.state.arr.push(data);
      this.setState({ 'threadNames': '' })
    }
  }

  handleEnableHotSpot(event, isInputChecked) {
    this.setState({ enableHotSpotBlock: !isInputChecked })
  }

  handleDelThreadNames(id) {
    let id2 = id + 1;
    let arrId = [];
    arrId.push(id2 + 1);
    let arr = this.state.arr
    arr = arr.filter(function (val) {
      return arrId.indexOf(arr.id) == -1
    })
    console.log("arr--", arr)
    console.log("arr---", arr.length)
    this.setState({ arr: arr })

  }

  renderAddComp(val) {
    console.log("val---", val)
    return (
      <div className="row">
        <div className="col-md-6">
        </div>

        <div className="col-md-6">
          <TextField
            hintText="Hint Text"
            id={val.count}
            floatingLabelText="AS Positive Thread Filters"
          />
          <IconButton tooltip="Delete Thread" onTouchTap={this.handleDelThreadNames.bind(val.count)}><FontIcon color="#FFF" className="material-icons">delete</FontIcon></IconButton>
        </div>

      </div>
    )
  }

  renderAddThreadName() {

    let that = this;
    let component = this.state.arr.map(function (val, index) {
      return (
        <div>
          <AddComp threadNames={that.onChangeASPositiveThreadFilter.bind(this)}
            value={val}
            deleteThreadNames={that.handleDelThreadNames.bind(this)}
          />
        </div>
      )
    })

    return (
      <div>
        {component}
      </div>
    )

  }


  onChangeASPositiveThreadFilter(evt, value) {
    this.setState({ 'threadNames': value })
  }

  asPositiveFilterThreadChkBoxChange(evt, isInputChecked) {
    this.setState({
      'asPositiveThreadNamesBlock': isInputChecked ? 'show' : 'hidden',
      'asPositiveFilterThreadChkBox': isInputChecked
    })

  }

  handleASPositiveThreadNamesDone(ASPositiveThreadFilters) {
    let values = '';
    let arr = this.state.arr;
    arr.map(function (val, index) {
      console.log("val--", val)
      if (index != (arr.length - 1)) {
        values = values + val.threadName + "&";
      }
      else {
        values = values + val.threadName;
      }
    })
    console.log("value---", values)
    // case handled for last threadNames
    if (this.state.threadNames != '') {
      values = values + "&" + this.state.threadNames
    }
    console.log("values !!---", values)
    ASPositiveThreadFilters.onChange(values)

  }

  render() {
    const { fields: { ASSampleInterval, ASThresholdMatchCount, ASReportInterval, ASDepthFilter, ASTraceLevel, ASStackComparingDepth, ASPositiveThreadFilters }, resetForm, handleSubmit, onSubmit, submitting } = this.props
    return (
      <form >
        {/*    <div className ="row" style={{paddingTop:8}}>
              <div className = "col-md-6">
                <Checkbox  
                value="enableLevel1FPCapturing"
                label="Enable hotspots"
                 defaultChecked = {true} 
                onCheck={this.handleEnableHotSpot.bind(this)}  />
              </div>
           </div>
           */}

        <div className="row">

          <div className="col-md-6">
            <TextField
              floatingLabelText="Hotspot Sample Interval for Stack Trace"
              disabled={this.state.enableHotSpotBlock}
              {...ASSampleInterval}
              style={{ 'width': '280' }}
              errorText={ASSampleInterval.touched && ASSampleInterval.error && <div>{ASSampleInterval.error}</div>}
            />
          </div>
          <div className="col-md-6" >
            <TextField
              floatingLabelText="Hotspot Stack Comparing Depth"
              {...ASStackComparingDepth}
              style={{ 'width': '250' }}
              errorText={ASStackComparingDepth.touched && ASStackComparingDepth.error && <div>{ASStackComparingDepth.error}</div>}
            />
          </div>
        </div>
      
        <Subheader><b>Advance Settings</b></Subheader>

        <div className="row">

          <div className="col-md-4">
            <TextField
              hintText="Hint Text"
              floatingLabelText="Hotspot Reporting Interval "
              disabled={this.state.enableHotSpotBlock}
              {...ASReportInterval}
              style={{ 'width': '200' }}
              errorText={ASReportInterval.touched && ASReportInterval.error && <div>{ASReportInterval.error}</div>}
            />
          </div>

          <div className="col-md-3">
            <TextField
              floatingLabelText="Hotspot Trace Level"
              disabled={this.state.enableHotSpotBlock}
              {...ASTraceLevel}
              style={{ 'width': '150' }}
              errorText={ASTraceLevel.touched && ASTraceLevel.error && <div>{ASTraceLevel.error}</div>}

            />
          </div>
          <div className="col-md-4" >
            <TextField
              floatingLabelText="Hotspot Threshold Match Count"
              disabled={this.state.enableHotSpotBlock}
              {...ASThresholdMatchCount}
              style={{ 'width': '215' }}
              errorText={ASThresholdMatchCount.touched && ASThresholdMatchCount.error && <div>{ASThresholdMatchCount.error}</div>}
            />
          </div>

        </div>

        <div className="row">

          <div className="col-md-6">
            <TextField
              floatingLabelText="Min Stack Depth for Hotspot"
              disabled={this.state.enableHotSpotBlock}
              {...ASDepthFilter}
              errorText={ASDepthFilter.touched && ASDepthFilter.error && <div>{ASDepthFilter.error}</div>}
            />
          </div>
        </div>

        {/*<div className="row">
          <div className="col-md-9">
            <CheckboxWithoutWrapper
              value="AS Positive Thread Filters"
              checked={this.state.asPositiveFilterThreadChkBox}
              label="List of thread names to be included in AS data"
              onCheck={this.asPositiveFilterThreadChkBoxChange.bind(this)}
            />

          </div>
        </div>

        <div className={`row ${this.state.asPositiveThreadNamesBlock}`} style={{ 'paddingLeft': 8 }}>

          <div className="col-md-7">
            <TextField
              hintText="Hint Text"
              floatingLabelText="AS Positive Thread Filters"
              onChange={this.onChangeASPositiveThreadFilter.bind(this)}
            />
          </div>

          <div className="col-md-3">
            <IconButton tooltip="Add more" onTouchTap={this.handleAddThreadNames.bind(this, ASPositiveThreadFilters)}><FontIcon color="#FFF" className="material-icons">add</FontIcon></IconButton>
          </div>

          <div className="col-md-2">
            <FlatButton
              label="Done"
              primary={true}
              keyboardFocused={true}
              disabled={this.props.profileDisabled}
              onClick={this.handleASPositiveThreadNamesDone.bind(this, ASPositiveThreadFilters)}
            />
          </div>
        </div>


        <p style={styles.errMsg} className={this.state.errMsg}>Thread Name Field required !! </p>
        <div>
        </div>
        {this.renderAddThreadName()}*/}

      </form>
    );
  }
}
Form_EnableHotSpotCapturing.propTypes = {
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
      ASSampleInterval: state.Keywords.initializeKeywords.ASSampleInterval,
      ASThresholdMatchCount: state.Keywords.initializeKeywords.ASThresholdMatchCount,
      ASReportInterval: state.Keywords.initializeKeywords.ASReportInterval,
      ASDepthFilter: state.Keywords.initializeKeywords.ASDepthFilter,
      ASTraceLevel: state.Keywords.initializeKeywords.ASTraceLevel,
      ASStackComparingDepth: state.Keywords.initializeKeywords.ASStackComparingDepth,

    }
  }),

)(Form_EnableHotSpotCapturing);
