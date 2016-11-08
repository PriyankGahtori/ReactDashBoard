//Importing React components
import React, { PropTypes } from 'react'
import {reduxForm} from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import Is from 'is_js';
import {List, ListItem} from 'material-ui/List';
import ContentSend from 'material-ui/svg-icons/content/send';

//Importing files
import {ListOfGroupNames} from '../../../../actions/index';
import Checkbox from '../../../../components/CheckboxWrapper';
import DropDownMenu from '../../../../components/SelectFieldWrapper';
import Toggle from '../../../../components/ToggleWrapper';


export const fields = ['btName','matchType','urlName','include','slowTransaction','verySlowTransaction','reqParamKey','reqParamValue','reqMethod','reqHeaderKey','reqHeaderValue' ]
             
 const validate = values=> {
  const errors = {}

  if(!values.btName) 
     errors.btName = 'Required'

  else if (values.btName.length > 50) 
    errors.btName = "Must be 50 characters or less"
  

  if(!values.slowTransaction) 
    errors.slowTransaction = 'Required'

   else if (isNaN(values.slowTransaction))
    errors.slowTransaction = 'Please Enter Only Numbers'

   if(!values.verySlowTransaction) 
    errors.verySlowTransaction = 'Required'

   else if (isNaN(values.verySlowTransaction))
    errors.verySlowTransaction = 'Please Enter Only Numbers'

    if(!values.urlName) 
    errors.urlName = 'Required'

   else if (values.urlName.length > 300) 
    errors.urlName = 'Must be 300 characters or less'

    if(!values.matchType) 
    errors.matchType = 'Required'

  return errors
 }
const styles = {
   error:{
    fontSize: 12,
    color: 'red' 
  },
  block: {
    maxWidth: 250,
    paddingBottom:5
  },
   toggle: {
      marginTop:30 ,
      paddingLeft:80
  },
  customWidth: {
      width: 200
    },
  checkbox: {
    marginBottom: 16,
    paddingTop:35
  }
};


class Form_BTPattern extends React.Component {

  constructor(props) {
  super(props);
  this.handleChange=this.handleChange.bind(this);
  this.state ={enable:false}
  this.state ={'dynamicReqDiv' : false}
  this.state ={BTPattern:null}
  }

handleChange(event,index,value){  

}

  componentWillMount() {
  }

handleCheck(event,value)
{
  console.log("inside check value - ",value)
  this.setState({'dynamicReqDiv': value})  
}

  render() {
     const { fields: {btName,include,matchType,urlName,slowTransaction,verySlowTransaction,reqParamKey,reqParamValue,reqMethod,reqHeaderKey,reqHeaderValue}, resetForm, handleSubmit,onSubmit, submitting} = this.props
  return (
    <form>
    <div className ="row">
        <div className ="col-md-8">
          <TextField
              // hintText="Hint Text"
               floatingLabelText="Bussiness Transaction Name"
               {...btName}
               errorText={btName.touched && btName.error && <div>{btName.error}</div>}/>   

          
       </div>
         <div className ="col-md-4">
         <Checkbox
         style={styles.checkbox}
         label="Include"
         {...include}
        />
      </div>
  </div>

    <div className ="row">
      <div className ="col-md-4">
          <DropDownMenu
            value={this.state.value}
            onChange={this.handleChange}
            style={styles.customWidth}
            autoWidth={false}
            floatingLabelText="Select type"
            {...matchType}
          >
            <MenuItem value={"Exact Match"} primaryText="Exact Match" />
            <MenuItem value={"Starts With"} primaryText="Starts With" />
          </DropDownMenu>
          <div style={styles.error}>  {matchType.touched && matchType.error && <div>{matchType.error} </div> } </div>

      </div>
      <div className ="col-md-6">
         <TextField
        // hintText="Hint Text"
         floatingLabelText="URL"
         {...urlName}
          errorText={urlName.touched && urlName.error && <div>{urlName.error}</div>}/>   
        </div>
    
     </div>

     <div className ="row">
        <div className="col-md-6">
         <TextField        
            {...slowTransaction}  
            floatingLabelText="Slow Transaction Threshold (ms)"
            errorText={slowTransaction.touched && slowTransaction.error && <div>{slowTransaction.error}</div>}/>   

         </div>
         <div className="col-md-6">
           <TextField        
            {...verySlowTransaction}  
            floatingLabelText="Very Slow Transaction Threshold (ms)"
            errorText={verySlowTransaction.touched && verySlowTransaction.error && <div>{verySlowTransaction.error}</div>}/>   
       
      </div>


     </div>
     
     <div className="row">
      <Checkbox
           style={styles.checkbox}
           label="Dynamic part Request"
          
           onCustomChange={this.handleCheck.bind(this)}
           />
     </div>

     <div className={this.state.dynamicReqDiv === true ? 'show' :'hidden'}>

     <div className="row">
       <div className ="col-md-6">
       <TextField
          // hintText="Hint Text"
           floatingLabelText="Request Parameter key"
           {...reqParamKey}
         errorText={reqParamKey.touched && reqParamKey.error && <div>{reqParamKey.error}</div>}/>   

        </div>
        
        <div className ="col-md-4">
       <TextField
          // hintText="Hint Text"
           floatingLabelText=" = Value"
           {...reqParamValue}
           errorText={reqParamValue.touched && reqParamValue.error && <div>{reqParamValue.error}</div>}/>   

          
        </div>
     
     </div>

  <div className="row">
       <div className ="col-md-4">
          <DropDownMenu
            value={this.state.value}
            onChange={this.handleChange}
            style={styles.customWidth}
            autoWidth={false}
            floatingLabelText="Select Method type"
            {...reqMethod}
          >
            <MenuItem value={"GET"} primaryText="GET" />
            <MenuItem value={"PUT"} primaryText="PUT" />
            <MenuItem value={"POST"} primaryText="POST" />
            <MenuItem value={"DELETE"} primaryText="DELETE" />
            <MenuItem value={"HEAD"} primaryText="HEAD" />
            <MenuItem value={"TRACE"} primaryText="TRACE" />
            <MenuItem value={"CONNECT"} primaryText="CONNECT" />
            <MenuItem value={"OPTIONS"} primaryText="OPTIONS" />
          </DropDownMenu>
      </div>
  </div>

    <div className="row">
     <div className ="col-md-6">
     <TextField
        // hintText="Hint Text"
         floatingLabelText="Request Header key"
         {...reqHeaderKey}
         errorText={reqHeaderKey.touched && reqHeaderKey.error && <div>{reqHeaderKey.error}</div>}/>   
      </div>

      <div className ="col-md-6">
     <TextField
        // hintText="Hint Text"
         floatingLabelText="=Value"
         {...reqHeaderValue}
         errorText={reqHeaderValue.touched && reqHeaderValue.error && <div>{reqHeaderValue.error}</div>}/>   
      </div>
     
      </div>
     
     </div>
    </form>
    );
  }
}

Form_BTPattern.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
}

export default reduxForm({ // <----- THIS IS THE IMPORTANT PART!
  form: 'Bussiness Transaction pattern ',        // a unique name for this form
  fields,
  validate
  
},
  state => ({ // mapStateToProps
    BTPattern : state.BTPattern
  
}),
 { 
  loadGroupNames : ListOfGroupNames
 } // mapDispatchToProps (will bind action creator to dispatch)
) (Form_BTPattern);

