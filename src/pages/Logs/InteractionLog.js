import React, {useEffect} from 'react';
import DataGrid, {Button, Column, Scrolling} from 'devextreme-react/data-grid';

import BasicModal from '../../components/Modal.js';

import SearchForm from '../../components/SearchForm/SearchForm';
import PaginationContainer from '../../components/PaginationContainer.js';
import LogService from '../../Business/LogService.js';
import Spinner from '../../components/Spinner.js';
import {commonStyles} from '../../Styles/Styles.js';

const InteractionLogs = () => {
  const {types, GetLog} = LogService;

  const [data, setData] = React.useState([]);

  const [pageNumber, setPageNumber] = React.useState(1);
  const [pageCount, setPageCount] = React.useState(100);
  const [loading, setLoading] = React.useState(false);
  const [itemCount, setItemCount] = React.useState(100);

  useEffect(() => {
    getData();
  }, [pageCount, pageNumber]);

  const getData = async () => {
    setLoading(true);
    const {success, count, list, error} = await GetLog(types.Interaction, true, pageCount, pageNumber);
    if (success) {
      setData(list);
      setItemCount(count);
    }
    setLoading(false);
  };

  const [open, setOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState([]);
  const handleOpen = () => setOpen(true);

  const header = ['id', 'username', 'clientMessage', 'activityDate'];
  if (loading == true) return <Spinner />;

  return (
    <>
      <BasicModal open={open} setOpen={() => setOpen(false)} selectedData={selectedItem} header={header} />
      <SearchForm
        setPageNumber={setPageNumber}
        setItemCount={setItemCount}
        pageNumber={pageNumber}
        pageCount={pageCount}
        logType={types.Interaction}
        setData={setData}
        setLoading={setLoading}
      />
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
        <Column dataField="username" />
        <Column dataField="clientMessage" />
        <Column dataField="activityDate" />
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
export default InteractionLogs;

function customizeColumns(columns) {
  columns[0].width = 50;
  columns[1].width = 70;
}
