import React from 'react';
import DropDownMenu from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators  from '../actions/index';
import {hashHistory } from 'react-router';

var menuStyles = {
   width: '225px',
   paddingRight:'10px',
   textAlign: 'center',
   marginBottom:'10px' 
  }

class DropDownAppList extends React.Component {

    constructor(props) {
    super(props);
    this.state = {dropDownData: this.props.dropDownData}
    //this.state = {value :this.props.appId}
    this.menuChange = this.menuChange.bind(this);
  }


  menuChange(event,index,value){
   var data = this.props.dropDownData[0].value.filter(function(val){
               return val.id == value
  });
  console.log("data---",data)
  // hashHistory.push(`/application/${value}`)
  var dcId = parseInt(data[0].dcId);
  hashHistory.push(`/app/${dcId}`)
  this.setState({value:value})
  }

  componentWillReceiveProps(nextProps){
      if(this.props.dropDownData != nextProps.dropDownData){
        this.setState({dropDownData:nextProps.dropDownData});
    }
    if(nextProps.appId != null){
        if(this.props.appId != nextProps.appId){
            this.setState({value:nextProps.appId});
        }
  }
}

 render() {

  if(this.props.dropDownData!=null){
    return (
     <div>
      <DropDownMenu 
        onChange={this.menuChange} 
        style={menuStyles}
        hintText="Select Application" 
        value={this.state.value+""}
        underlineStyle={{borderTopWidth:0}}
      >
       {
         this.props.dropDownData[0].value.map((data, index) => (
         <MenuItem value={data.id}  primaryText={data.name}/> 
         ))
       }
     
      </DropDownMenu>
     </div>
    );
  }
  return(
    <div>
    </div>
    );
  }
  

}

function mapStateToProps(state){
  console.log("in DRop --",state.initialData)
    return{
      dropDownData:state.initialData.homeData,
      appId :state.initialData.appId,


    };
}

//method to dispatch actions to the reducers
function mapDispatchToProps(dispatch) {
  //const actionMap = { loadInitTreeData: bindActionCreators(fetchTreeData, dispatch) };
  //return actionMap;
return bindActionCreators(actionCreators, dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(DropDownAppList);
