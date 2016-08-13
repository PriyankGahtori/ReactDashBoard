import React from 'react';
import { connect } from 'react-redux';
import DialogNewTopo from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import FormNewTopo from './Form_Topo_NewTopo';
import { bindActionCreators } from 'redux';
import * as actionCreators  from '../actions/index';



class Dialog_Topo_NewTopo extends React.Component {
  constructor(props) {
  super(props);
  console.log("inside DialogNewTopo class")
  this.handleCancel = this.handleCancel.bind(this);
  this.handleSubmit=this.handleSubmit.bind(this);
  this.state ={topologyData:this.props.topologyData};
  }

  componentWillReceiveProps(nextProps)
  {
    if(this.props.topologyData != nextProps.topologyData)
      this.setState({topologyData:nextProps.topologyData});
  }

  handleCancel(){
     this.props.toggleStateDialogNewTopo();
  }
  
  handleSubmit(){
  this.refs.newTopoForm.submit();
  this.handleCancel();
  console.log("after closing the dialog----")
  }
 
  render() {
    const { onSubmit } = this.props
  	const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleCancel}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleSubmit}
      />
    ];

    return (
      <div>
      <DialogNewTopo
          title="Select Topology"
          actions={actions}
          modal={false}
          open={this.state.topologyData.openNewTopoDialog}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={false}
          refs="insidedialog"
        >
         { /* As new updated form when passed to server or store must contain its primary key field 
           * i.e ._links to update the same row .So inserting property _links to data .
           * when condition this.state.applicationdata.openAppDialogType == "edit" satisfies
           */
        }
        
      <FormNewTopo ref="newTopoForm" onSubmit={data =>{
                console.log("this.state.topologyData.openTopoDialogType - ",this.state.topologyData.openTopoDialogType)
                               if(this.state.topologyData.openTopoDialogType == "edit"){

                                data["_links"] = this.state.topologyData.topoDetailInitializeForm._links;
                                console.log("data-aftr adding---",data)
                                console.log("openTopoDialogType----",this.state.topologyData.openTopoDialogType)
                                this.props.addRowTopoTable(data,this.state.topologyData.openTopoDialogType,this.state.topoDetail.dcId)
                              }
                              else{
                                console.log("on submit---in else or add condition--",this.state.openTopoDialogType)
                                this.props.fetchTreeData(this.state.topologyData.appId)
                                this.props.addRowTopoTable(data,this.state.topologyData.openTopoDialogType,this.state.topoDetail.dcId)
                                console.log("in dialog aftr adding n updating tree")

                              }

      }}/>
      </DialogNewTopo>
      </div>
    );
  }
} 

function mapStateToProps(state) {
  console.log("openNewTopoDialog--22222221111-",state.topologyData.openNewTopoDialog)
  console.log("DialogNewTopo---11111111122222",state.topologyData.topoInitializeForm)
  console.log("inside DialogNewTopo")
  return {
   topologyData :state.topologyData
   };
}

//method to dispatch actions to the reducers
function mapDispatchToProps(dispatch) {
  //const actionMap = { loadInitTreeData: bindActionCreators(fetchTreeData, dispatch) };
  //return actionMap;
return bindActionCreators(actionCreators, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Dialog_Topo_NewTopo);