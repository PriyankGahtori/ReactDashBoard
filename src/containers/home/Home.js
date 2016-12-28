
//Importing React components
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {List, ListItem} from 'material-ui/List';
import FontIcon from 'material-ui/FontIcon';
import ActionInfo from 'material-ui/svg-icons/action/info';

//Importing files
import  {activeData} from '../../actions/index';
import * as actionCreators  from '../../actions/index';
import CardComponent from '../../components/CardComponent'


const iconStyle = {
fontSize:'56px',
color:'#d8d8d8'
};

const listStyle = {  
  padding: '8px 4px',
  color: '#FFF',
  fontSize:'16px',
  lineHeight:'22px'
};
const divStyle ={
  background:'rgba(0,0,0,0.4)', 
  borderRadius: '8px', 
  marginLeft: '2.7em',
  marginBottom:'2em',
  minHeight: '111px'
}  
 class Home extends React.Component {
 
  constructor(props) {
	 super(props);
   this.state = {homeData: this.props.homeData};
   this.loader = this.loader.bind(this);
   }

componentWillMount() {
  this.props.triggerLoader(true, null)
  this.props.fetchInitData(this.loader)

}

componentWillReceiveProps(nextProps){
 // this.props.fetchInitData(this.loader);
	if(this.props.homeData != nextProps.homeData)
		this.setState({homeData:nextProps.homeData});
}
 
 /*function to trigger event for closing loading progess bar 
  * called when request for fetching home data is sent
  */

  loader(){
   var message = {'title':'Home data loaded', 'msg' : ''};
   this.props.triggerLoader(false,message)
 }


  render() {
  	//At initial loading of GUI if homeData is null displays msg of  "Loading"
  	if (!this.props.homeData) {
      return <div>Loading........</div>;
    }
    return (
          <div>

            <div className="row">
                <div className="col-md-2" style={divStyle}>
                  <ListItem style={listStyle} initiallyOpen={true} hoverColor='rgba(0,0,0,0.4)' primaryText="Discover Instrumentation Data" rightIcon={<i className="icon config-icon-discover" style={iconStyle} />}/>
                </div>
                <div className="col-md-2" style={divStyle}>
                  <ListItem style={listStyle} initiallyOpen={true} hoverColor='rgba(0,0,0,0.4)' primaryText="Manage Instrumentation Profile" rightIcon={<i className="icon config-icon-manage-profile" style={iconStyle} />}/>
                </div>
                <div className="col-md-2" style={divStyle}>
                  <ListItem style={listStyle} initiallyOpen={true} hoverColor='rgba(0,0,0,0.4)' primaryText="ND Agent Status" rightIcon={<i className="icon config-icon-agent" style={iconStyle} />}/>
                </div>
                <div className="col-md-2" style={divStyle}>
                  <ListItem style={listStyle} initiallyOpen={true} hoverColor='rgba(0,0,0,0.4)' primaryText="Manage Auto Discovery" rightIcon={<i className="icon config-icon-setting" style={iconStyle} />}/>
                </div>
                <div className="col-md-2" style={divStyle}>
                  <ListItem style={listStyle} initiallyOpen={true} hoverColor='rgba(0,0,0,0.4)' primaryText="Other Settings" rightIcon={<i className="icon config-icon-setting2" style={iconStyle} />}/>
                </div>  
            </div>

            <div className="row">       
        		{this.props.homeData.map((data, index) => (
                          
            	<CardComponent key={data.id} data={data}/>
            ))}   
            </div>

          </div>  
    );
  }
}

//receiving data from state set by reducers
function mapStateToProps(state) {
  return {
   list     : state.list,
   homeData : state.initialData.homeData,
  
   };
}

//method to dispatch actions to the reducers
function mapDispatchToProps(dispatch) {
 // const actionMap = { loadInitData: bindActionCreators(fetchInitData, dispatch) };
  return  bindActionCreators(actionCreators, dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(Home);