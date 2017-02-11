
const arrString = [{'id':0,'opVal':'CAPTURE'},
                    {'id':1,'opVal':'EXTRACT_SUBPART'},
                    {'id':2,'opVal':'INVOCATION'},
                   {'id':3,'opVal':'EQUALS'},
                    {'id':4,'opVal':'NOT_EQUALS'},
                    {'id':5, 'opVal':'CONTAINS'},
                    {'id':6,'opVal':'STARTS_WITH'},
                    {'id':7,'opVal':'ENDS_WITH'},
                    {'id':8,'opVal':'EXCEPTION'}];
 
const arrNumeric = [{'id':0,'opVal':'CAPTURE'},
                    {'id':1,'opval':'INVOCATION'}]

const arrChar = [{'id':'0','opVal':'CAPTURE'}]

const arrBoolean = [{'id':'0','opVal':'CAPTURE'},
                 {'id':'1','opVal':'INVOCATION'},
                 {'id':'2','opVal':'EXCEPTION'}
]

export function opValList(type){
    let opList =[];
    if(type == "object/string")
        opList = arrString ;

    else if(type == "int" || type == "short"|| type == "float"|| type == "long"|| type == "double" )
        opList = arrNumeric;

     else if(type == "byte" || type == "char")
        opList = arrChar;

    else if(type == "boolean" )
        opList = arrBoolean ;

        return opList;
}

export function opValName(opValId,arr){
    

}