import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators  from '../actions/index';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import DataGrid from '../components/DCDetailTable';

var columns = {
                "key" : "DCName",
                "data":['ID', 'DCName', 'DCIP', 'DCPort', 'NDEIP']
              };          

const style = {
  height: 300,
  width: 1280,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};


class DCDetail extends React.Component {

  constructor(props) {
    super(props);
    console.log("in DCDetail.js--",this.props)
    console.log(this.props.routeParams.something)
    this.state ={dcDetail:[{"init":1}]}
    this.updateNode = this.updateNode.bind(this);
     this.delRow = this.delRow.bind(this);
  }

  updateNode(e){
    console.log("table ref ",this.refs.table.refs.dcDetailTable.state.selectedRowKeys);
    e.preventDefault()
    this.props.updateTreeNode(this.props.routeParams.something);
    this.props.addRowTable(this.props.routeParams.something);
  }

  delRow(){
    console.log("del row function called")
    console.log("calling del method---table ref--",this.refs.table.refs.dcDetailTable.state.selectedRowKeys)
    this.props.delRowTable(this.refs.table.refs.dcDetailTable.state.selectedRowKeys)
  }

  componentWillMount() {
    this.props.fetchTreeData(this.props.routeParams.something)
    this.props.fetchTableData(this.props.routeParams.something)
  }

  componentWillReceiveProps(nextProps)
  {
  	if(this.props.dcDetail != nextProps.dcDetail)
  		this.setState({dcDetail:nextProps.dcDetail});
  }

  render() {
    return (
      <div className="row">
      <Paper style={style} zDepth={2} >
      
        <RaisedButton label="Primary" primary={true} onClick={this.updateNode}/>
        <DataGrid data = {this.props.dcDetail} pagination={false} ref="table" column = {columns} />
        <RaisedButton label="Delete" primary={true} onClick={this.delRow}/>
      
      </Paper>
      </div>
    );
  }
}

function mapStateToProps(state) {
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
