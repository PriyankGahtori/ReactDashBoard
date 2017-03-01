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
import * as opData from './OperationVal';
import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';


//Importing files
import * as actionCreators from '../../../../../actions/index';
import { triggerRunTimeChanges } from '../../../../../actions/runTimeChanges';

export const fields = ['headerName', 'index', 'operation', 'opVal']



var arrStringOperation = [{ 'id': 1, 'option': 'EQUALS' },
{ 'id': 2, 'option': 'NOT EQUALS' },
{ 'id': 3, 'option': 'CONTAINS' },
{ 'id': 4, 'option': 'STARTS WITH' },
{ 'id': 5, 'option': 'ENDS WITH' }
];

var arrNumericOperation = [{ 'id': 6, 'option': 'EQUAL' },
{ 'id': 7, 'option': 'NOT EQUAL' },
{ 'id': 8, 'option': 'LESS THAN' },
{ 'id': 9, 'option': 'GREATER THAN' },
{ 'id': 10, 'option': 'LESS THAN EQUAL TO' },
{ 'id': 11, 'option': 'GREATER THAN EQUAL TO' }
];

var arrBooleanOperation = [{ 'id': 12, 'option': 'TRUE' },
{ 'id': 13, 'option': 'FALSE' }

];

var arrCharOperation = [{ 'id': 14, 'option': 'EXCEPTION' }];





var arrOperation = [{ 'id': 0, operation: 'String' },
                    { 'id': 1, operation: 'Integer' },
                    { 'id': 2, operation: 'Decimal' },
];

const items = [];

class AddComponent extends React.Component {
  constructor(props) {
    super(props)
    console.log("this.props--", this.props)

    let list=[];
    if (this.props.hideIndexField) {
      if (this.props.fqm != null) {
        let type = this.getTypeReturnType(this.props.fqm)
        list = opData.opValList(type)
        }
      }
    
  
    this.state = {
      paramName: '',
      operation: '',
      btName: '',
      value: '',
      operation: '',
      hdrName: '',
      index: '',
      opValCss: 'hidden',
      opValExtractCss: 'hidden',
      opList: list,
      indexErrMsgCss:'hidden',
      fqmErrorMsgCss:'hidden',
      fqmEmptyMsg:'hidden'

    }

    this.handleChange = this.handleChange.bind(this);
  
}



  componentWillMount() {

  }

  componentWillReceiveProps(nextProps) {

    console.log("componentWillReceiveProps add componenet loaded--",nextProps)
    let list;
    if (nextProps.hideIndexField) {
      if (nextProps.fqm != null) {
        let currType = this.getTypeReturnType(this.props.fqm)
        let nextType = this.getTypeReturnType(nextProps.fqm)


        if (currType != nextType) {
          list = opData.opValList(nextType)
          console.log("list---", list)
          this.setState({ opList: list })
        }
      }
    }
    else {

      let currType = this.getType(this.props.fqm, this.state.indexVal)
      let nextType = this.getType(nextProps.fqm, this.state.indexVal)


      if (currType != nextType) {
        list = opData.opValList(nextType)
        console.log("list---", list)
        this.setState({ opList: list })
      }
    }
  }





  handleChange(event, index, value) {
    var operationName;
    this.state.opData.map(function (val) {
      console.log("val--", val)
      if (val.id == value)
        operationName = val.option;
    })
    this.setState({ value: value })
    this.props.operationChange(value, this.props.value.btMethodRuleId, operationName)

  }






  handleCustomValType(evt, val) {

    let valName;
    arrOperation.map(function (data) {
      if (data.id == val) {
        valName = data.operation
      }
    })
    console.log("valName--", valName)
    this.setState({
      value: val,
      //               opList :list
    })
    this.props.onCustomValTypeChange(val, valName)
  }

  handleOperationChange(evt, value) {
    console.log("value--", value)
    let operationName;
    let opValCss;
    let opValExtractCss;
    this.state.opList.map(function (data) {
      if (data.id == value) {
        operationName = data.opVal
      }
    })
    console.log("operationName---", operationName)
    if (operationName == "CAPTURE" || operationName == "EXCEPTION") {
      opValCss = "hidden",
        opValExtractCss = 'hidden'
    }
    else if (operationName == "EXTRACT_SUBPART") {
      opValExtractCss = "show",
        opValCss = "hidden"
    }
    else {
      opValCss = "show",
        opValExtractCss = 'hidden'
    }
    this.props.onOperationChange(value, operationName)
    this.setState({
      operation: value,
      opValCss: opValCss,
      opValExtractCss: opValExtractCss

    })

  }

  hdrNameChange(evt, value) {
    console.log("hdrNameChange method called", value)

    this.props.onHdrNameChange(value)
  }

  indexChange(evt, value) {
    console.log("indexChange method called")
  /*  var data = this.props.fqm
    console.log("data---",data)
    if(data != null ){
    if(data.includes("(") && data.includes(")")){
      let charArr = data.split('');
      console.log("charArr--",charArr)
      console.log("charArr--",charArr.length)
      console.log("value---",value)
      if(value > charArr.length || value < charArr.length){
         this.setState({indexErrMsgCss:'show',
                        fqmErrorMsgCss:'hidden',
                        fqmEmptyMsg:'hidden'
        })
       }
       else{
        this.setState({ indexVal: value ,
                        indexErrMsgCss:'hidden',
                        fqmErrorMsgCss:'hidden'
          
        })
        this.props.onIndexChange(value)
       let type = this.getType(this.props.fqm, value);
        let list = opData.opValList(type);
        console.log("list----", list)
        this.setState({ opList: list })
       }
  }
  else{
    console.log("fqm not valid")
    this.setState({fqmErrorMsgCss:'show',
                    indexErrMsgCss:'hidden'
    })
  }
}

else{
  this.setState({fqmEmptyMsg:'show'})
}*/
    this.setState({ indexVal: value })
    this.props.onIndexChange(value)
    console.log("index--", this.props.fqm)

    let type = this.getType(this.props.fqm, value);

    console.log("type---", type)
    let list = opData.opValList(type);
    console.log("list----", list)
    this.setState({ opList: list })


  }

  getTypeReturnType(fqm) {


    //for getting return Type
    let returnType = "NA";
    if (fqm != null) {
      let li = fqm.indexOf(')');
      let i = li + 1;

      let pi = 1;
      let charArr = fqm.split('');
      console.log("charArr----", charArr)

      console.log("iiiiiiiiiiiiiii--", charArr[i])
      //      System.out.println("pi " + pi + ", index - " + index + ", char - " + charArr[i] + ", i" + i + " bracket -" + (bi +1));
      switch (charArr[i]) {
        case 'Z':
          returnType = "boolean";
          break;
        case 'B':
          returnType = "byte";
          break;
        case 'C':
          returnType = "char";
          break;
        case 'S':
          returnType = "short";
          break;
        case 'I':
          returnType = "int";
          break;
        case 'J':
          returnType = "long";
          break;
        case 'F':
          returnType = "float";
          break;
        case 'D':
          returnType = "double";
          break;
        case 'L':
        case '[':
          while (charArr[i++] != ';')
            ;
          returnType = "object/string";
          break;
        default:
          returnType = "void";
          break;
      }

      return returnType;
      //let list = opData.opValList(returnType);
    }
  }

  getType(fqm, index) {

    //    let fqm = this.props.fqm;
    if (fqm != null) {
      if (index != -1) {
        let li = fqm.indexOf(')');
        let bi = fqm.indexOf('(');
        let i = bi + 1;

        let pi = 1;
        let charArr = fqm.split('');
        console.log("charArr----", charArr)

        while (i < li) {
          console.log("iiiiiiiiiiiiiii--", charArr[i])
          //      System.out.println("pi " + pi + ", index - " + index + ", char - " + charArr[i] + ", i" + i + " bracket -" + (bi +1));
          switch (charArr[i]) {
            case 'Z':
              if (pi == index)
                return "boolean";
              break;
            case 'B':
              if (pi == index)
                return "byte";
              break;
            case 'C':
              if (pi == index)
                return "char";
              break;
            case 'S':
              if (pi == index)
                return "short";
              break;
            case 'I':
              if (pi == index)
                return "int";
              break;
            case 'J':
              if (pi == index)
                return "long";
              break;
            case 'F':
              if (pi == index)
                return "float";
              break;
            case 'D':
              if (pi == index)
                return "double";
              break;
            case 'L':
            case '[':
              while (charArr[i++] != ';' && i < charArr[i].length)
                ;
              if (pi == index)
                return "object/string";
            default:
              if (pi == index)
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

  onOperationVal(evt, value) {
    this.props.onOperationVal(value);
  }

  lbChange(evt, value) {
    this.props.lbChange(value);
  }

  rbChange(evt, value) {
    this.props.rbChange(value);
  }

  handleClickOpChange(){
    console.log("handleClickOpChange methodb called--")
  
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
              style={{ width: '220px' }}
              />
          </div>

          <div className={`col-md-4 ${this.props.hideIndexField ? 'hidden' : 'show'}`} style={{ position: 'relative', width: '70px' }}>
            <TextField
              floatingLabelText="Index "
              defaultValue={this.state.index}
              onChange={this.indexChange.bind(this)}
              style={{ position: 'relative', left: '100px', width: '220px' }}
              />
          </div>

          <div className = {`col-md-5  ${this.state.indexErrMsgCss}`} style = {{paddingLeft:'92px'}}>
               <p style = {{color: 'red',paddingTop:20}}>Index is not valid.Please check fqm</p>
          </div>
           <div className = {`col-md-5  ${this.state.fqmErrorMsgCss}`} style = {{paddingLeft:'92px'}}>
               <p style = {{color: 'red',paddingTop:10}}>Fqm is not correct .Please check it</p>
          </div>
            <div className = {`col-md-5 ${this.state.fqmEmptyMsg}`} style = {{paddingLeft:'92px'}}>
               <p style = {{color: 'red',paddingTop:10}}>Fqm is required</p>
          </div>
          
          </div>

        <div className="row ">

          <div className="col-md-4"  >
            <DropDownMenu
              onChange={this.handleCustomValType.bind(this)}
              value={this.state.value}
              hintText="Custom Value Type"
              style={{ position: 'relative', left: '0px', top: '0px', width: '200px' }}
              >
              {
                arrOperation.map((data, index) => (
                  <MenuItem value={data.id} primaryText={data.operation} />
                ))
              }
            </DropDownMenu>
          </div>

          <div className="col-md-4" >
            <DropDownMenu
              onChange={this.handleOperationChange.bind(this)}
              value={this.state.operation}
              onClick = {this.handleClickOpChange.bind(this)}
              hintText="Select Operation"
              style={{ width: '200px', position: 'relative', left: '147px' }}
              >
              {
                this.state.opList.map((data, index) => (
                  <MenuItem value={data.id} primaryText={data.opVal} />
                ))
              }
            </DropDownMenu>
          </div>

        </div>

        <div className={`row col-md-5 ${this.state.opValCss}`}>
          <TextField
            floatingLabelText="operation Value "
            onChange={this.onOperationVal.bind(this)}
            style={{ position: 'relative', left: '0px', width: '220px' }}
            />
        </div>


        <div className={`row ${this.state.opValExtractCss}`}>
          <div className="col-md-5">
            <TextField
              floatingLabelText="Left Bound "
              onChange={this.lbChange.bind(this)}
              style={{ position: 'relative', left: '0px', width: '220px' }}
              />
          </div>
          <div className="col-md-5">
            <TextField
              floatingLabelText="Right Bound "
              onChange={this.rbChange.bind(this)}
              style={{ position: 'relative', left: '107px', width: '220px' }}
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
