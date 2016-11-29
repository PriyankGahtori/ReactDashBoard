/*
* This function constructs the final value of instrException keyword to send to server 
* and for writing to nd.conf
* Ex : instrException = 1%200%201%96 for instrException keyword
*/

export function instrExceptionValue(formData){
	console.log("instrExceptionValue-- ",formData)
	var instrVal ={};
	if(formData.enable === "false" || formData.enable === false){
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
	return instrVal ;
}

/*
 * functions for splitting value of instrException keyword for initialization purpose
 */
 export function splitValue(data){
   console.log("instrException  splitValue function  ",data)
   
   var instrExceptionFieldVal = {};
   var splittedData = data.split('%20') ;
   instrExceptionFieldVal.enable = splittedData[0] != '0' ;

   if(instrExceptionFieldVal.enable){
   	  instrExceptionFieldVal.enableCaptureExcepStackTrace = splittedData[1] != '0' ;
   	  instrExceptionFieldVal.exceptionType =  splittedData[2] === '1' ? "handledException" : "unhandledException"; ;
   }
   if(instrExceptionFieldVal.enableCaptureExcepStackTrace)
   	  instrExceptionFieldVal.stackTraceDepthValue = splittedData[3] ;


    console.log("splittedData[0] != '0'---",splittedData[0] != '0')
   console.log("splittedData[1] != '0'---",splittedData[1] != '0')
   console.log("splittedData[2]--",splittedData[2])
   	console.log("instrExceptionFieldVal---",instrExceptionFieldVal)
   	return instrExceptionFieldVal ;
}