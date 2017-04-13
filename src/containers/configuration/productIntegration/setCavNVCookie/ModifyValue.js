 
 export function splitValue(data){
     var obj ={};
    if (data != null || data!= 0){

        var val = data;
        var splitVal = val.split("%20");
        obj.serviceMethodEntryDepth = splitVal[0] != "0";
        obj.serviceMethodExitDepth = splitVal[1] != "0";
        obj.onResponseCommitEvent= splitVal[2] != "0" ;
        obj.enableCavNVHeader = splitVal[3] != "0";
        obj.ndSessionCookieName = splitVal[4];
        obj.domainName =splitVal[5];
        obj.idleTimeOut = splitVal[6];
        obj.maxFlowpathInSessionCount = splitVal[7];
    }
    return obj;


 }
