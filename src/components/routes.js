import React from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory, IndexRoute} from 'react-router'
import App from './Main'
import CardList from './CardList'
import Layout from './Layout'
import Main from './Main'
import NewHome from '../containers/Home'
import DCDetail from '../containers/DCDetail'
import ApplicationDetail from '../containers/ApplicationDetail'
import Testing from '../containers/Testing'
import Topology from '../containers/Topology'
import TopologyDetail from '../containers/TopologyDetail';
import ProfileDetail from '../containers/ProfileDetail';
import Tier from '../containers/Tier';
import Server from '../containers/Server';
import Instance from '../containers/Instance';
import Configuration from '../containers/ConfigurationSettings';
import BackendDetection from '../containers/BackendDetection';
import Instrumentation from '../containers/Instrumentation';
import ServiceEntryPoints from '../containers/ServiceEntryPoints';
import BusinessTransaction from '../containers/BusinessTransaction';
import GlobalBT from '../containers/GlobalBusinessTransaction';
import PatternBT from '../containers/PatternBusinessTransaction';


export default class routes extends React.Component {

	constructor(props) {
    super(props);
    console.log("in routes.js-----",this.props)
}

   render() {
     return (
		  <Router history={hashHistory}>
		    <Route name="Home" path="/" component={Layout} >
		      <IndexRoute component={NewHome} />
		      <Route name = "Application" path = "application" component = {ApplicationDetail} />
		      <Route name = "DC Configuration" staticName = {true} path = "application/:appId" component = {DCDetail} />
		      <Route name = "Testing" path = "testing" component = {Testing} />
		      <Route name = "Topology Configuration" staticName = {true} path = "dcdetail/:dcId" component = {Topology} />
		      <Route name = "Topology" path = "topology" component = {TopologyDetail} />

		      <Route name = "Profile"  staticName = {true} path = "profile"  component = {ProfileDetail} />

		      <Route name = "Tier Detail" staticName = {true} path = "topology/:topoId" component = {Tier} />
		      <Route name = "Server Detail" staticName = {true} path = "tier/:tierId" component = {Server} />
  			  <Route name = "Instance Detail" staticName = {true} path = "server/:serverId" component = {Instance} />
  			  
  			  <Route name = "Configuration" staticName = {true} path = "configuration/:profileId"  component = {Configuration} />
			  <Route name = "Configuration" staticName = {true} path = "profile/:profileId"  component = {Configuration} />

		      <Route name = "Instrumentation" staticName = {true} path = "instrumentation/:profileId" component ={Instrumentation} >
		      	 <IndexRoute name = "Service Entry Points" component={ServiceEntryPoints} />
		      	 <Route name = "Backend Detection" path ="backenddetection" component = {BackendDetection}/>
		      	 
		      	 <Route name = "Business Transaction" path ="bt" component = {BusinessTransaction}>
		      	 	<IndexRoute name="Global" component={GlobalBT} />
		      	 	<Route name="Pattern" path ="pattern" component={PatternBT} />
		      	 </Route>
		      </Route>

		    </Route>

		  </Router>
     );
   }
 }
