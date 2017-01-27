//Importing React components
import React from 'react';
import {hashHistory } from 'react-router';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import {Card} from 'material-ui/Card';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators  from '../../../../actions/index';
import {triggerRunTimeChanges} from '../../../../actions/runTimeChanges';
import TextField from 'material-ui/TextField';

const obj = {}
class AttrValComponent extends React.Component {
  
  constructor(props) {
    super(props)    
    console.log("this.props--",this.props)
   
  }


  componentWillMount(){
  
    
  }

  componentWillReceiveProps(nextProps){
    console.log("nextProps--",nextProps)
    if(this.props.value != nextProps.value){
      this.setState({valName:nextProps.value.valName,
                      lb:nextProps.value.lb,
                      rb:nextProps.value.rb
      })
      
      console.log("this.state--",this.state.valName)
    }
  }

  del(){

}
  
valNameChange(evt,value){
    console.log("value---",value)
    console.log("this.props--",this.props.value)
    this.props.valNameChange(value,this.props.value.id);
}

lbChange(evt,value){
    this.props.lbChange(value,this.props.value.id)
}

rbChange(evt,value){
    this.props.rbChange(value,this.props.value.id)
}


  render() {
    
    return ( 
         <div className ="row col-md-10" >
        <div className ="col-md-3" style= {{width:'50px'}}>
          <TextField
               floatingLabelText="Value Name "
               onChange ={this.valNameChange.bind(this)}
                style = {{width:'160px'}}
          />
       </div>
       <div className ="col-md-1">
       </div>

       <div className ="col-md-2" style={{}}>
          <TextField
               floatingLabelText="Left Bound"
               onChange ={this.lbChange.bind(this)}
               style = {{width:'160px',position:'relative',left:'18px'}}
          />
     </div>

     <div className ="col-md-2" style ={{position:'relative',left:'10px'}}>
          <TextField
            floatingLabelText="Right Bound"
            onChange ={this.rbChange.bind(this)}
             style = {{width:'100px',position:'relative',left:'25px'}}
          />
     </div>



    
    </div>
    )  
  }
}

function mapStateToProps(state) {
  return {
    initialValKeywords :state.Keywords.initializeKeywords,
    getAllKeywordData :state.Keywords,
    trData : state.initialData.trData,
    trModeDetail: state.trModeDetail,
    homeData: state.initialData.homeData,
    ns_wdir: state.initialData.ns_wdir,
    profileDisabled: state.profileDisabled.disabled
   };
}

//method to dispatch actions to the reducers
function mapDispatchToProps(dispatch) {

return bindActionCreators(actionCreators, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(AttrValComponent);