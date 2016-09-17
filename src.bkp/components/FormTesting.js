import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import SelectField from './SelectFieldWrapper';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import Toggle from './ToggleWrapper';

export const fields = [ 'firstName', 'when', 'lastName', 'email', 'sex', 'favoriteColor', 'employed', 'notes' ]

class SimpleForm extends Component {

  handleChange(event,value)
  {
    alert("event",event);
  }
  render() {
    const {
      fields: { firstName, when, lastName, email, sex, favoriteColor, employed, notes },
      handleSubmit,
      resetForm,
      submitting
      } = this.props
    return (<form onSubmit={handleSubmit( data => alert(JSON.stringify(data)) )}>
        <div>
          <TextField
              {...firstName}
              hintText="Hint Text"
          /><br />
          <SelectField value={"Never"} {...when} customOnChange={(event,index,value) =>{console.log("event inside Component",event); console.log("index inside Component",index); console.log("value inside Component",value);} }>
          <MenuItem value={"Never"} primaryText="Never" />
          <MenuItem value={"EveryNight"} primaryText="Every Night" />
          <MenuItem value={"Weeknights"} primaryText="Weeknights" />
          <MenuItem value={"Weekends"} primaryText="Weekends" />
          <MenuItem value={"Weekly"} primaryText="Weekly" />
          </SelectField><br />
          <Toggle
            {...employed}
            label="Simple"                        
          />
          <br />
          <RadioButtonGroup name="shipSpeed" defaultSelected="not_light" {...lastName}>
            <RadioButton
              value="light"
              label="Simple"
              
            />
            <RadioButton
              value="not_light"
              label="Selected by default"
              
            />
            <RadioButton
              value="ludicrous"
              label="Custom icon"
              
            />
          </RadioButtonGroup>
          
        </div>

        <div>
          <button type="submit" disabled={submitting}>
            {submitting ? <i/> : <i/>} Submit
          </button>
          <button type="button" disabled={submitting} onClick={resetForm}>
            Clear Values
          </button>
        </div>  
      </form>
    )
  }
}

SimpleForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
}

export default reduxForm({
  form: 'testing',
  fields
})(SimpleForm)
