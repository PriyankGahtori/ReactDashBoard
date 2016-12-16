//Importing React components
import React from 'react';
import { connect } from 'react-redux';
import DialogNewDC from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { bindActionCreators } from 'redux';

//Importing files
import * as actionCreators  from '../../actions/index';
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
  }

  handleCancel(){
     this.props.toggleStateDialogNewProfile();
  }
   
   handleSubmit(){
     this.refs.newProfileForm.submit();
    
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
                if(this.state.profileDetailData.openProfileDialogType == "edit"){
                    data['id'] = this.state.profileDetailData.profileInitializeForm.id;
                    this.props.addRowProfileTable(data,this.state.profileDetailData.openProfileDialogType);
                    this.handleCancel();
              }
                else
                {
                    this.props.addRowProfileTable(data,this.state.profileDetailData.openProfileDialogType);
                    this.handleCancel();
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