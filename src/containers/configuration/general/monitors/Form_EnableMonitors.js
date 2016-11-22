//Importing React components
import React, { PropTypes } from 'react'
import {reduxForm} from 'redux-form';

//Importing files
import Checkbox from '../../../../components/CheckboxWrapper';
import DropDownMenu from '../../../../components/SelectFieldWrapper';


export const fields = [ 'enableBTMonitor'];
const initialValues = { 
  'enableBTMonitor' : true, 
}


const styles = {
  input: {
    width: 150,

  },
  block:{
    paddingTop:10
  },
  customWidth: {
    width: 300
  }
  
};

class Form_EnableMonitors extends React.Component {

  constructor(props) {
    super(props);
    console.log("in form topo-- !!!",this.props)
    this.state = { 'enableBTMonitor'  :this.props.initialData.enableBTMonitor === '1'
   }
 }

 componentWillReceiveProps(nextProps)
 {
   if(this.props.initialData != nextProps.initialData){
    this.setState({enableBTMonitor:nextProps.initialData.enableBTMonitor === '1'
  })
  }
}

enableBT(event,isInputChecked){
  this.setState({enableBTMonitor:isInputChecked})
}


render() {
 const { fields: {enableBTMonitor}, resetForm, handleSubmit,onSubmit, submitting } = this.props
 return (
  <form >
  <div className = "row" style = {styles.block}>

  <div className ="col-md-5">
  <Checkbox
  {...enableBTMonitor}
  label="BT Monitor"
  value = "btMonitor"
  checked  = {this.state.enableBTMonitor}
  onCustomChange ={this.enableBT.bind(this)}  />
   <p style={{paddingLeft:35}}> (Enable/Disable BT Monitor)</p>

  </div>
 
  </div>        


  </form>
  );
}
}
Form_EnableMonitors.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
}

export default reduxForm({ // <----- THIS IS THE IMPORTANT PART!
  form: 'contact',                           // a unique name for this form
  fields
},
  state => ({ // mapStateToProps
   initialValues :{
     enableBTMonitor:state.Keywords.initializeKeywords.enableBTMonitor
   },
   initialData : state.Keywords.initializeKeywords

 })
  ) (Form_EnableMonitors);
