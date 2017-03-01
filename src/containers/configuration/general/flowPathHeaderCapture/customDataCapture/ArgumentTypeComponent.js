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

/*
* data --- table column name
* key ---- acting as a primary key
* 
*/

var columns = {
  "key": "argTypeId",
  "data": ['Header Name', 'Type','Index', 'Operation Value','Operation', 'id'],
  "field": ['headerName','customValTypeName','indexVal','operatorValue', 'operationName',  'argTypeId']
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
}


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
                  arr:this.props.tableData != null ? this.props.tableData :[],
                  'argTypeAddComp':'hidden',
                  id:-1,
                  headerName:'',
                  indexVal:'',
                  operationName:'',
                  type:'',
                  operationName:'',
                  Errormsg: 'hidden'


      }
   
  }


  handleDelConfirm() {
    this.setState({ open: true
     });
  }

  handleDelete() {
    console.log("this.refs.appTable - ",this.refs.appTable);
    var selectedRow = [] ;
    var selectedRow = this.refs.appTable.refs.table.state.selectedRowKeys;
    console.log("selectedRow - ",selectedRow);
    this.props.delArgumentValuesRow(selectedRow);
     try{
      this.refs.appTable.refs.table.cleanSelected();
     }
     catch(e){
       console.error(" Exception Occured: FileName: ArgumentTypeComponent,MethodName: handleDelete() ",e)
     } 
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
      if(this.props.tableData != nextProps.tableData)
        this.setState({arr:nextProps.tableData})  
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
  if(this.state.headerName == ''||this.state.indexVal  == ''|| this.state.customValTypeName == '' || this.state.operationName == ''){
      console.log("val empty")
     this.setState({Errormsg: 'show'})
  }
  else{
    this.setState({Errormsg: 'hidden'})
     console.log("val not empty")
  this.setState({id:this.state.id +1,
                argTypeAddComp:'hidden'  
  })
   let opVal;
  if(this.state.operationName == "EXTRACT_SUBPART"){
    opVal = this.state.lbVal +"-"+ this.state.rbVal
  }else{
    opVal = this.state.opVal;
  }
  var data = {headerName:this.state.headerName,
              indexVal:this.state.indexVal,
              operationName:this.state.operationName,
              operationId:this.state.operationId,
              operatorValue:opVal,
              operatorName:this.state.operatorName,
              type:this.state.customValType,
              customValTypeName:this.state.customValTypeName,
              id:this.state.id + 1
  }
  console.log("data---",data)
 if(this.props.methodBasedCustomData.openEditMethodBasedCaptureDialog){
    this.props.addArgumentType(data,this.props.methodBasedCustomData.initializeForm.methodBasedId);
 }
else{
  this.state.arr.push(data)
  this.props.data(this.state.arr);
  }
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

    onOperationVal(val){
        console.log("operatorName---",val)
        this.setState({opVal:val
        })
    }

    onIndexChange(value){
      console.log("indexVal chane---",value)
      this.setState({indexVal:value})
    }

    onCustomValTypeChange(val,customValTypeName){
      this.setState({customValType:val,
                      customValTypeName:customValTypeName
      })
    }

     lbChange(lbVal){
        this.setState({lbVal:lbVal})
    }
    
    rbChange(rbVal){
        this.setState({rbVal:rbVal})
    }

  render() {
    
    return (
      <div style = {{'left':'10px','position':'relative'}}>
        <Paper zDepth={2} style={{ color: '#FFF' }}>
          <div className='row row-no-margin tableheader'>
            <IconButton className="pull-right" tooltip="Delete" onTouchTap={this.handleDelete.bind(this)} className="pull-right" ><FontIcon color="#FFF" className="material-icons">delete</FontIcon></IconButton>
            <IconButton  className="pull-right"  tooltip="Add" onTouchTap={this.handleOpen.bind(this)}><FontIcon  color="#FFF"  className="material-icons">playlist_add</FontIcon></IconButton>
          </div>

          {/* Rendering table component  ,
          * passing data (received from store) to the table component to be displayed at table 
         */
          }


          <DataGrid data={this.state.arr}
            pagination={false}
            ref="appTable"
            column={columns}
            onClick={this.handleClick}
            />
          
          </Paper>

            <div className = {`row ${this.state.argTypeAddComp}`} style = {{paddingLeft: '18px'}}>
              <AddComp data = {this.argData.bind(this)}  
               hideIndexField = {false} 
                onHdrNameChange={this.onHdrNameChnge.bind(this)}
                onCustomValTypeChange = {this.onCustomValTypeChange.bind(this)}
                onOperationChange = {this.onOperationChange.bind(this)}
                onOperationVal = {this.onOperationVal.bind(this)}
                onIndexChange = {this.onIndexChange.bind(this)}
                fqm = {this.props.fqm}
                 lbChange ={this.lbChange.bind(this)}
                rbChange ={this.rbChange.bind(this)}
               />  

              <RaisedButton className="pull-right"
              backgroundColor="#18494F"
              label="Add"
              labelColor="#FFF"
              onClick={this.addData.bind(this)}
              disabled={this.props.profileDisabled}
              disabledLabelColor="#000"
              labelStyle={{ fontSize: 12 }}
              style={{ position: 'relative', left:'0px',top:'2px'}}>
            </RaisedButton>          
            </div>

        

        <Snackbar
          open={this.state.openSnack}
          message="No row selected or multiple rows selected"
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
          />
         <div className= {this.state.Errormsg}> 
             <p style={{color: 'red',bottom:'30px',position:'relative'}}> Fields are Empty </p>
          </div> 
        
          
        
    

      </div>

    );
  }
}

function mapStateToProps(state) {
  return {
    appDetail: state.applicationdata,
    getAllKeywordData: state.Keywords,
    methodBasedCustomData:state.methodBasedCustomData
  };
}

//method to dispatch actions to the reducers
function mapDispatchToProps(dispatch) {
  //const actionMap = { loadInitTreeData: bindActionCreators(fetchTreeData, dispatch) };
  //return actionMap;
  return bindActionCreators(actionCreators, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(ArgumentTypeComponent);
