import React from 'react';
import { connect } from 'react-redux';
import DialogGenerateFile from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { bindActionCreators } from 'redux';
import * as actionCreators  from '../actions/index';
import FormGenerateFile from './Form_GenerateFile';



class Dialog_ServiceEntryPts extends React.Component {
 
  constructor(props) {
  super(props);
  console.log("this.props-----ppppppppppppppppp",this.props)
  console.log("onsubmit props", this.props.onSubmit)
  this.handleCancel = this.handleCancel.bind(this);
  this.handleSubmit=this.handleSubmit.bind(this);
  this.state ={ServiceEntryPoints:this.props.ServiceEntryPoints};
  this.submitForm =this.submitForm.bind(this);
  }

  componentWillReceiveProps(nextProps)
  {
    if(this.props.ServiceEntryPoints != nextProps.ServiceEntryPoints)
      this.setState({ServiceEntryPoints:nextProps.ServiceEntryPoints});
  }

  handleCancel(){
     this.props.toggleGenerateFileDialog();
  }
  
  handleSubmit(){
  this.refs.generateFile.submit();
  this.handleCancel();
  console.log("aftr closing the dialog----")
  }
 


/*
*
*/

 

  submitForm(data){

    console.log("data---serviceEtryForm-",JSON.stringify(data))
                               
     console.log("on submit---in else or add condition--",this.state.ServiceEntryPoints.listOfEntryType)
    
    /*
    * adding property entryType to data object
    */

     this.getEntryTypeOfSelectedEntryTypeId(data)
    /* console.log("entryTypeOfSelectedEntryTypeId----",entryTypeOfSelectedEntryTypeId)
     data["entryType"] = entryTypeOfSelectedEntryTypeId;*/
     console.log("data--adding entryType--",data)

   /*
    * adding property description to data object from Service entry Point data 
   */

   this.getDescOfSelectedEntryPoint(data)
   console.log("data ------",data)
   this.props.addServiceEntryPoint(data,this.props.profileId)
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
      <DialogGenerateFile
          title="Create NDServiceEntryPointsFile"
          actions={actions}
          modal={false}
          open={this.state.ServiceEntryPoints.openGenerateFileDialog}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
          refs="insidedialog"
        >
         
      <FormGenerateFile ref="generateFile" onSubmit={this.submitForm.bind(this)}/>
      </DialogGenerateFile>
      </div>
    );
  }
} 

function mapStateToProps(state) {
  console.log("openNewDCDialog---",state.ServiceEntryPoints)
  return {
   ServiceEntryPoints :state.ServiceEntryPoints,
   ListOfServiceEntryPointType : state.ServiceEntryPoints.listOfEntryType
   };
}

//method to dispatch actions to the reducers
function mapDispatchToProps(dispatch) {
  //const actionMap = { loadInitTreeData: bindActionCreators(fetchTreeData, dispatch) };
  //return actionMap;
return bindActionCreators(actionCreators, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Dialog_ServiceEntryPts);