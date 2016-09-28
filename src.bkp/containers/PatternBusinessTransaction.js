import React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators  from '../actions/index';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import AddNewButton from 'material-ui/FloatingActionButton';
import AddIcon from 'material-ui/svg-icons/content/add';
import DataGrid from '../components/DCDetailTable';
import DialogBTPattern from './Dialog_BTPattern';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import Snackbar from 'material-ui/Snackbar';
import { Link } from 'react-router';
import FlatButton from 'material-ui/FlatButton';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from '../components/SelectFieldWrapper';
export const fields = ['btName','activeToggle','matchType','URL','include','reqParam','reqMethod','reqHeader']

var columns = {
                "key" : "id",
                "data":['BT Name', 'Match type', 'URL', 'BT Included','Req Param key Value','Http Method','Req Header key Value','ID'],
                "field":['btName', 'matchType', 'urlName', 'include','paramKeyValue','reqMethod','headerKeyValue','id']
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
     this.handleSubmit =this.handleSubmit.bind(this);
     this.handleCancel =this.handleCancel.bind(this);
     console.log("this.props - ", this.props)
  }

  componentWillMount() {
    console.log("inside  componentWillMount ");
    console.log("profile id - ", this.props)
    this.props.fetchBTPatternTableData(this.props.params.profileId); 
  }

  onToggle(row){
    console.log("ontoggle function --event triggered---",row)
   
  }

  handleCancel(){
    console.log("inside handle cancel")
    // this.props.toggleStateAddBTPattern();
  }

 handleCheck(event,value){
    console.log("inside handle check")
   
  };
 
  handleSubmit(){
    // this.setState({open: true});
  this.refs.newBTGroupForm.submit();
  this.handleCloseBTSet();
  console.log("aftr closing the dialog----")
  }

 handleOpen(openBTPatternDialog){

    console.log("in handleopen---",openBTPatternDialog)
    //for editing form
    if(openBTPatternDialog == "edit"){
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
    else if(openBTPatternDialog == "add"){ //for adding new row
      console.log("adding service entry pts form")
     /*  this.props.topoInitializeForm(null,openTopoDialogType);*/ //clears previous/initial values
       this.props.toggleStateAddBTPattern(); //opens dialog box
    }
       
  }

  render() {

     const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleCloseBTSet}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        onTouchTap={this.handleSubmit}
      />
    ];

    return (
    <div>
   
      <div className='row row-no-margin tableheader'>
        <div className="col-md-10">
              <h4>Bussiness Transaction Pattern(s)</h4>
        </div>

         <DataGrid data = {this.props.BTPattern.tableData} 
            pagination = {false} 
            ref        = "btPatternTable" 
            column     = {columns}
            onClick    = {this.handleClick}
            onToggle   = {this.onToggle.bind(this)}
         />

        <div>
         <AddNewButton style={NewButtonstyle} onTouchTap={this.handleOpen.bind(this,"add")}>
            <AddIcon />
         </AddNewButton>
         <DialogBTPattern profileId ={this.props.params.profileId}/>
          
        </div>
       </div>
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