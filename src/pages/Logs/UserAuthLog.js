import React, {useEffect} from 'react';
import DataGrid, {Button, Column, Scrolling} from 'devextreme-react/data-grid';

import BasicModal from '../../components/Modal.js';

import SearchForm from '../../components/SearchForm/SearchForm';
import PaginationContainer from '../../components/PaginationContainer.js';
import LogService from '../../Business/LogService.js';
import Spinner from '../../components/Spinner.js';
import {commonStyles} from '../../Styles/Styles.js';

export default function UserAuthLogs() {
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
    const {data, success} = await GetLog(types.UserAuth, true, pageCount, pageNumber);
    setData(data);
    setLoading(false);
  };

  const [open, setOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState([]);
  const handleOpen = () => setOpen(true);

  const header = ['id', 'activityType', 'clientMessage', 'activityDate', 'errorMessage'];
  if (loading == true) return <Spinner />;

  return (
    <>
      <BasicModal open={open} setOpen={() => setOpen(false)} selectedData={selectedItem} header={header} />
      <SearchForm pageNumber={pageNumber} pageCount={pageCount} logType={types.UserAuth} setData={setData} setLoading={setLoading} />
      <DataGrid
        height={commonStyles.LogGridHeight.height}
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
        <Column dataField="activityType" />
        <Column dataField="clientMessage" />
        <Column dataField="activityDate" />
        <Column dataField="errorMessage" />
      </DataGrid>
      <PaginationContainer paginationCount={pageCount} setPaginationCount={setPageCount} page={pageNumber} setPage={setPageNumber} />
    </>
  );
}

function customizeColumns(columns) {
  columns[0].width = 50;
  columns[1].width = 70;
  columns[2].width = 100;
}
