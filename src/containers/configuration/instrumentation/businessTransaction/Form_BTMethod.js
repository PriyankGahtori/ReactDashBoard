//Importing React components
import React, { PropTypes } from 'react'
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import is from 'is_js';
import { List, ListItem } from 'material-ui/List';
import ContentSend from 'material-ui/svg-icons/content/send';
import AddNewButton from 'material-ui/FloatingActionButton';
import AddIcon from 'material-ui/svg-icons/content/add';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
// import DropDownComponent from './DropDownComponent';

//Importing files
// import { BTPatternCheck } from '../../../../actions/index';
import DropDownMenu from '../../../../components/SelectFieldWrapper';
import Toggle from '../../../../components/ToggleWrapper';
import AddMethodValues from './AddMethodValues';
import MethodBTComponent from './MethodBTComponent';

export const fields = ['fqm', 'operator', 'parameterName', 'operation', 'btName']

const validate = values => {
    const errors = {}

    return errors
}
const styles = {
    block: {
        maxWidth: 250,
        paddingBottom: 5
    },
    toggle: {
        marginTop: 30,
        paddingLeft: 80
    },
    customWidth: {
        width: 200
    },
    checkbox: {
        marginBottom: 16,
        paddingTop: 35
    },
    error: {
        fontSize: 12,
        color: 'red',
        paddingLeft: 40,
    },
};

const NewButtonstyle = {
    left: 3,
    top: -7
};

const errMsgCss = {
    top: -12,
    left: '10px',
    color: '#ff0000'
}




class Form_BTMethod extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = { enable: false,
                    selectedOperation : null,
                    valData : [],
                    paramName :'',
                    operation:[],
                    btName : '',
                    valDataArr : [],
                    count :0,
                    data:{'paramName':'',
                            'operation':[],
                            'btName':''
                        },
                    operator :''
                 }
    }

    handleChange(event, index, value) {
        console.log("handleChange value - ", value)

    /*    if(value == 'STRING')
        {
            //this.state.valData.push(arrStringOperation);
            this.setState({opData:arrStringOperation})
            console.log("val Data - ", this.state.opData)
        }
        else if (value == 'NUMERIC')
         {
             this.state.opData.push(arrNumericOperation);
             console.log("val Data - ", this.state.opData)
         } */

        //   var data = {'paramName':'',
        //              'operation':this.state.opData,
        //              'btName':''
        //   }

        //   var selectedOperation = {'operator' : value}
         this.setState({'operator' : value})            
                     
    }


    componentWillMount() {
    }

    componentWillReceiveProps(nextProps) {
        /*  if(this.props.initialData != nextProps.initialData)
            this.setState({dynamicPartReq : nextProps.initialData.dynamicPartReq})*/
    }

    handleCheck(event, value) {
        this.setState({ 'dynamicPartReq': value })
    }

    submitValType() {
       console.log("handlde submitvalue type called")
         console.log("this.state.paramName--",this.state.paramName)
         console.log("this.state.operation--",this.state.operation)
         console.log("this.state.btName--",this.state.btName)
    if(this.state.paramName == '' || this.state.btName == '' ){
        console.log("insideif block")
       this.setState({errMsgCss:'show'})
    }
    else{
      console.log("in else c ondition")
       this.setState({count:this.state.count+1,
                      errMsgCss:'hidden'
        })
       var methData = {'paramName':this.state.paramName,
                     'operation':this.state.operation,
                     'btName':this.state.btName
    }
    this.state.valDataArr.push(methData);
    }
    }

    paramNameChange(value, id) {
        console.log("parameterName called");
        this.setState({paramName:value})
        // this.editValArr(id,'lb',value)
    }

    operationChange(value, id) {
        console.log("operationChange called");
        // this.setState({lb:value})
        // this.editValArr(id,'lb',value)
    }

    btNameChange(value, id) {
        console.log("btNameChange called");
        this.setState({btName:value})
        // this.editValArr(id,'lb',value)
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

renderMethodBTValues(arr)
{
    // console.log("valdata array - ",this.state.valData)
    console.log("arr - ",arr);
 let that = this;
var val = this.state.valData;
 let component = arr.map(function(val){
                 return <div >
                    <pre>{val}</pre>
                    <MethodBTComponent value={val}   paramNameChange={that.paramNameChange.bind(this)} operationChange = {that.operationChange.bind(this)} btNameChange={that.btNameChange.bind(this)} />
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


handleSubmitValType(){
  
  console.log("handleSubmitValType method called")
    if(this.state.paramName == '' || this.state.operation == '' || this.state.btName == '' ){
       this.setState({errMsgCss:'show'})
    }
    else{
       this.setState({count:this.state.count+1})
       var valData = {'paramName':this.state.paramName,
                     'operation':this.state.operation,
                     'btName':this.state.btName,
                     'id':this.state.count
    }
    var finalArr = Object.assign([],this.state.valDataArr)
    finalArr.push(valData)
    // attrValues.onChange(finalArr) ;
    
    //  this.props.disableSubmitButtonState();
    }
 }

    render() {
        const { fields: {fqm, operator, paramName, operation, btName}, resetForm, handleSubmit, onSubmit, submitting} = this.props
        return (
            <form>
                <div className="row">
                    <div className="col-md-8">
                        <TextField
                            // hintText="Hint Text"
                            floatingLabelText="Fully qualified Method Name"
                            {...fqm}
                            />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-4">
                        <DropDownMenu
                            value={this.state.value}
                            customOnChange={this.handleChange}
                            style={styles.customWidth}
                            autoWidth={false}
                            floatingLabelText="Return type"
                            {...operator}

                            >
                            <MenuItem value={"NUMERIC"} primaryText="NUMERIC" />
                            <MenuItem value={"STRING"} primaryText="STRING" />
                            <MenuItem value={"BOOLEAN"} primaryText="BOOLEAN" />
                            <MenuItem value={"CHARORBYTE"} primaryText="CHAR OR BYTE" />
                        </DropDownMenu>
                    </div>

                </div>

                <div className="row">

                        <h4>Add Parameter name </h4>

                        <div className="row col-md-8 ">
                            <div className="col-md-2">
                                <AddNewButton style={NewButtonstyle} onTouchTap={this.submitValType.bind(this, 'add')} mini={true}>
                                    <AddIcon />
                                </AddNewButton>
                            </div>

                            <div className={`col-md-5 ${this.state.errMsgCss}`}>
                                <p style={errMsgCss}>Fields are empty</p>
                            </div>

                        </div>

                    {/*    {this.renderMethodBTValues(this.state.valDataArr)}
                        <pre>{this.state.data}</pre>  */}
                        <MethodBTComponent value={this.state.operator}   paramNameChange={this.paramNameChange.bind(this)} operationChange={this.operationChange.bind(this)} btNameChange={this.btNameChange.bind(this)} />

                        <RaisedButton className="pull-right"
                            label="Done"
                            backgroundColor="#D3D3D3"
                            onClick={this.handleSubmitValType.bind(this)}
                            style={{ color: '#000' }}>

                        </RaisedButton>

                </div>
            </form>
        );
    }
}


Form_BTMethod.propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired
}

export default reduxForm({ // <----- THIS IS THE IMPORTANT PART!
    form: 'Bussiness Transaction Method ',        // a unique name for this form
    fields,
    validate

},
    state => ({ // mapStateToProps
        methodBT: state.methodBT,
    }),

)(Form_BTMethod);

