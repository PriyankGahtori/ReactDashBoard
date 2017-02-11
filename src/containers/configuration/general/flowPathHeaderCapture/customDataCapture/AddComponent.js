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
                    {'id':1,operation:'Integer'},
                    {'id':2,operation:'Decimal'},
                     ];

const items = [];

class AddComponent extends React.Component {
  constructor(props) {
    super(props)
    console.log("this.props--", this.props)
    this.state = {
      paramName:'',
      operation:'',
      btName:'',
      value:'',
      operation:'',
      hdrName:'',
      index:'',
      opValCss:'hidden',
      opValExtractCss:'hidden',
      opList:this.props.opListForReturnType != null ? this.props.opListForReturnType :[]
      
    }

  /*  if(this.props.value != '' || this.props.value != null){
      if(this.props.value == "String")
        this.state={opData:arrStringOperation}

      else if(this.props.value == "Numeric")
        this.state={opData:arrNumericOperation}

      else if(this.props.value == "Boolean")
        this.state={opData:arrBooleanOperation}

      else if(this.props.value == "Char/Byte")
       this.state ={opData:arrCharOperation}
    }
    */
  

    this.handleChange = this.handleChange.bind(this);
  }



componentWillMount(){
    
}

componentWillReceiveProps(nextProps){
  console.log("nextProps.value--",nextProps.opListForReturnType)
 
  if (this.props.opListForReturnType != nextProps.opListForReturnType) {
        this.setState({opList:nextProps.opListForReturnType != null ? nextProps.opListForReturnType:[]})
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
  this.setState({value:value })
  this.props.operationChange(value,this.props.value.btMethodRuleId,operationName)

}






handleCustomValType(evt,val){ 

  console.log("val---",val)
//  let list = opData.opValList(val);
  let valName ;
  arrOperation.map(function(data){
                        if(data.id == val){
                            valName = data.operation
                        }
  })
  console.log("valName--",valName)
  this.setState({value:val,
  //               opList :list
    })
 this.props.onCustomValTypeChange(val,valName)
}

handleOperationChange(evt,value){
  console.log("value--",value)
  let operationName ;
  let opValCss ;
  let  opValExtractCss;
  this.state.opList.map(function(data){
    if(data.id == value){
      operationName = data.opVal
    } 
  })
  console.log("operationName---",operationName)
  if(operationName == "CAPTURE" || operationName == "EXCEPTION"){
    opValCss = "hidden",
    opValExtractCss='hidden'
  }
  else if(operationName == "EXTRACT_SUBPART"){
    opValExtractCss = "show",
     opValCss = "hidden"
  }
  else{
     opValCss = "show",
     opValExtractCss='hidden' 
  }
  this.setState({operation:value,
                opValCss :opValCss,
                opValExtractCss :opValExtractCss
                
    })
  this.props.onOperationChange(value,operationName)
}

hdrNameChange(evt,value){
    console.log("hdrNameChange method called",value)
    //this.setState({headerName:value})

    this.props.onHdrNameChange(value)
}

indexChange(evt,value){
    console.log("indexChange method called")
   // this.setState({indexVal:value})
    this.props.onIndexChange(value)
    console.log("index--",this.props.fqm)

    let type = this.getType(value);

    console.log("type---",type)
    let list = opData.opValList(type);
    console.log("list----",list)
    this.setState({opList :list})

    
}
  getType(index){

    let fqm = this.props.fqm;
    if(fqm != null){
    if(index != -1){
       let li = fqm.indexOf(')');
       let bi = fqm.indexOf('(');
       let i = bi + 1;

        let pi = 1;
        let charArr = fqm.split('');
        console.log("charArr----",charArr)

      while (i < li)
      {
        console.log("iiiiiiiiiiiiiii--",charArr[i])
//      System.out.println("pi " + pi + ", index - " + index + ", char - " + charArr[i] + ", i" + i + " bracket -" + (bi +1));
      switch (charArr[i])
      {
      case 'Z':
        if(pi == index)
          return "boolean";
        break;
      case 'B':
        if(pi == index)
          return "byte";
        break;
      case 'C':
        if(pi == index)
          return "char";
        break;
      case 'S':
        if(pi == index)
          return "short";
         break;
      case 'I':
        if(pi == index)
          return "int";
        break;
      case 'J':
        if(pi == index)
          return "long";
        break;
      case 'F':
        if(pi == index)
          return "float";
        break;
      case 'D':
        if(pi == index)
          return "double";
        break;
      case 'L':
      case '[':
        while (charArr[i++] != ';')
          ;
        if(pi == index)
          return "object/string";
      default:
        if(pi == index)
          return "void";
        break;
      }
      ++pi; i++;
    }
    //throw new InvalidOperationTypeException("Method argument index is not correct");
    return "NA";
  }
  }
}

onOperationVal(evt,value){
  console.log("value---",value)
  this.props.onOperationVal(value);
}

lbChange(evt,value){
  console.log("value---",value)
  this.props.lbChange(value);
}

rbChange(evt,value){
   console.log("value---",value)
   this.props.rbChange(value);
}



render() {
  return (
    <div>
    <div className="row">
      <div className="col-md-5">
        <TextField
          floatingLabelText="Header Name "
          defaultValue={this.state.hdrName}
          onChange={this.hdrNameChange.bind(this)}
          style = {{width:'220px'}}
          />
      </div>

         <div className = {`col-md-4 ${this.props.hideIndexField ?'hidden':'show'}`} style={{position:'relative',width:'70px'}}>
          <TextField
          floatingLabelText="Index "
          defaultValue={this.state.index}
          onChange={this.indexChange.bind(this)}
          style = {{position:'relative',left:'100px',width:'220px'}}
          />
    
        </div>

        

      </div>

      <div className = "row ">
      
      <div className="col-md-4"  >
        <DropDownMenu
         onChange={this.handleCustomValType.bind(this)} 
          value={this.state.value}
          hintText="Custom Value Type" 
          style={{position:'relative',left:'0px',top:'0px',width:'200px'}}
        >
      {
        arrOperation.map((data,index)=>(
            <MenuItem value={data.id}  primaryText={data.operation}/>
        ))
      }
      </DropDownMenu>
      </div>

        <div className="col-md-4" >
            <DropDownMenu
                onChange={this.handleOperationChange.bind(this)} 
                value={this.state.operation}
                hintText="Select Operation" 
               style={{width:'200px',position:'relative',left:'147px'}}
            >
          {
              this.state.opList.map((data, index) => (
              <MenuItem value={data.id}  primaryText={data.opVal}/> 
              ))
          }
      </DropDownMenu>
        </div>

      </div>

      <div className =  {`row col-md-5 ${this.state.opValCss}`}>
           <TextField
          floatingLabelText="operation Value "
          onChange={this.onOperationVal.bind(this)}
          style = {{position:'relative',left:'0px',width:'220px'}}
          />
      </div>

      <div className =  {`row ${this.state.opValExtractCss}`}>
        <div className = "col-md-5">
           <TextField
          floatingLabelText="Left Bound "
          onChange={this.lbChange.bind(this)}
          style = {{position:'relative',left:'0px',width:'220px'}}
          />
          </div>
          <div className = "col-md-5">
           <TextField
          floatingLabelText="Right Bound "
          onChange={this.rbChange.bind(this)}
          style = {{position:'relative',left:'107px',width:'220px'}}
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
export default connect(mapStateToProps, mapDispatchToProps)(AddComponent);
