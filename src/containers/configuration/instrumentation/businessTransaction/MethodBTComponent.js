//Importing React components
import React from 'react';
import { hashHistory } from 'react-router';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import { Card } from 'material-ui/Card';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';


//Importing files
import * as actionCreators from '../../../../actions/index';
import { triggerRunTimeChanges } from '../../../../actions/runTimeChanges';



var arrStringOperation = [{ 'id':1, 'option': 'EQUALS' },
                          { 'id':2 ,'option': 'NOT EQUALS' },
                          { 'id':3,'option': 'CONTAINS' },
                          { 'id':4, 'option': 'STARTS WITH' },
                          { 'id':5, 'option': 'ENDS WITH' },
                          {'id':6,'option':'EXCEPTION'}

                          ];

var arrNumericOperation = [{'id':7 ,'option': 'EQUAL' },
                          {'id':8, 'option': 'NOT EQUAL' },
                          { 'id':9,'option': 'LESS THAN' },
                          { 'id':10,'option': 'GREATER THAN' },
                          { 'id':11 ,'option': 'LESS THAN EQUAL TO' },
                          { 'id':12 ,'option': 'GREATER THAN EQUAL TO' },
                          { 'id':13 ,'option': 'EQ' },
                          { 'id':14 ,'option': 'NE' },
                          {'id':15,'option':'EXCEPTION'}
                          ];

  var arrBooleanOperation = [ {'id':16 ,'option': 'TRUE' },
                          {'id':17, 'option': 'FALSE' },
                          {'id':18,'option':'EXCEPTION'}
                          
  ];
  
  var arrCharOperation = [{'id':19,'option':'EXCEPTION'},
                          {'id':20 ,'option': 'EQ' },
                          {'id':21 ,'option': 'NE' },
                          
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
      value:0,
      opData:[]
    }

    if(this.props.value != '' || this.props.value != null){
      if(this.props.value == "String")
        this.state={opData:arrStringOperation}

      else if(this.props.value == "Numeric")
        this.state={opData:arrNumericOperation}

      else if(this.props.value == "Boolean")
        this.state={opData:arrBooleanOperation}

      else if(this.props.value == "Char or Byte")
       this.state =({opData:arrCharOperation})
    }
    this.handleChange = this.handleChange.bind(this);
  }



componentWillMount(){
    
}

componentWillReceiveProps(nextProps){
  console.log("nextProps.value--",nextProps.value)
  if (this.props.value != nextProps.value) {
       if(nextProps.value == "String"){
         console.log("string")
        this.setState({opData:arrStringOperation})
      }
      else if(nextProps.value == "Numeric")
        this.setState({opData:arrNumericOperation})

      else if(nextProps.value == "Boolean")
        this.setState({opData:arrBooleanOperation})

      else if(nextProps.value == "Char or Byte")
       this.setState({opData:arrCharOperation})
}
}


del(){

}

handleChange(event, index, value){
  console.log("this.state.opData--",this.state.opData)
  var operationName ;
  this.state.opData.map(function(val){
    console.log("val--",val)
    if(val.id == value)
      operationName = val.option;
  })
  console.log("operationName--",operationName)
  this.setState({value:value
  })
  this.props.operationChange(value,this.props.value.btMethodRuleId,operationName)

}

paramNameChange(evt, value){
  console.log("value---", value)
  console.log("this.props--", this.props.value)
  this.props.paramNameChange(value, this.props.value.btMethodRuleId);
}

operationChange(evt, value){
  
}

btNameChange(evt, value){
  this.props.btNameChange(value, this.props.value.btMethodRuleId)
}

handleOperation(event, index, value){
  console.log("method called");
}

render() {
  return (
    <div className="row col-md-12">
      <div className="col-md-3">
        <TextField
          floatingLabelText="Value"
          defaultValue={this.state.paramName}
          onChange={this.paramNameChange.bind(this)}
          style = {{width:'220px'}}
          />
      </div>

      <div className="col-md-4"  style={{position:'relative',left:'70px',width:'50px'}}>
        <DropDownMenu 
        onChange={this.handleChange} 
        value={this.state.value}
       style={{position:'relative',left:'70px',width:'200px'}}
       floatingLabelText = "Select Operation "
      >
       {
         this.state.opData.map((data, index) => (
         <MenuItem value={data.id}  primaryText={data.option} /> 
         ))
       }
      </DropDownMenu>
       
      </div>

        <div className = "col-md-3" style={{position:'relative',left:'170px',width:'70px'}}>
          <TextField
          floatingLabelText="BT Name "
          defaultValue={this.state.btName}
          onChange={this.btNameChange.bind(this)}
          style = {{position:'relative',left:'140px',width:'220px'}}
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