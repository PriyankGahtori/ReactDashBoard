import React, { PropTypes } from 'react'
import {reduxForm} from 'redux-form';


export const fields = [ 'topoName' ]

  const styles = {
    customWidth: {
      width: 300
    }
  };

class GenerateFile extends React.Component {

  constructor(props) {
  super(props);
  }


componentWillMount() {
    console.log("inside will mount")  
  }

 componentWillReceiveProps(nextProps)
  {
    
  }

  render() {
     const { fields: { topoName}, resetForm, handleSubmit,onSubmit, submitting } = this.props
     return (
        <form >
            <div className ="row" >
                
            </div>
       </form>
     );
   }
}
GenerateFile.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
}

export default reduxForm({ // <----- THIS IS THE IMPORTANT PART!
  form: 'GenerateFile',                           // a unique name for this form
  fields
},
  state => ({ // mapStateToProps
  topoData:state.initialData
})
) (GenerateFile);
