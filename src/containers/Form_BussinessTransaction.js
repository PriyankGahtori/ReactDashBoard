import React, { PropTypes } from 'react'
import {reduxForm} from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import Is from 'is_js';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import {List, ListItem} from 'material-ui/List';
import ContentSend from 'material-ui/svg-icons/content/send';
export const fields = [ 'dcName', 'dcIp', 'dcPort','ndeIp','ndePort' ]

const styles = {
    customWidth: {
      width: 200
    },
    block: {
    maxWidth: 250,
  },
  radioButton: {
    marginBottom: 16

  }, checkbox: {
    marginBottom: 16

  },
  radioInline: {
    display: 'flex', 
    flexDirection: 'row'
  }
  };

class BussinessTransactionForm extends React.Component {

    constructor(props) {
    super(props);
   
    this.state ={myCheckBox:true,dynamicBox:true};
  //  this.state ={dynamicBox:true};
    this.handleChange=this.handleChange.bind(this);
    this.handleCheck=this.handleCheck.bind(this);
   // this.state ={value:1}
    console.log("mycheckbox - ",this.state.mycheckbox)
    console.log("dynamicBox - ",this.state.dynamicBox)
  }

handleChange(event,value){  
  console.log("value ==>",value)
  console.log("event---",event)
  //this.props.load(value);

  if(value === "btComplete")
   this.setState({myCheckBox: true})
  else
    this.setState({myCheckBox: false})

}

handleDropDown(value)
{
  console.log("inside handleDropDown")
  this.setState({value:value})
  
}

handleCheck(event,isInputChecked){
  console.log("inside handleCheck")
 // console.log("dynamicBox - ",dynamicBox)
  console.log("isInputChecked - ",isInputChecked)

  if(isInputChecked == true)
  {
    console.log("inside if")
    this.setState({dynamicBox : false})
  }
  else
  {
    console.log("inside else")
    this.setState({dynamicBox : true})
  }
}

 componentWillReceiveProps(nextProps)
  {
    
  }

  renderTextField(){
    console.log("rendering tectfiled")
    return(
         <TextField
                   hintText="Hint Text"
                   floatingLabelText="Name"
                  />
      );
  }

  render() {
     
     return (
        <form >
            <div className ="row" >
              <div className ="col-md-4">
                <label>Bussiness Transaction rules</label>
                <RadioButtonGroup name="btRuleType" defaultSelected="btGlobal"  style={styles.radioInline}>
                <RadioButton
                  value="btGlobal"
                  label="Global"
                  style={styles.radioButton}
                />
                 <RadioButton
                  value="btPattern"
                  label="Pattern"
                  style={styles.radioButton}
                  disabled={true}
                />
                 <RadioButton
                  value="btCustom"
                  label="Custom"
                  style={styles.radioButton}
                  disabled={true}
                />
                 </RadioButtonGroup>
                 
             </div>
        </div>

             <div className ="row">
                <div className ="col-md-12">
                  <RadioButtonGroup name="btRule" defaultSelected="btComplete" onChange={this.handleChange}>
                  <RadioButton
                    value="btComplete"
                    label="Complete"
                    style={styles.radioButton}
                  />

                   <RadioButton
                    value="btSegment"
                    label="Use Segments of URI"
                    style={styles.radioButton}
                  />

                   </RadioButtonGroup>
                   <div className ="row">
                      <DropDownMenu 
                          value={this.state.value} 
                          disabled={this.state.myCheckBox}
                          onChange={this.handleChange} >
                        <MenuItem value={1} primaryText="First" />
                        <MenuItem value={2} primaryText="Last" />
                        <MenuItem value={3} primaryText="Segment Number" />
                      </DropDownMenu>

                        <TextField
                        hintText="Hint Text"
                        floatingLabelText="SegmentNo"
                        disabled={this.state.myCheckBox}
                        //{...SegmentNo}
                         />
                       <label> Segments of URI in Transaction names </label>
                   </div>
                </div>
             
            </div>
            <div className='col-md-6'>
                 <Checkbox
                 label="Dynamic part of Request"
                 defaultChecked={!this.state.dynamicBox}
                 style={styles.checkbox}
                className={'col-xs-4 col-md-3'}
                 onCheck={this.handleCheck}
                   />
                 
                <RadioButtonGroup name="btDynamicReq" defaultSelected="reqParam">
                 <div className ="row">
                  <RadioButton
                    value="reqParam"
                    label= "Req Param Value"
                    style={styles.radioButton}
                    disabled={this.state.dynamicBox}
                  />

                  {this.renderTextField()}
                  </div>

                   <RadioButton
                    value="reqMethod"
                    label="Request Method"
                    style={styles.radioButton}
                    disabled={this.state.dynamicBox}
                  />
                  <RadioButton
                    value="reqHeader"
                    label="Request Header"
                    style={styles.radioButton}
                    disabled={this.state.dynamicBox}
                  />
                   </RadioButtonGroup>
            </div>
       </form>
     );
   }
}

BussinessTransactionForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
}

export default reduxForm({ // <----- THIS IS THE IMPORTANT PART!
  form: 'contact',                           // a unique name for this form
  fields
},
  state => ({ // mapStateToProps
 
})) (BussinessTransactionForm);

