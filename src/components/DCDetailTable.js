import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';



class DataGridComponent extends React.Component {

  constructor(props) {
  super(props);
 
  }

  linkFormat(cell,row){
     if(cell.hasOwnProperty("self"))
      return cell.self.href;
      //console.log("hmmmmmmm",cell.self.href)
    else
      return cell;
     
  }
  
 
  render() {
       /*var selectRow: {
        mode: "checkbox",  //checkbox for multi select, radio for single select.
        clickToSelect: true,   //click row will trigger a selection on that row.
        bgColor: "rgb(true238, 193, 213)" , //selected row background color
        onSelect:this.onRowSelect

    };*/
   

  const {data, column, striped, hover, condensed, pagination, selectRow } = this.props;

    return (
    <div>
      <BootstrapTable
        data = {data}
        striped={striped}
        hover={hover}
        condensed={condensed}
        pagination={pagination}
        selectRow={selectRow}
        ref="table"
        style={{"width":"98%"}}
      >
      {column.data.map((val, index) => (            
  
        <TableHeaderColumn dataFormat={this.linkFormat.bind(this)} dataField={column.field[index]} isKey={column.field[index] === column.key ? true :false} hidden={column.field[index] === column.key ? true :false} >{val}</TableHeaderColumn>
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
    selectRow: React.PropTypes.object
};

DataGridComponent.defaultProps = {
  striped: true,
  hover: true,
  condensed: true,
  pagination: true,
  selectRow: {
        mode: "checkbox",  //checkbox for multi select, radio for single select.
        clickToSelect: true,   //click row will trigger a selection on that row.
        bgColor: "rgb(true238, 193, 213)" , //selected row background color
        onSelect : ()=>(console.log("working......?????????????")) 
    },

 
};

export default DataGridComponent;