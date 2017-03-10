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
import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import * as actionCreators from '../../../../actions/index';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';


//Importing files
//import * as actionCreators from '../../../../../actions/index';
//import { triggerRunTimeChanges } from '../../../../../actions/runTimeChanges';

export const fields = ['headerName', 'index', 'operation', 'opVal']



const items = [];

class AddComp extends React.Component {
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
}



  componentWillMount() {

  }


  componentWillReceiveProps(nextProps) {
      console.log("nextProps---",nextProps)
  }

  handleDelThreadNames(){
      console.log("this.props.value.count--",this.props.value)
      
      this.props.deleteThreadNames(this.props.value.count)
  }

  onChangeASPositiveThreadFilter(evt,value){
      this.props.threadNames(evt,value)
  }

  render() {
    return (
         <div className = "row">
            <div className = "col-md-6">
              <TextField
                  hintText="Hint Text" 
                  floatingLabelText="AS Positive Thread Filters"
                  onChange = {this.onChangeASPositiveThreadFilter.bind(this)}
                />
            </div>

        {/*   <div className = "col-md-3">
                <IconButton  tooltip="Delete Thread" onTouchTap={this.handleDelThreadNames.bind(this)}><FontIcon color="#FFF" className="material-icons">delete</FontIcon></IconButton>
  </div> */}
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
export default connect(mapStateToProps, mapDispatchToProps)(AddComp);
