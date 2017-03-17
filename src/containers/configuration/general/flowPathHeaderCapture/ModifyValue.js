/*TO DO
 * code needs to changed as per changed in keyords
 */
export function constValCaptureHTTPReqFullFp(formData) {
	var value = 0;
	if (formData.enableCaptureHTTPReqFullFp === 'true' || formData.enableCaptureHTTPReqFullFp == true) {
		//value = formData.urlMode;
		console.log("constValCaptureHTTPReqFullFp---", constValCaptureHTTPReqFullFp)
		//here value is coming in string
		//if (value === '3') {
		if(formData.hdrModeForReqcapture != null && formData.captureModeReq  != null ){
			value = 3;
			if (formData.hdrModeForReqcapture === 2) //to be confirmed wht to write in case of configured  ????????
				value = value + "%203";

			else if (formData.hdrModeForReqcapture === 1) { //when Specified header option is selected
				value = value + "%20";
				if(formData.selectedHdrsValReq != undefined){
					for (var i = 0; i < formData.selectedHdrsValReq.length; i++) {
						if (i == (formData.selectedHdrsValReq.length - 1))
							value = value + formData.selectedHdrsValReq[i].value
						else
							value = value + formData.selectedHdrsValReq[i].value + ','
					}
				}
			}
			else if(formData.hdrModeForReqcapture === 0){
				value = value + "%20ALL";
			}
			else { //case when All headers option is selected
				value = 2;
			}

			if (formData.captureModeReq === 1)//  here  1 means "brief" capture Mode 
				value = value + "%201" + "%20" + formData.hdrValChrReq
			else
				value = value + "%200";

		}
		else{
			//default value
			value = 2;
		}
		console.log("value--",value)
	}
	return value;
}

export function constValCaptureHTTPResFullFp(formData) {
	var value = 0;
	if (formData.enableCaptureHTTPRespFullFp === 'true' || formData.enableCaptureHTTPRespFullFp == true) {
	//	value = formData.responseData;

	//	if (value === '2') {  // value = 2 means Capture Response Code and http headers only
		if(formData.hdrModeForResCapture != null && formData.captureModeRes != null){
			value = 2;
		/*	if (formData.hdrModeForResCapture === 2) //to be confirmed wht to write in case of configured  ????????
				value = value + "%20CONFIGURED";
		*/

		 if (formData.hdrModeForResCapture === 1) {  // casr of Specified Hedaers
				value = value + "%20";
				if(formData.selectedHdrsValRes != undefined){
					for (var i = 0; i < formData.selectedHdrsValRes.length; i++) {
						if (i == (formData.selectedHdrsValRes.length - 1))
							value = value + formData.selectedHdrsValRes[i].value
						else
							value = value + formData.selectedHdrsValRes[i].value + ','
					}
				}
			}
			else if(formData.hdrModeForResCapture === 0){ //case when All headers option is selected
				value = value + "%20ALL";
			}

			if (formData.captureModeRes === 1)//  here  1 means "brief" capture Mode 
				value = value + "%201" + "%20" + formData.hdrValChrRes
			else
				value = value + "%200";

		}
		else
		{
		value = 1;
	 }
	}
	

	//}
	console.log("excaped-------", value)
	return value;
}


export function splitValue(keywords) {
	var fpHdrInitializeObj = {};
	if ( keywords.captureHTTPReqFullFp != null &&  keywords.captureHTTPReqFullFp != 0 ){
		var value = keywords.captureHTTPReqFullFp.split('%20');
		fpHdrInitializeObj.enableCaptureHTTPReqFullFp = true;
		fpHdrInitializeObj.urlMode = value[0];
		fpHdrInitializeObj.hdrModeForReqcapture = value[1] === 'ALL' ? 0 : (value[1] === 'CONFIGURED' ? 2 : 1);

		if (fpHdrInitializeObj.hdrModeForReqcapture === 1) {
			var multiSelectValue =[];
			var arrTemp = value[1].split(',');
			for (var i=0;i<arrTemp.length;i++)
			{
				multiSelectValue.push(arrTemp[i]);
			}
			fpHdrInitializeObj.multiSelectValue = multiSelectValue;
		}

		fpHdrInitializeObj.captureModeReq = value[2];

		if (fpHdrInitializeObj.captureModeReq > 0){
			fpHdrInitializeObj.hdrValChrReq = value[3];
		}
	}
	if (keywords.captureHTTPRespFullFp != 0 && keywords.captureHTTPRespFullFp != null) {
		var valueResp = keywords.captureHTTPRespFullFp.split('%20');
		fpHdrInitializeObj.enableCaptureHTTPRespFullFp = true;
		fpHdrInitializeObj.responseData = valueResp[0];
		fpHdrInitializeObj.hdrModeForResCapture = valueResp[1] === 'ALL' ? 0 : (valueResp[1] === 'CONFIGURED' ? 2 : 1);
		if (fpHdrInitializeObj.hdrModeForResCapture === 1) {
			//left fo rfuther initilaizing of multiselect comp
		}
		fpHdrInitializeObj.captureModeRes = valueResp[2]
		if (fpHdrInitializeObj.captureModeRes > 0){
			fpHdrInitializeObj.hdrValChrRes = valueResp[3];
		}

		}
		fpHdrInitializeObj.enableCaptureCustomData = keywords.captureCustomData == "true";
	
	return fpHdrInitializeObj;
}