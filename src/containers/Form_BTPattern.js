import React, { PropTypes } from 'react'
import {reduxForm} from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Checkbox from '../components/CheckboxWrapper';
import TextField from 'material-ui/TextField';
import Is from 'is_js';
import {ListOfGroupNames} from '../actions/index';
import DropDownMenu from '../components/SelectFieldWrapper';
import MenuItem from 'material-ui/MenuItem';
import Toggle from '../components/ToggleWrapper';
import {List, ListItem} from 'material-ui/List';
import ContentSend from 'material-ui/svg-icons/content/send';

export const fields = ['btName','matchType','urlName','include','slowTransaction','verySlowTransaction','reqParamKey','reqParamValue','reqMethod','reqHeaderKey','reqHeaderValue' ]
             

const styles = {
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


class Form_BussinessTransPattern extends React.Component {

  constructor(props) {
  super(props);
  this.handleChange=this.handleChange.bind(this);
  this.state ={enable:false}
  this.state ={'dynamicReqDiv' : false}
  this.state ={BTPattern:null}
  }

handleChange(event,index,value){  
  console.log("event-----",event)
  console.log("index------",index)                             
  console.log("on handleChange----",value)

}

  componentWillMount() {
     console.log("state props--",this.props)
     console.log("state--",this.state)
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
          />
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
      </div>
      <div className ="col-md-6">
         <TextField
        // hintText="Hint Text"
         floatingLabelText="URL"
         {...urlName}
        />
        </div>
    
     </div>

     <div className ="row">
        <div className="col-md-6">
         <TextField        
            {...slowTransaction}  
            floatingLabelText="Slow Transaction Threshold (ms)"
          /> 
         </div>
         <div className="col-md-6">
           <TextField        
            {...verySlowTransaction}  
            floatingLabelText="Very Slow Transaction Threshold (ms)"
          />  
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
          />
        </div>
        
        <div className ="col-md-4">
       <TextField
          // hintText="Hint Text"
           floatingLabelText=" = Value"
           {...reqParamValue}
          />
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
        />
      </div>

      <div className ="col-md-6">
     <TextField
        // hintText="Hint Text"
         floatingLabelText="=Value"
         {...reqHeaderValue}
        />
      </div>
     
      </div>
     
     </div>
    </form>
    );
  }
}

Form_BussinessTransPattern.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
}

export default reduxForm({ // <----- THIS IS THE IMPORTANT PART!
  form: 'Bussiness Transaction pattern ',        // a unique name for this form
  fields,
  
},
  state => ({ // mapStateToProps
    BTPattern : state.BTPattern
  
}),
 { 
  loadGroupNames : ListOfGroupNames
 } // mapDispatchToProps (will bind action creator to dispatch)
) (Form_BussinessTransPattern);

