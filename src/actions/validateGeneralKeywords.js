
//validate BCI capturing Keywords
export function validateBCICapturingKeywords(data) {
   
  return data.bciInstrSessionPct.value === "0" && 
         data.doNotDiscardFlowPaths.value === "0" && 
         data.enableBciDebug.value === "0" && 
  		  data.enableBciError.value === "0" &&
  		 data.logLevelOneFpMethod.value === "0" ;
}

//validate HotSpot Capturing Keywords

export function validateHotSpotCapturingKeywords(data) {
   
  return data.ASThresholdMatchCount.value === "0" && 
         data.ASSampleInterval.value === "0" && 
         data.ASReportInterval.value === "0" ;
         data.ASDepthFilter.value === "0" &&
         data.ASTraceLevel.value ===  "0" ;
  		 
}

export const disabledBCICapturing = {
                                      "bciInstrSessionPct" : "0", 
                                      "doNotDiscardFlowPaths" : "0",
                                      "enableBciDebug" : "0",
                                      "enableBciError" : "0",
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
                                      "ASTraceLevel":"0"

};