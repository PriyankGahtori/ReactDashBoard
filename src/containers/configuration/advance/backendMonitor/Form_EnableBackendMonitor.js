//Importing React components
import React, { PropTypes } from 'react'
import {reduxForm} from 'redux-form';

//Importing files
import Checkbox from '../../../../components/CheckboxWrapper';
import DropDownMenu from '../../../../components/SelectFieldWrapper';


export const fields = [ 'enableBackendMonitor'];
const initialValues = { 
                'enableBackendMonitor' : true, 
              }

  
  const styles = {
  input: {
    width: 150,

  },
  block:{
    paddingTop:10
  },
  setCavNVCookieBlock:{
    marginTop:-30
  },
  customWidth: {
      width: 300
    }
  
};

class Form_EnablebackendMonitor extends React.Component {

  constructor(props) {
  super(props);
  console.log("in form topo-- !!!",this.props)
  this.state = { 
                 'enableBackendMonitor'  :this.props.initialData.enableBackendMonitor === '1'
    }
  }


componentWillMount() {
   
  }

 componentWillReceiveProps(nextProps)
  {
     if(this.props.initialData != nextProps.initialData){
        this.setState({enableBackendMonitor:nextProps.initialData.enableBackendMonitor === '1'
        })
    }
  }

 enableBackMon(event,isInputChecked){
    console.log("isINputChecked - ",isInputChecked)
    this.setState({enableBackendMonitor:isInputChecked})
    console.log("enableBackendMonitor - ",this.state.enableBackendMonitor)
  }


  render() {
     const { fields: {enableBackendMonitor}, resetForm, handleSubmit,onSubmit, submitting } = this.props
     return (
        <form >
             <div className = "row" style = {styles.block}>
              
            <div className ="col-md-8">
            <Checkbox
                  {...enableBackendMonitor}
                  value = "backendMonitor"
                  label = "Backend Monitor"
                  checked  = {this.state.enableBackendMonitor}
                  onCustomChange ={this.enableBackMon.bind(this)} 
             />
            </div>
         
      </div>        

       
       </form>
     );
   }
}
Form_EnablebackendMonitor.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
}

export default reduxForm({ // <----- THIS IS THE IMPORTANT PART!
  form: 'contact',                           // a unique name for this form
  fields
},
  state => ({ // mapStateToProps
   initialValues :{
                   enableBackendMonitor:state.Keywords.initializeKeywords.enableBackendMonitor
                  },
     initialData : state.Keywords.initializeKeywords

})
) (Form_EnablebackendMonitor);
