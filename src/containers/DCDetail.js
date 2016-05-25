import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {fetchTreeData} from '../actions/index';

 class DCDetail extends React.Component {

  constructor(props) {
    super(props);
    console.log("in DCDetail.js--",this.props)
  }

  componentWillMount() {
  this.props.loadInitTreeData()
}



  render() {
    return (
      <div>DCDetail.....</div>
    );
  }
}


//method to dispatch actions to the reducers
function mapDispatchToProps(dispatch) {
  const actionMap = { loadInitTreeData: bindActionCreators(fetchTreeData, dispatch) };
  return actionMap;
}
export default connect(null,mapDispatchToProps)(DCDetail);