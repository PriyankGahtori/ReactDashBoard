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
import DropDownMenu from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const obj = {}

 var arrOperation = [{'id':0,operation:'String'},
                    {'id':1,operation:'Integer'},
                    {'id':2,operation:'Decimal'},
                     ];


class AttrValComponent extends React.Component {
  
  constructor(props) {
    super(props)    
    console.log("this.props--",this.props)
    this.state= {value:''}
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
      
    }
  }

  del(){

}

handleCustomValType(evt,val){ 

  let valName ;
  arrOperation.map(function(data){
                        if(data.id == val){
                            valName = data.operation
                        }
  })
  console.log("valName--",valName)
  this.setState({value:val,
  //               opList :list
    })
 this.props.onCustomValTypeChange(val,valName)
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
      <div style={{paddingLeft:"10px"}}>
  <div className="col-md-12"> 
     <div className="col-md-6" >  
          <TextField
               floatingLabelText="Name "
               onChange ={this.valNameChange.bind(this)}  
               style={{width:"250px" ,position:'relative'}}/>
       </div>
          <div className="col-md-6" > 
        <DropDownMenu
         onChange={this.handleCustomValType.bind(this)} 
          value={this.state.value}
          hintText="Custom Value Type"  
           style={{width:"250px" ,position:'relative', top: "20px"}}>
      {
        arrOperation.map((data,index)=>(
            <MenuItem value={data.id}  primaryText={data.operation}/>
        ))
      }
      </DropDownMenu>
      </div>
      </div>
   

      <div className="col-md-12">
         <div className="col-md-6">
          <TextField
               floatingLabelText="Left Bound"
               onChange ={this.lbChange.bind(this)}
               style = {{width:'',position:'relative'}}   />
          </div>
          <div className="col-md-6">
          <TextField
            floatingLabelText="Right Bound"
            onChange ={this.rbChange.bind(this)}
            style = {{width:'',position:'relative'}}
          />
          </div>
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