//Importing React components
import React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import AddNewButton from 'material-ui/FloatingActionButton';
import AddIcon from 'material-ui/svg-icons/content/add';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import { Link } from 'react-router';
import FlatButton from 'material-ui/FlatButton';

//Importing files
import * as actionCreators  from '../../../../actions/index';
import DataGrid from '../../../../components/DCDetailTable';
import DialogHttpStatsCond from './Dialog_HttpStatsCond';

var columns = {
                "key" : "id",
                "data":['Condition Name','Condition','Description','FP Dump Mode','ID'],
                "field":['conditionName','condition','description','fpDumpMode','id']
              };

const NewButtonstyle = {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 30,
    left: 'auto',
    position: 'fixed',

};   

 class HTTPStatsMonitors extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.getHttpStatsCond(this.props.params.profileId);
    this.props.getListOfTypes();
    this.props.getListOfValueType();   //this functio gets list of valur type["String","nymeric..."]
  }

  componentWillReceiveProps(nextProps)
  {
    if(this.props.httpStatsData != nextProps.httpStatsData){
      this.setState({httpStatsData:nextProps.httpStatsData});
    }
  }

  handleOpen(){
    this.props.toggleStateAddHttpStatsCond();
  }

  render() {
    return (
     <div>
   
      <div className='row row-no-margin tableheader'>
        <div className="col-md-10">
              <h4>Http Stats Condition Monitor(s)</h4>
        </div>

        <DataGrid data = {this.props.httpStatsData.tableData} 
            pagination = {false} 
            ref        = "httpStatsConditionTable" 
            column     = {columns}
            onClick    = {this.handleClick}
           
         />

        <div>
         <AddNewButton style={NewButtonstyle} onTouchTap={this.handleOpen.bind(this)}>
            <AddIcon />
         </AddNewButton>
         <DialogHttpStatsCond profileId ={this.props.params.profileId}/>
          
        </div>
       </div>
    </div>
    );
  }
}

function mapStateToProps(state) {
  console.log("generalKeywords---",state.httpStatsData)
  return {
    httpStatsData :state.httpStatsData
   };
}

//method to dispatch actions to the reducers
function mapDispatchToProps(dispatch) {
  //const actionMap = { loadInitTreeData: bindActionCreators(fetchTreeData, dispatch) };
  //return actionMap;
return bindActionCreators(actionCreators, dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(HTTPStatsMonitors);