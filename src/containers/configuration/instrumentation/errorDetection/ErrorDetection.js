//Importing React components
import React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import AddNewButton from 'material-ui/FloatingActionButton';
import AddIcon from 'material-ui/svg-icons/content/add';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import { Link } from 'react-router';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';
import ConfirmDelDialog from 'material-ui/Dialog'

//Importing files
import DialogErrorDetection from './Dialog_ErrorDetection';
import DropDownMenu from '../../../../components/SelectFieldWrapper';
import DataGrid from '../../../../components/DCDetailTable';
import * as actionCreators  from '../../../../actions/index';
import EnableErrorDetection from './EnableErrorDetection';


export const fields = ['ruleName','from','to','enabled','ruleDesc']


var columns = {
                "key" : "errDetectionId",
                "data":['Name', 'From', 'To','Enabled','Description','ID'],
                "field":['ruleName', 'errorFrom','errorTo','enabled','ruleDesc','errDetectionId']
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

 class ErrorDetection extends React.Component {
  
  constructor(props) {
    super(props);
     this.handleOpen=this.handleOpen.bind(this);
     this.handleCancel =this.handleCancel.bind(this);
     this.handleClick = this.handleClick.bind(this);
     this.state ={errorDetection:this.props.errorDetection}
     this.loader = this.loader.bind(this)
     this.state = {openSnack: false,cnfmDelDialog: false}
     this.handleClose = this.handleClose.bind(this);
     this.delErrorDetection = this.delErrorDetection.bind(this);
  }
  
  handleClick(){

  }

  componentWillMount() {
   this.props.triggerLoader(true,null)
    this.props.fetchErrorDetectionTableData(this.props.params.profileId,this.loader); 
  }
  
  loader(){
   // var message = {'title': 'Error Detection Loaded','msg' : ''}
    this.props.triggerLoader(false,null);

  }

  onToggle(row){
    // console.log("ontoggle function --event triggered---",row)
   
  }

   componentWillReceiveProps(nextProps)
  {
    if(this.props.errorDetection.tableData != nextProps.errorDetection.tableData)
      this.setState({errorDetection:nextProps.errorDetection});
}

 handleDelErrorDetection(){
    var selectedRow = [];
    selectedRow = this.refs.errorDetectionTable.refs.table.state.selectedRowKeys;
    if(selectedRow.length >= 1){
      this.setState({openSnack: false,cnfmDelDialog: true})
    }
    else{
      this.setState({openSnack: true, cnfmDelDialog: false})
    }
  }
  handleCancel(){
    console.log("inside handle cancel")
    this.props.toggleStateErrorDetection();
  }

 handleCheck(event,value){
    console.log("inside handle check")
   
  };
  handleClose(){
    this.setState({ cnfmDelDialog:  false})
  }
 
   // Below Method is called when the user tries to delete the Error Detection.
  delErrorDetection(){
     var selectedRow = [] ;
     selectedRow = this.refs.errorDetectionTable.refs.table.state.selectedRowKeys;
     this.props.delErrorDetectionRow(this.props.params.profileId,selectedRow);
     try{
        this.refs.errorDetectionTable.refs.table.cleanSelected();
     }
     catch(e)
     {
       console.error(" Exception Occured: FileName: ErrorDetection,MethodName: delErrorDetection() ",e)
     }

     this.setState({cnfmDelDialog: false})

  }

 handleOpen(openErrorDetectionDialog){

    //for editing form
      let selectedRow= this.refs.errorDetectionTable.refs.table.state.selectedRowKeys;
    if(openErrorDetectionDialog == "edit"){
      // gets the selected key of table
      if(selectedRow.length == 1)
      {
           this.setState({openSnack: false})
           var selectedRowData = this.props.errorDetection.tableData.filter(function(value){
            return value.errDetectionId == selectedRow
        })
         this.props.initializeErrorDetectionForm(selectedRowData[0],openErrorDetectionDialog);
         this.props.toggleStateErrorDetection(); //opens dialog box

      }
      else{
        //toster notification: Only one row can be edited
          this.setState({openSnack: true})
      }

    }
    else if(openErrorDetectionDialog == "add"){ //for adding new row
         this.props.initializeErrorDetectionForm(null,openErrorDetectionDialog);
          this.props.toggleStateErrorDetection(); //opens dialog box
    }
  }


  render() {
      const actions = [
                         <FlatButton
                            label="Cancel"
                            primary={true}
                            onTouchTap={this.handleClose} />,
                         
                          <FlatButton
                            label="Delete" 
                             primary={true}
                             disabled = {this.props.profileDisabled}
                             onTouchTap={this.delErrorDetection}/>
                      ];

    return (
    <div>
       <Paper zDepth={2} style={{background:'rgba(0,0,0,0.45)', color:'#FFF'}}>  
      <div className='row row-no-margin tableheader'>
        <div className="col-md-4">
        <EnableErrorDetection />
              <h4 style={{position: 'relative',bottom:7}}>Error Detection(s)</h4>
        </div>
       <IconButton tooltip = "Edit Error Detection"   style={{position: 'absolute',right:68}} onTouchTap={this.handleOpen.bind(this,"edit")}><FontIcon  color="#FFF"  className="material-icons">edit_mode</FontIcon></IconButton>
       <IconButton tooltip = "Delete Error Detection" className = "pull-right" onTouchTap={this.handleDelErrorDetection.bind(this)}><FontIcon color="#FFF" className="material-icons"> delete </FontIcon> </IconButton>
         <DataGrid data = {this.props.errorDetection.tableData} 
            pagination = {false} 
            ref        = "errorDetectionTable" 
            column     = {columns}
            onClick    = {this.handleClick}
            onToggle   = {this.onToggle.bind(this)}
            disableToggle = {this.props.profileDisabled}
            
         />

        <div>
         <AddNewButton  style={NewButtonstyle} onTouchTap={this.handleOpen.bind(this,"add")}>
            <AddIcon />
         </AddNewButton>
         <DialogErrorDetection profileId ={this.props.params.profileId}/>
          <ConfirmDelDialog    
            open ={this.state.cnfmDelDialog}
            title="Are you sure want to delete the Error Detection(s)?"
            actions={actions}
            modal={false}  /> 
         
        </div>
       </div>
         <Snackbar
          open={this.state.openSnack}
          message="No row selected or multiple rows selected"
          autoHideDuration={4000}
        />
      
       </Paper>
    </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    errorDetection : state.errorDetection,
    profileDisabled: state.profileDisabled.disabled  
   
   };
}

//method to dispatch actions to the reducers
function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(ErrorDetection);
