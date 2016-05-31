import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';


var tabledata = [{"id":0,"index":1,"DCName":"John","DCIP":"London","DCPort":"jon@gmail.com","NDEIP":"10.10.40.11"}];

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
      <BootstrapTable
        data = {data}
        striped={striped}
        hover={hover}
        condensed={condensed}
        pagination={pagination}
        selectRow={selectRow}
        ref="dcDetailTable"
      >

      {column.data.map((val, index) => (            
  
        <TableHeaderColumn dataField={val} isKey={val === column.key ? true :false}>{val}</TableHeaderColumn>
        ))}     

      </BootstrapTable>
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