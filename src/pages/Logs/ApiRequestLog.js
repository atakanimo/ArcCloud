import React, {useEffect} from 'react';
import DataGrid, {Button, Column, Scrolling} from 'devextreme-react/data-grid';

import * as service from '../service.js';
import BasicModal from '../../components/Modal.js';
import GetDynamicDimensions from '../../helper/GetDynamicDimensions.js';
import PaginationContainer from '../../components/PaginationContainer';
import LogPagesSearch from '../../components/LogPagesSearch.js';

export default function App() {
  return <PaginationContainer ChildComponent={Table} allItems={service.generateData(100, service.type.Api)} />;
}
const Table = props => {
  const [screenSize, getDimension] = GetDynamicDimensions();
  const {dynamicWidth, dynamicHeight} = screenSize;

  const [open, setOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState([]);
  const handleOpen = () => setOpen(true);

  function customizeColumns(columns) {
    columns[0].width = 50;
    columns[1].width = 60;
    columns[5].width = 250;
  }

  const [data, setData] = React.useState(props.item || []);

  useEffect(() => {
    setData(props.items);
  }, [props.items]);

  return (
    <>
      <BasicModal open={open} setOpen={() => setOpen(false)} selectedData={selectedItem} />
      <LogPagesSearch />
      <DataGrid
        height={dynamicHeight * 0.82}
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
        <Column dataField="ResponseXML" />
        <Column dataField="ClientMessage" />
        <Column dataField="ModuleName" />
        <Column dataField="RequestDate" dataType="date" />
      </DataGrid>
    </>
  );
};
