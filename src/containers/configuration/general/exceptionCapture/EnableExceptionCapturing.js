
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
import DialogEnableExcptCapturing from 'material-ui/Dialog';
import Checkbox from '../../../../components/CheckboxWrapper';

//Importing files
import * as validate from '../../../../actions/validateGeneralKeywords';
import * as constructValue from './ModifyValue.js';
import { triggerRunTimeChanges } from '../../../../actions/runTimeChanges';
import * as actionCreators from '../../../../actions/index';
import { getKeywordsData, submitKeywordData } from '../../../../actions/index';
import FormEnableExcptCapturing from './Form_EnableExcptCapturing';


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
		fontSize: '16px',
		padding: '8px'
	}
};
/*
* data --- table column name
* key ---- acting as a primary key
* 
*/

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

class EnableExceptionCapturing extends React.Component {

	constructor(props) {
		super(props);
		this.state = { openEnableExcptCapturingDialog: false }
		this.state = { disableAdvancedSettingTab1: !this.props.getAllKeywordData.BCICapturingCheckBox }
		this.state = { getAllKeywordData: this.props.getAllKeywordData }
		this.state = { enableExcptCheckBox: this.props.getAllKeywordData.enableExcptCheckBox }
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
				enableExcptCheckBox: nextProps.getAllKeywordData.enableExcptCheckBox
			});
		}

		if (this.props.getAllKeywordData.ExcptCapturingCheckBox != nextProps.getAllKeywordData.ExcptCapturingCheckBox)
			this.setState({ disableAdvancedSettingTab1: !nextProps.getAllKeywordData.ExcptCapturingCheckBox })

	}

	handleDReqCheckboxChange(event, value) {
	}
	/*
	*  functions for enableBCICapturing Dialog
	*/

	enableExcptCapturingDialog() {
		this.setState({ openEnableExcptCapturingDialog: true });
	}

	handleExcptCapture(event, isInputChecked) {
		if (isInputChecked === true) {
			this.setState({
				openSnackBar: true
			})
			this.submitForm(validate.setDefaultValuesExcptCapturing(this.props.getAllKeywordData.data));
			this.props.enableExcptCheckBoxStatus(true);
		}
		else {
			this.setState({ openCnfrmDisbleDialog: true })
		}
	}

	handleCancelEnableExcptCapturing() {
		this.setState({ openEnableExcptCapturingDialog: false });
	}

	handleSubmitEnableExcptCapturing() {
		this.refs.enableExcptCapturingForm.submit();
	}

	handleRequestClose() {
		this.setState({
			openSnackBar: false
		})
	}

	/*
	* Disable Dialog functions
	*/
	cnfrmDisableExcptVal() {
		this.submitForm(validate.disabledExcptCapturing);
		this.setState({
			openCnfrmDisbleDialog: false
		})
	}

	handleCancelDisableExcptVal() {
		this.setState({
			openCnfrmDisbleDialog: false,
			enableExcptCheckBox: true
		})
	}

	submitForm(formData) {
		let keywordData = Object.assign({}, this.props.getAllKeywordData.data);
		let keywordDataList = [];

		/*
		* final data is data that is fetched from server and 
		* its value is updated according to user input,
		* Final data object contains all the keywords  .
		* instrExceptions  = 1%201%200%2029
		* 
		*/

		var instrVal = 0
		var length = Object.keys(formData).length

		/* below check handles the case of disabling the keyword/enabling the kwyword i.e
			  *  when formData = {"instrExceptions":'0'}
			  *  there is no need to call constructVal function
			  */

		if (length > 1) {
			instrVal = constructValue.instrExceptionValue(formData);
		}
		else
			instrVal = formData.instrExceptions;

		keywordData.instrExceptions["value"] = instrVal;

		this.props.submitKeywordData(keywordData, this.props.profileId);

		//action for runtime change
		//triggerRunTimeChanges(trData,trModeDetail,formData);

		keywordDataList.push("instrExceptions" + "=" + instrVal);
		triggerRunTimeChanges(this.props.trData, this.props.trModeDetail, keywordDataList);
		this.handleCancelEnableExcptCapturing();
	}

	render() {
		const actions = [
			<FlatButton
				label="Cancel"
				primary={true}
				onTouchTap={this.handleCancelEnableExcptCapturing.bind(this)}
				/>,
			<FlatButton
				label="Submit"
				primary={true}
				keyboardFocused={true}
				onClick={this.handleSubmitEnableExcptCapturing.bind(this)}
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
				onClick={this.cnfrmDisableExcptVal.bind(this)}
				/>
		]

		return (
			<div>

				<div className="row" style={{ paddingTop: 10 }}>
					<div className="col-md-5">
						<Checkbox
							value="enableExceptionCapturing"
							label="Enable Exception Capturing"
							checked={this.state.enableExcptCheckBox}
							onCustomChange={this.handleExcptCapture.bind(this)} />
						<i style={{ paddingLeft: 40 }}>Capture Exception occurred in application </i>
					</div>
					<div className="col-md-2">
						<RaisedButton
							disabled={!this.state.enableExcptCheckBox}
							onClick={this.enableExcptCapturingDialog.bind(this)}
							style={{ width: 150 }}
							backgroundColor="#18494F"
							disabledLabelColor="#000"
							labelColor="#FFF"
							label="More Settings ..."
							labelStyle={{ fontSize: 12 }} />
					</div>
				</div>

				<DialogEnableExcptCapturing
					title="Exception Capturing Settings"
					actions={actions}
					modal={false}
					open={this.state.openEnableExcptCapturingDialog}
					onRequestClose={this.handleClose}
					autoScrollBodyContent={true}
					titleStyle={styles.title}
					>

					<FormEnableExcptCapturing ref="enableExcptCapturingForm" onSubmit={this.submitForm.bind(this)} />
				</DialogEnableExcptCapturing>

				<Snackbar
					open={this.state.openSnackBar}
					message="Exception capturing keywords with default values is enabled now."
					autoHideDuration={4000}
					onRequestClose={this.handleRequestClose.bind(this)}
					/>

				<ConfirmDialog
					title="Are you sure want to disable the Exception Capturing Settings ?"
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
		trModeDetail: state.trModeDetail
	};
}

//method to dispatch actions to the reducers
function mapDispatchToProps(dispatch) {
	//const actionMap = { loadInitTreeData: bindActionCreators(fetchTreeData, dispatch) };
	//return actionMap;
	return bindActionCreators(actionCreators, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(EnableExceptionCapturing);
