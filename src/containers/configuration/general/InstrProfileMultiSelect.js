//Importing React components
import React from 'react';
import MultiSelect from 'react-select';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';

//Importing files
import * as actionCreators  from '../../../actions/index';
import * as url from '../../../actions/restURL';
import {triggerRunTimeChanges} from '../../../actions/runTimeChanges';

// Be sure to include styles at some point, probably during your bootstrapping
import 'react-select/dist/react-select.css';

var options = [
    { value: 'one', label: 'One' },
    { value: 'two', label: 'Two' },
    { value: 'three', label: 'Three' }
   ];

  
const styles = {
  text: {
    fontSize:15,
  
    
      }};

 class InstrProfileMultiSelect extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {value:[],openSnack: false};
    this.state = {listData :[]};
  }

  componentWillMount(){
     // this.props.initializeInstrProf();
      this.props.getListOfXmlFiles();
     
  }

  componentWillReceiveProps(nextProps){
    if(this.props.getAllKeywordData != nextProps.getAllKeywordData){
      this.setState({getAllKeywordData:nextProps.getAllKeywordData});
      this.setState({value:nextProps.getAllKeywordData.initializeKeywords.instrProfile})
    }  
  }

  updateSelected(value){
    
    this.setState({value });
  }
  handleRequestClose(){
   
    this.setState({openSnack: false,instrSnack: false})
  }
  
  submitInstr(){
    var formData = [];

    //for runtime changes
    let keywordDataList = [];
    try{
    var data = this.state.value;
    data.map(function(value){
      console.log("value---",value)
      keywordDataList.push("instrProfile" + "=" + value.value);
      formData.push(value.value)
    })
    }
    catch(e){
      console.log(" exception Handled")
    }
    
    var finaldata = {"instrProfile":formData}
    if(formData.length > 0){
       this.props.handleSubmit(finaldata);
       this.setState({openSnack: true,instrSnack:false})
     }
     else
      this.setState({openSnack:false,instrSnack: true})
    
    /*if(keywordDataList.length == 0)
      keywordDataList.push("instrProfile" + "=" + "global.xml");
*/
    //action for runtime changes
    triggerRunTimeChanges(this.props.trData, this.props.trModeDetail,keywordDataList);    

  }
  render() {
    return (
      
      <div className = "row"  style={{paddingTop:10}}>
      <div className ="col-md-5" style={{paddingLeft:55,fontSize:'14'}}>
        Instrumentation Profiles 
      <p>  <i>Select profiles to instrument application methods</i></p>
        </div>
        <div   className = "col-md-3" style={{height:350,width:400}}>   
        	<MultiSelect multi
            name ="instrProfileMultiSelect"
           // value = {this.state.getAllKeywordData.initializeKeywords.instrProfile}
            value = {this.state.value}
            options = {this.props.getAllKeywordData.listOfXmlFilesInstr}
            onChange={this.updateSelected.bind(this)}	 />
             </div>
          <div  className = "col-md-1"  style={{paddingLeft:60}} >
          <RaisedButton
            label="Save"
            onClick={this.submitInstr.bind(this)}
            disabled = {this.props.profileDisabled}
            backgroundColor="#3a9e95"
            labelColor="#FFF"
            labelStyle={{fontSize:12}}>
          </RaisedButton>
         
         </div>
          <Snackbar
          open={this.state.openSnack}
          message="Instrumentation Profiles are submitted successfully"
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose.bind(this)}
          />
          <Snackbar
          open={this.state.instrSnack}
          message="Select any Instrumentation profiles for changes"
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose.bind(this)}
          />
         </div>


   
    );
  }
}

function mapStateToProps(state) {
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
export default connect(mapStateToProps,mapDispatchToProps)(InstrProfileMultiSelect);