//Importing React components
import React from 'react';
import MultiSelect from 'react-select';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';

//Importing files
import * as actionCreators  from '../../../actions/index';
import * as url from '../../../actions/restURL';

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
    paddingLeft:6,
    paddingTop:20,
      }};

 class InstrProfileMultiSelect extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {value:[]};
    this.state = {listData :[]};
  }

  componentWillMount(){
     // this.props.initializeInstrProf();
      this.props.getListOfXmlFiles();
     
  }

  componentWillReceiveProps(nextProps){
    console.log("nextProps--instrProfilemultiselect--",nextProps.getAllKeywordData)
    console.log("this props--instrProfilemultiselect---",this.props.getAllKeywordData)
    if(this.props.getAllKeywordData != nextProps.getAllKeywordData){
      console.log("getAllKeywordData instrProfile data cahnged")
      this.setState({getAllKeywordData:nextProps.getAllKeywordData});
      this.setState({value:nextProps.getAllKeywordData.initializeKeywords.instrProfile})
    }  
  }

  updateSelected(value){
    console.log("updateSelected function called---",value)
    this.setState({value });
  }
  
  submitInstr(){
    console.log("in sub,itting ---",this.state.value)
    var formData = [];

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
    triggerRunTimeChanges(this.props.trData, this.props.trModeDetail,keywordDataList);    

  }

  

  render() {
  

    return (
      <div>
      <div className = "row">
       <div className = "col-md-3">
        <p style={styles.text}><b>Choose Instrumentation Profiles</b></p>
      </div>
        <div className ="col-md-3">
        	<MultiSelect multi
            name ="instrProfileMultiSelect"
           // value = {this.state.getAllKeywordData.initializeKeywords.instrProfile}
            value = {this.state.value}
            options = {this.props.getAllKeywordData.listOfXmlFilesInstr}
            onChange={this.updateSelected.bind(this)}
            style={{top:15}}
        	/>
          </div>

        <div className = "col-md-3">
          <FlatButton
          label="Submit"
          primary={true}
          keyboardFocused={true}
          onClick={this.submitInstr.bind(this)}
          style={{top:15}}
        />
      </div>
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
    trModeDetail: state.trModeDetail
   };
}

//method to dispatch actions to the reducers
function mapDispatchToProps(dispatch) {
  //const actionMap = { loadInitTreeData: bindActionCreators(fetchTreeData, dispatch) };
  //return actionMap;
return bindActionCreators(actionCreators, dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(InstrProfileMultiSelect);