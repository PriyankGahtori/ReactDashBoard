//validate BCI capturing Keywords
export function validateBCICapturingKeywords(data) {
  return data.bciInstrSessionPct.value === "0" && 
         data.logLevelOneFpMethod.value === "0" &&
         data.correlationIDHeader.value === "0" && 
         data.doNotDiscardFlowPaths.value === "0" &&
         data.setCavNVCookie.value === "0" &&
         data.enableCpuTime.value === "0" &&
         data.enableForcedFPChain.value === "0";

}

//validate HotSpot Capturing Keywordse

export function validateHotSpotCapturingKeywords(data) {
   
  return data.ASThresholdMatchCount.value === "0" && 
         data.ASSampleInterval.value === "0" && 
         data.ASReportInterval.value === "0" &&
         data.ASDepthFilter.value === "0" &&
         data.ASTraceLevel.value ===  "0" &&
         data.ASStackComparingDepth.value === "0";
       
}

export function validateDebugKeywords(data){
  return  data.enableBciDebug.value === "0" && 
          data.enableBciError.value === "0" &&
          data.InstrTraceLevel.value === "0"; 
      }

export function validateBackendMonitorKeywords(data){
  return  data.enableBackendMonitor.value === "0"; 
      }

export function validateMonitorKeywords(data){
  return  data.enableBTMonitor.value === "0"; 
      }

export function validateExcptKeywords(data){
  return data.InstrException.value === "0"
}

export function validateFpHdrChkBox(data){
  return data.captureHTTPReqFullFp.value == "0" &&
         data.captureHTTPRespFullFp.value == "0";
}

export function setDefaultValuesBCICapturing(data){ 

  var defaultKeywordData = { 
                              "bciInstrSessionPct" : data.bciInstrSessionPct.defaultValue, 
                              "logLevelOneFpMethod" : data.logLevelOneFpMethod.defaultValue,
                              "correlationIDHeader" : data.correlationIDHeader.defaultValue,
                              "doNotDiscardFlowPaths" : data.doNotDiscardFlowPaths.defaultValue,
                              "setCavNVCookie":data.setCavNVCookie.defaultValue,
                              "enableCpuTime":data.enableCpuTime.defaultValue,
                              "enableForcedFPChain":data.enableForcedFPChain.defaultValue


  }
    return defaultKeywordData;
}

export function setDefaultValuesHotSpotCapturing(data){

    var defaultKeywordData = { 
                              "ASSampleInterval" : data.ASSampleInterval.defaultValue, 
                              "ASThresholdMatchCount" : data.ASThresholdMatchCount.defaultValue,
                              "ASReportInterval" : data.ASReportInterval.defaultValue,
                              "ASDepthFilter" : data.ASDepthFilter.defaultValue,
                              "ASTraceLevel" :data.ASTraceLevel.defaultValue,
                              "ASStackComparingDepth":data.ASStackComparingDepth.defaultValue,
  }
    return defaultKeywordData;
}
export function setDefaultValuesDebugCapturing(data){
   var defaultKeywordData ={  "enableBciDebug" : data.enableBciDebug.defaultValue,
                              "enableBciError" : data.enableBciError.defaultValue,
                              "InstrTraceLevel":data.InstrTraceLevel.defaultValue
                            }
    return defaultKeywordData;
}

export function setDefaultValuesBackendMonitor(data){
   var defaultKeywordData ={  "enableBackendMonitor" : data.enableBackendMonitor.defaultValue
                            }
  return defaultKeywordData;
}

export function setDefaultValuesMonitor(data){
   var defaultKeywordData ={  "enableBTMonitor" : data.enableBTMonitor.defaultValue
                            }
  return defaultKeywordData;
}

export function setDefaultValuesExcptCapturing(data){
  var defaultKeywordData = { "instrExceptions" : data.instrExceptions.defaultValue
                            }
  return defaultKeywordData ;
}

export function setDefaultValuesFpHdrCapturing(data){
  var defaultKeywordData = { "captureHTTPReqFullFp" : data.captureHTTPReqFullFp.defaultValue,
                              "captureHTTPRespFullFp":data.captureHTTPRespFullFp.defaultValue
                            }
  return defaultKeywordData ;
}

export const disabledExcptCapturing = {
                                    "instrExceptions" : "0"
}

export const disabledBCICapturing = {
                                      "bciInstrSessionPct" : "0", 
                                      "doNotDiscardFlowPaths" : "0",
                                      "enableBciDebug" : "0",
                                      "correlationIDHeader" : "0",
                                      "logLevelOneFpMethod" : "0",
                                      "setCavNVCookie":"0",
                                      "enableCpuTime":"0",
                                      "enableForcedFPChain":"0"
                                    }; 

export const disabledHotSpotCapturing = {
                                      "ASThresholdMatchCount" :"0",
                                      "ASSampleInterval":"0",
                                      "ASReportInterval":"0",
                                      "ASDepthFilter":"0",
                                      "ASTraceLevel":"0",
                                      "ASStackComparingDepth":"0"

};

export const disabledDebugCapturing = {
                               "enableBciDebug" : "0",
                                "enableBciError" : "0",
                                "InstrTraceLevel":"0"
};



export const disabledBackendMonitor = {
                                    "enableBackendMonitor" : "0"
};


export const disabledFpCapturing = {
                                "captureHTTPReqFullFp":"0",
                                "captureHTTPRespFullFp":"0"
}

export const disabledBTMonitor = {
                                    "enableBTMonitor" : "0"
};
