//Importing React components

import React, { PropTypes } from 'react';
import {reduxForm} from 'redux-form';
import TextField from 'material-ui/TextField';
import Is from 'is_js';
import Checkbox from 'material-ui/Checkbox';
import MenuItem from 'material-ui/MenuItem';

//Importing files
import SelectField from '../../components/SelectFieldWrapper';


export const fields = ['profileName', 'profileDesc','parentProfileId'];

const initialValues={
                          'profileName' :"profileName" ,
                          'profileDesc':"description",
                }

  
//validating the fields of form
const validate = (values,props) =>{
  const errors = {}
 
  if (!values.profileName) {
    errors.profileName = 'Required'
  } else if (values.profileName.length > 15) {
    errors.profileName = 'Must be 15 characters or less'
  }  else if (Number(values.profileName)){
    errors.profileName = 'Must enter only characters'
  } else if(!Is.alphaNumeric(values.profileName)){
      errors.profileName = 'Special character is not allowed.'
    } else {
      var profileNameList = [];
      props.profileTableData.forEach(function(val){
        profileNameList.push(val.profileName)
      })
      if(profileNameList.indexOf(values.profileName.trim()) != -1)
        errors.profileName = "Profile Name Exists!!"
  } 
 
 
  if (!values.profileDesc) {
    errors.profileDesc = 'Required'
  } else if (values.profileDesc.length > 50) {
    errors.profileDesc = 'Must be 50 characters or less'
  } else if (Number(values.profileDesc)){
    errors.profileDesc = 'Must enter only characters'
  }
   
  return errors
}
class Form_Profile_NewProfile extends React.Component {
  
  constructor(props) {
    super(props);
   this.state={selectDisable:true}
  }
   
handleCheck(e,isInputChecked){
  
  if(isInputChecked === true){
    this.setState({selectDisable:false})
  }else{
    this.setState({selectDisable:true})
     }
  }  
  handleChange(event,index,value){
      this.setState({value:value});
    }
  renderProfileList(parentProfileId){
     let dropDownMenu= this.props.profileTableData.map((dropDownData) => (
     <MenuItem value={dropDownData.id}  primaryText={dropDownData.profileName}/>
    ));

    return (
    
      <SelectField 
        {...parentProfileId}
        customOnChange={this.handleChange.bind(this)} 
        value={this.state.value}  
        disabled={this.state.selectDisable}
        floatingLabelText="Select Profile to be Copied"
      >
       {dropDownMenu}
      </SelectField>
          
    );
  }
   render() {
         const { fields: { profileName, profileDesc,parentProfileId}, resetForm, handleSubmit,onSubmit, submitting } = this.props

    return (
   
       <form>
          <div className ="row" >
              <div className ="col-md-6">
               <TextField
                hintText="Name"
                floatingLabelText="Name"  
                 {...profileName}
                errorText={profileName.touched && profileName.error && <div>{profileName.error}</div>}/>   
               </div>
                <div className ="col-md-6">
               <TextField
                hintText="Description"
                floatingLabelText=" Description" 
                 {...profileDesc}
                errorText={profileDesc.touched && profileDesc.error && <div>{profileDesc.error}</div>}/>
            </div>
           </div>
            <div className="row">  
           <div className ="col-md-3" ><Checkbox labelPosition="left" label="Copy Profile" style={{marginTop:35}} onCheck = {this.handleCheck.bind(this)} /> </div>
           <div className ="col-md-9"> {this.renderProfileList(parentProfileId)} </div> 
         </div>
      </form>
 );
  }
}
Form_Profile_NewProfile.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
}

export default reduxForm({ // <----- THIS IS THE IMPORTANT PART!
  form: 'contact',                           // a unique name for this form
  fields,
  validate

  
},
  state => ({ // mapStateToProps
 // initialValues:state.profileDetailData.profileInitializeForm
  initialValues:{parentProfileId:1},
  profileTableData: state.profileDetailData.tableData

})
) (Form_Profile_NewProfile);
