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
import ConfirmDialog from 'material-ui/Dialog'
import SnackBar from 'material-ui/Snackbar';

//Importing files
import * as actionCreators  from '../../../../actions/index';
import DataGrid from '../../../../components/DCDetailTable';
import DialogHttpStatsCond from './Dialog_HttpStatsCond';

var columns = {
                "key" : "hscid",
                "data":['Condition Name','Condition','Description','FP Dump Mode','ID'],
                "field":['conditionName','condition','description','fpDumpMode','hscid']
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
    this.loader = this.loader.bind(this)
    this.state = {cnfrmDialog: false,openSnack:false}
    this.handleCancel = this.handleCancel.bind(this);
    this.delHttpRow = this.delHttpRow.bind(this);
  }

  componentWillMount() {
    this.props.getHttpStatsCond(this.props.params.profileId,this.loader);
    this.props.getListOfTypes();
    this.props.getListOfValueType();   //this functio gets list of valur type["String","nymeric..."]
  }

  componentWillReceiveProps(nextProps)
  {
    if(this.props.httpStatsData != nextProps.httpStatsData){
      this.setState({httpStatsData:nextProps.httpStatsData});
    }
    
  }
   loader(){
  //  var message = {'title':'HTTPStatsMonitors Loaded' ,'msg':''}
     this.props.triggerLoader(false,null)

   }

   delCnfrmRow(){
    var selectedRow = this.refs.httpStatsConditionTable.refs.table.state.selectedRowKeys;
    if(selectedRow.length >= 1){
    this.setState({cnfrmDialog: true,openSnack: false})
    }
    else{
      this.setState({cnfrmDialog:false,openSnack:true})
    }
   }

   handleCancel(){
     this.setState({cnfrmDialog: false})
   }

   delHttpRow(){
    var  selectedRow = [];
    selectedRow = this.refs.httpStatsConditionTable.refs.table.state.selectedRowKeys
    this.props.delHTTPselectedRow(this.props.params.profileId,selectedRow)
    try{
     this.refs.httpStatsConditionTable.refs.table.cleanSelected();
     }
     catch(e)
     {
       console.error(" Exception Occured: FileName: ErrorDetection,MethodName: delErrorDetection() ",e)
     }
      this.setState({cnfrmDialog:false})
   }

   handleOpen(openHttpStatsDialog){
    if(openHttpStatsDialog == "edit"){
     var selectedRow = [];
     selectedRow  = this.refs.httpStatsConditionTable.refs.table.state.selectedRowKeys;
     if(selectedRow.length == 1){
      this.setState({openSnack: false})
      var selectedRowData  =  this.props.httpStatsData.tableData.filter(function(value){
        return selectedRow == value.hscid;
      })
      this.props.initializeHTTPForm(selectedRowData[0],openHttpStatsDialog);
      this.props.toggleStateAddHttpStatsCond();
    }
    else{
      this.setState({openSnack: true})
    }
  }
  else if(openHttpStatsDialog == "add"){
    this.props.initializeHTTPForm(null,openHttpStatsDialog);
    this.props.toggleStateAddHttpStatsCond();

  }
   
   }
    render() {

      var  actions = [ <FlatButton label="Cancel"
                                     primary={true}
                                     onTouchTap={this.handleCancel}/>,
                      <FlatButton label="Delete"
                                      primary={true}
                                      onTouchTap={this.delHttpRow}/>
    ]
    return (
     <div>

    <Paper zDepth={2} style={{background:'rgba(0,0,0,0.45)', color:'#FFF'}}> 
      <div className='row row-no-margin tableheader'>
        <div className="col-md-10">
              <h4>Http Stats Condition Monitor(s)</h4>
        </div>
        <div>
      <IconButton toolTip="Edit HTP Stats" style={{position: 'absolute',right:77}}><FontIcon className="material-icons"   onTouchTap={this.handleOpen.bind(this,'edit')} color="#FFF">edit_mode</FontIcon> </IconButton>
      <IconButton toolTip="Delete HTTP Stats" className="pull-right"><FontIcon className="material-icons"   onTouchTap={this.delCnfrmRow.bind(this)} color="#FFF">delete</FontIcon> </IconButton>
      </div>
        <DataGrid data = {this.props.httpStatsData.tableData} 
            pagination = {false} 
            ref        = "httpStatsConditionTable" 
            column     = {columns}
            onClick    = {this.handleClick}   />
         <ConfirmDialog title="Are you sure want to delete the HTTP Stats Condition Monitor Row(s)?"
                        open={this.state.cnfrmDialog}

                        actions={actions} /> 
        <div>
         <AddNewButton style={NewButtonstyle}  onTouchTap={this.handleOpen.bind(this,'add')}>
            <AddIcon />
         </AddNewButton>
         <DialogHttpStatsCond profileId ={this.props.params.profileId}/>
          <SnackBar message="No row selected or multiple rows selected"
                     autoHideDuration={4000}
                      open={this.state.openSnack} />
        </div>
       </div>
       </Paper>
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