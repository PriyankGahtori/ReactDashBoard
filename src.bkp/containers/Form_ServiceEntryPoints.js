import React, { PropTypes } from 'react'
import {reduxForm} from 'redux-form';
import {ServiceEntryPointsOfSelectedEntryType,ListOfServiceEntryPointType} from '../actions/index';
import TextField from 'material-ui/TextField';

//import DropDownMenu from 'material-ui/SelectField';
import DropDownMenu from '../components/SelectFieldWrapper';
import MenuItem from 'material-ui/MenuItem';
import Toggle from '../components/ToggleWrapper';
//import Toggle from 'material-ui/Toggle';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
export const fields = [ 'entryTypeId', 'name', 'enabled','fqm','customFQMToggle','customFQM','desc' ]
const initialValues = {
              'customFQMToggle':false
}
/*
* defaultSelected={this.state.ServiceEntryPoints != null ? this.state.ServiceEntryPoints[0]._links.self.href : "-1"} 
* to be uded in future in Radio button group to be by default selected
*/               

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
  toggleCustomFQM :{
     paddingLeft:5
  },
  entryPointBlock:{
    paddingLeft:10,
    paddingTop:5
  }
};


class ServiceEntryPointsForm extends React.Component {

  constructor(props) {
  super(props);
  this.state={ServiceEntryPoints:null}
  this.handleChange=this.handleChange.bind(this);
  this.state ={flagAddOREdit:this.props.flagAddOREdit};
  this.state ={listOfEntryType:this.props.listOfEntryType};
  this.state ={enable:false}
  }

handleEntryPoints(enableSEP){
  console.log("handleEntryPoints function called--enableSEP--",enableSEP)
  this.setState({enable:!enableSEP})
}

 onToggle(){
    console.log("ontoggle function --ttttttttttt-")
    console.log("aftr toggling--row.topoState-----")
  }

handleChange(event,index,value){  
  console.log("event-----",event)
  console.log("index------",index)                             
  console.log("on handleChange----",value)

  this.props.load(value);
  this.setState({value:value});
}

  componentWillMount() {
    //console.log(this.state.value)
    this.props.loadEntryType();
  }


//method to create comboBox of entry Type 
  renderDropDown(entryType){
    let menuItems= this.props.ListOfServiceEntryPointType.map((data) => (
                <MenuItem value={data.id}  primaryText={data.entryTypeName}/>
            ));            

      return(
         <DropDownMenu 
          {...entryType}
          value={this.state.value}                
          style={styles.customWidth}
          autoWidth={false}
          customOnChange={this.handleChange.bind(this)} 
          floatingLabelText="Entry Point Type"    
         >
          {menuItems} 
         </DropDownMenu>
        );
     }

//method for displaying Service entry Point List according to entry Type selected from entry type comboBox
 renderEntryPointList(fqm){

  console.log("entryPointList----",fqm)
  if(this.state.enable === false && (this.state.ServiceEntryPoints == null || this.state.ServiceEntryPoints.length ==0) ){
    console.log("serviceEntryPoints null----")
    return(
        <div>
          <div className="row" >
            <label>Entry Point Names</label>
          </div>
          <em>No Entry Point Present </em>
        </div>
      );
  }
  else if(this.state.enable === true)
  {
    console.log("state enable true")
    return(
    <div>
    </div>
    );
  }

  else{
    console.log("serviceEntryPoints not null")
    return(
      <div styles={styles.entryPointBlock} >
        
        <div className="row" >
          <label>Entry Point Names</label>
        </div>

        <div className="row">
         <RadioButtonGroup 
              {...fqm}  
              name ="entryPointList" 
          >
          {
           this.props.ServiceEntryPoints.map((value)=>(
            <RadioButton
              value = {value._links.self.href} 
              label = {value.entryName} 
              disabled={this.state.enable}                      
            />
           ))
          }
         </RadioButtonGroup>
        </div>

      </div>
    );
    }
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
 
     const { fields: { entryTypeId,name,enabled,fqm,customFQMToggle,customFQM,desc}, resetForm, handleSubmit,onSubmit, submitting } = this.props
        
  return (
    <form >
    <div className ="row">

      <div className ="col-md-4">
       {this.renderDropDown(entryTypeId)}  
      </div>

      <div className ="col-md-3">
        <TextField
         hintText="Hint Text"
         floatingLabelText="Name"
         {...name}
        />
      </div>

      <div className ="col-md-5">
        <Toggle 
          {...enabled} 
          style={styles.toggle} 
          label="Enabled" 
        />
      </div>
      
  </div>
      
  {this.renderEntryPointList(fqm)}
       

      <div>
        <Toggle 
          style={styles.toggleCustomFQM} 
          {...customFQMToggle}
          defaultToggled={false}  
          labelPosition="right" 
          label="New Service Entry Points"         
          onToggleChange={this.handleEntryPoints.bind(this,this.state.enable)} 
        />        
      
      <TextField
        {...fqm}
        hintText="com.cavisson.nsecom.first.getData()"
        floatingLabelText="Entry FQM"
        disabled={!this.state.enable}        
      /><br/>
      <TextField
        {...desc}
        hintText="This is a for getting initial Data"
        floatingLabelText="Entry Description"
        disabled={!this.state.enable}        
      />

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
  form: 'Service Entry Points ',                           // a unique name for this form
  fields,
  
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

