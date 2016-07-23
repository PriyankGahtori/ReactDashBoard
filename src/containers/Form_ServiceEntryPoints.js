
import React, { PropTypes } from 'react'
import {reduxForm} from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {ServiceEntryPointsOfSelectedEntryType}  from '../actions/index';
import TextField from 'material-ui/TextField';
import Is from 'is_js';
import DropDownMenu from 'material-ui/DropDownMenu';
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
  this.handleChange=this.handleChange.bind(this);
  this.state ={flagAddOREdit:this.props.flagAddOREdit};
  this.state ={ServiceEntryPointsTableData:this.props.ServiceEntryPointsTableData};
  this.state ={value:this.props.ServiceEntryPointsTableData[0].id}
  console.log("this.state.value--",this.state.value)
  console.log("ServiceEntryPointsTableData--in constructor---",this.state.ServiceEntryPointsTableData)
  }


handleChange(event,index,value){  
  console.log("event-----",event)
  console.log("index------",index)                             
  console.log("on handleChange----",value)
  this.props.load(value);
  this.setState({value:value})
}

 componentWillReceiveProps(nextProps)
  {
    console.log("ServiceEntryPointsTableData---",nextProps.ServiceEntryPointsTableData)
    if(this.props.flagAddOREdit!= nextProps.flagAddOREdit)
      this.setState({flagAddOREdit:nextProps.flagAddOREdit});

    if(this.props.ServiceEntryPointsTableData!= nextProps.ServiceEntryPointsTableData){
      console.log("componentwillreceiveprops---")
      this.setState({ServiceEntryPointsTableData:nextProps.ServiceEntryPointsTableData})
    }
  }

  render() {
     const { fields: { entryType, Name,firstName}, resetForm, handleSubmit,onSubmit, submitting } = this.props
     return (
        <form >
            <div className ="row" >
              <div className ="col-md-6">
                <label>Entry Type</label>
                 <DropDownMenu 
                  value={this.state.value}                
                  style={styles.customWidth}
                  autoWidth={false}
                  onChange={this.handleChange.bind(this)} 
                >

                {
                  /* Iterate over serviceEntryPoints table data to get list of entry Type*/

                  this.props.ServiceEntryPointsTableData.map((data, index) => (   
                  <MenuItem value={data.id} key={data.id} primaryText={data.entryType}/>
                  ))
                }
                 
                </DropDownMenu>
             </div>
        </div>

             <div className ="row">
                <div className ="col-md-2">
                  <label>Name</label>
                </div>
                <div className="col-md-6">
                    <input type="text" placeholder="Name" {...Name}/>
                </div>
            </div>


          <div>
              <div className="row">
                <div className="col-md-6">
                  <label>Entry Point Names</label>
                </div>
              </div>

             <div>
               <List>
                  <ListItem primaryText="Inbox" leftIcon={<ContentSend />} />
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
  ServiceEntryPointsTableData : state.ServiceEntryPoints.tableData
}),
 { load: ServiceEntryPointsOfSelectedEntryType} // mapDispatchToProps (will bind action creator to dispatch)
) (ServiceEntryPointsForm);

