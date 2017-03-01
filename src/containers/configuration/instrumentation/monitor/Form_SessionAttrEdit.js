import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TextField from 'material-ui/TextField';
import Is from 'is_js';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from '../../../../components/CheckboxWrapper';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import DataGrid from '../../../../components/DCDetailTable';
import AttrValComponent from './AttrValComponent';
import {addValueType,delAttrValues } from '../../../../actions/index';


export const fields = ['attrName', 'complete', 'specific','attrValues']

const validate = values => {
  const errors = {}
  if (!values.attrName)
    errors.attrName = 'Required'

  else if (Number(values.attrName))
    errors.attrName = "Please enter only characters."

  else if (!Is.alphaNumeric(values.attrName))
    errors.attrName = 'Special characters are not allowed.'

  if (!values.complete && !values.specific)
    errors.complete = 'Must select any of the  Attribute Type'

  return errors;
}

const error = {
  fontSize: 12,
  color: 'red',
  paddingLeft: 3,
};


var columns = {
  "key": "specAttrValId",
  "data": ['Value Name', 'Lower Bound', 'Right Bound', 'ID'],
  "field": ['valName', 'lb', 'rb', 'specAttrValId']
};


class FormSessionAttrEdit extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      enable: false,
      count: 0,
      rows: [],
      valName: '',
      lb: '',
      rb: '',
      'valDataCss': this.props.initialData != null && this.props.initialData.specific ?'show':'hidden',
      valDataArr:this.props.initialData != null ? this.props.initialData.attrValues:[] ,
      'errMsgCss': 'hidden',
      'addCompCSS': 'hidden',
      complete:this.props.initialData != null ? this.props.initialData.complete :false,
      specificChkBox:this.props.initialData != null ? this.props.initialData.specific : false
    }
  }


  componentWillReceiveProps(nextProps){

   console.log("this.props.initialData---",this.props.initialData)
   console.log("nextProps.initialData---",nextProps.initialData)
   if(this.props.initialData != nextProps.initialData){
           this.setState({valDataArr:nextProps.initialData.attrValues})
   }

 
  }



  specificChkBoxChange(event, isInputChecked) {
    console.log("checked---", isInputChecked)
    var valDataCss = isInputChecked ? 'show' : 'hidden';
    this.setState({
      valDataCss: valDataCss,
      specificChkBox: isInputChecked
    })

    //this.props.disableSubmitButtonState();
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

  handleOpen() {
    this.setState({ addCompCSS: 'show' })
  }



  onCustomValTypeChange(val, customValTypeName) {
    this.setState({
      customValType: val,
      customValTypeName: customValTypeName
    })
  }

  valNameChange(value,id){
    this.setState({valName:value})
  //  this.editValArr(id,'valName',value)
  }

lbChange(value,id){
    this.setState({lb:value})
    //this.editValArr(id,'lb',value)
}

rbChange(value,id){
    this.setState({rb:value})
    //this.editValArr(id,'rb',value)
}

handleSubmitValType(attrValues){
  
  console.log("handleSubmitValType method called--",attrValues)
  console.log("this.state.valName--",this.state.valName)
     if(this.state.valName == '' || this.state.lb == '' || this.state.rb == '' ){
       this.setState({errMsgCss:'show'})
    }
    else{
      console.log("in else condition")
       this.setState({count:this.state.count+1,
                      errMsgCss:'hidden',
                      addCompCSS:'hidden'
        })
       let valData = {'valName':this.state.valName,
                     'lb':this.state.lb,
                     'rb':this.state.rb,
                     'id':this.state.count,
                     'customValTypeName':this.state.customValTypeName,
                     'type':this.state.customValType
    }
    console.log("this.props.initialData-before adding-",this.props.initialData)
      this.props.addValueType(valData,this.props.initialData.sessAttrId);
    }
 }


handleDelete(){
  let  selectedRow = this.refs.attrValues.refs.table.state.selectedRowKeys; 
  console.log("selectedRow--",selectedRow)
  this.props.delAttrValues(selectedRow);
  this.refs.attrValues.refs.table.cleanSelected();

}

  render() {
    const { fields: {attrName, complete, specific,attrValues}, resetForm, handleSubmit, onSubmit, submitting} = this.props
    return (
      <form >
        <div className="col-md-12">
          <TextField
            floatingLabelText=" Name"
            {...attrName}
            errorText={attrName.touched && attrName.error && <div> {attrName.error}</div>}
            />
        </div>

        <div className="row ">
          <div className="col-md-5">
            <Checkbox
              {...complete}
              value="complete"
              label="Complete"
              onCustomChange={this.completeChkBoxChange.bind(this)} 
            />
          <div style={error}> {complete.touched && complete.error && <div>{complete.error}</div>}</div>


          </div>
          <div className="col-md-3">
            <Checkbox
              {...specific}
              value="specific"
              label="Specific"
              onCustomChange={this.specificChkBoxChange.bind(this)} 
            />

        </div>
        </div>




        <div className={`row col-md-10  ${this.state.valDataCss}`} style={{ 'paddingTop': 3, 'paddingLeft': 6 }}>

          <div className='row row-no-margin tableheader'>
            <IconButton className="pull-right" tooltip = "Delete" className = "pull-right" onTouchTap={this.handleDelete.bind(this)}><FontIcon color="#FFF" className="material-icons"> delete </FontIcon> </IconButton> 
            <IconButton className=" pull-right" tooltip="Add" onTouchTap={this.handleOpen.bind(this)}><FontIcon color="#FFF" className="material-icons">playlist_add</FontIcon></IconButton>
            <h4 style={{ color: '#FFF', paddingLeft: '10px' }} >Add Value Types </h4>
          </div>

          <div style={{ background: 'rgba(0,0,0,0.80)', color: '#FFF' }}>
            <DataGrid data={this.props.initialData != null ? this.props.initialData.attrValues:[]}
              // cellEdit ={ cellEditProp }
              pagination={false}
              ref = "attrValues"
              column={columns}
              onClick={this.handleClick}

              />
          </div>

          <div className={`col-md-12 ${this.state.errMsgCss}`}>
            <p style={{ color: 'red', paddingTop: 20 }}>Require Fields are empty</p>
          </div>

          <div className={`row ${this.state.addCompCSS}`} >

            <AttrValComponent value={{}}
              onCustomValTypeChange={this.onCustomValTypeChange.bind(this)}
              valNameChange={this.valNameChange.bind(this)}
              lbChange={this.lbChange.bind(this)}
              rbChange={this.rbChange.bind(this)}

              />

            <RaisedButton className="pull-right"
              label="Add"
              backgroundColor="#D3D3D3"
              onClick={this.handleSubmitValType.bind(this, attrValues)}
              style={{ position: 'relative', bottom: '45px' }}
              labelStyle={{ color: "#FFF" }}>
            </RaisedButton>

          </div>
        </div>

        {/*   </div>*/}

        <div className="hidden">
          <TextField
            {.../{*attrValues*/}

            floatingLabelText=" Name"
            value={this.state.valDataArr}
            />
        </div>



      </form>
    );
  }
}


FormSessionAttrEdit.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
}

export default reduxForm({ // <----- THIS IS THE IMPORTANT PART!
  form: 'Session Attribute Monitor ',        // a unique name for this form
  fields,
  validate,
},
  state => ({ // mapStateToProps
    valData: state.sessionAttrMonitor.valData,
    initialValues: state.sessionAttrMonitor.sessionAttrInitializeForm,
    initialData: state.sessionAttrMonitor.sessionAttrInitializeForm,
    sessionAttrMonitor : state.sessionAttrMonitor
  }),
  {
    addValueType:addValueType,
    delAttrValues :delAttrValues 
  } // mapDispatchToProps (will bind action creator to dispatch)
)(FormSessionAttrEdit);