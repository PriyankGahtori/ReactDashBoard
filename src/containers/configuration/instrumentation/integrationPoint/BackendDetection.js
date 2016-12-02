//Importing React components
import React from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import AddNewButton from 'material-ui/FloatingActionButton';
import AddIcon from 'material-ui/svg-icons/content/add';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import DialogBackendList from 'material-ui/Dialog';
import DialogNewBackendPoint from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

//Importing files
import DataGrid from '../../../../components/DCDetailTable';
import BackendDetectionList from './BackendDetectionList';
import FormEditBackEndPts from './Form_BackendDetection_Edit';
import FormNewEndPoint from './Form_BackendDetection_AddNew';
import * as actionCreators  from '../../../../actions/index';
import {triggerRunTimeChanges} from '../../../../actions/runTimeChanges';


/*
* data --- table column name
* key ---- acting as a primary key
* 
*/

var columns = {
                "key" : "id",
                "data":['Type', 'Description','LINK'],
                "field":['type', 'detail','id']
              }; 

/*var data = [{"type": {"href":"HTTP"},"desc": "All HTTP Backends", "enable": true,"id": 1},
s			{"type": {"href":"DB"},"desc": "All HTTP Backends", "enable": true,"id": 2},
			{"type": {"href":"RMI"},"desc": "All HTTP Backends", "enable": true,"id": 3}
			];*/

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
const styles = {
    title:{
      fontSize:16,
      padding:8
    }
}
 class BackendDetection extends React.Component {  

  constructor(props) {
    super(props);
     this.state ={endpoints :[]};
    this.state = {'openBackendList': false, 
                  'openNewBackendPointDialog': false,
                  'backendType': 'Backends',
                  'selecteRow':{}}
    this.getProfileName = this.getProfileName.bind(this);
    this.makeRunTimeChange = this.makeRunTimeChange.bind(this);
    this.loader = this.loader.bind(this)
  }
  
  getProfileName(profileId)
  {
      try{
        let profileData = this.props.homeData[1]
                              .value
                              .filter(function(obj){return obj.id == profileId });  
        if(profileData.length != 0)
          return profileData[0].name;
        else
          return null;          
      }
      catch(ex)
      {
        console.error("error in getting profileId " + ex);
        return null;
      }

  }
  makeRunTimeChange()
  {

    if(this.props.entryPointFile === false)
      return;

    //action for runtime change
    var filePath = this.props.ns_wdir + "/ndprof/conf/" + this.getProfileName(this.props.trModeDetail.profileId); 
    console.info("filePath", filePath);           
    let keywordDataList = [];
      keywordDataList.push("NDEntryPointsFile=" + filePath + "/NDEntryPointFile.txt");
      keywordDataList.push("ndBackendNamingRulesFile=" + filePath + "/BackendNamingRule.txt" ); 
    triggerRunTimeChanges(this.props.trData, this.props.trModeDetail,keywordDataList); 
  }

  componentWillMount() {
     this.props.triggerLoader(true,null);
    console.log("in compwilmount method---",this.props.params.profileId)
    this.props.fetchBackendTableData(this.props.params.profileId,this.loader);
  }

  componentWillReceiveProps(nextProps)
  {
    if(this.props.backEndDetection.tableData != nextProps.backEndDetection.tableData)
    {
      console.log("backend tabledatat data changed----")
      this.setState({backEndDetection:nextProps.backEndDetection});
    }

  }
    
  loader(){
    //var message = { 'title' : 'Integration Points Loaded' ,'msg': ''}
   this.props.triggerLoader(false,null)
  }
  handleHref(row)
  {
  	console.log("in function handleHref--",row);
    this.props.initializeBackendPtsEditForm(row)
    /*
    * openBackendList state use to open dialog of edit form
    */
  	this.setState({backendType: row.type.href,openBackendList: true,selecteRow: row});  	
  } ;

  handleOpen(){
    this.setState({openBackendList: true});
  };

  //For adding form

  handleOpenNewendPoint(){
    this.setState({openNewBackendPointDialog:true});
  };

 handleCloseNewendPoint(){
    this.setState({openNewBackendPointDialog:false});
  };

  handleSubmitNewendPoint(){
    this.refs.newBackendPoint.submit();
 
  }

   //This handles the form submittion for adding new end point
   submitNewEndPointForm(data){
       console.info("submitNewEndPointForm",data);

      //get backendTypeName from ID
      let backendTypeName;
      let arr = this.props.backEndDetection.tableData.filter(function(val) {        
        return val.id == data.backendTypeId;
      });
      if(arr.length !=0)
        backendTypeName = arr[0].type.href;
      
      //get fqm and desc if not custom by parsing data.fqm
      if(data.customFQMToggle != true && data.fqm != undefined)
      {
        var parsedObj = Object.assign({},JSON.parse(data.fqm));
        data.fqm = parsedObj.fqm;
        data.desc = parsedObj.desc;
      }
        //calling action for updating 
     this.props.addNewBackendPoint(data,this.props.params.profileId,this.makeRunTimeChange);
        this.handleCloseNewendPoint();
     
}
//function called for buttons used in Dialog for editing backend end points
  handleCloseEditEndPt(){
       this.setState({openBackendList: false});
  }

  handleSubmitEditEndPt(){
    this.refs.editBackendPt.submit();
    console.log("handleSubmitEditEndPt")
    this.handleCloseEditEndPt();
  }

  submitEditEndPointForm(data){  
    let endPoints=[];
    Object.keys(data).map(function(key){
      let endPointObj = {};
      if(key.startsWith("endPoint")){
        let splitArr = key.split("_");
        endPointObj.id = splitArr[1];
        endPointObj.enabled = data[key];
        endPoints.push(endPointObj);
      }
    });
    
  data.lstEndPoints = endPoints;
  console.info("data---aftr splitting--",data)
   this.props.updateBackendType(data,this.props.params.profileId,this.makeRunTimeChange)
   
    
  }

 
  handleToggleBackendPts(value){
  console.log("toggle button changed---",value)

  //this.state.endpoints.
 

  }
 

  render() {
  // buttons for edit form 
   const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleCloseEditEndPt.bind(this)}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        onTouchTap={this.handleSubmitEditEndPt.bind(this)}
      />,
    ];

// buttons for add form
  const actionsNewEndPoint = [
      <FlatButton
        label = "Cancel"
        primary={true}
        onTouchTap={this.handleCloseNewendPoint.bind(this)}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        onTouchTap={this.handleSubmitNewendPoint.bind(this)}
      />,
    ];


    return (
      <div>
        <Paper zDepth={2}  style={{background:'rgba(0,0,0,0.45)', color:'#FFF'}}>     
       <div className='row row-no-margin tableheader'>
          <div className="col-md-10">
              <h4>Integration Point Detection(s)</h4>
          </div>

          <div className="col-md-2"  >
            {/*<IconButton><FontIcon className="material-icons">edit_mode</FontIcon></IconButton>
            <IconButton><FontIcon className="material-icons">delete</FontIcon></IconButton>*/}
          </div>
       </div>
             
        {/* Rendering table component  ,
          * passing data (received from store) to the table component to be displayed at table 
         */}
         
        <DataGrid 
          pagination={false} 
          ref="appTable" 
          column = {columns}
          data = {this.props.backEndDetection.tableData}
          onhref={this.handleHref.bind(this)}
        />
        </Paper>

       { /* Dialog and form for editing backend end points*/}
		
		<DialogBackendList
		  title={this.state.backendType}
		  actions={actions}
          modal={true}
          autoScrollBodyContent={true}
          open={this.state.openBackendList}
          onRequestClose={this.handleCloseEditEndPt.bind(this)}	>
		  {/*<BackendDetectionList 
		    backendType={this.state.backendType}
		    selectedRow={this.state.selecteRow}/>*/}

    <FormEditBackEndPts ref="editBackendPt" 
        selectedRow={this.state.selecteRow} 
        backendType={this.state.backendType} 
        handleToggleBackendPts={this.handleToggleBackendPts.bind(this)}

        onSubmit={this.submitEditEndPointForm.bind(this)} />

		</DialogBackendList>       

  {/*------------------------------------------------------------------------------*/}

      <div>
         <AddNewButton  style={NewButtonstyle} onTouchTap={this.handleOpenNewendPoint.bind(this)}>
            <AddIcon />
         </AddNewButton>

      {/*----------- Dialog For Adding New EndPoint--------------*/}
        <DialogNewBackendPoint
          title="Add New Integration Point Detection"
          actions={actionsNewEndPoint}
          modal={false}
          open={this.state.openNewBackendPointDialog}
          onRequestClose={this.handleCloseNewendPoint.bind(this)}
          autoScrollBodyContent={true}
          titleStyle={styles.title}
        >
          <FormNewEndPoint ref="newBackendPoint" onSubmit={this.submitNewEndPointForm.bind(this)}/>
        </DialogNewBackendPoint>

      </div>

   </div>   
   );
  }
}
function mapStateToProps(state) {
  console.log("backEndDetection---",state.backEndDetection.tableData)
  return {
    backEndDetection :state.backEndDetection,
    entryPointFile  : state.Keywords.enableNDEntryPointsFile,
    trData : state.initialData.trData,
    ns_wdir: state.initialData.ns_wdir,
    homeData: state.initialData.homeData, 
    trModeDetail: state.trModeDetail
   };
}

//method to dispatch actions to the reducers
function mapDispatchToProps(dispatch) {
  //const actionMap = { loadInitTreeData: bindActionCreators(fetchTreeData, dispatch) };
  //return actionMap;
return bindActionCreators(actionCreators, dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(BackendDetection);