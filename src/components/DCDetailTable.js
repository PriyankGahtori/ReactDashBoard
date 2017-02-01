import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import * as actionCreators from '../actions/index';
import Toggle from 'material-ui/Toggle';
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


class DataGridComponent extends React.Component {

  constructor(props) {
    super(props);
    console.log("this.props-in dcdetailtable---", this.props)
    this.state = { onChangeFlag:false}
  }

  handleToggle(row) {
    console.log("ontoggle function ---stilll not changed", row)
    //calling function onToggle defined in parent component i.e service Entry Points 
    this.props.onToggle(row);
    console.log("aftr triggering  parent function")
  }

  handleHyperlink(row) {
    this.props.onhref(row);
  }

  handleChange(row, evt, index,value) {
    console.log("row", row)
    console.log("index---", index)
    console.log("value--", value)

    this.setState({changedVal:value,
                   onChangeFlag :true,
                   rowChanged:row
         })
    this.props.onChangeOpDropDown(value,row)
  }


  linkFormat(cell, row) {

    if (cell != undefined && cell.hasOwnProperty("self"))
      return cell.self.href;
    //console.log("hmmmmmmm",cell.self.href)

    //providing the hyperlink on cell 
    else if (cell != undefined && cell.hasOwnProperty("href")) {
      return (
        <a onTouchTap={this.handleHyperlink.bind(this, row)} >{cell.href}</a>
      );
    }


    else if (cell === 'true' || cell === 'false' || cell === true || cell === false) {
      /*
      *  {cell === 'true'} returns true if cell = true as [===]  compares with type as well as value
      *   string === string
      */
      return (
        <Toggle style={styles.toggle} defaultToggled={cell === 'true' || cell === true} onToggle={this.handleToggle.bind(this, row)}
          disabled={this.props.disableToggle}
          />
      );
    }

    //
    else if (cell != undefined && cell.hasOwnProperty("dropDownVal")) {

     // console.log("row---", row.opCode)
      console.log("Forcell--", cell)
      console.log("row---",row)
      var data = opData.gettingOpData(row.opCode);
      console.log("data---",data)
    //this flag used for dispalying initial value in table
      console.log("this.state.onChangeFlag---",this.state.onChangeFlag)
      if(!this.state.onChangeFlag){
          this.state={value:row.opCode}
      }
      else{
        console.log("in flag tru ecase",this.state.rowChanged)
        console.log("in flag tru ecase",this.state.changedVal)
       
       if(row.btMethodRuleId == this.state.rowChanged.btMethodRuleId){
         console.log("cond satisfied this.state.changedVal--",this.state.changedVal)
         this.state={value:this.state.changedVal,
          }
       } 
      }

      console.log("this.state.value", this.state.value)
      

      return (
        <div>
        <DropDownMenu
          onChange={this.handleChange.bind(this,row)}
          value={this.state.value}
          hintText="Select Operation"
          style={styles.customWidth}
          >
          {
            data.map((data, index) => (
              <MenuItem value={data.id} primaryText={data.option} />
            ))
          }
        </DropDownMenu>
        </div>
      );
    }

    else
      return cell;

  }

  handleSort(a, b, order, sortField) {

    if (order == "desc") {
      //check if it has href(link), get the field.href : value
      if (a[sortField].hasOwnProperty("href"))
        return a[sortField]["href"] < b[sortField]["href"];
      else
        return a[sortField] < b[sortField];
    }
    else {
      if (a[sortField].hasOwnProperty("href"))
        return a[sortField]["href"] > b[sortField]["href"];
      else
        return a[sortField] > b[sortField];
    }
  }




  render() {
    /*var selectRow: {
     mode: "checkbox",  //checkbox for multi select, radio for single select.
     clickToSelect: true,   //click row will trigger a selection on that row.
     bgColor: "rgb(true238, 193, 213)" , //selected row background color
     onSelect:this.onRowSelect

 };*/




    const {data, column, striped, hover, condensed, pagination, selectRow, cellEdit } = this.props;

    return (
      <div >
        <BootstrapTable
          cellEdit={cellEdit}
          data={data}
          striped={striped}
          hover={hover}
          condensed={condensed}
          pagination={pagination}
          selectRow={selectRow}
          ref="table"
          style={{ "width": "98%", color: '#FFF' }}
          tableStyle={{ background: 'rgba(0,0,0,0.25)' }}
          >
          {column.data.map((val, index) => (

            <TableHeaderColumn editable={!(column.field[index] == 'opCodeDropDown')} dataSort={true} sortFunc={this.handleSort.bind(this)} dataFormat={this.linkFormat.bind(this)} dataField={column.field[index]} isKey={column.field[index] === column.key ? true : false} hidden={column.field[index] === column.key ? true : false} >{val}</TableHeaderColumn>
          ))}
        </BootstrapTable>
      </div>
    );
  }
}

DataGridComponent.propTypes = {
  data: React.PropTypes.array.isRequired,
  column: React.PropTypes.object.isRequired,
  striped: React.PropTypes.boolean,
  hover: React.PropTypes.boolean,
  condensed: React.PropTypes.boolean,
  pagination: React.PropTypes.boolean,
  selectRow: React.PropTypes.object,
  disableToggle: React.PropTypes.boolean
};

DataGridComponent.defaultProps = {
  striped: true,
  hover: true,
  condensed: true,
  pagination: true,
  disableToggle: false,
  selectRow: {
    mode: "checkbox",  //checkbox for multi select, radio for single select.
    clickToSelect: true,   //click row will trigger a selection on that row.
    bgColor: "rgb(true238, 193, 213)", //selected row background color
    onSelect: () => (console.log("working......?????????????"))
  },


};

export default DataGridComponent;