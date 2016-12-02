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

//Importing files
import DialogErrorDetection from './Dialog_ErrorDetection';
import DropDownMenu from '../../../../components/SelectFieldWrapper';
import DataGrid from '../../../../components/DCDetailTable';
import * as actionCreators  from '../../../../actions/index';


export const fields = ['ruleName','from','to','enabled','ruleDesc']


var columns = {
                "key" : "id",
                "data":['Name', 'From', 'To','Enabled','Description','ID'],
                "field":['ruleName', 'errorFrom','errorTo','enabled','ruleDesc','id']
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
     console.log("in constructor--",this.props.errorDetection);
     this.state ={errorDetection:this.props.errorDetection}
     this.loader = this.loader.bind(this)
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
     console.log("nextProps---error",nextProps.ErrorDetection)
    if(this.props.errorDetection.tableData != nextProps.errorDetection.tableData){
      console.log("inside if conddddddddddddddddd")
      this.setState({errorDetection:nextProps.errorDetection});

       console.log("this.propssss - ", this.state)
    }
}

  handleCancel(){
    console.log("inside handle cancel")
    this.props.toggleStateErrorDetection();
  }

 handleCheck(event,value){
    console.log("inside handle check")
   
  };
 
 handleOpen()
 {
  this.props.toggleStateErrorDetection(); //opens dialog box
 }

 /*handleOpen(openErrorDetectionDialog){

    console.log("in handleopen---",openErrorDetectionDialog)
    //for editing form
    if(openErrorDetectionDialog == "edit"){
      console.log("editing the App form")

      // gets the selected key of table
      let selectedRow= this.refs.sepTable.refs.table.state.selectedRowKeys;
      
      if(selectedRow.length == 1)
      {
        
      }
      else{
        //toster notification: Only one row can be edited
      }

    }
    else if(openErrorDetectionDialog == "add"){ //for adding new row
      console.log("adding service entry pts form")
       this.props.toggleStateErrorDetection(); //opens dialog box
    }
       
  }*/

  render() {

    return (
    <div>
       <Paper zDepth={2} style={{background:'rgba(0,0,0,0.45)', color:'#FFF'}}>     
      <div className='row row-no-margin tableheader'>
        <div className="col-md-10">
              <h4>Error Detection(s)</h4>
        </div>
        {console.log("proops - ",this.props)}
         <DataGrid data = {this.props.errorDetection.tableData} 
            pagination = {false} 
            ref        = "errorDetectionTable" 
            column     = {columns}
            onClick    = {this.handleClick}
            onToggle   = {this.onToggle.bind(this)}
         />

        <div>
         <AddNewButton  style={NewButtonstyle} onTouchTap={this.handleOpen.bind(this)}>
            <AddIcon />
         </AddNewButton>
         <DialogErrorDetection profileId ={this.props.params.profileId}/>
          
        </div>
       </div>
       </Paper>
    </div>
    );
  }
}


function mapStateToProps(state) {
  console.log("errorDetection state -  ",state.errorDetection)
  return {
    errorDetection : state.errorDetection
   
   };
}

//method to dispatch actions to the reducers
function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(ErrorDetection);
