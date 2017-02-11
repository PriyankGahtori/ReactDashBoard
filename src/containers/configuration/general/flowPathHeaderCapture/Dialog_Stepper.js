// Importing react Components
import React from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { bindActionCreators } from 'redux';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';


//Importing files
import * as actionCreators  from '../../../../actions/index';
import MethodBasedCapturingAdd from './customDataCapture/MethodBasedCapturingAdd';
import HttpReqBasedCapturingAdd from './customDataCapture/HttpReqBasedCapturingAdd';
import HttpRespBasedCapturingAdd from './customDataCapture/HttpRespBasedCapturingAdd';
import AddComp from './customDataCapture/AddComponent';



const styles = {
 title: { 
     fontSize: '16px',
     padding:'8px',

  },
   dialog:{
    top:'-80px',
  
   
  }
}

var data = [{"id":0,'componentName':'MethodBasedCapturingAdd'},
            {"id":1,'componentName':'HttpReqBasedCapturingAdd'},
            {"id":2,'componentName':'Http Response Header Capturing'}

]

const contentStyle = {};

class Dialog_Stepper extends React.Component {
 
  constructor(props) {
  super(props);
  this.handleCancel = this.handleCancel.bind(this);
  this.handleSubmit =this.handleSubmit.bind(this),
  this.submitForm =this.submitForm.bind(this);
  this.handleNext = this.handleNext.bind(this);
  this.finalData = this.finalData.bind(this);
  this.state = {stepIndex:0,
                finished: this.props.customCapture.stepperData.length == 1,
                respData :{},
                methodBasedCaptureState:false,
                httpReqBasedCaptureState:false,
                httpRespBasedCaptureState:false,
                count:0
               
    }
    console.log("this.state---",this.state)
  }

  componentWillReceiveProps(nextProps)
 {
   console.log("nextProps---",this.state)
 }
 
 

   handleNext(){
     console.log("this.state.stepIndex--",this.state.stepIndex)
     console.log("this.props---",this.props.customCapture.stepperData)
     var data = this.props.customCapture.stepperData;
     console.log("this.state.count+1 == data.length---",this.state.count+1 == data.length)
     let idList = data.map(val => val.id);
     let index = this.state.stepIndex ;
     if(this.state.count == data.length){
        console.log("last compoinet---")
        console.log("finished method called---",this.props.customCapture.methodBasedCapturingAdd)
        console.log("finished method called------",this.props.customCapture.httpReqCapturingBasedAdd)
        /*if(index == 0){
            this.setState({methodBasedCaptureState:true,
                           httpBasedCaptureState :false,
                           httpRespBasedCaptureState:false
            })
          
        }else if(index == 1){
             this.setState({methodBasedCaptureState:false,
                        httpRespBasedCaptureState:false,
                        httpBasedCaptureState :true,
            })
        }
        else if(index == 2){
             this.setState({methodBasedCaptureState:false,
                        httpRespBasedCaptureState:true,
                        httpBasedCaptureState :false,
            })

        }

        */

        if(idList.indexOf(0)!= -1){
            console.log("metgod baseda add rewuest to server ytriggered")
            console.log("saved data---") 
            var data = this.props.customCapture.methodBasedCapturingAdd ;
            this.props.addMethodBasedCapturingDataToServer(data,this.props.profileId);
        }
        this.handleCancel();

     }
     else if(index == 0){
       console.log("index 0 condition")
        this.setState({methodBasedCaptureState:true,
                        httpBasedCaptureState :false,
                         httpRespBasedCaptureState:false,
                        stepIndex:this.state.count+1 != data.length ? data[this.state.count+1].id:-1,
                        //stepIndex:this.state.count >= data.length ? data[this.state.count+1].id:-1,
                        count:this.state.count+1,
                       // finished:  data[this.state.count+1].id == Math.max.apply(Math, idList)
                        finished:  this.state.count+1 == data.length 
        })
      }
      console.log("this.state---",this.state.count)
      console.log("this.state--",this.state.stepIndex)

      if(index == 1){
          console.log("index 1 condition")
          this.setState({methodBasedCaptureState:false,
                        httpRespBasedCaptureState:false,
                        httpBasedCaptureState :true,
                       stepIndex:this.state.count+1 != data.length ? data[this.state.count+1].id:-1,
                      // stepIndex:this.state.count >= data.length ? data[this.state.count+1].id:-1,
                        count:this.state.count+1,
                       // finished:  data[this.state.count+1].id == Math.max.apply(Math, idList)
                        finished:  this.state.count+1 == data.length 
        })
      }

       if(index == 2){
          console.log("index 1 condition")
          this.setState({methodBasedCaptureState:false,
                        httpRespBasedCaptureState:true,
                        httpBasedCaptureState :false,
                         stepIndex:this.state.count+1 != data.length ? data[this.state.count+1].id:-1,
                       //stepIndex:this.state.count >= data.length ? data[this.state.count+1].id:-1,
                        count:this.state.count+1,
                       // finished:  data[this.state.count+1].id == Math.max.apply(Math, idList)
                        finished:  this.state.count+1 == data.length 
        })
      }
     
  /*    if(data[index].componentName == 'Method Based Capturing'){
        this.setState({methodBasedCaptureState:true,
                       httpBasedCaptureState :false,
                       stepIndex: index + 1,
                      finished: index >= 2,
        })
      }
      else if(data[this.state.stepIndex].componentName = 'Http Request Based Capturing'){
        this.setState({httpBasedCaptureState:true,
                       methodBasedCaptureState:false,
                       stepIndex: index + 1,
                        finished: index >= 2,
        })
      }
      */
      
//      this.refs.MethodBasedCapturingAdd.submit();
       
  }

  handlePrev(){

    //handle case of active and inactive in back case
     var data = this.props.customCapture.stepperData;
    if (this.state.stepIndex > 0) {
      this.setState({ stepIndex: data[this.state.count-1].id,
                       count:this.state.count-1,
                       finished:false
                      
                    });
    }
  };


  
  handleSubmit(){
     console.log("methodbaseddata---",this.props.customCapture.methodBasedCapturingAdd) 
  }

  submitForm(data){
      console.log("data----",data)
      this.props.listOfCapturingMethodsToConfigure(data)
  }
  handleCancel(){
    this.props.toggleDialogStepper();
  }

  methodBasedCompData(data){
    console.log("methodBasedCompData method called--",data)

  }


/* here data = items selected from multiselect component i.e. capturing techniques
if selected by user or not ,it always {} */

  renderComp(data)
  {
    console.log("componentName--in Dialog_Stepper-----",data)
    console.log("ff==",componentName == 'Method Based Capturing')
    let componentName ='';
    if(Object.keys(data).length != 0){
      componentName = data.value ;
    }
    console.log("componentName--",componentName)
    console.log("componentName == 'methodBasedCapturing'---",componentName == 'methodBasedCapturing')
      return(
        <div>
         <div className = {componentName == 'methodBasedCapturing' ?'show':'hidden'}>
            <MethodBasedCapturingAdd  data = {this.finalData.bind(this)} active={this.state.methodBasedCaptureState}/>
            </div>

          <div className = {componentName == 'httpReqBasedCapturing'?'show':'hidden'}>
             <HttpReqBasedCapturingAdd  data = {this.finalData.bind(this)} active={this.state.httpBasedCaptureState}/>
           </div>

            <div className = {componentName == 'httpRespBasedCapturing'?'show':'hidden'}>
              <HttpRespBasedCapturingAdd data = {this.finalData.bind(this)} active={this.state.httpRespBasedCaptureState}/>
            </div>
                
        </div>
        
      );

  }

  renderStepContent(stepIndex){
      console.log("stepIndex---",stepIndex)
      console.log("this.props.customCapture.stepperData--",this.props.customCapture.stepperData)
        let data = {};
        this.props.customCapture.stepperData.map(function(val){
                      if(val.id == stepIndex){
                        data = val;
                      }
        });
        console.log("data---",data)
          switch (stepIndex) {
          case 0:
            return (
               <div>
               {this.renderComp(data)}
          {/* <MethodBasedCapturingAdd  data = {this.finalData.bind(this)} active={this.state.methodBasedCaptureState}/> */}
                </div>
            )
          case 1:
            return( 
                <div>
                 {this.renderComp(data)}
                {/* <HttpReqBasedCapturingAdd  data = {this.finalData.bind(this)} active={this.state.httpReqBasedCaptureState}/>*/}
                </div>
                )
          case 2:
            return ( 
                <div>
                  {this.renderComp(data)}
              {/* <HttpRespBasedCapturingAdd data = {this.finalData.bind(this)} active={this.state.httpRespBasedCaptureState}/>*/}
                </div>
                )
          default:
            return ( 
                <div>
                  {this.renderComp(data)}
                </div>
                )
        }
     
  }

   finalData(){
     console.log("methodbaseddata---",this.props.customCapture.methodBasedCapturingAdd) 


  }


  renderStepper(){
      console.log("renderSteepper method called--")
       let idList;
       let selectedList = this.props.customCapture.stepperData.length != 0
       
      if(selectedList){
         idList = this.props.customCapture.stepperData.map(val => val.id);
    }

    return(
     <Stepper activeStep={this.state.stepIndex}>

          <Step disabled = {selectedList ? !(idList.indexOf(0) != -1):false} >
            <StepLabel>Method Based Capturing</StepLabel>
          </Step>

          <Step disabled = {selectedList ? !(idList.indexOf(1) != -1):false}>
            <StepLabel>Http Request Based Capturing</StepLabel>
          </Step>

           <Step disabled = {selectedList ? !(idList.indexOf(2) != -1):false}>
            <StepLabel>Http Response Based  Capturing</StepLabel>
          </Step>

        {/*  <Step disabled = {selectedList ? !(idList.indexOf(3) != -1):false}>
            <StepLabel>Session Attr Monitor</StepLabel>
            </Step> */}

        </Stepper>
    );
  }

 
  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleCancel} />,
      <FlatButton
        label="Done"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleSubmit} />
    ];
    return (
      <div>
      <Dialog
          title ="Configure Custom Data"
          actions={actions}
          modal={false}
          open={this.props.customCapture.openStepperDialog}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
          refs="insidedialog"
         titleStyle={styles.title}
          style = {styles.dialog}
        >
        <div className = "row col-md-8">
          {this.renderStepper()}
        </div>

        
        <div style={contentStyle}>
            <div>
              <div className = "row col-md-10">
              {this.renderStepContent(this.state.stepIndex)}
              </div>
              <div className="row col-md-10 " style={{marginTop: 12}}>
                <FlatButton
                  label="Back"
                  disabled={this.state.stepIndex === 0}
                  onTouchTap={this.handlePrev.bind(this)}
                  style={{marginRight: 12}}
                />
                <RaisedButton
                  label={this.state.count == this.props.customCapture.stepperData.length ? 'Finish' : 'Next'}
                  primary={true}
                  onTouchTap={this.handleNext.bind(this)}
                />
               </div>
            </div>
        </div>
     
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
export default connect(mapStateToProps,mapDispatchToProps)(Dialog_Stepper);