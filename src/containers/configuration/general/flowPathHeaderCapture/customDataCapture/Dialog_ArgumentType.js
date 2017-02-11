// Importing react Components
import React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import AddNewButton from 'material-ui/FloatingActionButton';
import AddIcon from 'material-ui/svg-icons/content/add';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import Snackbar from 'material-ui/Snackbar';
import ConfirmDialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { hashHistory } from 'react-router';

//Importing files
import DataGrid from '../../../../../components/DCDetailTable';
import * as actionCreators from '../../../../../actions/index';
import AddComp from './AddComponent';
import Dialog from 'material-ui/Dialog';

/*
* data --- table column name
* key ---- acting as a primary key
* 
*/

var columns = {
  "key": "id",
  "data": ['Header Name', 'Index','Operation', 'Operation Value', 'id'],
  "field": ['headerName','indexVal', 'operationName', 'operatorName', 'id']
};

const style = {
  //margin: 20,
  textAlign: 'center',
  display: 'inline-block'
};

const NewButtonstyle = {
  margin: 0,
  top: 'auto',
  right: 20,
  bottom: 30,
  left: 'auto',
  position: 'fixed'
};

const toastrCss = {
  wordWrap: 'break-word'
};

const styles = {
  title: {
    fontSize:16,
    padding: 8 
  }
};



class ArgumentTypeComponent extends React.Component {

  constructor(props) {
    super(props);

    this.state = { openNewAppDialog: false } //
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = { open: false, openSnack: false };
    this.loader = this.loader.bind(this);
    this.appLoader = this.appLoader.bind(this);
    this.addData = this.addData.bind(this);
    
    this.state = {addCompCss:'hidden',
                  arr:[],
                  'argTypeAddComp':'hidden',
                  id:-1
      }
   
  }


  handleDelConfirm() {
    this.setState({ open: true
     });
  }



  
  handleClick() {
  }

  
  handleOpen() {
      console.log("handleOpen method called")
      this.setState({argTypeAddComp: 'show'})
   
  }

  //this function is called first when component gets first loaded
  componentWillMount() {
   
  }

  componentWillReceiveProps(nextProps) {
    
  }

  /* function to trigger event for closing loader 
   * called when response for request of generating nd.conf is received
   */
  appLoader() {
    var msg = { 'title': 'Application Data Loaded ', 'msg': '' }
    this.props.triggerLoader(false, msg)
  }

  loader(path) {
    var message = { 'title': 'Nd.conf generated at:', 'msg': <p style={{ wordWrap: 'break-word' }}>{path}</p> }
    this.props.triggerLoader(false, message);
  }

//
  argData(data){
    console.log("data---",data)
    this.state.arr.push(data);
    this.props.argumentTypeData(this.state.arr)

  }

  addData(){
  console.log("addData function called")
  /* if(this.state.headerName == '' || this.state.opValue == '' || this.state.value == '' ){
       this.setState({errMsgCss:'show'})
    }
    */
  if(this.state.headerName == ''||this.state.indexVal  == ''|| this.state.operationName == '' ||this.state.operatorName == ''){
      console.log("val empty")
  }
  else{
//id not use need to remove after proper testing
  this.setState({id:this.state.id +1,
                argTypeAddComp:'hidden'  
  })
  var data = {headerName:this.state.headerName,
              indexVal:this.state.indexVal,
              operationName:this.state.operationName,
              operationId:this.state.operationId,
              opVal:this.state.opVal,
              operatorName:this.state.operatorName,
              id:this.state.id + 1
  }
  console.log("data---",data)
  this.props.addArgumentType(data,this.props.methodBasedCustomData.methodBasedId);
  //this.state.arr.push(data)
  //this.props.data(this.state.arr);
  }
}


/**********add component fields************** */
    onHdrNameChnge(val){
        console.log("onHdrNameChngeval---",val)
        this.setState({headerName:val})
    }

    onOperationChange(operationId,operationName){
        console.log("val---onOperationChange---",operationId)
        console.log("operationName---",operationName)
        this.setState({operationName:operationName,
                        operationId:operationId
          })
    }

    onOperationVal(val,operatorName){
        console.log("operatorName---",operatorName)
        this.setState({opVal:val,
                        operatorName:operatorName
        })
    }

    onIndexChange(value){
      console.log("indexVal chane---",value)
      this.setState({indexVal:value})
    }

        
//for editing the values table
onAfterSaveCell(row, cellName, cellValue){
  console.log("in Dialog_Attr vcalues--",row)
  console.log("cellName--",cellName)
  console.log("cellVAlue--",cellValue)
  var that = this;

console.log("this.state.changedValArr--")
 var arrData = Object.assign([],this.state.changedValArr)
   //var arrData = this.state.changedValArr;
  
  if(arrData != null && arrData.length != 0){
    arrData.map(function(value){
      if(value.specAttrValId == row.specAttrValId){ //handling the case when 1 row is edited multiple times or same row but diff column
        console.log("in if condition")
        value[cellName] = cellValue;
      }
    else{
      console.log("in ekse con")
      arrData.push(row);
      }
    })
  }
  else{
    arrData.push(row);
  }
  console.log("arrData--",arrData)
  this.setState({changedValArr:arrData})
  console.log("this.state--",this.state.changedValArr)
}

onBeforeSaveCell(row, cellName, cellValue){
    console.log("onBeforeSaveCell method called in dialog_AttrValues")
  }


 handleSubmit(){
    this.handleCancel();
    }

    handleCancel(){
        this.props.toggleArgumentTypeDialog({});
    }

  render() {

    const { onSubmit } = this.props
  	const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleCancel.bind(this)}
      />,
      
      <FlatButton
        label="OK"
        primary={true}
        keyboardFocused={true}
        disabled = {this.props.profileDisabled}
        onClick={this.handleSubmit.bind(this)}
      />
    ];
    const cellEditProp = {
    mode: 'click',
    blurToSave: true,
    beforeSaveCell: this.onBeforeSaveCell.bind(this), // a hook for before saving cell
    afterSaveCell: this.onAfterSaveCell.bind(this)  // a hook for after saving cell
};
    
    return (
        <div>
        <Dialog
          title="Argument Type Configure"
          actions={actions}
          modal={false}
          open={this.props.methodBasedCustomData.openArgTypeDialog}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
          refs="insidedialog"
          titleStyle={styles.title}
        >


      <Paper zDepth={2} style={{background:'rgba(0,0,0,0.80)', color:'#FFF'}}>  
          <div className="pull-right">
          <IconButton  tooltip="Add" onTouchTap={this.handleOpen.bind(this)}><FontIcon  color="#FFF"  className="material-icons">playlist_add</FontIcon></IconButton>
        </div>

    
          {/* Rendering table component  ,
          * passing data (received from store) to the table component to be displayed at table 
         */
          }


          <DataGrid data={this.props.methodBasedCustomData.argumentTypeData}
            pagination={false}
            ref="appTable"
            column={columns}
            onClick={this.handleClick}
            />
          
          </Paper>

            <div className = {`row ${this.state.argTypeAddComp}`}>
              <AddComp data = {this.argData.bind(this)}  
               hideIndexField = {false} 
                onHdrNameChange={this.onHdrNameChnge.bind(this)}
                onOperationChange = {this.onOperationChange.bind(this)}
                onOperationVal = {this.onOperationVal.bind(this)}
                onIndexChange = {this.onIndexChange.bind(this)}
               />  

              <RaisedButton className="pull-right"
              backgroundColor="#18494F"
              label="Add"
              labelColor="#FFF"
              onClick={this.addData.bind(this)}
              disabled={this.props.profileDisabled}
              disabledLabelColor="#000"
              labelStyle={{ fontSize: 12 }}>
            </RaisedButton>          
            </div>

        </Dialog>

      </div>

    );
  }
}

function mapStateToProps(state) {
  return {
    appDetail: state.applicationdata,
    getAllKeywordData: state.Keywords,
    methodBasedCustomData: state.methodBasedCustomData
  };
}

//method to dispatch actions to the reducers
function mapDispatchToProps(dispatch) {
  //const actionMap = { loadInitTreeData: bindActionCreators(fetchTreeData, dispatch) };
  //return actionMap;
  return bindActionCreators(actionCreators, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(ArgumentTypeComponent);
