import React from 'react';
import SelectField from 'material-ui/SelectField';
import DropDownMenu from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import * as  opData from '../containers/configuration/instrumentation/businessTransaction/OperatorsData';

const styles = {
  block: {
    maxWidth: 250,
  },
  toggle: {

  },
   customWidth: {
        width: 170,
        height:2
    },

};


class DropDownCompTable extends React.Component{

    constructor(props) {
    super(props);
    console.log("this.props-in dcdetailtable---", this.props)
    var data = [];
    data = opData.gettingOpData(this.props.row);
    this.state = { row:this.props.row,
                    data :data,
                    value:this.props.row.value
    }
  }

  componentWillReceiveProps(nextProps){
   console.log("nextProps---",nextProps)
   if(this.props.row != nextProps.row){
       console.log("nextProps.row--",nextProps.row)
        var data = opData.gettingOpData(row);
       this.setState({row:nextProps.row,
                     data :data,
                     value:nextProps.row.value
        })
    }
  }

  
  handleChange(row, evt, index,val) {
   // console.log("key---",key)
    console.log("row", row)
    console.log("index---", index)
    console.log("value--", val)
    var value = {};
    //value[key] = val

    console.log("value---",value)
    this.setState({value:val,
                   onChangeFlag :true,
                   rowChanged:row
         })
    this.props.onChangeDropDown(val,row)
  }

  render() {

    return (
        <div>
        <DropDownMenu
          onChange={this.handleChange.bind(this,this.state.row)}
          value={this.state.value}
          hintText="Select Operation"
          style={styles.customWidth}
          >
          {
            this.state.data.map((data, index) => (
              <MenuItem value={data.id} primaryText={data.option} />
            ))
          }
        </DropDownMenu>
        </div>
      );

  }
}

export default DropDownCompTable;
