//Importing React components
import React, { PropTypes } from 'react'
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TextField from 'material-ui/TextField';
import Is from 'is_js';
import ContentSend from 'material-ui/svg-icons/content/send';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from '../../../../../components/CheckboxWrapper';
import AddNewButton from 'material-ui/FloatingActionButton';
import AddIcon from 'material-ui/svg-icons/content/add';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import DataGrid from '../../../../../components/DCDetailTable';

//Importing files
import Toggle from '../../../../../components/ToggleWrapper';
import AttrValComponent from '../../../instrumentation/monitor/AttrValComponent';
import { addingValData, disableSubmitButtonState, toggleAddCustomCapture } from '../../../../../actions/index';




export const fields = ['headerName', 'complete', 'specific', 'attrValues']


const NewButtonstyle = {
  left: 3,
  top: -7
};

const error = {
  fontSize: 12,
  color: 'red',
  paddingLeft: 3,
};



var columns = {
  "key": "id",
  "data": ['Display Name', 'Type', 'Lower Bound', 'Right Bound', 'ID'],
  "field": ['valName', 'customValTypeName', 'lb', 'rb', 'id']
};

class HttpReqBasedCapturingAdd extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.valNameChange = this.valNameChange.bind(this)
    this.lbChange = this.lbChange.bind(this);
    this.rbChange = this.rbChange.bind(this);
    this.state = {
      enable: false,
      count: 0,
      rows: [],
      valName: '',
      lb: '',
      rb: '',
      'valDataCss': 'hidden',
      valDataArr: [],
      'errMsgCss': 'hidden',
      'addCompCSS': 'hidden'

    }
    this.del = this.del.bind(this);
    this.submitValType = this.submitValType.bind(this);
  }

  componentWillReceiveProps(nextProps) {

  }

  specificChkBoxChange(event, isInputChecked) {
    console.log("checked---", isInputChecked)
    var valDataCss = isInputChecked ? 'show' : 'hidden';
    this.setState({
      valDataCss: valDataCss,
      specificChkBox: isInputChecked
    })

  }

  completeChkBoxChange(event, isInputChecked) {
    console.log("this.state.specificChkBox--", this.state.specificChkBox)
    var valDataCss;
    if (isInputChecked) {
      valDataCss = 'hidden'
      if (this.state.specificChkBox)
        valDataCss = 'show'
    }

    this.setState({ valDataCss: valDataCss })
  }

  submitValType() {
    console.log("submitValType method called--", this.state.valName)
    console.log("validation--", this.state.lb)
    console.log("hhh--", this.state.rb)
    if (this.state.valName == '' || this.state.lb == '' || this.state.rb == '') {
      this.setState({ errMsgCss: 'show' })
    }
    else {
      console.log("in else c ondition")
      this.setState({
        count: this.state.count + 1,
        errMsgCss: 'hidden'
      })
      var valData = {
        'valName': this.state.valName,
        'lb': this.state.lb,
        'rb': this.state.rb,
        'id': this.state.count
      }
      this.state.valDataArr.push(valData);
    }
  }

  handleChange(event, index, value) {
    console.log("event-----", event)
    console.log("index------", index)
    console.log("on handleChange----", value)

  }

  componentWillMount() {
    console.log("state props--", this.props)
    console.log("state--", this.state)
  }

  handleCheck(event, value) {
    console.log("inside check value - ", value)
  }

  editValArr(id, key, value) {
    console.log("edit method callled")
    this.state.valDataArr.map(function (val) {
      console.log(val)
      if (id == val.id) {
        val[key] = value;
      }
    })
    console.log("arr--", this.state.valDataArr)
  }


  valNameChange(value, id) {
    console.log("value-valNameChange method--", value)
    console.log("id--", id)
    this.setState({ valName: value })
    this.editValArr(id, 'valName', value)
  }

  lbChange(value, id) {
    this.setState({ lb: value })
    this.editValArr(id, 'lb', value)
  }

  rbChange(value, id) {
    this.setState({ rb: value })
    this.editValArr(id, 'rb', value)
  }

  del(val) {
    console.log("val--", val)
    let arr = this.state.valDataArr;
    arr = arr.filter(function (value) {
      if (val == value.id) {
        return false;
      }
      else
        return true;
    })
    console.log("arr---", arr)
    this.setState({ valDataArr: arr })

  }

  handleSubmitValType(attrValues) {

    if (this.state.valName == '' || this.state.lb == '' || this.state.rb == '') {
      this.setState({ errMsgCss: 'show' })
    }
    else {
      this.setState({
        count: this.state.count + 1,
        errMsgCss: 'hidden',
        addCompCSS: 'hidden'
      })
      var valData = {
        'valName': this.state.valName,
        'lb': this.state.lb,
        'rb': this.state.rb,
        'id': this.state.count,
        'customValTypeName': this.state.customValTypeName,
        'type': this.state.customValType
      }
      this.state.valDataArr.push(valData);
      attrValues.onChange(this.state.valDataArr);
    }
  }


  handleOpen() {
    this.setState({ addCompCSS: 'show' })
  }



  //for editing the values table
  onAfterSaveCell(row, cellName, cellValue) {

    var arrData = Object.assign([], this.state.ruleTypesChanged)
    //var arrData = this.state.changedValArr;

    if (arrData != null && arrData.length != 0) {
      arrData.map(function (value) {
        if (value.btMethodRuleId == row.btMethodRuleId) { //handling the case when 1 row is edited multiple times or same row but diff column
          value[cellName] = cellValue;
        }
        else {
          arrData.push(row);
        }
      })
    }
    else {
      arrData.push(row);
    }
    this.setState({ ruleTypes: arrData })
  }

  onBeforeSaveCell(row, cellName, cellValue) {
    console.log("onBeforeSaveCell method called in dialog_AttrValues")
  }

  submitData(data) {
    console.log("submit method called of form session atrr ad---", data)

  }



  onCustomValTypeChange(val, customValTypeName) {
    this.setState({
      customValType: val,
      customValTypeName: customValTypeName
    })
  }




  render() {


    const { fields: {headerName, complete, specific, attrValues}, resetForm, handleSubmit, onSubmit, submitting, isActive} = this.props
    const cellEditProp = {
      mode: 'click',
      blurToSave: true,
      beforeSaveCell: this.onBeforeSaveCell.bind(this), // a hook for before saving cell
      afterSaveCell: this.onAfterSaveCell.bind(this)  // a hook for after saving cell
    };

    return (
      <form >
        <div className="col-md-12">
          <TextField
            // hintText="Hint Text"
            floatingLabelText="Header Name"
            {...headerName}
            />

        </div>

        <div className="row ">
          <div className="col-md-5">
            <Checkbox
              {...complete}
              value="complete"
              label="Complete"
              onCustomChange={this.completeChkBoxChange.bind(this)} />


          </div>
          <div className="col-md-3">
            <Checkbox
              {...specific}
              value="specific"
              label="Specific"
              onCustomChange={this.specificChkBoxChange.bind(this)} />

          </div>
        </div>

        <div className={`row col-md-10  ${this.state.valDataCss}`} style={{ 'paddingTop': 3, 'paddingLeft': 6 }}>
          <h4>Add Value Types </h4>

          <div className={`row col-md-12 ${this.state.addComp}`} style={{ paddingLeft: '12px' }}>

            <div className="pull-right"  >
              <IconButton tooltip="Add" onTouchTap={this.handleOpen.bind(this)}><FontIcon color="#FFF" className="material-icons">playlist_add</FontIcon></IconButton>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.80)', color: '#FFF' }}>
              <DataGrid data={this.state.valDataArr}
                cellEdit={cellEditProp}
                pagination={false}
                ref="sessionAttrMonitorData"
                column={columns}
                onClick={this.handleClick}

                />
            </div>
            <div className={`col-md-12 ${this.state.errMsgCss}`}>
              <p style={{ color: 'red', paddingTop: 20 }}>Require Fields are empty</p>
            </div>
            <div className={`row ${this.state.addCompCSS}`} style={{ position: 'relative', left: '10px' }}>
              <AttrValComponent value={{}}
                valNameChange={this.valNameChange.bind(this)}
                onCustomValTypeChange={this.onCustomValTypeChange.bind(this)}
                lbChange={this.lbChange.bind(this)}
                rbChange={this.rbChange.bind(this)}
                />

              <RaisedButton className="pull-right"
                label="Add"
                backgroundColor="#D3D3D3"
                onClick={this.handleSubmitValType.bind(this, attrValues)}
                style={{ color: '#000', position: 'relative', bottom: '45px' }}>
              </RaisedButton>
            </div>
          </div>

        </div>

        <div className="hidden">
          <TextField
            {...attrValues}
            floatingLabelText=" Name"
            value={this.state.valDataArr}
            />
        </div>
      </form>
    );
  }
}


HttpReqBasedCapturingAdd.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
}

export default reduxForm({ // <----- THIS IS THE IMPORTANT PART!
  form: 'Session Attribute Monitor ',        // a unique name for this form
  fields
},
  state => ({ // mapStateToProps
    valData: state.sessionAttrMonitor.valData
  }),
  {
    addingValData: addingValData,
    disableSubmitButtonState: disableSubmitButtonState,
    toggleAddCustomCapture: toggleAddCustomCapture
  } // mapDispatchToProps (will bind action creator to dispatch)
)(HttpReqBasedCapturingAdd);
