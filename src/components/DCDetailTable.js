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

    return (
      <BootstrapTable
        data = {this.props.data}
        striped={true}
        hover={true}
        condensed={true}
        pagination={true}
        selectRow={selectRowProp}
        ref="dcDetailTable"
      >

      {this.props.column.data.map((val, index) => (            
  
        <TableHeaderColumn dataField={val} isKey={val === this.props.column.key ? true :false}>{val}</TableHeaderColumn>
        ))}     

      </BootstrapTable>
    );
  }
}

export default DataGridComponent;