import React, { PropTypes } from 'react'
import {reduxForm} from 'redux-form';
import MenuItem from 'material-ui/MenuItem';

import DropDownMenu from '../../components/SelectFieldWrapper';

export const fields = [ 'serverId','profileId' ]

  const styles = {
    customWidth: {
      width: 300
    }
  };

class Form_Server extends React.Component {

  constructor(props) {
  super(props);
  console.log("in form topo-- !!!",this.props.data)
  console.log("this.props.data[2]value - ")
  this.state={valueProf:1}
 

  }



handleChangeProfile(event, index, value){
  console.log("inside handleChangeProfile--",value)
  this.setState({valueProf:value})
}

componentWillMount() {
    console.log("inside will mount")  
  }

 componentWillReceiveProps(nextProps)
  {
    
  }

  render() {
     const { fields: {serverId, profileId}, resetForm, handleSubmit,onSubmit, submitting } = this.props
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
Form_Server.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
}

export default reduxForm({ // <----- THIS IS THE IMPORTANT PART!
  form: 'contact',                           // a unique name for this form
  fields
},
  state => ({ // mapStateToProps
  data:state.initialData.homeData,
  initialValues :state.serverData.serverInitializeForm
})
) (Form_Server);
