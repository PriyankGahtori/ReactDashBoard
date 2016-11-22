export function splitValue(data){
	console.log("data ---",data)
	var genExcptInMethodObj = {};
	if(data != 0){
		var value = data.split('%20');
		genExcptInMethodObj.excptPerct = value[0];
		genExcptInMethodObj.fqm = value[1] ;
		genExcptInMethodObj.exceptionTypeForMethod = value[2];
		genExcptInMethodObj.exceptnName = value[3];
	}
	return genExcptInMethodObj;
}

export function constructVal(data){
	console.log("constructVal meyhod called")
	var genExcptInMethod = {};
	genExcptInMethod = data.excptPerct+"%20";

	var modifiedFqm = data.fqm.replace(';','%3B');
	genExcptInMethod = genExcptInMethod + modifiedFqm + "%20";

	genExcptInMethod = genExcptInMethod + data.exceptionTypeForMethod + "%20" + data.exceptnName ;
	return genExcptInMethod;
}