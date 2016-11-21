//Importing React components
import React, { Component } from 'react';
import {Treebeard, decorators} from 'react-treebeard';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {hashHistory } from 'react-router';

//Importing files
import treeStyle from '../../styles/treeStyle';
import * as actionCreators  from '../../actions/index';


//custom icons
decorators.Header = (props) => {
    console.info("icon",props.node.type)
    const style = props.style;
    const iconType = props.node.type;
    const iconClass = `icon icon-nde-${iconType}`;
    const iconStyle = { marginRight: '5px',fontSize:'20px'};
    return (
        <div style={style.base}>
            <div style={style.title}>
                <i className={iconClass} style={iconStyle}/>                
                {props.node.name}
            </div>
        </div>
    );
};


 class Tree extends Component {
	constructor(props){
		super(props);
		this.state = {treedata:this.props.treedata};
    this.onToggle = this.onToggle.bind(this);
	}


    componentWillReceiveProps(nextProps)
  {
    if(this.props.treedata != nextProps.treedata)
        this.setState({treedata:nextProps.treedata});
  }

	   onToggle(node, toggled){
     
      console.log("on toggled---",node.type) 
      console.log(`/${node.type}/${node.id}`)    
      hashHistory.push(`/${node.type}/${node.id}`)

      if(node.type == "dcdetail" ){
        console.log("fetchtopologytreedata--",node)
        this.props.fetchTopologyTreeData(node)
      }

      if (node.type == "topology"){
        console.log("fetch treedata--tier--",node)
        this.props.fetchTierTreeData(node)
      }

       if (node.type == "tier"){
        console.log("fetch treedata server")
        this.props.fetchServerTreeData(node)
      }
       if (node.type == "server"){
        console.log("fetch instance data")
        this.props.fetchInstanceTreeData(node)
      }

    console.log("ontoggled---",this.state.treedata)
        if(this.state.cursor)
          {
            console.log("on toggled---",this.state.cursor.id)
            this.state.cursor.active = false;
          }
        node.active = true;
        if(node.children)
        {
          console.log("if children-",toggled)
          node.toggled = toggled; }
          this.setState({ cursor: node });
        }

	render() {
		return (
     <Treebeard
                data={this.state.treedata}
                onToggle={this.onToggle}
                style={treeStyle}
                decorators={decorators}
            />
			
		);
	}
}
//receiving data from state set by reducers
function mapStateToProps(state) {
  console.log("in tree.js--",state.treeData)
  return {
   treedata : state.treeData
   };
}

//method to dispatch actions to the reducers
function mapDispatchToProps(dispatch) {
  //const actionMap = { loadInitTreeData: bindActionCreators(fetchTreeData, dispatch) };
   return bindActionCreators(actionCreators, dispatch);

}
export default connect(mapStateToProps,mapDispatchToProps)(Tree);