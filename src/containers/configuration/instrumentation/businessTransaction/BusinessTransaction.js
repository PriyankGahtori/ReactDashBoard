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
    console.log("BTRuleConfig---",this.props.initialValKeywords)
    this.state = {btRuleType : this.props.initialValKeywords.BTRuleConfig}
  }

  componentWillMount(){
    let currPath = `${this.props.location.pathname}`;
        currPath = currPath.substring(0, currPath.indexOf("bt")+2)

    let btRuleType = this.props.initialValKeywords.BTRuleConfig  === "global" ? "" : this.props.initialValKeywords.BTRuleConfig 
    let routeURL = `${currPath}/${btRuleType}`;
    hashHistory.push(routeURL);
  }

  componentWillReceiveProps(nextProps){
    console.log("nextProps--",nextProps.initialValKeywords)
    if(this.props.initialValKeywords!=nextProps.initialValKeywords){

    }

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
    console.log("this.props---",this.props.trData)
  	let val = value === "global" ? "" : value
    //let routeURL = `instrumentation/${profileId}/bt/${value}`;
    //updating keyword 'BTRuleConfig' value a/c to type selected
    let keywordData = Object.assign({},this.props.getAllKeywordData.data);
    keywordData.BTRuleConfig["value"] = value
    this.props.submitKeywordData(keywordData,this.props.params.profileId);

    //action for runtime change
   //triggerRunTimeChanges(trData,trModeDetail,formData);
   console.log("this.props.trModeDetail.profileId--",this.props.trModeDetail.profileId)
    var filePath = this.props.ns_wdir + "/ndprof/conf/" + this.getProfileName(this.props.trModeDetail.profileId) ;
    if(value == "global")
       filePath = filePath  + '/btGlobal.btr'
    else
       filePath = filePath  + '/btPattern.btr' 

    console.info("filePath", filePath);  

   let keywordDataList = [];
     keywordDataList.push("BTRuleConfig" + "=" + filePath); 
     
   triggerRunTimeChanges(this.props.trData, this.props.trModeDetail,keywordDataList); 


    let currPath = `${this.props.location.pathname}`;
        currPath = currPath.substring(0, currPath.indexOf("bt")+2)

    let routeURL = `${currPath}/${val}`;
    hashHistory.push(routeURL);
  }

  render() {
    
    return (   
        <div>
        <Card style={{'paddingTop':1 ,'paddingLeft':5,'background':'rgba(0,0,0,0.45)', 'color':'#FFF'}}> 
        <h3 style={{'bottom': 8, 'position': 'relative'}}>Transaction Configuration</h3>
	      <div className='row' style= {{'bottom':6,'position': 'relative', color: '#FFF'}}>
	      <RadioButtonGroup name="btType" 
      		className={'col-xs-4 col-md-4'} 
      		style={{display: 'flex'}}
      		onChange={this.handleChange.bind(this)}
      		defaultSelected={this.state.btRuleType}
          >

	        <RadioButton
	          value="global"
            label="Global" 
            labelStyle={{'color':'#FFF'}}
              
          /> 
        
	        <RadioButton
	          value="pattern" 
            label="Pattern"
            labelStyle={{'color':'#FFF'}}
           
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
    ns_wdir: state.initialData.ns_wdir
   };
}

//method to dispatch actions to the reducers
function mapDispatchToProps(dispatch) {

return bindActionCreators(actionCreators, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(BusinessTransaction);