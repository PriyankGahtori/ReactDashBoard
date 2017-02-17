/*
* This function constructs the final value of enableJVMThreadMonitor keyword to send to server 
* and for writing to nd.conf
* Ex : enableJVMThreadMonitor = 1%200%201 for jvm monitor keyword
*/

export function constructJVMValue(formData){
	var jvmVal ={};

	if(formData.enableJVM === "false" || formData.enableJVM === false)
	{
		jvmVal = "0";
	}
	else
	{
		jvmVal = "1%20" + formData.cpuFilter;

		if(formData.doNotDelfactor === "false" || formData.doNotDelfactor === false)
		{
			jvmVal = jvmVal  + "%200";
		}
		else
		{
			jvmVal = jvmVal  + "%201";
		} 
	}
	return jvmVal ;
}

export function splitValue(data){
   var jvmVal = {};
   if(data != null && data != 0){
   var splittedData = data.split('%20') ;
   jvmVal.enableJVM = splittedData[0] != '0' ;

   if(jvmVal.enableJVM){
   	  jvmVal.cpuFilter = splittedData[1] != '0' ? splittedData[1]:'0';
	  jvmVal.doNotDelfactor = splittedData[2] != '0' ;
   }
   }
   	return jvmVal ;
}