import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators  from '../actions/index';
import {hashHistory } from 'react-router';

var menuStyle = {
   width: '220px',
   marginBottom:'10px' 
  }

class DropDownAppList extends React.Component {

    constructor(props) {
    super(props);
    this.state = {dropDownData: this.props.dropDownData}
    this.state={value :this.props.value}
    this.menuChange = this.menuChange.bind(this);
    console.log("this.props--",this.props)
    console.log("DropDownAppList component constructor called",this.props.value)
  }

   menuChange(event,index,value){
    console.log("in DropDownMenu function-----event--------->",event)
    console.log("in DropDownMenu function-----index--------->",index)
    console.log("in DropDownMenu function-----value--------->",value)
    hashHistory.push(`/application/${value}`)
    this.state={value :value}
  }

  componentWillReceiveProps(nextProps){
      console.log("next prop---->", nextProps.location );
      console.log(" prop--->", this.props.location );
      console.log("in ComponentWillReceiveProps -of DropDownData----nextProps.dropDownData-------->",nextProps.dropDownData)
      console.log("in componentWillReceiveProps  --- props -this-----",this.props.dropDownData);
      if(this.props.dropDownData != nextProps.dropDownData){
        console.log("setting values in if block-------------->")
        this.setState({dropDownData:nextProps.dropDownData});
    }
    console.log("this.props.value---",this.props.value)
    console.log("DropDownAppList component constructor called willreceiveprops--",nextProps.value)
    if(nextProps.value != null){
      
        if(this.props.value != nextProps.value){
            console.log("setting values in componentwillreceive props-------------->")
            this.setState({value:nextProps.value});
        }
  }
}

 render() {

  if(this.props.dropDownData!=null){
    return (
     <div>
      <DropDownMenu 
        onChange={this.menuChange} 
        style={menuStyle} 
        value={this.state.value}
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
      dropDownData:state.initialData.homeData

    };
}

//method to dispatch actions to the reducers
function mapDispatchToProps(dispatch) {
  //const actionMap = { loadInitTreeData: bindActionCreators(fetchTreeData, dispatch) };
  //return actionMap;
return bindActionCreators(actionCreators, dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(DropDownAppList);
