//Importing React components
import React, { PropTypes } from 'react'
import {reduxForm} from 'redux-form';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';

//Importing files
import {getListOfHeaders,getListOfOperators} from '../../../../actions/index';

import DropDownMenu from '../../../../components/SelectFieldWrapper';


export const fields = [ 'conditionName','fpDumpMode','htId','hmdId','cookieName','valId','optId','compValue','description']



  const styles = {
    customWidth: {
      width: 200
    },
     error:{
    fontSize: 12,
    color: 'red' 
  },
  };

class Form_HttpStatsCondition extends React.Component {

  constructor(props) {
  super(props);
  this.state = { 
                fpDumpMode:this.props.initialData != null ? this.props.initialData.fpDumpMode:'-1',
                headerType:this.props.initialData != null ? this.props.initialData.htId:'-1',
                valueType:this.props.initialData !=null? this.props.initialData.valId:'-1',
                operatorType:this.props.initialData !=null? this.props.initialData.optId:'-1',
                enableHeaderList:this.props.initialData != null && (this.props.initialData.htId == 1||this.props.initialData.htId == 2) ,
                headerName:this.props.initialData !=null? this.props.initialData.hmdId: '-1',
                cookieName: this.props.initialData!=null? this.props.initialData.cookie: "",
                enableSelectValueType: this.props.initialData != null && this.props.initialData.htId != null,
                enableOperatorsList :this.props.initialData != null && (this.props.initialData.valId == 1 ||
                                     this.props.initialData.valId == 2 ||this.props.initialData.valId == 3),
                enableCompValueBlock: this.props.initialData != null &&  this.props.initialData.optId != null,
                enableCookieTextField:this.props.initialData != null && this.props.initialData.htId == 3

    }
    if(this.state.headerType == 1 || this.state.headerType == 2){
      this.props.getListOfHeaders(this.state.headerType);      
    }
    if(this.state.valueType != null || this.state.valueType != -1) 
      this.props.getListOfOperators(this.state.valueType);
}

  componentWillMount() {
   // this.props.getListOfHeaders();

    }

   componentWillReceiveProps(nextProps)
    {
    }

  handleChangeOperatorType(event, index, value){
    this.setState({operatorType:value,
                    enableCompValueBlock:true

      })

  }
  handleChangeFpDumpMode(event,index,value){
    this.setState({fpDumpMode:value})
  }
/*
* here value = 1 = "request"
*      value = 2 = "response"
*/
handleChangeHeaderType(event, index, value){
//  this.setState({headerType:value})
 this.props.getListOfHeaders(value);
  if(value == 1 || value == 2)
    this.setState({headerType:value,
                  enableHeaderList:true,
                  enableCookieTextField:false
                })
  else 
    this.setState({headerType:value,
                  enableCookieTextField:true,
                  enableHeaderList:false,
                  enableSelectValueType:true
                })

}
/*
*/

handleChangeValueType(event, index, value){
  this.props.getListOfOperators(value);
    this.setState({valueType:value,
                    enableOperatorsList:true
    })
}

/*
* Here on selecting header Name "select value type Dropdown gets enabled"
*/
handleHeaderSelected(event, index, value){
  this.setState({headerName:value,
                 enableSelectValueType:true
    })
}

//method to create comboBox of headers according to header Type Selected
  renderDropDown(hmdId){
    let menuItems;
    /*if(this.state.headerType == 1){
       menuItems= this.props.listOfRequestTypeHeaders.map((data) => (
                <MenuItem value={data}  primaryText={data}/>
            ));            
  }else{
       menuItems= this.props.listOfResponseTypeHeaders.map((data) => (
                <MenuItem value={data}  primaryText={data}/>
            ));    

  }*/
   menuItems= this.props.listOfHeaders.map((data) => (
                <MenuItem value={data.hmdId}  primaryText={data.headerName}/>
            ));   

      return(
         <DropDownMenu 
          {...hmdId}
          value={this.state.headerName}                
          autoWidth={false}
          customOnChange={this.handleHeaderSelected.bind(this)} 
          floatingLabelText="Select Header"    
         >
          {menuItems} 
         </DropDownMenu>
        );
     }

  render() {
     const { fields: {conditionName,fpDumpMode,htId,hmdId,cookieName,valId,optId,compValue,description}, resetForm, handleSubmit,onSubmit, submitting } = this.props
     return (
        <form >
        <div className = "row ">
        <div className="col-md-6">
          <TextField
                  hintText="Enter Condition Name"
                  floatingLabelText="Name"
                  {...conditionName}
                  style={{ 'width': '350' }}
            />
        </div>

        <div className = "col-md-6">
              <DropDownMenu 
                {...fpDumpMode}
                  value = {this.state.fpDumpMode+""}
                  autoWidth={false}
                  customOnChange={this.handleChangeFpDumpMode.bind(this)} 
                  floatingLabelText="Select Flowpath Dump Mode"
                  autoScrollBodyContent={true}
                >

                <MenuItem value={"0"}  primaryText={"0"}/>
                <MenuItem value={"1"}  primaryText={"1"}/>
                <MenuItem value={"2"}  primaryText={"2"}/>
                </DropDownMenu>
        </div>
        </div>

        <div className ="row">

          <div className="col-md-6">
          
               <DropDownMenu 
                {...htId}
                  value = {this.state.headerType}
                  autoWidth={false}
                  customOnChange={this.handleChangeHeaderType.bind(this)} 
                  floatingLabelText="Select Header Type"
                  autoScrollBodyContent={true}
                >
                 {               
                    this.props.listOfTypes.map((val,index) => (
                    <MenuItem value={val.htId}  primaryText={val.headerTypeName}/>
                 )) 
                }    
                </DropDownMenu>
          </div>  

          {/* renderig dropdown or textfield acording to type selected in above field*/}
          <div className ={`col-md-6 ${this.state.enableHeaderList ?'show':'hidden'}`}>
             {this.renderDropDown(hmdId)}  
          </div>
         
          <div className ={`col-md-6 ${this.state.enableCookieTextField ?'show':'hidden'}`}>
             <TextField
                  hintText="Cookie Name"
                  floatingLabelText="Enter Cookie Name"
                  {...cookieName}
            />
          </div>
          </div>

          <div className ="row">
          <div className ={`col-md-6 ${this.state.enableSelectValueType ?'show':'hidden'}`}>
             <DropDownMenu 
                {...valId}
                  value = {this.state.valueType}
                  autoWidth={false}
                  customOnChange={this.handleChangeValueType.bind(this)} 
                  floatingLabelText="Select Value Type"
                  autoScrollBodyContent={true}
                >
                {
                  this.props.listOfValueType.map((data) =>(
                    <MenuItem value = {data.valId}  primaryText = {data.valType}/>
                  ))
                }
                  
                </DropDownMenu>
          </div>


          <div className = {`col-md-6 ${this.state.enableOperatorsList ?'show':'hidden'}`}>
            <DropDownMenu 
                {...optId}
                  value = {this.state.operatorType}
                  autoWidth={false}
                  customOnChange={this.handleChangeOperatorType.bind(this)} 
                  floatingLabelText="Select Operator Type"
                  autoScrollBodyContent={true}
                >
                {
                  this.props.listOfOperators.map((data) =>(
                    <MenuItem value = {data.optId}  primaryText = {data.opt}/>
                  ))
                }
                  
                </DropDownMenu>
          </div>
        </div>

        <div className={`row ${this.state.enableCompValueBlock ?'show':'hidden'}`}>
        <div className = "col-md-6">
        <TextField
                  hintText="Enter Comparison Value"
                  floatingLabelText="Comparison Value"
                  {...compValue}
            />

        </div>
        <div className = "col-md-6">
        <TextField
                  hintText="Enter Description"
                  floatingLabelText="Description"
                  {...description}
            />
        </div>
        </div>
       </form>
     );
   }
}
Form_HttpStatsCondition.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
}

export default reduxForm({ // <----- THIS IS THE IMPORTANT PART!
  form: 'contact',                           // a unique name for this form
  fields,

},

  state => ({ // mapStateToProps
 /* data:state.initialData,*/
  initialValues :state.httpStatsData.httpStatsFormInitialData,
  initialData  : state.httpStatsData.httpStatsFormInitialData,
  listOfHeaders:state.httpStatsData.listOfHeaders,
  //listOfResponseTypeHeaders:state.httpStatsData.listOfResponseTypeHeaders,
  listOfTypes:state.httpStatsData.listOfTypes,
  listOfValueType:state.httpStatsData.listOfValueType,
  listOfOperators:state.httpStatsData.listOfOperators, 
  openHttpStatsDialog: state.httpStatsData.openHttpStatsDialog
}),
{
  getListOfHeaders:getListOfHeaders,
  getListOfOperators:getListOfOperators
}
) (Form_HttpStatsCondition);
