import React from 'react';
import DataGrid, {Button, Column, FilterRow, Pager, Paging} from 'devextreme-react/data-grid';

import BasicModal from '../../components/Modal.js';

import SNManagementSearchForm from '../../components/SearchForm/SNManagementSearchForm';
import LogService from '../../Business/LogService.js';
import Spinner from '../../components/Spinner.js';
import {commonStyles} from '../../Styles/Styles';

import {createData} from './Mock';

const SNManagement = () => {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const pageSizes = [50, 100, 'all'];

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

  const {item} = createData(100);
  console.log('====================================');
  console.log(item);
  console.log('====================================');
  return (
    <>
      <BasicModal open={open} setOpen={() => setOpen(false)} selectedData={selectedItem} header={header} />
      <SNManagementSearchForm setData={setData} setLoading={setLoading} />
      <DataGrid
        scrolling="standart"
        height={commonStyles.LogGridHeight.height2}
        id="gridContainer"
        dataSource={item}
        keyExpr="ID"
        showBorders={true}
        customizeColumns={customizeColumns}>
        <FilterRow visible={true} />
        {/* <Scrolling mode="virtual" /> */}
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
        {/* hidingPriority={2} */}
        <Column dataField="ID" />
        <Column dataField="origin" />
        <Column dataField="objectValue" />
        <Column dataField="material" />
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
        <Pager allowedPageSizes={pageSizes} showPageSizeSelector={true} />
        <Paging defaultPageSize={50} />
      </DataGrid>
    </>
  );
};

export default SNManagement;

function customizeColumns(columns) {
  columns[0].width = 50;
  columns[1].width = 50;
  columns[2].width = 70;
  columns[3].width = 160;
  columns[4].width = 90;
  columns[5].width = 90;
  columns[6].width = 70;
  columns[7].width = 60;
  columns[8].width = 90;
  columns[9].width = 80;
  columns[10].width = 60;
  columns[11].width = 80;
  columns[12].width = 80;
  columns[13].width = 100;
  columns[14].width = 110;
  columns[15].width = 80;
  columns[16].width = 90;
  columns[17].width = 60;
  columns[18].width = 110;
  columns[19].width = 150;
}
