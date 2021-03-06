//Importing React components
import React, { PropTypes } from 'react'
import {reduxForm} from 'redux-form';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';

//Importing files
import DropDownMenu from '../../../../components/SelectFieldWrapper';
import Toggle from '../../../../components/ToggleWrapper';
import {fetchBackendTypes,fetchBackendPoints, ServiceEntryPointsOfSelectedEntryType,ListOfServiceEntryPointType} from '../../../../actions/index';
import CheckBox from '../../../../components/CheckboxWrapper';

export var fields = ['backendTypeId','host','port','url','serviceName','topicName','tableName','query','databaseProductName','databaseProductVersion','driverName','driverVersion','userName'];
const initialValues = {
              'backendTypeId':'1',
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
  console.log("form bacend edit -----",this.props)
  this.state={listBackendPoints:null}
  this.handleChange=this.handleChange.bind(this);
  this.state ={flagAddOREdit:this.props.flagAddOREdit};
  this.state ={listOfEntryType:this.props.listOfEntryType};
  this.state ={enable:false};
  this.handleCheck= this.handleCheck.bind(this);
  this.state = { hostPortUrl:false,
                 query      :false,
                 serviceName:false,
               //  hostPortUrl:false,
                 databaseProductName:false,
                 databaseProductVersion:false,
                 driverName:false,
                 driverVersion:false,
                 userName :false,
                 tableName:false }

  let backendType = this.props.backendType.trim();

    if(backendType == "HTTP"){
       this.state = { hostPortUrl:true,
                      query      :true};
    }
    else if(backendType == "WS"){
      this.state = {serviceName:true,
                    hostPortUrl:true};
    }
   
    else if(backendType == "JDBC"){
      this.state = { hostPortUrl:true,
                    databaseProductName:true,
                    databaseProductVersion:true,
                    driverName:true,
                    driverVersion:true,
                    userName :true};
    }
    else if(backendType == "RMI"){
      this.state = { hostPortUrl:true,
                      serviceName:true}
    }
    else if(backendType == "HADOOP"){
      console.log("backend type hadoop")
      this.state = { tableName:true}
    }

  
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
    fields =  ['backendTypeId','host','port','url','serviceName','topicName','tableName','query','databaseProductName','databaseProductVersion','driverName','driverVersion','userName'];
    
  }

  componentWillMount() {
   console.log("component mount called",fields)
   console.log("this.props---in comp wil mount--",this.props.selectedRow.lstEndPoints)
  /*
  *
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
    const { fields: { host,port,url,serviceName,topicName,tableName,query,databaseProductName,databaseProductVersion,driverName,driverVersion,userName}, resetForm, handleSubmit,onSubmit, submitting } = this.props
     

  return (
    <form >
    <div> 
       
       <h3>Naming Rules</h3>
        <div className='row' >
        <div className = {`col-md-3 ${this.state.hostPortUrl === true ? 'show' :'hidden'}`}>

        <CheckBox label="Host" 
          {...host}
         onCustomChange={this.handleCheck }
        
        />
        </div>


        <div className = {`col-md-3 ${this.state.hostPortUrl === true ? 'show' :'hidden'}`}>
        <CheckBox label="Port" 
        {...port} 
        onCustomChange={this.handleCheck}
        />
        </div>

        <div className = {`col-md-3 ${this.state.hostPortUrl === true ? (this.props.backendType == "RMI" ?'hidden': 'show' ):'hidden'}`}>
        <CheckBox label="URL"
        {...url}   
        onCustomChange={this.handleCheck}
        />
       </div>
      </div>

    <div className='row' style={{display: 'flex'}}>   
    <div className={`col-md-3 ${this.state.serviceName === true ? 'show' :'hidden'}`} >
      <CheckBox label="ServiceName"
      {...serviceName} 
      onCustomChange={this.handleCheck}
      />
      </div>

      <div className = {`col-md-3 ${this.state.topicName === true ? 'show' :'hidden'}`} >
      <CheckBox label="Topic Name"
      {...topicName}   
      
      onCustomChange={this.handleCheck}
      />
      </div>

      <div className = {`col-md-3 ${this.state.tableName === true ? 'show' :'hidden'}`}>
      <CheckBox label="Table Name"
      {...tableName}
       onCustomChange={this.handleCheck}
      />
       </div>
      </div>


       <div className='row' style={{display: 'flex'}}>   
    <div className= {`col-md-3 ${this.state.query === true ? 'show' :'hidden'}`}>
      <CheckBox label="query"
      {...query} 
      onCustomChange={this.handleCheck}
  
      />
      </div>

      <div className = {`col-md-3 ${this.state.databaseProductName === true ? 'show' :'hidden'}`}>
      <CheckBox label="Database ProductName"
      {...databaseProductName}   
      
      onCustomChange={this.handleCheck}
      />
      </div>
      <div className = {`col-md-3 ${this.state.databaseProductVersion === true ? 'show' :'hidden'}`}>
      <CheckBox label="Database ProductVersion"
      {...databaseProductVersion}
       onCustomChange={this.handleCheck}
      />
       </div>

      </div>




    <div className='row' style={{display: 'flex'}}>   
    <div className={`col-md-3 ${this.state.driverName === true ? 'show' :'hidden'}`} >
      <CheckBox label="Driver Name"
      {...driverName} 
      
      onCustomChange={this.handleCheck}
      />
      </div>

      <div className = {`col-md-3 ${this.state.driverVersion === true ? 'show' :'hidden'}`}>
      <CheckBox label="Driver Version"
      {...driverVersion}   
      onCustomChange={this.handleCheck}
      />
      </div>

      <div className = {`col-md-3 ${this.state.userName === true ? 'show' :'hidden'}`}>
      <CheckBox label="User Name"
      {...userName}
       onCustomChange={this.handleCheck}
      />
       </div>
      </div>


    <div>
        <h3>Exit Points</h3>
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
  fields
 
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

