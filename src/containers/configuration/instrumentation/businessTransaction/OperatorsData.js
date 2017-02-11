

export var arrStringOperation = [{ 'id':1, 'option': 'EQUALS' },
                          { 'id':2 ,'option': 'NOT EQUALS' },
                          { 'id':3,'option': 'CONTAINS' },
                          { 'id':4, 'option': 'STARTS WITH' },
                          { 'id':5, 'option': 'ENDS WITH' }
                          ];

export var arrNumericOperation = [{'id':6 ,'option': 'EQUAL' },
                          {'id':7, 'option': 'NOT EQUAL' },
                          { 'id':8,'option': 'LESS THAN' },
                          { 'id':9,'option': 'GREATER THAN' },
                          { 'id':10 ,'option': 'LESS THAN EQUAL TO' },
                          { 'id':11 ,'option': 'GREATER THAN EQUAL TO' }
                          ];

export var arrBooleanOperation = [ {'id':12 ,'option': 'TRUE' },
                          {'id':13, 'option': 'FALSE' }
                        ];
  
export var arrCharOperation = [{'id':14,'option':'EXCEPTION'}];

export var sessAttrTypeList = [ {'id':0 ,'option': 'String' },
                                {'id':1, 'option': 'Integer' },
                                {'id':2,'option': 'Decimal' },
            ];


  export function gettingOpData(row){
      var arrOp;
      if(row.hasOwnProperty("opCode")){
        if(id >=1 && id < 6)
            arrOp = arrStringOperation

        else if(id >=6 && id < 12)
            arrOp = arrNumericOperation 

        else if(id >= 12 && id <14)
            arrOp = arrBooleanOperation

        else
            arrOp = arrCharOperation
      }
      else{
          arrOp = sessAttrTypeList
      }
    console.log("arrOp--",arrOp)
    return arrOp ;
  }



  export function getOperationName(id){
      console.log("getOperationName method called")

      var arrOp;
      let operationName;
      if(row.hasOwnProperty("opCode")){
      if(id >=1 && id < 6)
        arrOp = arrStringOperation

     else if(id >=6 && id < 12)
        arrOp = arrNumericOperation 

     else if(id >= 12 && id <14)
        arrOp = arrBooleanOperation

    else
        arrOp = arrCharOperation

        console.log("arrOp--",arrOp)
        arrOp.map(function(val){
            if(val.id == id){
                operationName = val.option
            }
        })
      }
      
   console.log("operationName--",operationName) 
    return operationName;
  }

  export function getTypeName(typeId){
      console.log("getTypeName method called")
      let typeName = "NA";
      sessAttrTypeList.map(function(val){
          if(val.id == typeId)
            typeName = val.option
      })
      return typeName;
  }