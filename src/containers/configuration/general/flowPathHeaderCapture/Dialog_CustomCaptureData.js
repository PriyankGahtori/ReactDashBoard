// Importing react Components
import React from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { bindActionCreators } from 'redux';

//Importing files
import * as actionCreators  from '../../../../actions/index';
import FormCustomCaptureData from './Form_CustomCapturingData';
import MethodBasedCapturingAdd from './customDataCapture/MethodBasedCapturingAdd';
import HttpReqBasedCapturingAdd from './customDataCapture/HttpReqBasedCapturingAdd';
import HttpRespBasedCapturingAdd from './customDataCapture/HttpRespBasedCapturingAdd';


const styles = {
 title: { 
     fontSize: '16px',
     padding:'8px',

  },
   dialog:{
    top:'-70px',
   
  }
}

class Dialog_CustomCaptureData extends React.Component {
 
  constructor(props) {
  super(props);
  this.state = {applicationdata:this.props.applicationdata}
  this.handleCancel = this.handleCancel.bind(this);
  this.handleSubmit =this.handleSubmit.bind(this);
  this.submitForm =this.submitForm.bind(this);
   this.state = {
                respData :{},
                methodBasedCaptureState:false,
                httpBasedCaptureState:false,
                httpRespBasedCaptureState:false,
                count:0,
                showOptions:'show'
               
    }
 }

  componentWillReceiveProps(nextProps)
  {
    console.log("nextProps method called---",nextProps)
    console.log("nextProps---",this.state.selectedVal)
    if(this.props.customCapture.openDialog != nextProps.customCapture.openDialog){
      if(nextProps.customCapture.openDialog){
      this.setState({'selectedVal':'',
                      showOptions:'show',
                      methodBasedCaptureState:false,
                      httpBasedCaptureState:false
      })
      }
    }
    
    
  }


  handleCancel(){
    console.log("handleCancel method called")
    this.props.toggleAddCustomCapture();
  }
  
  handleSubmit(){
   console.log("handleSubmit method called")
   this.refs.customCaptureMethodsList.submit();
  }

  submitForm(data){
      console.log("data----",data)
      if(!(this.state.selectedVal == 'enableAddMethodBasedData'|| this.state.selectedVal == 'enableAddHttpReqHdr'||this.state.selectedVal == 'enableAddHttpResHdr')){
        let  compName = data[Object.keys(data)[0]];
        this.setState({'selectedVal':compName,
                        showOptions:'hidden',
                        methodBasedCaptureState:false,
                        httpBasedCaptureState:false
        })
      }
      else{
        console.log("this.state.selectedVal---",this.state.selectedVal)
        console.log("this.state.selectedVal == 'enableAddHttpReqHdr'---",this.state.selectedVal == 'enableAddHttpReqHdr')
        if(this.state.selectedVal == 'enableAddMethodBasedData'){
           this.setState({methodBasedCaptureState:true,
                          httpBasedCaptureState:false
            })
       }
       if(this.state.selectedVal == 'enableAddHttpReqHdr'){
         console.log("this.state.selectedVal---enableAddHttpReqHdr---",this.state.selectedVal)
           this.setState({methodBasedCaptureState:false,
                          httpBasedCaptureState:true
            })
       }

     //  this.props.listOfCapturingMethodsToConfigure(data);
//     this.handleCancel();

  }
  }
  finalData(){
     console.log("methodbaseddata---",this.props.customCapture.methodBasedCapturingAdd) 

  }


  renderComp(componentName){
    console.log("componentName--",componentName)
    console.log("this.state.methodBasedCaptureState--",this.state.methodBasedCaptureState)
    console.log("this.state.httpBasedCaptureState---",this.state.httpBasedCaptureState)
    console.log("componentName == 'enableAddMethodBasedData'---",componentName == 'enableAddMethodBasedData')
      return(
        <div>
         <div className = {componentName == 'enableAddMethodBasedData' ?'show':'hidden'}>
            <MethodBasedCapturingAdd  profileId ={this.props.profileId} data = {this.finalData.bind(this)} active={this.state.methodBasedCaptureState}/>
            </div>

          <div className = {componentName == 'enableAddHttpReqHdr'?'show':'hidden'}>
             <HttpReqBasedCapturingAdd  data = {this.finalData.bind(this)} active={this.state.httpBasedCaptureState}/>
           </div>

            <div className = {componentName == 'enableAddHttpResHdr'?'show':'hidden'}>
              <HttpRespBasedCapturingAdd data = {this.finalData.bind(this)} active={this.state.httpRespBasedCaptureState}/>
            </div>
                
        </div>
        
      );


  }
  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleCancel} />,
      <FlatButton
      //  label="Next"
        label= {this.state.selectedVal == 'enableAddMethodBasedData'|| this.state.selectedVal == 'enableAddHttpReqHdr'||this.state.selectedVal == 'enableAddHttpResHdr'?'Submit':'Next'}
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleSubmit.bind(this)} />
    ];
    return (
      <div>
      <Dialog
          title ="Select Capturing Types to Configure"
          actions={actions}
          modal={false}
          open={this.props.customCapture.openDialog}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
          refs="insidedialog"
         titleStyle={styles.title}
          style = {styles.dialog}
        >

         { /* As new updated form when passed to server or store must contain its primary key field 
           * i.e ._links to update the same row .So inserting property _links to data .
           * when condition this.state.applicationdata.openAppDialogType == "edit" satisfies
           */
        }
        <div className = {this.state.showOptions}>
       <FormCustomCaptureData ref="customCaptureMethodsList" onSubmit={this.submitForm.bind(this)}/>
       </div>

       {this.renderComp(this.state.selectedVal)}
       
     
      </Dialog>
      </div>
    );
  }
}

function mapStateToProps(state) {
    console.log("state.customCaptureData---",state.customCapture)
  return {
   applicationdata :state.applicationdata,
   customCapture :state.customCapture
   
   };
}

//method to dispatch actions to the reducers
function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(Dialog_CustomCaptureData);