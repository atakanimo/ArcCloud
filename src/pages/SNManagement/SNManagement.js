import React from 'react';
import DataGrid, {Button, Column, FilterRow, Scrolling} from 'devextreme-react/data-grid';

import BasicModal from '../../components/Modal.js';

import SNManagementSearchForm from '../../components/SearchForm/SNManagementSearchForm';
import PaginationContainer from '../../components/PaginationContainer.js';
import LogService from '../../Business/LogService.js';
import Spinner from '../../components/Spinner.js';
import {commonStyles} from '../../Styles/Styles';

import Mock from './Mock';

const ApiRequestLogs = () => {
  const {types, GetLog} = LogService;
  const [data, setData] = React.useState([]);

  const [pageNumber, setPageNumber] = React.useState(1);
  const [pageCount, setPageCount] = React.useState(100);
  const [loading, setLoading] = React.useState(false);
  const [itemCount, setItemCount] = React.useState(100);

  //   useEffect(() => {
  //   }, [pageCount, pageNumber]);

  const [open, setOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState([]);

  const handleOpen = () => setOpen(true);

  const header = [
    'origin',
    'objectValue',
    'material',
    'ID',
    'epcType',
    'slot',
    'filterValue',
    'snFrom',
    'snTo',
    'currentSNSlot',
    'random',
    'randomEU',
    'status',
    'requestStatus',
    'interval',
    'thre',
    'serialNumber',
    'updateDate',
    'creationDate',
  ];
  if (loading == true) return <Spinner />;

  return (
    <>
      <BasicModal open={open} setOpen={() => setOpen(false)} selectedData={selectedItem} header={header} />
      <SNManagementSearchForm
        setPageNumber={setPageNumber}
        setItemCount={setItemCount}
        pageNumber={pageNumber}
        pageCount={pageCount}
        setData={setData}
        setLoading={setLoading}
        logType={types.ApiRequest}
      />
      <DataGrid
        height={commonStyles.LogGridHeight.height}
        id="gridContainer"
        dataSource={Mock}
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
        <Column dataField="origin" />
        <Column dataField="objectValue" />
        <Column dataField="material" />
        <Column dataField="ID" />
        <Column dataField="epcType" />
        <Column dataField="slot" />
        <Column dataField="filterValue" />
        <Column dataField="snFrom" />
        <Column dataField="snTo" />
        <Column dataField="currentSNSlot" />
        <Column dataField="random" />
        <Column dataField="randomEU" />
        <Column dataField="status" />
        <Column dataField="requestStatus" />
        <Column dataField="interval" />
        <Column dataField="thre" />
        <Column dataField="serialNumber" />
        <Column dataField="updateDate" />
        <Column dataField="creationDate" />
      </DataGrid>
      <PaginationContainer
        itemCount={itemCount}
        paginationCount={pageCount}
        setPaginationCount={setPageCount}
        page={pageNumber}
        setPage={setPageNumber}
      />
    </>
  );
};

export default ApiRequestLogs;

function customizeColumns(columns) {
  columns[0].width = 50;
  columns[1].width = 50;
  columns[2].width = 70;
  columns[3].width = 160;
  columns[4].width = 90;
  columns[5].width = 90;
  columns[6].width = 100;
  columns[7].width = 60;
  columns[8].width = 90;
  columns[9].width = 80;
  columns[10].width = 60;
  columns[11].width = 110;
  columns[12].width = 80;
  columns[13].width = 100;
  columns[14].width = 90;
  columns[15].width = 120;
  columns[16].width = 90;
  columns[17].width = 60;
  columns[18].width = 110;
  columns[19].width = 160;
  columns[20].width = 160;
}
