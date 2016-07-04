import React from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory, IndexRoute,browserHistory } from 'react-router'
import App from './Main'
import CardList from './CardList'

import Layout from './Layout'
import Main from './Main'
import NewHome from '../containers/Home'
import DCDetail from '../containers/DCDetail'
import ApplicationDetail from '../containers/ApplicationDetail'
import Testing from '../containers/Testing'
import Topology from '../containers/Topology'

export default class routes extends React.Component {

	constructor(props) {
    super(props);
    console.log("in routes.js-----",this.props)
}

   render() {
     return (
		  <Router history={browserHistory}>
		    <Route path="/" component={Layout} >
		      <IndexRoute component={NewHome} />
		      <Route path="application" component={ApplicationDetail} />
		      <Route path="application/:appId" component={DCDetail} />
		      <Route path="testing" component={Testing} />
		      <Route path="topology/:dcId" component={Topology} />

		    </Route>

		  </Router>
     );
   }
 }
