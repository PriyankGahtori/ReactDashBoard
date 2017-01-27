//Importing React components
import React,{PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';
import RadioButton from 'material-ui/RadioButton';
import RaisedButton  from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import ConfirmDialog from 'material-ui/Dialog';
import MenuItem from 'material-ui/MenuItem';


//Importing React components
import Checkbox from '../../../../components/CheckboxWrapper';
import {submitKeywordData,initializeInstrException}  from '../../../../actions/index';
import DropDownMenu from '../../../../components/SelectFieldWrapper';
import MultiSelect from '../../../../components/MultiSelectWrapper';
import * as actionCreators  from '../../../../actions/index';




export const fields = ['enableCaptureHTTPReqFullFp',
                        'urlMode',
                        'hdrModeForReqcapture',
                        'selectedHdrsVal',
                        'configuredFile',
                        'captureMode',
                        'hdrValChr',
                        'enableCaptureHTTPResFullFp',
                        'responseData',
                        'hdrModeForRescapture'
];

var options = [
    { value: 'one', label: 'One' },
    { value: 'two', label: 'Two' },
    { value: 'three', label: 'Three' }
   ];

const styles = {
  input: {
    width: 150,
  },
  customWidth: {
    width: 200
  },
  multiSelect:{
  width:40
 
  }
}
class DropDownComponent extends React.Component {

  constructor(props) {
    super(props);
    console.log("this.props---",this.props)
    this.state = {
      'hdrTypeCss'    : 'hidden',
      'multiSelectCss': 'hidden',
      'configDropDownCss': 'hidden',
      'briefCaptureModeConfig' : 'hidden',
      'multiSelectRespCss':'hidden',
      'defaultValue':this.props.defaultValue

    }
  }
  componentWillMount() {
   // this.props.initializeInstrException();
 }

 componentWillReceiveProps(nextProps)
 {
  console.log("nextProps---",nextProps)
  if(this.props.getAllKeywordData != nextProps.getAllKeywordData){
    this.setState({getAllKeywordData : nextProps.getAllKeywordData,
    });
  }
}

handleHdrModeChange(event, index, value){
  this.setState({hdrMode:value})
  this.props.onChangeOption(event, index, value)
}


render() {
  return (
    <div>
{/*<pre>{this.state.defaultValue}</pre> */}
    <DropDownMenu 
                {...this.props}
                  style={styles.customWidth}
                  value = {this.state.hdrMode}
                  autoWidth={false}
                  customOnChange={this.handleHdrModeChange.bind(this)} 
                  defaultValue = {this.state.defaultValue}
                  floatingLabelText = {this.props.floatingLabelText}
                  autoScrollBodyContent={true}
                 >
                   {
                  this.props.data.map((val, index) => (  
                    <MenuItem value={val.id} key={val.id} primaryText={val.option}/>
                  ))
                }    
                </DropDownMenu>
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
  export default connect(mapStateToProps,mapDispatchToProps)(DropDownComponent);