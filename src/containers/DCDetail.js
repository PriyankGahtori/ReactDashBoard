import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators  from '../actions/index';
import RaisedButton from 'material-ui/RaisedButton';
import DataGrid from '../components/DCDetailTable';

/*var columns = ['ID',
               'DCName',
               'DCIP',
               'DCPort',
              'NDEIP'];
              */
  var columns = {
                "key" : "DCName",
                "data":['ID', 'DCName', 'DCIP', 'DCPort', 'NDEIP']
              };          

class DCDetail extends React.Component {

  constructor(props) {
    super(props);
    console.log("in DCDetail.js--",this.props)
    console.log(this.props.routeParams.something)
    this.state ={dcDetail:[{"init":1}]}
    this.updateNode = this.updateNode.bind(this);
  }

  updateNode(e){
    console.log("table ref ",this.refs.table.refs.dcDetailTable.state.selectedRowKeys);
    e.preventDefault()
    this.props.updateTreeNode(this.props.routeParams.something);
    this.props.addRowTable(this.props.routeParams.something);
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
      <div>DCDetail.....
        <RaisedButton label="Primary" primary={true} onClick={this.updateNode}/>
        <DataGrid data = {this.props.dcDetail} pagination={false} ref="table" column = {columns} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log("state.dcDetail----",state.dcDetail)
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
