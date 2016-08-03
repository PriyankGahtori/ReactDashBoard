import React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators  from '../actions/index';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import AddNewButton from 'material-ui/FloatingActionButton';
import AddIcon from 'material-ui/svg-icons/content/add';
import DataGrid from '../components/DCDetailTable';
import DialogNewServiceEntryPts from './Dialog_ServiceEntryPts';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import Snackbar from 'material-ui/Snackbar';
import { Link } from 'react-router';


var columns = {
                "key"  : "id",
                "data" : ['Type','Name','Desc','Enabled','ID'],
                "field": ['entryType','name','desc','enabled','id']
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



class ServiceEntryPoints extends React.Component {

  constructor(props) {
  super(props);
  this.state = {treedata:this.props.treedata};
  this.updateNode = this.updateNode.bind(this);
  this.delRow = this.delRow.bind(this);
  this.state ={openNewTopoDialog:false}
  this.handleOpen = this.handleOpen.bind(this);
  this.handleClick = this.handleClick.bind(this);
  this.state = {topologyData:this.props.topologyData};
  this.onSelectRow=this.onSelectRow.bind(this);
  }

  onSelectRow(){
    console.log("onSelectRow----")
  }

  updateNode(e){
    console.log("table ref ",this.refs.table.refs.dcDetailTable.state.selectedRowKeys);
    e.preventDefault()
    this.props.updateTreeNode(this.props.routeParams.something);
  }

   delRow(){
      var selectedRowKeys=[];
      console.log("del row function called")
      console.log("calling del method---table ref--",this.refs.sepTable.refs.table.state.selectedRowKeys)
    let selectedRowKeysObj = this.refs.sepTable.refs.table.state.selectedRowKeys;
   
   /* selectedRowKeysObj.forEach(
                          value =>{
                          selectedRowKeys.push(value.self.href)
                          }) */
    console.log("selectedRowKeys--",selectedRowKeys)

  /*var selectRowsValueForServer= this.props.dcDetail.tableData
                      .filter(value => selectedRowKeysForUI.indexOf(value.dcName)!= -1)
                      .map((value,index) => value._links.self.href)

  console.log("selectRowsValue--",selectRowsValueForServer)*/
  this.props.delTopoTableRow(selectedRowKeysObj)
  }

  handleClick(){
    console.log("selecting row")
  }

  handleOpen(openServicePointDialogType){

    console.log("in handleopen---",openServicePointDialogType)
    //for editing form
    if(openServicePointDialogType == "edit"){
      console.log("editing the App form")

      // gets the selected key of table
      let selectedRow= this.refs.sepTable.refs.table.state.selectedRowKeys;
      
      if(selectedRow.length == 1)
      {
        console.log("selectedRow----",selectedRow)
        let selectedRowData = this.props.topologyData.tableData
                                  .filter(function(value){
                                    return value._links.self.href === selectedRow[0].self.href
                                  });
        console.log("selectedRowData----",selectedRowData[0])

        //action to dispatch selectRowData
        this.props.topoInitializeForm(selectedRowData[0],openTopoDialogType);
        
        this.props.toggleStateDialogNewTopo();
      }
      else{
        //toster notification: Only one row can be edited
      }

    }
    else if(openServicePointDialogType == "add"){ //for adding new row
      console.log("adding service entry pts form")
     /*  this.props.topoInitializeForm(null,openTopoDialogType);*/ //clears previous/initial values
       this.props.toggleStateDialogNewServiceEntryPts(); //opens dialog box
    }
       
  }

  componentWillMount() {
      console.log("this.props.params.profileId--in compomnentwillmount---",this.props.params.profileId)
      this.props.fetchServiceEntryPointsTabledata(this.props.params.profileId);    
  }

  componentWillReceiveProps(nextProps)
  {
     console.log("nextProps---")
    if(this.props.ServiceEntryPoints != nextProps.ServiceEntryPoints){
      this.setState({ServiceEntryPoints:nextProps.ServiceEntryPoints});
    }
}

onToggle(row){
    console.log("ontoggle function --event triggered---",row)
    if(row.tableType === "serviceEntryPoint")
    {
      row.enabled = !row.enabled;
    }
    console.log("aftr toggling--row.topoState-----",row.enabled)
    this.props.updateToggleState(row)
  }
  

  render() {
      
    return (
    <div>
       <Paper zDepth={2}>     
      <div className='row row-no-margin tableheader'>
          <div className="col-md-10">
              <h4>ServiceEntryPoints Detail</h4>
          </div>
          <div className="col-md-2"  >
            <IconButton  onTouchTap={this.handleOpen.bind(this,"edit")}><FontIcon className="material-icons">edit_mode</FontIcon></IconButton>
            <IconButton onTouchTap={this.delRow}><FontIcon className="material-icons">delete</FontIcon></IconButton>
          
        </div>
       </div>

        <DataGrid data = {this.props.ServiceEntryPoints.tableData} 
            pagination = {false} 
            ref        = "sepTable" 
            column     = {columns}
            onClick    = {this.handleClick}
            onToggle   = {this.onToggle.bind(this)}
         />
        </Paper>


      <div>
         <AddNewButton style={NewButtonstyle} onTouchTap={this.handleOpen.bind(this,"add")} >
            <AddIcon />
         </AddNewButton>
         <DialogNewServiceEntryPts profileId ={this.props.params.profileId}/>
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
  console.log("serverData--",state.ServiceEntryPoints)
  return {
    ServiceEntryPoints :state.ServiceEntryPoints,
   };
}

//method to dispatch actions to the reducers
function mapDispatchToProps(dispatch) {
  //const actionMap = { loadInitTreeData: bindActionCreators(fetchTreeData, dispatch) };
  //return actionMap;
return bindActionCreators(actionCreators, dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(ServiceEntryPoints);
