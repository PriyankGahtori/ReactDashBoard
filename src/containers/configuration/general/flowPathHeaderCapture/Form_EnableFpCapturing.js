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
import DropDownMenu from '../../../../components/SelectFieldWrapper';
import MultiSelect from '../../../../components/MultiSelectWrapper';
import DropDownComponent from './DropDownComponent';
import RadioButtonGroup from '../../../../components/RadioButtonGroupWrapper';
import Checkbox from '../../../../components/CheckboxWrapper';
import Input from '../../../../components/InputWrapper';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import CheckboxWithoutWrapper from 'material-ui/Checkbox';
import RadioButtonGroupWithoutWrapper from 'material-ui/RadioButton';
import Paper from 'material-ui/Paper';

//Importing React components
import {submitKeywordData,initializeInstrException,updateSessionType,toggleAddCustomCapture,clearStepperData,updateCustomCaptureDataFile }  from '../../../../actions/index';
import {triggerRunTimeChanges} from '../../../../actions/runTimeChanges';
import SessionAttr from '../../instrumentation/monitor/SessionAttributeMonitors';
import * as  modifiedVal from './ModifyValue';
import MethodBasedCaptureCustomData from './MethodBasedCapturingCustomData';
import  DialogCaptureCustomData from './Dialog_CustomCaptureData';
import DialogStepper from './Dialog_Stepper';
import MultiSelectCapturingMenu from './customDataCapture/MultiSelectCapturingOptionMenu';
//import SpecificSessionAttr from './customDataCapture/SessionAttrBasedCapturingCustomData';
import SessionAttrBasedCapturingCustomData from '../../instrumentation/monitor/SessionAttributeMonitors';
import HttpReqHdr from './customDataCapture/HttpReqHdrBasedCapturingCustomData';



export const fields = ['enableCaptureHTTPReqFullFp',
                        'hdrModeForReqcapture',
                        'selectedHdrsValReq',
                        'captureModeReq',
                        'captureModeRes',
                        'hdrValChrReq',
                        'enableCaptureHTTPRespFullFp',
                        'hdrModeForResCapture',
                        'selectedHdrsValRes',
                        'hdrValChrRes',
                        'enableCaptureSessionAttr',
                        'sessionType',
                        'enableCaptureCustomData'

];

var reqHdrList = [
    { value: 'Accept-Charset', label: 'Accept-Charset' },
    { value: 'Accept-Datetime', label: 'Accept-Datetime' },
    { value: 'Accept-Encoding', label: 'Accept-Encoding' },
    { value: 'Accept-Language', label: 'Accept-Language' },
    { value: 'Accept', label: 'Accept' },
    { value: 'Authorization', label: 'Authorization' },
    { value: 'Cache-Control', label: 'Cache-Control' },
    { value: 'Connection', label: 'Connection' },
    { value: 'Content-Length', label: 'Content-Length' },
    { value: 'Content-MD5', label: 'Content-MD5' },
    { value: 'Content-Type', label: 'Content-Type' },
    { value: 'Cookie', label: 'Cookie' },
    { value: 'DNT', label: 'DNT' },
    { value: 'Date', label: 'Date' },
    { value: 'Expect', label: 'Expect' },
    { value: 'Front-End-Https', label: 'Front-End-Https' },
    { value: 'Host', label: 'Host' },
    { value: 'If-Match', label: 'If-Match' },
   { value: 'If-Modified-Since', label: 'If-Modified-Since' },
   { value: 'If-None-Match', label: 'If-None-Match' },
   { value: 'If-Range', label: 'If-Range' },
   { value: 'Proxy-Connection', label: 'Proxy-Connection' },
   { value: 'Range', label: 'Range' },
   { value: 'Referer', label: 'Referer' },
   { value: 'TE', label: 'TE' },
   { value: 'Upgrade', label: 'Upgrade' },
   { value: 'User-Agent', label: 'User-Agent' }, 
   { value: 'Via', label: 'Via' },
   { value: 'X-ATT-DeviceId', label: 'X-ATT-DeviceId' },
   { value: 'X-Forwarded-For', label: 'X-Forwarded-For' },
   { value: 'X-Forwarded-Proto', label: 'X-Forwarded-Proto' },
   { value: 'X-Requested-With', label: 'X-Requested-With' },
   { value: 'X-Wap-Profile', label: 'X-Wap-Profile' },
 ];

var resHdrList = [
   { value: 'Accept-Ranges', label: 'Accept-Ranges' },
   { value: 'Access-Control-Allow-Origin', label: 'Access-Control-Allow-Origin' },
   { value: 'Age', label: 'Age' },
   { value: 'Allow', label: 'Allow' },
   { value: 'Cache-Control', label: 'Cache-Control' },
   { value: 'Connection', label: 'Connection' },
   { value: 'Content-Disposition', label: 'Content-Disposition' },
   { value: 'Content-Encoding', label: 'Content-Encoding' },
   { value: 'Content-Language', label: 'Content-Language' },
   { value: 'Content-Length', label: 'Content-Length' },
   { value: 'Content-Location', label: 'Content-Location' },
   { value: 'Content-MD5', label: 'Content-MD5' },
   { value: 'Content-Range', label: 'Content-Range' },
   { value: 'Content-Security-Policy', label: 'Content-Security-Policy' },
   { value: 'Content-Type', label: 'Content-Type' },
   { value: 'Date', label: 'Date' },
   { value: 'ETag', label: 'ETag' },
   { value: 'Expires', label: 'Expires' },
   { value: 'Last-Modified', label: 'Last-Modified' },
   { value: 'Link', label: 'Link' },
   { value: 'Location', label: 'Location' },
   { value: 'P3P', label: 'P3P' },
   { value: 'Pragma', label: 'Pragma' },
   { value: 'Proxy-Authenticate', label: 'Proxy-Authenticate' },
   { value: 'Refresh', label: 'Refresh' },
   { value: 'Retry-After', label: 'Retry-After' },
   { value: 'Server', label: 'Server' },
   { value: 'Set-Cookie', label: 'Set-Cookie' },
   { value: 'Status', label: 'Status' },
   { value: 'Strict-Transport-Security', label: 'Strict-Transport-Security' },
   { value: 'Trailer', label: 'Trailer' },
   { value: 'Transfer-Encoding', label: 'Transfer-Encoding' },
   { value: 'Vary', label: 'Vary' },
   { value: 'Via', label: 'Via' },
   { value: 'WWW-Authenticate', label: 'WWW-Authenticate' },
   { value: 'Warning', label: 'Warning' },
   { value: 'X-Content-Security-Policy', label: 'X-Content-Security-Policy' },
   { value: 'X-Content-Type-Options', label: 'X-Content-Type-Options' },
   { value: 'X-Frame-Options', label: 'X-Frame-Options' },
   { value: 'X-Powered-By', label: 'X-Powered-By' },
   { value: 'X-UA-Compatible', label: 'X-UA-Compatible' },
   { value: 'X-WebKit-CSP', label: 'X-WebKit-CSP' },
   { value: 'X-XSS-Protection', label: 'X-XSS-Protection' },
  
]
 
const styles = {
  input: {
    width: 150,
  },
  customWidth: {
    width: 200
  },
  multiSelect:{
  width:40
 
  },
  radioStyle:{
    fontSize:'14px',
    fontWeight:'normal'
  }
}

var dataForhdrTypeDropDown = [{'id':'0' ,'option':'ALL Headers'},
                              {'id':'1' ,'option':'Specified headers'},
                             // {'id':2 ,'option':'Configured'}
]

var dataForCaptureDropDown = [{'id':'0' , 'option' :'complete'},
                               {'id':'1', 'option':'brief'}
  ]

const validate = values=> {
  const errors = {}
   
  return errors;
}
class Form_EnableFpCapturing extends React.Component {

  constructor(props) {
    super(props);
    console.log("this.state--",this.props.initialData)
  
    this.state = {
      enableCaptureHTTPReqFullFp : this.props.initialData != null ?this.props.initialData.enableCaptureHTTPReqFullFp:false,
      enableCaptureHTTPResFullFp :this.props.initialData != null ? this.props.initialData.enableCaptureHTTPRespFullFp:false,
      enableCaptureCustomData :this.props.initialData != null ? this.props.initialData.enableCaptureCustomData:false,
      hdrModeForReqcapture:this.props.initialData.hdrModeForReqcapture,
      hdrModeForResCapture:this.props.initialData.hdrModeForResCapture,
      captureModeReq :this.props.initialData.captureModeReq,
      captureModeRes :this.props.initialData.captureModeRes,
      hdrValChrReq:this.props.initialData.hdrValChrReq,
      multiSelectValue:this.props.initialData.selectedHdrsValReq,


      'hdrTypeCss'    :  'hidden',
      'multiSelectCss': this.props.initialData != null && this.props.initialData.hdrModeForReqcapture == '1'?'show':'hidden',
      'configDropDownCss': 'hidden',
      'briefCaptureModeConfigReq' :this.props.initialData != null && this.props.initialData.captureModeReq == '1'?'show':'hidden',
      'briefCaptureModeConfigRespCss':this.props.initialData != null && this.props.initialData.captureModeRes == '1'?'show':'hidden',
      'hdrTypeRespCss':'hidden',
      'multiSelectRespCss':this.props.initialData != null && this.props.initialData.hdrModeForResCapture == '1'?'show':'hidden',
      'multiSelectValueResp':this.props.initialData.selectedHdrsValRes,

      'configDropDownRespCss':'hidden',
      'specificDivCSS':this.props.initialData.enableCaptureSessionAttr && this.props.sessionType == 'specific'?'show':'hidden',
      'captureSessionAttrCss':'hidden',
      'enableCaptureSessionAttr':this.props.initialData.enableCaptureSessionAttr,
      'sessionType':this.props.sessionType != null ?this.props.sessionType :'NA',
      'customDataCapturingMethodBlock':this.props.initialData != null && this.props.initialData.enableCaptureCustomData?'show':'hidden',
      'addMenuDropDownBlock':'hidden',
      'showTable':'hidden',
      'showTableHttpReqHdr':'hidden'
  }
}

  componentWillMount() {
   this.props.clearStepperData();
  
 }

 componentWillUnmount() {
   console.log("componentWillUnmount()  method called")

 }

 componentWillReceiveProps(nextProps)
 {
  if(this.props.initialData != nextProps.initialData)
   this.setState({enableCaptureHTTPReqFullFp:nextProps.initialData.enableCaptureHTTPReqFullFp,
                  enableCaptureHTTPResFullFp:nextProps.initialData.enableCaptureHTTPRespFullFp,
                  enableCaptureCustomData:nextProps.initialData.enableCaptureCustomData,
                  hdrModeForReqcapture:nextProps.initialData.hdrModeForReqcapture,
                  hdrModeForResCapture:nextProps.initialData.hdrModeForResCapture,
                  captureModeReq:nextProps.initialData.captureModeReq,
                  captureModeRes:nextProps.initialData.captureModeRes,
                  hdrValChrReq:nextProps.initialData.hdrValChrReq,
                  multiSelectValue:nextProps.initialData.selectedHdrsValReq,
                  multiSelectValueResp:nextProps.initialData.selectedHdrsValRes,
                  customDataCapturingMethodBlock:nextProps.initialData != null && nextProps.initialData.enableCaptureCustomData?'show':'hidden',
        })

  if(this.props.getAllKeywordData != nextProps.getAllKeywordData){
    this.setState({getAllKeywordData : nextProps.getAllKeywordData,
    });

  }
  if(this.props.sessionType != nextProps.sessionType){
    this.setState({'sessionType':nextProps.sessionType,
                    'showTable':nextProps.sessionType =='specific' ? 'show' : 'hidden'
    })
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
        if(value === '1')
          this.setState({'multiSelectCss':'show',
                           'configDropDownCss':'hidden',
                           'captureModeCss': 'show'
        })
        else if(value === '2')
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

/* This function called on changing value of multi select components i.e list of headers
* for keyowrd captureHTTPReqFullFp
*/
updateSelected(value){
  this.setState({multiSelectValue:value});
}

/* This function called on changing value of multi select components i.e list of headers
*   for keyowrd captureHTTPResFullFp
*/
updateSelectedResp(value){
  this.setState({multiSelectValueResp:value})
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
  if(value === '1')
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
  if(value === '1')
          this.setState({'multiSelectRespCss':'show',
                           'configDropDownRespCss':'hidden',
                           'captureModeRespCss': 'show'
        })
        else if(value === '2')
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
  if(value === '1')
   this.setState({
                  'briefCaptureModeConfigRespCss':'show'})
 else 
   this.setState({
                  'briefCaptureModeConfigRespCss':'hidden'})
}

handleCaptureSessionAttr(event,isInputChecked){
  let captureSessionAttrCss =  isInputChecked ? 'show' : 'hidden';
  this.setState({'enableCaptureSessionAttr':isInputChecked,
                  captureSessionAttrCss:captureSessionAttrCss,
                  specificDivCSS: isInputChecked && this.state.sessionType == 'specific' ? 'show':'hidden'
    })
}

handleSessionTypeChange(event, value){
  console.log("value--",value)
  	let css = value === 'specific' ? 'show' : 'hidden';
    console.log("css---",css)
  	this.setState({'specificDivCSS':css})
}

getProfileName(profileId)
  	{
  		try{
  			let profileData = this.props.homeData[1]
  			                      .value
  			                      .filter(function(obj){return obj.id == profileId });	
  			if(profileData.length != 0)
  			  return profileData[0].name;
  			else
  			  return null;    			
  		}
  		catch(ex)
  		{
  			console.error("error in getting profileId " + ex);
  			return null;
  		}

  	}


  submitForm(formData){
  console.log("formData---",formData)
  let keywordData = Object.assign({},this.props.getAllKeywordData.data);
  let keywordDataList = [];
  
  if(formData.hasOwnProperty('enableCaptureHTTPReqFullFp')){
    var captureHttpFullReqFpVal = modifiedVal.constValCaptureHTTPReqFullFp(formData)
    console.log("captureHttpFullReqFpVal--",captureHttpFullReqFpVal)
    keywordData["captureHTTPReqFullFp"]["value"] = String(captureHttpFullReqFpVal); 
    keywordDataList.push("captureHTTPReqFullFp" + "=" +captureHttpFullReqFpVal)
}
  else{
    keywordData["captureHTTPReqFullFp"]["value"] = formData.captureHTTPReqFullFp
    keywordDataList.push("captureHTTPReqFullFp" + "=" +formData.captureHTTPReqFullFp)
}


  if(formData.hasOwnProperty('enableCaptureHTTPRespFullFp')){
    var captureHttpFullRespFpVal = modifiedVal.constValCaptureHTTPResFullFp(formData)
    console.log("captureHttpFullRespFpVal--",captureHttpFullRespFpVal)
    keywordData["captureHTTPRespFullFp"]["value"] = String(captureHttpFullRespFpVal); 
    keywordDataList.push("captureHTTPRespFullFp" + "=" +captureHttpFullRespFpVal)
}
else{
    keywordData["captureHTTPRespFullFp"]["value"] = formData.captureHTTPRespFullFp;
     keywordDataList.push("captureHTTPRespFullFp" + "=" +formData.captureHTTPRespFullFp)
}

  // keywordData["captureHttpSessionAttr"]["value"] = formData.enableCaptureSessionAttr;
  keywordData["captureCustomData"]["value"] = formData.enableCaptureCustomData;
  this.props.submitKeywordData(keywordData,this.props.profileId);

  /*var data = {'sessionType':formData.sessionType}
  this.props.updateSessionType(this.props.profileId,data)
*/
  this.props.updateCustomCaptureDataFile(this.props.profileId);

  //action for runtime change
  var filePath = this.props.ns_wdir + "/ndprof/conf/" + this.getProfileName(this.props.trModeDetail.profileId) + "/captureCustomData.cd"
		  console.info("filePath", filePath);	
  let value = formData.enableCaptureCustomData ? filePath :'NA' ;
  keywordDataList.push("captureCustomData"+ "=" +value)
   
  triggerRunTimeChanges(this.props.trData, this.props.trModeDetail,keywordDataList); 
 }

 handleCaptureCustomData(event,isInputChecked){
   console.log("val---",isInputChecked)
   console.log("dialogStepper----",this.refs.dialogStepper)
   let customDataCapturingMethodBlockCss = isInputChecked ?'show':'hidden'
   this.setState({enableCaptureCustomData:isInputChecked,
                  customDataCapturingMethodBlock:customDataCapturingMethodBlockCss
    })
 }

 handleOpen(){
   console.log("handleOpen method called")
   this.setState({addMenuDropDownBlock:'show'})
 //  this.props.toggleAddCustomCapture();

 }
 handleOpenAgain(){
   this.props.toggleAddCustomCapture();
 }

 handleSpecificSessionAttr(evt,isInputChecked){
   console.log("handleSpecificSessionAttr method called",isInputChecked)
    let sessionAttrCss = isInputChecked ?'show':'hidden' ;
   // let  showTableCss = !isInputChecked ? 'hidden' :'';
    let  showTableCss = isInputChecked && this.state.sessionType == 'specific' ? 'show' :'hidden';
    this.setState({specificSessionAttrCaptureCustomData:isInputChecked,
                  captureSessionAttrCss:sessionAttrCss,
                  showTable:showTableCss
    })

 }

 handleSessionChange(evt ,val){
   console.log("value----",val)
   console.log("evt--",evt)
    
   	let css = val === 'specific' ? 'show' : 'hidden';
    console.log("css---",css)
  	this.setState({'showTable':css})


    var data = {'sessionType':val}
    this.props.updateSessionType(this.props.profileId,data)

 }
handleHttpReqHdrChkBox(evt,isInputChecked){
  let showTableHttpReqHdrCss = isInputChecked ?'show':'hidden'
  this.setState({httpReqHdrChkBox:isInputChecked,
                showTableHttpReqHdr:showTableHttpReqHdrCss
  })
}

render() {
  const { fields: { enableCaptureHTTPReqFullFp,
                    hdrModeForReqcapture,
                    selectedHdrsValReq,
                    captureModeReq,
                    hdrValChrReq,
                    enableCaptureHTTPRespFullFp,
                    hdrModeForResCapture,
                    selectedHdrsValRes,
                    captureModeRes,
                    hdrValChrRes,
                    enableCaptureSessionAttr,
                    sessionType,
                    enableCaptureCustomData


  }, resetForm, handleSubmit,onSubmit, submitting } = this.props
  
  return (
    <div  >
    <Paper> 
    <form onSubmit={handleSubmit(this.submitForm.bind(this))} >

   {/********************** START OF captureHTTPReqFullFp******************************/}
    <div className = "row" >
    <div className = "col-md-3">
    <Checkbox
    {...enableCaptureHTTPReqFullFp}
    value = "CaptureHTTPReqFullFp"
    checked  = {this.state.enableCaptureHTTPReqFullFp}
    label = "Capture HTTP Request Header"
    onCustomChange={this.handleCaptureHTTPReqFullFp.bind(this)}
    />
    </div> 

    <div className=" col-md-5"  style={{left:300}}>

    <RaisedButton  className = "pull-right"
                      backgroundColor = "#4c8dc9" 
                       label=" SAVE"
                      labelColor="#FFF"
                      type="submit" 
                     labelStyle={{fontSize:12}} 
                    disabled={this.props.profileDisabled}
                     disabledLabelColor="#000" >
          </RaisedButton>
  </div>
    
    </div>

    {/************* subGroup***************/}
<div className = "row col-md-12" style ={{left:'25px'}}>
        
       
       {/******div block for 3rd option "URL with Query Params,Http Method ,Http Headers"*******/}
        <div className = {this.state.enableCaptureHTTPReqFullFp ?'show':'hidden'} style = {{}}>
          
          <div className = "row">
            <div className='col-md-3' style = {{position:'relative',left:'2px'}}>
                <DropDownComponent 
                {...hdrModeForReqcapture}
                data = {dataForhdrTypeDropDown}
                onChangeOption = {this.handleHdrModeReqChange.bind(this)}
                defaultValue = {this.state.hdrModeForReqcapture}
                floatingLabelText = " Header Mode"
                />
            </div>

        {/*******div block  when "Specified headers" is selected**********/}

          <div className ={`col-md-4 ${this.state.multiSelectCss}`}  style = {{'width':430,'paddingTop':24}}>
          <MultiSelect multi
              {...selectedHdrsValReq}
            name ="SelectdHttpHdrs"
            value = {this.state.multiSelectValue} 
            options = {reqHdrList} 
            onCustomChange = {this.updateSelected.bind(this)}
            />
        </div>


          
      </div>
   

      <div className = {`row ${this.state.captureModeCss}`} style = {{'paddingLeft':-3}}>
        <div className = "col-md-3">
                <DropDownComponent 
                {...captureModeReq}
                data = {dataForCaptureDropDown}
                defaultValue = {this.state.captureModeReq}
                onChangeOption = {this.handleCaptureModeReqChange.bind(this)}
                floatingLabelText = "Select Capture Mode"
                />
      </div>
    
        <div className = {`col-md-3 ${this.state.briefCaptureModeConfigReq}`}>
        <TextField
                  floatingLabelText="Limit for header values "
                  {...hdrValChrReq}
                />
        </div>
      </div>


  </div>
        {/*************END *************/}
    
    </div>



  {/***********************START OF captureHTTPRespFullFp************************/}
     <div className = "row" >
     <div className="col-md-3">
      <Checkbox
        {...enableCaptureHTTPRespFullFp}
        value = "CaptureHTTPResFullFp"
        checked  = {this.state.enableCaptureHTTPResFullFp}
        label = "Capture HTTP Response Header"
        onCustomChange={this.handleCaptureHTTPResFullFp.bind(this)}
      />
  
    </div>
      
     </div>

    {/************* subGroup***************/}
      
      <div className = "row col-md-10" style ={{left:'25px'}}>
       
       {/******START of div block when 2nd radio button is selected*******/}
        <div className = {this.state.enableCaptureHTTPResFullFp ? 'show' :'hidden'} style = {{'paddingLeft':0}}>
          <div className = "row">
            <div className='col-md-3' >
               <DropDownComponent 
                {...hdrModeForResCapture}
                data = {dataForhdrTypeDropDown}
                onChangeOption = {this.handleHdrModeResChange.bind(this)}
                defaultValue={this.state.hdrModeForResCapture}
                floatingLabelText = 'Select Header Type'
                />
            </div>

        {/*******div block  when "Specified headers" is selected**********/}

          <div className ={`col-md-4 ${this.state.multiSelectRespCss}`}  style = {{'width':430,'paddingTop':24}}>
          <MultiSelect multi
              {...selectedHdrsValRes}
            name ="SelectdHttpHdrs"
            value = {this.state.multiSelectValueResp} 
            options = {resHdrList} 
            onCustomChange = {this.updateSelectedResp.bind(this)}
            />
        </div>
      </div>
   

      <div className = {`row ${this.state.captureModeCss}`} style = {{'paddingLeft':5}}>
        <div className = "col-md-3">
                 <DropDownComponent 
                {...captureModeRes}
                data = {dataForCaptureDropDown}
                onChangeOption = {this.handleCaptureModeResChange.bind(this)}
                floatingLabelText = "Select Capture Mode"
                defaultValue = {this.state.captureModeRes}
                />
      </div>
      <div className = {`col-md-3 ${this.state.briefCaptureModeConfigRespCss}`}>
        <TextField
                  floatingLabelText="Limit for header values "
                  {...hdrValChrRes}
                />
      </div>
      </div>

  </div>
        {/*************END *************/}
    
    </div>
{/*********************END OF captureHTTPRespFullFp*****************/}

{/***********CAPTURESESSIONATTRIBUTE**********/}
{/*  <div className = "row  col-md-10">
    <Checkbox
    {...enableCaptureSessionAttr}
    value = "CaptureSessionAttr"
    checked  = {this.state.enableCaptureSessionAttr}
    label = "Capture Session Attribute"
    onCustomChange={this.handleCaptureSessionAttr.bind(this)}
    />

  </div>
 <div className = {`row ${this.state.captureSessionAttrCss}`}>
    <div className = " col-md-8" >
        <RadioButtonGroup 
          {...sessionType}
          name = "sessionType" 
          defaultSelected={this.state.sessionType}
          onCustomChange={this.handleSessionTypeChange.bind(this)}
          >
        <RadioButton
            value="all"
            label="All"  
        />
        <RadioButton
            value="specific"
            label="Specific"  
        />
        </RadioButtonGroup>
          <div style={{color:'red',fontSize:'14'}}> {sessionType.touched && sessionType.error && <div>{sessionType.error}</div>}</div>
      </div>
      </div>

    <div className ={this.state.specificDivCSS}>
      <div className="row col-md-8">
      <SessionAttr profileId={this.props.profileId} /> 
      </div>
    </div>
    */}

    {/**********START OF CAPTURE CUSTOM DATA CAPTURING **************/}

      <div className = "row  ">
        <div className = "col-md-5">
          <Checkbox
          {...enableCaptureCustomData}
          value = "CaptureCustomData"
          checked  = {this.state.enableCaptureCustomData}
          label = "Capture Custom Data"
          labelStyle = {{width:200}}
          onCustomChange={this.handleCaptureCustomData.bind(this)}
          />
       </div>

         <div className ={`col-md-2 ${this.state.customDataCapturingMethodBlock}`} style = {{top:'-5px'}}>
{/* <IconButton  tooltip="Add" onTouchTap={this.handleOpen.bind(this)}><FontIcon  color="#FFF"  className="material-icons">playlist_add</FontIcon></IconButton>*/}
            <IconButton  tooltip="Add" onTouchTap={this.handleOpenAgain.bind(this)}><FontIcon  color="#87CEFA"  className="material-icons">playlist_add</FontIcon></IconButton>

        </div>

    {/*    <div className = {`col-md-3 ${this.state.addMenuDropDownBlock}`} style = {{'width':1000,'left':26,'top':-40}}>
          <MultiSelectCapturingMenu />
        </div> 
*/} 

  <div style={{left: '25px',position:'relative'}} className = {this.state.customDataCapturingMethodBlock}>
     
     <div className = {`row col-md-8 ${this.state.customDataCapturingMethodBlock}`} style = {{paddingLeft:'10px'}}>
        <MethodBasedCaptureCustomData profileId={this.props.profileId} />
     </div>

  {/*<i style={{ paddingLeft: 40 }}>From Specific Session Attribute</i>*/}

{/****************** Session Attribute Capturing *****************/}
      <div className = "row col-md-8" style = {{paddingLeft:'21px'}}>
         
          <div className="row col-md-4">
               <CheckboxWithoutWrapper
                value = "Specific Session Attr Capturing"
                checked  = {this.state.specificSessionAttrCaptureCustomData}
                label = "From Session Attribute"
                onCheck={this.handleSpecificSessionAttr.bind(this)}
         />

          </div>


           <div className = {`row ${this.state.captureSessionAttrCss}`} style={{paddingLeft:200}}>
            <div className = " col-md-4" >
                <RadioButtonGroup
                  defaultSelected={this.state.sessionType}
                  onCustomChange={this.handleSessionChange.bind(this)}
                  >
                <RadioButton
                    value="all"
                    label="All"  
                />
                <RadioButton
                    value="specific"
                    label="Specific"  
                />
                </RadioButtonGroup>
              </div>
              </div>
 
         
             
          <div className = {`row col-md-8 ${this.state.showTable}`}>
            <SessionAttrBasedCapturingCustomData profileId={this.props.profileId} />
         </div>
     </div>


     {/********************HTTP REQ HDR CAPTURING****************************/}

         <div className = "row col-md-8" style = {{paddingLeft:'21px'}}>
         
          <div className="row col-md-6">
               <CheckboxWithoutWrapper
                value = "Http Request Header"
                checked  = {this.state.httpReqHdrChkBox}
                label = "From Http Request Header"
                onCheck={this.handleHttpReqHdrChkBox.bind(this)}
         />

          </div>

          <div className = {`row col-md-8 ${this.state.showTableHttpReqHdr}`}>
            <HttpReqHdr profileId={this.props.profileId} />
         </div>
     </div>
    </div>

     <DialogCaptureCustomData profileId = {this.props.profileId} />
     </div>
    {/*<DialogStepper profileId = {this.props.profileId} />*/}
      </form>
    </Paper>
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
  validate

},
  state => ({ // mapStateToProps
    initialData :state.Keywords.initializeKeywords.fpHdrInitializeObj,
    getAllKeywordData :state.Keywords,
    initialValues :state.Keywords.initializeKeywords.fpHdrInitializeObj,
    trData : state.initialData.trData,
    trModeDetail: state.trModeDetail,
    ns_wdir: state.initialData.ns_wdir,
    sessionType : state.sessionAttrMonitor.sessionType,
    profileDisabled: state.profileDisabled.disabled,
    homeData: state.initialData.homeData
    
  }),
  
  { 
   submitKeywordData:submitKeywordData,
   initializeInstrException:initializeInstrException,
   updateSessionType :updateSessionType ,
   toggleAddCustomCapture:toggleAddCustomCapture,
   clearStepperData:clearStepperData,
   updateCustomCaptureDataFile :updateCustomCaptureDataFile 
 } // mapDispatchToProps (will bind action creator to dispatch)
 )(Form_EnableFpCapturing);