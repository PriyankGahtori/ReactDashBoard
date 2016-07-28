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
import Toggle from 'material-ui/Toggle';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
export const fields = [ 'entryType', 'name', 'enable','fqm','desc' ]
const initialValues = { 
                'dcName' : "safasfasfa", 
                'dcIp' : "sadasdasdas", 
                'dcPort' :" asfasfasfas",
                'ndeIp' : "SdDAD",
                'ndePort' : "34342"
              }






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
  this.setState({value:value})
}

  componentWillMount() {
    //console.log(this.state.value)
    this.props.loadEntryType();
  }


//method to create comboBox of entry Type 
  renderDropDown(entryType){
      return(
         <DropDownMenu 
          {...entryType}
          value={this.state.value}                
          style={styles.customWidth}
          autoWidth={false}
          onChange={this.handleChange.bind(this)} 
          floatingLabelText="Entry Point Type"          
         >
           {
            this.props.ListOfServiceEntryPointType.map((data, index) => (
                <MenuItem value={data.id}  primaryText={data.entryTypeName}/>
            )) 
           }
         </DropDownMenu>
        );
     }

//method for displaying Service entry Point List according to entry Type selected from entry type comboBox
 renderEntryPointList(fqm){
  console.log("entryPointList----",fqm)
  if(this.state.ServiceEntryPoints == null){
    return(
        <div>
        </div>
      );
  }
  else{
    return(
       <div styles={styles.entryPointBlock}>
              <div className="row" >
                  <label>Entry Point Names</label>
              </div>

             <div className="row">
                <RadioButtonGroup name ="entryPointList" defaultSelected={this.state.ServiceEntryPoints != null ? this.state.ServiceEntryPoints[0]._links.self.href : "-1"} >
                {
                  this.props.ServiceEntryPoints.map((value, index)=>(
                  <RadioButton
                      value={value._links.self.href} 
                      label={value.entryName} 
                      disabled={this.state.enable}
                      {...fqm}  
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
 
     const { fields: { entryType,name,enable,fqm}, resetForm, handleSubmit,onSubmit, submitting } = this.props
        
        return (
        <form >
          <div className ="row"  >

                <div className ="col-md-4">
                  {this.renderDropDown(entryType)} 
               </div>

              <div className ="col-md-3">
                  <TextField
                   hintText="Hint Text"
                   floatingLabelText="Name"
                   {...name}
                  />
              </div>

              <div className ="col-md-5">
                  <Toggle {...enable} style={styles.toggle} defaultToggled={true}  labelPosition="right" label="Enabled" />
              </div>


          </div>
          
          {this.renderEntryPointList(fqm) }

          <div>

          <Toggle style={styles.toggleCustomFQM} defaultToggled={false}  labelPosition="right" label="Custom Fully Qualified Name" onToggle={this.handleEntryPoints.bind(this,this.state.enable)} />        
            <TextField
             hintText="Hint Text"
             floatingLabelText="Entry FQM"
             {...fqm}
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
  form: 'contact',                           // a unique name for this form
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

