import React, {useEffect} from 'react';
import DataGrid, {Button, Column, Scrolling} from 'devextreme-react/data-grid';

import BasicModal from '../../components/Modal.js';
import GetDynamicDimensions from '../../helper/GetDynamicDimensions.js';

import LogPagesSearch from '../../components/LogPagesSearch.js';
import PaginationContainer from '../../components/PaginationContainer.js';
import LogService from '../../Business/LogService.js';

const NavigationLogs = () => {
  const [screenSize, getDimension] = GetDynamicDimensions();
  const {dynamicWidth, dynamicHeight} = screenSize;
  const {types, GetLog} = LogService;

  const [data, setData] = React.useState([]);

  const [pageNumber, setPageNumber] = React.useState(1);
  const [pageCount, setPageCount] = React.useState(100);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getData();
  }, [pageCount, pageNumber]);

  const getData = async () => {
    setLoading(true);
    const {data, success} = await GetLog(types.Nav, true, pageCount, pageNumber);
    console.log(data, success, 'success', 'data');
    setData(data);
    setLoading(false);
  };

  const [open, setOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState([]);
  const handleOpen = () => setOpen(true);

  if (loading == true) {
    return <div>...Loading</div>;
  }

  const header = ['id', 'clientMessage', 'activityDate'];
  return (
    <>
      <BasicModal open={open} setOpen={() => setOpen(false)} selectedData={selectedItem} header={header} />
      <LogPagesSearch pageNumber={pageNumber} pageCount={pageCount} />
      <DataGrid
        height={dynamicHeight * 0.82}
        id="gridContainer"
        dataSource={data}
        keyExpr="id"
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
        <Column dataField="id" />
        <Column dataField="clientMessage" />
        <Column dataField="activityDate" />
      </DataGrid>
      <PaginationContainer paginationCount={pageCount} setPaginationCount={setPageCount} page={pageNumber} setPage={setPageNumber} />
    </>
  );
};

export default NavigationLogs;

function customizeColumns(columns) {
  columns[0].width = 50;
  columns[1].width = 70;
}
