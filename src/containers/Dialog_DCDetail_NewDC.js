import React from 'react';
import { connect } from 'react-redux';
import AddNewButton from 'material-ui/FloatingActionButton';
import AddIcon from 'material-ui/svg-icons/content/add';
import DialogNewDC from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import FormNewDC from './Form_DCDetail_NewDC.js';
import { bindActionCreators } from 'redux';
import * as actionCreators  from '../actions/index';



class Dialog_DCDetail_NewDC extends React.Component {
 
  constructor(props) {
  super(props);
  console.log("loading......", this.props)
  this.state = {openNewDCDialog:this.props.openNewDCDialog};
  this.handleCancel = this.handleCancel.bind(this);
  this.handleSubmit=this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps)
  {
    if(this.props.openNewDCDialog != nextProps.openNewDCDialog)
      this.setState({openNewDCDialog:nextProps.openNewDCDialog});
  }

  handleCancel(){
     this.props.toggleStateDialogNewDC();
  }
  
  handleSubmit(){
   this.refs.newDCForm.submit();
   console.log(this.refs.newDCForm.submit())
 // this.props.toggleStateDialogNewDC();
  }

  render() {
  	const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleCancel}
      />,
      <FlatButton
        label="Clear Values"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleSubmit}
      />
    ];
    return (
      <div>
      <DialogNewDC
          title="New Data Center Configuration"
          actions={actions}
          modal={false}
          open={this.state.openNewDCDialog}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
          refs="insidedialog"
        >
          <FormNewDC ref="newDCForm" onSubmit={data =>{alert(JSON.stringify(data))}}/>
      </DialogNewDC>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log("dialogNewDC---",state.dcDetail.dialogNewDC)
  return {
   openNewDCDialog :state.dcDetail.dialogNewDC
   };
}

//method to dispatch actions to the reducers
function mapDispatchToProps(dispatch) {
  //const actionMap = { loadInitTreeData: bindActionCreators(fetchTreeData, dispatch) };
  //return actionMap;
return bindActionCreators(actionCreators, dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(Dialog_DCDetail_NewDC);