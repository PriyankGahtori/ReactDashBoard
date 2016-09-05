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
import CheckBox from '../components/CheckboxWrapper';
export var fields = ['backend_Type_id','host','port','url','serviceName','topicName','tableName'];
const initialValues = {
              'backend_Type_id':'1',
              'host':false,
              'port':false,
              'url':false,
              'serviceName':false,
              'topicName':false,
              'tableName':false

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


class Form_BackendDetection_Edit extends React.Component {

  constructor(props) {
  super(props);
  this.state={listBackendPoints:null}
  this.handleChange=this.handleChange.bind(this);
  this.state ={flagAddOREdit:this.props.flagAddOREdit};
  this.state ={listOfEntryType:this.props.listOfEntryType};
  this.state ={enable:false};
  this.handleCheck= this.handleCheck.bind(this);
 
  }

handleCheck(event,isInputChecked){
    console.log("event--in backendformedit----",event)
    console.log("isInputChecked---",isInputChecked)
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
  //this.p-rops.load(value);
  this.props.loadBackendPoints(value);
  this.setState({value:value});
}

handleToggleChange(value){
  this.props.handleToggleBackendPts(value);
}

  componentWillUnmount(){
    console.log("componentWillUnmount---func called")
    fields =  ['backend_Type_id','host','port','url','serviceName','topicName','tableName'];
    
  }

  componentWillMount() {
   console.log("component mount called",fields)
   console.log("this.props---in comp wil mount--",this.props.selectedRow.lstEndPoints)
  /*
  */
   this.props.selectedRow.lstEndPoints.map(function(value){
    fields.push("endPoint_"+value.id);
   })

   console.log("aftr inserting---",fields)
 }



 componentWillReceiveProps(nextProps)
  {
    if(this.props.listBackendPoints != nextProps.listBackendPoints){
      this.setState({listBackendPoints:nextProps.listBackendPoints})
    }
  }

  render() {
    console.log("render function called")
    const { fields: { host,port,url,serviceName,topicName,tableName}, resetForm, handleSubmit,onSubmit, submitting } = this.props
     

  return (
    <form >
    <div> 
      <div className='row'>
       <h3>Naming Rules</h3>
       <div className={'col-xs-4 col-md-3'} style={{display: 'flex'}}>
        <CheckBox label="Host" 
          {...host}
         onCustomChange={this.handleCheck}
        />

        <CheckBox label="Port" 
        {...port} 
        onCustomChange={this.handleCheck}
        />

        <CheckBox label="URL"
        {...url}   
        onCustomChange={this.handleCheck}
        />
       </div>
      </div>

    <div className='row'>   
    <div className={'col-xs-4 col-md-3'} style={{display: 'flex'}}>
      <CheckBox label="ServiceName"
      {...serviceName} 
      
      onCustomChange={this.handleCheck}
      />
      <CheckBox label="Topic Name"
      {...topicName}   
      
      onCustomChange={this.handleCheck}
      />
      <CheckBox label="Table Name"
      {...tableName}
       onCustomChange={this.handleCheck}
      />
       </div>
      </div>

    <div>
        <h3>End Points</h3>
          {
            this.props.selectedRow.lstEndPoints.map((value,index) =>(
              <Toggle  
             // {...endPoints} 
              {...this.props.fields["endPoint_"+value.id]}
              label={value.name}
              defaultSelected ={value.enabled}
              onToggleChange={this.handleToggleChange.bind(this,value)}
               /> 
            ))
          } 
      List Wala Data : {this.props.backendType}<br/>
      Props : {/*JSON.stringify(this.props.selectedRow)*/}
      </div>
    </div>

    </form>
    );
  }
}

Form_BackendDetection_Edit.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
}

export default reduxForm({ // <----- THIS IS THE IMPORTANT PART!
  form: 'Backend Entry Points ',                           // a unique name for this form
  //fields
 
},
  state => ({ // mapStateToProps
  fields : state.backEndDetection.fields,
  listBackendTypes : state.backEndDetection.listBackendTypes,
  listBackendPoints : state.backEndDetection.listBackendPoints,
  initialValues :state.backEndDetection.initializeBackendForm

}),
 { 
   loadBackendTypes : fetchBackendTypes,
   loadBackendPoints : fetchBackendPoints
 } // mapDispatchToProps (will bind action creator to dispatch)
) (Form_BackendDetection_Edit);

