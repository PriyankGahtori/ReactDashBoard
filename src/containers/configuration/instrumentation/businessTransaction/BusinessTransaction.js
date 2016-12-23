//Importing React components
import React from 'react';
import {hashHistory } from 'react-router';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import {Card} from 'material-ui/Card';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators  from '../../../../actions/index';


class BusinessTransaction extends React.Component {
  
  constructor(props) {
    super(props)    
    console.log("BTRuleConfig---",this.props.initialValKeywords)
    this.state = {btRuleType : this.props.initialValKeywords.BTRuleConfig}
  }

  componentWillMount(){
    console.log("in comp--bt--",this.state.btRuleType)
    let currPath = `${this.props.location.pathname}`;
    console.log("currPath---in com--",currPath)
        currPath = currPath.substring(0, currPath.indexOf("bt")+2)

    let routeURL = `${currPath}/${this.state.btRuleType}`;
    console.log("routeURL---",routeURL)
    hashHistory.push(routeURL);
  }

  componentWillReceiveProps(nextProps){
    console.log("nextProps--",nextProps.initialValKeywords)
    if(this.props.initialValKeywords!=nextProps.initialValKeywords){

    }

  }



  handleChange(event,value){
  	value = value === "global" ? "" : value
    //let routeURL = `instrumentation/${profileId}/bt/${value}`;
    //updating keyword 'BTRuleConfig' value a/c to type selected
    let keywordData = Object.assign({},this.props.getAllKeywordData.data);
    keywordData.BTRuleConfig["value"] = value
    this.props.submitKeywordData(keywordData,this.props.params.profileId);

    let currPath = `${this.props.location.pathname}`;
    console.log("currPath---",currPath)
        currPath = currPath.substring(0, currPath.indexOf("bt")+2)

    let routeURL = `${currPath}/${value}`;
    console.log("routeURL---",routeURL)
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
    getAllKeywordData :state.Keywords
   };
}

//method to dispatch actions to the reducers
function mapDispatchToProps(dispatch) {

return bindActionCreators(actionCreators, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(BusinessTransaction);