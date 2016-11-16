import React, { PropTypes } from 'react'
import {reduxForm} from 'redux-form';
import {RadioButton} from 'material-ui/RadioButton';
import MultiSelect from '../components/MultiSelectWrapper';
import {Card} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import RaisedButton  from 'material-ui/RaisedButton';

export const fields = ['headersSelected','name'];
  var options = [
    { value: 'one', label: 'One' },
    { value: 'two', label: 'Two' },
    { value: 'three', label: 'Three' },
    { value: 'four', label: 'Four' },
    { value: 'five', label: 'Five' }
   ];

class Form_EnableReqFullFP extends React.Component {
 

  constructor(props) {
    super(props);
    this.state = {expand:false,
                  enableHttpReqFPCheckBox: false,
                  UrlQueryHttp:false,
                  allHttpHeaders:false,
                  textFieldValue:true,
                  captureSelectedValue:1,
                  multiSelectValue: "1,2,3,4,4,4,4,4"

                 }
    this.updateSelected = this.updateSelected.bind(this);             
  }

 updateSelected(value){
    
    console.log("updateSelected function called---",value)
   // console.info("props ",this.props.values)
    console.info("headersSelected ",this.props)
  //  this.props.fields.headersSelected.onUpdate({value:value});
    this.setState({multiSelectValue : value });
  }


  submit(data){
    console.log("data ----",data)
  }

  render() {
    const { fields: {headersSelected,name}, resetForm, handleSubmit,submitting } = this.props
    return (   
      <form onSubmit ={handleSubmit(this.submit.bind(this))}>
      <div>
        <MultiSelect multi
            {...headersSelected}
          name ="HttpHeaders"
          value = {this.state.multiSelectValue}  
          options = {options} 
          customOnChange = {this.updateSelected.bind(this)}
        
        />

          <TextField
                  hintText="Hint Text"
                  floatingLabelText="Set Cav NV Cookie"
                  {...name}
              />

       </div>
        <RaisedButton  label="submit" type="submit" disabled={submitting}>
                     {submitting ? <i/> : <i/>} 
          </RaisedButton >
 </form>
    );
  }
}
 
Form_EnableReqFullFP.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
}
export default reduxForm({
  form: 'httpReqForm',
  fields,
},
  state => ({ // mapStateToProps
}),
  
  { 
   
 } // mapDispatchToProps (will bind action creator to dispatch)
)(Form_EnableReqFullFP);