//Importing React components

import React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import AddNewButton from 'material-ui/FloatingActionButton';
import AddIcon from 'material-ui/svg-icons/content/add';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import Snackbar from 'material-ui/Snackbar';
import { Link } from 'react-router';
import FlatButton from 'material-ui/FlatButton';
import MenuItem from 'material-ui/MenuItem';
import ConfirmDelDialog  from 'material-ui/Dialog'
//Importing files
import DropDownMenu from '../../../../components/SelectFieldWrapper';
import * as actionCreators  from '../../../../actions/index';
import DataGrid from '../../../../components/DCDetailTable';
import DialogBTPattern from './Dialog_BTPattern';
import {triggerRunTimeChanges} from '../../../../actions/runTimeChanges';


export const fields = ['btName','activeToggle','matchType','URL','include','reqParam','reqMethod','reqHeader']

var columns = {
                "key" : "id",
                "data":['Name', 'Match Type', 'URL', 'BT Included','Slow Transaction Threshold(ms)','Very Slow Transaction Threshold(ms)','Req Param key Value','HTTP Method','Req Header key Value','ID'],
                "field":['btName', 'matchType', 'urlName', 'include','slowTransaction','verySlowTransaction','paramKeyValue','reqMethod','headerKeyValue','id']
              };          

const style = {
  
  //margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};

const NewButtonstyle = {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 30,
    left: 'auto',
    position: 'fixed',

};

const styles = {
  block: {
    maxWidth: 250,
    paddingBottom:5
  },
   toggle: {
      marginTop:30 ,
      paddingLeft:80
  },
  customWidth: {
      width: 200
    },
  checkbox: {
    marginBottom: 16,
    paddingTop:35
  },
   btSetBlock:{
    paddingLeft:10,
    paddingTop:5
  }
};

 class PatternBusinessTransaction extends React.Component {
  
  constructor(props) {
    super(props);
     this.handleOpen=this.handleOpen.bind(this);
     this.handleCancel =this.handleCancel.bind(this);
     this.loader = this.loader.bind(this)
     this.state = { openSnack:false,delDialog: false};

  }

  componentWillMount() {
    this.props.triggerLoader(true,null)
    this.props.fetchBTPatternTableData(this.props.params.profileId,this.loader); 
  }

  componentWillReceiveProps(){
  }
  
  loader(){
    //var message = {'title': 'BT Pattern Loaded' , 'msg': ''}
    this.props.triggerLoader(false,null)
  }


  onToggle(row){
    console.log("ontoggle function --event triggered---",row)
   
  }

  handleCancel(){
    // this.props.toggleStateAddBTPattern();
  }

 handleCheck(event,value){
   
  };

  delRow(){
    let selectedRow = this.refs.btPatternTable.refs.table.state.selectedRowKeys;
       this.props.delBTPatternRows(selectedRow);
    try{
         this.refs.btPatternTable.refs.table.cleanSelected();
     }
     catch(e){
        console.error(" Exception Occured: FileName: PatternBusinessTransaction ,MethodName: delRow()",e)
     }
    this.handleClose();
  }

  handleClose(){
    this.setState({delDialog: false})
  }

  handleDelete(){
    let selectedRow = this.refs.btPatternTable.refs.table.state.selectedRowKeys;
    if(selectedRow.length == 0){
      this.setState({openSnack: true,delDialog: false})
    }
    else{
      this.setState({openSnack: false, delDialog: true})
    }
  }
 

 handleOpen(openBTPatternDialog){

    //for editing form
     this.setState({openSnack:false})
    if(openBTPatternDialog == "edit"){

      // gets the selected key of table
      let selectedRow= this.refs.btPatternTable.refs.table.state.selectedRowKeys;
      if(selectedRow.length == 1)
      {
       let selectedRowData = this.props.BTPattern.tableData
                                  .filter(function(value){
                                    return value.id === selectedRow[0]
                                  });
        this.props.toggleStateAddBTPattern();
        this.props.patternInitializeForm(selectedRowData[0],openBTPatternDialog);
      }
      else{
        //toster notification: Only one row can be edited
         this.setState({openSnack:true})
      }
    }
    else if(openBTPatternDialog == "add"){ //for adding new row
       this.props.toggleStateAddBTPattern(); //opens dialog box
       this.props.patternInitializeForm(null,openBTPatternDialog);
    }
       
  }


  render() {
    const delActions = [
              <FlatButton label="Cancel"
                   primary={true}
                  onTouchTap={this.handleClose.bind(this)} /> ,
              <FlatButton label="Delete" 
                            primary={true}
                            onTouchTap = {this.delRow.bind(this)}/> 


    ];

    return ( 
    <div>
       <Paper zDepth={2} style={{background:'rgba(0,0,0,0.45)', color:'#FFF'}}>     
      <div className='row row-no-margin tableheader'>
        <div className="col-md-10">
              <h4>Bussiness Transaction Pattern(s)</h4>
        </div>
    
       <IconButton tooltip = "Edit"  style={{left:70}} onTouchTap={this.handleOpen.bind(this,"edit")}><FontIcon  color="#FFF"  className="material-icons">edit_mode</FontIcon></IconButton>
      <IconButton tooltip = "Delete"  className = "pull-right"  onTouchTap={this.handleDelete.bind(this)}><FontIcon  color="#FFF"  className="material-icons">delete</FontIcon></IconButton>
      
         <DataGrid 
            data       = {this.props.BTPattern.tableData} 
            pagination = {false} 
            ref        = "btPatternTable" 
            column     = {columns}
            onClick    = {this.handleClick}
            onToggle   = {this.onToggle.bind(this)}  
         
        />
   
        <div>
         <AddNewButton className="add-btn" style={NewButtonstyle} onTouchTap={this.handleOpen.bind(this,"add")}>
            <AddIcon />
         </AddNewButton>
         <DialogBTPattern profileId ={this.props.params.profileId}/>
          

        </div>
        
       </div>
         <Snackbar
          open={this.state.openSnack}
          message="No row selected or multiple rows selected"
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}/>
         
          <ConfirmDelDialog
          title="Are you sure want to delete the Pattern Bussiness Transaction(s) ?"
          actions={delActions}
          modal={false}
          open={this.state.delDialog}
      
        />
       </Paper>
    </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    BTPattern : state.BTPattern
   
   };

}

//method to dispatch actions to the reducers
function mapDispatchToProps(dispatch) {
	return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(PatternBusinessTransaction);
