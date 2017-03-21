//Importing react componnets
import React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import Snackbar from 'material-ui/Snackbar';
import FlatButton from 'material-ui/FlatButton';
import {hashHistory } from 'react-router';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import { reduxForm } from 'redux-form';
import _ from "lodash";
import { Link } from 'react-router';
import ConfirmDialog from 'material-ui/Dialog';
import Paper from 'material-ui/Paper';

//Importing files
import * as actionCreators  from '../../../actions/index';
import InstrProfiles from './InstrProfileMultiSelect';
import {getKeywordsData,submitKeywordData}  from '../../../actions/index';
import EnableBCICapturing from './bciCapture/EnableBCICapturing';
import EnableHotSpotCapturing from './hotspotCapture/EnableHotSpotCapturing';
import EnableDebugCapturing from './debugLevelCapture/EnableDebugLevelCapturing';
import InstrException from './exceptionCapture/EnableExceptionCapturing';
import EnableServiceEntryPoints from './EnableServiceEntryPoints';
import EnableFpHdrCapturing from './flowPathHeaderCapture/EnableFpHeaderCapturing';
import EnableJVMMonitor from './jvmMonitor/EnableJVMMonitor';

const styles = {
  text: {
    fontSize:18,
    paddingLeft:6
  },
  toggle: {
      marginTop:30 ,
      paddingLeft:80
  },
  customWidth: {
      width: 200
    },
  toggleCustomFQM :{
     paddingLeft:-4
  }
 
};
/*
* data --- table column name
* key ---- acting as a primary key
* 
*/


const style = {
  //margin: 20,
  textAlign: 'center',
  display: 'inline-block'
};

const NewButtonstyle = {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 30,
    left: 'auto',
    position: 'fixed'

};
const paperStyle = {
  height: '100%',
  width: '100%', 
  padding:'15px 0px', 
  textAlign: 'center',
  display: 'inline-block',
};
class GeneralKeywords extends React.Component {

  constructor(props) {
    super(props);
  this.loader = this.loader.bind(this);
  this.state = {getAllKeywordData:this.props.getAllKeywordData}
  this.getProfileName = this.getProfileName.bind(this);
  this.state = {profileName : this.getProfileName(this.props.params.profileId)}
    
  }

  getProfileName(profileId)
  {
      try{
        let profileData = this.props.homeData[1]
                              .value
                              .filter(function(obj){return obj.id == profileId });  
        if(profileData.length != 0)
        {
          return profileData[0].name;
        }
        else
          return null;          
      }
      catch(ex)
      {
        console.error("error in getting profileId " + ex);
        return null;
      }

  }
 
//this function is called first when component gets first loaded
  componentWillMount() {
    this.props.triggerLoader(true, null)
    this.props.getKeywordsData(this.props.params.profileId,this.loader);
    this.props.fetchSessionAttrMonitorData(this.props.params.profileId);
  }

  componentWillReceiveProps(nextProps)
  {
    if(this.props.getAllKeywordData != nextProps.getAllKeywordData){
      this.setState({getAllKeywordData:nextProps.getAllKeywordData});
    }
  }

 loader(){
   var message = {'title':'Keywords loaded', 'msg' : ''};
   this.props.triggerLoader(false,message)
 }

  submitForm(formData){
   
    let keywordData = Object.assign({},this.props.getAllKeywordData.data);

    /*
    * final data is data that is fetched from server and its value is updated according to user input,
    * Final data object contains all the keywords  .
    */

    let finalFormData = _.forEach(formData,function(value,key){
      if(value === "true" ||  value === true){
        value = "1" ;
      }
      else if(value === "false" || value === false){
        value = "0" ;
      }
      keywordData[key]["value"] = String(value); 
      
    }) ;
    this.props.submitKeywordData(keywordData,this.props.params.profileId,"instrProfile");  
}

  render() {
  
    return (
      <div >
      <div style={{color: '#FFF'}}><p>Profile Name : {this.state.profileName}</p></div>
      <Paper style={paperStyle} zDepth={2} >
        <EnableBCICapturing profileId = {this.props.params.profileId} />
        <EnableHotSpotCapturing profileId = {this.props.params.profileId}/>   
        <InstrException profileId = {this.props.params.profileId}  />
        <EnableFpHdrCapturing profileId = {this.props.params.profileId} pathName ={this.props.location.pathname}/>
        <EnableJVMMonitor profileId = {this.props.params.profileId}/> 
        <InstrProfiles  handleSubmit = {this.submitForm.bind(this)}/>
        {/* <EnableServiceEntryPoints /> */}
      </Paper>
    </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    getAllKeywordData :state.Keywords,
    homeData : state.initialData.homeData
   };
}

//method to dispatch actions to the reducers
function mapDispatchToProps(dispatch) {
return bindActionCreators(actionCreators, dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(GeneralKeywords);
