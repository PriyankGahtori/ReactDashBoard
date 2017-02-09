 
 export function splitValue(data){
     var obj ={};
    if (data != null || data!= 0){

        var val = data;
        var splitVal = val.split("%20");
        obj.cookieName = splitVal[1];
        obj.serviceMethodDepth = splitVal[2];
        obj.enableNewFormat= splitVal[3] != ""  &&  splitVal[3] != 4;
        obj.maxFpBucketSize = splitVal[3];
    }
    return obj;


 }
