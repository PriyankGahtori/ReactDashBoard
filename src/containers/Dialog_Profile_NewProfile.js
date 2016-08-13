import React from 'react';
import { connect } from 'react-redux';
import DialogNewDC from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { bindActionCreators } from 'redux';
import * as actionCreators  from '../actions/index';
import FormProfile from './Form_Profile_NewProfile'

class Dialog_Profile_NewProfile extends React.Component {

  constructor(props) {
  super(props);
  this.handleCancel = this.handleCancel.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
  this.state ={profileDetailData:this.props.profileDetailData};
  }

  componentWillReceiveProps(nextProps)
  {
    if(this.props.profileDetailData != nextProps.profileDetailData)
      this.setState({profileDetailData:nextProps.profileDetailData});
      console.log(" in componentWillReceiveProps------in DialogProfile---------->",nextProps.profileDetailData)
  }

  handleCancel(){
     this.props.toggleStateDialogNewProfile();
  }
   
   handleSubmit(){
    console.log(" in handleSubmit profile form---b4 submit---------------->")
     this.refs.newProfileForm.submit();
     console.log(" in handleSubmit profile form---after submit---------------->")
    this.handleCancel();
    console.log("aftr closing the dialog--in profile--------------->")
  }
 
  render() {
    const { onSubmit } = this.props
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleCancel} />,
     
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true} 
        onClick={this.handleSubmit}/>
    ];
    return (
      <div>
      <DialogNewDC
          title="New Profile Configuration"
          actions={actions}
          modal={false}
          open={this.state.profileDetailData.openNewProfileDialog}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true} >
          <FormProfile ref="newProfileForm"  onSubmit={data =>{ 
                console.log(" in submit function------------------>",data)
                if(this.state.profileDetailData.openProfileDialogType == "edit"){
                  
                data['id'] = this.state.profileDetailData.profileInitializeForm.id;
                console.log("data----",data)
                this.props.addRowProfileTable(data,this.state.profileDetailData.openProfileDialogType);
               
              }
                else
                  {
                    console.log(" add button clicked------------------------->")
                    this.props.addRowProfileTable(data,this.state.profileDetailData.openProfileDialogType);
                    console.log(" in add buttton   addRowProfileTable called------------->",data)
                  } 

                  }}
               /> 
          </DialogNewDC>
      </div>
    );
  }
} 

function mapStateToProps(state) {
  console.log(" in  profileDetailData ---------------------------->",state.profileDetailData)
  return {
   profileDetailData :state.profileDetailData
   };
}

//method to dispatch actions to the reducers
function mapDispatchToProps(dispatch) { 
 
return bindActionCreators(actionCreators, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Dialog_Profile_NewProfile);