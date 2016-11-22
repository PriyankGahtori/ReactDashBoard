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
import MultiSelect from '../../../../components/MultiSelectWrapper';
import DropDownComponent from './DropDownComponent';



export const fields = ['enableCaptureHTTPReqFullFp',
                        'urlMode',
                        'hdrModeForReqcapture',
                        'selectedHdrsValReq',
                        'configuredFile',
                        'captureModeReq',
                        'hdrValChrReq',
                        'enableCaptureHTTPResFullFp',
                        'responseData',
                        'hdrModeForResCapture',
                        'selectedHdrsValRes',
                        'hdrValChrRes'

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

var dataForhdrTypeDropDown = [{'id':0 ,'option':'ALL Headers'},
                              {'id':1 ,'option':'Specified headers'},
                              {'id':2 ,'option':'Configured'}
                              
]

var dataForCaptureDropDown = [{'id':0 , 'option' :'complete'},
                               {'id':1, 'option':'brief'}
  ]


class Form_EnableFpCapturing extends React.Component {

  constructor(props) {
    super(props);
    this.state = 
  
    this.state = {
      enableCaptureHTTPReqFullFp : this.props.initialData.enableCaptureHTTPReqFullFp,
      enableCaptureHTTPResFullFp : this.props.initialData.enableCaptureHTTPRespFullFp,
      'hdrTypeCss'    : this.props.initialData.urlMode === '3' ?'show' : 'hidden',
      'multiSelectCss': 'hidden',
      'configDropDownCss': 'hidden',
      'briefCaptureModeConfigReq' : 'hidden',
      'multiSelectRespCss':'hidden',
      'briefCaptureModeConfigRespCss':'hidden',
      'hdrTypeRespCss':'hidden',
      'multiSelectRespCss':'hidden',
      'configDropDownRespCss':'hidden',
      'urlMode':this.props.initialData.urlMode,
      'responseData':this.props.initialData.responseData
      
  }
}

  componentWillMount() {
   // this.props.initializeInstrException();
   
 }

 componentWillReceiveProps(nextProps)
 {
  console.log("compo receice props called",nextProps.initialData.enableCaptureHTTPReqFullFp)
  if(this.props.initialData != nextProps.initialData)
   this.setState({enableCaptureHTTPReqFullFp:nextProps.initialData.enableCaptureHTTPReqFullFp,
                  enableCaptureHTTPResFullFp:nextProps.initialData.enableCaptureHTTPResFullFp
        })
  if(this.props.getAllKeywordData != nextProps.getAllKeywordData){
    this.setState({getAllKeywordData : nextProps.getAllKeywordData,
    });
  }
}


handleCaptureHTTPReqFullFp(event,isInputChecked){
 
  this.setState({enableCaptureHTTPReqFullFp:isInputChecked})
   console.log("isInputChecked-handleCaptureHTTPReqFullFp called--",isInputChecked)
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
handleHdrModeReqChange(event, index, value){
  console.log("value--handleHdrModeChange--value === 1",value === '1')
        if(value === 1)
          this.setState({'multiSelectCss':'show',
                           'configDropDownCss':'hidden',
                           'captureModeCss': 'show'
        })
        else if(value === 2)
          this.setState({'configDropDownCss':'show',
                          'multiSelectCss':'hidden',
                          'captureModeCss': 'show'

        })
        else
        this.setState({ 
                        'multiSelectCss':'hidden',
                        'configDropDownCss':'hidden',
                        'captureModeCss': 'show'

      })
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

handleCaptureModeReqChange(event, index, value){
  console.log("handle handleCaptureModeReqChange function change called--",value)
  if(value === 1)
   this.setState({
                  'briefCaptureModeConfigReq':'show'})
 else 
   this.setState({
                  'briefCaptureModeConfigReq':'hidden'})
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

handleHdrModeResChange(event, index, value){
  console.log("handleHdrRespModeChange---",value)
  if(value === 1)
          this.setState({'multiSelectRespCss':'show',
                           'configDropDownRespCss':'hidden',
                           'captureModeRespCss': 'show'
        })
        else if(value === 2)
          this.setState({ 'multiSelectRespCss':'hidden',
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

handleCaptureModeResChange(event, index, value){
  if(value === 1)
   this.setState({
                  'briefCaptureModeConfigRespCss':'show'})
 else 
   this.setState({
                  'briefCaptureModeConfigRespCss':'hidden'})
}

render() {
  const { fields: { enableCaptureHTTPReqFullFp,
                    urlMode,
                    hdrModeForReqcapture,
                    selectedHdrsValReq,
                    configuredFile ,
                    captureModeReq,
                    hdrValChrReq,
                    enableCaptureHTTPResFullFp,
                    responseData,
                    hdrModeForResCapture,
                    selectedHdrsValRes,
                    captureModeRes,
                    hdrValChrRes


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
       
       {/******div block for 3rd option "URL with Query Params,Http Method ,Http Headers"*******/}
        <div className = {this.state.hdrTypeCss} style = {{'paddingLeft':27}}>
          
          <div className = "row">
            <div className='col-md-6' >
                <DropDownComponent 
                {...hdrModeForReqcapture}
                data = {dataForhdrTypeDropDown}
                onChangeOption = {this.handleHdrModeReqChange.bind(this)}
                floatingLabelText = "select Header Type"
                />
            </div>

        {/*******div block  when "Specified headers" is selected**********/}

          <div className ={`col-md-4 ${this.state.multiSelectCss}`}  style = {{'width':200,'paddingTop':24}}>
          <MultiSelect multi
              {...selectedHdrsValReq}
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
                 {/* <MenuItem value = {"0"}  primaryText = "ALL headers"/>
                  <MenuItem value = {"1"}  primaryText = "Specified headers"/>
                  <MenuItem value = {"2"}  primaryText = "Configured" />*/}
                </DropDownMenu>
        </div>
      </div>
   

      <div className = {`row ${this.state.captureModeCss}`} style = {{'paddingLeft':5}}>
        <div className = "col-md-6">
                <DropDownComponent 
                {...captureModeReq}
                data = {dataForCaptureDropDown}
                onChangeOption = {this.handleCaptureModeReqChange.bind(this)}
                floatingLabelText = "Select Capture Mode"
                />
      </div>
      <div className = {`col-md-4 ${this.state.briefCaptureModeConfigReq}`}>
        <TextField
                  hintText="Hint Text"
                  floatingLabelText="Enter range of characters "
                  {...hdrValChrReq}
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
        defaultSelected={this.state.responseData}
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
               <DropDownComponent 
                {...hdrModeForResCapture}
                data = {dataForhdrTypeDropDown}
                onChangeOption = {this.handleHdrModeResChange.bind(this)}
                floatingLabelText = 'Select Header Type'
                />
            </div>

        {/*******div block  when "Specified headers" is selected**********/}

          <div className ={`col-md-4 ${this.state.multiSelectRespCss}`}  style = {{'width':200,'paddingTop':24}}>
          <MultiSelect multi
              {...selectedHdrsValRes}
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
                 <DropDownComponent 
                {...captureModeRes}
                data = {dataForCaptureDropDown}
                onChangeOption = {this.handleCaptureModeResChange.bind(this)}
                floatingLabelText = "Select Capture Mode"
                />
      </div>
      <div className = {`col-md-4 ${this.state.briefCaptureModeConfigRespCss}`}>
        <TextField
                  hintText="Hint Text"
                  floatingLabelText="Enter range of characters "
                  {...hdrValChrRes}
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
    initialData :state.Keywords.initializeKeywords.fpHdrInitializeObj,
    getAllKeywordData :state.Keywords,
    initialValues :state.Keywords.initializeKeywords.fpHdrInitializeObj,
    trData : state.initialData.trData,
    trModeDetail: state.trModeDetail
  }),
  
  { 
   submitKeywordData:submitKeywordData,
   initializeInstrException:initializeInstrException
 } // mapDispatchToProps (will bind action creator to dispatch)
 )(Form_EnableFpCapturing);