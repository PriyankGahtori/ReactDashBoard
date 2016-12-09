import React from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory, IndexRoute} from 'react-router'
import App from './Main'
import CardList from './CardList'
import Layout from './Layout'
import Main from './Main'
import NewHome from '../containers/home/Home'
import DCDetail from '../containers/dataCenter/DCDetail'
import ApplicationDetail from '../containers/application/ApplicationDetail'
import Testing from '../containers/Testing'
import Topology from '../containers/topology/Topology'
import TopologyDetail from '../containers/topology/TopologyDetail';
import ProfileDetail from '../containers/profile/ProfileDetail';
import Tier from '../containers/tier/Tier';
import Server from '../containers/server/Server';
import Instance from '../containers/instance/Instance';
import Configuration from '../containers/configuration/ConfigurationSettings';
import BackendDetection from '../containers/configuration/instrumentation/integrationPoint/BackendDetection';
import Instrumentation from '../containers/configuration/instrumentation/Instrumentation';
import ServiceEntryPoints from '../containers/configuration/instrumentation/serviceEntryPoint/ServiceEntryPoints';
import BusinessTransaction from '../containers/configuration/instrumentation/businessTransaction/BusinessTransaction';
import GlobalBT from '../containers/configuration/instrumentation/businessTransaction/GlobalBusinessTransaction';
import PatternBT from '../containers/configuration/instrumentation/businessTransaction/PatternBusinessTransaction';
import GeneralKeywords from '../containers/configuration/general/GeneralKeywords';
import InstrumentMonitors from '../containers/configuration/instrumentation/monitor/InstrumentMonitors';
import AdvanceSettings from '../containers/configuration/advance/AdvanceSettings';
import MethodMonitors from '../containers/configuration/instrumentation/monitor/MethodMonitors';
import ErrorDetection from '../containers/configuration/instrumentation/errorDetection/ErrorDetection';
import ExceptionMonitors from '../containers/configuration/instrumentation/monitor/ExceptionMonitors';
import HTTPStatsMonitors from '../containers/configuration/instrumentation/monitor/HTTPStatsMonitors';

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
        <Route name = "Topology" path = "topology" component = {TopologyDetail} />

        <Route name = "Profile"  staticName = {true} path = "profile"  component = {ProfileDetail} />

        {/*********************Topology and profile Navigation**********************/}          
        <Route name = "Topology Configuration" staticName = {true} path = "dcdetail/:dcId">
          <IndexRoute name = "Topology Configuration" staticName = {true} component = {Topology}/>

            {/*************Main Configuration Screen************/}
          <Route name = "Configuration" staticName = {true} path= "topology/:topoId/configuration/:profileId" >
            <IndexRoute name = "Configuration" staticName = {true} component = {Configuration}/>
            <Route name = "General Settings" staticName = {true} path = "generalsettings" component ={GeneralKeywords} />            
            
              {/*************Instrumentation Setting & Configuration************/}
            <Route name = "Instrumentation" staticName = {true} path = "instrumentation" component ={Instrumentation} >
              <IndexRoute name = "Service Entry Points" component={ServiceEntryPoints} />
              <Route name = "Integration Pt Detection" path ="backenddetection" component = {BackendDetection}/>
                <Route name = "Transaction Configuration" path ="bt" component = {BusinessTransaction}>
                <IndexRoute name="Global" component={GlobalBT} />
                  <Route name="Pattern" path ="pattern" component={PatternBT} />
              </Route>
              <Route name="Error Detection" path ="errordetection" component={ErrorDetection} />
              <Route name="Instrument Monitors" path ="monitors" component={InstrumentMonitors} >
                <IndexRoute name="Method Monitors" component={MethodMonitors} />
                <Route name="Exception Monitors" path ="exceptionmonitors" component={ExceptionMonitors} />
                <Route name="HTTP Stats Monitors" path ="httpstatmonitors" component={HTTPStatsMonitors} />               
              </Route>
            </Route>

            <Route name = "Advance Settings" staticName = {true} path = "advancesettings" component ={AdvanceSettings} />            

          </Route>            
        </Route>

         {/*****************when application is made to navigate to topology screen directly*********/}
         {/*********************Topology and profile Navigation**********************/}          
        <Route name = "Topology Configuration" staticName = {true} path = "app/:dcId">
          <IndexRoute name = "Topology Configuration" staticName = {true} component = {Topology}/>

            {/*************Main Configuration Screen************/}
          <Route name = "Configuration" staticName = {true} path= "topology/:topoId/configuration/:profileId" >
            <IndexRoute name = "Configuration" staticName = {true} component = {Configuration}/>
            <Route name = "General Settings" staticName = {true} path = "generalsettings" component ={GeneralKeywords} />            
            
              {/*************Instrumentation Setting & Configuration************/}
            <Route name = "Instrumentation" staticName = {true} path = "instrumentation" component ={Instrumentation} >
              <IndexRoute name = "Service Entry Points" component={ServiceEntryPoints} />
              <Route name = "Integration Pt Detection" path ="backenddetection" component = {BackendDetection}/>
                <Route name = "Transaction Configuration" path ="bt" component = {BusinessTransaction}>
                <IndexRoute name="Global" component={GlobalBT} />
                  <Route name="Pattern" path ="pattern" component={PatternBT} />
              </Route>
              <Route name="Error Detection" path ="errordetection" component={ErrorDetection} />
              <Route name="Instrument Monitors" path ="monitors" component={InstrumentMonitors} >
                <IndexRoute name="Method Monitors" component={MethodMonitors} />
                <Route name="Exception Monitors" path ="exceptionmonitors" component={ExceptionMonitors} />
                <Route name="HTTP Stats Monitors" path ="httpstatmonitors" component={HTTPStatsMonitors} />               
              </Route>
            </Route>

            <Route name = "Advance Settings" staticName = {true} path = "advancesettings" component ={AdvanceSettings} />            

          </Route>            
        </Route>



        {/*********************Tier and profile Navigation************************/}
        <Route name = "Tier Detail" staticName = {true} path = "topology/:topoId"  >
          <IndexRoute name = "Tier Detail" staticName = {true} component = {Tier} />

              {/*************Main Configuration Screen************/}  
          <Route name = "Configuration" staticName = {true} path= "tier/:tierId/configuration/:profileId" >
            <IndexRoute name = "Configuration" staticName = {true} component = {Configuration}/>
            <Route name = "General Settings" staticName = {true} path = "generalsettings" component ={GeneralKeywords} />      
            
                  {/*************Instrumentation Setting & Configuration************/}
            <Route name = "Instrumentation" staticName = {true} path = "instrumentation" component ={Instrumentation} >
              <IndexRoute name = "Service Entry Points" component={ServiceEntryPoints} />
              <Route name = "Integration Pt Detection" path ="backenddetection" component = {BackendDetection}/>
                <Route name = "Transaction Configuration" path ="bt" component = {BusinessTransaction}>
                <IndexRoute name="Global" component={GlobalBT} />
                  <Route name="Pattern" path ="pattern" component={PatternBT} />
              </Route>
              <Route name="Error Detection" path ="errordetection" component={ErrorDetection} />
              <Route name="Instrument monitors" path ="monitors" component={InstrumentMonitors} >
                <IndexRoute name="Method Monitors" component={MethodMonitors} />
                <Route name="Exception Monitors" path ="exceptionmonitors" component={ExceptionMonitors} />
                <Route name="HTTP Stats Monitors" path ="httpstatmonitors" component={HTTPStatsMonitors} />
              </Route>
            </Route>

            <Route name = "Advance Settings" staticName = {true} path = "advancesettings" component ={AdvanceSettings} />            

          </Route>
        </Route>


          {/*********************Server and profile Navigation************************/}
        <Route name = "Server Detail" staticName = {true} path = "tier/:tierId" >
          <IndexRoute name = "Server Detail" staticName = {true} component = {Server} />

              {/*************Main Configuration Screen************/}  
          <Route name = "Configuration" staticName = {true} path= "server/:serverId/configuration/:profileId" >
            <IndexRoute name = "Configuration" staticName = {true} component = {Configuration}/>
            <Route name = "General Settings" staticName = {true} path = "generalsettings" component ={GeneralKeywords} />      
            
                  {/*************Instrumentation Setting & Configuration************/}
            <Route name = "Instrumentation" staticName = {true} path = "instrumentation" component ={Instrumentation} >
              <IndexRoute name = "Service Entry Points" component={ServiceEntryPoints} />
              <Route name = "Integration Pt Detection" path ="backenddetection" component = {BackendDetection}/>
                <Route name = "Transaction Configuration" path ="bt" component = {BusinessTransaction}>
                <IndexRoute name="Global" component={GlobalBT} />
                  <Route name="Pattern" path ="pattern" component={PatternBT} />
              </Route>
              <Route name="Error Detection" path ="errordetection" component={ErrorDetection} />
              <Route name="Instrument monitors" path ="monitors" component={InstrumentMonitors} >
                <IndexRoute name="Method Monitors" component={MethodMonitors} />
                <Route name="Exception Monitors" path ="exceptionmonitors" component={ExceptionMonitors} />
                <Route name="HTTP Stats Monitors" path ="httpstatmonitors" component={HTTPStatsMonitors} />
              </Route>
            </Route>

            <Route name = "Advance Settings" staticName = {true} path = "advancesettings" component ={AdvanceSettings} />            

          </Route>
        </Route>
        

          {/*********************Instance and profile Navigation************************/}
        <Route name = "Instance Detail" staticName = {true} path = "server/:serverId" >
          <IndexRoute name = "Instance Detail" staticName = {true} component = {Instance} />

              {/*************Main Configuration Screen************/}  
          <Route name = "Configuration" staticName = {true} path= "instance/:instanceId/configuration/:profileId" >
            <IndexRoute name = "Configuration" staticName = {true} component = {Configuration}/>
            <Route name = "General Settings" staticName = {true} path = "generalsettings" component ={GeneralKeywords} />      
            
                  {/*************Instrumentation Setting & Configuration************/}
            <Route name = "Instrumentation" staticName = {true} path = "instrumentation" component ={Instrumentation} >
              <IndexRoute name = "Service Entry Points" component={ServiceEntryPoints} />
              <Route name = "Integration Pt Detection" path ="backenddetection" component = {BackendDetection}/>
                <Route name = "Transaction Configuration" path ="bt" component = {BusinessTransaction}>
                <IndexRoute name="Global" component={GlobalBT} />
                  <Route name="Pattern" path ="pattern" component={PatternBT} />
              </Route>
              <Route name="Error Detection" path ="errordetection" component={ErrorDetection} />
              <Route name="Instrument Monitors" path ="monitors" component={InstrumentMonitors} >
                <IndexRoute name="Method Monitors" component={MethodMonitors} />
                <Route name="Exception Monitors" path ="exceptionmonitors" component={ExceptionMonitors} />
                <Route name="HTTP Stats Monitors" path ="httpstatmonitors" component={HTTPStatsMonitors} />
              </Route>
            </Route>

            <Route name = "Advance Settings" staticName = {true} path = "advancesettings" component ={AdvanceSettings} />            

          </Route>
        </Route>

        
        {/*from Profile main screen to general, instrumentation, service entry, ... */}
        <Route name = "Configuration" staticName = {true} path= "profile/:profileId" >

          <IndexRoute name = "Configuration" staticName = {true} component = {Configuration} />      
          <Route name = "General Settings" staticName = {true} path = "generalsettings" component ={GeneralKeywords} />      
          
          <Route name = "Instrumentation" staticName = {true} path = "instrumentation" component ={Instrumentation} >
              <IndexRoute name = "Service Entry Points" component={ServiceEntryPoints} />
              <Route name = "Integration Pt Detection" path ="backenddetection" component = {BackendDetection}/>
           
              <Route name = "Transaction Configuration" path ="bt" component = {BusinessTransaction}>
                <IndexRoute name="Global" component={GlobalBT} />
                  <Route name="Pattern" path ="pattern" component={PatternBT} />
              </Route>
       
          <Route name="Error Detection" path ="errordetection" component={ErrorDetection} />    
           
              <Route name="Instrument Monitors" path ="monitors" component={InstrumentMonitors} >
                <IndexRoute name="Method Monitors" component={MethodMonitors} />
                <Route name="Exception Monitors" path ="exceptionmonitors" component={ExceptionMonitors} />
                <Route name="HTTP Stats Monitors" path ="httpstatmonitors" component={HTTPStatsMonitors} />
              </Route>
            </Route>

              <Route name = "Advance Settings" staticName = {true} path = "advancesettings" component ={AdvanceSettings} />            
        </Route>

      {/*from tier,server, instance to profile */}        
      <Route name = "Configuration" staticName = {true} path = "profile/:profileId"  component = {Configuration} />

      <Route name = "Configuration" staticName = {true} path = "generalsettings/:profileId"  component = {GeneralKeywords} />

        <Route name = "Instrumentation" staticName = {true} path = "instrumentation/:profileId" component ={Instrumentation} >
           <IndexRoute name = "Service Entry Points" component={ServiceEntryPoints} />
           <Route name = "Integration Pt Detection" path ="backenddetection" component = {BackendDetection}/>
           
           <Route name = "Transaction Configuration" path ="bt" component = {BusinessTransaction}>
            <IndexRoute name="Global" component={GlobalBT} />
              <Route name="Pattern" path ="pattern" component={PatternBT} />
           </Route>

           <Route name="Instrument Monitors" path ="monitors" component={InstrumentMonitors} >
            <IndexRoute name="Method Monitors" component={MethodMonitors} />
            <Route name="Exception Monitors" path ="exceptionmonitors" component={ExceptionMonitors} />
            <Route name="HTTP Stats Monitors" path ="httpstatmonitors" component={HTTPStatsMonitors} />
           </Route>
        </Route>

        <Route name = "Advance Settings" staticName = {true} path = "advancesettings" component ={AdvanceSettings} />            

      </Route>

    </Router>
     );
   }
 }
