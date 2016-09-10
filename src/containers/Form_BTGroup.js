import React, { PropTypes } from 'react'
import {reduxForm} from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import Is from 'is_js';
import {ListOfGroupNames} from '../actions/index';
import DropDownMenu from '../components/SelectFieldWrapper';
import MenuItem from 'material-ui/MenuItem';
import {List, ListItem} from 'material-ui/List';
import ContentSend from 'material-ui/svg-icons/content/send';
export const fields = ["menuGroupName","groupName","chkNewGroup"];

const styles = {
  block: {
    maxWidth: 250,
    paddingBottom:5
  },
   toggle: {
      marginTop:30 ,
      paddingLeft:80
  },
  customWidth: {
      width: 200
    },
  checkbox: {
    marginBottom: 16,
    paddingTop:35
  }
};


class Form_BTGroup extends React.Component {

  constructor(props) {
  super(props);
  console.log("inside Form BT Group")
  this.handleChange=this.handleChange.bind(this);
  this.state = {ListOfGroupNames: {data:[]}};
  this.state ={listOfGroupNames:this.props.listOfGroupNames};
  this.state ={enable:false}
  this.state ={'dynamicReqDiv' : false}
  this.state = {disabledGrpNames:false,disabledtxtGrpName: true};
  this.handleCheck=this.handleCheck.bind(this);
  }

handleChange(event,index,value){  
  console.log("event-----",event)
  console.log("index------",index)                             
  console.log("on handleChange----",value)
}

  componentWillMount() {
    console.log("callng loadGroupNames-------------")
     this.props.groupList();
  }

handleCheck(event,value)
{
  this.setState({'dynamicReqDiv': value})  
  this.setState({disabledGrpNames: !this.state.disabledGrpNames});
  this.setState({disabledtxtGrpName: !this.state.disabledtxtGrpName});
}


   //method to create comboBox of BT Group names
  renderDropDown(menuGroupName){
    console.log("inside ListOfGroupNames.length - ",this.props)

    if(this.props.BTPattern.listOfGroupNames.length > 0)
    {

        let menuItems= this.props.BTPattern.listOfGroupNames.map((data, index) => (
                    <MenuItem 
                        //value={data.id}
                        value = {`{"id":"${data.id}","name":"${data.groupName}"}`}  
                        primaryText={data.groupName}/>
                )); 
          return(
             <DropDownMenu 
               {...menuGroupName}
              value={this.state.value} 
              style={styles.customWidth}
              autoWidth={false}
              customOnChange={this.handleChange.bind(this)} 
              floatingLabelText="Select Group Name"   
              disabled={this.state.disabledGrpNames} 
             >
             {menuItems}
             </DropDownMenu>
            );
        }
     }


  render() {
     const { fields: {menuGroupName ,groupName,chkNewGroup}, resetForm, handleSubmit,onSubmit, submitting} = this.props
  return (
    <form >
  <div className ="row">
         <div className ="col-md-12">
           {this.renderDropDown(menuGroupName)}  
        </div>

      <div className ="row">
           <div className ="col-md-5">
           <Checkbox
           {...chkNewGroup}
           style={styles.checkbox}
           label="Add New BT Set Name"
           onCheck={this.handleCheck}
           />
          </div>
          <div className ="col-md-7">
           <TextField
            // hintText="Hint Text"
            {...groupName}
            disabled= {this.state.disabledtxtGrpName}
            floatingLabelText="New Group name"
            />
          </div>
      </div>
     </div>   
    </form>
    );
  }
}

Form_BTGroup.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
}

export default reduxForm({ // <----- THIS IS THE IMPORTANT PART!
  form: 'Bussiness Transaction pattern ',        // a unique name for this form
  fields,
  
},
  state => ({ // mapStateToProps
     BTPattern : state.BTPattern
}),
  {
    groupList : ListOfGroupNames
  }
 
) (Form_BTGroup);

