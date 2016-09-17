import _ from "lodash";
//var mapValues = require('lodash.mapvalues');
const initialState = {initializeKeywords:null ,
					data:null
					}
export default function (state = initialState,action){

	switch(action.type){
	case 'GET_ALL_KEYWORDS':
	    console.log("inside  GET_ALL_KEYWORDS", action.payload.data);
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
		console.log("newState.initializeKeyword---",newState.initializeKeywords);
		return newState;

	case 'UPDATE_KEYWORDS_DATA':
		var newState = Object.assign({}, state);
		newState.data = action.payload.data ;
		return newState;
	}
	return state;
}