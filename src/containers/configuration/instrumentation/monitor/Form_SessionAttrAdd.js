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
import Checkbox from '../../../../components/CheckboxWrapper';
import AddNewButton from 'material-ui/FloatingActionButton';
import AddIcon from 'material-ui/svg-icons/content/add';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import DataGrid from '../../../../components/DCDetailTable';

//Importing files
import Toggle from '../../../../components/ToggleWrapper';
import AttrValComponent from './AttrValComponent';
import {addingValData,disableSubmitButtonState,toggleAddCustomCapture} from '../../../../actions/index';




export const fields = ['attrName','complete','specific','attrValues']


const validate = values=>{
  const errors ={}   
    if(!values.attrName)
    errors.attrName = 'Required'
        
   else if(Number(values.attrName))
    errors.attrName = "Please enter only characters."

   else if(!Is.alphaNumeric(values.attrName))
      errors.attrName = 'Special characters are not allowed.'
    
     if(!values.complete && !values.specific)
     errors.complete = 'Must select any of the  Attribute Type'

      return errors;
}


const NewButtonstyle = {
    left:3,
    top:-7
};

const  error={
        fontSize: 12,
        color: 'red',
        paddingLeft:3,
    };



var columns = {
                "key" : "id",
                "data":['Value Name', 'Lower Bound','Right Bound', 'ID'],
                "field":['valName', 'lb', 'rb','id']
              };  

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
              'errMsgCss':'hidden',
              'addCompCSS':'hidden',
              rendeAttrValComponent:false

        }
  this.del = this.del.bind(this);
  this.submitValType = this.submitValType.bind(this);
  this.submitForm = this.submitForm.bind(this);
 
  }

  componentWillReceiveProps(nextProps){
    
     if(nextProps.isActive != null && nextProps.isActive){
       console.log("nextProps.active  ----",nextProps.active)
       
     }
  }

  specificChkBoxChange(event,isInputChecked){
      console.log("checked---",isInputChecked)
      var valDataCss = isInputChecked ?'show':'hidden';
      this.setState({valDataCss:valDataCss,
                      specificChkBox:isInputChecked
        })
    
  }

  completeChkBoxChange(event,isInputChecked){
      console.log("this.state.specificChkBox--",this.state.specificChkBox)
      var valDataCss;
      if(isInputChecked){
        valDataCss = 'hidden'
        if(this.state.specificChkBox)
           valDataCss = 'show'
      }
      
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

onCustomValTypeChange(val,customValTypeName){
  
        this.setState({customValType:val,
                      customValTypeName:customValTypeName
        })
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
  
  console.log("handleSubmitValType method called--",attrValues)
  console.log("this.state.valName--",this.state.valName)
     if(this.state.valName == '' || this.state.lb == '' || this.state.rb == '' ){
       this.setState({errMsgCss:'show'})
    }
    else{
      console.log("in else condition")
       this.setState({count:this.state.count+1,
                      errMsgCss:'hidden',
                      addCompCSS:'hidden',
                      renderAttrValComponent:false
        })
       var valData = {'valName':this.state.valName,
                     'lb':this.state.lb,
                     'rb':this.state.rb,
                     'id':this.state.count,
                     'customValTypeName':this.state.customValTypeName,
                     'type':this.state.customValType
    }
    this.state.valDataArr.push(valData);
    attrValues.onChange(this.state.valDataArr) ;
    }
 }

renderSessionAttrValues(arr)
{
 let that = this;
 console.log("arr--",arr)
// arr.push({'paramName':'','lb':'','rb':''});
 let component = arr.map(function(val){
                  console.log("val---",val)
                 return <div >
                    <AttrValComponent value={val} valNameChange={that.valNameChange.bind(this)} lbChange = {that.lbChange.bind(this)} rbChange={that.rbChange.bind(this)} />
                    <div className="row col-md-1">
                    <IconButton style = {{position:'relative',left:'-3px'}}  tooltip="delete" onTouchTap={that.del.bind(this,val.id)}><FontIcon color='#D3D3D3' className="material-icons">delete</FontIcon></IconButton>
                    </div>
                   </div>
  })
 

  return(
    <div>
      {component}
    </div>
  ); 
}

 handleOpen(){
      this.setState({addCompCSS:'show',
                    renderAttrValComponent:true,
                    valName:'',
                    lb:'',
                    rb:'',
                    customValTypeName:'',
                    customValType:''
                })
      
  }

  

    //for editing the values table
    onAfterSaveCell(row, cellName, cellValue){
      console.log("in Dialog_Attr vcalues--",row)
      console.log("cellName--",cellName)
      console.log("cellVAlue--",cellValue)
      console.log("this.state.rilrtYpe--",this.state.ruleTypesChanged)
      var arrData = Object.assign([],this.state.ruleTypesChanged)
      //var arrData = this.state.changedValArr;
      
      if(arrData != null && arrData.length != 0){
        arrData.map(function(value){
            console.log("value---",value)
          if(value.btMethodRuleId == row.btMethodRuleId){ //handling the case when 1 row is edited multiple times or same row but diff column
            console.log("in if condition")
            value[cellName] = cellValue;
          }
        else{
          console.log("in ekse con")
          arrData.push(row);
          }
        })
      }
      else{
        arrData.push(row);
      }
      console.log("arrData--",arrData)
      this.setState({ruleTypes:arrData})
      console.log("this.state--",this.state.ruleTypes)
    }

  onBeforeSaveCell(row, cellName, cellValue){
      console.log("onBeforeSaveCell method called in dialog_AttrValues")
    }

    submitData(data){
      console.log("submit method called of form session atrr ad---",data)

    }

    submitForm(curr,isActive,handleSubmit)
    {
      console.log("curr--",curr.props)
      console.info("curr----",curr.props.values)
      console.info("isActive",isActive);
      console.info("handleSubmit",handleSubmit);
      handleSubmit(curr.props.values);
      

      
    }
    handleDelete(){
    var  selectedRow = this.refs.sessionAttrMonitorData.refs.table.state.selectedRowKeys;
    var arrData = Object.assign([],this.state.valDataArr)
      arrData = arrData.filter(function(value){
        return selectedRow.indexOf(value.id) == -1;
       })
       this.setState({valDataArr:arrData})

  }

  render() {

    
     const { fields: {attrName,complete,specific,attrValues}, resetForm, handleSubmit,onSubmit, submitting,isActive} = this.props
     const cellEditProp = {
      mode: 'click',
      blurToSave: true,
      beforeSaveCell: this.onBeforeSaveCell.bind(this), // a hook for before saving cell
      afterSaveCell: this.onAfterSaveCell.bind(this)  // a hook for after saving cell
 };

  return (
    <form >
  
        <div className ="col-md-12">
          <TextField
              // hintText="Hint Text"
               floatingLabelText=" Name"
               {...attrName}
                errorText={attrName.touched && attrName.error && <div>{attrName.error}</div>}
               />
        
    </div>

    <div className ="row ">
        <div className ="col-md-5">
              <Checkbox
              {...complete}
              value="complete"
              label="Complete"
              onCustomChange = {this.completeChkBoxChange.bind(this)} />
          <div style={error}> {complete.touched && complete.error && <div>{complete.error}</div>}</div>

        
        </div>
        <div className = "col-md-3">
             <Checkbox
              {...specific}
              value="specific"
              label="Specific"
             onCustomChange = {this.specificChkBoxChange.bind(this)} />
            
        </div>
    </div>

     <div className = {`row col-md-10  ${this.state.valDataCss}`} style ={{'paddingTop':3,'paddingLeft':6}}>
       
          <div className = {`row col-md-12 ${this.state.addComp}`} style={{paddingLeft:'12px'}}>

            <div className='row row-no-margin tableheader'>
                 <IconButton className="pull-right" tooltip = "Delete" className = "pull-right" onTouchTap={this.handleDelete.bind(this)}><FontIcon color="#FFF" className="material-icons"> delete </FontIcon> </IconButton> 
                <IconButton  className=" pull-right" tooltip="Add" onTouchTap={this.handleOpen.bind(this)}><FontIcon  color="#FFF"  className="material-icons">playlist_add</FontIcon></IconButton>
                <h4 style={{color: '#FFF',paddingLeft:'10px'}} >Add Value Types </h4>
            </div>
            
          <div style={{background:'rgba(0,0,0,0.80)', color:'#FFF'}}>  
            <DataGrid data = {this.state.valDataArr} 
                         cellEdit ={ cellEditProp }
                        pagination = {false} 
                        ref        = "sessionAttrMonitorData" 
                        column     = {columns}
                        onClick    = {this.handleClick}
                      
            />
          </div>
          
          <div className =  {`col-md-12 ${this.state.errMsgCss}`}>
           <p style = {{color: 'red',paddingTop:20}}>Require Fields are empty</p>
        </div>
        
          <div className = {`row ${this.state.addCompCSS}`} >
            {this.state.renderAttrValComponent ? 
              <AttrValComponent value={{}} 
              onCustomValTypeChange = {this.onCustomValTypeChange.bind(this)}
              valNameChange={this.valNameChange.bind(this)} 
              lbChange = {this.lbChange.bind(this)} 
              rbChange={this.rbChange.bind(this)}
               />  
               : null }

              <RaisedButton className ="pull-right"
              label="Add"
              backgroundColor = "#D3D3D3" 
              onClick={this.handleSubmitValType.bind(this,attrValues)}
              style={{position:'relative',bottom:'45px'}}
              labelStyle={{color:"#FFF"}}>
            </RaisedButton>
        </div>


         </div>

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
  fields,
  validate,
},
  state => ({ // mapStateToProps
    valData:state.sessionAttrMonitor.valData
}),
 {
  addingValData:addingValData ,
  disableSubmitButtonState:disableSubmitButtonState,
  toggleAddCustomCapture:toggleAddCustomCapture 
 } // mapDispatchToProps (will bind action creator to dispatch)
) (Form_SessionAttrAdd);

