//Importing React components
import React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Tabs, Tab} from 'material-ui/Tabs';
import {hashHistory } from 'react-router';

//Importing files
import * as actionCreators  from '../../../actions/index';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  block:{
    paddingBottom: 25,
  },
  tab:{
    backgroundColor: '#114147'
  }
};

class Instrumentation extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);    
    this.getProfileName = this.getProfileName.bind(this);
    this.state = {profileName : this.getProfileName(this.props.params.profileId)}
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

  handleChange(value){
    let profileId = this.props.routeParams.profileId;
    let currPath = `${this.props.location.pathname}`;
        currPath = currPath.substring(0, currPath.indexOf("instrumentation")+15)
    let routeURL = `${currPath}/${value}`;
    hashHistory.push(routeURL);
  }

  render() {
    return (
      <div className ='container-fluid'>
      <div style={{color: '#FFF'}}><p>Profile Name : {this.state.profileName}</p></div>
      <div style ={styles.block}>
      <Tabs      
        onChange={this.handleChange}
      >
        <Tab style ={styles.tab} label="Service Entry Point" value="" >
        
        </Tab>

        <Tab style ={styles.tab} label="Integration Pt Detection" value="backenddetection" >
          
        </Tab>

         <Tab style ={styles.tab} label="Transaction Configuration" value="bt">
          
        </Tab>

        <Tab style ={styles.tab} label="Instrument Monitors" value="monitors">
        
        </Tab>

        <Tab style ={styles.tab} label="Error Detection" value="errordetection">
          
        </Tab>

       
      </Tabs>
      </div>

      {this.props.children}

      </div>

    );
  }
}

//receiving data from state set by reducers
function mapStateToProps(state) {  
  return {  
   homeData : state.initialData.homeData
   };
}

//method to dispatch actions to the reducers
function mapDispatchToProps(dispatch) { 
  return  bindActionCreators(actionCreators, dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(Instrumentation);
