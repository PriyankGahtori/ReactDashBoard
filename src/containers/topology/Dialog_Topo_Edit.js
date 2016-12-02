//Importing react Components
import React from 'react';
import { connect } from 'react-redux';
import DialogEditTopo from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { bindActionCreators } from 'redux';

//Importing files
import FormEditTopo from './Form_Topo_EditTopo';
import * as actionCreators  from '../../actions/index';

const styles = {
  title:{
    fontStyle: '16px',
    padding: '8px'
  }
}

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
     this.props.toggleStateDialogEditTopo();
  }
  
  handleSubmit(){
  this.refs.editTopoForm.submit();
  this.handleCancel();
  console.log("after closing the dialog----")
  }

  submitForm(data){
    //here data conatins {"dctopoId",profileId}
    console.log("data---",data)
    this.props.attachProfToTopology(data,this.state.topologyData.dcId)
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
      <DialogEditTopo
          title="Select Topology"
          actions={actions}
          modal={false}
          open={this.state.topologyData.openEditTopoDialog}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={false}
          refs="insidedialog"
          titleStyle={styles.title}
        >
         { /* As new updated form when passed to server or store must contain its primary key field 
           * i.e ._links to update the same row .So inserting property _links to data .
           * when condition this.state.applicationdata.openAppDialogType == "edit" satisfies
           */
        }
        
      <FormEditTopo ref="editTopoForm" onSubmit={this.submitForm.bind(this)}/>
      </DialogEditTopo>
      </div>
    );
  }
} 

function mapStateToProps(state) {
  console.log("openNewTopoDialog--22222221111-",state.topologyData.openEditTopoDialog)
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