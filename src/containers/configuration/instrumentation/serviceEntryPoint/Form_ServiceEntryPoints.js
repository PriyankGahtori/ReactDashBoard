//Importing React components
import React, { PropTypes } from 'react'
import {reduxForm} from 'redux-form';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

//Importing files
import DropDownMenu from '../../../../components/SelectFieldWrapper';
import {ServiceEntryPointsOfSelectedEntryType,ListOfServiceEntryPointType} from '../../../../actions/index';
import Toggle from '../../../../components/ToggleWrapper';



export const fields = [ 'entryTypeId', 'name', 'enabled','fqm','customFQMToggle','customFQM','desc' ]
const initialValues = {
              'customFQMToggle':false
}
/*
* defaultSelected={this.state.ServiceEntryPoints != null ? this.state.ServiceEntryPoints[0]._links.self.href : "-1"} 
* to be uded in future in Radio button group to be by default selected
*/               

const validate = values => {
  console.log(" value of entry type ------------>",values.entryType )
  const errors = {}
   
  if (!values.name) 
    errors.name = 'Required'

   else if (values.name.length > 50) 
    errors.name = 'Must be 50 characters or less'

   if (!values.fqm) 
    errors.fqm = 'Required'

   if (!values.desc) 
    errors.desc = 'Required'

   else if (values.desc.length > 100) 
    errors.desc = 'Must be 100 characters or less'
    
   if (!values.entryTypeId) 
    errors.entryTypeId = 'Required' 

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


class Form_ServiceEntryPoints extends React.Component {

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

 // this.props.load(value);
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
       <div style={styles.error}>{entryTypeId.touched && entryTypeId.error && <div>{entryTypeId.error}</div>}</div>

      </div>
         
      <div className ="col-md-4"       style={{right:25}}>
        <TextField
         hintText="Hint Text"
         floatingLabelText="Name"
         {...name}
         errorText={name.touched && name.error && <div>{name.error}</div>}/>   
      </div>

      <div className ="col-md-4">
        <Toggle 
          {...enabled} 
          style={styles.toggle} 
          label="Enabled" 
        />
      </div>
      
  </div>
      
{/* {this.renderEntryPointList(fqm)} */}
       

      <div>
     {/*   <Toggle 
          style={styles.toggleCustomFQM} 
          {...customFQMToggle}
          defaultToggled={false}  
          labelPosition="right" 
          label="New Service Entry Points"         
          onToggleChange={this.handleEntryPoints.bind(this,this.state.enable)} 
        /> */}       
      
      <TextField
        {...fqm}
        hintText="com.cavisson.nsecom.first.getData()"
        floatingLabelText="Fully Qualified Method Name"
        style ={{width:550}}
       // disabled={!this.state.enable}    
       errorText={fqm.touched && fqm.error && <div>{fqm.error}</div>}/>   
    
      <br/>
      <TextField
        {...desc}
        hintText="This Is For Getting Initial Data"
        floatingLabelText="Description"
        style ={{width:550}}
       errorText={desc.touched && desc.error && <div>{desc.error}</div>}/>   
      
    

    </div>
    </form>
    );
  }
}

Form_ServiceEntryPoints.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
}

export default reduxForm({ // <----- THIS IS THE IMPORTANT PART!
  form: 'Service Entry Points ',                           // a unique name for this form
  fields,
  validate,

  
},
  state => ({ // mapStateToProps
  
  ServiceEntryPointsTableData : state.ServiceEntryPoints.tableData,
  ServiceEntryPoints          : state.ServiceEntryPoints.serviceEntryPoints,
  ListOfServiceEntryPointType : state.ServiceEntryPoints.listOfEntryType,
  initialValues:{customFQMToggle:true}
}),
 { load          : ServiceEntryPointsOfSelectedEntryType,
   loadEntryType : ListOfServiceEntryPointType
 } // mapDispatchToProps (will bind action creator to dispatch)
) (Form_ServiceEntryPoints);

