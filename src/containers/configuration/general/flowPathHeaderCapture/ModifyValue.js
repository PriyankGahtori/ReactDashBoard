/*
 *
 */
export function constValCaptureHTTPReqFullFp(formData){


	var value = 0;
	if (formData.enableCaptureHTTPReqFullFp === 'true' || formData.enableCaptureHTTPReqFullFp == true ){
	   value = formData.urlMode ;
	  console.log("constValCaptureHTTPReqFullFp---",constValCaptureHTTPReqFullFp)
	  	//here value is coming in string
		if (value === '3'){
			if(formData.hdrModeForReqcapture === 2) //to be confirmed wht to write in case of configured  ????????
			   value = value + "%203" ;

			else if(formData.hdrModeForReqcapture === 1) { //when Specified header option is selected
				 value = value + "%20" ;
	  			 for(var i = 0 ; i < formData.selectedHdrsValReq.length ; i++ ){
					if(i == (formData.selectedHdrsValReq.length-1))
					   value = value +  formData.selectedHdrsValReq[i].value
					else
					   value = value +  formData.selectedHdrsValReq[i].value + ','
				}
			}
			else { //case when All headers option is selected
				 value = value + "%20ALL" ;
			}

			if(formData.captureModeReq === 1)//  here  1 means "brief" capture Mode 
			   value = value + "%201" + "%20" + formData.hdrValChrReq
			else
			   value = value + "%200" ;

		}
	}
	return value;
}

export function constValCaptureHTTPResFullFp(formData){
	console.log("formData---",formData)
	var value = 0;
	if (formData.enableCaptureHTTPResFullFp === 'true' || formData.enableCaptureHTTPResFullFp == true ){
		value = formData.responseData;

		if(value === '2'){  // value = 2 means Capture Response Code and http headers only
		   	if(formData.hdrModeForResCapture === 2) //to be confirmed wht to write in case of configured  ????????
			   value = value + "%20CONFIGURED" ;

			else if(formData.hdrModeForResCapture === 1) {  // casr of Specified Hedaers
				 value = value + "%20" ;

	  			 for(var i = 0 ; i < formData.selectedHdrsValRes.length ; i++ ){
					if(i == (formData.selectedHdrsValRes.length-1))
					   value = value +  formData.selectedHdrsValRes[i].value
					else
					   value = value +  formData.selectedHdrsValRes[i].value + ','
				}
			}
			else { //case when All headers option is selected
				 value = value + "%20ALL" ;
			}

			if(formData.captureModeRes === 1)//  here  1 means "brief" capture Mode 
			   value = value + "%201" + "%20" + formData.hdrValChrRes
			else
			   value = value + "%200" ;

		}

		}
		console.log("excaped-------",value)
		return value;
	}	


export function splitValue(keywords){
	var fpHdrInitializeObj = {};
	if(keywords.captureHTTPReqFullFp != 0){
		var value = keywords.captureHTTPReqFullFp .split('%20');
		fpHdrInitializeObj.enableCaptureHTTPReqFullFp = true;
		fpHdrInitializeObj.urlMode = value[0] ;
		fpHdrInitializeObj.hdrModeForReqcapture = value[1] === 'ALL' ? 0 :(value[1] === 'CONFIGURED' ? 2 : 1);
		if(fpHdrInitializeObj.hdrModeForReqcapture === 1){

		}
		fpHdrInitializeObj.captureModeReq = value[2]
		if(fpHdrInitializeObj.captureModeReq === 1)
		 fpHdrInitializeObj.hdrValChrReq = value[3];

		if(keywords.captureHTTPRespFullFp != 0){
		var valueResp = keywords.captureHTTPRespFullFp .split('%20');
		fpHdrInitializeObj.enableCaptureHTTPRespFullFp = true;
		fpHdrInitializeObj.responseData = valueResp[0] ;
		fpHdrInitializeObj.hdrModeForResCapture = valueResp[1] === 'ALL' ? 0 :(valueResp[1] === 'CONFIGURED' ? 2 : 1);
		if(fpHdrInitializeObj.hdrModeForReqcapture === 1){
			//left fo rfuther initilaizing of multiselect comp
		}
		fpHdrInitializeObj.captureModeRes = value[2]

		}
	}
	return fpHdrInitializeObj;
}