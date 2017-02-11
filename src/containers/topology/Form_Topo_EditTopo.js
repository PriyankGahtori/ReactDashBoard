//Importing react components
import React, { PropTypes } from 'react'
import {reduxForm} from 'redux-form';
import MenuItem from 'material-ui/MenuItem';

//Importinf files
import DropDownMenu from '../../components/SelectFieldWrapper';

export const fields = [ 'dcTopoId','profileId' ]

  const styles = {
    customWidth: {
      width: 300
    }
  };

class NewApplication extends React.Component {

  constructor(props) {
  super(props);
  this.state={valueProf:1}
  }



handleChangeProfile(event, index, value){
  this.setState({valueProf:value})
}

componentWillMount() {
    console.log("inside will mount")  
  }

 componentWillReceiveProps(nextProps)
  {
  }

  render() {
     const { fields: {dcTopoId, profileId}, resetForm, handleSubmit,onSubmit, submitting } = this.props
     return (
        <form >
            <div className ="row" >
              

              <div className = "col-md-6">
                <DropDownMenu
                {...profileId} 
                  value={this.state.valueProf}                
                  style={styles.customWidth}
                  autoWidth={false}
                  customOnChange={this.handleChangeProfile.bind(this)}
                  floatingLabelText = "Profile" 
                >

                {
                  /* Iterate over Profile data */
                  this.props.data[1].value.map((val, index) => (   
                  <MenuItem value={val.id} key={val.id} primaryText={val.name}/>
                  ))
                }
                 
                </DropDownMenu>
                </div>
            </div>
       </form>
     );
   }
}
NewApplication.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
}

export default reduxForm({ // <----- THIS IS THE IMPORTANT PART!
  form: 'contact',                           // a unique name for this form
  fields,
  
},
  state => ({ // mapStateToProps
  data:state.initialData.homeData,
  initialValues: state.topologyData.topoInitializeForm,
  initialData : state.topologyData.topoInitializeForm
})
) (NewApplication);
