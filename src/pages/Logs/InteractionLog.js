import React, {useEffect} from 'react';
import DataGrid, {Button, Column, Editing, Lookup, Scrolling} from 'devextreme-react/data-grid';

import * as service from '../service.js';
import BasicModal from '../../components/Modal.js';
import GetDynamicDimensions from '../../helper/GetDynamicDimensions.js';
import PaginationContainer from '../../components/PaginationContainer';

export default function App() {
  const [screenSize, getDimension] = GetDynamicDimensions();
  const {dynamicWidth, dynamicHeight} = screenSize;
  //   constructor(props) {
  //     super(props);
  //     this.state = { employees: service.getEmployees() };
  //     this.onRowValidating = this.onRowValidating.bind(this);
  //     this.onEditorPreparing = this.onEditorPreparing.bind(this);
  //     this.isCloneIconVisible = this.isCloneIconVisible.bind();
  //     this.isCloneIconDisabled = this.isCloneIconDisabled.bind(this);
  //     this.cloneIconClick = this.cloneIconClick.bind(this);
  //   }

  const [open, setOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function isChief(position) {
    return position && ['CEO', 'CMO'].indexOf(position.trim().toUpperCase()) >= 0;
  }

  function onRowValidating(e) {
    const position = e.newData.Position;

    if (isChief(position)) {
      e.errorText = `The company can have only one ${position.toUpperCase()}. Please choose another position.`;
      e.isValid = false;
    }
  }

  function onEditorPreparing(e) {
    if (e.parentType === 'dataRow' && e.dataField === 'Position') {
      e.editorOptions.readOnly = isChief(e.value);
    }
  }

  function isCloneIconVisible(e) {
    return !e.row.isEditing;
  }

  function isCloneIconDisabled(e) {
    return isChief(e.row.data.Position);
  }

  function customizeColumns(columns) {
    columns[0].width = 50;
    columns[1].width = 70;
    columns[2].width = 120;
    columns[5].width = 150;
  }

  const Table = props => {
    const [data, setData] = React.useState(props.item || []);

    useEffect(() => {
      // console.log(props.items.length, "length");
      setData(props.items);
    }, [props.items]);

    return (
      <>
        <BasicModal open={open} setOpen={() => setOpen(false)} selectedData={selectedItem} />
        <DataGrid
          height={dynamicHeight * 0.92}
          id="gridContainer"
          dataSource={data}
          keyExpr="ID"
          showBorders={true}
          // onRowValidating={this.onRowValidating}
          customizeColumns={customizeColumns}
          // onEditorPreparing={this.onEditorPreparing}
        >
          <Scrolling mode="virtual" />
          <Editing
            mode="row"
            useIcons={true}
            // allowUpdating={true}
            // allowDeleting={this.allowDeleting}
          />
          <Column type="buttons">
            {/* <Button name="edit" />
          <Button name="delete" /> */}
            <Button
              hint="details"
              icon="info"
              visible={isCloneIconVisible}
              disabled={isCloneIconDisabled}
              onClick={e => {
                const clonedItem = {...e.row.data};
                setSelectedItem(clonedItem);
                handleOpen();
              }}
            />
          </Column>
          <Column dataField="ID" />
          <Column dataField="Username" />
          <Column dataField="RequestXML" />
          <Column dataField="RequestXML" />
          <Column dataField="ResponseXML" dataType="date" />
          <Column dataField="Error"></Column>
        </DataGrid>
      </>
    );
  };
  return <PaginationContainer ChildComponent={Table} itemArray={service.generateData(100)} />;
}

// allowDeleting(e) {
//   return !this.isChief(e.row.data.Position);
// }
