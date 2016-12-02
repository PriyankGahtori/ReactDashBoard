//Importing React components
import React,{PropTypes} from 'react';
import { reduxForm } from 'redux-form';
import RadioButton from 'material-ui/RadioButton';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Card} from 'material-ui/Card';

//Importing React components
import {initializeBTFields,addBTData,triggerLoader}  from '../../../../actions/index';
import RadioButtonGroup from '../../../../components/RadioButtonGroupWrapper';
import SelectField from '../../../../components/SelectFieldWrapper';
import Checkbox from '../../../../components/CheckboxWrapper';

export const fields = ["uriType","segmentType","segmentValue","slowTransaction","verySlowTransaction","dynamicReqType","dynamicReqValue","requestParam","httpMethod","requestHeader"];

class GlobalBusinessTransaction extends React.Component {

  constructor(props) {
    super(props);
    this.state={
    	'segmentDivCSS' : 'show',
    	'dynamicReqType' : false,
    	'paramDiv' : true, 
  		'methodDiv': false,
  		'headerDiv': false,
      'uriType':"segment"    	
    }
    this.loader = this.loader.bind(this)
  }

 componentWillMount() {
     this.props.triggerLoader(true,null);
     this.props.initializeBTFields(this.props.params.profileId,this.loader);
  }

 componentWillReceiveProps(nextProps){
  if(null != nextProps.initialData){

      if(this.props.initialData != nextProps.initialData){
        let data = nextProps.initialData ; 
        this.setState({
           "segmentDivCSS" : data.uriType === "segment" ? "show" : "hidden",
           "dynamicReqType" : data.dynamicReqType,
           "paramDiv" : data.dynamicReqValue === "requestParam" ? true :false,
           "methodDiv" : data.dynamicReqValue === "httpMethod" ? true :false,
           "headerDiv" : data.dynamicReqValue === "requestHeader" ? true :false
         })
      }
    if(this.props.initialData.uriType != nextProps.initialData.uriType)
      {
        this.setState({"uriType": nextProps.initialData.uriType})
      }
 }
}
loader(){
// var message = {'title': ' BT Global Loaded' , 'msg' : '' }
  this.props.triggerLoader(false,null)
}
  handleURITypeChange(event, value){
  	//show and hidden are bootstrap CSS to show and hide
  	let css = value === 'segment' ? 'show' : 'hidden';
  	this.setState({'segmentDivCSS':css})
  }

  handleDReqCheckboxChange(event,value){
  	this.setState({'dynamicReqType': value})	
  }

  handleDReqRadioChange(event,value){
  	let paramDiv  = value === "requestParam";
  	let methodDiv = value === "httpMethod";
  	let headerDiv = value === "requestHeader";
  	this.setState({'paramDiv': paramDiv,
  					'methodDiv': methodDiv, 
  					'headerDiv':headerDiv 
  				  });	
  	
  }

  submit(data){
    data = JSON.stringify(data);
    this.props.addBTData(data,this.props.params.profileId);       
}

  render() {

  	const {
      fields: {uriType, segmentType, segmentValue,slowTransaction,verySlowTransaction, dynamicReqType,dynamicReqValue,requestParam, httpMethod, requestHeader},
      handleSubmit,
      resetForm,
      submitting
      } = this.props;

    return (

    <form onSubmit ={handleSubmit(this.submit.bind(this)) }>
       <Card style={{ 'marginTop': 4 ,'paddingLeft':5}}>
       <div style={{'paddingTop':12}}>
      	<h4>Select part of URI used in Transaction name</h4>
      </div>
     
	  <RadioButtonGroup 
	  		{...uriType}
	  		name = "uriType" 
	  		defaultSelected={this.state.uriType}
	  		onCustomChange={this.handleURITypeChange.bind(this) }
          
	  		>
       <RadioButton
          value="complete"
          label="Complete"  
                      
       />
       <RadioButton
          value="segment"
          label="Segment of URI"  
                
       />

      </RadioButtonGroup>



   <div className={`row ${this.state.segmentDivCSS}`} style={{'marginLeft':40}} enabled={false}>
		<SelectField value={"first"} {...segmentType} >
          <MenuItem value={"first"} primaryText="First" />
          <MenuItem value={"last"} primaryText="Last" />
          <MenuItem value={"segNo"} primaryText="Segment Number" />
        </SelectField>
        <TextField      	 
          {...segmentValue}	 
          floatingLabelText="Segments of URI in Transaction"
        />        
      </div>

      <div className="col-md-12" style={{paddingLeft:40}} >
         <TextField        
            {...slowTransaction}  
            floatingLabelText="Slow Transaction Threshold (ms)"
          /> 

           <TextField        
            {...verySlowTransaction}  
            floatingLabelText="Very Slow Transaction Threshold (ms)"
          />  
      </div>

{/*---------------------Dynamic Request Type--------------------------*/}

<div style={{'marginTop':30, 'marginBottom':30}}>
	 <Checkbox
 	  {...dynamicReqType}
      value="dynamicReq"
      label="Choose Dynamic Request type "
      labelStyle={{"fontSize":16,"fontWeight":0}}           
      onCustomChange={this.handleDReqCheckboxChange.bind(this)}
      checked={this.state.dynamicReqType}              
     />

  {/*------------Radio Button Group---------------*/}

     <div className='row' style={{paddingLeft:40}} >
     
     <RadioButtonGroup
     	{...dynamicReqValue} 
  		className={'col-xs-2 col-md-2'} 
  		style={{display: 'flex'}}  		
  		name="requestType" 
  		defaultSelected={dynamicReqValue.initialValue}
  		onCustomChange={this.handleDReqRadioChange.bind(this)}
	  >
       <RadioButton
          value="requestParam"
          label="Parameter"
          disabled={!this.state.dynamicReqType} />
       <RadioButton
          value="httpMethod"
          label="Method"
          disabled={!this.state.dynamicReqType}  />
       <RadioButton
          value="requestHeader"
          label="Header"
          disabled={!this.state.dynamicReqType}          
       />
     </RadioButtonGroup>
     </div>

  {/*------------Dynamic Request Type Div---------------*/}

  	<div style={{paddingLeft:40,paddingTop:5}}  className={this.state.dynamicReqType === true ? 'show' :'hidden'}>
		<div className={this.state.paramDiv === true ? 'show' :'hidden'}>
			<TextField      	  
          		floatingLabelText="Parameter Name"
          		{...requestParam}
        	/>
		</div>
		<div  className={this.state.methodDiv === true ? 'show' :'hidden'}>
			<p >Use the request method (GET/POST/PUT) in Transaction names.</p>
		</div>
		
		<div className={this.state.headerDiv === true ? 'show' :'hidden'}>
			<TextField
				{...requestHeader}      	  
          		floatingLabelText="Header Name"
        	/>
		</div>
  	</div>   

	</div> 	
      
		
		<div>
         <RaisedButton type="submit" disabled={submitting}>
                     {submitting ? <i/> : <i/>} Submit
          </RaisedButton>


        </div>  
        </Card>
    </form>  
    );
  }
}

GlobalBusinessTransaction.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
}

export default reduxForm({
  form: 'globalBT',
  fields
},
  state => ({ // mapStateToProps
  initialValues:state.BTGlobal.btGlobalInitialize, //used by redux-form
  initialData:state.BTGlobal.btGlobalInitialize // for initializing state
}),
  { 
   initializeBTFields : initializeBTFields,
   addBTData          : addBTData,
   triggerLoader      : triggerLoader,
 } // mapDispatchToProps (will bind action creator to dispatch)
)(GlobalBusinessTransaction);