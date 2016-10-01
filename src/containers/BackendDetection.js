import React from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import AddNewButton from 'material-ui/FloatingActionButton';
import AddIcon from 'material-ui/svg-icons/content/add';
import DataGrid from '../components/DCDetailTable';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import DialogBackendList from 'material-ui/Dialog';
import DialogNewBackendPoint from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import BackendDetectionList from './BackendDetectionList';
import FormEditBackEndPts from './Form_BackendDetection_Edit';
import FormNewEndPoint from './Form_BackendDetection_AddNew';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators  from '../actions/index';



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
 class BackendDetection extends React.Component {  

  constructor(props) {
    super(props);
     this.state ={endpoints :[]};
    this.state = {'openBackendList': false, 
                  'openNewBackendPointDialog': false,
                  'backendType': 'Backends',
                  'selecteRow':{}}

  }
  
  componentWillMount() {
    console.log("in compwilmount method---",this.props.params.profileId)
    this.props.fetchBackendTableData(this.props.params.profileId);
  }

  componentWillReceiveProps(nextProps)
  {
    if(this.props.backEndDetection.tableData != nextProps.backEndDetection.tableData)
    {
      console.log("backend tabledatat data changed----")
      this.setState({backEndDetection:nextProps.backEndDetection});
    }

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
    this.handleCloseNewendPoint();
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
     this.props.addNewBackendPoint(data,this.props.params.profileId);
      console.info("backendTypeName",backendTypeName);
      console.info("backendTypeName arr",arr);
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
    console.info("data---submit edit end dorm---",data);
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
   this.props.updateBackendType(data,this.props.params.profileId)
   
    
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
        <Paper zDepth={2}>     
       <div className='row row-no-margin tableheader'>
          <div className="col-md-10">
              <h4>Backend Detection</h4>
          </div>

          <div className="col-md-2"  >
            <IconButton><FontIcon className="material-icons">edit_mode</FontIcon></IconButton>
            <IconButton><FontIcon className="material-icons">delete</FontIcon></IconButton>
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
          onRequestClose={this.handleCloseEditEndPt.bind(this)}

		>
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
         <AddNewButton style={NewButtonstyle} onTouchTap={this.handleOpenNewendPoint.bind(this)}>
            <AddIcon />
         </AddNewButton>

      {/*----------- Dialog For Adding New EndPoint--------------*/}
        <DialogNewBackendPoint
          title="Add New Backend Entry Point"
          actions={actionsNewEndPoint}
          modal={false}
          open={this.state.openNewBackendPointDialog}
          onRequestClose={this.handleCloseNewendPoint.bind(this)}
          autoScrollBodyContent={true}
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
    backEndDetection :state.backEndDetection
   };
}

//method to dispatch actions to the reducers
function mapDispatchToProps(dispatch) {
  //const actionMap = { loadInitTreeData: bindActionCreators(fetchTreeData, dispatch) };
  //return actionMap;
return bindActionCreators(actionCreators, dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(BackendDetection);