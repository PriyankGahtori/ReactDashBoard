//Importing React components
import { hashHistory } from 'react-router';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import { Card } from 'material-ui/Card';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import * as opData  from './OperationVal';
import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';


//Importing files
import * as actionCreators from '../../../../../actions/index';
import { triggerRunTimeChanges } from '../../../../../actions/runTimeChanges';

export const fields = ['headerName','index','operation','opVal']



var arrStringOperation = [{ 'id':1, 'option': 'EQUALS' },
                          { 'id':2 ,'option': 'NOT EQUALS' },
                          { 'id':3,'option': 'CONTAINS' },
                          { 'id':4, 'option': 'STARTS WITH' },
                          { 'id':5, 'option': 'ENDS WITH' }
                          ];

var arrNumericOperation = [{'id':6 ,'option': 'EQUAL' },
                          {'id':7, 'option': 'NOT EQUAL' },
                          { 'id':8,'option': 'LESS THAN' },
                          { 'id':9,'option': 'GREATER THAN' },
                          { 'id':10 ,'option': 'LESS THAN EQUAL TO' },
                          { 'id':11 ,'option': 'GREATER THAN EQUAL TO' }
                          ];

  var arrBooleanOperation = [ {'id':12 ,'option': 'TRUE' },
                          {'id':13, 'option': 'FALSE' }
                          
  ];
  
  var arrCharOperation = [{'id':14,'option':'EXCEPTION'}];


  var arrOperation = [{'id':0,operation:'String'},
                    {'id':1,operation:'Numeric'},
                    {'id':2,operation:'Byte or char'},
                    {'id':3,operation:'Boolean'}
                     ];

const items = [];

class HttpRespBasedCapturingAdd extends React.Component {
  constructor(props) {
    super(props)
    console.log("this.props--", this.props)
    this.state = {
      paramName:'',
      operation:'',
      btName:'',
      value:'',
      opList:[],
      opValue:'',
      hdrName:'',
      index:''
    }

    if(this.props.value != '' || this.props.value != null){
      if(this.props.value == "String")
        this.state={opData:arrStringOperation}

      else if(this.props.value == "Numeric")
        this.state={opData:arrNumericOperation}

      else if(this.props.value == "Boolean")
        this.state={opData:arrBooleanOperation}

      else if(this.props.value == "Char/Byte")
       this.state ={opData:arrCharOperation}
    }
    this.handleChange = this.handleChange.bind(this);
  }



componentWillMount(){
    
}

componentWillReceiveProps(nextProps){
  console.log("nextProps.value--",nextProps.active)
  {/*if (this.props.value != nextProps.value) {
       if(nextProps.value == "String"){
         console.log("string")
        this.setState({opData:arrStringOperation})
      }
      else if(nextProps.value == "Numeric")
        this.setState({opData:arrNumericOperation})

      else if(nextProps.value == "Boolean")
        this.setState({opData:arrBooleanOperation})

      else if(nextProps.value == "Char/Byte")
  this.setState({opData:arrCharOperation})
}
*/}
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
  this.setState({value:value })
  this.props.operationChange(value,this.props.value.btMethodRuleId,operationName)

}



operationChange(evt, value){
  
}

btNameChange(evt, value){
  this.props.btNameChange(value, this.props.value.btMethodRuleId)
}

handleOperationChange(evt,val){ 

  console.log("val---",val)
  let list = opData.opValList(val);
  console.log("list---",list)
  this.setState({value:val,
                 opList :list
    })
}

handleOperationValChange(evt,value){
  console.log("value--",value)
  this.setState({opValue:value})
}

hdrNameChange(evt,value){
    console.log("hdrNameChange method called")
    this.setState({headerName:value})
}

indexChange(evt,value){
    console.log("indexChange method called")
    this.setState({indexVal:value})
}

addData(){
  console.log("addData function called")
  /* if(this.state.headerName == '' || this.state.opValue == '' || this.state.value == '' ){
       this.setState({errMsgCss:'show'})
    }
    */
  var data = {headerName:this.state.headerName,
              indexVal:this.state.indexVal,
              opValue:this.state.opValue,
              value:this.state.value
  }
  console.log("data---",data)
  this.props.data(data);
}



render() {
  return (
    <div>
    <div className="row col-md-10">
      <div className="col-md-5">
        <TextField
          floatingLabelText="Header Name "
          defaultValue={this.state.hdrName}
          onChange={this.hdrNameChange.bind(this)}
          style = {{width:'220px'}}
          />
      </div>

    </div>        
      </div>
  )
}
}


function mapStateToProps(state) {
  return {
    appDetail: state.applicationdata,
    getAllKeywordData: state.Keywords
  };
}

//method to dispatch actions to the reducers
function mapDispatchToProps(dispatch) {
  //const actionMap = { loadInitTreeData: bindActionCreators(fetchTreeData, dispatch) };
  //return actionMap;
  return bindActionCreators(actionCreators, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(HttpRespBasedCapturingAdd);
