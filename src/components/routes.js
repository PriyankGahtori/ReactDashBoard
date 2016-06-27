import React from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
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

   render() {
     return (
		  <Router history={hashHistory}>
		    <Route path="/" component={Layout} >
		      <IndexRoute component={NewHome} />
		      <Route path="application" component={ApplicationDetail} />
		      <Route path="application/:appId" component={DCDetail} />
		      <Route path="testing" component={Testing} />
		      <Route path="topology" component={Topology} />
		    </Route>

		  </Router>
     );
   }
 }
