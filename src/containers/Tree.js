import React, { Component } from 'react';
import {Treebeard} from 'react-treebeard';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import treeStyle from '../styles/treeStyle';
import {hashHistory } from 'react-router';
import * as actionCreators  from '../actions/index';






 class Tree extends Component {
	constructor(props){
		super(props);
		this.state = {treedata:this.props.treedata};
        this.onToggle = this.onToggle.bind(this);
        console.log("in tree --",this.props.treedata)

	}


    componentWillReceiveProps(nextProps)
{
    if(this.props.treedata != nextProps.treedata)
        this.setState({treedata:nextProps.treedata});
      console.log("in tree.js treedata active topo--",this.state.treedata)
}

	onToggle(node, toggled){
     console.log("on toggled---",node)     
     
     hashHistory.push(`/topology/${node.id}`)
     this.props.fetchTopologyTreeData(node)
     console.log("action triggered for tree")
     
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