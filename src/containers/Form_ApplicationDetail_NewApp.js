import React, { PropTypes } from 'react'
import {reduxForm} from 'redux-form';
import TextField from 'material-ui/TextField';
import Is from 'is_js';
import DropDownMenu from '../components/SelectFieldWrapper';
import MenuItem from 'material-ui/MenuItem';

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
/*//validating the fields of form
const validate = values => {
  const errors = {}
 
  if (!values.appName) {
    errors.appName = 'Required'
  } else if (values.appName.length > 15) {
    errors.appName = 'Must be 15 characters or less'
  } else if (!Is.alphaNumeric(values.appName)) {
    errors.appName = 'Invalid Application Name'
  }

  if (!values.appDesc) {
    errors.appDesc = 'Required'
  } else if (values.appDesc.length > 15) {
    errors.appDesc = 'Must be 15 characters or less'
  } else if (!Is.alphaNumeric(values.appDesc)) {
    errors.appDesc = 'Invalid Application Name'
  }

  if (!values.userName) {
    errors.userName = 'Required'
  } else if (values.userName.length > 15) {
    errors.userName = 'Must be 15 characters or less'
  } else if (!Is.alphaNumeric(values.userName)) {
    errors.userName = 'Invalid Application Name'
  }
  
  return errors
}*/
class NewApplication extends React.Component {

constructor(props) {
  super(props);
  console.log("in form topo-- !!!",this.props.data)
  console.log("this.props.data[2]value - ")
  this.state = {value:this.props.data[2].value[0].id};

  }

handleChangeTopology(event, index, value){
  console.log("inside handleChangeTopology---",value)
  this.setState({value:value})
}


  render() {
      console.log("props",this.props);

     const { fields: { appName, appDesc, userName,topoId}, resetForm, handleSubmit, submitting } = this.props
     return (
       <form onSubmit={handleSubmit(data =>{ alert(JSON.stringify(data))})}>
            <div className ="row" >
              <div className ="col-md-6">
                <TextField
                  hintText="Hint Text"
                  floatingLabelText="Name"
                  {...appName}
                  errorText={appName.touched && appName.error && <div>{appName.error}</div>}
                />
             </div>


             <div className="col-md-6">
               <TextField
                  hintText="Hint Text"
                  floatingLabelText="AppDesc"
                  {...appDesc}
                  errorText={appDesc.touched && appDesc.error && <div>{appDesc.error}</div>}
                />
             </div>
        </div>

             <div className ="row">
              <div className ="col-md-6">
              <TextField
                  hintText="Hint Text"
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
NewApplication.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
}

export default reduxForm({ // <----- THIS IS THE IMPORTANT PART!
  form: 'contact',                           // a unique name for this form
  fields
 // validate
},
state => ({ // mapStateToProps
  initialValues:state.applicationdata.appDetailInitializeForm,
  data:state.initialData
}))(NewApplication);
