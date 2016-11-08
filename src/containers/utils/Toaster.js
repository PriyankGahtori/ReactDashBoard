import React from 'react';
import NotificationSystem from 'react-notification-system';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';
import * as actionCreators  from '../../actions/index';

class Toaster extends React.Component {
 
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps){
    if(this.props.loader != nextProps.loader){
      if(nextProps.loader.show === false || nextProps.loader.show == 'false')
        this.notificationSystem.addNotification({
            title   : nextProps.loader.message.title,
            message : nextProps.loader.message.msg ,
            level   : 'info'
    });

   }
 }
   
  componentDidMount(){
    this.notificationSystem = this.refs.notificationSystem;
  }
  
  render() {
    return (
      <div>
        <NotificationSystem ref="notificationSystem" />
      </div>
    );
  }
}

//receiving data from state set by reducers
function mapStateToProps(state) {  
  return {  
   loader:state.loader
   };
}

//method to dispatch actions to the reducers
function mapDispatchToProps(dispatch) { 
  return  bindActionCreators(actionCreators, dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(Toaster);