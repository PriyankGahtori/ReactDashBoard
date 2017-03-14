
//Importing react components
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
import FlatButton from 'material-ui/FlatButton';
import { hashHistory } from 'react-router';
import TextField from 'material-ui/TextField';
import { reduxForm } from 'redux-form';
import _ from "lodash";
import { Link } from 'react-router';
import ConfirmDialog from 'material-ui/Dialog';
import DialogSetCavNVCookie from 'material-ui/Dialog';

import * as validate from '../../../../actions/validateGeneralKeywords';
import * as constructValue from '../../../utils/keywordsValue.js';
import { triggerRunTimeChanges } from '../../../../actions/runTimeChanges';
import * as actionCreators from '../../../../actions/index';
import Checkbox from '../../../../components/CheckboxWrapper';
import { getKeywordsData, submitKeywordData } from '../../../../actions/index';
import FormSetCavNVCookie from './Form_SetCavNVCookie';


const styles = {
	text: {
		fontSize: 18,
		paddingLeft: 6
	},

	mainBlock: {
		paddingLeft: 10,
		paddingBottom: 20
	},
	row1: {
		paddingBottom: 20
	},
	row2: {
		paddingTop: 40
	},
	title: {
		fontSize: 16,
		padding: 8
	}
};
/*
* data --- table column name
* key ---- acting as a primary key
* 
*/


const style = {
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

class setCavNVCookie extends React.Component {

	constructor(props) {
		super(props);
		this.state = { openEnableExcptCapturingDialog: false }
		this.state = { disableAdvancedSettingTab1: !this.props.getAllKeywordData.BCICapturingCheckBox }
		this.state = { getAllKeywordData: this.props.getAllKeywordData }
		this.state = { enableExcptCheckBox: false, genExcptInMethod: false }
		this.state = { openSnackBar: false }
	}

	//this function is called first when component gets first loaded
	componentWillMount() {
		this.state = { openSnackBar: false }
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.getAllKeywordData != nextProps.getAllKeywordData) {
			this.setState({
				getAllKeywordData: nextProps.getAllKeywordData,
				setCavNVCookie: nextProps.getAllKeywordData.setCavNVCookie
			});
		}

	}

	/*
	*  functions for enableSetCavNVCookie Dialog
	*/

	enableSetCavNVCookieDialog() {
		this.setState({ openSetCavNVCookieDialog: true });
	}

	handleSetCavNVCookie(event, isInputChecked) {
		if (isInputChecked === true) {
			this.setState({ openSnackBar: true })
			this.submitForm({'setCavNVCookie':1});
		//	this.props.genExcptInMethod(true);
		}
		else {
			this.setState({ openCnfrmDisbleDialog: true })

		}
	}

	handleCancelSetCavNVCookie() {
		this.setState({ openSetCavNVCookieDialog: false,
						 
		 });
	}


	handleSubmitSetCavNVCookie() {
        console.log("handleSubmitSetCavNVCookie method called")
		this.refs.enableSetCavNVCookie.submit();
	}

	handleRequestClose() {
		this.setState({
			openSnackBar: false
		})
	}

	/*
	* Disable Dialog functions
	*/
	cnfrmDisableVal() {
		var data = { 'setCavNVCookie': '0' }
		this.submitForm(data);
		this.setState({
			openCnfrmDisbleDialog: false
		})

	}

	handleCancelDisableExcptVal() {
		this.setState({
			openCnfrmDisbleDialog: false,
			genExcptInMethod: true
		})
	}

	submitForm(formData) {
        console.log("formData.maxFpBucketSize--",formData.maxFpBucketSize)
	    let keywordData = Object.assign({}, this.props.getAllKeywordData.data);
        let setCavNVCookie;
        var length = Object.keys(formData).length ;
		console.log("length--",length)
        if(length > 1){
            let maxFpBucketSize = 4;

			if(!formData.enableNewFormat ){
                setCavNVCookie = "1%20"
            }
            else{
                setCavNVCookie = "2%20"
            }

			setCavNVCookie = "1%20"

            if(formData.cookieName != null){
                setCavNVCookie = setCavNVCookie + formData.cookieName
            }
            else{
                setCavNVCookie = setCavNVCookie + "CavNV" 
            }
            
                setCavNVCookie = setCavNVCookie +"%20"+ 2;


            maxFpBucketSize = formData.maxFpBucketSize != undefined ?formData.maxFpBucketSize :maxFpBucketSize;

            setCavNVCookie = setCavNVCookie+"%20"+maxFpBucketSize;

            keywordData.setCavNVCookie["value"] = setCavNVCookie;
        /*    if(!formData.enableNewFormat ){
                setCavNVCookie = "1%20"
            }
            else{
                setCavNVCookie = "2%20"
                maxFpBucketSize = formData.maxFpBucketSize != null ?formData.maxFpBucketSize :maxFpBucketSize;
            }

            if(formData.cookieName != null){
                setCavNVCookie = setCavNVCookie + formData.cookieName
            }
            else{
                setCavNVCookie = setCavNVCookie + "CavNV" 
            }
            if(formData.serviceMethodDepth != null){
                setCavNVCookie = setCavNVCookie +"%20"+ formData.serviceMethodDepth
            }
            else{
                setCavNVCookie = setCavNVCookie +"%20"+ 2;
            }
            setCavNVCookie = setCavNVCookie+"%20"+maxFpBucketSize;

            keywordData.setCavNVCookie["value"] = setCavNVCookie;   */
        }
        else{
			if(formData.setCavNVCookie != 0){
				 keywordData.setCavNVCookie["value"] = "1%20CavNV%202"
			}
			else{
             keywordData.setCavNVCookie["value"] = 0;
			}
        }
		this.props.submitKeywordData(keywordData, this.props.profileId);

		//action for runtime change
		//triggerRunTimeChanges(trData,trModeDetail,formData);
		let keywordDataList = [];
		keywordDataList.push("setCavNVCookie" + "=" + keywordData.setCavNVCookie)
        triggerRunTimeChanges(this.props.trData, this.props.trModeDetail, keywordDataList);
		this.handleCancelSetCavNVCookie();
	}

	render() {
		const actions = [
			<FlatButton className="dialog-modal cancel"
				label="Cancel"
				primary={true}
				onTouchTap={this.handleCancelSetCavNVCookie.bind(this)}
				/>,
			<FlatButton
				label="Submit"
				primary={true}
				keyboardFocused={true}
				disabled={this.props.profileDisabled}
				onClick={this.handleSubmitSetCavNVCookie.bind(this)}
				/>
		];

		const actionsDisable = [
			<FlatButton
				label="Cancel"
				primary={true}
				onTouchTap={this.handleCancelDisableExcptVal.bind(this)}
				/>,
			<FlatButton
				label="OK"
				primary={true}
				keyboardFocused={true}
				onClick={this.cnfrmDisableVal.bind(this)}
				/>
		]

		return (
			<div style={{ 'paddingLeft': 10, 'paddingTop': 10 }}>

				<div className="row"  >
					<div className="col-md-5">
						<Checkbox
							value="genExcptInMethod"
							label="Integrate with other Cavisson products"
							 disabled={this.props.profileDisabled}
							checked={this.state.setCavNVCookie}
							onCustomChange={this.handleSetCavNVCookie.bind(this)} />
						<i style={{ paddingLeft: 40 }}> Enable Cookie for capturing flowPath</i>
					</div>
					<div>

						<RaisedButton
							disabled={!this.state.setCavNVCookie}
							onClick={this.enableSetCavNVCookieDialog.bind(this)}
							style={{ width: 150 }}
							backgroundColor="#3a9e95"
							disabledLabelColor="#000"
							labelColor="#FFF"
							label="More Settings ..."
							labelStyle={{ fontSize: 12 }} />

					</div>
				</div>

				<DialogSetCavNVCookie className="dialog-modal"
					title="Integrate with other Cavisson products"
					actions={actions}
					modal={false}
					open={this.state.openSetCavNVCookieDialog}
					onRequestClose={this.handleClose}
					autoScrollBodyContent={true}
					titleStyle={styles.title}
					>
					<FormSetCavNVCookie ref="enableSetCavNVCookie" onSubmit={this.submitForm.bind(this)} />
				</DialogSetCavNVCookie>

				<Snackbar
					open={this.state.openSnackBar}
					message="Set Cav NV Cookie keyword with default values is enabled now."
					autoHideDuration={4000}
					onRequestClose={this.handleRequestClose.bind(this)}
					/>

				<ConfirmDialog
					title="Are you sure want to disable SetCavNVCookie keyword ?"
					actions={actionsDisable}
					modal={false}
					open={this.state.openCnfrmDisbleDialog}
					>
				</ConfirmDialog>
			</div>
		);
	}
}


function mapStateToProps(state) {
	return {
		getAllKeywordData: state.Keywords,
		trData: state.initialData.trData,
		trModeDetail: state.trModeDetail,
		profileDisabled: state.profileDisabled.disabled
	};
}

//method to dispatch actions to the reducers
function mapDispatchToProps(dispatch) {
	return bindActionCreators(actionCreators, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(setCavNVCookie);
