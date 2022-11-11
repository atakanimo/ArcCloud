import React, {useEffect} from 'react';
import DataGrid, {Button, Column, FilterRow, Scrolling} from 'devextreme-react/data-grid';

import BasicModal from '../../components/Modal.js';

import SearchForm from '../../components/SearchForm/SearchForm.js';
import PaginationContainer from '../../components/PaginationContainer.js';
import LogService from '../../Business/LogService.js';
import Spinner from '../../components/Spinner.js';
import {commonStyles} from '../../Styles/Styles';

const ApiRequestLogs = () => {
  const {types, GetLog} = LogService;
  const [data, setData] = React.useState([]);

  const [pageNumber, setPageNumber] = React.useState(1);
  const [pageCount, setPageCount] = React.useState(100);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    getData();
  }, [pageCount, pageNumber]);

  const getData = async () => {
    setLoading(true);
    const {data, success} = await GetLog(types.ApiRequest, true, pageCount, pageNumber);
    setData(data);
    setLoading(false);
  };

  const [open, setOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState([]);

  const handleOpen = () => setOpen(true);

  const header = ['id', 'username', 'requestData', 'responseData', 'clientMessage', 'moduleName', 'errorMessage', 'requestDate', 'responseDate'];
  if (loading == true) return <Spinner />;

  return (
    <>
      <BasicModal open={open} setOpen={() => setOpen(false)} selectedData={selectedItem} header={header} />
      <SearchForm pageNumber={pageNumber} pageCount={pageCount} setData={setData} setLoading={setLoading} logType={types.ApiRequest} />
      <DataGrid
        height={commonStyles.LogGridHeight.height}
        id="gridContainer"
        dataSource={data}
        keyExpr="id"
        showBorders={true}
        customizeColumns={customizeColumns}>
        <FilterRow visible={true} />
        <Scrolling mode="virtual" />
        <Column type="buttons">
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
        <Column dataField="username"></Column>
        <Column dataField="requestData" />
        <Column dataField="responseData" />
        <Column dataField="clientMessage" />
        <Column dataField="moduleName" />
        <Column dataField="requestDate" />
      </DataGrid>
      <PaginationContainer paginationCount={pageCount} setPaginationCount={setPageCount} page={pageNumber} setPage={setPageNumber} />
    </>
  );
};

export default ApiRequestLogs;

function customizeColumns(columns) {
  columns[0].width = 50;
  columns[1].width = 60;
  columns[2].width = 130;
  columns[5].width = 250;
}
