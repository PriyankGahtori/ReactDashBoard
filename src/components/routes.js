import React from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import App from './Main'
import CardList from './CardList'
import Home from './Home' 
import Layout from './Layout'
import Main from './Main' 
import NewHome from '../containers/Home' 
 
export default class routes extends React.Component {
    
   render() {
     return (
		  <Router history={hashHistory}>  
		    <Route path="/" component={Layout} >
		      <IndexRoute component={NewHome} />
		      <Route path="home" component={Main} />    
		    </Route>

		  </Router>       
     );
   }
 }
 
 
 
  

