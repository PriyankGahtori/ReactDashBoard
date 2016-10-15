import React,{PropTypes} from 'react';
import Checkbox from '../components/CheckboxWrapper';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {submitKeywordData,initializeInstrException}  from '../actions/index';
import { reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';
import RadioButton from 'material-ui/RadioButton';
import RadioButtonGroup from '../components/RadioButtonGroupWrapper';
import FlatButton  from 'material-ui/FlatButton';
import ConfirmDialog from 'material-ui/Dialog';
export const fields = [ 'fromRange','toRange','isCpuHogg','isAutoInstrument','fqm'];

 class PutDelayInMethod extends React.Component {
 
  constructor(props) {
    super(props);
    this.state = {putDelayInMethod:false}
  }
   componentWillReceiveProps(nextProps)
  {
    console.log("nextprops--putDeolayinmrthod-",nextProps.initialData)
    
    if(this.props.initialData != nextProps.initialData){
      console.log("nextProps.initialData != 0---",nextProps.initialData != 0)
      if(nextProps.initialData != 0)
      this.setState({putDelayInMethod : true
      });
    }
}
  handlePutDelayInMethod(event,isInputChecked){
  	console.log("isInputChecked----",isInputChecked)
    if(isInputChecked === "false" || isInputChecked === false)
      this.setState({openCnfrmDisbleDialog:true})
  	// this.setState({putDelayInMethod:isInputChecked})
    else
       this.setState({putDelayInMethod : true})
    
  }
  handleCancelDisable(){
     this.setState({putDelayInMethod:true,
                    openCnfrmDisbleDialog:false
     })
  }

  cnfrmDisable(){
    let keywordData = Object.assign({},this.props.getAllKeywordData.data);
    keywordData["putDelayInMethod"]["value"] = 0 ;
    this.props.submitKeywordData(keywordData,this.props.profileId); 
    this.setState({putDelayInMethod:false,
                    openCnfrmDisbleDialog:false
    })

  }
  submit(formData){
  	let keywordData = Object.assign({},this.props.getAllKeywordData.data);
    console.log("keywordData in putDelayInMethod--",putDelayInMethod)
    var putDelayInMethod;

    console.log("keywordData-in instrException-",keywordData)
    console.log("formData---",formData)
    
    
    /*
    * final data is data that is fetched from server and its value is updated according to user input,
    * Final data object contains all the keywords  .
    *  modifying formdata in order to form key value as:
    *   putDelayInMethod = 5:20:0:1%20fqm for putDelayInMethod keyword
    */

    putDelayInMethod = formData.fromRange+":";

    /*if user does not entr the value of toRange,then
    * toRange = fromRange
    */

    if(formData.toRange == null)
      putDelayInMethod = putDelayInMethod +formData.fromRange+":";
    else
      putDelayInMethod = putDelayInMethod +formData.toRange+":";

    if(formData.isCpuHogg === "true" || formData.isCpuHogg === true)
      putDelayInMethod = putDelayInMethod +1+":";
    else
      putDelayInMethod = putDelayInMethod +0+":";

    if(formData.isAutoInstrument === "true" || formData.isAutoInstrument === true)
      putDelayInMethod = putDelayInMethod +1;
    else
      putDelayInMethod = putDelayInMethod +0;

    if(formData.fqm != null)
      putDelayInMethod = putDelayInMethod +"%20"+formData.fqm;
           
      console.log("putDelayInMethod finaly appended--",putDelayInMethod)      
      keywordData.putDelayInMethod["value"] = putDelayInMethod;

    console.log("finalFormData---",keywordData)
//  this.props.submitKeywordData(keywordData,this.props.profileId,"instrException"); 
    this.props.submitKeywordData(keywordData,this.props.profileId); 

  }

  render() {
  	const { fields: {fromRange,toRange,isCpuHogg,isAutoInstrument,fqm}, resetForm, handleSubmit,onSubmit, submitting } = this.props
    const actions =[
        <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleCancelDisable.bind(this)}
      />,
      <FlatButton
        label="OK"
        primary={true}
        keyboardFocused={true}
        onClick={this.cnfrmDisable.bind(this)}
      />
]
    return (
      <div >
    	  <form onSubmit ={handleSubmit(this.submit.bind(this))} >
    		<div className = {this.state.putDelayInMethod? 'show' :'hidden'}>
    		

    		<div className = "row" style={{'paddingBottom':7,'paddingTop':0}}>
	    		<div className = "col-md-3">
		    		<TextField
	                  hintText="Hint Text"
	                  floatingLabelText="From Range(in ms)"
	                  {...fromRange}
	                />
	            
	    		</div>

	    		<div className = "col-md-3">
	    			<TextField
                  hintText="Hint Text"
                  floatingLabelText="To Range(in ms)"
                  {...toRange}
                />
	    		</div>

	    		<div className = "col-md-3">
	    		<TextField
                  hintText="Hint Text"
                  floatingLabelText="Enter FQM"
                  {...fqm}
                />
	   	 		</div>
	    	</div>
    		
    		<div className = "row">
	    		<div className = "col-md-3">
	    			 <Checkbox
	             	 {...isCpuHogg}
	              	value="isCpuHogg"
	              	label="Is Cpu Hogg"
	            	/>
	    		</div>

	    		<div className ="col-md-3">
	    			 <Checkbox
	             	 {...isAutoInstrument}
	              	value="isAutoInstrument"
	              	label="Is Auto Instrument"
	            	/>
	    		</div>

	    	</div>

	    	<div>
	          <FlatButton  label="submit" type="submit" disabled={submitting}>
	                     {submitting ? <i/> : <i/>} 
	          </FlatButton >
       		</div>  

	   </div>
      </form>
       <ConfirmDialog
          title="Are you sure want to disable the keyword 'PutDelayInMethod'?"
          actions={actions}
          modal={false}
          open={this.state.openCnfrmDisbleDialog}
        >
        </ConfirmDialog>
      </div>
    );
  }
}
PutDelayInMethod.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
}

export default reduxForm({
  form: 'PutDelayInMethod',
  fields
},
  state => ({ // mapStateToProps
  getAllKeywordData :state.Keywords,
  initialData :state.Keywords.initializeKeywords.putDelayInMethodObj,
  initialValues :state.Keywords.initializeKeywords.putDelayInMethodObj
}),
 
)(PutDelayInMethod);