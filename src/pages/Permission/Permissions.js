import React, {useEffect, useState} from 'react';
import CheckBox from '../../components/Checkbox/Checkbox';
import GetDynamicDimensions from '../../helper/GetDynamicDimensions';
import {Box} from '@mui/material';
import {Styles} from './styles';
// import CancelIcon from '../../assets/cancel.png';
import SearchIcon from '../../assets/search.png';
import {TbEdit} from 'react-icons/tb';
import PaginationContainer from '../../components/PaginationContainer';
import SettingsModal, {INPUT_MAX_CHAR_LENGTH, INPUT_MIN_CHAR_LENGTH} from './SettingsModal';
import AlertComponent from '../../components/AlertComponent';
import PermissionService from '../../Business/PermissionService';

const columns = ['formName', 'va', 'ea', 'vm', 'em', 'vo', 'eo', 'vu', 'eu', 'vq', 'eq', 'v1', 'e1', 'e2', 'v3', 'e3', 'v4', 'e4', 'v5', 'e5'];

const ADD_COLUMN_TEXT = 'Add New Entry';

const Permissions = () => {
  const [screenSize] = GetDynamicDimensions();
  const {dynamicHeight, dynamicWidth} = screenSize;
  const {container, mainDiv, titles, permDiv, columnsArray, header, addText, editIcon, searchInput, searchIcon, searchBtnContainer} = Styles(
    dynamicWidth,
    dynamicHeight,
  );

  const {GetPermissionsByFormName, GetPermissions} = PermissionService;

  //for alert
  const [showAlert, setShowAlert] = useState(false);
  const [alertVariant, setAlertVariant] = useState();
  const [alertMessage, setAlertMessage] = useState();

  // for paging container
  const [pageNumber, setPageNumber] = React.useState(1);
  const [pageCount, setPageCount] = React.useState(100);
  const [loading, setLoading] = React.useState(false);

  const [data, setData] = React.useState([]);
  //

  useEffect(() => {
    getData();
  }, [pageCount, pageNumber]);

  const getData = async () => {
    setLoading(true);
    const {data, success} = await GetPermissions(true, pageCount, pageNumber);
    console.log(data, 'data');
    setData(data);
    setLoading(false);
  };

  if (loading == true) {
    return <div>...Loading</div>;
  }

  // const handleSearch = () => {
  //   if (!searchedItems && !searchTerm) return null;
  //   if (searchedItems) {
  //     SetParentState('searchedItems', null);
  //     return;
  //   }

  //   // should show an alert or a feedback to let the user know about the result of search
  //   if (filteredItems.length < 1) {
  //     setShowAlert(true);
  //     setAlertMessage('No result');
  //     setAlertVariant('primary');
  //     return;
  //   }

  //   return;
  // };

  // check this function after makin a successful search!
  // const onCheckboxChange = (title, objIdx) => {
  //   const checkboxValue = data[objIdx][title];
  //   data[objIdx][title] = checkboxValue === 0 ? 1 : 0;
  //   SetParentState('data', data);
  //   return;
  // };

  const handleCreateEvent = () => {
    //addModal
  };

  // const getItemsToRender = () => {
  //   if (searchedItems && searchedItems.length > 0) return searchedItems;
  //   if (data && data.length > 0) return data;
  //   return null;
  // };

  return (
    <>
      {/* {triggerModal && (
        <SettingsModal
         itemToEdit={{item: data[selectedRowIdx] || null, itemIdx: selectedRowIdx}}
           isNew={isNew} newItemId={allItems.length}
       />
       )} */}
      <Box sx={[container]}>
        {/* <AlertComponent variant={alertVariant} text={alertMessage} show={showAlert} setShow={setShowAlert} /> */}
        <div style={header}>
          <button onClick={() => handleCreateEvent()} style={addText}>
            {ADD_COLUMN_TEXT}
          </button>
          <input
            // disabled={searchedItems}
            // value={searchTerm}
            // onChange={e => SetParentState('searchTerm', e.target.value)}
            minlength={String(INPUT_MIN_CHAR_LENGTH)}
            maxlength={String(INPUT_MAX_CHAR_LENGTH)}
            style={searchInput}
            placeholder="Type your search here..."
          />
          <button style={searchBtnContainer} onClick={() => null}>
            {/* <img src={searchedItems ? CancelIcon : SearchIcon } style={searchIcon}/> */}
          </button>
        </div>
        <div style={{height: dynamicHeight * 0.82, overflow: 'scroll'}}>
          <div style={mainDiv}>
            <div style={{...titles(1), borderLeftWidth: 0}}>{'Edit'}</div>
            <div style={{...titles(1)}}>{'ID'}</div>
            <div style={{...titles(1), minWidth: 250}}>{'ControlId'}</div>
            <div style={permDiv}>
              {columns.map((item, index) =>
                item == 'formName' ? (
                  <div style={{...columnsArray(1), minWidth: 120}}>{item}</div>
                ) : (
                  <div style={{...columnsArray(1), minWidth: 70}}>{item}</div>
                ),
              )}
            </div>
          </div>
          {data &&
            data.map((permissionObj, index) => {
              return (
                <div style={mainDiv}>
                  <div style={{...titles(index), borderLeftWidth: 0}}>
                    <TbEdit
                      // onClick={() => {
                      //   SetParentState('triggerModal', true);
                      //   SetParentState('selectedRowIdx', index);
                      // }}
                      style={editIcon}
                    />
                  </div>
                  <div style={{...titles(index)}}>{permissionObj.id}</div>
                  <div style={{...titles(index), minWidth: 250}}>{permissionObj.controlId}</div>
                  <div style={permDiv}>
                    {columns.map(item => (
                      <>
                        {item == 'formName' ? (
                          <div style={{...columnsArray(index), minWidth: 120}}>{permissionObj[item]}</div>
                        ) : (
                          <div style={columnsArray(index)}>
                            <CheckBox
                              color="purple"
                              // onChange={() => onCheckboxChange(item, index)}
                              checked={permissionObj[item] == 1 ? true : permissionObj[item] == 9 ? true : false}
                              disabled={permissionObj[item] == 9 ? true : false}
                            />
                          </div>
                        )}
                      </>
                    ))}
                  </div>
                </div>
              );
            })}
        </div>
        <PaginationContainer paginationCount={pageCount} setPaginationCount={setPageCount} page={pageNumber} setPage={setPageNumber} />
      </Box>
    </>
  );
};
export default Permissions;
