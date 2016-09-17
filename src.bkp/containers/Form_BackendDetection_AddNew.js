import React, { PropTypes } from 'react'
import {reduxForm} from 'redux-form';
import {fetchBackendTypes,fetchBackendPoints, ServiceEntryPointsOfSelectedEntryType,ListOfServiceEntryPointType} from '../actions/index';
import TextField from 'material-ui/TextField';
//import DropDownMenu from 'material-ui/SelectField';
import DropDownMenu from '../components/SelectFieldWrapper';
import MenuItem from 'material-ui/MenuItem';
import Toggle from '../components/ToggleWrapper';
//import Toggle from 'material-ui/Toggle';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
export const fields = [ 'backendTypeId', 'name', 'enabled','fqm','customFQMToggle','customFQM','desc' ]
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


class AddNewEndPointForm extends React.Component {

  constructor(props) {
  super(props);
  this.state={listBackendPoints:null}
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

//triggers action for fetching backend Points
handleChange(event,index,value){  
  //this.props.load(value);
  this.props.loadBackendPoints(value);
  this.setState({value:value});
}

  componentWillMount() {
    //console.log(this.state.value)
    //this.props.loadEntryType();
    this.props.loadBackendTypes()
  }


//method to create comboBox of entry Type 
  renderDropDown(entryType){
    let menuItems= this.props.listBackendTypes.map((data) => (
                <MenuItem value={data.id}  primaryText={data.backendTypeName}/>
            ));            

      return(
         <DropDownMenu 
          {...entryType}
          value={this.state.value}                
          style={styles.customWidth}
          autoWidth={false}
          customOnChange={this.handleChange.bind(this)} 
          floatingLabelText="Backend Type"    
         >
          {menuItems} 
         </DropDownMenu>
        );
     }

//method for displaying Service entry Point List according to entry Type selected from entry type comboBox
 renderEntryPointList(fqm){

  //console.log("entryPointList----",fqm)
  if(this.state.enable === false && (this.state.listBackendPoints == null || this.state.listBackendPoints.length ==0) ){
    console.log("listBackendPoints null----")
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
    console.log("listBackendPoints not null")
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
           this.props.listBackendPoints.map((value)=>(
             //assigning both fqm and desc to same radio button, can be parsed to get value
            <RadioButton
              value = {value.id} 
               value = {`{"fqm":"${value.endPointFQM}","desc":"${value.endPointDesc}","id":"${value.id}"}`} 
              label = {value.endPointName} 
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
    if(this.props.listBackendPoints != nextProps.listBackendPoints){
      this.setState({listBackendPoints:nextProps.listBackendPoints})
    }
  }

  render() {
 
    const { fields: { backendTypeId,name,enabled,fqm,customFQMToggle,customFQM,desc}, resetForm, handleSubmit,onSubmit, submitting } = this.props 
        
  return (
    <form >
    <div className ="row">

      <div className ="col-md-4">
         {this.renderDropDown(backendTypeId)}  
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
          label="New Backend Point"         
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

AddNewEndPointForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
}

export default reduxForm({ // <----- THIS IS THE IMPORTANT PART!
  form: 'Backend Entry Points '                          // a unique name for this form
  //fields
  
},
  state => ({ // mapStateToProps
 fields ,
  listBackendTypes : state.backEndDetection.listBackendTypes,
  listBackendPoints : state.backEndDetection.listBackendPoints
}),
 { 
   loadBackendTypes : fetchBackendTypes,
   loadBackendPoints : fetchBackendPoints
 } // mapDispatchToProps (will bind action creator to dispatch)
) (AddNewEndPointForm);

