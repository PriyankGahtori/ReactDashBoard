//Importing React components
import React from 'react';
import {hashHistory } from 'react-router';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import {Card} from 'material-ui/Card';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators  from '../../../../actions/index';
import {triggerRunTimeChanges} from '../../../../actions/runTimeChanges';


class BusinessTransaction extends React.Component {
  
  constructor(props) {
    super(props)    
    this.state = {btRuleType : this.props.initialValKeywords.BTRuleConfig}
    this.loader = this.loader.bind(this)
    this.loadScreen = this.loadScreen.bind(this)
    if(this.props.initialValKeywords.BTRuleConfig == "global")
       console.log("calling initializeBTFields method")
       this.props.initializeBTFields(this.props.params.profileId,this.loader,this.loadScreen);
  }

  loadScreen(){
   console.log("loadscreen method called")
  }

  componentWillMount(){
  
  /*   if(this.props.initialValKeywords.BTRuleConfig == "global")
       console.log("calling initializeBTFields method")
       this.props.initializeBTFields(this.props.params.profileId,this.loader,this.loadScreen);
       */

    console.log("loadScreen method called")
    let currPath = `${this.props.location.pathname}`;
        currPath = currPath.substring(0, currPath.indexOf("bt")+2)
    
    let btRuleType = this.props.initialValKeywords.BTRuleConfig  === "global" ? "" : this.props.initialValKeywords.BTRuleConfig 
    let routeURL = `${currPath}/${btRuleType}`;
    hashHistory.push(routeURL);
    console.log("this.props.initialValKeywords.BTRuleConfig--",this.props.initialValKeywords.BTRuleConfig)
    
  }

  componentWillReceiveProps(nextProps){
    console.log("nextProps--",nextProps.initialValKeywords)
    if(this.props.initialValKeywords!=nextProps.initialValKeywords){
      
    }

  }

  loader(){
 //var message = {'title': ' BT Global Loaded' , 'msg' : '' }
  this.props.triggerLoader(false,null)

}

  getProfileName(profileId)
  {
    let profileData = this.props.homeData[1]
                              .value
                              .filter(function(obj){return obj.id == profileId });  
    if(profileData.length != 0)
       return profileData[0].name;
    else
      return null;          
  }

  handleChange(event,value){
  	let val = value === "global" ? "" : value

    //updating keyword 'BTRuleConfig' value a/c to type selected
    let keywordData = Object.assign({},this.props.getAllKeywordData.data);
    keywordData.BTRuleConfig["value"] = value
    this.props.submitKeywordData(keywordData,this.props.params.profileId);

    //action for runtime change
    var filePath = this.props.ns_wdir + "/ndprof/conf/" + this.getProfileName(this.props.trModeDetail.profileId) ;
    if(value == "global")
       filePath = filePath  + '/btGlobal.btr'
    else
       filePath = filePath  + '/btPattern.btr' 


   let keywordDataList = [];
     keywordDataList.push("BTRuleConfig" + "=" + filePath); 
     
   triggerRunTimeChanges(this.props.trData, this.props.trModeDetail,keywordDataList); 

    let currPath = `${this.props.location.pathname}`;
        currPath = currPath.substring(0, currPath.indexOf("bt")+2)

    let routeURL = `${currPath}/${val}`;
    hashHistory.push(routeURL);
    if(value === "global")
       this.props.initializeBTFields(this.props.params.profileId,this.loader);
  }

  render() {
    
    return (   
        <div>
        <Card style={{'paddingLeft':5,'background':'#fff', 'color':'#000'}}> 
        <h2 style={{'position': 'relative'}}>HTTP Business Transaction Configuration</h2>
	      <div className='row' style= {{'padding':'4px 0','position': 'relative', color: '#FFF'}}>
	      <RadioButtonGroup name="btType" 
      		className={'col-xs-4 col-md-4'} 
      		style={{display: 'flex'}}
      		onChange={this.handleChange.bind(this)}
      		defaultSelected={this.state.btRuleType}
          >

	        <RadioButton
	          value="global"
            label="URI without Query Parameters" 
            labelStyle={{'color':'#282828'}}
            disabled = {this.props.profileDisabled}            
          /> 
        
	        <RadioButton
	          value="pattern" 
            label="Pattern"
            labelStyle={{'color':'#282828'}}
            disabled = {this.props.profileDisabled}
           />
        
	      </RadioButtonGroup>

	    </div> 
      </Card>
      {this.props.children}

      </div>     
    );

  }
}
function mapStateToProps(state) {
  return {
    initialValKeywords :state.Keywords.initializeKeywords,
    getAllKeywordData :state.Keywords,
    trData : state.initialData.trData,
    trModeDetail: state.trModeDetail,
    homeData: state.initialData.homeData,
    ns_wdir: state.initialData.ns_wdir,
    profileDisabled: state.profileDisabled.disabled
   };
}

//method to dispatch actions to the reducers
function mapDispatchToProps(dispatch) {

return bindActionCreators(actionCreators, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(BusinessTransaction);