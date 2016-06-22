import React, { Component } from 'react';
import {Treebeard} from 'react-treebeard';
import { connect } from 'react-redux';
import  {fetchTreeData} from '../actions/index';
import { bindActionCreators } from 'redux';



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
}

	onToggle(node, toggled){
        if(this.state.cursor){this.state.cursor.active = false;}
        node.active = true;
        if(node.children){ node.toggled = toggled; }
        this.setState({ cursor: node });
    }

	render() {
		return (
			<Treebeard
                data={this.state.treedata}
                onToggle={this.onToggle}
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
  const actionMap = { loadInitTreeData: bindActionCreators(fetchTreeData, dispatch) };
  return actionMap;
}
export default connect(mapStateToProps,mapDispatchToProps)(Tree);