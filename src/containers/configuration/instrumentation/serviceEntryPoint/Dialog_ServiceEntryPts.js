//Importing React components
import React from 'react';
import { connect } from 'react-redux';
import DialogNewEntryPts from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { bindActionCreators } from 'redux';

//Importing files
import * as actionCreators  from '../../../../actions/index';
import FormNewServiceEntry from './Form_ServiceEntryPoints';
import {triggerRunTimeChanges} from '../../../../actions/runTimeChanges';

const styles = {

  title:{
    fontSize: 16,
    padding:8
  }
}

class Dialog_ServiceEntryPts extends React.Component {
 
  constructor(props) {
  super(props);
  console.log("this.props-----ppppppppppppppppp",this.props)
  console.log("onsubmit props", this.props.onSubmit)
  this.handleCancel = this.handleCancel.bind(this);
  this.handleSubmit=this.handleSubmit.bind(this);
  this.state ={ServiceEntryPoints:this.props.ServiceEntryPoints};
  this.submitForm =this.submitForm.bind(this);
  this.getProfileName = this.getProfileName.bind(this);
  this.makeRunTimeChange = this.makeRunTimeChange.bind(this);
 }

  componentWillReceiveProps(nextProps)
  {
    if(this.props.ServiceEntryPoints != nextProps.ServiceEntryPoints)
      this.setState({ServiceEntryPoints:nextProps.ServiceEntryPoints});
  }
  getProfileName(profileId)
  {
      try{
        let profileData = this.props.homeData[1]
                              .value
                              .filter(function(obj){return obj.id == profileId });  
        if(profileData.length != 0)
          return profileData[0].name;
        else
          return null;          
      }
      catch(ex)
      {
        console.error("error in getting profileId " + ex);
        return null;
      }

  }
  makeRunTimeChange()
  {
    if(this.props.entryPointFile === false)
      return;

    //action for runtime change
    var filePath = this.props.ns_wdir + "/ndprof/conf/" + this.getProfileName(this.props.trModeDetail.profileId) + "/NDEntryPointFile.txt"
    console.info("filePath", filePath);           
    let keywordDataList = [];
      keywordDataList.push("NDEntryPointsFile=" + filePath ); 
    triggerRunTimeChanges(this.props.trData, this.props.trModeDetail,keywordDataList); 
  }

  handleCancel(){
     this.props.toggleStateDialogNewServiceEntryPts();
  }
  
  handleSubmit(){
  this.refs.newServiceEntryPtsForm.submit();
    }
 
 /*
 *
 */
  getEntryTypeOfSelectedEntryTypeId(data){

     this.state.ServiceEntryPoints.listOfEntryType.forEach(function(val){
            console.log("value---aftr submitting---",val)
            if ( val.id == data.entryTypeId ){
                console.log("val.entryTypeName---",val.entryTypeName)
                data["entryType"]=val.entryTypeName;
                return data ;
            }
     }) 
   }

/*
*
*/

  getDescOfSelectedEntryPoint(data){
    console.log("data in appending----",data)
    this.state.ServiceEntryPoints.serviceEntryPoints.forEach(function(value){
      if(value._links.self.href == data.fqm)
      {
        console.log("cond matched--")
        data.fqm = value.entryFQM;
        data["desc"] = "Pooja";
        data["tableType"]="serviceEntryPoint"
      }
      return data;

    }) 

  }

  submitForm(data){

    console.log("data---serviceEtryForm-",JSON.stringify(data))
                               
     console.log("on submit---in else or add condition--",this.state.ServiceEntryPoints.listOfEntryType)
    
    /*
    * adding property entryType to data object
    */

     this.getEntryTypeOfSelectedEntryTypeId(data)
    /* console.log("entryTypeOfSelectedEntryTypeId----",entryTypeOfSelectedEntryTypeId)
     data["entryType"] = entryTypeOfSelectedEntryTypeId;*/
     console.log("data--adding entryType--",data)

   /*
    * adding property description to data object from Service entry Point data 
   */

   this.getDescOfSelectedEntryPoint(data)
   console.log("data ------",data)
   /*
    *for runtime change, send callback function 'makeRunTimeChange' to this action creator 
   */
   this.props.addServiceEntryPoint(data,this.props.profileId,this.makeRunTimeChange)
   
   this.handleCancel();
   //this.makeRunTimeChange();
  }


  render() {
    const { onSubmit } = this.props
  	const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleCancel}
      />,
      
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleSubmit}
      />
    ];
    return (
      <div>
      <DialogNewEntryPts
          title="New Service Entry Points Configuration"
          actions={actions}
          modal={false}
          open={this.state.ServiceEntryPoints.openNewServiceEntryPtsDialog}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
          refs="insidedialog"
          titleStyle = {styles.title}
        >
         { /* As new updated form when passed to server or store must contain its primary key field 
           * i.e ._links to update the same row .So inserting property _links to data .
           * when condition this.state.applicationdata.openAppDialogType == "edit" satisfies
           */
        }
      <FormNewServiceEntry ref="newServiceEntryPtsForm" onSubmit={this.submitForm.bind(this)}/>
      </DialogNewEntryPts>
      </div>
    );
  }
} 

function mapStateToProps(state) {
  console.log("openNewDCDialog---",state.ServiceEntryPoints)
  return {
   ServiceEntryPoints :state.ServiceEntryPoints,
   ListOfServiceEntryPointType : state.ServiceEntryPoints.listOfEntryType,
   entryPointFile  : state.Keywords.enableNDEntryPointsFile,
    trData : state.initialData.trData,
    ns_wdir: state.initialData.ns_wdir,
    homeData: state.initialData.homeData, 
    trModeDetail: state.trModeDetail
   };
}

//method to dispatch actions to the reducers
function mapDispatchToProps(dispatch) {
  //const actionMap = { loadInitTreeData: bindActionCreators(fetchTreeData, dispatch) };
  //return actionMap;
return bindActionCreators(actionCreators, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Dialog_ServiceEntryPts);