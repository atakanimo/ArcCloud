import React, {useEffect, useState} from 'react';
import CheckBox from '../../components/Checkbox/Checkbox';
import GetDynamicDimensions from '../../helper/GetDynamicDimensions';
import Mock from '../../Mock/permissions_mock.json';
import {Box} from '@mui/material';

// import CancelIcon from '../../assets/cancel.png';
import SearchIcon from '../../assets/search.png';
import {TbEdit} from 'react-icons/tb';
import PaginationContainer from '../../components/PaginationContainer';
import SettingsModal, {INPUT_MAX_CHAR_LENGTH, INPUT_MIN_CHAR_LENGTH} from './SettingsModal';
import AlertComponent from '../../components/AlertComponent';
import PermissionService from '../../Business/PermissionService';

const columns = ['formName', 'va', 'ea', 'vm', 'em', 'vo', 'eo', 'vu', 'eu', 'vq', 'eq', 'v1', 'e1', 'e2', 'v3', 'e3', 'v4', 'e4', 'v5', 'e5'];

const ADD_COLUMN_TEXT = 'Add New Entry';

const Styles = (width, height) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: height,
    overflow: 'scroll',
  },
  mainDiv: {
    display: 'flex',
  },
  titles: index => ({
    backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#C8C8C8',
    borderWidth: 1,
    borderStyle: 'solid',
    height: 40,
    minWidth: 250,
    fontSize: 16,
    fontWeight: '600',
  }),
  permDiv: {
    display: 'flex',
  },
  columnsArray: (index = 0) => ({
    backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#C8C8C8',
    width: 70,
    height: 40,
    textAlign: 'center',
    borderWidth: 1,
    borderStyle: 'solid',
  }),
  header: {
    display: 'flex',
    flexDirection: 'row',
    height: height * 0.1,
    alignItems: 'center',
  },
  addText: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 0.1,
    height: 40,
    fontSize: 14,
    fontWeight: '600',
    borderWidth: 0,
    borderRadius: 5,
    backgroundColor: '#C8C8C8',
    color: 'black',
    marginLeft: 10,
    marginRight: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  editIcon: {
    width: 35,
    height: 35,
    color: 'red',
  },
  searchInput: {
    width: width * 0.3,
    height: 40,
    backgroundColor: 'white',
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#C8C8C8',
  },
  searchIcon: {
    width: 30,
    height: 30,
  },
  searchBtnContainer: {
    width: width * 0.05,
    height: 40,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#C8C8C8',
  },
});

const Permissions = props => {
  const [state, setState] = useState([]);
  const [state1, SetParentState] = useState([]);

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
  const [pageCount, setPageCount] = React.useState(20);
  const [loading, setLoading] = React.useState(false);
  //

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getData();
  }, [pageCount, pageNumber]);

  const getData = async () => {
    setLoading(true);
    const {data, success} = await GetPermissions(true, pageCount, pageNumber);
    console.log(data, 'data');
    // setData(data);
    setLoading(false);
  };

  // render a loading indicator while the state is being set
  if (!state)
    return (
      <>
        <div>{'Loading...'}</div>
      </>
    );

  const {allItems, data, searchedItems, searchTerm, isNew, selectedRowIdx, triggerModal} = state;

  const handleSearch = () => {
    if (!searchedItems && !searchTerm) return null;
    if (searchedItems) {
      SetParentState('searchedItems', null);
      return;
    }

    const filteredItems = Mock.filter(item => {
      const itemId = item.controlId.toLowerCase();
      const searchedTerm = new RegExp(searchTerm.toLowerCase());
      if (itemId.match(searchedTerm)) return item;
    });

    // should show an alert or a feedback to let the user know about the result of search
    if (filteredItems.length < 1) {
      setShowAlert(true);
      setAlertMessage('No result');
      setAlertVariant('primary');
      return;
    }

    SetParentState('searchedItems', filteredItems);
    return;
  };

  // check this function after makin a successful search!
  // const onCheckboxChange = (title, objIdx) => {
  //   const checkboxValue = data[objIdx][title];
  //   data[objIdx][title] = checkboxValue === 0 ? 1 : 0;
  //   SetParentState('data', data);
  //   return;
  // };

  const handleCreateEvent = () => {
    SetParentState('isNew', true);
    SetParentState('triggerModal', true);
  };

  const mainDivColumnStyles = {minWidth: 100, justifyContent: 'center', alignItems: 'center', display: 'flex', fontSize: 16, fontWeight: '600'};

  // const getItemsToRender = () => {
  //   if (searchedItems && searchedItems.length > 0) return searchedItems;
  //   if (data && data.length > 0) return data;
  //   return null;
  // };

  return (
    <>
      {triggerModal && (
        <SettingsModal
          // setters={{SetParentState, setter}}
          itemToEdit={{item: data[selectedRowIdx] || null, itemIdx: selectedRowIdx}}
          isNew={isNew}
          newItemId={allItems.length}
        />
      )}
      <AlertComponent variant={alertVariant} text={alertMessage} show={showAlert} setShow={setShowAlert} />
      <Box sx={[container, {opacity: triggerModal ? 0.3 : 1}]}>
        <div style={header}>
          <button onClick={() => handleCreateEvent()} style={addText}>
            {ADD_COLUMN_TEXT}
          </button>
          <input
            disabled={searchedItems}
            value={searchTerm}
            onChange={e => SetParentState('searchTerm', e.target.value)}
            minlength={String(INPUT_MIN_CHAR_LENGTH)}
            maxlength={String(INPUT_MAX_CHAR_LENGTH)}
            style={searchInput}
            placeholder="Type your search here..."
          />
          <button style={searchBtnContainer} onClick={() => handleSearch()}>
            {/* <img src={searchedItems ? CancelIcon : SearchIcon } style={searchIcon}/> */}
          </button>
        </div>
        <div style={{height: dynamicHeight * 0.9, backgroundColor: 'yellow'}}>
          <div style={mainDiv}>
            <div style={{...titles(1), ...mainDivColumnStyles}}>{'Edit'}</div>
            <div style={{...titles(1), ...mainDivColumnStyles}}>{'ID'}</div>
            <div style={{...titles(1), ...mainDivColumnStyles, minWidth: 250}}>{'ControlId'}</div>
            <div style={permDiv}>
              {columns.map((item, index) =>
                item == 'formName' ? (
                  <div style={{...columnsArray(1), ...mainDivColumnStyles, minWidth: 120}}>{item}</div>
                ) : (
                  <div style={{...columnsArray(1), ...mainDivColumnStyles, minWidth: 70}}>{item}</div>
                ),
              )}
            </div>
          </div>
          {/* {getItemsToRender() &&
          getItemsToRender().map((permissionObj, index) => {
            return (
              <div style={mainDiv}>
                <div style={{...titles(index), ...mainDivColumnStyles}}>
                  <TbEdit
                    onClick={() => {
                      SetParentState('triggerModal', true);
                      SetParentState('selectedRowIdx', index);
                    }}
                    style={editIcon}
                  />
                </div>
                <div style={{...titles(index), ...mainDivColumnStyles}}>{permissionObj.id}</div>
                <div style={{...titles(index), ...mainDivColumnStyles, minWidth: 250}}>{permissionObj.controlId}</div>
                <div style={permDiv}>
                  {columns.map(item => (
                    <>
                      {item == 'formName' ? (
                        <div style={{...columnsArray(index), minWidth: 120}}>{permissionObj[item]}</div>
                      ) : (
                        <div style={columnsArray(index)}>
                          <CheckBox
                            color="purple"
                            onChange={() => onCheckboxChange(item, index)}
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
          */}
        </div>
        <PaginationContainer paginationCount={pageCount} setPaginationCount={setPageCount} page={pageNumber} setPage={setPageNumber} />
      </Box>
    </>
  );
};
export default Permissions;
