import React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators  from '../actions/index';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import AddNewButton from 'material-ui/FloatingActionButton';
import AddIcon from 'material-ui/svg-icons/content/add';
import DataGrid from '../components/DCDetailTable';
import DialogMethodMon from './Dialog_MethodMonitor';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import { Link } from 'react-router';
import FlatButton from 'material-ui/FlatButton';

export const fields = ['methodDisplayName', 'methodName', 'methodDesc']

var columns = {
                "key" : "methodId",
                "data":['Display Name', 'Method Name', 'Description','ID'],
                "field":['methodDisplayName', 'methodName', 'methodDesc', 'methodId']
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

 class MethodMonitors extends React.Component {
  
  constructor(props) {
    super(props);
     this.handleOpen=this.handleOpen.bind(this);
     this.handleCancel =this.handleCancel.bind(this);
     console.log("this.props - ", this.props)
  }

  componentWillMount() {
    console.log("inside  componentWillMount ");
    this.props.fetchMethodMonitorTableData(this.props.params.profileId);
    console.log("this.state - ",this.state) 
  }

  componentWillReceiveProps(nextProps)
  {
     console.log("nextProps---",nextProps)
    if(this.props.methodMonitor.tableData != nextProps.methodMonitor.tableData){
      console.log("inside if conddddddddddddddddd")
      this.setState({methodMonitor:nextProps.methodMonitor});

       console.log("this.propssss - ", this.state)
    }
}

  onToggle(row){
    console.log("ontoggle function --event triggered---",row)
   
  }

  handleCancel(){
    console.log("inside handle cancel")
    this.props.toggleStateAddMethodMonitor();
  }

 handleCheck(event,value){
    console.log("inside handle check")
   
  };
 
  handleOpen(){
       this.props.toggleStateAddMethodMonitor(); //opens dialog box
  }

  render() {


    return (
    <div>
   
      <div className='row row-no-margin tableheader'>
        <div className="col-md-10">
              <h4>Method Monitor(s)</h4>
        </div>

        <DataGrid data = {this.props.methodMonitor.tableData} 
            pagination = {false} 
            ref        = "methodMonitorTable" 
            column     = {columns}
            onClick    = {this.handleClick}
            onToggle   = {this.onToggle.bind(this)}
         />

        <div>
         <AddNewButton style={NewButtonstyle} onTouchTap={this.handleOpen.bind(this)}>
            <AddIcon />
         </AddNewButton>
         <DialogMethodMon profileId ={this.props.params.profileId}/>
          
        </div>
       </div>
    </div>
    );
  }
}


function mapStateToProps(state) {
  console.log("methodMonitor state -  " + state.methodMonitor)
  return {
     methodMonitor : state.methodMonitor
   };
}

//method to dispatch actions to the reducers
function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(MethodMonitors);
