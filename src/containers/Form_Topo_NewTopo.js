import React, { PropTypes } from 'react'
import {reduxForm} from 'redux-form';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

export const fields = [ 'topoName' ]

  const styles = {
    customWidth: {
      width: 300
    }
  };

class NewApplication extends React.Component {

  constructor(props) {
  super(props);
  console.log("in form topo-- !!!",this.props.topoData[2])
  console.log("this.props.topoData[2]value - ",this.props.topoData[2].value[0].id)
  this.state = {
                 value:this.props.topoData[2].value[0].id
               };
  }

handleChange(event, index, value){
  console.log("inside handleChange")
  this.setState({value})
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
                <DropDownMenu 
                  value={this.state.value}                
                  style={styles.customWidth}
                  autoWidth={false}
                  onChange={this.handleChange.bind(this)} 
                >

                {
                  /* Iterate over topology data */
                  this.props.topoData[2].value.map((data, index) => (   
                  <MenuItem value={data.id} key={data.id}primaryText={data.name}/>
                  ))
                }
                 
                </DropDownMenu>
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
  fields
},
  state => ({ // mapStateToProps
  topoData:state.initialData
})
) (NewApplication);
