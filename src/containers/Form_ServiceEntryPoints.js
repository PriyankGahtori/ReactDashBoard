import React, { PropTypes } from 'react'
import {reduxForm} from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {ServiceEntryPointsOfSelectedEntryType,ListOfServiceEntryPointType} from '../actions/index';
import TextField from 'material-ui/TextField';
import Is from 'is_js';
import DropDownMenu from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {List, ListItem} from 'material-ui/List';
import ContentSend from 'material-ui/svg-icons/content/send';
export const fields = [ 'dcName', 'dcIp', 'dcPort','ndeIp','ndePort' ]
const initialValues = { 
                'dcName' : "safasfasfa", 
                'dcIp' : "sadasdasdas", 
                'dcPort' :" asfasfasfas",
                'ndeIp' : "SdDAD",
                'ndePort' : "34342"
              }


const validate = values => {
  const errors = {}
 
  if (!values.dcName) {
    errors.dcName = 'Required'
  } else if (values.dcName.length > 15) {
    errors.dcName = 'Must be 15 characters or less'
  }else if (!Is.alphaNumeric(values.DCName)) {
    errors.dcName = 'Invalid DC Name'
  }

  if (!values.dcIp) {
    errors.dcIp = 'Required'
  } else if (!Is.ip(values.dcIp)) {
    errors.dcIp = 'Invalid IP address'
  }

  if (!values.dcPort) {
    errors.dcPort = 'Required'
  } else if (isNaN(Number(values.dcPort))) {
    errors.dcPort = 'Must be a number'
  } else if (values.dcPort.length > 4) {
    errors.dcPort = 'Must be 4 digits'
  }
  
  if (!values.ndeIp) {
    errors.ndeIp = 'Required'
  } else if (!Is.ip(values.ndeIp)) {
    errors.ndeIp = 'Invalid IP address'
 }
  if (!values.ndePort) {
    errors.ndePort = 'Required'
  } else if (isNaN(Number(values.ndePort))){
    errors.ndePort = 'Must be a number'
  } else if (values.ndePort.length > 4) {
    errors.ndePort = 'Must be 4 digits'
  }

  return errors
}

const styles = {
    customWidth: {
      width: 200
    }
  };


class ServiceEntryPointsForm extends React.Component {

  constructor(props) {
  super(props);
  console.log("in form serviceEntryPoints detail--",this.props)
  this.state={ServiceEntryPoints:this.props.ServiceEntryPoints}
  this.handleChange=this.handleChange.bind(this);
  this.state ={flagAddOREdit:this.props.flagAddOREdit};
  this.state ={listOfEntryType:this.props.listOfEntryType};
  console.log("this.props.listOfEntryType--",this.props.listOfEntryType)
  console.log("this.state.listOfEntryType--",this.state.listOfEntryType)
  //this.state ={value:this.props.ListOfServiceEntryPointType[0].id}
  //console.log("this.state.value--",this.state.value)
  console.log("ServiceEntryPointsTableData--in constructor---",this.state.ServiceEntryPointsTableData)
  }


handleChange(event,index,value){  
  console.log("event-----",event)
  console.log("index------",index)                             
  console.log("on handleChange----",value)
  this.props.load(value);
  this.setState({value:value})
}

  componentWillMount() {
    //console.log(this.state.value)
  
    this.props.loadEntryType();
   
  }


 componentWillReceiveProps(nextProps)
  {
    console.log("ServiceEntryPointsTableData---",nextProps.listOfEntryType)
    console.log("ServiceEntryPointsServiceEntryPoints----",nextProps.ServiceEntryPoints)

    if(this.props.flagAddOREdit!= nextProps.flagAddOREdit)
      this.setState({flagAddOREdit:nextProps.flagAddOREdit});

    

    if(this.props.ServiceEntryPoints != nextProps.ServiceEntryPoints){
      console.log("changing props of serviceEntryPoints")
      this.setState({ServiceEntryPoints:nextProps.ServiceEntryPoints})
      console.log("this.state.ServiceEntryPoints--",this.state.ServiceEntryPoints)
    }
  }

  render() {
 
     const { fields: { entryType, Name,firstName}, resetForm, handleSubmit,onSubmit, submitting } = this.props
     return (
        <form >
            <div className ="row"  >

              <div className ="col-md-6">
                 <DropDownMenu 
                  value={this.state.value}                
                  style={styles.customWidth}
                  autoWidth={false}
                  onChange={this.handleChange.bind(this)} 
                  floatingLabelText="Entry Point Type"
                >
               {
                this.props.ListOfServiceEntryPointType.map((data, index) => (
                    <MenuItem value={data.id}  primaryText={data.entryTypeName} />
                ))
               }
               
                </DropDownMenu>
             </div>

                <div className ="col-md-6">
                    <TextField
                     hintText="Hint Text"
                        floatingLabelText="Name"
                    />
                </div>
            </div>



          <div>
              <div >
                  <label>Entry Point Names</label>
              </div>

             <div>
               <List>
               {
                this.props.ServiceEntryPoints.map((value, index)=>(
                  <ListItem primaryText={value.entryFQM} leftIcon={<ContentSend />} />
                ))
               }
               </List>
             </div>
        </div>

       </form>
     );
   }
}

ServiceEntryPointsForm.propTypes = {
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
  initialValues               : state.dcDetail.dcDetailInitializeForm,
  ServiceEntryPointsTableData : state.ServiceEntryPoints.tableData,
  ServiceEntryPoints          : state.ServiceEntryPoints.serviceEntryPoints,
  ListOfServiceEntryPointType : state.ServiceEntryPoints.listOfEntryType
}),
 { load          : ServiceEntryPointsOfSelectedEntryType,
   loadEntryType : ListOfServiceEntryPointType
 } // mapDispatchToProps (will bind action creator to dispatch)
) (ServiceEntryPointsForm);

