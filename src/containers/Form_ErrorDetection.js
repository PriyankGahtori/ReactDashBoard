import React, { PropTypes } from 'react'
import {reduxForm} from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TextField from 'material-ui/TextField';
import Is from 'is_js';
import DropDownMenu from '../components/SelectFieldWrapper';
import MenuItem from 'material-ui/MenuItem';
import Toggle from '../components/ToggleWrapper';
import {List, ListItem} from 'material-ui/List';
import ContentSend from 'material-ui/svg-icons/content/send';

export const fields = ['ruleName','errorFrom','errorTo','enabled','ruleDesc']
             

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


class Form_ErrorDetection extends React.Component {

  constructor(props) {
  super(props);
  this.handleChange=this.handleChange.bind(this);
  this.state ={enable:false}
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
  // this.setState({'dynamicReqDiv': value})  
}

  render() {
     const { fields: {ruleName,errorFrom,errorTo,enabled,ruleDesc}, resetForm, handleSubmit,onSubmit, submitting} = this.props
  return (
    <form>
    <div className ="row">
        <div className ="col-md-8">
          <TextField
              // hintText="Hint Text"
               floatingLabelText="Rule Name"
               {...ruleName}
          />
        </div>
        <div className ="col-md-4">
         <Toggle 
          {...enabled} 
          style={styles.toggle} 
          label="Enabled" 
        />
      </div>
  </div>

     <div className="row">
       <div className ="col-md-6">
       <TextField
          // hintText="Hint Text"
           floatingLabelText="From"
           {...errorFrom}
          />
        </div>
        
        <div className ="col-md-6">
       <TextField
          // hintText="Hint Text"
           floatingLabelText=" To"
           {...errorTo}
          />
        </div>
     
     </div>
     
      <div className ="row">
        <div className ="col-md-8">
          <TextField
              // hintText="Hint Text"
               floatingLabelText="Rule Description"
               {...ruleDesc}
          />
        </div>
  </div>
    
    </form>
    );
  }
}

Form_ErrorDetection.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
}

export default reduxForm({ // <----- THIS IS THE IMPORTANT PART!
  form: 'Error Detection ',        // a unique name for this form
  fields,
  
},
  state => ({ // mapStateToProps
    // errorDetection : this.state.errorDetection
  
}),
 { 
 } // mapDispatchToProps (will bind action creator to dispatch)
) (Form_ErrorDetection);

