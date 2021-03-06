import _ from "lodash";
import * as validate from '../actions/validateGeneralKeywords';
import * as modifiedValGenExcptInMethod from '../containers/configuration/advance/genExcptInMethod/ModifyValue';
import * as modifiedValSetJVMMon from '../containers/configuration/general/jvmMonitor/ModifyValue';
import * as modifiedValFpHdrCapturing from '../containers/configuration/general/flowPathHeaderCapture/ModifyValue';
import * as modifiedValInstrExcptCapt from '../containers/configuration/general/exceptionCapture/ModifyValue';
import * as modifiedValSetCavNVCookie from '../containers/configuration/productIntegration/setCavNVCookie/ModifyValue';

//var mapValues = require('lodash.mapvalues');
const initialState = {initializeKeywords:{instrExceptionObj:{exceptionType:"handledException"}} ,
					data:null,
					enableBCICheckBox : false,
					hotSpotCapturingCheckBox :false,
					enableDebugCheckBox :false,
					enableBackendMonitorCheckBox :false,
					enableExcptCheckBox :false,
					listOfXmlFilesInstr :[],
					uploadTopology :null,
					enableNDEntryPointsFile :false,
					genExcptInMethod :false ,
					enableFpHdrCheckBox : false,
					enableMonitorsCheckBox : false,   //for enable Monitor keywords group checkbox
					enableJVMMonitorCheckBox : false
					}


export default function (state = initialState,action){

switch(action.type){
	
	case 'GET_ALL_KEYWORDS':
	console.log("GET_ALL_KEYWORDS called")
	   	var newState = Object.assign({}, state);
		newState.data = action.payload.data ;
		var data = action.payload.data;

	//below code to get object with keys as keywords and values as its value		
		let obj = _.mapValues(data, function(obj){ return obj.value; });

		//for initialization of  keyword generateExceptionInMethod
		var  genExcptInMethodObj = modifiedValGenExcptInMethod.splitValue(obj.generateExceptionInMethod);
		obj.genExcptInMethodObj = genExcptInMethodObj;	

		//for initialization of FP header Capturing
		var fpHdrInitializeObj = modifiedValFpHdrCapturing.splitValue(obj);
		obj.fpHdrInitializeObj = fpHdrInitializeObj;

		//for initialization of instrException keyword
		var instrExceptionObj = modifiedValInstrExcptCapt.splitValue(obj.instrExceptions)
		obj.instrExceptionObj = instrExceptionObj;

		obj.setCavCookieInitializeObj = obj.enableNDSession != 0;

		
		var setCavCookieInitializeObj = modifiedValSetCavNVCookie.splitValue(obj.enableNDSession)
		obj.setCavCookieInitializeObj = setCavCookieInitializeObj;

		var setJVMMonInitializeObj = modifiedValSetJVMMon.splitValue(obj.enableJVMThreadMonitor)
		obj.setJVMMonInitializeObj = setJVMMonInitializeObj;

		/*for initializing fields of putDelayInMethod Keywords
		* here putDelayInMethod = "5:20:0:1%20com.cavisson.kk"
		* so need to split /modify it in order to initialize its fields
		*/

	   if(obj.putDelayInMethod != 0){
		var putDelayInMethodFields=  obj.putDelayInMethod.split(':');
		/*
		*  
		*/
		let putDelayInMethodObj = {};
		
		putDelayInMethodObj.fromRange = putDelayInMethodFields[0];
		putDelayInMethodObj.toRange = putDelayInMethodFields[1];
		putDelayInMethodObj.isCpuHogg = putDelayInMethodFields[2] ==='1';

		/* 
		* putDelayInMethodFields[3] can be  either of these 1%20com.cav.pp" ,"1" ,"0";
		* Here decodeURI function gives output as follows :
		* decodeURI(1%20com.cav.pp) = "1 com.cav"
		* decodeURI(1)="1"
		*/

		var lastField = decodeURI(putDelayInMethodFields[3]);
		if(lastField.length > 1){
			var splitArr = lastField.split(' ');
			putDelayInMethodObj.isAutoInstrument = splitArr[0] ==='1';
			putDelayInMethodObj.fqm =splitArr[1];
		}
		obj.putDelayInMethodObj = putDelayInMethodObj ;

	}else
		obj.putDelayInMethodObj = "0";


		newState.initializeKeywords = obj;


		
		var booleanEnableBCICapturing = validate.validateBCICapturingKeywords(action.payload.data)
		newState.enableBCICheckBox = !validate.validateBCICapturingKeywords(action.payload.data) ;
		
		var booleanEnableHotSpotCapturing = validate.validateHotSpotCapturingKeywords(action.payload.data)
		newState.hotSpotCapturingCheckBox = !booleanEnableHotSpotCapturing ;

	   	newState.enableDebugCheckBox = !validate.validateDebugKeywords(action.payload.data);

	   	newState.enableBackendMonitorCheckBox = !validate.validateBackendMonitorKeywords(action.payload.data);

	   	newState.enableNDEntryPointsFile = (action.payload.data.NDEntryPointsFile.value === 'true');

	   	newState.genExcptInMethod = obj.generateExceptionInMethod != 0 ;

	   	newState.enableFpHdrChkBox = !validate.validateFpHdrChkBox(action.payload.data) ;

		newState.enableMonitorsCheckBox = !validate.validateBackendMonitorKeywords(action.payload.data);

		newState.enableExcptCheckBox = obj.instrExceptions != 0;

		console.log("obj.setCavNVCookie !=--",obj.enableNDSession != "0")
		newState.setCavNVCookie = obj.enableNDSession != "0" ;

		newState.enableJVMMonitorCheckBox = obj.enableJVMThreadMonitor != 0 ;

		console.log("GET_ALL_KEYWORDS called---9999999999999999",newState)
	return newState;



		/*
		* storing data of xml files in path [NSWDIR/instrprof/.whitlist]
		*/

	case 'LIST_OF_XMLFILES':
		var newState = Object.assign({}, state);
		newState.listOfXmlFilesInstr = [];
		console.log("at initial--",newState.listOfXmlFilesInstr)	
		console.log("action---",action.payload.data)
		if(action.payload.data != null){
			action.payload.data.map(function(value){
				newState.listOfXmlFilesInstr.push({value:value , label:value})
			})
		}
	return newState ;

		

		 case 'INITIALIZE_INSTREXCEPTION':
		 var newState =Object.assign({},state);
		  _.forEach(newState.data,function(value,key){
			newState.initializeKeywords[key] = value["value"];
		});
		 return newState;


		case 'ENABLE_BCI_CHECKBOX':
		var newState = Object.assign({}, state);
		newState.enableBCICheckBox = action.payload;
		return newState;

		case 'ENABLE_HOTSPOT_CHECKBOX':
		var newState = Object.assign({}, state);
		newState.hotSpotCapturingCheckBox = action.payload;
		return newState;

		case 'ENABLE_EXCPT_CHECKBOX':
		var newState = Object.assign({},state)
		newState.enableExcptCheckBox = action.payload
		return newState;


		case 'ENABLE_DEBUG_CHECKBOX':
		var newState = Object.assign({}, state);
		newState.enableDebugCheckBox = action.payload;
		return newState;

		case 'ENABLE_BACKEND_MONITOR_CHECKBOX':
		var newState = Object.assign({}, state);
		newState.enableBackendMonitorCheckBox = action.payload;
		return newState;

		case 'ENABLE_MONITORS_CHECKBOX':
		var newState = Object.assign({}, state);
		newState.enableMonitorsCheckBox = action.payload;

		case 'GEN_EXCEPTION_IN_METHOD':
		var newState = Object.assign({}, state);
		newState.genExcptInMethod = action.payload;
		return newState;

		case 'ENABLE_JVM_MONITOR':
		var newState = Object.assign({}, state);
		newState.enableJVMMonitorCheckBox = action.payload;
		return newState;
	}
	return state;
}