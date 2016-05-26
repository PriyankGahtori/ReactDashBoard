import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators  from '../actions/index';
import RaisedButton from 'material-ui/RaisedButton';


class DCDetail extends React.Component {

  constructor(props) {
    super(props);
    console.log("in DCDetail.js--",this.props)
    console.log(this.props.routeParams.something)
    this.updateNode = this.updateNode.bind(this);
  }

  updateNode(e){
    e.preventDefault()
    this.props.updateTreeNode(this.props.routeParams.something);
  }
   
  componentWillMount() {
  this.props.fetchTreeData(this.props.routeParams.something)
  }


  render() {
    return (
      <div>DCDetail.....
        <RaisedButton label="Primary" primary={true} onClick={this.updateNode}/>
      
      </div>

    );
  }
}


//method to dispatch actions to the reducers
function mapDispatchToProps(dispatch) {
  //const actionMap = { loadInitTreeData: bindActionCreators(fetchTreeData, dispatch) };
  //return actionMap;
return bindActionCreators(actionCreators, dispatch);
  
}
export default connect(null,mapDispatchToProps)(DCDetail);