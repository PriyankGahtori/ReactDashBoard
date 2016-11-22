/*
* This function constructs the final value of instrException keyword to send to server 
* and for writing to nd.conf
* Ex : instrException = 1%200%201%96 for instrException keyword
*/

export function instrExceptionValue(formData){
	console.log("instrExceptionValue-- ",formData)
	var instrVal;
	if(formData.enable === "false" && formData.enable === false){
		instrVal = "0";
	}
	else{
		instrVal = "1";

		if(formData.enableCaptureExcepStackTrace === "true" || formData.enableCaptureExcepStackTrace === true)
			instrVal = instrVal+"%201";
		else
			instrVal = instrVal+"%200";

		if(formData.exceptionType === 'handledException')
			instrVal = instrVal+"%201";
		else
			instrVal = instrVal+"%200"

		if(formData.enableCaptureExcepStackTrace === "true" || formData.enableCaptureExcepStackTrace === true)
			instrVal = instrVal+"%20"+formData.stackTraceDepthValue;
	}
	console.log("instrVal--",instrVal)      
	return instrVal ;
}

/*
 *
*/
export function genExcptInMethodValue(formData){

}