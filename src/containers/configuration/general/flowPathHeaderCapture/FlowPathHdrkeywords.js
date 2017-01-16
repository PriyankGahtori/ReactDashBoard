//Importing react componnets
import React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import Snackbar from 'material-ui/Snackbar';
import FlatButton from 'material-ui/FlatButton';
import {hashHistory } from 'react-router';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import { reduxForm } from 'redux-form';
import _ from "lodash";
import { Link } from 'react-router';
import ConfirmDialog from 'material-ui/Dialog';
import Paper from 'material-ui/Paper';

//Importing files
import * as actionCreators  from '../../../../actions/index';
import {getKeywordsData,submitKeywordData}  from '../../../../actions/index';
import Form_fphdr from './Form_EnableFpCapturing';
import SessionAttr from '../../instrumentation/monitor/SessionAttributeMonitors';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
  text: {
    fontSize:18,
    paddingLeft:6
  },
  toggle: {
      marginTop:30 ,
      paddingLeft:80
  },
  customWidth: {
      width: 200
    },
  toggleCustomFQM :{
     paddingLeft:-4
  }
 
};
/*
* data --- table column name
* key ---- acting as a primary key
* 
*/


const style = {
  //margin: 20,
  textAlign: 'center',
  display: 'inline-block'
};

const NewButtonstyle = {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 30,
    left: 'auto',
    position: 'fixed'

};
const paperStyle = {
  height: '100%',
  width: '100%', 
  padding:'15px 0px', 
  textAlign: 'center',
  display: 'inline-block',
};

class FlowPathHdrkeywords extends React.Component {

  constructor(props) {
    super(props);
  this.loader = this.loader.bind(this);
  this.state = {getAllKeywordData:this.props.getAllKeywordData}
  this.getProfileName = this.getProfileName.bind(this);
  this.state = {profileName : this.getProfileName(this.props.params.profileId)}
  }


//this function is called first when component gets first loaded
  componentWillMount() {
  }

  componentWillReceiveProps(nextProps)
  {
    if(this.props.getAllKeywordData != nextProps.getAllKeywordData){
      this.setState({getAllKeywordData:nextProps.getAllKeywordData});
    }
  }

  getProfileName(profileId)
  {
      try{
        let profileData = this.props.homeData[1]
                              .value
                              .filter(function(obj){return obj.id == profileId });  
        if(profileData.length != 0)
        {
          return profileData[0].name;
        }
        else
          return null;          
      }
      catch(ex)
      {
        console.error("error in getting profileId " + ex);
        return null;
      }

  }

 loader(){
   var message = {'title':'Keywords loaded', 'msg' : ''};
   this.props.triggerLoader(false,message)
 }


  render() {

    return (
      <div >
      <div style={{color: '#FFF'}}><p>Profile Name : {this.state.profileName}</p></div>
  
         <div className='row row-no-margin tableheader' style={{top: '-7px',position:'relative'}}>
          <div className="col-md-10">
              <h4> FlowPath header Capturing</h4>
          </div>
          </div>
        <Form_fphdr profileId={this.props.params.profileId}/>
  {/*<SessionAttr profileId={this.props.params.profileId} /> */}

    </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    getAllKeywordData :state.Keywords,
    homeData : state.initialData.homeData
   };
}

//method to dispatch actions to the reducers
function mapDispatchToProps(dispatch) {
return bindActionCreators(actionCreators, dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(FlowPathHdrkeywords);
