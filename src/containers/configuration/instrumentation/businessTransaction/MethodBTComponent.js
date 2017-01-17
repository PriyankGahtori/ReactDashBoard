//Importing React components
import React from 'react';
import { hashHistory } from 'react-router';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import { Card } from 'material-ui/Card';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TextField from 'material-ui/TextField';
import DropDown from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

//Importing files
import * as actionCreators from '../../../../actions/index';
import { triggerRunTimeChanges } from '../../../../actions/runTimeChanges';


var arrStringOperation = [{  'option': 'EQUALS' },
                          { 'option': 'NOT EQUALS' },
                          {  'option': 'CONTAINS' },
                          {  'option': 'STARTS WITH' },
                          { 'option': 'ENDS WITH' }
                          ];

var arrNumericOperation = [{'option': 'EQ' },
                          { 'option': 'NE' },
                          { 'option': 'LT' },
                          { 'option': 'GT' },
                          { 'option': 'LE' },
                          { 'option': 'GE' }
                          ];

const items = [];

class MethodBTComponent extends React.Component {

  constructor(props) {
    super(props)
    console.log("this.props--", this.props)
    this.state = {
      paramName:'',
      operation:'',
      btName:'',
      opData :[]
    }
  }



componentWillMount(){
    
}

componentWillReceiveProps(nextProps){
  console.log("nextProps.value--",nextProps.value)
  if (this.props.value != nextProps.value) {
    //   console.log("diff---",nextProps.value)
      console.log("Object.keys(nextProps.value).length--",Object.keys(nextProps.value).length)
    if ((Object.keys(nextProps.value).length === 0)) {
      console.log("length zeo case")
     
        

      this.setState({
        paramName: '',
        operation: '',
        btName: ''
      })
    }
    else {

       if(nextProps.value == 'STRING')
      {
        this.setState({opData:arrStringOperation})
        // this.state.opData.push(arrStringOperation);
        console.log("opData string - ", this.state.opData)
      }
      else if(nextProps.value == 'NUMERIC')
      {
        this.setState({opData:arrNumericOperation})
        console.log("opData numeric - ", this.state.opData)
      }

     

      // this.setState({
      //   paramName: nextProps.value.paramName,
      //   operation: this.state.opData[0],
      //   btName: nextProps.value.btName
      // })
    }
    //   console.log("this.state--",this.state.valName)
  }
}

del(){

}

paramNameChange(evt, value){
  console.log("value---", value)
  console.log("this.props--", this.props.value)
  this.props.paramNameChange(value, this.props.value.id);
}

operationChange(evt, value){
  this.props.operationChange(value, this.props.value.id)
}

btNameChange(evt, value){
  this.props.btNameChange(value, this.props.value.id)
}

handleOperation(event, index, value){
  console.log("method called");
}

render() {
    console.log("this.state--",this.state.opData)
  return (
    <div className="row col-md-10">
      <div className="col-md-3">
        <TextField
          floatingLabelText="Parameter Name "
          defaultValue={this.state.paramName}
          onChange={this.paramNameChange.bind(this)}
          />
      </div>

      <div className="col-md-5">
        <DropDown
        maxHeight={300} 
        value={this.state.value} 
        onChange={this.operationChange.bind(this)}>
        { this.state.opData.map(function(val){
            <MenuItem value= {val.option} primaryText={val.option} />
          })
        }
        
      </DropDown>
       
      </div>

      <div className="col-md-2">
        <TextField
          floatingLabelText="BT Name"
          defaultValue={this.state.btName}
          onChange={this.btNameChange.bind(this)}
          />
      </div>
    </div>
  )
}
}

function mapStateToProps(state) {
  return {
    initialValKeywords: state.Keywords.initializeKeywords,
    getAllKeywordData: state.Keywords,
    trData: state.initialData.trData,
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
export default connect(mapStateToProps, mapDispatchToProps)(MethodBTComponent);