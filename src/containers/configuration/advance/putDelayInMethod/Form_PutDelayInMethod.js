//Importing React components
import React,{PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';
import RadioButton from 'material-ui/RadioButton';
import FlatButton  from 'material-ui/FlatButton';
import ConfirmDialog from 'material-ui/Dialog';

//Importing files
import Checkbox from '../../../../components/CheckboxWrapper';
import {submitKeywordData,initializeInstrException}  from '../../../../actions/index';
import RadioButtonGroup from '../../../../components/RadioButtonGroupWrapper';

export const fields = [ 'fromRange','toRange','isCpuHogg','isAutoInstrument','fqm'];

class Form_PutDelayInMethod extends React.Component {
 
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
 
  render() {
  	const { fields: {fromRange,toRange,isCpuHogg,isAutoInstrument,fqm}, resetForm, handleSubmit,onSubmit, submitting } = this.props
   
    return (
      <div >
    	  <form>
       
         <p style={{paddingTop:10}}> Delay Time Range(in ms)  </p>
      
    		<div className = "row">
	    		<div className = "col-md-6" style={{bottom:20}}>
		    		<TextField 
	                  hintText="Hint Text"
	                  floatingLabelText="From"
	                  {...fromRange}
	                />
	    		</div>

	    		<div className = "col-md-6" style={{bottom:20}}>
	    			<TextField
                  hintText="Hint Text"
                  floatingLabelText="to"
                  {...toRange}
                />
	    		</div>
            </div>
  	    		<div className = "col-md-12"  >
  	    		<TextField
                    style={{right:18,bottom:20}}
                    hintText="Hint Text"
                    floatingLabelText="Fully qualified method name"
                    {...fqm}
                  />
  	    
          </div>
    	
    		<div className = "row">
	    		<div className = "col-md-6">
	    			 <Checkbox
                label="is CPU Hogg"
	             	 {...isCpuHogg}
	              	value="isCpuHogg"	/>
         
             <p style={{paddingLeft:35}}> (Add delay in any specified method using instrumentation)</p>
	    		</div>
         <div className="row" > 
	    		<div className ="col-md-6" >
	    			 <Checkbox 
                  label="is Auto Instrument"
	             	 {...isAutoInstrument}
	              	value="isAutoInstrument"	/>
             
                <p style={{paddingLeft:35}}>(Forcefully putDelay by auto-instrumenting the method if not mentioned in instrProfiles)</p>
	    		</div>
          </div>
	    	</div>
      </form>
      
      </div>
    );
  }
}
Form_PutDelayInMethod.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
}

export default reduxForm({
  form: 'putDelayInMethodForm',
  fields
},
  state => ({ // mapStateToProps
  getAllKeywordData :state.Keywords,
  initialData :state.Keywords.initializeKeywords.putDelayInMethodObj,
  initialValues :state.Keywords.initializeKeywords.putDelayInMethodObj
}),
 
)(Form_PutDelayInMethod);