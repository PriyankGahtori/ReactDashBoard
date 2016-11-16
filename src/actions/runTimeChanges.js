import {sendRunTimeChange}  from './index';
import * as url from './restURL';

/* ************  Runtime  Changes ********************* */
/*  
    trData : contains the detail of test run, trno and mode(running/off)
    trModeDetail : contains current selected node's  info 
    (profileID, topologyID/tierID/ServerID...)
*/

export function triggerRunTimeChanges(trData,trModeDetail,keywordDatalst)
{
  console.log("triggerRunTimeChanges method")
  //if test is offline mode, return (no run time changes)
  if(trData.switch == false || trData.status == null || trModeDetail.nodeType == null)
  {
  	console.log("NO RUN TIme Changes",trData);
    return ;
  }
  else
  {
  	console.log("going to make RUN TIme Changes",trData);
  	console.log("trModeDetail.nodeType", trModeDetail.nodeType)
  	//get node's route information

  	//if it is from profile return, no run time change from profile level
  	if(trModeDetail.nodeType == 'profile'){
  		return ;
  	}
  	else if(trModeDetail.nodeType == 'topology'){
  		const URL = `${url.RUNTIME_CHANGE_TOPOLOGY}/${trModeDetail.topoId}`;
  		sendRunTimeChange(URL, keywordDatalst);
  	}
  	else if(trModeDetail.nodeType == 'tier'){
  		const URL = `${url.RUNTIME_CHANGE_TIER}/${trModeDetail.tierId}`;
  		sendRunTimeChange(URL, keywordDatalst);
  	}
  	else if(trModeDetail.nodeType == 'server'){
  		const URL = `${url.RUNTIME_CHANGE_SERVER}/${trModeDetail.serverId}`;
  		sendRunTimeChange(URL, keywordDatalst);
  	}
  	else if(trModeDetail.nodeType == 'instance'){
  		const URL = `${url.RUNTIME_CHANGE_INSTANCE}/${trModeDetail.instanceId}`;
  		sendRunTimeChange(URL, keywordDatalst);
  	}

  	return;

  }

    
}