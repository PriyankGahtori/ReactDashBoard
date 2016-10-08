import React,{PropTypes} from 'react';
import Checkbox from '../components/CheckboxWrapper';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {submitKeywordData,initializeInstrException}  from '../actions/index';
import { reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';
import RadioButton from 'material-ui/RadioButton';
import RadioButtonGroup from '../components/RadioButtonGroupWrapper';
import RaisedButton  from 'material-ui/RaisedButton';

export const fields = ['enable','enableCaptureExcepStackTrace','stackTraceDepthValue','exceptionType'];


 class InstrExceptionKeyword extends React.Component {

  constructor(props) {
    super(props);
    this.state ={
                'exceptionConfDivCss' :'hidden',
                'stackTraceDepthValueCss':'hidden',
                'enableCaptureExceptCheckBox':false,
                'exceptionType':"unhandledException"

    }
  }
  componentWillMount() {
    this.props.initializeInstrException();
  }

  componentWillReceiveProps(nextProps)
  {
    console.log("nextprops---",nextProps.getAllKeywordData)
    
    if(this.props.getAllKeywordData != nextProps.getAllKeywordData){
      this.setState({getAllKeywordData : nextProps.getAllKeywordData,
      });
    }

   
   
   if(null != nextProps.initialData ){
    console.log("in next props")
    if(this.props.initialData!= nextProps.initialData){
      var data = nextProps.initialData;
       this.setState({enableCaptureExceptCheckBox:data.enable,
                      captureExceptStackTraceCheckBox:data.enableCaptureExcepStackTrace,
                      exceptionType:data.exceptionType,
                      stackTraceDepthValue:data.stackTraceDepthValue
                    })

       console.log("enableCaptureExceptCheckBox--",this.state.enableCaptureExceptCheckBox)
       console.log("captureExceptStackTraceCheckBox--",this.state.captureExceptStackTraceCheckBox)
    }
  }
}
  
  handleChangeExceptionType(event,value){
    console.log("value - ",value)
    /*this.setState({'exceptionType': value

          })  */
  }

  handleCaptureExceptCheckboxChange(event,value){
    console.log("value---catureexcptuon change",value)
    let css = value === true ? 'show' :'hidden';
    /*this.setState({exceptionConfDivCss:css,
                    enableCaptureExceptCheckBox:value
    })*/
    this.setState({ enableCaptureExceptCheckBox:value
    })
    console.log("aftr setting--",this.state.exceptionConfDivCss)  
  }

  handleExceptStackTrace(event,value){
    console.log("value---handleExceptStackTrace change",value)
     this.setState({
                   captureExceptStackTraceCheckBox:value
    })
    console.log("aftr setting--",this.state.exceptionConfDivCss)  
  }

  submit(formData){
    let keywordData = Object.assign({},this.props.getAllKeywordData.data);
    var instrVal;

    console.log("keywordData-in instrException-",keywordData)
    console.log("formData---",formData)
    
    /*
    * final data is data that is fetched from server and its value is updated according to user input,
    * Final data object contains all the keywords  .
    *  modifying formdata in order to form key value as:
    *   instrException = 1%200%201%96
    */

     if(formData.enable === "false" && formData.enable === false){
        instrVal = "0";
      }
      else{
           instrVal = "1";

           if(formData.enableCaptureExcepStackTrace === "true" || formData.enableCaptureExcepStackTrace === true)
                instrVal = instrVal+"%201";
            else
              instrVal = instrVal+"%200";

            if(formData.exceptionType == 'handledException')
              instrVal = instrVal+"%201";
            else
              instrVal = instrVal+"%200"

            if(formData.enableCaptureExcepStackTrace === "true" || formData.enableCaptureExcepStackTrace === true)
              instrVal = instrVal+"%20"+formData.stackTraceDepthValue;
      }
      console.log("instrVal--",instrVal)      
      var instrExcepData ={instrExceptions:instrVal};
      keywordData.instrExceptions["value"] = instrVal;

   /* let finalFormData = _.forEach(formData,function(value,key){
      if(value === "true" ||  value === true){
        value = "1" ;
      }
      else if(value === "false" || value === false){
        value = "0" ;
      }
      console.log("key---",key)
      console.log("value for boolean values---",value)
      


      // keywordData[key]["value"] = String(value); 
      
    }) ;*/
    console.log("finalFormData---",keywordData)
    this.props.submitKeywordData(keywordData,this.props.profileId,"instrException"); 
 
  }
  handleChangeStackTraceValue(value)
  {
    console.log("handleChangeStackTraceValue--",value)
    this.setState({stackTraceDepthValue:value})
  }

   handleChange (event){
    console.log("value---",event.target.value)
    this.setState({
      value: event.target.value,
    });
  };


  render() {
    const { fields: {enable,enableCaptureExcepStackTrace,stackTraceDepthValue,exceptionType}, resetForm, handleSubmit,onSubmit, submitting } = this.props
    return (
      <div className ="row" style={{'paddingLeft':29}}>
        <form onSubmit ={handleSubmit(this.submit.bind(this))}>
        <div className = "row">
         <Checkbox
         {...enable}
                  value = "captureException"
                  label = "Capture Exception"
                  checked  = {this.state.enableCaptureExceptCheckBox}
                  onCustomChange={this.handleCaptureExceptCheckboxChange.bind(this)}
              />

        </div>

        
        <div className ={this.state.enableCaptureExceptCheckBox ? 'show' :'hidden'} style ={{'paddingLeft':35,'paddingTop':-6}}>
          

            <div className = "row ">
             <p style ={{'fontSize':15}}><b>Exception related Configuration</b></p>
              <div className = "col-md-6">
                 <Checkbox
                 {...enableCaptureExcepStackTrace}
                          value = "captureExceptionStackTrace"
                          label = "Capture Exception Stack Trace"
                          checked  = {this.state.captureExceptStackTraceCheckBox}
                          onCustomChange={this.handleExceptStackTrace.bind(this)}
                      />
            </div>
            </div>


            <div className ={`row ${this.state.captureExceptStackTraceCheckBox? 'show' :'hidden'}`} style ={{'paddingTop':-15,'paddingLeft':17}}>
              <TextField
                      hintText="Hint Text"
                      floatingLabelText="AS Sample Interval For Stack Trace"
                      defaultValue={this.state.stackTraceDepthValue}
                      onChange={this.handleChange}

                      {...stackTraceDepthValue}
                    />
            </div>
           

            <div className = "row ">
              <RadioButtonGroup 
              {...exceptionType}
              className={'col-xs-3 col-md-4'} 
              style={{display: 'flex'}}  
              name = "exceptionType" 
              defaultSelected={this.props.initialData.exceptionType.toString()}
             // defaultSelected="handledException"
              onCustomChange={this.handleChangeExceptionType.bind(this)}
              >
                 
                 <RadioButton
                    value="unhandledException"  
                    label="Capture Unhandled Exception" 
                 />
                 <RadioButton
                    value="handledException"
                    label="Capture handled Exceptions"          
                 />

          </RadioButtonGroup>
        </div>
  

        
      <div>
          <RaisedButton  label="submit" type="submit" disabled={submitting}>
                     {submitting ? <i/> : <i/>} 
          </RaisedButton >
        </div>  

        </div>
        </form>
      </div>

    );
  }
}
InstrExceptionKeyword.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
}

export default reduxForm({
  form: 'InstrExceptionKeyword',
  fields,

},
  state => ({ // mapStateToProps
  initialData :state.Keywords.initializeKeywords.instrExceptionObj,
  getAllKeywordData :state.Keywords,
  //initialValues :state.Keywords.initializeKeywords.instrExceptionObj
}),
  
  { 
   submitKeywordData:submitKeywordData,
   initializeInstrException:initializeInstrException
 } // mapDispatchToProps (will bind action creator to dispatch)
)(InstrExceptionKeyword);