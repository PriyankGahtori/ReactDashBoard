import React, { PropTypes } from 'react'
import {reduxForm} from 'redux-form';
import DropDownMenu from '../components/SelectFieldWrapper';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';
import {getListOfHeaders,getListOfOperators} from '../actions/index';

export const fields = [ 'conditionName','fpDumpMode','htId','hmdId','cookieName','valId','optId','compValue','description']



  const styles = {
    customWidth: {
      width: 300
    }
  };

class Form_HttpStatsCondition extends React.Component {

  constructor(props) {
  super(props);
  this.state={headerType:0
  }
  
 

  }


componentWillMount() {
 // this.props.getListOfHeaders();
  
  }

 componentWillReceiveProps(nextProps)
  {
    
  }

  handleChangeOperatorType(event, index, value){
    console.log("handleChangeOperatorType---",value)
    this.setState({operatorType:value,
                    enableCompValueBlock:true

      })

  }
  handleChangeFpDumpMode(event,index,value){
    console.log("handleChangeFpDumpMode--",value)
    this.setState({fpDumpMode:value})
  }
/*
* here value = 1 = "request"
*      value = 2 = "response"
*/
handleChangeHeaderType(event, index, value){
//  this.setState({headerType:value})
 console.log("handleChangeHeaderType value---",value)
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
  console.log("handleChangeValueType---value---",value)

  this.props.getListOfOperators(value);
    this.setState({valueType:value,
                    enableOperatorsList:true
    })
}

/*
* Here on selecting header Name "select value type Dropdown gets enabled"
*/
handleHeaderSelected(event, index, value){
  console.log("value-in header name selected---",value)
  this.setState({headerName:value,
                 enableSelectValueType:true
    })
}

//method to create comboBox of headers according to header Type Selected
  renderDropDown(hmdId){
    console.log("renderDropDown function called")
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
          style={styles.customWidth}
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
                  hintText="Hint Text"
                  floatingLabelText="Name"
                  {...conditionName}
            />
        </div>

        <div className = "col-md-6">

              <DropDownMenu 
                {...fpDumpMode}
                  value = {this.state.fpDumpMode}
                  autoWidth={false}
                  customOnChange={this.handleChangeFpDumpMode.bind(this)} 
                  floatingLabelText="Select fp Dump Mode"
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
                  floatingLabelText="Select header Type"
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
                  hintText="Hint Text"
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
                  hintText="Hint Text"
                  floatingLabelText="Comparison Value"
                  {...compValue}
            />

        </div>
        <div className = "col-md-6">
        <TextField
                  hintText="Hint Text"
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
  fields
},
  state => ({ // mapStateToProps
 /* data:state.initialData,
  initialValues :state.instanceData.instanceInitializeForm*/
  listOfHeaders:state.httpStatsData.listOfHeaders,
  //listOfResponseTypeHeaders:state.httpStatsData.listOfResponseTypeHeaders,
  listOfTypes:state.httpStatsData.listOfTypes,
  listOfValueType:state.httpStatsData.listOfValueType,
  listOfOperators:state.httpStatsData.listOfOperators


}),
{
  getListOfHeaders:getListOfHeaders,
  getListOfOperators:getListOfOperators
}
) (Form_HttpStatsCondition);
