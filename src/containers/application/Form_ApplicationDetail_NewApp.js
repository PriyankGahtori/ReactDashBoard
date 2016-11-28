//Import react components
import React, { PropTypes } from 'react'
import {reduxForm} from 'redux-form';
import TextField from 'material-ui/TextField';
import Is from 'is_js';
import MenuItem from 'material-ui/MenuItem';

import DropDownMenu from '../../components/SelectFieldWrapper';

export const fields = ['appName', 'appDesc', 'userName','topoId'];
const initialValues = { 
                'dcName' : "safasfasfa", 
                'dcIp' : "sadasdasdas", 
                'dcPort' :" asfasfasfas",
                'ndeIp' : "SdDAD",
                'ndePort' : "34342"
              }

              
 const styles = {
    customWidth: {
      width: 300
    }
  };
//validating the fields of form
const validate = values => {
  const errors = {}
 
  if (!values.appName) {
    errors.appName = 'Required'
  } else if (values.appName.length > 15) {
    errors.appName = 'Must be 15 characters or less'
  } else if(Number(values.appName)){
    errors.appName = "Must enter only characters."
  }

  if (!values.appDesc) {
    errors.appDesc = 'Required'
  } else if (values.appDesc.length > 50) {
    errors.appDesc = 'Must be 50 characters or less'
  }else if (Number(values.appDesc)){
    errors.appDesc = 'Must enter only characters'
  }
  if (!values.userName) {
    errors.userName = 'Required'
  } else if (values.userName.length > 15) {
    errors.userName = 'Must be 15 characters or less'
  } else if (Number(values.userName)){
    errors.userName = 'Must enter only characters'
  }
  
  if(values.topoId == undefined){
    errors.topoId = 'Required'
  }else if(values.topoId == null) {
    errors.topoId = 'Required'
  }else if(!values.topoId) {
    errors.topoId = 'Required'
  }
 
  return errors
}
class Form_ApplicationDetail_NewApp extends React.Component {

constructor(props) {
  super(props);
 /* this.state = {value:this.props.initialData.topoId}
  console.log("state---",this.state.value)
 */ }

  componentWillMount() {
    this.state = {value:this.props.initialData.topoId}
  }


  componentWillReceiveProps(nextProps)
  {
    console.log("this.props.initialData formApp--",this.props.initialData)
    console.log("nextProps---",nextProps.initialData)
    if(this.props.initialData != nextProps.initialData){
      this.setState({value:nextProps.initialData.topoId});
    }
  }

handleChangeTopology(event, index, value){
  console.log("inside handleChangeTopology---",value)
  this.setState({value:value})
}


  render() {

     const { fields: { appName, appDesc, userName,topoId}, resetForm, handleSubmit, submitting } = this.props
     return (
       <form onSubmit={handleSubmit(data =>{ alert(JSON.stringify(data))})}>
            <div className ="row" >
              <div className ="col-md-6">
                <TextField
                  hintText="Name"
                  floatingLabelText="Name"
                  {...appName}
                  errorText={appName.touched && appName.error && <div>{appName.error}</div>}
                />
             </div>


             <div className="col-md-6">
               <TextField
                  hintText="Description"
                  floatingLabelText="Description"
                  {...appDesc}
                  errorText={appDesc.touched && appDesc.error && <div>{appDesc.error}</div>}
                />
             </div>
        </div>

             <div className ="row">
              <div className ="col-md-6">
              <TextField
                  hintText="userName"
                  floatingLabelText="User"
                  {...userName}
                  errorText={userName.touched && userName.error && <div>{userName.error}</div>}
                />
             </div>

             <div className = "col-md-6">
               
                <DropDownMenu 
                {...topoId}

                  value={this.state.value}              
                  style={styles.customWidth}
                  autoWidth={false}
                  errorText={topoId.touched && topoId.error && <div>{topoId.error}</div>}
                  customOnChange={this.handleChangeTopology.bind(this)} 
                  floatingLabelText="Select Topology"
                >

                {
                  /* Iterate over topology data */
                  this.props.data[2].value.map((val, index) => (   

                  <MenuItem value={val.id} key={val.id} primaryText={val.name}/>
                  ))
                }
                 
                </DropDownMenu>
              </div>
            </div>
       </form>
     );
   }
}
Form_ApplicationDetail_NewApp.propTypes = {
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
  initialValues:state.applicationdata.appDetailInitializeForm,
  initialData  : state.applicationdata.appDetailInitializeForm ,
  data:state.initialData.homeData
}))(Form_ApplicationDetail_NewApp);
