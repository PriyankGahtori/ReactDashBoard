import React from 'react';
import MultiSelect from 'react-select';
import axios from 'axios';
import * as url from '../actions/restURL';
import { bindActionCreators } from 'redux';
import * as actionCreators  from '../actions/index';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';

// Be sure to include styles at some point, probably during your bootstrapping
import 'react-select/dist/react-select.css';

var options = [
    { value: 'one', label: 'One' },
    { value: 'two', label: 'Two' },
    { value: 'three', label: 'Three' }
   ];

  
const styles = {
  text: {
    fontSize:18,
    paddingLeft:6
  }};

 class InstrProfileMultiSelect extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {value:[]};
    this.state = {listData :[]};
  }

  componentWillMount(){
       this.props.initializeInstrProf();
      this.props.getListOfXmlFiles();
     
  }

  componentWillReceiveProps(nextProps){
    if(this.props.getAllKeywordData != nextProps.getAllKeywordData){
      console.log("getAllKeywordData data cahnged")
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
    var data = this.state.value;
    data.map(function(value){
      console.log("value---",value)
      formData.push(value.value)
    })
    var finaldata = {"instrProfile":formData}
    console.log("finaldata---",finaldata)
    this.props.handleSubmit(finaldata)
  }

  

  render() {
  

    return (
      <div>
      <div className = "row">
       <div className = "col-md-3">
        <p style={styles.text}>Instr Profiles </p>
      </div>
        <div className ="col-md-3">
        	<MultiSelect multi
            name ="instrProfileMultiSelect"
           // value = {this.state.getAllKeywordData.initializeKeywords.instrProfile}
            value = {this.state.value}
            options = {this.props.getAllKeywordData.listOfXmlFilesInstr}
            onChange={this.updateSelected.bind(this)}
        	/>
          </div>

        <div className = "col-md-3">
          <FlatButton
          label="Submit"
          primary={true}
          keyboardFocused={true}
          onClick={this.submitInstr.bind(this)}
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
    getAllKeywordData :state.Keywords
   };
}

//method to dispatch actions to the reducers
function mapDispatchToProps(dispatch) {
  //const actionMap = { loadInitTreeData: bindActionCreators(fetchTreeData, dispatch) };
  //return actionMap;
return bindActionCreators(actionCreators, dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(InstrProfileMultiSelect);