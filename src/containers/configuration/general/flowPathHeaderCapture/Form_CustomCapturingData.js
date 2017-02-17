//Import react components
import React, { PropTypes } from 'react'
import {reduxForm} from 'redux-form';
import TextField from 'material-ui/TextField';
import Is from 'is_js';
import MenuItem from 'material-ui/MenuItem';
import Checkbox from '../../../../components/CheckboxWrapper';
import RadioButtonGroup from '../../../../components/RadioButtonGroupWrapper';
import RadioButton from 'material-ui/RadioButton';



export const fields = ['capturingMethod','enableAddMethodBasedData', 'enableAddHttpReqHdr', 'enableAddHttpResHdr'];


const styles = {
  customWidth: {
    width: 300
  }
};





class Form_CustomCapturingData extends React.Component {

  constructor(props) {
    super(props);
    this.state = {value:this.props.initialData != null ? this.props.initialData.topoId :'-1'}

  }

  componentWillMount() {
   
  }


  componentWillReceiveProps(nextProps)
  {
    if(this.props.initialData != nextProps.initialData){
      this.setState({value:nextProps.initialData.topoId});
    }
}

  handleChangeTopology(event, index, value){
    this.setState({value:value})
  }
  handleCaptureCustomData(evt,value){
    this.setState({enableAddMethodBasedData:value})
  }

  handleHttpReqHdrChange(evt,value){
    this.setState({enableAddHttpReqHdr:value})
  }

  handleHttpResHdrChange(evt,value){
    this.setState({enableAddHttpResHdr:value})
  }


  render() {

   const { fields: { capturingMethod,enableAddMethodBasedData, enableAddHttpReqHdr, enableAddHttpResHdr}, resetForm, handleSubmit, submitting } = this.props
   return (
     <form>
  
     <div className="row col-md-8">
          <RadioButtonGroup 
          {...capturingMethod}
          name = "capturingMethod" 
          //defaultSelected={"enableAddMethodBasedData"}
          >
        <RadioButton
            value="enableAddMethodBasedData"
            label="Method based Capture"  
        />
        <RadioButton
            value="enableAddSessionAttrBasedData"
            label="Specific Session Attribute Based Capture"  
        />
         <RadioButton
            value="enableAddHttpReqHdr"
            label="Capture Http Request Header"  
  />
        </RadioButtonGroup>
      
     </div>

      </form>
      );
    }
  }
  Form_CustomCapturingData.propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired
  }

  export default reduxForm({ // <----- THIS IS THE IMPORTANT PART!
    form: 'contact',                           // a unique name for this form
    fields
    
  },
  state => ({ // mapStateToProps
  }))(Form_CustomCapturingData);
