//Importing React components
import React from 'react';
import MultiSelect from 'react-select';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';

//Importing files
import * as actionCreators from '../../../../../actions/index';
//import {triggerRunTimeChanges} from '../../../actions/runTimeChanges';

// Be sure to include styles at some point, probably during your bootstrapping
import 'react-select/dist/react-select.css';

var options = [
    { value: 'methodBasedCapturing', label: 'Method Based Capturing' ,'id':0},
    { value: 'httpReqBasedCapturing', label: 'Http Request Based Capturing','id':1 },
    { value: 'httpRespBasedCapturing', label: 'Http Response Based Capturing' ,'id':2}
   ];

  
const styles = {
  text: {
    fontSize:15,
  
    
      }};

 class MultiSelectCapturingOptionMenu extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {value:[]};
    this.state = {listData :[]};
  }

  componentWillMount(){
     // this.props.initializeInstrProf();
     
  }

  componentWillReceiveProps(nextProps){
  }

  updateSelected(value){
    console.log("updateSelected function called---",value)
    this.setState({value });
  }
  
  submitInstr(){
    console.log("in sub,itting ---",this.state.value)
   // this.props.listOfCapturingMethodsToConfigure(data);
  
    /*var formData = [];

    //for runtime changes
    let keywordDataList = [];

    var data = this.state.value;
    data.map(function(value){
      console.log("value---",value)
      keywordDataList.push("instrProfile" + "=" + value.value);
      formData.push(value.value)
    })
    var finaldata = {"instrProfile":formData}
    console.log("finaldata---",finaldata)
    this.props.handleSubmit(finaldata)


    if(keywordDataList.length == 0)
      keywordDataList.push("instrProfile" + "=" + "global.xml");

    //action for runtime changes
//    triggerRunTimeChanges(this.props.trData, this.props.trModeDetail,keywordDataList);    
*/

  }

  submitListOfMethodsToConfigure(){
        this.props.listOfCapturingMethodsToConfigure(this.state.value);
  }
  render() {
    return (
      
      <div className = "row"  >
      <div className ="col-md-5" style={{paddingLeft:0,zIndex:1000}}>
        </div>
        <div   className = "col-md-4" >

        	<MultiSelect multi
            name ="instrProfileMultiSelect"
           // value = {this.state.getAllKeywordData.initializeKeywords.instrProfile}
            value = {this.state.value}
            options = {options}
            style = {{width:400,zIndex:1000}}
            onChange={this.updateSelected.bind(this)}	 />
             </div>
          <div  className = "col-md-2"  style={{paddingLeft:100}} >
          <RaisedButton
            label="Submit"
            onClick={this.submitListOfMethodsToConfigure.bind(this)}
            disabled = {this.props.profileDisabled}
            backgroundColor="#18494F"
            labelColor="#FFF"
            labelStyle={{fontSize:12}}>
          </RaisedButton>
         
         </div>
         </div>


   
    );
  }
}

function mapStateToProps(state) {
  console.log("generalKeywords---",state.Keywords)
  return {
    getAllKeywordData :state.Keywords,
    trData : state.initialData.trData,
    trModeDetail: state.trModeDetail,
    profileDisabled: state.profileDisabled.disabled
   };
}

//method to dispatch actions to the reducers
function mapDispatchToProps(dispatch) {
  //const actionMap = { loadInitTreeData: bindActionCreators(fetchTreeData, dispatch) };
  //return actionMap;
return bindActionCreators(actionCreators, dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(MultiSelectCapturingOptionMenu);