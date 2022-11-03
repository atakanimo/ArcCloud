import React, {useEffect} from 'react';
import DataGrid, {Button, Column, Editing, Lookup, Scrolling} from 'devextreme-react/data-grid';

import * as service from '../service.js';
import BasicModal from '../../components/Modal.js';
import GetDynamicDimensions from '../../helper/GetDynamicDimensions.js';
import PaginationContainer from '../../components/PaginationContainer';

export default function App() {
  const [screenSize, getDimension] = GetDynamicDimensions();
  const {dynamicWidth, dynamicHeight} = screenSize;

  const [open, setOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState([]);
  const handleOpen = () => setOpen(true);

  function isChief(position) {
    return position && ['CEO', 'CMO'].indexOf(position.trim().toUpperCase()) >= 0;
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
          customizeColumns={customizeColumns}>
          <Scrolling mode="virtual" />
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
  return <PaginationContainer ChildComponent={Table} itemArray={service.generateData(100, service.type.Net)} />;
}
