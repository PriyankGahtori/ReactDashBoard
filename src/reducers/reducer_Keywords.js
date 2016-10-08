import _ from "lodash";
import * as validate from '../actions/validateGeneralKeywords';

//var mapValues = require('lodash.mapvalues');
const initialState = {initializeKeywords:{instrExceptionObj:{exceptionType:"handledException"}} ,
					data:null,
					enableBCICheckBox : false,
					hotSpotCapturingCheckBox :false,
					enableDebugCheckBox :false,
					listOfXmlFilesInstr :[],
					uploadTopology :null
					}


export default function (state = initialState,action){

switch(action.type){
	
	case 'GET_ALL_KEYWORDS':
	   	var newState = Object.assign({}, state);
		newState.data = action.payload.data ;

		var data = action.payload.data;
		let obj = _.mapValues(data, function(obj){ return obj.value; });

		var instrExceptionFields = obj.instrExceptions.split('%20');
		console.log("instrExceptionFields--",instrExceptionFields)		
		let instrExceptionObj = {};
		if(instrExceptionFields.length > 0)
		{
		    instrExceptionObj.enable = instrExceptionFields[0] ==='1';	
		    instrExceptionObj.enableCaptureExcepStackTrace = instrExceptionFields[1] === '1'
		    instrExceptionObj.exceptionType = instrExceptionFields[2] === '1' ? "handledException" : "unhandledException";
		    
		    // if stackTraceDepthValue is not selected
		    if(instrExceptionFields.length < 4)
		      instrExceptionObj.stackTraceDepthValue = instrExceptionFields[3] = '0' ; 

			//add this object to initial value obj
		}

		obj.instrExceptionObj = instrExceptionObj;			 

		newState.initializeKeywords = obj;
		console.log("newState.initializeKeywords---",newState.initializeKeywords)
		var booleanEnableBCICapturing = validate.validateBCICapturingKeywords(action.payload.data)
		newState.enableBCICheckBox = !validate.validateBCICapturingKeywords(action.payload.data) ;
		
		var booleanEnableHotSpotCapturing = validate.validateHotSpotCapturingKeywords(action.payload.data)
		newState.hotSpotCapturingCheckBox = !booleanEnableHotSpotCapturing ;

		newState.enableDebugCheckBox = !validate.validateDebugKeywords(action.payload.data);
	return newState;

	
	case 'SET_DEFAULT_BCICapturingKeywords':
		var newState = Object.assign({}, state);	
		//let BCICapturingInitial = {};



		let BCICapturingInitial = _.forEach(newState.data,function(value,key){
			console.log("key---",key)
			console.log("value----",value)
			if(key === 'bciInstrSessionPct' || key === 'doNotDiscardFlowPaths' || key === 'enableBciDebug' || key === 'correlationIDHeader'
			 || key === 'logLevelOneFpMethod' || key === 'enableCpuTime' || key === 'enableForcedFPChain' || key === 'setCavNVCookie'){
				console.log("newState-",newState.data[key]["defaultValue"])
				
				newState.initializeKeywords[key] = value["defaultValue"];
				console	.log("value---",newState.initializeKeywords[key])

			}

		});



		console.log("BCICapturingInitial----",BCICapturingInitial)
		console.log("newState.initializeKeywords---",newState.initializeKeywords)
	return newState;

	case 'SET_DEFAULT_HOTSPOTKEYWORDS':
		var newState = Object.assign({}, state);	
		
		let hotSpotCapturingInitial = _.forEach(newState.data,function(value,key){
			console.log("key---",key)
			console.log("value----",value)
			if(key === 'ASSampleInterval' || key === 'ASThresholdMatchCount' || key === 'ASReportInterval' || key === 'ASDepthFilter' || key === 'ASTraceLevel'){
				console.log("newState-",newState.data[key]["defaultValue"])
				/*value = newState.data[key]["defaultValue"];*/
				newState.initializeKeywords[key] = value["defaultValue"];
				console.log("value---",newState.initializeKeywords[key])


			}

		});

		console.log("hotSpotCapturingInitial----",hotSpotCapturingInitial)
		//newState.initializeKeywords = BCICapturingInitial;
		console.log("newState.initializeKeywords---",newState.initializeKeywords)
		newState.hotSpotCapturingCheckBox = true;
	return newState;

	case 'SET_DEFAULT_DEBUGKEYWORDS':
		var newState = Object.assign({}, state);	
		
		let debugCapturingInitial = _.forEach(newState.data,function(value,key){
			console.log("key---",key)
			console.log("value----",value)
			if(key === 'enableBciDebug' || key === 'enableBciError' || key === 'InstrTraceLevel'){
				console.log("newState-",newState.data[key]["defaultValue"])
				/*value = newState.data[key]["defaultValue"];*/
				newState.initializeKeywords[key] = value["defaultValue"];
				console.log("value---",newState.initializeKeywords[key])


			}

		});

		console.log("hotSpotCapturingInitial----",debugCapturingInitial)
		//newState.initializeKeywords = BCICapturingInitial;
		console.log("newState.initializeKeywords---",newState.initializeKeywords)
		newState.enableDebugCheckBox = true;
	return newState;
		
		/*
		* storing data of xml files in path [NSWDIR/instrprof/.whitlist]
		*/

	case 'LIST_OF_XMLFILES':
		var newState = Object.assign({}, state);
		newState.listOfXmlFilesInstr = [];
		console.log("at initial--",newState.listOfXmlFilesInstr)	
		console.log("action---",action.payload.data)
		action.payload.data.map(function(value){
			newState.listOfXmlFilesInstr.push({value:value , label:value})
		})
		console.log("newState.listOfXmlFilesInstr---",newState.listOfXmlFilesInstr)
	return newState ;

		/*case 'INITIALIZE_INSTRPROFILE' :
		var newState = Object.assign({}, state);
		 _.forEach(newState.data,function(value,key){
			console.log("key---",key)
			console.log("value----",value)
			
				console.log("newState-",newState.data[key]["defaultValue"])
				newState.initializeKeywords[key] = value["value"];
				console.log("value---",newState.initializeKeywords[key])


		});
		 return newState;*/


		 case 'INITIALIZE_INSTREXCEPTION':
		 var newState =Object.assign({},state);
		 console.log("initialize-INITIALIZE_INSTREXCEPTION----s-",newState.initializeKeywords)
		  _.forEach(newState.data,function(value,key){
			console.log("key---",key)
			console.log("value----",value)
			
				console.log("newState-",newState.data[key]["defaultValue"])
				newState.initializeKeywords[key] = value["value"];
				console.log("value---",newState.initializeKeywords[key])


		});
		 return newState;


		case 'UPDATE_BCI_KEYWORDS':
		var newState = Object.assign({},state);
		console.log("in update bci keywords---",action.payload.data)
		newState.data = action.payload.data ;

		newState.enableBCICheckBox = !validate.validateBCICapturingKeywords(action.payload.data) ;
		console.log("newState.enableBCICheckBox---",newState.enableBCICheckBox)

		let objBci = _.mapValues(action.payload.data, function(objBci)
			{
				console.log("obj---",objBci)
				return objBci.value;
			});

		console.log("mapvalues-------bci initialize--",objBci); 
		newState.initializeKeywords = objBci;
		return newState;


		case 'UPDATE_HOTSPOT_KEYWORDS':
		var newState = Object.assign({},state);
		newState.data = action.payload.data ;
		var booleanEnableHotSpotCapturing = validate.validateHotSpotCapturingKeywords(action.payload.data)
		newState.hotSpotCapturingCheckBox = !booleanEnableHotSpotCapturing ;

		let objHotspot = _.mapValues(action.payload.data, function(objHotspot)
			{
				console.log("obj---",objHotspot)
				return objHotspot.value;
			});

		console.log("hotspot initialize values--",objHotspot); 
		newState.initializeKeywords = objHotspot;
		return newState;


		case 'ENABLE_BCI_CHECKBOX':
		var newState = Object.assign({}, state);
		console.log("bci checkbox---",action.payload)
		newState.enableBCICheckBox = action.payload;
		return newState;

		case 'ENABLE_HOTSPOT_CHECKBOX':
		var newState = Object.assign({}, state);
		console.log("hotspot checkbox---",action.payload)
		newState.hotSpotCapturingCheckBox = action.payload;
		return newState;

		case 'UPDATE_TOPOLOGY':
		var newState = Object.assign({}, state);
		console.log("update topo reducer--",action.payload.data)
		newState.uploadTopology = action.payload.data;
		return newState;

		case 'ENABLE_DEBUG_CHECKBOX':
		var newState = Object.assign({}, state);
		console.log("bci checkbox---",action.payload)
		newState.enableDebugCheckBox = action.payload;
		return newState;


		case 'UPDATE_DEBUG_KEYWORDS':
		var newState = Object.assign({},state);
		newState.enableDebugCheckBox = !validate.validateDebugKeywords(action.payload.data);
		let objDebug = _.mapValues(action.payload.data, function(objDebug)
			{
				console.log("obj---",objDebug)
				return objDebug.value;
			});

		console.log("hotspot initialize values--",objDebug); 
		newState.initializeKeywords = objDebug;
		return newState;

		case 'UPDATE_INSTREXCEPTION':
		var newState = Object.assign({},state);

		return newState;







	}
	return state;
}