//Importing React components
import React,{PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';
import RadioButton from 'material-ui/RadioButton';
import RaisedButton  from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import ConfirmDialog from 'material-ui/Dialog';
import MenuItem from 'material-ui/MenuItem';


//Importing React components
import Checkbox from '../../../../components/CheckboxWrapper';
import Input from '../../../../components/InputWrapper';
import {submitKeywordData,initializeInstrException}  from '../../../../actions/index';
import RadioButtonGroup from '../../../../components/RadioButtonGroupWrapper';
import {triggerRunTimeChanges} from '../../../../actions/runTimeChanges';
import DropDownMenu from '../../../../components/SelectFieldWrapper';



export const fields = ['enable',
                       'enableCaptureExcepStackTrace',
                       'stackTraceDepthValue',
                       'exceptionType',
                       
                       ];

 const styles = {
  input: {
    width: 150,
  },
   customWidth: {
      width: 300
    },
    radioStyle:{
      fontSize:'14px',
      fontWeight:'normal'

    }
}
class Form_EnableExcptcapturing extends React.Component {

  constructor(props) {
    super(props);
    console.log("this.props.initialData --",this.props.initialData )
    this.state ={ enableCaptureExceptCheckBox: this.props.initialData != null ? this.props.initialData.enable : 'false',
                  captureExceptStackTraceCheckBox: this.props.initialData != null ? this.props.initialData.enableCaptureExcepStackTrace :'false',
                  exceptionType :this.props.initialData != null ? this.props.initialData.exceptionType : "unhandledException" 
                }

    console.log("this.state  --",this.state.enableCaptureExceptCheckBox1)
      
  }
  componentWillMount() {
   // this.props.initializeInstrException();
  }

  componentWillReceiveProps(nextProps)
  {
    if(this.props.getAllKeywordData != nextProps.getAllKeywordData){
      this.setState({getAllKeywordData : nextProps.getAllKeywordData
      });
    }
    
}
  
  handleChangeExceptionType(event,isInputChecked){
    console.log("isInputChecked - ",isInputChecked)
  }

  handleCaptureExceptCheckboxChange(event,isInputChecked){
    let css = isInputChecked === true ? 'show' :'hidden';
    this.setState({exceptionConfDivCss:css
    })
   
    if(isInputChecked === 'false' || isInputChecked === false )
      this.setState({enableCaptureExceptCheckBox:false
      })
    else
      this.setState({enableCaptureExceptCheckBox:true})
  }

  handleExceptStackTrace(event,value){
     this.setState({captureExceptStackTraceCheckBox:value
    })
  }

  handleChangeStackTraceValue(value){
    this.setState({stackTraceDepthValue:value})
  }

  handleChange (event){
    this.setState({
      value: event.target.value,
    });
  };

 
  render() {
    const { fields: {enable,
                    enableCaptureExcepStackTrace,
                    stackTraceDepthValue,
                    exceptionType
     }, resetForm, handleSubmit,onSubmit, submitting } = this.props
  
    return (
      <div className ="row" style={{'paddingLeft':29,'paddingTop':13}}>

        <form>
        <div className = "row col-md-8">
         <Checkbox
         {...enable}
                  value = "instrExceptions"
                  label = "Instr Exceptions"
                  checked  = {this.state.enableCaptureExceptCheckBox}
                  onCustomChange={this.handleCaptureExceptCheckboxChange.bind(this)}
                  labelStyle = {{ fontWeight:'normal'}}
              />
        </div>

        
        <div className ={this.state.enableCaptureExceptCheckBox ? 'show' :'hidden'} style ={{'paddingLeft':35}}>
            <div >
                 <Checkbox
                 {...enableCaptureExcepStackTrace}
                          value = "captureExceptionStackTrace"
                          label = "Capture Exception Stack Trace"
                          checked  = {this.state.captureExceptStackTraceCheckBox}
                          onCustomChange = {this.handleExceptStackTrace.bind(this)}
                           labelStyle = {{ fontWeight:'normal'}}
               />
            </div>


            <div className = {this.state.captureExceptStackTraceCheckBox? 'show' :'hidden'} style ={{'paddingTop':-15,'paddingLeft':17}}>
              <TextField
                      {...stackTraceDepthValue}
                      hintText = "0-9999"
                      floatingLabelText = "Stack Trace Depth"
                      onChange = {this.handleChange}
                    />
            </div>
           
            <b>Capture Exceptions </b>
            <div >
              <RadioButtonGroup 
              {...exceptionType}
              className ={'col-xs-3 col-md-4'} 
              style ={{display: 'flex'}}  
              name = "exceptionType" 
              defaultSelected = {this.state.exceptionType}
             // defaultSelected="handledException"
              onCustomChange={this.handleChangeExceptionType.bind(this)}

              >
                 
                 <RadioButton
                    value="unhandledException"  
                    label="Unhandled" 
                     labelStyle = {{ fontWeight:'normal'}}
                 />
                 <RadioButton
                    value="handledException"
                    label="All"
                     labelStyle = {{ fontWeight:'normal'}}          
                 />
          </RadioButtonGroup>
        </div>

       
       </div>
       </form>
      </div>
    );
  }
}
Form_EnableExcptcapturing.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
}

export default reduxForm({
  form: 'Form_EnableExcptcapturing',
  fields,

},
  state => ({ // mapStateToProps
  initialData :state.Keywords.initializeKeywords.instrExceptionObj,
  getAllKeywordData :state.Keywords,
  initialValues :state.Keywords.initializeKeywords.instrExceptionObj,
  trData : state.initialData.trData,
  trModeDetail: state.trModeDetail
}),
  
  { 
   submitKeywordData:submitKeywordData,
   initializeInstrException:initializeInstrException
 } // mapDispatchToProps (will bind action creator to dispatch)
)(Form_EnableExcptcapturing);