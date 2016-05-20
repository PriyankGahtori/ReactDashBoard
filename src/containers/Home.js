
import React from 'react';
import { connect } from 'react-redux';
import  {activeData} from '../actions/index';
import { bindActionCreators } from 'redux';
import CardComponent from '../components/CardComponent'
import {fetchInitData} from '../actions/index'

 class Home extends React.Component {
 
  constructor(props) {
	 super(props);
  this.state = {homeData: this.props.homeData};
   }

componentWillMount() {
  this.props.loadInitData()
}

componentWillReceiveProps(nextProps)
{
	if(this.props.homeData != nextProps.homeData)
		this.setState({homeData:nextProps.homeData});
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
   list : state.list,
   homeData :state.initialData
   };
}

//method to dispatch actions to the reducers
function mapDispatchToProps(dispatch) {
  const actionMap = { loadInitData: bindActionCreators(fetchInitData, dispatch) };
  return actionMap;
}
export default connect(mapStateToProps,mapDispatchToProps)(Home);