import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

class DataGridComponent extends React.Component {

  constructor(props) {
  super(props);
 
  }
  
  

  render() {
    var selectRowProp = {
        mode: "checkbox",  //checkbox for multi select, radio for single select.
        clickToSelect: true,   //click row will trigger a selection on that row.
        bgColor: "rgb(238, 193, 213)"   //selected row background color
    };

    const {data, column, striped, hover, condensed, pagination, selectRow} = this.props;

   
    return (
    <div>
      <BootstrapTable
        data = {data}
        striped={striped}
        hover={hover}
        condensed={condensed}
        pagination={pagination}
        selectRow={selectRow}
        ref="dcDetailTable"
        style={{"width":"98%"}}
      >

      {column.data.map((val, index) => (            
  
        <TableHeaderColumn dataField={column.field[index]} isKey={column.field[index] === column.key ? true :false}>{val}</TableHeaderColumn>
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
        bgColor: "rgb(238, 193, 213)"   //selected row background color
    }
};

export default DataGridComponent;