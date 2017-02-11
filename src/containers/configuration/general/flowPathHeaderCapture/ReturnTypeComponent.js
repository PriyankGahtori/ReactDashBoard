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
import DataGrid from '../../../../components/DCDetailTable';
import * as actionCreators from '../../../../actions/index';

/*
* data --- table column name
* key ---- acting as a primary key
* 
*/

var columns = {
  "key": "returnTypeId",
  "data": ['Header Name', 'Operation', 'Operation Value', 'id'],
  "field": ['headerName', 'operation', 'operationVal', 'returnTypeId']
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
    this.state = {addCompCss:'hidden'}
    

    this.state={ arr:[]}
  }


  handleDelConfirm() {
    this.setState({ open: true });
  }



  
  handleClick() {
  }

  
  handleOpen() {
      console.log("handleOpen method called")
      this.setState({addCompCss: 'show'})
   
  }

  //this function is called first when component gets first loaded
  componentWillMount() {
   
  }

  componentWillReceiveProps(nextProps) {
    
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

  render() {
    
    return (
      <div style = {{'left':'58px','position':'relative'}}>
        <Paper zDepth={2} style={{ background: 'rgba(0,0,0,0.45)', color: '#FFF' }}>
          <div className='row row-no-margin tableheader'>

            <div className="pull-right"  >
                 <IconButton  tooltip="Add" onTouchTap={this.handleOpen.bind(this)}><FontIcon  color="#FFF"  className="material-icons">playlist_add</FontIcon></IconButton>
            </div>
          </div>

         


          {/* Rendering table component  ,
          * passing data (received from store) to the table component to be displayed at table 
         */
          }

          <DataGrid data={this.state.arr}
            pagination={false}
            ref="appTable"
            column={columns}
            onClick={this.handleClick}
            />

            <div className = "row">


            </div>
        </Paper>

        <Snackbar
          open={this.state.openSnack}
          message="No row selected or multiple rows selected"
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
          />

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
