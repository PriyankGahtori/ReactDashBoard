
//Importing React components
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

//Importing files
import  {activeData} from '../../actions/index';
import * as actionCreators  from '../../actions/index';
import CardComponent from '../../components/CardComponent'



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
	if(this.props.homeData != nextProps.homeData)
		this.setState({homeData:nextProps.homeData});
}
 
 /*function to trigger event for closing loading progess bar 
  * called when request for fetching home data is sent
  */

  loader(){
   var message = {'title':'home data loaded', 'msg' : ''};
   this.props.triggerLoader(false,message)
 }


  render() {
  	//At initial loading of GUI if homeData is null displays msg of  "Loading"
  	if (!this.props.homeData) {
      return <div>Loading........</div>;
    }
    return (   
            <div className="row">       
        		{this.props.homeData.map((data, index) => (
                          
            	<CardComponent key={data.id} data={data}/>
        ))}   
      </div> 
    );
  }
}

//receiving data from state set by reducers
function mapStateToProps(state) {
  return {
   list     : state.list,
   homeData : state.initialData.homeData
   };
}

//method to dispatch actions to the reducers
function mapDispatchToProps(dispatch) {
 // const actionMap = { loadInitData: bindActionCreators(fetchInitData, dispatch) };
  return  bindActionCreators(actionCreators, dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(Home);