import React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators  from '../actions/index';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import AddNewButton from 'material-ui/FloatingActionButton';
import AddIcon from 'material-ui/svg-icons/content/add';
import DataGrid from '../components/DCDetailTable';
import DialogNewApplication from './Dialog_AppDetail_NewApp';


var columns = {
                "key" : "Name",
                "data":['Name', 'Date','User']
              };          
var data =[{"Name":"nsecom",
            "Date" : "07/06/2016",
            "User" : "netstorm"
          },
          {"Name":"kohls",
            "Date" : "07/04/2016",
            "User" : "root"
          }]


const style = {
  
  //margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};
const NewButtonstyle = {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 30,
    left: 'auto',
    position: 'fixed',

};



class ApplicationDetail extends React.Component {

  constructor(props) {
    super(props);
    console.log("in DCDetail.js--",this.props)
    console.log(this.props.routeParams.something)
    this.updateNode = this.updateNode.bind(this);
     this.delRow = this.delRow.bind(this);
  this.state ={openNewAppDialog:false}
  this.handleOpen = this.handleOpen.bind(this);
  }

  updateNode(e){
    console.log("table ref ",this.refs.table.refs.dcDetailTable.state.selectedRowKeys);
    e.preventDefault()
    this.props.updateTreeNode(this.props.routeParams.something);
  }

  delRow(){
    console.log("del row function called")
    console.log("calling del method---table ref--",this.refs.table.refs.dcDetailTable.state.selectedRowKeys)
    this.props.delRowTable(this.refs.table.refs.dcDetailTable.state.selectedRowKeys)
  }

  handleOpen(){
        this.props.toggleStateDialogNewApp();
  }

  componentWillMount() {
    this.props.fetchTreeData("ApplicationDetail")
    this.props.fetchTableData("ApplicationDetail")
  }

  componentWillReceiveProps(nextProps)
  {
    console.log("in componentWillReceiveProps--",nextProps.appDetail)
     console.log("in componentWillReceiveProps--",this.props.appDetail)
    if(this.props.appDetail.tableData != nextProps.appDetail.tableData)
      this.setState({appDetail:nextProps.appDetail.tableData});
  }

  render() {
    return (
    <div>
      <div className="row">
      
        <RaisedButton label="Primary" primary={true} onClick={this.updateNode}/>
        <DataGrid data = {this.props.appDetail.tableData} pagination={false} ref="table" column = {columns} />
        <RaisedButton label="Delete" primary={true} onClick={this.delRow}/>
      </div>


      <div>
         <AddNewButton style={NewButtonstyle} onTouchTap={this.handleOpen} >
            <AddIcon />
         </AddNewButton>
         <DialogNewApplication />
      </div>


   </div>

    );
  }
}

function mapStateToProps(state) {
  console.log("appDetail---",state.dcDetail.tableData)
  return {
    appDetail :state.dcDetail
   };
}

//method to dispatch actions to the reducers
function mapDispatchToProps(dispatch) {
  //const actionMap = { loadInitTreeData: bindActionCreators(fetchTreeData, dispatch) };
  //return actionMap;
return bindActionCreators(actionCreators, dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(ApplicationDetail);
