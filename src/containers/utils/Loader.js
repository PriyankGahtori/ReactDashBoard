import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';
import * as actionCreators  from '../../actions/index';
import NotificationSystem from 'react-notification-system';


const progressCircularShow = {
   position: 'absolute',
    left: '50%',
    top: '100%',
    marginLeft:'-32px',
    marginTop:'-32px',  
    display: 'block',
    zIndex:1500

}
const progressCircularHide = {
   position: 'absolute',
    left: '50%',
    top: '50%',
    marginLeft:'-32px',
    marginTop:'-32px',  
    display: 'none',
    zIndex:1500

}
const  progressDivShow= { 
    position:'absolute',
    bottom:200,
    left:0,
    width:'100%',
    height:'100%',
    zIndex:1500,
    backgroundColor:'transparent',
    //opacity: 0.8,
}
const  progressDivHide= { 
    position:'absolute',
   
    left:0,
    width:'100%',
    height:'100%',
    zIndex:1500,
    backgroundColor:'transparent',
    //opacity: 0.8,
    display:'none'
}
/**
  * Here 2 components are used
  * Loader and toaster
  * 
  * when process of data loading is in progress ,
  *  loader and toaster is made to display with its corresponding title and msg.
  * 
  *  Similarly, when data is loaded,loader is made to hide and only toaster with its
  *  corresondinding msg and title is dispalyed.
  * Ex: topology data loaded
  * 
  */
 class Loader extends React.Component {

  constructor(props) {
    super(props);
    this.state={loader:{show : false , message :{}}}
}

 componentWillReceiveProps(nextProps){

  if(this.props.loader != nextProps.loader){
    if(nextProps.loader.message != null){
       this.notificationSystem.addNotification({
            title   : nextProps.loader.message.title,
            message : nextProps.loader.message.msg ,
            level   : 'info'
    });
    }
  }
}

 componentDidMount(){
    this.notificationSystem = this.refs.notificationSystem;
  }

 render() {
    return (
      <div>
      <div>
        <NotificationSystem ref="notificationSystem" />
      </div>

      <div style = {this.props.loader.show === true ? progressDivShow: progressDivHide}> 
          <CircularProgress size={1} 
                            style={progressCircularShow}
                            />
         {/*<p>{this.props.loader.msg}</p>*/}
      
      </div>



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
export default connect(mapStateToProps,mapDispatchToProps)(Loader);