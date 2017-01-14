//Importing React components
import React, { PropTypes } from 'react'
import {reduxForm} from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TextField from 'material-ui/TextField';
import Is from 'is_js';
import ContentSend from 'material-ui/svg-icons/content/send';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

//Importing files
import Toggle from '../../../../components/ToggleWrapper';
import AttrValComponent from './AttrValComponent';
import {addingValData,disableSubmitButtonState} from '../../../../actions/index';
import Checkbox from '../../../../components/CheckboxWrapper';
import AddNewButton from 'material-ui/FloatingActionButton';
import AddIcon from 'material-ui/svg-icons/content/add';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';



export const fields = ['attrName','complete','specific','attrValues']

const NewButtonstyle = {
    left:3,
    top:-7
};

const errMsgCss = {
  top:-12,
  left:'10px',
  color:'#ff0000'
}

class Form_SessionAttrAdd extends React.Component {

  constructor(props) {
  super(props);
  this.handleChange=this.handleChange.bind(this);
  this.valNameChange = this.valNameChange.bind(this)
  this.lbChange = this.lbChange.bind(this);
  this.rbChange = this.rbChange.bind(this);
  this.state ={enable:false,
               count :0,
               rows:[],
               valName:'',
               lb:'',
               rb:'',
              'valDataCss':'hidden',
              valDataArr :[],
              'errMsgCss':'hidden'

        }
  this.del = this.del.bind(this);
  this.submitValType = this.submitValType.bind(this);
 
  }

  specificChkBoxChange(event,isInputChecked){
      console.log("checked---",isInputChecked)
      var valDataCss = isInputChecked ?'show':'hidden';
      this.setState({valDataCss:valDataCss,
                      specificChkBox:isInputChecked
        })
    
     this.props.disableSubmitButtonState();
  }

  completeChkBoxChange(event,isInputChecked){
      var valDataCss = isInputChecked && !this.state.specificChkBox ?'hidden':'show';
      this.setState({valDataCss:valDataCss})
  }

  submitValType(){
    console.log("submitValType method called--",this.state.valName)
    console.log("validation--",this.state.lb)
    console.log("hhh--",this.state.rb)
    if(this.state.valName == '' || this.state.lb == '' || this.state.rb == '' ){
       this.setState({errMsgCss:'show'})
    }
    else{
      console.log("in else c ondition")
       this.setState({count:this.state.count+1,
                      errMsgCss:'hidden'
        })
       var valData = {'valName':this.state.valName,
                     'lb':this.state.lb,
                     'rb':this.state.rb,
                     'id':this.state.count
    }
    this.state.valDataArr.push(valData);
    }
  }

handleChange(event,index,value){  
  console.log("event-----",event)
  console.log("index------",index)                             
  console.log("on handleChange----",value)

}

  componentWillMount() {
     console.log("state props--",this.props)
     console.log("state--",this.state)
  }

handleCheck(event,value){
  console.log("inside check value - ",value)
}

editValArr(id,key,value){
  console.log("edit method callled")
  this.state.valDataArr.map(function(val){
    console.log(val)
    if(id == val.id){
      val[key] = value;
    }
  })
  console.log("arr--", this.state.valDataArr)
}


valNameChange(value,id){
    console.log("value-valNameChange method--",value)
    console.log("id--",id)
    this.setState({valName:value})
    this.editValArr(id,'valName',value)
}

lbChange(value,id){
    this.setState({lb:value})
    this.editValArr(id,'lb',value)
}

rbChange(value,id){
    this.setState({rb:value})
    this.editValArr(id,'rb',value)
}

del(val){
  console.log("val--",val)
  let arr = this.state.valDataArr;
  arr = arr.filter(function(value){
   if(val == value.id)
   {
    return false;
   } 
   else
   return true;
  })
  console.log("arr---",arr)
  this.setState({valDataArr:arr})

}

handleSubmitValType(attrValues){
  
  console.log("handleSubmitValType method called")
    if(this.state.valName == '' || this.state.lb == '' || this.state.rb == '' ){
       this.setState({errMsgCss:'show'})
    }
    else{
       this.setState({count:this.state.count+1})
       var valData = {'valName':this.state.valName,
                     'lb':this.state.lb,
                     'rb':this.state.rb,
                     'id':this.state.count
    }
    var finalArr = Object.assign([],this.state.valDataArr)
    finalArr.push(valData)
    attrValues.onChange(finalArr) ;
    
     this.props.disableSubmitButtonState();
    }
 }

renderSessionAttrValues(arr)
{
 let that = this;
 let component = arr.map(function(val){
                 return <div >
                    <AttrValComponent value={val} valNameChange={that.valNameChange.bind(this)} lbChange = {that.lbChange.bind(this)} rbChange={that.rbChange.bind(this)} />
                    <div className="row col-md-1">
                    <IconButton style = {{position:'relative',left:'-3px'}} 
                    tooltip="delete" onTouchTap={that.del.bind(this,val.id)}><FontIcon color='#D3D3D3' className="material-icons">delete</FontIcon></IconButton>
                    </div>
                   </div>
  })

  return(
    <div>
      {component}
    </div>
  ); 
}

  render() {

     const { fields: {attrName,complete,specific,attrValues}, resetForm, handleSubmit,onSubmit, submitting} = this.props
  return (
    <form >
    <div className ="row">
        <div className ="col-md-12">
          <TextField
              // hintText="Hint Text"
               floatingLabelText=" Name"
               {...attrName}
               />
        
    </div>
    </div>

    <div className ="row ">
        <div className ="col-md-5">
              <Checkbox
              {...complete}
              value="complete"
              label="Complete"
              onCustomChange = {this.completeChkBoxChange.bind(this)} />
        
        </div>
        <div className = "col-md-3">
             <Checkbox
              {...specific}
              value="specific"
              label="Specific"
             onCustomChange = {this.specificChkBoxChange.bind(this)} />
            
        </div>
    </div>

     <div className = {`row ${this.state.valDataCss}`} style ={{'paddingTop':3,'paddingLeft':6}} >
     
        <h4>Add Value Types </h4>
      
        <div className = "row col-md-8 ">
          <div className = "col-md-2">
        <AddNewButton  style={NewButtonstyle} onTouchTap={this.submitValType.bind(this,'add')} mini={true}>
            <AddIcon />
         </AddNewButton>
        </div>

          <div className =  {`col-md-5 ${this.state.errMsgCss}`}>
           <p style ={errMsgCss}>Fields are empty</p>
        </div>
      </div>

       
        {this.renderSessionAttrValues(this.state.valDataArr)}
        <AttrValComponent value={{}} valNameChange={this.valNameChange.bind(this)} lbChange = {this.lbChange.bind(this)} rbChange={this.rbChange.bind(this)}/>
       
       </div>

       <div  className = {`row col-md-3 ${this.state.valDataCss}`}  style={{left:'500'}}>
      <RaisedButton className ="pull-right"
        label="Done"
         backgroundColor = "#D3D3D3" 
        onClick={this.handleSubmitValType.bind(this,attrValues)}
        style={{color:'#000'}}>
      
       </RaisedButton>
       </div>
        
    

    <div className="hidden">
      <TextField
         {...attrValues}
        floatingLabelText=" Name"
        value={this.state.valDataArr}
      />
        
    </div>

    
    </form>
    );
  }
}


Form_SessionAttrAdd.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
}

export default reduxForm({ // <----- THIS IS THE IMPORTANT PART!
  form: 'Session Attribute Monitor ',        // a unique name for this form
  fields
},
  state => ({ // mapStateToProps
    valData:state.sessionAttrMonitor.valData
}),
 {
  addingValData:addingValData ,
  disableSubmitButtonState:disableSubmitButtonState   
 } // mapDispatchToProps (will bind action creator to dispatch)
) (Form_SessionAttrAdd);
