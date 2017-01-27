 
 export function splitValue(data){
     console.log("formData---",data)
     var obj ={};
    if (data != null || data!= 0){
        var val = data;
        var splitVal = val.split("%20");
        console.log("splitVal--",splitVal)
        console.log("splitVall---",splitVal[3])
        obj.cookieName = splitVal[1];
        obj.serviceMethodDepth = splitVal[2];
        obj.enableNewFormat= splitVal[3] != null ;
        obj.maxFpBucketSize = splitVal[3];
    }
    console.log("obj--",obj)
    return obj;


 }
