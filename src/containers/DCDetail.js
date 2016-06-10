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
import DialogNewDC from './Dialog_DCDetail_NewDC';


var columns = {
                "key" : "dcName",
                "data":['DCName', 'DCIP', 'DCPort', 'NDEIP','NDEPort'],
                "field":['dcName', 'dcIp', 'dcPort', 'ndeIp', 'ndePort']
              };          

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



class DCDetail extends React.Component {

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
        this.props.toggleStateDialogNewDC();
  }

  componentWillMount() {
    this.props.fetchTreeData(this.props.routeParams.something)
    this.props.fetchDCTableData(this.props.routeParams.something)
  }

  componentWillReceiveProps(nextProps)
  {
    console.log("in componentWillReceiveProps--",nextProps.dcDetail)
     console.log("in componentWillReceiveProps--",this.props.dcDetail)
  	if(this.props.dcDetail.tableData != nextProps.dcDetail.tableData)
  		this.setState({dcDetail:nextProps.dcDetail.tableData});
  }

  render() {
    return (
    <div>
      <div className="row">
      
        <RaisedButton label="Primary" primary={true} onClick={this.updateNode}/>
        <DataGrid data = {this.props.dcDetail.tableData} pagination={false} ref="table" column = {columns} />
        <RaisedButton label="Delete" primary={true} onClick={this.delRow}/>
      </div>


      <div>
         <AddNewButton style={NewButtonstyle} onTouchTap={this.handleOpen} >
            <AddIcon />
         </AddNewButton>
         <DialogNewDC />
      </div>


   </div>

    );
  }
}

function mapStateToProps(state) {
  console.log("state.dcDetail.tableData---",state.dcDetail.tableData)
  return {
    dcDetail :state.dcDetail
   };
}

//method to dispatch actions to the reducers
function mapDispatchToProps(dispatch) {
  //const actionMap = { loadInitTreeData: bindActionCreators(fetchTreeData, dispatch) };
  //return actionMap;
return bindActionCreators(actionCreators, dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(DCDetail);
