//Importing React components
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Paper from 'material-ui/Paper';
import AddNewButton from 'material-ui/FloatingActionButton';
import AddIcon from 'material-ui/svg-icons/content/add';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import Snackbar from 'material-ui/Snackbar';
import {hashHistory } from 'react-router';

//Importing files
import DialogProfile from './Dialog_Profile_NewProfile';
import * as actionCreators  from '../../actions/index';
import DataGrid from '../../components/DCDetailTable';

/*
* data --- table column name
* key ---- acting as a primary key
* 
*/

var columns = {
                "key" : "id",
                "data":['Name', ' Description','LINK'],
                "field":['profileHref', 'profileDesc','id']
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



class ProfileDetail extends React.Component {

  constructor(props) {
  super(props);
  console.log("in DCDetail.js--",this.props)
  console.log(this.props.routeParams.something)
  this.delRow = this.delRow.bind(this);
  this.state ={openNewAppDialog:false} //
  this.handleOpen = this.handleOpen.bind(this);
 
  }

 delRow(){
    console.log("del row function called--",selectedRowKeys)
    let selectedRowKeys = this.refs.profileDetailTable.refs.table.state.selectedRowKeys;
    this.props.delProfileTableRow(selectedRowKeys)

  //cleaning state of selectedRowKeys
    this.refs.profileDetailTable.refs.table.cleanSelected();
    console.log("aftr cleaning---",this.refs.profileDetailTable.refs.table.state.selectedRowKeys)
  }

  handleHref(row)
  {
    console.log("in function handleHref-in profileDetail-",row);
    hashHistory.push(`/profile/${row.id}`)
  } 

/*
* flag "openProfileDialogType" used to determine FormDialog to be opened will be for which functionality
* add OR edit
*/
  handleOpen(openProfileDialogType){
   
   let selectedRowData = [];
    console.log(" in handleopen ------------------------------------>",openProfileDialogType)

    if(openProfileDialogType == "edit"){
    
    console.log(" in profile ---edit button clicked-------------------->",this.refs.profileDetailTable.props.data)
     let selectedRow = this.refs.profileDetailTable.refs.table.state.selectedRowKeys;
     console.log(" selectedRow -------self---- href------------>",selectedRow)
     if(selectedRow.length == 1)
      {
        console.log(" select row------------->in profile")
        selectedRowData = this.props.profileDetail.tableData
                                  .filter(function(value){
                                    console.log("slectedRow[0]------->",selectedRow[0])
                                    console.log("value----",value)
                                    return value.id === selectedRow[0]
                                  });
         this.props.profileInitializeForm(selectedRowData[0],openProfileDialogType);
         this.props.toggleStateDialogNewProfile(); //opens dialog box
         this.refs.profileDetailTable.refs.table.state.cleanState();

      }
    }
    
    else if(openProfileDialogType == "add"){ //for adding new row
      console.log("in profile dialog--------------->adding form")
       this.props.profileInitializeForm(null,openProfileDialogType); //clears previous/initial values
       this.props.toggleStateDialogNewProfile(); //opens dialog box
    }
       
  }
//this function is called first when component gets first loaded
  componentWillMount() {
    this.props.fetchProfileDetailData();
  }

  componentWillReceiveProps(nextProps)
  {
    console.log("in componentWillReceiveProps--",nextProps.profileDetail)
     console.log("in componentWillReceiveProps--",this.props.profileDetail)
    if(this.props.profileDetail != nextProps.profileDetail)
      this.setState({profileDetail:nextProps.profileDetail});
  }

  render() {
      
    return (
    <div>
        <Paper zDepth={2}>     
       <div className='row row-no-margin tableheader'>
          <div className="col-md-10">
              <h4>Profile Detail</h4>
          </div>

          <div className="col-md-2"  >
           {/*<IconButton  tooltip="Edit Profile" onTouchTap={this.handleOpen.bind(this,"edit")}><FontIcon className="material-icons">edit_mode</FontIcon></IconButton>
            <IconButton tooltip="Delete Profile" onTouchTap={this.delRow}><FontIcon className="material-icons">delete</FontIcon></IconButton>
           */}
          </div>
       </div>
          
       
        {/* Rendering table component  ,
          * passing data (received from store) to the table component to be displayed at table 
         */  
       }
        <DataGrid data = {this.props.profileDetail.tableData} 
                  pagination ={false} 
                  ref ="profileDetailTable" 
                  column = {columns}
                  onClick={this.handleClick}
                  onhref={this.handleHref.bind(this)}
         />
        </Paper>
       
      <div>
         <AddNewButton style={NewButtonstyle} onTouchTap={this.handleOpen.bind(this,"add")} >
            <AddIcon />
         </AddNewButton>

         <DialogProfile />

      </div>

      <Snackbar
          open={this.state.open}
          message="No row selected or multiple rows selected"
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />

   </div>

    );
  }
}

function mapStateToProps(state) {
  console.log("appDetail---",state.profileDetailData.tableData)
  return {
    profileDetail :state.profileDetailData
   };
}

//method to dispatch actions to the reducers
function mapDispatchToProps(dispatch) {
  //const actionMap = { loadInitTreeData: bindActionCreators(fetchTreeData, dispatch) };
  //return actionMap;
return bindActionCreators(actionCreators, dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(ProfileDetail);
