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
import SessionAttrBasedCapturingAdd from '../../instrumentation/monitor/Form_SessionAttrAdd';


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
                sessionAttrBasedCaptureState:false,
                count:0,
                errMsg:'hidden',
                showOptions:'show',
                setTitle:'Select Types to configure',
               
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
                      httpBasedCaptureState:false,
                      sessionAttrBasedCaptureState:false,
                      setTitle:'Select Types To Configure'
      })
      }
    }
  }


  handleCancel(){
    this.setState({errMsg:'hidden'})
    this.props.toggleAddCustomCapture();
  }
  
  handleSubmit(){

   if(this.state.selectedVal == 'enableAddSessionAttrBasedData'){
      this.refs.newSessionAttrMonitorForm.submit();
   }
   else if(this.state.selectedVal == 'enableAddHttpReqHdr'){
      this.refs.newHttpReqHdrForm.submit();
   }
   else{
      this.refs.customCaptureMethodsList.submit();
   }
    
  }

  submitForm(data){
    if(data.capturingMethod == null)
    {
      this.setState({errMsg:'show'})
    }
    else  if(!(this.state.selectedVal == 'enableAddMethodBasedData'|| this.state.selectedVal == 'enableAddHttpReqHdr'||this.state.selectedVal == 'enableAddSessionAttrBasedData')){
        this.setState({errMsg:'hidden'})
        let  compName = data[Object.keys(data)[0]];
        let title = '';
        
        if(compName == 'enableAddMethodBasedData')
            title = "Capture Method Based Custom Data";

        else if(compName == 'enableAddHttpReqHdr')
        {
          this.setState({errMsg:'hidden'})
          title = "Capture HTTP Request Custom Data";
        }

        else if(compName == 'enableAddSessionAttrBasedData')
        {
          this.setState({errMsg:'hidden'})
          title = "Capture Session Attribute Custom Data";
        }

        this.setState({'selectedVal':compName,
                        showOptions:'hidden',
                        methodBasedCaptureState:false,
                        httpBasedCaptureState:false,
                        sessionAttrBasedCaptureState:false,
                        setTitle:title
        })
      }
      else{
        this.setState({errMsg:'hidden'})
        console.log("this.state.selectedVal---",this.state.selectedVal)
        console.log("this.state.selectedVal == 'enableAddHttpReqHdr'---",this.state.selectedVal == 'enableAddSessionAttrBasedData')
        if(this.state.selectedVal == 'enableAddMethodBasedData'){
           this.setState({methodBasedCaptureState:true,
                          httpBasedCaptureState:false,
                          sessionAttrBasedCaptureState:false
            })
       }
       else if(this.state.selectedVal == 'enableAddHttpReqHdr'){
         console.log("this.state.selectedVal---enableAddHttpReqHdr---",this.state.selectedVal)
           this.setState({methodBasedCaptureState:false,
                          httpBasedCaptureState:true,
                          sessionAttrBasedCaptureState:false
            })
       }
       else if(this.state.selectedVal == 'enableAddSessionAttrBasedData'){
         this.setState({ sessionAttrBasedCaptureState:true,
                         methodBasedCaptureState:false,
                         httpBasedCaptureState:false

         })
       }

  }
  }
  finalData(){
     console.log("methodbaseddata---",this.props.customCapture.methodBasedCapturingAdd) 
  }

  submitSpecificSessionAttr(data){
     if(data.complete && data.specific){
        data["attrMode"]=3
        data["attrType"] ='complete,specific'
     }
    else if(data.complete == true){
        data["attrMode"]=2
        data["attrType"] ='complete'
    }
    else{
        data["attrMode"]=1
        data["attrType"] ='specific'
    }
   this.props.addSpecificAttrMon(data,this.props.profileId);
   this.props.toggleAddCustomCapture();

  }

//function used for submitting data to server of http Request Header
submitHttpReqHdr(data){
  console.log("data--submitHttpReqHdrmethpod called---",data)
  if(data.complete && data.specific){
        data["dumpMode"]=3
     }
    else if(data.complete == true){
        data["dumpMode"]=2
    }
    else{
        data["dumpMode"]=1
    }

    /*Since Add Component is commonly used in Session Attr and HttpReqHdr so
    * attrValues in session Attr 
    * == rules here .For Naming convention attrVales is made to stored in rules
    */

    data.rules = [];

    if(data.specific && data.attrValues == null){
      var defaultVal = {'valName':data.headerName,
                        'type':0,
                        'lb':'NA',
                        'rb':'NA'
    }
      data.rules.push(defaultVal)
    }else{
      data.rules = data.attrValues
    }
    this.props.addHttpReqHdr(data,this.props.profileId);
    this.props.toggleAddCustomCapture();
}

  renderComp(componentName){
      return(
        <div>
           <div className = {componentName == 'enableAddMethodBasedData' ?'show':'hidden'}>
            <MethodBasedCapturingAdd  profileId ={this.props.profileId} data = {this.finalData.bind(this)} active={this.state.methodBasedCaptureState}/>
            </div>

            
            <div className = {componentName == 'enableAddSessionAttrBasedData'?'show':'hidden'}>
              <SessionAttrBasedCapturingAdd ref="newSessionAttrMonitorForm"  onSubmit={this.submitSpecificSessionAttr.bind(this)} data = {this.finalData.bind(this)} />
            </div>

          <div className = {componentName == 'enableAddHttpReqHdr'?'show':'hidden'}>
             <HttpReqBasedCapturingAdd  ref="newHttpReqHdrForm"  onSubmit = {this.submitHttpReqHdr.bind(this)} data = {this.finalData.bind(this)} active={this.state.httpBasedCaptureState}/>
           </div>



             <div className = {componentName == 'enableAddHttpResHdr'?'show':'hidden'}>
              <HttpRespBasedCapturingAdd data = {this.finalData.bind(this)} active={this.state.httpRespBasedCaptureState}/>
            </div>

                
        </div>
      ) 
      
  }
  render() {
    const actions = [
      <FlatButton className="dialog-modal cancel"
        label="Cancel"
        primary={true}
        onTouchTap={this.handleCancel} />,
      <FlatButton
      //  label="Next"
        label= {this.state.selectedVal == 'enableAddMethodBasedData'|| this.state.selectedVal == 'enableAddSessionAttrBasedData'||this.state.selectedVal == 'enableAddHttpReqHdr'?'Save':'Next'}
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleSubmit.bind(this)} />
    ];
    return (
      <div>
      <Dialog  className="dialog-modal"
          title = {this.state.setTitle}
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
       
     <p style={{color:'red'}} className={this.state.errMsg}>No type is selected. </p>
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