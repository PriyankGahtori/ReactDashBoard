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
    console.log("nextProps--",nextProps)
    let list=[];
    if (nextProps.hideIndexField) {
      if (nextProps.fqm != null) {
        let currType = this.getTypeReturnType(this.props.fqm)
        let nextType = this.getTypeReturnType(nextProps.fqm)


        if (currType != nextType) {
          list = opData.opValList(nextType)
          this.setState({ opList: list })
        }
      }
    }
    else {

      let currType = this.getType(this.props.fqm, this.state.indexVal)
      let nextType = this.getType(nextProps.fqm, this.state.indexVal)


      if (currType != nextType) {
        list = opData.opValList(nextType)
        this.setState({ opList: list })
      }
    }
  }





  handleChange(event, index, value) {
    var operationName;
    this.state.opData.map(function (val) {
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
    this.setState({
      value: val,
      //               opList :list
    })
    this.props.onCustomValTypeChange(val, valName)
  }

  handleOperationChange(evt, value) {
    let operationName;
    let opValCss;
    let opValExtractCss;
    this.state.opList.map(function (data) {
      if (data.id == value) {
        operationName = data.opVal
      }
    })
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
    this.props.onHdrNameChange(value)
  }

  indexChange(evt, value) {


    let indexErrMsgCss;
    let fqmEmptyMsg;
    let fqmErrorMsgCss;

    if(isNaN(value)){
       indexErrMsgCss ='show',
       fqmEmptyMsg = 'hidden',
       fqmErrorMsgCss = 'hidden'
      
    }
    else if(this.props.fqm == null){
      fqmEmptyMsg = 'show',
      indexErrMsgCss = 'hidden',
      fqmErrorMsgCss = 'hidden'
    }
    else{
        let li = this.props.fqm.indexOf(')');
        let bi = this.props.fqm.indexOf('(');

        let str = '';
        str = this.props.fqm.substring(li,bi+1)
        
      if(str == null || str.length == 0 || str === ''){
          fqmErrorMsgCss ='show',
          indexErrMsgCss ='hidden',
          fqmEmptyMsg = 'hidden'
      
        }
        else{
          fqmErrorMsgCss = 'hidden',
          indexErrMsgCss= 'hidden',
          fqmEmptyMsg = 'hidden'

        }
    }

 //   this.setState({ indexVal: value })
    this.props.onIndexChange(value)
    let type = this.getType(this.props.fqm, value);
    let list = [];
    list = opData.opValList(type);
    this.setState({ opList: list ,
                    indexVal: value,
                    'fqmErrorMsgCss':fqmErrorMsgCss,
                    'indexErrMsgCss':indexErrMsgCss,
                    'fqmEmptyMsg':fqmEmptyMsg
    })

  }

  getTypeReturnType(fqm) {
    //for getting return Type
    let returnType = "NA";
    if (fqm != null) {
      let li = fqm.indexOf(')');
      let i = li + 1;

      let pi = 1;
      let charArr = fqm.split('');
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

        while (i < li) {
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
               <p style = {{color: 'red',paddingTop:20,fontSize:12}}>Enter Only Numbers</p>
          </div>
           <div className = {`col-md-5  ${this.state.fqmErrorMsgCss}`} style = {{paddingLeft:'92px'}}>
               <p style = {{color: 'red',paddingTop:10,fontSize:12}}>Fqm does not contains any arguments</p>
          </div>
            <div className = {`col-md-5 ${this.state.fqmEmptyMsg}`} style = {{paddingLeft:'92px'}}>
               <p style = {{color: 'red',paddingTop:10,fontSize:12}}>Fqm is required</p>
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
