import _ from "lodash";
import * as validate from '../actions/validateGeneralKeywords';

//var mapValues = require('lodash.mapvalues');
const initialState = {initializeKeywords:{} ,
					data:null,
					BCICapturingCheckBox : false,
					hotSpotCapturingCheckBox :false,
					listOfXmlFilesInstr :[]
				
					}


export default function (state = initialState,action){

	switch(action.type){
	case 'GET_ALL_KEYWORDS':
	    console.log("inside  GET_ALL_KEYWORDS", action.payload.data);
	    console.log("validate----",validate)
	    

		var newState = Object.assign({}, state);	
		var data = action.payload.data;

		let obj = _.mapValues(data, function(obj)
			{
				console.log("obj---",obj)
				return obj.value;
			});

		console.log("mapvalues",obj); 
		newState.initializeKeywords = obj;
		newState.data = action.payload.data ;
		var booleanEnableBCICapturing = validate.validateBCICapturingKeywords(action.payload.data)
		console.log("booleanEnableBCICapturing---",booleanEnableBCICapturing)
		newState.BCICapturingCheckBox = !validate.validateBCICapturingKeywords(action.payload.data) ;

		console.log("newState.enableBCICapturingCheckBox---",newState.BCICapturingCheckBox)

		var booleanEnableHotSpotCapturing = validate.validateHotSpotCapturingKeywords(action.payload.data)
		newState.hotSpotCapturingCheckBox = !booleanEnableHotSpotCapturing ;

		console.log("newState.initializeKeyword---",newState.initializeKeywords);
		//console.log("newState.enableBCICapturingCheckBox---",newState.enableBCICapturingCheckBox)
		console.log("newState.hotSpotCapturingCheckBox----",newState.hotSpotCapturingCheckBox)
		return newState;

	
		case 'SET_DEFAULT_BCICapturingKeywords':
		var newState = Object.assign({}, state);	
		
		let BCICapturingInitial = _.forEach(newState.data,function(value,key){
			console.log("key---",key)
			console.log("value----",value)
			if(key === 'bciInstrSessionPct' || key === 'doNotDiscardFlowPaths' || key === 'enableBciDebug' || key === 'enableBciError' || key === 'enableLevel1FPCapturing'){
				console.log("newState-",newState.data[key]["defaultValue"])
				/*value = newState.data[key]["defaultValue"];*/
				newState.initializeKeywords[key] = value["defaultValue"];
				console.log("value---",newState.initializeKeywords[key])

			}

		});



		console.log("BCICapturingInitial----",BCICapturingInitial)
		//newState.initializeKeywords = BCICapturingInitial;
		console.log("newState.initializeKeywords---",newState.initializeKeywords)
		return newState;

		case 'SET_DEFAULT_HOTSPOTKEYWORDS':
		var newState = Object.assign({}, state);	
		
		let hotSpotCapturingInitial = _.forEach(newState.data,function(value,key){
			console.log("key---",key)
			console.log("value----",value)
			if(key === 'ASSampleInterval' || key === 'ASThresholdMatchCount' || key === 'ASReportInterval' ){
				console.log("newState-",newState.data[key]["defaultValue"])
				/*value = newState.data[key]["defaultValue"];*/
				newState.initializeKeywords[key] = value["defaultValue"];
				console.log("value---",newState.initializeKeywords[key])

			}

		});

		console.log("hotSpotCapturingInitial----",hotSpotCapturingInitial)
		//newState.initializeKeywords = BCICapturingInitial;
		console.log("newState.initializeKeywords---",newState.initializeKeywords)
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

		case 'INITIALIZE_INSTRPROFILE' :
		var newState = Object.assign({}, state);
		 _.forEach(newState.data,function(value,key){
			console.log("key---",key)
			console.log("value----",value)
			
				console.log("newState-",newState.data[key]["defaultValue"])
				newState.initializeKeywords[key] = value["value"];
				console.log("value---",newState.initializeKeywords[key])


		});



	}
	return state;
}