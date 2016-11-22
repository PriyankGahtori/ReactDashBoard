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
import MultiSelect from '../../../../components/MultiSelectWrapper'



export const fields = ['enableCaptureHTTPReqFullFp',
                        'urlMode',
                        'hdrModeForReqcapture',
                        'selectedHdrsVal',
                        'configuredFile',
                        'captureMode',
                        'hdrValChr',
                        'enableCaptureHTTPResFullFp',
                        'responseData',
                        'hdrModeForRescapture'
];

var options = [
    { value: 'one', label: 'One' },
    { value: 'two', label: 'Two' },
    { value: 'three', label: 'Three' }
   ];

const styles = {
  input: {
    width: 150,
  },
  customWidth: {
    width: 200
  },
  multiSelect:{
  width:40
 
  }
}
class Form_EnableFpCapturing extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      'hdrTypeCss'    : 'hidden',
      'multiSelectCss': 'hidden',
      'configDropDownCss': 'hidden',
      'briefCaptureModeConfig' : 'hidden',
      'multiSelectRespCss':'hidden'
    }
  }
  componentWillMount() {
   // this.props.initializeInstrException();
 }

 componentWillReceiveProps(nextProps)
 {
  if(this.props.getAllKeywordData != nextProps.getAllKeywordData){
    this.setState({getAllKeywordData : nextProps.getAllKeywordData,
    });
  }
}

// Method to create comboBox of hdrMode for common to both keywords  

  renderDropDownForHdrMode(hdrMode,type){
    console.log("type---",type)
      return(
        <DropDownMenu 
                {...hdrMode}
                  style={styles.customWidth}
                  value = {this.state.hdrMode}
                  autoWidth={false}
                  customOnChange = {this.handleHdrModeChange.bind(this,type)} 
                  floatingLabelText="Select headerType "
                  autoScrollBodyContent={true}
                >
                  <MenuItem value = {"0"}  primaryText = "ALL headers"/>
                  <MenuItem value = {"1"}  primaryText = "Specified headers"/>
                  <MenuItem value = {"2"}  primaryText = "Configured" />
         </DropDownMenu>
        );
    }


handleCaptureHTTPReqFullFp(event,isInputChecked){
      this.setState({enableCaptureHTTPReqFullFp : isInputChecked})
}

//function called on changing value of Radio button groups 
handleURLModeChange(event, value){
  console.log("value---",value)
  let css = value === '3' ? 'show' : 'hidden';
  this.setState({'hdrTypeCss':css})
}

/*  
* 
*/
handleHdrModeChange(event, index, value,type){
  console.log("value--handleHdrModeChange--",value)
  console.log("type----",type)
  if(type === 'request'){ //for keyword captureHttpFullReqFp
        if(value === '1')
          this.setState({'multiSelectCss':'show',
                           'hdrMode':value,
                           'configDropDownCss':'hidden',
                           'captureModeCss': 'show'
        })
        else if(value === '2')
          this.setState({'configDropDownCss':'show',
                          'hdrMode':value,
                          'multiSelectCss':'hidden',
                          'captureModeCss': 'hidden'

        })
        else
        this.setState({ 'hdrMode':value,
                        'multiSelectCss':'hidden',
                        'configDropDownCss':'hidden',
                        'captureModeCss': 'show'

      })
}
  else if(type === 'response'){ //for keyword captureHttpResFp
      
         if(value === '1')
          this.setState({'multiSelectRespCss':'show',
                           'hdrModeResp':value,
                           'configDropDownRespCss':'hidden',
                           'captureModeRespCss': 'show'
        })
        else if(value === '2')
          this.setState({ 'multiSelectRespCss':'hidden',
                          'hdrModeResp':value,
                          'configDropDownRespCss':'show',
                          'captureModeRespCss': 'hidden'

        })
        else
        this.setState({ 'multiSelectRespCss':'hidden',
                        'hdrModeResp':value,
                        'configDropDownRespCss':'hidden',
                        'captureModeRespCss': 'show'

      })

  }
  
}
/* this function called on changing value of multi select components i.e list of headers
*/
updateSelected(value){
  this.setState({multiSelectValue:value });
}

/*
* function called when dropdown of configured option is changed 
*/
handleConfiguredFileChange(event, index, value){
  this.setState({configuredFile:value,

  })
}

handleCaptureModeChange(event, index, value){
  if(value === '1')
   this.setState({captureMode:value ,
                  'briefCaptureModeConfig':'show'})
 else 
   this.setState({captureMode:value ,
                  'briefCaptureModeConfig':'hidden'})
}

/************* functions for CaptureHTTPResFullFp keyword *****************/
handleCaptureHTTPResFullFp(event,isInputChecked){
  this.setState({enableCaptureHTTPResFullFp : isInputChecked})
}

handleURLRespModeChange(event, value){
  console.log("value---",value)
  let css = value === '2' ? 'show' : 'hidden';
  this.setState({'hdrTypeRespCss':css})
}

handleHdrRespModeChange(event, index, value){
  if(value === '1')
    this.setState({'multiSelectCss':'show',
                     'urlModeResp':value,
                     'configDropDownCss':'hidden',
                     'captureModeCss': 'show'
  })
  else if(value === '2')
    this.setState({'configDropDownCss':'show',
                    'urlModeResp':value,
                    'multiSelectCss':'hidden',
                    'captureModeCss': 'hidden'

  })
  else
  this.setState({ 'hdrMode':value,
                  'multiSelectCss':'hidden',
                  'configDropDownCss':'hidden',
                  'captureModeCss': 'show'

})
  
}
render() {
  const { fields: { enableCaptureHTTPReqFullFp,
                    urlMode,
                    hdrModeForReqcapture,
                    selectedHdrsVal,
                    configuredFile ,
                    captureMode,
                    hdrValChr,
                    enableCaptureHTTPResFullFp,
                    responseData,
                    hdrModeForRescapture

  }, resetForm, handleSubmit,onSubmit, submitting } = this.props
  
  return (
    <div className ="row" style = {{'paddingLeft':29,'paddingTop':13}}>
 
    <form>

   {/********************** START OF captureHTTPReqFullFp******************************/}
    <div className = "row col-md-8">
    <Checkbox
    {...enableCaptureHTTPReqFullFp}
    value = "CaptureHTTPReqFullFp"
    label = "Capture HTTPReqFullFp"
    checked  = {this.state.enableCaptureHTTPReqFullFp}
    onCustomChange={this.handleCaptureHTTPReqFullFp.bind(this)}
    />
    </div>

    {/************* subGroup***************/}
    <div className ={this.state.enableCaptureHTTPReqFullFp ? 'show' :'hidden'} style ={{'paddingLeft':35}}>
      
      <div className = "row col-md-10">
        <RadioButtonGroup 
        {...urlMode}
        name = "urlMode" 
        defaultSelected={this.state.urlMode}
        onCustomChange={this.handleURLModeChange.bind(this) }
        >
       <RadioButton
          value="1"
          label="URL Only"          
       />
       <RadioButton
          value="2"
          label="URL with Query Parameters"          
       />
        <RadioButton
          value="3"
          label="URL with Query Params,Http Method ,Http Headers"          
       />

      </RadioButtonGroup>
       
       {/******START*******/}
        <div className = {this.state.hdrTypeCss} style = {{'paddingLeft':27}}>
          
          <div className = "row">
            <div className='col-md-6' >
              {this.renderDropDownForHdrMode(hdrModeForReqcapture,'request')}  
              {/*<DropDownMenu 
                {...hdrMode}
                              
                  style={styles.customWidth}
                  value = {this.state.hdrMode}
                  autoWidth={false}
                  customOnChange={this.handleHdrModeChange.bind(this)} 
                  floatingLabelText="Select headerType "
                  autoScrollBodyContent={true}
                >
                  <MenuItem value = {"0"}  primaryText = "ALL headers"/>
                  <MenuItem value = {"1"}  primaryText = "Specified headers"/>
                  <MenuItem value = {"2"}  primaryText = "Configured" />
                </DropDownMenu>*/}
            }
          </div>

        {/*******div block  when "Specified headers" is selected**********/}

          <div className ={`col-md-4 ${this.state.multiSelectCss}`}  style = {{'width':200,'paddingTop':24}}>
          <MultiSelect multi
              {...selectedHdrsVal}
            name ="SelectdHttpHdrs"
            value = {this.state.multiSelectValue} 
            options = {options} 
            onCustomChange = {this.updateSelected.bind(this)}
            />
        </div>


          <div className ={`col-md-4 ${this.state.configDropDownCss}`}  style = {{'width':150}}>
             <DropDownMenu 
                {...configuredFile}
                  style={styles.customWidth}
                  value = {this.state.configuredFile}
                  autoWidth={false}
                  customOnChange={this.handleConfiguredFileChange.bind(this)} 
                  floatingLabelText="Select Configured file list "
                  autoScrollBodyContent={true}
                >
                  <MenuItem value = {"0"}  primaryText = "ALL headers"/>
                  <MenuItem value = {"1"}  primaryText = "Specified headers"/>
                  <MenuItem value = {"2"}  primaryText = "Configured" />
                </DropDownMenu>
        </div>
      </div>
   

      <div className = {`row ${this.state.captureModeCss}`} style = {{'paddingLeft':5}}>
        <div className = "col-md-6">
          <DropDownMenu 
                {...captureMode}
                  style={styles.customWidth}
                  value = {this.state.captureMode}
                  autoWidth={false}
                  customOnChange={this.handleCaptureModeChange.bind(this)} 
                  floatingLabelText="Select Capture Mode "
                  autoScrollBodyContent={true}
                >
                  <MenuItem value = {"0"}  primaryText = "complete"/>
                  <MenuItem value = {"1"}  primaryText = "brief"/>
                </DropDownMenu>
      </div>
      <div className = {`col-md-4 ${this.state.briefCaptureModeConfig}`}>
        <TextField
                  hintText="Hint Text"
                  floatingLabelText="Enter range of characters "
                  {...hdrValChr}
                />
      </div>
      </div>

  </div>
        {/*************END *************/}
    
    </div>
    </div>

  {/***********************START OF captureHTTPRespFullFp************************/}
     <div className = "row col-md-8">
    <Checkbox
    {...enableCaptureHTTPResFullFp}
    value = "CaptureHTTPResFullFp"
    label = "Capture HTTPResFullFp"
    checked  = {this.state.enableCaptureHTTPResFullFp}
    onCustomChange={this.handleCaptureHTTPResFullFp.bind(this)}
    />
    </div>

    {/************* subGroup***************/}
    <div className ={this.state.enableCaptureHTTPResFullFp ? 'show' :'hidden'} style ={{'paddingLeft':35}}>
      
      <div className = "row col-md-10">
        <RadioButtonGroup 
        {...responseData}
        name = "urlMode" 
        defaultSelected={this.state.urlModeResp}
        onCustomChange={this.handleURLRespModeChange.bind(this) }
        >
       <RadioButton
          value = "1"
          label = "Capture Response Code only"          
       />
       <RadioButton
          value = "2"
          label = "Capture Response Code and http headers only"          
       />
       
      </RadioButtonGroup>
       
       {/******START of div block when 2nd radio button is selected*******/}
        <div className = {this.state.hdrTypeRespCss} style = {{'paddingLeft':27}}>
          
          <div className = "row">
            <div className='col-md-6' >
              {this.renderDropDownForHdrMode(hdrModeForRescapture,'response')}  
         
             {/*<DropDownMenu 
                {...hdrMode}
                              
                  style={styles.customWidth}
                  value = {this.state.hdrMode}
                  autoWidth={false}
                  customOnChange={this.handleHdrModeChange.bind(this)} 
                  floatingLabelText="Select headerType "
                  autoScrollBodyContent={true}
                >
                  <MenuItem value = {"0"}  primaryText = "ALL headers"/>
                  <MenuItem value = {"1"}  primaryText = "Specified headers"/>
                  <MenuItem value = {"2"}  primaryText = "Configured" />
                </DropDownMenu>*/}
            }
          </div>

        {/*******div block  when "Specified headers" is selected**********/}

          <div className ={`col-md-4 ${this.state.multiSelectRespCss}`}  style = {{'width':200,'paddingTop':24}}>
          <MultiSelect multi
              {...selectedHdrsVal}
            name ="SelectdHttpHdrs"
            value = {this.state.multiSelectValue} 
            options = {options} 
            onCustomChange = {this.updateSelected.bind(this)}
            />
        </div>


          <div className ={`col-md-4 ${this.state.configDropDownRespCss}`}  style = {{'width':150}}>
             <DropDownMenu 
                {...configuredFile}
                  style={styles.customWidth}
                  value = {this.state.configuredFile}
                  autoWidth={false}
                  customOnChange={this.handleConfiguredFileChange.bind(this)} 
                  floatingLabelText="Select Configured file list "
                  autoScrollBodyContent={true}
                >
                  <MenuItem value = {"0"}  primaryText = "ALL headers"/>
                  <MenuItem value = {"1"}  primaryText = "Specified headers"/>
                  <MenuItem value = {"2"}  primaryText = "Configured" />
                </DropDownMenu>
        </div>
      </div>
   

      <div className = {`row ${this.state.captureModeCss}`} style = {{'paddingLeft':5}}>
        <div className = "col-md-6">
          <DropDownMenu 
                {...captureMode}
                  style={styles.customWidth}
                  value = {this.state.captureMode}
                  autoWidth={false}
                  customOnChange={this.handleCaptureModeChange.bind(this)} 
                  floatingLabelText="Select Capture Mode "
                  autoScrollBodyContent={true}
                >
                  <MenuItem value = {"0"}  primaryText = "complete"/>
                  <MenuItem value = {"1"}  primaryText = "brief"/>
                </DropDownMenu>
      </div>
      <div className = {`col-md-4 ${this.state.briefCaptureModeConfig}`}>
        <TextField
                  hintText="Hint Text"
                  floatingLabelText="Enter range of characters "
                  {...hdrValChr}
                />
      </div>
      </div>

  </div>
        {/*************END *************/}
    
    </div>
    </div>
{/*********************END OF captureHTTPRespFullFp*****************/}
    </form>
    </div>

    );
}
}
Form_EnableFpCapturing.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
}

export default reduxForm({
  form: 'Form_EnableFpCapturing',
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
 )(Form_EnableFpCapturing);