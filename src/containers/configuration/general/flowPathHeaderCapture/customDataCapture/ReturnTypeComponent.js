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
  "key": "id",
  "data": ['Header Name', 'Type','Operation', 'Operation Value', 'id'],
  "field": ['headerName','customValTypeName', 'operation', 'operatorValue', 'id']
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


class ReturnTypeComponent extends React.Component {

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
                  id:-1,
                  headerName:'',
                  customValTypeName:'',
                  operation:'',
                 operationName:'',
                 Errormsg: 'hidden'

      }
    console.log("constructor method called--",this.props.fqm)
   
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
    console.log("nextProps of Returntype--",nextProps)
    
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

  returnTypeData(data){
    console.log("data---",data)
    this.state.arr.push(data);
    this.props.returnTypeData(this.state.arr)


  }

  addData(){
  console.log("addData function called")
  /* if(this.state.headerName == '' || this.state.opValue == '' || this.state.value == '' ){
       this.setState({errMsgCss:'show'})
    }
    */

console.log("addData function called--",this.state.operationName)
  if(this.state.headerName ==''|| this.state.customValTypeName =='' || this.state.operationName==''){
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
              type:this.state.operationId,
              operation:this.state.operationName,
             // opVal:opVal,
              customValTypeName:this.state.customValTypeName,
              operatorValue:opVal,
              operatorName:this.state.operatorName,
              id:this.state.id + 1,
              operationId:this.state.operationName
             

  }
  console.log("data---",data)
 // this.props.addReturnType(data)
 this.state.arr.push(data)
 this.props.data(this.state.arr);
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


//NOT USED
    operatorValue(value){
      this.setState({operatorValue:value})
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
handleDelete(){
   var selectedRow = this.refs.returnTypeTable.refs.table.state.selectedRowKeys
     var arrData = Object.assign([],this.state.arr)
   arrData = arrData.filter(function(value){
        return selectedRow.indexOf(value.id) == -1;
       })
      this.setState({arr:arrData})

}
    
  render() {
    
    return (
      <div  style = {{'left':'10px','position':'relative'}}>
        <Paper zDepth={2} style={{ color: '#FFF' }}>
          <div className='row row-no-margin tableheader'>
                 <IconButton className="pull-right"  tooltip="Delete" onTouchTap={this.handleDelete.bind(this)} className="pull-right" ><FontIcon color="#FFF" className="material-icons">delete</FontIcon></IconButton> 
                 <IconButton className="pull-right"  tooltip="Add" onTouchTap={this.handleOpen.bind(this)}><FontIcon  color="#FFF"  className="material-icons">playlist_add</FontIcon></IconButton>
          </div>

          {/* Rendering table component  ,
          * passing data (received from store) to the table component to be displayed at table 
         */
          }


          <DataGrid data={this.state.arr}
            pagination={false}
            ref="returnTypeTable"
            column={columns}
            onClick={this.handleClick}
            />
          
          </Paper>

            <div className = {`row ${this.state.argTypeAddComp}`} style = {{paddingLeft: '18px'}}>
              <AddComp data = {this.returnTypeData.bind(this)}  
               hideIndexField = {true} 
               opListForReturnType = {this.props.oplistForReturnType}
                onHdrNameChange={this.onHdrNameChnge.bind(this)}
                onOperationChange = {this.onOperationChange.bind(this)}
                onOperationVal = {this.onOperationVal.bind(this)}
                onIndexChange = {this.onIndexChange.bind(this)}
             //   operatorValue = {this.operatorValue.bind(this)}
                onCustomValTypeChange = {this.onCustomValTypeChange.bind(this)}
                lbChange ={this.lbChange.bind(this)}
                rbChange ={this.rbChange.bind(this)}
                fqm = {this.props.fqm}
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
    getAllKeywordData: state.Keywords
  };
}

//method to dispatch actions to the reducers
function mapDispatchToProps(dispatch) {
  //const actionMap = { loadInitTreeData: bindActionCreators(fetchTreeData, dispatch) };
  //return actionMap;
  return bindActionCreators(actionCreators, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(ReturnTypeComponent);
