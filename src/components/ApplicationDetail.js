import React from 'react'
import AddNewButton from 'material-ui/FloatingActionButton';
import AddIcon from 'material-ui/svg-icons/content/add';
import DialogNewApplication from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

const NewButtonstyle = {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 30,
    left: 'auto',
    position: 'fixed',

};

class ApplicationDetail extends React.Component {

  constructor(props) {
    super(props);

    this.state ={openNewAppDialog:false}
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleOpen(){
    this.setState({openNewAppDialog: true});
  }

  handleClose(){
    this.setState({openNewAppDialog: false});
  }

  render () {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
      />,
    ];

      return(
        <div>


        <DialogNewApplication
          title="Dialog With Actions"
          actions={actions}
          modal={false}
          open={this.state.openNewAppDialog}
          onRequestClose={this.handleClose}
        >
          The actions in this window were passed in as an array of React objects.
        </DialogNewApplication>

         <AddNewButton style={NewButtonstyle} onTouchTap={this.handleOpen}>
            <AddIcon />
         </AddNewButton>
        </div>
      );
  }
}

export default ApplicationDetail;
