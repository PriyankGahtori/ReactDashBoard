import React from 'react';
import MultiSelect from 'react-select';
import axios from 'axios';
import * as url from '../actions/restURL';
// Be sure to include styles at some point, probably during your bootstrapping
import 'react-select/dist/react-select.css';
	var options = [
    { value: 'one', label: 'One' },
    { value: 'two', label: 'Two' },
    { value: 'three', label: 'Three' }
   ];

  getAllOptions()
  {
  	console.log("getAllOptions method called")

  	 axios.get(url.GET_INSTR_PROFILE_LIST)
  	     .then(function(response){
  	     	console.info("Multi Prof Data = ",response);
  	  		let finaldata=[];
  	     	response.data.map(function(value){
		  	 	console.log("value in amp--",value)
		  	 	finaldata.push({value:value , label : value})
		  	 })
  	     	console.log("finaldata---",finaldata)
  	     	//this.setState( { options: finaldata })
  	     return { options: finaldata };
  	     }) 
  }

export default class InstrProfileMultiSelect extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {value:[]};
    this.state = {listData :[]};
  }

  componentWillMount(){
  var data =
  axios.get(url.GET_INSTR_PROFILE_LIST)
  	     .then(function(response){
  	     	console.info("Multi Prof Data = ",response);
  	  		let finaldata=[];
  	     	response.data.map(function(value){
		  	 	console.log("value in amp--",value)
		  	 	finaldata.push({value:value , label : value})
		  	 })
  	     	console.log("finaldata---",finaldata)
  	     	
  	     	return { options: finaldata };
  	     })

  }

  updateSelected(value){
    console.log("updateSelected function called---",value)
    this.setState({value });
  }

  

  render() {
  

    return (
      <div>
      <p>{"Pooja"}</p>
      <p>{this.getAllOptions.bind(this)}</p>

      	<MultiSelect.Async
          name ="instrProfileMultiSelect"
          value = {this.state.value}
          options = {this.state.options}
          loadOptions={this.getAllOptions.bind(this)}
          onChange={this.updateSelected.bind(this)}
      	/>

      </div>
    );
  }
}
